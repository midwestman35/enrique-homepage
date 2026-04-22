---
version: alpha
name: Cinematic Operator Noir
description: A cinematic dark design system for Enrique Velazquez that balances public-safety operations credibility with intentional product storytelling.
colors:
  primary: "#050807"
  surface: "#0C1512"
  surface-alt: "#111D19"
  accent: "#76D1AE"
  accent-strong: "#A7F0CF"
  accent-cool: "#88D9D7"
  text: "#F3F0E7"
  muted: "#A3B0A9"
  line: "#22332D"
  line-strong: "#395247"
typography:
  display-xl:
    fontFamily: "Outfit, sans-serif"
    fontSize: "5.75rem"
    fontWeight: 700
    letterSpacing: "-0.05em"
  display-md:
    fontFamily: "Outfit, sans-serif"
    fontSize: "3.1rem"
    fontWeight: 600
    letterSpacing: "-0.04em"
  body-md:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "1.02rem"
    fontWeight: 400
  body-sm:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "0.92rem"
    fontWeight: 400
  label-caps:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "0.74rem"
    fontWeight: 500
    letterSpacing: "0.14em"
rounded:
  sm: 18px
  md: 26px
  lg: 36px
spacing:
  xs: 8px
  sm: 14px
  md: 22px
  lg: 32px
  xl: 56px
components:
  page-shell:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text}"
    typography: "{typography.body-md}"
    padding: "{spacing.xl}"
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.primary}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.sm}"
    padding: "{spacing.sm}"
  button-secondary:
    backgroundColor: "{colors.surface-alt}"
    textColor: "{colors.text}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.sm}"
    padding: "{spacing.sm}"
  feature-panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  feature-panel-alt:
    backgroundColor: "{colors.surface-alt}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  chapter-rail:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  chapter-item:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.muted}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.sm}"
    padding: "{spacing.sm}"
  hero-metric:
    backgroundColor: "{colors.surface-alt}"
    textColor: "{colors.text}"
    rounded: "{rounded.sm}"
    padding: "{spacing.md}"
  visual-frame:
    backgroundColor: "{colors.surface-alt}"
    textColor: "{colors.muted}"
    rounded: "{rounded.lg}"
    padding: "{spacing.sm}"
---

## Overview

This homepage should feel like a dark control room translated into an editorial portfolio surface. The tone is cinematic and deliberate, but the interaction language must stay calm, legible, and technically grounded.

The primary reference is a dark media-forward layout with large image planes, dense atmosphere, and restrained motion. The secondary reference is operator-native: off-black surfaces, emerald instrumentation, monospaced labels, and a sense that the UI belongs near logs, dashboards, and incident timelines.

## Colors

The palette stays almost entirely in black, forest, off-white, and restrained signal hues.

- **Primary** anchors the page chrome and the largest dark fields.
- **Surface** and **surface-alt** separate stacked layers without introducing bright cards everywhere.
- **Accent** is the default interactive green and should feel measured, not neon.
- **Accent-strong** is reserved for the smallest, brightest signal points.
- **Accent-cool** supports diagnostics, telemetry hints, and diagrammatic imagery.
- **Text** is warm off-white rather than pure white.
- **Muted**, **line**, and **line-strong** carry secondary copy, dividers, and panel structure.

## Typography

Display type should feel sculpted and cinematic, with large dark-page headlines that stay controlled rather than bombastic. Body copy should be neutral, readable, and operationally calm. Monospaced labels, timestamps, and chapter markers should look like instrumentation rather than decorative type.

Use large display type sparingly and give it room. Avoid gradient text, novelty type tricks, or over-styled labels.

## Layout

The page uses an asymmetric hero, wide content panes, and a three-act narrative rhythm:

1. A hero that places copy and image on equal footing.
2. Mid-page feature bands that alternate composition and mix system credibility with product thinking.
3. A tighter final act with trajectory cards and a strong contact close.

Spacing should feel expensive and intentional. Desktop can use large negative space and offset panels; mobile must collapse to a strict single-column flow with no horizontal drift.

## Elevation & Depth

Depth comes from dark-surface stacking, thin internal borders, soft tint-aware shadows, and image atmosphere. Avoid generic heavy card shadows or bright glows. Surfaces should feel laminated and precise, not bubbly or soft.

## Shapes

Use large rounded rectangles with a technical edge: generous curves for major image planes and panels, smaller pill geometry for actions, chapter markers, and tags. No sharp-corner brutalism and no over-rounded playful bubbles.

## Components

- **Navigation:** slim, restrained, mostly monochrome until active.
- **Primary CTA:** accent green with dark text and clear tactile hover/active response.
- **Secondary CTA:** dark framed surface with thin line work.
- **Hero metrics:** compact stacked readouts with monospaced labels and strong hierarchy.
- **Chapter rail:** sticky panel with current-chapter readout and a small orbital motif.
- **Feature panels:** alternating split layouts mixing copy, tags, bullets, and one media or signal pane.
- **Trajectory cards:** dark cinematic chapter cards with expandable detail.
- **Contact panel:** strong final surface with copy on one side and action cluster on the other.

## Do's and Don'ts

### Do

- Keep imagery atmospheric, abstracted, and systems-adjacent.
- Let the emerald accent act like a signal, not a floodlight.
- Use image captions, labels, and timestamps to reinforce the operator point of view.
- Preserve strong contrast and a readable rhythm at every breakpoint.

### Don't

- Do not introduce purple glows, noisy gradients, or default SaaS blue accents.
- Do not rely on equal-width three-card rows as the main story structure.
- Do not center every headline or make every panel visually identical.
- Do not let the product-builder story erase the operational credibility, or vice versa.
