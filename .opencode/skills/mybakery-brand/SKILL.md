---
name: MyBakery Brand
description: Identidad y design system de My Bakery. Carga las reglas de marca, tokens y anti-patrones antes de tocar UI o copy.
---

# MyBakery Brand

Antes de generar o modificar cualquier interfaz, copy o componente:

1. Lee `brand/BRAND.md` (identidad, tono, logo, color, tipografía).
2. Lee `brand/DESIGN.md` (design system para Stitch y para código).
3. Lee `brand/tokens.json` (tokens DTCG: color, tipo, espacio, radio, sombra, motion).

## Reglas obligatorias

- Usa **solo** los tokens definidos. Colores: `ink`, `paper`, `surface`, `crust`, `wheat`, `wheat-deep`, `terracotta`, `olive`, `muted`. Fuentes: Playfair Display (display) y Manrope (body/labels).
- Prohibido: degradados multicolor, neón, glassmorphism, 3D, emojis en la UI, Inter/Poppins/Montserrat como fuente principal.
- `wheat` (#C9932F) nunca para texto pequeño (2.4:1). Usa `wheat-deep` (#8A6220).
- Mobile-first. Objetivos táctiles ≥ 44 px.
- AA mínimo 4.5:1 en texto. Foco visible siempre.
- Respetar `prefers-reduced-motion`.
- Copy en español de España, frases cortas, datos concretos, sin "¡Descubre la magia!".

## Anti-marca

No somos: startup tech, pastelería de lujo con dorados, cupcake americano, panadería industrial "premium", neón, glass, 3D.

## Referencias rápidas

- Logo SVG: `brand/assets/logo/my-bakery-logo.svg` (transparente).
- Hoja de marca: `brand/brand-sheet.html`.
- Tokens Tailwind: ver `brand/README.md`.
