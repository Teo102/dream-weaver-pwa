export const ROUTINE_TEMPLATES_KEY = 'routinesTemplates';
export const ACTIVE_ROUTINE_KEY = 'activeRoutine';
export const COMPLETED_ROUTINES_KEY = 'completedRoutines';

export interface RoutineTemplate {
  id: string;
  title: string;
  previewText: string;
  scriptFileName: string;
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

export const defaultRoutineTemplates: RoutineTemplate[] = [
  {
    id: 'respiration-relax',
    title: 'Respiration relax',
    previewText: 'Respire profondément et relâche les tensions en dix minutes apaisantes.',
    scriptFileName: 'respiration-relax.txt',
  },
  {
    id: 'etirements-doux',
    title: 'Étirements doux',
    previewText: 'Séquence lente pour détendre le corps et préparer les muscles au repos.',
    scriptFileName: 'etirements-doux.txt',
  },
  {
    id: 'deconnexion-numerique',
    title: 'Déconnexion numérique',
    previewText: 'Rituel sans écran pour décrocher mentalement avant d’aller dormir.',
    scriptFileName: 'deconnexion-numerique.txt',
  },
  {
    id: 'journal-calme',
    title: 'Journal calme',
    previewText: 'Prends un carnet et couche tes pensées pour apaiser ton esprit.',
    scriptFileName: 'journal-calme.txt',
  },
  {
    id: 'relaxation-guidee',
    title: 'Relaxation guidée',
    previewText: 'Balayage corporel et visualisation pour relâcher chaque zone du corps.',
    scriptFileName: 'relaxation-guidee.txt',
  },
  {
    id: 'preparation-cocon',
    title: 'Préparation cocon',
    previewText: 'Prépare ta chambre et crée un cocon douillet avant de te coucher.',
    scriptFileName: 'preparation-cocon.txt',
  },
];

export const loadRoutineTemplates = (): RoutineTemplate[] => {
  try {
    const stored = localStorage.getItem(ROUTINE_TEMPLATES_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as RoutineTemplate[];
      if (Array.isArray(parsed) && parsed.length) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Impossible de lire les routines enregistrées', error);
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
