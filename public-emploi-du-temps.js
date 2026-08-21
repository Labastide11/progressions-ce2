/* V34.48 — Espace Parents : calendrier scolaire fiable, sans emploi du temps inventé */
(function(global){
'use strict';
const DATA=global.PROGRESSIONS_EDT_DATA||{};
const periodLabels={rentree:'Rentrée',p1:'Période 1',p2:'Période 2',p3:'Période 3',p4:'Période 4',p5:'Période 5'};
const monthMap={janvier:0,fevrier:1,mars:2,avril:3,mai:4,juin:5,juillet:6,aout:7,septembre:8,octobre:9,novembre:10,decembre:11};
const norm=s=>String(s||'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
function atNoon(d){const x=new Date(d);x.setHours(12,0,0,0);return x}
function iso(d){const x=atNoon(d);return `${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,'0')}-${String(x.getDate()).padStart(2,'0')}`}
function fromIso(s){const m=String(s||'').match(/^(\d{4})-(\d{2})-(\d{2})$/);return m?new Date(+m[1],+m[2]-1,+m[3],12):null}
function dateFromFrenchLabel(label){const t=norm(label),m=t.match(/(\d{1,2})\s+(janvier|fevrier|mars|avril|mai|juin|juillet|aout|septembre|octobre|novembre|decembre)\s+(\d{4})/);return m?new Date(+m[3],monthMap[m[2]],+m[1],12):null}
function weeksFor(period){return Array.isArray(DATA[period+'DetailedWeeks'])?DATA[period+'DetailedWeeks']:[]}
function exactDay(date){const target=iso(date);for(const p of ['p1','p2','p3','p4','p5'])for(const w of weeksFor(p))for(const pair of (w.days||[])){const d=dateFromFrenchLabel(pair[0]);if(d&&iso(d)===target)return{period:p,week:w,label:pair[0],rows:pair[1]||[]}}return null}
function between(date,start,end){const k=iso(date);return k>=start&&k<=end}
const SPECIAL_DAYS={
  '2027-03-29':{type:'ferie',label:'Lundi de Pâques',icon:'🎉',period:'p4'},
  '2027-05-06':{type:'ferie',label:'Ascension',icon:'🎉',period:'p5'},
  '2027-05-07':{type:'pont',label:'Pont de l’Ascension',icon:'🌉',period:'p5'},
  '2027-05-17':{type:'ferie',label:'Lundi de Pentecôte',icon:'🎉',period:'p5'}
};
const VACATIONS=[
  {start:'2026-07-04',end:'2026-08-31',type:'vacances',label:'Vacances d’été',icon:'☀️',period:'rentree'},
  {start:'2026-10-17',end:'2026-11-01',type:'vacances',label:'Vacances de la Toussaint',icon:'🍂',period:'p1'},
  {start:'2026-12-19',end:'2027-01-03',type:'vacances',label:'Vacances de Noël',icon:'🎄',period:'p2'},
  {start:'2027-02-06',end:'2027-02-21',type:'vacances',label:'Vacances d’hiver',icon:'❄️',period:'p3'},
  {start:'2027-04-03',end:'2027-04-18',type:'vacances',label:'Vacances de printemps',icon:'🌷',period:'p4'},
  {start:'2027-07-03',end:'2027-08-31',type:'vacances',label:'Vacances d’été',icon:'☀️',period:'p5'}
];
function noClassInfo(date){
  const k=iso(date),special=SPECIAL_DAYS[k];if(special)return{...special,date:k,message:`${special.label} — pas de classe`};
  const vac=VACATIONS.find(v=>between(date,v.start,v.end));if(vac)return{...vac,date:k,message:vac.label};
  const day=atNoon(date).getDay();
  if(day===3)return{type:'hors-classe',label:'Mercredi — pas de classe',icon:'📅',date:k,message:'Mercredi — pas de classe'};
  if(day===0||day===6)return{type:'hors-classe',label:'Week-end',icon:'📅',date:k,message:'Week-end — pas de classe'};
  if(k<'2026-09-01')return{type:'avant-rentree',label:'La rentrée approche',icon:'🎒',date:k,message:'La rentrée approche — rentrée des élèves mardi 1er septembre 2026'};
  if(k>'2027-07-02')return{type:'vacances',label:'Vacances d’été',icon:'☀️',date:k,message:'Vacances d’été'};
  return{type:'non-programme',label:'Aucune classe programmée',icon:'📅',date:k,message:'Aucune journée de classe n’est programmée à cette date.'};
}
function periodForDate(date){
  const exact=exactDay(date);if(exact)return exact.period;
  const info=noClassInfo(date);if(info&&info.period)return info.period;
  const k=iso(date);
  if(k<'2026-09-14')return'rentree';
  if(k<='2026-11-01')return'p1';
  if(k<='2027-01-03')return'p2';
  if(k<='2027-02-21')return'p3';
  if(k<='2027-04-18')return'p4';
  return'p5';
}
function dayName(date){return ['dimanche','lundi','mardi','mercredi','jeudi','vendredi','samedi'][atNoon(date).getDay()]}
function localProgram(date,programmes){const raw=(programmes||{})[iso(date)];if(!Array.isArray(raw))return null;return raw.filter(x=>!x.hidden).map(x=>[x.time||'',x.title||'Activité',x.detail||x.objective||'',x.kind||'common',x.competence||'',x.status||''])}
function rowsForDate(date,opts={}){
  const lp=localProgram(date,opts.programmes);if(lp&&lp.length)return{source:'Programme du jour',period:periodForDate(date),rows:lp,noClass:null};
  const exact=exactDay(date);if(exact)return{source:exact.week?.title||'Emploi du temps détaillé',period:exact.period,rows:exact.rows,noClass:null};
  const info=noClassInfo(date);return{source:info.label,period:periodForDate(date),rows:[],noClass:info};
}
function mondayOf(d){const x=atNoon(d),day=x.getDay()||7;x.setDate(x.getDate()-day+1);return x}
function addDays(d,n){const x=atNoon(d);x.setDate(x.getDate()+n);return x}
function nextClassDate(from,maxDays=370){const d=atNoon(from);for(let i=0;i<=maxDays;i++){const candidate=addDays(d,i);if(exactDay(candidate))return candidate}return null}
function previousClassDate(from,maxDays=370){const d=atNoon(from);for(let i=0;i<=maxDays;i++){const candidate=addDays(d,-i);if(exactDay(candidate))return candidate}return null}
function week(date,opts={}){const monday=mondayOf(date);return[0,1,3,4].map(n=>{const d=addDays(monday,n);return{date:d,...rowsForDate(d,opts)}})}
global.PUBLIC_EDT={periodForDate,periodLabel:p=>periodLabels[p]||p,rowsForDate,week,iso,mondayOf,addDays,dayName,noClassInfo,nextClassDate,previousClassDate,exactDay};
})(window);
