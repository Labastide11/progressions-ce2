# PATCH V36.36 — Cahier journal fidèle à l’emploi du temps détaillé

Correction ciblée du cahier journal.

## Principe
L’emploi du temps détaillé devient la source de vérité pour le contenu du cahier journal.

La vue **Aujourd’hui** affiche uniquement :
- **Horaire**
- **Domaine / activité**
- **Séance**
- **Statut**

La colonne « Séance » reprend le texte de **Séance détaillée** de l’emploi du temps, sans les badges, compétences, boutons ni « Guide de séance ».

Les données locales/API peuvent conserver le statut et la remarque, mais ne peuvent plus remplacer les horaires, domaines ou séances de l’emploi du temps détaillé.

## Fichiers à remplacer
- `index.html`
- `cahier-journal.js`
- `cahier-journal.css`
