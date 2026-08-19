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
