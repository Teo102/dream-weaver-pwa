// src/components/Layout.tsx
import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, Moon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Props = {
  children?: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt !",
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Moon className="h-5 w-5 text-primary" />
            <span className="font-semibold text-foreground">Sleep Reminder</span>
          </div>
          <div className="flex items-center space-x-3">
            {user?.email && (
              <span className="text-sm text-muted-foreground hidden sm:inline">
                {user.email}
              </span>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Déconnexion</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 pb-24">
        {/* If a parent passed children (used in some routes) use them,
            otherwise render the child route outlet. */}
        {children ?? <Outlet />}
      </main>

      {/* Mobile bottom navigation */}
      <Navigation />
    </div>
  );
};

export default Layout;
