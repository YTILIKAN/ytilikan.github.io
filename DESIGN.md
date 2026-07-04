---
version: alpha
name: Y'TILIKAN
description: "Indigo & or du Sahel — dark premium meets African warmth. A community-driven brand for democratizing AI across Francophone Africa."
colors:
  primary: "#242E58"
  secondary: "#E4A62B"
  neutral: "#161311"
  indigo: "#242E58"
  indigo-d: "#1A2143"
  ocre: "#E4A62B"
  ocre-d: "#C88A16"
  kola: "#B5522E"
  encre: "#161311"
  ivoire: "#F5EFE1"
  sable: "#EAE0CC"
  sable-d: "#D8C8A6"
  white: "#FFFFFF"
  on-indigo: "#F5EFE1"
  on-encre: "#F5EFE1"
  on-ocre: "#161311"
  on-kola: "#FFFFFF"
typography:
  display-xl:
    fontFamily: "Bricolage Grotesque"
    fontSize: "96px"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.01em"
  display:
    fontFamily: "Bricolage Grotesque"
    fontSize: "54px"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Hanken Grotesk"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  body-lg:
    fontFamily: "Hanken Grotesk"
    fontSize: "1.15rem"
    fontWeight: 400
    lineHeight: 1.6
  mono:
    fontFamily: "Space Mono"
    fontSize: "0.72rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.14em"
  mono-caps:
    fontFamily: "Space Mono"
    fontSize: "0.72rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.22em"
rounded:
  sm: 4px
  md: 14px
  lg: 20px
  full: 9999px
spacing:
  xs: 8px
  sm: 14px
  md: 24px
  lg: 48px
  xl: 96px
components:
  button-primary:
    backgroundColor: "{colors.ocre}"
    textColor: "{colors.on-ocre}"
    rounded: "{rounded.full}"
    padding: "13px 26px"
    typography: "{typography.mono-caps}"
  button-primary-hover:
    backgroundColor: "{colors.ocre-d}"
    textColor: "{colors.on-ocre}"
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.on-indigo}"
    rounded: "{rounded.full}"
    padding: "13px 26px"
  card-white:
    backgroundColor: "{colors.white}"
    textColor: "{colors.encre}"
    rounded: "{rounded.md}"
    padding: 24px
  card-sable:
    backgroundColor: "{colors.sable}"
    textColor: "{colors.encre}"
    rounded: "{rounded.md}"
    padding: "22px 20px"
  card-encre:
    backgroundColor: "{colors.encre}"
    textColor: "{colors.ivoire}"
    rounded: "{rounded.lg}"
    padding: 44px
  nav-header:
    backgroundColor: "{colors.ivoire}"
    textColor: "{colors.encre}"
    height: 68px
  hero-section:
    backgroundColor: "{colors.indigo}"
    textColor: "{colors.ivoire}"
  footer-section:
    backgroundColor: "{colors.encre}"
    textColor: "{colors.ivoire}"
---
## Overview

Y'TILIKAN is a brand rooted in African identity and tech accessibility. The name means "it's not complicated" in Mooré (Burkina Faso). The visual identity balances deep indigo — evoking West African indigo-dyed cloth and digital depth — with warm Saharan gold and creamy ivory. The tone is confident, clear, and warm: we explain, we don't impress.

The typography uses three voices: Bricolage Grotesque for headlines (firm, humanist), Hanken Grotesk for body (clear, readable), and Space Mono for labels and data (the digital accent). The eye motif from the mask logo repeats as a subtle texture throughout.

## Colors

- **Indigo (#242E58):** Signature color. Hero backgrounds, footer, strong surfaces. The emotional anchor of the brand.
- **Indigo Dark (#1A2143):** Gradient endpoints, hover states on indigo backgrounds.
- **Ocre (#E4A62B):** Accent. Buttons, highlighted text, the Y' in the logo. The sole driver of visual warmth. Use sparingly.
- **Ocre Dark (#C88A16):** Hover state for ocre buttons.
- **Kola (#B5522E):** Secondary accent. Section eyebrow labels, category tags. Use with restraint.
- **Encre (#161311):** Body text and logo. A warm black — never pure #000.
- **Ivoire (#F5EFE1):** Main page background. Airy, warm, the space to breathe.
- **Sable (#EAE0CC):** Card backgrounds, separator panels.
- **Sable Dark (#D8C8A6):** Borders and dividers.
- **White (#FFFFFF):** Card surfaces within sections for contrast.

## Typography

Three families, one system. Bricolage Grotesque carries the brand voice — weights 700-800 only. Hanken Grotesk is reading text — weights 400-600. Space Mono is the technical layer — uppercase labels, hex codes, durations. Google Fonts imports required.

## Layout

Sections are separated by a `1px solid {colors.sable-d}` top border. Section padding is `xl` (96px) on desktop, collapsing to 64px on mobile. Content width is capped at 1120px with 28px side padding. The rhythm follows a 4px baseline grid.

## Shapes

Cards use `md` (14px) to `lg` (20px) rounding. Buttons are pill-shaped (`full`). Avatars and profile images are circular. The mask logo itself has soft corners (8-12px).

## Components

- `button-primary` — the only gold-filled CTA. Used once or twice per screen.
- `button-ghost` — translucent white border on indigo backgrounds. Secondary action.
- `card-white` — default content card on ivoire or sable backgrounds.
- `card-sable` — subdued card for value propositions or secondary content.
- `card-encre` — high-contrast dark card for standout content (the Y' etymology card).
- `nav-header` — sticky, blurred ivoire bar with indigo logo mark.
- `hero-section` — full-viewport indigo block with ocre accent, white text, and eye pattern overlay.
- `footer-section` — encre background with ivoire text and ocre accent.

## Do's and Don'ts

- **Do** keep the accent (ocre) to a minimum — it works because it's rare.
- **Do** use Space Mono for any technical label, duration, or metadata.
- **Do** reference palette colors by token name in component definitions.
- **Don't** use ocre text on light backgrounds — it fails WCAG contrast.
- **Don't** introduce colors outside this palette without extending it here first.
- **Don't** add shadows, gradients, or effects to the mask logo.
