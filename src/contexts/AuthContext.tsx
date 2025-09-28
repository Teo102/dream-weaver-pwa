// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type User = { id: string; email?: string | null };

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ error?: any; user?: User | null }>;
  signIn: (email: string, password: string) => Promise<{ error?: any; user?: User | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    let subscription: any = undefined;

    // 1) Récupérer la session initiale (avec .then/.catch pour éviter async IIFE)
    try {
      supabase.auth
        .getSession()
        .then((res: any) => {
          if (!mounted) return;
          // res peut être de différentes formes selon la version
          const session = (res && res.data && res.data.session) || (res && res.session) || null;
          if (session && session.user) {
            setUser({ id: session.user.id, email: session.user.email });
          } else {
            setUser(null);
          }
        })
        .catch((err: any) => {
          console.error('Erreur lors de getSession:', err);
          if (mounted) setUser(null);
        })
        .finally(() => {
          if (mounted) setLoading(false);
        });
    } catch (err) {
      console.error('Exception sur getSession:', err);
      if (mounted) {
        setUser(null);
        setLoading(false);
      }
    }

    // 2) S'abonner aux changements d'authentification
    try {
      const resp = supabase.auth.onAuthStateChange((_event: any, session: any) => {
        if (session && session.user) {
          setUser({ id: session.user.id, email: session.user.email });
        } else {
          setUser(null);
        }
        setLoading(false);
      });

      // resp peut être { data: { subscription } } ou subscription directement selon version
      if (resp && (resp as any).data && (resp as any).data.subscription) {
        subscription = (resp as any).data.subscription;
      } else if (resp && (resp as any).subscription) {
        subscription = (resp as any).subscription;
      } else {
        subscription = resp;
      }
    } catch (err) {
      console.warn("Impossible d'attacher l'écouteur d'auth:", err);
      subscription = undefined;
    }

    return () => {
      mounted = false;
      try {
        if (subscription && typeof subscription.unsubscribe === 'function') {
          subscription.unsubscribe();
        } else if (subscription && typeof subscription === 'function') {
          // fallback selon certaines versions
          subscription();
        }
      } catch (e) {
        // nothing
      }
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      const u = data && (data as any).user ? { id: (data as any).user.id, email: (data as any).user.email } : null;
      if (u) {
        // tentative non-bloquante de créer un profil
        (async () => {
          try {
            await supabase.from('profiles').upsert({ id: u.id, email: u.email });
          } catch (e) {
            console.error(e);
          }
        })();
      }
      return { error, user: u };
    } catch (err) {
      console.error('Erreur signUp:', err);
      return { error: err, user: null };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      const u = data && (data as any).user ? { id: (data as any).user.id, email: (data as any).user.email } : null;
      return { error, user: u };
    } catch (err) {
      console.error('Erreur signIn:', err);
      return { error: err, user: null };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error('Erreur signOut:', err);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
