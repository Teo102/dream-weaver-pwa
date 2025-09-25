import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Moon, Calendar, ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    id: 1,
    title: "Calculez vos heures optimales",
    description: "Découvrez quand vous coucher ou vous réveiller selon vos cycles de sommeil naturels",
    icon: Clock,
    action: "Calculer maintenant",
    route: "/calculator"
  },
  {
    id: 2,
    title: "Programmez vos rappels",
    description: "Recevez des notifications personnalisées pour respecter votre horaire de sommeil",
    icon: Moon,
    action: "Programmer un rappel",
    route: "/calculator"
  },
  {
    id: 3,
    title: "Suivez votre routine",
    description: "Une routine guidée de 10 minutes pour vous préparer au sommeil en douceur",
    icon: Calendar,
    action: "Essayer maintenant",
    route: "/routine"
  }
];

export const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
      // Mark onboarding as completed
      localStorage.setItem('onboarding_completed', 'true');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('onboarding_completed', 'true');
    navigate('/');
  };

  const handleActionButton = () => {
    localStorage.setItem('onboarding_completed', 'true');
    navigate(steps[currentStep].route);
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center space-y-6 animate-fade-in">
          <CheckCircle className="h-16 w-16 mx-auto text-primary animate-pulse-glow" />
          <h1 className="text-2xl font-bold text-foreground">C'est parti !</h1>
          <p className="text-muted-foreground">
            Vous êtes prêt(e) à optimiser votre sommeil
          </p>
        </div>
      </div>
    );
  }

  const step = steps[currentStep];
  const StepIcon = step.icon;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-md mx-auto space-y-8">
        {/* Progress */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-8 rounded-full transition-all duration-300 ${
                  index <= currentStep ? 'bg-primary' : 'bg-primary/20'
                }`}
              />
            ))}
          </div>
          <Button variant="ghost" size="sm" onClick={handleSkip}>
            Passer
          </Button>
        </div>

        {/* Content */}
        <div className="text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <div className="p-6 bg-primary/10 rounded-full w-fit mx-auto">
              <StepIcon className="h-12 w-12 text-primary" />
            </div>
            <Badge variant="secondary" className="bg-primary/20 text-primary">
              Étape {step.id} sur {steps.length}
            </Badge>
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-foreground">
              {step.title}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {step.description}
            </p>
          </div>

          <div className="space-y-4 pt-8">
            <Button 
              variant="pill" 
              size="lg" 
              onClick={handleActionButton}
              className="w-full"
            >
              {step.action}
            </Button>
            
            <Button 
              variant="ghost" 
              onClick={handleNext}
              className="w-full"
            >
              {currentStep < steps.length - 1 ? (
                <>
                  Suivant
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              ) : (
                'Terminer'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};