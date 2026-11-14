/* Progressions CE2 — une source hebdomadaire unique pour les prises en charge.
   Données d'organisation enseignante, jamais affichées avec les prénoms sur la page TBI.
   Les créneaux incertains ne produisent pas de faux effectifs certains. */
(function(){
'use strict';
const KEY='progressionsCE2.prisesEnChargePlanning.v1';
const DEFAULTS=[
  {id:'upe2a',name:'UPE2A',kind:'out',students:['Élève UPE2A'],days:[1,2,4,5],start:'09:00',end:'10:45',note:'Avec l’enseignante d’UPE2A',certainty:'confirmed'},
  {id:'aide-e',name:'Aide E — Lecture',kind:'out',students:['Élève Aide E 1','Élève Aide E 2','Élève Aide E 3','Élève Aide E 4'],days:[2,4],start:'11:00',end:'12:00',note:'Prise en charge lecture',certainty:'confirmed'},
  {id:'cham-lundi',name:'CHAM',kind:'out',students:['Élève CHAM 1','Élève CHAM 2','Élève CHAM 3'],days:[1],start:'11:00',end:'12:00',note:'Groupe CHAM — 3 élèves',certainty:'confirmed'},
  {id:'cham-mardi',name:'CHAM',kind:'out',students:['Élève CHAM 1','Élève CHAM 2','Élève CHAM 3'],days:[2],start:'',end:'',note:'Mardi après-midi ; horaire précis à confirmer. Départ déduit uniquement des séances explicitement CHAM.',certainty:'unconfirmed'},
  {id:'ulis',name:'Inclusion ULIS',kind:'in',students:['Élève ULIS 1','Élève ULIS 2','Élève ULIS 3'],days:[1,2,4,5],start:'14:00',end:'15:45',note:'Trois élèves accueillis ; à vérifier les jours de sorties (piscine, etc.).',certainty:'confirmed'},
  {id:'aide-g',name:'Aide G — Maîtresse Delphine',kind:'out',students:['Élève Aide G'],days:[2],start:'15:00',end:'',note:'Deuxième créneau, début provisoire à 15h ; fin à confirmer.',certainty:'provisional'}
];
const DAYS=['','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];
const clone=x=>JSON.parse(JSON.stringify(x));
function read(){try{const data=JSON.parse(localStorage.getItem(KEY)||'null');if(Array.isArray(data)&&data.length)return data;}catch(e){}return clone(DEFAULTS);}
let planning=read();
function save(){try{localStorage.setItem(KEY,JSON.stringify(planning));}catch(e){}document.dispatchEvent(new CustomEvent('ce2:prise-en-charge-changed'));}
function minutes(s){if(!s)return null;let m=String(s).trim().match(/^(\d{1,2})\s*[h:]\s*(\d{0,2})$/i);return m?(+m[1])*60+(+(m[2]||0)):null;}
function timeLabel(v){return String(v||'').replace(':','h').replace(/h00$/,'h');}
function slot(t){let m=String(t||'').replace(/[—–−]/g,'-').match(/(\d{1,2}\s*[h:]\s*\d{0,2})\s*-\s*(\d{1,2}\s*[h:]\s*\d{0,2})/i);return m?{start:minutes(m[1]),end:minutes(m[2])}:null;}
function weekday(s){let m=String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().match(/lundi|mardi|mercredi|jeudi|vendredi/);if(!m)return null;return {'lundi':1,'mardi':2,'mercredi':3,'jeudi':4,'vendredi':5}[m[0]];}
function at(d,t,activity){
  let incoming=new Set(),outgoing=new Set(),uncertain=[],notes=[];
  for(const x of planning){if(!x.days.includes(d))continue;
    let start=minutes(x.start),end=minutes(x.end),match=false;
    if(x.id==='cham-mardi'){if(start!==null&&end!==null)match=t>=start&&t<end;else if(t>=12*60+15){uncertain.push(x);continue;}}
    else if(start!==null&&end!==null)match=t>=start&&t<end;
    else if(x.id==='aide-g'&&start!==null&&t>=start&&t<17*60+15){uncertain.push(x);continue;}
    if(!match)continue;
    if(x.kind==='in')x.students.forEach(n=>incoming.add(n));else x.students.forEach(n=>outgoing.add(n));notes.push(x);
  }
  // Un enfant n'est compté qu'une fois même si des créneaux se chevauchent.
  for(const n of outgoing)incoming.delete(n);
  return {inside:14+incoming.size-outgoing.size,arrivals:[...incoming],departures:[...outgoing],notes,uncertain};
}
function segments(d,range,activity){
 if(!range)return [];
 let bounds=[range.start,range.end];
 for(const x of planning){if(!x.days.includes(d))continue;for(const k of ['start','end']){const m=minutes(x[k]);if(m!==null&&m>range.start&&m<range.end)bounds.push(m);}}
 bounds=[...new Set(bounds)].sort((a,b)=>a-b);
 let chunks=[];for(let i=0;i<bounds.length-1;i++){let start=bounds[i],end=bounds[i+1];if(end>start){let r=at(d,start,activity);chunks.push({start,end,...r});}}
 // Regroupement de créneaux contigus avec la même situation.
 return chunks.reduce((acc,x)=>{let p=acc[acc.length-1],key=(a)=>a.inside+'|'+a.departures.join(',')+'|'+a.arrivals.join(',')+'|'+a.uncertain.map(z=>z.id).join(',');if(p&&key(p)===key(x)){p.end=x.end;}else acc.push(x);return acc;},[]);
}
const clock=n=>Math.floor(n/60)+'h'+String(n%60).padStart(2,'0');
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function formatSegments(day,range,activity,privateMode){let ss=segments(day,range,activity);if(!ss.length)return '';return ss.map((s)=>{
 let list=[];
 for(let x of s.notes){list.push(x.name+(privateMode?' : '+x.students.join(', '):''));}
 for(let x of s.uncertain){list.push(x.name+(privateMode?' : '+x.students.join(', '):'')+' (horaire provisoire)');}
 let approx=s.uncertain.length?' · effectif à confirmer':'';
 let total=s.inside+' en classe (prévu)'+approx;
 let note=list.join(' · ');
 return '<span class="ce2-effectif-part"><strong>'+escapeHtml(ss.length>1?clock(s.start)+'–'+clock(s.end)+' : '+total:total)+'</strong>'+(note?'<span>'+escapeHtml(note)+'</span>':'')+'</span>';
 }).join('');}
function addStyle(){if(document.getElementById('ce2-supports-style'))return;let st=document.createElement('style');st.id='ce2-supports-style';st.textContent=`
 .ce2-planning{margin:16px 0;padding:16px;border:1px solid #c3d6e7;background:#f6faff;border-radius:16px;color:#173b5c}
 .ce2-planning h3{margin:0 0 8px;font-size:1.22rem}
 .ce2-planning p{margin:4px 0 12px;line-height:1.35}
 .ce2-plan-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:9px}
 .ce2-plan-card{background:#fff;border:1px solid #c8d8e6;border-radius:12px;padding:12px}
 .ce2-plan-card strong{display:block;color:#15385c;font-size:1.03rem}
 .ce2-plan-card .ce2-plan-sub{font-size:.93rem;margin-top:4px}
 .ce2-plan-card small{display:block;color:#577087;line-height:1.35;margin-top:6px}
 .ce2-plan-controls input.ce2-student-input{width:100%;max-width:none;min-width:0} .ce2-plan-controls label.ce2-name-label{flex:1 1 100%}
 .ce2-plan-controls{display:flex;gap:8px;align-items:end;flex-wrap:wrap;margin-top:8px}
 .ce2-plan-controls label{display:grid;gap:3px;font-size:.78rem;font-weight:800}
 .ce2-plan-controls input{max-width:110px;border:1px solid #adc7d9;border-radius:7px;padding:6px}
 .ce2-plan-controls button{padding:8px 11px;border:1px solid #277a76;background:#e3f6f3;color:#115a57;border-radius:8px;font-weight:800;cursor:pointer}
 .ce2-count-summary{padding:10px 13px;margin:12px 0;border:1px solid #c6d8e6;border-left:5px solid #137c78;border-radius:10px;background:#f2faf9;font-size:.96rem}
 .ce2-effectif-line{display:flex;flex-wrap:wrap;gap:7px;padding:7px 9px;background:#edf9f7;border:1px solid #c6e5e1;border-radius:8px;margin-top:9px;font-size:.81rem;line-height:1.35;color:#174d4a}
 .ce2-effectif-part{display:inline-flex;flex-direction:column;gap:2px;min-width:150px}
 .ce2-effectif-part+ .ce2-effectif-part{border-left:1px solid #a8d8d2;padding-left:9px}
 .ce2-count-notes{margin:5px 0 0;font-size:.82rem;color:#556b77}
 .ce2-public-marker{font-weight:700;color:#285b6d;padding:6px 14px;background:#f3faff;border:1px solid #cee1ed;border-radius:9px;margin:2px 0 8px}
 @media print{.ce2-plan-controls{display:none}}
 `;document.head.appendChild(st);}
function dayList(x){return x.days.map(n=>DAYS[n]).join(', ');}
function renderPlanning(){const modal=document.getElementById('supportsModal');if(!modal)return;
 let host=modal.querySelector('.ce2-planning');if(!host){host=document.createElement('section');host.className='ce2-planning';let target=modal.querySelector('.supports-privacy');if(target)target.insertAdjacentElement('afterend',host);else modal.querySelector('.supports-panel')?.appendChild(host);}
 let html='<h3>Organisation hebdomadaire des prises en charge</h3><p>Effectif de référence : <strong>14 élèves de la classe</strong>. Les inclusions ULIS s’ajoutent, les départs se soustraient. <strong>Renseigner les prénoms ci-dessous directement dans le site.</strong> Les modifications sont conservées dans ce navigateur, pas synchronisées entre appareils.</p><div class="ce2-plan-grid">';
 planning.forEach(x=>{html+='<article class="ce2-plan-card" data-ce2-record="'+escapeHtml(x.id)+'"><strong>'+escapeHtml(x.name)+' — '+(x.kind==='in'?'+':'−')+x.students.length+'</strong><div class="ce2-plan-sub">'+escapeHtml(dayList(x))+' · '+(x.start?escapeHtml(timeLabel(x.start)):'horaire à préciser')+(x.end?'–'+escapeHtml(timeLabel(x.end)):'')+'</div><small>'+escapeHtml(x.note||'')+'</small><div class="ce2-plan-controls"><label class="ce2-name-label">Prénoms (séparés par une virgule)<input class="ce2-student-input" type="text" data-students="'+escapeHtml(x.id)+'" value="'+escapeHtml(x.students.join(', '))+'"></label><label>Début<input aria-label="Début '+escapeHtml(x.name)+'" type="time" data-start="'+escapeHtml(x.id)+'" value="'+escapeHtml(x.start||'')+'"></label><label>Fin<input aria-label="Fin '+escapeHtml(x.name)+'" type="time" data-end="'+escapeHtml(x.id)+'" value="'+escapeHtml(x.end||'')+'"></label><button type="button" data-save="'+escapeHtml(x.id)+'">Enregistrer</button></div></article>';});
 host.innerHTML=html+'</div><p class="ce2-count-notes">CHAM mardi : horaire précis à confirmer ; Aide G du mardi : début provisoire 15 h, fin inconnue. Les effectifs indiqués pour ces créneaux doivent être vérifiés. Le vendredi, vérifier la présence ULIS lors du départ à la piscine.</p>';
 host.querySelectorAll('[data-save]').forEach(btn=>btn.addEventListener('click',()=>{
  const rec=planning.find(x=>x.id===btn.dataset.save),card=btn.closest('[data-ce2-record]');if(!rec||!card)return;
  const begin=card.querySelector('[data-start]').value,end=card.querySelector('[data-end]').value;
  const names=card.querySelector('[data-students]').value.split(',').map(v=>v.trim()).filter(Boolean);
  if(names.length!==rec.students.length){alert('Ce dispositif comprend '+rec.students.length+' élève(s). Indique exactement '+rec.students.length+' prénom(s), séparés par une virgule.');return;}
  if(begin&&end&&minutes(end)<=minutes(begin)){alert('L’heure de fin doit être après le début.');return;}
  rec.students=names;rec.start=begin;rec.end=end;
  if(rec.id==='aide-g')rec.certainty=end?'confirmed':'provisional';
  if(rec.id==='cham-mardi'&&begin&&end)rec.certainty='confirmed';
  save();renderPlanning();schedule();
 }));
 // La fiche historique ne doit plus annoncer 2 ULIS à accueillir.
 let old=modal.querySelector('.inclusion-overview__count');if(old){let strong=old.querySelector('strong');if(strong)strong.textContent='3';let small=old.querySelector('small');if(small)small.textContent='Tous les jours 14h–15h45';}
 modal.querySelectorAll('.inclusion-student-card__schedule strong').forEach(el=>el.textContent='14h–15h45 (jours de classe)');
 let cards=modal.querySelector('.inclusion-students');if(cards){let current=cards.querySelector('.inclusion-student-card--third');if(!current){current=document.createElement('article');current.className='inclusion-student-card inclusion-student-card--third';cards.appendChild(current);}const third=planning.find(x=>x.id==='ulis').students[1];current.innerHTML='<header class="inclusion-student-card__header"><div><span class="inclusion-student-card__device">ULIS · Inclusion CE2</span><h4>'+escapeHtml(third)+'</h4></div><span class="inclusion-student-card__schedule">Temps d’inclusion : <strong>14h–15h45 (jours de classe)</strong></span></header><p>Élève accueilli dans la classe. Les adaptations pédagogiques sont à préciser avec l’équipe ULIS.</p>';}
 let oldSchedule=modal.querySelector('.inclusion-schedule');if(oldSchedule){oldSchedule.querySelector('p').textContent='Trois élèves ULIS : inclusion prévue de 14h à 15h45 les jours de classe.';let badge=oldSchedule.querySelector('.inclusion-schedule__status');if(badge)badge.textContent='3 élèves';}
}
function dayTitle(root){return root.querySelector('.daily-detail-top h2, .detail-day-head h3, .detail-top h2')?.textContent||'';}
function renderDetailed(){let area=document.getElementById('timetableContent');if(!area)return;
 let views=area.querySelectorAll('.detail-day');
 for(let view of views){let text=view.querySelector('.detail-day-head h3')?.textContent||area.querySelector('.detail-top h2')?.textContent||'';let d=weekday(text);if(!d)continue;
 let table=view.querySelector('table.detail-table');if(!table)continue;
 for(let tr of table.querySelectorAll('tbody tr')){const t=tr.querySelector('td.detail-time'),target=tr.querySelector('td.detail-session-cell, td:nth-last-child(2)');if(!t||!target)continue;
  let sc=slot(t.textContent);if(!sc)continue;
  let activity=tr.querySelector('td:nth-child(2)')?.textContent||'';
  let formatted=formatSegments(d,sc,activity,true);
  let node=target.querySelector(':scope > .ce2-effectif-line');if(!node){node=document.createElement('div');node.className='ce2-effectif-line';target.appendChild(node);}
  if(node.dataset.ce2Content!==formatted){node.innerHTML=formatted;node.dataset.ce2Content=formatted;}
 }
 }
 let daily=area.querySelector('.daily-timetable-view');if(daily){let head=daily.querySelector('.detail-top'),d=weekday(dayTitle(daily));if(head&&d){let sum=daily.querySelector('.ce2-count-summary');if(!sum){sum=document.createElement('aside');sum.className='ce2-count-summary';head.insertAdjacentElement('afterend',sum);}let markers=[];for(let x of planning.filter(v=>v.days.includes(d))){let when=(x.start?timeLabel(x.start):'horaire à préciser')+(x.end?'–'+timeLabel(x.end):'');markers.push(x.name+' : '+x.students.join(', ')+' ('+when+')');}let txt='Effectif de base : 14 · '+markers.join(' · ');if(sum.textContent!==txt)sum.textContent=txt;}}
}
function renderPublic(){let grid=document.getElementById('simpleGrid');if(!grid)return;const day=weekday(document.getElementById('simpleDate')?.textContent||'');if(!day)return;
 // Un rappel discret sans prénom ni effectif, jamais de données nominatives au TBI.
 let markers=planning.filter(p=>p.days.includes(day)).map(p=>p.id==='aide-g'?'Aide G':p.name).filter((v,i,a)=>a.indexOf(v)===i);
 let bar=grid.querySelector('.ce2-public-marker');if(!bar){bar=document.createElement('div');bar.className='ce2-public-marker';grid.prepend(bar);}bar.textContent=markers.length?'Activités avec d’autres enseignants : '+markers.join(' · '):'';bar.hidden=!markers.length;
}
let queued=false;function schedule(){if(queued)return;queued=true;setTimeout(()=>{queued=false;renderDetailed();renderPublic();},80);}
function init(){addStyle();renderPlanning();schedule();let detail=document.getElementById('timetableContent');if(detail)new MutationObserver(schedule).observe(detail,{childList:true,subtree:true});let grid=document.getElementById('simpleGrid');if(grid)new MutationObserver(schedule).observe(grid,{childList:true});let modal=document.getElementById('supportsModal');if(modal)new MutationObserver(()=>{if(!modal.classList.contains('hidden'))renderPlanning();}).observe(modal,{attributes:true,attributeFilter:['class']});document.addEventListener('ce2:prise-en-charge-changed',schedule);}
window.CE2PrisesEnCharge={get:()=>clone(planning),segments,at,slot,weekday,render:schedule};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
