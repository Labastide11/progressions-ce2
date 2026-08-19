# Progressions CE2 — Ma classe au quotidien

**Version : V34.01 — Mathématiques P1 verrouillées**

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
