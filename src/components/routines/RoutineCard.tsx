import { RoutineTemplate } from '@/utils/routinesStorage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock3 } from 'lucide-react';

interface RoutineCardProps {
  template: RoutineTemplate;
  onStart: (template: RoutineTemplate) => void;
}

export const RoutineCard = ({ template, onStart }: RoutineCardProps) => {
  const durationMinutes = template.durations.map((value) => Math.round(value / 60));
  const formatter = new Intl.ListFormat('fr-FR', { style: 'long', type: 'disjunction' });
  const durationLabel = formatter.format(durationMinutes.map((value) => `${value} min`));

  return (
    <Card className="flex h-full flex-col border border-primary/20 bg-card/60 shadow-none">
      <CardHeader className="space-y-3">
        <CardTitle className="text-lg font-semibold text-foreground">{template.title}</CardTitle>
        <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <Clock3 className="h-4 w-4 text-primary" aria-hidden="true" />
          <span>Durée : {durationLabel}</span>
        </div>
        <CardDescription className="text-sm leading-relaxed text-muted-foreground">
          {template.previewText}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <Button
          className="mt-2 w-full py-3 text-base"
          onClick={() => onStart(template)}
          aria-label={`Démarrer la routine ${template.title}`}
        >
          Démarrer
        </Button>
      </CardContent>
    </Card>
  );
};
