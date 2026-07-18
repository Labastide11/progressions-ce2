# Progressions CE2 — V29

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
