---
version: beta
name: Signal Discipline
description: A resume brand system for Enrique Velazquez that presents public-safety systems credibility with a builder's product instinct.
colors:
  background: "#040706"
  panel: "#0B1110"
  panelStrong: "#111917"
  ink: "#F3F0E7"
  inkSoft: "#D5D8D2"
  muted: "#9DA8A0"
  signal: "#8DDABC"
  signalStrong: "#B7F4D6"
  cyan: "#8FD8D5"
  amber: "#E5C46F"
typography:
  display:
    fontFamily: "Outfit, sans-serif"
    role: "Large resume and brand statements"
  body:
    fontFamily: "IBM Plex Sans, sans-serif"
    role: "Readable operational narrative"
  mono:
    fontFamily: "IBM Plex Mono, monospace"
    role: "Dates, navigation, system labels, tool names"
layout:
  radius: "8px for cards and framed media"
  maxWidth: "92rem"
  grid: "Gapless six-column resume bento on desktop, single column on mobile"
  motion: "GSAP ScrollTrigger for pinning, media scale, stacked cards, and scrubbed text"
---

## Brand Thesis

Enrique Velazquez should read as a calm operator for critical systems: someone who can sit inside public-safety infrastructure, interpret live signals, and turn that pressure into cleaner tools.

The site should avoid the generic developer portfolio pattern. The strongest brand image is not "full-stack builder" by itself. It is "engineer with protocol depth, live-systems judgment, and product instincts."

## Voice

Use language that is direct, operational, and specific. The site should sound comfortable around outages, escalations, call routing, voice protocols, and monitoring surfaces.

Preferred phrases:

- Critical systems
- Investigation surface
- Live signal
- Operator pressure
- Public-safety infrastructure
- Voice and routing context
- Calm tooling

Avoid language that makes the resume sound inflated or disconnected from the actual work. Do not overstate development as the primary professional role. NocLense is the product proof, not the whole identity.

## Visual Direction

The visual system is dark, structured, and media-forward. It should feel like a control room translated into an editorial resume site.

Use off-black backgrounds, warm off-white text, signal green for primary action, cyan for diagnostic accents, and amber for dates or decision points. Do not drift into purple, blue SaaS gradients, beige editorial minimalism, or playful rounded cards.

Cards and media frames use 8px radius. Large page sections stay unframed. Repeated items can be cards; page bands should not look like cards inside cards.

## Composition

The first viewport establishes the person immediately: Enrique Velazquez, engineer, public safety systems, builder. The hero uses an asymmetric layout with a large name, a narrow image embedded in the title, and a media plane that sets the operations environment.

The middle of the page should translate resume facts into brand pillars:

- Positioning: engineer building for investigation speed.
- Current role: Axon 911.
- Builder habits: small tools, fast feedback, practical polish.
- Tool fluency: AWS, Datadog, Kibana, Rollbar, Jira, Zendesk, ServiceNow.
- Builder proof: NocLense as a personal product built from operator context.

The experience section should feel like a pinned resume dossier. It is not a timeline decoration; it is the evidence stack.

## Motion

Motion should support comprehension. Use GSAP only where it adds narrative structure:

- Hero elements enter once.
- The brand thesis reveals word by word while scrolling.
- Media scales into clarity as it enters the viewport.
- The experience rail pins on desktop while role cards pass beside it.
- Cards rise into place with scrubbed scroll progress.

Reduced-motion users receive static readable content.

## Implementation Notes

The HTML is the source of truth for resume content. JavaScript should attach behavior only: navigation state, accordion activation, text splitting for scroll reveals, and GSAP animation setup.

External CDN scripts must fail gracefully. The site should remain fully readable with JavaScript disabled, reduced motion enabled, or GSAP unavailable.
