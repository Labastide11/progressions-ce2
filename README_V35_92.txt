V35.92 — Cahier journal : correction du rognage des jours

Cause identifiée :
- la police manuscrite possède des lettres hautes ; avec line-height: 1, le haut des glyphes était rogné.

Correctif :
- hauteur de ligne portée à 1.35 ;
- ajout d'un léger padding vertical ;
- conservation de « JOUR + date » sur une seule ligne ;
- aucune modification de la logique du cahier journal.
