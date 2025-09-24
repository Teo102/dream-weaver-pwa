import { ReactNode } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navigation } from './Navigation';

interface LayoutProps {
  children?: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const hideNavigation = ['/routine', '/onboarding'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="pb-20">
        {children || <Outlet />}
      </main>
      {!hideNavigation && <Navigation />}
    </div>
  );
};