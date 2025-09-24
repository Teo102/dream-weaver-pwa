import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, Square, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getRoutineSteps, addSleepLog } from '@/utils/storage';
import { useToast } from '@/hooks/use-toast';

interface RoutineStep {
  id: string;
  name: string;
  duration: number; // in seconds
  icon: string;
  description: string;
}

export const Routine = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [steps] = useState<RoutineStep[]>(getRoutineSteps());
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const [routineStartTime, setRoutineStartTime] = useState<Date | null>(null);

  const currentStep = steps[currentStepIndex];
  const totalDuration = steps.reduce((sum, step) => sum + step.duration, 0);
  const stepProgress = currentStep ? ((currentStep.duration - timeRemaining) / currentStep.duration) * 100 : 0;
  const overallProgress = (totalElapsed / totalDuration) * 100;

  useEffect(() => {
    if (currentStep && timeRemaining === 0) {
      setTimeRemaining(currentStep.duration);
    }
  }, [currentStepIndex, currentStep]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Step completed
            if (currentStepIndex < steps.length - 1) {
              setCurrentStepIndex(prev => prev + 1);
              return steps[currentStepIndex + 1].duration;
            } else {
              // Routine completed
              handleRoutineComplete();
              return 0;
            }
          }
          return prev - 1;
        });
        setTotalElapsed(prev => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, timeRemaining, currentStepIndex, steps]);

  const startRoutine = () => {
    if (!routineStartTime) {
      setRoutineStartTime(new Date());
      setTimeRemaining(currentStep.duration);
    }
    setIsPlaying(true);
  };

  const pauseRoutine = () => {
    setIsPlaying(false);
  };

  const stopRoutine = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
    setTimeRemaining(0);
    setTotalElapsed(0);
    setRoutineStartTime(null);
  };

  const handleRoutineComplete = () => {
    setIsPlaying(false);
    
    // Log the completed routine
    const today = new Date().toISOString().split('T')[0];
    addSleepLog({
      date: today,
      routine_done: true,
      routine_duration: totalElapsed,
    });

    // Show success message
    toast({
      title: "Bravo — routine terminée 🎉",
      description: "Your bedtime routine is complete! Sweet dreams.",
    });

    // Navigate back to home after a brief delay
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentStep) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 mx-auto mb-4 text-primary animate-pulse-glow" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Routine Complete!</h1>
          <p className="text-muted-foreground mb-6">Well done! Your mind and body are ready for sleep.</p>
          <Link to="/">
            <Button variant="pill">Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold text-foreground">Bedtime Routine</h1>
        <Button variant="ghost" onClick={stopRoutine} className="text-destructive">
          <Square className="h-4 w-4 mr-2" />
          Stop
        </Button>
      </div>

      <div className="p-6 space-y-6">
        {/* Overall Progress */}
        <Card className="p-6 border-primary/20 bg-card/50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">Overall Progress</span>
            <span className="text-sm text-muted-foreground">
              {currentStepIndex + 1} of {steps.length}
            </span>
          </div>
          <Progress value={overallProgress} className="h-2 mb-2" />
          <div className="text-xs text-muted-foreground text-center">
            {formatTime(totalElapsed)} / {formatTime(totalDuration)}
          </div>
        </Card>

        {/* Current Step */}
        <Card className="p-8 text-center border-primary/20 bg-gradient-to-b from-card/50 to-card/30">
          <div className="text-6xl mb-4 animate-float">{currentStep.icon}</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">{currentStep.name}</h2>
          <p className="text-muted-foreground mb-6">{currentStep.description}</p>
          
          {/* Step Timer */}
          <div className="mb-6">
            <div className="text-4xl font-mono font-bold text-primary mb-2">
              {formatTime(timeRemaining)}
            </div>
            <Progress value={stepProgress} className="h-3 mb-2" />
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4">
            {!isPlaying ? (
              <Button 
                variant="hero" 
                size="lg"
                onClick={startRoutine}
                className="px-8"
              >
                <Play className="h-5 w-5 mr-2" />
                {routineStartTime ? 'Resume' : 'Start'}
              </Button>
            ) : (
              <Button 
                variant="hero" 
                size="lg"
                onClick={pauseRoutine}
                className="px-8"
              >
                <Pause className="h-5 w-5 mr-2" />
                Pause
              </Button>
            )}
          </div>
        </Card>

        {/* Steps Overview */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Routine Steps</h3>
          {steps.map((step, index) => (
            <Card 
              key={step.id}
              className={`p-4 border transition-all duration-300 ${
                index === currentStepIndex
                  ? 'border-primary bg-primary/5 shadow-sleep-glow'
                  : index < currentStepIndex
                  ? 'border-green-500/50 bg-green-500/5'
                  : 'border-primary/20 bg-card/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{step.icon}</div>
                <div className="flex-1">
                  <div className="font-medium text-foreground">{step.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {formatTime(step.duration)}
                  </div>
                </div>
                {index < currentStepIndex && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                {index === currentStepIndex && isPlaying && (
                  <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};