import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, Trophy, Moon, Star, ArrowRight, Brain } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentStreak, getRecentLogs, type SleepLog } from '@/utils/storage';

export const Home = () => {
  const navigate = useNavigate();
  const [streak, setStreak] = useState(0);
  const [recentLogs, setRecentLogs] = useState<SleepLog[]>([]);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Check if onboarding should be shown
    const onboardingCompleted = localStorage.getItem('onboarding_completed');
    if (!onboardingCompleted) {
      setShowOnboarding(true);
    }
    
    setStreak(getCurrentStreak());
    setRecentLogs(getRecentLogs(3));
  }, []);

  useEffect(() => {
    if (showOnboarding) {
      navigate('/onboarding');
    }
  }, [showOnboarding, navigate]);

  const quickActions = [
    {
      icon: Clock,
      title: "Calculateur",
      description: "Trouvez vos heures optimales",
      route: "/calculator",
      variant: "hero" as const
    },
    {
      icon: Moon,
      title: "Routine",
      description: "Préparation au sommeil guidée",
      route: "/routine",
      variant: "sleep" as const
    },
    {
      icon: Calendar,
      title: "Journal",
      description: "Suivez votre sommeil",
      route: "/journal",
      variant: "outline" as const
    },
    {
      icon: Trophy,
      title: "Badges",
      description: "Vos réussites",
      route: "/achievements",
      variant: "ghost" as const
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto space-y-6 p-6 pb-24">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Moon className="h-8 w-8 text-primary animate-pulse-glow" />
            <h1 className="text-3xl font-bold text-foreground">Sleep Reminder</h1>
          </div>
          <p className="text-muted-foreground">
            Optimisez votre sommeil avec des cycles scientifiques
          </p>
        </div>

        {/* Current Streak */}
        {streak > 0 && (
          <Card className="p-6 text-center border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5">
            <Star className="h-8 w-8 mx-auto mb-2 text-primary animate-pulse-glow" />
            <div className="text-3xl font-bold text-primary mb-1">{streak}</div>
            <div className="text-sm text-muted-foreground">Jours consécutifs</div>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action) => {
            const ActionIcon = action.icon;
            return (
              <Link key={action.title} to={action.route}>
                <Card className="p-4 hover:shadow-sleep-glow transition-all duration-300 border-primary/20 bg-card/50 h-full hover-scale">
                  <div className="text-center space-y-3">
                    <ActionIcon className="h-8 w-8 mx-auto text-primary" />
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">
                        {action.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Education Card */}
        <Link to="/sleep-education">
          <Card className="p-4 hover:shadow-sleep-glow transition-all duration-300 border-primary/20 bg-card/50 hover-scale">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">
                  Comprendre le sommeil
                </h3>
                <p className="text-xs text-muted-foreground">
                  Apprenez les secrets d'un bon sommeil
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </Card>
        </Link>

        {/* Recent Activity */}
        {recentLogs.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">Activité récente</h2>
            {recentLogs.map((log, index) => (
              <Card key={index} className="p-4 border-primary/20 bg-card/50">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-foreground">
                      {new Date(log.date).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Qualité: {log.sleep_quality || 'N/A'}/5
                    </div>
                  </div>
                  {log.routine_done && (
                    <Badge variant="secondary" className="bg-primary/20 text-primary">
                      Routine OK
                    </Badge>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* CTA for first time users */}
        {recentLogs.length === 0 && (
          <Card className="p-6 text-center border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Prêt(e) à optimiser votre sommeil ?
            </h3>
            <p className="text-muted-foreground mb-4">
              Commencez par calculer vos heures idéales
            </p>
            <Link to="/calculator">
              <Button variant="pill" size="lg" className="w-full">
                Commencer
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </Card>
        )}
      </div>

      {/* Sticky CTA for mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t border-border">
        <div className="max-w-md mx-auto">
          <Link to="/routine">
            <Button variant="pill" size="lg" className="w-full shadow-lg">
              <Moon className="h-5 w-5 mr-2" />
              Démarrer routine
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};