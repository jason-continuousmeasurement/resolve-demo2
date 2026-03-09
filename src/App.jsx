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
  "Report & Dashboard",
  "Targeted Support",
  "Researcher View",
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
          Drop a lesson.<br /><span style={{ color: C.accent }}>Get a diagnostically-aligned instructional package.</span>
        </h1>
        <p style={{ color: C.textMuted, marginTop: 14, fontSize: 14, lineHeight: 1.7, maxWidth: 480, margin: "14px auto 0" }}>
          Resolve analyzes any HQIM mathematics lesson, rewrites it against a research-grounded cognitive architecture and clarification protocol, replaces the exit ticket with a psychometrically-designed diagnostic instrument, and generates targeted remediation modules — one pipeline, every lesson.
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
              { label: "Lesson Clarification Protocol", tag: "REQUIRED · BUILT-IN", color: C.accent, desc: "A decision-driven framework governing how objectives are composed, activities are classified (Prioritized / De-prioritized / Deleted), and exit tickets are evaluated. Grounded in work-task observation and cognitive interviews with master and novice educators. Baked into the pipeline — not something you configure." },
              { label: "Content Specification", tag: "OPTIONAL · AUTO-GENERATED IF ABSENT", color: C.amber, desc: "A fully-articulated standard-level specification spanning seven cognitive dimensions, each with its own coding structure — covering everything from cognitive architecture and misconception taxonomy to mastery criteria and psychometric priors. Produced by Agent 1 or authored by a human expert. If none is provided, Resolve builds a DRAFT specification from research literature and flags it for expert review." },
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
    { num: "Phase 2", name: "Lesson Review", sub: "Cognitive step coverage · difficulty profile · goal achievement · choice menu", state: phase >= 2 ? "done" : phase === 1 ? "running" : "waiting" },
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
            <span style={{ color: C.amber, fontWeight: 800, fontSize: 13 }}>MANDATORY GATE — Educator Decision Point</span>
          </div>
          <div style={{ color: C.textMuted, fontSize: 12, lineHeight: 1.65 }}>
            Phases 1–2 complete. A Lesson Report is ready for review. Phases 3–6 are <strong style={{ color: C.text }}>blocked</strong> until the educator reviews the analysis and releases the pipeline — selecting supports, adjusting difficulty, or choosing to proceed with no modifications. The agent will proceed on best judgment if no selections are made.
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
        {phase < 2 ? "Analyzing lesson..." : "REVIEW LESSON REPORT + RELEASE GATE →"}
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
    { id: "C", label: "Increase misconception-surfacing", desc: "No activity currently creates conditions where subtracting instead of comparing (the gateway misunderstanding) produces a detectably wrong answer. Adjust number selection in Activity 1.", tradeoff: "Minimal time impact; number selection change only." },
    { id: "D", label: "Leave as-is, flag for teacher awareness", desc: "Accept current lesson structure with annotated escalation flags. Step 4 gap noted in Teacher Report.", tradeoff: "Step 4 gap persists; teacher awareness is the mitigation." },
  ];

  const handleRelease = () => { setReleased(true); setTimeout(onNext, 900); };

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "32px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22, flexWrap: "wrap", gap: 12 }}>
        <div>
          <SectionLabel>Educator Decision Gate</SectionLabel>
          <h2 style={{ color: C.text, fontSize: 22, margin: 0, fontWeight: 800 }}>Lesson Report</h2>
          <div style={{ color: C.textMuted, fontSize: 13, marginTop: 4 }}>6.RP.A.1 · Lesson 4 · Review lesson report, then release pipeline</div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Tag color={C.amber}>⏸ PIPELINE PAUSED</Tag>
          <Tag color={C.accent}>Phases 1–2 complete</Tag>
        </div>
      </div>

      {/* meta-objective + thinking steps — always visible */}
      <Card style={{ marginBottom: 16, borderLeft: `4px solid ${C.accent}` }}>
        <div style={{ fontSize: 10, color: C.accent, fontWeight: 800, letterSpacing: "0.1em", marginBottom: 8 }}>WHAT THIS LESSON IS REALLY ABOUT</div>
        <div style={{ color: C.text, fontSize: 14, fontWeight: 700, lineHeight: 1.5, marginBottom: 14 }}>
          Students will identify when two quantities are in a ratio relationship and describe it using "for every" language and colon notation.
        </div>
        <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 800, letterSpacing: "0.1em", marginBottom: 10 }}>TO SUCCEED, STUDENTS NEED TO NAVIGATE FIVE THINGS</div>
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
      </Card>

      {/* tabs — Coverage / Difficulty / Goal Achievement */}
      <div style={{ display: "flex", gap: 0, marginBottom: 0, borderBottom: `1px solid ${C.border}` }}>
        {[["coverage","Coverage Matrix"],["difficulty","Difficulty Profile"],["achievement","Goal Achievement"]].map(([id, label]) => (
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
            <div style={{ marginTop: 10, fontSize: 11, color: C.textMuted }}><span style={{ color: C.red }}>⚠</span> "Know what's being compared to what" has no direct coverage in any activity. "See it as for every, not more than" is covered by Activity 1 only — no backup if students miss it.</div>
          </div>
        )}

        {activeTab === "difficulty" && (
          <div>
            <div style={{ color: C.textMuted, fontSize: 12, marginBottom: 12 }}>How the numbers, context, and type of thinking shift across activities. Computational difficulty is not the same as cognitive demand.</div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
              <thead>
                <tr style={{ background: C.surfaceUp }}>
                  {["Activity","Number Properties","Rep. Demand","Context","Cognitive Demand"].map(h => (
                    <th key={h} style={{ padding: "8px 10px", textAlign: "left", color: C.textMuted, border: `1px solid ${C.border}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {diffProfile.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? C.surface : C.surfaceUp }}>
                    <td style={{ padding: "8px 10px", border: `1px solid ${C.border}`, color: C.text, fontWeight: 600 }}>{row.act}</td>
                    <td style={{ padding: "8px 10px", border: `1px solid ${C.border}`, color: C.textMuted }}>{row.numProp}</td>
                    <td style={{ padding: "8px 10px", border: `1px solid ${C.border}`, color: C.textMuted }}>{row.rep}</td>
                    <td style={{ padding: "8px 10px", border: `1px solid ${C.border}`, color: C.textMuted }}>{row.context}</td>
                    <td style={{ padding: "8px 10px", border: `1px solid ${C.border}`, color: C.textMuted }}>{row.cogDemand}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: 10, fontSize: 11, color: C.textMuted }}><span style={{ color: C.amber }}>⚠</span> Activity 2 introduces non-integer numbers and a novel context at the same time — a bigger jump than Activity 1 suggests. The Cool-Down steps back to simple numbers without adding new thinking.</div>
          </div>
        )}

        {activeTab === "achievement" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { dim: "Conceptual", color: C.blue, pct: 55, note: "The core shift — seeing a ratio as multiplicative rather than additive — is covered in Activity 1 only. No activity explicitly puts students in a position where subtracting instead of comparing gives a wrong answer." },
              { dim: "Procedural", color: C.accent, pct: 80, note: "Ratio notation practice is adequate across Activities 1–2. Multiple representations are present but not systematically translated between." },
              { dim: "Applied", color: C.purple, pct: 60, note: "Familiar contexts dominate. Activity 2 provides a novel context but the difficulty jump may make it inaccessible for students who aren't yet solid on the core idea. Part-to-whole application is absent." },
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
              <strong style={{ color: C.text }}>Efficiency:</strong> ~60% of instructional time on activities directly developing the lesson goal. The Cool-Down (reflection prompt only) contributes no useful information about what students understood — it will be replaced by the diagnostic exit ticket.
            </div>
          </div>
        )}

      </Card>

      {/* unified choice menu */}
      <Card style={{ marginBottom: 20 }}>
        <SectionLabel>Choose a Direction</SectionLabel>
        <div style={{ color: C.textMuted, fontSize: 12, marginBottom: 12 }}>Select one option to direct the clarification. Pipeline proceeds on best judgment if no selection is made.</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { id: "A", label: "Fill the gap in part-to-whole coverage", desc: "No activity directly develops the part-to-part vs. part-to-whole distinction. We'll modify Activity 1 to include a short decision task, or replace the Cool-Down with a new discrimination activity.", tradeoff: "Adds ~5 min; requires Cool-Down replacement.", extra: null },
            { id: "B", label: "Ease the difficulty jump", desc: "Activity 2 introduces harder numbers and a new context at the same time. We'll simplify the numbers and setting in Activity 2 without changing the thinking it demands.", tradeoff: "Reduces stretch for students who are ready for more.", extra: "difficulty" },
            { id: "C", label: "Surface the subtraction trap", desc: "No activity currently puts students in a position where subtracting instead of comparing gives a detectably wrong answer. We'll adjust number selection in Activity 1 so that error is visible.", tradeoff: "Minimal time impact — number selection change only.", extra: "misconception" },
            { id: "D", label: "Leave as-is, flag for teacher awareness", desc: "Accept the current lesson structure with notes for the teacher. The gap in part-to-whole coverage is flagged in the lesson report.", tradeoff: "The gap persists; teacher awareness is the mitigation.", extra: null },
          ].map(c => (
            <div key={c.id}>
              <div onClick={() => setSelectedChoice(c.id)} style={{ cursor: "pointer", padding: "11px 14px", borderRadius: 8, border: `1px solid ${selectedChoice === c.id ? C.accent + "88" : C.border}`, background: selectedChoice === c.id ? C.accentDim : C.surfaceUp, transition: "all 0.2s" }}>
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
              {/* inline expanded UI for B */}
              {c.extra === "difficulty" && selectedChoice === "B" && (
                <div style={{ marginTop: 4, fontSize: 12, color: C.textMuted, background: C.blueDim, borderRadius: 6, padding: "8px 12px", border: `1px solid ${C.blue}33` }}>
                  <span style={{ color: C.blue, fontWeight: 700 }}>Active:</span> Activity 2 shifted to smaller, integer values in a familiar context. The reasoning the activity demands is unchanged — only the numbers and setting are easier.
                </div>
              )}
              {/* inline expanded UI for C */}
              {c.extra === "misconception" && selectedChoice === "C" && (
                <div style={{ marginTop: 4, display: "flex", flexDirection: "column", gap: 6 }}>
                  <div style={{ fontSize: 11, color: C.textMuted, padding: "6px 10px", background: C.surface, borderRadius: 6, border: `1px solid ${C.border}` }}>Select the misunderstandings you want the lesson to surface. The pipeline will adjust number selection so each one produces a detectably wrong answer — making it visible during instruction.</div>
                  {[
                    { name: "Subtracting instead of comparing", desc: "Students find the difference between the two quantities rather than describing the relationship between them.", color: C.red, checked: true },
                    { name: "Treating a ratio as a single number", desc: "Students collapse the two-quantity structure into one value, losing the relationship entirely.", color: C.red, checked: false },
                    { name: "Confusing part-to-part and part-to-whole", desc: "Students mix up whether a ratio compares two parts or a part to the total.", color: C.amber, checked: false },
                    { name: "Writing the ratio in the wrong order", desc: "Students reverse the referents — writing 5:3 when the relationship is 3:5.", color: C.purple, checked: false },
                  ].map((item, i) => (
                    <div key={i} style={{ background: C.surface, borderRadius: 6, padding: "8px 10px", display: "flex", gap: 10, alignItems: "flex-start", border: `1px solid ${item.checked ? item.color + "66" : C.border}`, opacity: item.checked ? 1 : 0.7 }}>
                      <div style={{ width: 16, height: 16, borderRadius: 3, background: item.checked ? item.color : "transparent", border: `2px solid ${item.checked ? item.color : C.textDim}`, flexShrink: 0, marginTop: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {item.checked && <span style={{ color: "#0D1117", fontSize: 9, fontWeight: 900 }}>✓</span>}
                      </div>
                      <div>
                        <div style={{ color: item.checked ? item.color : C.text, fontSize: 12, fontWeight: 600 }}>{item.name}</div>
                        <div style={{ color: C.textMuted, fontSize: 11, marginTop: 2, lineHeight: 1.4 }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                  <div style={{ fontSize: 11, color: C.textMuted, padding: "6px 10px", background: C.accentDim, borderRadius: 6, border: `1px solid ${C.accent}33` }}>
                    <span style={{ color: C.accent, fontWeight: 700 }}>Coming in Track 2: </span>Once response data accumulates from deployed exit tickets, Resolve will recommend which misunderstandings are most active in your students and at what prevalence — so you can confirm rather than select from scratch.
                  </div>
                </div>
              )}
            </div>
          ))}
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
  const [cdaOpen, setCdaOpen] = useState(false);

  const items = [
    {
      id: "CR", label: "Item 1", type: "Constructed Response", dl: "DL2", sc: "SC(b)",
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
      id: "MC-D2", label: "Item 2", type: "Multiple Choice", dl: "DL1", sc: "SC(a)",
      note: "Straightforward item — all strategies converge if understanding is intact. Establishes whether basic skill is present.",
      stem: "A bag contains 4 red marbles and 6 blue marbles. Which statement correctly describes a ratio relationship?",
      options: [
        { letter: "A", text: "There are 2 more blue marbles than red marbles.", code: "M1", label: "Subtracting instead of comparing — treats this as a difference question", correct: false },
        { letter: "B", text: "For every 4 red marbles, there are 6 blue marbles.", code: "—", label: "Correct — multiplicative relationship expressed as ratio language", correct: true },
        { letter: "C", text: "The ratio is 10.", code: "M2", label: "Single-number collapse — loses the two-quantity structure", correct: false },
        { letter: "D", text: "4 out of 10 marbles are red.", code: "M3", label: "Part-to-whole confusion — correct quantity but wrong relationship type", correct: false },
      ]
    },
    {
      id: "MC-D3", label: "Item 3", type: "Multiple Choice", dl: "DL3", sc: "SC(c)",
      note: "Numbers chosen so that each misunderstanding produces a distinct wrong answer — part-to-whole confusion, wrong order, and single-number errors are all separately detectable.",
      stem: "A class has 12 girls and 8 boys. What is the ratio of girls to the total number of students in the class?",
      options: [
        { letter: "A", text: "3 : 2", code: "M3", label: "Part-to-whole confusion — student uses part-to-part when part-to-whole was asked", correct: false },
        { letter: "B", text: "8 : 12", code: "M4", label: "Wrong order — correct relationship type but referent direction reversed", correct: false },
        { letter: "C", text: "12 : 20", code: "—", label: "Correct — total correctly identified as the whole", correct: true },
        { letter: "D", text: "20", code: "M2", label: "Single-number collapse — ratio reduced to a total count", correct: false },
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

      {/* CDA framing card — collapsable, always at top */}
      <Card style={{ marginBottom: 20, borderLeft: `4px solid ${C.accent}` }}>
        <div onClick={() => setCdaOpen(o => !o)} style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div>
            <div style={{ fontSize: 10, color: C.accent, fontWeight: 800, letterSpacing: "0.1em", marginBottom: 6 }}>WHAT MAKES THIS DIFFERENT</div>
            <div style={{ color: C.text, fontSize: 13, fontWeight: 600, lineHeight: 1.5 }}>This is not a typical exit ticket. Most end-of-lesson checks produce a score. This instrument produces a <em style={{ color: C.accent }}>diagnosis</em> — a defensible claim about which specific, research-documented misunderstanding is driving a student's errors.</div>
          </div>
          <div style={{ color: C.accent, fontSize: 18, transition: "transform 0.2s", transform: cdaOpen ? "rotate(180deg)" : "none", flexShrink: 0, marginTop: 2 }}>⌄</div>
        </div>
        {cdaOpen && (
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ color: C.textMuted, fontSize: 13, lineHeight: 1.75 }}>That defensibility comes from two things working together.</div>
            <div style={{ background: C.surfaceUp, borderRadius: 8, padding: "12px 14px", borderLeft: `3px solid ${C.blue}` }}>
              <div style={{ color: C.blue, fontWeight: 700, fontSize: 12, marginBottom: 5 }}>Item engineering off the cognitive specification</div>
              <div style={{ color: C.textMuted, fontSize: 12, lineHeight: 1.7 }}>Every item is constructed against the standard's cognitive architecture — the same specification that defines the learning steps, the misconception taxonomy, and the difficulty parameters. Wrong-answer options are not plausible distractors; they are predictions. Each one encodes a specific hypothesis about student thinking, with values and contexts chosen so that the target misunderstanding produces a numerically distinct, detectable wrong answer.</div>
            </div>
            <div style={{ background: C.surfaceUp, borderRadius: 8, padding: "12px 14px", borderLeft: `3px solid ${C.purple}` }}>
              <div style={{ color: C.purple, fontWeight: 700, fontSize: 12, marginBottom: 5 }}>Deliberate compilation</div>
              <div style={{ color: C.textMuted, fontSize: 12, lineHeight: 1.7 }}>The five items are not interchangeable. They are sequenced and structured so that the <em style={{ color: C.text }}>pattern</em> of responses across items justifies a diagnostic claim that no single item could support alone. The instrument includes a quasi-Q matrix making explicit which misunderstanding is detectable on which item — the evidentiary basis for every diagnosis the instrument can return.</div>
            </div>
            <div style={{ background: C.accentDim, borderRadius: 8, padding: "10px 14px", border: `1px solid ${C.accent}33` }}>
              <div style={{ color: C.accent, fontSize: 12, lineHeight: 1.65 }}>The result: a student's response profile maps to a specific misunderstanding, a severity level, and a targeted remediation module. <strong>Not a score. A next step.</strong></div>
            </div>
          </div>
        )}
      </Card>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <SectionLabel>Phase 4 Output · Exit Ticket</SectionLabel>
          <h2 style={{ color: C.text, fontSize: 22, margin: 0, fontWeight: 800 }}>Exit Ticket — 6.RP.A.1</h2>
          <div style={{ color: C.textMuted, fontSize: 13, marginTop: 4 }}>~5 min · 1 constructed response + 4 multiple choice · Showing 3 of 5 items</div>
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
                  <Tag small color={C.blue}>Item {i + 1}</Tag>
                  <Tag small color={C.purple}>{item.type}</Tag>
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
                  <Tag small color={ep.code.includes("M1") ? C.red : ep.code.includes("M3") ? C.amber : ep.code.includes("M4") ? C.purple : C.textMuted}>{ep.code.split("—")[1]?.trim() || ep.code}</Tag>
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
            <SectionLabel>Diagnostic Evidence Map</SectionLabel>
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
              { pattern: "CR correct + B + A or D on D3", status: "READY WITH SUPPORT", color: C.amber, note: "Ratio language intact; part-to-whole confusion present. Monitor in Lesson 5. Support Module C available." },
              { pattern: "CR additive + A on D2", status: "NOT READY", color: C.red, note: "Subtracting instead of comparing — gateway misunderstanding active. Assign Support Module A before Lesson 5. Do not advance." },
              { pattern: "Any: single-number response", status: "NOT READY", color: C.red, note: "Treating the ratio as a single number. Assign Support Module B. Monitor for additive reasoning alongside." },
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
// SCREEN 7 — RESEARCHER VIEW
// ══════════════════════════════════════════════════════════════
function ResearcherScreen() {
  const [psychOpen, setPsychOpen] = useState(false);
  const [mlOpen,    setMlOpen]    = useState(false);

  // ── Abstracted response sequence ─────────────────────────
  // Content is structurally representative but proprietary
  // schema content is intentionally withheld
  const responseItems = [
    { label: "CR",  correct: false, dimA: "active", dimB: "Step 2", dimC: "DL2", dimD: "present", thetaPrior: -0.61, thetaPost: -0.74 },
    { label: "D2",  correct: false, dimA: "active", dimB: "Step 2", dimC: "DL1", dimD: "present", thetaPrior: -0.74, thetaPost: -0.79 },
    { label: "D3",  correct: false, dimA: "active", dimB: "Step 3", dimC: "DL3", dimD: "none",    thetaPrior: -0.79, thetaPost: -0.81 },
    { label: "D4",  correct: true,  dimA: "none",   dimB: "Step 3", dimC: "DL2", dimD: "none",    thetaPrior: -0.81, thetaPost: -0.77, note: "Correct under low-complexity elicitation conditions — consistent with active latent state at higher difficulty." },
    { label: "D5",  correct: false, dimA: "active", dimB: "Step 5", dimC: "DL4", dimD: "present", thetaPrior: -0.77, thetaPost: -0.81 },
  ];

  // ── Abstracted Q-structure ────────────────────────────────
  // Rows = latent states (proprietary taxonomy)
  // Cols = items D1–D5
  // Values = coverage weight (0 = not targeted, 1 = peripheral, 2 = primary)
  const qGrid = [
    { stateLabel: "Latent State 1", priority: "primary",    cells: [2, 2, 0, 0, 2] },
    { stateLabel: "Latent State 2", priority: "primary",    cells: [0, 2, 2, 2, 2] },
    { stateLabel: "Latent State 3", priority: "secondary",  cells: [1, 2, 2, 2, 2] },
    { stateLabel: "Latent State 4", priority: "secondary",  cells: [1, 0, 2, 0, 2] },
    { stateLabel: "Latent State 5", priority: "tertiary",   cells: [0, 0, 0, 2, 2] },
    { stateLabel: "Prerequisite gap", priority: "prereq",   cells: [2, 0, 0, 0, 0] },
  ];
  const qCellColor = (v) => v === 2 ? C.accent : v === 1 ? C.amber : C.textDim;
  const qCellBg   = (v) => v === 2 ? C.accentDim : v === 1 ? C.amberDim : "transparent";
  const priorityColor = { primary: C.red, secondary: C.amber, tertiary: C.purple, prereq: C.textMuted };

  // ── Pathway nodes / edges (keep structure, abstract labels) ──
  const pathwayNodes = [
    { id: "prereq1", label: "Prerequisite\nStandard A", standard: "Prior grade", x: 60,  y: 200, color: C.textMuted, type: "prereq" },
    { id: "prereq2", label: "Prerequisite\nStandard B", standard: "Prior grade", x: 60,  y: 320, color: C.textMuted, type: "prereq" },
    { id: "m1",      label: "Latent\nState 1",          x: 220, y: 140, color: C.red,      type: "misconception", severity: "Gateway" },
    { id: "m2",      label: "Latent\nState 2",          x: 220, y: 260, color: C.red,      type: "misconception", severity: "High" },
    { id: "current", label: "Current\nStandard",        x: 380, y: 220, color: C.accent,   type: "standard" },
    { id: "m3",      label: "Latent\nState 3",          x: 380, y: 360, color: C.amber,    type: "misconception", severity: "Medium" },
    { id: "m4",      label: "Latent\nState 4",          x: 380, y: 440, color: C.purple,   type: "misconception", severity: "Low" },
    { id: "adj1",    label: "Adjacent\nStandard A",     x: 560, y: 160, color: C.blue,     type: "standard" },
    { id: "adj2",    label: "Adjacent\nStandard B",     x: 560, y: 300, color: C.blue,     type: "standard" },
    { id: "down1",   label: "Downstream\nStandard",     x: 720, y: 220, color: C.purple,   type: "standard" },
  ];
  const pathwayEdges = [
    { from: "prereq1", to: "current", width: 2, color: C.textDim },
    { from: "prereq2", to: "current", width: 2, color: C.textDim },
    { from: "m1",      to: "current", width: 3, color: C.red,   label: "blocks" },
    { from: "m2",      to: "current", width: 2, color: C.red,   label: "distorts" },
    { from: "current", to: "adj1",    width: 3, color: C.accent },
    { from: "current", to: "adj2",    width: 2, color: C.accent },
    { from: "m3",      to: "adj1",    width: 2, color: C.amber, label: "risk" },
    { from: "m3",      to: "adj2",    width: 1.5, color: C.amber, label: "risk" },
    { from: "adj1",    to: "down1",   width: 3, color: C.blue },
    { from: "adj2",    to: "down1",   width: 2, color: C.blue },
  ];
  const getNode = (id) => pathwayNodes.find(n => n.id === id);
  const svgW = 800, svgH = 500;

  // ── Data schema — field names + groups visible; descriptions proprietary ──
  const dataSchema = [
    { field: "student_id",        type: "string",   group: "context",  desc: "Anonymized student identifier" },
    { field: "standard_code",     type: "string",   group: "context",  desc: "CCSSM standard" },
    { field: "lesson_id",         type: "string",   group: "context",  desc: "Curriculum lesson" },
    { field: "item_id",           type: "string",   group: "context",  desc: "Item position in instrument" },
    { field: "response",          type: "string",   group: "context",  desc: "Student response" },
    { field: "timestamp",         type: "datetime", group: "context",  desc: "Response timestamp" },
    { field: "latent_state_tag",  type: "string[]", group: "label",    desc: null },
    { field: "cognitive_step",    type: "integer",  group: "label",    desc: null },
    { field: "elicitation_spec",  type: "object",   group: "label",    desc: null },
    { field: "prerequisite_tag",  type: "string[]", group: "label",    desc: null },
    { field: "theta_prior",       type: "float",    group: "estimate", desc: "Proficiency estimate entering this lesson" },
    { field: "theta_posterior",   type: "float",    group: "estimate", desc: "Updated proficiency estimate after this response" },
  ];
  const schemaGroupColor = { context: C.textMuted, label: C.accent, estimate: C.blue };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px" }}>

      {/* framing */}
      <div style={{ marginBottom: 24 }}>
        <SectionLabel>Researcher View</SectionLabel>
        <h2 style={{ color: C.text, fontSize: 22, margin: 0, fontWeight: 800 }}>What this architecture generates</h2>
        <div style={{ color: C.textMuted, fontSize: 13, marginTop: 4 }}>
          Learning pathway structure · Tagged response sequences · Data schema · Technical deep-dives
        </div>
      </div>

      {/* proprietary architecture callout */}
      <Card style={{ marginBottom: 20, borderLeft: `4px solid ${C.gold}` }}>
        <div style={{ fontSize: 10, color: C.gold, fontWeight: 800, letterSpacing: "0.1em", marginBottom: 10 }}>THE ARCHITECTURE</div>
        <div style={{ color: C.text, fontSize: 14, fontWeight: 700, lineHeight: 1.5, marginBottom: 10 }}>
          Resolve generates something most adaptive systems cannot produce: a labeled training corpus where latent states are{" "}
          <em style={{ color: C.accent }}>defined before data is collected</em>, not inferred from behavioral proxies after the fact.
        </div>
        <div style={{ color: C.textMuted, fontSize: 13, lineHeight: 1.75, marginBottom: 16 }}>
          Every response to a Resolve diagnostic item is a structured observation against a psychometrician-authored cognitive model.
          The labels are not applied at analysis time — they are embedded in the instrument's design.
          Four labeling dimensions are jointly pre-specified. Each is proprietary. Together they constitute the structure
          that makes the corpus non-replicable from behavioral data alone.
        </div>

        {/* four dimension cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          {[
            {
              color: C.red,
              label: "Latent state taxonomy",
              tag: "PROPRIETARY",
              body: "A psychometrician-authored misconception taxonomy defines the discrete latent state space for each standard. States are ordered by diagnostic priority and cognitive step. Every wrong-answer option in the diagnostic instrument maps to a specific state in this taxonomy — defined at item design time, before any student responds.",
            },
            {
              color: C.amber,
              label: "Difficulty & elicitation condition specification",
              tag: "PROPRIETARY",
              body: "Items are jointly parameterized across two dimensions: what makes the item hard, and the conditions under which each latent state is revealed. The elicitation conditions are construction constraints — an item is only valid if it can discriminate the target state from adjacent states. This discrimination guarantee is built in at design time, not assessed after the fact.",
            },
            {
              color: C.blue,
              label: "Cognitive step architecture",
              tag: "PROPRIETARY",
              body: "Each item targets a specific step in the standard's cognitive architecture — the sequenced mental operations a student must execute to demonstrate understanding. Tagging responses by cognitive step locates the failure point within the reasoning chain. A student failing at Step 2 has a fundamentally different profile from one failing at Step 4.",
            },
            {
              color: C.purple,
              label: "Prerequisite dependency graph",
              tag: "PSYCHOMETRICIAN-AUTHORED",
              body: "Items sensitive to specific prerequisite gaps are tagged accordingly. The prerequisite structure is authored before data collection — available as a structural constraint on downstream ML models rather than a pattern those models must infer from co-occurrence data.",
            },
          ].map((d, i) => (
            <div key={i} style={{ background: C.surfaceUp, borderRadius: 8, padding: "12px 14px", borderLeft: `3px solid ${d.color}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ color: d.color, fontWeight: 700, fontSize: 12 }}>{d.label}</span>
                <span style={{ background: d.color + "22", color: d.color, border: `1px solid ${d.color}44`, borderRadius: 4, padding: "1px 6px", fontSize: 9, fontWeight: 800, letterSpacing: "0.07em", fontFamily: "monospace", whiteSpace: "nowrap" }}>{d.tag}</span>
              </div>
              <div style={{ color: C.textMuted, fontSize: 12, lineHeight: 1.7 }}>{d.body}</div>
            </div>
          ))}
        </div>

        {/* proprietary notice */}
        <div style={{ background: C.gold + "11", border: `1px solid ${C.gold}44`, borderRadius: 8, padding: "12px 16px", display: "flex", gap: 12, alignItems: "flex-start" }}>
          <span style={{ fontSize: 16, flexShrink: 0 }}>🔒</span>
          <div>
            <div style={{ color: C.gold, fontWeight: 800, fontSize: 12, marginBottom: 4 }}>Proprietary cognitive architecture — forms the latent state space</div>
            <div style={{ color: C.textMuted, fontSize: 12, lineHeight: 1.65 }}>
              The specific content of the latent state taxonomy, difficulty and elicitation condition parameters, and cognitive step architecture is proprietary to Continuous Measurement.
              This architecture is not decorative — it <em>is</em> the structure that defines the measurement model and the training corpus simultaneously.
              Schema content, misconception taxonomy, and item construction specifications are available under technical partnership agreement.
            </div>
          </div>
        </div>
      </Card>

      {/* learning pathway graph */}
      <Card style={{ marginBottom: 20 }}>
        <SectionLabel>Learning Pathway Graph — Cross-Standard Structure</SectionLabel>
        <div style={{ color: C.textMuted, fontSize: 12, marginBottom: 4 }}>
          Standards, latent states, and prerequisite dependencies. Node labels are structural — specific standard identifiers and misconception content are illustrative.
        </div>
        <div style={{ fontSize: 10, color: C.gold, fontStyle: "italic", marginBottom: 12 }}>
          Latent state content and prerequisite taxonomy: proprietary · available under partnership agreement
        </div>
        <div style={{ overflowX: "auto" }}>
          <svg width={svgW} height={svgH} style={{ display: "block", minWidth: svgW }}>
            {pathwayEdges.map((e, i) => {
              const from = getNode(e.from); const to = getNode(e.to);
              if (!from || !to) return null;
              return (
                <g key={i}>
                  <line x1={from.x + 50} y1={from.y + 20} x2={to.x + 50} y2={to.y + 20}
                    stroke={e.color} strokeWidth={e.width}
                    strokeDasharray={e.label === "blocks" ? "6,3" : e.label === "risk" ? "4,3" : "none"}
                    strokeOpacity={0.6} />
                  {e.label && (
                    <text x={(from.x + to.x) / 2 + 50} y={(from.y + to.y) / 2 + 16}
                      fill={e.color} fontSize={9} textAnchor="middle" opacity={0.8}>{e.label}</text>
                  )}
                </g>
              );
            })}
            {pathwayNodes.map((n, i) => (
              <g key={i}>
                <rect x={n.x} y={n.y} width={100} height={40} rx={6}
                  fill={n.color + "22"} stroke={n.color} strokeWidth={n.type === "standard" ? 2 : 1.5}
                  strokeDasharray={n.type === "misconception" ? "4,2" : "none"} />
                {n.label.split("\n").map((line, j) => (
                  <text key={j} x={n.x + 50} y={n.y + 15 + j * 13}
                    fill={n.color} fontSize={9}
                    fontWeight={n.type === "standard" ? 700 : 400}
                    textAnchor="middle">{line}</text>
                ))}
                {n.standard && (
                  <text x={n.x + 50} y={n.y + 36} fill={n.color} fontSize={8} textAnchor="middle" opacity={0.6}>{n.standard}</text>
                )}
              </g>
            ))}
            {[
              { x: 20,  y: 460, color: C.accent,   label: "Current standard",   dash: "none" },
              { x: 160, y: 460, color: C.blue,      label: "Adjacent standards", dash: "none" },
              { x: 300, y: 460, color: C.red,       label: "Gateway state",      dash: "4,2" },
              { x: 440, y: 460, color: C.amber,     label: "Secondary state",    dash: "4,2" },
              { x: 580, y: 460, color: C.textMuted, label: "Prerequisite",       dash: "none" },
            ].map((l, i) => (
              <g key={i}>
                <rect x={l.x} y={l.y - 8} width={14} height={14} rx={3}
                  fill={l.color + "22"} stroke={l.color} strokeWidth={1.5} strokeDasharray={l.dash} />
                <text x={l.x + 18} y={l.y + 4} fill={C.textMuted} fontSize={9}>{l.label}</text>
              </g>
            ))}
          </svg>
        </div>
      </Card>

      {/* abstracted response sequence */}
      <Card style={{ marginBottom: 20 }}>
        <SectionLabel>Tagged Response Sequence — Structural View</SectionLabel>
        <div style={{ color: C.textMuted, fontSize: 12, marginBottom: 4 }}>
          One student · five items · all four labeling dimensions shown per response.
          Labels are defined at item design time — not inferred post-hoc.
        </div>
        <div style={{ fontSize: 10, color: C.gold, fontStyle: "italic", marginBottom: 14 }}>
          Latent state content, elicitation condition parameters, and cognitive step definitions: proprietary · available under partnership agreement
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {responseItems.map((item, j) => (
            <div key={j} style={{ border: `1px solid ${item.correct ? C.accent + "44" : C.red + "33"}`, borderRadius: 8, overflow: "hidden" }}>
              {/* header */}
              <div style={{ display: "flex", gap: 10, alignItems: "center", padding: "8px 12px", background: item.correct ? C.accentDim : C.redDim, flexWrap: "wrap" }}>
                <Tag small color={C.blue}>{item.label}</Tag>
                <span style={{ color: C.textMuted, fontSize: 12, flex: 1, fontStyle: "italic" }}>Student response recorded</span>
                <span style={{ color: item.correct ? C.accent : C.red, fontWeight: 800, fontSize: 12 }}>{item.correct ? "✓ correct" : "✗ incorrect"}</span>
              </div>
              {/* four dimension tiles */}
              <div style={{ padding: "10px 12px", background: C.surface, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {/* latent state */}
                <div style={{ background: C.surfaceUp, borderRadius: 6, padding: "8px 10px", borderLeft: `2px solid ${C.red}` }}>
                  <div style={{ fontSize: 9, color: C.red, fontWeight: 800, letterSpacing: "0.08em", marginBottom: 4 }}>LATENT STATE TAG</div>
                  {item.dimA === "active"
                    ? <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.red, flexShrink: 0 }} />
                        <span style={{ color: C.text, fontSize: 11 }}>State active — proprietary taxonomy</span>
                        <span style={{ background: C.red + "22", color: C.red, border: `1px solid ${C.red}44`, borderRadius: 4, padding: "1px 5px", fontSize: 9, fontWeight: 800, fontFamily: "monospace" }}>🔒</span>
                      </div>
                    : <div style={{ color: C.textDim, fontSize: 11 }}>None — correct response</div>
                  }
                </div>
                {/* cognitive step */}
                <div style={{ background: C.surfaceUp, borderRadius: 6, padding: "8px 10px", borderLeft: `2px solid ${C.blue}` }}>
                  <div style={{ fontSize: 9, color: C.blue, fontWeight: 800, letterSpacing: "0.08em", marginBottom: 4 }}>COGNITIVE STEP</div>
                  <div style={{ color: C.text, fontSize: 11 }}>{item.dimB}
                    <span style={{ color: C.textMuted, fontSize: 10, marginLeft: 6 }}>— step definition: proprietary</span>
                  </div>
                </div>
                {/* difficulty + elicitation */}
                <div style={{ background: C.surfaceUp, borderRadius: 6, padding: "8px 10px", borderLeft: `2px solid ${C.amber}`, gridColumn: "1 / -1" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <div style={{ fontSize: 9, color: C.amber, fontWeight: 800, letterSpacing: "0.08em" }}>DIFFICULTY & ELICITATION CONDITIONS</div>
                    <span style={{ background: C.amber + "22", color: C.amber, border: `1px solid ${C.amber}44`, borderRadius: 4, padding: "1px 5px", fontSize: 9, fontWeight: 800, fontFamily: "monospace" }}>PROPRIETARY SPEC</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 10, color: C.textMuted }}>Level</span>
                      <span style={{ color: C.accent, fontWeight: 700, fontSize: 12, fontFamily: "monospace" }}>{item.dimC}</span>
                    </div>
                    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                      <span style={{ fontSize: 10, color: C.textMuted }}>Dimensions</span>
                      {[0,1,2,3].map(d => (
                        <div key={d} style={{ width: 28, height: 8, borderRadius: 3, background: C.surfaceUp, border: `1px solid ${C.border}`, overflow: "hidden" }}>
                          <div style={{ width: `${[75,50,90,40][d]}%`, height: "100%", background: C.amber, opacity: 0.7 }} />
                        </div>
                      ))}
                    </div>
                    <span style={{ fontSize: 10, color: C.textMuted, fontStyle: "italic" }}>Parameterization withheld</span>
                  </div>
                </div>
                {/* prerequisite */}
                <div style={{ background: C.surfaceUp, borderRadius: 6, padding: "8px 10px", borderLeft: `2px solid ${C.purple}`, gridColumn: "1 / -1" }}>
                  <div style={{ fontSize: 9, color: C.purple, fontWeight: 800, letterSpacing: "0.08em", marginBottom: 4 }}>PREREQUISITE TAGS</div>
                  {item.dimD === "present"
                    ? <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.purple, flexShrink: 0 }} />
                        <span style={{ color: C.text, fontSize: 11 }}>Prerequisite sensitivity flagged — dependency graph proprietary</span>
                      </div>
                    : <div style={{ color: C.textDim, fontSize: 11 }}>None flagged</div>
                  }
                </div>
              </div>
              {/* theta update */}
              <div style={{ padding: "6px 12px", background: C.surfaceUp, borderTop: `1px solid ${C.border}`, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <span style={{ fontSize: 9, color: C.textMuted, fontWeight: 700, letterSpacing: "0.07em" }}>θ PRIOR</span>
                  <span style={{ color: item.thetaPrior < 0 ? C.red : C.amber, fontFamily: "monospace", fontSize: 11, fontWeight: 700 }}>{item.thetaPrior.toFixed(2)}</span>
                </div>
                <span style={{ color: C.textDim, fontSize: 11 }}>→</span>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <span style={{ fontSize: 9, color: C.textMuted, fontWeight: 700, letterSpacing: "0.07em" }}>θ POSTERIOR</span>
                  <span style={{ color: item.thetaPost < 0 ? C.red : C.amber, fontFamily: "monospace", fontSize: 11, fontWeight: 700 }}>{item.thetaPost.toFixed(2)}</span>
                </div>
                {item.note && <div style={{ color: C.textMuted, fontSize: 10, fontStyle: "italic", flex: 1 }}>{item.note}</div>}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* abstracted Q-structure */}
      <Card style={{ marginBottom: 20 }}>
        <SectionLabel>Diagnostic Coverage Structure — Q-Matrix View</SectionLabel>
        <div style={{ color: C.textMuted, fontSize: 12, marginBottom: 4 }}>
          Rows = latent states · Columns = diagnostic items D1–D5 · Cell weight = targeting intensity
        </div>
        <div style={{ fontSize: 10, color: C.gold, fontStyle: "italic", marginBottom: 14 }}>
          Latent state identities and item construction logic: proprietary · available under partnership agreement
        </div>
        <div style={{ overflowX: "auto", marginBottom: 12 }}>
          <table style={{ borderCollapse: "collapse", fontSize: 11, width: "100%" }}>
            <thead>
              <tr style={{ background: C.surfaceUp }}>
                <th style={{ padding: "8px 12px", textAlign: "left", color: C.textMuted, border: `1px solid ${C.border}`, minWidth: 160 }}>Latent State</th>
                <th style={{ padding: "8px 12px", textAlign: "center", color: C.textMuted, border: `1px solid ${C.border}` }}>Priority</th>
                {["D1","D2","D3","D4","D5"].map(h => (
                  <th key={h} style={{ padding: "8px 12px", textAlign: "center", color: C.blue, border: `1px solid ${C.border}`, fontFamily: "monospace" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {qGrid.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? C.surface : C.surfaceUp }}>
                  <td style={{ padding: "8px 12px", border: `1px solid ${C.border}`, color: C.textMuted, fontStyle: "italic", fontSize: 11 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: priorityColor[row.priority], flexShrink: 0 }} />
                      {row.stateLabel}
                      <span style={{ color: C.gold, fontSize: 9, fontFamily: "monospace" }}>🔒</span>
                    </div>
                  </td>
                  <td style={{ padding: "8px 12px", border: `1px solid ${C.border}`, textAlign: "center" }}>
                    <Tag small color={priorityColor[row.priority]}>{row.priority}</Tag>
                  </td>
                  {row.cells.map((v, j) => (
                    <td key={j} style={{ padding: "8px 10px", border: `1px solid ${C.border}`, textAlign: "center", background: qCellBg(v) }}>
                      {v > 0
                        ? <div style={{ width: 14, height: 14, borderRadius: 3, background: qCellColor(v), margin: "0 auto", opacity: v === 2 ? 1 : 0.5 }} />
                        : <span style={{ color: C.textDim, fontSize: 10 }}>—</span>
                      }
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {[
            { color: C.accent, label: "Primary targeting — item constructed to detect this state" },
            { color: C.amber,  label: "Peripheral — state detectable but not the primary target" },
            { color: C.textDim, label: "Not targeted by this item" },
          ].map((l, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 12, height: 12, borderRadius: 2, background: l.color, opacity: l.color === C.textDim ? 0.4 : 1 }} />
              <span style={{ color: C.textMuted, fontSize: 10 }}>{l.label}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* data schema */}
      <Card style={{ marginBottom: 20 }}>
        <SectionLabel>Data Schema — Per Response Record</SectionLabel>
        <div style={{ color: C.textMuted, fontSize: 12, marginBottom: 4 }}>
          Field names, types, and group membership are shown. Label-group field semantics are defined by the proprietary cognitive architecture.
        </div>
        <div style={{ fontSize: 10, color: C.gold, fontStyle: "italic", marginBottom: 14 }}>
          Label field definitions: proprietary · available under partnership agreement
        </div>
        <div style={{ display: "flex", gap: 14, marginBottom: 14, flexWrap: "wrap" }}>
          {[["label", C.accent, "Labeling dimensions — the diagnostic core (proprietary)"], ["estimate", C.blue, "Psychometric estimates"], ["context", C.textMuted, "Record context"]].map(([g, col, desc]) => (
            <div key={g} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: col, flexShrink: 0 }} />
              <span style={{ color: C.textMuted, fontSize: 11 }}>{desc}</span>
            </div>
          ))}
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
            <thead>
              <tr style={{ background: C.surfaceUp }}>
                {["Field", "Type", "Description"].map(h => (
                  <th key={h} style={{ padding: "8px 10px", textAlign: "left", color: C.textMuted, border: `1px solid ${C.border}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataSchema.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? C.surface : C.surfaceUp }}>
                  <td style={{ padding: "8px 10px", border: `1px solid ${C.border}`, color: schemaGroupColor[row.group], fontFamily: "monospace", fontWeight: 700 }}>{row.field}</td>
                  <td style={{ padding: "8px 10px", border: `1px solid ${C.border}`, color: C.purple, fontFamily: "monospace" }}>{row.type}</td>
                  <td style={{ padding: "8px 10px", border: `1px solid ${C.border}` }}>
                    {row.group === "label"
                      ? <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ color: C.gold, fontSize: 9, fontFamily: "monospace" }}>🔒</span>
                          <span style={{ color: C.textDim, fontSize: 11, fontStyle: "italic" }}>Defined by proprietary cognitive architecture — available under NDA</span>
                        </span>
                      : <span style={{ color: row.group === "estimate" ? C.text : C.textMuted, lineHeight: 1.5 }}>{row.desc}</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* expandable deep-dives — titles + subtitles present; content gated */}
      {[
        {
          key: "psych", open: psychOpen, toggle: () => setPsychOpen(o => !o),
          title: "Psychometrician Deep-Dive",
          sub: "Q-matrix structure · IRT parameter priors · Belief state updating · Distractor design logic",
          color: C.blue,
          content: (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ background: C.gold + "11", border: `1px solid ${C.gold}44`, borderRadius: 8, padding: "16px 18px" }}>
                <div style={{ color: C.gold, fontWeight: 800, fontSize: 12, marginBottom: 6 }}>🔒 Technical specification available under partnership agreement</div>
                <div style={{ color: C.textMuted, fontSize: 12, lineHeight: 1.7 }}>
                  This section contains the complete Q-matrix, hypothesized 3PL IRT priors, distractor design logic, and belief state updating architecture.
                  These materials define the psychometric foundation of the measurement model and constitute proprietary IP.
                  Available for review under NDA to qualified technical partners.
                </div>
                <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
                  {[
                    "Full Q-matrix — latent state × item × distractor option mapping",
                    "Hypothesized 3PL IRT priors per item — expert-based, pre-calibration",
                    "Distractor design rationale — number selection rules by state type",
                    "Belief state updating — DINA/DKVMN architecture specification",
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ color: C.gold, fontSize: 10 }}>—</span>
                      <span style={{ color: C.textMuted, fontSize: 11 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        },
        {
          key: "ml", open: mlOpen, toggle: () => setMlOpen(o => !o),
          title: "ML Engineer Deep-Dive",
          sub: "Latent state space · Training corpus · Bayesian updating · Stage 1→2→3 roadmap",
          color: C.purple,
          content: (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ background: C.purpleDim, borderRadius: 8, padding: "12px 14px", border: `1px solid ${C.purple}33` }}>
                <div style={{ fontSize: 11, color: C.purple, fontWeight: 800, marginBottom: 6 }}>LATENT STATE SPACE — STRUCTURAL PROPERTIES</div>
                <div style={{ color: C.textMuted, fontSize: 12, lineHeight: 1.7 }}>
                  The proprietary misconception taxonomy defines a structured discrete latent state space per standard.
                  States are ordered by diagnostic priority and cognitive step — not arbitrary labels.
                  Cross-standard: states are linked via the prerequisite dependency graph,
                  enabling transition probability estimation across the curriculum sequence.
                  Specific state count and taxonomy content: available under NDA.
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: C.purple, fontWeight: 800, marginBottom: 8 }}>WHAT MAKES THIS CORPUS DIFFERENT</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    ["Standard behavioral proxy corpus", "Right/wrong sequences + time-on-task + clickstreams. Latent states inferred post-hoc via clustering or HMM. Labels are behavioral categories, not cognitive constructs.", C.textMuted],
                    ["Resolve labeled corpus", "Response sequences tagged against psychometrician-defined misconception taxonomy at item design time. Latent states and elicitation conditions jointly specified before a single data point is collected. Labels are cognitive constructs with theoretical grounding, IRT priors, and discrimination guarantees.", C.purple],
                  ].map(([title, desc, col], i) => (
                    <div key={i} style={{ background: C.surfaceUp, borderRadius: 8, padding: "10px 14px", borderLeft: `3px solid ${col}` }}>
                      <div style={{ color: col, fontWeight: 700, fontSize: 12, marginBottom: 4 }}>{title}</div>
                      <div style={{ color: C.textMuted, fontSize: 12, lineHeight: 1.6 }}>{desc}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: C.purple, fontWeight: 800, marginBottom: 8 }}>BAYESIAN UPDATING — LIKELIHOOD FUNCTION</div>
                <div style={{ background: C.surface, borderRadius: 8, padding: "12px 14px", fontFamily: "monospace", fontSize: 11, color: C.accent, border: `1px solid ${C.border}`, lineHeight: 1.8 }}>
                  P(state_k | response_sequence) ∝ P(response_sequence | state_k) × P(state_k)<br/>
                  <span style={{ color: C.textMuted }}>// Prior: 3PL parameters from proprietary content specification</span><br/>
                  <span style={{ color: C.textMuted }}>// Likelihood: Q-matrix structure × elicitation condition parameters per item</span><br/>
                  <span style={{ color: C.textMuted }}>// Posterior: updated after each response, concentrated after 5 items</span><br/>
                  <span style={{ color: C.textMuted }}>// Cross-lesson: posterior becomes prior for next lesson on same standard</span>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: C.purple, fontWeight: 800, marginBottom: 8 }}>STAGE ROADMAP</div>
                {[
                  { stage: "Stage 1 — Now", title: "Knowledge tracing with interpretable states", desc: "Labeled response sequences train KT models where latent constructs are psychometrician-defined. Models trace which specific misconception is active at which cognitive step — not a mastery probability. DKVMN architecture well-suited.", color: C.accent },
                  { stage: "Stage 2 — Medium term", title: "Within-instruction proficiency measurement", desc: "Cognitive step sequences define a generative model for student behavior during instruction. In-lesson responses become evidence for real-time belief state updating — predicting which latent state a student holds before the exit ticket is scored.", color: C.blue },
                  { stage: "Stage 3 — Scale", title: "Cross-standard learning pathway optimization", desc: "Accumulated transition probabilities across the psychometrician-authored prerequisite graph enable personalized sequencing. The graph structure makes this tractable without black-box embeddings — the causal structure is known in advance.", color: C.purple },
                ].map((s, i) => (
                  <div key={i} style={{ background: C.surfaceUp, borderRadius: 8, padding: "12px 14px", borderLeft: `3px solid ${s.color}`, marginBottom: 8 }}>
                    <div style={{ fontSize: 10, color: s.color, fontWeight: 800, marginBottom: 4 }}>{s.stage}</div>
                    <div style={{ color: C.text, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{s.title}</div>
                    <div style={{ color: C.textMuted, fontSize: 12, lineHeight: 1.65 }}>{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )
        }
      ].map(section => (
        <Card key={section.key} style={{ marginBottom: 16, border: `1px solid ${section.color}33` }}>
          <div onClick={section.toggle} style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ color: section.color, fontWeight: 800, fontSize: 13 }}>{section.title}</div>
              <div style={{ color: C.textMuted, fontSize: 11, marginTop: 2 }}>{section.sub}</div>
            </div>
            <div style={{ color: section.color, fontSize: 18, transition: "transform 0.2s", transform: section.open ? "rotate(180deg)" : "none" }}>⌄</div>
          </div>
          {section.open && <div style={{ marginTop: 16 }}>{section.content}</div>}
        </Card>
      ))}

    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCREEN 8 — TARGETED SUPPORT
// ══════════════════════════════════════════════════════════════
function TargetedSupportScreen({ onNext }) {
  const modules = [
    {
      letter: "A", color: C.red,
      title: "Subtracting instead of comparing",
      subtitle: "Core misunderstanding — address first",
      severity: "HIGH",
      severityNote: "This is the foundational misunderstanding that reframes all subsequent ratio work. A student with this pattern doesn't yet have a ratio concept — they have a subtraction concept. Nothing else can be reliably addressed until this is resolved.",
      bundled: false,
      approach: "Side-by-side comparison of two ways of describing the same situation, one additive and one multiplicative, so students can see where the additive model fails → Classification practice across familiar and novel contexts → Student predicts using the correct model and self-checks",
      checkNote: "2-item check at the end. The target misunderstanding must produce a detectably different wrong answer on both items. Three outcomes: Resolved, Partially resolved, Still present.",
      versions: ["Teacher Version — includes overview, facilitation notes, answer key, and check key", "Student Version — clean activities and check only"],
      designNote: "This module stands alone. Combining it with others dilutes the focused attention the misunderstanding requires.",
    },
    {
      letter: "B", color: C.red,
      title: "Treating a ratio as a single number",
      subtitle: "Student loses the two-quantity structure",
      severity: "HIGH",
      severityNote: "Without the two-quantity frame, ratio procedures are meaningless. A student who collapses 3:5 to 8 cannot meaningfully learn equivalent ratios, unit rates, or proportional reasoning — the internal structure they depend on has been erased.",
      bundled: false,
      approach: "Build the two-quantity structure concretely before any symbolic work → Practice identifying both quantities and writing the structured form → Sort correct and collapsed representations and explain what's lost in each case",
      checkNote: "2-item check. The collapsed answer must be numerically different from both the correct answer and any other wrong-answer type — otherwise the error is invisible.",
      versions: ["Teacher Version", "Student Version"],
      designNote: "Separate from Module A — different point of breakdown, different instructional approach. Students can have both misunderstandings simultaneously; address Module A first if so.",
    },
    {
      letter: "C", color: C.amber,
      title: "Confusing part-to-part and part-to-whole",
      subtitle: "Also addresses fraction-notation narrowness",
      severity: "MEDIUM",
      severityNote: "The foundational concept is present — student understands ratio as a relationship, not a difference. The confusion is between two valid but distinct ratio structures. This is teachable with targeted discrimination practice and won't require rebuilding from scratch.",
      bundled: true,
      approach: "One context generating both structures side-by-side with a decision rule → Alternating classify-and-produce practice across the same context → Novel context where student produces both structures and explains the difference",
      checkNote: "2-item check. Both the part-to-whole confusion and the fraction-only representation error are detectable. The gateway misunderstanding (subtracting instead of comparing) is also checked as a secondary screen.",
      versions: ["Teacher Version", "Student Version"],
      designNote: "Fraction-notation narrowness is bundled here because it typically appears as part of the same structural confusion — students who can only write ratios as fractions often also struggle to move between part-to-part and part-to-whole.",
    },
    {
      letter: "D", color: C.purple,
      title: "Writing the ratio in the wrong order",
      subtitle: "Reasoning intact — coordination issue only",
      severity: "LOW–MEDIUM",
      severityNote: "Mathematical understanding is solid. The student grasps what a ratio is and how it works — they're just not reliably tracking which quantity goes first. This is often resolved quickly with deliberate practice and a systematic procedure.",
      bundled: false,
      approach: "Establish that order matters with two contrasting examples where reversal produces a meaningfully different answer → Deliberate practice with presentations where the quantities are in unexpected order → Bidirectional translation with one error-spotting item",
      checkNote: "2-item check. The reversed answer must be numerically different from the correct answer — values chosen specifically to avoid symmetry that would mask the error.",
      versions: ["Teacher Version", "Student Version"],
      designNote: "Item values are chosen so that writing the quantities in the wrong order gives a detectably different answer. Symmetric or palindromic values are explicitly avoided.",
    },
  ];

  const [expanded, setExpanded] = useState(null);

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "32px 20px" }}>
      <div style={{ marginBottom: 24 }}>
        <SectionLabel>Targeted Support</SectionLabel>
        <h2 style={{ color: C.text, fontSize: 22, margin: 0, fontWeight: 800 }}>4 Support Modules · 8 Documents</h2>
        <div style={{ color: C.textMuted, fontSize: 13, marginTop: 4 }}>
          One module per identified misunderstanding, ordered by severity. Each is 20 minutes, works self-directed or with a teacher, and ends with a 2-item check that tells you whether the misunderstanding has resolved.
        </div>
      </div>

      {/* approach legend */}
      <Card style={{ marginBottom: 20 }}>
        <SectionLabel>How the modules are designed</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
          {[
            { label: "Each module targets one misunderstanding", desc: "Matched to the specific type of error — not a generic reteach of the lesson.", color: C.accent },
            { label: "Ordered by severity", desc: "Address high-severity misunderstandings first. Module A before Module C.", color: C.red },
            { label: "Works without teacher prep", desc: "Worked examples, self-checks, and facilitation notes built in. Teacher guidance is optional.", color: C.blue },
            { label: "Ends with a diagnostic check", desc: "Two items with three possible outcomes: Resolved, Partially resolved, Still present.", color: C.purple },
          ].map((item, i) => (
            <div key={i} style={{ background: item.color + "12", border: `1px solid ${item.color}33`, borderRadius: 8, padding: "10px 12px" }}>
              <div style={{ color: item.color, fontWeight: 700, fontSize: 12, marginBottom: 4 }}>{item.label}</div>
              <div style={{ color: C.textMuted, fontSize: 11, lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* module cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
        {modules.map((mod) => (
          <div key={mod.letter} style={{ border: `1px solid ${mod.color}44`, borderRadius: 12, overflow: "hidden" }}>
            <div onClick={() => setExpanded(expanded === mod.letter ? null : mod.letter)}
              style={{ cursor: "pointer", padding: "16px 18px", background: mod.color + "0F", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: mod.color + "33", border: `1px solid ${mod.color}66`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 18, color: mod.color, flexShrink: 0 }}>{mod.letter}</div>
                <div>
                  <div style={{ color: C.text, fontWeight: 700, fontSize: 14 }}>{mod.title}</div>
                  <div style={{ display: "flex", gap: 6, marginTop: 4, flexWrap: "wrap" }}>
                    <Tag small color={mod.color}>{mod.subtitle}</Tag>
                    <Tag small color={mod.severity === "HIGH" ? C.red : mod.severity === "MEDIUM" ? C.amber : C.purple}>
                      {mod.severity === "HIGH" ? "Address first" : mod.severity === "MEDIUM" ? "Address after high-severity" : "Address when others resolved"}
                    </Tag>
                    {mod.bundled && <Tag small color={C.purple}>Combined module</Tag>}
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
                <div style={{ background: C.surfaceUp, borderRadius: 8, padding: "10px 14px", borderLeft: `3px solid ${mod.color}` }}>
                  <div style={{ fontSize: 11, color: mod.color, fontWeight: 700, marginBottom: 4 }}>WHY THIS SEVERITY</div>
                  <div style={{ color: C.textMuted, fontSize: 12, lineHeight: 1.6 }}>{mod.severityNote}</div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div style={{ background: C.surfaceUp, borderRadius: 8, padding: "10px 14px" }}>
                    <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 700, marginBottom: 4 }}>INSTRUCTIONAL APPROACH</div>
                    <div style={{ color: C.text, fontSize: 12, lineHeight: 1.6 }}>{mod.approach}</div>
                    <div style={{ color: C.textMuted, fontSize: 11, marginTop: 6 }}>3 activities · 20 min · Self-directed or teacher-facilitated</div>
                  </div>
                  <div style={{ background: C.surfaceUp, borderRadius: 8, padding: "10px 14px" }}>
                    <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 700, marginBottom: 4 }}>END-OF-MODULE CHECK</div>
                    <div style={{ color: C.text, fontSize: 12, lineHeight: 1.6 }}>{mod.checkNote}</div>
                  </div>
                </div>
                <div style={{ fontSize: 11, color: C.amber, lineHeight: 1.6, padding: "8px 12px", background: C.amberDim, borderRadius: 6, border: `1px solid ${C.amber}33` }}>
                  <strong>Design note:</strong> {mod.designNote}
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
      <Btn onClick={onNext} style={{ width: "100%", padding: 14, fontSize: 14, marginTop: 24 }}>
        VIEW RESEARCHER DASHBOARD →
      </Btn>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCREEN 6 — REPORT & DASHBOARD
// ══════════════════════════════════════════════════════════════
function FinalScreen({ onNext }) {
  const [tab, setTab] = useState("class");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [mlExpanded, setMlExpanded] = useState({});
  const [profViz, setProfViz] = useState("continuum"); // "continuum" or "distribution"

  const students = [
    { name: "Amara J.",  status: "support",   module: "C",
      descriptor: "Solid on ratio language and notation — writes ratios correctly and understands the multiplicative relationship. Consistently confuses part-to-part and part-to-whole when asked to switch between them. Support Module C recommended before Lesson 5." },
    { name: "Diego R.",  status: "not-ready", module: "A",
      descriptor: "Subtracting instead of comparing across most ratio situations — treats ratio problems as 'how many more' questions. This is the core misunderstanding that needs to be resolved before moving forward. Support Module A first. Do not advance to Lesson 5 without resolution." },
    { name: "Priya S.",  status: "support",   module: "C",
      descriptor: "Strong ratio language in familiar contexts. Part-to-whole identification breaks down when context shifts — errors are consistent, not random. Support Module C recommended." },
    { name: "Marcus T.", status: "not-ready", module: "B",
      descriptor: "Collapsing ratios to a single number — treating 3:5 as just 8. Loses the two-quantity structure the ratio expresses. Support Module B addresses this directly. Monitor for additive comparison alongside." },
    { name: "Layla W.",  status: "ready",     module: null,
      descriptor: "Ready. Strong across all five items including the applied interpretation task. Correctly handles both part-to-part and part-to-whole contexts. Well-positioned for Lesson 5." },
    { name: "Finn O.",   status: "support",   module: "A",
      descriptor: "Shows additive reasoning in some but not all contexts — likely early-stage rather than fully entrenched. Support Module A recommended; monitor closely in Lesson 5 activities." },
    { name: "Nadia K.",  status: "support",   module: "D",
      descriptor: "Understands ratio as a relationship but consistently writes the quantities in the wrong order. Mathematical reasoning is intact — this is a coordination issue, not a conceptual one. Support Module D is short and targeted." },
    { name: "Elijah B.", status: "support",   module: "B",
      descriptor: "Treating ratios as totals in applied contexts while performing correctly on straightforward items. The two-quantity structure is unstable. Support Module B recommended." },
  ];

  const statusColor = { ready: C.accent, support: C.amber, "not-ready": C.red };
  const statusLabel = { ready: "READY", support: "READY WITH SUPPORT", "not-ready": "NOT READY" };

  const counts = {
    ready: students.filter(s => s.status === "ready").length,
    support: students.filter(s => s.status === "support").length,
    "not-ready": students.filter(s => s.status === "not-ready").length,
  };

  const miscPrevalence = [
    { name: "Subtracting instead of comparing", count: 2, color: C.red },
    { name: "Treating a ratio as a single number", count: 2, color: C.red },
    { name: "Confusing part-to-part and part-to-whole", count: 2, color: C.amber },
    { name: "Writing the ratio in the wrong order", count: 1, color: C.purple },
  ];

  const knowledgeTrace = {
    "Amara J.": {
      status: "support", module: "C",
      todayShift: "Today's exit ticket moved her estimate upward slightly on ratio language but confirmed the part-to-whole gap. Estimate unchanged on that dimension — consistent with prior lessons.",
      confidenceNote: "Based on 4 exit tickets across 6.RP.A.1 lessons.",
      suggestion: "Monitor · Support Module C before Lesson 5",
      suggestionDetail: "Part-to-whole confusion is stable and detectable. Support Module C is well-matched. No broader intervention indicated at this stage. If the confusion persists after Module C, flag for review before moving to 6.RP.A.2.",
      lessons: [
        { label: "Lesson 1", theta: -0.2, miscs: ["Part-to-whole confusion emerging"] },
        { label: "Lesson 2", theta: 0.1, miscs: ["Part-to-whole confusion present"] },
        { label: "Lesson 3", theta: 0.3, miscs: ["Ratio language strengthening"] },
        { label: "Lesson 4 (today)", theta: 0.4, miscs: ["Part-to-whole confusion confirmed"] },
      ],
      adjacentRisk: [
        { standard: "6.RP.A.2 — Unit Rate", risk: "moderate", note: "Part-to-whole confusion likely to surface in unit rate contexts if unresolved." },
        { standard: "6.RP.A.3 — Equivalent Ratios", risk: "low", note: "Moderate risk depending on whether the part-to-whole confusion is resolved before this standard is addressed." },
      ],
      mlDetail: {
        modelType: "Knowledge tracing — labeled response sequences against psychometrician-defined misconception taxonomy",
        latentState: "Proficiency estimate: +0.38 (moderate confidence · SE = 0.24)",
        activeMisc: "Part-to-whole confusion active — estimated probability 0.71 (95% CI: 0.52–0.85)",
        priorEvidence: "Convergent evidence across 3 items this lesson. Pattern consistent with prior lessons.",
        projections: "6.RP.A.2: 62% probability of difficulty if part-to-whole confusion unresolved · 6.RP.A.3: 44%",
        dataNote: "Labeled against psychometrician-defined misconception taxonomy. Latent states defined before data collection — not inferred post-hoc from behavioral proxies.",
      },
    },
    "Diego R.": {
      status: "not-ready", module: "A",
      todayShift: "Today confirmed what prior lessons suggested. Additive reasoning is dominant and consistent — not situational. Estimate moved downward. Gateway misconception active.",
      confidenceNote: "Based on 4 exit tickets across 6.RP.A.1 lessons. High confidence — convergent evidence across all four.",
      suggestion: "Intervene · Support Module A immediately",
      suggestionDetail: "Gateway misconception is blocking all ratio reasoning. Downstream standard projections are unreliable until this is resolved — reported as high risk rather than specific estimates. Do not advance to Lesson 5.",
      lessons: [
        { label: "Lesson 1", theta: -0.6, miscs: ["Additive reasoning dominant"] },
        { label: "Lesson 2", theta: -0.7, miscs: ["Additive reasoning persistent"] },
        { label: "Lesson 3", theta: -0.8, miscs: ["No movement — gateway active"] },
        { label: "Lesson 4 (today)", theta: -0.8, miscs: ["Gateway misconception confirmed"] },
      ],
      adjacentRisk: [
        { standard: "6.RP.A.2 — Unit Rate", risk: "high", note: "Additive reasoning will systematically corrupt unit rate reasoning." },
        { standard: "6.RP.A.3 — Equivalent Ratios", risk: "high", note: "Cannot be meaningfully assessed until gateway misconception resolved." },
      ],
      mlDetail: {
        modelType: "Knowledge tracing — labeled response sequences against psychometrician-defined misconception taxonomy",
        latentState: "Proficiency estimate: −0.81 (high confidence · SE = 0.31)",
        activeMisc: "Additive comparison (gateway) active — estimated probability 0.88 (95% CI: 0.72–0.96)",
        priorEvidence: "High-confidence convergent evidence across all 4 lessons. Pattern stable — not improving.",
        projections: "6.RP.A.2: 91% probability of difficulty · 6.RP.A.3: 89% — downstream projections unreliable until gateway resolved",
        dataNote: "Gateway misconception flagged as blocking. Downstream projections reported as categorical risk rather than theta estimates — single entrenched misconception makes point estimates misleading.",
      },
    },
  };

  const toggleMl = (key) => setMlExpanded(prev => ({ ...prev, [key]: !prev[key] }));

  const ProficiencyViz = ({ lessons }) => {
    if (profViz === "continuum") {
      return (
        <div>
          <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 700, marginBottom: 10, display: "flex", justifyContent: "space-between" }}>
            <span>← BELOW READINESS</span><span>AT READINESS →</span>
          </div>
          {lessons.map((l, i) => {
            const pct = Math.round(((l.theta + 2) / 4) * 100);
            const col = l.theta > 0.5 ? C.accent : l.theta > 0 ? C.amber : C.red;
            const isToday = l.label.includes("today");
            return (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: isToday ? C.text : C.textMuted, fontWeight: isToday ? 700 : 400 }}>{l.label}</span>
                  <span style={{ fontSize: 11, color: col, fontWeight: 700, fontFamily: "monospace" }}>θ = {l.theta.toFixed(2)}</span>
                </div>
                <div style={{ background: C.border, borderRadius: 4, height: isToday ? 10 : 6, overflow: "hidden", position: "relative" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: col, borderRadius: 4 }} />
                  {/* uncertainty band */}
                  <div style={{ position: "absolute", top: 0, left: `${Math.max(pct - 8, 0)}%`, width: "16%", height: "100%", background: col + "33", borderRadius: 4 }} />
                </div>
                {l.miscs.map((m, j) => <div key={j} style={{ fontSize: 10, color: C.textMuted, marginTop: 3 }}>↳ {m}</div>)}
              </div>
            );
          })}
          <div style={{ fontSize: 10, color: C.textDim, marginTop: 6 }}>Shaded band = uncertainty range. Wider band = lower confidence.</div>
        </div>
      );
    }
    // distribution view
    return (
      <div>
        <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 700, marginBottom: 10 }}>BELIEF STATE — PROBABILITY DISTRIBUTION ACROSS LESSONS</div>
        {lessons.map((l, i) => {
          const mu = l.theta;
          const sigma = 0.28 - (i * 0.04);
          const isToday = l.label.includes("today");
          const col = mu > 0.5 ? C.accent : mu > 0 ? C.amber : C.red;
          const points = Array.from({ length: 40 }, (_, k) => {
            const x = -2 + (k / 39) * 4;
            const y = Math.exp(-0.5 * Math.pow((x - mu) / sigma, 2)) / (sigma * Math.sqrt(2 * Math.PI));
            return { x, y };
          });
          const maxY = Math.max(...points.map(p => p.y));
          const h = isToday ? 44 : 28;
          const w = 260;
          return (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <span style={{ fontSize: 11, color: isToday ? C.text : C.textMuted, fontWeight: isToday ? 700 : 400 }}>{l.label}</span>
                <span style={{ fontSize: 11, color: col, fontWeight: 700, fontFamily: "monospace" }}>θ̂ = {mu.toFixed(2)}</span>
              </div>
              <svg width={w} height={h} style={{ overflow: "visible" }}>
                <defs>
                  <linearGradient id={`g${i}`} x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor={col} stopOpacity="0.7" />
                    <stop offset="100%" stopColor={col} stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                {/* baseline */}
                <line x1={0} y1={h} x2={w} y2={h} stroke={C.border} strokeWidth={1} />
                {/* zero line */}
                <line x1={w/2} y1={0} x2={w/2} y2={h} stroke={C.textDim} strokeWidth={1} strokeDasharray="3,3" />
                {/* curve */}
                <polyline
                  points={points.map(p => {
                    const px = ((p.x + 2) / 4) * w;
                    const py = h - (p.y / maxY) * (h - 4);
                    return `${px},${py}`;
                  }).join(" ")}
                  fill="none" stroke={col} strokeWidth={isToday ? 2 : 1.5}
                />
                {/* fill */}
                <polygon
                  points={[
                    ...points.map(p => {
                      const px = ((p.x + 2) / 4) * w;
                      const py = h - (p.y / maxY) * (h - 4);
                      return `${px},${py}`;
                    }),
                    `${w},${h}`, `0,${h}`
                  ].join(" ")}
                  fill={`url(#g${i})`}
                />
              </svg>
              {l.miscs.map((m, j) => <div key={j} style={{ fontSize: 10, color: C.textMuted, marginTop: 2 }}>↳ {m}</div>)}
            </div>
          );
        })}
        <div style={{ fontSize: 10, color: C.textDim, marginTop: 4 }}>Dashed line = readiness threshold. Narrower curve = higher confidence. Curve shifts right as understanding develops.</div>
      </div>
    );
  };

  const StudentProfile = ({ student }) => {
    const trace = knowledgeTrace[student.name];
    if (!trace) return (
      <div style={{ padding: "24px 0", textAlign: "center", color: C.textMuted, fontSize: 13 }}>
        Full knowledge trace available for Amara J. and Diego R. in this demo.
      </div>
    );
    const riskColor = { high: C.red, moderate: C.amber, low: C.accent };

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
                <div style={{ fontSize: 10, color: C.amber, fontWeight: 800 }}>SUPPORT MODULE {trace.module}</div>
                <div style={{ fontSize: 9, color: C.textMuted, marginTop: 1 }}>RECOMMENDED</div>
              </div>
            )}
          </div>
        </div>

        {/* today's shift */}
        <Card style={{ borderLeft: `4px solid ${statusColor[trace.status]}` }}>
          <div style={{ fontSize: 10, color: statusColor[trace.status], fontWeight: 800, letterSpacing: "0.08em", marginBottom: 6 }}>TODAY'S SHIFT</div>
          <div style={{ color: C.text, fontSize: 13, lineHeight: 1.65 }}>{trace.todayShift}</div>
          <div style={{ fontSize: 11, color: C.textDim, marginTop: 8 }}>{trace.confidenceNote}</div>
        </Card>

        {/* system suggestion */}
        <Card style={{ borderLeft: `4px solid ${C.blue}` }}>
          <div style={{ fontSize: 10, color: C.blue, fontWeight: 800, letterSpacing: "0.08em", marginBottom: 6 }}>SYSTEM SUGGESTION</div>
          <div style={{ color: C.text, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{trace.suggestion}</div>
          <div style={{ color: C.textMuted, fontSize: 12, lineHeight: 1.65 }}>{trace.suggestionDetail}</div>
        </Card>

        {/* proficiency trace */}
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <SectionLabel>Proficiency Estimate — Across Lessons</SectionLabel>
            <div style={{ display: "flex", gap: 6 }}>
              {[["continuum","Continuum"],["distribution","Distribution"]].map(([v, l]) => (
                <button key={v} onClick={() => setProfViz(v)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: 700, border: `1px solid ${profViz === v ? C.accent : C.border}`, background: profViz === v ? C.accentDim : C.surface, color: profViz === v ? C.accent : C.textMuted, borderRadius: 6, cursor: "pointer" }}>{l}</button>
              ))}
            </div>
          </div>
          <ProficiencyViz lessons={trace.lessons} />
        </Card>

        {/* adjacent standard risk */}
        <Card>
          <SectionLabel>Adjacent Standard Risk</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {trace.adjacentRisk.map((r, i) => (
              <div key={i} style={{ display: "flex", gap: 12, padding: "10px 12px", borderRadius: 8, background: C.surfaceUp, borderLeft: `3px solid ${riskColor[r.risk]}` }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                    <span style={{ color: C.text, fontWeight: 700, fontSize: 12 }}>{r.standard}</span>
                    <Tag small color={riskColor[r.risk]}>{r.risk.toUpperCase()} RISK</Tag>
                  </div>
                  <div style={{ color: C.textMuted, fontSize: 12, lineHeight: 1.5 }}>{r.note}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* ML detail — expandable */}
        <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>
          <div onClick={() => toggleMl(student.name)} style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: C.surfaceUp }}>
            <div>
              <div style={{ color: C.text, fontWeight: 700, fontSize: 13 }}>What's powering this</div>
              <div style={{ color: C.textMuted, fontSize: 11, marginTop: 1 }}>Latent state estimates · Model architecture · Data provenance</div>
            </div>
            <span style={{ color: C.accent, fontSize: 14 }}>{mlExpanded[student.name] ? "▲" : "▼"}</span>
          </div>
          {mlExpanded[student.name] && (
            <div style={{ padding: "14px 16px", background: C.surface, borderTop: `1px solid ${C.border}`, display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                ["Model architecture", trace.mlDetail.modelType],
                ["Current estimate", trace.mlDetail.latentState],
                ["Active misunderstanding", trace.mlDetail.activeMisc],
                ["Evidence basis", trace.mlDetail.priorEvidence],
                ["Downstream projections", trace.mlDetail.projections],
              ].map(([label, val]) => (
                <div key={label} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ color: C.textMuted, fontSize: 11, minWidth: 170, flexShrink: 0 }}>{label}</span>
                  <span style={{ color: C.text, fontSize: 12, lineHeight: 1.5 }}>{val}</span>
                </div>
              ))}
              <div style={{ marginTop: 4, padding: "10px 12px", background: C.accentDim, borderRadius: 7, border: `1px solid ${C.accent}33` }}>
                <div style={{ fontSize: 10, color: C.accent, fontWeight: 800, marginBottom: 4 }}>DATA ARCHITECTURE</div>
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
        <SectionLabel>Report & Dashboard</SectionLabel>
        <h2 style={{ color: C.text, fontSize: 22, margin: 0, fontWeight: 800 }}>6.RP.A.1 · Lesson 4 · Period 2</h2>
        <div style={{ color: C.textMuted, fontSize: 13, marginTop: 4 }}>Class overview · Individual knowledge traces · Cross-lesson proficiency estimates</div>
      </div>

      <div style={{ display: "flex", gap: 0, marginBottom: 0, borderBottom: `1px solid ${C.border}` }}>
        {[["class","Class View"],["student","Student View"]].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{ padding: "10px 20px", background: "none", border: "none", borderBottom: tab === id ? `2px solid ${C.accent}` : "2px solid transparent", color: tab === id ? C.accent : C.textMuted, fontWeight: tab === id ? 700 : 500, fontSize: 13, cursor: "pointer", marginBottom: -1 }}>{label}</button>
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
              <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.6 }}>Exit ticket data feeds into targeted support recommendations and forward-looking proficiency estimates. Future state: automated pipeline into Lesson 5 gate inputs.</div>
            </div>
          </div>

          {/* misunderstanding prevalence */}
          <Card style={{ marginBottom: 16 }}>
            <SectionLabel>Misunderstanding Prevalence — This Lesson</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {miscPrevalence.map(({ name, count, color }) => {
                const pct = Math.round((count / students.length) * 100);
                return (
                  <div key={name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ flex: 1, background: C.surfaceUp, borderRadius: 4, height: 22, overflow: "hidden", position: "relative" }}>
                      <div style={{ width: `${Math.max(pct, 0)}%`, height: "100%", background: color, borderRadius: 4, display: "flex", alignItems: "center", paddingLeft: 8 }}>
                        {pct > 20 && <span style={{ color: "#0D1117", fontSize: 10, fontWeight: 700 }}>{count}/{students.length}</span>}
                      </div>
                    </div>
                    <div style={{ color: C.textMuted, fontSize: 12, minWidth: 220 }}>{name}</div>
                    <div style={{ color, fontWeight: 800, fontSize: 13, minWidth: 36 }}>{pct}%</div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* student descriptors */}
          <Card style={{ marginBottom: 16 }}>
            <SectionLabel>Where Each Student Is</SectionLabel>
            <div style={{ color: C.textMuted, fontSize: 12, marginBottom: 12 }}>Click any student to open their full knowledge trace.</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {students.map((s, i) => (
                <div key={i} onClick={() => { setSelectedStudent(s); setTab("student"); }}
                  style={{ cursor: "pointer", padding: "12px 14px", borderRadius: 8, background: C.surfaceUp, border: `1px solid ${C.border}`, borderLeft: `3px solid ${statusColor[s.status]}`, transition: "all 0.15s" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ color: C.accent, fontWeight: 700, fontSize: 13, textDecoration: "underline" }}>{s.name}</span>
                      <span style={{ background: statusColor[s.status] + "22", color: statusColor[s.status], border: `1px solid ${statusColor[s.status]}44`, borderRadius: 4, padding: "2px 8px", fontSize: 10, fontWeight: 800 }}>{statusLabel[s.status]}</span>
                      {s.module && <Tag small color={C.amber}>Module {s.module}</Tag>}
                    </div>
                    <span style={{ color: C.textDim, fontSize: 11 }}>View trace →</span>
                  </div>
                  <div style={{ color: C.textMuted, fontSize: 12, lineHeight: 1.6 }}>{s.descriptor}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* output summary */}
          <Card style={{ border: `1px solid ${C.accent}44`, background: C.accentDim }}>
            <SectionLabel>Complete Pipeline Output — 10 Documents</SectionLabel>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[
                { label: "Lesson Report", tag: "JSX + DOCX", color: C.accent },
                { label: "Clean Teacher Lesson", tag: "DOCX", color: C.blue },
                { label: "Annotated Reviewer Lesson", tag: "Background · DOCX", color: C.textMuted },
                { label: "Exit Ticket + Teacher Key", tag: "DOCX", color: C.purple },
                { label: "Decision Log", tag: "DOCX", color: C.textMuted },
                { label: "Support Module A — Teacher + Student", tag: "2× DOCX", color: C.red },
                { label: "Support Module B — Teacher + Student", tag: "2× DOCX", color: C.red },
                { label: "Support Module C — Teacher + Student", tag: "2× DOCX", color: C.amber },
                { label: "Support Module D — Teacher + Student", tag: "2× DOCX", color: C.purple },
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
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
            {students.map(s => (
              <button key={s.name} onClick={() => setSelectedStudent(s)}
                style={{ padding: "7px 14px", borderRadius: 8, border: `1px solid ${selectedStudent?.name === s.name ? statusColor[s.status] + "88" : C.border}`, background: selectedStudent?.name === s.name ? statusColor[s.status] + "18" : C.surface, color: selectedStudent?.name === s.name ? statusColor[s.status] : C.textMuted, fontSize: 12, fontWeight: selectedStudent?.name === s.name ? 700 : 400, cursor: "pointer" }}>
                {s.name}
              </button>
            ))}
          </div>
          {selectedStudent ? (
            <StudentProfile student={selectedStudent} />
          ) : (
            <div style={{ textAlign: "center", padding: "48px 20px", color: C.textMuted, fontSize: 14 }}>
              Select a student above to open their knowledge trace.
            </div>
          )}
        </div>
      )}

      <Btn onClick={onNext} style={{ width: "100%", padding: 14, fontSize: 14, marginTop: 24 }}>
        VIEW TARGETED SUPPORT MODULES →
      </Btn>
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
      {screen === 0 && <UploadScreen        onNext={() => goTo(1)} />}
      {screen === 1 && <ProcessingScreen    onNext={() => goTo(2)} />}
      {screen === 2 && <GateScreen          onNext={() => goTo(3)} />}
      {screen === 3 && <LessonOutputsScreen onNext={() => goTo(4)} />}
      {screen === 4 && <ExitTicketScreen    onNext={() => goTo(5)} />}
      {screen === 5 && <FinalScreen         onNext={() => goTo(6)} />}
      {screen === 6 && <TargetedSupportScreen onNext={() => goTo(7)} />}
      {screen === 7 && <ResearcherScreen    />}
    </div>
  );
}
