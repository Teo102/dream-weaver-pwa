// src/pages/ComprendreSommeil.tsx
import React, { useEffect } from 'react';
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

type CTA = { to: string; label: string; variant: 'pill' | 'outline' };

type Article = {
  id: string;
  title: string;
  icon: any;
  paragraphs: React.ReactNode[];
  ctas: CTA[];
  summary: string;
};

const articles: Article[] = [
  {
    id: 'article-1',
    title: 'Qu’est-ce que le sommeil ? 💤',
    icon: Bed,
    paragraphs: [
      <>
        Le sommeil est un besoin biologique fondamental. <strong>Pendant la nuit</strong>, ton corps répare les tissus, ton cerveau trie
        les informations de la journée et tes émotions se régulent — tout cela activement, pas simplement «être éteint».
      </>,
      <>
        En pratique : une bonne nuit aide la mémoire, la récupération et l’humeur. <em>Prendre le sommeil au sérieux</em> signifie
        organiser de petites habitudes quotidiennes : heure régulière, baisse des stimulations et environnement calme.
      </>,
    ],
    ctas: [
      { to: '/routines', label: 'Voir les Routines', variant: 'pill' },
      { to: '/calculator', label: 'Ouvrir le Calculateur', variant: 'outline' },
    ],
    summary: 'Le sommeil, c’est de la récupération planifiée — traite-le comme une habitude précieuse.',
  },
  {
    id: 'article-2',
    title: 'Les cycles de sommeil et pourquoi ils comptent 🔁',
    icon: Clock,
    paragraphs: [
      <>
        Le sommeil s’organise en cycles d'environ <strong>90 minutes</strong>. Chaque cycle contient des phases : sommeil léger → profond → REM (rêves).
        On enchaîne généralement 4 à 6 cycles par nuit.
      </>,
      <>
        Pourquoi c’est utile : <strong>la qualité compte autant que la quantité</strong>. Respecter les cycles (et la régularité) aide à se réveiller plus frais
        et à tirer le meilleur de la consolidation mémoire et de la récupération physique.
      </>,
    ],
    ctas: [{ to: '/calculator', label: 'Utiliser le Calculateur', variant: 'pill' }],
    summary: 'Planifier autour des cycles augmente les chances d’un réveil plus agréable.',
  },
  {
    id: 'article-3',
    title: 'Pourquoi il vaut mieux se réveiller en fin de cycle ⏰',
    icon: Sparkles,
    paragraphs: [
      <>
        Se réveiller pendant le sommeil profond provoque souvent de la confusion et une sensation de lourdeur («grogginess»).
        À la fin d’un cycle, on est plutôt en sommeil léger — c’est le meilleur moment pour se lever naturellement.
      </>,
      <>
        Astuce pratique : utilise le calculateur pour estimer des heures de coucher/réveil basées sur ces cycles (ajoute un petit délai
        d’endormissement si nécessaire). Résultat → réveils plus doux et journées plus productives.
      </>,
    ],
    ctas: [
      { to: '/calculator', label: 'Aller au Calculateur', variant: 'pill' },
      { to: '/routines', label: 'Programmer une Routine', variant: 'outline' },
    ],
    summary: 'Un réveil intelligent, c’est aligner l’alarme sur la bonne phase du cycle.',
  },
  {
    id: 'article-4',
    title: 'Routines du soir efficaces (templates) 🧘',
    icon: Feather,
    paragraphs: [
      <>
        Une routine courte et répétée prépare le corps et l’esprit. Quelques éléments à garder : <strong>baisse de lumière</strong>, <strong>déconnexion</strong>,
        respiration douce et étirements légers.
      </>,
      <>
        Exemples simples :
        <ul className="mt-2 ml-5 list-disc">
          <li><strong>Respiration relax (10 min)</strong> — installation, respiration cohérente, ancrage.</li>
          <li><strong>Déconnexion numérique (10–15 min)</strong> — ranger les écrans, tamiser la lumière, écrire 3 pensées à laisser.</li>
          <li><strong>Étirements doux (10–20 min)</strong> — nuque, épaules, dos, jambes, relaxation finale.</li>
        </ul>
      </>,
    ],
    ctas: [{ to: '/routines', label: 'Démarrer une Routine', variant: 'pill' }],
    summary: 'Les routines rendent le sommeil plus prévisible — commence par une courte séquence ce soir.',
  },
  {
    id: 'article-5',
    title: '10 conseils rapides pour mieux dormir ce soir 🌟',
    icon: Heart,
    paragraphs: [
      <>
        Voici <strong>10 actions simples</strong> à essayer — prends-en 1 ou 2 et observe la différence :
        <ol className="mt-2 ml-5 list-decimal">
          <li>Éteins les écrans 30–60 min avant le coucher.</li>
          <li>Baisse la lumière — laisse la mélatonine faire son travail.</li>
          <li>Respire lentement (4–6) pendant 3 minutes pour calmer le système nerveux.</li>
          <li>Évite le café après ~16h (ajuste selon ta sensibilité).</li>
          <li>Garde la chambre fraîche et confortable.</li>
          <li>Respecte une heure de coucher régulière.</li>
          <li>Privilégie une lecture papier calme plutôt qu’un écran.</li>
          <li>Sieste courte seulement (≤ 20 min).</li>
          <li>Limite l’alcool juste avant le coucher.</li>
          <li>Écris 3 choses positives avant d’éteindre la lumière.</li>
        </ol>
      </>,
    ],
    ctas: [
      { to: '/routines', label: 'Voir Routines', variant: 'pill' },
      { to: '/journal', label: 'Ouvrir Journal', variant: 'outline' },
    ],
    summary: 'Choisis un ou deux conseils ce soir — la constance paie plus que la perfection.',
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

            {/* AUCUNE IMAGE / AUCUNE ILLUSTRATION : on ne met rien ici intentionnellement */}
            <div className="hidden md:block w-36" aria-hidden="true" />
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

                {/* AUCUN visuel ici — contenu textuel uniquement */}
                <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
                  {article.paragraphs.map((paragraph, index) => (
                    <div key={index}>{paragraph}</div>
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


export default ComprendreSommeil;