V34.80 — CONSOLIDATION SANS CHANGEMENT FONCTIONNEL

- 30 anciennes notes README_PATCH_V34_*.txt déplacées de la racine vers docs/historique/patches-v34/.
- La note V34.80 est elle aussi conservée directement dans ce dossier historique.
- CHANGELOG_V34_17_NOUVEAU.md déplacé vers docs/historique/.
- Les 6 tests LSU sont regroupés dans tools/tests/ ; leurs chemins relatifs ont été adaptés pour qu'ils restent exécutables.
- Le test V34.42 a été réaligné sur la version actuelle 1.0.3 du connecteur LSU (il était déjà obsolète en V34.79).
- assets/home-v32-31 et assets/home-v32-32 : 23 fichiers strictement identiques, mêmes SHA-256, aucun chemin référencé dans le code HTML/JS/CSS actif. Une copie historique est conservée dans docs/historique/assets/home-v32-31/ et le doublon est supprimé.
- Balises <title> des pages principales mises à jour en V34.80.
- Aucun JavaScript/CSS de production modifié. Aucun changement d'API, de données, d'interface ou de comportement.

Contrôles réalisés :
- 0 erreur de syntaxe JavaScript ;
- 6/6 tests LSU exécutables et réussis ;
- 0 référence locale HTML cassée ;
- 0 modification des JS/CSS de production par rapport à V34.79.
