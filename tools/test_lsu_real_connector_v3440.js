'use strict';
const fs=require('fs');
const vm=require('vm');
const path=require('path');
const Connector=require('../lsu-real-connector.js');
const root=path.resolve(__dirname,'..');
const ctx={window:{}}; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(root,'data.js'),'utf8'),ctx);
const P=ctx.window.PROGRESSIONS;
const STUDENT='Élève test connecteur';
function trace(code,date,level,source='evaluation_reference',extra={}){return {prenom:STUDENT,competence_code:code,date,niveau_lsu:level,source,...extra}}
function hibou(code,date,status,help=0){return {prenom:STUDENT,competence_code:code,date,source:'maitre_hibou',mastery_status:status,help_used:help,learning_session_id:code+'-'+date}}
const snapshot={ok:true,snapshot:{
  eleve:{prenom:STUDENT,actif:true},
  evaluation_traces:[
    trace('NUM-P2-02','2026-11-19T10:00:00+01:00','atteint','evaluation_reference',{evaluation_id:'MAT-NUM'}),
    trace('NUM-P2-02','2026-12-03T10:00:00+01:00','atteint','cahier_du_jour'),
    trace('PRO-P1-01','2026-09-18T10:00:00+02:00','non_atteint','cahier_du_jour'),
    trace('PRO-P1-01','2026-10-09T10:00:00+02:00','partiellement_atteint','evaluation_reference',{evaluation_id:'MAT-PRO'}),
    trace('PRO-P1-01','2026-11-06T10:00:00+01:00','partiellement_atteint','cahier_du_jour'),
    // trace annuelle : le connecteur doit la ranger en S1 par sa date
    trace('ART-ANN-01','2026-12-08T14:00:00+01:00','atteint','observation_classe')
  ],
  reussites:[
    hibou('NUM-P2-02','2026-11-23T17:00:00+01:00','reussi_seul'),
    hibou('NUM-P2-02','2026-12-01T17:00:00+01:00','maitrise_plusieurs_fois'),
    // doit être exclu de S1
    hibou('CAL-P3-01','2027-02-01T17:00:00+01:00','reussi_seul')
  ],
  competences:[{prenom:STUDENT,date:'2026-12-01',competence:'Ceinture jaune',medaille:'or'}],
  records:[{prenom:STUDENT,date:'2026-12-02',ceinture:'Calcul mental',score:10,total:10}],
  questions:[{id:'q1'}]
}};
function assert(cond,msg){if(!cond)throw new Error(msg)}
const normalized=Connector.normalizeSnapshotForSemester(snapshot,'S1');
assert(normalized.traces.length===6,'Les 6 traces S1 doivent être retenues');
assert(normalized.hibouEvents.length===2,'L’événement P3 doit être exclu de S1');
assert(Connector.semesterOfRow(snapshot.snapshot.evaluation_traces[5])==='S1','La trace annuelle de décembre doit être classée S1');
const report=Connector.summarizeSnapshot(snapshot,{semester:'S1',progressions:P,prenom:STUDENT});
assert(report.readOnly===true,'Le rapport doit être marqué lecture seule');
assert(report.safeguards.noPost&&report.safeguards.noSaveAction,'Aucune écriture API ne doit être prévue');
assert(report.sources.A===2,'Deux preuves A attendues');
assert(report.sources.B===4,'Quatre traces B attendues');
assert(report.sources.C===2,'Deux événements Hibou attendus');
assert(report.sources.D===2,'Deux informations D attendues');
const num=report.subjects.maths.competences.find(c=>c.code==='NUM-P2-02');
const pro=report.subjects.maths.competences.find(c=>c.code==='PRO-P1-01');
assert(num&&num.suggestedLevel==='atteint','NUM-P2-02 doit être Atteint');
assert(num.hibou.status==='confirme'||num.hibou.status==='progression_autonome','Hibou doit confirmer/renforcer NUM-P2-02');
assert(pro&&pro.core.persistentVigilance===true,'PRO-P1-01 doit déclencher une vigilance');
assert(report.markdown.includes('Lecture seule'),'Le rapport Markdown doit rappeler le mode lecture seule');
console.log('OK — Connecteur LSU réel V34.40 : adaptateur snapshot, semestre, A/B/C/D et lecture seule validés.');
console.log('Sources :',report.sources);
console.log('Mathématiques :',report.subjects.maths.suggestedLabel,'| couverture',report.subjects.maths.coverage.documented+'/'+report.subjects.maths.coverage.total);
