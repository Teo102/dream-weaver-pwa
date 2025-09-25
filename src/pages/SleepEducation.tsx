import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Brain, Clock, Moon, Lightbulb, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const tips = [
  {
    icon: Moon,
    title: "Respectez vos cycles",
    description: "Réveillez-vous à la fin d'un cycle de 90 minutes pour vous sentir plus reposé"
  },
  {
    icon: Clock,
    title: "Horaires réguliers",
    description: "Couchez-vous et réveillez-vous à la même heure chaque jour, même le week-end"
  },
  {
    icon: Brain,
    title: "Routine pré-sommeil",
    description: "Créez un rituel de 30-60 minutes avant de dormir pour signaler à votre corps qu'il est temps de se reposer"
  }
];

export const SleepEducation = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold text-foreground">Comprendre le sommeil</h1>
        <div className="w-10" />
      </div>

      <div className="p-6 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="p-6 bg-primary/10 rounded-full w-fit mx-auto">
            <Brain className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            Pourquoi le sommeil est-il si important ?
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Le sommeil n'est pas du temps perdu, c'est un investissement dans votre santé, 
            votre productivité et votre bien-être. Votre cerveau se répare, consolide vos 
            souvenirs et élimine les toxines pendant que vous dormez.
          </p>
        </div>

        {/* Sleep Cycles */}
        <Card className="p-6 border-primary/20 bg-card/50">
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">
              Les cycles de sommeil
            </h3>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Votre sommeil se déroule en cycles d'environ <strong className="text-primary">90 minutes</strong>. 
              Chaque cycle comprend :
            </p>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center space-x-3 p-3 bg-primary/5 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-sm text-foreground">
                  <strong>Sommeil léger</strong> - Transition vers le sommeil
                </span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-primary/5 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-sm text-foreground">
                  <strong>Sommeil profond</strong> - Récupération physique
                </span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-primary/5 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-sm text-foreground">
                  <strong>Sommeil REM</strong> - Récupération mentale et rêves
                </span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              💡 <strong>Astuce :</strong> Se réveiller à la fin d'un cycle (et non au milieu) 
              vous fera vous sentir plus reposé et alerte.
            </p>
          </div>
        </Card>

        {/* Tips */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Lightbulb className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">
              Conseils pratiques
            </h3>
          </div>
          
          <div className="space-y-3">
            {tips.map((tip, index) => {
              const TipIcon = tip.icon;
              return (
                <Card key={index} className="p-4 border-primary/20 bg-card/50">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <TipIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">
                        {tip.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <Card className="p-6 text-center border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Prêt(e) à optimiser votre sommeil ?
          </h3>
          <p className="text-muted-foreground mb-4">
            Utilisez notre calculateur pour trouver vos heures optimales
          </p>
          <Link to="/calculator">
            <Button variant="pill" size="lg">
              Calculer mes heures
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};