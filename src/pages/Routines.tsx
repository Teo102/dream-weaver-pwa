// src/pages/Routines.tsx
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

const ROUTINE_DURATION = 600; // 10 minutes (fallback)

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

const notifyActiveRoutineChange = (hasActive: boolean) => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('routine:active-change', { detail: { hasActive } }));
};

export const Routines = () => {
  const [templates, setTemplates] = useState<RoutineTemplate[]>(defaultRoutineTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<RoutineTemplate | null>(null);
  const [activeRoutine, setActiveRoutine] = useState<ActiveRoutineStorage | null>(null);

  const initialDuration =
    defaultRoutineTemplates[0]?.durations?.[0] ??
    ROUTINE_DURATION;

  const [remainingSec, setRemainingSec] = useState<number>(initialDuration);

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
        saveActiveRoutine(null);
        setActiveRoutine({ ...storedActive, paused: true, endAt: undefined, remainingSec: 0 });
        setRemainingSec(0);
        setShowCompletionDialog(true);
        notifyActiveRoutineChange(false);
        return;
      }
      setActiveRoutine(storedActive);
      setRemainingSec(remaining);
      notifyActiveRoutineChange(true);
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

  const startRoutine = useCallback((template: RoutineTemplate, durationSec?: number) => {
    const duration = durationSec ?? template.durations?.[0] ?? ROUTINE_DURATION;
    const endAt = Date.now() + duration * 1000;
    const routine: ActiveRoutineStorage = {
      id: template.id,
      title: template.title,
      durationSec: duration,
      endAt,
      paused: false,
      startedAt: Date.now(),
    };

    saveActiveRoutine(routine);
    setActiveRoutine(routine);
    setRemainingSec(duration);
    setShowStartModal(false);
    setShowCompletionDialog(false);
    setShowStopDialog(false);
    notifyActiveRoutineChange(true);
  }, []);

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
    notifyActiveRoutineChange(true);
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
    notifyActiveRoutineChange(true);
  };

  const requestStop = () => {
    pauseRoutine();
    setShowStopDialog(true);
  };

  const abandonRoutine = () => {
    setShowStopDialog(false);
    setActiveRoutine(null);

    const defaultSec =
      selectedTemplate?.durations?.[0] ?? templates[0]?.durations?.[0] ?? ROUTINE_DURATION;
    setRemainingSec(defaultSec);

    saveActiveRoutine(null);
    notifyActiveRoutineChange(false);
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
    notifyActiveRoutineChange(false);
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
    notifyActiveRoutineChange(false);
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

    const defaultSec =
      selectedTemplate?.durations?.[0] ?? templates[0]?.durations?.[0] ?? ROUTINE_DURATION;
    setRemainingSec(defaultSec);

    notifyActiveRoutineChange(false);
  }, [activeRoutine, completedRoutines, selectedTemplate, templates]);

  const restartRoutine = () => {
    const templateToRestart = activeTemplate ?? selectedTemplate;
    setShowCompletionDialog(false);
    if (templateToRestart) {
      const prevDuration = activeRoutine?.durationSec ?? templateToRestart.durations?.[0] ?? ROUTINE_DURATION;
      startRoutine(templateToRestart, prevDuration);
    } else if (selectedTemplate) {
      startRoutine(selectedTemplate, selectedTemplate.durations?.[0]);
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
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 bg-background px-4 py-10 sm:px-6 lg:px-12">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">Sleep Reminder</p>
        <h1 className="text-3xl font-bold text-foreground">Routines du soir</h1>
        <p className="text-sm text-muted-foreground">
          Choisis une routine guidée, personnalise sa durée et laisse-toi guider étape par étape. Toutes les actions
          sont sauvegardées sur ton appareil.
        </p>
      </header>

      <section className="grid gap-5 md:grid-cols-2">
        {templates.map((template) => (
          <RoutineCard key={template.id} template={template} onStart={openStartModal} />
        ))}
      </section>

      <section className="rounded-3xl border border-border/60 bg-muted/30 p-5">
        <h2 className="text-lg font-semibold text-foreground">Historique rapide</h2>
        {formattedHistory.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">Aucune routine complétée pour le moment. Lance-toi ce soir !</p>
        ) : (
          <ul className="mt-3 space-y-3 text-sm">
            {formattedHistory.slice(0, 5).map((entry) => (
              <li
                key={`${entry.id}-${entry.completedAt}`}
                className={cn('rounded-2xl border border-primary/10 bg-background/80 px-4 py-3 shadow-sm', 'flex flex-col gap-1')}
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
        onConfirm={(duration) => {
          if (selectedTemplate) {
            startRoutine(selectedTemplate, duration);
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

export default Routines;
