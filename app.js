(function(){
  'use strict';
  const STORAGE_KEY='progressions_ce2_suivi_v2';
  const state={subject:'francais',period:'all',mode:'classe',classView:'skill',selectedSkill:'',selectedStudent:'',classFilter:'all'};
  const grid=document.getElementById('progressionGrid');
  const title=document.getElementById('subjectTitle');
  const subtitle=document.getElementById('subjectSubtitle');
  const icon=document.getElementById('subjectIcon');
  const routines=document.getElementById('routinesList');
  const dashboard=document.getElementById('dashboard');
  const hibouNotifBtn=document.getElementById('hibouNotifBtn');
  const hibouNotifLabel=document.getElementById('hibouNotifLabel');
  const hibouNotifBadge=document.getElementById('hibouNotifBadge');
  const hibouNotifPanel=document.getElementById('hibouNotifPanel');
  const labels=['Période 1','Période 2','Période 3','Période 4','Période 5'];
  const classes=['p1','p2','p3','p4','p5'];
  const statusLabels={afaire:'À faire',encours:'En cours',travaille:'Travaillé',reprendre:'À reprendre',stabilise:'Stabilisé'};
  const masteryLabels={none:'Non évaluée',fragile:'Fragile',encours:'En cours d’acquisition',acquise:'Acquise',maitrisee:'Très bien maîtrisée'};
  const CLASS_ROSTER_KEY='progressions_ce2_classe_v1';
  const CLASS_TRACKING_KEY='progressions_ce2_suivi_eleves_v1';
  const HIBOU_PROOFS_KEY='progressions_ce2_hibou_preuves_v1';
  const HIBOU_IGNORED_KEY='progressions_ce2_hibou_ignorees_v1';
  const HIBOU_SEEN_KEY='progressions_ce2_hibou_vues_v1';
  const HIBOU_HANDLED_KEY='progressions_ce2_hibou_traitees_v1';
  const CLASS_ROSTER_META_KEY='progressions_ce2_classe_meta_v1';
  const ELEVES_API='https://script.google.com/macros/s/AKfycbxz1vYS24sv-c3XVja12geWEXIQl6bQyBoQKBx5kg_fwQaj80_Oc7Y34yeBSRN4lF1f/exec';
  const ELEVES_SYNC_TIMEOUT=20000;
  const classLevelLabels={none:'⚪ Non évalué',renforcer:'🔴 À renforcer',encours:'🟡 En cours',acquis:'🟢 Acquis'};
  const classLevelText={none:'Non évalué',renforcer:'À renforcer',encours:'En cours',acquis:'Acquis'};
  const classLevelOrder=['none','renforcer','encours','acquis'];
  let classSaveTimer=null;
  let classRoster=loadClassRoster();
  let classRosterMeta=loadClassRosterMeta();
  let rosterSyncState=classRoster.length?'cache':'loading';
  let rosterSyncMessage=classRoster.length?`${classRoster.length} élève${classRoster.length>1?'s':''} en mémoire locale`:'Connexion à Google Sheets…';
  let classTracking=loadClassTracking();
  let hibouProofs=[];
  let hibouProofState='loading';
  let hibouIgnored=loadHibouIgnored();
  let hibouSeen=loadHibouSeen();
  let hibouHandled=loadHibouHandled();
  let hibouNotifOpen=false;
  let hibouHighlightTarget=null;
  let saved=loadSaved();
  const COLLAPSE_KEY='progressions_ce2_blocs_replies_v1';
  let collapsedDomains=loadCollapsedDomains();

  function loadHibouIgnored(){try{return JSON.parse(localStorage.getItem(HIBOU_IGNORED_KEY)||'{}')||{};}catch(e){return {};}}
  function saveHibouIgnored(){try{localStorage.setItem(HIBOU_IGNORED_KEY,JSON.stringify(hibouIgnored));}catch(e){}}
  function loadHibouSeen(){try{return JSON.parse(localStorage.getItem(HIBOU_SEEN_KEY)||'{}')||{};}catch(e){return {};}}
  function saveHibouSeen(){try{localStorage.setItem(HIBOU_SEEN_KEY,JSON.stringify(hibouSeen));}catch(e){}}
  function loadHibouHandled(){try{return JSON.parse(localStorage.getItem(HIBOU_HANDLED_KEY)||'{}')||{};}catch(e){return {};}}
  function saveHibouHandled(){try{localStorage.setItem(HIBOU_HANDLED_KEY,JSON.stringify(hibouHandled));}catch(e){}}
  function loadClassRosterMeta(){try{return JSON.parse(localStorage.getItem(CLASS_ROSTER_META_KEY)||'{}')||{};}catch(e){return {};}}
  function saveClassRosterMeta(){try{localStorage.setItem(CLASS_ROSTER_META_KEY,JSON.stringify(classRosterMeta));}catch(e){}}
  function hibouNorm(value){const api=window.HIBOU_PROGRESSION_GRAMMAR;return api&&api.normalize?api.normalize(value):String(value||'').trim().toLowerCase();}
  function hibouProofKey(student,code,proof){return [hibouNorm(student),code,hibouNorm(proof&&proof.competence),String(proof&&proof.date||'')].join('|');}
  function hibouMappingForCode(code){const api=window.HIBOU_PROGRESSION_GRAMMAR;return api&&api.byCode?api.byCode[code]:null;}
  function hibouMappingForRow(row){const api=window.HIBOU_PROGRESSION_GRAMMAR;if(!api||!api.byAlias)return null;const raw=hibouNorm(row&&row.competence);if(api.byAlias[raw])return api.byAlias[raw];for(const [alias,mapping] of Object.entries(api.byAlias)){if(raw&&alias&&(raw.includes(alias)||alias.includes(raw)))return mapping;}return null;}
  function hibouProofFor(student,code){const studentKey=hibouNorm(student);const matches=hibouProofs.filter(row=>hibouNorm(row.prenom)===studentKey&&row._codes&&row._codes.includes(code));if(!matches.length)return null;return matches.sort((a,b)=>String(b.date||'').localeCompare(String(a.date||'')))[0];}
  function hibouMedalLabel(value){const v=String(value||'').trim();return v||'Ceinture validée';}
  function rosterMetaFor(student){return classRosterMeta[hibouNorm(student)]||{};}
  function studentPortraitEmoji(student){const sexe=hibouNorm(rosterMetaFor(student).sexe||'');if(sexe.includes('f'))return '👧';if(sexe.includes('g')||sexe.includes('m')||sexe.includes('b'))return '👦';return '🧒';}
  function studentAvatarHtml(student,extraClass=''){const emoji=studentPortraitEmoji(student);const initials=String(student||'').trim().slice(0,2).toUpperCase();return '<span class="student-avatar '+extraClass+'"><span class="student-avatar__emoji" aria-hidden="true">'+emoji+'</span><span class="student-avatar__initials">'+esc(initials)+'</span></span>'; }
  function subjectFromCode(code){const prefix=String(code||'').split('-')[0];const map={OR:'francais',LEC:'francais',VOC:'francais',GRA:'francais',CONJ:'francais',ORT:'francais',ECR:'francais',NUM:'maths',CAL:'maths',GEO:'maths',MES:'maths',PROB:'maths'};return map[prefix]||state.subject||'francais';}
  function periodFromCode(code){const m=String(code||'').match(/-P([1-5])-?/i);return m?'p'+m[1]:'all';}
  function hibouNotificationItems(){
    const latest={};
    hibouProofs.forEach(row=>{
      const student=String(row.prenom||'').trim();
      const codes=Array.isArray(row._codes)?[...new Set(row._codes.filter(Boolean))]:[];
      if(!student||!codes.length)return;
      const proofKey=[hibouNorm(student),hibouNorm(row.competence),String(row.date||''),String(row.validations||''),String(row.medaille||'')].join('|');
      if(hibouHandled[proofKey])return;
      const item={student,codes,code:codes[0],proof:row,key:proofKey};
      const previous=latest[proofKey];
      if(!previous||String(row.date||'').localeCompare(String(previous.proof.date||''))>0)latest[proofKey]=item;
    });
    return Object.values(latest).sort((a,b)=>String(b.proof.date||'').localeCompare(String(a.proof.date||'')));
  }
  function markNotificationsSeen(items){(items||hibouNotificationItems()).forEach(item=>{hibouSeen[item.key]=true;});saveHibouSeen();}
  function newNotificationCount(){return hibouNotificationItems().filter(item=>!hibouSeen[item.key]).length;}
  function applyHibouSuggestion(student,codes,key){
    const linkedCodes=Array.isArray(codes)?codes:String(codes||'').split(',').filter(Boolean);
    linkedCodes.forEach(code=>{const e=classEntry(student,code);e.level='acquis';e.date=new Date().toISOString();});
    saveClassTracking();
    if(key){hibouHandled[key]='applied';saveHibouHandled();}
    markClassSaved();
    hibouNotifOpen=hibouNotificationItems().length>0&&hibouNotifOpen;
    render();
    renderHibouHeaderNotifications();
  }
  function ignoreHibouSuggestion(key){
    hibouHandled[key]='ignored';
    saveHibouHandled();
    hibouNotifOpen=hibouNotificationItems().length>0&&hibouNotifOpen;
    render();
    renderHibouHeaderNotifications();
  }
  function viewHibouSuggestion(student,code,key){
    state.mode='classe';state.classView='skill';state.subject=subjectFromCode(code);state.period=periodFromCode(code);state.selectedSkill=code;state.classFilter='all';
    hibouHighlightTarget={student,code};
    if(key){hibouSeen[key]=true;saveHibouSeen();}
    document.querySelectorAll('.mode-btn').forEach(btn=>btn.classList.toggle('is-active',btn.dataset.mode==='classe'));
    render();
    hibouNotifOpen=false;
    renderHibouHeaderNotifications();
    setTimeout(()=>{const target=[...document.querySelectorAll('[data-highlight-target]')].find(el=>el.dataset.highlightTarget===student+'|'+code);if(target)target.scrollIntoView({behavior:'smooth',block:'center'});},80);
  }
  function renderHibouHeaderNotifications(){if(!hibouNotifBtn||!hibouNotifPanel)return;const items=hibouNotificationItems();const count=items.length;const newCount=newNotificationCount();hibouNotifBtn.classList.toggle('hidden',!count);hibouNotifBtn.classList.toggle('has-new',newCount>0);if(hibouNotifLabel)hibouNotifLabel.textContent=newCount>0?(newCount+' nouvelle'+(newCount>1?'s':'')+' réussite'+(newCount>1?'s':'')):count+' réussite'+(count>1?'s':'' )+' à traiter';if(hibouNotifBadge){hibouNotifBadge.textContent=String(newCount||count);hibouNotifBadge.classList.toggle('hidden',!(newCount||count));}
    if(!count){hibouNotifPanel.classList.add('hidden');hibouNotifPanel.setAttribute('aria-hidden','true');hibouNotifOpen=false;hibouNotifBtn.setAttribute('aria-expanded','false');return;}
    const cards=items.slice(0,4).map(item=>{const detail=[hibouMedalLabel(item.proof.medaille),item.proof.validations,item.proof.date].filter(Boolean).join(' · ');return '<article class="hibou-notif-card">'+studentAvatarHtml(item.student,'student-avatar--large')+'<div class="hibou-notif-card__body"><strong>'+esc(item.student)+'</strong><span>a validé <b>'+esc(item.proof.competence)+'</b>'+(detail?' — '+esc(detail):'')+'</span></div><div class="hibou-notif-card__actions"><button type="button" class="btn btn--outline btn--compact" data-hibou-view="'+esc(item.student)+'" data-hibou-code="'+esc(item.code)+'" data-hibou-codes="'+esc(item.codes.join(','))+'" data-hibou-key="'+esc(item.key)+'">Voir la compétence</button><button type="button" class="btn btn--success btn--compact" data-hibou-apply="'+esc(item.student)+'" data-hibou-code="'+esc(item.code)+'" data-hibou-codes="'+esc(item.codes.join(','))+'" data-hibou-key="'+esc(item.key)+'">Appliquer</button><button type="button" class="btn btn--danger btn--compact" data-hibou-ignore="'+esc(item.key)+'">Ignorer</button></div></article>';}).join('');
    hibouNotifPanel.innerHTML='<div class="hibou-notif-panel__box"><div class="hibou-notif-panel__head"><strong>🦉 Nouvelles réussites Maître Hibou</strong><button type="button" class="hibou-notif-panel__close" id="hibouNotifCloseBtn">×</button></div>'+cards+(items.length>4?'<p class="hibou-notif-panel__more">'+(items.length-4)+' autre(s) réussite(s) à traiter dans la page Élèves.</p>':'')+'</div>';
    hibouNotifPanel.classList.toggle('hidden',!hibouNotifOpen);hibouNotifPanel.setAttribute('aria-hidden',hibouNotifOpen?'false':'true');hibouNotifBtn.setAttribute('aria-expanded',hibouNotifOpen?'true':'false');
    const close=document.getElementById('hibouNotifCloseBtn');if(close)close.onclick=()=>{hibouNotifOpen=false;renderHibouHeaderNotifications();};
    bindHibouActionButtons(hibouNotifPanel);
  }
  function renderHibouPriorityBlock(){const items=hibouNotificationItems();if(!items.length)return '';const rows=items.map(item=>{const detail=[hibouMedalLabel(item.proof.medaille),item.proof.validations,item.proof.date].filter(Boolean).join(' · ');return '<article class="hibou-priority-card">'+studentAvatarHtml(item.student,'student-avatar--large')+'<div class="hibou-priority-card__body"><strong>'+esc(item.student)+'</strong><span>a validé <b>'+esc(item.proof.competence)+'</b>'+(detail?' — '+esc(detail):'')+'</span></div><div class="hibou-priority-card__actions"><button type="button" class="btn btn--outline btn--compact" data-hibou-view="'+esc(item.student)+'" data-hibou-code="'+esc(item.code)+'" data-hibou-codes="'+esc(item.codes.join(','))+'" data-hibou-key="'+esc(item.key)+'">Voir la compétence</button><button type="button" class="btn btn--success btn--compact" data-hibou-apply="'+esc(item.student)+'" data-hibou-code="'+esc(item.code)+'" data-hibou-codes="'+esc(item.codes.join(','))+'" data-hibou-key="'+esc(item.key)+'">Appliquer</button><button type="button" class="btn btn--danger btn--compact" data-hibou-ignore="'+esc(item.key)+'">Ignorer</button></div></article>';}).join('');return '<section class="hibou-priority-block"><div class="hibou-priority-block__head"><strong>🦉 Nouvelles réussites Maître Hibou — '+items.length+'</strong><button type="button" class="hibou-hide-all" id="hibouHideAllBtn">Masquer tout</button></div>'+rows+'</section>'; }
  function bindHibouActionButtons(scope=document){scope.querySelectorAll('[data-hibou-view]').forEach(btn=>btn.onclick=event=>{event.preventDefault();event.stopPropagation();viewHibouSuggestion(btn.dataset.hibouView,btn.dataset.hibouCode,btn.dataset.hibouKey);});scope.querySelectorAll('[data-hibou-apply][data-hibou-code]').forEach(btn=>btn.onclick=event=>{event.preventDefault();event.stopPropagation();applyHibouSuggestion(btn.dataset.hibouApply,btn.dataset.hibouCodes||btn.dataset.hibouCode,btn.dataset.hibouKey);});scope.querySelectorAll('[data-hibou-ignore]').forEach(btn=>btn.onclick=event=>{event.preventDefault();event.stopPropagation();ignoreHibouSuggestion(btn.dataset.hibouIgnore);});const hideAll=scope.querySelector('#hibouHideAllBtn');if(hideAll)hideAll.onclick=()=>{hibouNotificationItems().forEach(item=>{hibouSeen[item.key]=true;});saveHibouSeen();renderHibouHeaderNotifications();renderClassTracking();}; }
  function hibouProofHtml(student,skill){const mapping=hibouMappingForCode(skill.code);if(!mapping)return '';if(hibouProofState==='loading')return '<div class="hibou-proof hibou-proof--loading">🦉 Recherche des réussites Maître Hibou…</div>';const proof=hibouProofFor(student,skill.code);if(!proof)return '<div class="hibou-proof hibou-proof--empty">🦉 Aucune ceinture Maître Hibou trouvée pour cette compétence.</div>';const key=hibouProofKey(student,skill.code,proof);if(hibouIgnored[key])return '<div class="hibou-proof hibou-proof--ignored">🦉 Suggestion Maître Hibou ignorée <button type="button" data-hibou-restore="'+esc(key)+'">Réafficher</button></div>';const detail=[hibouMedalLabel(proof.medaille),proof.validations,proof.date].filter(Boolean).join(' · ');return '<div class="hibou-proof">'+studentAvatarHtml(student)+'<div class="hibou-proof__content"><div><strong>🦉 Maître Hibou : ceinture validée</strong><span>'+esc(proof.competence)+(detail?' — '+esc(detail):'')+'</span></div><div class="hibou-proof__actions"><span>Suggestion : <strong>Acquis</strong></span><button type="button" class="hibou-apply" data-hibou-apply="'+esc(student)+'" data-hibou-code="'+esc(skill.code)+'" data-hibou-key="'+esc(key)+'">Appliquer</button><button type="button" class="hibou-view" data-hibou-view="'+esc(student)+'" data-hibou-code="'+esc(skill.code)+'" data-hibou-key="'+esc(key)+'">Voir</button><button type="button" class="hibou-ignore" data-hibou-ignore="'+esc(key)+'">Ignorer</button></div></div></div>';}
  async function loadHibouProofs(){hibouProofState='loading';try{const data=await elevesJsonp({action:'competences'});const rows=Array.isArray(data)?data:[];hibouProofs=rows.map(row=>{const mapping=hibouMappingForRow(row);return Object.assign({},row,{_codes:mapping?mapping.codes:[]});}).filter(row=>row._codes.length);hibouProofState='online';try{localStorage.setItem(HIBOU_PROOFS_KEY,JSON.stringify(hibouProofs));}catch(e){};}catch(error){console.warn('Chargement des réussites Maître Hibou :',error);try{hibouProofs=JSON.parse(localStorage.getItem(HIBOU_PROOFS_KEY)||'[]')||[];}catch(e){hibouProofs=[];}hibouProofState=hibouProofs.length?'cache':'error';}renderHibouHeaderNotifications();if(state.mode==='classe')renderClassTracking();}

  function loadCollapsedDomains(){try{return JSON.parse(localStorage.getItem(COLLAPSE_KEY)||'{}')||{};}catch(e){return {};}}
  function persistCollapsedDomains(){try{localStorage.setItem(COLLAPSE_KEY,JSON.stringify(collapsedDomains));}catch(e){}}
  function domainStorageKey(kind,name){return `${state.subject}|${state.period}|${state.mode}|${kind}|${name}`;}
  function domainHeader(name,count){const extra=count?` <small>${count} compétence${count>1?'s':''}</small>`:'';return `<button class="domain-toggle" type="button" aria-expanded="true"><span>${esc(name)}${extra}</span><span class="domain-toggle__icon" aria-hidden="true">▴</span></button>`;}
  function domainArticle(kind,name,classes,body){const storageKey=domainStorageKey(kind,name);const collapsed=!!collapsedDomains[storageKey];return `<article class="domain-card ${classes||''} ${collapsed?'is-collapsed':''}" data-domain-key="${esc(storageKey)}"><h3 class="domain-title">${domainHeader(name)}</h3><div class="domain-content">${body}</div></article>`;}
  function updateCollapseAllButton(){const btn=document.getElementById('collapseAllBtn');if(!btn)return;const cards=[...grid.querySelectorAll('.domain-card[data-domain-key]')];const allCollapsed=cards.length>0&&cards.every(card=>card.classList.contains('is-collapsed'));btn.textContent=allCollapsed?'▾ Tout déplier':'▴ Tout replier';btn.setAttribute('aria-pressed',String(allCollapsed));}
  function setDomainCollapsed(card,collapsed){card.classList.toggle('is-collapsed',collapsed);const toggle=card.querySelector('.domain-toggle');if(toggle){toggle.setAttribute('aria-expanded',String(!collapsed));const icon=toggle.querySelector('.domain-toggle__icon');if(icon)icon.textContent=collapsed?'▾':'▴';}collapsedDomains[card.dataset.domainKey]=collapsed;if(!collapsed)delete collapsedDomains[card.dataset.domainKey];persistCollapsedDomains();updateCollapseAllButton();}
  function bindDomainToggles(){grid.querySelectorAll('.domain-card[data-domain-key]').forEach(card=>{const collapsed=card.classList.contains('is-collapsed');const toggle=card.querySelector('.domain-toggle');if(toggle){toggle.setAttribute('aria-expanded',String(!collapsed));const icon=toggle.querySelector('.domain-toggle__icon');if(icon)icon.textContent=collapsed?'▾':'▴';toggle.addEventListener('click',()=>setDomainCollapsed(card,!card.classList.contains('is-collapsed')));}});updateCollapseAllButton();}

  function loadSaved(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')||{};}catch(e){return {};}}
  function persist(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(saved));}catch(e){alert('La sauvegarde locale est impossible dans ce navigateur.');}}
  function key(subject,rowIndex,periodIndex){return `${subject}|${rowIndex}|${periodIndex}`;}
  function skillKey(code){return `skill|${code}`;}
  function entry(subject,rowIndex,periodIndex){const k=key(subject,rowIndex,periodIndex);if(!saved[k])saved[k]={status:'afaire',steps:{present:false,practice:false,reuse:false,check:false},retention:'',note:''};return saved[k];}
  function skillEntry(code,count){const k=skillKey(code);if(!saved[k])saved[k]={status:'afaire',checks:Array(count).fill(false),evaluation1:{label:'',date:'',result:'none'},evaluation2:{label:'',date:'',result:'none'},mastery:'none',note:''};if(!Array.isArray(saved[k].checks))saved[k].checks=Array(count).fill(false);while(saved[k].checks.length<count)saved[k].checks.push(false);return saved[k];}
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function defaultRetention(domain,text){const clean=String(text||'').replace(/\s+/g,' ').trim();const first=clean.split(/(?<=[.!?])\s+/)[0].replace(/[.!]$/,'');const t={'Lecture — fluence':'Je sais lire à voix haute avec fluidité, respecter la ponctuation et mettre le ton.','Lecture — compréhension':'Je sais expliquer ce que j’ai compris et justifier mes réponses avec le texte.','Culture littéraire':'Je sais parler d’une œuvre, reconnaître son genre et faire des liens avec d’autres lectures.','Écriture — copie':'Je sais copier avec soin, respecter la présentation et me relire.','Production d’écrits':'Je sais organiser mes idées, écrire un texte cohérent puis l’améliorer.','Oral':'Je sais écouter, prendre la parole clairement et respecter les échanges.','Vocabulaire':'Je sais comprendre, classer et réutiliser des mots nouveaux.','Grammaire — phrase':'Je sais observer une phrase et utiliser les mots de la grammaire pour l’analyser.','Conjugaison':'Je sais reconnaître le temps d’un verbe et conjuguer les verbes étudiés.','Orthographe grammaticale':'Je sais raisonner pour réaliser les accords étudiés.','Orthographe lexicale — dictée':'Je sais mémoriser l’orthographe des mots et utiliser des régularités pour écrire.','Nombres entiers':'Je sais lire, écrire, comparer et décomposer les nombres étudiés.','Fractions':'Je sais représenter, nommer et comparer les fractions étudiées.','Calcul mental':'Je sais choisir une stratégie de calcul mental efficace.','Calcul posé — opérations':'Je sais poser une opération, estimer et vérifier mon résultat.','Résolution de problèmes':'Je sais comprendre un problème, choisir une représentation et expliquer ma démarche.','Longueurs — périmètres':'Je sais mesurer, choisir une unité et résoudre des problèmes de longueur ou de périmètre.','Masses — contenances':'Je sais mesurer, comparer et choisir une unité adaptée.','Monnaie — durées':'Je sais utiliser la monnaie et calculer des durées dans des situations simples.','Géométrie plane':'Je sais reconnaître, décrire et construire les figures étudiées.','Symétrie':'Je sais reconnaître un axe et compléter une figure symétrique.','Solides':'Je sais reconnaître, décrire et représenter les solides étudiés.','Données':'Je sais lire, organiser et interpréter des données dans un tableau ou un graphique.'};return t[domain]||`Je sais expliquer et utiliser ce que j’ai appris : ${first}.`;}

  function elevesJsonp(params){
    return new Promise((resolve,reject)=>{
      const callback='__mhEleves'+Date.now()+Math.random().toString(36).slice(2);
      const script=document.createElement('script');
      const timer=setTimeout(()=>finish(new Error('Délai de connexion au Google Sheet dépassé.')),ELEVES_SYNC_TIMEOUT);
      function finish(error,data){clearTimeout(timer);try{delete window[callback];}catch(e){window[callback]=undefined;}script.remove();error?reject(error):resolve(data);}
      window[callback]=data=>finish(null,data);
      const query=new URLSearchParams(Object.assign({},params,{callback}));
      script.src=ELEVES_API+'?'+query.toString();
      script.onerror=()=>finish(new Error('Connexion au Google Sheet impossible.'));
      document.head.appendChild(script);
    });
  }
  function sortRosterNames(names){
    return [...names].sort((a,b)=>String(a).localeCompare(String(b),'fr',{sensitivity:'base',ignorePunctuation:true,numeric:true}));
  }
  function normalizeRosterNames(rows){
    if(!Array.isArray(rows))return [];
    const unique=[...new Set(rows.map(item=>typeof item==='string'?item:(item&&item.prenom)||'').map(x=>String(x).trim()).filter(Boolean))];
    return sortRosterNames(unique);
  }
  async function loadRosterFromSheet(showFeedback){
    rosterSyncState='loading';
    rosterSyncMessage='Connexion à Google Sheets…';
    if(state.mode==='classe')renderClassTracking();
    try{
      const data=await elevesJsonp({action:'get_eleves'});
      const names=normalizeRosterNames(data);
      classRoster=names;
      classRosterMeta={};
      (Array.isArray(data)?data:[]).forEach(row=>{const name=String((row&&row.prenom)||'').trim();if(name)classRosterMeta[hibouNorm(name)]={prenom:name,sexe:row.sexe||'',initiale:row.initiale||'',naissance:row.naissance||''};});
      saveClassRoster();
      saveClassRosterMeta();
      rosterSyncState='online';
      rosterSyncMessage=`${names.length} élève${names.length>1?'s':''} chargé${names.length>1?'s':''} depuis Google Sheets`;
      render();
      if(showFeedback)alert(rosterSyncMessage+'.');
    }catch(error){
      console.warn('Chargement des élèves depuis le Sheet :',error);
      rosterSyncState=classRoster.length?'cache':'error';
      rosterSyncMessage=classRoster.length
        ? `Google Sheets indisponible — ${classRoster.length} élève${classRoster.length>1?'s':''} affiché${classRoster.length>1?'s':''} depuis la dernière liste enregistrée`
        : 'Impossible de charger la liste depuis Google Sheets';
      render();
      if(showFeedback)alert(rosterSyncMessage+'.');
    }
  }
  function loadClassRoster(){try{const list=JSON.parse(localStorage.getItem(CLASS_ROSTER_KEY)||'[]');return Array.isArray(list)?sortRosterNames(list):[];}catch(e){return [];}}
  function saveClassRoster(){try{localStorage.setItem(CLASS_ROSTER_KEY,JSON.stringify(classRoster));}catch(e){alert('La liste des élèves ne peut pas être enregistrée dans ce navigateur.');}}
  function loadClassTracking(){try{return JSON.parse(localStorage.getItem(CLASS_TRACKING_KEY)||'{}')||{};}catch(e){return {};}}
  function saveClassTracking(){try{localStorage.setItem(CLASS_TRACKING_KEY,JSON.stringify(classTracking));}catch(e){alert('Le suivi des élèves ne peut pas être enregistré dans ce navigateur.');}}
  function classEntry(student,code){const k=`${student}|${code}`;if(!classTracking[k])classTracking[k]={level:'none',note:'',date:''};return classTracking[k];}
  function preciseSkillsFor(subject,period){const data=window.PROGRESSIONS[subject]||{};const periods=period==='all'?['p1','p2','p3','p4','p5']:[period];const map={p1:'p1Competencies',p2:'p2Competencies',p3:'p3Competencies',p4:'p4Competencies',p5:'p5Competencies'};let result=[];periods.forEach((p,pi)=>{const list=data[map[p]]||[];if(list.length){result=result.concat(list.map(s=>Object.assign({_period:p},s)));return;}const rowPeriod=classes.indexOf(p);(data.rows||[]).forEach((row,ri)=>{const description=row[rowPeriod+1]||'';if(!description)return;result.push({code:`${subject.toUpperCase()}-${p.toUpperCase()}-${String(ri+1).padStart(2,'0')}`,domain:row[0],title:description.length>110?description.slice(0,107)+'…':description,jeSais:defaultRetention(row[0],description),proofs:[],lsu:row[0],_period:p});});});return result;}
  function selectedClassSkill(){const skills=preciseSkillsFor(state.subject,state.period);if(!skills.length)return null;if(!skills.some(s=>s.code===state.selectedSkill))state.selectedSkill=skills[0].code;return skills.find(s=>s.code===state.selectedSkill)||skills[0];}
  function classCounts(skill){const counts={none:0,renforcer:0,encours:0,acquis:0};classRoster.forEach(name=>{const e=classEntry(name,skill.code);counts[e.level]=(counts[e.level]||0)+1;});return counts;}
  function classStatsHtml(skill){const c=classCounts(skill);return `<div class="class-stats"><div class="class-stat class-stat--none"><b>${c.none}</b>Non évalués</div><div class="class-stat class-stat--renforcer"><b>${c.renforcer}</b>À renforcer</div><div class="class-stat class-stat--encours"><b>${c.encours}</b>En cours</div><div class="class-stat class-stat--acquis"><b>${c.acquis}</b>Acquis</div></div>`;}
  function masteryButtons(student,skill){const e=classEntry(student,skill.code);return `<div class="mastery-buttons">${classLevelOrder.map(level=>`<button type="button" class="mastery-btn ${e.level===level?'is-active':''}" data-student="${esc(student)}" data-level="${level}">${classLevelLabels[level]}</button>`).join('')}</div>`;}
  function classStudentRow(student,skill){const e=classEntry(student,skill.code);const highlighted=hibouHighlightTarget&&hibouHighlightTarget.student===student&&hibouHighlightTarget.code===skill.code;return `<article class="student-tracking-row ${highlighted?'is-highlighted':''}" data-highlight-target="${esc(student+'|'+skill.code)}"><div class="student-tracking-name">${studentAvatarHtml(student)}<span>${esc(student)}</span></div>${masteryButtons(student,skill)}<input class="student-note-input" data-note-student="${esc(student)}" value="${esc(e.note)}" placeholder="Remarque facultative">${hibouProofHtml(student,skill)}</article>`;}
  function classFilterControls(skill){const c=classCounts(skill);const filters=[['all','Tous',classRoster.length],...classLevelOrder.map(level=>[level,classLevelText[level],c[level]||0])];return `<section class="class-bulk-panel"><div class="class-filter-row"><strong>Filtrer :</strong><div class="class-filter-buttons">${filters.map(([value,label,count])=>`<button type="button" data-class-filter="${value}" class="${state.classFilter===value?'is-active':''}">${label} <b>${count}</b></button>`).join('')}</div></div><div class="class-bulk-row"><strong>Appliquer à toute la classe :</strong><div class="class-bulk-buttons">${classLevelOrder.map(level=>`<button type="button" data-bulk-level="${level}" class="bulk-level bulk-level--${level}">${classLevelLabels[level]}</button>`).join('')}</div><span id="classSaveStatus" class="class-save-status" aria-live="polite">✓ Modifications enregistrées</span></div></section>`;}
  function markClassSaved(){const el=document.getElementById('classSaveStatus');if(!el)return;el.textContent='Enregistrement…';el.classList.add('is-saving');clearTimeout(classSaveTimer);classSaveTimer=setTimeout(()=>{const current=document.getElementById('classSaveStatus');if(current){current.textContent='✓ Modifications enregistrées';current.classList.remove('is-saving');}},450);}
  function rosterStatusHtml(){return `<div class="roster-sync roster-sync--${rosterSyncState}" role="status"><span class="roster-sync__dot" aria-hidden="true"></span><span>${esc(rosterSyncMessage)}</span></div>`;}
  function renderClassTracking(){const skills=preciseSkillsFor(state.subject,state.period);dashboard.classList.add('hidden');grid.classList.remove('is-followup');if(!classRoster.length){grid.innerHTML=`<section class="class-empty">${rosterStatusHtml()}<strong>👥 Aucun élève disponible</strong><p>La liste est lue automatiquement dans l’onglet <code>eleves</code> de ton Google Sheet. Vérifie que les prénoms sont renseignés et que la colonne <code>actif</code> contient « oui ».</p><button class="btn btn--hibou" id="refreshRosterEmptyBtn" type="button" ${rosterSyncState==='loading'?'disabled':''}>${rosterSyncState==='loading'?'⏳ Connexion…':'🔄 Actualiser la classe'}</button></section>`;const refresh=document.getElementById('refreshRosterEmptyBtn');if(refresh)refresh.onclick=()=>loadRosterFromSheet(true);return;}if(!skills.length){grid.innerHTML=`<section class="class-empty">${rosterStatusHtml()}<strong>Aucune compétence disponible</strong><p>Choisis une autre matière ou une autre période.</p><button class="btn btn--light" id="refreshRosterEmptyBtn" type="button">🔄 Actualiser la classe</button></section>`;document.getElementById('refreshRosterEmptyBtn').onclick=()=>loadRosterFromSheet(true);return;}const skill=selectedClassSkill();const optionsHtml=skills.map(s=>`<option value="${esc(s.code)}" ${s.code===skill.code?'selected':''}>${esc(s.domain)} — ${esc(s.title)}</option>`).join('');grid.innerHTML=`<section class="class-tracking">${rosterStatusHtml()}<div class="class-toolbar card"><label><span>Compétence sélectionnée</span><select id="classSkillSelect">${optionsHtml}</select></label><label><span>Vue du suivi</span><div class="class-view-switch"><button type="button" data-class-view="skill" class="${state.classView==='skill'?'is-active':''}">Par compétence</button><button type="button" data-class-view="student" class="${state.classView==='student'?'is-active':''}">Par élève</button></div></label><div class="class-toolbar__actions"><button class="btn btn--light" id="refreshRosterBtn" type="button" ${rosterSyncState==='loading'?'disabled':''}>${rosterSyncState==='loading'?'⏳ Connexion…':'🔄 Actualiser la classe'}</button><button class="btn btn--outline" id="exportClassBtn" type="button">⬇ Export CSV</button></div></div>${state.classView==='skill'?renderBySkill(skill):renderByStudent(skills)}</section>`;bindClassTrackingEvents(skills);}
  function renderBySkill(skill){const visible=state.classFilter==='all'?classRoster:classRoster.filter(name=>classEntry(name,skill.code).level===state.classFilter);const empty=visible.length?'':`<div class="class-filter-empty">Aucun élève dans ce filtre.</div>`;return `${renderHibouPriorityBlock()}<section class="class-skill-summary"><strong>${esc(skill.code)} — ${esc(skill.title)}</strong><p>${esc(skill.jeSais||'')}</p><small>${esc(skill.domain)} · ${esc(labels[classes.indexOf(skill._period)]||skill._period)}${skill.lsu?' · Référence LSU : '+esc(skill.lsu):''}</small></section>${classStatsHtml(skill)}${classFilterControls(skill)}<section class="student-tracking-list">${visible.map(name=>classStudentRow(name,skill)).join('')}${empty}</section>`;}
  function renderByStudent(skills){if(!state.selectedStudent||!classRoster.includes(state.selectedStudent))state.selectedStudent=classRoster[0];const student=state.selectedStudent;const rows=skills.map(skill=>{const e=classEntry(student,skill.code);return `<div class="student-skill-row"><span class="skill-code">${esc(skill.code)}</span><span><strong>${esc(skill.title)}</strong><br><small>${esc(skill.domain)}</small></span><span class="level-pill level-pill--${e.level}">${classLevelLabels[e.level]}</span></div>`;}).join('');return `<section class="class-toolbar card"><label><span>Élève</span><select id="classStudentSelect">${classRoster.map(n=>`<option value="${esc(n)}" ${n===student?'selected':''}>${esc(n)}</option>`).join('')}</select></label><div></div><div></div></section><section class="student-overview"><article class="student-overview-card"><div class="student-overview-head"><strong>👤 ${esc(student)}</strong><span>${skills.length} compétence${skills.length>1?'s':''} affichée${skills.length>1?'s':''}</span></div><div class="student-skill-list">${rows}</div></article></section>`;}
  function bindClassTrackingEvents(skills){const skillSelect=document.getElementById('classSkillSelect');if(skillSelect)skillSelect.onchange=()=>{state.selectedSkill=skillSelect.value;state.classFilter='all';renderClassTracking();};const studentSelect=document.getElementById('classStudentSelect');if(studentSelect)studentSelect.onchange=()=>{state.selectedStudent=studentSelect.value;renderClassTracking();};document.querySelectorAll('[data-class-view]').forEach(btn=>btn.onclick=()=>{state.classView=btn.dataset.classView;renderClassTracking();});const refresh=document.getElementById('refreshRosterBtn');if(refresh)refresh.onclick=()=>loadRosterFromSheet(true);const exp=document.getElementById('exportClassBtn');if(exp)exp.onclick=exportClassCsv;document.querySelectorAll('[data-class-filter]').forEach(btn=>btn.onclick=()=>{state.classFilter=btn.dataset.classFilter;renderClassTracking();});document.querySelectorAll('[data-bulk-level]').forEach(btn=>btn.onclick=()=>{const skill=selectedClassSkill();const level=btn.dataset.bulkLevel;const count=classRoster.length;const message=`Appliquer « ${classLevelText[level]} » aux ${count} élève${count>1?'s':''} ?\n\nCette action remplacera les niveaux déjà renseignés pour cette compétence.`;if(!window.confirm(message))return;const now=new Date().toISOString();classRoster.forEach(student=>{const e=classEntry(student,skill.code);e.level=level;e.date=now;});saveClassTracking();renderClassTracking();markClassSaved();});document.querySelectorAll('.mastery-btn').forEach(btn=>btn.onclick=()=>{const skill=selectedClassSkill();const e=classEntry(btn.dataset.student,skill.code);e.level=btn.dataset.level;e.date=new Date().toISOString();saveClassTracking();renderClassTracking();markClassSaved();});document.querySelectorAll('[data-note-student]').forEach(input=>{input.oninput=()=>{const skill=selectedClassSkill();const e=classEntry(input.dataset.noteStudent,skill.code);e.note=input.value;e.date=new Date().toISOString();saveClassTracking();markClassSaved();};});bindHibouActionButtons(document);document.querySelectorAll('[data-hibou-restore]').forEach(btn=>btn.onclick=()=>{delete hibouIgnored[btn.dataset.hibouRestore];saveHibouIgnored();renderClassTracking();});}
  function exportClassCsv(){const skills=preciseSkillsFor(state.subject,state.period);const rows=[['Élève','Code','Matière','Période','Domaine','Compétence','Niveau','Remarque','Date']];classRoster.forEach(student=>skills.forEach(skill=>{const e=classEntry(student,skill.code);rows.push([student,skill.code,window.PROGRESSIONS[state.subject].title,labels[classes.indexOf(skill._period)]||skill._period,skill.domain,skill.title,classLevelLabels[e.level],e.note,e.date]);}));const csv=rows.map(r=>r.map(v=>'"'+String(v||'').replace(/"/g,'""')+'"').join(';')).join('\n');const blob=new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`suivi_classe_${state.subject}_${state.period}.csv`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),0);}

  function currentSkills(){if(state.mode!=='suivi')return null;const data=window.PROGRESSIONS[state.subject];const map={p1:'p1Competencies',p2:'p2Competencies',p3:'p3Competencies',p4:'p4Competencies',p5:'p5Competencies'};const key=map[state.period];return key?(data[key]||[]):null;}
  function render(){renderHibouHeaderNotifications();const data=window.PROGRESSIONS[state.subject];title.textContent=data.title;subtitle.textContent=data.subtitle;icon.textContent=data.icon;document.getElementById('currentPeriodLabel').textContent=state.period==='all'?'Vue annuelle':labels[classes.indexOf(state.period)];document.getElementById('currentModeLabel').textContent=state.mode==='suivi'?'Mon suivi':(state.mode==='reference'?'Référentiel':'Suivi des élèves');document.getElementById('compactSubject').textContent=data.title;document.getElementById('compactPeriod').textContent=state.period==='all'?'Vue annuelle':labels[classes.indexOf(state.period)];showCategory(subjectCategory(state.subject));routines.innerHTML=data.routines.map(x=>`<li>${esc(x)}</li>`).join('');dashboard.classList.toggle('hidden',state.mode!=='suivi');grid.classList.toggle('is-followup',state.mode==='suivi');if(state.mode==='classe')renderClassTracking();else if(state.mode==='reference')renderReference(data);else if(state.subject==='parcours')renderFollowup(data);else{const skills=currentSkills();if(skills)renderSkills(skills);else renderFollowup(data);}updateDashboard();}
  function renderReference(data){grid.innerHTML=data.rows.map(row=>{if(state.period==='all'){const body=`<div class="annual-grid">${row.slice(1).map((text,i)=>`<section class="period-cell ${classes[i]}"><h4>${labels[i]}</h4><p>${esc(text)}</p></section>`).join('')}</div>`;return domainArticle('reference',row[0],'',body);}const i=classes.indexOf(state.period);return domainArticle('reference',row[0],'',`<div class="single-period ${state.period}">${esc(row[i+1])}</div>`);}).join('');bindDomainToggles();}
  function renderFollowup(data){const ps=state.period==='all'?[0,1,2,3,4]:[classes.indexOf(state.period)];grid.innerHTML=data.rows.map((row,ri)=>domainArticle('followup',row[0],'followup-domain',`<div class="followup-periods ${state.period==='all'?'all':''}">${ps.map(pi=>followupCard(row,ri,pi)).join('')}</div>`)).join('');bindFollowupEvents();bindDomainToggles();}
  function followupCard(row,ri,pi){const e=entry(state.subject,ri,pi);const isParcours=state.subject==='parcours';const retention=e.retention||(isParcours?'Projet ou action :\nMatières / partenaires :\nTrace LSU :':defaultRetention(row[0],row[pi+1]));const checklist=isParcours?`${step('present','Projet ou action défini',e.steps.present)}${step('practice','Matières, partenaires ou ressources renseignés',e.steps.practice)}${step('reuse','Action réellement menée',e.steps.reuse)}${step('check','Trace LSU rédigée',e.steps.check)}`:`${step('present','Notion présentée',e.steps.present)}${step('practice','Entraînement réalisé',e.steps.practice)}${step('reuse','Réinvestissement prévu ou réalisé',e.steps.reuse)}${step('check','Vérification ou observation réalisée',e.steps.check)}`;const retentionTitle=isParcours?'📘 Mémoire du projet et trace LSU':'🦉 Je sais / J’ai retenu';const notePlaceholder=isParcours?'Dates, production, sortie, rencontre, bilan…':'Adaptation, difficulté, reprise, projet…';return `<section class="followup-card ${classes[pi]}" data-key="${key(state.subject,ri,pi)}"><div class="followup-head"><span>${labels[pi]}</span><select class="status-select status-${e.status}">${options(statusLabels,e.status)}</select></div><p class="planned"><strong>Cadre proposé</strong>${esc(row[pi+1])}</p><fieldset class="checklist"><legend>Ma checklist</legend>${checklist}</fieldset><label class="retention"><span>${retentionTitle}</span><textarea data-field="retention" rows="4">${esc(retention)}</textarea></label><label class="teacher-note"><span>📝 Ma note</span><textarea data-field="note" rows="2" placeholder="${notePlaceholder}">${esc(e.note)}</textarea></label></section>`;}
  function options(obj,current){return Object.entries(obj).map(([v,l])=>`<option value="${v}" ${current===v?'selected':''}>${l}</option>`).join('');}
  function step(n,l,c){return `<label class="check-row"><input type="checkbox" data-step="${n}" ${c?'checked':''}><span>${l}</span></label>`;}

  function renderSkills(skills){const groups={};skills.forEach(s=>(groups[s.domain]||(groups[s.domain]=[])).push(s));const periodLabel=`période ${classes.indexOf(state.period)+1}`;grid.innerHTML=`<section class="skill-intro card"><strong>${esc(window.PROGRESSIONS[state.subject].title)} — ${periodLabel} : ${skills.length} compétences précises</strong><span>La checklist guide le travail. Une ou deux évaluations seulement sont retenues comme preuves. Le bilan alimente la synthèse LSU.</span></section>`+Object.entries(groups).map(([domain,list])=>domainArticle('skills',domain,'skill-domain',`<div class="skill-grid">${list.map(skillCard).join('')}</div>`)).join('');bindSkillEvents();bindDomainToggles();}
  function skillCard(s){const e=skillEntry(s.code,s.checklist.length);return `<details class="skill-card" data-code="${esc(s.code)}" open><summary><span class="skill-code">${esc(s.code)}</span><span class="skill-title">${esc(s.title)}</span><span class="skill-state status-${e.status}">${esc(statusLabels[e.status])}</span></summary><div class="skill-body"><div class="skill-top"><label><span>Suivi de l’enseignement</span><select data-skill-field="status" class="status-select status-${e.status}">${options(statusLabels,e.status)}</select></label><label><span>Bilan de la compétence</span><select data-skill-field="mastery" class="mastery-select mastery-${e.mastery}">${options(masteryLabels,e.mastery)}</select></label></div><blockquote class="je-sais"><strong>🦉 Je sais</strong>${esc(s.jeSais)}</blockquote><fieldset class="checklist skill-checklist"><legend>Checklist pédagogique</legend>${s.checklist.map((x,i)=>`<label class="check-row"><input type="checkbox" data-check-index="${i}" ${e.checks[i]?'checked':''}><span>${esc(x)}</span></label>`).join('')}</fieldset><div class="proofs"><strong>Preuves possibles</strong><ul>${s.proofs.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div><div class="evaluations"><h4>Évaluations retenues — une ou deux maximum</h4>${evaluationRow(1,e.evaluation1,s.proofs[0])}${evaluationRow(2,e.evaluation2,s.proofs[1])}</div><div class="lsu-box"><strong>Regroupement LSU</strong><span>${esc(s.lsu)}</span></div><label class="teacher-note"><span>📝 Ma note</span><textarea data-skill-field="note" rows="2" placeholder="Adaptation, difficulté, reprise…">${esc(e.note)}</textarea></label></div></details>`;}
  function evaluationRow(n,e,placeholder){return `<div class="evaluation-row"><label><span>Évaluation ${n}${n===2?' (facultative)':''}</span><input type="text" data-eval="${n}" data-eval-field="label" value="${esc(e.label)}" placeholder="${esc(placeholder||'Situation retenue')}"></label><label><span>Date</span><input type="date" data-eval="${n}" data-eval-field="date" value="${esc(e.date)}"></label><label><span>Résultat</span><select data-eval="${n}" data-eval-field="result">${options(masteryLabels,e.result||'none')}</select></label></div>`;}

  function bindFollowupEvents(){grid.querySelectorAll('.followup-card').forEach(card=>{const e=saved[card.dataset.key];const select=card.querySelector('.status-select');select.addEventListener('change',()=>{e.status=select.value;select.className=`status-select status-${e.status}`;persist();updateDashboard();});card.querySelectorAll('[data-step]').forEach(i=>i.addEventListener('change',()=>{e.steps[i.dataset.step]=i.checked;persist();updateDashboard();}));card.querySelectorAll('[data-field]').forEach(a=>a.addEventListener('input',()=>{e[a.dataset.field]=a.value;persist();}));});}
  function bindSkillEvents(){grid.querySelectorAll('.skill-card').forEach(card=>{const code=card.dataset.code;const skill=(currentSkills()||[]).find(x=>x.code===code);const e=skillEntry(code,skill.checklist.length);card.querySelectorAll('[data-check-index]').forEach(i=>i.addEventListener('change',()=>{e.checks[Number(i.dataset.checkIndex)]=i.checked;persist();updateDashboard();}));card.querySelectorAll('[data-skill-field]').forEach(el=>{const evt=el.tagName==='TEXTAREA'?'input':'change';el.addEventListener(evt,()=>{e[el.dataset.skillField]=el.value;if(el.dataset.skillField==='status'){el.className=`status-select status-${e.status}`;card.querySelector('.skill-state').className=`skill-state status-${e.status}`;card.querySelector('.skill-state').textContent=statusLabels[e.status];}if(el.dataset.skillField==='mastery')el.className=`mastery-select mastery-${e.mastery}`;persist();updateDashboard();});});card.querySelectorAll('[data-eval]').forEach(el=>{const evt=el.tagName==='INPUT'?'input':'change';el.addEventListener(evt,()=>{const target=Number(el.dataset.eval)===1?e.evaluation1:e.evaluation2;target[el.dataset.evalField]=el.value;persist();});});});}
  function visibleKeys(){const skills=currentSkills();if(skills)return skills.map(s=>skillKey(s.code));const data=window.PROGRESSIONS[state.subject],ps=state.period==='all'?[0,1,2,3,4]:[classes.indexOf(state.period)],keys=[];data.rows.forEach((_,ri)=>ps.forEach(pi=>keys.push(key(state.subject,ri,pi))));return keys;}
  function updateDashboard(){if(state.mode!=='suivi')return;const counts={afaire:0,encours:0,travaille:0,reprendre:0,stabilise:0};const keys=visibleKeys();keys.forEach(k=>{const e=saved[k]||{status:'afaire'};counts[e.status]=(counts[e.status]||0)+1;});const done=counts.travaille+counts.stabilise;const percent=keys.length?Math.round(done/keys.length*100):0;document.getElementById('progressPercent').textContent=percent+' %';document.getElementById('progressBar').style.width=percent+'%';document.getElementById('stats').innerHTML=Object.entries(statusLabels).map(([k,l])=>`<div class="stat stat-${k}"><strong>${counts[k]||0}</strong><span>${l}</span></div>`).join('');}

  function subjectCategory(subject){
    const map={francais:'fondamentaux',maths:'fondamentaux',histoire:'monde',geographie:'monde',sciences:'monde',anglais:'anglais',arts:'anglais',eps:'anglais',emc:'citoyennete',evar:'citoyennete',parcours:'citoyennete',emi:'emi'};
    return map[subject]||'fondamentaux';
  }

  function showCategory(category){
    document.querySelectorAll('.category-tab').forEach(b=>b.classList.toggle('is-active',b.dataset.category===category));
    document.querySelectorAll('.family-group').forEach(g=>g.classList.toggle('is-active',g.dataset.category===category));
    document.querySelectorAll('.subject-tabs--secondary .tab').forEach(b=>b.classList.toggle('is-hidden',b.dataset.category!==category));
    const secondary=document.querySelector('.subject-tabs--secondary');
    if(secondary) secondary.classList.toggle('is-empty',category==='fondamentaux');
  }
  document.querySelectorAll('.category-tab').forEach(btn=>btn.addEventListener('click',()=>{
    const category=btn.dataset.category;
    showCategory(category);
    const first=document.querySelector(`.subject-tabs--secondary .tab[data-category="${category}"]`);
    if(first && !document.querySelector(`.subject-tabs .tab[data-category="${category}"].is-active`)){
      document.querySelectorAll('.tab').forEach(b=>b.classList.remove('is-active'));
      first.classList.add('is-active');
      state.subject=first.dataset.subject;
      render();
    }
  }));
  const filtersPanel=document.getElementById('filtersPanel');
  const toggleFiltersBtn=document.getElementById('toggleFiltersBtn');
  let filtersPinned=false;

  function setFiltersOpen(open){
    filtersPanel.classList.toggle('is-collapsed',!open);
    filtersPanel.setAttribute('aria-hidden',String(!open));
    toggleFiltersBtn.setAttribute('aria-expanded',String(open));
    toggleFiltersBtn.textContent=open?'✕ Fermer':'☰ Filtres';
  }

  toggleFiltersBtn.addEventListener('click',()=>{
    const open=filtersPanel.classList.contains('is-collapsed');
    filtersPinned=open;
    setFiltersOpen(open);
  });

  if(window.matchMedia('(hover:hover) and (pointer:fine)').matches){
    const hoverZone=document.querySelector('.compact-controlbar');
    hoverZone.addEventListener('mouseenter',()=>{if(!filtersPinned)setFiltersOpen(true);});
    filtersPanel.addEventListener('mouseleave',()=>{if(!filtersPinned)setFiltersOpen(false);});
  }

  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&!filtersPanel.classList.contains('is-collapsed')){
      filtersPinned=false;
      setFiltersOpen(false);
      toggleFiltersBtn.focus();
    }
  });

  document.querySelectorAll('.mode-btn').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.mode-btn').forEach(b=>b.classList.remove('is-active'));btn.classList.add('is-active');state.mode=btn.dataset.mode;render();}));
  document.querySelectorAll('.tab').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.tab').forEach(b=>b.classList.remove('is-active'));btn.classList.add('is-active');state.subject=btn.dataset.subject;showCategory(subjectCategory(state.subject));render();if(!filtersPinned)setFiltersOpen(false);}));
  document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.classList.remove('is-active'));btn.classList.add('is-active');state.period=btn.dataset.period;render();if(!filtersPinned)setFiltersOpen(false);}));
  showCategory(subjectCategory(state.subject));
  document.getElementById('collapseAllBtn').addEventListener('click',()=>{const cards=[...grid.querySelectorAll('.domain-card[data-domain-key]')];const shouldCollapse=!cards.every(card=>card.classList.contains('is-collapsed'));cards.forEach(card=>setDomainCollapsed(card,shouldCollapse));updateCollapseAllButton();});
  document.getElementById('printBtn').addEventListener('click',()=>window.print());
  document.getElementById('exportBtn').addEventListener('click',()=>{const blob=new Blob([JSON.stringify({version:5,exportedAt:new Date().toISOString(),data:saved},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='sauvegarde_progressions_ce2.json';a.click();URL.revokeObjectURL(a.href);});
  document.getElementById('importInput').addEventListener('change',event=>{const file=event.target.files[0];if(!file)return;const r=new FileReader();r.onload=()=>{try{const p=JSON.parse(r.result);saved=p.data||p;persist();render();alert('Sauvegarde importée.');}catch(e){alert('Ce fichier de sauvegarde n’est pas valide.');}};r.readAsText(file);event.target.value='';});
  document.getElementById('resetBtn').addEventListener('click',()=>{if(!confirm('Réinitialiser uniquement la matière et la période actuellement affichées ?'))return;visibleKeys().forEach(k=>delete saved[k]);persist();render();});
  if(hibouNotifBtn)hibouNotifBtn.addEventListener('click',()=>{hibouNotifOpen=!hibouNotifOpen;if(hibouNotifOpen)markNotificationsSeen();renderHibouHeaderNotifications();});
  render();
  loadRosterFromSheet(false);
  loadHibouProofs();
})();
