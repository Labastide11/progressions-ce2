# V33.51 — Info Parents express

## Accueil Parents
- Ajout d’un bandeau défilant « ⚡ Info » entre le bandeau principal et les 4 boutons.
- Il est invisible si aucun message de dernière minute n’est publié.
- Il reprend exactement `urgentMessage`, la même donnée déjà utilisée en haut de « Infos de la classe ».
- Un clic sur le bandeau ouvre directement « Infos de la classe ».
- Animation compatible mobile, mise en pause au survol/focus et désactivée si l’appareil demande moins d’animations.

## Progressions CE2 — Organisation
- Nouveau bouton rapide « Info Parents » placé immédiatement à droite du Minuteur.
- Utilise l’icône mégaphone déjà validée.
- Fenêtre d’administration dédiée :
  - saisie jusqu’à 220 caractères
  - compteur
  - aperçu
  - Enregistrer
  - Effacer
  - Générer la mise à jour Parents

## Publication / autonomie
- Le bouton enregistre dans la même source locale que « Mettre à jour les espaces ».
- « Générer la mise à jour Parents » produit le petit ZIP avec `data/parents-infos.js`.
- Après dépôt de ce fichier sur GitHub, le site Parents reste totalement autonome : aucune API ni Google Sheet n’est exposé aux familles.

## Cohérence globale
- Aucune modification de Maître Hibou.
- `hibou-progression-map.js` est conservé à l’identique.
- Une seule donnée `urgentMessage` alimente le bandeau d’accueil et la rubrique Infos de la classe.
