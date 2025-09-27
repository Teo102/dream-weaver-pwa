// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type User = {
  id: string;
  email?: string | null;
};

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ error?: any; user?: User | null }>;
  signIn: (email: string, password: string) => Promise<{ error?: any; user?: User | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * AuthProvider
 * - garde l'état user/loading
 * - écoute les changements d'auth (supabase)
 * - fournit signUp / signIn / signOut
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;

    // get current session (initial)
    (async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (!mounted) return;
        const session = data?.session ?? null;
        if (session?.user) {
          setUser({ id: session.user.id, email: session.user.email });
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('AuthProvider: getSession error', err);
        setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    // subscribe to auth changes
    const { subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      mounted = false;
      // unsubscribe if available
      try {
        subscription?.unsubscribe();
      } catch (e) {
        // ignore
      }
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      const createdUser = data?.user ? { id: data.user.id, email: data.user.email } : null;

      // optionally create profile row (no-op on error)
      if (createdUser) {
        // upsert profile row so we have a profile for this user
        await supabase.from('profiles').upsert({ id: createdUser.id, email: createdUser.email }).catch((e) => {
          console.error('profiles upsert failed', e);
        });
        setUser(createdUser);
      }

      return { error, user: createdUser };
    } catch (err) {
      console.error('signUp error', err);
      return { error: err, user: null };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      const signedUser = data?.user ? { id: data.user.id, email: data.user.email } : null;
      if (signedUser) setUser(signedUser);
      return { error, user: signedUser };
    } catch (err) {
      console.error('signIn error', err);
      return { error: err, user: null };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error('signOut error', err);
    } finally {
      setUser(null);
    }
  };

  // helpful runtime log to debug "white screen" issues
  // disable in production if you want
  // console.log('AuthProvider render', { user, loading });

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * useAuth hook
 * - lance une erreur explicite si utilisé en dehors de AuthProvider
 */
export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error(
      'useAuth must be used inside AuthProvider. Wrap your app with <AuthProvider> in src/main.tsx (or equivalent).'
    );
  }
  return ctx;
};
