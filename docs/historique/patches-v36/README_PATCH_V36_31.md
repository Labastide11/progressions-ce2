# PATCH V36.31 — Emploi du temps de la journée

Base : V36.30.

## Correction
- Le bouton **Emploi du temps de la journée** n’ouvre plus une semaine complète.
- Une seule journée de classe est affichée.
- Trois vues sont disponibles : **Journée complète**, **Matin**, **Après-midi**.
- À l’ouverture, la journée de classe du jour est sélectionnée automatiquement.
- S’il n’y a pas classe aujourd’hui (mercredi, week-end, vacances, jour férié), la **prochaine journée de classe réellement présente dans les données détaillées** est ouverte automatiquement. Ainsi, le dimanche, l’ouverture se fait directement sur le lundi suivant.
- Les onglets RENTRÉE / P1 / P2 / P3 / P4 / P5 et la barre S1…S7 sont masqués dans cette vue.
- Le détail professionnel de la séance, les compétences, ressources et statuts sont conservés.
- Le reste de l’emploi du temps V36.30 est inchangé.

## Fichiers modifiés
- `index.html`
- `emploi-du-temps-ui.js`
- `emploi-du-temps.css`

Version : V36.30 → V36.31
