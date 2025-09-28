 codex/add-sleep-reminder-features-44beg3
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

Page /routines

Cette page mobile-first propose six routines de préparation au sommeil avec un minuteur persistant côté navigateur. Tout est géré en local.

Stockage local

localStorage.routinesTemplates
Catalogue des templates — objets contenant au minimum { id, title, previewText, scriptFileName }. Les champs durations (tableau de durées en secondes) et steps (déroulé structuré) peuvent être présents ; le code gère la rétrocompatibilité si un ancien format est trouvé. Le catalogue est initialisé automatiquement si absent.

localStorage.activeRoutine
État de la routine en cours : { id, title, durationSec, endAt?, remainingSec?, paused?, startedAt }.

localStorage.completedRoutines
Historique local : tableau d'entrées { id, title, completedAt }.

Les données sont lues à chaque chargement de la page et mises à jour dès que l’utilisateur démarre, met en pause, arrête ou complète une routine.

Scripts TXT & déroulé

Les scripts complets affichés dans Voir le script proviennent des fichiers statiques situés dans :

public/docs/routines-scripts/respiration-relax.txt

public/docs/routines-scripts/etirements-doux.txt

public/docs/routines-scripts/deconnexion-numerique.txt

public/docs/routines-scripts/journal-calme.txt

public/docs/routines-scripts/relaxation-guidee.txt

public/docs/routines-scripts/preparation-cocon.txt

Chaque template peut aussi exposer un déroulé structuré (liste d’étapes steps : titre, description, durée). Lorsque des durées alternatives sont proposées (ex. 10 / 15 / 20 minutes), la durée choisie est appliquée proportionnellement aux étapes du déroulé et sauvegardée dans activeRoutine pour assurer la reprise correcte du minuteur (pause / reprise / rafraîchissement).

Comportement attendu

Minuteur persistant côté navigateur : démarrage, pause, reprise et restauration après refresh.

Si la routine se termine pendant l’absence, l’état est normalisé (routine marquée finie / possibilité d’enregistrer dans l’historique).

Pendant le déroulé, l’étape active est mise en surbrillance et les compteurs par étape sont calculés en fonction de la durée totale choisie.

Les actions de l’utilisateur (démarrer, arrêter, marquer comme complétée) mettent à jour localStorage immédiatement.

Tester rapidement

npm install (si nécessaire) puis npm run dev -- --host.

Ouvrir http://localhost:5173/routines.

Tester le flux complet :

Choisir une routine et (si disponible) sélectionner la durée souhaitée (ex. 10 / 15 / 20 min).

Démarrer la routine → vérifier que le minuteur démarre.

Mettre en pause puis reprendre → vérifier que l’état persiste.

Rafraîchir la page pendant une routine active → vérifier que l’état et le temps restant sont correctement restaurés.

Ouvrir Voir le déroulé → vérifier la mise en surbrillance de l’étape active et l’affichage des durées / compteurs par étape.

Marquer la routine comme complétée → vérifier que l’entrée apparaît dans l’historique local (localStorage.completedRoutines).
 main
