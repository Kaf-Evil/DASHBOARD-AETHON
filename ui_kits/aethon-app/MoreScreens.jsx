// MoreScreens.jsx — APS, Honorarios, NuevoFuncionario, Vacaciones, Licencias, Capacitación, Bienestar, IA, Asistencia, Evaluación, Contratos

const fmtCL = (n) => "$" + n.toLocaleString("es-CL");

// ─────────────────────────────────────────────────────────────
// PAGE HEADER (reused across modules)
// ─────────────────────────────────────────────────────────────
const PageHeader = ({ eyebrow, title, sub, right }) => (
  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 22, gap: 20 }}>
    <div>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "#2563EB", marginBottom: 6 }}>{eyebrow}</div>
      <h1 style={{ fontSize: 28, fontWeight: 800, color: "#0A1628", letterSpacing: "-.03em", margin: 0 }}>{title}</h1>
      {sub && <p style={{ fontSize: 14, color: "#475569", marginTop: 6, maxWidth: 640 }}>{sub}</p>}
    </div>
    {right && <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>{right}</div>}
  </div>
);

const Card = ({ title, action, children, padding = 20 }) => (
  <div style={{ background: "#fff", borderRadius: 12, border: "1.5px solid #E2E8F0", padding, boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
    {(title || action) && <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
      {title && <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0A1628", margin: 0 }}>{title}</h3>}
      {action}
    </div>}
    {children}
  </div>
);

const SectionLabel = ({ children }) => (
  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#94A3B8", marginBottom: 10 }}>{children}</div>
);

// ─────────────────────────────────────────────────────────────
// 1) APS · Carrera funcionaria (Ley 19.378)
// ─────────────────────────────────────────────────────────────
const FUNCIONARIOS_APS = [
  { rut: "9.583.637-2", nombre: "Patricia Gómez Aravena", cat: "C", nivel: 8, sgto: 18, prox: "12-08-2026", faltan: 12, exp: 18, perf: 14, capac: 6, total: 38, status: "Vigente" },
  { rut: "12.847.103-K", nombre: "Carlos Mendoza Silva", cat: "A", nivel: 11, sgto: 12, prox: "03-11-2026", faltan: 28, exp: 24, perf: 18, capac: 8, total: 50, status: "Vigente" },
  { rut: "16.293.847-5", nombre: "María José Fuentes", cat: "D", nivel: 4, sgto: 8, prox: "01-06-2026", faltan: 0, exp: 8, perf: 12, capac: 4, total: 24, status: "Cambio próximo" },
  { rut: "8.472.193-1", nombre: "Roberto Núñez Cárcamo", cat: "E", nivel: 6, sgto: 22, prox: "15-07-2026", faltan: 4, exp: 22, perf: 10, capac: 5, total: 37, status: "Falta evaluación" },
  { rut: "14.029.583-7", nombre: "Ana Belén Castillo", cat: "B", nivel: 9, sgto: 14, prox: "22-09-2026", faltan: 18, exp: 14, perf: 16, capac: 7, total: 37, status: "Vigente" },
];

const APSScreen = () => (
  <div style={{ padding: "24px 28px", flex: 1, overflow: "auto" }}>
    <PageHeader
      eyebrow="Ley 19.378 · Estatuto APS"
      title="Carrera funcionaria"
      sub="Seguimiento de niveles, puntajes y cambios automáticos según experiencia, capacitación y desempeño. 423 funcionarios bajo estatuto APS activo."
      right={<>
        <Button variant="secondary" icon="download">Exportar libro APS</Button>
        <Button variant="primary" icon="check">Recalcular niveles</Button>
      </>}
    />

    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 22 }}>
      <KpiCard title="Funcionarios APS" value="423" sub="A · 84 · B · 96 · C · 142 · D · 78 · E · 23"/>
      <KpiCard title="Cambios próximos 30 días" value="12" sub="Ascenso automático" accent="#f0a026"/>
      <KpiCard title="Faltan evaluaciones" value="34" sub="Bloquea avance" valueColor="#D97706"/>
      <KpiCard title="Bonif. legal mes" value="$8.472.300" sub="Total APS"/>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 16, marginBottom: 18 }}>
      <Card title="Composición por categoría">
        {[
          ["A · Médicos / odontólogos", 84, "#2563EB"],
          ["B · Otros profesionales", 96, "#1960a6"],
          ["C · Técnicos nivel superior", 142, "#7C3AED"],
          ["D · Técnicos de salud", 78, "#0E7490"],
          ["E · Administrativos / auxiliares", 23, "#94A3B8"],
        ].map(([label, val, col]) => (
          <div key={label} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 4 }}>
              <span style={{ color: "#475569" }}>{label}</span>
              <span style={{ fontWeight: 700, color: "#0A1628", fontFeatureSettings: '"tnum" 1' }}>{val}</span>
            </div>
            <div style={{ height: 6, background: "#F1F5F9", borderRadius: 9999, overflow: "hidden" }}>
              <div style={{ width: `${(val / 142) * 100}%`, height: "100%", background: col, borderRadius: 9999 }}/>
            </div>
          </div>
        ))}
      </Card>

      <Card title="Próximos cambios de nivel" action={<Button variant="ghost" size="sm">Ver todos</Button>}>
        {[
          { rut: "16.293.847-5", n: "María José Fuentes", from: "D-3", to: "D-4", date: "01-06-2026", reason: "13 ptos. completados" },
          { rut: "8.472.193-1", n: "Roberto Núñez", from: "E-5", to: "E-6", date: "15-07-2026", reason: "Bienio cumplido", warn: "Falta evaluación 2025" },
          { rut: "9.583.637-2", n: "Patricia Gómez", from: "C-7", to: "C-8", date: "12-08-2026", reason: "Capacitación + bienio" },
        ].map(p => (
          <div key={p.rut} style={{ display: "flex", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #F1F5F9", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9999, background: "#0A1628", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>{p.n.split(" ").map(x => x[0]).slice(0, 2).join("")}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#0A1628" }}>{p.n}</div>
              <div style={{ fontSize: 11.5, color: "#475569", display: "flex", gap: 6, alignItems: "center" }}>
                <span style={{ fontFamily: "JetBrains Mono, monospace" }}>{p.from}</span>
                <Icon name="arrow" size={11}/>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 700, color: "#047857" }}>{p.to}</span>
                <span>·</span>
                <span>{p.reason}</span>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#0A1628" }}>{p.date}</div>
              {p.warn ? <Badge tone="red">{p.warn}</Badge> : <Badge tone="green">Listo</Badge>}
            </div>
          </div>
        ))}
      </Card>
    </div>

    <Card title="Detalle de funcionarios APS" action={<div style={{ display: "flex", gap: 8 }}>
      <Button variant="secondary" size="sm" icon="filter">Filtros</Button>
      <Button variant="secondary" size="sm" icon="download">Excel</Button>
    </div>}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead><tr style={{ background: "#F8FAFC" }}>
          {["RUT", "Funcionario", "Cat·Nivel", "Bienios", "Experiencia", "Desempeño", "Capacit.", "Total ptos", "Próximo cambio", "Estado"].map(h =>
            <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#94A3B8", borderBottom: "2px solid #E2E8F0" }}>{h}</th>)}
        </tr></thead>
        <tbody>
          {FUNCIONARIOS_APS.map(f => (
            <tr key={f.rut}>
              <td style={{ padding: "12px", borderBottom: "1px solid #F1F5F9", fontFamily: "JetBrains Mono, monospace", fontSize: 11.5, color: "#475569" }}>{f.rut}</td>
              <td style={{ padding: "12px", borderBottom: "1px solid #F1F5F9", fontWeight: 600, color: "#0A1628" }}>{f.nombre}</td>
              <td style={{ padding: "12px", borderBottom: "1px solid #F1F5F9" }}>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 700, color: "#7C3AED" }}>{f.cat}-{f.nivel}</span>
              </td>
              <td style={{ padding: "12px", borderBottom: "1px solid #F1F5F9", fontWeight: 600, color: "#0A1628" }}>{f.sgto} <span style={{ fontSize: 11, color: "#94A3B8", fontWeight: 400 }}>años</span></td>
              <td style={{ padding: "12px", borderBottom: "1px solid #F1F5F9", color: "#475569" }}>{f.exp} pts</td>
              <td style={{ padding: "12px", borderBottom: "1px solid #F1F5F9", color: "#475569" }}>{f.perf} pts</td>
              <td style={{ padding: "12px", borderBottom: "1px solid #F1F5F9", color: "#475569" }}>{f.capac} pts</td>
              <td style={{ padding: "12px", borderBottom: "1px solid #F1F5F9", fontWeight: 700, color: "#0A1628" }}>{f.total}</td>
              <td style={{ padding: "12px", borderBottom: "1px solid #F1F5F9", color: "#0A1628", fontSize: 12.5 }}>
                <div style={{ fontWeight: 600 }}>{f.prox}</div>
                <div style={{ fontSize: 11, color: f.faltan === 0 ? "#047857" : "#94A3B8" }}>{f.faltan === 0 ? "Listo" : `Faltan ${f.faltan} pts`}</div>
              </td>
              <td style={{ padding: "12px", borderBottom: "1px solid #F1F5F9" }}>
                <Badge tone={f.status === "Vigente" ? "green" : f.status === "Cambio próximo" ? "gold" : "red"}>{f.status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  </div>
);

// ─────────────────────────────────────────────────────────────
// 2) HONORARIOS · Boletas
// ─────────────────────────────────────────────────────────────
const HONORARIOS = [
  { rut: "13.847.293-K", n: "Daniela Riquelme S.", svc: "Capacitación SQL", boleta: "B-001847", monto: 1850000, retencion: 240500, liquido: 1609500, fecha: "08-05-2026", estado: "Pagada" },
  { rut: "9.482.103-7", n: "Marcos Vergara A.", svc: "Asesoría jurídica APS", boleta: "B-001846", monto: 950000, retencion: 123500, liquido: 826500, fecha: "06-05-2026", estado: "Pagada" },
  { rut: "11.293.847-2", n: "Paulina Soto F.", svc: "Diseño campaña bienestar", boleta: "B-001845", monto: 680000, retencion: 88400, liquido: 591600, fecha: "—", estado: "Por aprobar" },
  { rut: "15.847.293-3", n: "Andrés Pinto L.", svc: "Auditoría externa Q1", boleta: "B-001844", monto: 3200000, retencion: 416000, liquido: 2784000, fecha: "—", estado: "En revisión" },
  { rut: "10.293.847-4", n: "Camila Reyes V.", svc: "Soporte sistema HIS", boleta: "B-001843", monto: 1450000, retencion: 188500, liquido: 1261500, fecha: "02-05-2026", estado: "Pagada" },
];

const HonorariosScreen = () => (
  <div style={{ padding: "24px 28px", flex: 1, overflow: "auto" }}>
    <PageHeader
      eyebrow="Período 202605"
      title="Contratos a honorarios"
      sub="Gestión de boletas de honorarios, retención provisional 13% y libro de honorarios listo para SII."
      right={<>
        <Button variant="secondary" icon="download">Libro electrónico SII</Button>
        <Button variant="primary" icon="plus">Nueva boleta</Button>
      </>}
    />

    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 22 }}>
      <KpiCard title="Boletas del mes" value="47" sub="32 pagadas · 15 pendientes"/>
      <KpiCard title="Total bruto" value="$28.473.500" sub="Antes de retención"/>
      <KpiCard title="Retención 13%" value="$3.701.555" sub="Provisional mensual" accent="#7C3AED"/>
      <KpiCard title="Líquido a pagar" value="$24.771.945" sub="Egreso del período" accent="#f0a026"/>
    </div>

    <Card title="Boletas del período" action={<div style={{ display: "flex", gap: 8 }}>
      <Button variant="secondary" size="sm" icon="filter">Filtrar</Button>
      <Button variant="secondary" size="sm" icon="upload">Importar XML</Button>
    </div>}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead><tr style={{ background: "#F8FAFC" }}>
          {["N° Boleta", "Prestador", "Servicio", "Bruto", "Retención", "Líquido", "Fecha pago", "Estado"].map(h =>
            <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#94A3B8", borderBottom: "2px solid #E2E8F0" }}>{h}</th>)}
        </tr></thead>
        <tbody>
          {HONORARIOS.map(h => (
            <tr key={h.boleta}>
              <td style={{ padding: "12px", borderBottom: "1px solid #F1F5F9", fontFamily: "JetBrains Mono, monospace", fontWeight: 700, color: "#1960a6" }}>{h.boleta}</td>
              <td style={{ padding: "12px", borderBottom: "1px solid #F1F5F9" }}>
                <div style={{ fontWeight: 600, color: "#0A1628" }}>{h.n}</div>
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#94A3B8" }}>{h.rut}</div>
              </td>
              <td style={{ padding: "12px", borderBottom: "1px solid #F1F5F9", color: "#475569" }}>{h.svc}</td>
              <td style={{ padding: "12px", borderBottom: "1px solid #F1F5F9", fontWeight: 600, color: "#0A1628", fontFeatureSettings: '"tnum" 1' }}>{fmtCL(h.monto)}</td>
              <td style={{ padding: "12px", borderBottom: "1px solid #F1F5F9", color: "#7C3AED", fontWeight: 600, fontFeatureSettings: '"tnum" 1' }}>−{fmtCL(h.retencion)}</td>
              <td style={{ padding: "12px", borderBottom: "1px solid #F1F5F9", fontWeight: 700, color: "#0A1628", fontFeatureSettings: '"tnum" 1' }}>{fmtCL(h.liquido)}</td>
              <td style={{ padding: "12px", borderBottom: "1px solid #F1F5F9", color: "#475569" }}>{h.fecha}</td>
              <td style={{ padding: "12px", borderBottom: "1px solid #F1F5F9" }}>
                <Badge tone={h.estado === "Pagada" ? "green" : h.estado === "Por aprobar" ? "gold" : "blue"}>{h.estado}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  </div>
);

// ─────────────────────────────────────────────────────────────
// 3) AGREGAR FUNCIONARIO (multi-step form)
// ─────────────────────────────────────────────────────────────
const NuevoFuncionarioScreen = () => {
  const [step, setStep] = React.useState(1);
  const steps = [
    { n: 1, label: "Datos personales" },
    { n: 2, label: "Contrato" },
    { n: 3, label: "Régimen" },
    { n: 4, label: "Previsional" },
    { n: 5, label: "Confirmar" },
  ];

  return <div style={{ padding: "24px 28px", flex: 1, overflow: "auto" }}>
    <PageHeader
      eyebrow="Onboarding · 5 pasos"
      title="Agregar funcionario"
      sub="Captura los datos esenciales para crear el legajo. La validación de RUT y la suscripción al estatuto correcto se hacen automáticamente."
    />

    {/* Stepper */}
    <div style={{ background: "#fff", borderRadius: 12, border: "1.5px solid #E2E8F0", padding: "18px 24px", marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
      {steps.map((s, i) => (
        <React.Fragment key={s.n}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 9999,
              background: step > s.n ? "#047857" : step === s.n ? "#2563EB" : "#F1F5F9",
              color: step >= s.n ? "#fff" : "#94A3B8",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12.5, fontWeight: 700,
            }}>{step > s.n ? <Icon name="check" size={14} color="#fff"/> : s.n}</div>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: step >= s.n ? "#0A1628" : "#94A3B8" }}>{s.label}</div>
          </div>
          {i < steps.length - 1 && <div style={{ flex: 1, height: 2, background: step > s.n ? "#047857" : "#F1F5F9", borderRadius: 9999 }}/>}
        </React.Fragment>
      ))}
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }}>
      <Card padding={28}>
        {step === 1 && <>
          <SectionLabel>Identificación</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginBottom: 22 }}>
            <Input label="RUT" placeholder="9.583.637-2"/>
            <Input label="Fecha nacimiento" placeholder="dd/mm/aaaa"/>
            <Input label="Nombres" placeholder="Patricia Andrea"/>
            <Input label="Apellidos" placeholder="Gómez Aravena"/>
            <Input label="Género" placeholder="Femenino"/>
            <Input label="Estado civil" placeholder="Casada"/>
          </div>
          <SectionLabel>Contacto</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
            <Input label="Correo" placeholder="patricia.gomez@cesfam.cl"/>
            <Input label="Teléfono" placeholder="+56 9 1234 5678"/>
            <Input label="Dirección" placeholder="Av. Pueblo Nuevo 1234"/>
            <Input label="Comuna" placeholder="Padre Las Casas"/>
          </div>
        </>}
        {step === 2 && <>
          <SectionLabel>Datos del contrato</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginBottom: 22 }}>
            <Input label="Cargo" placeholder="Enfermera APS"/>
            <Input label="Establecimiento" placeholder="CESFAM Padre Las Casas"/>
            <Input label="Fecha inicio" placeholder="12/03/2019"/>
            <Input label="Tipo contrato" placeholder="Indefinido"/>
            <Input label="Carga horaria" placeholder="44 hrs semanales"/>
            <Input label="Centro de costo" placeholder="CC-APS-001"/>
          </div>
          <SectionLabel>Sueldo</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 28 }}>
            <Input label="Sueldo base" placeholder="$612.300"/>
            <Input label="Asignaciones" placeholder="$184.520"/>
            <Input label="Bonos" placeholder="$0"/>
          </div>
        </>}
        {step === 3 && <>
          <SectionLabel>Régimen aplicable</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 22 }}>
            {[
              { id: "aps", title: "Ley 19.378 — APS", desc: "Estatuto de Atención Primaria de Salud Municipal. Carrera funcionaria con bienios, niveles A–E.", selected: true, color: "#7C3AED" },
              { id: "ct", title: "Código del Trabajo", desc: "Régimen privado / personal a contrata. Sin carrera funcionaria.", color: "#0A1628" },
            ].map(o => (
              <div key={o.id} style={{
                padding: 18, borderRadius: 12,
                border: o.selected ? `2px solid ${o.color}` : "1.5px solid #E2E8F0",
                background: o.selected ? "#FAF5FF" : "#fff",
                cursor: "pointer", position: "relative",
              }}>
                {o.selected && <div style={{ position: "absolute", top: 12, right: 12, width: 22, height: 22, borderRadius: 9999, background: o.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="check" size={13} color="#fff"/></div>}
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0A1628", marginBottom: 6 }}>{o.title}</div>
                <div style={{ fontSize: 12.5, color: "#475569", lineHeight: 1.5 }}>{o.desc}</div>
              </div>
            ))}
          </div>
          <SectionLabel>Carrera funcionaria APS</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 28 }}>
            <Input label="Categoría" placeholder="C — Téc. nivel sup."/>
            <Input label="Nivel inicial" placeholder="3"/>
            <Input label="Bienios reconocidos" placeholder="0"/>
          </div>
        </>}
        {step === 4 && <>
          <SectionLabel>Datos previsionales</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginBottom: 22 }}>
            <Input label="AFP" placeholder="Capital"/>
            <Input label="Cotización adicional %" placeholder="0,77"/>
            <Input label="Sistema de salud" placeholder="FONASA"/>
            <Input label="Tramo / Plan" placeholder="Tramo C"/>
            <Input label="Caja compensación" placeholder="Los Andes"/>
            <Input label="Mutual" placeholder="ACHS"/>
          </div>
          <SectionLabel>Datos bancarios</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 28 }}>
            <Input label="Banco" placeholder="BancoEstado"/>
            <Input label="Tipo cuenta" placeholder="Cta. RUT"/>
            <Input label="N° cuenta" placeholder="9583637"/>
          </div>
        </>}
        {step === 5 && <>
          <SectionLabel>Resumen del nuevo funcionario</SectionLabel>
          <div style={{ background: "#F8FAFC", borderRadius: 12, padding: 20, marginBottom: 18 }}>
            {[
              ["RUT", "9.583.637-2"], ["Nombre", "Patricia Gómez Aravena"],
              ["Cargo", "Enfermera APS"], ["Establecimiento", "CESFAM Padre Las Casas"],
              ["Régimen", "Ley 19.378 · APS"], ["Categoría / Nivel", "C-3"],
              ["AFP / Salud", "Capital / FONASA tramo C"], ["Sueldo base", "$612.300"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #E2E8F0", fontSize: 13 }}>
                <span style={{ color: "#475569" }}>{k}</span>
                <span style={{ fontWeight: 600, color: "#0A1628" }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "#EFF6FF", border: "1.5px solid #BFDBFE", borderRadius: 10, padding: 14, fontSize: 13, color: "#1E40AF", display: "flex", gap: 10 }}>
            <Icon name="check" size={18} color="#2563EB"/>
            <div>Al confirmar, el sistema generará el contrato en PDF, registrará el alta previsional y notificará al funcionario por correo.</div>
          </div>
        </>}

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 26, paddingTop: 18, borderTop: "1px solid #F1F5F9" }}>
          <Button variant="secondary" onClick={() => setStep(Math.max(1, step - 1))}>← Anterior</Button>
          {step < 5
            ? <Button variant="primary" onClick={() => setStep(step + 1)} icon="arrow">Continuar</Button>
            : <Button variant="primary" icon="check">Crear funcionario</Button>}
        </div>
      </Card>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Card>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#94A3B8", marginBottom: 10 }}>Validación automática</div>
          {[
            { l: "RUT válido", ok: true }, { l: "Sin duplicados", ok: true },
            { l: "Edad legal de contratación", ok: true }, { l: "AFP sincronizada", ok: step >= 4 },
            { l: "Categoría APS válida", ok: step >= 3 },
          ].map(v => (
            <div key={v.l} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", fontSize: 13 }}>
              <div style={{ width: 18, height: 18, borderRadius: 9999, background: v.ok ? "#D1FAE5" : "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {v.ok ? <Icon name="check" size={11} color="#047857"/> : <Icon name="clock" size={11} color="#94A3B8"/>}
              </div>
              <span style={{ color: v.ok ? "#0A1628" : "#94A3B8" }}>{v.l}</span>
            </div>
          ))}
        </Card>

        <div style={{ background: "#0A1628", color: "#fff", borderRadius: 12, padding: 18, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "radial-gradient(circle, rgba(240,160,38,.18) 0%, transparent 70%)" }}/>
          <div style={{ position: "relative" }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "#f0a026", marginBottom: 8 }}>Tip · Aethon IA</div>
            <div style={{ fontSize: 13.5, lineHeight: 1.55, color: "rgba(255,255,255,.85)" }}>Si tu funcionario viene de otro establecimiento APS, sube el certificado de carrera y reconocemos automáticamente bienios y puntajes acumulados.</div>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

// ─────────────────────────────────────────────────────────────
// 4) VACACIONES
// ─────────────────────────────────────────────────────────────
const VacacionesScreen = () => {
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  const calendar = [
    { name: "Patricia Gómez", n: "PG", color: "#2563EB", days: [[5, 8, "Mayo"], [3, 5, "Jun"]] },
    { name: "Carlos Mendoza", n: "CM", color: "#7C3AED", days: [[1, 4, "Mayo"]] },
    { name: "María José F.", n: "MF", color: "#0E7490", days: [[6, 8, "Mayo"], [9, 12, "Mayo"]] },
    { name: "Roberto Núñez", n: "RN", color: "#D97706", days: [[7, 11, "Mayo"]] },
    { name: "Ana B. Castillo", n: "AC", color: "#047857", days: [[10, 12, "Mayo"]] },
  ];

  return <div style={{ padding: "24px 28px", flex: 1, overflow: "auto" }}>
    <PageHeader
      eyebrow="Mayo 2026"
      title="Vacaciones y feriados"
      sub="Gestión del feriado legal, progresivo y administrativo. Calendario de equipo en tiempo real."
      right={<>
        <Button variant="secondary" icon="download">Exportar</Button>
        <Button variant="primary" icon="plus">Solicitar feriado</Button>
      </>}
    />

    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 22 }}>
      <KpiCard title="Funcionarios con feriado activo" value="34" sub="De 847 totales"/>
      <KpiCard title="Días pendientes promedio" value="8.4" sub="Feriado legal acumulado"/>
      <KpiCard title="Solicitudes por aprobar" value="12" sub="Esperando jefatura" valueColor="#D97706" accent="#f0a026"/>
      <KpiCard title="Cobertura crítica" value="94%" sub="2 turnos sin reemplazo" accent="#DC2626"/>
    </div>

    <Card title="Calendario de equipo · Mayo 2026" action={<div style={{ display: "flex", gap: 8 }}>
      <Button variant="secondary" size="sm">← Abr</Button>
      <Button variant="secondary" size="sm">Jun →</Button>
    </div>}>
      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 0 }}>
        <div></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(15, 1fr)", borderBottom: "1px solid #E2E8F0", paddingBottom: 8, marginBottom: 8 }}>
          {Array.from({ length: 15 }, (_, i) => i + 1).map(d => (
            <div key={d} style={{ textAlign: "center", fontSize: 11, fontWeight: 600, color: d === 9 ? "#2563EB" : "#94A3B8" }}>{d}</div>
          ))}
        </div>
        {calendar.map(p => (
          <React.Fragment key={p.name}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px 10px 0" }}>
              <div style={{ width: 28, height: 28, borderRadius: 9999, background: p.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>{p.n}</div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: "#0A1628" }}>{p.name}</div>
            </div>
            <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(15, 1fr)", padding: "10px 0", borderBottom: "1px solid #F1F5F9" }}>
              {Array.from({ length: 15 }, (_, i) => i + 1).map(d => (
                <div key={d} style={{ height: 22, background: d === 9 ? "rgba(37,99,235,.05)" : "transparent" }}/>
              ))}
              {p.days.map((r, i) => (
                <div key={i} style={{
                  position: "absolute", top: 10, height: 22, borderRadius: 6,
                  left: `${((r[0] - 1) / 15) * 100}%`,
                  width: `${((r[1] - r[0] + 1) / 15) * 100}%`,
                  background: p.color, opacity: .85,
                  display: "flex", alignItems: "center", paddingLeft: 8,
                  fontSize: 11, fontWeight: 600, color: "#fff",
                }}>{r[1] - r[0] + 1}d</div>
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    </Card>
  </div>;
};

// ─────────────────────────────────────────────────────────────
// 5) LICENCIAS MÉDICAS
// ─────────────────────────────────────────────────────────────
const LicenciasScreen = () => {
  const lic = [
    { id: "L-2026-0847", rut: "9.583.637-2", n: "Patricia Gómez A.", tipo: "Enfermedad común", dias: 5, desde: "06-05-2026", hasta: "10-05-2026", estado: "Aprobada Compin", monto: 124300 },
    { id: "L-2026-0846", rut: "12.847.103-K", n: "Carlos Mendoza S.", tipo: "Pre-natal", dias: 42, desde: "01-05-2026", hasta: "11-06-2026", estado: "En tramitación", monto: 0 },
    { id: "L-2026-0845", rut: "16.293.847-5", n: "María José F.", tipo: "Accidente del trabajo", dias: 14, desde: "28-04-2026", hasta: "11-05-2026", estado: "Aprobada Mutual", monto: 387200 },
    { id: "L-2026-0844", rut: "8.472.193-1", n: "Roberto Núñez", tipo: "Enfermedad común", dias: 3, desde: "04-05-2026", hasta: "06-05-2026", estado: "Rechazada", monto: 0 },
  ];

  return <div style={{ padding: "24px 28px", flex: 1, overflow: "auto" }}>
    <PageHeader
      eyebrow="Mayo 2026"
      title="Licencias médicas"
      sub="Recepción y tramitación con Compin / Isapre / Mutual. Cálculo automático de subsidio y descuento de remuneración."
      right={<>
        <Button variant="secondary" icon="upload">Subir licencia</Button>
        <Button variant="primary" icon="download">Reporte mensual</Button>
      </>}
    />

    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 22 }}>
      <KpiCard title="Licencias activas" value="38" sub="892 días/hombre"/>
      <KpiCard title="Aprobadas Compin" value="24" sub="Recuperación 100%"/>
      <KpiCard title="En tramitación" value="9" sub="Esperando resolución" valueColor="#D97706" accent="#f0a026"/>
      <KpiCard title="Rechazadas" value="5" sub="Descuento al funcionario" accent="#DC2626"/>
    </div>

    <Card title="Registro de licencias">
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead><tr style={{ background: "#F8FAFC" }}>
          {["Folio", "Funcionario", "Tipo", "Días", "Período", "Subsidio", "Estado"].map(h =>
            <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#94A3B8", borderBottom: "2px solid #E2E8F0" }}>{h}</th>)}
        </tr></thead>
        <tbody>
          {lic.map(l => (
            <tr key={l.id}>
              <td style={{ padding: "12px", borderBottom: "1px solid #F1F5F9", fontFamily: "JetBrains Mono, monospace", fontWeight: 700, color: "#1960a6" }}>{l.id}</td>
              <td style={{ padding: "12px", borderBottom: "1px solid #F1F5F9" }}>
                <div style={{ fontWeight: 600, color: "#0A1628" }}>{l.n}</div>
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#94A3B8" }}>{l.rut}</div>
              </td>
              <td style={{ padding: "12px", borderBottom: "1px solid #F1F5F9", color: "#475569" }}>{l.tipo}</td>
              <td style={{ padding: "12px", borderBottom: "1px solid #F1F5F9", fontWeight: 700, color: "#0A1628" }}>{l.dias}d</td>
              <td style={{ padding: "12px", borderBottom: "1px solid #F1F5F9", color: "#475569", fontSize: 12 }}>{l.desde} → {l.hasta}</td>
              <td style={{ padding: "12px", borderBottom: "1px solid #F1F5F9", fontWeight: 600, color: l.monto > 0 ? "#047857" : "#94A3B8", fontFeatureSettings: '"tnum" 1' }}>{l.monto > 0 ? fmtCL(l.monto) : "—"}</td>
              <td style={{ padding: "12px", borderBottom: "1px solid #F1F5F9" }}>
                <Badge tone={l.estado.includes("Aprobada") ? "green" : l.estado === "Rechazada" ? "red" : "gold"}>{l.estado}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  </div>;
};

// ─────────────────────────────────────────────────────────────
// 6) CAPACITACIÓN (Cursos / SENCE)
// ─────────────────────────────────────────────────────────────
const CapacitacionScreen = () => {
  const cursos = [
    { name: "Atención al usuario en APS", facil: "Comf. Nacional", h: 16, fecha: "20–22 May", inscritos: 24, cupos: 30, ptos: 4, sence: true },
    { name: "Manejo seguro pacientes crónicos", facil: "Mutual ACHS", h: 8, fecha: "27 May", inscritos: 18, cupos: 20, ptos: 2, sence: false },
    { name: "Excel intermedio para RH", facil: "Aethon Academy", h: 12, fecha: "03–05 Jun", inscritos: 32, cupos: 40, ptos: 3, sence: true },
    { name: "Estatuto APS 19.378 — actualización", facil: "Asoc. Munic.", h: 24, fecha: "10–14 Jun", inscritos: 41, cupos: 50, ptos: 6, sence: true },
  ];

  return <div style={{ padding: "24px 28px", flex: 1, overflow: "auto" }}>
    <PageHeader
      eyebrow="Plan anual 2026"
      title="Capacitación y desarrollo"
      sub="Cursos internos, SENCE y certificaciones que suman puntaje a la carrera funcionaria APS."
      right={<>
        <Button variant="secondary" icon="download">Detalle SENCE</Button>
        <Button variant="primary" icon="plus">Nuevo curso</Button>
      </>}
    />

    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 22 }}>
      <KpiCard title="Cursos activos" value="14" sub="6 SENCE · 8 internos"/>
      <KpiCard title="Funcionarios capacitados" value="287" sub="34% del personal"/>
      <KpiCard title="Horas comprometidas" value="3.847" sub="Plan anual 2026"/>
      <KpiCard title="Franquicia SENCE 2026" value="$12.4M" sub="$8.1M ejecutado · 65%" accent="#7C3AED"/>
    </div>

    <Card title="Programa del trimestre">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
        {cursos.map(c => (
          <div key={c.name} style={{ background: "#fff", border: "1.5px solid #E2E8F0", borderRadius: 12, padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0A1628", marginBottom: 4 }}>{c.name}</div>
                <div style={{ fontSize: 12, color: "#475569" }}>{c.facil} · {c.h}h · {c.fecha}</div>
              </div>
              {c.sence && <Badge tone="purple">SENCE</Badge>}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#475569", marginBottom: 6 }}>
              <span>Inscritos {c.inscritos}/{c.cupos}</span>
              <span style={{ color: "#7C3AED", fontWeight: 700 }}>+{c.ptos} pts APS</span>
            </div>
            <div style={{ height: 6, background: "#F1F5F9", borderRadius: 9999, overflow: "hidden", marginBottom: 12 }}>
              <div style={{ width: `${(c.inscritos / c.cupos) * 100}%`, height: "100%", background: "#2563EB", borderRadius: 9999 }}/>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Button variant="secondary" size="sm">Ver detalle</Button>
              <Button variant="primary" size="sm">Gestionar inscritos</Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  </div>;
};

// ─────────────────────────────────────────────────────────────
// 7) BIENESTAR
// ─────────────────────────────────────────────────────────────
const BienestarScreen = () => (
  <div style={{ padding: "24px 28px", flex: 1, overflow: "auto" }}>
    <PageHeader
      eyebrow="Caja Bienestar de Salud"
      title="Bienestar"
      sub="Aportes, beneficios y reembolsos del sistema de bienestar institucional."
      right={<><Button variant="secondary" icon="download">Estado de cuenta</Button><Button variant="primary" icon="plus">Solicitar reembolso</Button></>}
    />

    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 22 }}>
      <KpiCard title="Afiliados activos" value="612" sub="72% del personal"/>
      <KpiCard title="Aporte mensual" value="$8.4M" sub="0.92% imponible"/>
      <KpiCard title="Reembolsos este mes" value="142" sub="$3.2M pagados"/>
      <KpiCard title="Disponible fondo" value="$48.7M" sub="Saldo al 30/04" accent="#f0a026"/>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16 }}>
      <Card title="Beneficios disponibles">
        {[
          { icon: "pulse", t: "Reembolso médico", d: "Hasta 80% de copago / consultas / exámenes", monto: "Tope $180.000/mes" },
          { icon: "book", t: "Beca escolar hijos", d: "Educación básica, media y superior", monto: "$60.000–$240.000" },
          { icon: "gift", t: "Aguinaldos y bonos", d: "Fiestas Patrias, Navidad, día del trabajador", monto: "$120.000 c/u" },
          { icon: "palmtree", t: "Préstamos sociales", d: "Hasta 6 meses sueldo · 0% interés", monto: "Cuotas hasta 24 meses" },
          { icon: "award", t: "Día libre de cumpleaños", d: "Tomable hasta 30 días posteriores", monto: "1 día/año" },
        ].map(b => (
          <div key={b.t} style={{ display: "flex", gap: 14, padding: "14px 0", borderBottom: "1px solid #F1F5F9" }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "#EFF6FF", color: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name={b.icon} size={20}/></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: "#0A1628" }}>{b.t}</div>
              <div style={{ fontSize: 12.5, color: "#475569", marginTop: 2 }}>{b.d}</div>
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#7C3AED", whiteSpace: "nowrap" }}>{b.monto}</div>
          </div>
        ))}
      </Card>

      <Card title="Mis solicitudes recientes">
        {[
          { id: "R-8472", t: "Reembolso médico", monto: 84500, estado: "Aprobado", fecha: "04-05" },
          { id: "R-8418", t: "Beca escolar Sofía", monto: 180000, estado: "En revisión", fecha: "02-05" },
          { id: "R-8392", t: "Préstamo personal", monto: 1200000, estado: "Aprobado", fecha: "28-04" },
          { id: "R-8347", t: "Reembolso óptica", monto: 65300, estado: "Pagado", fecha: "22-04" },
        ].map(s => (
          <div key={s.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #F1F5F9" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#0A1628" }}>{s.t}</div>
              <div style={{ fontSize: 11, color: "#94A3B8", fontFamily: "JetBrains Mono, monospace" }}>{s.id} · {s.fecha}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#0A1628", fontFeatureSettings: '"tnum" 1' }}>{fmtCL(s.monto)}</div>
              <Badge tone={s.estado === "Pagado" || s.estado === "Aprobado" ? "green" : "gold"}>{s.estado}</Badge>
            </div>
          </div>
        ))}
      </Card>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────
// 8) ASISTENTE IA (chat)
// ─────────────────────────────────────────────────────────────
const IAChatScreen = () => {
  const messages = [
    { role: "user", text: "¿Cuándo cambio de nivel? Soy técnico C-7." },
    { role: "ai", text: "Patricia, según la Ley 19.378 tu próximo cambio es el **12 de agosto de 2026**, cuando completas 18 años de servicio (bienio 9). Ese día asciendes a **C-8**.\n\n**Estado actual de tu carrera funcionaria:**\n• Categoría C — Técnico de nivel superior\n• Nivel actual: 7 (desde 12-08-2024)\n• Bienios reconocidos: 8 (16 años)\n• Puntaje total acumulado: 38 pts (Exp 18 + Desemp 14 + Capac 6)\n• Para C-8 necesitas: 36 pts → ✅ ya cumplido\n\n¿Quieres que te genere el certificado de carrera funcionaria?" },
    { role: "user", text: "Sí, y también descarga mi ficha funcionaria." },
    { role: "ai", text: "Perfecto. Generé dos documentos:", attachments: [
      { type: "pdf", name: "Certificado_Carrera_Patricia_Gómez_2026.pdf", size: "184 KB" },
      { type: "pdf", name: "Ficha_Funcionaria_9583637-2.pdf", size: "247 KB" },
    ] },
  ];
  const sugerencias = [
    "¿Qué beneficios cubre el Bienestar de Salud?",
    "¿Cuál es el correo del depto. de Personas?",
    "¿Cuántos días de vacaciones me quedan?",
    "¿Cómo solicito un reembolso médico?",
  ];

  return <div style={{ padding: "24px 28px", flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
    <PageHeader
      eyebrow="Asistente IA · Claude Haiku"
      title="Pregunta lo que sea sobre tu situación funcionaria"
      sub="Contexto cargado: tu ficha, tu carrera APS, los reglamentos vigentes, beneficios de Bienestar y políticas internas."
    />

    <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 16, flex: 1, minHeight: 0 }}>
      <Card padding={0}>
        <div style={{ padding: "14px 20px", borderBottom: "1px solid #F1F5F9", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: 9999, background: "#047857" }}/>
          <span style={{ fontSize: 12.5, fontWeight: 600, color: "#0A1628" }}>Aethon IA · conectado</span>
          <span style={{ fontSize: 11, color: "#94A3B8", marginLeft: 6 }}>contexto: Patricia Gómez · C-7 · CESFAM Padre Las Casas</span>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "85%" }}>
              {m.role === "ai" && <div style={{ width: 32, height: 32, borderRadius: 9999, background: "#0A1628", color: "#f0a026", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontWeight: 800, fontSize: 12 }}>AE</div>}
              <div>
                <div style={{
                  background: m.role === "user" ? "#2563EB" : "#fff",
                  color: m.role === "user" ? "#fff" : "#0A1628",
                  border: m.role === "user" ? "none" : "1.5px solid #E2E8F0",
                  borderRadius: 14, borderTopLeftRadius: m.role === "ai" ? 4 : 14,
                  borderTopRightRadius: m.role === "user" ? 4 : 14,
                  padding: "12px 16px", fontSize: 13.5, lineHeight: 1.55,
                  whiteSpace: "pre-wrap",
                }}>{m.text.split("**").map((seg, j) => j % 2 === 1 ? <strong key={j}>{seg}</strong> : seg)}</div>
                {m.attachments && <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
                  {m.attachments.map(a => (
                    <div key={a.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "#fff", border: "1.5px solid #E2E8F0", borderRadius: 10, cursor: "pointer" }}>
                      <div style={{ width: 32, height: 32, borderRadius: 6, background: "#FEE2E2", color: "#991B1B", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>PDF</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12.5, fontWeight: 600, color: "#0A1628" }}>{a.name}</div>
                        <div style={{ fontSize: 11, color: "#94A3B8" }}>{a.size}</div>
                      </div>
                      <Icon name="download" size={16} color="#475569"/>
                    </div>
                  ))}
                </div>}
              </div>
              {m.role === "user" && <div style={{ width: 32, height: 32, borderRadius: 9999, background: "#0A1628", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontWeight: 700, fontSize: 11 }}>PG</div>}
            </div>
          ))}
        </div>

        <div style={{ padding: "14px 20px", borderTop: "1px solid #F1F5F9" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
            {sugerencias.map(s => (
              <button key={s} style={{ padding: "5px 11px", fontSize: 11.5, borderRadius: 9999, border: "1.5px solid #E2E8F0", background: "#fff", color: "#475569", cursor: "pointer", fontFamily: "Inter, sans-serif" }}>{s}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", border: "1.5px solid #E2E8F0", borderRadius: 12, padding: "8px 8px 8px 14px", background: "#F8FAFC" }}>
            <input placeholder="Escribe tu pregunta…" style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 13.5, fontFamily: "Inter, sans-serif", color: "#0A1628" }}/>
            <button style={{ width: 34, height: 34, border: "none", borderRadius: 8, background: "#2563EB", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="arrow" size={16} color="#fff"/></button>
          </div>
        </div>
      </Card>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Card title="Acciones rápidas">
          {[
            ["Ver mi ficha funcionaria", "user"],
            ["Mi última liquidación", "receipt"],
            ["Solicitar feriado", "palmtree"],
            ["Subir licencia médica", "upload"],
            ["Beneficios Bienestar", "gift"],
          ].map(([l, ic]) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, cursor: "pointer", margin: "0 -6px" }}>
              <Icon name={ic} size={15} color="#2563EB"/>
              <span style={{ fontSize: 13, color: "#0A1628", fontWeight: 500 }}>{l}</span>
              <div style={{ flex: 1 }}/>
              <Icon name="chevron" size={13} color="#94A3B8"/>
            </div>
          ))}
        </Card>
        <div style={{ background: "#0A1628", color: "#fff", borderRadius: 12, padding: 18, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -30, right: -30, width: 140, height: 140, borderRadius: "50%", background: "radial-gradient(circle, rgba(240,160,38,.18) 0%, transparent 70%)" }}/>
          <div style={{ position: "relative" }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "#f0a026", marginBottom: 8 }}>Privacidad</div>
            <div style={{ fontSize: 12.5, lineHeight: 1.55, color: "rgba(255,255,255,.78)" }}>El asistente solo accede a tus datos personales. No comparte información entre funcionarios.</div>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

// ─────────────────────────────────────────────────────────────
// 9) CONTRATOS (lista)
// ─────────────────────────────────────────────────────────────
const ContratosScreen = () => {
  const contratos = [
    { id: "CT-2024-0387", n: "Patricia Gómez", tipo: "Indefinido APS", inicio: "12-03-2019", venc: "—", est: "Vigente" },
    { id: "CT-2026-0042", n: "Daniela Riquelme", tipo: "Honorarios", inicio: "01-04-2026", venc: "30-06-2026", est: "Vigente" },
    { id: "CT-2025-0218", n: "Andrés Pinto", tipo: "Plazo fijo", inicio: "01-08-2025", venc: "31-05-2026", est: "Por vencer" },
    { id: "CT-2024-0492", n: "Roberto Núñez", tipo: "Indefinido APS", inicio: "05-06-2018", venc: "—", est: "Vigente" },
    { id: "CT-2026-0011", n: "Camila Reyes", tipo: "Honorarios", inicio: "01-02-2026", venc: "31-12-2026", est: "Vigente" },
    { id: "CT-2025-0089", n: "Sofía Andrade", tipo: "Reemplazo licencia", inicio: "20-04-2025", venc: "20-05-2026", est: "Por vencer" },
  ];

  return <div style={{ padding: "24px 28px", flex: 1, overflow: "auto" }}>
    <PageHeader
      eyebrow="Centro documental"
      title="Contratos"
      sub="Indefinidos, plazo fijo, honorarios y reemplazos. Generación automática de PDF y firma electrónica avanzada."
      right={<>
        <Button variant="secondary" icon="filter">Filtros</Button>
        <Button variant="primary" icon="plus">Nuevo contrato</Button>
      </>}
    />

    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 22 }}>
      <KpiCard title="Total vigentes" value="847" sub="612 indef. · 235 otros"/>
      <KpiCard title="Por vencer 30 días" value="12" sub="Renovación o término" valueColor="#D97706" accent="#f0a026"/>
      <KpiCard title="Firmados este mes" value="18" sub="100% firma electrónica"/>
      <KpiCard title="Anexos pendientes" value="7" sub="Esperando firma"/>
    </div>

    <Card>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead><tr style={{ background: "#F8FAFC" }}>
          {["Folio", "Funcionario", "Tipo", "Inicio", "Vencimiento", "Estado", ""].map(h =>
            <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#94A3B8", borderBottom: "2px solid #E2E8F0" }}>{h}</th>)}
        </tr></thead>
        <tbody>
          {contratos.map(c => (
            <tr key={c.id}>
              <td style={{ padding: "12px", borderBottom: "1px solid #F1F5F9", fontFamily: "JetBrains Mono, monospace", fontWeight: 700, color: "#1960a6" }}>{c.id}</td>
              <td style={{ padding: "12px", borderBottom: "1px solid #F1F5F9", fontWeight: 600, color: "#0A1628" }}>{c.n}</td>
              <td style={{ padding: "12px", borderBottom: "1px solid #F1F5F9" }}>
                <Badge tone={c.tipo.includes("APS") ? "purple" : c.tipo === "Honorarios" ? "blue" : c.tipo.includes("fijo") ? "gold" : "slate"}>{c.tipo}</Badge>
              </td>
              <td style={{ padding: "12px", borderBottom: "1px solid #F1F5F9", color: "#475569", fontFamily: "JetBrains Mono, monospace", fontSize: 12 }}>{c.inicio}</td>
              <td style={{ padding: "12px", borderBottom: "1px solid #F1F5F9", color: "#475569", fontFamily: "JetBrains Mono, monospace", fontSize: 12 }}>{c.venc}</td>
              <td style={{ padding: "12px", borderBottom: "1px solid #F1F5F9" }}>
                <Badge tone={c.est === "Vigente" ? "green" : "gold"}>{c.est}</Badge>
              </td>
              <td style={{ padding: "12px", borderBottom: "1px solid #F1F5F9", textAlign: "right" }}>
                <div style={{ display: "inline-flex", gap: 6 }}>
                  <button style={{ background: "transparent", border: "none", padding: 6, cursor: "pointer", color: "#475569", borderRadius: 6 }}><Icon name="download" size={15}/></button>
                  <button style={{ background: "transparent", border: "none", padding: 6, cursor: "pointer", color: "#475569", borderRadius: 6 }}><Icon name="edit" size={15}/></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  </div>;
};

// ─────────────────────────────────────────────────────────────
// 10) ASISTENCIA (marcaje)
// ─────────────────────────────────────────────────────────────
const AsistenciaScreen = () => {
  const turnos = [
    { n: "Patricia Gómez A.", entrada: "08:02", salida: "17:04", h: "9:02", est: "OK", color: "#047857" },
    { n: "Carlos Mendoza S.", entrada: "08:14", salida: "—", h: "—", est: "Atraso 14′", color: "#D97706" },
    { n: "María José F.", entrada: "—", salida: "—", h: "—", est: "Feriado", color: "#7C3AED" },
    { n: "Roberto Núñez", entrada: "07:58", salida: "17:01", h: "9:03", est: "OK", color: "#047857" },
    { n: "Ana B. Castillo", entrada: "—", salida: "—", h: "—", est: "Licencia médica", color: "#DC2626" },
    { n: "Jorge Pavez O.", entrada: "08:00", salida: "13:00", h: "5:00", est: "Media jornada", color: "#1960a6" },
  ];

  return <div style={{ padding: "24px 28px", flex: 1, overflow: "auto" }}>
    <PageHeader
      eyebrow="Hoy · 06 May 2026"
      title="Asistencia y marcaje"
      sub="Reloj control biométrico + app móvil. Conciliación automática con liquidaciones."
      right={<>
        <Button variant="secondary" icon="download">Reporte semana</Button>
        <Button variant="primary" icon="check">Cerrar día</Button>
      </>}
    />

    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 22 }}>
      <KpiCard title="Marcajes hoy" value="789 / 847" sub="93% asistencia"/>
      <KpiCard title="Atrasos" value="12" sub="Más de 10 min" valueColor="#D97706" accent="#f0a026"/>
      <KpiCard title="Ausentes" value="34" sub="Feriado, licencia o falta"/>
      <KpiCard title="Horas extra acumuladas" value="284h" sub="Mes en curso" accent="#7C3AED"/>
    </div>

    <Card title="Marcaje del día · CESFAM Padre Las Casas">
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead><tr style={{ background: "#F8FAFC" }}>
          {["Funcionario", "Entrada", "Salida", "Horas", "Estado"].map(h =>
            <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#94A3B8", borderBottom: "2px solid #E2E8F0" }}>{h}</th>)}
        </tr></thead>
        <tbody>
          {turnos.map(t => (
            <tr key={t.n}>
              <td style={{ padding: "12px", borderBottom: "1px solid #F1F5F9", fontWeight: 600, color: "#0A1628" }}>{t.n}</td>
              <td style={{ padding: "12px", borderBottom: "1px solid #F1F5F9", fontFamily: "JetBrains Mono, monospace", fontWeight: 600, color: t.entrada !== "—" ? "#0A1628" : "#94A3B8" }}>{t.entrada}</td>
              <td style={{ padding: "12px", borderBottom: "1px solid #F1F5F9", fontFamily: "JetBrains Mono, monospace", fontWeight: 600, color: t.salida !== "—" ? "#0A1628" : "#94A3B8" }}>{t.salida}</td>
              <td style={{ padding: "12px", borderBottom: "1px solid #F1F5F9", fontFamily: "JetBrains Mono, monospace", fontWeight: 700, color: "#0A1628" }}>{t.h}</td>
              <td style={{ padding: "12px", borderBottom: "1px solid #F1F5F9" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 10px", borderRadius: 9999, background: t.color + "1a", color: t.color, fontSize: 12, fontWeight: 600 }}>
                  <span style={{ width: 6, height: 6, borderRadius: 9999, background: t.color }}/>{t.est}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  </div>;
};

// ─────────────────────────────────────────────────────────────
// 11) EVALUACIÓN DESEMPEÑO
// ─────────────────────────────────────────────────────────────
const EvaluacionScreen = () => (
  <div style={{ padding: "24px 28px", flex: 1, overflow: "auto" }}>
    <PageHeader
      eyebrow="Ciclo 2026"
      title="Evaluación de desempeño"
      sub="Calificación anual obligatoria para Ley 19.378. Suma puntos para la carrera funcionaria."
      right={<><Button variant="secondary" icon="download">Acta consolidada</Button><Button variant="primary" icon="plus">Iniciar ciclo</Button></>}
    />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 22 }}>
      <KpiCard title="Evaluaciones completadas" value="612 / 847" sub="72% del personal"/>
      <KpiCard title="Lista 1 (Distinción)" value="184" sub="22% · ≥ 6.5"/>
      <KpiCard title="Lista 2 (Buena)" value="392" sub="46% · 5.5–6.4"/>
      <KpiCard title="Lista 4 (Eliminación)" value="2" sub="Notificación legal" valueColor="#DC2626" accent="#DC2626"/>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <Card title="Distribución de notas">
        {[
          { l: "Lista 1 — Distinción (6.5–7.0)", v: 184, p: 22, c: "#047857" },
          { l: "Lista 2 — Buena (5.5–6.4)", v: 392, p: 46, c: "#2563EB" },
          { l: "Lista 3 — Condicional (3.0–5.4)", v: 34, p: 4, c: "#D97706" },
          { l: "Lista 4 — Eliminación (<3.0)", v: 2, p: 0.2, c: "#DC2626" },
          { l: "Pendientes", v: 235, p: 28, c: "#94A3B8" },
        ].map(r => (
          <div key={r.l} style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 4 }}>
              <span style={{ color: "#475569" }}>{r.l}</span>
              <span style={{ color: "#0A1628", fontWeight: 700 }}>{r.v} <span style={{ color: "#94A3B8", fontWeight: 400 }}>· {r.p}%</span></span>
            </div>
            <div style={{ height: 8, background: "#F1F5F9", borderRadius: 9999, overflow: "hidden" }}>
              <div style={{ width: `${r.p}%`, height: "100%", background: r.c, borderRadius: 9999 }}/>
            </div>
          </div>
        ))}
      </Card>

      <Card title="Cierre del ciclo · pasos">
        {[
          { n: 1, t: "Auto-evaluación funcionarios", d: "847/847 completadas", ok: true },
          { n: 2, t: "Pre-calificación jefatura directa", d: "612/847 · 72%", ok: false, prog: 72 },
          { n: 3, t: "Junta calificadora", d: "Programada 18-jun-2026", ok: false },
          { n: 4, t: "Notificación a funcionarios", d: "Pendiente — paso 3", ok: false },
          { n: 5, t: "Apelaciones (15 días)", d: "Bloqueado", ok: false },
          { n: 6, t: "Cierre y registro APS", d: "Pendiente", ok: false },
        ].map(s => (
          <div key={s.n} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: "1px solid #F1F5F9" }}>
            <div style={{ width: 28, height: 28, borderRadius: 9999, background: s.ok ? "#047857" : "#F1F5F9", color: s.ok ? "#fff" : "#475569", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
              {s.ok ? <Icon name="check" size={14} color="#fff"/> : s.n}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#0A1628" }}>{s.t}</div>
              <div style={{ fontSize: 12, color: "#475569", marginTop: 2 }}>{s.d}</div>
              {s.prog && <div style={{ height: 4, background: "#F1F5F9", borderRadius: 9999, overflow: "hidden", marginTop: 6 }}>
                <div style={{ width: `${s.prog}%`, height: "100%", background: "#2563EB", borderRadius: 9999 }}/>
              </div>}
            </div>
          </div>
        ))}
      </Card>
    </div>
  </div>
);

Object.assign(window, {
  APSScreen, HonorariosScreen, NuevoFuncionarioScreen, VacacionesScreen,
  LicenciasScreen, CapacitacionScreen, BienestarScreen, IAChatScreen,
  ContratosScreen, AsistenciaScreen, EvaluacionScreen,
});
