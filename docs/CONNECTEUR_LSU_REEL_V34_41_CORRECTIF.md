# V34.41 — Correctif JSONP du connecteur LSU réel

## Symptôme
`ReferenceError: root is not defined` lors de l'appel à `LSURealConnector.diagnosticStudent(...)`.

## Cause
Le callback JSONP était créé avec `root[callback]` dans la factory du module. Le paramètre `root` appartient au wrapper externe et n'est pas visible dans cette portée.

## Correction
Le callback est désormais créé et supprimé via `globalThis[callback]`.

## Sécurité
Le connecteur reste strictement en lecture seule : `student_snapshot` uniquement, aucun `POST`, aucun `save_*`.
