PATCH PROGRESSIONS CE2 V33.86 — URL API V2.7.5

But : faire utiliser à Progressions CE2 le déploiement Apps Script V2.7.5 confirmé.

URL configurée :
https://script.google.com/macros/s/AKfycbwGcErZ0he06Dg_bpPDaHtPHa6fAcDQ-31tB7Rlr9w2JZcNaQnP9YIABJYf-CKpFfpF/exec

À copier à la racine du projet :
- index.html (remplacer)
- questions-eleves.js (remplacer)
- questions-eleves.css (remplacer)

La V33.86 :
- force la bonne URL dans la clé locale hibou_sync_api_url_v25754 ;
- sauvegarde l'ancienne URL sous hibou_sync_api_url_v25754_backup_v3386 avant remplacement ;
- garde le diagnostic API de la V33.85 ;
- change le cache Questions en v3386 ;
- met à jour <title> et les paramètres ?v=33.86.

Après installation : recharge Progressions puis ouvre Questions des élèves et clique sur Tester l’API.
La version détectée doit être 2.7.5 et le test classe doit être OK.
