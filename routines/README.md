# Page `/routines`

Cette page mobile-first propose six routines de préparation au sommeil avec un minuteur persistant côté navigateur. Tout est géré en local.

## Stockage local
- `localStorage.routinesTemplates` : catalogue des 6 templates `{ id, title, previewText, scriptFileName, durations, steps[] }`. Initialisé automatiquement si absent ou si un ancien format est détecté.
- `localStorage.activeRoutine` : état de la routine en cours `{ id, title, durationSec, endAt?, remainingSec?, paused?, startedAt }`.
- `localStorage.completedRoutines` : historique local `{ id, title, completedAt }`.

Les données sont lues à chaque chargement de la page et mises à jour dès que l’utilisateur démarre, met en pause, arrête ou complète une routine.

## Scripts TXT & déroulé
Les textes détaillés restent disponibles dans :
- `public/docs/routines-scripts/respiration-relax.txt`
- `public/docs/routines-scripts/etirements-doux.txt`
- `public/docs/routines-scripts/deconnexion-numerique.txt`
- `public/docs/routines-scripts/journal-calme.txt`
- `public/docs/routines-scripts/relaxation-guidee.txt`
- `public/docs/routines-scripts/preparation-cocon.txt`

Chaque template expose également un déroulé structuré (étapes avec titre, description et durée) utilisé par le bouton “Voir le déroulé” pendant la routine. Les durées disponibles (10, 15 ou 20 minutes) sont appliquées proportionnellement à ces étapes et sauvegardées dans `activeRoutine` pour assurer la reprise du minuteur.

## Tester rapidement
1. `npm install` (si nécessaire) puis `npm run dev -- --host`.
2. Ouvrir `http://localhost:5173/routines`, choisir une routine puis sélectionner la durée souhaitée.
3. Vérifier : démarrage du minuteur, pause/reprise, persistance après rafraîchissement, surbrillance de l’étape active, et enregistrement dans l’historique après “Marquer comme complétée”.
