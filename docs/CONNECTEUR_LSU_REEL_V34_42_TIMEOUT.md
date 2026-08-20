# V34.42 — Robustesse JSONP du connecteur LSU réel

## Problème observé
Apps Script peut répondre après plus de 20 secondes. En V34.41, le timeout supprimait immédiatement le callback JSONP. Si la réponse arrivait ensuite, le navigateur exécutait encore le script reçu et levait `ReferenceError: progressionsLSU_... is not defined`.

## Correction
- timeout par défaut : 60 s ;
- en cas de timeout : callback remplacé par une fonction neutre pendant 120 s ;
- nettoyage différé ensuite ;
- aucune modification des données ;
- alias public `getStudentSnapshot()` pour faciliter les tests.

## Test manuel
```js
window.snapAdam = await LSURealConnector.getStudentSnapshot('Adam');
console.table(window.snapAdam.snapshot.reussites.slice(0, 15));
```
