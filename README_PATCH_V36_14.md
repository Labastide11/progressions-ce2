# PATCH V36.14 — Récréations matin et après-midi

À appliquer après **V36.13**.

## Fichiers à remplacer
- `emploi-du-temps-ui.js`
- `index.html`

## Correction
- Affiche systématiquement les deux récréations : **10h45–11h** et **15h45–16h**.
- Uniformise leur intitulé en **« Récréation »**.
- Supprime pour ces créneaux tout habillage pédagogique inutile : badge **« Entraînement »**, texte **« Récréation de l’après-midi »** et badge **« Pause »**.
- Applique la règle aux vues détaillées et à **Emploi du temps de la journée**, de la rentrée à P5.
- Les récréations restent des créneaux simples, sans compétence ni suivi pédagogique.

Version d’interface : **V36.14**.
