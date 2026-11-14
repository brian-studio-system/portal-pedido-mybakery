---
version: alpha
name: My Bakery
description: Artisan bakery in Barcelona. Ink on paper, engraved, warm and restrained.
colors:
  primary: "#14110F"
  secondary: "#7A4A22"
  tertiary: "#C9932F"
  ink: "#14110F"
  paper: "#F7F1E6"
  surface: "#FFFCF6"
  crust: "#7A4A22"
  wheat: "#C9932F"
  wheat-deep: "#8A6220"
  wheat-soft: "#F7EFE0"
  terracotta: "#9C4A32"
  terracotta-soft: "#F6E9E4"
  olive: "#5F6B4A"
  olive-soft: "#EEF0E8"
  muted: "#6B6259"
  border: "#E3DCD1"
typography:
  display-xl:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -0.02em
  display-l:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.1
  display-m:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: 600
    lineHeight: 1.15
  heading:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.3
  body-l:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  small:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0.08em
rounded:
  sm: 4px
  md: 12px
  full: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  2xl: 32px
  3xl: 48px
  4xl: 64px
  5xl: 96px
components:
  page:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    padding: "{spacing.5xl}"
  hero:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.display-xl}"
    padding: "{spacing.3xl}"
  section-title:
    textColor: "{colors.ink}"
    typography: "{typography.display-m}"
    padding: "{spacing.2xl}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  card-title:
    textColor: "{colors.ink}"
    typography: "{typography.heading}"
  lead:
    textColor: "{colors.muted}"
    typography: "{typography.body-l}"
  caption:
    textColor: "{colors.muted}"
    typography: "{typography.small}"
  label:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.wheat-deep}"
    typography: "{typography.label}"
    padding: "{spacing.xs}"
  eyebrow:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.secondary}"
    typography: "{typography.label}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.paper}"
    typography: "{typography.body}"
    rounded: "{rounded.full}"
    padding: "{spacing.md}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.full}"
    padding: "{spacing.sm}"
  link:
    textColor: "{colors.crust}"
    typography: "{typography.body}"
  divider:
    backgroundColor: "{colors.border}"
    padding: "{spacing.xs}"
  badge-default:
    backgroundColor: "{colors.wheat-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "{spacing.xs}"
  badge-accent:
    backgroundColor: "{colors.wheat}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
  badge-promo:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
  badge-available:
    backgroundColor: "{colors.olive-soft}"
    textColor: "{colors.olive}"
    rounded: "{rounded.full}"
  badge-soldout:
    backgroundColor: "{colors.terracotta-soft}"
    textColor: "{colors.terracotta}"
    rounded: "{rounded.full}"
  price:
    textColor: "{colors.ink}"
    typography: "{typography.display-l}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "{spacing.md}"
  footer:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    padding: "{spacing.4xl}"
  admin-panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "{spacing.xl}"
---

# My Bakery — Design System

**Brand:** My Bakery · artisan bakery · Barcelona · est. 2020
**Device priority:** mobile-first, desktop second.
**Fonts available in Stitch:** `Playfair Display` (headline), `Manrope` (body, label).

---

## 1. Brand essence

My Bakery is a neighbourhood bakery that bakes real bread every morning.
The visual system is built on **ink on paper**: a letterpress, engraved, hand-made
world. Warm, quiet, tactile, confident. It should feel like a paper bag from a
bakery, not like a tech landing page.

Three words that must be visible in every screen: **craft, warmth, restraint.**

The logo is a black engraved mark with a wheat wreath, a hand-lettered script,
`EST 2020` and `BARCELONA`. The interface must never compete with it: the logo is
the loudest element on the page, everything else is quiet.

## 2. Visual atmosphere

- Cream paper backgrounds, warm near-black ink, one toasted-wheat accent.
- Generous negative space. One idea per section.
- Thin 1px rules used as structure, like a printed page.
- Flat surfaces. No glass, no neon, no 3D, no multicolour gradients.
- Photography of real bread, hands, flour and morning light — never stock
  smiling people, never illustration.
- A subtle paper grain is acceptable; noise at very low opacity only.

## 3. Color

Light mode only. Seed color: `#C9932F`.

| Token | Hex | Role |
|---|---|---|
| `ink` | `#14110F` | Primary text, logo, primary button fill |
| `paper` | `#F7F1E6` | Page background |
| `surface` | `#FFFCF6` | Cards, inputs, elevated panels |
| `crust` | `#7A4A22` | Primary action text, links, focus rings |
| `wheat` | `#C9932F` | Fills, icons, badges, decorative accents |
| `wheat-deep` | `#8A6220` | Accent text on paper (accessible) |
| `terracotta` | `#9C4A32` | Error, sold out, low stock |
| `olive` | `#5F6B4A` | Success, available, vegetarian |
| `muted` | `#6B6259` | Secondary text, captions |

Rules:

- Roughly 80% neutrals, 15% ink/crust, 5% wheat. Never flood a screen with wheat.
- `wheat` is never body text on paper (2.4:1). Use `wheat-deep` for text.
- Ink text on paper is 16.7:1. Crust on paper is 6.6:1. Keep all body text ≥ 4.5:1.
- Allowed accent tints: `wheat` at 12–16% opacity for badge backgrounds; `ink` at
  12–20% for borders. Never use pure grey — every neutral is warm.

## 4. Typography

**Headline — Playfair Display.** Used for the hero, section titles, product names
and prices. Weight 600 or 700, italic only for an accent word. Tight leading
(1.05–1.15), slightly negative tracking on sizes above 36px.

**Body — Manrope.** Weights 400/500/600/700. Interface text, paragraphs, buttons,
navigation. Never use Manrope for the main hero title.

**Labels.** Manrope 600, uppercase, 12px, tracking +0.08em. Used for category
tags, field labels, table headers and small metadata.

Scale:

| Level | Size / line | Weight | Use |
|---|---|---|---|
| display-xl | 64 / 1.05 | 700 | Hero title |
| display-l | 48 / 1.10 | 700 | Large section title |
| display-m | 36 / 1.15 | 600 | Section title |
| heading | 24 / 1.30 | 600 | Card and panel titles |
| body-l | 18 / 1.60 | 400 | Lead paragraph |
| body | 16 / 1.60 | 400 | General text |
| small | 14 / 1.50 | 400 | Captions, helper text |
| label | 12 / 1.40 | 600 | Uppercase labels |

Sentence case everywhere. Never Title Case, never all-caps paragraphs.

## 5. Layout

- 4px spacing base. Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96.
- Desktop: 12-column grid, 1200px max width, 24px gutter, 64px page margin.
- Mobile: single column, 20px margin, 44px minimum touch target.
- Section rhythm: 96px vertical padding on desktop, 56px on mobile.
- Hero is asymmetric: copy on the left (5 columns), real product photography on the
  right (7 columns). Do not centre the hero.
- Cards align to an equal left and right edge. Never let a second section heading
  peek into the hero viewport.

## 6. Surfaces, borders, radius

- Border: `1px solid rgba(20,17,15,0.14)`.
- Radius: 4px for small inputs and tags, 12px for cards and panels, 999px for
  buttons, pills and badges.
- Shadow: only one, `0 8px 24px rgba(20,17,15,0.08)`, and only on hover or on a
  floating cart summary. Cards sit flat by default.
- Dividers: 1px ink at 12% opacity. Never use a shadow where a rule will do.

## 7. Components

**Navigation.** Paper background, 1px bottom rule. Wordmark left, links centre,
cart right. Mobile: logo left, cart right, menu icon. Cart shows item count in a
small wheat badge.

**Primary button.** Fill `ink`, text `paper`, radius 999, height 48, horizontal
padding 24, Manrope 600 16px. Hover lifts 2px; active presses down 1px.

**Secondary button.** Transparent fill, 1px `ink` border, text `ink`, same size.

**Text link.** `crust`, 1px underline offset 3px; underline thickens on hover.

**Product card.** `surface`, 1px border, radius 12, image 4:3 at the top, then
product name in Playfair 24px, short description in Manrope 14px `muted`, price in
Playfair 20px with tabular numerals, and an "Añadir" ghost button aligned right.
No shadow at rest.

**Quantity stepper.** Pill, 1px border, `−` and `+` as 44px targets, number in
Manrope 600 centred.

**Input and select.** `surface`, 1px border, radius 12, height 48, label uppercase
12px above the field. Focus: 2px `crust` border plus a 3px `wheat` at 20% halo.

**Badge.** Radius 999, Manrope 600 12px uppercase, padding 4/10.
Variants: `wheat` 16% + `ink` text (default), `olive` 16% + `olive` text
(available), `terracotta` 16% + `terracotta` text (sold out).

**Cart summary.** Sticky panel on desktop, bottom sheet on mobile. `surface`,
1px border, radius 12, total in Playfair 32px, primary button full width.

**Empty state.** Centred illustration-free composition: a thin wheat line icon,
one sentence in Manrope, one secondary button. No oversized mascots.

**Footer.** `ink` background, `paper` text, inverse logo at 96px wide, three link
columns, opening hours in Manrope 14px.

## 8. Motion

- 180–260ms, `ease-out`. Nothing longer than 300ms.
- Hover: cards lift 2px, images scale 1.02 inside their frame.
- Page transitions: a 120ms opacity fade. No slides, no parallax, no scroll-jacking.
- Respect `prefers-reduced-motion`: disable transforms, keep opacity only.

## 9. Imagery

Always real, always warm. Bread crust close-ups, hands shaping dough, flour dust in
morning light, the shop counter. Neutral warm backgrounds, shallow depth of field.
Images are uncropped 4:3 or 1:1, with a 1px inner border. Never place text directly
on a photo without a paper panel or a solid overlay.

## 10. Copy

Spanish (Spain), short and concrete. Catalan optional in packaging.

- "Horneado hoy. Quedan 12."
- "Masa madre de 24 horas."
- "Pide antes de las 18:00 y recógelo hoy."
- "Hecho en Barcelona desde 2020."

No exclamation marks in chains, no "¡Descubre la magia!", no superlatives without a
fact behind them. Buttons are verbs: "Añadir", "Pedir", "Reservar", "Ver carta".

## 11. Anti-patterns — do not generate

- Centred generic hero with a gradient blob behind it.
- Glassmorphism, frosted panels, neon accents, dark mode.
- Purple/blue SaaS gradients, 3D blobs, floating abstract shapes.
- Inter, Roboto, Poppins, Montserrat as primary type.
- Rounded-square avatars of smiling stock people.
- Emoji in the interface.
- More than one accent colour per screen.
- Cards with heavy drop shadows or coloured borders.
- Carousels, timed tabs, autoplaying video.
- Text over busy photography without a paper overlay.

## 12. Responsive

Mobile is the primary canvas: the full order flow must work in one hand.

- 360–639: single column, 20px margin, sticky bottom cart bar, 48px buttons.
- 640–1023: two-column product grid, 32px margin.
- 1024+: 12-column grid, 1200px container, sticky side cart.
- Never hide the price or the primary action on mobile.
