# V33.53 — correction structurelle du débordement mobile

Diagnostic :
Le bandeau Info utilisait un texte `white-space: nowrap` dans un élément placé dans
le dashboard, lui-même enfant d'une grille CSS. Le contenu défilant pouvait donc
augmenter la largeur minimale (`min-content`) du dashboard et provoquer le
débordement de toute la page. La V33.52 limitait le bandeau lui-même, mais pas la
largeur minimale de ses parents.

Correction V33.53 :
- `min-width:0` sur tous les niveaux de grille/flex concernés ;
- dashboard et grille rapide forcés à 100 % de leur conteneur ;
- bandeau converti en grille `auto minmax(0,1fr)` ;
- viewport du texte défilant réellement compressible ;
- suppression des anciens calculs de largeur du viewport du ticker ;
- `box-sizing:border-box` global ;
- garde-fou `overflow-x:hidden` sur la page ;
- les 4 cartes restent en deux colonnes et leurs grandes icônes sont conservées.

Aucune modification de Maître Hibou ni des données pédagogiques.
