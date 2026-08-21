// V34.70 — Espace Parents : rappels anticipés harmonisés et Jour J informatif uniquement.
// Les repères annuels transversaux Arts / éducation musicale sont affichés pour chaque période.
(function(){
'use strict';
const $=id=>document.getElementById(id),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const EDT=window.PUBLIC_EDT,PROG=window.PROGRESSIONS||{},W=window.PARENTS_SEMAINE||{},H=window.PARENTS_TRAVAIL||{},L=window.PARENTS_VIE_CLASSE||{},I=window.PARENTS_INFOS||{},D1=window.DEVOIRS_P1||{weeks:[]},D2=window.DEVOIRS_P2||{weeks:[]},D3=window.DEVOIRS_P3||{weeks:[]},D4=window.DEVOIRS_P4||{weeks:[]},D5=window.DEVOIRS_P5||{weeks:[]},D={weeks:[...(D1.weeks||[]).map(w=>({...w,__period:'p1'})),...(D2.weeks||[]).map(w=>({...w,__period:'p2'})),...(D3.weeks||[]).map(w=>({...w,__period:'p3'})),...(D4.weeks||[]).map(w=>({...w,__period:'p4'})),...(D5.weeks||[]).map(w=>({...w,__period:'p5'}))].sort((a,b)=>String(a.start||'').localeCompare(String(b.start||'')))};
const CAL=window.CALENDRIER_SCOLAIRE_2026_2027||{daysOff:[],breaks:[]};
const subjectOrder=['francais','maths','anglais','sciences','histoire','geographie','eps','arts'];
const togetherOrder=['emc','evar','emi'];
function period(){return EDT.periodForDate(new Date())}
function periodKey(){const p=period();return p==='rentree'?'p1':p}
function comps(key){const s=PROG[key]||{},arr=s[periodKey()+'Competencies'];if(Array.isArray(arr)&&arr.length)return arr;if(key==='arts'&&Array.isArray(s.annualCompetencies))return s.annualCompetencies;return[]}
function renderList(id,items){const el=$(id),a=Array.isArray(items)?items.filter(Boolean):[];el.innerHTML=a.map(x=>`<li>${esc(x)}</li>`).join('');el.style.display=a.length?'block':'none'}
function renderPublished(){$('weekMessage').textContent=W.message||'Aucune information particulière publiée pour cette semaine.';renderList('weekItems',W.items);$('lifeMessage').textContent=L.message||'Les projets et moments de vie de classe seront ajoutés ici.';renderList('lifeItems',L.items);$('infoMessage').textContent=I.message||'Retrouvez ici les informations utiles.';const docs=Array.isArray(I.documents)?I.documents:[];$('documentsList').innerHTML=docs.length?docs.map(d=>{if(typeof d==='string')return `<div class="document-item">${esc(d)}</div>`;const label=esc(d.label||d.title||'Document'),url=String(d.url||'').trim();return `<div class="document-item">${url?`<a href="${esc(url)}" target="_blank" rel="noopener">${label} ↗</a>`:label}</div>`}).join(''):'<div class="document-item">Aucun document particulier publié.</div>'}

function isoLocal(d){const y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,'0'),day=String(d.getDate()).padStart(2,'0');return `${y}-${m}-${day}`}
function dateFromIso(s){const [y,m,d]=String(s).split('-').map(Number);return new Date(y,m-1,d)}
function dueLabel(s){return frDate(dateFromIso(s),{weekday:'long',day:'numeric',month:'long'})}
function noSchoolDateSet(){return new Set((CAL.daysOff||[]).map(x=>String(x&&x.date||'')).filter(Boolean))}
function schoolCalendarEventsForWeek(week){
  if(!week)return [];
  const events=[];
  (CAL.daysOff||[]).forEach(ev=>{
    const date=String(ev&&ev.date||'');
    if(date&&date>=week.start&&date<=week.end){
      events.push({kind:'dayoff',date,icon:ev.icon||'📅',label:ev.label||'Jour sans classe'});
    }
  });
  (CAL.breaks||[]).forEach(br=>{
    const date=String(br&&br.lastSchoolDay||'');
    if(date&&date>=week.start&&date<=week.end){
      const resume=br.resume?` · reprise ${dueLabel(br.resume)}`:'';
      events.push({kind:'break',date,icon:'🏖️',label:`${br.label} — après la classe du ${dueLabel(date)}${resume}`});
    }
  });
  return events.sort((a,b)=>a.date.localeCompare(b.date));
}
function schoolCalendarHtml(week){
  const events=schoolCalendarEventsForWeek(week);
  if(!events.length)return '';
  return `<div class="homework-calendar-events">${events.map(ev=>`<div class="homework-calendar-event homework-calendar-event--${esc(ev.kind)}"><span class="homework-calendar-event__icon">${esc(ev.icon)}</span><span>${esc(ev.label)}</span></div>`).join('')}</div>`;
}
function schoolBreakForDate(iso){
  return (CAL.breaks||[]).find(br=>{
    const start=String(br&&br.officialStart||'');
    const resume=String(br&&br.resume||'');
    return start&&iso>=start&&(!resume||iso<resume);
  })||null;
}
function schoolDayOffForDate(iso){
  return (CAL.daysOff||[]).find(ev=>String(ev&&ev.date||'')===iso)||null;
}
function allEvaluations(){
  const out=[],seen=new Set();
  (D.weeks||[]).forEach(w=>(w.items||[]).forEach(it=>(it.evaluations||[]).forEach(ev=>{
    if(!ev||!ev.date)return;
    const key=`${ev.date}|${ev.subject||''}`;
    if(seen.has(key))return;
    seen.add(key);out.push(ev);
  })));
  return out.sort((a,b)=>String(a.date||'').localeCompare(String(b.date||'')));
}
function homeworkWeekCalendarHtml(week,sourceItems=[]){
  if(!week||!week.start)return '';
  const monday=dateFromIso(week.start);
  const items=Array.isArray(sourceItems)?sourceItems:[];
  const evals=allEvaluations();
  const days=Array.from({length:7},(_,i)=>{const d=new Date(monday);d.setDate(monday.getDate()+i);return d});
  const cells=days.map(d=>{
    const iso=isoLocal(d),dow=d.getDay();
    const br=schoolBreakForDate(iso),off=schoolDayOffForDate(iso);
    const dayItems=items.filter(it=>String(it&&it.due||'')===iso);
    const dayEvals=evals.filter(ev=>String(ev&&ev.date||'')===iso);
    let kind='class',icon='🏫',status='Classe';
    if(br){kind='holiday';icon='🏖️';status=br.label||'Vacances scolaires';}
    else if(off){kind='dayoff';icon=off.icon||'📅';status=off.label||'Pas de classe';}
    else if(dow===0||dow===6){kind='weekend';icon='☕';status='Week-end';}
    else if(dow===3){kind='noclass';icon='🌿';status='Pas de classe';}
    else if(dayEvals.length){kind='evaluation';icon='📅';const subjects=[...new Set(dayEvals.map(x=>x.subject).filter(Boolean))];status=`${dayEvals.length} évaluation${dayEvals.length>1?'s':''}${subjects.length?` · ${subjects.join(' / ')}`:''}`;}
    else if(dayItems.length){kind='homework';icon='📚';status=dayItems.some(x=>x.evaluations?.length)?'Annonce des évaluations':'Petit travail prévu';}
    else {status='Classe · rien à préparer';}
    return `<div class="homework-week-calendar__day homework-week-calendar__day--${kind}"><div class="homework-week-calendar__date"><strong>${esc(frDate(d,{weekday:'long'}))}</strong><span>${esc(frDate(d,{day:'numeric',month:'short'}))}</span></div><div class="homework-week-calendar__status"><span aria-hidden="true">${icon}</span><small>${esc(status)}</small></div></div>`;
  }).join('');
  return `<section class="homework-week-calendar" aria-label="Calendrier de la semaine"><div class="homework-week-calendar__title">🗓️ La semaine en un coup d’œil</div><div class="homework-week-calendar__grid">${cells}</div></section>`;
}
function evaluationWeekLabel(it){
  const evaluations=Array.isArray(it&&it.evaluations)?it.evaluations:[];
  const dates=[...new Set(evaluations.map(ev=>String(ev&&ev.date||'')).filter(Boolean))].sort();
  if(dates.length===1)return `Pour ${dueLabel(dates[0])}`;
  if(!dates.length)return `Pour ${dueLabel(it.due)}`;
  const first=dateFromIso(dates[0]);
  const day=(first.getDay()+6)%7; // lundi = 0
  const monday=new Date(first);monday.setDate(first.getDate()-day);
  const friday=new Date(monday);friday.setDate(monday.getDate()+4);
  const sameMonth=monday.getMonth()===friday.getMonth()&&monday.getFullYear()===friday.getFullYear();
  const start=frDate(monday,sameMonth?{day:'numeric'}:{day:'numeric',month:'long'});
  const end=frDate(friday,{day:'numeric',month:'long'});
  return `Semaine du ${start} au ${end}`;
}
let homeworkTestWeekIndex=null;
function homeworkWeekFor(date){const iso=isoLocal(date),weeks=Array.isArray(D.weeks)?D.weeks:[];if(!weeks.length)return null;if(Number.isInteger(homeworkTestWeekIndex)&&weeks[homeworkTestWeekIndex])return weeks[homeworkTestWeekIndex];const current=weeks.find(w=>iso>=w.start&&iso<=w.end);if(current)return current;const next=weeks.find(w=>w.start>iso);if(next)return next;return weeks[weeks.length-1]}
function homeworkHibouHtml(value){
  if(!value)return'';
  const list=Array.isArray(value)?value:[value];
  const valid=list.filter(x=>x&&(typeof x==='string'||x.url));
  if(!valid.length)return'';
  const intro=(!Array.isArray(value)&&typeof value==='object'&&value.intro)?value.intro:'Leçons utiles dans Maître Hibou :';
  const links=valid.map(x=>{
    if(typeof x==='string')return `<span><b>${esc(x)}</b></span>`;
    return `<a class="homework-hibou-link" href="${esc(x.url)}" target="_blank" rel="noopener noreferrer"><b>${esc(x.label||'Ouvrir la leçon')}</b> ↗</a>`;
  }).join(' <span aria-hidden="true">·</span> ');
  return `<div class="homework-hibou">🦉 ${esc(intro)} ${links}</div>`;
}
function homeworkEvaluationsHtml(list,periodTag=''){
  const evaluations=Array.isArray(list)?list:[];
  if(!evaluations.length)return '';
  const showCountBanner=['p1','p2','p4','p5'].includes(periodTag);
  const count=evaluations.length;
  const weekRange=periodTag==='p5'&&evaluations[0]?.date?(()=>{const first=dateFromIso([...evaluations].map(e=>e.date).filter(Boolean).sort()[0]);const day=(first.getDay()+6)%7;const monday=new Date(first);monday.setDate(first.getDate()-day);const friday=new Date(monday);friday.setDate(monday.getDate()+4);const same=monday.getMonth()===friday.getMonth();const a=frDate(monday,same?{day:'numeric'}:{day:'numeric',month:'long'});const b=frDate(friday,{day:'numeric',month:'long'});return `Semaine du ${a} au ${b}`;})():'';
  const title=periodTag==='p5'&&weekRange
    ? `📅 ${weekRange} : ${count} évaluation${count>1?'s':''} prévue${count>1?'s':''}`
    : showCountBanner
      ? `📅 Cette semaine : ${count} évaluation${count>1?'s':''} prévue${count>1?'s':''}`
      : `📅 Évaluation${count>1?'s':''} prévue${count>1?'s':''} cette semaine`;
  const titleClass=`homework-evaluations-title${showCountBanner?' homework-evaluations-title--count':''}`;
  return `<div class="homework-evaluations"><div class="${titleClass}">${title}</div><p class="homework-evaluations-note">Ces évaluations sont annoncées à l’avance pour vous aider à vous organiser. Pour une évaluation le lundi ou le mardi, le petit rappel se fait tranquillement pendant le week-end précédent. Pour une évaluation le jeudi ou le vendredi, un rappel très court est proposé à partir du mardi ou du mercredi. Le jour J, aucun devoir supplémentaire n’est demandé.</p>${evaluations.map(ev=>{
    const newSkills=Array.isArray(ev.newSkills)&&ev.newSkills.length?`<div class="homework-evaluation-skills homework-evaluation-skills--new"><b>🎯 Nouvelles compétences évaluées</b><ul>${ev.newSkills.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`:'';
    const reviewSkills=Array.isArray(ev.reviewSkills)&&ev.reviewSkills.length?`<div class="homework-evaluation-skills homework-evaluation-skills--review"><b>🔁 Déjà vu — rebrassage</b><p>Cette partie a déjà été travaillée : elle sert seulement à vérifier que l’acquis est bien consolidé.</p><ul>${ev.reviewSkills.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`:'';
    const scope=(!newSkills&&!reviewSkills&&Array.isArray(ev.scope)&&ev.scope.length)?`<ul>${ev.scope.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:'';
    const prep=ev.preparation?`<p class="homework-evaluation-prep"><b>Pour se préparer :</b> ${esc(ev.preparation)}</p>`:'';
    const hibou=homeworkHibouHtml(ev.hibou);
    return `<section class="homework-evaluation"><div class="homework-evaluation-head"><strong>${esc(ev.subject||'Évaluation')}</strong><span>${esc(dueLabel(ev.date))}</span></div>${ev.title?`<h4>${esc(ev.title)}</h4>`:''}${newSkills}${reviewSkills}${scope}${prep}${hibou}</section>`;
  }).join('')}</div>`;
}
function homeworkEvaluationTodayHtml(ev){
  if(!ev)return '';
  const subject=ev.subject||'Évaluation';
  const oral=/oral/i.test(String(ev.title||''));
  const label=oral?`Aujourd’hui : bilan oral d’${subject}`:`Aujourd’hui : évaluation de ${subject}`;
  return `<article class="homework-card homework-card--today"><div class="homework-date">${esc(dueLabel(ev.date))}</div><div class="homework-today"><b>⭐ ${esc(label)}</b><p>Aucun devoir supplémentaire aujourd’hui. Cette information rappelle simplement l’évaluation prévue.</p></div></article>`;
}
function homeworkItemCard(it,compact=false,periodTag='',lightWeek=false){if(it&&it.evaluationToday)return homeworkEvaluationTodayHtml(it.evaluationToday);const evaluations=homeworkEvaluationsHtml(it.evaluations,periodTag);const challenge=(!lightWeek&&it.challenge)?`<div class="homework-block homework-challenge"><b>🎯 Défi du jour</b><p>${esc(it.challenge)}</p></div>`:'';const family=(!lightWeek&&it.family)?`<div class="homework-block homework-family"><b>👨‍👩‍👧 Défi famille <span>facultatif</span></b><p>${esc(it.family)}</p></div>`:'';const hibou=homeworkHibouHtml(it.hibou);const dateTitle=evaluationWeekLabel(it);return `<article class="homework-card${compact?' homework-card--compact':''}"><div class="homework-date">${esc(dateTitle)}</div>${evaluations}<div class="homework-block homework-routine"><b>${esc(it.routineIcon||'📚')} ${esc(it.routineTitle||'Je revois')}</b><p>${esc(it.routine||'')}</p></div>${challenge}${family}${hibou}</article>`}
function allEvaluationDates(){return [...new Set(allEvaluations().map(ev=>String(ev.date||'')).filter(Boolean))]}
function renderHomework(){const now=new Date(),week=homeworkWeekFor(now),cur=$('homeworkCurrent');if(!cur)return;if(!week){cur.innerHTML='<div class="homework-empty">Aucun devoir programmé.</div>';return}const sourceItems=Array.isArray(week.items)?week.items:[];let items=[...sourceItems];const periodTag=week.__period||'';const noSchool=noSchoolDateSet();items=items.filter(it=>!noSchool.has(String(it&&it.due||'')));const evalDates=allEvaluationDates();const weekEvalDates=evalDates.filter(d=>d>=week.start&&d<=week.end);const lightWeek=['p1','p2','p3','p4','p5'].includes(periodTag)&&weekEvalDates.length>0;if(lightWeek){items=items.filter(it=>{const hasOwnEvaluations=Array.isArray(it.evaluations)&&it.evaluations.length>0;return hasOwnEvaluations||!weekEvalDates.includes(String(it.due||''))})}const dayJItems=allEvaluations().filter(ev=>String(ev.date||'')>=week.start&&String(ev.date||'')<=week.end).map(ev=>({due:String(ev.date),evaluationToday:ev}));items=[...items,...dayJItems].sort((a,b)=>String(a.due||'').localeCompare(String(b.due||'')));const dates=`${esc(frDate(dateFromIso(week.start),{day:'numeric',month:'long'}))} au ${esc(frDate(dateFromIso(week.end),{day:'numeric',month:'long'}))}`;const head=`<div class="homework-week-head"><div><span>${esc(week.label||'Semaine en cours')}</span><h3>${dates}</h3>${week.theme?`<p class="homework-theme">${esc(week.theme)}</p>`:''}</div></div>`;const weekCalendar=homeworkWeekCalendarHtml(week,sourceItems);const calendar=schoolCalendarHtml(week);if(!items.length){cur.innerHTML=`${head}${weekCalendar}${calendar}<div class="homework-empty">🌱 ${esc(week.note||'Aucun devoir cette semaine.')}</div>${week.holiday?`<div class="homework-holiday">🏖️ ${esc(week.holiday)}</div>`:''}`;return}cur.innerHTML=`${head}${weekCalendar}${calendar}${week.note?`<div class="homework-empty">${esc(week.note)}</div>`:''}${items.map(x=>homeworkItemCard(x,false,periodTag,lightWeek)).join('')}${week.holiday?`<div class="homework-holiday">🏖️ ${esc(week.holiday)}</div>`:''}`}

function setupHomeworkTest(){
  const btn=$('homeworkTestHotspot'),bar=$('homeworkTestBar'),label=$('homeworkTestLabel'),prev=$('homeworkTestPrev'),next=$('homeworkTestNext'),reset=$('homeworkTestReset');
  if(!btn||!bar)return;
  let timer=null;
  const weeks=Array.isArray(D.weeks)?D.weeks:[];
  function currentAutoIndex(){const auto=homeworkWeekFor(new Date());return Math.max(0,weeks.indexOf(auto));}
  function refreshLabel(){const w=Number.isInteger(homeworkTestWeekIndex)?weeks[homeworkTestWeekIndex]:homeworkWeekFor(new Date());label.textContent=w?`${w.label||'Semaine'} · ${frDate(dateFromIso(w.start),{day:'numeric',month:'short'})} → ${frDate(dateFromIso(w.end),{day:'numeric',month:'short'})}`:'Aucune semaine';}
  function show(){bar.hidden=false;btn.setAttribute('aria-expanded','true');if(!Number.isInteger(homeworkTestWeekIndex))homeworkTestWeekIndex=currentAutoIndex();refreshLabel();renderHomework();}
  const start=()=>{clearTimeout(timer);timer=setTimeout(show,1200)};
  const cancel=()=>clearTimeout(timer);
  ['pointerdown','touchstart'].forEach(e=>btn.addEventListener(e,start,{passive:true}));
  ['pointerup','pointercancel','pointerleave','touchend'].forEach(e=>btn.addEventListener(e,cancel,{passive:true}));
  prev?.addEventListener('click',()=>{if(!weeks.length)return;if(!Number.isInteger(homeworkTestWeekIndex))homeworkTestWeekIndex=currentAutoIndex();homeworkTestWeekIndex=(homeworkTestWeekIndex-1+weeks.length)%weeks.length;refreshLabel();renderHomework();});
  next?.addEventListener('click',()=>{if(!weeks.length)return;if(!Number.isInteger(homeworkTestWeekIndex))homeworkTestWeekIndex=currentAutoIndex();homeworkTestWeekIndex=(homeworkTestWeekIndex+1)%weeks.length;refreshLabel();renderHomework();});
  reset?.addEventListener('click',()=>{homeworkTestWeekIndex=null;bar.hidden=true;btn.setAttribute('aria-expanded','false');renderHomework();});
}

function grouped(arr){const m=new Map();arr.forEach(c=>{const d=c.domain||'Objectifs de la période';if(!m.has(d))m.set(d,[]);m.get(d).push(c)});return m}
function learningCard(key){const s=PROG[key]||{},arr=comps(key);if(!arr.length)return'';const groups=grouped(arr);const inside=[...groups.entries()].map(([d,list])=>`<div class="domain-title">${esc(d)}</div><ul>${list.map(c=>`<li>${esc(c.title||c.jeSais||c.code)}</li>`).join('')}</ul>`).join('');return `<article class="learning-card"><h3>${esc(s.icon||'📘')} ${esc(s.title||key)}</h3><p>${arr.length} objectif${arr.length>1?'s':''} travaillé${arr.length>1?'s':''} pendant la période.</p><details><summary>Voir ce que les élèves apprennent</summary>${inside}</details></article>`}
function renderLearning(){$('learningGrid').innerHTML=subjectOrder.map(learningCard).join('')}
function renderTogether(){$('togetherLearning').innerHTML=togetherOrder.map(key=>{const s=PROG[key]||{},arr=comps(key);if(!arr.length)return'';return `<article class="together-card"><h3>${esc(s.icon||'🤝')} ${esc(s.title||key)}</h3><ul>${arr.map(c=>`<li>${esc(c.title||c.jeSais||c.code)}</li>`).join('')}</ul></article>`}).join('')}

function frenchDateFromLabel(label){
  const months={janvier:0,fevrier:1,février:1,mars:2,avril:3,mai:4,juin:5,juillet:6,aout:7,août:7,septembre:8,octobre:9,novembre:10,decembre:11,décembre:11};
  const clean=String(label||'').toLowerCase();
  const m=clean.match(/(\d{1,2})\s+(janvier|février|fevrier|mars|avril|mai|juin|juillet|août|aout|septembre|octobre|novembre|décembre|decembre)\s+(\d{4})/);
  if(!m)return null;
  return new Date(Number(m[3]),months[m[2]],Number(m[1]),12,0,0,0);
}
function plannedFamilyEvents(){
  const raw=window.PROGRESSIONS_EDT_DATA||{};
  const key=periodKey();
  const weeks=raw[`${key}DetailedWeeks`];
  if(!Array.isArray(weeks))return [];
  const today=new Date();today.setHours(0,0,0,0);
  const familyRx=/(sortie|visite|mus[ée]e|piscine|spectacle|rencontre|intervenant|tournoi|présentation du chant|journ[ée]e exceptionnelle|classe découverte|biblioth[èe]que|cin[ée]ma|photo de classe)/i;
  const out=[];
  weeks.forEach(w=>(w.days||[]).forEach(([dayLabel,rows])=>{
    const date=frenchDateFromLabel(dayLabel);
    if(!date||date<today)return;
    (rows||[]).forEach(row=>{
      const subject=String(row?.[1]||'').trim();
      const detail=String(row?.[2]||'').trim();
      const whole=[subject,detail,row?.[5]||''].join(' ');
      if(!familyRx.test(whole))return;
      out.push({date,label:detail||subject,subject});
    });
  }));
  const seen=new Set();
  return out.filter(e=>{
    const k=`${e.date.toISOString().slice(0,10)}|${e.label}`;
    if(seen.has(k))return false;
    seen.add(k);return true;
  }).sort((a,b)=>a.date-b.date).slice(0,8);
}
function infoLines(v){
  if(Array.isArray(v))return v.filter(Boolean);
  return String(v||'').split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
}

function renderFlashTicker(){
  const ticker=$('parentsFlashTicker');
  if(!ticker)return;
  const msg=String(I.urgentMessage||'').trim();
  ticker.hidden=!msg;
  if(!msg)return;
  const a=$('parentsFlashTickerText'),b=$('parentsFlashTickerTextCopy');
  if(a)a.textContent=msg;
  if(b)b.textContent=msg;
  ticker.setAttribute('aria-label',`Information de dernière minute : ${msg}. Ouvrir les infos de la classe.`);
}

function renderClassInfo(){
  const important=infoLines(I.importantItems?.length?I.importantItems:W.items);
  $('parentsImportantList').innerHTML=important.length
    ? `<ul class="parents-info-list">${important.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`
    : '<div class="parents-info-empty">Aucun rappel important publié pour le moment.</div>';

  const automatic=plannedFamilyEvents();
  const manual=infoLines(I.upcomingItems?.length?I.upcomingItems:L.items);
  const autoHtml=automatic.map(e=>`<article class="parents-upcoming-item"><time>${esc(frDate(e.date,{weekday:'short',day:'numeric',month:'short'}))}</time><div>${e.subject?`<strong>${esc(e.subject)}</strong>`:''}<span>${esc(e.label)}</span></div></article>`).join('');
  const manualHtml=manual.map(x=>`<article class="parents-upcoming-item parents-upcoming-item--manual"><span class="parents-upcoming-dot">•</span><div><span>${esc(x)}</span></div></article>`).join('');
  $('parentsUpcomingList').innerHTML=(autoHtml||manualHtml)
    ? `${autoHtml}${manualHtml}`
    : '<div class="parents-info-empty">Aucune sortie ou rencontre familiale n’est programmée pour le moment.</div>';

  const docs=Array.isArray(I.documents)?I.documents:[];
  $('parentsDocumentsUseful').innerHTML=docs.length
    ? docs.map(d=>{
        if(typeof d==='string')return `<div class="parents-document-useful">${esc(d)}</div>`;
        const label=esc(d.label||d.title||'Document'),url=String(d.url||'').trim();
        return `<div class="parents-document-useful">${url?`<a href="${esc(url)}" target="_blank" rel="noopener">${label}<span>↗</span></a>`:label}</div>`;
      }).join('')
    : '<div class="parents-info-empty">Aucun document utile publié pour le moment.</div>';
}

function frDate(d,opts={weekday:'long',day:'numeric',month:'long',year:'numeric'}){return new Intl.DateTimeFormat('fr-FR',opts).format(d).replace(/^./,c=>c.toUpperCase())}
function scheduleTargetDate(){
  const now=new Date();now.setHours(12,0,0,0);
  const todayData=EDT.rowsForDate(now);
  if(todayData.rows.length)return now;
  return EDT.nextClassDate(now);
}
function noClassHtml(d){
  const data=EDT.rowsForDate(d),info=data.noClass||EDT.noClassInfo?.(d);
  if(!info)return '<div class="homework-empty">Pas de classe prévue ce jour-là.</div>';
  const detail=info.type==='ferie'||info.type==='pont' ? `${info.label} — pas de classe` : (info.message||info.label);
  return `<div class="schedule-no-class schedule-no-class--${esc(info.type||'none')}"><span>${esc(info.icon||'📅')}</span><div><strong>${esc(detail)}</strong>${info.type==='vacances'?'<small>Les élèves ne sont pas attendus à l’école.</small>':''}</div></div>`;
}
function scheduleRowsHtml(d){
  const data=EDT.rowsForDate(d);
  if(!data.rows.length)return noClassHtml(d);
  return data.rows.map(r=>`<div class="schedule-row"><time>${esc(r[0])}</time><div><strong>${esc(r[1])}</strong>${r[2]?`<small>${esc(r[2])}</small>`:''}</div></div>`).join('');
}
function renderSchedule(){
  const today=new Date();today.setHours(12,0,0,0);
  const todayData=EDT.rowsForDate(today),todayInfo=todayData.noClass||null;
  const target=scheduleTargetDate();
  const periodTarget=target||today;
  $('schedulePeriod').textContent=EDT.periodLabel(EDT.periodForDate(periodTarget));
  if(!target){
    $('scheduleEyebrow').textContent='Calendrier scolaire';
    $('scheduleQuickHint').textContent=todayInfo?.label||'Pas de classe';
    $('scheduleViewMessage').textContent=todayInfo?.message||'Aucune prochaine journée de classe n’est encore programmée.';
    $('parentsScheduleToday').innerHTML=`<article class="schedule-day schedule-day--today"><h3>${esc(frDate(today,{weekday:'long',day:'numeric',month:'long'}))}</h3>${noClassHtml(today)}</article>`;
    $('parentsScheduleWeek').innerHTML='';
    return;
  }
  const isToday=isoLocal(target)===isoLocal(today);
  $('scheduleEyebrow').textContent=isToday?'Aujourd’hui':'Prochain jour de classe';
  $('scheduleQuickHint').textContent=isToday?frDate(target,{weekday:'long'}):`Prochain : ${frDate(target,{weekday:'long',day:'numeric',month:'long'})}`;
  if(isToday){
    $('scheduleViewMessage').textContent=`Voici l’emploi du temps réel de ${frDate(target,{weekday:'long',day:'numeric',month:'long'})}.`;
  }else if(todayInfo){
    const reason=todayInfo.type==='ferie'||todayInfo.type==='pont'?`${todayInfo.label} — pas de classe`:todayInfo.label;
    $('scheduleViewMessage').textContent=`${reason}. Prochain jour de classe : ${frDate(target,{weekday:'long',day:'numeric',month:'long'})}.`;
  }else{
    $('scheduleViewMessage').textContent=`Pas de classe aujourd’hui. Prochain jour de classe : ${frDate(target,{weekday:'long',day:'numeric',month:'long'})}.`;
  }
  $('parentsScheduleToday').innerHTML=`<article class="schedule-day schedule-day--today"><h3>${esc(frDate(target,{weekday:'long',day:'numeric',month:'long'}))}</h3>${scheduleRowsHtml(target)}</article>`;
  const monday=EDT.mondayOf(target),days=[0,1,3,4].map(n=>EDT.addDays(monday,n));
  $('parentsScheduleWeek').innerHTML=days.map(d=>`<article class="schedule-day${isoLocal(d)===isoLocal(target)?' schedule-day--selected':''}"><h3>${esc(frDate(d,{weekday:'long',day:'numeric',month:'long'}))}</h3>${scheduleRowsHtml(d)}</article>`).join('');
}
function showParentInfoPanel(target){
  const menu=$('parentsInfoMenu');
  if(!menu)return;
  const valid=['rappels','upcoming','material','help','digital','resources'];
  const selected=valid.includes(target)?target:'';
  menu.hidden=!!selected;
  document.querySelectorAll('[data-parent-info-panel]').forEach(panel=>panel.hidden=panel.dataset.parentInfoPanel!==selected);
  if(selected){
    history.replaceState(null,'',`#info-${selected}`);
    window.scrollTo({top:0,behavior:'instant'});
  }else{
    history.replaceState(null,'','#info');
    window.scrollTo({top:0,behavior:'instant'});
  }
}
function bindParentInfoNavigation(){
  document.querySelectorAll('[data-parent-info-target]').forEach(btn=>btn.addEventListener('click',()=>showParentInfoPanel(btn.dataset.parentInfoTarget)));
  document.querySelectorAll('[data-parent-info-menu]').forEach(btn=>btn.addEventListener('click',()=>showParentInfoPanel('')));
}

function showParentView(view){
  document.querySelectorAll('[data-parent-panel]').forEach(panel=>panel.hidden=panel.dataset.parentPanel!==view);
  document.querySelector('.parents-dashboard').hidden=!!view;
  if(view==='schedule')renderSchedule();
  if(view==='homework')renderHomework();
  if(view==='learning'){renderLearning();renderTogether()}if(view==='info'){renderClassInfo();showParentInfoPanel('')}
  if(view){
    history.replaceState(null,'',`#${view}`);
    window.scrollTo({top:0,behavior:'instant'});
  }else{
    history.replaceState(null,'',location.pathname+location.search);
    window.scrollTo({top:0,behavior:'instant'});
  }
}
function bindParentNavigation(){
  document.querySelectorAll('[data-parent-view]').forEach(btn=>btn.addEventListener('click',()=>showParentView(btn.dataset.parentView)));
  document.querySelectorAll('[data-parent-home]').forEach(btn=>btn.addEventListener('click',()=>showParentView('')));
  const hash=location.hash.replace('#','');
  if(hash.startsWith('info-')){showParentView('info');showParentInfoPanel(hash.slice(5));}
  else if(['schedule','homework','learning','info'].includes(hash))showParentView(hash);
}
function init(){const now=new Date(),p=period();$('parentsDate').textContent=frDate(now);renderPublished();renderFlashTicker();renderSchedule();bindParentInfoNavigation();bindParentNavigation();setupHomeworkTest()}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();
})();
