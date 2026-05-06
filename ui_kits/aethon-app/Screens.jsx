// Screens.jsx — Dashboard, Liquidaciones, Login, Funcionarios

const FUNCIONARIOS = [
  { rut: "9.583.637-2", nombre: "Patricia Gómez Aravena", cargo: "Enfermera APS", regimen: "Ley 19.378", liquido: 847500, estado: "Pagado" },
  { rut: "12.847.103-K", nombre: "Carlos Mendoza Silva", cargo: "Médico General", regimen: "Ley 19.378", liquido: 1842300, estado: "Pagado" },
  { rut: "16.293.847-5", nombre: "María José Fuentes", cargo: "Asistente Social", regimen: "Cód. del Trabajo", liquido: 712400, estado: "Pendiente" },
  { rut: "8.472.193-1", nombre: "Roberto Núñez Cárcamo", cargo: "TENS", regimen: "Ley 19.378", liquido: 583200, estado: "Pagado" },
  { rut: "14.029.583-7", nombre: "Ana Belén Castillo", cargo: "Matrona", regimen: "Ley 19.378", liquido: 1124600, estado: "Pagado" },
  { rut: "10.847.293-3", nombre: "Jorge Pavez Ortiz", cargo: "Administrativo", regimen: "Cód. del Trabajo", liquido: 642800, estado: "Vencido" },
];
const fmt = (n) => "$" + n.toLocaleString("es-CL");

// ── Dashboard ──────────────────────────────────────────
const DashboardScreen = () => (
  <div style={{ padding: "24px 28px", flex: 1, overflow: "auto" }}>
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "#2563EB", marginBottom: 6 }}>Mayo 2026</div>
      <h1 style={{ fontSize: 28, fontWeight: 800, color: "#0A1628", letterSpacing: "-.03em", margin: 0 }}>Dashboard</h1>
      <p style={{ fontSize: 14, color: "#475569", marginTop: 6 }}>Resumen ejecutivo del período en curso · 847 funcionarios · 3 instancias SQL conectadas.</p>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
      <KpiCard title="Total Imponible" value="$142.380.500" sub="+3.2% vs mes anterior"/>
      <KpiCard title="Funcionarios" value="847" sub="Período Mayo 2026"/>
      <KpiCard title="Líquido a pagar" value="$98.247.140" sub="612 liquidaciones generadas"/>
      <KpiCard title="Contratos por vencer" value="12" sub="Próximos 30 días" accent="#f0a026" valueColor="#D97706"/>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16 }}>
      <div style={{ background: "#fff", borderRadius: 12, border: "1.5px solid #E2E8F0", padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0A1628", margin: 0 }}>Liquidaciones recientes</h3>
          <Button variant="ghost" size="sm">Ver todas</Button>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead><tr>
            {["Funcionario", "Régimen", "Líquido", "Estado"].map(h =>
              <th key={h} style={{ textAlign: "left", padding: "8px 10px", fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#94A3B8", borderBottom: "2px solid #E2E8F0" }}>{h}</th>)}
          </tr></thead>
          <tbody>
            {FUNCIONARIOS.slice(0, 5).map(f => (
              <tr key={f.rut}>
                <td style={{ padding: "10px", borderBottom: "1px solid #F1F5F9" }}>
                  <div style={{ fontWeight: 600, color: "#0A1628" }}>{f.nombre}</div>
                  <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#94A3B8" }}>{f.rut}</div>
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #F1F5F9" }}>
                  <Badge tone={f.regimen.includes("19.378") ? "purple" : "navy"}>{f.regimen}</Badge>
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #F1F5F9", fontFeatureSettings: '"tnum" 1', fontWeight: 600, color: "#0A1628" }}>{fmt(f.liquido)}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #F1F5F9" }}>
                  <Badge tone={f.estado === "Pagado" ? "green" : f.estado === "Vencido" ? "red" : "gold"}>{f.estado}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ background: "#0A1628", color: "#fff", borderRadius: 12, padding: 20, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle, rgba(240,160,38,.25) 0%, transparent 70%)" }}/>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "#f0a026", marginBottom: 8 }}>Ley 19.378 · APS</div>
            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-.02em", marginBottom: 8 }}>423 funcionarios APS activos</div>
            <div style={{ fontSize: 12.5, color: "rgba(255,255,255,.6)", lineHeight: 1.5, marginBottom: 14 }}>Bonificación legal vigente, asignaciones por nivel y categoría calculadas automáticamente.</div>
            <Button variant="gold" size="sm" icon="arrow">Ver módulo APS</Button>
          </div>
        </div>
        <div style={{ background: "#fff", borderRadius: 12, border: "1.5px solid #E2E8F0", padding: 18 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#94A3B8", marginBottom: 10 }}>Acciones rápidas</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Button variant="primary" icon="receipt">Generar liquidaciones</Button>
            <Button variant="navy" icon="download">Exportar libro Excel</Button>
            <Button variant="secondary" icon="plus">Nuevo funcionario</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ── Liquidaciones ──────────────────────────────────────
const LiquidacionesScreen = () => (
  <div style={{ padding: "24px 28px", flex: 1, overflow: "auto" }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "#2563EB", marginBottom: 6 }}>Período 202605</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#0A1628", letterSpacing: "-.03em", margin: 0 }}>Liquidaciones</h1>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <Button variant="secondary" icon="download">Exportar</Button>
        <Button variant="primary" icon="plus">Generar período</Button>
      </div>
    </div>

    <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
      {["Todos · 847", "Ley 19.378 · 423", "Cód. Trabajo · 312", "Plazo Fijo · 112"].map((t, i) => (
        <button key={t} style={{
          padding: "7px 14px", borderRadius: 8,
          border: i === 0 ? "1.5px solid #2563EB" : "1.5px solid #E2E8F0",
          background: i === 0 ? "#EFF6FF" : "#fff",
          color: i === 0 ? "#1E40AF" : "#475569",
          fontSize: 12.5, fontWeight: 600, fontFamily: "Inter, sans-serif", cursor: "pointer",
        }}>{t}</button>
      ))}
    </div>

    <div style={{ background: "#fff", borderRadius: 12, border: "1.5px solid #E2E8F0", overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead><tr style={{ background: "#F8FAFC" }}>
          {["RUT", "Funcionario", "Cargo", "Régimen", "Líquido", "Estado", ""].map(h =>
            <th key={h} style={{ textAlign: "left", padding: "10px 14px", fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#94A3B8", borderBottom: "2px solid #E2E8F0" }}>{h}</th>)}
        </tr></thead>
        <tbody>
          {FUNCIONARIOS.map(f => (
            <tr key={f.rut} style={{ transition: "background .12s" }}>
              <td style={{ padding: "12px 14px", borderBottom: "1px solid #F1F5F9", fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "#475569" }}>{f.rut}</td>
              <td style={{ padding: "12px 14px", borderBottom: "1px solid #F1F5F9", fontWeight: 600, color: "#0A1628" }}>{f.nombre}</td>
              <td style={{ padding: "12px 14px", borderBottom: "1px solid #F1F5F9", color: "#475569" }}>{f.cargo}</td>
              <td style={{ padding: "12px 14px", borderBottom: "1px solid #F1F5F9" }}>
                <Badge tone={f.regimen.includes("19.378") ? "purple" : "navy"}>{f.regimen}</Badge>
              </td>
              <td style={{ padding: "12px 14px", borderBottom: "1px solid #F1F5F9", fontFeatureSettings: '"tnum" 1', fontWeight: 700, color: "#0A1628" }}>{fmt(f.liquido)}</td>
              <td style={{ padding: "12px 14px", borderBottom: "1px solid #F1F5F9" }}>
                <Badge tone={f.estado === "Pagado" ? "green" : f.estado === "Vencido" ? "red" : "gold"}>{f.estado}</Badge>
              </td>
              <td style={{ padding: "12px 14px", borderBottom: "1px solid #F1F5F9", textAlign: "right" }}>
                <button style={{ background: "transparent", border: "none", padding: 4, cursor: "pointer", color: "#94A3B8" }}><Icon name="chevron" size={16}/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ── Funcionario detail ────────────────────────────────
const FuncionarioScreen = () => (
  <div style={{ padding: "24px 28px", flex: 1, overflow: "auto" }}>
    <div style={{ fontSize: 12, color: "#475569", marginBottom: 10 }}>Funcionarios · Patricia Gómez Aravena</div>
    <div style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 24 }}>
      <div style={{ width: 64, height: 64, borderRadius: 9999, background: "#0A1628", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800 }}>PG</div>
      <div style={{ flex: 1 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#0A1628", letterSpacing: "-.02em", margin: 0 }}>Patricia Gómez Aravena</h1>
        <div style={{ display: "flex", gap: 14, alignItems: "center", marginTop: 8, fontSize: 13, color: "#475569" }}>
          <span style={{ fontFamily: "JetBrains Mono, monospace" }}>9.583.637-2</span>
          <span>·</span><span>Enfermera APS</span>
          <span>·</span><Badge tone="purple">Ley 19.378</Badge>
          <Badge tone="green">Activo</Badge>
        </div>
      </div>
      <Button variant="secondary" icon="download">Liquidación PDF</Button>
      <Button variant="navy">Editar</Button>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
      <KpiCard title="Sueldo Base" value="$612.300" sub="Categoría D · Nivel 8"/>
      <KpiCard title="Asignaciones APS" value="$184.520" sub="Bonif. legal + experiencia"/>
      <KpiCard title="Descuentos" value="$118.470" sub="AFP Capital + FONASA"/>
      <KpiCard title="Líquido" value="$847.500" sub="Mayo 2026" accent="#f0a026"/>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <div style={{ background: "#fff", borderRadius: 12, border: "1.5px solid #E2E8F0", padding: 20 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0A1628", margin: "0 0 14px" }}>Datos del contrato</h3>
        {[
          ["Tipo", "Indefinido"], ["Inicio", "12 marzo 2019"], ["Establecimiento", "CESFAM Padre Las Casas"],
          ["AFP", "Capital"], ["Salud", "FONASA Tramo C"], ["Carga horaria", "44 hrs semanales"],
        ].map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #F1F5F9", fontSize: 13 }}>
            <span style={{ color: "#475569" }}>{k}</span>
            <span style={{ color: "#0A1628", fontWeight: 600 }}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{ background: "#fff", borderRadius: 12, border: "1.5px solid #E2E8F0", padding: 20 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0A1628", margin: "0 0 14px" }}>Histórico de liquidaciones</h3>
        {[["May 2026", 847500], ["Abr 2026", 832100], ["Mar 2026", 821400], ["Feb 2026", 818700], ["Ene 2026", 815200]].map(([m, v]) => (
          <div key={m} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #F1F5F9", fontSize: 13 }}>
            <span style={{ color: "#475569" }}>{m}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontFeatureSettings: '"tnum" 1', fontWeight: 600, color: "#0A1628" }}>{fmt(v)}</span>
              <Badge tone="green">Pagado</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ── Login ─────────────────────────────────────────────
const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = React.useState("francisco@aethon.cl");
  const [pw, setPw] = React.useState("••••••••");
  return <div style={{ display: "flex", height: "100vh", fontFamily: "Inter, sans-serif" }}>
    <div style={{ flex: 1.1, background: "#0A1628", padding: "60px 56px", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(25,96,166,.4) 0%, transparent 70%)" }}/>
      <div style={{ position: "absolute", bottom: -80, left: 100, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(240,160,38,.15) 0%, transparent 70%)" }}/>
      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 12 }}>
        <img src="../../assets/aethon-logo-light.svg" style={{ height: 42 }}/>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: ".02em" }}>AETHON</div>
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "#f0a026", marginBottom: 12 }}>Plataforma RH · 2026</div>
        <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: 14 }}>El RH del futuro,<br/>disponible hoy.</div>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,.6)", lineHeight: 1.6, maxWidth: 380 }}>Automatización, IA y aplicaciones web hechas exclusivamente para Recursos Humanos en México y Chile.</div>
      </div>
      <div style={{ position: "relative", zIndex: 1, fontSize: 11, color: "rgba(255,255,255,.35)" }}>© 2026 Aethon · Ley 19.378 ready</div>
    </div>
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff" }}>
      <div style={{ width: 380 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0A1628", letterSpacing: "-.02em", margin: 0 }}>Iniciar sesión</h2>
        <p style={{ fontSize: 13.5, color: "#475569", marginTop: 6, marginBottom: 26 }}>Ingresa con tu correo institucional.</p>
        <Input label="Correo" value={email} onChange={e => setEmail(e.target.value)} style={{ marginBottom: 14 }}/>
        <Input label="Contraseña" type="password" value={pw} onChange={e => setPw(e.target.value)} style={{ marginBottom: 18 }}/>
        <button onClick={onLogin} style={{
          width: "100%", padding: "12px", border: "none", borderRadius: 10,
          background: "#2563EB", color: "#fff", fontSize: 14, fontWeight: 700,
          fontFamily: "Inter, sans-serif", cursor: "pointer",
        }}>Entrar →</button>
        <div style={{ fontSize: 12, color: "#94A3B8", textAlign: "center", marginTop: 14 }}>¿Problemas para entrar? <a href="#" style={{ color: "#2563EB", fontWeight: 600 }}>Contacta a soporte</a></div>
      </div>
    </div>
  </div>;
};

Object.assign(window, { DashboardScreen, LiquidacionesScreen, FuncionarioScreen, LoginScreen });
