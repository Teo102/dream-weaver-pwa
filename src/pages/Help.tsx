import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  BookOpen, 
  ChevronRight, 
  Home,
  Lock,
  Moon,
  Calculator as CalcIcon,
  BookText,
  Trophy,
  Brain,
  Settings,
  AlertCircle,
  Code,
  Heart,
  Mail
} from 'lucide-react';

interface Section {
  id: string;
  title: string;
  icon: any;
  subsections?: { id: string; title: string }[];
}

const sections: Section[] = [
  { id: 'premiers-pas', title: 'Premiers pas', icon: Home },
  { 
    id: 'authentification', 
    title: 'Authentification', 
    icon: Lock,
    subsections: [
      { id: 'inscription', title: 'Inscription' },
      { id: 'connexion', title: 'Connexion' },
      { id: 'recuperation', title: 'Récupération mot de passe' },
      { id: 'sans-compte', title: 'Continuer sans compte' },
    ]
  },
  { id: 'ecran-accueil', title: 'Écran d\'accueil', icon: Home },
  { id: 'calculateur', title: 'Calculateur de sommeil', icon: CalcIcon },
  { 
    id: 'routines', 
    title: 'Routines du soir', 
    icon: Moon,
    subsections: [
      { id: 'selectionner-routine', title: 'Sélectionner une routine' },
      { id: 'gerer-minuteur', title: 'Gérer le minuteur' },
      { id: 'personnaliser-durees', title: 'Personnaliser les durées' },
    ]
  },
  { id: 'journal', title: 'Journal de sommeil', icon: BookText },
  { id: 'badges', title: 'Badges et réussites', icon: Trophy },
  { id: 'comprendre', title: 'Comprendre le sommeil', icon: Brain },
  { id: 'parametres', title: 'Paramètres', icon: Settings },
  { id: 'depannage', title: 'Dépannage et FAQ', icon: AlertCircle },
  { id: 'developpeurs', title: 'Pour les développeurs', icon: Code },
  { id: 'bonnes-pratiques', title: 'Bonnes pratiques', icon: Heart },
  { id: 'contact', title: 'Contact et support', icon: Mail },
];

export const Help = () => {
  const [activeSection, setActiveSection] = useState('premiers-pas');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <BookOpen className="h-12 w-12 mx-auto mb-4 text-primary animate-pulse-glow" />
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Guide d'utilisation - Sleep Reminder
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Bienvenue dans Sleep Reminder ! Ce guide vous accompagne pas à pas dans toutes les fonctionnalités.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            ⏱️ Temps de lecture estimé : 15-20 minutes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Table of contents - Sidebar */}
          <aside className="lg:col-span-1">
            <Card className="p-4 sticky top-4 border-primary/20 bg-card/50">
              <h2 className="text-lg font-semibold mb-4 text-foreground">
                📑 Table des matières
              </h2>
              <ScrollArea className="h-[calc(100vh-200px)]">
                <nav className="space-y-1" aria-label="Guide navigation">
                  {sections.map((section) => {
                    const SectionIcon = section.icon;
                    return (
                      <div key={section.id}>
                        <button
                          onClick={() => scrollToSection(section.id)}
                          className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                            activeSection === section.id
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-muted text-foreground'
                          }`}
                          aria-label={`Aller à la section ${section.title}`}
                        >
                          <SectionIcon className="h-4 w-4 flex-shrink-0" />
                          <span className="flex-1 truncate">{section.title}</span>
                          {section.subsections && <ChevronRight className="h-3 w-3" />}
                        </button>
                        {section.subsections && (
                          <div className="ml-6 mt-1 space-y-1">
                            {section.subsections.map((sub) => (
                              <button
                                key={sub.id}
                                onClick={() => scrollToSection(sub.id)}
                                className={`w-full text-left px-3 py-1 rounded text-xs transition-colors ${
                                  activeSection === sub.id
                                    ? 'text-primary font-medium'
                                    : 'text-muted-foreground hover:text-foreground'
                                }`}
                              >
                                {sub.title}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </nav>
              </ScrollArea>
            </Card>
          </aside>

          {/* Main content */}
          <main className="lg:col-span-3">
            <Card className="p-6 md:p-8 border-primary/20 bg-card/50">
              <div className="prose prose-sm md:prose-base max-w-none prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground prose-a:text-primary">
                
                {/* Section: Premiers pas */}
                <section id="premiers-pas" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center">
                    <Home className="h-6 w-6 mr-2 text-primary" />
                    Premiers pas
                  </h2>
                  <p>
                    Sleep Reminder est conçu pour vous aider à retrouver un sommeil de qualité en respectant vos cycles naturels de 90 minutes. 
                    L'application fonctionne entièrement dans votre navigateur et sauvegarde vos données localement sur votre appareil.
                  </p>
                  
                  <div className="bg-primary/10 border-l-4 border-primary p-4 rounded my-4">
                    <p className="font-semibold text-primary mb-1">✅ Compatibilité</p>
                    <ul className="text-sm space-y-1 mb-0">
                      <li>Navigateurs modernes (Chrome, Firefox, Safari, Edge)</li>
                      <li>Mobile et tablette (responsive)</li>
                      <li>Fonctionne hors ligne une fois chargée (PWA)</li>
                    </ul>
                  </div>
                </section>

                {/* Section: Authentification */}
                <section id="authentification" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center">
                    <Lock className="h-6 w-6 mr-2 text-primary" />
                    Authentification
                  </h2>
                  <p>
                    Sleep Reminder propose deux modes d'utilisation : avec ou sans compte utilisateur.
                  </p>

                  {/* Inscription */}
                  <div id="inscription" className="mt-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Inscription</h3>
                    <p className="mb-2">
                      <strong>Description :</strong> Créez un compte pour synchroniser vos données et accéder à des fonctionnalités avancées.
                    </p>
                    <p className="mb-3">
                      <strong>Utilité :</strong> Avoir un compte vous permet de retrouver votre historique sur plusieurs appareils et de sécuriser vos données.
                    </p>
                    <p className="font-medium mb-2">Guide pas-à-pas :</p>
                    <ol className="space-y-2">
                      <li>Sur la page d'accueil, cliquez sur <strong>"Se connecter / S'inscrire"</strong> ou accédez à <code>/auth</code></li>
                      <li>Cliquez sur le lien <strong>"Je n'ai pas encore de compte"</strong></li>
                      <li>Entrez votre adresse email dans le champ prévu</li>
                      <li>Choisissez un mot de passe (minimum 6 caractères)</li>
                      <li>Utilisez l'icône d'œil 👁️ pour afficher/masquer votre mot de passe si besoin</li>
                      <li>Cliquez sur <strong>"Créer mon compte"</strong></li>
                      <li>Consultez votre boîte mail et confirmez votre inscription</li>
                    </ol>
                    
                    <div className="bg-blue-500/10 border-l-4 border-blue-500 p-3 rounded my-3">
                      <p className="text-sm mb-0">
                        <strong>💡 Astuce :</strong> Utilisez un gestionnaire de mots de passe pour générer et sauvegarder un mot de passe sécurisé.
                      </p>
                    </div>

                    <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-3 rounded my-3">
                      <p className="text-sm mb-0">
                        <strong>⚠️ Erreur courante :</strong> "Cet email est déjà utilisé" - Essayez de vous connecter ou de réinitialiser votre mot de passe.
                      </p>
                    </div>
                  </div>

                  {/* Connexion */}
                  <div id="connexion" className="mt-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Connexion</h3>
                    <p className="mb-2">
                      <strong>Description :</strong> Accédez à votre compte existant pour retrouver vos données.
                    </p>
                    <p className="mb-3">
                      <strong>Utilité :</strong> La connexion vous permet de récupérer votre historique de sommeil, vos routines favorites et vos badges.
                    </p>
                    <p className="font-medium mb-2">Guide pas-à-pas :</p>
                    <ol className="space-y-2">
                      <li>Accédez à la page <code>/auth</code></li>
                      <li>Entrez votre email et votre mot de passe</li>
                      <li>Cliquez sur l'icône d'œil 👁️ pour vérifier votre mot de passe si besoin</li>
                      <li>Cliquez sur <strong>"Se connecter"</strong></li>
                      <li>Vous serez redirigé vers l'écran d'accueil</li>
                    </ol>

                    <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-3 rounded my-3">
                      <p className="text-sm font-semibold mb-1">⚠️ Erreurs courantes :</p>
                      <ul className="text-sm space-y-1 mb-0">
                        <li><strong>"Email ou mot de passe incorrect"</strong> : Vérifiez que vous avez confirmé votre email lors de l'inscription.</li>
                        <li><strong>"Veuillez confirmer votre email"</strong> : Consultez votre boîte mail.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Récupération mot de passe */}
                  <div id="recuperation" className="mt-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Récupération de mot de passe</h3>
                    <p className="mb-3">
                      <strong>Description :</strong> Réinitialisez votre mot de passe si vous l'avez oublié.
                    </p>
                    <ol className="space-y-2">
                      <li>Sur la page de connexion, cliquez sur <strong>"Mot de passe oublié ?"</strong></li>
                      <li>Entrez votre adresse email</li>
                      <li>Cliquez sur <strong>"Envoyer le lien de réinitialisation"</strong></li>
                      <li>Consultez votre boîte mail (vérifiez les spams)</li>
                      <li>Cliquez sur le lien dans l'email</li>
                      <li>Choisissez un nouveau mot de passe</li>
                    </ol>
                  </div>

                  {/* Sans compte */}
                  <div id="sans-compte" className="mt-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Continuer sans compte</h3>
                    <p className="mb-2">
                      <strong>Description :</strong> Utilisez l'application sans créer de compte, avec stockage local uniquement.
                    </p>
                    <p className="mb-3">
                      <strong>Utilité :</strong> Parfait pour tester l'application. Vos données restent privées sur votre appareil, mais ne seront pas synchronisées.
                    </p>
                    <ol className="space-y-2">
                      <li>Sur la page d'authentification, cliquez sur <strong>"Continuer sans compte"</strong></li>
                      <li>Vous êtes redirigé vers l'application</li>
                      <li>Toutes les fonctionnalités sont disponibles</li>
                    </ol>
                    
                    <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-3 rounded my-3">
                      <p className="text-sm mb-0">
                        <strong>⚠️ Attention :</strong> Sans compte, les données sont stockées localement. Si vous nettoyez le cache navigateur, vos données seront perdues.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section: Écran d'accueil */}
                <section id="ecran-accueil" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center">
                    <Home className="h-6 w-6 mr-2 text-primary" />
                    Écran d'accueil et navigation
                  </h2>
                  <p className="mb-3">
                    <strong>Description :</strong> L'écran d'accueil (<code>/app</code>) est le point central où vous accédez à toutes les fonctionnalités.
                  </p>
                  <p className="mb-3">
                    <strong>Utilité :</strong> Vue d'ensemble de votre progression, actions rapides et activité récente.
                  </p>
                  
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 my-4">
                    <p className="font-semibold text-foreground mb-2">🏠 Éléments de la page d'accueil :</p>
                    <ul className="space-y-2 text-sm">
                      <li><strong>Logo et titre</strong> : Sleep Reminder avec icône lune 🌙</li>
                      <li><strong>Série de jours</strong> : Carte avec étoile ⭐ affichant vos jours consécutifs</li>
                      <li><strong>4 actions rapides</strong> :
                        <ul className="ml-6 mt-1">
                          <li>Calculateur ⏰ → <code>/calculator</code></li>
                          <li>Routine 🌙 → <code>/routine</code></li>
                          <li>Journal 📅 → <code>/journal</code></li>
                          <li>Badges 🏆 → <code>/achievements</code></li>
                        </ul>
                      </li>
                      <li><strong>"Comprendre le sommeil"</strong> 🧠 → <code>/comprendre-sommeil</code></li>
                      <li><strong>Activité récente</strong> : 3 dernières entrées de journal</li>
                      <li><strong>Bouton fixe en bas</strong> : "Démarrer routine"</li>
                    </ul>
                  </div>

                  <div className="bg-blue-500/10 border-l-4 border-blue-500 p-3 rounded my-3">
                    <p className="text-sm mb-0">
                      <strong>💡 Astuce :</strong> Ajoutez l'application à votre écran d'accueil mobile (PWA) pour un accès encore plus rapide.
                    </p>
                  </div>
                </section>

                {/* Section: Calculateur */}
                <section id="calculateur" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center">
                    <CalcIcon className="h-6 w-6 mr-2 text-primary" />
                    Calculateur de sommeil
                  </h2>
                  <p className="mb-2">
                    <strong>Description :</strong> Le calculateur vous aide à trouver les meilleures heures de coucher ou de réveil en fonction des cycles de 90 minutes.
                  </p>
                  <p className="mb-3">
                    <strong>Utilité :</strong> Se réveiller en fin de cycle vous laisse reposé et alerte, tandis que se réveiller au milieu d'un cycle vous laisse fatigué.
                  </p>
                  
                  <p className="font-medium mb-2">Guide pas-à-pas :</p>
                  <ol className="space-y-2">
                    <li>Cliquez sur <strong>"Calculateur"</strong> depuis l'écran d'accueil</li>
                    <li>Choisissez votre mode avec le bouton bascule :
                      <ul className="ml-6 mt-1">
                        <li><strong>"Je veux me réveiller à"</strong> ☀️ : calcule les heures de coucher</li>
                        <li><strong>"Je veux me coucher à"</strong> 🌙 : calcule les heures de réveil</li>
                      </ul>
                    </li>
                    <li>Saisissez l'heure souhaitée (format HH:MM)</li>
                    <li>Ajustez le curseur <strong>"Temps d'endormissement"</strong> (5-45 min, défaut 15 min)</li>
                    <li>Cliquez sur <strong>"Calculer les heures"</strong></li>
                    <li>Une liste de résultats apparaît (4 à 6 options)</li>
                    <li>L'option <strong>"⭐ Optimal"</strong> est mise en avant</li>
                    <li>Chaque résultat affiche :
                      <ul className="ml-6 mt-1">
                        <li>L'heure exacte</li>
                        <li>Le nombre de cycles complets (ex : 🔄 5 cycles)</li>
                        <li>La durée totale de sommeil (ex : ⏰ 7h30)</li>
                      </ul>
                    </li>
                  </ol>

                  <div className="bg-blue-500/10 border-l-4 border-blue-500 p-3 rounded my-3">
                    <p className="text-sm font-semibold mb-1">💡 Astuces :</p>
                    <ul className="text-sm space-y-1 mb-0">
                      <li>L'heure "Optimale" correspond à un réveil en fin de cycle</li>
                      <li>Si vous avez du mal à vous endormir, augmentez le temps d'endormissement (20-30 min)</li>
                      <li>Visez 5 ou 6 cycles complets (7h30 ou 9h) pour un sommeil idéal</li>
                    </ul>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 my-4">
                    <p className="font-semibold text-foreground mb-2">📖 Exemples d'usage :</p>
                    <ul className="text-sm space-y-2 mb-0">
                      <li><strong>Scénario 1 :</strong> Vous devez vous lever à 7h00. Vous entrez "07:00", l'app suggère 23h15 (5 cycles) ou 21h45 (6 cycles).</li>
                      <li><strong>Scénario 2 :</strong> Vous voulez dormir à 23h00. L'app vous dit de programmer votre réveil à 6h30 ou 8h00.</li>
                      <li><strong>Scénario 3 :</strong> Décalage horaire après un voyage : vous entrez votre heure de coucher, l'app calcule les meilleurs réveils.</li>
                    </ul>
                  </div>
                </section>

                {/* Section: Routines */}
                <section id="routines" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center">
                    <Moon className="h-6 w-6 mr-2 text-primary" />
                    Routines du soir
                  </h2>
                  <p className="mb-4">
                    Les routines du soir sont des séquences guidées étape par étape pour vous préparer mentalement et physiquement au sommeil.
                  </p>

                  {/* Sélectionner une routine */}
                  <div id="selectionner-routine" className="mt-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Sélectionner une routine</h3>
                    <p className="mb-3">
                      <strong>Description :</strong> Parcourez les routines disponibles et choisissez celle qui correspond à vos besoins.
                    </p>
                    <p className="font-medium mb-2">Routines disponibles :</p>
                    <ul className="space-y-1">
                      <li><strong>Relaxation guidée</strong> : Méditation et visualisation</li>
                      <li><strong>Respiration relaxante</strong> : Techniques de respiration (4-7-8, cohérence cardiaque)</li>
                      <li><strong>Déconnexion numérique</strong> : Rituel pour se détacher des écrans</li>
                      <li><strong>Étirements doux</strong> : Mouvements légers pour relâcher les tensions</li>
                      <li><strong>Journal calme</strong> : Écriture réflexive et gratitude</li>
                      <li><strong>Préparation du cocon</strong> : Optimisation de l'environnement de sommeil</li>
                    </ul>

                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 my-4">
                      <p className="font-semibold text-foreground mb-1">📖 Exemples d'usage :</p>
                      <ul className="text-sm space-y-1 mb-0">
                        <li><strong>Routine relaxante avant examen :</strong> "Respiration relaxante" 10 min</li>
                        <li><strong>Après journée intense :</strong> "Relaxation guidée" 15 min</li>
                        <li><strong>Sommeil court après décalage horaire :</strong> "Déconnexion numérique" 5 min</li>
                      </ul>
                    </div>
                  </div>

                  {/* Gérer le minuteur */}
                  <div id="gerer-minuteur" className="mt-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Démarrer et gérer le minuteur</h3>
                    <p className="mb-3">
                      <strong>Description :</strong> Une fois la routine lancée, un minuteur vous guide étape par étape.
                    </p>
                    <p className="font-medium mb-2">Guide pas-à-pas :</p>
                    <ol className="space-y-2">
                      <li>Après avoir cliqué sur "Démarrer", une fenêtre modale apparaît</li>
                      <li>Sélectionnez la durée (5, 10, 15 minutes...)</li>
                      <li>Cliquez sur <strong>"Confirmer et démarrer"</strong></li>
                      <li>Le minuteur s'affiche avec :
                        <ul className="ml-6 mt-1">
                          <li>Temps restant total (ex : 09:45)</li>
                          <li>Nom de l'étape actuelle (ex : "Respiration profonde")</li>
                          <li>Instructions textuelles</li>
                          <li>Boutons : Pause ⏸️, Reprendre ▶️, Arrêter ⏹️</li>
                        </ul>
                      </li>
                    </ol>

                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 my-4">
                      <p className="font-semibold text-foreground mb-2">🎛️ Contrôles disponibles :</p>
                      <ul className="text-sm space-y-1 mb-0">
                        <li><strong>Pause (⏸️)</strong> : Met en pause le minuteur</li>
                        <li><strong>Reprendre (▶️)</strong> : Reprend là où vous étiez</li>
                        <li><strong>Arrêter (⏹️)</strong> : Ouvre une boîte de confirmation avec options "Marquer comme complétée" ou "Abandonner"</li>
                      </ul>
                    </div>

                    <div className="bg-blue-500/10 border-l-4 border-blue-500 p-3 rounded my-3">
                      <p className="text-sm font-semibold mb-1">💡 Astuces :</p>
                      <ul className="text-sm space-y-1 mb-0">
                        <li>Mettez votre téléphone en mode "Ne pas déranger"</li>
                        <li>Préparez votre espace (lumières tamisées, position confortable)</li>
                        <li>Utilisez Pause plutôt qu'Arrêter si vous êtes interrompu</li>
                      </ul>
                    </div>
                  </div>

                  {/* Personnaliser durées */}
                  <div id="personnaliser-durees" className="mt-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Personnaliser les durées</h3>
                    <p className="mb-3">
                      <strong>Description :</strong> Ajustez la durée totale selon votre temps disponible.
                    </p>
                    <p className="mb-2">
                      Au moment de démarrer, choisissez parmi les durées proposées (5, 10, 15 minutes). 
                      Les routines s'adaptent en compressant ou étendant les étapes proportionnellement.
                    </p>
                  </div>
                </section>

                {/* Section: Journal */}
                <section id="journal" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center">
                    <BookText className="h-6 w-6 mr-2 text-primary" />
                    Journal de sommeil
                  </h2>
                  <p className="mb-2">
                    <strong>Description :</strong> Le journal vous permet de suivre vos habitudes et la qualité de votre sommeil au fil du temps.
                  </p>
                  <p className="mb-3">
                    <strong>Utilité :</strong> En consignant vos données, vous identifiez des patterns et comprenez ce qui affecte votre sommeil.
                  </p>

                  <p className="font-medium mb-2">Guide pas-à-pas :</p>
                  <ol className="space-y-2">
                    <li>Cliquez sur <strong>"Journal"</strong> depuis l'écran d'accueil</li>
                    <li>Cliquez sur <strong>"+ Add Today's Sleep Log"</strong></li>
                    <li>Remplissez :
                      <ul className="ml-6 mt-1">
                        <li><strong>Heure de coucher</strong> 🌙</li>
                        <li><strong>Heure de réveil</strong> ☀️</li>
                        <li><strong>Qualité du sommeil</strong> (1-5 avec emojis)</li>
                        <li><strong>Notes</strong> (optionnel)</li>
                      </ul>
                    </li>
                    <li>Cliquez sur <strong>"Save Entry"</strong></li>
                    <li>L'entrée apparaît dans la liste avec badge "Routine ✓" si applicable</li>
                  </ol>

                  <div className="bg-blue-500/10 border-l-4 border-blue-500 p-3 rounded my-3">
                    <p className="text-sm font-semibold mb-1">💡 Astuces :</p>
                    <ul className="text-sm space-y-1 mb-0">
                      <li>Remplissez chaque matin au réveil</li>
                      <li>Notez des détails : "café après 16h", "film d'action", "exercice en soirée"</li>
                      <li>Observez les patterns au fil des jours</li>
                    </ul>
                  </div>
                </section>

                {/* Section: Badges */}
                <section id="badges" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center">
                    <Trophy className="h-6 w-6 mr-2 text-primary" />
                    Badges et réussites
                  </h2>
                  <p className="mb-3">
                    Les badges récompensent votre régularité et vos progrès, offrant une motivation supplémentaire.
                  </p>
                  
                  <p className="font-medium mb-2">Exemples de badges :</p>
                  <ul className="space-y-1">
                    <li>🌙 <strong>Première nuit</strong> : Complétez votre première routine</li>
                    <li>🔥 <strong>Série de 7 jours</strong> : Utilisez l'app 7 jours consécutifs</li>
                    <li>🏆 <strong>Expert des routines</strong> : Complétez 30 routines</li>
                    <li>⭐ <strong>Maître du sommeil</strong> : 90% de vos nuits avec qualité 4 ou 5/5</li>
                  </ul>
                </section>

                {/* Section: Comprendre le sommeil */}
                <section id="comprendre" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center">
                    <Brain className="h-6 w-6 mr-2 text-primary" />
                    Comprendre le sommeil
                  </h2>
                  <p className="mb-3">
                    Section éducative avec articles et visuels expliquant les mécanismes du sommeil (cycles, sommeil profond, REM, etc.).
                  </p>
                  <p className="font-medium mb-2">Articles disponibles :</p>
                  <ul className="space-y-1">
                    <li><strong>Qu'est-ce que le sommeil ?</strong> : Introduction aux phases</li>
                    <li><strong>Les cycles de 90 minutes</strong> : Explication scientifique</li>
                    <li><strong>Pourquoi se réveiller en fin de cycle ?</strong> : L'importance du timing</li>
                    <li><strong>Routines du soir efficaces</strong> : Conseils pratiques</li>
                    <li><strong>Conseils pour mieux dormir</strong> : Hygiène de sommeil</li>
                  </ul>
                </section>

                {/* Section: Paramètres */}
                <section id="parametres" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center">
                    <Settings className="h-6 w-6 mr-2 text-primary" />
                    Paramètres et personnalisation
                  </h2>
                  <p className="mb-3">
                    Personnalisez l'expérience selon vos préférences.
                  </p>
                  <p className="font-medium mb-2">Options possibles :</p>
                  <ul className="space-y-1">
                    <li><strong>Sons de notification</strong> : Activer/désactiver les sons</li>
                    <li><strong>Vibrations</strong> : Activer/désactiver (mobile)</li>
                    <li><strong>Thème</strong> : Clair, sombre, auto</li>
                    <li><strong>Notifications push</strong> : Pour rappels programmés</li>
                    <li><strong>Export de données</strong> : Télécharger en JSON/CSV</li>
                  </ul>
                  
                  <div className="bg-blue-500/10 border-l-4 border-blue-500 p-3 rounded my-3">
                    <p className="text-sm mb-0">
                      <strong>💡 Astuce :</strong> Activez le thème sombre pour réduire la lumière bleue le soir.
                    </p>
                  </div>
                </section>

                {/* Section: Dépannage */}
                <section id="depannage" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center">
                    <AlertCircle className="h-6 w-6 mr-2 text-primary" />
                    Dépannage et FAQ
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Erreur 1 */}
                    <div className="bg-destructive/10 border-l-4 border-destructive p-4 rounded">
                      <p className="font-semibold text-foreground mb-2">
                        ❌ Erreur : "Failed to fetch" ou "ERR_NAME_NOT_RESOLVED"
                      </p>
                      <p className="text-sm mb-2">
                        <strong>Cause :</strong> Problème de connexion à Supabase (URL incorrecte, clé API manquante, ou projet en pause).
                      </p>
                      <p className="text-sm font-medium mb-1">Solution :</p>
                      <ol className="text-sm space-y-1">
                        <li>Vérifiez les variables d'environnement : <code>VITE_SUPABASE_URL</code> et <code>VITE_SUPABASE_ANON_KEY</code></li>
                        <li>Ouvrez le fichier <code>.env</code> à la racine</li>
                        <li>Assurez-vous que l'URL est complète (ex : https://xxxxx.supabase.co)</li>
                        <li>Vérifiez que votre projet Supabase n'est pas en pause</li>
                        <li>Redémarrez le serveur de développement</li>
                      </ol>
                    </div>

                    {/* Erreur 2 */}
                    <div className="bg-destructive/10 border-l-4 border-destructive p-4 rounded">
                      <p className="font-semibold text-foreground mb-2">
                        ❌ Erreur : "You cannot render a Router inside another Router"
                      </p>
                      <p className="text-sm mb-2">
                        <strong>Cause :</strong> BrowserRouter déclaré plusieurs fois.
                      </p>
                      <p className="text-sm font-medium mb-1">Solution :</p>
                      <p className="text-sm">
                        Vérifiez qu'une seule instance de BrowserRouter existe dans main.tsx (pas dans App.tsx).
                      </p>
                    </div>

                    {/* Erreur 3 */}
                    <div className="bg-destructive/10 border-l-4 border-destructive p-4 rounded">
                      <p className="font-semibold text-foreground mb-2">
                        ❌ Erreur : Marqueurs de merge Git
                      </p>
                      <p className="text-sm mb-2">
                        <strong>Cause :</strong> Conflit Git non résolu.
                      </p>
                      <p className="text-sm font-medium mb-1">Solution :</p>
                      <ol className="text-sm space-y-1">
                        <li>Recherchez globalement les marqueurs de conflit Git</li>
                        <li>Pour chaque conflit, choisissez la version à garder</li>
                        <li>Supprimez les marqueurs</li>
                        <li>Sauvegardez et testez</li>
                      </ol>
                    </div>

                    {/* Erreur 4 */}
                    <div className="bg-destructive/10 border-l-4 border-destructive p-4 rounded">
                      <p className="font-semibold text-foreground mb-2">
                        ❌ Erreur : "does not provide an export named 'default'"
                      </p>
                      <p className="text-sm mb-2">
                        <strong>Cause :</strong> Import/export mismatch.
                      </p>
                      <p className="text-sm font-medium mb-1">Solution :</p>
                      <p className="text-sm">
                        Changez import default en import nommé ou inversement selon l'export du composant.
                      </p>
                    </div>
                  </div>

                  {/* FAQ */}
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4 text-foreground">FAQ générale</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium text-foreground">Q : Mes données sont-elles synchronisées entre appareils ?</p>
                        <p className="text-sm text-muted-foreground">R : Seulement avec un compte authentifié. En mode "sans compte", stockage local uniquement.</p>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Q : L'application fonctionne-t-elle hors ligne ?</p>
                        <p className="text-sm text-muted-foreground">R : Partiellement (PWA). Fonctionnalités Supabase nécessitent internet.</p>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Q : Puis-je exporter mes données ?</p>
                        <p className="text-sm text-muted-foreground">R : Fonctionnalité en développement. Accédez au localStorage via DevTools pour copier manuellement.</p>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Q : Pourquoi je ne reçois pas l'email de confirmation ?</p>
                        <p className="text-sm text-muted-foreground">R : Vérifiez vos spams. Attendez 10 minutes. Si problème persiste, contactez le support.</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section: Développeurs */}
                <section id="developpeurs" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center">
                    <Code className="h-6 w-6 mr-2 text-primary" />
                    Pour les développeurs
                  </h2>
                  
                  <div className="bg-muted/50 p-4 rounded-lg font-mono text-xs overflow-x-auto mb-4">
                    <pre>{`sleep-reminder/
├── src/
│   ├── components/
│   │   ├── routines/
│   │   ├── ui/
│   │   └── AuthModal.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── lib/
│   │   └── supabase.ts
│   ├── pages/
│   │   ├── Auth.tsx
│   │   ├── Calculator.tsx
│   │   ├── Home.tsx
│   │   ├── Journal.tsx
│   │   └── Routines.tsx
│   ├── utils/
│   │   ├── routinesStorage.ts
│   │   ├── sleepCalculator.ts
│   │   └── storage.ts
│   └── main.tsx
├── .env
└── vite.config.ts`}</pre>
                  </div>

                  <p className="font-medium mb-2">Variables d'environnement (.env) :</p>
                  <div className="bg-muted/50 p-3 rounded font-mono text-xs mb-4">
                    <pre>{`VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`}</pre>
                  </div>

                  <p className="font-medium mb-2">Commandes utiles :</p>
                  <div className="bg-muted/50 p-3 rounded font-mono text-xs">
                    <pre>{`npm install          # Installer dépendances
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run preview      # Prévisualiser le build
npm run lint         # Linter
npx tsc --noEmit     # Type-check`}</pre>
                  </div>
                </section>

                {/* Section: Bonnes pratiques */}
                <section id="bonnes-pratiques" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center">
                    <Heart className="h-6 w-6 mr-2 text-primary" />
                    Bonnes pratiques
                  </h2>
                  <ol className="space-y-2">
                    <li><strong>Complétez votre journal chaque matin</strong> : La régularité aide à identifier les patterns.</li>
                    <li><strong>Testez plusieurs routines</strong> : Vos besoins varient selon les jours.</li>
                    <li><strong>Respectez vos cycles de sommeil</strong> : Suivez les recommandations du calculateur.</li>
                    <li><strong>Limitez les écrans 30 minutes avant la routine</strong> : Activez le thème sombre si nécessaire.</li>
                    <li><strong>Créez un environnement propice</strong> : Température fraîche (18-20°C), obscurité, silence.</li>
                    <li><strong>Soyez patient</strong> : Les effets se font sentir après 7-10 jours de régularité.</li>
                  </ol>
                </section>

                {/* Section: Contact */}
                <section id="contact" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center">
                    <Mail className="h-6 w-6 mr-2 text-primary" />
                    Contact et support
                  </h2>
                  
                  <p className="mb-3">
                    Si vous rencontrez un problème technique, fournissez :
                  </p>
                  <ul className="space-y-1 mb-4">
                    <li>Description du problème</li>
                    <li>Étapes pour reproduire</li>
                    <li>Navigateur et version</li>
                    <li>Logs console (DevTools {'>'} Console)</li>
                    <li>Captures d'écran</li>
                  </ul>

                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <p className="font-semibold text-foreground mb-2">📧 Nous contacter :</p>
                    <ul className="text-sm space-y-1">
                      <li>Email : <a href="mailto:support@sleepreminder.app" className="text-primary underline">support@sleepreminder.app</a></li>
                      <li>GitHub Issues : <a href="https://github.com/votre-repo/sleep-reminder/issues" target="_blank" rel="noopener noreferrer" className="text-primary underline">Créer un ticket</a></li>
                    </ul>
                  </div>
                </section>

                {/* Conclusion */}
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-6 mt-12">
                  <h3 className="text-xl font-bold text-foreground mb-3">🎉 Conclusion</h3>
                  <p className="text-foreground mb-4">
                    Félicitations ! Vous avez maintenant toutes les clés pour utiliser Sleep Reminder comme un pro.
                  </p>
                  <p className="font-semibold text-foreground mb-2">Vos prochaines étapes :</p>
                  <ol className="space-y-2 mb-4">
                    <li>1. <strong>Testez le calculateur dès ce soir</strong> : Trouvez vos heures optimales</li>
                    <li>2. <strong>Lancez votre première routine</strong> : Commencez par 5 minutes</li>
                    <li>3. <strong>Notez dans votre journal</strong> : Observez les patterns au fil des jours</li>
                  </ol>
                  <p className="text-sm text-muted-foreground">
                    <strong>Rappel :</strong> La régularité est la clé. Même 5 minutes de routine chaque soir peuvent transformer votre sommeil en 7-10 jours.
                  </p>
                  <p className="text-foreground mt-4 text-center font-semibold">
                    Bonne nuit et dormez bien ! 🌙✨
                  </p>
                </div>

              </div>
            </Card>

            {/* Back to top button */}
            <div className="mt-6 text-center">
              <Button
                variant="outline"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setActiveSection('premiers-pas');
                }}
                className="border-primary/20"
              >
                ↑ Retour en haut
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Help;
