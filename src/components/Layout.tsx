 codex/add-sleep-reminder-features-44beg3
import { ReactNode, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navigation } from './Navigation';
import { loadActiveRoutine } from '@/utils/routinesStorage';

import React, { useState } from 'react';
import { ReactNode, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navigation } from './Navigation';
import { loadActiveRoutine } from '@/utils/routinesStorage';
import AuthModal from '@/components/AuthModal';
 main

interface LayoutProps {
  children?: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [hasActiveRoutine, setHasActiveRoutine] = useState(false);
 codex/add-sleep-reminder-features-44beg3

  const [authOpen, setAuthOpen] = useState(false);
 main

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const active = loadActiveRoutine();
      setHasActiveRoutine(Boolean(active));
    } catch (error) {
      console.error('Impossible de vérifier la routine active', error);
    }

    const handleRoutineChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ hasActive: boolean }>;
      setHasActiveRoutine(Boolean(customEvent.detail?.hasActive));
    };

    window.addEventListener('routine:active-change', handleRoutineChange);
    return () => {
      window.removeEventListener('routine:active-change', handleRoutineChange);
    };
  }, []);

  const baseHiddenRoutes = ['/', '/routine', '/onboarding'];
  const hideNavigation =
    baseHiddenRoutes.includes(location.pathname) ||
    (location.pathname === '/routines' && hasActiveRoutine);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header>
        {/* ton header actuel */}
        <button onClick={() => setAuthOpen(true)} className="btn">
          Se connecter / S'inscrire
        </button>
      </header>

      <main className="pb-20">{children || <Outlet />}</main>
      {!hideNavigation && <Navigation />}

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} onSuccessRedirectTo="/app" />
    </div>
  );
};