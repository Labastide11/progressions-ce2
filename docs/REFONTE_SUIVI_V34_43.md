# V34.43 — Refonte du suivi des élèves

## Accueil

Les six entrées existantes sont conservées. Seul l’intitulé `Priorités et suivi pédagogique` devient `Suivi des élèves`.
Le bouton `Évaluations et bilans des élèves` reste disponible comme raccourci direct afin de ne pas casser les habitudes.

## Suivi des élèves

`mon-suivi.html` devient un hub en deux blocs :

1. **Évaluations et traces** — évaluations de référence, cahier du jour / observations, historique et sources A/B/C/D.
2. **Synthèse LSU** — accès à la nouvelle page `lsu.html`.

## Priorités pédagogiques

L’ancien contenu complet de `mon-suivi.html` est déplacé sans suppression dans `priorites-pedagogiques.html` : KPI, priorités, groupes de besoin, suivi détaillé, outils d’export et d’impression restent disponibles.

## Accompagnements et inclusions

Le modal existant est précédé de deux cartes :

1. **Priorités pédagogiques** → ouvre `priorites-pedagogiques.html`.
2. **Inclusions et accompagnements** → conserve le formulaire et les suivis existants.

## Synthèse LSU

`lsu.html` fournit une première interface réelle et strictement en lecture seule :

- choix de l’élève ;
- choix S1 / S2 ;
- sources A/B/C/D ;
- niveau suggéré par matière ;
- couverture ;
- profil solide / consolidation / priorité ;
- tendance et confiance ;
- vigilance ;
- phrase de synthèse proposée par le moteur.

Aucune écriture LSU n’est ajoutée en V34.43.
