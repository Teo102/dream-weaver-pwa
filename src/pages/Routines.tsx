import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActiveRoutineStorage,
  CompletedRoutineEntry,
  RoutineTemplate,
  defaultRoutineTemplates,
  loadActiveRoutine,
  loadCompletedRoutines,
  loadRoutineTemplates,
  saveActiveRoutine,
  saveCompletedRoutines,
} from '@/utils/routinesStorage';
import { RoutineCard } from '@/components/routines/RoutineCard';
import { RoutineModal } from '@/components/routines/RoutineModal';
import { RoutineTimer } from '@/components/routines/RoutineTimer';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';

const ROUTINE_DURATION = 600; // 10 minutes

const computeRemaining = (routine: ActiveRoutineStorage) => {
  if (routine.paused) {
    return Math.max(0, Math.round(routine.remainingSec ?? routine.durationSec));
  }
  if (routine.endAt) {
    const remaining = Math.ceil((routine.endAt - Date.now()) / 1000);
    return remaining > 0 ? remaining : 0;
  }
  return routine.durationSec;
};

export const Routines = () => {
  const [templates, setTemplates] = useState<RoutineTemplate[]>(defaultRoutineTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<RoutineTemplate | null>(null);
  const [activeRoutine, setActiveRoutine] = useState<ActiveRoutineStorage | null>(null);
  const [remainingSec, setRemainingSec] = useState<number>(ROUTINE_DURATION);
  const [completedRoutines, setCompletedRoutines] = useState<CompletedRoutineEntry[]>([]);
  const [showStartModal, setShowStartModal] = useState(false);
  const [showStopDialog, setShowStopDialog] = useState(false);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);

  const activeTemplate = useMemo(() => {
    if (!activeRoutine) return null;
    return templates.find((template) => template.id === activeRoutine.id) ?? null;
  }, [activeRoutine, templates]);

  const hydrateFromStorage = useCallback(() => {
    const storedTemplates = loadRoutineTemplates();
    setTemplates(storedTemplates);

    const storedCompleted = loadCompletedRoutines();
    setCompletedRoutines(storedCompleted);

    const storedActive = loadActiveRoutine();
    if (storedActive) {
      const remaining = computeRemaining(storedActive);
      if (remaining <= 0) {
        // Routine finished while away
        saveActiveRoutine(null);
        setActiveRoutine({ ...storedActive, paused: true, endAt: undefined, remainingSec: 0 });
        setRemainingSec(0);
        setShowCompletionDialog(true);
        return;
      }
      setActiveRoutine(storedActive);
      setRemainingSec(remaining);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    hydrateFromStorage();
  }, [hydrateFromStorage]);

  const openStartModal = (template: RoutineTemplate) => {
    setSelectedTemplate(template);
    setShowStartModal(true);
  };

  const startRoutine = useCallback(
    (template: RoutineTemplate) => {
      const endAt = Date.now() + ROUTINE_DURATION * 1000;
      const routine: ActiveRoutineStorage = {
        id: template.id,
        title: template.title,
        durationSec: ROUTINE_DURATION,
        endAt,
        paused: false,
        startedAt: Date.now(),
      };

      saveActiveRoutine(routine);
      setActiveRoutine(routine);
      setRemainingSec(ROUTINE_DURATION);
      setShowStartModal(false);
      setShowCompletionDialog(false);
      setShowStopDialog(false);
    },
    []
  );

  const pauseRoutine = () => {
    if (!activeRoutine) return;
    const currentRemaining = computeRemaining(activeRoutine);
    const updated: ActiveRoutineStorage = {
      ...activeRoutine,
      paused: true,
      remainingSec: currentRemaining,
      endAt: undefined,
    };
    setActiveRoutine(updated);
    setRemainingSec(currentRemaining);
    saveActiveRoutine(updated);
  };

  const resumeRoutine = () => {
    if (!activeRoutine) return;
    const remaining = activeRoutine.remainingSec ?? remainingSec;
    const endAt = Date.now() + remaining * 1000;
    const updated: ActiveRoutineStorage = {
      ...activeRoutine,
      paused: false,
      endAt,
      remainingSec: undefined,
    };
    setActiveRoutine(updated);
    saveActiveRoutine(updated);
  };

  const requestStop = () => {
    pauseRoutine();
    setShowStopDialog(true);
  };

  const abandonRoutine = () => {
    setShowStopDialog(false);
    setActiveRoutine(null);
    setRemainingSec(ROUTINE_DURATION);
    saveActiveRoutine(null);
  };

  const handleRoutineFinished = useCallback(() => {
    if (!activeRoutine) return;
    setRemainingSec(0);
    const updated: ActiveRoutineStorage = {
      ...activeRoutine,
      paused: true,
      remainingSec: 0,
      endAt: undefined,
    };
    setActiveRoutine(updated);
    saveActiveRoutine(null);
    setShowCompletionDialog(true);
  }, [activeRoutine]);

  useEffect(() => {
    if (!activeRoutine || activeRoutine.paused) return;
    if (!activeRoutine.endAt) return;

    const tick = () => {
      const remaining = computeRemaining(activeRoutine);
      setRemainingSec(remaining);
      if (remaining <= 0) {
        handleRoutineFinished();
      }
    };

    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, [activeRoutine, handleRoutineFinished]);

  const confirmStopAsComplete = () => {
    setShowStopDialog(false);
    setRemainingSec(0);
    if (activeRoutine) {
      const updated: ActiveRoutineStorage = {
        ...activeRoutine,
        paused: true,
        remainingSec: 0,
        endAt: undefined,
      };
      setActiveRoutine(updated);
    }
    saveActiveRoutine(null);
    setShowCompletionDialog(true);
  };

  const recordCompletion = useCallback(() => {
    if (!activeRoutine) return;
    const entry: CompletedRoutineEntry = {
      id: activeRoutine.id,
      title: activeRoutine.title,
      completedAt: new Date().toISOString(),
    };
    const updated = [...completedRoutines, entry];
    setCompletedRoutines(updated);
    saveCompletedRoutines(updated);
    setShowCompletionDialog(false);
    setShowStopDialog(false);
    setActiveRoutine(null);
    setRemainingSec(ROUTINE_DURATION);
  }, [activeRoutine, completedRoutines]);

  const restartRoutine = () => {
    const templateToRestart = activeTemplate ?? selectedTemplate;
    setShowCompletionDialog(false);
    if (templateToRestart) {
      startRoutine(templateToRestart);
    } else if (selectedTemplate) {
      startRoutine(selectedTemplate);
    } else {
      setActiveRoutine(null);
      setRemainingSec(ROUTINE_DURATION);
    }
  };

  const formattedHistory = useMemo(
    () =>
      completedRoutines
        .slice()
        .reverse()
        .map((entry) => ({
          ...entry,
          formattedDate: format(new Date(entry.completedAt), "d MMMM yyyy 'à' HH:mm", {
            locale: fr,
          }),
        })),
    [completedRoutines]
  );

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col gap-6 bg-background px-4 py-8">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">Sleep Reminder</p>
        <h1 className="text-3xl font-bold text-foreground">Routines du soir</h1>
        <p className="text-sm text-muted-foreground">
          Choisis une routine de 10 minutes pour préparer ton corps et ton esprit au sommeil. Toutes les actions
          sont sauvegardées sur ton appareil.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        {templates.map((template) => (
          <RoutineCard key={template.id} template={template} onStart={openStartModal} />
        ))}
      </section>

      <section className="rounded-3xl border border-border/60 bg-muted/30 p-5">
        <h2 className="text-lg font-semibold text-foreground">Historique rapide</h2>
        {formattedHistory.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">
            Aucune routine complétée pour le moment. Lance-toi ce soir !
          </p>
        ) : (
          <ul className="mt-3 space-y-3 text-sm">
            {formattedHistory.slice(0, 5).map((entry) => (
              <li
                key={`${entry.id}-${entry.completedAt}`}
                className={cn(
                  'rounded-2xl border border-primary/10 bg-background/80 px-4 py-3 shadow-sm',
                  'flex flex-col gap-1'
                )}
              >
                <span className="font-medium text-foreground">{entry.title}</span>
                <span className="text-xs text-muted-foreground">{entry.formattedDate}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <RoutineModal
        open={showStartModal}
        onOpenChange={setShowStartModal}
        template={selectedTemplate ?? undefined}
        onConfirm={() => {
          if (selectedTemplate) {
            startRoutine(selectedTemplate);
          }
        }}
      />

      {activeRoutine && activeTemplate && (
        <RoutineTimer
          routine={activeRoutine}
          template={activeTemplate}
          remainingSec={remainingSec}
          isPaused={Boolean(activeRoutine.paused)}
          onPause={pauseRoutine}
          onResume={resumeRoutine}
          onRequestStop={requestStop}
          onStopDialogChange={setShowStopDialog}
          onConfirmStopComplete={confirmStopAsComplete}
          onConfirmStopAbandon={abandonRoutine}
          showStopDialog={showStopDialog}
          showCompletionDialog={showCompletionDialog}
          onCompletionDialogChange={setShowCompletionDialog}
          onConfirmCompleted={recordCompletion}
          onRestart={restartRoutine}
        />
      )}
    </div>
  );
};
