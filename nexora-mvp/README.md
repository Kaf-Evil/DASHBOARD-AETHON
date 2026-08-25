# NEXORA — Organizational Intelligence MVP

Premium static demo built for an executive/founder conversation.

## What this is

A fully synthetic browser MVP that demonstrates the product thesis:

**organizational signals → analytics → evidence → investigation → measurement → learning**

No customer or employee data is included.

## Demo company

**Grupo Nova México** — fictitious organization with 1,284 employees, five organizational units, and 18 months of synthetic aggregate history.

## Important distinction

The optional Data Cleaner is **not** the core product. The core is a unified analytics and signal layer that connects turnover, absence, overtime, continuous climate, training, 360°, onboarding, NOM-035 and optional business KPIs.

## Run locally

Open `index.html` directly, or run:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Cloudflare Pages

This is a static project. For Cloudflare Pages:

- Framework preset: **None**
- Build command: **leave blank**
- Build output directory: **.**
- Root directory: this project folder (`nexora-mvp` when stored in a monorepo)

## Analytics shown in the demo

The Signal Lab computes Pearson correlations and lagged correlations in the browser from deterministic synthetic monthly series. These are demo calculations, not evidence from a real organization.

## Safety / methodology

- Correlation is never presented as causation.
- AI responses are mocked and grounded in displayed evidence.
- No individual employee risk scoring is implemented.
- Aggregate-first product concept.
