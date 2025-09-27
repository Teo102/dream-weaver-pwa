import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Brain, Clock, Moon, Lightbulb, ArrowLeft, Coffee, Smartphone, Sun, Eye, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const articles = [
  {
    id: 1,
    icon: Clock,
    title: "Les cycles de sommeil - Comprendre les 90 minutes",
    shortDescription: "Votre sommeil suit des cycles précis qu'il faut respecter",
    content: `Chaque nuit, votre cerveau traverse 4 à 6 cycles de sommeil d'environ 90 minutes chacun. Chaque cycle comprend 4 phases distinctes :

• **Phase 1** : Endormissement (5-10 min) - Transition entre éveil et sommeil
• **Phase 2** : Sommeil léger (45-55% du temps) - Ralentissement des ondes cérébrales  
• **Phase 3** : Sommeil profond (15-20% du temps) - Récupération physique, consolidation mémoire
• **Phase REM** : Sommeil paradoxal (20-25% du temps) - Rêves intenses, récupération mentale

**Pourquoi c'est crucial ?** Se réveiller au bon moment dans le cycle (fin de phase 1 ou 2) vous fait sentir reposé. Se réveiller en plein sommeil profond ou REM provoque cette sensation de "gueule de bois" matinale.

**Astuce pratique :** Utilisez notre calculateur pour planifier vos réveils aux moments optimaux et ressentez la différence dès le premier jour.`
  },
  {
    id: 2,
    icon: Brain,
    title: "Pourquoi se réveiller en plein cycle vous assomme",
    shortDescription: "L'inertie du sommeil expliquée simplement",
    content: `Vous est-il déjà arrivé de dormir 8h et de vous sentir plus fatigué qu'après une nuit de 6h ? Ce phénomène s'appelle l'**inertie du sommeil**.

**Le problème :** Quand votre réveil sonne en plein milieu d'un cycle (surtout en sommeil profond), votre cerveau met jusqu'à 2h pour retrouver ses pleines capacités. Vous vous sentez vaseux, confus, irritable.

**La solution :** Programmer vos réveils en fin de cycle naturel. À ces moments, votre cerveau est déjà en phase de réveil spontané - les hormones du réveil sont libérées, la température corporelle remonte.

**En pratique :**
- Couchez-vous à heure fixe pour synchroniser vos cycles
- Utilisez la règle des 90 minutes : si vous dormez à 23h, réveillez-vous à 5h30, 7h ou 8h30
- Évitez les grasses matinées qui décalent tout votre rythme

Un réveil naturel en fin de cycle = énergie immédiate et journée productive.`
  },
  {
    id: 3,
    icon: Smartphone,
    title: "Écrans et lumière - Votre pire ennemi du soir",
    shortDescription: "Comment la lumière bleue sabote votre endormissement",
    content: `La lumière bleue émise par vos écrans (smartphone, TV, ordinateur) trompe votre cerveau qui croit qu'il fait encore jour. Résultat : la production de mélatonine (hormone du sommeil) est bloquée.

**Impact réel :**
- 2h d'écran le soir = 1h de sommeil perdu
- La mélatonine met 2-3h à revenir à un niveau normal
- Votre endormissement est retardé de 30-60 minutes

**Solutions immédiates :**
- **Règle des 2h :** Pas d'écran 2h avant le coucher (ou minimum 1h)
- **Mode nuit activé :** Filtre automatique de lumière bleue après 20h
- **Lumière d'ambiance :** Éclairage chaud et tamisé dès 19h
- **Lecture papier :** Remplacez Netflix par un livre pour vous détendre

**Astuce pro :** Utilisez des lunettes anti-lumière bleue si vous devez absolument travailler le soir. L'investissement de 15€ transformera votre sommeil.`
  },
  {
    id: 4,
    icon: Coffee,
    title: "Café et alcool - Timing crucial pour bien dormir",
    shortDescription: "Quand et comment consommer sans ruiner votre nuit",
    content: `Le café et l'alcool ont des effets opposés mais tous deux perturbent votre sommeil si mal utilisés.

**☕ Le café :**
- Demi-vie de 6h : un café à 16h = 50% de caféine encore active à 22h
- Bloque l'adénosine (molécule de fatigue naturelle)
- **Règle d'or :** Dernier café avant 14h pour un coucher à 22h

**🍷 L'alcool :**
- Facilite l'endormissement MAIS détruit la qualité du sommeil
- Réduit le sommeil REM de 30-40% (récupération mentale)
- Provoque des réveils fréquents en 2ème partie de nuit
- **Timing optimal :** Arrêter 3h avant le coucher minimum

**Alternatives saines :**
- Thé vert le matin (caféine + L-théanine apaisante)
- Tisanes relaxantes le soir (camomille, valériane)
- Eau tiède avec miel 1h avant le coucher

Respecter ces timings améliore immédiatement la qualité de vos nuits.`
  },
  {
    id: 5,
    icon: Sun,
    title: "La sieste parfaite - 20 minutes chrono",
    shortDescription: "Comment récupérer sans ruiner votre nuit",
    content: `La sieste est un super-pouvoir... si elle est bien dosée. Mal faite, elle sabote votre nuit. Bien faite, elle booste vos performances de 35%.

**La règle des 20 minutes :**
- 10-20 min = sieste énergisante parfaite
- 30+ min = vous entrez en sommeil profond et vous réveillez groggy
- 90 min = cycle complet, réveil ok mais nuit perturbée

**Timing optimal :**
- Entre 13h et 15h (creux naturel de vigilance)
- Jamais après 16h (ça décale votre coucher)
- Idéalement 7h après votre réveil

**Technique de la "napuccino" :**
1. Buvez un café rapide
2. Sieste immédiate de 20 min
3. La caféine agit pile quand vous vous réveillez
4. Énergie maximale pour l'après-midi

**Environnement :** Lieu sombre, frais (18-20°C), réveil impératif pour ne pas dépasser 20 min. Une micro-sieste de 20 min = 2h de récupération.`
  }
];

const tips = [
  {
    icon: Moon,
    title: "Respectez vos cycles naturels",
    description: "Réveillez-vous à la fin d'un cycle de 90 minutes pour vous sentir plus reposé et énergique"
  },
  {
    icon: Clock,
    title: "Horaires réguliers = sommeil de qualité",
    description: "Couchez-vous et réveillez-vous à la même heure chaque jour, même le week-end"
  },
  {
    icon: Brain,
    title: "Routine pré-sommeil de 60 minutes",
    description: "Créez un rituel relaxant pour signaler à votre corps qu'il est temps de se reposer"
  }
];

export const SleepEducation = () => {
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

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
            <Brain className="h-12 w-12 text-primary animate-pulse-glow" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            Maîtrisez votre sommeil en 5 minutes
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Découvrez les secrets d'un sommeil réparateur avec nos guides pratiques. 
            Science simple, résultats immédiats.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Lightbulb className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">
              5 articles essentiels (lecture 1-2 min chacun)
            </h3>
          </div>
          
          <div className="space-y-3">
            {articles.map((article) => {
              const ArticleIcon = article.icon;
              const isSelected = selectedArticle === article.id;
              
              return (
                <Card key={article.id} className="border-primary/20 bg-card/50 overflow-hidden">
                  <button
                    onClick={() => setSelectedArticle(isSelected ? null : article.id)}
                    className="w-full p-4 text-left hover:bg-primary/5 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <ArticleIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">
                          {article.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {article.shortDescription}
                        </p>
                      </div>
                      <div className="text-xs text-primary">
                        {isSelected ? 'Fermer' : 'Lire'}
                      </div>
                    </div>
                  </button>
                  
                  {isSelected && (
                    <div className="px-4 pb-4 border-t border-primary/10 mt-4">
                      <div className="pt-4 prose prose-sm max-w-none">
                        <div className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                          {article.content}
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>

        {/* Sleep Cycle Illustration */}
        <Card className="p-6 border-primary/20 bg-card/50">
          <div className="flex items-center space-x-3 mb-4">
            <Timer className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">
              Visualiser un cycle de 90 minutes
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>0 min</span>
              <span>30 min</span>
              <span>60 min</span>
              <span>90 min</span>
            </div>
            <div className="relative h-12 bg-primary/5 rounded-lg overflow-hidden">
              <div className="absolute left-0 top-0 w-1/6 h-full bg-primary/30 rounded-l-lg" />
              <div className="absolute left-1/6 top-0 w-2/6 h-full bg-primary/60" />
              <div className="absolute left-3/6 top-0 w-2/6 h-full bg-primary/90" />
              <div className="absolute left-5/6 top-0 w-1/6 h-full bg-primary/30 rounded-r-lg" />
            </div>
            <div className="grid grid-cols-4 gap-2 text-xs text-center">
              <div>
                <div className="font-medium text-foreground">Léger</div>
                <div className="text-muted-foreground">Endormissement</div>
              </div>
              <div>
                <div className="font-medium text-foreground">Profond</div>
                <div className="text-muted-foreground">Récupération</div>
              </div>
              <div>
                <div className="font-medium text-foreground">Très profond</div>
                <div className="text-muted-foreground">Réparation</div>
              </div>
              <div>
                <div className="font-medium text-foreground">REM</div>
                <div className="text-muted-foreground">Rêves</div>
              </div>
            </div>
            <p className="text-muted-foreground text-sm text-center">
              ⚡ <strong>Zone de réveil optimal</strong> : Début et fin de cycle
            </p>
          </div>
        </Card>

        {/* Quick Tips */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Eye className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">
              3 conseils à appliquer ce soir
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
              Calculer mes heures de sommeil
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};