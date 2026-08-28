(function(){
'use strict';
const $=id=>document.getElementById(id);
function openManager(){
  const api=window.ProgressionsParentsPublication;
  if(api&&typeof api.openFullParentsPanel==='function') api.openFullParentsPanel();
}
function addQuickButton(){
  const timer=$('timerQuickBtn');
  if(!timer||$('parentFlashQuickBtn'))return;
  const b=document.createElement('button');
  b.id='parentFlashQuickBtn';
  b.type='button';
  b.className='home-panel__deco-btn quick-label-btn parent-flash-quick-btn';
  b.dataset.label='Info Parents';
  b.setAttribute('aria-label','Gérer les informations Parents');
  b.innerHTML='<span class="quick-label-btn__icon"><img src="assets/parents/icon_info_parents.png" alt=""></span>';
  timer.insertAdjacentElement('afterend',b);
  b.onclick=openManager;
}
function init(){addQuickButton()}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();
})();
