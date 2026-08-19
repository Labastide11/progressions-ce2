(function(){
  'use strict';
  const API_URL_KEY='hibou_sync_api_url_v25754';
  const API_URL_V275='https://script.google.com/macros/s/AKfycbwGcErZ0he06Dg_bpPDaHtPHa6fAcDQ-31tB7Rlr9w2JZcNaQnP9YIABJYf-CKpFfpF/exec';
  const DEVICE_KEY='hibou_sync_device_key_v25754';
  const CACHE_KEY='progressions_ce2_questions_cache_v3388';
  const CACHE_MAX_AGE=5*60*1000;
  const els={};
  let questions=[],activeFilter='new',subject='all',loading=false,syncState='idle',syncMessage='';

  function norm(v){return String(v??'').trim();}
  function lower(v){return norm(v).toLocaleLowerCase('fr-FR');}
  function escapeHtml(v){return norm(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
  function ensureApiV275_(){
    const current=norm(localStorage.getItem(API_URL_KEY));
    if(current!==API_URL_V275){
      if(current) localStorage.setItem(API_URL_KEY+'_backup_v3388', current);
      localStorage.setItem(API_URL_KEY, API_URL_V275);
    }
    return API_URL_V275;
  }
  function apiConfig(){return {url:ensureApiV275_(),key:norm(localStorage.getItem(DEVICE_KEY))};}
  function pick(o,names){for(const n of names){if(o && o[n]!==undefined && o[n]!==null && norm(o[n])!=='') return o[n];}return '';}
  function normalizeRow(row,index){
    const visibility=norm(pick(row,['visibilite','Visibilité','visibility','Visibilite']));
    let status=norm(pick(row,['statut','Statut','status']));
    if(!status) status='Nouvelle';
    const date=norm(pick(row,['date','Date']));
    const time=norm(pick(row,['heure','Heure','time']));
    return {
      id:norm(pick(row,['id','ID','row','rowIndex','ligne']))||String(index+2),
      rowIndex:Number(pick(row,['rowIndex','row_number','ligne','row','index']))||index+2,
      date,time,
      prenom:norm(pick(row,['prenom','Prénom','Prenom','élève','eleve'])),
      matiere:norm(pick(row,['matiere','Matière','Matiere']))||'Général',
      originale:norm(pick(row,['questionOriginale','Question originale','question_originale','question'])),
      corrigee:norm(pick(row,['questionCorrigee','Question corrigée','question_corrigee','questionCorrigée']))||norm(pick(row,['questionOriginale','Question originale','question_originale','question'])),
      reponse:norm(pick(row,['reponseIA','Réponse IA','reponse_ia','réponse','reponse'])),
      visibility,
      status,
      points:norm(pick(row,['pointsCuriosite','Points Curiosité','points_curiosite'])),
      dateExplication:norm(pick(row,['dateExplication','Date explication','date_explication']))
    };
  }
  function statusKind(q){const s=lower(q.status);if(s.includes('à expliquer')||s.includes('a expliquer')||s.includes('trait'))return 'todo';if(s.includes('expliquée')||s.includes('expliquee')||s==='expliqué'||s==='explique')return 'done';return 'new';}
  function isStar(q){return lower(q.visibility).includes('vedette');}
  function isClass(q){return lower(q.visibility).includes('classe')||isStar(q);}
  function visibleRows(){return questions.filter(q=>{
    if(!norm(q.corrigee)&&!norm(q.originale))return false;
    if(subject!=='all' && lower(q.matiere)!==subject)return false;
    if(activeFilter==='all')return true;
    return statusKind(q)===activeFilter;
  }).sort((a,b)=>{
    const rank={new:0,todo:1,done:2};const d=rank[statusKind(a)]-rank[statusKind(b)];if(d)return d;
    return `${b.date} ${b.time}`.localeCompare(`${a.date} ${a.time}`,'fr',{numeric:true});
  });}
  function updateBadge(){const count=questions.filter(q=>statusKind(q)!=='done').length;els.badge.textContent=count>99?'99+':String(count);els.badge.classList.toggle('hidden',!count);els.count.textContent=`${count} à traiter`;}
  function fillSubjects(){const current=subject;const values=[...new Set(questions.map(q=>norm(q.matiere)).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'fr'));els.subject.innerHTML='<option value="all">Matière : Toutes</option>'+values.map(v=>`<option value="${escapeHtml(lower(v))}">${escapeHtml(v)}</option>`).join('');els.subject.value=current;}
  function cardHtml(q){
    const kind=statusKind(q);const state=kind==='new'?'Nouvelle':kind==='todo'?'À expliquer':'Expliquée';
    const tag=isStar(q)?'<span class="qe-card__tag qe-card__tag--star">⭐ Vedette</span>':`<span class="qe-card__tag">${isClass(q)?'Classe':'Privée'}</span>`;
    const preview=q.reponse?escapeHtml(q.reponse.replace(/\s+/g,' ')):'Aucune réponse IA enregistrée.';
    const original=q.originale&&q.originale!==q.corrigee?`<strong>Question originale :</strong> ${escapeHtml(q.originale)}\n\n`:'';
    const response=q.reponse?`<strong>Réponse IA :</strong>\n${escapeHtml(q.reponse)}`:'<strong>Réponse IA :</strong> aucune réponse enregistrée.';
    const extras=[q.points?`Points curiosité : ${escapeHtml(q.points)}`:'',q.dateExplication?`Date d’explication : ${escapeHtml(q.dateExplication)}`:''].filter(Boolean).join(' · ');
    return `<article class="qe-card" data-id="${escapeHtml(q.id)}" data-row="${q.rowIndex}">
      <div class="qe-card__top"><div class="qe-card__identity">${escapeHtml(q.prenom||'Élève')} · ${escapeHtml(q.matiere)}</div>${tag}</div>
      <div class="qe-question">${escapeHtml(q.corrigee||'Question sans texte')}</div>
      <div class="qe-meta">${escapeHtml([q.date,q.time].filter(Boolean).join(' · '))}${extras?` · ${extras}`:''}</div>
      <div class="qe-card__body">
        <div class="qe-state"><span class="qe-dot qe-dot--${kind}"></span>${state}</div>
        <div class="qe-actions">
          <button class="qe-btn qe-btn--ai" data-action="detail" type="button">🤖 Réponse IA</button>
          ${kind!=='todo'?'<button class="qe-btn qe-btn--todo" data-action="todo" type="button">À expliquer</button>':''}
          ${kind!=='done'?'<button class="qe-btn qe-btn--done" data-action="done" type="button">✓ Expliquée</button>':''}
          ${isStar(q)?'<span class="qe-btn qe-btn--starstatic">⭐ Vedette</span>':`<button class="qe-btn qe-btn--visibility" data-action="visibility" type="button">${isClass(q)?'👥 Classe':'🔒 Privée'}</button>`}
        </div>
        <div class="qe-preview">${preview}</div>
        <div class="qe-detail">${original}${response}</div>
      </div>
    </article>`;
  }
  function render(){
    updateBadge();fillSubjects();
    document.querySelectorAll('.qe-filter').forEach(b=>b.classList.toggle('is-active',b.dataset.filter===activeFilter));
    const rows=visibleRows();

    if(loading || syncState==='loading'){
      els.status.textContent='Chargement des questions…';
      els.list.innerHTML='<div class="qe-empty"><strong>Connexion au Journal des Questions…</strong>Lecture des données en cours.</div>';
      return;
    }

    if(syncState==='error'){
      els.status.textContent=syncMessage || 'Impossible de récupérer les questions.';
      els.list.innerHTML=`<div class="qe-empty qe-empty--error"><strong>⚠️ Synchronisation impossible</strong>${escapeHtml(syncMessage || 'La réponse de l\'API n\'a pas pu être utilisée.')}<br><small>La liste n'est pas considérée comme vide : utilise ↻ Actualiser après vérification du déploiement API.</small></div>`;
      return;
    }

    els.status.textContent=`${rows.length} question${rows.length>1?'s':''} affichée${rows.length>1?'s':''}`;
    if(rows.length){
      els.list.innerHTML=rows.map(cardHtml).join('');
    }else if(syncState==='success'){
      els.list.innerHTML='<div class="qe-empty"><strong>Aucune question ici</strong>L’API a répondu correctement, mais aucune question ne correspond à ce filtre.</div>';
    }else{
      els.list.innerHTML='<div class="qe-empty"><strong>Aucune donnée chargée</strong>Ouvre ou actualise la fenêtre pour interroger le Journal des Questions.</div>';
    }
  }
  function cacheSave(){try{localStorage.setItem(CACHE_KEY,JSON.stringify({at:Date.now(),questions}));}catch(e){}}
  function cacheLoad(){try{const c=JSON.parse(localStorage.getItem(CACHE_KEY)||'null');if(c&&Array.isArray(c.questions)){questions=c.questions;return Date.now()-Number(c.at||0)<CACHE_MAX_AGE;}}catch(e){}return false;}
  function extractRows(data){if(Array.isArray(data))return data;for(const k of ['questions','data','rows','result','items'])if(Array.isArray(data&&data[k]))return data[k];return [];}
  function jsonpQuestions(params){return new Promise((resolve,reject)=>{const cfg=apiConfig();if(!cfg.url)return reject(new Error('Connexion Maître Hibou non configurée'));const cb='progressionsQuestions_'+Date.now()+'_'+Math.random().toString(36).slice(2);const script=document.createElement('script');let done=false;const finish=(err,data)=>{if(done)return;done=true;clearTimeout(timer);try{delete window[cb]}catch(e){};script.remove();err?reject(err):resolve(data)};const timer=setTimeout(()=>finish(new Error('Délai de connexion dépassé')),20000);window[cb]=data=>{if(!data||data.ok===false||data.success===false)return finish(new Error(data&&data.error||'Réponse API invalide'));finish(null,data)};const q=new URLSearchParams({...params,device_key:cfg.key,tablet_key:cfg.key,key:cfg.key,callback:cb,_:Date.now()});script.async=true;script.src=cfg.url+'?'+q.toString();script.onerror=()=>finish(new Error('Réponse Apps Script indisponible'));document.head.appendChild(script)});}
  async function fetchQuestions(force=false){
    if(loading)return;
    const cfg=apiConfig();

    // V33.83 : l'état d'erreur est conservé jusqu'à une vraie réponse valide.
    // On ne transforme plus une panne API en faux « 0 question ».
    if(!cfg.url){
      syncState='error';
      syncMessage='Connexion Maître Hibou non configurée dans ce navigateur.';
      questions=[];
      render();
      return;
    }

    if(!force && cacheLoad()){
      syncState='success';
      syncMessage='Données en cache.';
      render();
      return;
    }

    loading=true;syncState='loading';syncMessage='';render();
    try{
      const data=await jsonpQuestions({action:'get_questions_classe',limit:'500'});
      const rows=extractRows(data);
      const normalized=rows.map(normalizeRow);
      const validQuestions=normalized.filter(q=>norm(q.corrigee)||norm(q.originale));

      // Ancienne API : l'action inconnue retombe sur getElevesData_().
      const looksLikeStudentFallback=rows.length>0 && validQuestions.length===0 && normalized.some(q=>norm(q.prenom));
      if(looksLikeStudentFallback){
        try{localStorage.removeItem(CACHE_KEY);}catch(e){}
        throw new Error("L’API déployée ne reconnaît pas get_questions_classe (liste des élèves reçue à la place). Redéploie l’API V2.7.5.");
      }

      // Réponse non vide mais sans structure exploitable : diagnostic explicite.
      if(rows.length>0 && validQuestions.length===0){
        throw new Error('La réponse API contient des lignes, mais aucune ne possède « Question corrigée » ou « Question originale ».');
      }

      questions=validQuestions;
      cacheSave();
      syncState='success';
      syncMessage=`Synchronisation réussie : ${questions.length} question${questions.length>1?'s':''} reçue${questions.length>1?'s':''}.`;
    }catch(err){
      questions=[];
      syncState='error';
      syncMessage=`Impossible de synchroniser : ${err && err.message ? err.message : err}.`;
    }finally{
      loading=false;
      render();
    }
  }
  async function updateQuestion(q,changes){
    const cfg=apiConfig();if(!cfg.url){els.status.textContent='Connexion Maître Hibou non configurée.';return false;}
    const payload={action:'update_question',key:cfg.key,device_key:cfg.key,tablet_key:cfg.key,id:q.id,rowIndex:q.rowIndex,row_number:q.rowIndex,...changes};
    try{
      els.status.textContent='Enregistrement…';
      const r=await fetch(cfg.url,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(payload)});const data=await r.json();
      if(data&&(data.ok===false||data.success===false))throw new Error(data.error||'Erreur API');
      Object.assign(q,changes.status?{status:changes.status}:{},changes.visibility?{visibility:changes.visibility}:{});if(changes.dateExplication)q.dateExplication=changes.dateExplication;cacheSave();render();return true;
    }catch(err){els.status.textContent=`Modification non enregistrée : ${err.message}.`;return false;}
  }
  function localDate(){return new Intl.DateTimeFormat('fr-FR',{day:'2-digit',month:'2-digit',year:'numeric'}).format(new Date());}
  function findCardQuestion(card){return questions.find(q=>String(q.id)===String(card.dataset.id)&&String(q.rowIndex)===String(card.dataset.row))||questions.find(q=>String(q.id)===String(card.dataset.id));}
  function open(){els.modal.classList.remove('hidden');els.modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';fetchQuestions(true);setTimeout(()=>els.close.focus(),0);}
  function close(){els.modal.classList.add('hidden');els.modal.setAttribute('aria-hidden','true');document.body.style.overflow='';els.trigger.focus();}
  function init(){
    Object.assign(els,{trigger:document.getElementById('openQuestionsElevesBtn'),badge:document.getElementById('questionsElevesBadge'),modal:document.getElementById('questionsElevesModal'),close:document.getElementById('closeQuestionsElevesBtn'),count:document.getElementById('questionsElevesCount'),subject:document.getElementById('questionsElevesSubject'),status:document.getElementById('questionsElevesStatus'),list:document.getElementById('questionsElevesList'),refresh:document.getElementById('refreshQuestionsElevesBtn')});
    if(Object.values(els).some(v=>!v))return;
    cacheLoad();render();
    els.trigger.addEventListener('click',open);els.close.addEventListener('click',close);els.refresh.addEventListener('click',()=>fetchQuestions(true));
    els.modal.addEventListener('click',e=>{if(e.target===els.modal)close();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!els.modal.classList.contains('hidden'))close();});
    document.querySelectorAll('.qe-filter').forEach(b=>b.addEventListener('click',()=>{activeFilter=b.dataset.filter;render();}));
    els.subject.addEventListener('change',()=>{subject=els.subject.value;render();});
    els.list.addEventListener('click',async e=>{
      const btn=e.target.closest('[data-action]'),card=e.target.closest('.qe-card');if(!btn||!card)return;const q=findCardQuestion(card);if(!q)return;
      const action=btn.dataset.action;if(action==='detail'){card.classList.toggle('is-open');btn.textContent=card.classList.contains('is-open')?'Masquer le détail':'🤖 Réponse IA';return;}
      if(action==='todo')await updateQuestion(q,{status:'À expliquer'});
      if(action==='done')await updateQuestion(q,{status:'Expliquée',dateExplication:localDate()});
      if(action==='visibility')await updateQuestion(q,{visibility:isClass(q)?'privée':'classe'});
    });
    // V33.83 : pas de préchargement silencieux ; l'ouverture force une lecture fraîche.
    if(!apiConfig().url){syncState='error';syncMessage='Connexion Maître Hibou non configurée dans ce navigateur.';render();}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
