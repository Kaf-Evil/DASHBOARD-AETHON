# Aethon Design System

> Aethon — El RH del futuro, disponible hoy.

## What is Aethon?

Aethon is the operating system for HR teams in México and Chile. It builds **automation, AI, and web applications exclusively for Human Resources** — including the only integrated solution for **Ley 19.378** (the Chilean public-health municipal HR law).

**Tagline:** Automatización · IA · Aplicaciones · Cursos — para Recursos Humanos.

**Pitch (30s):** "Construyo automatización e inteligencia artificial exclusivamente para áreas de Recursos Humanos en México y Chile. Mis clientes pasan de procesar nóminas manuales en Excel a sistemas que se ejecutan solos, con un 0.3% de margen de error."

### Mission
Convertimos procesos manuales de RH en sistemas inteligentes, sin código y sin fricción — para que los equipos de personas dejen de operar planillas y vuelvan a trabajar en personas.

### Vision
Que ningún profesional de RH vuelva a perder una hora en tareas que una máquina puede hacer en segundos.

### Values
1. **Resultados medibles** — Si no se puede medir, no lo vendemos.
2. **Sin código, sin fricción** — Si requiere un manual de 50 páginas, lo hicimos mal.
3. **Especialización profunda** — Ley 19.378, nómina IMSS, ciclo real de RH.
4. **Transferencia de conocimiento** — No queremos que dependan de nosotros para siempre.
5. **Datos primero, opinión después** — Dashboards, no intuición de pasillo.

---

## Sources

This design system was built from a brand book authored in Spanish:

- `assets/brand-guidelines.html` — full **Política de Marca · 2026** (logo policy, color, type, components, radius, shadows, iconography, do/don't, voice & tone, sample applications). Original filename: `marca-aethon.html`.
- `assets/logo-variants.html` — five SVG logo lockups (color on white, mono on light, white+gold on navy, blue+gold on navy, gold on black). Original filename: `logos-svg.html`.

No codebase or Figma file was provided. UI patterns shown in this system are derived directly from those two HTML reference documents (which include working examples of buttons, cards, sidebar, KPIs, badges, tables, etc.).

---

## Content Fundamentals

**Languages.** Spanish (Chile / México) is primary. English is reserved for technical labels (`KPI`, `Dashboard`) and code identifiers.

**Voice.** Direct, technical, confident — never casual. Aethon is the voice of an experienced HR engineer talking to other operators who already know the pain. Avoids buzzwords ("transformación digital" lands; "leverage synergies" never).

**Person.** First-person plural for company-side ("Construimos", "Diseñamos"). Second-person singular **"tú"** when addressing the customer ("Si tu equipo de RH pierde más de 10 horas a la semana…"). Never *usted* — too formal for the SaaS register.

**Casing.** **AETHON** in all caps when used as a wordmark or heading. "Aethon" sentence-case in body. Headings use sentence case ("Sistema de Remuneraciones"), not title case. Section eyebrows are ALL CAPS with letter-spacing (e.g. `01 · IDENTIDAD`).

**Numbers.** Use Chilean/Mexican decimal conventions where relevant (`$2.847.320`, `0,3%` — though the brand book mixes `.` and `,`). Always tabular figures (`font-feature-settings: "tnum"`) for KPIs and tables.

**Concrete > abstract.** Copy is anchored in real artifacts: "847 funcionarios", "Período Mayo 2026", "RUT 9.583.637-2", "0.3% margen de error", "10 horas a la semana". Avoid vague claims.

**Domain vocabulary** (used unapologetically — these are signals of expertise):
- *Ley 19.378* (Estatuto APS — Atención Primaria de Salud)
- *Liquidación*, *haberes*, *descuentos*, *imponible*
- *Funcionario* (public sector) vs. *colaborador* / *trabajador* (private)
- *AFP, Salud, Impuesto Único, IMSS*
- *Período* (always YYYYMM format, e.g. `202605`)
- *Corporación municipal*, *HRIS*, *nómina*

**Emoji.** Used **sparingly** in pitch / outreach material (🎯 🌟 💎 in the founding doc), **never inside the product UI**. Don't pepper marketing pages with emoji; they're acceptable as section anchors in a strategic doc.

**Don't.**
- Don't say "powered by AI" — say what the AI does ("clasifica licencias médicas en segundos").
- Don't promise outcomes you can't measure.
- Don't translate technical English on a dogma — `dashboard`, `pipeline`, `webhook` stay in English when that's what the audience uses.

---

## Visual Foundations

**Overall vibe.** Enterprise SaaS, but with a Chilean-public-sector seriousness — closer to a financial app than a startup. Heavy navy. Confident gold accents. Lots of whitespace. **No** purple gradients, **no** illustration-driven hero blocks, **no** glassmorphism, **no** rainbow data viz.

**Color.**
- Three identity colors come **straight from the logo**: `#0A1628` Deep Navy, `#1960A6` Brand Blue, `#F0A026` Gold.
- A blue UI scale (`aethon-50…900`) drives interactive states; `aethon-500 #2563EB` is the action blue (lighter than logo blue — important distinction).
- Slate neutrals (`50…800`) for text and surfaces. The app background is `slate-50 #F8FAFC` — never pure white.
- Semantic states are flat (no gradients): success `#059669`, danger `#DC2626`, warning `#D97706`, purple `#7C3AED` (purple is reserved for **Ley 19.378** categorization specifically — this is meaningful, not decorative).

**Typography.** **Inter only.** The full weight range is licensed (300/400/500/600/700/800/900). Monospace is **JetBrains Mono** for hex values, RUTs, and tabular numbers.

**Spacing.** 4px base grid (Tailwind-aligned). Most card padding is 20–24px; section spacing is 36–80px.

**Radius.** Generous. Buttons & inputs `8px`, cards `12px`, modals/login `16px`, hero/cover blocks `20px`. Pills/avatars use `9999px`.

**Backgrounds.** Solid colors, almost always. The brand cover block uses **two soft radial-gradient orbs** (one blue, one gold) on the navy hero — this is the *one* sanctioned gradient pattern. No full-bleed photography. No textures. No noise/grain.

**Borders.** Cards use `1.5px` borders in `slate-200` plus a tiny `shadow-base`. Strong borders only when emphasized (e.g. selected state, error state). Border-color shifts to `aethon-500` on focus, with a 3px translucent ring.

**Shadows.**
- `sm` for table rows
- `base` for KPI cards (default)
- `md` for dropdowns / popovers
- `lg` for sidebar / sticky nav
- `2xl` for modals / login card
No colored shadows. No inner shadows.

**Hover states.** Buttons darken (`aethon-500 → aethon-700` on primary). Cards get a subtle lift (`shadow-base → shadow-md`) and the border shifts to `slate-300`. Links pick up underline on hover.

**Press states.** Buttons compress slightly (`transform: translateY(1px)` or `scale(0.98)`). No color flash.

**Focus.** `box-shadow: 0 0 0 3px rgba(37,99,235,.18)` plus `border-color: aethon-500`. Always visible — accessibility-first.

**Animation.** Minimal and purposeful. `ease-out` 150–200ms transitions on hover/focus/state. No bounces, no spring physics, no loading shimmer for shimmer's sake. Page-level transitions are quick fades.

**Transparency / blur.** Reserved for the navy hero radial orbs and modal backdrops (`rgba(10,22,40,.6)` + `backdrop-filter: blur(8px)`). Don't use blur on UI cards.

**Imagery.** When used, **cool-toned** to match the navy/blue palette. Black-and-white portraits with a subtle blue tint are acceptable for case studies. No warm sunset stock photography. Most surfaces have **no imagery at all** — data and typography do the work.

**Layout.**
- Sidebar is fixed (`220px`), navy `#0A1628`, white type. Sidebar group labels are tiny ALL-CAPS in `rgba(255,255,255,.3)`.
- Top app surface is `slate-50` with cards floating on it.
- Page containers max-width `960–1280px`, 24px gutters.
- Generous section breathing room (80px between major sections in marketing/policy docs; 32–40px in app views).

**Card anatomy.** White surface, `1.5px` `slate-200` border, `border-radius: 12px`, `shadow-base`, internal padding `20px`. Optional 3px left-border accent (gold or warning) for emphasized rows — this is the *only* sanctioned use of the "left-stripe accent" pattern.

---

## Iconography

**System.** Outline / stroke icons. **Lucide** or **Heroicons (outline)** are the sanctioned libraries. Stroke width **1.8–2px**. `stroke-linecap: round`, `stroke-linejoin: round`. Standard size **20×20px** (`w-5 h-5`). Color inherits from text color in most contexts (`currentColor`); active sidebar items get white, brand links get `--logo-blue`.

**Substitution flag.** No bundled icon font/sprite was provided in the source materials. The brand book references "Heroicons or Lucide" as a reference set. **This design system links Lucide via CDN** (`https://unpkg.com/lucide@latest`) — substitute for any missing icons. **Flagged for the user**: confirm Lucide vs. Heroicons preference, and provide an SVG sprite sheet if there's an internal one.

**Emoji.** Not used in product UI. Acceptable in pitch / strategic documents only.

**Unicode glyphs.** Used as bullets / dividers (e.g. `·` in section eyebrows: `01 · IDENTIDAD`). This is a recurring brand tic — preserve it.

**Logos.** SVG only. Five sanctioned variants (`assets/logo-variants.html`):
1. Color complete on white (default)
2. Monochrome blue on light
3. White + gold on navy ⭐ (used in sidebar, login)
4. Blue + gold on navy
5. Gold on black

Files: `assets/aethon-logo.svg` (color-on-white), `assets/aethon-logo-light.svg` (white+gold for dark surfaces).

---

## Index

| File | Purpose |
|---|---|
| `colors_and_type.css` | Tokens + base typography (semantic CSS vars) |
| `assets/aethon-logo.svg` | Color logo for light surfaces |
| `assets/aethon-logo-light.svg` | White+gold logo for navy/dark surfaces |
| `assets/brand-guidelines.html` | Source of truth: full brand book |
| `assets/logo-variants.html` | All five sanctioned logo lockups |
| `preview/*.html` | Cards rendered in the Design System tab |
| `ui_kits/aethon-app/` | High-fidelity recreation of the Aethon HR application |
| `SKILL.md` | Skill manifest for Claude / Claude Code |

---

## Open questions / things to flag

- **Icon library**: Heroicons (outline) and Lucide are both referenced as "use either". Pin one.
- **Spanish locale** for numbers: confirm `$2.847.320` (Chilean) vs. `$2,847,320` (Mexican).
- **Inter** is loaded via Google Fonts CDN. If you need offline / brand-locked weights, drop the WOFF2 files into `fonts/`.
- **No real product screenshots / Figma file** were provided — the UI kit is built from the patterns in the brand book itself.
