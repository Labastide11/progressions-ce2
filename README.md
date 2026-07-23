## V31.19 — Emploi du temps annualisé

- Nouveau bouton 🗓️ Emploi du temps.
- Cinq onglets P1 à P5.
- Intégration des contraintes CHAM, piscine, Cavayère et Domec.
- Tableau de contrôle des volumes annuels nets.

## V31.18 — Évaluations de mathématiques P2 à P5 reliées

- Ajout de Mathématiques dans le filtre du module Évaluations.
- P1 reliée à 16 compétences réellement mobilisées dans la fiche.
- Téléchargement des documents élèves et enseignant de maths P1 à P5.
- P2 à P5 restent des matrices évolutives, sans saisie activée tant qu’elles ne sont pas finalisées.
- Le bouton de saisie ouvre directement la bonne matière, la bonne période et parcourt uniquement les compétences de l’évaluation.
- Aucune note, aucun point ni pourcentage.

## V31.15 — Saisie par évaluation simplifiée

- Chaque évaluation ne contient plus toutes les compétences de la période.
- La P1 est reliée à 13 compétences réellement évaluées.
- Les matrices P2 à P5 restent volontairement sans compétences tant qu’elles ne sont pas finalisées.
- Le bouton ouvre uniquement la saisie des compétences de l’évaluation.

## V31.15 — Saisie reliée aux évaluations

- Le bouton **Saisir les résultats** ouvre directement la première compétence cochée.
- Un bandeau **Évaluation active** permet de passer à la compétence précédente ou suivante.
- Seules les compétences cochées dans la carte de l’évaluation sont parcourues.
- Le bouton **Quitter l’évaluation** rend au suivi son fonctionnement habituel.

## V31.12 — Correctif notifications Maître Hibou

- Appliquer et Ignorer retirent immédiatement la notification.
- Une validation reliée à plusieurs compétences n’apparaît plus en double.
- Voir la compétence ouvre directement la compétence concernée.

# Progressions CE2 — V31.5


### Mise à jour V31.5 — Version visible dans l’onglet

- La balise HTML `<title>` affiche désormais clairement `Progressions CE2 — V31.5`.
- Les paramètres de cache des fichiers CSS et JavaScript passent à `v=31.4`.

### Mise à jour V31.3 — Suivi des élèves
- ordre des niveaux : Non évalué → À renforcer → En cours → Acquis ;
- boutons de niveau compactés pour agrandir la zone Remarque ;
- filtres avec effectifs : Tous, Non évalués, À renforcer, En cours, Acquis ;
- actions collectives avec confirmation avant remplacement ;
- indicateur visible de sauvegarde locale.


### Mise à jour V31.1 — Liste des élèves depuis Google Sheets

- Suppression complète de la fenêtre manuelle « Gérer la liste des élèves ».
- L’onglet **Élèves** lit automatiquement les prénoms avec `action=get_eleves`.
- Le Google Sheet est la source officielle de la classe.
- Le bouton **Actualiser la classe** relance la lecture à tout moment.
- Un indicateur précise si la liste vient de Google Sheets ou de la dernière copie locale disponible.
- Aucune écriture `save_eleves` n’est effectuée par ce site.

# Progressions CE2 — V31


# Progressions CE2 — V31

Nouvelle vue **👥 Élèves** : liste de classe modifiable, suivi par compétence ou par élève, quatre niveaux, remarques et export CSV. Les données restent enregistrées localement dans le navigateur.

# Progressions CE2 — Référentiel & suivi interactif

Mini-site statique prêt pour GitHub Pages.

## Fonctions

- référentiel annuel en français, mathématiques, EMC, histoire, géographie, anglais et sciences ;
- vues par période ;
- suivi interactif avec états : À faire, En cours, Travaillé, À reprendre, Stabilisé ;
- checklist pédagogique par notion ;
- Français : suivi détaillé des périodes 1 et 2, compatible avec la préparation du LSU ;
- zone éditable « Je sais / J’ai retenu » ;
- notes personnelles ;
- sauvegarde automatique dans le navigateur ;
- export/import JSON ;
- impression de la vue ;
- PDF et Excel de référence conservés dans `assets/`.

La rubrique visible « Sources » a été retirée du site afin de garder une interface centrée sur le pilotage pédagogique.

## Mise à jour sur GitHub

1. Copier tous les fichiers à la racine du dépôt `progressions-ce2`.
2. Dans GitHub Desktop : **Commit to main**, puis **Push origin**.
3. GitHub Pages se met à jour automatiquement.

## Données

Le suivi est enregistré dans `localStorage` sur l’appareil utilisé. Il ne contient aucune donnée d’élève et n’est pas envoyé sur GitHub.


## Français — suivi détaillé

Les périodes 1 à 5 disposent de cartes par microcompétence : checklist pédagogique, une ou deux évaluations retenues, bilan de maîtrise et regroupement LSU.


## Suivi détaillé compatible LSU

Les cinq périodes de français et de mathématiques comportent des compétences précises, une checklist pédagogique, une ou deux évaluations retenues, un bilan de maîtrise et un regroupement LSU.


## EMC — suivi détaillé

Les cinq périodes d’EMC sont organisées autour de 25 compétences observables :
règles et responsabilités, respect d’autrui, prévention des violences et du harcèlement,
information et responsabilité numérique, égalité et valeurs de la République,
services publics, commune, secours, environnement et engagement pour le bien commun.

Les élections de délégués ne font pas partie de cette programmation.


## Histoire et géographie — nouveaux programmes

Le site intègre désormais les cinq périodes d’histoire et de géographie du CE2 :
- histoire : Préhistoire, Rome et Gaule romaine, construction du royaume de France ;
- géographie : vivre en France, répartition de la population, se loger et travailler.

Chaque période propose des compétences précises, une checklist, des preuves possibles,
une ou deux observations retenues et un regroupement compatible LSU.


## Anglais — priorité à l’oral

Les cinq périodes d’anglais comportent 30 compétences, essentiellement orales :
compréhension, interaction, parole en continu et culture anglophone.
L’écrit est volontairement limité à deux cartes d’appui sur l’ensemble de l’année.


## Sciences et technologie — nouveaux programmes

Le site intègre une progression anticipée des nouveaux programmes de sciences et technologie :
- P1 : matière, masses, volumes, contenances et durées ;
- P2 : croissance, développement et reproduction du vivant ;
- P3 : locomotion, milieux de vie, biodiversité et chaînes alimentaires ;
- P4 : corps humain, muscles, respiration, pouls, activité physique et apprentissages ;
- P5 : objets techniques, programmation et projet environnemental.

La P5 distingue clairement les cartes « Objets techniques », « Programmation »
et « Projet environnemental », même lorsqu’elles sont travaillées dans un projet commun.


## EVAR
20 compétences réparties sur cinq périodes, avec des formulations adaptées : « J’ai compris que… », « Je peux… » et « Je sais reconnaître… ». Le suivi porte sur des situations générales ou fictives et ne demande jamais de récit personnel.


## EPS — programmation adaptée à la classe de M. Cotty

- P1 : course longue et jeux collectifs à l’école ;
- P2 : natation à Grazailles, vendredi 15 h 55–16 h 35 ;
- P3 : course d’orientation et sandball à la Cavayère ;
- P4 : gymnastique et lutte à Domec ;
- P5 : athlétisme, relais, lancer et expression corporelle.

La rubrique comporte 30 compétences observables, réparties sur les cinq périodes.


## Arts

La rubrique « Arts » regroupe arts plastiques et éducation musicale :
- P1 : forêt, animaux, matières, chant collectif et pulsation ;
- P2 : image, message, illustration, émotions et jeux vocaux ;
- P3 : paysages d’hiver, lumière, volume et paysages sonores ;
- P4 : corps, mouvement, sculpture et création sonore ;
- P5 : photographie, light painting, bande dessinée et interprétation musicale.

Elle comporte 30 compétences observables, soit 6 par période.


## EMI
26 compétences réparties sur cinq périodes : comprendre l’information, rechercher et identifier les sources, vérifier les contenus, décrypter les images, protéger les données et produire un média collectif.


## Parcours éducatifs

La rubrique réunit :
- le parcours citoyen ;
- le parcours d’éducation artistique et culturelle ;
- le parcours éducatif de santé.

Elle ne duplique pas les compétences des matières. Elle sert de mémoire des projets
collectifs, rencontres, sorties, productions et actions réellement menés. Chaque fiche
comprend un statut, une checklist adaptée, les matières ou partenaires associés et une
zone de synthèse directement exploitable dans le LSU.


## Bibliothèque documentaire

Une bibliothèque intégrée est accessible depuis le bandeau du site.
Elle contient 23 PDF uniques, classés en programmes officiels,
attendus et progressions, ressources pédagogiques, organisation locale et documents de classe.

Les fichiers ont été renommés proprement et placés dans `assets/documents/`.
La bibliothèque permet de rechercher, filtrer, ouvrir et télécharger chaque PDF.


## Ergonomie compacte V18

- petit hibou Maître Hibou intégré en SVG ;
- titre réduit : « CE2 Suivi de classe + référence officiel » ;
- boutons Bibliothèque, PDF et Excel condensés ;
- cinq familles de matières avec les mêmes icônes que la maquette ;
- seconde ligne contextuelle affichant seulement les matières de la famille choisie ;
- périodes sur une ligne distincte ;
- barre de contexte compacte et fixe pendant le défilement ;
- adaptation PC, tablette et smartphone.


## V19 — Filtres repliables

La navigation est réduite à une seule ligne permanente :
- vue active ;
- matière active ;
- période active ;
- bouton « Filtres ».

Le panneau complet s’ouvre au clic ou au toucher. Sur ordinateur, il peut aussi
s’ouvrir au survol, mais le clic reste disponible et prioritaire. La touche Échap
referme le panneau.


## V24 — Ligne colorée toujours visible
- la vue et les actions principales sont sur la même ligne que Maître Hibou ;
- le ruban coloré domaines / matières est toujours visible ;
- Français et Mathématiques sont intégrés dans le bloc Fondamentaux ;
- Filtres conserve les sous-matières complémentaires et les périodes.


## V25 — Compétences ouvertes par défaut
Dans les vues Période 1 à Période 5, toutes les fiches de compétences sont désormais dépliées automatiquement, comme demandé.


## V26 — Blocs repliables
- chaque grand domaine est ouvert par défaut ;
- clic ou toucher sur toute la barre du titre pour replier ou déplier ;
- état mémorisé dans le navigateur ;
- bouton global Tout replier / Tout déplier dans le bandeau bleu.


## V27 — Bibliothèque colorée
- icône et couleur attribuées automatiquement à chaque document selon sa matière ;
- badges matière et catégorie ;
- filtres enrichis avec icônes ;
- cartes plus lisibles et actions Ouvrir / Télécharger mieux identifiées.


## V28 — Accès Maître Hibou
Ajout d’un bouton 🦉 Maître Hibou à droite de Bibliothèque, PDF et Excel. Le site s’ouvre dans un nouvel onglet.


## Synchronisation Google Sheet
La liste des élèves est chargée et enregistrée dans l’onglet `eleves` via l’application Web Apps Script :
`https://script.google.com/macros/s/AKfycbxz1vYS24sv-c3XVja12geWEXIQl6bQyBoQKBx5kg_fwQaj80_Oc7Y34yeBSRN4lF1f/exec`

Colonnes attendues : `prenom`, `initiale`, `naissance`, `sexe`, `actif`.


## V31.5
- Ordre des vues : Élèves, Mon suivi, Référentiel.
- La vue Élèves s’ouvre systématiquement au chargement.
- Numéro de version affiché dans la balise title.

## V31.13 — Module Évaluations
- Bouton `📝 Évaluations` ajouté dans la barre d’outils, à côté de Maître Hibou.
- Fenêtre dédiée Français P1 à P5.
- Téléchargement direct des documents élève et enseignant modifiables.
- Lecture automatique des compétences de chaque période depuis `data.js`.
- Choix des compétences incluses, état Matrice / Prête / Passée et note de préparation enregistrés localement.
- Accès direct à la saisie des résultats dans la vue Élèves, sans note ni point.
