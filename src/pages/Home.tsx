import React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, Trophy, Moon, Star, ArrowRight, Brain, BookOpen, Database, Sparkles, Send } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentStreak, getRecentLogs, type SleepLog } from '@/utils/storage';

const Home = () => {
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

  const healthDataPoints = [
    { label: 'Sommeil total', value: '7h42', trend: '+18 min vs semaine passée' },
    { label: 'FC nocturne moyenne', value: '57 bpm', trend: 'Stable sur 30 jours' },
    { label: 'Récupération estimée', value: '84%', trend: 'Excellent niveau ce mois-ci' },
    { label: 'Régularité du coucher', value: '91%', trend: 'Objectif: > 90%' }
  ];

  const cloudPromptCadence = [
    {
      frequency: 'Quotidien',
      title: 'Synthèse micro-ajustements',
      prompt:
        'Analyse mes dernières 24h (sommeil, fréquence cardiaque nocturne, activité, stress) et propose 3 ajustements concrets pour ce soir ainsi qu\'un résumé visuel ultra-court.',
      cta: 'Envoyer le prompt du jour'
    },
    {
      frequency: 'Hebdomadaire',
      title: 'Bilan tendance & risques',
      prompt:
        'Croise mes données santé iPhone des 7 derniers jours et détecte tendances, points de vigilance, leviers prioritaires et plan d\'action de la semaine.',
      cta: 'Envoyer le prompt de la semaine'
    },
    {
      frequency: 'Mensuel',
      title: 'Analyse complète stratégique',
      prompt:
        'Fais une analyse complète du mois: sommeil, récupération, variabilité, routines, qualité perçue. Génère un rapport visuel détaillé, des objectifs personnalisés et un plan mensuel.',
      cta: 'Envoyer le prompt du mois'
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

        <Card className="p-5 border-primary/20 bg-gradient-to-br from-primary/10 via-card to-accent/20 shadow-sleep-glow">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-primary font-semibold">Cloud IA Santé</p>
              <h2 className="text-lg font-bold text-foreground">Cockpit données iPhone + IA</h2>
            </div>
            <Sparkles className="h-5 w-5 text-primary mt-1" />
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Centralisez un maximum de données santé et générez automatiquement visuels, conseils et analyses complètes avec une orchestration quotidienne, hebdomadaire et mensuelle.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {healthDataPoints.map((item) => (
              <div key={item.label} className="rounded-xl border border-primary/20 bg-background/70 p-3 space-y-1">
                <p className="text-[11px] text-muted-foreground">{item.label}</p>
                <p className="text-lg font-bold text-foreground">{item.value}</p>
                <p className="text-[11px] text-primary">{item.trend}</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Prompts automatiques à envoyer au Cloud IA</h2>
          </div>

          {cloudPromptCadence.map((cadence) => (
            <Card key={cadence.frequency} className="p-4 border-primary/20 bg-card/60 backdrop-blur-sm">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-primary/15 text-primary border border-primary/20">
                    {cadence.frequency}
                  </Badge>
                  <span className="text-xs text-muted-foreground">iPhone Health + IA Cloud</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{cadence.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{cadence.prompt}</p>
                </div>
                <Button variant="outline" className="w-full justify-between border-primary/30 hover:bg-primary/10">
                  <span>{cadence.cta}</span>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

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

        {/* Education Cards */}
        <div className="grid grid-cols-1 gap-3">
          <Link to="/help">
            <Card className="p-4 hover:shadow-sleep-glow transition-all duration-300 border-primary/20 bg-card/50 hover-scale">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">
                    Tutoriel complet
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Guide pas-à-pas de toutes les fonctionnalités
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Card>
          </Link>

          <Link to="/comprendre-sommeil">
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
        </div>

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

export default Home;
