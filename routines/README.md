 codex/add-sleep-reminder-features-06n2n4
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
=======
Page /routines

Cette page mobile-first propose six routines de préparation au sommeil avec un minuteur persistant côté navigateur. Tout est géré en local.

Stockage local

localStorage.routinesTemplates : catalogue des 6 templates { id, title, previewText, scriptFileName, durations?, steps? }. Le catalogue est initialisé automatiquement si absent ou si un ancien format est détecté (gestion de rétrocompatibilité).

localStorage.activeRoutine : état de la routine en cours { id, title, durationSec, endAt?, remainingSec?, paused?, startedAt }.

localStorage.completedRoutines : historique local { id, title, completedAt }.

Les données sont lues à chaque chargement de la page et mises à jour dès que l’utilisateur démarre, met en pause, arrête ou complète une routine.

Scripts TXT & déroulé

Les scripts complets affichés dans “Voir le script” proviennent des fichiers statiques situés dans :

public/docs/routines-scripts/respiration-relax.txt

public/docs/routines-scripts/etirements-doux.txt

public/docs/routines-scripts/deconnexion-numerique.txt

public/docs/routines-scripts/journal-calme.txt

public/docs/routines-scripts/relaxation-guidee.txt

public/docs/routines-scripts/preparation-cocon.txt

Chaque template peut aussi exposer un déroulé structuré (steps) — une liste d’étapes avec titre, description et durée.
Les durées disponibles (ex. 10 / 15 / 20 minutes) peuvent être proposées à l’utilisateur au lancement : elles sont appliquées proportionnellement aux étapes du déroulé et la durée choisie est sauvegardée dans activeRoutine pour assurer la reprise correcte du minuteur (pause / reprise / refresh).

Tester rapidement

npm install (si nécessaire) puis npm run dev -- --host.

Ouvrir http://localhost:5173/routines.

Tester le flux complet :

Choisir une routine et (si disponible) sélectionner la durée souhaitée (10 / 15 / 20 min).

Démarrer la routine → vérifier que le minuteur se lance.

Mettre en pause puis reprendre → vérifier que l’état persiste.

Rafraîchir la page pendant une routine active → vérifier que l’état et le temps restant sont correctement restaurés.

Lancer le “Voir le déroulé” → vérifier la mise en surbrillance de l’étape active et les compteurs locaux par étape.

Marquer la routine comme complétée → vérifier que l’entrée apparaît dans l’historique local (localStorage.completedRoutines).
 main
