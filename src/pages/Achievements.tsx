// src/pages/Achievements.tsx
import React from 'react';
import { Trophy } from 'lucide-react';

const Achievements: React.FC = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center">
          <Trophy className="mx-auto h-12 w-12 text-primary" aria-hidden="true" />
          <h1 className="mt-4 text-2xl font-bold text-foreground">Succès</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Tu n'as pas encore de succès — lance une routine pour en débloquer !
          </p>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
