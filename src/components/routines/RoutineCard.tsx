 codex/add-sleep-reminder-features-r1wbd3

// src/components/routines/RoutineCard.tsx
 main
import { RoutineTemplate } from '@/utils/routinesStorage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock3 } from 'lucide-react';

interface RoutineCardProps {
  template: RoutineTemplate;
  onStart: (template: RoutineTemplate) => void;
}

export const RoutineCard = ({ template, onStart }: RoutineCardProps) => {
 codex/add-sleep-reminder-features-r1wbd3
  const durationMinutes = template.durations.map((value) => Math.round(value / 60));
  const formatter = new Intl.ListFormat('fr-FR', { style: 'long', type: 'disjunction' });
  const durationLabel = formatter.format(durationMinutes.map((value) => `${value} min`));

  return (
    <Card className="flex h-full flex-col border border-primary/20 bg-card/60 shadow-none">

  const durationMinutes = (template.durations ?? [600]).map((v) => Math.round(v / 60));
  const durationLabel =
    durationMinutes.length > 1
      ? new Intl.ListFormat('fr-FR', { style: 'long', type: 'disjunction' }).format(
          durationMinutes.map((m) => `${m} min`)
        )
      : `${durationMinutes[0]} min`;

  return (
    <Card className="flex flex-col h-full border border-primary/20 bg-card/60 shadow-none">
 main
      <CardHeader className="space-y-3">
        <CardTitle className="text-lg font-semibold text-foreground">{template.title}</CardTitle>
        <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <Clock3 className="h-4 w-4 text-primary" aria-hidden="true" />
          <span>Durée : {durationLabel}</span>
        </div>
 codex/add-sleep-reminder-features-r1wbd3
        <CardDescription className="text-sm leading-relaxed text-muted-foreground">

        <CardDescription className="text-sm text-muted-foreground leading-relaxed">
 main
          {template.previewText}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <Button
 codex/add-sleep-reminder-features-r1wbd3
          className="mt-2 w-full py-3 text-base"

          className="w-full mt-2 py-3 text-base"
 main
          onClick={() => onStart(template)}
          aria-label={`Démarrer la routine ${template.title}`}
        >
          Démarrer
        </Button>
      </CardContent>
    </Card>
  );
};
