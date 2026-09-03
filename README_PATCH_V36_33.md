# Patch V36.33 — Cahier journal lié à l’emploi du temps détaillé

Ce patch corrige la source du cahier journal.

## Principe
Le cahier journal ne possède plus sa propre structure horaire : les dates, horaires, matières et activités proviennent de la journée correspondante de l’emploi du temps détaillé.

Les données locales ou synchronisées peuvent encore enrichir un créneau existant (statut, activité, remarque), mais elles ne peuvent plus ajouter d’anciens horaires qui n’existent plus dans l’emploi du temps détaillé. Cela supprime les doublons observés après une modification d’horaire.

## Fichiers à remplacer
- `emploi-du-temps-ui.js`
- `cahier-journal.js`
- `index.html`

## Version
V36.33
