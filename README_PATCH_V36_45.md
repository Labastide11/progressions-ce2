# PATCH V36.45 — Journée suivante dans l’emploi du temps du jour

## Fichiers
- `index.html`
- `emploi-du-temps-ui.js`
- `README_PATCH_V36_45.md`

## Modification
Dans **Emploi du temps de la journée**, ajout d’un petit bouton :

**Journée suivante →**

Le bouton passe directement à la prochaine journée de classe disponible dans l’emploi du temps détaillé.

### Comportement
- jeudi → vendredi ;
- vendredi → lundi ;
- les jours sans classe sont automatiquement sautés ;
- le mode affiché est conservé : **Journée complète**, **Matin** ou **Après-midi** ;
- le bouton n’est pas affiché lorsqu’aucune journée de classe ultérieure n’existe dans les données.

## Version
V36.44 → **V36.45**
