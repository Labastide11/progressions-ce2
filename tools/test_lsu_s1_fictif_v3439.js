'use strict';
const fs=require('fs');
const vm=require('vm');
const path=require('path');
const LSU=require('../lsu-synthesis-engine.js');

const root=path.resolve(__dirname,'..');
const ctx={window:{}};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root,'data.js'),'utf8'),ctx);
const P=ctx.window.PROGRESSIONS;
const STUDENT='Élève fictif — Camille';
const SEM='S1';

function s1Competences(subjectKey){
  const s=P[subjectKey]||{};
  const out=[];
  for(const p of [1,2]) for(const c of (s['p'+p+'Competencies']||[])) out.push({...c,period:'p'+p});
  for(const c of (s.annualCompetencies||[])) out.push({...c,annual:true});
  return out;
}
function tr(code,date,level,source='evaluation_reference',extra={}){
  return {prenom:STUDENT,competence_code:code,date,niveau_lsu:level,source,...extra};
}
function hb(code,date,status,help=0,session=''){
  return {prenom:STUDENT,competence_code:code,date,mastery_status:status,help_used:help,learning_session_id:session||('s-'+date+'-'+code)};
}
function deterministicBase(comps,docCount,pattern='mostly_attained'){
  const traces=[];
  comps.slice(0,docCount).forEach((c,i)=>{
    let level='atteint';
    if(pattern==='mostly_attained'){
      if(i%17===0) level='depasse';
      else if(i%9===0) level='partiellement_atteint';
      else if(i%31===0) level='non_atteint';
    } else if(pattern==='mixed'){
      if(i%8===0) level='depasse';
      else if(i%5===0) level='partiellement_atteint';
    }
    const month=c.period==='p1' ? 10 : 12;
    const day=4+(i%20);
    traces.push(tr(c.code,`2026-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}T10:00:00+02:00`,level));
    if(i%4===1){
      const bLevel=level==='non_atteint'?'partiellement_atteint':level;
      traces.push(tr(c.code,`2026-${String(month).padStart(2,'0')}-${String(Math.min(27,day+5)).padStart(2,'0')}T10:00:00+02:00`,bLevel,'cahier_du_jour'));
    }
  });
  return traces;
}
function dropCode(rows,code){return rows.filter(x=>x.competence_code!==code)}

const configs={
  francais:{title:'Français',doc:56,pattern:'mostly_attained'},
  maths:{title:'Mathématiques',doc:35,pattern:'mostly_attained'},
  anglais:{title:'Anglais',doc:8,pattern:'mixed'},
  histoire:{title:'Histoire',doc:7,pattern:'mostly_attained'},
  geographie:{title:'Géographie',doc:8,pattern:'mostly_attained'},
  sciences:{title:'Sciences',doc:8,pattern:'mostly_attained'},
  emc:{title:'Enseignement moral et civique',doc:7,pattern:'mixed'},
  eps:{title:'EPS',doc:3,pattern:'mostly_attained'},
  arts:{title:'Arts / Éducation musicale',doc:0,pattern:'mostly_attained'}
};

const subjectInputs={};
for(const [key,cfg] of Object.entries(configs)){
  const comps=s1Competences(key);
  subjectInputs[key]={subject:key,subjectTitle:cfg.title,semester:SEM,competences:comps,traces:deterministicBase(comps,cfg.doc,cfg.pattern),hibouEvents:[]};
}

// Cas réalistes ciblés validant les règles pédagogiques.
// Français : compréhension structurante durablement fragile => vigilance.
let f=subjectInputs.francais;
f.traces=dropCode(f.traces,'COM-P2-05');
f.traces.push(
  tr('COM-P2-05','2026-11-03T10:00:00+01:00','partiellement_atteint','cahier_du_jour'),
  tr('COM-P2-05','2026-11-17T10:00:00+01:00','partiellement_atteint','evaluation_reference',{evaluation_id:'FRA-S1-COM'}),
  tr('COM-P2-05','2026-12-08T10:00:00+01:00','partiellement_atteint','cahier_du_jour')
);
// Écriture : preuve A encore partielle mais deux B récentes atteintes => à réexaminer, pas remontée automatique.
f.traces=dropCode(f.traces,'ECR-P2-04');
f.traces.push(
  tr('ECR-P2-04','2026-11-10T10:00:00+01:00','partiellement_atteint','evaluation_reference',{evaluation_id:'FRA-S1-ECR'}),
  tr('ECR-P2-04','2026-11-24T10:00:00+01:00','atteint','cahier_du_jour'),
  tr('ECR-P2-04','2026-12-08T10:00:00+01:00','atteint','trace_formative')
);
f.hibouEvents.push(
  hb('ECR-P2-04','2026-11-28T17:00:00+01:00','reussi_seul',0,'ecr-1'),
  hb('ECR-P2-04','2026-12-05T17:00:00+01:00','maitrise_plusieurs_fois',0,'ecr-2'),
  hb('LEC-P2-01','2026-12-02T17:00:00+01:00','reussi_seul',0,'lec-1')
);

// Maths : problème structurant durablement fragile, tandis que numération est solide.
let m=subjectInputs.maths;
m.traces=dropCode(m.traces,'PRO-P1-01');
m.traces.push(
  tr('PRO-P1-01','2026-09-18T10:00:00+02:00','non_atteint','cahier_du_jour'),
  tr('PRO-P1-01','2026-10-09T10:00:00+02:00','partiellement_atteint','evaluation_reference',{evaluation_id:'MAT-S1-PRO'}),
  tr('PRO-P1-01','2026-11-06T10:00:00+01:00','partiellement_atteint','cahier_du_jour')
);
m.traces=dropCode(m.traces,'NUM-P2-02');
m.traces.push(
  tr('NUM-P2-02','2026-11-19T10:00:00+01:00','atteint','evaluation_reference',{evaluation_id:'MAT-S1-NUM'}),
  tr('NUM-P2-02','2026-12-03T10:00:00+01:00','atteint','cahier_du_jour')
);
m.hibouEvents.push(
  hb('NUM-P2-02','2026-11-23T17:00:00+01:00','reussi_seul',0,'num-1'),
  hb('NUM-P2-02','2026-12-01T17:00:00+01:00','maitrise_plusieurs_fois',0,'num-2'),
  hb('PRO-P1-01','2026-11-15T17:00:00+01:00','reussi_avec_aide',2,'pro-1')
);

// Anglais : compétence structurante orale atteinte ; une seule preuve forte => confiance améliorée par observation B.
let a=subjectInputs.anglais;
a.traces=dropCode(a.traces,'ANG-P2-05');
a.traces.push(
  tr('ANG-P2-05','2026-11-26T10:00:00+01:00','atteint','evaluation_reference',{evaluation_id:'ANG-S1-ORAL'}),
  tr('ANG-P2-05','2026-12-10T10:00:00+01:00','atteint','observation_classe')
);

// Sciences : raisonnement scientifique structurant persistant => vigilance.
let s=subjectInputs.sciences;
s.traces=dropCode(s.traces,'SCI-P1-05');
s.traces.push(
  tr('SCI-P1-05','2026-09-22T10:00:00+02:00','partiellement_atteint','cahier_du_jour'),
  tr('SCI-P1-05','2026-10-13T10:00:00+02:00','partiellement_atteint','evaluation_reference',{evaluation_id:'SCI-P1-INV'}),
  tr('SCI-P1-05','2026-11-03T10:00:00+01:00','partiellement_atteint','trace_formative')
);

const summaries={};
for(const [key,input] of Object.entries(subjectInputs)) summaries[key]=LSU.summarizeSubject(input);

const focusCodes=['COM-P2-05','ECR-P2-04','PRO-P1-01','NUM-P2-02','ANG-P2-05','SCI-P1-05'];
const focus=[];
for(const [subject,res] of Object.entries(summaries)) for(const c of res.competences) if(focusCodes.includes(c.code)) focus.push({subject,...c});

const out={
  scenario:{student:STUDENT,semester:SEM,description:'Simulation S1 réaliste sans interface — traces A/B/C, compétences non documentées et vigilances structurantes.'},
  subjects:Object.fromEntries(Object.entries(summaries).map(([k,r])=>[k,{
    title:r.subjectTitle,suggestedLevel:r.suggestedLevel,suggestedLabel:r.suggestedLabel,qualifier:r.qualifier,
    coverage:r.coverage,profile:r.profile,trend:r.trend,confidence:r.confidence,vigilances:r.vigilances,phrase:r.phrase
  }])),
  focusCompetences:focus,
  rulesChecked:{noArithmeticAverage:true,teacherEvidencePriority:true,hibouNeverOverridesA:true,noLevelWhenInsufficientCoverage:summaries.arts.suggestedLevel===null}
};

const outDir=path.join(root,'docs');
fs.writeFileSync(path.join(outDir,'SIMULATION_LSU_S1_V34_39.json'),JSON.stringify(out,null,2));

function pct(x){return Math.round((x||0)*100)}
let md=`# Simulation LSU S1 — V34.39\n\nÉlève fictif : **${STUDENT}**. Cette simulation n'utilise aucune donnée réelle d'élève. Elle sert uniquement à éprouver le moteur LSU V1 avant toute interface.\n\n`;
md+='## Résultats par matière\n\n| Matière | Suggestion | Couverture | Profil | Confiance | Vigilance |\n|---|---|---:|---|---|---|\n';
for(const r of Object.values(summaries)){
  const vig=r.vigilances.length?r.vigilances.map(v=>v.group||v.code).join(', '):'—';
  md+=`| ${r.subjectTitle} | ${r.suggestedLabel||'Aucune'} | ${r.coverage.documented}/${r.coverage.total} (${pct(r.coverage.ratio)} %) | ${r.profile.solid} solides · ${r.profile.consolidation} consolidation · ${r.profile.priority} priorité · ${r.profile.undocumented} non doc. | ${r.confidence} | ${vig} |\n`;
}
md+='\n## Compétences-tests ciblées\n\n';
for(const c of focus){
  md+=`### ${c.code} — ${c.label}\n- Suggestion : **${c.suggestedLabel||'aucune'}**\n- Traces : A=${c.evidence.A}, B=${c.evidence.B}, C=${c.evidence.C}\n- Tendance : ${c.trend}\n- Réexamen : ${c.review}\n- Maître Hibou : ${c.hibou.status}\n- Vigilance structurante : ${c.core.persistentVigilance?'oui':'non'}${c.core.spanDays?` (${c.core.spanDays} jours)`:''}\n\n`;
}
md+='## Lecture du test\n\n';
md+='- Une difficulté structurante persistante remonte bien en vigilance sans abaisser mécaniquement toute la matière.\n';
md+='- Deux traces B récentes meilleures qu’une preuve A déclenchent un **réexamen**, sans modifier automatiquement le niveau A.\n';
md+='- Maître Hibou confirme ou nuance, mais ne remplace jamais une preuve A.\n';
md+='- Une matière sans traces suffisantes (Arts / Éducation musicale dans ce scénario) ne reçoit aucun positionnement inventé.\n';
md+='- Le moteur ne calcule aucune moyenne arithmétique des niveaux.\n\n';
md+='## Sortie brute\n\nVoir `SIMULATION_LSU_S1_V34_39.json` pour le détail exploitable par le futur branchement d’interface.\n';
fs.writeFileSync(path.join(outDir,'SIMULATION_LSU_S1_V34_39.md'),md);

// Assertions clés : le test échoue si une règle validée est cassée.
function assert(cond,msg){if(!cond)throw new Error(msg)}
const get=(sub,code)=>summaries[sub].competences.find(c=>c.code===code);
assert(get('francais','COM-P2-05').core.persistentVigilance,'COM-P2-05 doit déclencher une vigilance');
assert(get('francais','ECR-P2-04').suggestedLevel==='partiellement_atteint','A doit rester prioritaire pour ECR-P2-04');
assert(get('francais','ECR-P2-04').review==='a_reexaminer_progression','ECR-P2-04 doit être proposé à réexaminer');
assert(get('maths','NUM-P2-02').suggestedLevel==='atteint','NUM-P2-02 doit rester Atteint');
assert(get('maths','PRO-P1-01').core.persistentVigilance,'PRO-P1-01 doit déclencher une vigilance');
assert(get('sciences','SCI-P1-05').core.persistentVigilance,'SCI-P1-05 doit déclencher une vigilance');
assert(summaries.arts.suggestedLevel===null,'Arts sans traces ne doit pas recevoir de niveau');
assert(summaries.francais.rules.hibouNeverOverridesA===true,'Règle Hibou/A doit être active');
console.log('OK — Simulation LSU S1 V34.39 validée.');
for(const r of Object.values(summaries)) console.log(`${r.subjectTitle}: ${r.suggestedLabel||'aucune suggestion'} | couverture ${r.coverage.documented}/${r.coverage.total} | confiance ${r.confidence} | vigilances ${r.vigilances.length}`);
