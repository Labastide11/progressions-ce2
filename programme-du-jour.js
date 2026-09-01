
(function(){
  'use strict';
  const $=id=>document.getElementById(id);
  const openBtns=[...document.querySelectorAll('[data-open-daily-program]')], modal=$('dailyProgramModal');
  if(!openBtns.length||!modal) return;

  const closeBtn=$('closeDailyProgramBtn');
  const dateInput=$('dailyProgramDate');
  const periodSelect=$('dailyProgramPeriod');
  const fontSelect=$('dailyProgramFont');
  const list=$('dailyProgramList');
  const reloadBtn=$('dailyProgramReloadBtn');
  const addBtn=$('dailyProgramAddBtn');
  const projectBtn=$('dailyProgramProjectBtn');
  const copyBtn=$('dailyProgramCopyBtn');
  const saveDayBtn=$('dailyProgramSaveBtn');
  const syncStatus=$('dailyProgramSyncStatus');
  const projection=$('dailyProgramProjection');
  const projectionTitle=$('dailyProgramProjectionTitle');
  const projectionList=$('dailyProgramProjectionList');
  const projectionClose=$('closeDailyProgramProjectionBtn');
  const projectionClock=$('dailyProgramProjectionClock');
  const FONT_KEY='progressions_ce2_programme_font_v1';
  const JOURNAL_API='https://script.google.com/macros/s/AKfycbz25e9hIn7jgZuI2gzLNwqinvo_zTegoicJSeEzNaHDEfCTrEz52MIJREvFM5rvx7Yswg/exec';
  const DEVICE_KEY_STORAGE='hibou_sync_device_key_v25754';
  const professionalKey=()=>{try{return String(localStorage.getItem(DEVICE_KEY_STORAGE)||'').trim()}catch(e){return ''}};
  async function journalApi(payload){const deviceKey=professionalKey();if(!deviceKey)throw new Error('Clé professionnelle absente sur cet appareil.');const body={...payload,device_key:deviceKey,tablet_key:deviceKey,key:deviceKey};const response=await fetch(JOURNAL_API,{method:'POST',cache:'no-store',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(body)});const data=await response.json();if(!data||data.success!==true)throw new Error(data&&data.error||'Réponse API invalide');return data;}

  const weekdays=['dimanche','lundi','mardi','mercredi','jeudi','vendredi','samedi'];
  const iconMap={french:'📖',maths:'🧮',english:'🇬🇧',eps:'🏃',arts:'🎨',science:'🔬',history:'🌍',emc:'🤝',cham:'🎵',break:'🤸',lunch:'🍽️',mixed:'✏️',common:'🧩'};
  const colorMap={french:'#e65d77',maths:'#4d83db',english:'#8768d6',eps:'#32a56a',arts:'#e58a36',science:'#2aa7b7',history:'#d5a127',emc:'#7da842',cham:'#c45bcf',break:'#94a3b8',lunch:'#c58b63',mixed:'#65758b',common:'#7c62c8'};
  const fontFamilies={
    cursif:'Cursif',
    crayonl:'CrayonL',
    plumndl:'PlumNDL',
    arial:'Arial',
    calibri:'Calibri',
    verdana:'Verdana'
  };
  function updateFontAvailability(){
    if(!fontSelect||!document.fonts)return;
    fontSelect.querySelectorAll('option').forEach(option=>{
      const family=fontFamilies[option.value];
      if(!family)return;
      const available=document.fonts.check(`20px "${family}"`);
      option.textContent=option.textContent.replace(/ ⚠$/, '')+(available?'':' ⚠');
      option.dataset.available=String(available);
    });
    let note=$('dailyProgramFontNote');
    if(!note){note=document.createElement('div');note.id='dailyProgramFontNote';note.className='daily-program-font-note';fontSelect.closest('label').insertAdjacentElement('afterend',note)}
    const selected=fontSelect.selectedOptions[0];
    const missing=selected&&selected.dataset.available==='false';
    note.textContent=missing?'Cette police doit être installée sur ce PC pour être utilisée.':'Police détectée sur ce PC.';
    note.classList.toggle('is-warning',missing);
  }
  let items=[];
  let draggedId=null;
  let projectionClockTimer=null;

  const todayISO=()=>new Date().toISOString().slice(0,10);
  const storageKey=()=>`progressions_ce2_programme_du_jour_${dateInput.value}`;
  const journalSavedKey=()=>`progressions_ce2_journal_saved_${dateInput.value}`;
  let saveDayInFlight=false;
  const read=()=>{try{const value=JSON.parse(localStorage.getItem(storageKey())||'null');return Array.isArray(value)?value:null}catch(e){return null}};
  function setSyncStatus(state,message){
    if(!syncStatus)return;
    syncStatus.className=`daily-program-sync-status is-${state}`;
    syncStatus.textContent=message;
  }
  function notifyJournalUpdate(reason='update'){
    try{
      window.dispatchEvent(new CustomEvent('progressions:programme-du-jour-updated',{detail:{date:dateInput.value,reason,items:items.map(item=>({...item}))}}));
      document.dispatchEvent(new CustomEvent('progressions:programme-du-jour-updated',{detail:{date:dateInput.value,reason,items:items.map(item=>({...item}))}}));
    }catch(e){}
  }
  const save=(reason='update')=>{try{localStorage.setItem(storageKey(),JSON.stringify(items));setSyncStatus(reason==='validation'?'synced':'local',reason==='validation'?'● Cahier journal actualisé':'● Sauvegarde locale');notifyJournalUpdate(reason)}catch(e){setSyncStatus('error','● Erreur de sauvegarde locale')}};
  const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function defaultPeriod(){
    return 'rentree';
  }
  const domainLabels={french:'Français',maths:'Mathématiques',english:'Anglais',eps:'EPS',arts:'Arts',science:'Sciences',history:'Histoire-Géographie',emc:'EMC',cham:'CHAM',break:'Récréation',lunch:'Pause méridienne',mixed:'Activité transversale',common:'Vie de classe'};
  function kindFromDomain(domain){
    const value=String(domain||'').toLowerCase();
    if(value.includes('français'))return 'french';
    if(value.includes('math'))return 'maths';
    if(value.includes('anglais'))return 'english';
    if(value.includes('eps')||value.includes('sport'))return 'eps';
    if(value.includes('art'))return 'arts';
    if(value.includes('science'))return 'science';
    if(value.includes('histoire')||value.includes('géo'))return 'history';
    if(value.includes('emc'))return 'emc';
    if(value.includes('cham'))return 'cham';
    if(value.includes('récré'))return 'break';
    if(value.includes('pause')||value.includes('mérid'))return 'lunch';
    return 'common';
  }
  function makeId(){return `${Date.now()}_${Math.random().toString(36).slice(2,8)}`}
  function pedagogicalDefaults(title,kind,detail){
    const value=String(title||'').trim().toLowerCase();
    if(kind==='break'||kind==='lunch')return {objective:'',competence:''};
    if(value==='copie'||value.startsWith('copie '))return {
      objective:'Amener les élèves à copier par groupes de mots en respectant la présentation et en se relisant.',
      competence:'Copier avec efficacité et se relire.'
    };
    return {objective:detail||'',competence:detail||''};
  }
  function buildFromTimetable(){
    const date=new Date(dateInput.value+'T12:00:00');
    const day=weekdays[date.getDay()];
    const api=window.ProgressionsEDT;
    const rows=api&&api.getDayRows?api.getDayRows(day,periodSelect.value):[];
    items=rows.map(row=>{
      const time=row[0]||'', title=row[1]||'', detail=row[2]||'', kind=row[3]||'common';
      const pedagogy=pedagogicalDefaults(title,kind,detail);
      return {id:makeId(),time,title,detail,kind,done:false,hidden:false,objective:pedagogy.objective,competence:pedagogy.competence,status:'Prévue',remark:''};
    });
    save();render();
  }
  async function loadForDate(){
    const saved=read();
    if(saved){items=saved;render();setSyncStatus('local','● Sauvegarde locale');return}
    setSyncStatus('loading','● Recherche dans le cahier journal…');
    try{
      const data=await journalApi({action:'jour',date:dateInput.value});
      if(data&&data.success&&Array.isArray(data.seances)&&data.seances.length){
        items=data.seances.map((s,index)=>({
          id:s.idJour?`${s.idJour}_${index}`:makeId(),
          time:s.horaire||'',
          title:s.activite||'Activité',
          detail:s.competenceEleve||s.objectifMaitre||'',
          kind:kindFromDomain(s.domaine),
          done:String(s.statut||'').toLowerCase().startsWith('réalis'),
          hidden:String(s.statut||'').toLowerCase()==='annulée',
          objective:s.objectifMaitre||'',
          competence:s.competenceEleve||'',
          status:s.statut||'Prévue',
          remark:s.remarque||''
        }));
        try{localStorage.setItem(storageKey(),JSON.stringify(items))}catch(e){}
        render();setSyncStatus('synced','● Journée chargée depuis Google Sheet');return;
      }
    }catch(e){}
    buildFromTimetable();
  }
  function render(){
    const visible=items.filter(x=>!x.hidden);
    if(!visible.length){
      list.innerHTML='<div class="daily-program-empty">Aucune activité pour cette journée. Choisis une date de classe ou ajoute une activité.</div>';
      return;
    }
    list.innerHTML=visible.map(item=>`<article class="daily-program-card ${item.done?'is-done':''}" draggable="true" data-id="${esc(item.id)}" style="--card-accent:${colorMap[item.kind]||colorMap.common}">
      <button class="daily-program-handle" type="button" title="Déplacer">⋮⋮</button>
      <span class="daily-program-time">${esc(item.time)}</span>
      <span class="daily-program-icon">${iconMap[item.kind]||'📌'}</span>
      <div class="daily-program-main">
        <input class="daily-program-title" data-title="${esc(item.id)}" value="${esc(item.title)}" aria-label="Titre de l’activité">
        ${item.detail?`<small class="daily-program-detail">${esc(item.detail)}</small>`:''}
      </div>
      <div class="daily-program-actions">
        <button type="button" data-done="${esc(item.id)}" title="${item.done?'Remettre à faire':'Marquer comme fait'}">${item.done?'↩':'✓'}</button>
        <button type="button" data-hide="${esc(item.id)}" title="Masquer pour aujourd’hui">👁</button>
        <button type="button" data-delete="${esc(item.id)}" title="Retirer">×</button>
      </div>
    </article>`).join('');
    bindCards();
  }
  function bindCards(){
    list.querySelectorAll('[data-title]').forEach(input=>input.addEventListener('change',()=>{const x=items.find(i=>i.id===input.dataset.title);if(x){x.title=input.value.trim()||'Activité';save();renderProjection()}}));
    list.querySelectorAll('[data-done]').forEach(btn=>btn.onclick=()=>{const x=items.find(i=>i.id===btn.dataset.done);if(x){x.done=!x.done;x.status=x.done?'Réalisée':'Prévue';save('validation');render()}});
    list.querySelectorAll('[data-hide]').forEach(btn=>btn.onclick=()=>{const x=items.find(i=>i.id===btn.dataset.hide);if(x){x.hidden=true;save();render()}});
    list.querySelectorAll('[data-delete]').forEach(btn=>btn.onclick=()=>{items=items.filter(i=>i.id!==btn.dataset.delete);save();render()});
    list.querySelectorAll('.daily-program-card').forEach(card=>{
      card.addEventListener('dragstart',()=>{draggedId=card.dataset.id;card.classList.add('is-dragging')});
      card.addEventListener('dragend',()=>{draggedId=null;card.classList.remove('is-dragging')});
      card.addEventListener('dragover',e=>e.preventDefault());
      card.addEventListener('drop',e=>{
        e.preventDefault();
        const targetId=card.dataset.id;
        if(!draggedId||draggedId===targetId)return;
        const from=items.findIndex(x=>x.id===draggedId), to=items.findIndex(x=>x.id===targetId);
        if(from<0||to<0)return;
        const [moved]=items.splice(from,1);items.splice(to,0,moved);save();render();
      });
    });
  }
  function formattedDate(){
    const d=new Date(dateInput.value+'T12:00:00');
    return new Intl.DateTimeFormat('fr-FR',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(d).replace(/^./,c=>c.toUpperCase());
  }
  function startMinutes(time){
    const raw=String(time||'').trim().toLowerCase().replace(/\s/g,'');
    const match=raw.match(/^(\d{1,2})h(?:(\d{1,2}))?/);
    if(!match)return 9999;
    return Number(match[1])*60+Number(match[2]||0);
  }
  function cardHtml(item){return `<article class="daily-program-projection-card ${item.done?'is-done':''}" data-kind="${esc(item.kind)}" style="--card-accent:${colorMap[item.kind]||colorMap.common}">
      <span class="daily-program-projection-icon">${iconMap[item.kind]||'📌'}</span>
      <div><small>${esc(item.time)}</small><strong>${esc(item.title)}</strong></div>
    </article>`}
  function groupHtml(title,icon,group,extraClass=''){
    return `<section class="daily-program-group ${extraClass}"><h3>${icon} ${title}</h3><div class="daily-program-group__items">${group.length?group.map(cardHtml).join(''):'<div class="daily-program-group__empty">Aucune activité</div>'}</div></section>`;
  }
  function splitVisibleItems(){
    const morning=[],midday=[],afternoon=[];
    items.filter(x=>!x.hidden).forEach(item=>{
      const mins=startMinutes(item.time);
      if(item.kind==='lunch'||(mins>=720&&mins<840))midday.push(item);
      else if(mins<780)morning.push(item);
      else afternoon.push(item);
    });
    return {morning,midday,afternoon};
  }
  function copyLine(item){
    const time=String(item.time||'').trim();
    const title=String(item.title||'Activité').trim();
    return time?`${time} – ${title}`:title;
  }
  function buildCopyText(){
    const {morning,midday,afternoon}=splitVisibleItems();
    const lines=[`Notre programme — ${formattedDate()}`,''];
    const addGroup=(title,group)=>{
      if(!group.length)return;
      lines.push(title);
      group.forEach(item=>lines.push(copyLine(item)));
      lines.push('');
    };
    addGroup('Matin',morning);
    addGroup('Pause méridienne',midday);
    addGroup('Après-midi',afternoon);
    return lines.join('\n').trim();
  }
  async function copyProgram(){
    const text=buildCopyText();
    if(!text)return;
    let copied=false;
    try{
      if(navigator.clipboard&&window.isSecureContext){
        await navigator.clipboard.writeText(text);
        copied=true;
      }
    }catch(e){}
    if(!copied){
      const area=document.createElement('textarea');
      area.value=text;
      area.setAttribute('readonly','');
      area.style.position='fixed';
      area.style.opacity='0';
      document.body.appendChild(area);
      area.select();
      try{copied=document.execCommand('copy')}catch(e){}
      area.remove();
    }
    const initial='📋 Copier le programme';
    copyBtn.textContent=copied?'✓ Programme copié !':'Copie impossible';
    copyBtn.classList.toggle('is-copied',copied);
    setTimeout(()=>{copyBtn.textContent=initial;copyBtn.classList.remove('is-copied')},1800);
  }
  function weekNumber(date){
    const d=new Date(Date.UTC(date.getFullYear(),date.getMonth(),date.getDate()));
    const day=d.getUTCDay()||7;d.setUTCDate(d.getUTCDate()+4-day);
    const yearStart=new Date(Date.UTC(d.getUTCFullYear(),0,1));
    return Math.ceil((((d-yearStart)/86400000)+1)/7);
  }
  function periodLabel(){
    const value=periodSelect.value;
    return value==='rentree'?'Rentrée':value.toUpperCase();
  }
  function buildDayPayload(){
    const date=new Date(dateInput.value+'T12:00:00');
    const day=weekdays[date.getDay()];
    const seances=items.filter(x=>!x.hidden).map((item,index)=>({
      horaire:item.time||'',
      domaine:domainLabels[item.kind]||'Vie de classe',
      activite:item.title||'Activité',
      objectifMaitre:item.objective||item.detail||'',
      competenceEleve:item.competence||item.detail||'',
      statut:item.status||(item.done?'Réalisée':'Prévue'),
      remarque:item.remark||'',
      ordre:index+1
    }));
    return {action:'enregistrerJour',date:dateInput.value,jour:day.charAt(0).toUpperCase()+day.slice(1),semaine:weekNumber(date),periode:periodLabel(),seances};
  }
  async function saveDayToJournal(){
    if(saveDayInFlight)return;
    const alreadySaved=localStorage.getItem(journalSavedKey());
    if(alreadySaved){
      setSyncStatus('synced','● Journée déjà enregistrée dans le cahier journal');
      saveDayBtn.disabled=true;
      saveDayBtn.textContent='✓ Journée déjà enregistrée';
      return;
    }
    save();
    setSyncStatus('loading','● Vérification du cahier journal…');
    saveDayInFlight=true;
    saveDayBtn.disabled=true;
    const initial='💾 Enregistrer la journée';
    try{
      let checkData;
      try{
        checkData=await journalApi({action:'jour',date:dateInput.value});
      }catch(error){
        throw new Error('Impossible de vérifier le Google Sheet : aucun nouvel enregistrement n’a été envoyé.');
      }
      if(!checkData||checkData.success!==true||!Array.isArray(checkData.seances)){
        throw new Error('Réponse de vérification invalide : aucun nouvel enregistrement n’a été envoyé.');
      }
      const exists=checkData.seances.some(seance=>String(seance.date||dateInput.value).slice(0,10)===dateInput.value);
      if(exists){
        localStorage.setItem(journalSavedKey(),new Date().toISOString());
        setSyncStatus('synced','● Cette journée existe déjà dans Google Sheet');
        saveDayBtn.textContent='✓ Journée déjà enregistrée';
        return;
      }
      setSyncStatus('loading','● Synchronisation en cours…');
      await journalApi(buildDayPayload());
      localStorage.setItem(journalSavedKey(),new Date().toISOString());
      setSyncStatus('synced','● Synchronisé avec Google Sheet');
      saveDayBtn.textContent='✓ Journée enregistrée';
    }catch(error){
      setSyncStatus('error',`● ${error.message||'Local conservé — synchronisation impossible'}`);
      saveDayBtn.textContent='⚠ Réessayer';
      saveDayBtn.disabled=false;
      console.error('Cahier journal :',error);
    }finally{
      saveDayInFlight=false;
      if(!localStorage.getItem(journalSavedKey()))setTimeout(()=>{saveDayBtn.textContent=initial},2200);
    }
  }

  function refreshJournalSaveButton(){
    if(!saveDayBtn)return;
    const saved=Boolean(localStorage.getItem(journalSavedKey()));
    saveDayBtn.disabled=saved;
    saveDayBtn.textContent=saved?'✓ Journée déjà enregistrée':'💾 Enregistrer la journée';
  }

  function updateProjectionClock(){
    if(!projectionClock)return;
    const now=new Date();
    const time=new Intl.DateTimeFormat('fr-FR',{hour:'2-digit',minute:'2-digit'}).format(now);
    projectionClock.textContent=`🕒 ${time}`;
  }

  function renderProjection(){
    projectionTitle.textContent=formattedDate();
    projection.dataset.font=fontSelect.value||'school';
    const {morning,midday,afternoon}=splitVisibleItems();
    projectionList.innerHTML=`<div class="daily-program-groups">${groupHtml('Matin','☀️',morning,'daily-program-group--morning')}${groupHtml('Après-midi','🌤️',afternoon,'daily-program-group--afternoon')}</div>${midday.length?`<section class="daily-program-midday"><h3>🍽️ Pause méridienne</h3><div>${midday.map(cardHtml).join('')}</div></section>`:''}`;
  }
  function open(){
    dateInput.value=dateInput.value||todayISO();
    periodSelect.value=defaultPeriod();
    fontSelect.value=localStorage.getItem(FONT_KEY)||'cursif';
    updateFontAvailability();
    loadForDate();
    refreshJournalSaveButton();
    modal.classList.remove('hidden');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
  }
  function close(){modal.classList.add('hidden');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''}
  function closeProjection(){projection.classList.add('hidden');projection.setAttribute('aria-hidden','true');if(projectionClockTimer){clearInterval(projectionClockTimer);projectionClockTimer=null;}}

  openBtns.forEach(btn=>btn.addEventListener('click', open));
  closeBtn.onclick=close;
  modal.addEventListener('click',e=>{if(e.target===modal)close()});
  dateInput.onchange=()=>{periodSelect.value=defaultPeriod();loadForDate();refreshJournalSaveButton()};
  periodSelect.onchange=buildFromTimetable;
  fontSelect.onchange=()=>{localStorage.setItem(FONT_KEY,fontSelect.value);updateFontAvailability();if(!projection.classList.contains('hidden'))renderProjection()};
  reloadBtn.onclick=()=>{if(confirm('Recharger cette journée depuis l’emploi du temps ? Les modifications de cette date seront remplacées.'))buildFromTimetable()};
  addBtn.onclick=()=>{
    const title=prompt('Nom de l’activité à ajouter :','Imprévu');
    if(!title)return;
    items.push({id:makeId(),time:'',title:title.trim(),detail:'',kind:'common',done:false,hidden:false,objective:'',competence:'',status:'Ajoutée',remark:''});save();render();
  };
  copyBtn.onclick=copyProgram;
  saveDayBtn.onclick=saveDayToJournal;
  projectBtn.onclick=()=>{renderProjection();projection.classList.remove('hidden');projection.setAttribute('aria-hidden','false');updateProjectionClock();if(projectionClockTimer)clearInterval(projectionClockTimer);projectionClockTimer=setInterval(updateProjectionClock,30000)};
  projectionClose.onclick=closeProjection;
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!projection.classList.contains('hidden'))closeProjection();else if(!modal.classList.contains('hidden'))close()}});
})();
