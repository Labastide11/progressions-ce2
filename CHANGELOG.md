# V34.98 — Intégration GDVB P3 → P4

- P3 : amorce « En route vers le GDVB » dans le créneau EPS du vendredi, sans déplacer les autres apprentissages.
- P3 : 5 jalons progressifs : « Bouger, c’est quoi ? », Memory des bienfaits, Croix rythmée, pause active test, annonce du GDVB.
- P4 : du 22 février au 2 avril 2027, Domec du lundi devient le socle EPS du fil rouge GDVB.
- P4 : chaque vendredi, le créneau EPS accueille un défi GDVB : Croix rythmée, cerceaux, lancer, déménageurs, défi collectif, bilan.
- Espace Parents : publication dans « Infos de la classe → À venir » de l’amorce P3 et du GDVB du 22 février au 4 avril 2027.
- Aucun changement des progressions de français, mathématiques, histoire, géographie ou sciences.

# V34.97 — Refonte complète des devoirs P1 + moteur annuel

- Ajout de `data/devoirs-engine.js`, nomenclature commune pour P1→P5.
- Six catégories verrouillées : Lecture, Français, Mathématiques, Préparation, Poésie, Défi famille.
- Chaque tâche P1 possède désormais : matière, verbe d’action, consigne autonome, aide/exemple, durée et lien avec l’apprentissage de classe.
- Maximum : 2 tâches essentielles par échéance, 5 à 10 minutes au total.
- Le cahier devient une aide et non une condition ; chaque consigne prévoit un repli sans cahier.
- Les dictées sont anticipées deux fois lorsque pertinent : première mémorisation puis rappel avant le bilan. Les mots restent issus de `dictees-ce2.js`.
- Les anciens « Défis du jour » d’entraînement sont remplacés par de vrais blocs disciplinaires ; le mot « défi » est réservé au ludique/recherche.
- Le Défi famille reste facultatif.
- P1 devient le modèle de référence pour la migration P2→P5.

# V34.96 — Lien réel dictées ↔ devoirs Parents

- `dictees-ce2.js` reste la source de vérité des mots de dictée.
- `data/parents-dictees.js` contient désormais, pour chaque semaine : `start`, `end`, `reviewDue`, `hasFinal`, thème, mots et priorités.
- `reviewDue` est calculé depuis les vraies dates des devoirs : priorité au jeudi, sinon au dernier devoir avant vendredi.
- La projection ne contient toujours aucun flash, bilan, DRAS ou donnée professionnelle.
- L’Espace Parents peut maintenant afficher les mots exactement dans le devoir de la veille, au lieu d’une carte hebdomadaire indépendante.

# V34.94 — P1 S2 autonome pour les familles

- P1 S2 : banque commune visible `avec, dans, pour, mais, très, aussi, alors, parce que`.
- 5 prioritaires : `avec, dans, pour, mais, très`.
- Le travail à la maison reste possible sans cahier.
- La projection publique Parents est synchronisée.
- Le Remplaçant récupère automatiquement cette banque depuis Progressions.

# V34.93 — Raccord public des dictées

- `dictees-ce2.js` reste la source de vérité annuelle.
- Ajout de `data/parents-dictees.js`, projection publique limitée au thème, aux mots et aux 5 mots prioritaires.
- Aucun flash, dictée bilan, DRAS, production d’écrit ou donnée professionnelle n’est exposé aux familles.
- Ajout de `outils/generer-dictees-parents.js` pour régénérer cette projection publique.
- L’Espace Remplaçant professionnel peut continuer à charger la banque complète.

# V34.92 — Dictées P5 + DRAS + production d’écrit

- P5 enrichie dans `dictees-ce2.js`.
- Pour chaque semaine : orthographe cible, mots concernés, grammaire cible, exemple élève et réactivation.
- Progression P5 : synthèse des accords, pluriels, homophones, familles de mots, noms propres et relecture autonome.
- Ajout de `ecritureDRAS` à chaque semaine de P5.
- Les phrases DRAS réemploient les corpus culturels de la période : Tour Eiffel, Londres, Colisée, Statue de la Liberté, Grande Muraille, Taj Mahal, Machu Picchu, île de Pâques, Christ Rédempteur, pyramide de Khéops, Sphinx.
- Mardi : phrase DRAS + Déplacer + Remplacer.
- Jeudi : phrase DRAS + Supprimer + Ajouter + production d’écrit.
- Vendredi : relecture DRAS et vocabulaire de la semaine.
- P5 reprend l’affichage validé P1–P4 dans l’emploi du temps.
- La dernière semaine devient une boucle de synthèse et de réactivation annuelle.
- Espace Parents inchangé dans cette version.

# V34.91 — Dictées P4 + DRAS + production d’écrit

- P4 enrichie dans `dictees-ce2.js`.
- Pour chaque semaine : orthographe cible, mots concernés, grammaire cible, exemple élève et réactivation.
- Progression P4 : accord sujet–verbe, chaînes d’accords, homophones fréquents, imparfait, accords complets lors des transformations.
- Ajout de `ecritureDRAS` à chaque semaine de P4.
- Les phrases DRAS réemploient le corpus de dictée de la semaine.
- Mardi : phrase DRAS + Déplacer + Remplacer.
- Jeudi : phrase DRAS + Supprimer + Ajouter + production d’écrit.
- Vendredi : relecture DRAS et vocabulaire de la semaine.
- P4 reprend l’affichage validé P1–P3 dans l’emploi du temps.
- P5 inchangée pour cette étape.
- Espace Parents inchangé.

# V34.90 — Phrase DRAS visible dans l’emploi du temps

- La phrase DRAS de départ est maintenant affichée explicitement dans l’emploi du temps.
- Mardi : phrase DRAS de départ + Déplacer + Remplacer.
- Jeudi : phrase DRAS de départ + Supprimer + Ajouter + production d’écrit.
- Vendredi : phrase DRAS de référence rappelée pour la relecture.
- Aucun changement des corpus, dictées, mots, progressions P1–P3, Espace Parents ou API.

# V34.89 — Consolidation Dictée ↔ DRAS ↔ Production d’écrit P1–P3

- Ajout d’un objet `ecritureDRAS` à chaque semaine de P1, P2 et P3.
- Chaque DRAS part d’une phrase construite avec le corpus réel de la dictée de la semaine.
- Mardi : phrase de départ + Déplacer + Remplacer.
- Jeudi : Supprimer + Ajouter + production d’écrit courte.
- La production impose explicitement plusieurs mots de la banque de dictée.
- Vendredi : relecture DRAS de la production avec sens, accords, précision et vocabulaire.
- Les blocs compacts de programmation indiquent désormais la phrase DRAS et la production attendue.
- Une seule source reste utilisée : `dictees-ce2.js`.
- P4/P5 inchangées pour cette étape.
- Espace Parents inchangé.

# V34.88 — Dictées P3 structurées

- P3 enrichie dans la banque annuelle `dictees-ce2.js`.
- Pour chaque semaine : orthographe cible, mots concernés, grammaire cible, exemple élève et réactivation.
- Progression P3 : m devant m/b/p, accents, familles de mots, préfixes/suffixes, accords du groupe nominal.
- Spirale de réactivation : 3 anciens mots repris chaque semaine ; dernière semaine = consolidation.
- P3 reprend l’affichage validé en P1/P2 directement dans l’emploi du temps.
- Bloc de programmation P3 compact et dépliable.
- P4/P5 inchangées pour cette étape.
- Espace Parents inchangé.

# V34.87 — Banque annuelle unique des dictées + P2 structurée

- Création de `dictees-ce2.js`, source centrale P1→P5.
- P1 migre vers cette banque sans changement visuel.
- Les corpus P2→P5 sortent de `emploi-du-temps-ui.js`.
- P2 : orthographe cible, mots concernés, grammaire, exemple élève et réactivation explicite.
- Spirale P2 : 2 à 3 anciens mots repris chaque semaine ; S7 consolide les mots fragiles.
- P2 reprend l’affichage pratique validé en P1 dans l’emploi du temps.
- P3→P5 restent fonctionnelles et seront enrichies ensuite.
- Espace Parents inchangé pour cette étape.

# V34.86 — Dictées intégrées dans l’emploi du temps

- Le créneau Orthographe / dictée affiche directement les informations utiles face aux élèves.
- Lundi : thème, banque de mots, 5 prioritaires, point orthographique et mots concernés.
- Mardi : dictée flash 2, grammaire et manipulation.
- Jeudi : dictée flash 3, réactivation et point de vigilance.
- Vendredi : dictée bilan, points à surveiller et mots à reprendre.
- Le grand bloc « Programmation des dictées » devient un résumé compact dépliable.
- Une seule source de données alimente le résumé et l’emploi du temps.
- Espace Parents, Maître Hibou, API et données élèves inchangés.

# V34.85 — Dictées P1 : mots et exemples directement visibles

- Ajout d'une colonne « Mots concernés / exemples » dans la vue d'ensemble P1.
- Ajout des mots ou exemples associés à chaque difficulté orthographique.
- Ajout d'un exemple grammatical directement exploitable avec les élèves.
- Ajout des mots à réactiver explicitement.
- Aucun changement des corpus, dictées flash, dictées bilans, Espace Parents, Maître Hibou, API ou données élèves.

# V34.84 — Programmation explicite des dictées P1

- Ajout d'une programmation professeur pour les 7 semaines de P1.
- Thème, banque de mots, 5 mots prioritaires, difficulté orthographique dominante, grammaire mobilisée et réactivation.
- Corpus Charivari, dictées flash et dictées bilans conservés.
- S1 diagnostique ; S2 installation ; S3 à S6 banques structurées ; S7 réactivation personnalisée.
- Espace Parents, Maître Hibou, API et données élèves inchangés.

## V34.82 — Questions des élèves : filtre Toutes par défaut
- La fenêtre « Questions des élèves » s’ouvre désormais sur l’onglet « Toutes ».
- Le dernier filtre utilisé n’est pas mémorisé : chaque rechargement repart sur « Toutes ».
- Aucun changement sur la synchronisation API, les statuts ou les données élèves.

# V34.80 — Consolidation sans changement fonctionnel


## V34.81 — 22 août 2026 — Sécurisation Cahier journal / Programme du jour
- API Cahier Journal V1.1 : `ping` reste public ; `parametres`, `jour`, `semaine`, `enregistrerJour` et `archiverSemaine` exigent désormais `TABLET_DEVICE_KEY`.
- Progressions transmet la clé professionnelle déjà stockée sur l'appareil (`hibou_sync_device_key_v25754`) pour les lectures et écritures du cahier journal.
- Les appels protégés passent en POST afin de ne pas placer la clé professionnelle dans l'URL.
- Protection supplémentaire : une sauvegarde de journée sans séance est refusée afin d'éviter l'effacement accidentel d'une journée existante.
- Aucun changement pédagogique ou d'interface.

- Rangement des 30 notes `README_PATCH_V34_*.txt` dans `docs/historique/patches-v34/`.
- Archivage de `CHANGELOG_V34_17_NOUVEAU.md` dans `docs/historique/`.
- Regroupement des tests LSU sous `tools/tests/`.
- Adaptation de leurs chemins relatifs et réalignement du test V34.42 sur le connecteur LSU actuel `1.0.3` ; le test était déjà obsolète en V34.79.
- `assets/home-v32-31` et `assets/home-v32-32` étaient strictement identiques (23 fichiers, mêmes SHA-256) et non référencés par le code actif ; suppression du doublon et conservation d'une copie historique hors des assets actifs.
- Mise à jour des balises `<title>` des pages principales en V34.80.
- Aucun changement fonctionnel, aucune modification d'API ni de données.

# V34.79 — Sécurisation des métadonnées élèves

- Retrait de `data/enseignant-eleves-meta.js` du dépôt public.
- Les dates de naissance, sexe, CHAM et autres métadonnées sont désormais fournis à Progressions CE2 par l’API V2.8.2 authentifiée.
- Suppression des fallbacks statiques dans l’accueil, Vue élèves et Suivi de rentrée.
- Aucun changement du Google Sheet ni de Maître Hibou.

# V34.52 — Espace Parents : évaluations annoncées sans surcharge

- Le titre anxiogène « Évaluations à préparer » devient « Évaluations prévues cette semaine ».
- Ajout d’un message rassurant : les évaluations sont annoncées à l’avance pour aider les familles à s’organiser, pas pour imposer des révisions pendant tout le week-end.
- Les familles peuvent choisir une courte révision pendant le week-end ou un simple rappel la veille de l’évaluation.
- Rappel explicite que quelques minutes suffisent et qu’il n’est pas nécessaire de tout revoir.
- Présentation visuelle adoucie tout en conservant la priorité du bloc.
- Mode secret enseignant, icônes saisonnières/périodiques et liens Maître Hibou inchangés.

# V34.51 — Annonce anticipée des évaluations P1

- Règle annuelle verrouillée : toute évaluation programmée est annoncée au plus tard le week-end précédent.
- P1 : annonce dès le week-end avant S6 des évaluations Histoire, Français et Mathématiques.
- P1 : annonce dès le week-end avant S7 des évaluations Sciences et Géographie.
- Chaque annonce précise la date, la matière, ce qui sera évalué et comment se préparer.
- La veille : rappel court uniquement, sans nouvel apprentissage.
- Les évaluations passent avant les devoirs ordinaires.
- Liens Maître Hibou uniquement lorsque la leçon est pertinente.
- Mode secret de test des devoirs et icônes saisonnières inchangés.

# V34.50 — Espace Parents : audit devoirs P1 semaines 3 à 7

- devoirs réalignés sur les apprentissages réellement enseignés ;
- suppression des anticipations de notions non encore étudiées ;
- liens directs vers les leçons Maître Hibou utiles ;
- S6 allégée autour des évaluations de référence ;
- S7 centrée sur une seule remédiation ciblée ;
- mode secret de test et icônes saisonnières préservés.

# V34.49 — Espace Parents : devoirs semaine 2 raccordés aux apprentissages

- Semaine 2 recalée sur l’emploi du temps réel du 7 au 11 septembre 2026.
- Mardi : lecture du texte travaillé lundi + compléments à 10.
- Jeudi : mots fréquents + compléments à 10, avec lien direct vers la leçon Maître Hibou « Trouver des compléments ».
- Vendredi : relecture « La phrase et la ponctuation », avec lien direct de secours vers Maître Hibou.
- Lundi suivant : préparation courte de lecture à voix haute.
- Le mode secret de test des devoirs et les icônes saisonnières sont conservés.
- Le calendrier Parents fiable de V34.48 est conservé.

# V34.48 — 21 août 2026 — Calendrier Parents fiable

- suppression du fallback qui inventait un emploi du temps lorsqu’aucune journée détaillée n’existait ;
- ajout des semaines réelles de rentrée (1er–4 septembre et 7–11 septembre 2026) dans P1 ;
- affichage explicite et nommé des vacances scolaires ;
- affichage explicite des jours fériés : Lundi de Pâques, Ascension, Lundi de Pentecôte ;
- affichage spécifique du vendredi 7 mai 2027 : « Pont de l’Ascension — pas de classe » ;
- recherche du prochain vrai jour de classe dans les données détaillées ;
- mise à jour de l’Espace Parents et des balises `<title>` en V34.48.

# V34.47 — Nettoyage des traces Maître Hibou et continuité S1/S2

- Masque dans le LSU les anciennes traces non codées : elles restent conservées dans `parcours_eleves` mais ne sont plus affichées dans la vue pédagogique.
- Affiche les traces canoniques migrées sans doublon visuel avec leur ancienne trace brute.
- Conserve séparément les compétences issues d’une même ancienne ceinture (ex. `GRA-P1-02` et `GRA-P1-03`).
- Le filtre S1/S2 ne masque plus l’historique Maître Hibou : il indique « utilisée pour ce semestre », « 👏 À reporter au S2/S1 » ou « À prendre en compte au S2/S1 ».
- Mise à jour des balises `<title>` et des références de version en V34.47.

## V34.47 — 20 août 2026 — Correctifs Suivi des élèves

- Correction de l'accès `index.html?open=evaluations` : ouverture robuste de la fenêtre « Évaluations en classe » même si `window.load` a déjà eu lieu.
- `competences-hibou.html` est explicitement reliée au `student_snapshot` réel du Google Sheet en lecture seule.
- Chargement jusqu'à 1000 traces, cache-busting JSONP conservé et statut visible : nombre de traces Maître Hibou lues, nombre de compétences codées et heure d'actualisation.
- Tolérance ajoutée pour les alias de champs (`competence_code`, `competenceCode`, etc.) afin d'éviter qu'une trace réelle soit masquée par une variation de nommage.
- Aucun changement du moteur LSU ni aucune écriture dans Google Sheets.

## V34.45 — 20 août 2026 — Suivi des élèves en 3 étapes

- Réorganisation de `mon-suivi.html` autour de 3 cartes : Compétences validées dans Maître Hibou, Évaluations en classe (orales ou écrites), Aide à la rédaction du LSU.
- Nouvelle page `competences-hibou.html` en lecture seule : résumé, compétences datées, résultat, semestre et anciennes traces non codées.
- `lsu.html` renommé visuellement « Aide à la rédaction du LSU » ; moteur LSU inchangé.
- Les autres blocs de l'accueil, Accompagnements/Inclusions, Référentiel, Vue élèves et Parcours individuel restent inchangés hors mise à jour de version.

## V34.44 — 20 août 2026 — Synthèse LSU centrée sur les appréciations

- Refonte de `lsu.html` en vue classe sous forme de tableau.
- L’appréciation LSU proposée devient l’élément principal, modifiable et copiable.
- Positionnement et confiance deviennent des informations secondaires de justification.
- Les quatre sources sont affichées avec des intitulés et descriptions explicites.
- Détail élève : toutes les compétences datées restent visibles, y compris celles de l’autre semestre avec « Bravo — à reporter ».
- Les anciennes traces non codées restent visibles mais sont signalées comme non exploitables directement pour le LSU.
- Aucune écriture de données : écran toujours en lecture seule.

## V34.43 — 20 août 2026 — Refonte du suivi des élèves et préparation de la synthèse LSU

- Accueil : `Priorités et suivi pédagogique` devient **Suivi des élèves**.
- Le raccourci `Évaluations et bilans des élèves` est conservé sur l’accueil comme accès direct ; les mêmes évaluations sont désormais aussi rangées logiquement dans **Suivi des élèves**.
- `mon-suivi.html` devient un hub volontairement simple en 2 blocs : **Évaluations et traces** puis **Synthèse LSU**.
- L’ancien tableau de bord de priorités est conservé intégralement dans `priorites-pedagogiques.html` : aucune fonction de groupes de besoin, KPI ou suivi détaillé n’est perdue.
- `Accompagnements et inclusions` est organisé en 2 blocs : **Priorités pédagogiques** et **Inclusions et accompagnements** ; le formulaire existant reste inchangé.
- Première interface `lsu.html` en lecture seule : choix élève / semestre, sources A-B-C-D, niveau suggéré, couverture, tendance, confiance, vigilances et phrase produite par le moteur.
- Aucun mécanisme d’écriture LSU n’est ajouté : la validation finale reste enseignante.
- Accès direct `index.html?open=evaluations` et `index.html?open=supports` pour conserver les outils existants sans duplication.
- Lien Maître Hibou actualisé vers `https://labastide11.github.io/Maitre-Hibou/`.
- Tous les titres HTML actifs passent en V34.43.

## V34.42 — 20 août 2026 — Connecteur LSU robuste aux réponses Apps Script lentes

- `student_snapshot` : délai JSONP par défaut porté de 20 s à 60 s pour tolérer les démarrages lents d’Apps Script.
- Après un timeout, le callback JSONP n’est plus supprimé immédiatement : un garde-fou temporaire absorbe une éventuelle réponse tardive et évite `ReferenceError: progressionsLSU_... is not defined`.
- Nettoyage différé du callback après 120 s afin d’éviter toute fuite durable.
- Ajout de l’alias public `LSURealConnector.getStudentSnapshot(prenom)` pour les diagnostics manuels.
- Connecteur toujours strictement en lecture seule : aucun POST, aucun `save_*`, aucune mutation de Google Sheets ou du stockage local.
- Cache-busting du moteur/connecteur LSU passé à `v=34.42`.

## V34.41 — 20 août 2026 — Correctif JSONP du diagnostic LSU réel

- Correction de `lsu-real-connector.js` : le callback JSONP est maintenant enregistré sur `globalThis` au lieu d'une variable `root` hors portée.
- Le diagnostic `LSURealConnector.diagnosticStudent(...)` peut désormais démarrer réellement dans le navigateur.
- Cache-busting du moteur/connecteur LSU passé à `v=34.41`.
- Aucun changement d'interface et aucune écriture de données.

## V34.40 — 20 août 2026 — Connecteur LSU réel en lecture seule

- Branchement du moteur LSU sur la structure réelle `student_snapshot`.
- Nouveau module `lsu-real-connector.js`, chargé dans `mon-suivi.html` sans élément visuel.
- Aucun appel API au chargement : diagnostic uniquement à la demande.
- Aucune écriture : pas de POST, pas de `save_*`, pas de mutation Google Sheet ou localStorage.
- Conversion des `evaluation_traces` en preuves A/B et du `parcours` Maître Hibou en source C.
- Médailles / records comptés en D à titre informatif uniquement.
- Filtrage semestriel robuste, y compris pour les compétences annuelles.
- Génération d’un rapport diagnostic par élève, objet + Markdown.
- Test automatisé du connecteur réel sur un snapshot de forme API.

## V34.39 — Simulation LSU S1 réaliste, sans interface
- Branchement du moteur LSU V1 sur un élève entièrement fictif du semestre 1.
- Test de Français, Mathématiques, Anglais, Histoire, Géographie, Sciences, EMC, EPS et Arts/Musique.
- Validation des priorités A > B > C > D, du réexamen après progrès formatifs, des vigilances structurantes persistantes et du refus de conclure quand les traces sont insuffisantes.
- Moteur LSU passé en 1.1.0 : tendance matière calculée par agrégation des tendances de compétences ; vigilance persistante supprimée lorsque les deux dernières traces enseignantes sont redevenues solides.
- Aucun ajout d’interface.

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

## V34.37 — Moteur de synthèse LSU V1 (sans interface)
- Ajout de `lsu-synthesis-engine.js`, module indépendant et non chargé par les pages HTML.
- Synthèse par compétence : priorité A, traces formatives B, Maître Hibou C, indicateurs D.
- Maître Hibou peut confirmer ou nuancer, mais ne remplace jamais une preuve enseignante forte.
- Gestion de la progression, de la consolidation récente, des fluctuations et des données insuffisantes.
- Synthèse matière sans moyenne arithmétique : niveau dominant, profil solide/consolidation/priorité, couverture, tendance et confiance.
- Détection de vigilance pédagogique sur compétences structurantes persistantes (`lsuCore`, `lsuCoreGroup`).
- `Dépassé` matière exige des preuves explicites de transfert.
- Ajout de 8 scénarios automatisés dans `tools/test_lsu_engine.js`.
- Aucun écran, bouton ou flux de navigation LSU ajouté à cette version.

## V34.38 — 20 août 2026 — Compétences structurantes LSU
- Sélection de 18 codes canoniques réels dans `data.js`.
- Ajout de `lsuCore: true` et `lsuCoreGroup` sur ces seules compétences.
- Répartition : Français 8, Mathématiques 6, Anglais 2, QLM 2.
- Aucun écran ni branchement d’interface ajouté.
- Une compétence structurante sert à la vigilance et à la synthèse ; elle ne reçoit pas de poids chiffré supplémentaire.


## V34.54 — Refonte P1 : évaluations courtes et devoirs réalignés
- Application de la règle d’or : 2 nouvelles compétences essentielles par évaluation ; 1 ou 2 anciennes seulement en rebrassage lorsque cela a du sens.
- P1 volontairement sans rebrassage artificiel : les évaluations de début d’année restent très courtes.
- Français P1 : GRA-P1-04 (verbe conjugué) + GRA-P1-06 (groupe sujet).
- Mathématiques P1 : PRO-P1-01 (comprendre la question d’un problème, fondamental LSU) + OPE-P1-01 (poser une addition).
- Histoire P1 : HIS-P1-02 + HIS-P1-03.
- Sciences P1 : SCI-P1-03 + SCI-P1-05 (fondamental LSU), par observation en situation.
- Géographie P1 : GEOG-P1-01 + GEOG-P1-02.
- Espace Parents : nouvelles compétences mises en avant ; support du futur bloc « Déjà vu — rebrassage ».
- Devoirs et rappels P1 réalignés sur les seuls objectifs réellement évalués.
- Nouvelles fiches élève et grilles enseignant P1 en Français et Mathématiques.

## V34.53 — Espace Parents : devoirs P2 après audit
- Création de `data/devoirs-p2.js` pour les 7 semaines de la période 2.
- Alignement des devoirs sur la progression et l’emploi du temps P2.
- Annonce anticipée et rassurante de toutes les évaluations programmées.
- Rappels légers uniquement la veille des évaluations.
- Liens Maître Hibou réservés aux leçons réellement disponibles et utiles ; aucun lien inventé en Histoire, Sciences ou Géographie.
- Mode secret enseignant et icônes périodiques conservés.


## V34.78 — 22 août 2026 — Externalisation de l’Espace Remplaçant
- Suppression de l’ancienne interface Remplaçant intégrée (`remplacant.html`, `remplacant.css`, `remplacant.js`, `QR_remplacant.png`).
- Suppression de `data/remplacant-eleves.js` : la liste nominative n’est plus publiée dans le dépôt principal.
- Retrait du chargement de cette liste dans `index.html`.
- `espace-publication.js` ne génère plus de ZIP Remplaçant et ne conserve que la publication Parents.
- Conservation de `data/remplacant-programme.js`, `data/remplacant-cahier-journal.js` et `data/remplacant-infos-pratiques.js`, encore lus par le nouveau site `espace-remplacant-ce2`.
- Mise à jour de la balise `<title>` vers V34.78.
