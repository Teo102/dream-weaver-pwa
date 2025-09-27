 codex/add-sleep-reminder-features-r1wbd3

// src/components/routines/RoutineModal.tsx
 main
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
 codex/add-sleep-reminder-features-r1wbd3
  onConfirm: (durationSec: number) => void;
}

export const RoutineModal = ({ open, onOpenChange, template, onConfirm }: RoutineModalProps) => {
  const [selectedDuration, setSelectedDuration] = useState<number>(template?.durations?.[0] ?? 600);

  onConfirm: (durationSec?: number) => void;
}

export const RoutineModal = ({ open, onOpenChange, template, onConfirm }: RoutineModalProps) => {
  const [selectedDuration, setSelectedDuration] = useState<number | undefined>(undefined);
 main

  useEffect(() => {
    if (template?.durations?.length) {
      setSelectedDuration(template.durations[0]);
 codex/add-sleep-reminder-features-r1wbd3

    } else {
      setSelectedDuration(undefined);
 main
    }
  }, [template]);

  const durationOptions = useMemo(() => {
    if (!template) return [];
 codex/add-sleep-reminder-features-r1wbd3
    return template.durations.map((duration) => ({

    return (template.durations ?? []).map((duration) => ({
 main
      value: duration,
      label: `${Math.round(duration / 60)} min`,
    }));
  }, [template]);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-sm rounded-2xl p-6">
        <AlertDialogHeader>
 codex/add-sleep-reminder-features-r1wbd3
          <AlertDialogTitle className="text-xl font-semibold">
            Lancer la routine ?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground">
            Choisis la durée qui te convient : tu pourras mettre le minuteur en pause ou l’arrêter quand tu veux.
          </AlertDialogDescription>
          {template && (
            <p className="text-sm text-muted-foreground/90">
              Routine sélectionnée : <span className="font-medium text-foreground">{template.title}</span>
            </p>
          )}

          <AlertDialogTitle className="text-xl font-semibold">Lancer la routine ?</AlertDialogTitle>
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

 main
          {durationOptions.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium text-foreground">Durée de la routine</p>
              <RadioGroup
 codex/add-sleep-reminder-features-r1wbd3
                value={String(selectedDuration)}

                value={String(selectedDuration ?? '')}
 main
                onValueChange={(value) => setSelectedDuration(Number(value))}
                className="grid grid-cols-3 gap-2"
              >
                {durationOptions.map((option) => (
 codex/add-sleep-reminder-features-r1wbd3
                  <Label
                    key={option.value}
                    htmlFor={`duration-${option.value}`}
                    className="cursor-pointer"
                  >
                    <div className="flex flex-col items-center">
                      <RadioGroupItem
                        value={String(option.value)}
                        id={`duration-${option.value}`}
                        className="peer sr-only"
                      />
                      <span
                        className="block w-full rounded-xl border border-border bg-background px-3 py-2 text-center text-sm font-medium text-foreground transition-colors peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                      >

                  <Label key={option.value} htmlFor={`duration-${option.value}`} className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value={String(option.value)} id={`duration-${option.value}`} className="peer sr-only" />
                      <span className="block w-full rounded-xl border border-border bg-background px-3 py-2 text-center text-sm font-medium text-foreground transition-colors peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10">
 main
                        {option.label}
                      </span>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
            </div>
          )}
        </AlertDialogHeader>
 codex/add-sleep-reminder-features-r1wbd3
        <AlertDialogFooter className="flex gap-2 sm:space-x-0">
          <AlertDialogCancel className="flex-1 rounded-xl border-muted-foreground/20">
            Annuler
          </AlertDialogCancel>


        <AlertDialogFooter className="flex gap-2 sm:space-x-0">
          <AlertDialogCancel className="flex-1 rounded-xl border-muted-foreground/20">Annuler</AlertDialogCancel>
 main
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
