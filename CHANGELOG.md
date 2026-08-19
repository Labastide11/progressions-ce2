## V34.18 — Repères automatiques des évaluations
- Ajout sur chaque carte d’évaluation d’un repère **semaine + dates** calculé depuis l’emploi du temps détaillé.
- Ajout du statut automatique **À venir / Cette semaine / Passée** selon la date courante.
- Ajout du lien **Voir dans l’emploi du temps** ouvrant directement la période et la semaine concernées.
- Aucun doublon de saisie : le repère est déduit des compétences évaluées et des créneaux de validation programmés.

# CHANGELOG — Progressions CE2

Le détail complet des anciennes versions est conservé dans `docs/historique/`. Ce fichier ne garde que les étapes structurantes du projet.

## V34.17 — Consolidation de la documentation
- Nettoyage de la racine du projet : conservation de `README.md` et `CHANGELOG.md` uniquement pour la documentation active.
- Archivage des anciens README, notes de patch et consignes d’installation dans `docs/historique/`.
- Création d’un index de l’historique et sauvegarde du précédent CHANGELOG avant consolidation.
- `README.md` recentré sur l’état actuel du projet.

## V34.16 — Français P1 DRAS refondue
- Corpus commun « Un matin dans la forêt » avec le renardeau.
- 13 compétences P1 reliées à 13 codes canoniques.
- DRAS explicite et retrait de la conjugaison systématique au présent, réservée à P2.
- Harmonisation avec la correction Excellent / Réussi / En progrès / À revoir.

## V34.15 — Français P2 à P5 finalisé avec le DRAS
- Création de vraies évaluations élève et grilles enseignant pour P2 à P5.
- Maîtrise de la langue évaluée à partir de corpus et de manipulations DRAS.
- 14 compétences canoniques ciblées par période.

## V34.14 — Questions des élèves / API V2.8.1
- Réparation de la synchronisation de la fenêtre Questions des élèves.
- Ajout des actions `get_questions_classe` et `update_question`.

## V34.13 — Sélection de compétence en évaluation
- Mon suivi lit les structures `p1Competencies` à `p5Competencies`.
- La compétence active affiche code, intitulé et domaine.

## V34.12 — Évaluation → Mon suivi
- « Renseigner l’évaluation » ouvre réellement `mon-suivi.html`.
- Conservation du contexte matière, période et compétence.
- Navigation Précédente / Suivante / Terminer.

## V34.10 — Connexion API partagée
- Correction de l’ancienne URL Apps Script encore forcée par le module Questions.
- Migration vers le déploiement API V2.8.x sans écraser une URL personnalisée.

## V34.09 — Traces d’évaluation ↔ Google Sheets
- Création de l’onglet `traces_evaluations`.
- Synchronisation par lots et réconciliation par `trace_id`.
- Ajout des traces d’évaluation au `student_snapshot`.

## V34.08 — Historique daté des évaluations
- Une nouvelle saisie conserve une trace datée au lieu d’écraser l’état précédent.
- Distinction des sources : évaluation papier, observation de classe, Maître Hibou.
- Correspondance élève ↔ LSU enregistrée dans les traces.

## V34.07 — Programmation P3 à P5 alignée sur les évaluations
- Vérification que chaque compétence évaluée possède une trace de programmation.
- Compléments ciblés en P4 et P5.

## V34.06 — Français P2 à P5 : codes canoniques
- Finalisation des codes des évaluations de français P2 à P5.
- Règle « 1 compétence = 1 code canonique » appliquée.

## V34.01 à V34.05 — Mathématiques P1 à P5 verrouillées
- Refonte progressive des évaluations de mathématiques.
- Une tâche identifiable et un code canonique par compétence.
- Alignement des fiches élève, grilles enseignant et `evaluations-data.js`.

## V34.00 — Socle de consolidation
- Séparation entre documentation active et historique.
- Mise en place de `docs/historique/`, `README.md` et `CHANGELOG.md`.

## V33 — Construction du socle fonctionnel
- Séparation « Vue élèves » / « Mon suivi ».
- Développement des espaces Parents, Élèves et Remplaçant.
- Outils rapides, présences, TBI, évaluations, référentiel et synchronisation Maître Hibou / API / Google Sheet.

## V32 et antérieures
- Construction progressive du référentiel CE2, du suivi des compétences et des premières briques du tableau de bord.
- Voir `docs/historique/` pour le détail version par version.
