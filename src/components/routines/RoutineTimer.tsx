import { useEffect, useMemo, useState } from 'react';
import { Pause, Play, Square, RotateCcw, ListChecks, Headphones } from 'lucide-react';
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
  const [openAccordion, setOpenAccordion] = useState<string | undefined>();
  useEffect(() => {
    setOpenAccordion(undefined);
  }, [template.id]);

  useEffect(() => {
    if (showCompletionDialog && openAccordion !== undefined) {
      setOpenAccordion(undefined);
    }
  }, [showCompletionDialog, openAccordion]);

  const formatTime = (value: number) => {
    const minutes = Math.max(0, Math.floor(value / 60));
    const seconds = Math.max(0, value % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const formattedTime = useMemo(() => formatTime(remainingSec), [remainingSec]);

  const baseTotalDuration = useMemo(
    () => template.steps.reduce((acc, step) => acc + step.durationSec, 0),
    [template.steps]
  );

  const scaledSteps = useMemo(() => {
    if (!template.steps.length) return [];
    const total = routine.durationSec;
    const stepsCount = template.steps.length;
    const minPerStep = 30;
    const minimumTotal = minPerStep * stepsCount;
    const adjustablePool = Math.max(total - minimumTotal, 0);
    let allocatedPool = 0;

    return template.steps.map((step, index) => {
      const ratio = baseTotalDuration ? step.durationSec / baseTotalDuration : 0;
      let adjustableShare = Math.round(adjustablePool * ratio);
      if (index === stepsCount - 1) {
        adjustableShare = adjustablePool - allocatedPool;
      } else if (allocatedPool + adjustableShare > adjustablePool) {
        adjustableShare = Math.max(0, adjustablePool - allocatedPool);
      }
      allocatedPool += adjustableShare;

      const scaled = minPerStep + adjustableShare;
      return {
        ...step,
        scaledDurationSec: Math.max(minPerStep, scaled),
      };
    });
  }, [baseTotalDuration, routine.durationSec, template.steps]);

  const elapsedSec = Math.max(0, routine.durationSec - remainingSec);

  const stepStates = useMemo(() => {
    let cumulative = 0;
    let activeIndex = -1;
    const states = scaledSteps.map((step, index) => {
      const start = cumulative;
      const end = start + step.scaledDurationSec;
      cumulative = end;
      if (elapsedSec >= start && elapsedSec < end && activeIndex === -1) {
        activeIndex = index;
      }
      return {
        ...step,
        start,
        end,
      };
    });

    if (activeIndex === -1 && states.length) {
      activeIndex = states.length - 1;
    }

    return {
      states,
      activeIndex,
    };
  }, [elapsedSec, scaledSteps]);

  const activeStep = stepStates.activeIndex >= 0 ? stepStates.states[stepStates.activeIndex] : null;
  const activeStepRemaining = activeStep ? Math.max(0, activeStep.end - elapsedSec) : 0;
  const activeStepElapsed = activeStep ? Math.max(0, elapsedSec - activeStep.start) : 0;

  const progress = useMemo(() => {
    if (!routine.durationSec) return 0;
    const clamped = Math.min(routine.durationSec, Math.max(0, routine.durationSec - remainingSec));
    return (clamped / routine.durationSec) * 100;
  }, [routine.durationSec, remainingSec]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-background/95 px-4 py-6 backdrop-blur-sm">
      <div className="mx-auto flex h-full w-full max-w-2xl flex-col gap-6">
        <header className="flex flex-col gap-1" aria-live="polite">
          <p className="text-sm font-medium text-primary">Routine en cours</p>
          <h2 className="text-2xl font-bold text-foreground">{template.title}</h2>
          <span className="text-sm text-muted-foreground">
            {isPaused ? 'En pause' : 'Temps restant'} — {formattedTime}
          </span>
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
              <Button
                size="lg"
                className="w-full py-4 text-lg"
                onClick={onResume}
                aria-label="Reprendre la routine"
              >
                <Play className="mr-2 h-5 w-5" aria-hidden="true" />
                Reprendre
              </Button>
            ) : (
              <Button
                size="lg"
                className="w-full py-4 text-lg"
                onClick={onPause}
                aria-label="Mettre la routine en pause"
              >
                <Pause className="mr-2 h-5 w-5" aria-hidden="true" />
                Pause
              </Button>
            )}
            <Button
              variant="outline"
              size="lg"
              className="w-full py-4 text-lg"
              onClick={onRequestStop}
              aria-label="Arrêter la routine"
            >
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
                <ol className="space-y-3">
                  {stepStates.states.map((step, index) => {
                    const isActive = index === stepStates.activeIndex;
                    const isCompleted = elapsedSec >= step.end;
                    const stepElapsed = isActive ? activeStepElapsed : isCompleted ? step.scaledDurationSec : 0;
                    const stepRemaining = isActive
                      ? activeStepRemaining
                      : isCompleted
                      ? 0
                      : step.scaledDurationSec;

                    return (
                      <li
                        key={step.id}
                        className={
                          'rounded-2xl border px-4 py-3 transition-colors ' +
                          (isActive
                            ? 'border-primary bg-primary/10'
                            : isCompleted
                            ? 'border-border/70 bg-background'
                            : 'border-border/60 bg-background/60')
                        }
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              Étape {index + 1} — {step.title}
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">{step.description}</p>
                          </div>
                          <div className="text-right text-xs font-medium text-muted-foreground">
                            <p>Durée : {Math.round(step.scaledDurationSec / 60)} min</p>
                            <p>
                              {isCompleted
                                ? 'Terminé'
                                : isActive
                                ? `${formatTime(stepElapsed)} / ${formatTime(step.scaledDurationSec)}`
                                : `${formatTime(stepRemaining)}`}
                            </p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Button
            variant="outline"
            disabled
            className="w-full justify-center gap-2 rounded-2xl border-dashed py-3 text-sm text-muted-foreground"
          >
            <Headphones className="h-4 w-4" aria-hidden="true" />
            Télécharger l’audio (bientôt)
          </Button>
        </section>

        <AlertDialog open={showStopDialog} onOpenChange={onStopDialogChange}>
          <AlertDialogContent className="max-w-sm rounded-2xl p-6">
            <AlertDialogHeader>
              <AlertDialogTitle>Arrêter la routine ?</AlertDialogTitle>
              <AlertDialogDescription>
                Tu peux soit la terminer maintenant, soit l’abandonner et recommencer plus tard.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex gap-2 sm:space-x-0">
              <AlertDialogCancel
                className="flex-1 rounded-xl border-muted-foreground/20"
                onClick={onResume}
              >
                Reprendre
              </AlertDialogCancel>
              <AlertDialogAction
                className="flex-1 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={onConfirmStopComplete}
              >
                Terminer
              </AlertDialogAction>
              <Button
                variant="ghost"
                className="flex-1 rounded-xl text-destructive hover:text-destructive"
                onClick={onConfirmStopAbandon}
              >
                Abandonner
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={showCompletionDialog} onOpenChange={onCompletionDialogChange}>
          <AlertDialogContent className="max-w-sm rounded-2xl p-6 text-center">
            <AlertDialogHeader>
              <RotateCcw className="mx-auto h-12 w-12 text-primary" aria-hidden="true" />
              <AlertDialogTitle className="mt-3 text-2xl font-bold">Routine terminée !</AlertDialogTitle>
              <AlertDialogDescription>
                Bravo, tu viens de prendre {Math.round(routine.durationSec / 60)} minutes pour toi. Tu peux
                enregistrer cette routine ou la relancer.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex flex-col gap-3">
              <AlertDialogAction
                className="w-full rounded-xl bg-primary text-primary-foreground py-3 text-base"
                onClick={onConfirmCompleted}
              >
                Marquer comme complétée
              </AlertDialogAction>
              <Button
                variant="outline"
                className="w-full rounded-xl py-3 text-base"
                onClick={onRestart}
              >
                Refaire la routine
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
