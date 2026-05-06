# Aethon App — UI Kit

High-fidelity recreation of the Aethon HR application: a dual-régimen payroll & people platform (Código del Trabajo + Ley 19.378 / APS).

## Screens
- **Login** — navy hero left, login form right
- **Dashboard** — KPI cards + período summary + recent liquidaciones
- **Liquidaciones** — period selector, table of funcionarios with haberes/descuentos
- **Funcionario detail** — RUT, contract, AFP, salud, history

## Components
- `Sidebar.jsx` — fixed navy nav with logo and grouped sections
- `Topbar.jsx` — period selector, search, user menu
- `Button.jsx` — primary / secondary / navy / gold / danger / ghost
- `Badge.jsx` — Activo / APS / Pagado / Ley 19.378 / Vencido
- `KpiCard.jsx` — title + value + delta + optional accent stripe
- `DataTable.jsx` — funcionarios / liquidaciones table
- `Input.jsx` — labeled input with focus ring
- `Icon.jsx` — Lucide-style stroke icons (1.8px)

## Disclaimer
No real product code or Figma was provided — this kit is reconstructed from the **brand guidelines** (`assets/brand-guidelines.html`). Some functional flows (auth, real data fetch) are stubbed.

Open `index.html` to see the click-through prototype.
