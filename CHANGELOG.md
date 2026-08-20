## V34.36 — Correction des filtres Évaluations

- Correction du moteur de détection des semaines d’évaluation : suppression d’une référence hors portée qui pouvait interrompre le rendu des cartes.
- Le filtre « Toutes les matières » affiche de nouveau toutes les cartes correspondant à la période/au semestre.
- Vérification attendue : P2 + Toutes les matières = 7 cartes (Français, Mathématiques, Anglais, Histoire, Géographie, Sciences, EMC).
- Cache de `evaluations-ui.js` porté à V34.36.

## V34.35 — Arts / chant compacts et optionnels
- 30 anciennes micro-compétences Arts remplacées par 6 repères annuels transversaux.
- 3 repères Arts plastiques : expérimenter ; réaliser avec des choix ; observer/parler.
- 3 repères Musique/chant : mémoriser/interpréter ; rythme/tempo/départs ; écouter/repérer.
- Références de l'emploi du temps réalignées sur les nouveaux codes annuels.
- Pas d'évaluation obligatoire ; usage prioritaire comme repères de programmation/observation, notamment pour les non-CHAM le mardi.
- Support `annualCompetencies` ajouté au référentiel, au suivi et au parcours élève.


## V34.34 — EPS compact et optionnel
- Réduction du référentiel EPS de 30 à 14 compétences.
- Piscine P2 : immersion, déplacement, équilibre/flottaison, enchaînement aquatique.
- VTT P3 : maîtrise du vélo, trajectoire, vitesse, sécurité/organisation.
- Gym/Lutte P4 : enchaînement, présentation, opposition, respect/sécurité.
- Deux repères transversaux en P1/P5.
- Pas de carte d'évaluation EPS imposée ; validation au fil des observations si possible.
- Réalignement des codes EPS présents dans l'emploi du temps.
## V34.33 — Nettoyage des références de compétences

- Référentiel canonique contrôlé : 507 codes uniques.
- Suppression des 4 dernières références actives non canoniques dans P4/P5 : `ORT-P4-05`, `EMI-P4-06`, `ECR-P5-05`, `OR-P5-03`.
- Ancien `emploi-du-temps.js` neutralisé et archivé dans `docs/historique/emploi-du-temps-legacy-v34-32.js`.
- EMC : couverture des évaluations de référence portée à 25/25 compétences (`EMC-P2-02` et `EMC-P4-02` ajoutées aux situations P2/P4).
- Audit final des fichiers actifs : 0 code P1→P5 utilisé hors `data.js`.
- Version visible et cache des pages : V34.33.

## V34.32 — Rééquilibrage du calendrier des évaluations
- Programmation des évaluations de référence à la fin effective des séquences.
- Nettoyage des libellés : référence / formative / observation / remédiation.
- Rééquilibrage P1→P5 pour limiter les semaines de surcharge ; Géographie P4 reportée au 2 avril après consolidation.
- Géographie P2 : ajout de deux séances d’apprentissage avant l’évaluation.
- Histoire P5 : ajout d’une séquence courte avant l’évaluation finale.
- Sciences P5 : évaluation déplacée après chaîne alimentaire et étude du milieu.
- Janvier P3 reste sans aucune évaluation programmée.
- Détection automatique des dates d’évaluation renforcée pour privilégier les vraies traces de référence.
- Français/Mathématiques : micro-évaluations reclassées en traces formatives et création d’un repère de référence unique par période dans l’emploi du temps.

## V34.31 — Sciences : référentiel + évaluations P1→P5
- 40 compétences Sciences remplacées par 25 compétences observables (5 par période).
- P2 croisé avec la piscine : eau, changements d’état, expérimentation et flottabilité.
- P3 croisé avec la Cavayère : VTT, fonctions techniques, transmission, sécurité, test et réglage.
- P4 : corps, effort, pouls, respiration et santé.
- P5 : cycles de vie, besoins, chaînes alimentaires et milieux ; mini-trace électricité complémentaire.
- 5 cartes Sciences ajoutées dans `evaluations-data.js` et filtre Sciences activé.
- EDT P1→P5 réaligné ; aucune trace formelle P3 en janvier.

## V34.30 — Évaluations Géographie P1→P5
- 5 cartes d’évaluation Géographie ajoutées dans `evaluations-data.js`.
- Filtre Géographie et détection des créneaux ajoutés dans `evaluations-ui.js`.
- Repères EDT : P1 16/10/2026 ; P2 17/12/2026 ; P3 05/02/2027 ; P4 26/03/2027 ; P5 18/06/2027.
- Respect de la règle : aucune évaluation programmée en janvier.

## V34.29 — Consolidation du référentiel Géographie CE2

- 35 compétences Géographie ramenées à 25 compétences structurantes et observables.
- Conservation de l’architecture P1→P5 validée.
- Fusion des micro-compétences redondantes et suppression des formulations trop conceptuelles pour le CE2.
- Réalignement des codes Géographie utilisés dans les données d’emploi du temps.
- Cache `data.js` et balises `<title>` mis à jour en V34.29.

# V34.28 — 20/08/2026

## Évaluations Histoire P1→P5
- Ajout de `histoire` dans `evaluations-data.js` et dans le filtre matière.
- 5 cartes prêtes, une par période, chacune reliée aux 4 compétences Histoire canoniques.
- P1 : « Construire et lire une frise chronologique ».
- P2 : « Comparer la vie quotidienne à différentes époques ».
- P3 : « Découvrir un personnage ou un événement du passé » ; évaluation formelle en février uniquement.
- P4 : « Enquêter sur le Moyen Âge ».
- P5 : « Présenter une grande figure ou une évolution historique », principalement à l’oral.
- Ajout de la détection Histoire dans le repérage automatique des évaluations de l’emploi du temps.
- Alignement de 5 créneaux de référence dans les emplois du temps P1→P5.
- Cache-busting des fichiers Évaluations et des données d’emploi du temps en V34.28.
- Balises `<title>` mises à jour en V34.28.

# V34.27 — 20/08/2026

- Refonte du référentiel Histoire CE2 : 20 compétences structurantes, 4 par période.
- Nouvelle progression P1→P5 validée : repères temporels, modes de vie, grandes figures/événements de P3 à P5.
- Réécriture de `title`, `jeSais`, `checklist`, `proofs` et `lsu` avec des compétences observables.
- Suppression des anciennes compétences Histoire `05`, `06` et `07`.
- Alignement des références Histoire dans les données d’emploi du temps afin d’éviter les codes orphelins.
- Balises `<title>` et cache-busting de `data.js` mis à jour en V34.27.

## V34.24 — EMC : traces authentiques de réussite
- Rééquilibre P1/P2/P3 selon la progression validée : cadre commun → message clair → bien commun/conseil d’élèves.
- Ajoute 5 cartes EMC à la fenêtre Évaluations, chacune avec un type de trace explicite.
- Rend les documents élève/enseignant optionnels : une observation n’exige plus artificiellement une fiche papier.
- Les traces EMC saisies via Mon suivi sont enregistrées avec la source `observation_classe`.
- Ajoute des repères de trace EMC dans l’emploi du temps : observation P1, message clair P2, conseil P3, débat des 4 coins P4, repères citoyens P5.

## V34.23 — Janvier sans évaluations programmées
- Retrait des libellés d’évaluation formelle des semaines de janvier en P3.
- Déplacement des traces principales Français/Maths P3 sur la semaine du 1er au 5 février 2027.
- Semaine 4 P3 renommée « Consolider et réinvestir ».
- Semaine 5 P3 renommée « Évaluer puis remédier ».
- Cache-busting du fichier `emploi-du-temps-data-p3.js`.

## V34.22 — Repère semestriel des évaluations
- Affichage automatique sur chaque carte de **Semestre 1 — LSU S1** ou **Semestre 2 — LSU S2**.
- Règle annuelle verrouillée : **P1 + P2 = S1** ; **P3 + P4 + P5 = S2**.
- Ajout du filtre **Tous les semestres / Semestre 1 / Semestre 2** dans la fenêtre Évaluations.
- Le semestre est déduit de la période : aucune saisie manuelle supplémentaire.
- Règle pédagogique enregistrée : **janvier sans évaluations programmées** ; le déplacement des créneaux P3 existants est volontairement laissé à l’ajustement calendrier suivant.

## V34.21 — Ajustement pédagogique des bilans d’anglais
- Maintien du format très léger : 3 situations par semestre.
- S1 : formulation légèrement simplifiée, toujours centrée sur compréhension, interaction et repères culturels.
- S2 : retrait de la copie d’une formule comme situation de bilan semestriel.
- S2 : remplacement par la compréhension d’une histoire courte (`ANG-P5-04`), plus représentative des apprentissages en langue vivante.
- `ANG-P5-06` reste dans le référentiel et peut être validée lors des activités ordinaires, sans peser comme un tiers du bilan.
- Emploi du temps P5 et liste des compétences évaluées mis en cohérence.

## V34.20 — Bilans semestriels d’anglais
- Ajout de deux bilans d’anglais (S1 et S2), chacun limité à 3 situations : comprendre, parler/interagir, culture.
- Ajout des supports élève et grilles enseignant.
- Raccordement aux validations orales de P2 semaine 6 et P5 semaine 9.
- Ajout d’Anglais dans le filtre de la fenêtre Évaluations et prise en charge du repère calendrier.

## V34.19 — Compteur dynamique des compétences évaluées

- Le nombre affiché dans « Compétences de cette évaluation » correspond désormais au nombre de cases cochées.
- « Renseigner l’évaluation (X) » est mis à jour immédiatement lors d’un cochage/décochage.
- Aucun changement sur les fiches élève DOCX : cette sélection concerne uniquement les compétences prises en compte pour la saisie.

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


## V34.25
- Affinage des filtres de la fenêtre Évaluations : le choix du semestre limite dynamiquement les périodes disponibles (S1 = P1/P2 ; S2 = P3/P4/P5).
- Réinitialisation automatique à « Toutes les périodes du semestre » si la période courante n’est plus compatible.


## V34.26 — 20/08/2026
- Fenêtre Évaluations agrandie sur PC.
- Nouveau choix **Toutes les matières**.
- Ordre des cartes : Français → Mathématiques → Anglais → EMC.
- Badge matière ajouté à chaque carte.
- Grille de 2 cartes larges par ligne sur PC ; carte unique pleine largeur ; responsive 1 colonne.
