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
│   └── founder-photo.jpg     ← también usada como og:image
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

# Verificar SEO tags en producción
curl -s https://www.aethon.mx | grep -E "og:|twitter:|description|canonical"

# Verificar SSL y headers en producción
curl -sI https://www.aethon.mx | grep -E "x-frame|content-security|strict-transport"

# Consultar DNS
dig MX aethon.mx +short
dig CNAME hostingermail-a._domainkey.aethon.mx +short
dig TXT _dmarc.aethon.mx +short
```

---

## Infraestructura — estado actual (actualizado 8 mayo 2026)

### DNS (gestionado en Vercel)
- Nameservers: `ns1.vercel-dns.com` / `ns2.vercel-dns.com`
- `A @ → 76.76.21.21` · `CNAME www → cname.vercel-dns.com`
- `MX @ → mx1.hostinger.com (p5)` · `MX @ → mx2.hostinger.com (p10)`
- `TXT @ → v=spf1 include:_spf.mail.hostinger.com ~all`
- `CNAME hostingermail-a._domainkey → hostingermail-a.dkim.mail.hostinger.com` ✅
- `CNAME hostingermail-b._domainkey → hostingermail-b.dkim.mail.hostinger.com` ✅
- `CNAME hostingermail-c._domainkey → hostingermail-c.dkim.mail.hostinger.com` ✅
- `TXT _dmarc → v=DMARC1; p=none` ✅

### SSL
- Certificado wildcard `*.aethon.mx` · Let's Encrypt · válido hasta 6 agosto 2026
- `https://aethon.mx` → 301 → `https://www.aethon.mx` ✅
- `https://www.aethon.mx` → 200 ✅

### Correo — estado completo
- `francisco@aethon.mx` funcional ✅
- MX records ✅ · SPF ✅ · DKIM ✅ · DMARC ✅
- Correo completamente blindado contra spam y suplantación

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

### SEO (implementado 8 mayo 2026)
- `<meta name="description">` ✅
- `<link rel="canonical">` ✅
- Open Graph: `og:type`, `og:url`, `og:title`, `og:description`, `og:image`, `og:locale` ✅
- Twitter Card: `summary_large_image` ✅
- `og:image` apunta a `https://www.aethon.mx/assets/founder-photo.jpg`

### Formulario Web3Forms
- POST a `https://api.web3forms.com/submit`
- Access key en HTML (visible por diseño del servicio — aceptado)
- Campos: nombre, cargo, organización, email, país, tamaño equipo, mensaje
- Destino: `francisco@aethon.mx` · Redirect post-submit: `https://www.aethon.mx`
- Advanced Spam Filter activado · nivel Basic ✅
- Sin hCaptcha (requiere Pro en Web3Forms) — spam filter cubre el riesgo básico

### Responsividad
- Breakpoints: `980px` · `880px` · `640px` (mobile completo)

### Contacto en la landing
- Email: `francisco@aethon.mx`
- WhatsApp: `+565225500682` ✅ (confirmado funcional)
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

### 🟡 Media
- [ ] **Google Search Console** — registrar `www.aethon.mx`. Pasos: search.google.com/search-console → Agregar propiedad → Prefijo de URL → verificar con meta tag HTML → pasarle el código a Claude para agregarlo al HTML.
- [ ] **Vercel Analytics** — activar en dashboard Vercel → proyecto `dashboard-aethon` → Analytics → Enable. Gratuito.
- [ ] **Auto-deploy** — conectar GitHub App en Vercel dashboard → Settings → Git → conectar `Kaf-Evil/DASHBOARD-AETHON` rama `main`. Elimina el paso manual de `vercel deploy`.
- [ ] **Contenido real** — revisar stats del hero, datos de cursos, placeholder "Carolina Pérez" en el form.

### 🟢 Crecimiento
- [ ] **CTA cursos** — las tarjetas de cursos no tienen botón de compra. Opciones: Hotmart, Gumroad, formulario dedicado.
- [ ] **Calendly/Cal.com** — integrar calendario real en el botón "Agendar" para mejorar conversión.
- [ ] **Google Analytics GA4** — tracking de eventos y conversiones del formulario.
- [ ] **Sitemap.xml + robots.txt** — SEO técnico.
- [ ] **Testimonios reales** — los datos del chatbot demo son ficticios (Patricia, CESFAM). Reemplazar con casos reales cuando existan.
- [ ] **og:image de marca** — la imagen actual (founder-photo.jpg) es cuadrada. Idealmente crear imagen horizontal 1200×630 px con logo + fondo oscuro para mejor preview en redes.

---

## Contexto del usuario

Francisco es el único operador del proyecto. **No es desarrollador** — necesita instrucciones paso a paso para tareas en terminal, DNS o dashboards. Aprende rápido con guía clara y confirmación visual (capturas de pantalla). Prioriza soluciones gratuitas o de bajo costo.
