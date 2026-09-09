(function(){
'use strict';

/*
  V36.57 — "Ma classe" n'est plus une popup.
  Le bouton existant de l'accueil redirige vers la vraie page ma-classe.html.
*/
document.addEventListener('click',function(event){
  const btn=event.target.closest('#openStudentListBtn');
  if(!btn)return;
  event.preventDefault();
  event.stopImmediatePropagation();
  window.location.href='ma-classe.html';
},true);
})();
