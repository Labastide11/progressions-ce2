// API Apps Script Maître Hibou / Progressions CE2 — V2.8.0 — historique évaluations + LSU
const SHEET_ELEVES = "eleves";
const SHEET_QUIZ = "competences_quiz";
const SHEET_VALID = "competences_validees";
const SHEET_RECORDS = "records_calcul";
const SHEET_PARCOURS = "parcours_eleves";
const SHEET_SUIVI_RENTREE = "suivi_rentree";
const SHEET_EVALUATION_TRACES = "traces_evaluations";

// V2.7 — la Boîte à questions est déjà alimentée par Maître Hibou.
const SHEET_QUESTIONS_CANDIDATES = [
  "Boîte à questions",
  "Boite à questions",
  "boite_questions",
  "questions",
  "Questions"
];

// V2.7.2 — Journal des Questions dans un classeur Google Sheets séparé.
const QUESTIONS_SPREADSHEET_ID = "1l5h4ZdE3M2nwFqmrtUtHlViDYNsQozxX0Y8N77w3SIo";

const SUIVI_RENTREE_HEADERS = [
  "prenom", "fiche_renseignements", "assurance", "coop_mode",
  "coop_montant", "nom_cheque", "note"
];

const RECORD_HEADERS = [
  "prenom", "ceinture", "score", "total",
  "temps_secondes", "temps_moyen", "date", "appareil"
];


const EVALUATION_TRACE_HEADERS = [
  "trace_id", "date", "prenom", "matiere", "periode",
  "competence_code", "competence_label", "domaine",
  "niveau_suivi", "libelle_eleve", "niveau_lsu", "source",
  "evaluation_id", "evaluation_titre", "note", "appareil", "synchro"
];

const PARCOURS_HEADERS = [
  "event_id", "date", "prenom", "type", "texte",
  "score", "total", "temps_secondes", "appareil", "source",
  "matiere", "activite", "resultat", "medaille", "version", "synchronise",
  "competence_code", "competence_label", "exercise_types", "help_used",
  "challenge_score", "challenge_total", "mastery_status", "learning_session_id"
];

function doGet(e) {
  const params = e && e.parameter ? e.parameter : {};
  const action = String(params.action || "").toLowerCase();
  const callback = String(params.callback || "");
  let data;

  if (action === "verifiereleve" || action === "verifier_eleve") {
    data = verifierEleve_(params.prenom || params.eleve || "");
  } else if (action === "ceintures" || action === "competences") {
    data = getCompetencesData_();
  } else if (action === "records_calcul" || action === "recordscalcul" || action === "records") {
    data = getRecordsCalculData_(params.prenom || params.eleve || "");
  } else if (action === "enregistrer_record" || action === "save_record") {
    data = enregistrerRecordDepuisGet_(params);
  } else if (action === "parcours" || action === "parcours_eleve" || action === "getparcours" || action === "get_parcours") {
    data = getParcoursData_(params.prenom || params.eleve || "");
  } else if (action === "reussites" || action === "reussites_recentes") {
    const auth = verifierCleProgressions_(params);
    data = auth.ok ? getReussitesRecentes_(params) : auth;
  } else if (action === "student_snapshot" || action === "snapshot_eleve") {
    const auth = verifierCleProgressions_(params);
    data = auth.ok ? getStudentSnapshot_(params.prenom || params.eleve || "", params.limit) : auth;
  } else if (action === "questions" || action === "questions_eleve" || action === "get_questions") {
    const auth = verifierCleProgressions_(params);
    data = auth.ok ? { ok: true, questions: getQuestionsEleve_(params.prenom || params.eleve || "", params.limit) } : auth;
  } else if (action === "diagnostic_questions") {
    const auth = verifierCleProgressions_(params);
    data = auth.ok ? diagnosticQuestionsV272_(params.prenom || params.eleve || "") : auth;
  } else if (action === "sync_ack" || action === "ack_sync") {
    const auth = verifierCleProgressions_(params);
    data = auth.ok ? getSyncAck_(params.event_ids || params.ids || "") : auth;
  } else if (action === "enregistrer_parcours" || action === "save_parcours" || action === "ajouterparcours" || action === "ajouter_parcours") {
    const auth = verifierCleProgressions_(params);
    data = auth.ok ? enregistrerParcoursDepuisGet_(params) : auth;
  } else if (action === "diagnostic_records") {
    const auth = verifierCleProgressions_(params);
    data = auth.ok ? diagnosticRecords_() : auth;
  } else if (action === "suivi_rentree" || action === "get_suivi_rentree") {
    const auth = verifierCleProgressions_(params);
    data = auth.ok ? getSuiviRentree_() : auth;
  } else if (action === "save_suivi_rentree" || action === "enregistrer_suivi_rentree") {
    const auth = verifierCleProgressions_(params);
    data = auth.ok ? saveSuiviRentreeDepuisGet_(params) : auth;
  } else if (action === "evaluation_traces" || action === "get_evaluation_traces" || action === "traces_evaluations") {
    const auth = verifierCleProgressions_(params);
    data = auth.ok ? { ok: true, traces: getEvaluationTracesData_(params) } : auth;
  } else if (action === "save_evaluation_trace" || action === "enregistrer_trace_evaluation") {
    const auth = verifierCleProgressions_(params);
    data = auth.ok ? enregistrerEvaluationTraceDepuisGet_(params) : auth;
  } else if (action === "diagnostic_evaluation_traces") {
    const auth = verifierCleProgressions_(params);
    data = auth.ok ? diagnosticEvaluationTraces_() : auth;
  } else if (action === "get_eleves" || action === "eleves" || action === "getelevesdata") {
    data = getElevesData_();
  } else {
    data = getElevesData_();
  }

  if (callback) {
    const safeCallback = callback.replace(/[^a-zA-Z0-9_.$]/g, "");
    return ContentService
      .createTextOutput(safeCallback + "(" + JSON.stringify(data) + ");")
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return jsonOutput(data);
}

function doPost(e) {
  try {
    const payload = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    const quiz = Array.isArray(payload.competences_quiz) ? payload.competences_quiz : [];
    const valid = Array.isArray(payload.competences_validees) ? payload.competences_validees : [];
    const records = Array.isArray(payload.records_calcul) ? payload.records_calcul : [];
    const parcours = Array.isArray(payload.parcours_eleves) ? payload.parcours_eleves : [];
    const tracesEvaluations = Array.isArray(payload.traces_evaluations) ? payload.traces_evaluations : [];

    // V2.7.2 : la synchronisation du parcours/records doit être authentifiée.
    // Les anciens POST sans parcours/records restent compatibles.
    if (records.length || parcours.length || tracesEvaluations.length) {
      const auth = verifierCleProgressions_(payload);
      if (!auth.ok) return jsonOutput(auth);
    }

    const quizAdded = appendUniqueRows_(SHEET_QUIZ, [
      "date", "prenom", "matiere", "competence", "essais", "reussites",
      "pourcentage", "statut", "appareil", "source", "synchro"
    ], quiz.map(r => [
      r.date || "", normalizeDisplayName_(r.prenom), r.matiere || r.domaine || "",
      r.competence || "", r.essais || "", r.reussites || "", r.pourcentage || "",
      r.statut || "", r.appareil || payload.appareil || "", payload.source || "", new Date()
    ]), "quiz");

    const validAdded = appendUniqueRows_(SHEET_VALID, [
      "date", "prenom", "competence", "domaine", "validations", "medaille",
      "appareil", "source", "synchro"
    ], valid.map(r => [
      r.date || "", normalizeDisplayName_(r.prenom), r.competence || "",
      r.domaine || r.matiere || "", r.validations || "", r.medaille || "",
      r.appareil || payload.appareil || "", payload.source || "", new Date()
    ]), "competence");

    const recordsResult = saveRecordsCalcul_(records, payload.appareil || "");
    const parcoursResult = saveParcours_(parcours, payload.appareil || "");
    const tracesResult = saveEvaluationTraces_(tracesEvaluations, payload.appareil || "");

    return jsonOutput({
      ok: true,
      quiz_recus: quiz.length,
      quiz_ajoutes: quizAdded,
      competences_recues: valid.length,
      competences_ajoutees: validAdded,
      records_recus: recordsResult.recus,
      records_ajoutes: recordsResult.ajoutes,
      records_ameliores: recordsResult.ameliores,
      records_ignores: recordsResult.ignores,
      parcours_recus: parcoursResult.recus,
      parcours_ajoutes: parcoursResult.ajoutes,
      parcours_ignores: parcoursResult.ignores,
      traces_evaluations_recues: tracesResult.recus,
      traces_evaluations_ajoutees: tracesResult.ajoutes,
      traces_evaluations_ignorees: tracesResult.ignores
    });
  } catch (err) {
    return jsonOutput({ ok: false, error: String(err.message || err) });
  }
}

function enregistrerRecordDepuisGet_(params) {
  try {
    const result = saveRecordsCalcul_([{
      prenom: params.prenom || params.eleve || "",
      ceinture: params.ceinture || params.competence || "Calcul mental CE2",
      score: params.score || 0,
      total: params.total || 10,
      temps_secondes: params.temps_secondes || params.temps || 0,
      temps_moyen: params.temps_moyen || 0,
      date: params.date || new Date(),
      appareil: params.appareil || ""
    }], params.appareil || "");

    return {
      ok: true,
      sheet: SHEET_RECORDS,
      records_recus: result.recus,
      records_ajoutes: result.ajoutes,
      records_ameliores: result.ameliores,
      records_ignores: result.ignores
    };
  } catch (err) {
    return { ok: false, error: String(err.message || err) };
  }
}

function enregistrerParcoursDepuisGet_(params) {
  try {
    const result = saveParcours_([{
      event_id: params.event_id || params.id || "",
      date: params.date || new Date(),
      prenom: params.prenom || params.eleve || "",
      type: params.type || "activite",
      texte: params.texte || params.text || params.detail || "",
      score: params.score || "",
      total: params.total || "",
      temps_secondes: params.temps_secondes || params.temps || "",
      appareil: params.appareil || "",
      source: params.source || "",
      matiere: params.matiere || params.subject || "",
      activite: params.activite || params.competence || params.ceinture || "",
      resultat: params.resultat || params.statut || "",
      medaille: params.medaille || params.medal || "",
      version: params.version || "",
      synchronise: "oui",
      competence_code: params.competence_code || params.code_competence || "",
      competence_label: params.competence_label || params.competence || "",
      exercise_types: params.exercise_types || params.exercise_type || params.format_exercice || "",
      help_used: params.help_used || params.aides_utilisees || "",
      challenge_score: params.challenge_score || params.defi_score || "",
      challenge_total: params.challenge_total || params.defi_total || "",
      mastery_status: params.mastery_status || params.statut_maitrise || "",
      learning_session_id: params.learning_session_id || params.session_id || ""
    }], params.appareil || "");

    return {
      ok: true,
      sheet: SHEET_PARCOURS,
      parcours_recus: result.recus,
      parcours_ajoutes: result.ajoutes,
      parcours_ignores: result.ignores
    };
  } catch (err) {
    return { ok: false, error: String(err.message || err) };
  }
}

function diagnosticRecords_() {
  const records = ensureSheet_(SHEET_RECORDS, RECORD_HEADERS);
  const parcours = ensureSheetV26_(SHEET_PARCOURS, PARCOURS_HEADERS);
  return {
    ok: true,
    records_calcul: {
      existe: true,
      lignes: Math.max(0, records.getLastRow() - 1),
      colonnes: RECORD_HEADERS
    },
    parcours_eleves: {
      existe: true,
      lignes: Math.max(0, parcours.getLastRow() - 1),
      colonnes: PARCOURS_HEADERS
    }
  };
}



/* =========================================================
   V2.8 — TRACES D'ÉVALUATION / PRÉPARATION LSU
   ========================================================= */

function normalizeEvaluationTrace_(trace, appareilParDefaut) {
  const t = trace || {};
  const date = parseDateForSheet_(t.date || t.timestamp);
  const prenom = normalizeDisplayName_(t.prenom || t.eleve || t.name);
  const code = String(t.competence_code || t.code_competence || t.competence || "").trim();
  const traceId = String(t.trace_id || t.id || "").trim() ||
    Utilities.base64EncodeWebSafe([prenom, date.getTime(), code, String(t.niveau_lsu || t.niveau_suivi || "")].join("|")).slice(0, 100);
  return {
    trace_id: traceId,
    date,
    prenom,
    matiere: String(t.matiere || t.subject || "").trim(),
    periode: String(t.periode || t.period || "").trim(),
    competence_code: code,
    competence_label: String(t.competence_label || t.label || t.competence || "").trim(),
    domaine: String(t.domaine || t.domain || "").trim(),
    niveau_suivi: String(t.niveau_suivi || t.level || "").trim(),
    libelle_eleve: String(t.libelle_eleve || t.student_label || "").trim(),
    niveau_lsu: String(t.niveau_lsu || t.lsu_level || "").trim(),
    source: String(t.source || "progressions_ce2").trim(),
    evaluation_id: String(t.evaluation_id || "").trim(),
    evaluation_titre: String(t.evaluation_titre || t.evaluation_title || "").trim(),
    note: String(t.note || "").trim(),
    appareil: String(t.appareil || appareilParDefaut || "").trim()
  };
}

function saveEvaluationTraces_(traces, appareilParDefaut) {
  if (!Array.isArray(traces) || !traces.length) return { recus: 0, ajoutes: 0, ignores: 0 };
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sheet = ensureSheetV26_(SHEET_EVALUATION_TRACES, EVALUATION_TRACE_HEADERS);
    const existingIds = new Set();
    if (sheet.getLastRow() > 1) {
      sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues()
        .forEach(row => existingIds.add(String(row[0] || "").trim()));
    }
    let ajoutes = 0, ignores = 0;
    const rows = [];
    traces.forEach(raw => {
      const t = normalizeEvaluationTrace_(raw, appareilParDefaut);
      if (!t.trace_id || !t.prenom || !t.competence_code || existingIds.has(t.trace_id)) { ignores++; return; }
      rows.push([
        t.trace_id, t.date, t.prenom, t.matiere, t.periode,
        t.competence_code, t.competence_label, t.domaine,
        t.niveau_suivi, t.libelle_eleve, t.niveau_lsu, t.source,
        t.evaluation_id, t.evaluation_titre, t.note, t.appareil, new Date()
      ]);
      existingIds.add(t.trace_id); ajoutes++;
    });
    if (rows.length) sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, EVALUATION_TRACE_HEADERS.length).setValues(rows);
    SpreadsheetApp.flush();
    return { recus: traces.length, ajoutes, ignores };
  } finally { lock.releaseLock(); }
}

function enregistrerEvaluationTraceDepuisGet_(params) {
  try {
    const result = saveEvaluationTraces_([params], params.appareil || "");
    return { ok: true, sheet: SHEET_EVALUATION_TRACES, traces_recues: result.recus, traces_ajoutees: result.ajoutes, traces_ignorees: result.ignores };
  } catch (err) { return { ok: false, error: String(err.message || err) }; }
}

function getEvaluationTracesData_(params) {
  const sheet = ensureSheetV26_(SHEET_EVALUATION_TRACES, EVALUATION_TRACE_HEADERS);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  const rows = sheet.getRange(2, 1, lastRow - 1, EVALUATION_TRACE_HEADERS.length).getValues();
  const prenomKey = normalizeKey_((params && (params.prenom || params.eleve)) || "");
  const codeKey = normalizeKey_((params && (params.competence_code || params.code)) || "");
  const limit = Math.max(1, Math.min(10000, Number(params && params.limit) || 5000));
  return rows.filter(row => {
    if (prenomKey && normalizeKey_(row[2]) !== prenomKey) return false;
    if (codeKey && normalizeKey_(row[5]) !== codeKey) return false;
    return true;
  }).map(row => ({
    trace_id: String(row[0] || "").trim(), date: formatDateTimeFr_(row[1]), prenom: normalizeDisplayName_(row[2]),
    matiere: String(row[3] || "").trim(), periode: String(row[4] || "").trim(), competence_code: String(row[5] || "").trim(),
    competence_label: String(row[6] || "").trim(), domaine: String(row[7] || "").trim(), niveau_suivi: String(row[8] || "").trim(),
    libelle_eleve: String(row[9] || "").trim(), niveau_lsu: String(row[10] || "").trim(), source: String(row[11] || "").trim(),
    evaluation_id: String(row[12] || "").trim(), evaluation_titre: String(row[13] || "").trim(), note: String(row[14] || "").trim(),
    appareil: String(row[15] || "").trim(), synchro: formatDateTimeFr_(row[16])
  })).sort((x,y) => String(y.date).localeCompare(String(x.date))).slice(0, limit);
}

function diagnosticEvaluationTraces_() {
  const sheet = ensureSheetV26_(SHEET_EVALUATION_TRACES, EVALUATION_TRACE_HEADERS);
  return { ok: true, api_version: "2.8.0", sheet: SHEET_EVALUATION_TRACES, lignes: Math.max(0, sheet.getLastRow() - 1), colonnes: EVALUATION_TRACE_HEADERS };
}

/* =========================================================
   V2.5 — SUIVI DE RENTRÉE / PROGRESSIONS CE2
   ========================================================= */

function verifierCleProgressions_(params) {
  const props = PropertiesService.getScriptProperties();
  const expected = String(props.getProperty("TABLET_DEVICE_KEY") || "").trim();
  const supplied = String(
    (params && (params.device_key || params.tablet_key || params.key)) || ""
  ).trim();

  if (!expected) {
    return {
      ok: false,
      code: "TABLET_KEY_MISSING",
      error: "La propriété TABLET_DEVICE_KEY n'est pas configurée dans Apps Script."
    };
  }
  if (!supplied || supplied !== expected) {
    return {
      ok: false,
      code: "TABLET_FORBIDDEN",
      error: "Clé appareil invalide."
    };
  }
  return { ok: true };
}

function boolRentree_(value) {
  if (value === true || value === 1) return true;
  const v = normalizeKey_(value);
  return ["oui", "true", "1", "x", "recu", "recue", "ok"].indexOf(v) >= 0;
}

function textRentree_(value) {
  return String(value == null ? "" : value).trim();
}

function coopModeRentree_(value) {
  const v = normalizeKey_(value);
  if (v === "cash" || v === "especes" || v === "espece") return "cash";
  if (v === "cheque" || v === "check") return "cheque";
  if (v === "none" || v === "pas de participation" || v === "non participation") return "none";
  return "pending";
}

function getSuiviRentree_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const elevesSheet = ss.getSheetByName(SHEET_ELEVES);
  if (!elevesSheet) {
    return { ok: false, code: "SHEET_ELEVES_MISSING", error: "Onglet eleves introuvable." };
  }

  const suiviSheet = ensureSheet_(SHEET_SUIVI_RENTREE, SUIVI_RENTREE_HEADERS);
  const suiviValues = suiviSheet.getDataRange().getValues();
  const suiviMap = {};

  if (suiviValues.length > 1) {
    suiviValues.slice(1).forEach(row => {
      const prenom = textRentree_(row[0]);
      if (!prenom) return;
      suiviMap[normalizeKey_(prenom)] = {
        prenom: prenom,
        fiche_renseignements: boolRentree_(row[1]),
        assurance: boolRentree_(row[2]),
        coop_mode: coopModeRentree_(row[3]),
        coop_montant: textRentree_(row[4]),
        nom_cheque: textRentree_(row[5]),
        note: textRentree_(row[6])
      };
    });
  }

  const active = elevesSheet.getDataRange().getValues().slice(1)
    .filter(row => isActive(row[4]))
    .map(row => ({
      prenom: textRentree_(row[0]),
      initiale: textRentree_(row[1]),
      naissance: formatDateFr(row[2]),
      sexe: textRentree_(row[3]),
      actif: row[4],
      cham: row.length > 5 ? row[5] : "",
      photo: row.length > 6 ? textRentree_(row[6]) : ""
    }))
    .filter(row => row.prenom);

  const students = active.map(eleve => {
    const saved = suiviMap[normalizeKey_(eleve.prenom)] || {};
    return {
      prenom: eleve.prenom,
      initiale: eleve.initiale,
      naissance: eleve.naissance,
      sexe: eleve.sexe,
      actif: eleve.actif,
      cham: eleve.cham,
      photo: eleve.photo,
      fiche_renseignements: !!saved.fiche_renseignements,
      assurance: !!saved.assurance,
      coop_mode: saved.coop_mode || "pending",
      coop_montant: saved.coop_montant || "",
      nom_cheque: saved.nom_cheque || "",
      note: saved.note || ""
    };
  });

  return {
    ok: true,
    sheet: SHEET_SUIVI_RENTREE,
    students: students,
    count: students.length
  };
}

function saveSuiviRentreeDepuisGet_(params) {
  const prenom = normalizeDisplayName_(params.prenom || params.eleve || "");
  if (!prenom) {
    return { ok: false, code: "PRENOM_REQUIRED", error: "Prénom manquant." };
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const elevesSheet = ss.getSheetByName(SHEET_ELEVES);
  if (!elevesSheet) {
    return { ok: false, code: "SHEET_ELEVES_MISSING", error: "Onglet eleves introuvable." };
  }

  const activeRows = elevesSheet.getDataRange().getValues().slice(1);
  const activeStudent = activeRows.find(row =>
    isActive(row[4]) && normalizeKey_(row[0]) === normalizeKey_(prenom)
  );
  if (!activeStudent) {
    return { ok: false, code: "ELEVE_INCONNU", error: "Élève actif introuvable." };
  }

  const record = [
    normalizeDisplayName_(activeStudent[0]),
    boolRentree_(params.fiche_renseignements) ? "Oui" : "Non",
    boolRentree_(params.assurance) ? "Oui" : "Non",
    coopModeRentree_(params.coop_mode),
    textRentree_(params.coop_montant),
    textRentree_(params.nom_cheque),
    textRentree_(params.note)
  ];

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = ensureSheet_(SHEET_SUIVI_RENTREE, SUIVI_RENTREE_HEADERS);
    const values = sheet.getDataRange().getValues();
    let rowIndex = -1;

    for (let i = 1; i < values.length; i++) {
      if (normalizeKey_(values[i][0]) === normalizeKey_(record[0])) {
        rowIndex = i + 1;
        break;
      }
    }

    if (rowIndex > 0) {
      sheet.getRange(rowIndex, 1, 1, SUIVI_RENTREE_HEADERS.length).setValues([record]);
    } else {
      sheet.appendRow(record);
      rowIndex = sheet.getLastRow();
    }

    return {
      ok: true,
      saved: true,
      sheet: SHEET_SUIVI_RENTREE,
      row: rowIndex,
      prenom: record[0]
    };
  } finally {
    lock.releaseLock();
  }
}

function getElevesData_() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_ELEVES);
  if (!sheet) return [];

  return sheet.getDataRange().getValues().slice(1)
    .filter(row => isActive(row[4]))
    .map(row => ({
      prenom: String(row[0] || "").trim(),
      initiale: String(row[1] || "").trim(),
      naissance: formatDateFr(row[2]),
      sexe: String(row[3] || "").trim(),
      actif: row[4],
      cham: row.length > 5 ? row[5] : "",
      photo: row.length > 6 ? String(row[6] || "").trim() : ""
    }))
    .filter(row => row.prenom);
}

function verifierEleve_(prenom) {
  const recherche = normalizeKey_(prenom);
  if (!recherche || recherche.length < 2) {
    return { ok: false, found: false, actif: false, message: "Écris ton prénom complet." };
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_ELEVES);
  if (!sheet) {
    return { ok: false, found: false, actif: false, message: "Onglet eleves introuvable." };
  }

  const rows = sheet.getDataRange().getValues().slice(1);
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const prenomSheet = String(row[0] || "").trim();
    const actif = isActive(row[4]);
    if (normalizeKey_(prenomSheet) === recherche) {
      return {
        ok: actif,
        found: true,
        actif: actif,
        prenom: normalizeDisplayName_(prenomSheet),
        initiale: String(row[1] || "").trim(),
        naissance: formatDateFr(row[2]),
        sexe: String(row[3] || "").trim(),
        cham: row.length > 5 ? row[5] : "",
        photo: row.length > 6 ? String(row[6] || "").trim() : "",
        message: actif ? "Élève reconnu." : "Profil élève désactivé."
      };
    }
  }

  return { ok: false, found: false, actif: false, message: "Prénom non reconnu dans la liste élèves." };
}

function getCompetencesData_() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_VALID);
  if (!sheet) return [];
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];

  return data.slice(1)
    .filter(row => String(row[1] || "").trim())
    .map(row => ({
      date: formatDateFr(row[0]),
      prenom: normalizeDisplayName_(row[1]),
      competence: String(row[2] || "").trim(),
      domaine: String(row[3] || "").trim(),
      validations: String(row[4] || "").trim(),
      medaille: String(row[5] || "").trim(),
      appareil: String(row[6] || "").trim(),
      source: String(row[7] || "").trim(),
      synchro: formatDateTimeFr_(row[8])
    }));
}

function getRecordsCalculData_(prenomRecherche) {
  const sheet = ensureSheet_(SHEET_RECORDS, RECORD_HEADERS);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];

  const rows = sheet.getRange(2, 1, lastRow - 1, RECORD_HEADERS.length).getValues();
  const prenomKey = normalizeKey_(prenomRecherche);

  return rows
    .filter(row => {
      const prenom = String(row[0] || "").trim();
      return prenom && (!prenomKey || normalizeKey_(prenom) === prenomKey);
    })
    .map(row => ({
      prenom: normalizeDisplayName_(row[0]),
      ceinture: String(row[1] || "").trim(),
      score: numberOrZero_(row[2]),
      total: numberOrZero_(row[3]),
      temps_secondes: numberOrZero_(row[4]),
      temps_moyen: numberOrZero_(row[5]),
      date: formatDateTimeFr_(row[6]),
      appareil: String(row[7] || "").trim()
    }));
}

function getParcoursData_(prenomRecherche) {
  const sheet = ensureSheetV26_(SHEET_PARCOURS, PARCOURS_HEADERS);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];

  const rows = sheet.getRange(2, 1, lastRow - 1, PARCOURS_HEADERS.length).getValues();
  const prenomKey = normalizeKey_(prenomRecherche);

  return rows
    .filter(row => {
      const prenom = String(row[2] || "").trim();
      return prenom && (!prenomKey || normalizeKey_(prenom) === prenomKey);
    })
    .map(row => ({
      event_id: String(row[0] || "").trim(),
      date: formatDateTimeFr_(row[1]),
      prenom: normalizeDisplayName_(row[2]),
      type: String(row[3] || "").trim(),
      texte: String(row[4] || "").trim(),
      score: row[5],
      total: row[6],
      temps_secondes: row[7] === "" ? "" : numberOrZero_(row[7]),
      appareil: String(row[8] || "").trim(),
      source: String(row[9] || "").trim(),
      matiere: String(row[10] || "").trim(),
      activite: String(row[11] || "").trim(),
      resultat: String(row[12] || "").trim(),
      medaille: String(row[13] || "").trim(),
      version: String(row[14] || "").trim(),
      synchronise: String(row[15] || "").trim(),
      competence_code: String(row[16] || "").trim(),
      competence_label: String(row[17] || "").trim(),
      exercise_types: String(row[18] || "").trim(),
      help_used: row[19] === "" ? "" : numberOrZero_(row[19]),
      challenge_score: row[20] === "" ? "" : numberOrZero_(row[20]),
      challenge_total: row[21] === "" ? "" : numberOrZero_(row[21]),
      mastery_status: String(row[22] || "").trim(),
      learning_session_id: String(row[23] || "").trim()
    }))
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

function getReussitesRecentes_(params) {
  const limit = Math.max(1, Math.min(500, Number(params && params.limit) || 250));
  const prenom = String((params && (params.prenom || params.eleve)) || "").trim();
  const rows = getParcoursData_(prenom);
  // Progressions CE2 attend un journal récent, pas seulement les médailles.
  return { ok: true, reussites: rows.slice(0, limit) };
}


function normalizeHeaderV27_(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function findQuestionsSheetV27_() {
  let ss = null;

  // V2.7.2 : priorité au classeur séparé « Maître Hibou - Journal des Questions ».
  try {
    ss = SpreadsheetApp.openById(QUESTIONS_SPREADSHEET_ID);
  } catch (err) {
    // Repli vers le classeur principal uniquement pour diagnostic/compatibilité.
    ss = SpreadsheetApp.getActiveSpreadsheet();
  }

  if (!ss) return null;

  for (const name of SHEET_QUESTIONS_CANDIDATES) {
    const sh = ss.getSheetByName(name);
    if (sh) return sh;
  }

  // Si le nom de l'onglet diffère, repérage par ses en-têtes.
  const sheets = ss.getSheets();
  for (const sh of sheets) {
    if (sh.getLastRow() < 1 || sh.getLastColumn() < 4) continue;

    const headers = sh.getRange(1, 1, 1, sh.getLastColumn())
      .getDisplayValues()[0]
      .map(normalizeHeaderV27_);

    const joined = headers.join("|");

    if (
      /prenom|eleve/.test(joined) &&
      /question/.test(joined)
    ) {
      return sh;
    }
  }

  return null;
}

function getHeaderIndexV27_(headers, aliases) {
  const normalized = headers.map(normalizeHeaderV27_);
  for (const alias of aliases) {
    const i = normalized.indexOf(normalizeHeaderV27_(alias));
    if (i >= 0) return i;
  }
  return -1;
}

function valueAtV27_(row, idx) {
  return idx >= 0 && idx < row.length ? row[idx] : "";
}


function diagnosticQuestionsV272_(prenomRecherche) {
  try {
    const ss = SpreadsheetApp.openById(QUESTIONS_SPREADSHEET_ID);
    const sheet = findQuestionsSheetV27_();
    const prenom = normalizeDisplayName_(prenomRecherche || "");
    const questions = prenom ? getQuestionsEleve_(prenom, 20) : [];

    return {
      ok: true,
      api_version: "2.7.4",
      spreadsheet_id: QUESTIONS_SPREADSHEET_ID,
      spreadsheet_name: ss.getName(),
      sheet_name: sheet ? sheet.getName() : "",
      sheet_found: !!sheet,
      prenom: prenom,
      count: questions.length,
      questions: questions
    };
  } catch (err) {
    return {
      ok: false,
      api_version: "2.7.4",
      spreadsheet_id: QUESTIONS_SPREADSHEET_ID,
      error: String(err && err.message || err)
    };
  }
}

function getQuestionsEleve_(prenomRecherche, limitValue) {
  const prenom = normalizeDisplayName_(prenomRecherche);
  if (!prenom) return [];

  const sheet = findQuestionsSheetV27_();
  if (!sheet || sheet.getLastRow() < 2) return [];

  // Format exact du journal :
  // A Date
  // B Heure
  // C Prénom
  // D Matière
  // E Question originale
  // F Question corrigée
  // G Réponse IA
  // H Visibilité
  // I Statut
  // J Points Curiosité
  // K Date explication
  const lastCol = Math.max(11, sheet.getLastColumn());
  const headers = sheet.getRange(1, 1, 1, lastCol).getDisplayValues()[0];

  const iDate = getHeaderIndexV27_(headers, ["Date"]);
  const iHeure = getHeaderIndexV27_(headers, ["Heure"]);
  const iPrenom = getHeaderIndexV27_(headers, ["Prénom", "Prenom"]);
  const iMatiere = getHeaderIndexV27_(headers, ["Matière", "Matiere"]);
  const iOriginale = getHeaderIndexV27_(headers, ["Question originale"]);
  const iCorrigee = getHeaderIndexV27_(headers, ["Question corrigée", "Question corrigee"]);
  const iReponse = getHeaderIndexV27_(headers, ["Réponse IA", "Reponse IA"]);
  const iVisibilite = getHeaderIndexV27_(headers, ["Visibilité", "Visibilite"]);
  const iStatut = getHeaderIndexV27_(headers, ["Statut"]);
  const iPoints = getHeaderIndexV27_(headers, ["Points Curiosité", "Points Curiosite"]);
  const iDateExplication = getHeaderIndexV27_(headers, ["Date explication"]);

  // Repli positionnel exact A→K.
  const idxDate = iDate >= 0 ? iDate : 0;
  const idxHeure = iHeure >= 0 ? iHeure : 1;
  const idxPrenom = iPrenom >= 0 ? iPrenom : 2;
  const idxMatiere = iMatiere >= 0 ? iMatiere : 3;
  const idxOriginale = iOriginale >= 0 ? iOriginale : 4;
  const idxCorrigee = iCorrigee >= 0 ? iCorrigee : 5;
  const idxReponse = iReponse >= 0 ? iReponse : 6;
  const idxVisibilite = iVisibilite >= 0 ? iVisibilite : 7;
  const idxStatut = iStatut >= 0 ? iStatut : 8;
  const idxPoints = iPoints >= 0 ? iPoints : 9;
  const idxDateExplication = iDateExplication >= 0 ? iDateExplication : 10;

  const values = sheet.getRange(2, 1, sheet.getLastRow() - 1, lastCol).getDisplayValues();
  const wanted = normalizeKey_(prenom);
  const limit = Math.max(1, Math.min(200, Number(limitValue) || 60));
  const result = [];

  for (let r = values.length - 1; r >= 0 && result.length < limit; r--) {
    const row = values[r];
    const rowPrenom = normalizeDisplayName_(valueAtV27_(row, idxPrenom));
    if (normalizeKey_(rowPrenom) !== wanted) continue;

    const date = String(valueAtV27_(row, idxDate) || "").trim();
    const heure = String(valueAtV27_(row, idxHeure) || "").trim();
    const questionOriginale = String(valueAtV27_(row, idxOriginale) || "").trim();
    const questionCorrigee = String(valueAtV27_(row, idxCorrigee) || "").trim();
    const texteQuestion = questionCorrigee || questionOriginale;
    if (!texteQuestion) continue;

    result.push({
      id: "sheet-question-" + String(r + 2),
      source: "sheet",
      row_number: r + 2,

      // Données destinées à l'affichage élève :
      date: date,
      questionCorrigee: texteQuestion,

      // Données conservées pour compatibilité / usage enseignant :
      heure: heure,
      prenom: rowPrenom,
      matiere: String(valueAtV27_(row, idxMatiere) || "").trim(),
      questionOriginale: questionOriginale,
      reponseIA: String(valueAtV27_(row, idxReponse) || "").trim(),
      visibilite: String(valueAtV27_(row, idxVisibilite) || "").trim(),
      statut: String(valueAtV27_(row, idxStatut) || "").trim(),
      pointsCuriosite: String(valueAtV27_(row, idxPoints) || "").trim(),
      dateExplication: String(valueAtV27_(row, idxDateExplication) || "").trim()
    });
  }

  return result;
}

function getStudentSnapshot_(prenomRecherche, limitValue) {
  const prenom = normalizeDisplayName_(prenomRecherche);
  if (!prenom) return { ok: false, code: "PRENOM_MISSING", error: "Prénom manquant." };

  const eleve = verifierEleve_(prenom);
  if (!eleve || !eleve.found) {
    return { ok: false, code: "STUDENT_NOT_FOUND", error: "Élève introuvable." };
  }

  const limit = Math.max(1, Math.min(500, Number(limitValue) || 300));
  const competences = getCompetencesData_()
    .filter(r => normalizeKey_(r.prenom) === normalizeKey_(prenom));
  const reussites = getParcoursData_(prenom).slice(0, limit);
  const records = getRecordsCalculData_(prenom);
  const questions = getQuestionsEleve_(prenom, limit);
  const evaluation_traces = getEvaluationTracesData_({ prenom: prenom, limit: limit });

  return {
    ok: true,
    snapshot: {
      eleve,
      competences,
      reussites,
      records,
      questions,
      evaluation_traces,
      questions_meta: {
        source: "sheet",
        spreadsheet: "journal_questions_externe",
        spreadsheet_id: QUESTIONS_SPREADSHEET_ID,
        count: questions.length,
        prenom: prenom
      }
    }
  };
}

function getSyncAck_(eventIdsRaw) {
  const ids = String(eventIdsRaw || "")
    .split(",")
    .map(v => String(v || "").trim())
    .filter(Boolean);

  if (!ids.length) return { ok: true, confirmed_ids: [] };

  const sheet = ensureSheetV26_(SHEET_PARCOURS, PARCOURS_HEADERS);
  const existing = new Set();
  if (sheet.getLastRow() > 1) {
    sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues()
      .forEach(row => existing.add(String(row[0] || "").trim()));
  }

  return {
    ok: true,
    confirmed_ids: ids.filter(id => existing.has(id)),
    requested_count: ids.length
  };
}

function saveRecordsCalcul_(records, appareilParDefaut) {
  if (!Array.isArray(records) || !records.length) {
    return { recus: 0, ajoutes: 0, ameliores: 0, ignores: 0 };
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sheet = ensureSheet_(SHEET_RECORDS, RECORD_HEADERS);
    const lastRow = sheet.getLastRow();
    const existingRows = lastRow > 1
      ? sheet.getRange(2, 1, lastRow - 1, RECORD_HEADERS.length).getValues()
      : [];

    const indexByKey = new Map();
    existingRows.forEach((row, index) => {
      indexByKey.set(recordKey_(row[0], row[1]), { sheetRow: index + 2, values: row });
    });

    let ajoutes = 0;
    let ameliores = 0;
    let ignores = 0;

    records.forEach(record => {
      const r = normalizeRecord_(record, appareilParDefaut);
      if (!r.prenom || !r.ceinture || r.total <= 0 || r.temps_secondes <= 0) {
        ignores++;
        return;
      }

      const rowValues = [
        r.prenom, r.ceinture, r.score, r.total,
        r.temps_secondes, r.temps_moyen, r.date, r.appareil
      ];
      const key = recordKey_(r.prenom, r.ceinture);
      const old = indexByKey.get(key);

      if (!old) {
        sheet.appendRow(rowValues);
        indexByKey.set(key, { sheetRow: sheet.getLastRow(), values: rowValues });
        ajoutes++;
      } else if (isBetterRecord_(rowValues, old.values)) {
        sheet.getRange(old.sheetRow, 1, 1, RECORD_HEADERS.length).setValues([rowValues]);
        indexByKey.set(key, { sheetRow: old.sheetRow, values: rowValues });
        ameliores++;
      } else {
        ignores++;
      }
    });

    SpreadsheetApp.flush();
    return { recus: records.length, ajoutes, ameliores, ignores };
  } finally {
    lock.releaseLock();
  }
}

function saveParcours_(events, appareilParDefaut) {
  if (!Array.isArray(events) || !events.length) {
    return { recus: 0, ajoutes: 0, ignores: 0 };
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sheet = ensureSheetV26_(SHEET_PARCOURS, PARCOURS_HEADERS);
    const existingIds = new Set();
    if (sheet.getLastRow() > 1) {
      sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues()
        .forEach(row => existingIds.add(String(row[0] || "").trim()));
    }

    let ajoutes = 0;
    let ignores = 0;
    events.forEach(event => {
      const e = normalizeParcours_(event, appareilParDefaut);
      if (!e.event_id || !e.prenom || !e.texte || existingIds.has(e.event_id)) {
        ignores++;
        return;
      }
      sheet.appendRow([
        e.event_id, e.date, e.prenom, e.type, e.texte,
        e.score, e.total, e.temps_secondes, e.appareil, e.source,
        e.matiere, e.activite, e.resultat, e.medaille, e.version, e.synchronise,
        e.competence_code, e.competence_label, e.exercise_types, e.help_used,
        e.challenge_score, e.challenge_total, e.mastery_status, e.learning_session_id
      ]);
      existingIds.add(e.event_id);
      ajoutes++;
    });

    SpreadsheetApp.flush();
    return { recus: events.length, ajoutes, ignores };
  } finally {
    lock.releaseLock();
  }
}

function normalizeRecord_(record, appareilParDefaut) {
  const score = numberOrZero_(record.score);
  const total = numberOrZero_(record.total || record.nombre_questions);
  const temps = numberOrZero_(record.temps_secondes || record.temps || record.time);
  let tempsMoyen = numberOrZero_(record.temps_moyen || record.average);
  if (!tempsMoyen && temps > 0 && total > 0) {
    tempsMoyen = Math.round((temps / total) * 100) / 100;
  }

  return {
    prenom: normalizeDisplayName_(record.prenom || record.eleve || record.name),
    ceinture: String(record.ceinture || record.competence || record.label || "").trim(),
    score,
    total,
    temps_secondes: temps,
    temps_moyen: tempsMoyen,
    date: parseDateForSheet_(record.date || record.datetime || record.timestamp),
    appareil: String(record.appareil || appareilParDefaut || "").trim()
  };
}

function normalizeParcours_(event, appareilParDefaut) {
  const date = parseDateForSheet_(event.date || event.timestamp);
  const prenom = normalizeDisplayName_(event.prenom || event.eleve || event.name);
  const texte = String(event.texte || event.text || event.detail || "").trim();
  const eventId = String(event.event_id || event.id || "").trim() ||
    Utilities.base64EncodeWebSafe([prenom, date.getTime(), texte].join("|")).slice(0, 80);

  return {
    event_id: eventId,
    date,
    prenom,
    type: String(event.type || "activite").trim(),
    texte,
    score: event.score === "" || event.score == null ? "" : numberOrZero_(event.score),
    total: event.total === "" || event.total == null ? "" : numberOrZero_(event.total),
    temps_secondes: event.temps_secondes === "" || event.temps_secondes == null ? "" : numberOrZero_(event.temps_secondes),
    appareil: String(event.appareil || appareilParDefaut || "").trim(),
    source: String(event.source || "").trim(),
    matiere: String(event.matiere || event.subject || "").trim(),
    activite: String(event.activite || event.competence || event.ceinture || "").trim(),
    resultat: String(event.resultat || event.statut || "").trim(),
    medaille: String(event.medaille || event.medal || event.niveau || "").trim(),
    version: String(event.version || "").trim(),
    synchronise: String(event.synchronise || "oui").trim(),
    competence_code: String(event.competence_code || event.code_competence || "").trim(),
    competence_label: String(event.competence_label || event.competence || "").trim(),
    exercise_types: String(event.exercise_types || event.exercise_type || event.format_exercice || "").trim(),
    help_used: event.help_used === "" || event.help_used == null ? "" : numberOrZero_(event.help_used),
    challenge_score: event.challenge_score === "" || event.challenge_score == null ? "" : numberOrZero_(event.challenge_score),
    challenge_total: event.challenge_total === "" || event.challenge_total == null ? "" : numberOrZero_(event.challenge_total),
    mastery_status: String(event.mastery_status || event.statut_maitrise || "").trim(),
    learning_session_id: String(event.learning_session_id || event.session_id || "").trim()
  };
}

function isBetterRecord_(newRow, oldRow) {
  const newScore = numberOrZero_(newRow[2]);
  const oldScore = numberOrZero_(oldRow[2]);
  const newTotal = numberOrZero_(newRow[3]);
  const oldTotal = numberOrZero_(oldRow[3]);
  const newTime = numberOrZero_(newRow[4]);
  const oldTime = numberOrZero_(oldRow[4]);

  const newRate = newTotal > 0 ? newScore / newTotal : 0;
  const oldRate = oldTotal > 0 ? oldScore / oldTotal : 0;
  if (newRate !== oldRate) return newRate > oldRate;
  if (newScore !== oldScore) return newScore > oldScore;
  if (newTime > 0 && oldTime <= 0) return true;
  return newTime > 0 && newTime < oldTime;
}

function recordKey_(prenom, ceinture) {
  return normalizeKey_(prenom) + "|" + normalizeKey_(ceinture);
}


/* V2.6 — ajoute les colonnes manquantes sans détruire les données existantes. */
function ensureSheetV26_(sheetName, headers) {
  const sheet = ensureSheet_(sheetName, headers);
  const currentLastColumn = Math.max(1, sheet.getLastColumn());
  const current = sheet.getRange(1, 1, 1, Math.max(currentLastColumn, headers.length)).getValues()[0];
  let changed = false;

  headers.forEach((header, index) => {
    const existing = String(current[index] || "").trim();
    if (!existing) {
      sheet.getRange(1, index + 1).setValue(header).setFontWeight("bold");
      changed = true;
    }
  });

  if (changed) SpreadsheetApp.flush();
  sheet.setFrozenRows(1);
  return sheet;
}

function ensureSheet_(sheetName, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) sheet = ss.insertSheet(sheetName);
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function appendUniqueRows_(sheetName, headers, rows, type) {
  const sheet = ensureSheet_(sheetName, headers);
  const existing = new Set();
  if (sheet.getLastRow() > 1) {
    sheet.getRange(2, 1, sheet.getLastRow() - 1, headers.length).getValues()
      .forEach(row => existing.add(uniqueKey_(row, type)));
  }

  const toAdd = rows.filter(row => {
    const key = uniqueKey_(row, type);
    if (existing.has(key)) return false;
    existing.add(key);
    return true;
  });

  if (toAdd.length) {
    sheet.getRange(sheet.getLastRow() + 1, 1, toAdd.length, headers.length).setValues(toAdd);
  }
  return toAdd.length;
}

function uniqueKey_(row, type) {
  if (type === "competence") {
    return [normalizeKey_(row[1]), normalizeKey_(row[2]), normalizeKey_(row[4]), normalizeKey_(row[5])].join("|");
  }
  return [normalizeKey_(row[0]), normalizeKey_(row[1]), normalizeKey_(row[2]), normalizeKey_(row[3]), normalizeKey_(row[6])].join("|");
}

function normalizeKey_(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

function normalizeDisplayName_(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  return raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
}

function isActive(value) {
  const v = String(value || "").trim().toLowerCase();
  return ["oui", "true", "vrai", "yes", "1", "actif", "x"].includes(v);
}

function numberOrZero_(value) {
  if (typeof value === "string" && value.includes(",")) value = value.replace(",", ".");
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function parseDateForSheet_(value) {
  if (Object.prototype.toString.call(value) === "[object Date]" && !isNaN(value)) return value;
  if (value) {
    const parsed = new Date(value);
    if (!isNaN(parsed)) return parsed;
  }
  return new Date();
}

function formatDateFr(value) {
  if (Object.prototype.toString.call(value) === "[object Date]" && !isNaN(value)) {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), "dd/MM/yyyy");
  }
  return String(value || "").trim();
}

function formatDateTimeFr_(value) {
  if (Object.prototype.toString.call(value) === "[object Date]" && !isNaN(value)) {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), "yyyy-MM-dd'T'HH:mm:ss");
  }
  return String(value || "").trim();
}

function jsonOutput(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/* =========================================================
   TESTS MANUELS À LANCER DEPUIS L'ÉDITEUR APPS SCRIPT
   ========================================================= */

function testRecordCalcul() {
  const now = new Date();
  const label = "TEST calcul mental " + Utilities.formatDate(
    now,
    Session.getScriptTimeZone(),
    "dd/MM/yyyy HH:mm:ss"
  );

  const result = saveRecordsCalcul_([{
    prenom: "Tim",
    ceinture: label,
    score: 8,
    total: 10,
    temps_secondes: 42,
    temps_moyen: 4.2,
    date: now,
    appareil: "test Apps Script"
  }], "test Apps Script");

  Logger.log(JSON.stringify(result));
  return result;
}

function testParcoursEleve() {
  const now = new Date();
  const result = saveParcours_([{
    event_id: "test-" + now.getTime(),
    date: now,
    prenom: "Tim",
    type: "entrainement_calcul",
    texte: "🧮 Entraînement calcul mental : 8/10 en 42 s",
    score: 8,
    total: 10,
    temps_secondes: 42,
    appareil: "test Apps Script",
    source: "test manuel"
  }], "test Apps Script");

  Logger.log(JSON.stringify(result));
  return result;
}
