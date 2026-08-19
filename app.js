(function(){
  'use strict';
  const STORAGE_KEY='progressions_ce2_suivi_v2';
  const PAGE_KIND=document.body?.dataset?.page||'home';
  const INITIAL_MODE=PAGE_KIND==='suivi'?'suivi':(PAGE_KIND==='reference'?'reference':'classe');
  const state={subject:'francais',period:'all',mode:INITIAL_MODE,classView:'skill',selectedSkill:'',selectedStudent:'',classFilter:'all',rosterSort:'recent',rosterQuickFilter:'all',rosterSearch:''};
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
  const CLASS_TRACES_KEY='progressions_ce2_traces_competences_v1';
  const ACTIVE_EVALUATION_KEY='progressions_ce2_active_evaluation_v1';
  const HIBOU_PROOFS_KEY='progressions_ce2_hibou_preuves_v1';
  const HIBOU_RECENT_KEY='progressions_ce2_hibou_reussites_v1';
  const HIBOU_IGNORED_KEY='progressions_ce2_hibou_ignorees_v1';
  const HIBOU_SEEN_KEY='progressions_ce2_hibou_vues_v1';
  const HIBOU_HANDLED_KEY='progressions_ce2_hibou_traitees_v1';
  const CLASS_ROSTER_META_KEY='progressions_ce2_classe_meta_v1';
  const SYNC_API_URL_KEY='hibou_sync_api_url_v25754';
  const SYNC_DEVICE_KEY='hibou_sync_device_key_v25754';
  const PROGRESSIONS_LAST_ROSTER_KEY='progressions_ce2_sync_last_roster_v3279';
  const ELEVES_SYNC_TIMEOUT=20000;
  const ROSTER_MAX_AGE_MS=6*60*60*1000;
  const classLevelLabels={none:'⚪ Non évalué',renforcer:'🔴 À renforcer',encours:'🟡 En cours',acquis:'🟢 Acquis',depasse:'🔵 Très bien maîtrisé'};
  const classLevelText={none:'Non évalué',renforcer:'À renforcer',encours:'En cours',acquis:'Acquis',depasse:'Très bien maîtrisé'};
  const classLevelOrder=['none','renforcer','encours','acquis','depasse'];
  const evaluationStudentLabels={none:'Non évalué',renforcer:'À revoir',encours:'En progrès',acquis:'Réussi',depasse:'Excellent'};
  const lsuLevelLabels={renforcer:'Non atteint',encours:'Partiellement atteint',acquis:'Atteint',depasse:'Dépassé'};
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
  function rosterMetaFor(student){
    const key=hibouNorm(student);
    const source=window.ENSEIGNANT_ELEVES_META||{};
    let fallback=source[key]||{};
    if(!fallback.prenom){
      fallback=Object.values(source).find(row=>row&&hibouNorm(row.prenom)===key)||{};
    }
    const live=classRosterMeta[key]||{};
    const pick=(a,b)=>{if(a===false||a===0)return a;if(a!==undefined&&a!==null&&String(a).trim()!=='')return a;return b;};
    return {
      prenom:pick(live.prenom,fallback.prenom||student),
      nom:pick(live.nom,fallback.nom||''),
      initiale:pick(live.initiale,fallback.initiale||''),
      sexe:pick(live.sexe,fallback.sexe||''),
      naissance:pick(live.naissance,fallback.naissance||''),
      cham:pick(live.cham,fallback.cham??'')
    };
  }
  function studentPortraitPath(student){const sexe=hibouNorm(rosterMetaFor(student).sexe||'');if(['fille','feminin','female','f'].includes(sexe)||sexe.startsWith('fill')||sexe.startsWith('femin'))return 'assets/portraits/portrait_fille.png';if(['garcon','masculin','male','m','g'].includes(sexe)||sexe.startsWith('garc')||sexe.startsWith('mascul'))return 'assets/portraits/portrait_garcon.png';return 'assets/portraits/portrait_neutre.png';}
  function studentAvatarHtml(student,extraClass=''){const portrait=studentPortraitPath(student);return '<span class="student-avatar '+extraClass+'"><img class="student-avatar__image" src="'+esc(portrait)+'" alt="Portrait de '+esc(student)+'"></span>'; }
  function subjectFromCode(code){const prefix=String(code||'').split('-')[0];const map={OR:'francais',LEC:'francais',COM:'francais',LIT:'francais',VOC:'francais',GRA:'francais',CONJ:'francais',ORT:'francais',ECR:'francais',NUM:'maths',CAL:'maths',GEO:'maths',MES:'maths',PROB:'maths'};return map[prefix]||state.subject||'francais';}
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
    linkedCodes.forEach(code=>{const skill=skillByCode(code);setClassLevel(student,skill,'acquis',{source:'maitre_hibou',evaluation:false,note:key?'Validation Maître Hibou '+key:''});});
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
  function extractHibouRows(data){
    if(Array.isArray(data))return data;
    if(!data||typeof data!=='object')return [];
    const keys=['competences','compétences','competences_validees','ceintures','belts','rows','results','data'];
    for(const key of keys){
      const value=data[key];
      if(Array.isArray(value))return value;
      if(value&&typeof value==='object'){
        const nested=extractHibouRows(value);
        if(nested.length)return nested;
      }
    }
    return [];
  }
  function normalizeHibouProofRow(row){
    row=row||{};
    const pick=(keys)=>{for(const key of keys){if(row[key]!==undefined&&row[key]!==null&&String(row[key]).trim()!=='')return row[key];}return '';};
    const normalized=Object.assign({},row,{
      prenom:pick(['prenom','Prénom','Prenom','prénom','name','eleve','élève','student']),
      competence:pick(['competence','Compétence','Competence','title','titre','label','libelle','Libellé']),
      medaille:pick(['medaille','Médaille','Medaille','medal','rank','rang']),
      validations:pick(['validations','score','resultat','résultat','Resultat','points']),
      date:pick(['date','Date','horodatage','timestamp'])
    });
    const mapping=hibouMappingForRow(normalized);
    normalized._codes=mapping?mapping.codes:[];
    return normalized;
  }
  async function loadHibouProofs(){
    hibouProofState='loading';
    let lastError=null;
    for(const action of ['ceintures','competences']){
      try{
        const data=await elevesJsonp({action,t:Date.now()});
        const rows=extractHibouRows(data).map(normalizeHibouProofRow).filter(row=>row.prenom&&row.competence&&row._codes.length);
        if(rows.length){
          hibouProofs=rows;
          hibouProofState='online';
          try{localStorage.setItem(HIBOU_PROOFS_KEY,JSON.stringify(hibouProofs));}catch(e){}
          renderHibouHeaderNotifications();
          window.dispatchEvent(new CustomEvent('progressions-hibou-proofs-updated',{detail:{source:'online',count:hibouProofs.length}}));
          if(state.mode==='classe')renderClassTracking();
          return;
        }
      }catch(error){lastError=error;}
    }
    if(lastError)console.warn('Chargement des réussites Maître Hibou :',lastError);
    try{hibouProofs=JSON.parse(localStorage.getItem(HIBOU_PROOFS_KEY)||'[]')||[];}catch(e){hibouProofs=[];}
    hibouProofState=hibouProofs.length?'cache':'error';
    renderHibouHeaderNotifications();
    window.dispatchEvent(new CustomEvent('progressions-hibou-proofs-updated',{detail:{source:hibouProofState,count:hibouProofs.length}}));
    if(state.mode==='classe')renderClassTracking();
  }


  function extractRecentRows(data){
    if(Array.isArray(data))return data;
    if(!data||typeof data!=='object')return [];
    const keys=['reussites','réussites','achievements','rows','results','data'];
    for(const key of keys){
      const value=data[key];
      if(Array.isArray(value))return value;
      if(value&&typeof value==='object'){
        const nested=extractRecentRows(value);
        if(nested.length)return nested;
      }
    }
    return [];
  }
  async function loadRecentAchievements(){
    try{
      const data=await elevesJsonp({action:'reussites',limit:250,t:Date.now()});
      const rows=extractRecentRows(data).filter(row=>row&&row.prenom&&row.date);
      localStorage.setItem(HIBOU_RECENT_KEY,JSON.stringify(rows));
      window.dispatchEvent(new CustomEvent('progressions-hibou-recent-updated',{detail:{source:'online',count:rows.length}}));
    }catch(error){
      console.warn('Chargement des réussites récentes :',error);
      let rows=[];try{rows=JSON.parse(localStorage.getItem(HIBOU_RECENT_KEY)||'[]')||[];}catch(e){}
      window.dispatchEvent(new CustomEvent('progressions-hibou-recent-updated',{detail:{source:rows.length?'cache':'error',count:rows.length}}));
    }
  }

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

  function readSyncValue(key){try{return String(localStorage.getItem(key)||'').trim();}catch(e){return '';}}
  function writeSyncValue(key,value){try{localStorage.setItem(key,String(value||''));}catch(e){}}
  function syncConfig(){return {url:readSyncValue(SYNC_API_URL_KEY),key:readSyncValue(SYNC_DEVICE_KEY)};}
  function syncConfigured(){const c=syncConfig();return /^https:\/\/script\.google\.com\/macros\/s\/.+\/exec$/.test(c.url)&&c.key.length>=16;}
  function configureRosterSync(){
    const current=syncConfig();
    let url=prompt('URL de la nouvelle API Apps Script (se termine par /exec) :',current.url||'');
    if(url===null)return false;
    let key=prompt('Clé tablette TABLET_DEVICE_KEY :',current.key||'');
    if(key===null)return false;
    url=String(url||'').trim();key=String(key||'').trim();
    if(!/^https:\/\/script\.google\.com\/macros\/s\/.+\/exec$/.test(url)){alert('URL invalide : elle doit se terminer par /exec.');return false;}
    if(key.length<16){alert('Clé tablette trop courte.');return false;}
    writeSyncValue(SYNC_API_URL_KEY,url);writeSyncValue(SYNC_DEVICE_KEY,key);
    alert('Configuration enregistrée uniquement sur cet appareil.');
    return true;
  }
  function elevesJsonpAttempt_(params, attempt){
    return new Promise((resolve,reject)=>{
      const cfg=syncConfig();
      if(!syncConfigured()){reject(new Error('Synchronisation non configurée.'));return;}
      const callback='progressionsElevesCallback_'+Date.now()+'_'+Math.random().toString(36).slice(2,10);
      const script=document.createElement('script');
      let done=false;
      const timer=setTimeout(()=>finish(new Error('Délai de connexion au Google Sheet dépassé.')),ELEVES_SYNC_TIMEOUT);
      function finish(error,data){
        if(done)return;
        done=true;
        clearTimeout(timer);
        try{delete window[callback];}catch(e){window[callback]=undefined;}
        if(script.parentNode)script.parentNode.removeChild(script);
        error?reject(error):resolve(data);
      }
      window[callback]=data=>{
        if(!data||data.ok===false){
          const message=data&&data.error?String(data.error):'Réponse API invalide.';
          const code=data&&data.code?' ['+data.code+']':'';
          finish(new Error(message+code));
          return;
        }
        finish(null,data);
      };
      const query=new URLSearchParams(Object.assign({},params,{
        device_key:cfg.key,
        tablet_key:cfg.key,
        callback:callback,
        attempt:String(attempt||1),
        _:String(Date.now())
      }));
      script.async=true;
      script.referrerPolicy='no-referrer';
      script.src=cfg.url+'?'+query.toString();
      script.onerror=()=>finish(new Error('L’API n’a pas renvoyé de script JSONP. Mets d’abord à jour Apps Script en V2.2, puis redéploie une nouvelle version.'));
      document.head.appendChild(script);
    });
  }
  async function elevesJsonp(params){
    let lastError=null;
    for(let attempt=1;attempt<=2;attempt++){
      try{return await elevesJsonpAttempt_(params,attempt);}catch(error){lastError=error;if(attempt<2)await new Promise(r=>setTimeout(r,900));}
    }
    throw lastError||new Error('Connexion au Google Sheet impossible.');
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
    if(!syncConfigured()){
      rosterSyncState=classRoster.length?'cache':'error';
      rosterSyncMessage=classRoster.length
        ? `${classRoster.length} élève${classRoster.length>1?'s':''} en mémoire locale — synchronisation à configurer`
        : 'Synchronisation des élèves non configurée';
      if(state.mode==='classe')renderClassTracking();
      if(showFeedback&&configureRosterSync())return loadRosterFromSheet(true);
      return false;
    }
    rosterSyncState='loading';
    rosterSyncMessage='Connexion sécurisée à Google Sheets…';
    if(state.mode==='classe')renderClassTracking();
    try{
      let response=null;
      let modernError=null;
      try{
        response=await elevesJsonp({action:'getElevesData'});
      }catch(error){modernError=error;}
      const extractRows=value=>{
        if(Array.isArray(value))return value;
        if(!value||typeof value!=='object')return [];
        if(Array.isArray(value.eleves))return value.eleves;
        if(Array.isArray(value.students))return value.students;
        if(Array.isArray(value.data))return value.data;
        if(value.data&&Array.isArray(value.data.eleves))return value.data.eleves;
        if(value.result&&Array.isArray(value.result.eleves))return value.result.eleves;
        return [];
      };
      let rows=extractRows(response);
      if(!rows.length){
        response=await elevesJsonp({action:'get_eleves'});
        rows=extractRows(response);
      }
      if(response&&response.ok===false)throw new Error(response.error||'Accès refusé.');
      if(!rows.length&&modernError)throw modernError;
      const names=normalizeRosterNames(rows);
      const previousMeta=classRosterMeta||{};
      const nextMeta={};
      names.forEach(name=>{
        const old=previousMeta[hibouNorm(name)];
        if(old)nextMeta[hibouNorm(name)]={...old,prenom:name};
      });
      rows.forEach(row=>{
        const source=typeof row==='string'?{prenom:row}:(row||{});
        const name=String(source.prenom||source.name||'').trim();
        if(!name)return;
        const old=previousMeta[hibouNorm(name)]||{};
        nextMeta[hibouNorm(name)]={
          prenom:name,
          nom:source.nom||source.Nom||source.NOM||source.nom_famille||source.nomFamille||old.nom||'',
          sexe:source.sexe||source.Sexe||source.SEXE||old.sexe||'',
          naissance:source.naissance||source.date_naissance||source.dateNaissance||source.anniversaire||source.date_de_naissance||source['Date de naissance']||old.naissance||'',
          cham:source.cham??source.CHAM??old.cham??''
        };
      });
      classRoster=names;
      classRosterMeta=nextMeta;
      saveClassRoster();saveClassRosterMeta();
      writeSyncValue(PROGRESSIONS_LAST_ROSTER_KEY,new Date().toISOString());
      window.dispatchEvent(new CustomEvent('progressions-roster-updated'));
      rosterSyncState='online';
      rosterSyncMessage=`${names.length} élève${names.length>1?'s':''} synchronisé${names.length>1?'s':''} depuis Google Sheets`;
      render();
      if(showFeedback)alert(rosterSyncMessage+'.');
      return true;
    }catch(error){
      console.warn('Chargement sécurisé des élèves :',error);
      rosterSyncState=classRoster.length?'cache':'error';
      rosterSyncMessage=classRoster.length
        ? `Synchronisation impossible — ${classRoster.length} élève${classRoster.length>1?'s':''} conservé${classRoster.length>1?'s':''} localement`
        : 'Impossible de charger la liste depuis Google Sheets';
      render();
      if(showFeedback)alert(rosterSyncMessage+'.\n'+String(error&&error.message||error));
      return false;
    }
  }
  function maybeLoadRosterFromSheet(){
    if(!syncConfigured())return;
    const last=Date.parse(readSyncValue(PROGRESSIONS_LAST_ROSTER_KEY)||'');
    if(!last||Date.now()-last>ROSTER_MAX_AGE_MS)loadRosterFromSheet(false);
  }
  function loadClassRoster(){try{const list=JSON.parse(localStorage.getItem(CLASS_ROSTER_KEY)||'[]');return Array.isArray(list)?sortRosterNames(list):[];}catch(e){return [];}}
  function saveClassRoster(){try{localStorage.setItem(CLASS_ROSTER_KEY,JSON.stringify(classRoster));}catch(e){alert('La liste des élèves ne peut pas être enregistrée dans ce navigateur.');}}
  function loadClassTracking(){try{return JSON.parse(localStorage.getItem(CLASS_TRACKING_KEY)||'{}')||{};}catch(e){return {};}}
  function saveClassTracking(){try{localStorage.setItem(CLASS_TRACKING_KEY,JSON.stringify(classTracking));}catch(e){alert('Le suivi des élèves ne peut pas être enregistré dans ce navigateur.');}}
  function loadClassTraces(){try{const rows=JSON.parse(localStorage.getItem(CLASS_TRACES_KEY)||'[]');return Array.isArray(rows)?rows:[];}catch(e){return [];}}
  let classTraces=loadClassTraces();
  function saveClassTraces(){try{localStorage.setItem(CLASS_TRACES_KEY,JSON.stringify(classTraces));}catch(e){alert('L’historique des évaluations ne peut pas être enregistré dans ce navigateur.');}}
  function classEntry(student,code){const k=`${student}|${code}`;if(!classTracking[k])classTracking[k]={level:'none',note:'',date:''};if(classTracking[k].level==='maitrisee')classTracking[k].level='depasse';return classTracking[k];}
  function activeEvaluationContext(code){try{const ctx=JSON.parse(sessionStorage.getItem(ACTIVE_EVALUATION_KEY)||'null');if(!ctx||!Array.isArray(ctx.codes)||!ctx.codes.includes(code))return null;if(ctx.subject&&ctx.subject!==state.subject)return null;if(ctx.period&&ctx.period!==state.period)return null;return ctx;}catch(e){return null;}}
  function skillByCode(code){const skills=preciseSkillsFor(state.subject,state.period);return skills.find(x=>x.code===code)||{code,title:code,domain:'',_period:periodFromCode(code)};}
  function tracesFor(student,code){const sn=hibouNorm(student);return classTraces.filter(t=>hibouNorm(t.prenom)===sn&&t.competence_code===code).sort((a,b)=>String(b.date||'').localeCompare(String(a.date||'')));}
  function recordClassTrace(student,skill,level,meta={}){if(!student||!skill||!skill.code||level==='none')return null;const ctx=meta.evaluation===false?null:(meta.evaluation||activeEvaluationContext(skill.code));const source=meta.source||(ctx?'evaluation_papier':'observation_classe');const now=meta.date||new Date().toISOString();const trace={trace_id:'trace-'+Date.now()+'-'+Math.random().toString(36).slice(2,8),date:now,prenom:student,matiere:state.subject,periode:skill._period||state.period,competence_code:skill.code,competence_label:skill.title||skill.label||skill.code,domaine:skill.domain||'',niveau_suivi:level,libelle_eleve:evaluationStudentLabels[level]||classLevelText[level]||level,niveau_lsu:lsuLevelLabels[level]||'',source,evaluation_id:ctx&&ctx.id||'',evaluation_titre:ctx&&ctx.title||'',note:meta.note||''};classTraces.push(trace);if(classTraces.length>20000)classTraces=classTraces.slice(-20000);saveClassTraces();window.dispatchEvent(new CustomEvent('progressions-competence-trace-added',{detail:trace}));return trace;}
  function setClassLevel(student,skill,level,meta={}){const e=classEntry(student,skill.code),previous=e.level||'none';e.level=level;e.date=meta.date||new Date().toISOString();if(previous!==level)recordClassTrace(student,skill,level,meta);return e;}
  function preciseSkillsFor(subject,period){const data=window.PROGRESSIONS[subject]||{};const periods=period==='all'?['p1','p2','p3','p4','p5']:[period];const map={p1:'p1Competencies',p2:'p2Competencies',p3:'p3Competencies',p4:'p4Competencies',p5:'p5Competencies'};let result=[];periods.forEach((p,pi)=>{const list=data[map[p]]||[];if(list.length){result=result.concat(list.map(s=>Object.assign({_period:p},s)));return;}const rowPeriod=classes.indexOf(p);(data.rows||[]).forEach((row,ri)=>{const description=row[rowPeriod+1]||'';if(!description)return;result.push({code:`${subject.toUpperCase()}-${p.toUpperCase()}-${String(ri+1).padStart(2,'0')}`,domain:row[0],title:description.length>110?description.slice(0,107)+'…':description,jeSais:defaultRetention(row[0],description),proofs:[],lsu:row[0],_period:p});});});return result;}
  function selectedClassSkill(){const skills=preciseSkillsFor(state.subject,state.period);if(!skills.length)return null;if(!skills.some(s=>s.code===state.selectedSkill))state.selectedSkill=skills[0].code;return skills.find(s=>s.code===state.selectedSkill)||skills[0];}
  function classCounts(skill){const counts={none:0,renforcer:0,encours:0,acquis:0,depasse:0};classRoster.forEach(name=>{const e=classEntry(name,skill.code);counts[e.level]=(counts[e.level]||0)+1;});return counts;}
  function classStatsHtml(skill){const c=classCounts(skill);return `<div class="class-stats"><div class="class-stat class-stat--none"><b>${c.none}</b>Non évalués</div><div class="class-stat class-stat--renforcer"><b>${c.renforcer}</b>À renforcer</div><div class="class-stat class-stat--encours"><b>${c.encours}</b>En cours</div><div class="class-stat class-stat--acquis"><b>${c.acquis}</b>Acquis</div><div class="class-stat class-stat--depasse"><b>${c.depasse||0}</b>Très bien maîtrisés</div></div>`;}
  function masteryButtons(student,skill){const e=classEntry(student,skill.code),evalMode=!!activeEvaluationContext(skill.code),levels=evalMode?['none','renforcer','encours','acquis','depasse']:classLevelOrder,labels=evalMode?{none:'⚪ Non évalué',renforcer:'🔴 À revoir',encours:'🟡 En progrès',acquis:'✅ Réussi',depasse:'🌟 Excellent'}:classLevelLabels;return `<div class="mastery-buttons ${evalMode?'mastery-buttons--evaluation':''}">${levels.map(level=>`<button type="button" class="mastery-btn ${e.level===level?'is-active':''}" data-student="${esc(student)}" data-level="${level}">${labels[level]}</button>`).join('')}</div>`;}
  function classStudentRow(student,skill){const e=classEntry(student,skill.code);const highlighted=hibouHighlightTarget&&hibouHighlightTarget.student===student&&hibouHighlightTarget.code===skill.code,traceCount=tracesFor(student,skill.code).length;return `<article class="student-tracking-row ${highlighted?'is-highlighted':''}" data-highlight-target="${esc(student+'|'+skill.code)}"><div class="student-tracking-name">${studentAvatarHtml(student)}<span>${esc(student)}</span><small class="student-trace-count">📚 ${traceCount} trace${traceCount>1?'s':''}</small></div>${masteryButtons(student,skill)}<input class="student-note-input" data-note-student="${esc(student)}" value="${esc(e.note)}" placeholder="Remarque facultative">${hibouProofHtml(student,skill)}</article>`;}
  function classFilterControls(skill){const c=classCounts(skill);const filters=[['all','Tous',classRoster.length],...classLevelOrder.map(level=>[level,classLevelText[level],c[level]||0])];return `<section class="class-bulk-panel"><div class="class-filter-row"><strong>Filtrer :</strong><div class="class-filter-buttons">${filters.map(([value,label,count])=>`<button type="button" data-class-filter="${value}" class="${state.classFilter===value?'is-active':''}">${label} <b>${count}</b></button>`).join('')}</div></div><div class="class-bulk-row"><strong>Appliquer à toute la classe :</strong><div class="class-bulk-buttons">${classLevelOrder.map(level=>`<button type="button" data-bulk-level="${level}" class="bulk-level bulk-level--${level}">${classLevelLabels[level]}</button>`).join('')}</div><span id="classSaveStatus" class="class-save-status" aria-live="polite">✓ Modifications enregistrées</span></div></section>`;}
  function markClassSaved(){const el=document.getElementById('classSaveStatus');if(!el)return;el.textContent='Enregistrement…';el.classList.add('is-saving');clearTimeout(classSaveTimer);classSaveTimer=setTimeout(()=>{const current=document.getElementById('classSaveStatus');if(current){current.textContent='✓ Modifications enregistrées';current.classList.remove('is-saving');}},450);}
  function rosterStatusHtml(){return `<div class="roster-sync roster-sync--${rosterSyncState}" role="status"><span class="roster-sync__dot" aria-hidden="true"></span><span>${esc(rosterSyncMessage)}</span></div>`;}
  function parseBirthDate(value){
    if(value instanceof Date&&!Number.isNaN(value.getTime()))return value;
    if(typeof value==='number'&&Number.isFinite(value)){
      const d=new Date(Math.round((value-25569)*86400*1000));
      return Number.isNaN(d.getTime())?null:d;
    }
    const raw=String(value||'').trim();
    if(!raw)return null;
    const fr=raw.match(/^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{4})$/);
    if(fr){const d=new Date(Number(fr[3]),Number(fr[2])-1,Number(fr[1]));return Number.isNaN(d.getTime())?null:d;}
    const iso=raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
    if(iso){const d=new Date(Number(iso[1]),Number(iso[2])-1,Number(iso[3]));return Number.isNaN(d.getTime())?null:d;}
    const d=new Date(raw);
    return Number.isNaN(d.getTime())?null:d;
  }
  function ageAtToday(date){const now=new Date();let age=now.getFullYear()-date.getFullYear();const beforeBirthday=now.getMonth()<date.getMonth()||(now.getMonth()===date.getMonth()&&now.getDate()<date.getDate());if(beforeBirthday)age--;return age;}
  function isChamStudent(student){const value=rosterMetaFor(student).cham;if(value===true||value===1)return true;const normalized=String(value||'').trim().toLowerCase();return ['oui','true','vrai','yes','1','x','cham'].includes(normalized);}
  function birthLabel(student){const meta=rosterMetaFor(student);const cham=isChamStudent(student)?' · 🎵 CHAM':'';const date=parseBirthDate(meta.naissance);if(!date)return `🎂 Date de naissance non renseignée${cham}`;const formatted=new Intl.DateTimeFormat('fr-FR',{day:'2-digit',month:'2-digit',year:'numeric'}).format(date);const age=ageAtToday(date);return `🎂 ${formatted} · ${age} an${age>1?'s':''}${cham}`;}
  function recentRows(){try{return JSON.parse(localStorage.getItem(HIBOU_RECENT_KEY)||'[]')||[];}catch(e){return [];}}
  function eventStudent(row){return String((row&&(row.prenom||row.eleve||row.name||row.student))||'').trim();}
  function eventDateValue(row){const raw=row&&(row.date||row.timestamp||row.datetime||row.created_at||row.createdAt);const time=new Date(raw||0).getTime();return Number.isFinite(time)?time:0;}
  function activityRowsFor(student){const key=hibouNorm(student);return recentRows().filter(row=>hibouNorm(eventStudent(row))===key).sort((a,b)=>eventDateValue(b)-eventDateValue(a));}
  function proofCountFor(student){const key=hibouNorm(student);const seen=new Set();hibouProofs.forEach(row=>{if(hibouNorm(row.prenom)!==key)return;const identity=hibouNorm(row.competence)+'|'+String(row.medaille||'');seen.add(identity);});return seen.size;}
  function activityLabel(row){if(!row)return 'Aucune activité enregistrée';const type=hibouNorm(row.type||row.activite||row.activity||'');const label=String(row.texte||row.text||row.detail||row.activite||row.competence||row.ceinture||'').trim();if(label)return label;if(type.includes('ceinture'))return 'Ceinture validée';if(type.includes('entrain'))return 'Entraînement terminé';if(type.includes('question'))return 'Question posée';if(type.includes('record'))return 'Record de calcul';return 'Activité Maître Hibou';}
  function relativeActivityLabel(time){if(!time)return 'Aucune activité récente';const diff=Math.max(0,Date.now()-time);const min=Math.floor(diff/60000);if(min<1)return 'À l’instant';if(min<60)return `Il y a ${min} min`;const h=Math.floor(min/60);if(h<24)return `Il y a ${h} h`;const d=Math.floor(h/24);if(d<7)return `Il y a ${d} jour${d>1?'s':''}`;return new Intl.DateTimeFormat('fr-FR',{day:'2-digit',month:'2-digit',year:'numeric'}).format(new Date(time));}
  function studentNeedsAttention(student){const prefix=student+'|';return Object.entries(classTracking||{}).some(([key,value])=>key.startsWith(prefix)&&value&&value.level==='renforcer');}
  function rosterCardInfo(student){const activities=activityRowsFor(student);const latest=activities[0]||null;const latestTime=eventDateValue(latest);return {student,activities,latest,latestTime,proofs:proofCountFor(student),needs:studentNeedsAttention(student)};}
  function filteredRosterInfos(){const query=hibouNorm(state.rosterSearch);let infos=classRoster.map(rosterCardInfo);if(query)infos=infos.filter(info=>hibouNorm(info.student).includes(query));if(state.rosterQuickFilter==='recent')infos=infos.filter(info=>info.latestTime&&Date.now()-info.latestTime<=7*24*60*60*1000);if(state.rosterQuickFilter==='inactive')infos=infos.filter(info=>!info.latestTime||Date.now()-info.latestTime>14*24*60*60*1000);if(state.rosterQuickFilter==='ceintures')infos=infos.filter(info=>info.proofs>0);if(state.rosterQuickFilter==='needs')infos=infos.filter(info=>info.needs);if(state.rosterSort==='alpha')infos.sort((a,b)=>a.student.localeCompare(b.student,'fr'));else if(state.rosterSort==='needs')infos.sort((a,b)=>Number(b.needs)-Number(a.needs)||b.latestTime-a.latestTime||a.student.localeCompare(b.student,'fr'));else infos.sort((a,b)=>b.latestTime-a.latestTime||a.student.localeCompare(b.student,'fr'));return infos;}
  function compactSyncText(){const last=readSyncValue(PROGRESSIONS_LAST_ROSTER_KEY);let when='jamais';if(last){const time=new Date(last).getTime();if(Number.isFinite(time))when=relativeActivityLabel(time).replace(/^Il y a /,'il y a ');}const source=rosterSyncState==='online'?'Google Sheets':rosterSyncState==='cache'?'copie locale':'connexion indisponible';return `${classRoster.length} élève${classRoster.length>1?'s':''} · ${source} · dernière actualisation : ${when}`;}
  function rosterOverviewHtml(){
    if(!classRoster.length)return '';
    const infos=filteredRosterInfos();
    const recentCount=classRoster.map(rosterCardInfo).filter(info=>info.latestTime&&Date.now()-info.latestTime<=7*24*60*60*1000).length;
    const cards=infos.map(info=>{
      const latestText=activityLabel(info.latest);
      const activityMeta=relativeActivityLabel(info.latestTime);
      const badges=[info.proofs?`🏅 ${info.proofs} ceinture${info.proofs>1?'s':''}`:'',info.activities.length?`⭐ ${Math.min(info.activities.length,99)} activité${info.activities.length>1?'s':''}`:''].filter(Boolean).join(' · ');
      return `<button type="button" class="roster-card roster-card--v2" data-roster-student="${esc(info.student)}">${studentAvatarHtml(info.student,'student-avatar--large')}<span class="roster-card__text"><strong>${esc(info.student)}</strong><small>${esc(birthLabel(info.student))}</small><span class="roster-card__badges">${esc(badges||'Aucune activité enregistrée')}</span><span class="roster-card__activity"><b>${esc(latestText)}</b><em>${esc(activityMeta)}</em></span></span><span class="roster-card__arrow">›</span></button>`;
    }).join('');
    const empty=infos.length?'':`<div class="roster-filter-empty">Aucun élève ne correspond à ce filtre.</div>`;
    const syncLabel=compactSyncText();
    return `<section class="roster-overview roster-overview--v3 card"><div class="roster-v3-toolbar"><div class="roster-v3-title"><h2>Vue élèves</h2><span class="roster-v3-sync">${esc(syncLabel)}</span></div><div class="roster-v3-actions"><button class="btn btn--light" id="refreshRosterOverviewBtn" type="button" ${rosterSyncState==='loading'?'disabled':''}>${rosterSyncState==='loading'?'⏳ Connexion…':'🔄 Actualiser'}</button></div></div><div class="roster-v3-controls"><input id="rosterSearchInput" type="search" value="${esc(state.rosterSearch)}" placeholder="Rechercher un élève…" aria-label="Rechercher un élève"><select id="rosterSortSelect" aria-label="Trier les élèves"><option value="recent" ${state.rosterSort==='recent'?'selected':''}>Activité récente</option><option value="alpha" ${state.rosterSort==='alpha'?'selected':''}>Ordre alphabétique</option><option value="needs" ${state.rosterSort==='needs'?'selected':''}>À suivre en priorité</option></select></div><div class="roster-v3-filters"><button type="button" data-roster-filter="all" class="${state.rosterQuickFilter==='all'?'is-active':''}">Tous <b>${classRoster.length}</b></button><button type="button" data-roster-filter="recent" class="${state.rosterQuickFilter==='recent'?'is-active':''}">Actifs récemment <b>${recentCount}</b></button><button type="button" data-roster-filter="inactive" class="${state.rosterQuickFilter==='inactive'?'is-active':''}">Sans activité récente</button><button type="button" data-roster-filter="ceintures" class="${state.rosterQuickFilter==='ceintures'?'is-active':''}">Avec ceintures</button></div><div class="roster-card-grid">${cards}</div>${empty}</section>`;
  }
  function renderRosterView(){
    dashboard.classList.add('hidden');
    grid.classList.remove('is-followup');
    if(!classRoster.length){grid.innerHTML=`<section class="class-empty">${rosterStatusHtml()}<strong>👥 Aucun élève disponible</strong><p>La liste est lue dans l’onglet <code>eleves</code> du Google Sheet.</p><button class="btn btn--hibou" id="refreshRosterEmptyBtn" type="button" ${rosterSyncState==='loading'?'disabled':''}>${rosterSyncState==='loading'?'⏳ Connexion…':'🔄 Actualiser la classe'}</button></section>`;const refresh=document.getElementById('refreshRosterEmptyBtn');if(refresh)refresh.onclick=()=>loadRosterFromSheet(true);return;}
    grid.innerHTML=`<section class="class-tracking class-tracking--roster-only">${rosterOverviewHtml()}</section>`;
    bindRosterViewEvents();
  }
  function bindRosterViewEvents(){
    const refresh=document.getElementById('refreshRosterOverviewBtn');if(refresh)refresh.onclick=()=>loadRosterFromSheet(true);
    const search=document.getElementById('rosterSearchInput');if(search)search.oninput=()=>{state.rosterSearch=search.value;renderRosterView();setTimeout(()=>{const next=document.getElementById('rosterSearchInput');if(next){next.focus();next.setSelectionRange(next.value.length,next.value.length);}},0);};
    const sort=document.getElementById('rosterSortSelect');if(sort)sort.onchange=()=>{state.rosterSort=sort.value;renderRosterView();};
    document.querySelectorAll('[data-roster-filter]').forEach(btn=>btn.onclick=()=>{state.rosterQuickFilter=btn.dataset.rosterFilter;renderRosterView();});
    document.querySelectorAll('[data-roster-student]').forEach(btn=>btn.onclick=()=>window.ParcoursOutil?.openForStudent(btn.dataset.rosterStudent));
  }
  function followupSummary(skill){
    const counts=classCounts(skill);
    const inactive=classRoster.map(rosterCardInfo).filter(info=>!info.latestTime||Date.now()-info.latestTime>14*24*60*60*1000).length;
    const recent=classRoster.map(rosterCardInfo).filter(info=>info.latestTime&&Date.now()-info.latestTime<=7*24*60*60*1000).length;
    const needs=classRoster.filter(name=>studentNeedsAttention(name)).length;
    return {counts,inactive,recent,needs};
  }
  function followupPriorityHtml(skill){
    const urgent=[];
    classRoster.forEach(student=>{
      const info=rosterCardInfo(student);
      const level=classEntry(student,skill.code).level;
      if(level==='renforcer')urgent.push({student,text:'Compétence à renforcer',kind:'renforcer'});
      else if(!info.latestTime||Date.now()-info.latestTime>14*24*60*60*1000)urgent.push({student,text:'Aucune activité récente',kind:'inactive'});
    });
    const rows=urgent.slice(0,6).map(item=>`<button type="button" class="followup-priority-row" data-followup-student="${esc(item.student)}"><span>${studentAvatarHtml(item.student,'student-avatar--small')}<b>${esc(item.student)}</b></span><em>${esc(item.text)}</em><strong>Ouvrir le parcours ›</strong></button>`).join('');
    return `<section class="followup-section card"><div class="followup-section__head"><div><span class="eyebrow">MES PRIORITÉS</span><h3>À regarder maintenant</h3></div><span class="followup-count">${urgent.length}</span></div>${rows||'<p class="followup-empty">Aucune priorité urgente pour cette compétence.</p>'}</section>`;
  }
  function renderClassTracking(){
    const skills=preciseSkillsFor(state.subject,state.period);
    grid.classList.remove('is-followup');
    dashboard.classList.add('hidden');
    if(!classRoster.length){grid.innerHTML=`<section class="class-empty">${rosterStatusHtml()}<strong>👥 Aucun élève disponible</strong><p>Actualise la liste avant de commencer le suivi.</p><button class="btn btn--hibou" id="refreshRosterEmptyBtn" type="button">🔄 Actualiser la classe</button></section>`;document.getElementById('refreshRosterEmptyBtn').onclick=()=>loadRosterFromSheet(true);return;}
    if(!skills.length){grid.innerHTML=`<section class="class-empty"><strong>Aucune compétence disponible</strong><p>Choisis une autre matière ou une autre période.</p></section>`;return;}
    const skill=selectedClassSkill();
    const summary=followupSummary(skill);
    const optionsHtml=skills.map(s=>`<option value="${esc(s.code)}" ${s.code===skill.code?'selected':''}>${esc(s.domain)} — ${esc(s.title)}</option>`).join('');
    grid.innerHTML=`<section class="class-tracking class-tracking--followup followup-v2"><header class="followup-action-head card"><div><span class="eyebrow">MON SUIVI</span><h2>Priorités et actions pédagogiques</h2><p>Qui aider, quoi reprendre et quels groupes préparer.</p></div><div class="followup-head-actions"><button class="btn btn--light" id="refreshRosterBtn" type="button" ${rosterSyncState==='loading'?'disabled':''}>${rosterSyncState==='loading'?'⏳ Connexion…':'🔄 Actualiser'}</button><button class="btn btn--outline" id="exportClassBtn" type="button">⬇ Exporter</button></div></header><div class="followup-compact-toolbar card"><label><span>Matière</span><strong>${esc(window.PROGRESSIONS[state.subject].title)}</strong></label><label><span>Période</span><strong>${esc(state.period==='all'?'Vue annuelle':labels[classes.indexOf(state.period)])}</strong></label><label class="followup-skill-select"><span>Compétence observée</span><select id="classSkillSelect">${optionsHtml}</select></label></div><section class="followup-kpis"><button type="button" data-class-filter="renforcer"><b>${summary.counts.renforcer}</b><span>Élèves à renforcer</span></button><button type="button" data-class-filter="none"><b>${summary.counts.none}</b><span>Non évalués</span></button><button type="button" id="openNeedGroupsBtn"><b>${summary.needs}</b><span>Élèves à suivre</span></button><button type="button" data-roster-filter="recent"><b>${summary.recent}</b><span>Progrès récents</span></button></section><div class="followup-main-grid">${followupPriorityHtml(skill)}<section class="followup-section card"><div class="followup-section__head"><div><span class="eyebrow">GROUPES DE BESOIN</span><h3>Préparer les prochains ateliers</h3></div></div><p>Crée automatiquement des groupes selon les niveaux observés pour la compétence sélectionnée.</p><button type="button" class="btn btn--hibou" id="openNeedGroupsBtnSecondary">👥 Créer les groupes par niveau</button></section></div>${renderHibouPriorityBlock()}<details class="followup-details" ${state.classView==='student'?'open':''}><summary><span>Suivi détaillé</span><small>Par compétence ou par élève</small></summary><div class="class-toolbar card"><label><span>Vue du suivi</span><div class="class-view-switch"><button type="button" data-class-view="skill" class="${state.classView==='skill'?'is-active':''}">Par compétence</button><button type="button" data-class-view="student" class="${state.classView==='student'?'is-active':''}">Par élève</button></div></label></div>${state.classView==='skill'?renderBySkill(skill):renderByStudent(skills)}</details></section>`;
    bindClassTrackingEvents(skills);
    document.querySelectorAll('[data-followup-student]').forEach(btn=>btn.onclick=()=>window.ParcoursOutil?.openForStudent(btn.dataset.followupStudent));
    const needGroups2=document.getElementById('openNeedGroupsBtnSecondary');if(needGroups2)needGroups2.onclick=()=>window.GroupesBesoin?.open();
  }
  function renderBySkill(skill){const visible=state.classFilter==='all'?classRoster:classRoster.filter(name=>classEntry(name,skill.code).level===state.classFilter);const empty=visible.length?'':`<div class="class-filter-empty">Aucun élève dans ce filtre.</div>`;return `<section class="class-skill-summary class-skill-summary--compact"><div class="class-skill-summary__top"><div><strong>${esc(skill.code)} — ${esc(skill.title)}</strong><p>${esc(skill.jeSais||'')}</p><small>${esc(skill.domain)} · ${esc(labels[classes.indexOf(skill._period)]||skill._period)}${skill.lsu?' · Référence LSU : '+esc(skill.lsu):''}</small></div></div></section>${classStatsHtml(skill)}${classFilterControls(skill)}<section class="student-tracking-list">${visible.map(name=>classStudentRow(name,skill)).join('')}${empty}</section>`;}
  function renderByStudent(skills){if(!state.selectedStudent||!classRoster.includes(state.selectedStudent))state.selectedStudent=classRoster[0];const student=state.selectedStudent;const rows=skills.map(skill=>{const e=classEntry(student,skill.code);return `<div class="student-skill-row"><span class="skill-code">${esc(skill.code)}</span><span><strong>${esc(skill.title)}</strong><br><small>${esc(skill.domain)}</small></span><span class="level-pill level-pill--${e.level}">${classLevelLabels[e.level]}</span></div>`;}).join('');return `<section class="student-direct-toolbar card"><button type="button" id="backToRosterBtn" class="btn btn--light">← Retour à la liste des élèves</button><button type="button" id="openStudentJourneyBtn" class="btn btn--hibou">🧭 Ouvrir son parcours</button><label><span>Élève</span><select id="classStudentSelect">${classRoster.map(n=>`<option value="${esc(n)}" ${n===student?'selected':''}>${esc(n)}</option>`).join('')}</select></label><span class="student-birth-summary">${esc(birthLabel(student))}</span></section><section class="student-overview"><article class="student-overview-card"><div class="student-overview-head"><strong>👤 ${esc(student)}</strong><span>${skills.length} compétence${skills.length>1?'s':''} affichée${skills.length>1?'s':''}</span></div><div class="student-skill-list">${rows}</div></article></section>`;}
  function bindClassTrackingEvents(skills){const needGroups=document.getElementById('openNeedGroupsBtn');if(needGroups)needGroups.onclick=()=>window.GroupesBesoin?.open();const refreshOverview=document.getElementById('refreshRosterOverviewBtn');if(refreshOverview)refreshOverview.onclick=()=>loadRosterFromSheet(true);const rosterSearch=document.getElementById('rosterSearchInput');if(rosterSearch)rosterSearch.oninput=()=>{state.rosterSearch=rosterSearch.value;renderClassTracking();setTimeout(()=>document.getElementById('rosterSearchInput')?.focus(),0);};const rosterSort=document.getElementById('rosterSortSelect');if(rosterSort)rosterSort.onchange=()=>{state.rosterSort=rosterSort.value;renderClassTracking();};document.querySelectorAll('[data-roster-filter]').forEach(btn=>btn.onclick=()=>{state.rosterQuickFilter=btn.dataset.rosterFilter;renderClassTracking();});document.querySelectorAll('[data-roster-student]').forEach(btn=>btn.onclick=()=>{window.ParcoursOutil?.openForStudent(btn.dataset.rosterStudent);});const backToRoster=document.getElementById('backToRosterBtn');if(backToRoster)backToRoster.onclick=()=>{state.classView='skill';state.selectedStudent='';renderClassTracking();window.scrollTo({top:0,behavior:'instant'});};const openJourney=document.getElementById('openStudentJourneyBtn');if(openJourney)openJourney.onclick=()=>window.ParcoursOutil?.openForStudent(state.selectedStudent);const skillSelect=document.getElementById('classSkillSelect');if(skillSelect)skillSelect.onchange=()=>{state.selectedSkill=skillSelect.value;state.classFilter='all';renderClassTracking();};const studentSelect=document.getElementById('classStudentSelect');if(studentSelect)studentSelect.onchange=()=>{state.selectedStudent=studentSelect.value;renderClassTracking();};document.querySelectorAll('[data-class-view]').forEach(btn=>btn.onclick=()=>{state.classView=btn.dataset.classView;renderClassTracking();});const refresh=document.getElementById('refreshRosterBtn');if(refresh)refresh.onclick=()=>loadRosterFromSheet(true);const exp=document.getElementById('exportClassBtn');if(exp)exp.onclick=exportClassCsv;document.querySelectorAll('[data-class-filter]').forEach(btn=>btn.onclick=()=>{state.classFilter=btn.dataset.classFilter;renderClassTracking();});document.querySelectorAll('[data-bulk-level]').forEach(btn=>btn.onclick=()=>{const skill=selectedClassSkill();const level=btn.dataset.bulkLevel;const count=classRoster.length;const message=`Appliquer « ${classLevelText[level]} » aux ${count} élève${count>1?'s':''} ?\n\nCette action remplacera les niveaux déjà renseignés pour cette compétence.`;if(!window.confirm(message))return;const now=new Date().toISOString();classRoster.forEach(student=>setClassLevel(student,skill,level,{date:now}));saveClassTracking();renderClassTracking();markClassSaved();});document.querySelectorAll('.mastery-btn').forEach(btn=>btn.onclick=()=>{const skill=selectedClassSkill();setClassLevel(btn.dataset.student,skill,btn.dataset.level);saveClassTracking();renderClassTracking();markClassSaved();});document.querySelectorAll('[data-note-student]').forEach(input=>{input.oninput=()=>{const skill=selectedClassSkill();const e=classEntry(input.dataset.noteStudent,skill.code);e.note=input.value;e.date=new Date().toISOString();saveClassTracking();markClassSaved();};});bindHibouActionButtons(document);document.querySelectorAll('[data-hibou-restore]').forEach(btn=>btn.onclick=()=>{delete hibouIgnored[btn.dataset.hibouRestore];saveHibouIgnored();renderClassTracking();});}
  function exportClassCsv(){const skills=preciseSkillsFor(state.subject,state.period);const rows=[['Élève','Code','Matière','Période','Domaine','Compétence','Niveau actuel','Équivalent LSU','Nombre de traces','Dernière source','Remarque','Date']];classRoster.forEach(student=>skills.forEach(skill=>{const e=classEntry(student,skill.code);const traces=tracesFor(student,skill.code),last=traces[0]||{};rows.push([student,skill.code,window.PROGRESSIONS[state.subject].title,labels[classes.indexOf(skill._period)]||skill._period,skill.domain,skill.title,classLevelLabels[e.level],lsuLevelLabels[e.level]||'',traces.length,last.source||'',e.note,e.date]);}));const csv=rows.map(r=>r.map(v=>'"'+String(v||'').replace(/"/g,'""')+'"').join(';')).join('\n');const blob=new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`suivi_classe_${state.subject}_${state.period}.csv`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),0);}

  function currentSkills(){if(state.mode!=='suivi')return null;const data=window.PROGRESSIONS[state.subject];const map={p1:'p1Competencies',p2:'p2Competencies',p3:'p3Competencies',p4:'p4Competencies',p5:'p5Competencies'};const key=map[state.period];return key?(data[key]||[]):null;}
  function render(){renderHibouHeaderNotifications();const data=window.PROGRESSIONS[state.subject];title.textContent=data.title;subtitle.textContent=data.subtitle;icon.textContent=data.icon;document.getElementById('currentPeriodLabel').textContent=state.period==='all'?'Vue annuelle':labels[classes.indexOf(state.period)];document.getElementById('currentModeLabel').textContent=state.mode==='suivi'?'Mon suivi':(state.mode==='reference'?'Référentiel':'Vue élèves');document.getElementById('compactSubject').textContent=data.title;document.getElementById('compactPeriod').textContent=state.period==='all'?'Vue annuelle':labels[classes.indexOf(state.period)];document.body.classList.toggle('view-mode-classe',state.mode==='classe');document.body.classList.toggle('view-mode-suivi',state.mode==='suivi');document.body.classList.toggle('view-mode-reference',state.mode==='reference');showCategory(subjectCategory(state.subject));routines.innerHTML=data.routines.map(x=>`<li>${esc(x)}</li>`).join('');dashboard.classList.toggle('hidden',state.mode!=='suivi');grid.classList.toggle('is-followup',state.mode==='suivi');if(state.mode==='classe')renderRosterView();else if(state.mode==='suivi')renderClassTracking();else renderReference(data);updateDashboard();}
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

  document.querySelectorAll('.mode-btn').forEach(btn=>btn.addEventListener('click',()=>{const routes={classe:'vue-eleves.html',suivi:'mon-suivi.html',reference:'referentiel.html'};if(PAGE_KIND!=='home'){location.href=routes[btn.dataset.mode]||'index.html';return;}const workspace=document.getElementById('teacherWorkspace');workspace?.classList.add('is-preparing');document.querySelectorAll('.mode-btn').forEach(b=>b.classList.remove('is-active'));btn.classList.add('is-active');state.mode=btn.dataset.mode;if(state.mode==='classe'){state.classView='skill';state.selectedStudent='';state.classFilter='all';state.rosterSort='recent';state.rosterQuickFilter='all';state.rosterSearch='';}render();requestAnimationFrame(()=>requestAnimationFrame(()=>workspace?.classList.remove('is-preparing')));}));
  document.querySelectorAll('.tab').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.tab').forEach(b=>b.classList.remove('is-active'));btn.classList.add('is-active');state.subject=btn.dataset.subject;showCategory(subjectCategory(state.subject));render();if(!filtersPinned)setFiltersOpen(false);}));
  document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.classList.remove('is-active'));btn.classList.add('is-active');state.period=btn.dataset.period;render();if(!filtersPinned)setFiltersOpen(false);}));

  const homeHub=document.querySelector('.home-hub');
  const teacherWorkspace=document.getElementById('teacherWorkspace');
  const workspaceTitle=document.getElementById('workspaceTitle');
  const openTeacherWorkspace=(label='Espace professeur')=>{teacherWorkspace?.classList.add('is-preparing');document.body.classList.add('workspace-open');teacherWorkspace?.classList.add('is-active');teacherWorkspace?.setAttribute('aria-hidden','false');if(workspaceTitle)workspaceTitle.textContent=label;requestAnimationFrame(()=>requestAnimationFrame(()=>teacherWorkspace?.classList.remove('is-preparing')));window.scrollTo({top:0,behavior:'instant'});};
  const closeTeacherWorkspace=()=>{document.body.classList.remove('workspace-open');teacherWorkspace?.classList.remove('is-active');teacherWorkspace?.setAttribute('aria-hidden','true');window.scrollTo({top:0,behavior:'instant'});};
  document.getElementById('backHomeBtn')?.addEventListener('click',()=>{if(PAGE_KIND!=='home'){location.href='index.html';return;}closeTeacherWorkspace();});
  const setModeFromHome=(mode)=>{const target=document.querySelector(`.mode-btn[data-mode="${mode}"]`);if(target)target.click();};
  const setPeriodFromHome=(period)=>{const target=document.querySelector(`.filter[data-period="${period}"]`);if(target)target.click();};
  const focusProgressions=()=>{const zone=document.getElementById('progressionGrid');if(zone)zone.scrollIntoView({behavior:'smooth',block:'start'});};
  
  document.querySelectorAll('[data-page-link]').forEach(btn=>btn.addEventListener('click',()=>{
    const target=btn.dataset.pageLink;
    if(target) location.href=target;
  }));
  document.querySelectorAll('[data-home-mode]').forEach(btn=>btn.addEventListener('click',()=>{const labels={classe:'Vue élèves',suivi:'Mon suivi',reference:'Référentiel'};const requestedMode=btn.dataset.homeMode;if(requestedMode==='classe'){state.classView='skill';state.selectedStudent='';state.classFilter='all';state.rosterSort='recent';state.rosterQuickFilter='all';state.rosterSearch='';}setModeFromHome(requestedMode);openTeacherWorkspace(labels[requestedMode]||'Espace professeur');if(requestedMode==='classe')loadRosterFromSheet(false);setTimeout(()=>window.scrollTo({top:0,behavior:'instant'}),40);}));
  document.querySelectorAll('[data-home-action]').forEach(btn=>btn.addEventListener('click',()=>{
    const action=btn.dataset.homeAction;
    if(action==='library'){document.getElementById('openLibraryBtn')?.click();return;}
    if(action==='detail-timetable'){document.getElementById('openTimetableDetailBtn')?.click();return;}
    if(action==='tbi-view'){document.getElementById('openTbiViewBtn')?.dispatchEvent(new CustomEvent('open-tbi-view',{bubbles:false}));return;}
    if(action==='evaluations'){document.getElementById('openEvaluationsBtn')?.click();return;}
    if(action==='supports'){window.openSupportsModal?.();return;}
    if(action==='progressions'){setModeFromHome('classe');setPeriodFromHome('all');focusProgressions();return;}
    if(action==='hibou-link'){window.open('https://labastide11.github.io/Prof_virtuel/','_blank','noopener');return;}
    if(action==='synthetic'){const target=document.querySelector('.home-row__periods [data-open-summary-period="p1"]')||document.querySelector('[data-open-summary-period="p1"]');if(target)target.click();return;}
    if(action==='parcours'){window.ParcoursOutil?.open();return;}
  }));
  showCategory(subjectCategory(state.subject));
  document.getElementById('collapseAllBtn').addEventListener('click',()=>{const cards=[...grid.querySelectorAll('.domain-card[data-domain-key]')];const shouldCollapse=!cards.every(card=>card.classList.contains('is-collapsed'));cards.forEach(card=>setDomainCollapsed(card,shouldCollapse));updateCollapseAllButton();});
  document.getElementById('printBtn').addEventListener('click',()=>window.print());
  document.getElementById('exportBtn').addEventListener('click',()=>{const blob=new Blob([JSON.stringify({version:5,exportedAt:new Date().toISOString(),data:saved},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='sauvegarde_progressions_ce2.json';a.click();URL.revokeObjectURL(a.href);});
  document.getElementById('importInput').addEventListener('change',event=>{const file=event.target.files[0];if(!file)return;const r=new FileReader();r.onload=()=>{try{const p=JSON.parse(r.result);saved=p.data||p;persist();render();alert('Sauvegarde importée.');}catch(e){alert('Ce fichier de sauvegarde n’est pas valide.');}};r.readAsText(file);event.target.value='';});
  document.getElementById('resetBtn').addEventListener('click',()=>{if(!confirm('Réinitialiser uniquement la matière et la période actuellement affichées ?'))return;visibleKeys().forEach(k=>delete saved[k]);persist();render();});
  if(hibouNotifBtn)hibouNotifBtn.addEventListener('click',()=>{hibouNotifOpen=!hibouNotifOpen;if(hibouNotifOpen)markNotificationsSeen();renderHibouHeaderNotifications();});
  window.ProgressionsRoster={
    refresh:(manual=false)=>loadRosterFromSheet(Boolean(manual)),
    configure:configureRosterSync,
    isConfigured:syncConfigured,
    getMeta:()=>classRoster.map(student=>({prenom:student,...rosterMetaFor(student)})),
    getNames:()=>classRoster.slice(),
    getLastSync:()=>readSyncValue(PROGRESSIONS_LAST_ROSTER_KEY),
    storageKey:CLASS_ROSTER_META_KEY,
    getTracking:()=>JSON.parse(JSON.stringify(classTracking||{})),
    getSelectedSkill:()=>{const skill=selectedClassSkill();return skill?{code:skill.code,title:skill.title,domain:skill.domain,period:skill._period,subject:state.subject}:null;},
    getEntry:(student,code)=>{const entry=classEntry(student,code);const proof=hibouProofFor(student,code);return {student,code,level:entry.level,note:entry.note||'',date:entry.date||'',hibouProof:proof||null,effectiveLevel:(entry.level==='none'&&proof)?'acquis':entry.level};},
    setLevel:(student,code,level)=>{if(!classRoster.includes(student)||!classLevelOrder.includes(level))return false;const entry=classEntry(student,code);entry.level=level;entry.date=new Date().toISOString();saveClassTracking();renderClassTracking();return true;},
    refreshView:()=>renderClassTracking()
  };
  if(PAGE_KIND!=='home'){
    document.body.classList.add('workspace-open');
    teacherWorkspace?.classList.add('is-active');
    teacherWorkspace?.setAttribute('aria-hidden','false');
    const labels={eleves:'Vue élèves',suivi:'Mon suivi',reference:'Référentiel'};
    if(workspaceTitle) workspaceTitle.textContent=labels[PAGE_KIND]||'Espace professeur';
    document.querySelectorAll('.mode-btn').forEach(b=>b.classList.toggle('is-active',b.dataset.mode===state.mode));
  }
  render();
  maybeLoadRosterFromSheet();
  loadHibouProofs();
  loadRecentAchievements();
  if(PAGE_KIND==='eleves') loadRosterFromSheet(false);
})();
