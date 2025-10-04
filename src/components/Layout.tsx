// src/components/Layout.tsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';

type Props = {
  children?: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-6xl px-4 py-10">
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
