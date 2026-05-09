# CLAUDE.md — Aethon Landing Page

## Proyecto

**Aethon** — consultora de automatización, IA y apps para RR.HH. (México y Chile).
Fundador: Francisco Moreno (`francisco@aethon.mx`, GitHub: `Kaf-Evil`).

**Producto:** Landing page estática en producción → `https://www.aethon.mx`
**Objetivo:** Capturar leads vía formulario (diagnóstico 30 min gratuito).
**Principio rector:** Costo cero o mínimo. Etapa temprana. Priorizar rapidez de implementación.

---

## Arquitectura — restricciones críticas

- **Sin backend. Sin base de datos. Sin framework.** HTML + CSS inline + JS vanilla.
- Todo el sitio vive en un único archivo: `landing/index.html`
- No introducir frameworks (React, Vue, Next.js) sin discutirlo primero
- No agregar dependencias npm sin necesidad explícita
- El CSS va inline en `<style>` dentro del `index.html`
- El JS va inline en `<script>` al final del `index.html`

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | HTML5 + CSS3 + JS vanilla (todo en `landing/index.html`) |
| Hosting | Vercel · equipo `aethon1` · proyecto `dashboard-aethon` |
| Repo | GitHub `Kaf-Evil/DASHBOARD-AETHON` · rama `main` |
| Dominio | `aethon.mx` (registrado Hostinger, NS en Vercel) |
| Formulario | Web3Forms free · key `49638dcd-da50-4679-bc5b-64b67d523621` |
| Correo | Hostinger Email · `francisco@aethon.mx` |
| Analytics | Google Analytics GA4 · ID `G-7GSB5VWKKW` |
| Calendario | Calendly · `calendly.com/fjavier-morc/30min` |
| CLI local | `gh` en `~/bin/gh` · `vercel` vía npm global |

---

## Estructura de archivos

```
LANDINGPAGE/
├── landing/index.html        ← ARCHIVO PRINCIPAL — única fuente de verdad del sitio
├── assets/
│   ├── aethon-logo.svg       ← referenciado como ../assets/ desde landing/
│   ├── aethon-logo-light.svg
│   ├── founder-photo.jpg
│   └── og-image.jpg          ← og:image de marca 1200×630 px (Canva)
├── sitemap.xml               ← indexado en Google Search Console
├── robots.txt
├── vercel.json               ← rewrites + redirect 301 + headers de seguridad
├── colors_and_type.css       ← design tokens de referencia (no usado en producción)
├── ui_kits/aethon-app/       ← componentes React (NO desplegados, referencia futura)
└── preview/                  ← previews del design system (no producción)
```

---

## Comandos esenciales

```bash
# Deploy ya NO es necesario manualmente — auto-deploy activo vía GitHub
# Basta con: git add ... && git commit -m "..." && git push origin main

# Verificar SEO tags en producción
curl -s https://www.aethon.mx | grep -E "og:|twitter:|description|canonical"

# Verificar SSL y headers en producción
curl -sI https://www.aethon.mx | grep -E "x-frame|content-security|strict-transport"

# Verificar sitemap
curl -s https://www.aethon.mx/sitemap.xml

# Consultar DNS
dig MX aethon.mx +short
dig TXT _dmarc.aethon.mx +short
```

---

## Infraestructura — estado actual (actualizado 8 mayo 2026)

### Deploy
- **Auto-deploy activo**: push a `main` en GitHub → Vercel despliega automáticamente (~30 seg)
- Ya no se usa `vercel deploy --prod` manualmente

### DNS (gestionado en Vercel)
- Nameservers: `ns1.vercel-dns.com` / `ns2.vercel-dns.com`
- `A @ → 76.76.21.21` · `CNAME www → cname.vercel-dns.com`
- `MX @ → mx1.hostinger.com (p5)` · `MX @ → mx2.hostinger.com (p10)`
- `TXT @ → v=spf1 include:_spf.mail.hostinger.com ~all`
- DKIM A/B/C ✅ · DMARC ✅

### SSL
- Certificado wildcard `*.aethon.mx` · Let's Encrypt · válido hasta 6 agosto 2026
- `https://aethon.mx` → 301 → `https://www.aethon.mx` ✅

### Correo
- `francisco@aethon.mx` funcional ✅ · MX ✅ · SPF ✅ · DKIM ✅ · DMARC ✅

### Headers de seguridad (en vercel.json)
- X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, HSTS
- CSP permite: Calendly, Google Analytics/Tag Manager, Web3Forms

---

## Analytics y SEO — estado completo (8 mayo 2026)

### Analítica
| Herramienta | Estado | Detalle |
|-------------|--------|---------|
| Vercel Analytics | ✅ activo | Script `/_vercel/insights/script.js` en `<head>` |
| Google Analytics GA4 | ✅ activo | ID `G-7GSB5VWKKW` · eventos: `generate_lead` (form) + `contact` (WhatsApp) |
| Google Search Console | ✅ verificado | Propiedad `https://www.aethon.mx` · método HTML tag |

### SEO técnico
| Elemento | Estado |
|----------|--------|
| Meta description | ✅ |
| Canonical URL | ✅ |
| Open Graph completo | ✅ og:image → `assets/og-image.jpg` (1200×630) |
| Twitter Card | ✅ summary_large_image |
| hreflang ES/EN/x-default | ✅ |
| Schema.org JSON-LD | ✅ ProfessionalService + 3 Course con precios |
| sitemap.xml | ✅ en producción · enviado a GSC |
| robots.txt | ✅ en producción |

---

## Landing — secciones implementadas

| Sección | Contenido clave |
|---------|----------------|
| Nav | Sticky · logo · links · toggle ES/EN · botón "Agendar" → Calendly popup |
| Hero | Título animado · demo chat APS (Patricia, CESFAM) · 3 stats reales |
| Mercados | Tabs: MX Privado / CL Privado / CL Salud Pública (Ley 19.378) |
| Chatbot showcase | 4 preguntas interactivas simuladas con respuestas estructuradas |
| Servicios | Grid 4 tarjetas: Automatización · IA · Apps web · Cursos |
| Cursos | 3 cursos · toggle CLP/USD/MXN · sin botón de compra aún (pendiente Hotmart) |
| Proceso | 4 pasos: Diagnóstico → Propuesta → Construcción → Transferencia |
| Founder | Foto · bio · credenciales · LinkedIn |
| CTA/Contacto | Formulario Web3Forms + WhatsApp + email |
| Footer | Copyright · email · LinkedIn personal · LinkedIn empresa |

### Cursos — precios actuales

| Curso | CLP | USD | MXN |
|-------|-----|-----|-----|
| Excel para nómina · Nivel 1 (3,5h · 4 mód.) | Gratis | Free | Gratis |
| Excel avanzado · KPIs RR.HH. (12h · 8 mód. · Cert.) | $10.000 | $11 | $199 |
| IA aplicada para RR.HH. (20h · 10 mód. · Cert.) | $15.000 | $16 | $299 |

Toggle de moneda implementado con JS vanilla — clase `.cur-btn` y atributos `data-clp/usd/mxn` en `.course-price`.

### Calendly
- URL: `calendly.com/fjavier-morc/30min`
- Implementado como popup via `Calendly.initPopupWidget()`
- Botones: nav "Agendar →" y hero "Agendar diagnóstico de 30 min →"
- Script cargado desde `assets.calendly.com` (async, en `<head>`)

### i18n
- Toggle ES/EN · `data-i18n` attributes · objeto `I18N = {es:{...}, en:{...}}` hardcodeado
- `applyI18n(lang)` recorre el DOM y asigna via `innerHTML` (seguro: datos estáticos)

### Formulario Web3Forms
- POST a `https://api.web3forms.com/submit`
- Destino: `francisco@aethon.mx` · Redirect post-submit: `https://www.aethon.mx`
- Spam filter Basic ✅ · Sin hCaptcha (requiere Pro)
- GA4 event `generate_lead` se dispara en submit

### Responsividad
- Breakpoints: `980px` · `880px` · `640px` (mobile completo)

### Contacto
- Email: `francisco@aethon.mx`
- WhatsApp: `+565225500682` ✅
- LinkedIn personal: `https://www.linkedin.com/in/franciscomorenocpo/`
- LinkedIn empresa: `https://linkedin.com/company/aethon`

---

## Decisiones de arquitectura tomadas

| Decisión | Motivo |
|----------|--------|
| HTML/CSS/JS vanilla | Cero build step, hosting gratuito, rapidez |
| Todo en `index.html` | Simplicidad en etapa inicial |
| Vercel sobre Netlify/GitHub Pages | SSL automático, CDN, dominio custom sin fricción |
| Web3Forms sobre Formspree | Free tier suficiente, cero backend |
| Hostinger Email | Gratuito incluido con el dominio |
| NS en Vercel (no Hostinger) | Único modo de obtener cert wildcard para apex `aethon.mx` |
| i18n inline | Sin dependencias, 2 idiomas, suficiente |
| Calendly sobre Cal.com | Más maduro, popup nativo, free tier suficiente |
| Hotmart para cursos (pendiente) | Líder LATAM, acepta CLP/MXN/USD, LMS incluido, $0 fijo |

---

## Pendientes — ordenados por prioridad

### 🔴 Próximo
- [ ] **Hotmart — botones de compra en cursos** — crear cuenta en hotmart.com, subir contenido del curso gratis, obtener links de checkout. Claude inserta los botones en las tarjetas de cursos. Plataforma elegida: Hotmart (LMS incluido, pagos LATAM nativos, sin costo fijo).

### 🟢 Crecimiento
- [ ] **Testimonios reales** — Patricia y CESFAM en el chatbot demo son ficticios. Reemplazar con casos reales cuando existan.
- [ ] **Core Web Vitals** — GSC mostrará datos en ~28 días. Revisar y optimizar si hay alertas.
- [ ] **og:locale alternativo** — agregar `og:locale:alternate` para `en_US` cuando el toggle EN tenga más tráfico.

---

## Contexto del usuario

Francisco es el único operador del proyecto. **No es desarrollador** — necesita instrucciones paso a paso para tareas en terminal, DNS o dashboards. Aprende rápido con guía clara y confirmación visual (capturas de pantalla). Prioriza soluciones gratuitas o de bajo costo.
