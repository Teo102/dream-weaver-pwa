// src/components/routines/RoutineTimer.tsx
import { useEffect, useMemo, useState } from 'react';
import {
  Pause,
  Play,
  Square,
  RotateCcw,
  ListChecks,
  FileText,
  Headphones,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ActiveRoutineStorage, RoutineTemplate } from '@/utils/routinesStorage';

interface RoutineTimerProps {
  routine: ActiveRoutineStorage;
  template: RoutineTemplate;
  remainingSec: number;
  isPaused: boolean;
  onPause: () => void;
  onResume: () => void;
  onRequestStop: () => void;
  onStopDialogChange: (open: boolean) => void;
  onConfirmStopComplete: () => void;
  onConfirmStopAbandon: () => void;
  showStopDialog: boolean;
  showCompletionDialog: boolean;
  onCompletionDialogChange: (open: boolean) => void;
  onConfirmCompleted: () => void;
  onRestart: () => void;
}

const formatTime = (value: number) => {
  const minutes = Math.max(0, Math.floor(value / 60));
  const seconds = Math.max(0, Math.floor(value % 60));
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const RoutineTimer = ({
  routine,
  template,
  remainingSec,
  isPaused,
  onPause,
  onResume,
  onRequestStop,
  onStopDialogChange,
  onConfirmStopComplete,
  onConfirmStopAbandon,
  showStopDialog,
  showCompletionDialog,
  onCompletionDialogChange,
  onConfirmCompleted,
  onRestart,
}: RoutineTimerProps) => {
  const [openAccordion, setOpenAccordion] = useState<string | undefined>(undefined);

  // Script loading state (lazy load from public/docs)
  const [scriptContent, setScriptContent] = useState<string>('');
  const [scriptLoading, setScriptLoading] = useState(false);
  const [scriptError, setScriptError] = useState<string | null>(null);

  // Reset accordion & script when template changes
  useEffect(() => {
    setOpenAccordion(undefined);
    setScriptContent('');
    setScriptLoading(false);
    setScriptError(null);
  }, [template.id]);

  // Lazy fetch script when user opens the script accordion
  useEffect(() => {
    if (openAccordion !== 'script' || scriptContent || scriptLoading) return;

    const controller = new AbortController();
    setScriptLoading(true);
    setScriptError(null);

    fetch(`/docs/routines-scripts/${template.scriptFileName}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Le script est introuvable.');
        return res.text();
      })
      .then((text) => setScriptContent(text.trim()))
      .catch((err: any) => {
        if (err.name !== 'AbortError') {
          console.error(err);
          setScriptError("Impossible de charger le script pour le moment.");
        }
      })
      .finally(() => setScriptLoading(false));

    return () => controller.abort();
  }, [openAccordion, scriptContent, scriptLoading, template.scriptFileName]);

  // Close accordion when completion dialog opens
  useEffect(() => {
    if (showCompletionDialog && openAccordion !== undefined) {
      setOpenAccordion(undefined);
    }
  }, [showCompletionDialog, openAccordion]);

  const formattedTime = useMemo(() => formatTime(remainingSec), [remainingSec]);

  // elapsed seconds since routine started
  const elapsedSec = useMemo(() => Math.max(0, (routine.durationSec ?? 0) - remainingSec), [
    routine.durationSec,
    remainingSec,
  ]);

  // Compute scaled steps, cumulative start/end, active step and progress
  const {
    states: stepStates,
    activeIndex,
    activeStep,
    activeStepElapsed,
    activeStepRemaining,
    progress,
  } = useMemo(() => {
    const steps = (template.steps ?? []).map((s: any) => ({ ...s }));
    const result = {
      states: [] as Array<any>,
      activeIndex: -1,
      activeStep: null as any | null,
      activeStepElapsed: 0,
      activeStepRemaining: 0,
      progress: 0,
    };

    const totalTarget = routine.durationSec && routine.durationSec > 0 ? routine.durationSec : 600;
    if (!steps.length) {
      result.progress =
        routine.durationSec && routine.durationSec > 0
          ? (Math.min(routine.durationSec, Math.max(0, routine.durationSec - remainingSec)) / routine.durationSec) * 100
          : 0;
      return result;
    }

    const baseTotal = steps.reduce((acc, s) => acc + (s.durationSec ?? 0), 0);
    const stepsCount = steps.length;
    const minPerStep = 30; // seconds
    const minimumTotal = minPerStep * stepsCount;
    const adjustablePool = Math.max(totalTarget - minimumTotal, 0);

    let allocatedPool = 0;
    const scaled = steps.map((step, idx) => {
      const ratio = baseTotal ? ((step.durationSec ?? 0) / baseTotal) : 1 / stepsCount;
      let adjustableShare = Math.round(adjustablePool * ratio);
      if (idx === stepsCount - 1) {
        adjustableShare = adjustablePool - allocatedPool;
      } else if (allocatedPool + adjustableShare > adjustablePool) {
        adjustableShare = Math.max(0, adjustablePool - allocatedPool);
      }
      allocatedPool += adjustableShare;

      const scaledDurationSec = Math.max(minPerStep, minPerStep + adjustableShare);
      return { ...step, scaledDurationSec };
    });

    // build cumulative states
    let cumulative = 0;
    const states = scaled.map((s) => {
      const start = cumulative;
      const end = start + (s.scaledDurationSec ?? minPerStep);
      cumulative = end;
      return { ...s, start, end };
    });

    // determine active index
    let idxActive = -1;
    for (let i = 0; i < states.length; i++) {
      const st = states[i];
      if (elapsedSec >= st.start && elapsedSec < st.end) {
        idxActive = i;
        break;
      }
    }
    if (idxActive === -1 && states.length) {
      idxActive = states.length - 1;
    }

    const aStep = idxActive >= 0 ? states[idxActive] : null;
    const aElapsed = aStep ? Math.max(0, elapsedSec - aStep.start) : 0;
    const aRemaining = aStep ? Math.max(0, aStep.end - elapsedSec) : 0;

    result.states = states;
    result.activeIndex = idxActive;
    result.activeStep = aStep;
    result.activeStepElapsed = aElapsed;
    result.activeStepRemaining = aRemaining;
    result.progress =
      routine.durationSec && routine.durationSec > 0
        ? (Math.min(routine.durationSec, Math.max(0, routine.durationSec - remainingSec)) / routine.durationSec) * 100
        : 0;

    return result;
  }, [template.steps, routine.durationSec, remainingSec, elapsedSec]);

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm px-4 py-6 overflow-y-auto">
      <div className="mx-auto flex h-full w-full max-w-2xl flex-col gap-6">
        <header className="flex flex-col gap-1" aria-live="polite">
          <p className="text-sm font-medium text-primary">Routine en cours</p>
          <h2 className="text-2xl font-bold text-foreground">{template.title}</h2>
          <span className="text-sm text-muted-foreground">{isPaused ? 'En pause' : 'Temps restant'} — {formattedTime}</span>
          {activeStep && (
            <span className="text-xs text-muted-foreground" aria-live="polite">
              Étape actuelle : {activeStep.title} ({formatTime(activeStepRemaining)} restantes)
            </span>
          )}
        </header>

        <section className="rounded-3xl border border-primary/20 bg-card/80 p-8 text-center shadow-lg">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary/80">Minuteur</p>
          <div className="mt-4 text-6xl font-mono font-bold text-foreground" aria-live="assertive">
            {formattedTime}
          </div>
          <Progress value={progress} className="mt-6 h-3" aria-hidden="true" />
          <div className="mt-6 flex flex-col gap-3">
            {isPaused ? (
              <Button size="lg" className="w-full py-4 text-lg" onClick={onResume} aria-label="Reprendre la routine">
                <Play className="mr-2 h-5 w-5" aria-hidden="true" />
                Reprendre
              </Button>
            ) : (
              <Button size="lg" className="w-full py-4 text-lg" onClick={onPause} aria-label="Mettre la routine en pause">
                <Pause className="mr-2 h-5 w-5" aria-hidden="true" />
                Pause
              </Button>
            )}
            <Button variant="outline" size="lg" className="w-full py-4 text-lg" onClick={onRequestStop} aria-label="Arrêter la routine">
              <Square className="mr-2 h-5 w-5" aria-hidden="true" />
              Arrêter
            </Button>
          </div>
        </section>

        <section className="space-y-4 rounded-3xl border border-border/60 bg-muted/40 p-5">
          <h3 className="text-base font-semibold text-foreground">Contenus de la routine</h3>

          <Accordion
            type="single"
            collapsible
            value={openAccordion}
            onValueChange={(value) => {
              if (!value) {
                setOpenAccordion(undefined);
                return;
              }
              setOpenAccordion((prev) => (prev === value ? undefined : value));
            }}
            className="w-full"
          >
            <AccordionItem value="steps" className="border-none">
              <AccordionTrigger className="rounded-2xl bg-background px-4 py-3 text-left text-sm font-medium">
                <span className="inline-flex items-center gap-2">
                  <ListChecks className="h-4 w-4" aria-hidden="true" />
                  Voir le déroulé
                </span>
              </AccordionTrigger>
              <AccordionContent className="rounded-2xl bg-background px-4 py-3 text-sm leading-relaxed text-foreground">
                {stepStates && stepStates.length > 0 ? (
                  <ol className="space-y-3">
                    {stepStates.map((step, index) => {
                      const isActive = index === activeIndex;
                      const isCompleted = elapsedSec >= step.end;
                      const stepElapsed = isActive ? activeStepElapsed : isCompleted ? step.scaledDurationSec : 0;
                      const stepRemaining = isActive ? activeStepRemaining : isCompleted ? 0 : step.scaledDurationSec;

                      return (
                        <li
                          key={step.id ?? index}
                          className={
                            'rounded-2xl border px-4 py-3 transition-colors ' +
                            (isActive ? 'border-primary bg-primary/10' : isCompleted ? 'border-border/70 bg-background' : 'border-border/60 bg-background/60')
                          }
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold text-foreground">
                                Étape {index + 1} — {step.title}
                              </p>
                              {step.description && <p className="mt-1 text-xs text-muted-foreground">{step.description}</p>}
                            </div>
                            <div className="text-right text-xs font-medium text-muted-foreground">
                              <p>Durée : {Math.round((step.scaledDurationSec ?? 0) / 60)} min</p>
                              <p>
                                {isCompleted
                                  ? 'Terminé'
                                  : isActive
                                  ? `${formatTime(stepElapsed)} / ${formatTime(step.scaledDurationSec ?? 0)}`
                                  : `${formatTime(stepRemaining)}`}
                              </p>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                ) : (
                  <p className="text-muted-foreground">Aucun déroulé détaillé disponible pour cette routine.</p>
                )}
              </AccordionContent>
            </AccordionItem>

            {/* Script (raw text file) */}
            <AccordionItem value="script" className="border-none">
              <AccordionTrigger className="rounded-2xl bg-background px-4 py-3 text-left text-sm font-medium">
                <span className="inline-flex items-center gap-2">
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  Voir le script
                </span>
              </AccordionTrigger>
              <AccordionContent className="rounded-2xl bg-background px-4 py-3 text-sm leading-relaxed text-foreground">
                {scriptLoading && <p>Chargement…</p>}
                {scriptError && <p className="text-destructive">{scriptError}</p>}
                {!scriptLoading && !scriptError && scriptContent && (
                  <pre className="whitespace-pre-wrap font-sans text-sm text-foreground/90">{scriptContent}</pre>
                )}
                {!scriptLoading && !scriptError && !scriptContent && (
                  <p className="text-muted-foreground">Le script s'affichera ici lorsque tu l'ouvriras.</p>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button variant="outline" disabled className="w-full justify-center gap-2 rounded-2xl border-dashed py-3 text-sm text-muted-foreground">
            <Headphones className="h-4 w-4" aria-hidden="true" />
            Télécharger l'audio (bientôt)
          </Button>
        </section>

        {/* Stop dialog */}
        <AlertDialog open={showStopDialog} onOpenChange={onStopDialogChange}>
          <AlertDialogContent className="max-w-sm rounded-2xl p-6">
            <AlertDialogHeader>
              <AlertDialogTitle>Arrêter la routine ?</AlertDialogTitle>
              <AlertDialogDescription>
                Tu peux soit la terminer maintenant, soit l'abandonner et recommencer plus tard.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex gap-2 sm:space-x-0">
              <AlertDialogCancel className="flex-1 rounded-xl border-muted-foreground/20" onClick={onResume}>
                Reprendre
              </AlertDialogCancel>
              <AlertDialogAction className="flex-1 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90" onClick={onConfirmStopComplete}>
                Terminer
              </AlertDialogAction>
              <Button variant="ghost" className="flex-1 rounded-xl text-destructive hover:text-destructive" onClick={onConfirmStopAbandon}>
                Abandonner
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Completion dialog */}
        <AlertDialog open={showCompletionDialog} onOpenChange={onCompletionDialogChange}>
          <AlertDialogContent className="max-w-sm rounded-2xl p-6 text-center">
            <AlertDialogHeader>
              <RotateCcw className="mx-auto h-12 w-12 text-primary" aria-hidden="true" />
              <AlertDialogTitle className="mt-3 text-2xl font-bold">Routine terminée !</AlertDialogTitle>
              <AlertDialogDescription>
                Bravo, tu viens de prendre {Math.round((routine.durationSec ?? 600) / 60)} minutes pour toi. Tu peux enregistrer cette routine ou la relancer.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex flex-col gap-3">
              <AlertDialogAction className="w-full rounded-xl bg-primary text-primary-foreground py-3 text-base" onClick={onConfirmCompleted}>
                Marquer comme complétée
              </AlertDialogAction>
              <Button variant="outline" className="w-full rounded-xl py-3 text-base" onClick={onRestart}>
                Refaire la routine
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
