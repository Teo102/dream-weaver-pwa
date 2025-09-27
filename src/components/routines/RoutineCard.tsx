// src/components/routines/RoutineCard.tsx
import { RoutineTemplate } from '@/utils/routinesStorage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock3 } from 'lucide-react';

interface RoutineCardProps {
  template: RoutineTemplate;
  onStart: (template: RoutineTemplate) => void;
}

export const RoutineCard = ({ template, onStart }: RoutineCardProps) => {
  const durationMinutes = (template.durations ?? [600]).map((v) => Math.round(v / 60));
  const durationLabel =
    durationMinutes.length > 1
      ? new Intl.ListFormat('fr-FR', { style: 'long', type: 'disjunction' }).format(
          durationMinutes.map((m) => `${m} min`)
        )
      : `${durationMinutes[0]} min`;

  return (
    <Card className="flex flex-col h-full border border-primary/20 bg-card/60 shadow-none">
      <CardHeader className="space-y-3">
        <CardTitle className="text-lg font-semibold text-foreground">{template.title}</CardTitle>
        <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <Clock3 className="h-4 w-4 text-primary" aria-hidden="true" />
          <span>Durée : {durationLabel}</span>
        </div>
        <CardDescription className="text-sm text-muted-foreground leading-relaxed">
          {template.previewText}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <Button
          className="w-full mt-2 py-3 text-base"
          onClick={() => onStart(template)}
          aria-label={`Démarrer la routine ${template.title}`}
        >
          Démarrer
        </Button>
      </CardContent>
    </Card>
  );
};
