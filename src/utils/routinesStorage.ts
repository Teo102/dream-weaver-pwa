export const ROUTINE_TEMPLATES_KEY = 'routinesTemplates';
export const ACTIVE_ROUTINE_KEY = 'activeRoutine';
export const COMPLETED_ROUTINES_KEY = 'completedRoutines';

export interface RoutineStep {
  id: string;
  title: string;
  description: string;
  durationSec: number;
}

export interface RoutineTemplate {
  id: string;
  title: string;
  previewText: string;
  scriptFileName: string;
  // optional on type level to stay backward compatible with older persisted data
  durations?: number[]; // in seconds
  steps?: RoutineStep[];
}

export interface ActiveRoutineStorage {
  id: string;
  title: string;
  durationSec: number;
  endAt?: number;
  remainingSec?: number;
  paused?: boolean;
  startedAt: number;
}

export interface CompletedRoutineEntry {
  id: string;
  title: string;
  completedAt: string;
}

const standardDurations = [600, 900, 1200];

export const defaultRoutineTemplates: RoutineTemplate[] = [
  {
    id: 'respiration-relax',
    title: 'Respiration relax',
    previewText: 'Respire profondément et relâche les tensions en dix minutes apaisantes.',
    scriptFileName: 'respiration-relax.txt',
    durations: standardDurations,
    steps: [
      {
        id: 'respiration-installation',
        title: 'Installation calme',
        description:
          'Assieds-toi confortablement, relâche les épaules et pose les mains sur le ventre. Ferme les yeux et prends conscience de ta respiration naturelle.',
        durationSec: 60,
      },
      {
        id: 'respiration-coherente',
        title: 'Respiration 4-6',
        description:
          'Inspire par le nez sur 4 secondes, expire par la bouche sur 6 secondes. Répète ce cycle six fois en gardant les épaules détendues.',
        durationSec: 180,
      },
      {
        id: 'respiration-abdominale',
        title: 'Souffle abdominal',
        description:
          'Place une main sur le ventre et sens-le se gonfler à l’inspiration, puis se dégonfler à l’expiration. Visualise l’air qui balaye les tensions.',
        durationSec: 180,
      },
      {
        id: 'respiration-retour-au-calme',
        title: 'Ancrage final',
        description:
          'Prolonge l’expiration, relâche la mâchoire et laisse les épaules tomber. Termine par trois respirations profondes en savourant la détente.',
        durationSec: 180,
      },
    ],
  },
  {
    id: 'etirements-doux',
    title: 'Étirements doux',
    previewText: 'Séquence lente pour détendre le corps et préparer les muscles au repos.',
    scriptFileName: 'etirements-doux.txt',
    durations: standardDurations,
    steps: [
      {
        id: 'etirements-nuque',
        title: 'Relâcher la nuque',
        description:
          'Assis ou debout, laisse tomber la tête à droite puis à gauche, maintiens 10 secondes de chaque côté et fais des cercles lents.',
        durationSec: 90,
      },
      {
        id: 'etirements-epaules',
        title: 'Déverrouiller les épaules',
        description:
          'Enlace tes épaules vers l’avant puis ouvre les bras vers l’arrière. Inspires à l’ouverture, expires en arrondissant le dos.',
        durationSec: 90,
      },
      {
        id: 'etirements-dos',
        title: 'Étirement du dos',
        description:
          'Sur une chaise, penche-toi vers l’avant en laissant tomber les bras. Respire profondément et déroule le dos vertèbre par vertèbre.',
        durationSec: 120,
      },
      {
        id: 'etirements-jambes',
        title: 'Assouplir les jambes',
        description:
          'Assieds-toi au sol, tends une jambe et attrape ta cheville. Maintiens 20 secondes puis change de côté, sans douleur.',
        durationSec: 150,
      },
      {
        id: 'etirements-final',
        title: 'Relaxation finale',
        description:
          'Allonge-toi, ramène les genoux à la poitrine puis étire tout le corps en inspirant. Expire en relâchant complètement.',
        durationSec: 150,
      },
    ],
  },
  {
    id: 'deconnexion-numerique',
    title: 'Déconnexion numérique',
    previewText: 'Rituel sans écran pour décrocher mentalement avant d’aller dormir.',
    scriptFileName: 'deconnexion-numerique.txt',
    durations: standardDurations,
    steps: [
      {
        id: 'deconnexion-rangement',
        title: 'Range tes appareils',
        description:
          'Éteins les écrans, mets ton téléphone en mode nuit et pose-le hors de portée. Respire un instant en observant le calme retrouvé.',
        durationSec: 120,
      },
      {
        id: 'deconnexion-lumiere',
        title: 'Ambiance tamisée',
        description:
          'Diminue les lumières, allume une lampe douce ou une bougie. Prépare un espace propice au repos visuel.',
        durationSec: 120,
      },
      {
        id: 'deconnexion-ecriture',
        title: 'Clarifier les pensées',
        description:
          'Prends un carnet et note trois idées à laisser pour demain. Termine par une intention positive pour la nuit.',
        durationSec: 150,
      },
      {
        id: 'deconnexion-detente',
        title: 'Respiration apaisante',
        description:
          'Assieds-toi confortablement et pratique une respiration lente : inspire sur 4 secondes, expire sur 6 secondes pendant plusieurs cycles.',
        durationSec: 120,
      },
      {
        id: 'deconnexion-cocon',
        title: 'Prépare ton cocon',
        description:
          'Vérifie que la chambre est fraîche, range les objets inutiles et installe ta literie pour te glisser au lit sereinement.',
        durationSec: 90,
      },
    ],
  },
  {
    id: 'journal-calme',
    title: 'Journal calme',
    previewText: 'Prends un carnet et couche tes pensées pour apaiser ton esprit.',
    scriptFileName: 'journal-calme.txt',
    durations: standardDurations,
    steps: [
      {
        id: 'journal-ouverture',
        title: 'Créer le cadre',
        description:
          'Installe-toi avec ton carnet, choisis un stylo agréable et prends trois respirations profondes avant d’écrire.',
        durationSec: 90,
      },
      {
        id: 'journal-gratitude',
        title: 'Gratitude du jour',
        description:
          'Note trois moments positifs de la journée, aussi simples soient-ils, en détaillant ce qu’ils t’ont fait ressentir.',
        durationSec: 150,
      },
      {
        id: 'journal-decharge',
        title: 'Libérer l’esprit',
        description:
          'Écris librement ce qui occupe tes pensées. Termine chaque phrase par une respiration pour laisser partir les tensions.',
        durationSec: 180,
      },
      {
        id: 'journal-intention',
        title: 'Intention du lendemain',
        description:
          'Formule une intention ou une petite action pour demain. Visualise-toi en train de la réaliser avec sérénité.',
        durationSec: 120,
      },
      {
        id: 'journal-cloture',
        title: 'Clôture douce',
        description:
          'Relis ce que tu as écrit, remercie-toi pour ce moment et referme le carnet en conscience.',
        durationSec: 60,
      },
    ],
  },
  {
    id: 'relaxation-guidee',
    title: 'Relaxation guidée',
    previewText: 'Balayage corporel et visualisation pour relâcher chaque zone du corps.',
    scriptFileName: 'relaxation-guidee.txt',
    durations: standardDurations,
    steps: [
      {
        id: 'relaxation-installation',
        title: 'Position confortable',
        description:
          'Allonge-toi sur le dos, mains tournées vers le ciel. Ajuste coussin et couverture pour être parfaitement installé.',
        durationSec: 90,
      },
      {
        id: 'relaxation-respiration',
        title: 'Respiration ancrée',
        description:
          'Respire lentement en visualisant une vague qui monte à l’inspiration et redescend à l’expiration.',
        durationSec: 120,
      },
      {
        id: 'relaxation-balayage',
        title: 'Balayage corporel',
        description:
          'Parcours mentalement chaque zone du corps, des pieds à la tête. Relâche à l’expiration les tensions détectées.',
        durationSec: 210,
      },
      {
        id: 'relaxation-visualisation',
        title: 'Visualisation apaisante',
        description:
          'Imagine un lieu calme (plage, forêt) et décris-le mentalement : couleurs, sons, sensations sur la peau.',
        durationSec: 120,
      },
      {
        id: 'relaxation-retour',
        title: 'Retour progressif',
        description:
          'Ramène lentement l’attention à la respiration, bouge les doigts et étire-toi doucement avant de te recoucher.',
        durationSec: 60,
      },
    ],
  },
  {
    id: 'preparation-cocon',
    title: 'Préparation cocon',
    previewText: 'Prépare ta chambre et crée un cocon douillet avant de te coucher.',
    scriptFileName: 'preparation-cocon.txt',
    durations: standardDurations,
    steps: [
      {
        id: 'cocon-rangement',
        title: 'Rangement express',
        description:
          'Range rapidement ce qui traîne, plie un vêtement, vide la poubelle si besoin. L’objectif : un espace dégagé.',
        durationSec: 120,
      },
      {
        id: 'cocon-lumiere',
        title: 'Ambiance douce',
        description:
          'Tamponne les lumières, aère deux minutes puis installe une source lumineuse tamisée ou une bougie.',
        durationSec: 120,
      },
      {
        id: 'cocon-literie',
        title: 'Préparer le lit',
        description:
          'Secoue la couette, lisse les draps et place ton oreiller comme tu l’aimes. Vérifie que tout est confortable.',
        durationSec: 120,
      },
      {
        id: 'cocon-soin',
        title: 'Soin détente',
        description:
          'Fais une courte routine soin : lavage de visage, crème hydratante, senteur légère sur l’oreiller.',
        durationSec: 120,
      },
      {
        id: 'cocon-deconnexion',
        title: 'Moment gratitude',
        description:
          'Assieds-toi sur le lit, remercie ta journée et prends trois respirations profondes avant de te glisser sous la couette.',
        durationSec: 120,
      },
    ],
  },
];

const isValidTemplate = (
  template: unknown
): template is RoutineTemplate & { durations: number[]; steps: RoutineStep[] } => {
  if (!template || typeof template !== 'object') return false;
  const t = template as any;
  return (
    typeof t.id === 'string' &&
    typeof t.title === 'string' &&
    typeof t.previewText === 'string' &&
    typeof t.scriptFileName === 'string' &&
    Array.isArray(t.durations) &&
    t.durations.length > 0 &&
    Array.isArray(t.steps) &&
    t.steps.length > 0 &&
    t.steps.every(
      (s: any) =>
        s &&
        typeof s.id === 'string' &&
        typeof s.title === 'string' &&
        typeof s.description === 'string' &&
        typeof s.durationSec === 'number'
    )
  );
};

export const loadRoutineTemplates = (): RoutineTemplate[] => {
  try {
    const stored = localStorage.getItem(ROUTINE_TEMPLATES_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as RoutineTemplate[];
      if (Array.isArray(parsed) && parsed.length && parsed.every((item) => isValidTemplate(item))) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Impossible de lire les routines enregistrées', error);
    // fallthrough to reset to defaults
  }

  localStorage.setItem(ROUTINE_TEMPLATES_KEY, JSON.stringify(defaultRoutineTemplates));
  return defaultRoutineTemplates;
};

export const saveRoutineTemplates = (templates: RoutineTemplate[]) => {
  localStorage.setItem(ROUTINE_TEMPLATES_KEY, JSON.stringify(templates));
};

export const loadActiveRoutine = (): ActiveRoutineStorage | null => {
  try {
    const stored = localStorage.getItem(ACTIVE_ROUTINE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as ActiveRoutineStorage;
  } catch (error) {
    console.error('Impossible de lire la routine active', error);
    return null;
  }
};

export const saveActiveRoutine = (routine: ActiveRoutineStorage | null) => {
  if (!routine) {
    localStorage.removeItem(ACTIVE_ROUTINE_KEY);
    return;
  }
  localStorage.setItem(ACTIVE_ROUTINE_KEY, JSON.stringify(routine));
};

export const loadCompletedRoutines = (): CompletedRoutineEntry[] => {
  try {
    const stored = localStorage.getItem(COMPLETED_ROUTINES_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored) as CompletedRoutineEntry[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch (error) {
    console.error('Impossible de lire les routines terminées', error);
    return [];
  }
};

export const saveCompletedRoutines = (entries: CompletedRoutineEntry[]) => {
  localStorage.setItem(COMPLETED_ROUTINES_KEY, JSON.stringify(entries));
};
