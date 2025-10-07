// src/pages/Auth.tsx
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AuthPage() {
  const { signIn, signUp, user, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'signin' | 'signup' | 'reset'>('signin');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
    setSuccessMsg(null);
    setIsSubmitting(true);
    
    try {
      if (mode === 'reset') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth`,
        });
        if (error) {
          setErrorMsg(error.message ?? 'Erreur lors de la réinitialisation');
        } else {
          setSuccessMsg('Un email de réinitialisation a été envoyé à votre adresse email.');
          setEmail('');
        }
      } else if (mode === 'signin') {
        const res = await signIn(email, password);
        if (res.error) {
          const errorMessage = res.error.message ?? 'Erreur de connexion';
          if (errorMessage.includes('Email not confirmed')) {
            setErrorMsg('Veuillez confirmer votre email avant de vous connecter. Vérifiez vos emails.');
          } else if (errorMessage.includes('Invalid login credentials')) {
            setErrorMsg('Email ou mot de passe incorrect. Si vous venez de créer votre compte, vérifiez votre email de confirmation.');
          } else {
            setErrorMsg(errorMessage);
          }
        } else {
          navigate('/app');
        }
      } else {
        const res = await signUp(email, password);
        if (res.error) {
          const errorMessage = res.error.message ?? "Erreur lors de l'inscription";
          if (errorMessage.includes('User already registered')) {
            setErrorMsg('Cet email est déjà utilisé. Essayez de vous connecter ou de réinitialiser votre mot de passe.');
          } else {
            setErrorMsg(errorMessage);
          }
        } else {
          setSuccessMsg('Compte créé ! Vérifiez votre email pour confirmer votre inscription.');
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
            {mode === 'reset' ? 'Mot de passe oublié' : mode === 'signin' ? 'Se connecter' : 'Créer un compte'}
          </h1>
          <p className="text-muted-foreground">
            {mode === 'reset' 
              ? 'Entrez votre email pour réinitialiser votre mot de passe'
              : mode === 'signin' 
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

            {mode !== 'reset' && (
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <input 
                    id="password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="••••••••" 
                    type={showPassword ? 'text' : 'password'}
                    required 
                    minLength={6}
                    className="w-full px-4 py-3 pr-12 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {mode === 'signup' && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Minimum 6 caractères
                  </p>
                )}
              </div>
            )}
          </div>

          {errorMsg && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-destructive">{errorMsg}</p>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-sm text-primary">{successMsg}</p>
            </div>
          )}

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full rounded-lg bg-primary hover:bg-primary-dark py-3 text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting 
              ? 'Chargement...' 
              : mode === 'reset' 
                ? 'Envoyer le lien de réinitialisation'
                : mode === 'signin' 
                  ? 'Se connecter' 
                  : 'Créer mon compte'}
          </button>
        </form>

        <div className="text-center space-y-4">
          <div className="space-y-2">
            {mode === 'signin' && (
              <button 
                onClick={() => {
                  setMode('reset');
                  setErrorMsg(null);
                  setSuccessMsg(null);
                }} 
                className="text-primary hover:text-primary-dark underline text-sm block w-full"
              >
                Mot de passe oublié ?
              </button>
            )}
            
            <button 
              onClick={() => {
                setMode(mode === 'signin' ? 'signup' : 'signin');
                setErrorMsg(null);
                setSuccessMsg(null);
              }} 
              className="text-primary hover:text-primary-dark underline text-sm block w-full"
            >
              {mode === 'reset' || mode === 'signup' ? "J'ai déjà un compte" : "Je n'ai pas encore de compte"}
            </button>
          </div>
          
          <div className="space-y-2">
            <Link 
              to="/app" 
              className="inline-block px-6 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium transition-colors"
            >
              Continuer sans compte
            </Link>
            <div>
              <Link to="/" className="text-muted-foreground hover:text-foreground text-sm">
                ← Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
