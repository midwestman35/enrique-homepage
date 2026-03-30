# About Section Redesign — Frosted Resolve + Pretext Line Reveal

**Date:** 2026-03-29
**Status:** Approved

---

## Overview

Redesign the About section's `.glass-section` card with a cinematic entrance animation and a Pretext-powered line-by-line text reveal. All existing page animations (orbit rings, breathe gradient, blob pulse, hero fadeUp stagger, drawer bullet slide-ins) remain untouched.

---

## Card Entrance — "Frosted Resolve"

**Starting state:**
- `opacity: 0`
- `transform: scale(0.97)`
- `backdrop-filter: blur(0px)`
- `border-color: rgba(255, 255, 255, 0.02)`

**Resolved state (over 700ms, `cubic-bezier(0.22, 1, 0.36, 1)`):**
- `opacity: 1`
- `transform: scale(1)`
- `backdrop-filter: blur(24px)`
- `border-color: rgba(255, 255, 255, 0.08)` (standard card border)

**Border shimmer** (fires once as card resolves, ~600ms):
- A `linear-gradient` highlight sweeps left-to-right across the border: `transparent → var(--emerald-bright) → transparent`
- Implemented via a `::before` pseudo-element with `background-size` or `clip-path` animation
- Fires once, no loop — mimics light catching the glass edge

**Trigger:** The existing `.reveal.d6` `IntersectionObserver` scroll threshold is preserved. The frosted resolve replaces the current plain `fadeUp` for this card only — other `.reveal` elements are unaffected.

---

## Text Reveal — Pretext Line-by-Line

**Library:** `@chenglou/pretext` (already cloned to `/pretext`)
**API used:** `prepare()` + `layoutWithLines()`

**Sequence:**
1. Card entrance completes (~700ms after trigger)
2. `prepare(aboutText, font)` runs — one-time text analysis + canvas measurement
3. `layoutWithLines(prepared, containerWidth, lineHeight)` returns the exact line strings at current width
4. Each line is injected as a `<span class="about-line">` block element
5. Lines start at `opacity: 0`, `translateY(12px)`
6. Sequential reveal: **80ms stagger** between lines, `cubic-bezier(0.22, 1, 0.36, 1)` easing

**Strong word bloom:**
- `<strong>` tokens (`cloud infrastructure`, `operations`, `NocLense`) are identified before Pretext runs
- After line injection, strong spans receive a one-shot keyframe: color pulses `var(--text-primary) → var(--emerald-bright) → var(--text-primary)` over ~400ms as their line arrives
- Single bloom, no loop

**Resize handling:**
- A `ResizeObserver` on the card re-runs the Pretext layout pass and rebuilds spans if container width changes
- Guards against animation re-triggering on resize (only re-layout, no re-animate if already revealed)

**Font spec passed to Pretext:**
- `"300 clamp(1.05rem, 2vw, 1.22rem) 'DM Sans', sans-serif"` — must match the CSS `font` shorthand for accurate measurement

---

## Constraints

- Do NOT modify any existing `@keyframes`, `.reveal`, `.fade-up`, or delay classes
- Do NOT modify hero, skills, projects, experience, or footer sections
- The about `.glass-section` card is the only element receiving new animation treatment
- Keep the existing `.glass-section:hover` border/shadow transition intact
- All new JS must be non-blocking (wrapped in `requestAnimationFrame` / deferred after card entrance)
