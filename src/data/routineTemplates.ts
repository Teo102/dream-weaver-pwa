export interface RoutineTemplate {
  id: number;
  title: string;
  duration: number; // in minutes
  mood: 'calme' | 'énergisant' | 'méditatif';
  shortDescription: string;
  fullScript: string;
  steps: {
    name: string;
    duration: number;
    instruction: string;
  }[];
}

export const routineTemplates: RoutineTemplate[] = [
  {
    id: 1,
    title: "Détente Express",
    duration: 10,
    mood: 'calme',
    shortDescription: "Respiration profonde et étirements doux pour relâcher les tensions",
    fullScript: "Une routine apaisante qui combine respiration consciente et mouvements doux. Parfaite après une journée stressante, elle prépare votre corps et votre esprit au repos. Les exercices de respiration activent votre système nerveux parasympathique, tandis que les étirements relâchent les tensions musculaires accumulées. Cette routine est idéale pour les débutants et peut être pratiquée même dans un petit espace.",
    steps: [
      {
        name: "Respiration consciente",
        duration: 3,
        instruction: "Inspirez profondément par le nez pendant 4 secondes, retenez 2 secondes, expirez par la bouche pendant 6 secondes"
      },
      {
        name: "Étirements du cou",
        duration: 2,
        instruction: "Roulez doucement la tête de droite à gauche, puis inclinez délicatement sur les côtés"
      },
      {
        name: "Étirements des épaules",
        duration: 2,
        instruction: "Levez et abaissez les épaules, puis effectuez des rotations lentes vers l'arrière"
      },
      {
        name: "Relaxation progressive",
        duration: 3,
        instruction: "Contractez puis relâchez chaque groupe musculaire, des pieds jusqu'à la tête"
      }
    ]
  },
  {
    id: 2,
    title: "Méditation Guidée",
    duration: 10,
    mood: 'méditatif',
    shortDescription: "Voyage intérieur avec visualisation apaisante et pleine conscience",
    fullScript: "Une expérience méditative douce qui vous guide vers un état de calme profond. Cette routine utilise des techniques de visualisation et de pleine conscience pour apaiser l'esprit bavard et préparer au sommeil. Vous explorerez des images relaxantes tout en développant votre capacité à observer vos pensées sans jugement. Idéale pour ceux qui ont du mal à 'éteindre' leur mental le soir.",
    steps: [
      {
        name: "Ancrage corporel",
        duration: 2,
        instruction: "Sentez votre corps en contact avec le sol, prenez conscience de votre respiration naturelle"
      },
      {
        name: "Scan corporel",
        duration: 3,
        instruction: "Parcourez mentalement votre corps de la tête aux pieds, relâchez chaque zone de tension"
      },
      {
        name: "Visualisation nature",
        duration: 3,
        instruction: "Imaginez-vous dans un lieu naturel paisible : forêt, plage ou montagne"
      },
      {
        name: "Observation des pensées",
        duration: 2,
        instruction: "Laissez vos pensées passer comme des nuages dans le ciel, sans vous y accrocher"
      }
    ]
  },
  {
    id: 3,
    title: "Yoga Nocturne",
    duration: 10,
    mood: 'calme',
    shortDescription: "Postures douces et respirations pour préparer le corps au repos",
    fullScript: "Une séquence de yoga adaptée spécialement pour le soir, combinant postures restauratrices et techniques de respiration. Ces mouvements lents et contrôlés favorisent la circulation, étirent les muscles tendus et calment le système nerveux. La pratique se termine par une posture de relaxation qui facilite la transition vers le sommeil. Aucune expérience préalable en yoga n'est nécessaire.",
    steps: [
      {
        name: "Posture de l'enfant",
        duration: 2,
        instruction: "Agenouillez-vous, asseyez-vous sur vos talons, étendez les bras devant vous"
      },
      {
        name: "Chat-vache",
        duration: 2,
        instruction: "À quatre pattes, alternez entre dos rond (chat) et dos creusé (vache)"
      },
      {
        name: "Torsion assise",
        duration: 3,
        instruction: "Assis en tailleur, tournez doucement le buste à droite puis à gauche"
      },
      {
        name: "Jambes au mur",
        duration: 3,
        instruction: "Allongez-vous, jambes contre le mur, bras relâchés le long du corps"
      }
    ]
  },
  {
    id: 4,
    title: "Gratitude & Réflexion",
    duration: 10,
    mood: 'méditatif',
    shortDescription: "Bilan positif de la journée et intentions pour une nuit paisible",
    fullScript: "Une routine de réflexion bienveillante qui transforme votre fin de journée en moment de reconnaissance et de paix intérieure. En revisitant les moments positifs de votre journée et en formulant des intentions douces, vous créez un état d'esprit propice au repos. Cette pratique améliore progressivement votre sommeil et votre bien-être général en ancrant des habitudes de pensée positive.",
    steps: [
      {
        name: "Respiration d'ouverture",
        duration: 2,
        instruction: "Respirez profondément en plaçant une main sur le cœur, sentez la gratitude"
      },
      {
        name: "3 gratitudes du jour",
        duration: 3,
        instruction: "Identifiez trois choses pour lesquelles vous êtes reconnaissant aujourd'hui"
      },
      {
        name: "Pardon et lâcher-prise",
        duration: 2,
        instruction: "Relâchez les tensions, pardonnez-vous les imperfections de la journée"
      },
      {
        name: "Intention pour la nuit",
        duration: 3,
        instruction: "Formulez une intention douce pour votre sommeil et le lendemain"
      }
    ]
  },
  {
    id: 5,
    title: "Auto-massage Détente",
    duration: 10,
    mood: 'calme',
    shortDescription: "Massages doux du visage, nuque et pieds pour relâcher les tensions",
    fullScript: "Une routine d'auto-massage thérapeutique qui libère les tensions physiques accumulées dans les zones clés du corps. En stimulant doucement les points de pression et en massant les muscles tendus, vous favorisez la circulation sanguine et la production d'endorphines naturelles. Cette pratique tactile est particulièrement efficace pour ceux qui portent leurs stress dans le corps et ont besoin d'une approche physique pour se détendre.",
    steps: [
      {
        name: "Massage du cuir chevelu",
        duration: 2,
        instruction: "Massez délicatement le cuir chevelu avec le bout des doigts, mouvements circulaires"
      },
      {
        name: "Détente du visage",
        duration: 3,
        instruction: "Massez les tempes, les mâchoires et le front pour relâcher les tensions faciales"
      },
      {
        name: "Nuque et épaules",
        duration: 3,
        instruction: "Pétrissez doucement la nuque et les trapèzes pour libérer les nœuds"
      },
      {
        name: "Massage des pieds",
        duration: 2,
        instruction: "Massez la voûte plantaire et les orteils pour favoriser la détente globale"
      }
    ]
  },
  {
    id: 6,
    title: "Sons & Vibrations",
    duration: 10,
    mood: 'énergisant',
    shortDescription: "Techniques sonores et bourdonnements pour libérer le stress",
    fullScript: "Une routine énergétique unique qui utilise la puissance des vibrations sonores pour évacuer le stress et recentrer l'énergie. Les bourdonnements et sons créent des vibrations internes qui massent naturellement les organes et calment le système nerveux. Cette approche originale convient particulièrement aux personnes qui ont besoin d'exprimer et de libérer les tensions avant de pouvoir se détendre profondément.",
    steps: [
      {
        name: "Bourdonnement abeille",
        duration: 3,
        instruction: "Inspirez, puis expirez en faisant un son 'mmm' continu, sentez les vibrations"
      },
      {
        name: "Sons voyelles",
        duration: 3,
        instruction: "Chantez doucement 'Ahh', 'Ehh', 'Ihh', 'Ohh', 'Uhh' pour libérer les tensions"
      },
      {
        name: "Tapotements rythmés",
        duration: 2,
        instruction: "Tapotez légèrement votre corps avec les mains, du haut vers le bas"
      },
      {
        name: "Silence vibrant",
        duration: 2,
        instruction: "Restez immobile et sentez les vibrations résiduelles dans votre corps"
      }
    ]
  }
];

// Scripts pour exportation
export const routineScripts = {
  "detente-express": {
    title: "Routine Détente Express",
    duration: "10 minutes",
    mood: "Calme et apaisant",
    shortScript: "Respiration profonde + étirements doux pour relâcher tensions. Idéal après journée stressante.",
    fullScript: `ROUTINE DÉTENTE EXPRESS - 10 MINUTES

PRÉPARATION (30 secondes)
Installez-vous confortablement, assis ou debout. Fermez les yeux ou regardez un point fixe. Prenez conscience de votre corps et de votre respiration naturelle.

PHASE 1 - RESPIRATION CONSCIENTE (3 minutes)
Placez une main sur la poitrine, l'autre sur le ventre. Inspirez profondément par le nez pendant 4 secondes en gonflant le ventre. Retenez l'air 2 secondes. Expirez lentement par la bouche pendant 6 secondes en rentrant le ventre. Répétez ce cycle en vous concentrant uniquement sur votre souffle. Si votre esprit divague, ramenez doucement votre attention sur la respiration.

PHASE 2 - ÉTIREMENTS DU HAUT (4 minutes)
Roulez la tête lentement de droite à gauche 5 fois. Inclinez délicatement la tête sur l'épaule droite, maintenez 15 secondes, puis côté gauche. Levez les épaules vers les oreilles, maintenez 5 secondes, relâchez. Effectuez 10 rotations d'épaules vers l'arrière. Étirez les bras au-dessus de la tête, entrelacez les doigts, poussez vers le haut.

PHASE 3 - RELAXATION PROGRESSIVE (2 minutes 30)
Contractez fortement les pieds 5 secondes, relâchez complètement. Remontez : mollets, cuisses, fessiers, abdomen, poings, bras, épaules, visage. Contractez chaque zone 5 secondes puis relâchez totalement. Terminez par une respiration profonde et ouvrez doucement les yeux.

Cette routine calme le système nerveux et prépare naturellement au sommeil.`
  },
  
  "meditation-guidee": {
    title: "Méditation Guidée Sommeil",
    duration: "10 minutes", 
    mood: "Méditatif et introspectif",
    shortScript: "Voyage intérieur avec visualisation nature. Apaise l'esprit bavard avant le coucher.",
    fullScript: `MÉDITATION GUIDÉE SOMMEIL - 10 MINUTES

ANCRAGE INITIAL (2 minutes)
Allongez-vous confortablement, les bras le long du corps, paumes vers le haut. Fermez les yeux. Sentez votre corps en contact avec le matelas. Remarquez les points d'appui : tête, épaules, dos, fessiers, jambes. Votre corps devient lourd et détendu. Observez votre respiration naturelle sans la modifier. L'air entre, l'air sort. Vous êtes en sécurité, vous pouvez vous détendre complètement.

SCAN CORPOREL (3 minutes)
Dirigez votre attention vers le sommet de votre tête. Imaginez une vague de détente qui descend lentement. Cette vague passe par votre front, relâche vos sourcils, vos yeux, vos joues. Elle détend votre mâchoire, votre cou, vos épaules. La vague continue dans vos bras, vos mains, votre poitrine, votre abdomen. Elle descend dans votre bassin, vos cuisses, vos mollets, vos pieds. Chaque partie touchée devient lourde et détendue.

VISUALISATION NATURE (3 minutes)
Imaginez-vous dans une clairière forestière au coucher du soleil. L'air est doux et parfumé. Vous entendez le chant d'oiseaux au loin, le murmure d'un ruisseau. Les rayons dorés filtrent entre les arbres. Vous vous allongez sur l'herbe moelleuse. Le sol vous porte, vous berce. Le ciel se teinte de couleurs douces : rose, orange, violet. Les premières étoiles apparaissent. Vous êtes en paix, protégé par la nature.

RETOUR ET INTENTION (2 minutes)
Les images s'estompent doucement. Vous restez dans cette sensation de paix profonde. Formulez mentalement : "Je m'endors facilement et naturellement. Mon sommeil est réparateur. Je me réveille reposé et serein." Laissez cette intention s'ancrer en vous. Gardez les yeux fermés et glissez naturellement vers le sommeil.`
  },

  "yoga-nocturne": {
    title: "Yoga Nocturne Restaurateur", 
    duration: "10 minutes",
    mood: "Calme et ancrant",
    shortScript: "Postures douces + respirations pour préparer le corps au repos. Aucune expérience requise.",
    fullScript: `YOGA NOCTURNE RESTAURATEUR - 10 MINUTES

PRÉPARATION
Portez des vêtements confortables. Vous aurez besoin d'un tapis ou d'une couverture, et éventuellement d'un coussin. Créez un espace calme, éclairage tamisé. Commencez assis en tailleur, les mains sur les genoux.

POSTURE DE L'ENFANT (2 minutes)
Agenouillez-vous, gros orteils qui se touchent, genoux écartés largeur des hanches. Asseyez-vous sur vos talons. Expirez et penchez-vous vers l'avant, front au sol. Étendez les bras devant vous ou le long du corps. Respirez profondément. Cette posture calme le système nerveux et étire le dos. Restez 2 minutes en respirant lentement.

CHAT-VACHE (2 minutes)
Placez-vous à quatre pattes, poignets sous les épaules, genoux sous les hanches. Sur l'inspiration, creusez le dos, levez la tête et le coccyx (vache). Sur l'expiration, arrondissez le dos, rentrez le menton (chat). Alternez lentement 10 fois. Ce mouvement masse les organes internes et assouplit la colonne.

TORSION ASSISE (3 minutes)
Asseyez-vous jambes croisées. Placez la main droite au sol derrière vous, la main gauche sur le genou droit. Inspirez, allongez la colonne. Expirez, tournez doucement vers la droite. Respirez 5 fois. Revenez au centre et changez de côté. Les torsions détoxifient et relâchent les tensions du dos.

JAMBES AU MUR (3 minutes)
Allongez-vous près d'un mur. Levez les jambes contre le mur, bras relâchés le long du corps, paumes vers le haut. Si inconfortable, pliez légèrement les genoux ou mettez un coussin sous les fesses. Fermez les yeux, respirez naturellement. Cette posture inverse la circulation et calme le mental. Terminez en pliant les genoux et roulant sur le côté avant de vous asseoir.`
  },

  "gratitude-reflexion": {
    title: "Gratitude & Réflexion Positive",
    duration: "10 minutes",
    mood: "Méditatif et bienveillant", 
    shortScript: "Bilan positif de la journée + intentions douces. Transforme l'état d'esprit avant le coucher.",
    fullScript: `GRATITUDE & RÉFLEXION POSITIVE - 10 MINUTES

OUVERTURE DU CŒUR (2 minutes)
Asseyez-vous confortablement ou allongez-vous. Placez les deux mains sur votre cœur. Fermez les yeux. Respirez profondément et sentez la chaleur de vos mains. À chaque inspiration, imaginez que votre cœur s'ouvre comme une fleur. À chaque expiration, laissez partir les tensions de la journée. Répétez mentalement : "Je suis reconnaissant pour cette journée, même avec ses imperfections."

TROIS GRATITUDES (3 minutes)
Réfléchissez à votre journée et identifiez trois choses pour lesquelles vous êtes reconnaissant. Cela peut être simple : un repas savoureux, un sourire reçu, un moment de solitude, une réussite petite ou grande, un geste bienveillant. Pour chaque gratitude, prenez le temps de vraiment ressentir cette reconnaissance dans votre corps. Dites mentalement "Merci" et laissez cette émotion positive vous remplir.

PARDON ET LÂCHER-PRISE (2 minutes)
Pensez aux moments difficiles de la journée, aux erreurs, aux frustrations. Sans analyser ni juger, dites simplement : "J'accepte cette imperfection. Je me pardonne. Je lâche prise." Imaginez ces tensions qui s'évaporent comme de la fumée. Vous n'avez pas besoin d'être parfait. Vous avez fait de votre mieux avec les ressources du moment.

INTENTION DOUCE (3 minutes)
Formulez une intention bienveillante pour votre nuit et le lendemain. Pas un objectif stressant, mais un souhait doux. Par exemple : "Je souhaite me réveiller reposé", "Je veux aborder demain avec sérénité", "J'ai confiance en ma capacité à bien vivre ma journée de demain." Répétez cette intention trois fois en respirant profondément. Laissez-la s'ancrer dans votre cœur comme une graine que vous plantez.`
  },

  "auto-massage": {
    title: "Auto-massage Détente Complète",
    duration: "10 minutes",
    mood: "Calme et tactile",
    shortScript: "Massages visage, nuque, pieds pour relâcher tensions physiques. Stimule la circulation.",
    fullScript: `AUTO-MASSAGE DÉTENTE COMPLÈTE - 10 MINUTES

PRÉPARATION
Installez-vous assis sur une chaise ou en tailleur. Enlevez bijoux et chaussures. Réchauffez vos mains en les frottant énergiquement pendant 10 secondes. Vous allez être votre propre thérapeute pour les 10 prochaines minutes.

MASSAGE DU CUIR CHEVELU (2 minutes)
Placez le bout de vos doigts sur votre cuir chevelu. Effectuez de petits mouvements circulaires en appuyant légèrement, comme si vous vous shampoouiniez. Commencez par les tempes, remontez vers le sommet du crâne, puis descendez vers la nuque. Massez également derrière les oreilles. Cette technique stimule la circulation et libère les tensions mentales accumulées.

DÉTENTE DU VISAGE (3 minutes)
Massez vos tempes avec de petits cercles pendant 30 secondes. Placez les pouces sous les pommettes et massez vers l'extérieur. Pincez délicatement vos sourcils de l'intérieur vers l'extérieur. Massez vos mâchoires avec les paumes, elles portent souvent le stress. Terminez en lissant votre front avec les doigts, de l'intérieur vers les tempes.

NUQUE ET ÉPAULES (3 minutes)
Inclinez la tête vers l'avant. Placez une main derrière la nuque et pétrissez doucement les muscles tendus. Utilisez l'autre main pour masser l'épaule opposée, en insistant sur les nœuds. Changez de côté. Effectuez des rotations d'épaules lentes. Ces zones accumulent énormément de tensions, soyez patient et doux.

MASSAGE DES PIEDS (2 minutes)
Asseyez-vous et posez un pied sur l'autre cuisse. Avec les pouces, massez fermement la voûte plantaire en petits cercles. Insistez sur le centre du pied (point réflexe de détente). Massez chaque orteil en le tirant légèrement. Changez de pied. Les pieds contiennent de nombreux points de pression liés à la relaxation générale. Terminez en vous tenant debout et en vous étirant vers le ciel.`
  },

  "sons-vibrations": {
    title: "Sons & Vibrations Thérapeutiques",
    duration: "10 minutes",
    mood: "Énergisant et libérateur",
    shortScript: "Techniques sonores et bourdonnements pour évacuer stress. Approche unique et efficace.",
    fullScript: `SONS & VIBRATIONS THÉRAPEUTIQUES - 10 MINUTES

INTRODUCTION
Cette routine utilise le pouvoir des vibrations sonores pour libérer tensions et stress. Les sons créent des vibrations internes qui massent naturellement vos organes et calment votre système nerveux. N'ayez pas peur de faire du bruit, c'est thérapeutique !

BOURDONNEMENT ABEILLE (3 minutes)
Asseyez-vous confortablement, fermez les yeux. Inspirez profondément par le nez. Sur l'expiration, fermez la bouche et faites un son "mmmmm" continu, comme une abeille. Sentez les vibrations dans votre tête, votre poitrine. Répétez 10 fois. Variez les tons : grave, aigu, moyen. Ce son active le nerf vague et induit la relaxation. Plus vous vibrez, plus vous relâchez.

SONS VOYELLES LIBÉRATEURS (3 minutes)
Inspirez profondément. Sur l'expiration, chantez une voyelle pendant 15 secondes :
- "Ahhhh" (bouche ouverte) - libère la gorge et la poitrine
- "Ehhhhh" (bouche semi-ouverte) - détend le cœur
- "Ihhhhh" (bouche fermée sourire) - apaise le mental  
- "Ohhhhh" (bouche ronde) - relaxe le ventre
- "Uhhhhh" (bouche fermée) - ancre dans le corps
Répétez chaque voyelle 2 fois. Sentez où résonne chaque son dans votre corps.

TAPOTEMENTS RYTHMÉS (2 minutes)
Debout, tapotez délicatement votre corps avec les paumes ou le bout des doigts. Commencez par le sommet du crâne, descendez vers le visage, les épaules, les bras, la poitrine, le ventre, les cuisses, les mollets. Remontez. Le rythme peut être lent et régulier ou plus vif selon votre besoin. Cette technique réveille la circulation et libère l'énergie stagnante.

SILENCE VIBRANT (2 minutes)
Asseyez-vous en silence complet. Fermez les yeux et portez toute votre attention sur les sensations dans votre corps. Sentez les vibrations résiduelles, la chaleur, les picotements. Votre corps continue de "résonner" après les sons. Cette phase intègre les bienfaits de la pratique. Respirez naturellement et savourez cette détente vibrante unique.`
  }
};