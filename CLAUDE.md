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
| CLI local | `gh` en `~/bin/gh` · `vercel` vía npm global |

---

## Estructura de archivos

```
LANDINGPAGE/
├── landing/index.html        ← ARCHIVO PRINCIPAL — única fuente de verdad del sitio
├── assets/
│   ├── aethon-logo.svg       ← referenciado como ../assets/ desde landing/
│   ├── aethon-logo-light.svg
│   └── founder-photo.jpg
├── vercel.json               ← rewrites + redirect 301 + headers de seguridad
├── colors_and_type.css       ← design tokens de referencia (no usado en producción)
├── ui_kits/aethon-app/       ← componentes React (NO desplegados, referencia futura)
└── preview/                  ← previews del design system (no producción)
```

---

## Comandos esenciales

```bash
# Deploy a producción
vercel deploy --prod -y --scope aethon1

# Commit + push estándar
git add landing/index.html vercel.json
git commit -m "descripción del cambio"
git push origin main

# Verificar SSL y headers en producción
curl -sI https://www.aethon.mx | grep -E "x-frame|content-security|strict-transport"
curl -vI https://aethon.mx 2>&1 | grep -E "subject|subjectAlt|SSL|HTTP"

# Consultar DNS
dig MX aethon.mx +short
```

---

## Infraestructura — estado actual (actualizado 8 mayo 2026)

### DNS (gestionado en Vercel)
- Nameservers: `ns1.vercel-dns.com` / `ns2.vercel-dns.com`
- `A @ → 76.76.21.21` · `CNAME www → cname.vercel-dns.com`
- `MX @ → mx1.hostinger.com (p5)` · `MX @ → mx2.hostinger.com (p10)`
- `TXT @ → v=spf1 include:_spf.mail.hostinger.com ~all`

### SSL
- Certificado wildcard `*.aethon.mx` · Let's Encrypt · válido hasta 6 agosto 2026
- `https://aethon.mx` → 301 → `https://www.aethon.mx` ✅
- `https://www.aethon.mx` → 200 ✅

### Correo
- `francisco@aethon.mx` funcional ✅ (verificado post-migración NS)
- **DKIM pendiente** — obtener clave en Hostinger panel → agregar TXT en Vercel DNS

### Headers de seguridad activos en producción
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; ...
Strict-Transport-Security: max-age=63072000
```

---

## Landing — secciones implementadas

| Sección | Contenido clave |
|---------|----------------|
| Nav | Sticky · logo · links · toggle ES/EN · botón "Agendar" |
| Hero | Título animado · demo chat APS (Patricia, CESFAM) · 3 stats |
| Mercados | Tabs: MX Privado / CL Privado / CL Salud Pública (Ley 19.378) |
| Chatbot showcase | 4 preguntas interactivas simuladas con respuestas estructuradas |
| Servicios | Grid 4 tarjetas: Automatización · IA · Apps web · Cursos |
| Cursos | 3 cursos (1 gratis, 2 pago) — sin CTA funcional aún |
| Proceso | 4 pasos: Diagnóstico → Propuesta → Construcción → Transferencia |
| Founder | Foto · bio · credenciales · LinkedIn |
| CTA/Contacto | Formulario Web3Forms + WhatsApp + email |
| Footer | Copyright · email · LinkedIn personal · LinkedIn empresa |

### i18n
- Toggle ES/EN · `data-i18n` attributes · objeto `I18N = {es:{...}, en:{...}}` hardcodeado
- `applyI18n(lang)` recorre el DOM y asigna via `innerHTML` (seguro: datos son estáticos)
- Si se conecta a API externa en el futuro → sanitizar antes de `innerHTML`

### Formulario Web3Forms
- POST a `https://api.web3forms.com/submit`
- Access key en HTML (visible por diseño del servicio — aceptado)
- Campos: nombre, cargo, organización, email, país, tamaño equipo, mensaje
- Destino: `francisco@aethon.mx` · Redirect post-submit: `https://www.aethon.mx`
- **Sin CAPTCHA** — riesgo de spam (pendiente activar hCaptcha en panel Web3Forms)

### Responsividad
- Breakpoints: `980px` · `880px` · `640px` (mobile completo)

### Contacto en la landing
- Email: `francisco@aethon.mx`
- WhatsApp: `+565225500682` *(pendiente confirmar que el número es correcto)*
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

---

## Pendientes — ordenados por prioridad

### 🔴 Alta
- [ ] **DKIM correo** — Hostinger panel → Email → DNS records → copiar TXT DKIM → agregar en Vercel DNS. Sin DKIM los emails caen en spam.
- [ ] **Web3Forms CAPTCHA** — activar hCaptcha en web3forms.com para el access key. Evita spam.
- [ ] **Confirmar WhatsApp** — verificar que `+565225500682` sea correcto y funcional.

### 🟡 Media
- [ ] **SEO** — añadir en `<head>`: `<meta name="description">`, OG tags (`og:title`, `og:description`, `og:image`, `og:url`), `twitter:card`. Sin esto, ningún preview al compartir en redes.
- [ ] **Google Search Console** — registrar `www.aethon.mx` para indexación y monitoreo.
- [ ] **Vercel Analytics** — activar en dashboard Vercel → Analytics → Enable (incluido en el plan).
- [ ] **Auto-deploy** — conectar GitHub App en Vercel dashboard para deploy automático en cada push.
- [ ] **Foto founder** — verificar que `../assets/founder-photo.jpg` carga correctamente en producción.
- [ ] **Contenido real** — revisar stats del hero, datos de cursos, placeholder "Carolina Pérez" en el form.

### 🟢 Crecimiento
- [ ] **CTA cursos** — las tarjetas de cursos no tienen botón de compra. Opciones: Hotmart, Gumroad, formulario dedicado.
- [ ] **Calendly/Cal.com** — integrar calendario real en el botón "Agendar" para mejorar conversión.
- [ ] **Google Analytics GA4** — tracking de eventos y conversiones del formulario.
- [ ] **Sitemap.xml + robots.txt** — SEO técnico.
- [ ] **Testimonios reales** — los datos del chatbot demo son ficticios (Patricia, CESFAM). Reemplazar con casos reales cuando existan.

---

## Contexto del usuario

Francisco es el único operador del proyecto. **No es desarrollador** — necesita instrucciones paso a paso para tareas en terminal, DNS o dashboards. Aprende rápido con guía clara y confirmación visual (capturas de pantalla). Prioriza soluciones gratuitas o de bajo costo.
