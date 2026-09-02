# PATCH V36.28 — Notifications synchronisées avec « Ma classe »

Correction de la fenêtre **Notifications / Informations à consulter**.

## Anniversaires
La rubrique utilise désormais la même liste active que **Ma classe** via `ProgressionsRoster`.
Elle accepte plusieurs noms de champs de date de naissance et affiche :
**Prénom — le jour, âge ans**

Exemple :
- Ritej — le 12, 9 ans
- Khadidja — le 17, 8 ans

## Nouvelles réussites
Les réussites Maître Hibou sont désormais filtrées sur les élèves actuellement présents
dans la liste active de la classe.

Les anciennes réussites d'élèves qui ne font plus partie de la classe ne sont donc plus
affichées dans les notifications.

Fichiers à remplacer :
- `index.html`
- `pense-bete.js`

Version : V36.27 → V36.28
