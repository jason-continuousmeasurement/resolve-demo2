import { useState, useEffect, useRef } from "react";

// ── palette (matches resolve_ml_acquirer.html) ─────────────────
const C = {
  bg:        "#0D1117",
  surface:   "#161B22",
  surfaceUp: "#1E2530",
  border:    "#2A3140",
  accent:    "#00C896",
  accentDim: "rgba(0,200,150,0.08)",
  accentGlow:"rgba(0,200,150,0.35)",
  amber:     "#F5A623",
  amberDim:  "rgba(245,166,35,0.1)",
  red:       "#E05C5C",
  redDim:    "rgba(224,92,92,0.1)",
  blue:      "#4A9EFF",
  blueDim:   "rgba(74,158,255,0.1)",
  purple:    "#A78BFA",
  purpleDim: "rgba(167,139,250,0.1)",
  text:      "#E8EDF4",
  textMuted: "#7A8899",
  textDim:   "#3D4A5C",
  gold:      "#C4922A",
};

const SCREENS = [
  "Upload",
  "Processing",
  "Gate",
  "Lesson Outputs",
  "Exit Ticket",
  "Remediation",
  "Report & Dashboard",
];

// ── tiny shared components ─────────────────────────────────────
const Tag = ({ color = C.accent, children, small }) => (
  <span style={{ background: color + "22", color, border: `1px solid ${color}44`, borderRadius: 4, padding: small ? "1px 6px" : "2px 9px", fontSize: small ? 10 : 11, fontWeight: 700, letterSpacing: "0.05em", fontFamily: "monospace", whiteSpace: "nowrap", display: "inline-block" }}>{children}</span>
);

const Card = ({ children, style = {}, accent }) => (
  <div style={{ background: C.surface, border: `1px solid ${accent ? accent + "44" : C.border}`, borderRadius: 10, padding: 18, ...style }}>{children}</div>
);

const SectionLabel = ({ children }) => (
  <div style={{ fontSize: 10, color: C.accent, fontWeight: 800, letterSpacing: "0.13em", textTransform: "uppercase", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
    <span style={{ width: 18, height: 2, background: C.accent, display: "inline-block", flexShrink: 0 }} />
    {children}
  </div>
);

const Btn = ({ children, onClick, color, disabled, style = {} }) => (
  <button onClick={onClick} disabled={disabled} style={{ padding: "11px 22px", background: disabled ? C.textDim : (color || C.accent), color: disabled ? C.textMuted : "#0D1117", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 800, cursor: disabled ? "not-allowed" : "pointer", letterSpacing: "0.04em", transition: "all 0.2s", boxShadow: disabled ? "none" : `0 2px 14px ${(color || C.accent)}55`, ...style }}>
    {children}
  </button>
);

// ══════════════════════════════════════════════════════════════
// SCREEN 1 — UPLOAD
// ══════════════════════════════════════════════════════════════
function UploadScreen({ onNext }) {
  const [uploaded, setUploaded] = useState(false);
  const [hoodOpen, setHoodOpen] = useState(false);

  return (
    <div style={{ maxWidth: 660, margin: "0 auto", padding: "44px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div style={{ fontSize: 11, color: C.accent, fontWeight: 800, letterSpacing: "0.13em", marginBottom: 12 }}>RESOLVE · LESSON INTELLIGENCE PIPELINE</div>
        <h1 style={{ fontSize: 36, fontWeight: 900, color: C.text, margin: 0, lineHeight: 1.08, letterSpacing: "-0.02em" }}>
          Drop a lesson.<br /><span style={{ color: C.accent }}>Get a diagnostic package.</span>
        </h1>
        <p style={{ color: C.textMuted, marginTop: 14, fontSize: 14, lineHeight: 1.7, maxWidth: 480, margin: "14px auto 0" }}>
          Resolve analyzes any HQIM mathematics lesson, rewrites it against a research-grounded clarification protocol, replaces the exit ticket with a psychometrically-designed diagnostic instrument, and generates targeted remediation modules — one pipeline, every lesson.
        </p>
      </div>

      {/* drop zone */}
      <div onClick={() => setUploaded(true)} style={{ border: `2px dashed ${uploaded ? C.accent : C.border}`, borderRadius: 14, padding: "40px 24px", textAlign: "center", cursor: "pointer", background: uploaded ? C.accentDim : C.surfaceUp, transition: "all 0.25s", marginBottom: 16, boxShadow: uploaded ? `0 0 28px ${C.accentGlow}` : "none" }}>
        {uploaded ? (
          <>
            <div style={{ fontSize: 32, marginBottom: 8, color: C.accent }}>✓</div>
            <div style={{ color: C.accent, fontWeight: 700, fontSize: 15 }}>OpenUp Resources · Grade 6 · Unit 2 · Lesson 4.pdf</div>
            <div style={{ color: C.textMuted, fontSize: 12, marginTop: 4 }}>Standard: 6.RP.A.1 · 43 pages · Lesson + student materials detected</div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 32, color: C.textDim, marginBottom: 8 }}>⬆</div>
            <div style={{ color: C.text, fontWeight: 600, fontSize: 15 }}>Drop your lesson PDF or DOCX here</div>
            <div style={{ color: C.textMuted, fontSize: 12, marginTop: 6 }}>OpenUp · Illustrative Math · Eureka · AGA · or any HQIM curriculum</div>
          </>
        )}
      </div>

      {/* under the hood */}
      <Card style={{ marginBottom: 20 }}>
        <div onClick={() => setHoodOpen(o => !o)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
          <div>
            <div style={{ color: C.text, fontWeight: 600, fontSize: 13 }}>What's under the hood?</div>
            <div style={{ color: C.textMuted, fontSize: 12, marginTop: 2 }}>The protocol and cognitive architecture that power the pipeline</div>
          </div>
          <div style={{ color: C.accent, fontSize: 18, transition: "transform 0.2s", transform: hoodOpen ? "rotate(180deg)" : "none" }}>⌄</div>
        </div>
        {hoodOpen && (
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { label: "Lesson Clarification Protocol", tag: "REQUIRED · BUILT-IN", color: C.accent, desc: "A decision-driven framework governing how objectives are composed, activities are classified (Prioritized / De-prioritized / Deleted), and exit tickets are evaluated. Baked into the pipeline — not something you configure." },
              { label: "Content Specification", tag: "OPTIONAL · AUTO-GENERATED IF ABSENT", color: C.amber, desc: "A psychometric sub-topic specification for the standard: cognitive steps, misconception taxonomy with M-codes, difficulty level parameters (DL1–DL5), mastery definition, and hypothesized 3PL IRT priors. Produced by Agent 1 or authored by a human expert. If none is provided, Resolve builds a DRAFT specification from research literature and flags it for expert review." },
            ].map(item => (
              <div key={item.label} style={{ background: C.surfaceUp, borderRadius: 8, padding: "12px 14px", borderLeft: `3px solid ${item.color}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ color: item.color, fontWeight: 700, fontSize: 13 }}>{item.label}</span>
                  <Tag small color={item.color}>{item.tag}</Tag>
                </div>
                <div style={{ color: C.textMuted, fontSize: 12, lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
            <div style={{ background: C.accentDim, borderRadius: 8, padding: "10px 14px", border: `1px solid ${C.accent}33` }}>
              <div style={{ color: C.accent, fontSize: 12, fontWeight: 700, marginBottom: 3 }}>Two-agent architecture</div>
              <div style={{ color: C.textMuted, fontSize: 12, lineHeight: 1.6 }}>Agent 1 (Content Specification Generator) → Agent 2 (Lesson Clarification Agent). The cognitive architecture defined in Agent 1 is the psychometric foundation for every downstream decision Agent 2 makes.</div>
            </div>
          </div>
        )}
      </Card>

      <Btn onClick={onNext} disabled={!uploaded} style={{ width: "100%", padding: 15, fontSize: 14 }}>
        RUN RESOLVE PIPELINE →
      </Btn>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCREEN 2 — PROCESSING (phases 1–2, then GATE pause)
// ══════════════════════════════════════════════════════════════
function ProcessingScreen({ onNext }) {
  const [tick, setTick] = useState(0);
  const [phase, setPhase] = useState(0); // 0=running p1, 1=p1 done, 2=p2 done+paused
  useEffect(() => { const t = setInterval(() => setTick(x => x + 1), 90); return () => clearInterval(t); }, []);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1800);
    const t2 = setTimeout(() => setPhase(2), 3400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  const dots = ".".repeat(tick % 4);

  const phases = [
    { num: "Phase 1", name: "Objective Analysis", sub: "Compositionality test · meta-objective synthesis · success criteria", state: phase >= 1 ? "done" : phase === 0 ? "running" : "waiting" },
    { num: "Phase 2", name: "Lesson Diagnostic", sub: "Cognitive step coverage · difficulty profile · goal achievement · choice menu", state: phase >= 2 ? "done" : phase === 1 ? "running" : "waiting" },
  ];

  const blocked = [
    { num: "Phase 3", name: "Activity Classification & Annotation" },
    { num: "Phase 4", name: "Diagnostic Exit Ticket" },
    { num: "Phase 5", name: "Lesson-Level Quality Review + Teacher Report" },
    { num: "Phase 6", name: "Remediation Module Generation" },
  ];

  return (
    <div style={{ maxWidth: 600, margin: "50px auto", padding: "0 20px" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <SectionLabel>Pre-Gate Analysis</SectionLabel>
        <h2 style={{ color: C.text, fontSize: 24, margin: 0, fontWeight: 800 }}>
          {phase < 2 ? <>Running pipeline{dots}</> : "Pipeline paused at Gate"}
        </h2>
        <div style={{ color: C.textMuted, fontSize: 13, marginTop: 6 }}>6.RP.A.1 · Ratio Concepts · Grade 6 · Lesson 4</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        {phases.map(p => (
          <div key={p.num} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", background: p.state === "done" ? C.surfaceUp : p.state === "running" ? C.accentDim : C.surface, border: `1px solid ${p.state === "done" ? C.accent + "44" : p.state === "running" ? C.accent + "88" : C.border}`, borderRadius: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: p.state === "done" ? C.accent : "transparent", border: p.state !== "done" ? `2px solid ${p.state === "running" ? C.accent : C.textDim}` : "none", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#0D1117", fontWeight: 800, flexShrink: 0, animation: p.state === "running" ? "spin 1.2s linear infinite" : "none" }}>
              {p.state === "done" ? "✓" : <span style={{ color: p.state === "running" ? C.accent : C.textDim }}>◐</span>}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: p.state === "waiting" ? C.textDim : C.text, fontWeight: 600, fontSize: 13 }}><span style={{ color: C.textMuted, fontSize: 11, marginRight: 8 }}>{p.num}</span>{p.name}</div>
              <div style={{ color: C.textMuted, fontSize: 11, marginTop: 2 }}>{p.sub}</div>
            </div>
            {p.state === "done" && <Tag small color={C.accent}>COMPLETE</Tag>}
            {p.state === "running" && <Tag small color={C.amber}>RUNNING</Tag>}
          </div>
        ))}
      </div>

      {/* gate pause */}
      {phase === 2 && (
        <div style={{ border: `1px solid ${C.amber}66`, borderRadius: 10, padding: "16px 18px", background: C.amberDim, marginBottom: 20 }}>
          <div style={{ display: "flex", align: "center", gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 16 }}>⏸</span>
            <span style={{ color: C.amber, fontWeight: 800, fontSize: 13 }}>MANDATORY GATE — Human Decision Required</span>
          </div>
          <div style={{ color: C.textMuted, fontSize: 12, lineHeight: 1.65 }}>
            Phases 1–2 complete. The Diagnostic Report is ready for curriculum lead review. Phases 3–6 are <strong style={{ color: C.text }}>blocked</strong> until a human reviews the analysis and releases the pipeline — with or without gate inputs. The agent will proceed on best judgment if no selections are made.
          </div>
        </div>
      )}

      {/* blocked phases */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 24, opacity: phase === 2 ? 0.5 : 0.3 }}>
        {blocked.map(p => (
          <div key={p.num} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8 }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${C.textDim}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ color: C.textDim, fontSize: 9 }}>🔒</span>
            </div>
            <div style={{ color: C.textDim, fontSize: 12 }}><span style={{ marginRight: 8 }}>{p.num}</span>{p.name}</div>
          </div>
        ))}
      </div>

      <Btn onClick={onNext} disabled={phase < 2} style={{ width: "100%", padding: 14, fontSize: 14 }}>
        {phase < 2 ? "Analyzing lesson..." : "REVIEW DIAGNOSTIC REPORT + RELEASE GATE →"}
      </Btn>
      <style>{`@keyframes spin { from{transform:rotate(0deg)}to{transform:rotate(360deg)} }`}</style>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCREEN 3 — GATE (Diagnostic Report embedded + gate controls)
// ══════════════════════════════════════════════════════════════
function GateScreen({ onNext }) {
  const [dlAdjust, setDlAdjust] = useState(false);
  const [mCodeActive, setMCodeActive] = useState(false);
  const [released, setReleased] = useState(false);
  const [activeTab, setActiveTab] = useState("coverage");
  const [selectedChoice, setSelectedChoice] = useState("A");

  const cogSteps = [
    { step: "Step 1", label: "Identify the two quantities in a ratio relationship", acts: ["Direct", "Indirect", "None", "None"] },
    { step: "Step 2", label: "Recognize the relationship as multiplicative, not additive", acts: ["None", "Direct", "None", "None"] },
    { step: "Step 3", label: "Express the relationship using ratio language and notation", acts: ["Indirect", "Direct", "Direct", "None"] },
    { step: "Step 4", label: "Distinguish part-to-part from part-to-whole relationships", acts: ["None", "None", "Indirect", "None"] },
    { step: "Step 5", label: "Interpret a given ratio statement in context", acts: ["None", "Direct", "None", "None"] },
  ];
  const actLabels = ["Warm-Up", "Act 1", "Act 2", "Cool-Down"];
  const coverageColor = { Direct: C.accent, Indirect: C.amber, None: C.textDim };

  const diffProfile = [
    { act: "Warm-Up", dl: "DL1", numProp: "Small integers", rep: "Visual", context: "Familiar", cogDemand: "Identification" },
    { act: "Activity 1", dl: "DL2", numProp: "Small integers", rep: "Symbolic + verbal", context: "Familiar", cogDemand: "Computation" },
    { act: "Activity 2", dl: "DL3–4", numProp: "Non-integer ratios", rep: "Multiple", context: "Novel", cogDemand: "Interpretation" },
    { act: "Cool-Down", dl: "DL1", numProp: "Simple", rep: "Verbal only", context: "Familiar", cogDemand: "Reflection" },
  ];

  // Teacher Diagnostic Report data (plain language)
  const cogStepsPlain = [
    { label: "Spot the two amounts", desc: "Students identify which two quantities are being compared" },
    { label: "See it as 'for every,' not 'more than'", desc: "The key shift: ratio as a multiplicative relationship" },
    { label: "Write it as a ratio", desc: "Colon notation and ratio language" },
    { label: "Know what's being compared to what", desc: "Part-to-part vs. part-to-whole" },
    { label: "Explain what it means", desc: "Interpreting a ratio statement in context" },
  ];
  const actFlow = [
    { status: "Kept", name: "Warm-Up: Notice & Wonder", time: "8 min", desc: "Students identify ratio relationships from a visual — gets ratio language flowing before formal notation." },
    { status: "Kept", name: "Activity 1: Mixing Paint", time: "15 min", desc: "Core activity. Students write ratio relationships using colon notation and ratio language in a familiar context." },
    { status: "New", name: "Step 4 Coordination Task", time: "5 min", desc: "Added: students decide whether a prompt is asking part-to-part or part-to-whole before writing the ratio." },
    { status: "Replaced", name: "Diagnostic Exit Ticket", time: "5 min", desc: "Original reflection prompt replaced with a 5-item diagnostic instrument — identifies the specific misunderstanding behind each wrong answer." },
  ];
  const actStatusColor = { Kept: C.accent, New: C.blue, Replaced: C.amber };

  const choiceMenu = [
    { id: "A", label: "Strengthen Step 4 coverage", desc: "No activity directly develops part-to-whole distinction. Modify Activity 1 to include a coordination task, or replace de-prioritized Cool-Down with a new discrimination activity.", tradeoff: "Adds ~5 min; requires Cool-Down replacement." },
    { id: "B", label: "Adjust difficulty gradient", desc: "Activity 2 jumps from DL2 to DL3–4 without an intermediate step. Shift Activity 2 to DL2–3 by reducing contextual load while preserving cognitive step coverage.", tradeoff: "Reduces stretch for high-readiness students." },
    { id: "C", label: "Increase misconception-surfacing", desc: "No activity currently creates conditions where additive comparison (M1, gateway) produces a detectably wrong answer. Adjust number selection in Activity 1.", tradeoff: "Minimal time impact; number selection change only." },
    { id: "D", label: "Leave as-is, flag for teacher awareness", desc: "Accept current lesson structure with annotated escalation flags. Step 4 gap noted in Teacher Report.", tradeoff: "Step 4 gap persists; teacher awareness is the mitigation." },
  ];

  const handleRelease = () => { setReleased(true); setTimeout(onNext, 900); };

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "32px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22, flexWrap: "wrap", gap: 12 }}>
        <div>
          <SectionLabel>Human Decision Gate</SectionLabel>
          <h2 style={{ color: C.text, fontSize: 22, margin: 0, fontWeight: 800 }}>Teacher Diagnostic Report</h2>
          <div style={{ color: C.textMuted, fontSize: 13, marginTop: 4 }}>6.RP.A.1 · Lesson 4 · Review lesson analysis, then release pipeline</div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Tag color={C.amber}>⏸ PIPELINE PAUSED</Tag>
          <Tag color={C.accent}>Phases 1–2 complete</Tag>
        </div>
      </div>

      {/* tabs — Coverage / Difficulty / Goal Achievement / Teacher Report */}
      <div style={{ display: "flex", gap: 0, marginBottom: 0, borderBottom: `1px solid ${C.border}` }}>
        {[["coverage","Coverage Matrix"],["difficulty","Difficulty Profile"],["achievement","Goal Achievement"],["teacherreport","Teacher Report"]].map(([id, label]) => (
          <button key={id} onClick={() => setActiveTab(id)} style={{ padding: "9px 16px", background: "none", border: "none", borderBottom: activeTab === id ? `2px solid ${C.accent}` : "2px solid transparent", color: activeTab === id ? C.accent : C.textMuted, fontWeight: activeTab === id ? 700 : 500, fontSize: 12, cursor: "pointer", marginBottom: -1, whiteSpace: "nowrap" }}>
            {label}
          </button>
        ))}
      </div>

      <Card style={{ marginBottom: 16, borderRadius: "0 0 10px 10px", borderTop: "none" }}>
        {activeTab === "coverage" && (
          <div>
            <div style={{ color: C.textMuted, fontSize: 12, marginBottom: 12 }}>Direct / Indirect / None coverage per activity. <span style={{ color: C.red }}>Gaps highlighted.</span></div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                <thead>
                  <tr style={{ background: C.surfaceUp }}>
                    <th style={{ padding: "8px 10px", textAlign: "left", color: C.textMuted, border: `1px solid ${C.border}`, minWidth: 200 }}>Cognitive Step</th>
                    {actLabels.map(a => <th key={a} style={{ padding: "8px 10px", textAlign: "center", color: C.textMuted, border: `1px solid ${C.border}`, minWidth: 80 }}>{a}</th>)}
                    <th style={{ padding: "8px 10px", textAlign: "center", color: C.textMuted, border: `1px solid ${C.border}` }}>Gap?</th>
                  </tr>
                </thead>
                <tbody>
                  {cogSteps.map((row, i) => {
                    const hasDirect = row.acts.includes("Direct");
                    return (
                      <tr key={i} style={{ background: !hasDirect ? C.redDim : i % 2 === 0 ? C.surface : C.surfaceUp }}>
                        <td style={{ padding: "8px 10px", border: `1px solid ${C.border}`, color: C.textMuted, fontSize: 11 }}><span style={{ color: C.accent, marginRight: 6 }}>{row.step}</span>{row.label}</td>
                        {row.acts.map((a, j) => (
                          <td key={j} style={{ padding: "8px 10px", textAlign: "center", border: `1px solid ${C.border}` }}>
                            <span style={{ color: coverageColor[a], fontWeight: a !== "None" ? 700 : 400, fontSize: 11 }}>{a}</span>
                          </td>
                        ))}
                        <td style={{ padding: "8px 10px", textAlign: "center", border: `1px solid ${C.border}` }}>
                          {!hasDirect ? <span style={{ color: C.red, fontSize: 11, fontWeight: 700 }}>⚠ GAP</span> : <span style={{ color: C.accent, fontSize: 11 }}>✓</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 10, fontSize: 11, color: C.textMuted }}><span style={{ color: C.red }}>⚠</span> Step 4 (part-to-whole distinction) has no Direct coverage. Step 2 (multiplicative relationship) covered by Activity 1 only — no redundancy.</div>
          </div>
        )}

        {activeTab === "difficulty" && (
          <div>
            <div style={{ color: C.textMuted, fontSize: 12, marginBottom: 12 }}>Difficulty parameters from content spec DL1–DL5. Computational difficulty ≠ cognitive demand.</div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
              <thead>
                <tr style={{ background: C.surfaceUp }}>
                  {["Activity","DL Range","Number Properties","Rep. Demand","Context","Cognitive Demand"].map(h => (
                    <th key={h} style={{ padding: "8px 10px", textAlign: "left", color: C.textMuted, border: `1px solid ${C.border}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {diffProfile.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? C.surface : C.surfaceUp }}>
                    <td style={{ padding: "8px 10px", border: `1px solid ${C.border}`, color: C.text, fontWeight: 600 }}>{row.act}</td>
                    <td style={{ padding: "8px 10px", border: `1px solid ${C.border}` }}><Tag small color={row.dl.includes("3") || row.dl.includes("4") ? C.amber : C.accent}>{row.dl}</Tag></td>
                    <td style={{ padding: "8px 10px", border: `1px solid ${C.border}`, color: C.textMuted }}>{row.numProp}</td>
                    <td style={{ padding: "8px 10px", border: `1px solid ${C.border}`, color: C.textMuted }}>{row.rep}</td>
                    <td style={{ padding: "8px 10px", border: `1px solid ${C.border}`, color: C.textMuted }}>{row.context}</td>
                    <td style={{ padding: "8px 10px", border: `1px solid ${C.border}`, color: C.textMuted }}>{row.cogDemand}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: 10, fontSize: 11, color: C.textMuted }}><span style={{ color: C.amber }}>⚠</span> DL jump from Activity 1 (DL2) to Activity 2 (DL3–4) without intermediate step. Cool-Down reversal to DL1 noted.</div>
          </div>
        )}

        {activeTab === "achievement" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { dim: "Conceptual", color: C.blue, pct: 55, note: "Step 2 (multiplicative reasoning) covered in Activity 1 only. No activity explicitly confronts additive comparison misconception (M1, gateway)." },
              { dim: "Procedural", color: C.accent, pct: 80, note: "Ratio notation practice adequate in Activities 1–2. Multiple representations present but not systematically translated." },
              { dim: "Applied", color: C.purple, pct: 60, note: "Familiar contexts dominate. Activity 2 provides novel context but is de-prioritized due to DL jump. Part-to-whole application absent." },
            ].map(d => (
              <div key={d.dim} style={{ background: C.surfaceUp, borderRadius: 8, padding: "12px 14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <Tag color={d.color}>{d.dim} Mastery</Tag>
                  <span style={{ color: d.color, fontWeight: 800, fontSize: 14 }}>{d.pct}%</span>
                </div>
                <div style={{ background: C.border, borderRadius: 4, height: 6, overflow: "hidden", marginBottom: 8 }}>
                  <div style={{ width: `${d.pct}%`, height: "100%", background: d.color, borderRadius: 4 }} />
                </div>
                <div style={{ color: C.textMuted, fontSize: 12, lineHeight: 1.6 }}>{d.note}</div>
              </div>
            ))}
            <div style={{ fontSize: 11, color: C.textMuted, padding: "8px 12px", background: C.surface, borderRadius: 6, border: `1px solid ${C.border}` }}>
              <strong style={{ color: C.text }}>Efficiency:</strong> ~60% of instructional time on activities directly developing the meta-objective. Cool-Down (reflection prompt only) contributes no diagnostic signal and will be replaced by Diagnostic ET.
            </div>
          </div>
        )}

        {activeTab === "teacherreport" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* lesson goal */}
            <div style={{ background: C.accentDim, border: `1px solid ${C.accent}44`, borderRadius: 8, padding: "14px 16px" }}>
              <div style={{ fontSize: 10, color: C.accent, fontWeight: 800, letterSpacing: "0.1em", marginBottom: 8 }}>TODAY'S LESSON GOAL</div>
              <div style={{ color: C.text, fontSize: 14, fontWeight: 700, lineHeight: 1.5, marginBottom: 10 }}>
                Students will identify when two quantities are in a ratio relationship and describe it using "for every" language and colon notation.
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                {["Students can spot a ratio relationship when they see one","Students can write it two ways: 3:5 and 'for every 3 cups of flour, 5 cups of oats'","Students know whether a ratio compares part-to-part or part-to-whole","Students can explain what a given ratio means in context"].map((sc, i) => (
                  <div key={i} style={{ display: "flex", gap: 7, alignItems: "flex-start", background: C.surface, borderRadius: 5, padding: "6px 9px" }}>
                    <span style={{ color: C.accent, fontSize: 11, flexShrink: 0 }}>✓</span>
                    <span style={{ color: C.textMuted, fontSize: 11, lineHeight: 1.4 }}>{sc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* thinking step flow */}
            <div>
              <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 700, marginBottom: 8 }}>HOW STUDENTS BUILD UNDERSTANDING</div>
              <div style={{ display: "flex", alignItems: "center", gap: 0, overflowX: "auto", paddingBottom: 4 }}>
                {cogStepsPlain.map((step, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                    <div style={{ background: C.surfaceUp, border: `1px solid ${C.border}`, borderRadius: 7, padding: "8px 10px", minWidth: 110, maxWidth: 130, textAlign: "center" }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: C.accent, color: "#0D1117", fontSize: 10, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 5px" }}>{i + 1}</div>
                      <div style={{ color: C.text, fontSize: 10, fontWeight: 700, lineHeight: 1.3, marginBottom: 3 }}>{step.label}</div>
                      <div style={{ color: C.textMuted, fontSize: 9, lineHeight: 1.35 }}>{step.desc}</div>
                    </div>
                    {i < cogStepsPlain.length - 1 && <div style={{ color: C.accent, fontSize: 14, padding: "0 3px", flexShrink: 0 }}>→</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* activity flow */}
            <div>
              <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 700, marginBottom: 8 }}>WHAT CHANGED AND WHY</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {actFlow.map((act, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, padding: "9px 12px", borderRadius: 7, background: C.surfaceUp, borderLeft: `3px solid ${actStatusColor[act.status]}` }}>
                    <Tag small color={actStatusColor[act.status]}>{act.status.toUpperCase()}</Tag>
                    <div>
                      <span style={{ color: C.text, fontWeight: 700, fontSize: 12 }}>{act.name}</span>
                      <span style={{ color: C.textMuted, fontSize: 11, marginLeft: 8 }}>{act.time}</span>
                      <div style={{ color: C.textMuted, fontSize: 11, marginTop: 3, lineHeight: 1.5 }}>{act.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* misconception callout */}
            <div style={{ border: `1px solid ${C.red}55`, borderRadius: 8, padding: "12px 14px", background: C.redDim }}>
              <div style={{ fontSize: 10, color: C.red, fontWeight: 800, letterSpacing: "0.1em", marginBottom: 7 }}>👁 WATCH FOR THIS</div>
              <div style={{ color: C.text, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>"There are 2 more oats than flour" — the subtraction trap</div>
              <div style={{ color: C.textMuted, fontSize: 12, lineHeight: 1.6, marginBottom: 8 }}>
                Some students will subtract the two quantities instead of describing the relationship. This isn't carelessness — they genuinely see it as a comparison problem. The fix is helping them see why the difference doesn't capture the <em style={{ color: C.text }}>relationship</em>.
              </div>
              <div style={{ background: C.surface, borderRadius: 6, padding: "8px 12px" }}>
                <div style={{ fontSize: 10, color: C.red, fontWeight: 700, marginBottom: 3 }}>IN-THE-MOMENT QUESTION</div>
                <div style={{ color: C.text, fontSize: 12, fontStyle: "italic" }}>"If I doubled the recipe, would the difference change? What about the ratio?"</div>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* choice menu */}
      <Card style={{ marginBottom: 16 }}>
        <SectionLabel>Lesson Structure — Choose a Direction</SectionLabel>
        <div style={{ color: C.textMuted, fontSize: 12, marginBottom: 12 }}>Select one option to direct the clarification. Pipeline proceeds on best judgment if no selection is made.</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {choiceMenu.map(c => (
            <div key={c.id} onClick={() => setSelectedChoice(c.id)} style={{ cursor: "pointer", padding: "11px 14px", borderRadius: 8, border: `1px solid ${selectedChoice === c.id ? C.accent + "88" : C.border}`, background: selectedChoice === c.id ? C.accentDim : C.surfaceUp, transition: "all 0.2s" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${selectedChoice === c.id ? C.accent : C.textDim}`, background: selectedChoice === c.id ? C.accent : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 9, color: "#0D1117", fontWeight: 800 }}>
                  {selectedChoice === c.id ? "✓" : ""}
                </div>
                <div>
                  <div style={{ color: selectedChoice === c.id ? C.accent : C.text, fontWeight: 700, fontSize: 13 }}>Option {c.id}: {c.label}</div>
                  <div style={{ color: C.textMuted, fontSize: 12, lineHeight: 1.5, marginTop: 3 }}>{c.desc}</div>
                  <div style={{ fontSize: 11, color: C.amber, marginTop: 3 }}>Tradeoff: {c.tradeoff}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* additional modifications */}
      <Card style={{ marginBottom: 20 }}>
        <SectionLabel>Additional Modifications</SectionLabel>
        <div style={{ color: C.textMuted, fontSize: 12, marginBottom: 14 }}>Both off by default. Pipeline operates from content spec and lesson analysis alone if not activated.</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* computational difficulty */}
          <div style={{ background: C.surfaceUp, borderRadius: 8, padding: "12px 14px", border: `1px solid ${dlAdjust ? C.blue + "66" : C.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: dlAdjust ? 10 : 0 }}>
              <div>
                <div style={{ color: C.text, fontWeight: 600, fontSize: 13 }}>Shift Computational Difficulty</div>
                <div style={{ color: C.textMuted, fontSize: 11, marginTop: 2 }}>Adjust the numbers and context students work with — without changing the underlying thinking the activity demands.</div>
              </div>
              <div onClick={() => setDlAdjust(v => !v)} style={{ width: 38, height: 22, borderRadius: 11, background: dlAdjust ? C.blue : C.textDim, cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0, marginLeft: 14 }}>
                <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: dlAdjust ? 19 : 3, transition: "left 0.2s" }} />
              </div>
            </div>
            {dlAdjust && (
              <div style={{ fontSize: 12, color: C.textMuted, background: C.blueDim, borderRadius: 6, padding: "8px 12px", border: `1px solid ${C.blue}33` }}>
                <span style={{ color: C.blue, fontWeight: 700 }}>Active:</span> Activity 2 shifted to smaller, integer values in a familiar context. The reasoning the activity demands is unchanged — only the numbers and setting are easier. Cognitive step coverage preserved.
              </div>
            )}
          </div>

          {/* misconception support */}
          <div style={{ background: C.surfaceUp, borderRadius: 8, padding: "12px 14px", border: `1px solid ${mCodeActive ? C.purple + "66" : C.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: mCodeActive ? 10 : 0 }}>
              <div>
                <div style={{ color: C.text, fontWeight: 600, fontSize: 13 }}>Provide Misconception Support</div>
                <div style={{ color: C.textMuted, fontSize: 11, marginTop: 2 }}>Flag which student misunderstandings are most active so the lesson design surfaces and confronts them directly.</div>
              </div>
              <div onClick={() => setMCodeActive(v => !v)} style={{ width: 38, height: 22, borderRadius: 11, background: mCodeActive ? C.purple : C.textDim, cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0, marginLeft: 14 }}>
                <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: mCodeActive ? 19 : 3, transition: "left 0.2s" }} />
              </div>
            </div>
            {mCodeActive && (
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  ["M1","Treating ratios as differences","60% need significant support · 25% need some support · 15% solid", C.red],
                  ["M3","Confusing part-to-part and part-to-whole","40% need significant support · 35% need some support · 25% solid", C.amber],
                ].map(([code, name, dist, col]) => (
                  <div key={code} style={{ background: C.surface, borderRadius: 6, padding: "8px 10px", display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <Tag small color={col}>{code}</Tag>
                    <div>
                      <div style={{ color: C.text, fontSize: 12, fontWeight: 600 }}>{name}</div>
                      <div style={{ color: C.textMuted, fontSize: 11, marginTop: 2 }}>{dist}</div>
                    </div>
                  </div>
                ))}
                <div style={{ fontSize: 11, color: C.amber, marginTop: 2, lineHeight: 1.5 }}>Based on prior exit ticket data. Pipeline will adjust number selection so these misunderstandings produce detectably wrong answers — making them visible and addressable during instruction.</div>
              </div>
            )}
          </div>
        </div>
      </Card>

      <Btn onClick={handleRelease} style={{ width: "100%", padding: 14, fontSize: 14, opacity: released ? 0.7 : 1 }}>
        {released ? "▶ RELEASING PIPELINE..." : "RELEASE PIPELINE →"}
      </Btn>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCREEN 4 — LESSON OUTPUTS
// ══════════════════════════════════════════════════════════════
function LessonOutputsScreen({ onNext }) {
  const [selected, setSelected] = useState(null);

  const cogStepsPlain = [
    { label: "Spot the two amounts", desc: "Identify which two quantities are being compared" },
    { label: "See it as 'for every,' not 'more than'", desc: "Ratio as a multiplicative relationship" },
    { label: "Write it as a ratio", desc: "Colon notation and ratio language" },
    { label: "Know what's being compared to what", desc: "Part-to-part vs. part-to-whole" },
    { label: "Explain what it means", desc: "Interpreting a ratio statement in context" },
  ];
  const actFlow = [
    { status: "Kept", name: "Warm-Up: Notice & Wonder", time: "8 min", desc: "Students identify ratio relationships from a visual — gets the language flowing before formal notation." },
    { status: "Kept", name: "Activity 1: Mixing Paint", time: "15 min", desc: "Core activity. Students write ratio relationships using colon notation and ratio language." },
    { status: "New", name: "Step 4 Coordination Task", time: "5 min", desc: "Added: students decide whether a prompt asks for part-to-part or part-to-whole before writing the ratio." },
    { status: "Replaced", name: "Diagnostic Exit Ticket", time: "5 min", desc: "Original reflection prompt replaced with a 5-item diagnostic instrument." },
  ];
  const actStatusColor = { Kept: C.accent, New: C.blue, Replaced: C.amber };

  const primaryDocs = [
    {
      id: "teacherreport",
      title: "Teacher Diagnostic Report",
      audience: "Classroom teachers",
      badge: "TEACHER REPORT",
      badgeColor: C.accent,
      format: "JSX + DOCX",
      desc: "Plain-language summary of the clarified lesson — what changed, why, what to watch for. Scannable in 60 seconds. No protocol vocabulary.",
    },
    {
      id: "cleanlesson",
      title: "Clean Teacher Lesson",
      audience: "Classroom teachers",
      badge: "TEACHER LESSON",
      badgeColor: C.blue,
      format: "DOCX",
      desc: "The clarified lesson with no annotation keys or protocol language. Objective box, activity sections with timing and purpose, bolded key moments, If Time Permits boxes, inline answer keys.",
      features: [
        { color: C.accent, label: "Objective box", desc: "Meta-objective + success criteria in plain language at top" },
        { color: C.text, label: "Bolded moments", desc: "Critical moments as bolded text — seamless reading experience" },
        { color: C.amber, label: "If Time Permits", desc: "De-prioritized activities marked but not removed" },
        { color: C.textMuted, label: "Inline answer keys", desc: "Student task answers embedded inline" },
      ],
      activities: [
        { name: "Warm-Up: Notice & Wonder", status: "prioritized", time: "8 min", purpose: "Students identify ratio relationships from a visual — gets the language flowing before notation." },
        { name: "Activity 1: Mixing Paint", status: "prioritized", time: "15 min", purpose: "Core lesson activity. Students write ratio relationships using colon notation and ratio language." },
        { name: "Activity 2: Comparing Mixtures", status: "deprioritized", time: "+10 min", purpose: "If time permits. Extends to comparison context — not required for lesson objective." },
      ],
    },
  ];

  const statusColor = { prioritized: C.accent, deprioritized: C.amber, deleted: C.red };
  const statusLabel = { prioritized: "KEPT", deprioritized: "IF TIME", deleted: "REMOVED" };

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "32px 20px" }}>
      <div style={{ marginBottom: 24 }}>
        <SectionLabel>Post-Gate Outputs · Phases 3–5</SectionLabel>
        <h2 style={{ color: C.text, fontSize: 22, margin: 0, fontWeight: 800 }}>Lesson Outputs</h2>
        <div style={{ color: C.textMuted, fontSize: 13, marginTop: 4 }}>Select a document to preview.</div>
      </div>

      {/* two primary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
        {primaryDocs.map(doc => (
          <div key={doc.id} onClick={() => setSelected(selected === doc.id ? null : doc.id)} style={{ cursor: "pointer", border: `1px solid ${selected === doc.id ? doc.badgeColor + "88" : C.border}`, borderRadius: 12, padding: "18px 18px", background: selected === doc.id ? doc.badgeColor + "0F" : C.surface, transition: "all 0.2s" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <Tag color={doc.badgeColor}>{doc.badge}</Tag>
              <span style={{ color: C.textMuted, fontSize: 11 }}>{doc.format}</span>
            </div>
            <div style={{ color: C.text, fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{doc.title}</div>
            <div style={{ color: C.textMuted, fontSize: 12, marginBottom: 10 }}>{doc.audience}</div>
            <div style={{ color: C.textMuted, fontSize: 12, lineHeight: 1.6 }}>{doc.desc}</div>
            <div style={{ marginTop: 12, color: selected === doc.id ? doc.badgeColor : C.textMuted, fontSize: 12, fontWeight: 600 }}>
              {selected === doc.id ? "▲ Hide preview" : "▼ Preview contents"}
            </div>
          </div>
        ))}
      </div>

      {/* teacher report preview */}
      {selected === "teacherreport" && (
        <Card style={{ marginBottom: 16, border: `1px solid ${C.accent}44` }}>
          {/* goal */}
          <div style={{ background: C.accentDim, borderRadius: 8, padding: "12px 14px", marginBottom: 14 }}>
            <div style={{ fontSize: 10, color: C.accent, fontWeight: 800, letterSpacing: "0.1em", marginBottom: 7 }}>TODAY'S LESSON GOAL</div>
            <div style={{ color: C.text, fontSize: 14, fontWeight: 700, lineHeight: 1.5, marginBottom: 10 }}>
              Students will identify when two quantities are in a ratio relationship and describe it using "for every" language and colon notation.
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {["Students can spot a ratio relationship when they see one","Students can write it two ways: 3:5 and 'for every 3 cups of flour, 5 cups of oats'","Students know whether a ratio compares part-to-part or part-to-whole","Students can explain what a given ratio means in context"].map((sc, i) => (
                <div key={i} style={{ display: "flex", gap: 7, alignItems: "flex-start", background: C.surface, borderRadius: 5, padding: "6px 9px" }}>
                  <span style={{ color: C.accent, fontSize: 11, flexShrink: 0 }}>✓</span>
                  <span style={{ color: C.textMuted, fontSize: 11, lineHeight: 1.4 }}>{sc}</span>
                </div>
              ))}
            </div>
          </div>
          {/* thinking steps */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 700, marginBottom: 8 }}>HOW STUDENTS BUILD UNDERSTANDING</div>
            <div style={{ display: "flex", alignItems: "center", gap: 0, overflowX: "auto", paddingBottom: 4 }}>
              {cogStepsPlain.map((step, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ background: C.surfaceUp, border: `1px solid ${C.border}`, borderRadius: 7, padding: "8px 10px", minWidth: 108, maxWidth: 125, textAlign: "center" }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: C.accent, color: "#0D1117", fontSize: 10, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 5px" }}>{i + 1}</div>
                    <div style={{ color: C.text, fontSize: 10, fontWeight: 700, lineHeight: 1.3, marginBottom: 3 }}>{step.label}</div>
                    <div style={{ color: C.textMuted, fontSize: 9, lineHeight: 1.35 }}>{step.desc}</div>
                  </div>
                  {i < cogStepsPlain.length - 1 && <div style={{ color: C.accent, fontSize: 13, padding: "0 2px", flexShrink: 0 }}>→</div>}
                </div>
              ))}
            </div>
          </div>
          {/* activity flow */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 700, marginBottom: 8 }}>WHAT CHANGED AND WHY</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {actFlow.map((act, i) => (
                <div key={i} style={{ display: "flex", gap: 10, padding: "9px 12px", borderRadius: 7, background: C.surfaceUp, borderLeft: `3px solid ${actStatusColor[act.status]}` }}>
                  <Tag small color={actStatusColor[act.status]}>{act.status.toUpperCase()}</Tag>
                  <div>
                    <span style={{ color: C.text, fontWeight: 700, fontSize: 12 }}>{act.name}</span>
                    <span style={{ color: C.textMuted, fontSize: 11, marginLeft: 8 }}>{act.time}</span>
                    <div style={{ color: C.textMuted, fontSize: 11, marginTop: 3, lineHeight: 1.5 }}>{act.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* misconception callout */}
          <div style={{ border: `1px solid ${C.red}55`, borderRadius: 8, padding: "12px 14px", background: C.redDim }}>
            <div style={{ fontSize: 10, color: C.red, fontWeight: 800, letterSpacing: "0.1em", marginBottom: 7 }}>👁 WATCH FOR THIS</div>
            <div style={{ color: C.text, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>"There are 2 more oats than flour" — the subtraction trap</div>
            <div style={{ color: C.textMuted, fontSize: 12, lineHeight: 1.6, marginBottom: 8 }}>Some students subtract the quantities instead of describing the relationship. Help them see why the difference doesn't capture the <em style={{ color: C.text }}>relationship</em>.</div>
            <div style={{ background: C.surface, borderRadius: 6, padding: "8px 12px" }}>
              <div style={{ fontSize: 10, color: C.red, fontWeight: 700, marginBottom: 3 }}>IN-THE-MOMENT QUESTION</div>
              <div style={{ color: C.text, fontSize: 12, fontStyle: "italic" }}>"If I doubled the recipe, would the difference change? What about the ratio?"</div>
            </div>
          </div>
        </Card>
      )}

      {/* clean lesson preview */}
      {selected === "cleanlesson" && (() => {
        const doc = primaryDocs.find(d => d.id === "cleanlesson");
        return (
          <Card style={{ marginBottom: 16, border: `1px solid ${C.blue}44` }}>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 12, color: C.blue, fontWeight: 700, marginBottom: 10 }}>DOCUMENT FEATURES</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {doc.features.map((f, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", background: C.surfaceUp, borderRadius: 6, padding: "8px 10px" }}>
                    <span style={{ color: f.color, fontWeight: 700, fontSize: 12, minWidth: 90, flexShrink: 0 }}>{f.label}</span>
                    <span style={{ color: C.textMuted, fontSize: 11, lineHeight: 1.4 }}>{f.desc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ fontSize: 12, color: C.textMuted, fontWeight: 700, marginBottom: 10 }}>ACTIVITY PREVIEW</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {doc.activities.map((act, i) => (
                <div key={i} style={{ display: "flex", gap: 12, padding: "10px 12px", borderRadius: 8, background: C.surfaceUp, borderLeft: `3px solid ${statusColor[act.status]}` }}>
                  <Tag small color={statusColor[act.status]}>{statusLabel[act.status]}</Tag>
                  <div style={{ flex: 1 }}>
                    <span style={{ color: C.text, fontWeight: 600, fontSize: 13 }}>{act.name}</span>
                    <span style={{ color: C.textMuted, fontSize: 11, marginLeft: 10 }}>{act.time}</span>
                    <div style={{ color: C.textMuted, fontSize: 12, marginTop: 4, lineHeight: 1.5 }}>{act.purpose}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        );
      })()}

      {/* annotated reviewer lesson — background callout */}
      <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 16px", background: C.surfaceUp, marginBottom: 16, display: "flex", gap: 14, alignItems: "flex-start" }}>
        <div style={{ flexShrink: 0, padding: "4px 10px", background: C.textDim + "22", border: `1px solid ${C.textDim}44`, borderRadius: 6, fontSize: 10, color: C.textMuted, fontWeight: 700, letterSpacing: "0.06em", whiteSpace: "nowrap" }}>BACKGROUND</div>
        <div>
          <div style={{ color: C.text, fontWeight: 600, fontSize: 13, marginBottom: 3 }}>Annotated Reviewer Lesson <span style={{ color: C.textMuted, fontWeight: 400, fontSize: 12 }}>· DOCX</span></div>
          <div style={{ color: C.textMuted, fontSize: 12, lineHeight: 1.6 }}>
            Full lesson with protocol-layer annotations preserved — classification badges, purpose statements (blue), critical moment tags (green), de-prioritized sections (gray), deleted activities (strikethrough). Available for curriculum leads and reviewers who need to see the underlying rationale for every classification decision.
          </div>
        </div>
      </div>

      {/* decision log */}
      <Card style={{ marginBottom: 20, borderColor: C.textDim }}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>📋</span>
          <div>
            <div style={{ color: C.text, fontWeight: 700, fontSize: 13, marginBottom: 4 }}>Decision Log <Tag small color={C.textMuted}>DOCX</Tag></div>
            <div style={{ color: C.textMuted, fontSize: 12, lineHeight: 1.6 }}>Every classification decision documented by phase. Gate decisions recorded (Option A selected + computational difficulty shift active). Escalation: 1 flag (Step 4 coverage gap, mitigated via choice selection). Misconception support log for Activity 1 number selection change.</div>
          </div>
        </div>
      </Card>

      <Btn onClick={onNext} style={{ width: "100%", padding: 14, fontSize: 14 }}>
        VIEW DIAGNOSTIC EXIT TICKET →
      </Btn>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCREEN 5 — EXIT TICKET
// ══════════════════════════════════════════════════════════════
function ExitTicketScreen({ onNext }) {
  const [view, setView] = useState("student");

  const items = [
    {
      id: "CR", label: "D1 · Gateway Screen", type: "Constructed Response", dl: "DL2", sc: "SC(b)",
      note: "CR placed first to capture authentic student reasoning before MC options scaffold recognition.",
      stem: "A recipe uses 3 cups of flour and 5 cups of oats. Write two different statements that describe the ratio relationship between the flour and oats. Use a different notation for each statement.",
      errorPatterns: [
        { response: "3:5 and 5:3", code: "M4 — Order Reversal", note: "Understands ratio notation; confuses referent direction." },
        { response: '"There are 2 more oats than flour"', code: "M1 — Additive Comparison (gateway)", note: "Produces difference, not ratio. Gateway misconception present." },
        { response: "3 cups flour, 5 cups oats (lists)", code: "P2 — Prerequisite failure", note: "No multiplicative relationship formed; lists quantities separately." },
        { response: "3:5 and 3/8 (switches to part-to-whole)", code: "M3 — Part-Whole Confusion", note: "Conflates part-to-part with part-to-whole within same task." },
      ]
    },
    {
      id: "MC-D2", label: "D2 · Baseline", type: "Multiple Choice", dl: "DL1", sc: "SC(a)",
      note: "Straightforward item — all strategies converge if understanding is intact. Establishes whether basic skill is present.",
      stem: "A bag contains 4 red marbles and 6 blue marbles. Which statement correctly describes a ratio relationship?",
      options: [
        { letter: "A", text: "There are 2 more blue marbles than red marbles.", code: "M1", label: "Additive Comparison — GATEWAY", correct: false },
        { letter: "B", text: "For every 4 red marbles, there are 6 blue marbles.", code: "—", label: "Correct key", correct: true },
        { letter: "C", text: "The ratio is 10.", code: "M2", label: "Foundational Collapse — ratio reduced to total count", correct: false },
        { letter: "D", text: "4 out of 10 marbles are red.", code: "M3", label: "Part-Whole Confusion — correct quantity, wrong relationship type", correct: false },
      ]
    },
    {
      id: "MC-D3", label: "D3 · Targeted Discrimination", type: "Multiple Choice", dl: "DL3", sc: "SC(c)",
      note: "Engineered to discriminate M3 (part-whole confusion) from correct understanding. Numbers chosen so M3 and M4 errors produce distinct wrong answers.",
      stem: "A class has 12 girls and 8 boys. What is the ratio of girls to the total number of students in the class?",
      options: [
        { letter: "A", text: "3 : 2", code: "M3", label: "Part-Whole Confusion — part-to-part when part-to-whole requested", correct: false },
        { letter: "B", text: "8 : 12", code: "M4", label: "Order Reversal — correct relationship type, wrong referent order", correct: false },
        { letter: "C", text: "12 : 20", code: "—", label: "Correct key — total correctly identified as whole", correct: true },
        { letter: "D", text: "20", code: "M2", label: "Foundational Collapse — ratio reduced to single total", correct: false },
      ]
    },
  ];

  const flowMap = [
    { code: "M1", name: "Additive Comparison", type: "G", cr: "Error pattern", d2: "A", d3: "—", d4: "—", d5: "—" },
    { code: "M2", name: "Foundational Collapse", type: "F", cr: "—", d2: "C", d3: "D", d4: "C", d5: "D" },
    { code: "M3", name: "Part-Whole Confusion", type: "S", cr: "Error pattern", d2: "D", d3: "A", d4: "B", d5: "A" },
    { code: "M4", name: "Order Reversal", type: "C", cr: "Error pattern", d2: "—", d3: "B", d4: "—", d5: "B" },
    { code: "M5", name: "Ratio as Fraction Only", type: "R", cr: "—", d2: "—", d3: "—", d4: "D", d5: "C" },
    { code: "P2", name: "Prereq: ratio as relationship", type: "P", cr: "Error pattern", d2: "—", d3: "—", d4: "—", d5: "—" },
  ];

  const typeColor = { G: C.red, F: C.red, S: C.amber, C: C.purple, R: C.blue, P: C.textMuted };

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "32px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <SectionLabel>Phase 4 Output · Diagnostic Exit Ticket</SectionLabel>
          <h2 style={{ color: C.text, fontSize: 22, margin: 0, fontWeight: 800 }}>Exit Ticket — 6.RP.A.1</h2>
          <div style={{ color: C.textMuted, fontSize: 13, marginTop: 4 }}>~5 min · 1 CR + 4 MC · Diagnostic sandwich (D1 gateway → D2 baseline → D3–D4 targeted → D5 applied) · Showing 3 of 5 items</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["student","teacher"].map(v => (
            <button key={v} onClick={() => setView(v)} style={{ padding: "8px 16px", border: `1px solid ${view === v ? C.accent : C.border}`, background: view === v ? C.accentDim : C.surface, color: view === v ? C.accent : C.textMuted, borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 700 }}>
              {v === "student" ? "Student View" : "Teacher Key"}
            </button>
          ))}
        </div>
      </div>

      {view === "student" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ background: C.surfaceUp, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 16px", fontSize: 13, color: C.textMuted }}>
            <strong style={{ color: C.text }}>Name: ___________________________</strong> &nbsp;&nbsp; <strong style={{ color: C.text }}>Date: _______________</strong> &nbsp;&nbsp; <strong style={{ color: C.text }}>Period: _____</strong>
          </div>
          {items.map((item, i) => (
            <Card key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, flexWrap: "wrap", gap: 6 }}>
                <div style={{ display: "flex", gap: 6 }}>
                  <Tag small color={C.blue}>{item.label}</Tag>
                  <Tag small color={C.purple}>{item.type}</Tag>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <Tag small color={C.textMuted}>{item.dl}</Tag>
                  <Tag small>{item.sc}</Tag>
                </div>
              </div>
              <div style={{ color: C.text, fontSize: 14, lineHeight: 1.65, marginBottom: 14, fontStyle: "italic" }}>{item.stem}</div>
              {item.type === "Constructed Response" ? (
                <div style={{ border: `1px solid ${C.border}`, borderRadius: 6, padding: 16, minHeight: 90, background: C.bg }}>
                  <div style={{ color: C.textDim, fontSize: 12 }}>Student response area</div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {item.options.map(opt => (
                    <div key={opt.letter} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "9px 12px", borderRadius: 6, background: C.surfaceUp, border: `1px solid ${C.border}` }}>
                      <span style={{ fontWeight: 700, color: C.textMuted, minWidth: 18 }}>{opt.letter}.</span>
                      <span style={{ color: C.text, fontSize: 13 }}>{opt.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))}
          <div style={{ background: C.surfaceUp, borderRadius: 8, padding: "10px 14px", fontSize: 12, color: C.textMuted, border: `1px solid ${C.border}` }}>
            <strong style={{ color: C.text }}>Items D4 and D5 not shown</strong> — D4: targeted discrimination (M5 Representational Narrowness focus) · D5: applied interpretation with irrelevant information lure
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* item keys */}
          {items.slice(1).map((item, i) => (
            <Card key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, flexWrap: "wrap", gap: 6 }}>
                <Tag small color={C.blue}>{item.label}</Tag>
                <Tag small color={C.textMuted}>{item.note.substring(0, 60)}...</Tag>
              </div>
              <div style={{ color: C.textMuted, fontSize: 13, fontStyle: "italic", marginBottom: 12 }}>{item.stem}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {item.options.map(opt => (
                  <div key={opt.letter} style={{ display: "flex", gap: 10, padding: "8px 12px", borderRadius: 6, alignItems: "flex-start", background: opt.correct ? C.accentDim : C.surfaceUp, border: `1px solid ${opt.correct ? C.accent + "66" : C.border}` }}>
                    <span style={{ fontWeight: 800, color: opt.correct ? C.accent : C.textMuted, minWidth: 18 }}>{opt.letter}.</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: opt.correct ? C.accent : C.text, fontSize: 13 }}>{opt.text}</div>
                      <div style={{ fontSize: 11, color: C.textMuted, marginTop: 3 }}>
                        {opt.correct ? <span style={{ color: C.accent, fontWeight: 700 }}>✓ CORRECT KEY</span> : <><Tag small color={C.red}>{opt.code}</Tag><span style={{ marginLeft: 6 }}>{opt.label}</span></>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}

          {/* CR error pattern table */}
          <Card>
            <SectionLabel>CR Diagnostic Error Pattern Table</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {items[0].errorPatterns.map((ep, i) => (
                <div key={i} style={{ display: "flex", gap: 10, padding: "8px 12px", background: C.surfaceUp, borderRadius: 6, alignItems: "flex-start" }}>
                  <Tag small color={ep.code.includes("M1") ? C.red : ep.code.includes("M3") ? C.amber : ep.code.includes("M4") ? C.purple : C.textMuted}>{ep.code.split(" ")[0]}</Tag>
                  <div>
                    <div style={{ color: C.textMuted, fontSize: 11, fontFamily: "monospace" }}>{ep.response}</div>
                    <div style={{ color: C.textMuted, fontSize: 11, marginTop: 2 }}>{ep.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* flow map */}
          <Card>
            <SectionLabel>Misconception–Item Flow Map</SectionLabel>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                <thead>
                  <tr style={{ background: C.surfaceUp }}>
                    {["Code","Name","Type","CR","D2","D3","D4","D5"].map(h => (
                      <th key={h} style={{ padding: "7px 10px", color: C.textMuted, textAlign: h === "Name" ? "left" : "center", border: `1px solid ${C.border}` }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {flowMap.map((row, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? C.surface : C.surfaceUp }}>
                      <td style={{ padding: "7px 10px", border: `1px solid ${C.border}`, textAlign: "center" }}><Tag small color={typeColor[row.type]}>{row.code}</Tag></td>
                      <td style={{ padding: "7px 10px", border: `1px solid ${C.border}`, color: C.text }}>{row.name}</td>
                      <td style={{ padding: "7px 10px", border: `1px solid ${C.border}`, textAlign: "center" }}><Tag small color={typeColor[row.type]}>{row.type}</Tag></td>
                      {[row.cr, row.d2, row.d3, row.d4, row.d5].map((cell, j) => (
                        <td key={j} style={{ padding: "7px 10px", border: `1px solid ${C.border}`, textAlign: "center", color: cell !== "—" ? typeColor[row.type] : C.textDim, fontWeight: cell !== "—" ? 700 : 400 }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* readiness guide */}
          <Card>
            <SectionLabel>Next-Lesson Readiness Classification</SectionLabel>
            {[
              { pattern: "CR correct + B + C + …", status: "READY", color: C.accent, note: "Full ratio language and part-whole distinction present." },
              { pattern: "CR correct + B + A or D on D3", status: "READY WITH SUPPORT", color: C.amber, note: "Ratio language intact; part-whole confusion. Monitor in Lesson 5. Module C available." },
              { pattern: "CR additive + A on D2", status: "NOT READY · M1", color: C.red, note: "Gateway misconception active. Assign Module A before Lesson 5. Do not advance." },
              { pattern: "Any: single-number response", status: "NOT READY · M2", color: C.red, note: "Foundational Collapse. Assign Module B. Module A also recommended if M1 co-present." },
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 10, alignItems: "flex-start" }}>
                <div style={{ minWidth: 130, padding: "4px 8px", background: r.color + "22", border: `1px solid ${r.color}44`, borderRadius: 6, textAlign: "center", fontSize: 10, fontWeight: 800, color: r.color, flexShrink: 0 }}>{r.status}</div>
                <div>
                  <div style={{ color: C.textMuted, fontSize: 11, fontFamily: "monospace", marginBottom: 2 }}>{r.pattern}</div>
                  <div style={{ color: C.text, fontSize: 12 }}>{r.note}</div>
                </div>
              </div>
            ))}
          </Card>
        </div>
      )}

      <Btn onClick={onNext} style={{ width: "100%", padding: 14, fontSize: 14, marginTop: 20 }}>
        VIEW REMEDIATION MODULES →
      </Btn>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCREEN 6 — REMEDIATION MODULES
// ══════════════════════════════════════════════════════════════
function RemediationScreen({ onNext }) {
  const modules = [
    {
      letter: "A", color: C.red,
      misconception: "M1 — Additive Comparison",
      type: "G", typeName: "Gateway / Ontological",
      severity: "HIGH",
      severityRationale: "Blocks all subsequent learning. Student operates with a fundamentally different model — interprets ratio situations as subtraction problems. Must be resolved before M2–M5 can be reliably assessed.",
      bundled: false,
      approach: "Contrasting cases → Classification practice → Predictive application",
      miniET: "2 items · Targeted misconception detectable on both · 3-outcome guide: RESOLVED / PARTIALLY RESOLVED / PERSISTS",
      versions: ["Teacher Version (overview + facilitation notes + answer key + mini ET key)", "Student Version (clean activities + mini ET only)"],
      constraint: "Cannot be bundled with any other module. Gateway misconceptions require focused, uninterrupted attention.",
    },
    {
      letter: "B", color: C.red,
      misconception: "M2 — Ratio as Single Number (Foundational Collapse)",
      type: "F", typeName: "Foundational Collapse",
      severity: "HIGH",
      severityRationale: "Student treats the ratio as a total count, losing internal structure. Subsequent ratio procedures are meaningless without the two-quantity frame.",
      bundled: false,
      approach: "Build internal structure → Identify-and-write → Sort structured vs. collapsed",
      miniET: "2 items · Collapsed-value answers must differ from all correct answers and from other M-code answers",
      versions: ["Teacher Version", "Student Version"],
      constraint: "Cannot be bundled with M1 (different failure steps). Standalone module required.",
    },
    {
      letter: "C", color: C.amber,
      misconception: "M3 — Part/Whole Confusion (PRIMARY) · M5 — Ratio as Fraction Only (SECONDARY)",
      type: "S+R", typeName: "Structural Confusion + Representational Narrowness",
      severity: "MEDIUM",
      severityRationale: "M3 primary: foundational concept present but part-to-part / part-to-whole undifferentiated. M5 bundled as secondary: R-type misconceptions are often sub-components of S-type. Bundling rule 2 applies.",
      bundled: true,
      approach: "Same situation, two structures → Classify and produce (alternating) → Novel context production",
      miniET: "2 items · M3 and M5 both detectable · M1 gateway also tested as unexpected misconception check",
      versions: ["Teacher Version", "Student Version"],
      constraint: "Bundled because M5 (fraction-only representation) is a natural sub-component of M3's structural confusion.",
    },
    {
      letter: "D", color: C.purple,
      misconception: "M4 — Order Reversal (Coordination Error)",
      type: "C", typeName: "Coordination Error",
      severity: "LOW-MEDIUM",
      severityRationale: "Mathematical reasoning intact. Student understands ratio as a relationship but fails to coordinate referent direction. Often resolved with procedural scaffolding.",
      bundled: false,
      approach: "Demonstrate non-commutativity → Deliberate practice with mismatched presentation → Bidirectional translation",
      miniET: "2 items · Reversed answer must differ numerically from correct answer (no palindromic values)",
      versions: ["Teacher Version", "Student Version"],
      constraint: "Numbers chosen so reversal produces a detectably different answer. Symmetric values explicitly avoided.",
    },
  ];

  const typeColor = { G: C.red, F: C.red, "S+R": C.amber, S: C.amber, R: C.blue, C: C.purple };
  const [expanded, setExpanded] = useState(null);

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "32px 20px" }}>
      <div style={{ marginBottom: 24 }}>
        <SectionLabel>Phase 6 Output · Remediation Modules</SectionLabel>
        <h2 style={{ color: C.text, fontSize: 22, margin: 0, fontWeight: 800 }}>4 Modules Generated · 8 Documents</h2>
        <div style={{ color: C.textMuted, fontSize: 13, marginTop: 4 }}>
          Each misconception classified into one of 5 types (G / F / S / R / C). Modules ordered by severity. Each produces a Teacher Version and Student Version. 20 min each.
        </div>
      </div>

      {/* type legend */}
      <Card style={{ marginBottom: 20 }}>
        <SectionLabel>Misconception-Type Taxonomy</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
          {[
            { t: "G", name: "Gateway", desc: "Fundamentally different concept model", color: C.red },
            { t: "F", name: "Foundational Collapse", desc: "Multi-component object treated as single value", color: C.red },
            { t: "S", name: "Structural Confusion", desc: "Correct concept; conflates two sub-types", color: C.amber },
            { t: "R", name: "Representational Narrowness", desc: "Correct understanding; one notation only", color: C.blue },
            { t: "C", name: "Coordination Error", desc: "Correct reasoning; auxiliary mapping wrong", color: C.purple },
          ].map(item => (
            <div key={item.t} style={{ background: item.color + "15", border: `1px solid ${item.color}44`, borderRadius: 8, padding: "10px 10px", textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: item.color, marginBottom: 4 }}>{item.t}</div>
              <div style={{ color: C.text, fontSize: 11, fontWeight: 700, marginBottom: 4 }}>{item.name}</div>
              <div style={{ color: C.textMuted, fontSize: 10, lineHeight: 1.4 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* module cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
        {modules.map((mod) => (
          <div key={mod.letter} style={{ border: `1px solid ${mod.color}44`, borderRadius: 12, overflow: "hidden" }}>
            <div onClick={() => setExpanded(expanded === mod.letter ? null : mod.letter)} style={{ cursor: "pointer", padding: "16px 18px", background: mod.color + "0F", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: mod.color + "33", border: `1px solid ${mod.color}66`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 18, color: mod.color, flexShrink: 0 }}>{mod.letter}</div>
                <div>
                  <div style={{ color: C.text, fontWeight: 700, fontSize: 14 }}>{mod.misconception}</div>
                  <div style={{ display: "flex", gap: 6, marginTop: 4, flexWrap: "wrap" }}>
                    <Tag small color={mod.color}>{mod.type} — {mod.typeName}</Tag>
                    <Tag small color={mod.severity === "HIGH" ? C.red : mod.severity === "MEDIUM" ? C.amber : C.blue}>Severity: {mod.severity}</Tag>
                    {mod.bundled && <Tag small color={C.purple}>BUNDLED MODULE</Tag>}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
                <span style={{ color: C.textMuted, fontSize: 11 }}>📄 2 files</span>
                <span style={{ color: mod.color, fontSize: 16 }}>{expanded === mod.letter ? "▲" : "▼"}</span>
              </div>
            </div>
            {expanded === mod.letter && (
              <div style={{ padding: "14px 18px", background: C.surface, borderTop: `1px solid ${mod.color}33`, display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ background: C.surfaceUp, borderRadius: 8, padding: "10px 14px" }}>
                  <div style={{ fontSize: 11, color: mod.color, fontWeight: 700, marginBottom: 4 }}>SEVERITY RATIONALE</div>
                  <div style={{ color: C.textMuted, fontSize: 12, lineHeight: 1.6 }}>{mod.severityRationale}</div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div style={{ background: C.surfaceUp, borderRadius: 8, padding: "10px 14px" }}>
                    <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 700, marginBottom: 4 }}>INSTRUCTIONAL APPROACH</div>
                    <div style={{ color: C.text, fontSize: 12, lineHeight: 1.6 }}>{mod.approach}</div>
                    <div style={{ color: C.textMuted, fontSize: 11, marginTop: 6 }}>3 activities · 20 min · Self-directed or teacher-facilitated</div>
                  </div>
                  <div style={{ background: C.surfaceUp, borderRadius: 8, padding: "10px 14px" }}>
                    <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 700, marginBottom: 4 }}>MINI DIAGNOSTIC ET</div>
                    <div style={{ color: C.text, fontSize: 12, lineHeight: 1.6 }}>{mod.miniET}</div>
                  </div>
                </div>
                <div style={{ fontSize: 11, color: C.amber, lineHeight: 1.6, padding: "8px 12px", background: C.amberDim, borderRadius: 6, border: `1px solid ${C.amber}33` }}>
                  <strong>Design constraint:</strong> {mod.constraint}
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {mod.versions.map((v, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, background: C.surfaceUp, borderRadius: 6, padding: "6px 12px", fontSize: 12, color: C.textMuted, border: `1px solid ${C.border}` }}>
                      <span>📄</span><span>{v}</span><span style={{ color: mod.color, fontSize: 10, fontWeight: 700 }}>DOCX ↓</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Btn onClick={onNext} style={{ width: "100%", padding: 14, fontSize: 14 }}>
        VIEW TEACHER REPORT + STUDENT DASHBOARD →
      </Btn>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCREEN 7 — TEACHER REPORT + STUDENT DASHBOARD
// ══════════════════════════════════════════════════════════════
function FinalScreen() {
  const [tab, setTab] = useState("class");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [mlExpanded, setMlExpanded] = useState({});

  const students = [
    { name: "Amara J.",  scores: [1,1,1], m1:false, m2:false, m3:true,  m4:false, status:"support",   module:"C" },
    { name: "Diego R.",  scores: [0,0,1], m1:true,  m2:false, m3:false, m4:false, status:"not-ready", module:"A" },
    { name: "Priya S.",  scores: [1,1,0], m1:false, m2:false, m3:true,  m4:false, status:"support",   module:"C" },
    { name: "Marcus T.", scores: [0,0,0], m1:false, m2:true,  m3:false, m4:false, status:"not-ready", module:"B" },
    { name: "Layla W.",  scores: [1,1,1], m1:false, m2:false, m3:false, m4:false, status:"ready",     module:null },
    { name: "Finn O.",   scores: [1,0,1], m1:true,  m2:false, m3:false, m4:false, status:"support",   module:"A" },
    { name: "Nadia K.",  scores: [0,1,1], m1:false, m2:false, m3:false, m4:true,  status:"support",   module:"D" },
    { name: "Elijah B.", scores: [1,1,0], m1:false, m2:true,  m3:false, m4:false, status:"support",   module:"B" },
  ];
  const statusColor = { ready: C.accent, support: C.amber, "not-ready": C.red };
  const statusLabel = { ready: "READY", support: "MONITOR", "not-ready": "INTERVENE" };
  const counts = {
    ready: students.filter(s => s.status === "ready").length,
    support: students.filter(s => s.status === "support").length,
    "not-ready": students.filter(s => s.status === "not-ready").length,
  };
  const miscCounts = {
    "M1 Additive Comparison": students.filter(s => s.m1).length,
    "M2 Foundational Collapse": students.filter(s => s.m2).length,
    "M3 Part-Whole Confusion": students.filter(s => s.m3).length,
    "M4 Order Reversal": students.filter(s => s.m4).length,
  };
  const miscColors = {
    "M1 Additive Comparison": C.red,
    "M2 Foundational Collapse": C.red,
    "M3 Part-Whole Confusion": C.amber,
    "M4 Order Reversal": C.purple,
  };

  // ── knowledge trace data for individual student profiles ──
  const knowledgeTrace = {
    "Amara J.": {
      status: "support", module: "C",
      plain: {
        strengths: ["Writes ratio relationships correctly in most contexts","Understands ratio as a multiplicative relationship, not a difference","Fluent with colon notation and ratio language"],
        support: ["Confuses part-to-part and part-to-whole ratios — sees 12:20 as 12:8","Consistent error on items requiring part-to-whole identification"],
      },
      standards: [
        { code: "4.OA.A", label: "Multiplicative comparison", level: "prereq", theta: 0.9, conf: "high", note: "Strong foundation — multiplicative reasoning intact" },
        { code: "5.NF.B", label: "Fractions as division", level: "prereq", theta: 0.7, conf: "medium", note: "Adequate; ratio-as-fraction confusion minor" },
        { code: "6.RP.A.1", label: "Ratio concepts (current)", level: "current", theta: 0.4, conf: "high", note: "Ratio language and notation solid; part-whole distinction failing" },
        { code: "6.RP.A.2", label: "Unit rate", level: "next", theta: null, conf: "projected", note: "Projected at risk: part-whole confusion likely to surface in unit rate contexts" },
        { code: "6.RP.A.3", label: "Equivalent ratios / rate", level: "next", theta: null, conf: "projected", note: "Projected moderate risk depending on M3 resolution" },
      ],
      activeM: { code: "M3", name: "Part-Whole Confusion", type: "S", severity: "Medium" },
      mlDetail: {
        modelType: "Knowledge tracing (DKVMN — labeled response sequences)",
        latentState: "6RPA1 — θ̂ = +0.38 (SE = 0.24)",
        activeMisc: "6RPA1.MC3 active (P̂ = 0.71, 95% CI [0.52, 0.85])",
        priorEvidence: "3 items (D2 ✓, D3 ✗, ET CR partial) — convergent evidence for M3",
        projections: "6RPA2: P(at-risk) = 0.62 given unresolved M3 · 6RPA3: P(at-risk) = 0.44",
        dataNote: "Labeled against psychometrician-defined M-code pool. Latent states defined before data collection — not inferred post-hoc from behavioral proxies.",
      },
    },
    "Diego R.": {
      status: "not-ready", module: "A",
      plain: {
        strengths: ["Can identify individual quantities in a situation","Understands basic counting and comparison"],
        support: ["Treats ratio relationships as subtraction — 'there are 2 more oats than flour'","Gateway misconception active: all ratio reasoning filtered through additive frame","Will not benefit from ratio notation instruction until this is resolved"],
      },
      standards: [
        { code: "4.OA.A", label: "Multiplicative comparison", level: "prereq", theta: 0.1, conf: "medium", note: "Weak — additive reasoning dominant even in multiplicative contexts" },
        { code: "5.NF.B", label: "Fractions as division", level: "prereq", theta: 0.3, conf: "medium", note: "Partial; procedural only" },
        { code: "6.RP.A.1", label: "Ratio concepts (current)", level: "current", theta: -0.8, conf: "high", note: "Gateway misconception (M1) active — below readiness threshold" },
        { code: "6.RP.A.2", label: "Unit rate", level: "next", theta: null, conf: "projected", note: "High risk: M1 will systematically corrupt unit rate reasoning" },
        { code: "6.RP.A.3", label: "Equivalent ratios / rate", level: "next", theta: null, conf: "projected", note: "High risk: cannot be meaningfully assessed until M1 resolved" },
      ],
      activeM: { code: "M1", name: "Additive Comparison", type: "G", severity: "High — Gateway" },
      mlDetail: {
        modelType: "Knowledge tracing (DKVMN — labeled response sequences)",
        latentState: "6RPA1 — θ̂ = −0.81 (SE = 0.31)",
        activeMisc: "6RPA1.MC1 active (P̂ = 0.88, 95% CI [0.72, 0.96])",
        priorEvidence: "4 items (D1 ✗, D2 ✗, CR additive, D3 ✗) — high-confidence convergent evidence for M1 gateway",
        projections: "6RPA2: P(at-risk) = 0.91 · 6RPA3: P(at-risk) = 0.89 — do not advance until M1 resolved",
        dataNote: "Gateway misconception flagged as blocking. Downstream standard projections unreliable until M1 cleared — reported as high-risk rather than specific theta estimates.",
      },
    },
  };

  const toggleMl = (key) => setMlExpanded(prev => ({ ...prev, [key]: !prev[key] }));

  const StudentProfile = ({ student }) => {
    const trace = knowledgeTrace[student.name];
    if (!trace) return (
      <div style={{ padding: "24px 0", textAlign: "center", color: C.textMuted, fontSize: 13 }}>
        Full knowledge trace available for Amara J. and Diego R. in this demo.
      </div>
    );
    const levelColor = { prereq: C.textMuted, current: C.accent, next: C.blue };
    const levelLabel = { prereq: "PREREQUISITE", current: "CURRENT", next: "PROJECTED NEXT" };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {/* header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
          <div>
            <div style={{ color: C.text, fontWeight: 800, fontSize: 18 }}>{student.name}</div>
            <div style={{ color: C.textMuted, fontSize: 13, marginTop: 2 }}>6.RP.A.1 · Lesson 4 · Period 2</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ background: statusColor[trace.status] + "22", border: `1px solid ${statusColor[trace.status]}44`, borderRadius: 8, padding: "8px 14px", textAlign: "center" }}>
              <div style={{ fontSize: 10, color: statusColor[trace.status], fontWeight: 800, letterSpacing: "0.07em" }}>{statusLabel[trace.status]}</div>
            </div>
            {trace.module && (
              <div style={{ background: C.amberDim, border: `1px solid ${C.amber}44`, borderRadius: 8, padding: "8px 14px", textAlign: "center" }}>
                <div style={{ fontSize: 10, color: C.amber, fontWeight: 800 }}>MODULE {trace.module}</div>
                <div style={{ fontSize: 9, color: C.textMuted, marginTop: 1 }}>ASSIGNED</div>
              </div>
            )}
          </div>
        </div>

        {/* plain language summary */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div style={{ background: C.accentDim, border: `1px solid ${C.accent}33`, borderRadius: 8, padding: "12px 14px" }}>
            <div style={{ fontSize: 10, color: C.accent, fontWeight: 800, letterSpacing: "0.08em", marginBottom: 8 }}>AREAS OF STRENGTH</div>
            {trace.plain.strengths.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 7, marginBottom: 6, alignItems: "flex-start" }}>
                <span style={{ color: C.accent, fontSize: 11, flexShrink: 0, marginTop: 1 }}>✓</span>
                <span style={{ color: C.text, fontSize: 12, lineHeight: 1.5 }}>{s}</span>
              </div>
            ))}
          </div>
          <div style={{ background: C.redDim, border: `1px solid ${C.red}33`, borderRadius: 8, padding: "12px 14px" }}>
            <div style={{ fontSize: 10, color: C.red, fontWeight: 800, letterSpacing: "0.08em", marginBottom: 8 }}>AREAS FOR SUPPORT</div>
            {trace.plain.support.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 7, marginBottom: 6, alignItems: "flex-start" }}>
                <span style={{ color: C.red, fontSize: 11, flexShrink: 0, marginTop: 1 }}>→</span>
                <span style={{ color: C.text, fontSize: 12, lineHeight: 1.5 }}>{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* active misconception */}
        <div style={{ background: C.surfaceUp, border: `1px solid ${trace.activeM.severity.includes("Gateway") ? C.red + "66" : C.amber + "55"}`, borderRadius: 8, padding: "12px 14px", display: "flex", gap: 12, alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 700, marginBottom: 4 }}>ACTIVE MISUNDERSTANDING</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <Tag small color={trace.activeM.severity.includes("Gateway") ? C.red : C.amber}>{trace.activeM.code} — {trace.activeM.name}</Tag>
              <Tag small color={trace.activeM.severity.includes("High") ? C.red : C.amber}>Type {trace.activeM.type} · {trace.activeM.severity}</Tag>
            </div>
          </div>
        </div>

        {/* knowledge trace — full standards */}
        <Card>
          <SectionLabel>Knowledge Trace — Standards Progression</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {trace.standards.map((std, i) => {
              const col = levelColor[std.level];
              const thetaDisplay = std.theta !== null ? std.theta.toFixed(2) : "—";
              const barWidth = std.theta !== null ? Math.round(((std.theta + 2) / 4) * 100) : 0;
              return (
                <div key={i} style={{ background: std.level === "current" ? C.accentDim : C.surfaceUp, border: `1px solid ${std.level === "current" ? C.accent + "44" : C.border}`, borderRadius: 8, padding: "10px 12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: std.theta !== null ? 8 : 4 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                      <Tag small color={col}>{levelLabel[std.level]}</Tag>
                      <span style={{ color: C.text, fontWeight: 700, fontSize: 12 }}>{std.code}</span>
                      <span style={{ color: C.textMuted, fontSize: 12 }}>{std.label}</span>
                    </div>
                    <div style={{ display: "flex", gap: 6, alignItems: "center", flexShrink: 0 }}>
                      {std.theta !== null ? (
                        <span style={{ color: std.theta > 0.5 ? C.accent : std.theta > 0 ? C.amber : C.red, fontWeight: 800, fontSize: 13, fontFamily: "monospace" }}>θ = {thetaDisplay}</span>
                      ) : (
                        <Tag small color={C.blue}>PROJECTED</Tag>
                      )}
                      <Tag small color={std.conf === "high" ? C.accent : std.conf === "medium" ? C.amber : C.blue}>{std.conf}</Tag>
                    </div>
                  </div>
                  {std.theta !== null && (
                    <div style={{ marginBottom: 6 }}>
                      <div style={{ background: C.border, borderRadius: 3, height: 5, overflow: "hidden" }}>
                        <div style={{ width: `${barWidth}%`, height: "100%", background: std.theta > 0.5 ? C.accent : std.theta > 0 ? C.amber : C.red, borderRadius: 3 }} />
                      </div>
                    </div>
                  )}
                  <div style={{ color: C.textMuted, fontSize: 11, lineHeight: 1.5 }}>{std.note}</div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* ML detail — expandable */}
        <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>
          <div onClick={() => toggleMl(student.name)} style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: C.surfaceUp }}>
            <div>
              <div style={{ color: C.text, fontWeight: 700, fontSize: 13 }}>ML Detail</div>
              <div style={{ color: C.textMuted, fontSize: 11, marginTop: 1 }}>Latent state estimates · Model type · Data architecture note</div>
            </div>
            <span style={{ color: C.accent, fontSize: 14 }}>{mlExpanded[student.name] ? "▲" : "▼"}</span>
          </div>
          {mlExpanded[student.name] && (
            <div style={{ padding: "14px 16px", background: C.surface, borderTop: `1px solid ${C.border}`, display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                ["Model", trace.mlDetail.modelType],
                ["Current latent state", trace.mlDetail.latentState],
                ["Active misconception estimate", trace.mlDetail.activeMisc],
                ["Evidence basis", trace.mlDetail.priorEvidence],
                ["Downstream projections", trace.mlDetail.projections],
              ].map(([label, val]) => (
                <div key={label} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ color: C.textMuted, fontSize: 11, minWidth: 170, flexShrink: 0, fontFamily: "monospace" }}>{label}</span>
                  <span style={{ color: C.text, fontSize: 12, lineHeight: 1.5 }}>{val}</span>
                </div>
              ))}
              <div style={{ marginTop: 4, padding: "10px 12px", background: C.accentDim, borderRadius: 7, border: `1px solid ${C.accent}33` }}>
                <div style={{ fontSize: 10, color: C.accent, fontWeight: 800, marginBottom: 4 }}>DATA ARCHITECTURE NOTE</div>
                <div style={{ fontSize: 11, color: C.textMuted, lineHeight: 1.6 }}>{trace.mlDetail.dataNote}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px" }}>
      <div style={{ marginBottom: 20 }}>
        <SectionLabel>Post-ET Data · Phase 5b</SectionLabel>
        <h2 style={{ color: C.text, fontSize: 22, margin: 0, fontWeight: 800 }}>6.RP.A.1 · Lesson 4 · Dashboards</h2>
        <div style={{ color: C.textMuted, fontSize: 13, marginTop: 4 }}>Class Dashboard · Individual Student Dashboard</div>
      </div>

      <div style={{ display: "flex", gap: 0, marginBottom: 0, borderBottom: `1px solid ${C.border}` }}>
        {[["class","Class Dashboard"],["student","Student Dashboard"]].map(([id,label]) => (
          <button key={id} onClick={() => setTab(id)} style={{ padding: "10px 20px", background: "none", border: "none", borderBottom: tab===id ? `2px solid ${C.accent}` : "2px solid transparent", color: tab===id ? C.accent : C.textMuted, fontWeight: tab===id ? 700 : 500, fontSize: 13, cursor: "pointer", marginBottom: -1 }}>{label}</button>
        ))}
      </div>

      {tab === "class" && (
        <div style={{ paddingTop: 20 }}>
          {/* summary strip */}
          <div style={{ display: "flex", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
            {Object.entries(counts).map(([k, v]) => (
              <div key={k} style={{ flex: 1, minWidth: 120, textAlign: "center", background: statusColor[k] + "18", border: `1px solid ${statusColor[k]}44`, borderRadius: 10, padding: "12px 16px" }}>
                <div style={{ fontSize: 30, fontWeight: 900, color: statusColor[k] }}>{v}</div>
                <div style={{ fontSize: 10, color: statusColor[k], fontWeight: 800, letterSpacing: "0.08em" }}>{statusLabel[k]}</div>
              </div>
            ))}
            <div style={{ flex: 2, minWidth: 180, background: C.surfaceUp, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 16px" }}>
              <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 700, marginBottom: 4 }}>Period 2 · 8 students · 6.RP.A.1 · Lesson 4</div>
              <div style={{ fontSize: 12, color: C.textMuted }}>Exit ticket 10/14. Data feeds misconception support inputs for Lesson 5 gate (future state: automated pipeline).</div>
            </div>
          </div>

          {/* misconception bars */}
          <Card style={{ marginBottom: 16 }}>
            <SectionLabel>Misconception Prevalence</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {Object.entries(miscCounts).map(([name, count]) => {
                const pct = Math.round((count / students.length) * 100);
                const col = miscColors[name];
                const code = name.split(" ")[0];
                return (
                  <div key={name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Tag small color={col}>{code}</Tag>
                    <div style={{ flex: 1, background: C.surfaceUp, borderRadius: 4, height: 20, overflow: "hidden" }}>
                      <div style={{ width: `${Math.max(pct, 0)}%`, height: "100%", background: col, borderRadius: 4, display: "flex", alignItems: "center", paddingLeft: 8, minWidth: pct > 0 ? 4 : 0 }}>
                        {pct > 20 && <span style={{ color: "#0D1117", fontSize: 10, fontWeight: 700 }}>{count}/{students.length}</span>}
                      </div>
                    </div>
                    <div style={{ color: C.textMuted, fontSize: 12, minWidth: 160 }}>{name.split(" ").slice(1).join(" ")}</div>
                    <div style={{ color: col, fontWeight: 800, fontSize: 13, minWidth: 36 }}>{pct}%</div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* student table */}
          <Card style={{ marginBottom: 16 }}>
            <SectionLabel>Individual Knowledge Traces</SectionLabel>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                <thead>
                  <tr style={{ background: C.surfaceUp }}>
                    {["Student","CR","D2","D3","M1","M2","M3","M4","Status","Module"].map(h => (
                      <th key={h} style={{ padding: "8px 10px", color: C.textMuted, textAlign: h === "Student" ? "left" : "center", border: `1px solid ${C.border}`, whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {students.map((s, i) => (
                    <tr key={i} onClick={() => { setSelectedStudent(s); setTab("student"); }} style={{ background: i % 2 === 0 ? C.surface : C.surfaceUp, cursor: "pointer" }}>
                      <td style={{ padding: "8px 10px", border: `1px solid ${C.border}`, color: C.accent, fontWeight: 600, textDecoration: "underline" }}>{s.name}</td>
                      {s.scores.map((sc, j) => (
                        <td key={j} style={{ padding: "8px 10px", border: `1px solid ${C.border}`, textAlign: "center" }}>
                          <span style={{ color: sc ? C.accent : C.red, fontWeight: 700 }}>{sc ? "✓" : "✗"}</span>
                        </td>
                      ))}
                      {[s.m1, s.m2, s.m3, s.m4].map((m, j) => (
                        <td key={j} style={{ padding: "8px 10px", border: `1px solid ${C.border}`, textAlign: "center" }}>
                          {m ? <span style={{ color: C.red, fontWeight: 700 }}>●</span> : <span style={{ color: C.textDim }}>○</span>}
                        </td>
                      ))}
                      <td style={{ padding: "8px 10px", border: `1px solid ${C.border}`, textAlign: "center" }}>
                        <span style={{ background: statusColor[s.status] + "22", color: statusColor[s.status], border: `1px solid ${statusColor[s.status]}44`, borderRadius: 4, padding: "2px 8px", fontSize: 10, fontWeight: 800 }}>{statusLabel[s.status]}</span>
                      </td>
                      <td style={{ padding: "8px 10px", border: `1px solid ${C.border}`, textAlign: "center" }}>
                        {s.module ? <Tag small color={C.amber}>Mod {s.module}</Tag> : <span style={{ color: C.textDim }}>—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 8, fontSize: 11, color: C.textMuted }}>Click any student row to open their individual knowledge trace →</div>
          </Card>

          {/* output summary */}
          <Card style={{ border: `1px solid ${C.accent}44`, background: C.accentDim }}>
            <SectionLabel>Complete Pipeline Output — 10 Documents</SectionLabel>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[
                { label: "Teacher Diagnostic Report", tag: "JSX + DOCX", color: C.accent },
                { label: "Clean Teacher Lesson", tag: "DOCX", color: C.blue },
                { label: "Annotated Reviewer Lesson", tag: "Background · DOCX", color: C.textMuted },
                { label: "Diagnostic Exit Ticket + Teacher Key", tag: "DOCX", color: C.purple },
                { label: "Decision Log", tag: "DOCX", color: C.textMuted },
                { label: "Module A — Teacher + Student", tag: "2× DOCX", color: C.red },
                { label: "Module B — Teacher + Student", tag: "2× DOCX", color: C.red },
                { label: "Module C — Teacher + Student", tag: "2× DOCX", color: C.amber },
                { label: "Module D — Teacher + Student", tag: "2× DOCX", color: C.purple },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", background: C.surface, borderRadius: 6, border: `1px solid ${C.border}` }}>
                  <span style={{ color: item.color }}>📄</span>
                  <span style={{ color: C.text, fontSize: 12, flex: 1 }}>{item.label}</span>
                  <Tag small color={item.color}>{item.tag}</Tag>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === "student" && (
        <div style={{ paddingTop: 20 }}>
          {/* student selector */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
            {students.map(s => (
              <button key={s.name} onClick={() => setSelectedStudent(s)} style={{ padding: "7px 14px", borderRadius: 8, border: `1px solid ${selectedStudent?.name === s.name ? statusColor[s.status] + "88" : C.border}`, background: selectedStudent?.name === s.name ? statusColor[s.status] + "18" : C.surface, color: selectedStudent?.name === s.name ? statusColor[s.status] : C.textMuted, fontSize: 12, fontWeight: selectedStudent?.name === s.name ? 700 : 400, cursor: "pointer" }}>
                {s.name}
              </button>
            ))}
          </div>

          {selectedStudent ? (
            <StudentProfile student={selectedStudent} />
          ) : (
            <div style={{ textAlign: "center", padding: "48px 20px", color: C.textMuted, fontSize: 14 }}>
              Select a student above to view their individual knowledge trace.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// NAV BAR
// ══════════════════════════════════════════════════════════════
function NavBar({ screen, onScreen }) {
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 100, background: C.bg + "F0", backdropFilter: "blur(14px)", borderBottom: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", alignItems: "center", height: 50, padding: "0 20px", gap: 0, overflowX: "auto" }}>
        <div style={{ fontWeight: 900, fontSize: 16, color: C.accent, marginRight: 20, letterSpacing: "-0.02em", flexShrink: 0 }}>RESOLVE</div>
        {SCREENS.map((label, i) => {
          const active = screen === i;
          const past = screen > i;
          return (
            <button key={i} onClick={() => onScreen(i)} style={{ background: "none", border: "none", borderBottom: active ? `2px solid ${C.accent}` : "2px solid transparent", cursor: "pointer", color: active ? C.accent : past ? C.text : C.textMuted, fontWeight: active ? 700 : 500, fontSize: 11, padding: "0 10px", height: "100%", display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap", marginBottom: -1, transition: "all 0.15s" }}>
              {past && <span style={{ color: C.accent, fontSize: 9 }}>✓</span>}
              <span>{i + 1}. {label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// APP
// ══════════════════════════════════════════════════════════════
export default function App() {
  const [screen, setScreen] = useState(0);
  const topRef = useRef(null);

  const goTo = (i) => {
    setScreen(i);
    if (topRef.current) topRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={topRef} style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Segoe UI', 'DM Sans', system-ui, sans-serif" }}>
      <NavBar screen={screen} onScreen={goTo} />
      {screen === 0 && <UploadScreen       onNext={() => goTo(1)} />}
      {screen === 1 && <ProcessingScreen   onNext={() => goTo(2)} />}
      {screen === 2 && <GateScreen         onNext={() => goTo(3)} />}
      {screen === 3 && <LessonOutputsScreen onNext={() => goTo(4)} />}
      {screen === 4 && <ExitTicketScreen   onNext={() => goTo(5)} />}
      {screen === 5 && <RemediationScreen  onNext={() => goTo(6)} />}
      {screen === 6 && <FinalScreen />}
    </div>
  );
}
