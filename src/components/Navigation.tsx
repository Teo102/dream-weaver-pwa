 codex/add-sleep-reminder-features-44beg3

// src/components/Navigation.tsx
 main
import { Home, Calculator, BookOpen, Trophy, Settings, Timer, Sparkles } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', icon: Home, label: 'Accueil' },
  { href: '/calculator', icon: Calculator, label: 'Calculateur' },
  { href: '/comprendre-sommeil', icon: Sparkles, label: 'Comprendre le sommeil' },
  { href: '/routines', icon: Timer, label: 'Routines' },
  { href: '/journal', icon: BookOpen, label: 'Journal' },
  { href: '/achievements', icon: Trophy, label: 'Succès' },
  { href: '/settings', icon: Settings, label: 'Réglages' },
];

export const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center p-2 rounded-xl transition-all duration-300 min-w-[60px]',
                isActive
                  ? 'text-primary bg-primary/10 shadow-sleep-glow'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )
            }
          >
            <item.icon className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
