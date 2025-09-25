import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Lock } from 'lucide-react';
import { getAchievements, getCurrentStreak, type Achievement } from '@/utils/storage';

export const Achievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    setAchievements(getAchievements());
    setStreak(getCurrentStreak());
  }, []);

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <Trophy className="h-12 w-12 mx-auto mb-4 text-primary animate-pulse-glow" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Badges</h1>
          <p className="text-muted-foreground text-sm">
            {unlockedCount} sur {achievements.length} débloqués
          </p>
        </div>

        {/* Current Streak */}
        <Card className="p-6 text-center border-primary/20 bg-sleep-gradient-subtle">
          <Star className="h-8 w-8 mx-auto mb-2 text-primary" />
          <div className="text-3xl font-bold text-primary mb-1">{streak}</div>
          <div className="text-sm text-muted-foreground">Jours consécutifs</div>
        </Card>

        {/* Achievements List */}
        <div className="space-y-3">
          {achievements.map((achievement) => (
            <Card 
              key={achievement.id}
              className={`p-4 border transition-all duration-300 ${
                achievement.unlocked
                  ? 'border-primary bg-primary/5 shadow-sleep-glow'
                  : 'border-primary/20 bg-card/50 opacity-60'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="text-3xl">
                  {achievement.unlocked ? achievement.icon : '🔒'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-foreground">{achievement.name}</h3>
                    {achievement.unlocked && (
                      <Badge variant="secondary" className="bg-primary text-primary-foreground text-xs">
                        Unlocked
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  {achievement.unlocked_at && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Unlocked {new Date(achievement.unlocked_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
                {achievement.unlocked ? (
                  <Trophy className="h-5 w-5 text-primary" />
                ) : (
                  <Lock className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};