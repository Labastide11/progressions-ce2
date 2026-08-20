(function(root,factory){
  'use strict';
  const api=factory(
    typeof module==='object'&&module.exports ? require('./lsu-synthesis-engine.js') : root.LSUSynthesisEngine
  );
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.LSURealConnector=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(LSU){
  'use strict';

  if(!LSU) throw new Error('LSUSynthesisEngine est requis avant LSURealConnector.');

  const VERSION='1.0.1';
  const API_URL_KEY='hibou_sync_api_url_v25754';
  const DEVICE_KEY='hibou_sync_device_key_v25754';
  const DEFAULT_API_URL='https://script.google.com/macros/s/AKfycbydzPTQ9ZLEPYezHou2-O4IK24ip51sLTpe9qdi2xREuQvDBKRlVqsYYDiKLrzAODc/exec';
  const DEFAULT_SUBJECTS=['francais','maths','anglais','histoire','geographie','sciences','emc','eps','arts'];

  function text(v){return String(v==null?'':v).trim()}
  function norm(v){return text(v).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[_-]+/g,' ').replace(/\s+/g,' ')}
  function uniqueBy(rows,keyFn){const seen=new Set();return (rows||[]).filter(row=>{const k=keyFn(row);if(!k||seen.has(k))return false;seen.add(k);return true})}
  function isoDateValue(v){const t=Date.parse(v||'');return Number.isFinite(t)?t:0}
  function periodFromText(v){const p=norm(v).replace('periode ','p').replace('p ','p');const m=p.match(/^p([1-5])$/);return m?'p'+m[1]:''}
  function semesterFromDate(v){const t=isoDateValue(v);if(!t)return'';const month=new Date(t).getMonth()+1;return month>=8?'S1':'S2'}
  function semesterOfRow(row){
    const explicit=periodFromText(row&&row.periode);
    const fromCode=LSU.periodFromCode(row&&row.competence_code);
    const p=explicit||fromCode;
    if(p)return ['p1','p2'].includes(p)?'S1':'S2';
    return semesterFromDate(row&&row.date);
  }
  function rowInSemester(row,semester){const s=semesterOfRow(row);return !s||s===String(semester||'S1').toUpperCase()}

  function getBrowserConfig(){
    if(typeof localStorage==='undefined')return{url:'',key:''};
    return{
      url:text(localStorage.getItem(API_URL_KEY))||DEFAULT_API_URL,
      key:text(localStorage.getItem(DEVICE_KEY))
    };
  }

  function jsonpSnapshot(prenom,options){
    options=options||{};
    if(typeof document==='undefined')return Promise.reject(new Error('JSONP disponible uniquement dans le navigateur.'));
    const cfg=Object.assign({},getBrowserConfig(),options.api||{});
    if(!cfg.url)return Promise.reject(new Error('URL API Maître Hibou non configurée.'));
    if(!cfg.key)return Promise.reject(new Error('Clé appareil Maître Hibou non configurée.'));
    return new Promise((resolve,reject)=>{
      const cb='progressionsLSU_'+Date.now()+'_'+Math.random().toString(36).slice(2);
      const script=document.createElement('script');
      let done=false;
      const finish=(err,data)=>{if(done)return;done=true;clearTimeout(timer);try{delete globalThis[cb]}catch(e){};script.remove();err?reject(err):resolve(data)};
      const timer=setTimeout(()=>finish(new Error('Délai de connexion au student_snapshot dépassé.')),Number(options.timeoutMs)||20000);
      globalThis[cb]=data=>{
        if(!data||data.ok===false)return finish(new Error(data&&data.error||'Réponse student_snapshot invalide.'));
        finish(null,data);
      };
      const q=new URLSearchParams({
        action:'student_snapshot',prenom:text(prenom),limit:String(Number(options.limit)||500),
        device_key:cfg.key,tablet_key:cfg.key,key:cfg.key,callback:cb,_:String(Date.now())
      });
      script.async=true;
      script.src=cfg.url+'?'+q.toString();
      script.onerror=()=>finish(new Error('API Maître Hibou indisponible.'));
      document.head.appendChild(script);
    });
  }

  function unwrapSnapshot(payload){
    const s=payload&&payload.snapshot?payload.snapshot:payload;
    if(!s||typeof s!=='object')throw new Error('Snapshot élève absent ou invalide.');
    return s;
  }

  function isHibouEvent(e){
    const source=norm(e&&e.source);
    return source.includes('hibou') || !!text(e&&e.mastery_status);
  }

  function buildCompetencesFromProgressions(progressions,subjectKey,semester){
    const s=progressions&&progressions[subjectKey];
    if(!s)return[];
    const periods=LSU.semesterPeriods(semester);
    const out=[];
    periods.forEach(p=>{
      const key=p+'Competencies';
      (s[key]||[]).forEach(c=>out.push(Object.assign({},c,{period:p})));
    });
    (s.annualCompetencies||[]).forEach(c=>out.push(Object.assign({},c,{annual:true})));
    return uniqueBy(out,c=>text(c.code));
  }

  function normalizeSnapshotForSemester(payload,semester){
    const snapshot=unwrapSnapshot(payload), sem=String(semester||'S1').toUpperCase();
    const traces=(snapshot.evaluation_traces||[]).filter(r=>rowInSemester(r,sem));
    const hibou=(snapshot.reussites||[]).filter(isHibouEvent).filter(r=>rowInSemester(r,sem));
    return{
      eleve:snapshot.eleve||{},
      traces,
      hibouEvents:hibou,
      rewards:{
        competences:(snapshot.competences||[]).filter(r=>rowInSemester(r,sem)),
        records:(snapshot.records||[]).filter(r=>rowInSemester(r,sem))
      },
      ignored:{questions:(snapshot.questions||[]).length},
      raw:snapshot
    };
  }

  function sourceStats(normalized){
    const stats={A:0,B:0,C:normalized.hibouEvents.length,D:0,teachingTotal:0};
    normalized.traces.forEach(t=>{const k=LSU.classifyTeachingTrace(t);if(k==='A'||k==='B')stats[k]++;stats.teachingTotal++});
    stats.D=normalized.rewards.competences.length+normalized.rewards.records.length;
    return stats;
  }

  function summarizeSnapshot(payload,options){
    options=options||{};
    const semester=String(options.semester||'S1').toUpperCase();
    const progressions=options.progressions || (typeof window!=='undefined'?window.PROGRESSIONS:null);
    if(!progressions)throw new Error('Référentiel window.PROGRESSIONS indisponible.');
    const normalized=normalizeSnapshotForSemester(payload,semester);
    const subjects=(options.subjects||DEFAULT_SUBJECTS).filter(k=>progressions[k]);
    const summaries={};
    subjects.forEach(key=>{
      const s=progressions[key];
      const competences=buildCompetencesFromProgressions(progressions,key,semester);
      summaries[key]=LSU.summarizeSubject({
        subject:key,subjectTitle:s.title||key,semester,competences,
        traces:normalized.traces,hibouEvents:normalized.hibouEvents
      },options.engineOptions||{});
    });
    const stats=sourceStats(normalized);
    const watch=[];
    Object.values(summaries).forEach(s=>{
      s.competences.forEach(c=>{
        if(c.review||c.core.persistentVigilance)watch.push({subject:s.subject,subjectTitle:s.subjectTitle,code:c.code,label:c.label,level:c.suggestedLevel,levelLabel:c.suggestedLabel,review:c.review,vigilance:c.core.persistentVigilance,group:c.core.group,confidence:c.confidence});
      });
    });
    const report={
      connectorVersion:VERSION,engineVersion:LSU.VERSION||'',readOnly:true,student:text(normalized.eleve.prenom)||text(options.prenom),semester,
      generatedAt:new Date().toISOString(),sources:stats,subjects:summaries,watch,
      safeguards:{studentSnapshotOnly:true,noPost:true,noSaveAction:true,noLocalMutation:true,teacherEvidencePriority:true,hibouNeverOverridesA:true}
    };
    report.markdown=formatDiagnosticMarkdown(report);
    return report;
  }

  function pct(v){return Math.round((Number(v)||0)*100)}
  function formatDiagnosticMarkdown(report){
    const lines=[];
    lines.push('# Diagnostic LSU — '+(report.student||'Élève')+' — '+report.semester,'');
    lines.push('**Lecture seule.** Aucune donnée n’est modifiée dans Google Sheets ou dans Progressions CE2.','');
    lines.push('## Sources réellement utilisées','');
    lines.push('- A — preuves fortes : **'+report.sources.A+'**');
    lines.push('- B — traces formatives / cahier du jour : **'+report.sources.B+'**');
    lines.push('- C — Maître Hibou : **'+report.sources.C+'**');
    lines.push('- D — récompenses / records informatifs : **'+report.sources.D+'**','');
    lines.push('## Synthèse par matière','');
    lines.push('| Matière | Suggestion | Couverture | Profil | Tendance | Confiance | Vigilances |','|---|---|---:|---|---|---|---|');
    Object.values(report.subjects).forEach(r=>{
      const vig=r.vigilances&&r.vigilances.length?r.vigilances.map(v=>v.group||v.code).join(', '):'—';
      lines.push('| '+r.subjectTitle+' | '+(r.suggestedLabel||'Aucune')+' | '+r.coverage.documented+'/'+r.coverage.total+' ('+pct(r.coverage.ratio)+' %) | '+r.profile.solid+' solides · '+r.profile.consolidation+' consolidation · '+r.profile.priority+' priorité · '+r.profile.undocumented+' non doc. | '+r.trend+' | '+r.confidence+' | '+vig+' |');
    });
    lines.push('','## Points à examiner','');
    if(!report.watch.length)lines.push('Aucun signal particulier produit par le moteur.');
    else report.watch.forEach(w=>lines.push('- **'+w.subjectTitle+' — '+w.code+'** : '+(w.levelLabel||'sans niveau')+(w.review?' · '+w.review:'')+(w.vigilance?' · vigilance '+(w.group||'structurante'):'')));
    lines.push('','## Règles de sécurité pédagogique','', '- La preuve enseignante A reste prioritaire.', '- Les traces B peuvent confirmer une évolution ou provoquer un réexamen.', '- Maître Hibou C confirme ou nuance mais ne remplace jamais A.', '- Les éléments D ne déterminent jamais le niveau LSU.', '- Aucune moyenne arithmétique des niveaux n’est calculée.');
    return lines.join('\n');
  }

  async function diagnosticStudent(prenom,semester,options){
    options=Object.assign({},options||{},{prenom:text(prenom),semester:String(semester||'S1').toUpperCase()});
    const fetcher=options.fetchSnapshot || jsonpSnapshot;
    const payload=await fetcher(text(prenom),options);
    return summarizeSnapshot(payload,options);
  }

  function consoleDiagnostic(report){
    if(typeof console==='undefined')return report;
    console.group('LSU '+report.student+' — '+report.semester+' (lecture seule)');
    console.log(report.markdown);
    console.log('Objet complet :',report);
    console.groupEnd();
    return report;
  }

  return{
    VERSION,API_URL_KEY,DEVICE_KEY,DEFAULT_SUBJECTS,getBrowserConfig,semesterOfRow,rowInSemester,
    buildCompetencesFromProgressions,normalizeSnapshotForSemester,sourceStats,summarizeSnapshot,
    formatDiagnosticMarkdown,jsonpSnapshot,diagnosticStudent,consoleDiagnostic
  };
});
