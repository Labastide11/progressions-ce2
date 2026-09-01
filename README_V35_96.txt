V35.96 — Cahier journal : affichage stable quelle que soit la largeur

Diagnostic :
- Le problème apparaissait surtout en plein écran et disparaissait en fenêtre réduite.
- La cause était le positionnement sticky du bandeau/navigation avec des hauteurs dépendantes de la largeur.

Correctif :
- Header du cahier journal non-sticky.
- Barre de navigation non-sticky.
- En-tête du tableau reste dans le flux normal.
- Espace blanc constant avant le tableau.
- Aucune superposition possible entre navigation et jours de la semaine.
- La logique du cahier journal et les données ne sont pas modifiées.
