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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      navigate('/app');
    }
  }, [user, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);
    
    try {
      if (mode === 'signin') {
        const res = await signIn(email, password);
        if (res.error) {
          setErrorMsg(res.error.message ?? 'Erreur de connexion');
        } else {
          navigate('/app');
        }
      } else {
        const res = await signUp(email, password);
        if (res.error) {
          setErrorMsg(res.error.message ?? "Erreur lors de l'inscription");
        } else {
          navigate('/app');
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {mode === 'signin' ? 'Se connecter' : 'Créer un compte'}
          </h1>
          <p className="text-muted-foreground">
            {mode === 'signin' 
              ? 'Bienvenue sur Sleep Reminder' 
              : 'Commencez votre parcours vers un meilleur sommeil'}
          </p>
        </div>

        <form onSubmit={submit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <input 
                id="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="votre@email.com" 
                type="email" 
                required 
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Mot de passe
              </label>
              <input 
                id="password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••" 
                type="password" 
                required 
                minLength={6}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {mode === 'signup' && (
                <p className="text-xs text-muted-foreground mt-1">
                  Minimum 6 caractères
                </p>
              )}
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-destructive">{errorMsg}</p>
            </div>
          )}

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full rounded-lg bg-primary hover:bg-primary-dark py-3 text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Chargement...' : mode === 'signin' ? 'Se connecter' : 'Créer mon compte'}
          </button>
        </form>

        <div className="text-center space-y-4">
          <button 
            onClick={() => {
              setMode(mode === 'signin' ? 'signup' : 'signin');
              setErrorMsg(null);
            }} 
            className="text-primary hover:text-primary-dark underline text-sm"
          >
            {mode === 'signin' ? "Je n'ai pas encore de compte" : "J'ai déjà un compte"}
          </button>
          
          <div>
            <Link to="/" className="text-muted-foreground hover:text-foreground text-sm">
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
