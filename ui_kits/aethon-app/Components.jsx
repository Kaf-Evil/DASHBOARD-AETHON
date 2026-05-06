// Components.jsx — Aethon UI primitives
const aethonNavy = "#0A1628";
const aethonBlue = "#1960a6";
const aethonGold = "#f0a026";
const aethon500 = "#2563EB";
const slate200 = "#E2E8F0";
const slate400 = "#94A3B8";
const slate600 = "#475569";
const slate50 = "#F8FAFC";

// ── Button ────────────────────────────────────────────
const Button = ({ variant = "primary", size = "md", icon, children, onClick, type = "button" }) => {
  const variants = {
    primary: { background: aethon500, color: "#fff", border: "none" },
    secondary: { background: "#fff", color: "#0A1628", border: `1.5px solid ${slate200}` },
    navy: { background: aethonNavy, color: "#fff", border: "none" },
    gold: { background: aethonGold, color: "#fff", border: "none" },
    danger: { background: "#DC2626", color: "#fff", border: "none" },
    ghost: { background: "transparent", color: aethon500, border: "1.5px solid #DBEAFE" },
  };
  const sizes = {
    sm: { padding: "6px 13px", fontSize: 12, borderRadius: 6 },
    md: { padding: "9px 18px", fontSize: 13.5, borderRadius: 8 },
    lg: { padding: "12px 24px", fontSize: 15, borderRadius: 10 },
  };
  return <button type={type} onClick={onClick} style={{
    display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 600,
    fontFamily: "Inter, sans-serif", letterSpacing: "-.01em", cursor: "pointer",
    transition: "all .15s ease-out",
    ...variants[variant], ...sizes[size],
  }}>{icon && <Icon name={icon} size={size === "sm" ? 14 : 16} color="currentColor"/>}{children}</button>;
};

// ── Badge ─────────────────────────────────────────────
const Badge = ({ tone = "blue", children }) => {
  const tones = {
    blue: { bg: "#DBEAFE", fg: "#1E40AF" },
    gold: { bg: "#FEF3C7", fg: "#92400E" },
    green: { bg: "#D1FAE5", fg: "#065F46" },
    red: { bg: "#FEE2E2", fg: "#991B1B" },
    slate: { bg: "#F1F5F9", fg: "#475569" },
    navy: { bg: aethonNavy, fg: "#fff" },
    purple: { bg: "#F3E8FF", fg: "#6B21A8" },
  };
  const t = tones[tone] || tones.blue;
  return <span style={{
    display: "inline-flex", alignItems: "center", padding: "3px 10px",
    borderRadius: 9999, fontSize: 12, fontWeight: 600,
    background: t.bg, color: t.fg,
  }}>{children}</span>;
};

// ── KpiCard ───────────────────────────────────────────
const KpiCard = ({ title, value, sub, accent, valueColor }) => (
  <div style={{
    background: "#fff", borderRadius: 12,
    border: `1.5px solid ${slate200}`,
    boxShadow: "0 1px 3px rgba(0,0,0,.04)",
    padding: "18px 20px",
    borderLeft: accent ? `3px solid ${accent}` : undefined,
  }}>
    <div style={{ fontSize: 13, fontWeight: 700, color: aethonNavy, marginBottom: 4 }}>{title}</div>
    <div style={{ fontSize: 28, fontWeight: 800, color: valueColor || aethonNavy, letterSpacing: "-.03em", fontFeatureSettings: '"tnum" 1' }}>{value}</div>
    {sub && <div style={{ fontSize: 12, color: slate400, marginTop: 4 }}>{sub}</div>}
  </div>
);

// ── Input ─────────────────────────────────────────────
const Input = ({ label, value, onChange, placeholder, type = "text", style }) => {
  const [focused, setFocused] = React.useState(false);
  return <div style={style}>
    {label && <label style={{ fontSize: 11, fontWeight: 700, color: slate400, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 6, display: "block" }}>{label}</label>}
    <input type={type} value={value || ""} onChange={onChange} placeholder={placeholder}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      style={{
        width: "100%", padding: "9px 13px",
        border: `1.5px solid ${focused ? aethon500 : slate200}`,
        borderRadius: 8, fontSize: 14, fontFamily: "Inter, sans-serif",
        color: aethonNavy, outline: "none",
        boxShadow: focused ? "0 0 0 3px rgba(37,99,235,.18)" : "none",
        transition: "all .15s ease-out", background: "#fff",
      }}/>
  </div>;
};

// ── Sidebar ───────────────────────────────────────────
const SidebarItem = ({ icon, label, active, onClick }) => (
  <div onClick={onClick} style={{
    display: "flex", alignItems: "center", gap: 10,
    padding: "9px 14px", margin: "1px 8px",
    borderRadius: 8, fontSize: 13, fontWeight: 500,
    color: active ? "#fff" : "rgba(255,255,255,.55)",
    background: active ? aethon500 : "transparent",
    cursor: "pointer", transition: "all .12s ease-out",
  }}><Icon name={icon} size={16}/>{label}</div>
);

const Sidebar = ({ active, onNav }) => (
  <div style={{ background: "#0A1628", width: 240, padding: "18px 0", display: "flex", flexDirection: "column", flexShrink: 0, height: "100vh", boxShadow: "0 10px 15px rgba(0,0,0,.08)" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 16px 14px", borderBottom: "1px solid rgba(255,255,255,.08)", marginBottom: 10 }}>
      <img src="../../assets/aethon-logo-light.svg" style={{ height: 34 }}/>
      <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", letterSpacing: ".02em" }}>AETHON</div>
    </div>
    <div style={{ overflowY: "auto", flex: 1, paddingBottom: 12 }}>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "rgba(255,255,255,.3)", padding: "8px 16px 4px" }}>Operación</div>
      <SidebarItem icon="grid" label="Dashboard" active={active === "dashboard"} onClick={() => onNav("dashboard")}/>
      <SidebarItem icon="users" label="Funcionarios" active={active === "funcionarios"} onClick={() => onNav("funcionarios")}/>
      <SidebarItem icon="plus" label="Agregar funcionario" active={active === "nuevo"} onClick={() => onNav("nuevo")}/>

      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "rgba(255,255,255,.3)", padding: "16px 16px 4px" }}>Remuneraciones</div>
      <SidebarItem icon="receipt" label="Liquidaciones" active={active === "liquidaciones"} onClick={() => onNav("liquidaciones")}/>
      <SidebarItem icon="briefcase" label="Honorarios" active={active === "honorarios"} onClick={() => onNav("honorarios")}/>
      <SidebarItem icon="coin" label="Anticipos" active={active === "anticipos"} onClick={() => onNav("anticipos")}/>
      <SidebarItem icon="doc" label="Contratos" active={active === "contratos"} onClick={() => onNav("contratos")}/>

      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "rgba(255,255,255,.3)", padding: "16px 16px 4px" }}>Personas</div>
      <SidebarItem icon="calendar" label="Asistencia" active={active === "asistencia"} onClick={() => onNav("asistencia")}/>
      <SidebarItem icon="palmtree" label="Vacaciones" active={active === "vacaciones"} onClick={() => onNav("vacaciones")}/>
      <SidebarItem icon="pulse" label="Licencias médicas" active={active === "licencias"} onClick={() => onNav("licencias")}/>
      <SidebarItem icon="award" label="Evaluación desempeño" active={active === "evaluacion"} onClick={() => onNav("evaluacion")}/>
      <SidebarItem icon="book" label="Capacitación" active={active === "capacitacion"} onClick={() => onNav("capacitacion")}/>
      <SidebarItem icon="gift" label="Bienestar" active={active === "bienestar"} onClick={() => onNav("bienestar")}/>

      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "rgba(255,255,255,.3)", padding: "16px 16px 4px" }}>Ley 19.378 · APS</div>
      <SidebarItem icon="health" label="Carrera funcionaria" active={active === "aps"} onClick={() => onNav("aps")}/>
      <SidebarItem icon="layers" label="Niveles y categorías" active={active === "niveles"} onClick={() => onNav("niveles")}/>

      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "rgba(255,255,255,.3)", padding: "16px 16px 4px" }}>Inteligencia</div>
      <SidebarItem icon="chat" label="Asistente IA" active={active === "ia"} onClick={() => onNav("ia")}/>
      <SidebarItem icon="chart" label="Reportes" active={active === "reportes"} onClick={() => onNav("reportes")}/>
    </div>
    <div style={{ borderTop: "1px solid rgba(255,255,255,.08)", paddingTop: 8 }}>
      <SidebarItem icon="settings" label="Ajustes" active={active === "ajustes"} onClick={() => onNav("ajustes")}/>
    </div>
  </div>
);

// ── Topbar ────────────────────────────────────────────
const Topbar = ({ period = "Mayo 2026", user = "F. Moreno" }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 16,
    padding: "14px 28px",
    background: "#fff",
    borderBottom: `1.5px solid ${slate200}`,
  }}>
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      background: slate50, border: `1.5px solid ${slate200}`,
      borderRadius: 8, padding: "6px 12px",
    }}>
      <Icon name="receipt" size={14} color={slate600}/>
      <span style={{ fontSize: 12.5, color: slate600, fontWeight: 600 }}>Período</span>
      <span style={{ fontSize: 12.5, color: aethonNavy, fontWeight: 700 }}>{period}</span>
      <Icon name="chevron" size={12} color={slate400}/>
    </div>
    <div style={{ flex: 1, position: "relative", maxWidth: 320 }}>
      <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}>
        <Icon name="search" size={14} color={slate400}/>
      </div>
      <input placeholder="Buscar funcionario por RUT, nombre…" style={{
        width: "100%", padding: "8px 12px 8px 34px",
        border: `1.5px solid ${slate200}`, borderRadius: 8,
        fontSize: 13, fontFamily: "Inter, sans-serif", outline: "none",
        background: slate50, color: aethonNavy,
      }}/>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <button style={{ background: "transparent", border: "none", padding: 6, cursor: "pointer" }}><Icon name="bell" size={18} color={slate600}/></button>
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "6px 10px 6px 6px", borderRadius: 9999,
        background: slate50, border: `1.5px solid ${slate200}`,
      }}>
        <div style={{ width: 26, height: 26, borderRadius: 9999, background: aethonNavy, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>FM</div>
        <span style={{ fontSize: 12.5, color: aethonNavy, fontWeight: 600 }}>{user}</span>
      </div>
    </div>
  </div>
);

Object.assign(window, { Button, Badge, KpiCard, Input, Sidebar, SidebarItem, Topbar });
