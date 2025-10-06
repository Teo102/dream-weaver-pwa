import React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Clock, Moon, BookOpen, Timer, CheckCircle, Star, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/assets/hero-sleep.jpg';

export const Landing = () => {
  const [showPaywallModal, setShowPaywallModal] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFreeTrial = () => {
    navigate('/auth');
  };

  const handleCalculatorAccess = () => {
    navigate('/auth');
  };

  const features = [
    {
      icon: Timer,
      title: "Calculateur",
      description: "Obtiens les meilleurs horaires alignés sur tes cycles.",
      route: "/calculator"
    },
    {
      icon: Moon,
      title: "Routine 10 min",
      description: "Une routine courte pour te préparer au sommeil.",
      route: "/routine"
    },
    {
      icon: BookOpen,
      title: "Journal",
      description: "Note ta nuit et suis ta constance.",
      route: "/journal"
    }
  ];

  const benefits = [
    "Basé sur les cycles de 90 min",
    "Routines simples, mises en pratique",
    "Suivi de régularité & motivation"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Moon className="h-6 w-6 text-primary" />
            <span className="font-semibold text-foreground">Sleep Reminder</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/auth')}
            className="text-muted-foreground hover:text-foreground"
          >
            Se connecter
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Hero" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Mieux s'endormir — simple et efficace
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Rappel intelligent • Routine 10 min • Suivi de constance
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-sleep-glow"
              onClick={() => setShowPaywallModal(true)}
            >
              Essai 7j
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="w-full sm:w-auto px-8 py-3 text-lg border-primary/20 hover:border-primary/40"
              onClick={handleCalculatorAccess}
            >
              Calculer mes horaires
            </Button>
          </div>
        </div>
      </section>

      {/* Features Cards */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => {
            const FeatureIcon = feature.icon;
            return (
              <Card key={feature.title} className="p-6 border-primary/20 bg-card/50 hover:shadow-sleep-glow transition-all duration-300 hover-scale">
                <div className="text-center space-y-4">
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto">
                    <FeatureIcon className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {feature.description}
                    </p>
                    <Link to={feature.route}>
                      <Button variant="ghost" className="text-primary hover:text-primary-dark">
                        Découvrir
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Sleep Education Section */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <Card className="p-8 text-center border-primary/20 bg-card/50">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Comprendre le sommeil
          </h2>
          <p className="text-muted-foreground mb-6">
            Articles courts et conseils pratiques pour mieux dormir.
          </p>
          <Link to="/comprendre-sommeil">
            <Button variant="outline" className="border-primary/20 hover:border-primary/40">
              En savoir plus
            </Button>
          </Link>
        </Card>
      </section>

      {/* Why It Works Section */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-foreground text-center mb-12">
          Pourquoi ça marche
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="p-3 bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <p className="text-foreground font-medium">{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Politique</a>
              <a href="#" className="hover:text-foreground transition-colors">FAQ</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 Sleep Reminder. Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>

      {/* Paywall Modal */}
      <Dialog open={showPaywallModal} onOpenChange={setShowPaywallModal}>
        <DialogContent className="sm:max-w-md bg-card border-primary/20">
          <DialogHeader>
            <DialogTitle className="text-foreground text-center">
              Essai gratuit 7 jours
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 text-center">
            <div className="space-y-3">
              <Star className="h-12 w-12 text-primary mx-auto" />
              <h3 className="text-lg font-semibold text-foreground">
                Débloquez toutes les fonctionnalités
              </h3>
              <p className="text-muted-foreground">
                Calculateur avancé, routines personnalisées, suivi détaillé
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowPaywallModal(false)}
                className="flex-1"
              >
                Plus tard
              </Button>
              <Button 
                onClick={handleFreeTrial}
                className="flex-1 bg-primary hover:bg-primary-dark"
              >
                Activer l'essai
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Landing;