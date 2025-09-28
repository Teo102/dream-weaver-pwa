// src/pages/Achievements.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Achievements: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-bold text-foreground">Succès</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Ici apparaîtront tes succès quand tu en auras complété. Pour l’instant, c’est une page de démonstration.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border/50 bg-card p-4">
          <h3 className="font-semibold">Premier pas</h3>
          <p className="text-xs text-muted-foreground mt-1">Complète ta première routine.</p>
        </div>
        <div className="rounded-2xl border border-border/50 bg-card p-4">
          <h3 className="font-semibold">3 nuits régulières</h3>
          <p className="text-xs text-muted-foreground mt-1">Garde une routine 3 nuits consécutives.</p>
        </div>
      </div>

      <div className="mt-6">
        <Link to="/routines" className="text-sm text-primary underline">Voir les routines</Link>
      </div>
    </div>
  );
};

export default Achievements;
