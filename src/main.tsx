import React, { createContext, useContext, useEffect, useState } from 'react';

type User = {
  id?: string;
  email?: string;
  displayName?: string;
} | null;

type AuthContextValue = {
  user: User;
  loading: boolean;
  signIn: (email: string, password?: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (u: User) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    // restore from localStorage if any (optional)
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('sr_user') : null;
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // persist minimal user locally for simple dev flow (remove in prod if using real auth)
    try {
      if (user) localStorage.setItem('sr_user', JSON.stringify(user));
      else localStorage.removeItem('sr_user');
    } catch {}
  }, [user]);

  const signIn = async (email: string) => {
    setLoading(true);
    try {
      // placeholder: replace with real call to Supabase/Auth API later
      await new Promise((r) => setTimeout(r, 300));
      setUser({ id: email, email, displayName: email.split('@')[0] });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      // placeholder
      await new Promise((r) => setTimeout(r, 150));
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
