# Page `/routines`

Cette page mobile-first propose six routines de préparation au sommeil avec un minuteur persistant côté navigateur. Tout est géré en local.

## Stockage local
- `localStorage.routinesTemplates` : catalogue des 6 templates `{ id, title, previewText, scriptFileName }`. Initialisé automatiquement si absent.
- `localStorage.activeRoutine` : état de la routine en cours `{ id, title, durationSec, endAt?, remainingSec?, paused?, startedAt }`.
- `localStorage.completedRoutines` : historique local `{ id, title, completedAt }`.

Les données sont lues à chaque chargement de la page et mises à jour dès que l’utilisateur démarre, met en pause, arrête ou complète une routine.

## Scripts TXT
Les scripts complets affichés dans “Voir le script” proviennent des fichiers statiques :
- `public/docs/routines-scripts/respiration-relax.txt`
- `public/docs/routines-scripts/etirements-doux.txt`
- `public/docs/routines-scripts/deconnexion-numerique.txt`
- `public/docs/routines-scripts/journal-calme.txt`
- `public/docs/routines-scripts/relaxation-guidee.txt`
- `public/docs/routines-scripts/preparation-cocon.txt`

## Tester rapidement
1. `npm install` (si nécessaire) puis `npm run dev -- --host`.
2. Ouvrir `http://localhost:5173/routines` et choisir une routine.
3. Vérifier : démarrage du timer, pause/reprise, persistance après rafraîchissement, et enregistrement dans l’historique après “Marquer comme complétée”.
