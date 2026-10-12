/* Progressions CE2 V37.22 — tableau de lecture, aucune écriture distante */
(()=>{'use strict';
const $=id=>document.getElementById(id);
const board=$('bilanCompetences');if(!board)return;
const API='https://script.google.com/macros/s/AKfycbydzPTQ9ZLEPYezHou2-O4IK24ip51sLTpe9qdi2xREuQvDBKRlVqsYYDiKLrzAODc/exec';
const STORE='ce2-evaluations-rapides-v1';
const NAMES=['Anis','Assya','Bilal','Espoir','Fahd','Hamza','Jinène','Khadidja','Mohamed_S','Mohamed_Z','Rayan','Ritej','Sayf','Selma','Yaman','Yazdan','Younis'];
const DEFS={
 'histoire-p1-reperes-periodes':['Associer un repère historique à une période','Identifier la période d’un repère historique','Connaître l’ordre des cinq périodes historiques'],
 'lexique-p1-ordre-alphabetique':['Classer selon la première lettre','Comparer la deuxième lettre','Comparer plusieurs lettres successives']
};
let records=null,source='';
function label(v){return ({acquis:'✓ Acquis',a_retravailler:'✕ À retravailler',absent:'A Absent'})[v]||'—';}
function cell(v){const td=document.createElement('td');td.className='board-cell '+(v==='acquis'?'ok':v==='a_retravailler'?'fail':v==='absent'?'absent':'blank');td.textContent=label(v);return td;}
function show(){const key=$('boardEval').value;const defs=DEFS[key];defs.forEach((v,i)=>$('boardSkill'+(i+1)).textContent='Exercice '+(i+1)+' — '+v);
 const body=$('boardRows');body.replaceChildren();const totals=defs.map(()=>({acquis:0,fail:0,absent:0,other:0}));
 for(const name of NAMES){const tr=document.createElement('tr');const first=document.createElement('td');first.textContent=name;tr.append(first);for(let i=0;i<3;i++){const value=(records?.[key]?.[name]||[])[i]||'';tr.append(cell(value));if(value==='acquis')totals[i].acquis++;else if(value==='a_retravailler')totals[i].fail++;else if(value==='absent')totals[i].absent++;else totals[i].other++;}body.append(tr)}
 const sum=$('boardSummary');sum.replaceChildren();defs.forEach((v,i)=>{const d=document.createElement('article'),h=document.createElement('strong'),p=document.createElement('p');h.textContent='Exercice '+(i+1)+' — '+v;const t=totals[i];p.textContent=t.acquis+' acquis · '+t.fail+' à retravailler · '+t.absent+' absents · '+t.other+' non renseignés';d.append(h,p);sum.append(d)});
}
function localRead(){let state;try{state=JSON.parse(localStorage.getItem(STORE)||'null')}catch(_){state=null}if(!state?.competenceResults){$('boardStatus').textContent='Aucune saisie locale disponible sur ce navigateur.';records=null;source='';show();return}
 const map={};for(const [ev,byName] of Object.entries(state.competenceResults)){map[ev]={};for(const [name,r] of Object.entries(byName||{})){map[ev][name]=[0,1,2].map(i=>r.absent?'absent':r.skills?.[i]==='ok'?'acquis':r.skills?.[i]==='fail'?'a_retravailler':'')}}
 records=map;source='local';$('boardStatus').textContent='Résultats locaux affichés (cet appareil seulement). Pour voir la source centralisée, charge Google Sheets.';show();}
function jsonp(params){return new Promise((resolve,reject)=>{const callback='ce2board_'+Date.now()+'_'+Math.random().toString(36).slice(2);const script=document.createElement('script');let settled=false;let timer;const clean=()=>{delete window[callback];script.remove();clearTimeout(timer)};timer=setTimeout(()=>{if(!settled){settled=true;clean();reject(Error('Délai de connexion dépassé'))}},25000);window[callback]=v=>{if(!settled){settled=true;clean();resolve(v)}};script.onerror=()=>{if(!settled){settled=true;clean();reject(Error('Connexion à Apps Script impossible'))}};script.src=API+'?'+new URLSearchParams({...params,callback}).toString();document.head.append(script)})}
async function remoteRead(){const secret=$('boardKey').value.trim();if(!secret){$('boardStatus').textContent='Saisis ta clé professionnelle pour consulter les résultats Google Sheets.';return}const btn=$('boardLoad');btn.disabled=true;$('boardStatus').textContent='Chargement des compétences depuis Google Sheets…';try{const response=await jsonp({action:'evaluation_traces',device_key:secret,limit:'5000'});if(!response?.ok)throw Error(response?.error||response?.code||'Réponse non reconnue');const map={},seen=new Set();for(const row of (response.traces||[])){const ev=String(row.evaluation_id||''),name=String(row.prenom||'');const i=Number((String(row.trace_id||'').match(/-EX([123])$/i)||[])[1])-1;if(!DEFS[ev]||!NAMES.includes(name)||!(i>=0&&i<=2)||!String(row.source||'').startsWith('evaluations_ce2_'))continue;
 const uniq=ev+'|'+name+'|'+i;if(seen.has(uniq))continue;seen.add(uniq);map[ev]??={};map[ev][name]??=['','',''];map[ev][name][i]=String(row.niveau_suivi||'');}
 records=map;source='sheets';$('boardStatus').textContent='Google Sheets : '+seen.size+' résultats de compétence retrouvés pour les évaluations de classe. Consultation seule.';show();}catch(e){$('boardStatus').textContent='Lecture impossible : '+e.message+'. Les résultats déjà affichés sont conservés.'}finally{btn.disabled=false}}
$('boardEval').addEventListener('change',show);$('boardLocal').addEventListener('click',localRead);$('boardLoad').addEventListener('click',remoteRead);show();
})();
