// src/pages/Auth.tsx
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const AuthPage: React.FC = () => {
  const { signUp, signIn, user } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === 'signup') {
        const res = await signUp(email, password);
        if (res.error) setError(res.error.message || String(res.error));
        else navigate('/');
      } else {
        const res = await signIn(email, password);
        if (res.error) setError(res.error.message || String(res.error));
        else navigate('/');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div className="p-6">
        <h2 className="text-lg">Déjà connecté</h2>
        <p>Tu es connecté·e avec {user.email}</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl mb-4">{mode === 'signup' ? 'Créer un compte' : 'Se connecter'}</h1>
      <form onSubmit={submit} className="space-y-4">
        <label className="block">
          <span>Email</span>
          <input className="w-full" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label className="block">
          <span>Mot de passe</span>
          <input className="w-full" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        {error && <div className="text-destructive">{error}</div>}
        <div className="flex gap-2">
          <button type="submit" className="btn-primary" disabled={loading}>
            {mode === 'signup' ? 'S’inscrire' : 'Se connecter'}
          </button>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}
            disabled={loading}
          >
            {mode === 'signup' ? 'J’ai déjà un compte' : "Créer un compte"}
          </button>
        </div>
      </form>
    </div>
  );
};
