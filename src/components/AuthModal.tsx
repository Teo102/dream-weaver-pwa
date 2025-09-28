// src/components/AuthModal.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // optional: after success redirect
  onSuccessRedirectTo?: string;
};

export default function AuthModal({ open, onOpenChange, onSuccessRedirectTo }: Props) {
  const { signIn, signUp, user, loading } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setErrorMsg(null);
  };

  const close = () => {
    resetForm();
    onOpenChange(false);
  };

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setErrorMsg(null);

    try {
      if (mode === 'signin') {
        const res = await signIn(email.trim(), password);
        if (res.error) {
          setErrorMsg(res.error.message ?? String(res.error));
          return;
        }
      } else {
        const res = await signUp(email.trim(), password);
        if (res.error) {
          setErrorMsg(res.error.message ?? String(res.error));
          return;
        }
        // signUp succeeded (may require email confirmation depending on Supabase settings)
      }

      // success: close and optionally redirect
      close();
      if (onSuccessRedirectTo) navigate(onSuccessRedirectTo);
    } catch (err: any) {
      setErrorMsg(err?.message ?? String(err));
    }
  };

  // If already logged, show quick info and close button
  if (user && open) {
    return (
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Déjà connecté</AlertDialogTitle>
            <p className="text-sm text-muted-foreground mt-2">Tu es déjà connecté·e en tant que {user.email ?? user.id}.</p>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => onOpenChange(false)}>Fermer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md rounded-2xl p-6">
        <form onSubmit={submit}>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold">
              {mode === 'signin' ? 'Se connecter' : "S'inscrire"}
            </AlertDialogTitle>

            <div className="mt-4 space-y-2">
              <label className="block text-xs text-muted-foreground">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                required
                className="w-full rounded-md border bg-background px-3 py-2"
              />

              <label className="block text-xs text-muted-foreground mt-3">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Au moins 6 caractères"
                required
                className="w-full rounded-md border bg-background px-3 py-2"
              />

              {errorMsg && <div className="text-sm text-destructive mt-2">{errorMsg}</div>}

              <div className="flex items-center gap-2 mt-4 text-sm">
                <button
                  type="button"
                  onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setErrorMsg(null); }}
                  className="text-primary underline"
                >
                  {mode === 'signin' ? "Je veux créer un compte" : "J'ai déjà un compte — me connecter"}
                </button>
                <span className="text-muted-foreground ml-auto text-xs">Connexion sécurisée par Supabase</span>
              </div>
            </div>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-6">
            <AlertDialogCancel onClick={close} className="mr-2">Annuler</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button type="submit" className="bg-primary text-white">
                {loading ? '...' : mode === 'signin' ? 'Se connecter' : "S'inscrire"}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
