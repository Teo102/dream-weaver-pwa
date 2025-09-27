import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles, BookOpen, Clock, Heart, Bed, Feather, ListChecks } from 'lucide-react';

const meta = {
  title: 'Comprendre le sommeil — Sleep Reminder',
  description:
    "Apprends l'essentiel sur le sommeil : cycles, pourquoi se réveiller, routines du soir et conseils pratiques pour mieux dormir.",
};

const tableOfContents = [
  { id: 'article-1', label: '1 — Qu’est-ce que le sommeil ?' },
  { id: 'article-2', label: '2 — Les cycles de sommeil et pourquoi ils comptent' },
  { id: 'article-3', label: '3 — Pourquoi il vaut mieux se réveiller en fin de cycle' },
  { id: 'article-4', label: '4 — Routines du soir efficaces (templates)' },
  { id: 'article-5', label: '5 — 10 conseils rapides pour mieux dormir ce soir' },
];

const articles = [
  {
    id: 'article-1',
    title: 'Qu’est-ce que le sommeil ? 💤',
    icon: Bed,
   ,
    paragraphs: [
      "Le sommeil est un besoin biologique essentiel : c’est le moment où ton corps et ton cerveau se réparent, consolident la mémoire et régulent les émotions. On dort en plusieurs phases qui ont chacune un rôle (récupération physique, consolidation mentale, rêves).",
      "Même sans entrer dans la science, garder une routine régulière et un environnement calme aide énormément. Le sommeil n’est pas juste “ne pas être réveillé” — c’est un processus actif qui se construit chaque soir.",
    ],
    ctas: [
      { to: '/routines', label: 'Voir les Routines', variant: 'pill' as const },
      { to: '/calculator', label: 'Ouvrir le Calculateur', variant: 'outline' as const },
    ],
    summary: 'Comprendre ça, c’est accepter de traiter le sommeil comme une habitude.',
  },
  {
    id: 'article-2',
    title: 'Les cycles de sommeil et pourquoi ils comptent 🔁',
    icon: Clock,
  
    paragraphs: [
      "Le sommeil fonctionne en cycles (environ 90 minutes) composés de sommeil léger, profond puis REM (où se produisent les rêves). Ces cycles se répètent 4 à 6 fois selon la durée totale de sommeil.",
      "Chaque phase a un rôle : le profond pour la récupération physique, le REM pour la consolidation émotionnelle et mémoire. Respecter la durée et la régularité permet d’optimiser ces phases naturellement.",
    ],
    ctas: [{ to: '/calculator', label: 'Utiliser le Calculateur', variant: 'pill' as const }],
    summary: 'Utiliser le calculateur pour planifier un réveil en fin de cycle augmente les chances de se lever frais.',
  },
  {
    id: 'article-3',
    title: 'Pourquoi il vaut mieux se réveiller en fin de cycle ⏰',
    icon: Sparkles,
    
    paragraphs: [
      "Se réveiller en plein sommeil profond provoque lourdeur, confusion et fatigue (le fameux « grogginess »). Si l’alarme sonne à la fin d’un cycle, on est souvent dans une phase plus légère et le réveil est plus naturel.",
      "C’est pourquoi le calculateur propose des heures de coucher / réveil basées sur ces cycles (en ajoutant un délai d’endormissement si besoin).",
    ],
    ctas: [
      { to: '/calculator', label: 'Aller au Calculateur', variant: 'pill' as const },
      { to: '/routines', label: 'Programmer une Routine', variant: 'outline' as const },
    ],
    summary: 'Le réveil intelligent n’est pas magique, il calcule les cycles.',
  },
  {
    id: 'article-4',
    title: 'Routines du soir efficaces (templates) 🧘',
    icon: Feather,
   
    paragraphs: [
      'Une routine courte et répétée prépare ton corps : baisse de lumière, déconnexion des écrans, exercices de respiration, petit étirement, journal rapide. Voici 3 templates simples à intégrer :',
      'Respiration relax (10 min) : installation, respiration cohérente, ancrage.',
      'Déconnexion numérique (10–15 min) : ranger les écrans, tamiser la lumière, écrire 3 pensées à laisser.',
      'Étirements doux (10–20 min) : nuque, épaules, dos, jambes, relaxation finale.',
    ],
    ctas: [{ to: '/routines', label: 'Démarrer une Routine', variant: 'pill' as const }],
    summary: 'Les routines te rendent plus constant — lance-en une dès ce soir.',
  },
  {
    id: 'article-5',
    title: '10 conseils rapides pour mieux dormir ce soir 🌟',
    icon: Heart,
    
    paragraphs: [
      'Éteins les écrans 30–60 min avant le coucher.',
      'Baisse la lumière — favorise la mélatonine.',
      'Respire lentement 4-6 pendant 3 min.',
      'Pas de café après 16h (ajuste selon toi).',
      'Température chambre : frais et confortable.',
      'Routine régulière : même heure de coucher.',
      'Petite lecture papier plutôt qu’écran.',
      'Sieste courte : 20 min max.',
      'Limite alcool avant le coucher.',
      'Note 3 choses positives avant de dormir.',
    ],
    ctas: [
      { to: '/routines', label: 'Voir Routines', variant: 'pill' as const },
      { to: '/journal', label: 'Ouvrir Journal', variant: 'outline' as const },
    ],
    summary: 'Applique un ou deux conseils ce soir.',
  },
];

export const ComprendreSommeil = () => {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    document.title = meta.title;
    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute('content', meta.description);
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = meta.description;
      document.head.appendChild(newMeta);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Accueil
          </Link>
          <span className="text-sm font-medium text-primary">Sleep Reminder</span>
          <div className="w-16" aria-hidden="true" />
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-8">
        <section className="space-y-6 rounded-3xl border border-primary/15 bg-card/70 p-6 shadow-lg">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
            <div className="flex-1 space-y-4">
              <h1 className="text-3xl font-semibold text-foreground md:text-4xl">Comprendre le sommeil 🌙</h1>
              <p className="text-base text-muted-foreground md:text-lg">
                Les bases simples et pratiques pour mieux dormir — cycles, routines et conseils applicables ce soir.
              </p>
            </div>
            {/* Hero — dégradé à la place de l'image */}
<div
  role="img"
  aria-label="Illustration apaisante de la nuit"
  className="hidden h-32 w-full max-w-xs flex-none rounded-3xl md:block
             bg-gradient-to-br from-[#7C62FF]/80 via-[#B8A5FF]/40 to-[#0B0712]/60
             shadow-md"
></div>

          </div>
        </section>

        <nav aria-label="Table des matières" className="rounded-3xl border border-border/60 bg-muted/30 p-6">
          <h2 className="text-lg font-semibold text-foreground">Table des matières</h2>
          <ul className="mt-4 grid gap-3 text-sm md:grid-cols-2">
            {tableOfContents.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="inline-flex w-full items-center justify-between rounded-2xl border border-border/40 bg-background px-4 py-3 text-left font-medium text-muted-foreground transition hover:border-primary/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <span>{item.label}</span>
                  <BookOpen className="h-4 w-4 text-primary" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <section className="space-y-10">
          {articles.map((article) => {
            const Icon = article.icon;
            return (
              <article
                key={article.id}
                id={article.id}
                className="scroll-mt-24 rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm md:p-8"
              >
                <header className="flex items-start gap-3">
                  <div className="rounded-2xl bg-primary/10 p-3">
                    <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-foreground md:text-3xl">{article.title}</h2>
                  </div>
                </header>

                <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
                  {article.paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <footer className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <p className="text-sm font-medium text-foreground">{article.summary}</p>
                  <div className="flex flex-wrap gap-3">
                    {article.ctas.map((cta) => (
                      <Button key={cta.label} variant={cta.variant} className="rounded-full" asChild>
                        <Link to={cta.to}>{cta.label}</Link>
                      </Button>
                    ))}
                  </div>
                </footer>
              </article>
            );
          })}
        </section>

        <section className="rounded-3xl border border-primary/20 bg-primary/5 p-6 text-center shadow-md">
          <h2 className="text-2xl font-semibold text-foreground md:text-3xl">Prêt à tester ?</h2>
          <p className="mt-2 text-base text-muted-foreground">
            Lance une routine de 10 minutes ou calcule ton prochain réveil.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button variant="pill" size="lg" className="rounded-full px-6" asChild>
              <Link to="/routines">Démarrer une routine</Link>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-6" asChild>
              <Link to="/calculator">Calculer mon sommeil</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 bg-muted/40">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-4 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            ← Retour à l’accueil
          </Link>
          <span className="flex items-center gap-2">
            <ListChecks className="h-4 w-4" aria-hidden="true" />
            Routines & sommeil plus simples
          </span>
        </div>
      </footer>
    </div>
  );
};
