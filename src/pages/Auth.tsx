// src/pages/Auth.tsx
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const { signIn, signUp, user, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (mode === 'signin') {
      const res = await signIn(email, password);
      if (res.error) {
        setErrorMsg(res.error.message ?? String(res.error));
      } else {
        navigate('/app');
      }
    } else {
      const res = await signUp(email, password);
      if (res.error) {
        setErrorMsg(res.error.message ?? String(res.error));
      } else {
        // si email confirmation activée, prévenir l'utilisateur
        navigate('/app');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{mode === 'signin' ? 'Se connecter' : "Créer un compte"}</h1>
      <form onSubmit={submit} className="space-y-4">
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" type="email" required className="w-full px-3 py-2 rounded border" />
        <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Mot de passe" type="password" required className="w-full px-3 py-2 rounded border" />
        {errorMsg && <div className="text-destructive">{errorMsg}</div>}
        <button type="submit" className="w-full rounded bg-primary py-2 text-white">{loading ? '...' : mode === 'signin' ? 'Se connecter' : 'Créer'}</button>
      </form>
      <div className="mt-4 text-sm flex justify-between">
        <button onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')} className="text-primary underline">
          {mode === 'signin' ? "Je veux créer un compte" : "J'ai déjà un compte"}
        </button>
        <Link to="/" className="text-muted-foreground">Retour</Link>
      </div>
    </div>
  );
}
