import { useMemo } from 'react';
import { RoutineTemplate } from '@/utils/routinesStorage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock3 } from 'lucide-react';

interface RoutineCardProps {
  template: RoutineTemplate;
  onStart: (template: RoutineTemplate) => void;
}

export const RoutineCard = ({ template, onStart }: RoutineCardProps) => {
  const durationLabel = useMemo(() => {
    const parts = template.durations.map((value) => `${Math.round(value / 60)} min`);

    if (typeof Intl !== 'undefined') {
      const intlWithListFormat = Intl as typeof Intl & { ListFormat?: typeof Intl.ListFormat };
      if (typeof intlWithListFormat.ListFormat === 'function') {
        try {
          const formatter = new intlWithListFormat.ListFormat('fr-FR', { style: 'long', type: 'disjunction' });
          return formatter.format(parts);
        } catch (error) {
          console.warn('Impossible de formater la liste des durées via Intl.ListFormat, retour au format simple.', error);
        }
      }
    }

    if (parts.length <= 2) {
      return parts.join(' ou ');
    }

    const last = parts[parts.length - 1];
    return `${parts.slice(0, -1).join(', ')} ou ${last}`;
  }, [template.durations]);

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
