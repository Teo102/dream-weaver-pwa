# Guide d'utilisation complet - Sleep Reminder

**Bienvenue dans Sleep Reminder !** Cette application vous aide à optimiser votre sommeil grâce à des cycles scientifiques, des routines guidées et un suivi personnalisé. Ce guide vous accompagne pas à pas dans toutes les fonctionnalités.

⏱️ **Temps de lecture estimé :** 15-20 minutes

---

## 📑 Table des matières

1. [Premiers pas](#premiers-pas)
2. [Authentification](#authentification)
   - [Inscription](#inscription)
   - [Connexion](#connexion)
   - [Récupération de mot de passe](#récupération-de-mot-de-passe)
   - [Continuer sans compte](#continuer-sans-compte)
3. [Écran d'accueil et navigation](#écran-daccueil-et-navigation)
4. [Calculateur de sommeil](#calculateur-de-sommeil)
5. [Routines du soir](#routines-du-soir)
   - [Sélectionner une routine](#sélectionner-une-routine)
   - [Démarrer et gérer le minuteur](#démarrer-et-gérer-le-minuteur)
   - [Personnaliser les durées](#personnaliser-les-durées)
6. [Journal de sommeil](#journal-de-sommeil)
7. [Badges et réussites](#badges-et-réussites)
8. [Comprendre le sommeil](#comprendre-le-sommeil)
9. [Paramètres et personnalisation](#paramètres-et-personnalisation)
10. [Dépannage et FAQ](#dépannage-et-faq)
11. [Pour les développeurs](#pour-les-développeurs)
12. [Bonnes pratiques](#bonnes-pratiques)
13. [Contact et support](#contact-et-support)

---

## Premiers pas

Sleep Reminder est conçu pour vous aider à retrouver un sommeil de qualité en respectant vos cycles naturels de 90 minutes. L'application fonctionne entièrement dans votre navigateur et sauvegarde vos données localement sur votre appareil.

### Compatibilité

- ✅ Navigateurs modernes (Chrome, Firefox, Safari, Edge)
- ✅ Mobile et tablette (responsive)
- ✅ Fonctionne hors ligne une fois chargée (PWA)

---

## Authentification

Sleep Reminder propose deux modes d'utilisation : avec ou sans compte utilisateur.

### Inscription

**Description :** Créez un compte pour synchroniser vos données et accéder à des fonctionnalités avancées.

**Utilité :** Avoir un compte vous permet de retrouver votre historique sur plusieurs appareils et de sécuriser vos données. Si vous changez d'appareil ou réinstallez votre navigateur, vos données restent accessibles.

**Guide pas-à-pas :**

1. Sur la page d'accueil, cliquez sur le bouton **"Se connecter / S'inscrire"** ou accédez à `/auth`
2. Cliquez sur le lien **"Je n'ai pas encore de compte"**
3. Entrez votre **adresse email** dans le champ prévu
4. Choisissez un **mot de passe** (minimum 6 caractères)
5. Utilisez l'icône d'œil 👁️ pour afficher/masquer votre mot de passe si besoin
6. Cliquez sur **"Créer mon compte"**
7. Un message de confirmation apparaîtra : **"Compte créé ! Vérifiez votre email pour confirmer votre inscription."**
8. Consultez votre boîte mail et cliquez sur le lien de confirmation
9. Vous serez redirigé vers l'application, connecté automatiquement

![Screenshot: Page d'inscription](/images/help/auth-signup.png)
_Dimensions recommandées : 800x600px_

**💡 Astuce :** Utilisez un gestionnaire de mots de passe pour générer et sauvegarder un mot de passe sécurisé.

**⚠️ Erreur courante :** 
- **"Cet email est déjà utilisé"** : Cet email est déjà enregistré. Essayez de vous connecter ou de réinitialiser votre mot de passe.

**Exemples d'usage :**
- Vous voulez synchroniser vos données entre votre téléphone et votre ordinateur
- Vous souhaitez accéder à des statistiques avancées et un historique complet

---

### Connexion

**Description :** Accédez à votre compte existant pour retrouver vos données.

**Utilité :** La connexion vous permet de récupérer votre historique de sommeil, vos routines favorites et vos badges. Particulièrement utile si vous changez d'appareil ou si vous utilisez plusieurs navigateurs.

**Guide pas-à-pas :**

1. Accédez à la page `/auth`
2. Entrez votre **email** et votre **mot de passe**
3. Cliquez sur l'icône d'œil 👁️ pour vérifier votre mot de passe si besoin
4. Cliquez sur **"Se connecter"**
5. Vous serez automatiquement redirigé vers **`/app`** (écran d'accueil)

**💡 Astuce :** Si vous cochez "Se souvenir de moi" dans votre navigateur, vous resterez connecté même après fermeture.

**⚠️ Erreurs courantes :**
- **"Email ou mot de passe incorrect"** : Vérifiez que vous avez bien confirmé votre email lors de l'inscription. Si vous venez de créer votre compte, consultez vos emails.
- **"Veuillez confirmer votre email avant de vous connecter"** : Consultez votre boîte mail et cliquez sur le lien de confirmation envoyé lors de l'inscription.

**Exemples d'usage :**
- Vous revenez sur l'application après quelques jours d'absence
- Vous voulez consulter votre historique depuis un autre appareil

---

### Récupération de mot de passe

**Description :** Réinitialisez votre mot de passe si vous l'avez oublié.

**Utilité :** Cette fonctionnalité vous permet de récupérer l'accès à votre compte en toute sécurité, sans perdre vos données.

**Guide pas-à-pas :**

1. Sur la page de connexion (`/auth`), cliquez sur **"Mot de passe oublié ?"**
2. Entrez votre **adresse email** dans le champ prévu
3. Cliquez sur **"Envoyer le lien de réinitialisation"**
4. Un message de confirmation apparaît : **"Un email de réinitialisation a été envoyé à votre adresse email."**
5. Consultez votre boîte mail (vérifiez aussi les spams)
6. Cliquez sur le lien dans l'email reçu
7. Choisissez un nouveau mot de passe (minimum 6 caractères)
8. Validez et reconnectez-vous avec vos nouveaux identifiants

![Screenshot: Récupération de mot de passe](/images/help/auth-reset.png)
_Dimensions recommandées : 800x600px_

**💡 Astuce :** Le lien de réinitialisation expire généralement après 1 heure. Si besoin, demandez un nouveau lien.

**⚠️ Erreur courante :**
- **"Aucun email reçu"** : Vérifiez vos spams, vérifiez que l'email saisi est correct, et attendez quelques minutes.

---

### Continuer sans compte

**Description :** Utilisez l'application sans créer de compte, avec stockage local uniquement.

**Utilité :** Parfait pour tester l'application ou si vous préférez ne pas créer de compte. Vos données restent privées sur votre appareil, mais ne seront pas synchronisées entre appareils.

**Guide pas-à-pas :**

1. Sur la page d'authentification (`/auth`), cliquez sur le bouton **"Continuer sans compte"**
2. Vous êtes immédiatement redirigé vers l'application (`/app`)
3. Toutes les fonctionnalités sont disponibles (routines, calculateur, journal)
4. Vos données sont sauvegardées dans le stockage local de votre navigateur

**💡 Astuce :** Si vous utilisez le mode sans compte, pensez à exporter régulièrement vos données pour ne pas les perdre en cas de vidage du cache navigateur.

**⚠️ Erreur courante :**
- **Données perdues après nettoyage du navigateur** : Sans compte, les données sont stockées localement. Si vous nettoyez le cache ou les données de navigation, vos entrées seront supprimées.

**Exemples d'usage :**
- Vous voulez tester l'application avant de créer un compte
- Vous utilisez un ordinateur partagé et ne voulez pas laisser de traces
- Vous n'avez pas besoin de synchronisation multi-appareils

---

## Écran d'accueil et navigation

**Description :** L'écran d'accueil (`/app`) est le point central de l'application où vous accédez à toutes les fonctionnalités.

**Utilité :** Cet écran vous donne une vue d'ensemble de votre progression (série de jours consécutifs), de vos actions rapides et de votre activité récente. Il vous aide à naviguer rapidement vers les sections importantes.

**Guide pas-à-pas :**

1. Après connexion (ou en mode sans compte), vous arrivez sur `/app`
2. En haut, vous voyez le **logo Sleep Reminder** avec l'icône lune 🌙
3. Si vous avez une série active, une **carte avec étoile ⭐** affiche votre nombre de jours consécutifs
4. Quatre cartes d'actions rapides sont disponibles :
   - **Calculateur** (icône horloge ⏰) : accès à `/calculator`
   - **Routine** (icône lune 🌙) : accès à `/routine`
   - **Journal** (icône calendrier 📅) : accès à `/journal`
   - **Badges** (icône trophée 🏆) : accès à `/achievements`
5. Une carte **"Comprendre le sommeil"** (icône cerveau 🧠) vous dirige vers `/comprendre-sommeil`
6. La section **"Activité récente"** affiche vos dernières entrées de journal (3 dernières)
7. En bas, un bouton fixe **"Démarrer routine"** est toujours accessible
8. La barre de navigation en bas de page (mobile) ou en haut (desktop) permet de naviguer facilement

![Screenshot: Écran d'accueil](/images/help/home.png)
_Dimensions recommandées : 1200x800px_

**💡 Astuce :** Ajoutez l'application à votre écran d'accueil mobile (PWA) pour un accès encore plus rapide.

**Exemples d'usage :**
- Vous ouvrez l'app le soir pour lancer votre routine avant de dormir
- Vous consultez rapidement votre série de jours consécutifs pour rester motivé
- Vous voulez calculer vos heures de coucher optimales pour ce soir

**Accessibilité :**
- Tous les liens et boutons sont navigables au clavier (Tab / Shift+Tab)
- Les icônes ont des labels textuels pour les lecteurs d'écran
- Les cartes ont un effet de survol visible

---

## Calculateur de sommeil

**Description :** Le calculateur de sommeil vous aide à trouver les meilleures heures de coucher ou de réveil en fonction des cycles de 90 minutes.

**Utilité :** Se réveiller au milieu d'un cycle de sommeil vous laisse fatigué et groggy. Le calculateur identifie les heures optimales pour vous réveiller naturellement en fin de cycle, vous laissant reposé et alerte. Il prend aussi en compte le temps d'endormissement (généralement 15 minutes).

**Guide pas-à-pas :**

1. Depuis l'écran d'accueil, cliquez sur la carte **"Calculateur"**
2. Choisissez votre mode avec le bouton bascule :
   - **"Je veux me réveiller à"** (icône soleil ☀️) : pour calculer les heures de coucher
   - **"Je veux me coucher à"** (icône lune 🌙) : pour calculer les heures de réveil
3. Saisissez l'heure souhaitée dans le champ horaire (format HH:MM)
4. Ajustez le curseur **"Temps d'endormissement"** selon votre habitude (5 à 45 minutes, par défaut 15 minutes)
5. Cliquez sur **"Calculer les heures"**
6. Une liste de résultats apparaît, montrant 4 à 6 options
7. L'option marquée **"⭐ Optimal"** est mise en avant (bordure brillante, badge étoile)
8. Chaque résultat affiche :
   - L'heure exacte
   - Le nombre de cycles complets (ex : 🔄 5 cycles complets)
   - La durée totale de sommeil (ex : ⏰ 7h30 de sommeil)
9. Cliquez sur **"Programmer"** pour créer un rappel (fonctionnalité future)

![Screenshot: Calculateur de sommeil](/images/help/calculator.png)
_Dimensions recommandées : 800x1200px_

**💡 Astuces :**
- L'heure "Optimale" correspond à un réveil en fin de cycle, évitant le sommeil profond
- Si vous avez du mal à vous endormir, augmentez le temps d'endormissement (20-30 minutes)
- Pour un sommeil idéal, visez 5 ou 6 cycles complets (7h30 ou 9h)

**⚠️ Erreur courante :**
- **"Le temps d'endormissement ne change rien"** : Le calcul inclut automatiquement ce délai. Si vous réglez 15 minutes, l'heure affichée suppose que vous vous endormez 15 minutes après vous être couché.

**Exemples d'usage :**
- **Scénario 1 :** Vous devez vous lever à 7h00 pour le travail. Vous entrez "07:00" en mode réveil, et l'app vous suggère de vous coucher à 23h15 (5 cycles) ou 21h45 (6 cycles).
- **Scénario 2 :** Vous êtes fatigué et voulez dormir immédiatement (23h00). Vous entrez "23:00" en mode coucher, et l'app vous dit de programmer votre réveil à 6h30 ou 8h00.
- **Scénario 3 :** Décalage horaire après un voyage : vous voulez dormir à 22h00 mais ne savez pas quand vous réveiller. Le calculateur vous donne des options adaptées.

**Accessibilité :**
- Le champ horaire est compatible avec les sélecteurs natifs (mobile)
- Le slider est navigable au clavier (flèches gauche/droite)
- Annonces aria-live pour les résultats (à implémenter)

---

## Routines du soir

Les routines du soir sont des séquences guidées étape par étape pour vous préparer mentalement et physiquement au sommeil. Chaque routine contient plusieurs étapes avec instructions vocales et/ou textuelles.

### Sélectionner une routine

**Description :** Parcourez les routines disponibles et choisissez celle qui correspond à vos besoins du soir.

**Utilité :** Différentes situations nécessitent différentes approches. Une routine de relaxation profonde sera plus adaptée après une journée stressante, tandis qu'une routine courte convient si vous êtes déjà calme.

**Guide pas-à-pas :**

1. Cliquez sur **"Routine"** depuis l'écran d'accueil ou la navigation
2. Vous arrivez sur `/routine` où s'affichent plusieurs cartes de routines
3. Chaque carte montre :
   - Un **titre** (ex : "Relaxation guidée", "Respiration relaxante")
   - Une **description** courte (ex : "Techniques de respiration apaisantes")
   - Des **durées disponibles** (ex : 5, 10, 15 minutes)
   - Un bouton **"Démarrer"**
4. Lisez les descriptions pour choisir la routine adaptée
5. Cliquez sur **"Démarrer"** sur la routine choisie

**Routines disponibles (exemples) :**
- **Relaxation guidée** : Méditation et visualisation
- **Respiration relaxante** : Techniques de respiration (4-7-8, cohérence cardiaque)
- **Déconnexion numérique** : Rituel pour se détacher des écrans
- **Étirements doux** : Mouvements légers pour relâcher les tensions
- **Journal calme** : Écriture réflexive et gratitude
- **Préparation du cocon** : Optimisation de l'environnement de sommeil

![Screenshot: Liste des routines](/images/help/routines-list.png)
_Dimensions recommandées : 1000x800px_

**💡 Astuce :** Testez plusieurs routines pour trouver celle qui fonctionne le mieux pour vous. Vos préférences peuvent varier selon votre humeur.

**Exemples d'usage :**
- **Routine relaxante avant un examen** : Choisissez "Respiration relaxante" 10 minutes pour calmer l'anxiété
- **Après une journée de travail intense** : Optez pour "Relaxation guidée" 15 minutes pour décompresser
- **Sommeil court après décalage horaire** : Utilisez "Déconnexion numérique" 5 minutes pour un rituel minimal

---

### Démarrer et gérer le minuteur

**Description :** Une fois la routine lancée, un minuteur étape-par-étape vous guide à travers chaque phase.

**Utilité :** Le minuteur vous aide à rester concentré et à suivre la routine sans regarder l'horloge constamment. Chaque étape a une durée définie, et l'application vous indique quand passer à la suivante.

**Guide pas-à-pas :**

1. Après avoir cliqué sur **"Démarrer"**, une fenêtre modale apparaît
2. Sélectionnez la **durée** de la routine (boutons radio ou chips)
3. Cliquez sur **"Confirmer et démarrer"**
4. Le minuteur s'affiche en plein écran ou en superposition
5. Vous voyez :
   - Le **temps restant total** (ex : 09:45)
   - Le **nom de l'étape actuelle** (ex : "Respiration profonde")
   - Les **instructions textuelles** de l'étape
   - Des **boutons de contrôle** : Pause ⏸️, Reprendre ▶️, Arrêter ⏹️
6. Le minuteur décompte automatiquement
7. À la fin de chaque étape, un signal sonore (optionnel) et/ou une vibration vous alertent
8. L'étape suivante s'affiche automatiquement

**Contrôles disponibles :**
- **Pause (⏸️)** : Met en pause le minuteur. Le temps restant est figé.
- **Reprendre (▶️)** : Reprend le minuteur là où vous l'aviez laissé.
- **Arrêter (⏹️)** : Ouvre une boîte de dialogue de confirmation. Options :
  - **"Marquer comme complétée"** : Enregistre la routine dans l'historique
  - **"Abandonner"** : Annule sans enregistrement

![Screenshot: Minuteur en cours](/images/help/routine-timer.png)
_Dimensions recommandées : 800x1000px_

**💡 Astuces :**
- Mettez votre téléphone en mode "Ne pas déranger" avant de lancer la routine
- Préparez votre espace (lumières tamisées, position confortable) avant de démarrer
- Si vous êtes interrompu, utilisez Pause plutôt que Arrêter pour reprendre facilement

**⚠️ Erreurs courantes :**
- **Le minuteur se réinitialise après fermeture de l'app** : Si vous fermez complètement le navigateur ou l'onglet, le minuteur peut se perdre. Utilisez plutôt la fonction Pause.
- **Les instructions ne s'affichent pas** : Vérifiez que les fichiers textuels dans `/public/docs/routines-scripts/` sont bien présents.

**Exemples d'usage :**
- Vous lancez "Relaxation guidée" 15 minutes, mais une urgence arrive à la 8e minute : vous faites Pause, réglez l'urgence, puis Reprendre.
- Vous vous endormez avant la fin : pas de problème, le minuteur se termine tout seul. Marquez la routine comme complétée le lendemain matin.

**Accessibilité :**
- Les boutons de contrôle ont des labels explicites (aria-label)
- Le temps restant est annoncé via aria-live (à implémenter)
- Navigation au clavier : Tab pour naviguer, Espace pour activer les boutons
- Le modal de confirmation a role="dialog" et focus trap

---

### Personnaliser les durées

**Description :** Ajustez la durée totale de la routine selon votre temps disponible.

**Utilité :** Certains soirs, vous avez 15 minutes, d'autres seulement 5. Les routines s'adaptent en compressant ou étendant les étapes proportionnellement.

**Guide pas-à-pas :**

1. Au moment de démarrer une routine, la modale affiche des **boutons de durée**
2. Choisissez parmi les durées proposées (ex : 5 min, 10 min, 15 min)
3. La durée sélectionnée est mise en surbrillance
4. Confirmez avec **"Confirmer et démarrer"**
5. La routine s'exécute sur la durée choisie

**💡 Astuce :** Si aucune durée ne convient, vous pouvez (dans une future version) créer vos propres templates avec durées personnalisées.

**⚠️ Erreur courante :**
- **"Je ne vois pas l'option de durée personnalisée"** : Pour l'instant, seules les durées prédéfinies sont disponibles. La personnalisation avancée est en développement.

**Exemples d'usage :**
- Vous avez seulement 5 minutes avant de dormir : choisissez la version courte de "Respiration relaxante"
- Vous voulez une session approfondie le week-end : optez pour la version 15 ou 20 minutes

---

## Journal de sommeil

**Description :** Le journal de sommeil vous permet de suivre vos habitudes et la qualité de votre sommeil au fil du temps.

**Utilité :** En consignant vos heures de coucher, réveil et qualité perçue, vous identifiez des patterns et comprenez ce qui affecte votre sommeil (stress, alimentation, exercice, etc.). Ces données vous aident à optimiser vos routines.

**Guide pas-à-pas :**

1. Cliquez sur **"Journal"** depuis l'écran d'accueil
2. Vous arrivez sur `/journal` avec une liste de vos entrées récentes (7 dernières)
3. Pour ajouter une nouvelle entrée, cliquez sur **"+ Add Today's Sleep Log"** (ou équivalent en français)
4. Un formulaire apparaît avec les champs :
   - **Heure de coucher** (icône lune 🌙) : Sélecteur d'heure
   - **Heure de réveil** (icône soleil ☀️) : Sélecteur d'heure
   - **Qualité du sommeil** : 5 options avec emojis (😴 1 - Très mauvais, 😐 3 - Correct, 😁 5 - Excellent)
   - **Notes (optionnel)** : Champ texte libre pour remarques
5. Remplissez les champs (au moins la qualité)
6. Cliquez sur **"Save Entry"**
7. Un toast de confirmation apparaît : **"Journal enregistré ✅"**
8. L'entrée apparaît dans la liste des entrées récentes

**Liste des entrées récentes :**
- Chaque entrée affiche :
  - Date (ex : "Aujourd'hui", "Hier", "3 jours ago")
  - Heures de coucher/réveil (si renseignées)
  - Qualité sous forme d'étoiles ⭐ (ex : 4/5 étoiles)
  - Badge **"Routine ✓"** si une routine a été complétée ce jour-là
  - Notes (si présentes)

![Screenshot: Journal de sommeil](/images/help/journal.png)
_Dimensions recommandées : 800x1200px_

**💡 Astuces :**
- Remplissez votre journal chaque matin au réveil, tant que vos souvenirs sont frais
- Notez des détails dans les "Notes" : "café après 16h", "film d'action avant de dormir", "exercice en soirée"
- Si vous avez fait une routine, elle sera automatiquement marquée dans l'entrée du jour

**⚠️ Erreurs courantes :**
- **"Je ne peux pas ajouter plusieurs entrées pour le même jour"** : Actuellement, une seule entrée par jour est permise. Si vous vous trompez, il faudra la supprimer (fonction à venir) ou éditer le localStorage.
- **"Mes entrées disparaissent"** : Si vous utilisez le mode sans compte, nettoyez pas le cache navigateur. Avec un compte, les données sont synchronisées.

**Exemples d'usage :**
- Vous notez que tous les soirs où vous avez fait la routine "Respiration relaxante", votre qualité de sommeil est de 4 ou 5/5
- Vous remarquez que les nuits où vous vous couchez après minuit, votre qualité chute à 2/5

**Accessibilité :**
- Les sélecteurs d'heure utilisent les composants natifs (accessibles par défaut)
- Les boutons radio pour la qualité sont navigables au clavier
- Le champ Notes a un label explicite

---

## Badges et réussites

**Description :** Les badges et réussites (achievements) récompensent votre régularité et vos progrès.

**Utilité :** Les badges offrent une motivation supplémentaire pour maintenir de bonnes habitudes de sommeil. Voir vos succès débloqués renforce votre engagement.

**Guide pas-à-pas :**

1. Cliquez sur **"Badges"** depuis l'écran d'accueil
2. Vous arrivez sur `/achievements` avec une grille de badges
3. Chaque badge affiche :
   - Une **icône** (ex : 🏆, ⭐, 🔥)
   - Un **titre** (ex : "Première nuit", "Série de 7 jours")
   - Une **description** (ex : "Complétez votre première routine")
   - Un **état** : débloqué (couleur) ou verrouillé (grisé)
4. Les badges débloqués montrent la **date d'obtention**
5. Les badges verrouillés montrent les **critères** pour les débloquer

**Exemples de badges :**
- **Première nuit** 🌙 : Complétez votre première routine
- **Série de 7 jours** 🔥 : Utilisez l'app 7 jours consécutifs
- **Expert des routines** 🏆 : Complétez 30 routines
- **Maître du sommeil** ⭐ : 90% de vos nuits avec qualité 4 ou 5/5

![Screenshot: Page des badges](/images/help/achievements.png)
_Dimensions recommandées : 1000x800px_

**💡 Astuce :** Consultez régulièrement les badges verrouillés pour savoir quels objectifs viser ensuite.

**⚠️ Erreur courante :**
- **"Mon badge ne se débloque pas"** : Certains badges se débloquent avec un léger délai (au prochain chargement de page). Rafraîchissez la page.

**Exemples d'usage :**
- Vous atteignez 7 jours consécutifs et débloquez le badge "Série de 7 jours", ce qui vous motive à continuer
- Vous voyez le badge "100 routines complétées" et vous fixez un objectif long terme

**Accessibilité :**
- Chaque badge a un alt text descriptif
- Les badges verrouillés ont une indication textuelle "Verrouillé" (ou "Locked") en plus du grisé visuel

---

## Comprendre le sommeil

**Description :** Une section éducative avec des articles et visuels expliquant les mécanismes du sommeil.

**Utilité :** Mieux comprendre comment fonctionne le sommeil (cycles, sommeil profond, REM, etc.) vous aide à optimiser vos routines et à prendre des décisions éclairées.

**Guide pas-à-pas :**

1. Depuis l'écran d'accueil, cliquez sur la carte **"Comprendre le sommeil"** (icône cerveau 🧠)
2. Vous arrivez sur `/comprendre-sommeil` avec une liste d'articles
3. Chaque article a :
   - Une **image illustrative** (SVG)
   - Un **titre** (ex : "Qu'est-ce que le sommeil ?", "Les cycles du sommeil")
   - Un **résumé** court
4. Cliquez sur un article pour le lire en entier
5. Naviguez entre articles avec les boutons précédent/suivant (si implémenté)

**Articles disponibles (exemples) :**
- **Qu'est-ce que le sommeil ?** : Introduction aux phases de sommeil
- **Les cycles de 90 minutes** : Explication scientifique des cycles
- **Pourquoi se réveiller en fin de cycle ?** : L'importance du timing
- **Routines du soir efficaces** : Conseils pratiques
- **Conseils pour mieux dormir** : Hygiène de sommeil

![Screenshot: Section éducative](/images/help/education.png)
_Dimensions recommandées : 1200x800px_

**💡 Astuce :** Lisez ces articles le matin ou en journée, pas juste avant de dormir (lumière d'écran).

**Exemples d'usage :**
- Vous ne comprenez pas pourquoi vous vous réveillez fatigué : vous lisez l'article sur les cycles
- Vous voulez améliorer votre hygiène de sommeil : vous consultez "Conseils pour mieux dormir"

**Accessibilité :**
- Les images ont des alt texts descriptifs
- Les articles sont formatés en HTML sémantique (h1, h2, p, ul)
- Navigation au clavier disponible

---

## Paramètres et personnalisation

**Description :** (Section à développer selon les paramètres implémentés dans votre app)

**Utilité :** Personnalisez l'expérience selon vos préférences (sons, notifications, thème, etc.).

**Options possibles :**
- **Sons de notification** : Activer/désactiver les sons à la fin des étapes
- **Vibrations** : Activer/désactiver les vibrations (mobile)
- **Thème** : Clair, sombre, auto (suit le système)
- **Notifications push** : Activer pour rappels programmés (nécessite autorisation navigateur)
- **Langue** : Français, Anglais (si multi-langue)
- **Export de données** : Télécharger vos données en JSON/CSV
- **Suppression de compte** : Supprimer définitivement votre compte et données

**Guide pas-à-pas :**

1. Accédez aux paramètres (icône engrenage ⚙️, généralement dans la barre de navigation)
2. Parcourez les sections disponibles
3. Modifiez les réglages selon vos préférences
4. Les changements sont sauvegardés automatiquement (ou cliquez "Sauvegarder")

**💡 Astuce :** Activez le thème sombre pour réduire la lumière bleue le soir.

**Accessibilité :**
- Les switches et checkboxes ont des labels explicites
- Les changements sont annoncés aux lecteurs d'écran (aria-live)

---

## Dépannage et FAQ

### Erreurs fréquentes et solutions

#### 1. **Erreur : "Failed to fetch" ou "ERR_NAME_NOT_RESOLVED"**

**Message exact :** `TypeError: Failed to fetch` ou `net::ERR_NAME_NOT_RESOLVED`

**Cause :** Problème de connexion à Supabase (URL incorrecte, clé API manquante, ou projet en pause).

**Solution :**

1. Vérifiez que vous avez bien configuré les variables d'environnement Supabase :
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
2. Ouvrez le fichier `.env` à la racine du projet (si en développement local)
3. Assurez-vous que l'URL est complète (ex : `https://xxxxx.supabase.co`)
4. Vérifiez que votre projet Supabase n'est pas en pause (connexion au dashboard Supabase)
5. Si le projet est en pause, réactivez-le depuis le dashboard
6. Redémarrez le serveur de développement (`npm run dev`)

**💡 Astuce :** Copiez les credentials directement depuis le dashboard Supabase > Settings > API pour éviter les erreurs de frappe.

---

#### 2. **Erreur : "You cannot render a <Router> inside another <Router>"**

**Message exact :** `Error: You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`

**Cause :** Le composant `BrowserRouter` est déclaré plusieurs fois dans l'application (typiquement dans `main.tsx` ET dans `App.tsx`).

**Solution :**

1. Ouvrez `src/main.tsx`
2. Vérifiez qu'il n'y a qu'une seule instance de `<BrowserRouter>` (ou `<Router>`)
3. Si `<BrowserRouter>` est déjà dans `main.tsx`, supprimez-le de `App.tsx`
4. La structure correcte est :
   ```tsx
   // main.tsx
   import { BrowserRouter } from 'react-router-dom';
   
   ReactDOM.createRoot(document.getElementById('root')!).render(
     <BrowserRouter>
       <App />
     </BrowserRouter>
   );
   
   // App.tsx
   import { Routes, Route } from 'react-router-dom';
   
   function App() {
     return (
       <Routes>
         {/* vos routes */}
       </Routes>
     );
   }
   ```

---

#### 3. **Erreur : Marqueurs de merge (`<<<<<<<`, `=======`, `>>>>>>>`)**

**Message exact :** `SyntaxError: Unexpected token '<'` ou vous voyez littéralement `<<<<<<< HEAD` dans votre code.

**Cause :** Un conflit de merge Git non résolu, laissant des marqueurs dans le code source.

**Solution :**

1. Ouvrez l'éditeur de code (VS Code, Sublime, etc.)
2. Recherchez globalement (Ctrl+Shift+F ou Cmd+Shift+F) : `<<<<<<<`
3. Pour chaque conflit trouvé :
   - Identifiez les sections `<<<<<<< HEAD`, `=======`, `>>>>>>> branch-name`
   - Choisissez quelle version garder (ou fusionnez manuellement)
   - Supprimez les marqueurs `<<<<<<<`, `=======`, `>>>>>>>`
4. Sauvegardez tous les fichiers modifiés
5. Testez que l'application se compile : `npm run dev`

**💡 Astuce :** Utilisez VS Code avec l'extension GitLens pour visualiser et résoudre les conflits plus facilement.

---

#### 4. **Erreur : "does not provide an export named 'default'"**

**Message exact :** `SyntaxError: The requested module '/src/components/Xxx.tsx' does not provide an export named 'default'`

**Cause :** Vous importez un composant avec `import Xxx from './Xxx'` mais il est exporté avec `export const Xxx = ...` (export nommé) au lieu de `export default`.

**Solution :**

Choisissez l'une des deux options :

**Option A :** Changer l'import (recommandé)
```tsx
// Avant
import Xxx from './Xxx';

// Après
import { Xxx } from './Xxx';
```

**Option B :** Changer l'export
```tsx
// Avant
export const Xxx = () => { ... };

// Après
const Xxx = () => { ... };
export default Xxx;
```

**💡 Astuce :** Utilisez un style cohérent dans tout le projet (soit tout en default, soit tout en nommé).

---

#### 5. **Erreur : Build errors (esbuild / vite)**

**Message exact :** `Error: Build failed with X errors` ou `[vite] Internal server error`

**Cause :** Erreur TypeScript, import manquant, ou configuration Vite incorrecte.

**Solution :**

1. Lisez attentivement le message d'erreur (il indique souvent le fichier et la ligne)
2. Exécutez localement :
   ```bash
   npm run build
   ```
3. Vérifiez les erreurs TypeScript :
   ```bash
   npm run type-check
   # ou
   npx tsc --noEmit
   ```
4. Corrigez les erreurs signalées (types manquants, imports incorrects, etc.)
5. Vérifiez `vite.config.ts` :
   - Les alias de chemins sont-ils corrects ? (ex : `@` pointant vers `./src`)
   - Les plugins sont-ils à jour ?
6. Redémarrez le serveur de développement

**💡 Astuce :** Activez le mode strict de TypeScript (`"strict": true` dans `tsconfig.json`) pour détecter les erreurs plus tôt.

---

### FAQ générale

**Q : Mes données sont-elles synchronisées entre appareils ?**  
**R :** Seulement si vous utilisez un compte (avec authentification Supabase). En mode "sans compte", les données sont stockées localement dans le navigateur et ne sont pas synchronisées.

**Q : L'application fonctionne-t-elle hors ligne ?**  
**R :** Partiellement. Une fois chargée, l'application est disponible hors ligne (PWA), mais les fonctionnalités nécessitant Supabase (authentification, synchronisation) ne fonctionneront pas sans connexion internet.

**Q : Puis-je exporter mes données ?**  
**R :** Cette fonctionnalité est en développement. Pour l'instant, en mode sans compte, vous pouvez accéder à `localStorage` dans les DevTools du navigateur (Application > Local Storage) et copier les données manuellement.

**Q : Comment supprimer mon compte ?**  
**R :** Actuellement, contactez le support (voir section Contact). Une option de suppression automatique sera ajoutée dans les paramètres.

**Q : Les routines sont-elles personnalisables ?**  
**R :** Vous pouvez choisir la durée parmi les options proposées. La création de routines complètement personnalisées (étapes, instructions) est prévue dans une future version.

**Q : Pourquoi je ne reçois pas l'email de confirmation ?**  
**R :** Vérifiez vos spams. Si rien après 10 minutes, vérifiez que l'email saisi est correct, et réessayez l'inscription. Si le problème persiste, contactez le support.

**Q : L'application est-elle gratuite ?**  
**R :** Oui, actuellement toutes les fonctionnalités sont gratuites.

---

## Pour les développeurs

### Architecture du projet

```
sleep-reminder/
├── public/
│   ├── docs/routines-scripts/      # Textes des routines
│   ├── images/comprendre-sommeil/  # Images éducatives
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── routines/               # Composants routines (RoutineCard, RoutineTimer, etc.)
│   │   ├── ui/                     # Composants UI shadcn
│   │   ├── AuthModal.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── Layout.tsx
│   │   ├── Navigation.tsx
│   │   ├── ReminderModal.tsx
│   │   └── RequireAuth.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx         # Contexte d'authentification Supabase
│   ├── hooks/
│   ├── lib/
│   │   ├── supabase.ts             # Client Supabase principal
│   │   ├── supabaseClient.ts       # Client alternatif (à fusionner)
│   │   └── utils.ts
│   ├── pages/
│   │   ├── Achievements.tsx
│   │   ├── Auth.tsx                # Page de connexion/inscription
│   │   ├── Calculator.tsx
│   │   ├── ComprendreSommeil.tsx
│   │   ├── Home.tsx
│   │   ├── Index.tsx               # Page d'accueil publique
│   │   ├── Journal.tsx
│   │   ├── Landing.tsx
│   │   ├── NotFound.tsx
│   │   ├── Onboarding.tsx
│   │   ├── Routine.tsx             # Alias de Routines.tsx
│   │   └── Routines.tsx            # Page principale des routines
│   ├── utils/
│   │   ├── routinesStorage.ts      # Gestion du stockage des routines
│   │   ├── sleepCalculator.ts      # Logique de calcul des cycles
│   │   └── storage.ts              # Gestion du localStorage (journal, badges)
│   ├── App.tsx                     # Routeur principal
│   ├── main.tsx                    # Point d'entrée React
│   └── index.css                   # Styles globaux
├── .env                            # Variables d'environnement (à créer)
├── vite.config.ts
├── tailwind.config.ts
└── package.json
```

### Variables d'environnement

Créez un fichier `.env` à la racine du projet :

```env
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**⚠️ Important :** Ne commitez **jamais** le fichier `.env` avec vos vraies clés. Ajoutez `.env` au `.gitignore`.

### Schéma de base de données (Supabase)

**Table `profiles` (recommandé) :**
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
```

**Table `completed_routines` (optionnel, pour stockage cloud) :**
```sql
CREATE TABLE completed_routines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  routine_id TEXT NOT NULL,
  routine_title TEXT NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS
ALTER TABLE completed_routines ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own routines"
  ON completed_routines FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own routines"
  ON completed_routines FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### Fichiers clés

- **`src/contexts/AuthContext.tsx`** : Gestion de l'authentification (signUp, signIn, signOut, état utilisateur)
- **`src/pages/Auth.tsx`** : Page d'authentification avec formulaires
- **`src/lib/supabase.ts`** : Configuration du client Supabase
- **`src/utils/routinesStorage.ts`** : Fonctions de stockage des routines (localStorage)
- **`src/utils/sleepCalculator.ts`** : Algorithmes de calcul des cycles de sommeil

### Commandes utiles

```bash
# Installation des dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build de production
npm run build

# Prévisualiser le build
npm run preview

# Linter
npm run lint

# Type-check
npx tsc --noEmit
```

### Debugging

**Logs console :**
- Ouvrez les DevTools (F12)
- Onglet Console : affiche les erreurs React, Supabase, etc.
- Cherchez `console.error` dans le code pour les messages de debug

**Inspecter le localStorage :**
- DevTools > Application > Local Storage
- Clés utilisées : `sleep_logs`, `completed_routines`, `routine_templates`, `active_routine`, `onboarding_completed`

**Réseau :**
- DevTools > Network
- Filtrez par `supabase.co` pour voir les requêtes API

---

## Bonnes pratiques

1. **Complétez votre journal chaque matin** : La régularité vous aide à identifier les patterns et à ajuster vos routines.

2. **Testez plusieurs routines** : Vos besoins varient selon les jours. Une routine de 5 minutes peut suffire certains soirs, d'autres fois 15 minutes seront nécessaires.

3. **Respectez vos cycles de sommeil** : Suivez les recommandations du calculateur. Se réveiller en fin de cycle fait une énorme différence sur votre énergie matinale.

4. **Limitez les écrans 30 minutes avant la routine** : La lumière bleue perturbe la mélatonine. Si vous devez utiliser l'app, activez le thème sombre et réduisez la luminosité.

5. **Créez un environnement propice** : Température fraîche (18-20°C), obscurité, silence (ou bruit blanc), literie confortable.

6. **Soyez patient** : Les effets se font sentir après 7-10 jours de régularité. Ne vous découragez pas après 2-3 jours.

---

## Contact et support

### Signaler un bug

Si vous rencontrez un problème technique, merci de fournir les informations suivantes :

**Informations à inclure dans votre rapport :**
- **Description du problème** : Que s'est-il passé ? Que faisiez-vous ?
- **Étapes pour reproduire** : Comment recréer le bug ?
- **Comportement attendu** : Que devrait-il se passer ?
- **Navigateur et version** : Chrome 120, Firefox 115, Safari 17, etc.
- **Appareil** : Desktop Windows 11, iPhone 14, Android Samsung S23, etc.
- **Logs console** : Copiez les erreurs depuis DevTools > Console (F12)
- **Captures d'écran** : Si pertinent

**Exemple de rapport :**
```
Problème : Le minuteur ne reprend pas après pause

Étapes :
1. Lancer routine "Relaxation guidée" 10 min
2. Cliquer sur Pause après 3 minutes
3. Attendre 5 secondes
4. Cliquer sur Reprendre
5. Le minuteur reste à 0:00

Attendu : Le minuteur devrait reprendre à 7 minutes restantes

Navigateur : Chrome 120.0.6099.109 (Windows 11)
Logs console :
  Error: Cannot read property 'endAt' of null at RoutineTimer.tsx:45

Capture : [screenshot.png]
```

### Logs utiles

**Console errors :**
- Ouvrez DevTools (F12) > Console
- Copiez tous les messages en rouge (erreurs)

**Version Node (si développement local) :**
```bash
node --version
npm --version
```

**Commit SHA (si développement local) :**
```bash
git rev-parse HEAD
```

### Nous contacter

- **Email :** support@sleepreminder.app *(fictif, remplacez par votre vrai email)*
- **GitHub Issues :** [https://github.com/votre-repo/sleep-reminder/issues](https://github.com/votre-repo/sleep-reminder/issues) *(remplacez)*
- **Discord :** [Lien vers serveur Discord](https://discord.gg/xxxxx) *(si applicable)*

---

## Conclusion et call-to-action

Félicitations ! Vous avez maintenant toutes les clés pour utiliser Sleep Reminder comme un pro. 🎉

**Vos prochaines étapes :**

1. **Testez le calculateur dès ce soir** : Entrez l'heure à laquelle vous devez vous lever demain et suivez la recommandation "Optimale" pour vous coucher. Vous verrez la différence dès le réveil !

2. **Lancez votre première routine** : Choisissez une routine courte (5 minutes) pour commencer. "Respiration relaxante" est parfaite pour débuter.

3. **Notez dans votre journal** : Demain matin, ajoutez une entrée dans votre journal avec la qualité de votre sommeil. Observez les patterns au fil des jours.

**Rappel important :** La régularité est la clé. Même 5 minutes de routine chaque soir peuvent transformer votre sommeil en 7-10 jours.

Bonne nuit et dormez bien ! 🌙✨

---

*Document mis à jour le : [Date actuelle]*  
*Version de l'application : 1.0.0*  
*Guide rédigé par : [Votre nom/équipe]*
