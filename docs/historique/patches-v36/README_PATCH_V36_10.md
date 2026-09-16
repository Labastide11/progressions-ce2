# PATCH V36.10 — Emploi du temps de la journée

Base requise : V36.09 (eau / huile).

## Modification
- Le bouton « Emploi du temps de la classe » devient « Emploi du temps de la journée ».
- Avant 12 h : ouverture automatique sur **Matin**.
- De 12 h à 17 h : ouverture automatique sur **Après-midi**.
- Après 17 h : **Journée terminée** et affichage de toute la journée, avec boutons Matin / Après-midi / Toute la journée.
- Mercredi, samedi, dimanche, vacances et jours fériés : **Pas de classe aujourd’hui**.
- En haut : « Aujourd’hui — [date] — Matin/Après-midi ».
- Les boutons **Matin | Après-midi** permettent de changer manuellement de demi-journée.
- La vue conserve le niveau de détail professionnel : compétences, séance détaillée, ressources et statut.

## Fichiers à remplacer
- `index.html`
- `emploi-du-temps-ui.js`
