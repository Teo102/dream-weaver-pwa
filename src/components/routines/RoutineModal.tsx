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

interface RoutineModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template?: RoutineTemplate;
  onConfirm: () => void;
}

export const RoutineModal = ({ open, onOpenChange, template, onConfirm }: RoutineModalProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-sm rounded-2xl p-6">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-semibold">
            Lancer la routine ?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground">
            Cette routine dure 10 minutes. Tu pourras la mettre en pause ou l’arrêter.
          </AlertDialogDescription>
          {template && (
            <p className="text-sm text-muted-foreground/90">
              Routine sélectionnée : <span className="font-medium text-foreground">{template.title}</span>
            </p>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-2 sm:space-x-0">
          <AlertDialogCancel className="flex-1 rounded-xl border-muted-foreground/20">
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            className="flex-1 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={onConfirm}
          >
            Commencer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
