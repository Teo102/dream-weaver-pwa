 codex/add-sleep-reminder-features-44beg3

// src/components/routines/RoutineCard.tsx
 main
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
 codex/add-sleep-reminder-features-44beg3
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


    const durations = template.durations ?? [600];
    const parts = durations.map((value) => `${Math.round(value / 60)} min`);

    // Try Intl.ListFormat when available for nicer localization
    try {
      // guard for environments without ListFormat support
      const ListFormat = (Intl as any).ListFormat;
      if (typeof ListFormat === 'function') {
        const formatter = new ListFormat('fr-FR', { style: 'long', type: 'disjunction' });
        return formatter.format(parts);
      }
    } catch (e) {
      // fallthrough to manual formatting
      // eslint-disable-next-line no-console
      console.warn('Intl.ListFormat unavailable or failed — fallback formatting used.', e);
    }

    // Fallback formatting: "10 min", "10 ou 15 min", "10, 15 ou 20 min"
    if (parts.length <= 2) {
      return parts.join(' ou ');
    }
 main
    const last = parts[parts.length - 1];
    return `${parts.slice(0, -1).join(', ')} ou ${last}`;
  }, [template.durations]);

  return (
 codex/add-sleep-reminder-features-44beg3
    <Card className="flex h-full flex-col border border-primary/20 bg-card/60 shadow-none">

    <Card className="flex flex-col h-full border border-primary/20 bg-card/60 shadow-none">
 main
      <CardHeader className="space-y-3">
        <CardTitle className="text-lg font-semibold text-foreground">{template.title}</CardTitle>
        <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <Clock3 className="h-4 w-4 text-primary" aria-hidden="true" />
          <span>Durée : {durationLabel}</span>
        </div>
 codex/add-sleep-reminder-features-44beg3
        <CardDescription className="text-sm leading-relaxed text-muted-foreground">

        <CardDescription className="text-sm text-muted-foreground leading-relaxed">
 main
          {template.previewText}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <Button
 codex/add-sleep-reminder-features-44beg3
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
 codex/add-sleep-reminder-features-44beg3


 main
