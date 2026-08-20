'use strict';
const assert=require('assert');
const LSU=require('../lsu-synthesis-engine.js');
const t=(date,code,level,source='evaluation_papier',evaluation_id='eval')=>({date,competence_code:code,niveau_lsu:level,source,evaluation_id});
const h=(date,code,status)=>({date,competence_code:code,mastery_status:status});

// 1. Une preuve forte unique : niveau conservé, confiance moyenne.
let r=LSU.summarizeCompetence({competence:{code:'NUM-P1-01'},semester:'S1',traces:[t('2026-10-01','NUM-P1-01','Atteint')]});
assert.equal(r.suggestedLevel,'atteint'); assert.equal(r.confidence,'moyenne');

// 2. Une ancienne difficulté ne pénalise pas une maîtrise récente consolidée.
r=LSU.summarizeCompetence({competence:{code:'NUM-P1-01'},semester:'S1',traces:[
  t('2026-09-15','NUM-P1-01','Non atteint'),t('2026-10-01','NUM-P1-01','Partiellement atteint'),t('2026-11-10','NUM-P1-01','Atteint'),t('2026-12-01','NUM-P1-01','Atteint')
]});
assert.equal(r.suggestedLevel,'atteint'); assert.equal(r.confidence,'elevee');

// 3. Des traces B plus favorables demandent un réexamen sans écraser A.
r=LSU.summarizeCompetence({competence:{code:'PRO-P1-01'},semester:'S1',traces:[
  t('2026-10-01','PRO-P1-01','Partiellement atteint'),
  t('2026-11-10','PRO-P1-01','Atteint','cahier_du_jour',''),t('2026-11-24','PRO-P1-01','Atteint','trace_formative','')
]});
assert.equal(r.suggestedLevel,'partiellement_atteint'); assert.equal(r.review,'a_reexaminer_progression');

// 4. Hibou confirme/nuance, mais ne modifie pas la preuve A.
r=LSU.summarizeCompetence({competence:{code:'CAL-P1-01'},semester:'S1',traces:[t('2026-11-01','CAL-P1-01','Atteint')],hibouEvents:[h('2026-11-10','CAL-P1-01','reussi_seul'),h('2026-11-20','CAL-P1-01','maitrise_plusieurs_fois')]});
assert.equal(r.suggestedLevel,'atteint'); assert.ok(['confirme','progression_autonome'].includes(r.hibou.status));

// 5. Hibou seul ne suffit pas à poser un niveau LSU.
r=LSU.summarizeCompetence({competence:{code:'CAL-P1-01'},semester:'S1',traces:[],hibouEvents:[h('2026-11-10','CAL-P1-01','maitrise_plusieurs_fois')]});
assert.equal(r.suggestedLevel,null); assert.equal(r.confidence,'insuffisante');

// 6. Vigilance structurante : difficulté répétée dans le temps + trace enseignante.
r=LSU.summarizeCompetence({competence:{code:'COM-P1-01',lsuCore:true,lsuCoreGroup:'comprehension'},semester:'S1',traces:[
  t('2026-09-15','COM-P1-01','Partiellement atteint','observation_classe','eval-com'),
  t('2026-10-20','COM-P1-01','Partiellement atteint','cahier_du_jour','')
]});
assert.equal(r.core.persistentVigilance,true);

// 7. Matière : majorité solide + difficulté structurante = Atteint avec vigilance, pas moyenne punitive.
const competences=[1,2,3,4,5,6,7,8,9,10].map(i=>({code:'MAT-P1-'+String(i).padStart(2,'0'),domain:i<=5?'Nombres et calcul':'Problèmes',lsuCore:i===10,lsuCoreGroup:i===10?'problemes':''}));
const traces=[];
for(let i=1;i<=9;i++)traces.push(t('2026-10-01','MAT-P1-'+String(i).padStart(2,'0'),i===1?'Dépassé':'Atteint'));
traces.push(t('2026-09-10','MAT-P1-10','Partiellement atteint','observation_classe','eval-prob'));
traces.push(t('2026-10-20','MAT-P1-10','Partiellement atteint','cahier_du_jour',''));
let s=LSU.summarizeSubject({subject:'maths',subjectTitle:'Mathématiques',semester:'S1',competences,traces});
assert.equal(s.suggestedLevel,'atteint'); assert.equal(s.vigilances.length,1);

// 8. Couverture trop faible : pas de verdict.
s=LSU.summarizeSubject({subject:'maths',semester:'S1',competences,traces:[t('2026-10-01','MAT-P1-01','Atteint')]});
assert.equal(s.suggestedLevel,null); assert.equal(s.confidence,'insuffisante');

console.log('OK — LSU Synthesis Engine V1 : 8 scénarios validés.');
