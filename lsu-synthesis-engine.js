(function(root,factory){
  'use strict';
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.LSUSynthesisEngine=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';

  const VERSION='1.1.0';
  const LEVELS=['non_atteint','partiellement_atteint','atteint','depasse'];
  const LEVEL_LABELS={
    non_atteint:'Non atteint',
    partiellement_atteint:'Partiellement atteint',
    atteint:'Atteint',
    depasse:'Dépassé'
  };
  const LEVEL_RANK={non_atteint:0,partiellement_atteint:1,atteint:2,depasse:3};
  const DEFAULTS={
    minCoverageForSuggestion:0.40,
    mediumCoverageThreshold:0.60,
    fragileReviewThreshold:1/3,
    strongMajorityThreshold:0.67,
    nonAttainedConcernThreshold:0.35,
    vigilanceMinTeachingTraces:2,
    vigilanceMinSpanDays:21,
    reexamineMinRecentSignals:2,
    subjectExceededMinRatio:0.50,
    subjectSolidMinRatioForExceeded:0.90,
    subjectTransferMinCount:2
  };

  function norm(v){return String(v==null?'':v).trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[_-]+/g,' ').replace(/\s+/g,' ')}
  function normalizeLevel(v){
    const x=norm(v);
    if(!x||x==='none'||x==='non evalue'||x==='non evaluee')return null;
    if(['non atteint','a revoir','a renforcer','renforcer','insuffisant'].includes(x))return'non_atteint';
    if(['partiellement atteint','en progres','en cours','encours','reussi avec aide','reussie avec aide'].includes(x))return'partiellement_atteint';
    if(['atteint','reussi','reussie','acquis','reussi seul','reussie seule'].includes(x))return'atteint';
    if(['depasse','excellent','tres bien maitrise','maitrise plusieurs fois','maitrisee plusieurs fois'].includes(x))return'depasse';
    if(x.includes('maitris')&&x.includes('plusieurs'))return'depasse';
    if(x.includes('reussi')&&x.includes('seul'))return'atteint';
    if(x.includes('aide'))return'partiellement_atteint';
    return null;
  }
  function dateValue(v){const t=Date.parse(v||'');return Number.isFinite(t)?t:0}
  function daysBetween(a,b){return Math.abs((b-a)/86400000)}
  function semesterPeriods(semester){return String(semester).toUpperCase()==='S2'?['p3','p4','p5']:['p1','p2']}
  function periodFromCode(code){const m=String(code||'').match(/-P([1-5])-/i);return m?'p'+m[1]:''}
  function sameSemester(trace,semester){
    const p=norm(trace&&trace.periode).replace('periode ','p').replace('p ','p');
    const canonical=/^p[1-5]$/.test(p)?p:periodFromCode(trace&&trace.competence_code);
    return !canonical||semesterPeriods(semester).includes(canonical);
  }

  function classifyTeachingTrace(t){
    const source=norm(t&&t.source), evaluationId=String(t&&t.evaluation_id||'').trim();
    if(['maitre hibou','maitre_hibou','hibou'].includes(source))return'C';
    if(/medaille|record|recompense|ceinture/.test(source))return'D';
    if(/cahier du jour|trace formative|formative|petite trace|exercice de seance/.test(source))return'B';
    if(source==='evaluation papier'||source==='evaluation_papier'||source==='evaluation reference'||source==='evaluation_reference')return'A';
    if(source==='observation classe'||source==='observation_classe')return evaluationId?'A':'B';
    if(evaluationId)return'A';
    return'B';
  }

  function normalizeTeachingTrace(t){
    const level=normalizeLevel((t&&t.niveau_lsu)||(t&&t.niveau_suivi)||(t&&t.level));
    if(!level)return null;
    return{
      raw:t,
      date:dateValue(t&&t.date),
      level,
      rank:LEVEL_RANK[level],
      strength:classifyTeachingTrace(t),
      source:String(t&&t.source||''),
      transfer:!!(t&&(t.transfer===true||norm(t.transfer)==='oui'||norm(t.note).includes('transfert')))
    };
  }
  function normalizeHibouEvent(e){
    const status=(e&&e.mastery_status)||(e&&e.resultat)||(e&&e.statut)||(e&&e.medaille);
    const level=normalizeLevel(status);
    if(!level)return null;
    return{
      raw:e,
      date:dateValue(e&&e.date),
      level,
      rank:LEVEL_RANK[level],
      strength:'C',
      source:'maitre_hibou',
      helpUsed:Number(e&&e.help_used||0),
      sessionId:String(e&&e.learning_session_id||''),
      transfer:false
    };
  }
  function sortByDate(rows){return rows.slice().sort((a,b)=>a.date-b.date)}

  function detectTrend(rows){
    const seq=sortByDate(rows.filter(x=>x&&Number.isInteger(x.rank)));
    if(seq.length<2)return'insuffisante';
    let up=0,down=0,same=0;
    for(let i=1;i<seq.length;i++){
      const d=seq[i].rank-seq[i-1].rank;
      if(d>0)up++;else if(d<0)down++;else same++;
    }
    const first=seq[0].rank,last=seq[seq.length-1].rank;
    if(last>first&&down===0)return up>=2?'progression_nette':'progression';
    if(last>first&&up>down)return'progression_irreguliere';
    if(last<first&&up===0)return'difficulte_recente';
    if(last<first&&down>up)return'fragilisation';
    if(up&&down)return'fluctuant';
    if(same===seq.length-1)return'stable';
    return'a_confirmer';
  }

  function aEvidenceDecision(aRows){
    const a=sortByDate(aRows);
    if(!a.length)return{level:null,confidence:'insuffisante',pattern:'aucune_preuve_forte'};
    if(a.length===1)return{level:a[0].level,confidence:'moyenne',pattern:'preuve_forte_unique'};
    const last=a[a.length-1], prev=a[a.length-2];
    const allSame=a.every(x=>x.level===last.level);
    if(allSame)return{level:last.level,confidence:'elevee',pattern:'preuves_fortes_concordantes'};
    if(last.rank>prev.rank)return{level:last.level,confidence:a.length>=3?'elevee':'moyenne',pattern:'progression_recente'};
    if(last.rank===prev.rank)return{level:last.level,confidence:'elevee',pattern:'niveau_recent_consolide'};
    if(last.rank<prev.rank)return{level:last.level,confidence:'moyenne',pattern:'difficulte_recente'};
    return{level:last.level,confidence:'moyenne',pattern:'resultats_fluctuants'};
  }

  function recentSignalsAgainstAnchor(rows,anchorRank,minCount){
    const filtered=sortByDate(rows).filter(x=>x.rank!==anchorRank);
    if(filtered.length<minCount)return null;
    const recent=filtered.slice(-minCount);
    if(recent.every(x=>x.rank>anchorRank))return'hausse';
    if(recent.every(x=>x.rank<anchorRank))return'baisse';
    return null;
  }

  function hibouSummary(rows,anchorLevel){
    if(!rows.length)return{status:'absent',count:0};
    const seq=sortByDate(rows), last=seq[seq.length-1], anchor=anchorLevel?LEVEL_RANK[anchorLevel]:null;
    const autonomous=seq.filter(x=>x.level==='atteint'||x.level==='depasse').length;
    const repeated=seq.filter(x=>x.level==='depasse').length;
    let status='indication';
    if(anchor!=null){
      if(last.rank===anchor||Math.abs(last.rank-anchor)<=0)status='confirme';
      else if(last.rank>anchor)status='progression_autonome';
      else status='autonomie_plus_fragile';
    }
    return{status,count:seq.length,lastLevel:last.level,autonomousCount:autonomous,repeatedMasteryCount:repeated};
  }

  function summarizeCompetence(input,options){
    const opts=Object.assign({},DEFAULTS,options||{}), competence=input&&input.competence||{}, semester=(input&&input.semester)||'S1';
    const code=String(competence.code||input&&input.code||'').trim();
    const teaching=(input&&input.traces||[]).filter(t=>!code||String(t.competence_code||'').trim()===code).filter(t=>sameSemester(t,semester)).map(normalizeTeachingTrace).filter(Boolean);
    const a=teaching.filter(x=>x.strength==='A'), b=teaching.filter(x=>x.strength==='B');
    const hibou=(input&&input.hibouEvents||[]).filter(e=>!code||String(e.competence_code||'').trim()===code).map(normalizeHibouEvent).filter(Boolean);
    const primary=aEvidenceDecision(a);
    const anchor=primary.level;
    const bSignal=anchor?recentSignalsAgainstAnchor(b,LEVEL_RANK[anchor],opts.reexamineMinRecentSignals):null;
    const cSignal=anchor?recentSignalsAgainstAnchor(hibou,LEVEL_RANK[anchor],opts.reexamineMinRecentSignals):null;
    let review='aucun';
    if(bSignal==='hausse'||cSignal==='hausse')review='a_reexaminer_progression';
    if(bSignal==='baisse'||cSignal==='baisse')review=review==='a_reexaminer_progression'?'traces_contradictoires':'a_surveilleur';
    const trend=detectTrend(a.concat(b));
    const h=hibouSummary(hibou,anchor);

    if(primary.confidence==='moyenne'&&anchor&&((b.length>=2&&b.slice(-2).every(x=>x.level===anchor))||(hibou.length>=2&&hibou.slice(-2).every(x=>x.level===anchor))))primary.confidence='elevee';

    const core=!!(competence.lsuCore||input&&input.lsuCore), coreGroup=String(competence.lsuCoreGroup||input&&input.lsuCoreGroup||competence.domain||'').trim();
    const teachingForVigilance=sortByDate(a.concat(b));
    const fragile=anchor&&(LEVEL_RANK[anchor]<=1);
    const hasStrong=a.length>0, enoughTeaching=teachingForVigilance.length>=opts.vigilanceMinTeachingTraces;
    const span=enoughTeaching?daysBetween(teachingForVigilance[0].date,teachingForVigilance[teachingForVigilance.length-1].date):0;
    const recentTeachingFragile=teachingForVigilance.length>=2&&teachingForVigilance.slice(-2).every(x=>x.rank<=1);
    const persistent=!!(core&&fragile&&enoughTeaching&&span>=opts.vigilanceMinSpanDays&&(hasStrong||b.length>=3)&&recentTeachingFragile);

    return{
      code,
      label:String(competence.label||competence.title||code),
      domain:String(competence.domain||''),
      semester,
      suggestedLevel:anchor,
      suggestedLabel:anchor?LEVEL_LABELS[anchor]:null,
      confidence:primary.confidence,
      decisionPattern:primary.pattern,
      trend,
      review,
      evidence:{A:a.length,B:b.length,C:hibou.length,D:0,totalTeaching:teaching.length},
      hibou:h,
      core:{isCore:core,group:coreGroup,persistentVigilance:persistent,spanDays:Math.round(span)},
      documented:!!anchor,
      transferEvidence:a.concat(b).filter(x=>x.transfer).length
    };
  }

  function dominantLevel(results){
    const counts={non_atteint:0,partiellement_atteint:0,atteint:0,depasse:0};
    results.forEach(r=>{if(r.suggestedLevel)counts[r.suggestedLevel]++});
    let best=null,max=-1;
    LEVELS.forEach(l=>{if(counts[l]>max){best=l;max=counts[l]}});
    return{level:max>0?best:null,counts};
  }

  function domainProfiles(results){
    const map=new Map();
    results.filter(r=>r.documented).forEach(r=>{
      const d=r.domain||'Autres';if(!map.has(d))map.set(d,[]);map.get(d).push(r);
    });
    return[...map.entries()].map(([domain,rows])=>{
      const solid=rows.filter(r=>LEVEL_RANK[r.suggestedLevel]>=2).length,fragile=rows.length-solid;
      return{domain,total:rows.length,solid,fragile,solidRatio:rows.length?solid/rows.length:0,fragileRatio:rows.length?fragile/rows.length:0};
    });
  }

  function buildSubjectPhrase(subjectTitle,level,trend,profiles,vigilances){
    if(!level)return'Pas encore assez de preuves de classe pour proposer une appréciation LSU fiable.';
    let start=level==='non_atteint'?'Les acquis restent fragiles dans l’ensemble et nécessitent encore un accompagnement régulier.':level==='partiellement_atteint'?'Plusieurs acquis sont en cours de consolidation et les réussites demandent encore à être stabilisées.':'Les acquis sont solides dans l’ensemble.';
    if(level==='depasse')start='Les compétences travaillées sont maîtrisées avec assurance et sont réinvesties avec une grande autonomie.';
    const strong=profiles.filter(p=>p.total>=2&&p.solidRatio>=0.75).sort((a,b)=>b.solidRatio-a.solidRatio)[0];
    const weak=profiles.filter(p=>p.fragile>0).sort((a,b)=>b.fragileRatio-a.fragileRatio)[0];
    const cleanDomain=d=>String(d||'').replace(/^Le\s+/i,'').replace(/^La\s+/i,'').replace(/^Les\s+/i,'').trim();
    const parts=[start];
    if(trend==='progression'||trend==='progression_nette'||trend==='progression_irreguliere')parts.push('Les progrès sont réguliers au cours du semestre.');
    else if(trend==='fragilisation'||trend==='difficulte_recente')parts.push('Certaines compétences récemment travaillées restent à stabiliser.');
    else if(trend==='stable'&&level==='atteint')parts.push('Les réussites sont régulières et suffisamment stables.');
    if(strong&&(!weak||strong.domain!==weak.domain))parts.push('Les compétences en '+cleanDomain(strong.domain)+' sont bien installées.');
    if(vigilances.length)parts.push('Le domaine '+cleanDomain(vigilances[0].group||vigilances[0].domain||'prioritaire')+' reste à consolider.');
    else if(weak&&weak.fragileRatio>=0.34)parts.push('Les compétences en '+cleanDomain(weak.domain)+' restent à consolider.');
    return parts.join(' ');
  }

  function summarizeSubject(input,options){
    const opts=Object.assign({},DEFAULTS,options||{}), semester=(input&&input.semester)||'S1';
    const periods=semesterPeriods(semester), allSkills=(input&&input.competences||[]).filter(c=>{
      const p=String(c.period||periodFromCode(c.code)||'').toLowerCase();
      return !p||periods.includes(p)||c.annual===true;
    });
    const coreByCode=(input&&input.coreByCode)||{};
    const results=allSkills.map(c=>{
      const override=coreByCode[c.code]||{};
      return summarizeCompetence({competence:Object.assign({},c,override),semester,traces:input&&input.traces||[],hibouEvents:input&&input.hibouEvents||[]},opts);
    });
    const documented=results.filter(r=>r.documented), total=results.length, coverage=total?documented.length/total:0;
    const dom=dominantLevel(documented), counts=dom.counts, n=documented.length;
    const solid=n?(counts.atteint+counts.depasse)/n:0, fragile=n?(counts.non_atteint+counts.partiellement_atteint)/n:0, nonAttained=n?counts.non_atteint/n:0;
    const vigilances=results.filter(r=>r.core.persistentVigilance).map(r=>({code:r.code,label:r.label,domain:r.domain,group:r.core.group,level:r.suggestedLevel,spanDays:r.core.spanDays}));
    let suggested=null, qualifier='';
    if(coverage>=opts.minCoverageForSuggestion&&n){
      if(nonAttained>=0.50||(nonAttained>=opts.nonAttainedConcernThreshold&&solid<0.25))suggested='non_atteint';
      else if(fragile>=opts.fragileReviewThreshold){
        if(solid>=opts.strongMajorityThreshold&&nonAttained<=0.10){suggested='atteint';qualifier='avec_points_de_vigilance';}
        else suggested='partiellement_atteint';
      }else suggested='atteint';
      const transferCount=results.reduce((s,r)=>s+r.transferEvidence,0);
      if(suggested==='atteint'&&counts.depasse/n>=opts.subjectExceededMinRatio&&solid>=opts.subjectSolidMinRatioForExceeded&&!counts.non_atteint&&!vigilances.length&&transferCount>=opts.subjectTransferMinCount){suggested='depasse';qualifier='autonomie_et_transfert_confirmes';}
    }
    if(suggested==='atteint'&&vigilances.length)qualifier=qualifier||'vigilance_structurante';
    const trendRows=results.filter(r=>r.documented&&r.trend&&r.trend!=='insuffisante');
    const trendCounts={positive:0,negative:0,stable:0,fluctuant:0};
    trendRows.forEach(r=>{
      if(['progression','progression_nette','progression_irreguliere'].includes(r.trend))trendCounts.positive++;
      else if(['fragilisation','difficulte_recente'].includes(r.trend))trendCounts.negative++;
      else if(r.trend==='stable')trendCounts.stable++;
      else trendCounts.fluctuant++;
    });
    const trendTotal=trendRows.length;
    let trend='insuffisante';
    if(trendTotal>=3){
      const pos=trendCounts.positive/trendTotal,neg=trendCounts.negative/trendTotal,fl=trendCounts.fluctuant/trendTotal,st=trendCounts.stable/trendTotal;
      if(trendCounts.positive>=2&&pos>=0.35&&trendCounts.positive>=trendCounts.negative*2)trend='progression';
      else if(trendCounts.negative>=2&&neg>=0.35&&trendCounts.negative>=trendCounts.positive*2)trend='fragilisation';
      else if((trendCounts.positive&&trendCounts.negative)||(fl+neg>=0.35))trend='fluctuant';
      else if(st>=0.50)trend='stable';
      else trend='a_confirmer';
    }
    const confidence=coverage<opts.minCoverageForSuggestion?'insuffisante':coverage<opts.mediumCoverageThreshold?'faible':documented.every(r=>r.confidence==='elevee')?'elevee':'moyenne';
    const profiles=domainProfiles(results);
    const phrase=buildSubjectPhrase(String(input&&input.subjectTitle||input&&input.subject||'La matière'),suggested,trend,profiles,vigilances);
    return{
      subject:String(input&&input.subject||''),subjectTitle:String(input&&input.subjectTitle||input&&input.subject||''),semester,
      suggestedLevel:suggested,suggestedLabel:suggested?LEVEL_LABELS[suggested]:null,qualifier,
      dominantLevel:dom.level,dominantLabel:dom.level?LEVEL_LABELS[dom.level]:null,
      coverage:{documented:documented.length,total,ratio:coverage},counts,
      profile:{solid:counts.atteint+counts.depasse,consolidation:counts.partiellement_atteint,priority:counts.non_atteint,undocumented:Math.max(0,total-documented.length)},
      trend,confidence,vigilances,domains:profiles,phrase,competences:results,
      rules:{noArithmeticAverage:true,teacherEvidencePriority:true,hibouNeverOverridesA:true}
    };
  }

  return{VERSION,LEVELS,LEVEL_LABELS,DEFAULTS,normalizeLevel,classifyTeachingTrace,periodFromCode,semesterPeriods,summarizeCompetence,summarizeSubject};
});
