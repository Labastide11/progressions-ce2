(function(){
  'use strict';
  const ROSTER_KEY='progressions_ce2_classe_meta_v1';
  const STORE_KEY='progressions_ce2_groups_v1';
  const $=id=>document.getElementById(id);
  const openBtn=$('openGroupMakerBtn'), modal=$('groupMakerModal'), closeBtn=$('closeGroupMakerBtn');
  const mode=$('groupMakerMode'), value=$('groupMakerValue'), label=$('groupMakerValueLabel');
  const createBtn=$('createGroupsBtn'), reshuffleBtn=$('reshuffleGroupsBtn'), clearBtn=$('clearGroupsBtn');
  const results=$('groupMakerResults'), status=$('groupMakerStatus'), context=$('groupMakerContext');
  if(!openBtn||!modal||!closeBtn||!mode||!value||!createBtn||!results)return;
  const norm=v=>String(v||'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const today=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
  const readJson=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key)||'')||fallback;}catch(e){return fallback;}};
  function students(){
    const apiRows=window.ProgressionsRoster?.getMeta?.();
    const local=readJson(ROSTER_KEY,{});
    const rows=Array.isArray(apiRows)&&apiRows.length?apiRows:Object.values(local||{});
    return rows.filter(r=>r&&r.prenom).sort((a,b)=>String(a.prenom).localeCompare(String(b.prenom),'fr',{sensitivity:'base'}));
  }
  const display=s=>[s.prenom,String(s.nom||'').toUpperCase()].filter(Boolean).join(' ');
  function shuffle(items){
    const a=items.slice();
    for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
    return a;
  }
  function build(){
    const rows=shuffle(students());
    if(!rows.length){results.innerHTML='<div class="group-maker-placeholder">Aucun élève disponible.</div>';return;}
    let n=Math.max(2,Number(value.value)||2);
    let groupCount=mode.value==='size'?Math.ceil(rows.length/n):Math.min(n,rows.length);
    const groups=Array.from({length:groupCount},()=>[]);
    rows.forEach((student,i)=>groups[i%groupCount].push(display(student)));
    const data={date:today(),context:context.value,mode:mode.value,value:n,groups};
    localStorage.setItem(STORE_KEY,JSON.stringify(data));
    render(data);
  }
  function render(data){
    if(!data||data.date!==today()||!Array.isArray(data.groups)){results.innerHTML='<div class="group-maker-placeholder">Choisis une organisation puis crée les groupes.</div>';return;}
    context.value=data.context||'classe'; mode.value=data.mode||'count'; value.value=data.value||4; updateLabel();
    const word=context.value==='sport'?'Équipe':'Groupe';
    results.innerHTML=data.groups.map((g,i)=>`<section class="group-card"><h3>${word} ${i+1}</h3><ol>${g.map(name=>`<li>${esc(name)}</li>`).join('')}</ol></section>`).join('');
    status.textContent=`${data.groups.length} ${data.groups.length>1?(context.value==='sport'?'équipes':'groupes'):(context.value==='sport'?'équipe':'groupe')} enregistrés pour aujourd’hui.`;
  }
  function updateLabel(){label.textContent=mode.value==='size'?'Élèves par groupe':'Nombre de groupes';value.max=mode.value==='size'?'12':'12';}
  async function open(){modal.classList.remove('hidden');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');try{await window.ProgressionsRoster?.refresh?.();}catch(e){}render(readJson(STORE_KEY,null));}
  function close(){modal.classList.add('hidden');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');openBtn.focus();}
  mode.addEventListener('change',updateLabel); createBtn.addEventListener('click',build); reshuffleBtn.addEventListener('click',build);
  clearBtn.addEventListener('click',()=>{localStorage.removeItem(STORE_KEY);render(null);status.textContent='Les groupes du jour ont été effacés.';});
  openBtn.addEventListener('click',open); closeBtn.addEventListener('click',close);
  modal.addEventListener('click',e=>{if(e.target===modal)close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.classList.contains('hidden'))close();});
})();
