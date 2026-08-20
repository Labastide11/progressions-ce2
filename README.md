# Progressions CE2 — V34.32

## V34.32 — Rééquilibrage du calendrier des évaluations
- Les évaluations de référence sont positionnées en fin de séquence plutôt qu’accumulées en fin de période.
- Distinction explicite dans l’emploi du temps : **Évaluation de référence**, **Petite trace formative**, **Observation formative**, **Remédiation / validation différée**.
- P1 : Histoire avancée au 5 octobre ; Sciences et Géographie restent les 15–16 octobre.
- P2 : Histoire au 30 novembre ; Sciences au 10 décembre ; deux séances de Géographie les 7 et 14 décembre avant l’évaluation du 17 décembre.
- P3 : aucune évaluation en janvier ; les trois traces QLM de février sont différenciées, dont Sciences en observation pratique VTT.
- P4 : Histoire au 15 mars ; Sciences le 25 mars ; Géographie reportée au 2 avril après consolidation.
- P5 : Sciences déplacée au 3 juin après la fin réelle de la séquence ; Histoire enseignée les 24/31 mai et 7 juin avant l’évaluation du 14 juin ; Géographie le 18 juin.
- Le détecteur automatique des cartes Évaluations privilégie désormais les lignes explicitement marquées **Évaluation de référence** et pénalise les traces formatives/remédiations.
- Objectif : réduire la surcharge cognitive et la charge de correction, tout en conservant des traces fiables pour le LSU.
- Français et Mathématiques : les nombreuses micro-vérifications sont reclassées en **petites traces formatives** ; une seule entrée de **référence** par matière et par période sert de repère calendrier, avec passation possible en plusieurs tâches courtes.

## Sciences consolidées : 25 compétences + évaluations authentiques
- Référentiel Sciences ramené de 40 à 25 compétences structurantes, 5 par période.
- P1 : démarche scientifique et vivant ; P2 : eau/matière en lien avec la piscine ; P3 : objets techniques à partir du VTT à la Cavayère ; P4 : corps, effort et santé ; P5 : cycles de vie, besoins et milieux.
- 5 situations de référence ajoutées à la fenêtre Évaluations, principalement en observation/manipulation.
- P3 : aucune évaluation programmée en janvier ; trace de référence le 4 février 2027.
- Électricité conservée en P5 sous forme de mini-situation pratique, sans créer une 26e compétence structurante.
- Emploi du temps Sciences réaligné sur les nouveaux codes ; sorties Cavayère P3 indiquées en VTT.

# Progressions CE2 — V34.30

## Évaluations Géographie P1→P5
- Ajout de 5 situations de référence en Géographie, une par période.
- P1 : carte de population ; P2 : paysage urbain + plan ; P3 : comparaison campagne/littoral/montagne ; P4 : territoire de travail ; P5 : activités, territoires et environnement.
- Chaque carte est reliée aux compétences canoniques GEOG de sa période.
- Ajout de Géographie au filtre Matière de la fenêtre Évaluations.
- Créneaux de référence repérés dans l’emploi du temps ; P3 reste hors janvier (trace en février).

# Progressions CE2
## V34.28 — Évaluations Histoire P1→P5

- Ajout de la matière **🏺 Histoire** dans la fenêtre Évaluations.
- 5 situations de référence, une par période, couvrant les 20 compétences canoniques `HIS-P1-01` à `HIS-P5-04`.
- P1 : frise chronologique ; P2 : comparaison des modes de vie ; P3 : personnage/événement à partir de documents ; P4 : enquête sur le Moyen Âge ; P5 : présentation d’une grande figure ou d’une évolution.
- Chaque situation conserve **4 compétences séparées** pour la saisie des niveaux de maîtrise.
- P3 respecte la règle **janvier sans évaluation programmée** : trace formelle placée la semaine du 1er au 5 février 2027.
- Emploi du temps relié aux 5 situations pour afficher automatiquement semaine, date, statut et lien direct.
- P5 est enregistrée par défaut comme `observation_classe` (présentation principalement orale) ; P1 à P4 comme `evaluation_papier`.


## V34.27 — Référentiel Histoire CE2 recentré

- Référentiel Histoire ramené de 35 à 20 compétences structurantes : 4 par période.
- P1 : se repérer dans le temps historique.
- P2 : comparer les modes de vie à différentes époques.
- P3 : Antiquité et débuts du Moyen Âge — premières grandes figures et événements.
- P4 : Moyen Âge et construction du royaume.
- P5 : Temps modernes et ouverture vers l’époque contemporaine.
- Tous les intitulés sont formulés avec des actions observables : ordonner, situer, comparer, prélever, raconter, expliquer.
- Références Histoire de l’emploi du temps alignées sur les nouveaux codes `HIS-Px-01` à `HIS-Px-04`.
## V34.24 — EMC : traces authentiques de réussite
- Référentiel EMC rééquilibré : P1 cadre commun, P2 message clair, P3 bien commun et conseil d’élèves.
- Ajout de l’EMC dans la fenêtre Évaluations avec 5 situations de référence, sans imposer de fiche papier.
- Les cartes indiquent le type de trace : observation, mise en situation, conseil d’élèves, débat réglé ou oral.
- Les saisies lancées depuis ces cartes sont enregistrées comme `observation_classe`, pas comme `evaluation_papier`.
- Repères EMC ajoutés/clarifiés dans l’emploi du temps P1 à P5.

# Progressions CE2 — V34.24 — Ma classe au quotidien

**Version actuelle : V34.24**

Progressions CE2 est l’environnement de pilotage pédagogique de la classe de CE2. Il centralise la programmation, l’emploi du temps, le suivi des élèves, les évaluations, les outils de classe et les espaces dédiés aux élèves, aux familles et au remplaçant.

## Organisation principale

- `index.html` — tableau de bord enseignant.
- `vue-eleves.html` — vue rapide de la classe.
- `mon-suivi.html` — suivi pédagogique et saisie des compétences.
- `referentiel.html` — référentiel CE2 et compétences canoniques.
- `eleves.html` — espace Élèves.
- `parents.html` — espace Parents.
- `remplacant.html` — espace Remplaçant.
- `emploi-du-temps-data-p1.js` à `p5.js` — programmation détaillée par période.
- `evaluations-data.js` — évaluations reliées aux codes du référentiel.
- `docs/historique/` — documentation détaillée des anciennes versions.

## Évaluations et LSU

Le projet utilise désormais une chaîne cohérente :

**Référentiel → programmation → évaluation → saisie Progressions → historique → Google Sheets → future synthèse LSU.**

Règle de conception des évaluations :

**1 ligne d’évaluation = 1 compétence clairement identifiable = 1 code canonique.**

Langage de correction utilisé avec les élèves :

- **Excellent** → LSU : **Dépassé**
- **Réussi** → LSU : **Atteint**
- **En progrès** → LSU : **Partiellement atteint**
- **À revoir** → LSU : **Non atteint**

Les évaluations de maîtrise de la langue utilisent le **DRAS : Déplacer, Remplacer, Ajouter, Supprimer**. Les évaluations de français P1 à P5 et de mathématiques P1 à P5 sont reliées aux compétences canoniques du référentiel.

## Suivi et synchronisation

Progressions CE2 échange des données avec Maître Hibou et Google Sheets via Apps Script. Les traces d’évaluation sont conservées dans l’historique local puis synchronisées vers l’onglet `traces_evaluations` du Google Sheet. Les sources restent distinguées afin de préparer une lecture objective du parcours de l’élève : travail en classe, évaluations, Maître Hibou et observations pédagogiques.

## Documentation

La racine du projet ne conserve volontairement que deux fichiers de documentation :

- `README.md` — état actuel du projet ;
- `CHANGELOG.md` — historique synthétique des versions importantes.

Les anciens README, notes de patch et anciennes consignes d’installation sont archivés dans `docs/historique/`. Un index est disponible dans `docs/historique/INDEX_HISTORIQUE.md`.

## Règle de version

Chaque modification du projet crée une nouvelle version et les pages principales conservent le numéro exact de version dans leur balise HTML `<title>`.


## Repères automatiques des évaluations — V34.18

Chaque carte d’évaluation affiche désormais la semaine et les dates repérées automatiquement dans l’emploi du temps détaillé, un statut temporel (À venir / Cette semaine / Passée) et un accès direct à la semaine correspondante. La programmation n’est pas saisie une seconde fois : elle est déduite des compétences canoniques et des temps de validation présents dans l’emploi du temps.


## Compteur dynamique des compétences — V34.19

Dans les cartes d’évaluation, le compteur affiche désormais en temps réel le nombre de compétences cochées. Le libellé « Renseigner l’évaluation (X) » et le nombre à droite de « Compétences de cette évaluation » se mettent à jour immédiatement lors d’un cochage ou décochage.


## Repère semestriel LSU — V34.23

Chaque carte d’évaluation affiche désormais le semestre auquel elle contribue : **P1 + P2 → Semestre 1** et **P3 + P4 + P5 → Semestre 2**. Un filtre **Tous / Semestre 1 / Semestre 2** permet de préparer plus facilement les synthèses LSU. Règle de planification retenue : janvier doit rester sans évaluation programmée ; le déplacement des évaluations P3 encore positionnées en janvier sera traité dans l’ajustement calendrier suivant.


## V34.23 — Janvier sans évaluations programmées
- P3 reste une période d’apprentissage en janvier, sans évaluation programmée.
- Les évaluations structurées de Français et Mathématiques P3 sont déplacées sur la semaine du 1er au 5 février 2027.
- P1 + P2 alimentent le semestre 1 ; P3 + P4 + P5 alimentent le semestre 2.
- Les entraînements, observations et retours pédagogiques de janvier restent possibles mais ne sont plus repérés comme évaluations.


## V34.26 — Filtres semestre / période cohérents
- Le filtre **Période** dépend maintenant du **Semestre LSU** sélectionné.
- Semestre 1 : seules P1 et P2 sont proposées.
- Semestre 2 : seules P3, P4 et P5 sont proposées.
- Si une période sélectionnée devient incompatible lors d’un changement de semestre, le filtre revient automatiquement à « Toutes les périodes du semestre ».


## V34.26 — Évaluations : vue toutes matières et fenêtre élargie
- Ajout du filtre **Toutes les matières**.
- Les filtres Semestre LSU et Période continuent de s'appliquer à la vue globale.
- Ordre stable des cartes : Français, Mathématiques, Anglais, EMC.
- Badge matière visible sur chaque carte.
- Fenêtre Évaluations élargie sur PC.
- Deux cartes larges par ligne lorsqu'il y en a plusieurs ; une carte unique utilise toute la largeur.
- Retour automatique à une colonne sur tablette et écran étroit.

### V34.29 — Consolidation du référentiel Géographie CE2
- Référentiel Géographie allégé de **35 à 25 compétences structurantes**.
- P1 : 5 compétences — population et repères en France.
- P2 : 6 compétences — habiter la ville.
- P3 : 5 compétences — habiter différents espaces en France.
- P4 : 4 compétences — travailler en France : activités, paysages, transports et aménagements.
- P5 : 5 compétences — activités, services, territoires et environnement.
- Formulations recentrées sur des actions observables : localiser, lire, comparer, décrire, utiliser, identifier, expliquer.
- Références aux anciens codes fusionnés réalignées dans l’emploi du temps afin d’éviter les compétences orphelines.
