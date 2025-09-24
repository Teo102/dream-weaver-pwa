import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Moon, Calculator, BookOpen, Trophy, Settings, Clock, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCurrentStreak, getRecentLogs, getAchievements } from '@/utils/storage';
import { getCurrentTime } from '@/utils/sleepCalculator';
import heroImage from '@/assets/hero-sleep.jpg';

export const Home = () => {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const [streak, setStreak] = useState(0);
  const [recentLogs, setRecentLogs] = useState(0);
  const [unlockedAchievements, setUnlockedAchievements] = useState(0);

  useEffect(() => {
    // Update time every minute
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000);

    // Load user stats
    setStreak(getCurrentStreak());
    setRecentLogs(getRecentLogs(7).length);
    setUnlockedAchievements(getAchievements().filter(a => a.unlocked).length);

    return () => clearInterval(interval);
  }, []);

  const quickActions = [
    {
      icon: Calculator,
      title: 'Calculate Sleep',
      description: 'Find optimal bedtime',
      href: '/calculator',
      color: 'text-primary'
    },
    {
      icon: BookOpen,
      title: 'Log Sleep',
      description: 'Record your night',
      href: '/journal',
      color: 'text-blue-400'
    },
    {
      icon: Moon,
      title: 'Start Routine',
      description: 'Begin 10-min routine',
      href: '/routine',
      color: 'text-purple-400'
    },
    {
      icon: Trophy,
      title: 'Achievements',
      description: 'View your progress',
      href: '/achievements',
      color: 'text-yellow-400'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative h-64 bg-cover bg-center flex items-end"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="relative p-6 w-full">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Good Evening 🌙
          </h1>
          <p className="text-muted-foreground">
            It's {currentTime} — time to prepare for quality sleep
          </p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4 text-center border-primary/20 bg-card/50">
            <div className="text-2xl font-bold text-primary mb-1">{streak}</div>
            <div className="text-xs text-muted-foreground">Day Streak</div>
          </Card>
          <Card className="p-4 text-center border-primary/20 bg-card/50">
            <div className="text-2xl font-bold text-primary mb-1">{recentLogs}</div>
            <div className="text-xs text-muted-foreground">This Week</div>
          </Card>
          <Card className="p-4 text-center border-primary/20 bg-card/50">
            <div className="text-2xl font-bold text-primary mb-1">{unlockedAchievements}</div>
            <div className="text-xs text-muted-foreground">Achievements</div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-foreground">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <Link key={action.href} to={action.href}>
                <Card className="p-4 hover:shadow-sleep-glow transition-all duration-300 border-primary/20 bg-card/50 hover:scale-105">
                  <action.icon className={`h-8 w-8 mb-3 ${action.color}`} />
                  <h3 className="font-semibold text-sm text-foreground mb-1">
                    {action.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {action.description}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Today's Goals */}
        <Card className="p-6 border-primary/20 bg-card/50">
          <h3 className="text-lg font-semibold mb-4 flex items-center text-foreground">
            <Target className="h-5 w-5 mr-2 text-primary" />
            Tonight's Goals
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Calculate optimal bedtime</span>
              <Clock className="h-4 w-4 text-primary" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Complete 10-minute routine</span>
              <Moon className="h-4 w-4 text-primary" />
            </div>
          </div>
          <Link to="/calculator">
            <Button variant="pill" className="w-full mt-4">
              Start Tonight's Sleep Plan
            </Button>
          </Link>
        </Card>

        {/* Sleep Tip */}
        <Card className="p-6 border-primary/20 bg-sleep-gradient-subtle">
          <h3 className="text-lg font-semibold mb-2 text-foreground">💡 Sleep Tip</h3>
          <p className="text-sm text-muted-foreground">
            Your body completes a full sleep cycle every 90 minutes. Waking up at the end of a cycle 
            helps you feel more refreshed than waking mid-cycle.
          </p>
        </Card>
      </div>
    </div>
  );
};