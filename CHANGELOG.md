
## V34.10 — Correction connexion API partagée
- Corrige `questions-eleves.js` qui forçait encore l'ancien déploiement Apps Script V2.7.5 dans `localStorage`.
- L'URL Apps Script V2.8.0 devient la valeur de migration par défaut.
- Une URL personnalisée déjà configurée n'est plus écrasée.
- Migration automatique des navigateurs encore configurés sur l'ancien déploiement V2.7.5.
- Balises `<title>` mises à jour en V34.10.
## V34.09

- Synchronisation durable de l’historique des évaluations vers Google Sheets.
- Ajout du stockage `traces_evaluations` côté Apps Script.
- Envoi par lots depuis Progressions CE2 afin de limiter le nombre d’exécutions Apps Script.
- Réconciliation par identifiant unique `trace_id` et reprise automatique des traces locales V34.08.
- Lecture des traces depuis Google Sheets et ajout au `student_snapshot`.
- API Apps Script portée en V2.8.0.

## V34.08
- Historisation des niveaux par élève et compétence.
- Ajout du niveau interne `depasse` pour les évaluations.
- Correspondance élève ↔ LSU verrouillée dans la trace.
- Traçage distinct des sources : évaluation papier, observation de classe, Maître Hibou.
- Export du suivi enrichi du nombre de traces et de la dernière source.

## V34.07
- Alignement des emplois du temps P3–P5 avec toutes les compétences évaluées en français et mathématiques.
- P3 vérifiée complète. P4 et P5 complétées sur les compétences de mesures/durées/géométrie/symétrie manquantes.

## V34.06 — Français P2 à P5 verrouillé sur les codes canoniques

- Finalisation des listes `skillCodes` pour les évaluations de français P2, P3, P4 et P5.
- Correction de la progression temporelle : P3=futur, P4=imparfait, P5=passé composé.
- Grilles DRAS mises en concordance exacte avec `data.js`.
- Balises `<title>` mises à jour en V34.06.


## V34.05 — Maths P5 verrouillée
- P5 : 20 compétences canoniques, une tâche par compétence.
- Nouveaux fichiers : `Maths_P5_eleve_verrouillee.docx` et `Maths_P5_grille_enseignant_verrouillee.docx`.
- `evaluations-data.js` pointe désormais vers les documents P5 verrouillés.
- Balises `<title>` mises à jour en V34.05.

# CHANGELOG

## V34.05
- Verrouillage de l’évaluation de mathématiques P4.
- 19 tâches distinctes reliées à 19 codes canoniques du référentiel.
- Documents élève/enseignant dédiés à P4.
- Mise à jour des titres HTML en V34.05.


## V34.03
- Verrouillage de l’évaluation Mathématiques P3.
- 18 tâches distinctes reliées à 18 codes canoniques du référentiel.
- Nouveaux fichiers `Maths_P3_eleve_verrouillee.docx` et `Maths_P3_grille_enseignant_verrouillee.docx`.

# V34.02 — Mathématiques P2 verrouillées

- P2 alignée sur la règle « 1 ligne d’évaluation = 1 compétence = 1 code canonique ».
- 16 compétences P2 évaluées par 16 tâches distinctes.
- Remplacement des anciens items non concordants (différences mentales, problèmes de comparaison/additifs, diagramme en barres) par les tâches correspondant exactement au référentiel P2.
- Documents dédiés : `Maths_P2_eleve_verrouillee.docx` et `Maths_P2_grille_enseignant_verrouillee.docx`.
- `evaluations-data.js` pointe désormais vers les documents P2 verrouillés.

# V34.01 — Mathématiques P1 verrouillées

- Règle officielle du projet : 1 ligne d’évaluation = 1 compétence = 1 code canonique.
- Nouvelle évaluation élève P1 dédiée avec 16 compétences exactement reliées au référentiel.
- Nouvelle grille enseignant P1 avec les 16 codes exacts ; suppression des « Code à relier ».
- Alignement de la numération P1 sur le référentiel : nombres jusqu’à 10 000.
- Suppression de l’évaluation P1 des items sans code canonique P1 dédié (équivalences de fractions, milieu).
- `evaluations-data.js` pointe désormais vers les deux documents P1 verrouillés.

# Changelog — Progressions CE2

Ce fichier présente les grandes évolutions du projet. Le détail historique complet est conservé dans `docs/historique/`.

## V34.00 — Socle de consolidation

- Première étape de consolidation du projet sans refonte fonctionnelle.
- Regroupement des anciens README dans `docs/historique/`.
- Création d’un `README.md` unique décrivant l’état actuel du projet.
- Création de `CHANGELOG.md` pour conserver un historique synthétique.
- Harmonisation du numéro de version des pages principales en V34.00.

## V33.99 — Test des devoirs discret

- Le mode de test des semaines de devoirs est déclenché par un appui long sur l’icône 📚 du titre « Devoirs ».
- Les contrôles de simulation des semaines et le retour automatique sont conservés.

## V33.94 à V33.98 — Devoirs des familles

- Affichage d’une seule semaine de devoirs à la fois selon la date.
- Présentation plus chaleureuse de la routine des devoirs.
- Ajout puis amélioration progressive d’un mode de test enseignant.

## V33.89 à V33.93 — Espace Parents

- Ajout du PDF « Espace Parents & Maître Hibou » dans les ressources utiles.
- Renommage de la rubrique en « Rappels des mots du cahier de liaison ».
- Réorganisation des quatre accès principaux de l’accueil Parents.
- Refonte de « Infos de la classe » avec six cartes illustrées et une seule rubrique visible à la fois.

## V33.79 et versions précédentes

- Consolidation de la synchronisation Progressions CE2 ↔ Maître Hibou ↔ API Apps Script ↔ Google Sheet.
- Séparation de « Vue élèves » et « Mon suivi ».
- Développement des espaces Parents, Élèves et Remplaçant.
- Développement des outils rapides de classe, du suivi des présences et des vues TBI.
- Construction progressive du référentiel CE2 et du suivi des compétences.

Pour l’historique détaillé des versions V32 et V33, consulter `docs/historique/`.


## V34.11 — Correction ouverture saisie des évaluations
- Le bouton « Renseigner l’évaluation » ouvre désormais Mon suivi, où se trouve la grille de compétences.
- La matière, la période et la première compétence de l’évaluation sont sélectionnées automatiquement.
- Suppression de l’erreur « Le suivi des élèves n’a pas pu être ouvert » liée à l’ancien chemin Vue élèves.

## V34.12 — Correction du passage Évaluation → Mon suivi
- « Renseigner l’évaluation » ouvre désormais réellement `mon-suivi.html` au lieu de basculer un mode caché sur la page d’accueil.
- Le contexte de l’évaluation (matière, période, liste des codes, compétence courante) est conservé dans la session et repris automatiquement dans Mon suivi.
- En mode évaluation, la saisie affiche le vocabulaire verrouillé : Excellent / Réussi / En progrès / À revoir.
- Les traces saisies depuis Mon suivi sont enregistrées comme `evaluation_papier`, avec leur équivalent LSU et les références de l’évaluation.
- Les traces sont mises en file puis synchronisées vers l’onglet Google Sheets `traces_evaluations` via l’API V2.8.0.
