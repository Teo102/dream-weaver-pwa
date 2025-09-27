// src/components/routines/RoutineModal.tsx
import { useEffect, useMemo, useState } from 'react';
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
import { RoutineTemplate } from '@/utils/routinesStorage';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface RoutineModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template?: RoutineTemplate;
  onConfirm: (durationSec?: number) => void;
}

export const RoutineModal = ({ open, onOpenChange, template, onConfirm }: RoutineModalProps) => {
  const [selectedDuration, setSelectedDuration] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (template?.durations?.length) {
      setSelectedDuration(template.durations[0]);
    } else {
      setSelectedDuration(undefined);
    }
  }, [template]);

  const durationOptions = useMemo(() => {
    if (!template) return [];
    return (template.durations ?? []).map((duration) => ({
      value: duration,
      label: `${Math.round(duration / 60)} min`,
    }));
  }, [template]);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-sm rounded-2xl p-6">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-semibold">
            Lancer la routine ?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground">
            {durationOptions.length > 0
              ? 'Choisis la durée qui te convient : tu pourras mettre le minuteur en pause ou l’arrêter quand tu veux.'
              : 'Cette routine dure 10 minutes. Tu pourras la mettre en pause ou l’arrêter.'}
          </AlertDialogDescription>
          {template && (
            <p className="text-sm text-muted-foreground/90 mt-3">
              Routine sélectionnée : <span className="font-medium text-foreground">{template.title}</span>
            </p>
          )}

          {durationOptions.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium text-foreground">Durée de la routine</p>
              <RadioGroup
                value={String(selectedDuration ?? '')}
                onValueChange={(value) => setSelectedDuration(Number(value))}
                className="grid grid-cols-3 gap-2"
              >
                {durationOptions.map((option) => (
                  <Label key={option.value} htmlFor={`duration-${option.value}`} className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value={String(option.value)} id={`duration-${option.value}`} className="peer sr-only" />
                      <span className="block w-full rounded-xl border border-border bg-background px-3 py-2 text-center text-sm font-medium text-foreground transition-colors peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10">
                        {option.label}
                      </span>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
            </div>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-2 sm:space-x-0">
          <AlertDialogCancel className="flex-1 rounded-xl border-muted-foreground/20">
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            className="flex-1 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => onConfirm(selectedDuration)}
            disabled={!template}
          >
            Commencer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

