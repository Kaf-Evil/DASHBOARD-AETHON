---
name: aethon-design
description: Use this skill to generate well-branded interfaces and assets for Aethon, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Aethon-specific notes:
- Spanish (Chile/México) is the primary language. Domain vocabulary (Ley 19.378, liquidación, funcionario, AFP, FONASA, RUT, IMSS) is correct and expected.
- Brand colors live in `colors_and_type.css`. Navy `#0A1628`, Blue `#1960A6`, Gold `#F0A026` come from the logo and are non-negotiable. Action blue is `#2563EB`.
- Inter is the only typeface. JetBrains Mono for hex/RUT/tabular.
- Logo files: `assets/aethon-logo.svg` (color on light), `assets/aethon-logo-light.svg` (white+gold on dark).
- The UI kit in `ui_kits/aethon-app/` has working components — copy & adapt rather than reinvent.
- Avoid emoji, illustration heroes, purple gradients, glassmorphism. Solid colors, white cards with `1.5px slate-200` borders, navy sidebar.
