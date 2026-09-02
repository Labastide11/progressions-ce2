# PATCH V36.13 — Prochaine journée d’école

À appliquer après V36.12.

## Modification
Dans « Emploi du temps de la journée », lorsqu’il n’y a pas classe aujourd’hui (mercredi, week-end, vacances ou jour férié), le bandeau affiche désormais à droite :

**Voir la prochaine journée d’école →**

- Mercredi : recherche automatiquement le jeudi suivant.
- Week-end : recherche automatiquement le lundi suivant.
- Jour férié / vacances : recherche le prochain jour de classe réellement disponible dans les données détaillées.
- La prochaine journée s’ouvre en **vue complète** pour faciliter la préparation.
- Boutons **Matin | Après-midi | Toute la journée** disponibles.
- Bouton **← Retour à aujourd’hui** pour revenir au message du jour.

## Fichiers à remplacer
- `emploi-du-temps-ui.js`
- `index.html`
