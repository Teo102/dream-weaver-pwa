import { useEffect, useMemo, useState } from 'react';
import { Pause, Play, Square, RotateCcw, FileText, Headphones } from 'lucide-react';
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
  const [scriptContent, setScriptContent] = useState<string>('');
  const [scriptLoading, setScriptLoading] = useState(false);
  const [scriptError, setScriptError] = useState<string | null>(null);

  useEffect(() => {
    setOpenAccordion(undefined);
    setScriptContent('');
    setScriptError(null);
    setScriptLoading(false);
  }, [template.id]);

  useEffect(() => {
    if (openAccordion === 'script' && !scriptContent && !scriptLoading) {
      const controller = new AbortController();
      setScriptLoading(true);
      setScriptError(null);
      fetch(`/docs/routines-scripts/${template.scriptFileName}`, { signal: controller.signal })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Le script est introuvable.');
          }
          return response.text();
        })
        .then((text) => {
          setScriptContent(text.trim());
        })
        .catch((error) => {
          if (error.name !== 'AbortError') {
            console.error(error);
            setScriptError("Impossible de charger le script pour le moment.");
          }
        })
        .finally(() => setScriptLoading(false));

      return () => controller.abort();
    }
  }, [openAccordion, scriptContent, scriptLoading, template.scriptFileName]);

  useEffect(() => {
    if (showCompletionDialog && openAccordion !== undefined) {
      setOpenAccordion(undefined);
    }
  }, [showCompletionDialog, openAccordion]);

  const formattedTime = useMemo(() => {
    const minutes = Math.max(0, Math.floor(remainingSec / 60));
    const seconds = Math.max(0, remainingSec % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [remainingSec]);

  const progress = useMemo(() => {
    if (!routine.durationSec) return 0;
    const clamped = Math.min(routine.durationSec, Math.max(0, routine.durationSec - remainingSec));
    return (clamped / routine.durationSec) * 100;
  }, [routine.durationSec, remainingSec]);

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm px-4 py-6 overflow-y-auto">
      <div className="mx-auto flex h-full w-full max-w-md flex-col gap-6">
        <header className="flex flex-col gap-1" aria-live="polite">
          <p className="text-sm font-medium text-primary">Routine en cours</p>
          <h2 className="text-2xl font-bold text-foreground">{template.title}</h2>
          <span className="text-sm text-muted-foreground">{isPaused ? 'En pause' : 'Temps restant'} — {formattedTime}</span>
        </header>

        <section className="rounded-3xl border border-primary/20 bg-card/80 p-8 text-center shadow-lg">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary/80">Timer</p>
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
                  <pre className="whitespace-pre-wrap font-sans text-sm text-foreground/90">
                    {scriptContent}
                  </pre>
                )}
                {!scriptLoading && !scriptError && !scriptContent && (
                  <p className="text-muted-foreground">Le script s’affichera ici.</p>
                )}
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
                Bravo, tu viens de prendre 10 minutes pour toi. Tu peux enregistrer cette routine ou la relancer.
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
