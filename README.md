## V34.44 — Synthèse LSU centrée sur les appréciations

La vue LSU est désormais conçue comme un outil de rédaction : tableau de classe, appréciations modifiables/copiables, détail des preuves et historique daté de toutes les compétences.

## V34.43 — Nouvelle organisation du suivi des élèves

La zone **Suivi des élèves** est désormais organisée en deux étapes : **Évaluations et traces**, puis **Synthèse LSU**. Les anciennes priorités pédagogiques ne sont pas supprimées : elles sont déplacées dans l’espace **Accompagnements et inclusions**, qui distingue maintenant les priorités de classe des inclusions et accompagnements spécifiques.

Une première page `lsu.html` exploite le moteur LSU réel en lecture seule. Elle n’écrit aucune donnée et affiche uniquement les propositions issues des traces existantes.

## V34.42 — Correctif de robustesse du diagnostic LSU réel

Cette version corrige les échecs intermittents du diagnostic `student_snapshot` lorsque Google Apps Script répond après le timeout de 20 secondes. Le connecteur attend désormais jusqu’à 60 secondes et conserve temporairement un callback JSONP inoffensif si une réponse arrive encore plus tard. Cela évite l’erreur globale `progressionsLSU_... is not defined`.

Pour vérifier Adam en lecture seule :

```js
window.snapAdam = await LSURealConnector.getStudentSnapshot('Adam');
console.table(window.snapAdam.snapshot.reussites.slice(0, 15));
```

## Historique V34.41 — Correctif diagnostic LSU réel

Correctif ciblé de V34.40 : le callback JSONP du `student_snapshot` utilisait `root` à l'intérieur de la factory, alors que cette variable n'y était pas accessible dans le navigateur. Le connecteur utilise désormais `globalThis`, ce qui conserve le mode lecture seule et permet le diagnostic réel depuis la console.

# Progressions CE2
## V34.40 — Connecteur LSU réel en lecture seule

- Ajout de `lsu-real-connector.js`, adaptateur entre `student_snapshot` et le moteur LSU V1.
- Aucune interface nouvelle et aucun diagnostic automatique au chargement.
- Lecture seule stricte : uniquement `student_snapshot`, aucun POST ni action d’écriture.
- Filtrage S1/P1-P2 et S2/P3-P5 ; les compétences annuelles sont rattachées au semestre par la date de leur trace.
- Sources A/B/C/D comptabilisées séparément ; D reste informatif et n’influence pas le niveau LSU.
- Rapport de diagnostic par élève disponible en mémoire et au format Markdown.
- Test automatisé : `tools/test_lsu_real_connector_v3440.js`.


## V34.39 — Simulation LSU S1 sur élève fictif

- Ajout d’un scénario de bout en bout S1 utilisant uniquement des données fictives et les compétences réelles de `data.js`.
- Le scénario mélange preuves A, traces formatives B (dont cahier du jour), événements Maître Hibou C, compétences non documentées et compétences structurantes.
- Correction moteur LSU V1.1 : la tendance d’une matière est désormais agrégée à partir des tendances par compétence, sans comparer artificiellement deux compétences différentes dans une même chronologie.
- Correction vigilance : une compétence structurante montrant deux réussites enseignantes récentes n’est plus simultanément classée en difficulté persistante.
- Aucun branchement d’interface.
- Rapport : `docs/SIMULATION_LSU_S1_V34_39.md`.
- Sortie brute : `docs/SIMULATION_LSU_S1_V34_39.json`.

# Progressions CE2 — V34.33

## V34.33 — Nettoyage des références de compétences

- Audit automatique du référentiel canonique : 507 codes uniques dans `data.js`.
- Correction des dernières références actives hors référentiel dans l'emploi du temps :
  - P4 : `ORT-P4-05` → borne canonique `ORT-P4-04` ; `EMI-P4-06` → borne canonique `EMI-P4-05`.
  - P5 : `ECR-P5-05` → borne canonique `ECR-P5-04` ; `OR-P5-03` → borne canonique `OR-P5-02`.
- L'ancien fichier monolithique `emploi-du-temps.js` est neutralisé ; sa version V34.32 est conservée dans `docs/historique/emploi-du-temps-legacy-v34-32.js`.
- Couverture EMC des situations de référence complétée : `EMC-P2-02` et `EMC-P4-02` sont désormais rattachées aux situations authentiques P2 et P4.
- Contrôle final : 0 code utilisé hors référentiel dans les fichiers actifs HTML/JS (hors archive historique).
- Balises `<title>` et cache-busting des pages principales mis à jour en V34.33.


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

## V34.34 — EPS compact et optionnel
- Référentiel EPS allégé de 30 à 14 compétences observables.
- P2 : 4 compétences Natation / Piscine.
- P3 : 4 compétences VTT reliées aux sorties à la Cavayère.
- P4 : 4 compétences Gymnastique / Lutte.
- P1 et P5 : 2 repères transversaux (engagement/sécurité puis progrès/performance).
- Aucune évaluation EPS obligatoire n'est ajoutée : les compétences peuvent être renseignées uniquement lorsqu'une trace fiable est disponible.
- Références EPS de l'emploi du temps réalignées sur les nouveaux codes canoniques.

## V34.36 — Arts et chant : 6 repères annuels transversaux

- Référentiel Arts allégé à 6 compétences annuelles : 3 arts plastiques + 3 éducation musicale/chant.
- Codes : `ART-ANN-01` à `ART-ANN-03` et `MUS-ANN-01` à `MUS-ANN-03`.
- Repères utilisables toute l'année, notamment dans les créneaux du mardi pour les élèves non-CHAM.
- Aucune carte d'évaluation obligatoire : ces compétences servent d'abord à programmer et observer.
- Les interfaces de suivi reconnaissent désormais les `annualCompetencies`.


### V34.36
Correction du filtre de la fenêtre Évaluations : le rendu de plusieurs matières n’est plus interrompu par la détection automatique de programmation.

### V34.37 — moteur LSU V1
Le fichier `lsu-synthesis-engine.js` contient désormais le premier moteur de synthèse semestrielle, volontairement déconnecté de l'interface. Il exploite les traces A/B/C/D, respecte la priorité des preuves enseignantes, sait signaler les progressions à réexaminer et prépare les vigilances sur compétences structurantes. Voir `docs/MOTEUR_LSU_V1_V34_37.md`. Aucun écran LSU n'est activé en V34.37.


## V34.38 — Compétences structurantes LSU

18 compétences canoniques du référentiel réel sont marquées `lsuCore: true` et regroupées avec `lsuCoreGroup`. Elles servent uniquement à faire ressortir une fragilité persistante dans la synthèse LSU et à déclencher une vigilance pédagogique documentée. Elles ne valent aucun point supplémentaire et ne modifient pas à elles seules un niveau LSU.
