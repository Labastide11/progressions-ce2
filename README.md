## V34.08 — Historique daté des évaluations

- Toute modification de niveau conserve une trace datée au lieu d’effacer l’historique.
- Une saisie lancée depuis **Évaluations** est identifiée comme `evaluation_papier`.
- Vocabulaire de correction : **Excellent / Réussi / En progrès / À revoir**.
- Correspondance LSU enregistrée : **Dépassé / Atteint / Partiellement atteint / Non atteint**.
- Les validations Maître Hibou appliquées au suivi sont tracées avec la source `maitre_hibou`.
- Le suivi courant reste disponible ; l’historique est conservé séparément dans `progressions_ce2_traces_competences_v1`.

## V34.07 — Alignement emploi du temps P3–P5 / évaluations

- Audit des compétences évaluées en P3, P4 et P5.
- P3 : couverture déjà complète, aucune compétence évaluée manquante.
- P4 : ajout explicite des masses (`MAS-P4-01`), monnaie (`MON-P4-01`), durées (`TEM-P4-01`) et programme de construction (`GEO-P4-03`) dans les créneaux de mathématiques.
- P5 : ajout explicite des mesures à plusieurs étapes (`MES-P5-02`), durées (`TEM-P5-01`) et symétrie (`SYM-P5-01`) dans les créneaux de mathématiques.
- Les évaluations Français P3–P5 étaient déjà couvertes par la programmation via les plages de codes existantes.

# Progressions CE2

## V34.06 — Français P2 à P5 : codes canoniques finalisés

- 14 compétences ciblées par période, chacune reliée à un code unique.
- P3 corrigée sur le futur, P4 sur l’imparfait, P5 sur le passé composé et l’articulation imparfait/passé composé.
- Grilles élève/enseignant P2-P5 régénérées avec les codes exacts.
- Règle : 1 ligne d’évaluation = 1 compétence = 1 code canonique.

## V34.05 — Maths P4 verrouillée

- P4 mathématiques : 19 compétences canoniques.
- Règle : 1 ligne d’évaluation = 1 compétence = 1 code canonique.
- Nouvelle fiche élève et nouvelle grille enseignant dédiées à P4.
- Alignement strict sur les codes déclarés dans `evaluations-data.js`.
- Les tâches de l’ancienne P4 non raccordées à ces codes ne sont plus utilisées dans cette évaluation verrouillée.


## V34.03 — Maths P3 verrouillée
- Période 3 : 18 compétences canoniques.
- Règle appliquée : 1 ligne d’évaluation = 1 compétence = 1 code canonique.
- Documents élève et enseignant dédiés à P3.
- Raccordement explicite aux codes NUM/FRA/CAL/OPE/PRO/TEM/GEO/DON du référentiel.

# Progressions CE2 — Ma classe au quotidien

**Version : V34.02 — Mathématiques P2 verrouillées**

Progressions CE2 est l’environnement numérique de la classe. Il regroupe les outils de pilotage enseignant et plusieurs espaces dédiés : élèves, parents, remplaçant et projection TBI.

## Espaces principaux

- **Tableau de bord enseignant** : vue élèves, suivi pédagogique, référentiel, groupes, présences et outils rapides.
- **Espace Parents** : devoirs, informations de la classe, emploi du temps et apprentissages en cours.
- **Espace Élèves** : ressources, lecture, jeux, créations, découvertes et défis des vacances.
- **Espace Remplaçant** : informations pratiques, élèves, emploi du temps et organisation de la journée.
- **Maître Hibou** : application pédagogique élève reliée aux apprentissages et au suivi de la classe.

## Architecture générale

```text
Progressions CE2
├── index.html              # Tableau de bord enseignant
├── vue-eleves.html         # Vue rapide des élèves
├── mon-suivi.html          # Suivi pédagogique
├── referentiel.html        # Référentiel / programmes
├── parents.html            # Espace Parents
├── eleves.html             # Espace Élèves
├── remplacant.html         # Espace Remplaçant
├── data/                   # Données et contenus structurés
├── assets/                 # Images, documents et ressources
├── docs/historique/        # Historique détaillé des anciennes versions
├── README.md               # Présentation du projet actuel
└── CHANGELOG.md            # Historique synthétique des évolutions
```

## Données et synchronisation

Le projet échange certaines données avec Google Sheet via Apps Script et avec Maître Hibou. Les modules conservent autant que possible un fonctionnement robuste et des solutions de repli locales lorsque cela est prévu.

## Documentation

À partir de la V34.00, les anciens fichiers README de patch et de version sont archivés dans `docs/historique/` afin de garder la racine du projet lisible.

- `README.md` décrit l’état actuel du projet.
- `CHANGELOG.md` résume les évolutions importantes.
- `docs/historique/` conserve le détail des anciennes versions sans perte d’information.

## Règle de version

Chaque nouvelle version doit mettre à jour le numéro affiché dans la balise HTML `<title>` des pages principales concernées.
