# About Section Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign the About `.glass-section` card with a cinematic "frosted resolve" entrance and a Pretext-powered line-by-line text reveal — without touching any other page animation.

**Architecture:** CSS-only card entrance via a new `@keyframes about-card-enter` that animates `opacity`, `scale`, and `backdrop-filter` simultaneously, plus a one-shot border shimmer via `::before`. A `<script type="module">` block runs after the card resolves: it calls Pretext `prepare()` + `layoutWithLines()` to get exact line strings, injects `<span class="about-line">` per line, then staggers each line in via JS `setTimeout`. Strong word tokens get a one-shot color bloom keyframe as their line arrives.

**Tech Stack:** Vanilla HTML/CSS/JS, `@chenglou/pretext` (local clone at `/pretext`, built via `bun run build:package`), no bundler needed — imported as a relative ES module.

---

## Task 1: Build Pretext for browser use

**Files:**
- No file edits — just a build step inside `pretext/`

**Step 1: Install pretext dependencies**

```bash
cd C:/Users/somur/enrique-homepage/pretext
bun install
```

Expected: lockfile resolves, `node_modules/` populated.

**Step 2: Build the package**

```bash
bun run build:package
```

Expected: `dist/` folder created containing `layout.js` and `layout.d.ts`.

**Step 3: Verify the build output**

```bash
ls dist/
```

Expected output includes `layout.js`. Open `dist/layout.js` briefly — it should be an ES module (`export function prepare`, `export function layoutWithLines`, etc.).

**Step 4: Commit**

```bash
cd ..
git add pretext/dist
git commit -m "build: compile pretext library for browser use"
```

---

## Task 2: Add card entrance CSS

**Files:**
- Modify: `index.html` — inside the `<style>` block, after the existing `@keyframes fadeUp` definition (~line 94)

**Step 1: Add the `about-card-enter` keyframe**

Find this line in `<style>`:
```css
@keyframes fadeUp {
 from { opacity: 0; transform: translateY(24px); }
 to { opacity: 1; transform: translateY(0); }
}
```

Add immediately after it:
```css
@keyframes about-card-enter {
 0% {
  opacity: 0;
  transform: scale(0.97);
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
  border-color: rgba(255, 255, 255, 0.02);
 }
 100% {
  opacity: 1;
  transform: scale(1);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-color: rgba(255, 255, 255, 0.08);
 }
}

@keyframes border-shimmer {
 0%   { opacity: 0; transform: translateX(-100%); }
 15%  { opacity: 1; }
 85%  { opacity: 1; }
 100% { opacity: 0; transform: translateX(100%); }
}

@keyframes word-bloom {
 0%   { color: var(--text-primary); }
 35%  { color: var(--emerald-bright); text-shadow: 0 0 18px rgba(52,211,153,0.5); }
 100% { color: var(--text-primary); text-shadow: none; }
}

@keyframes line-in {
 from { opacity: 0; transform: translateY(12px); }
 to   { opacity: 1; transform: translateY(0); }
}
```

**Step 2: Add the `.about-card` override class**

Find `.glass-section {` in the CSS. Add a new block below the existing `.glass-section:hover` rule:

```css
/* ── ABOUT CARD SPECIAL ENTRANCE ── */
.about-card {
 opacity: 0;
 animation: about-card-enter 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
 animation-delay: 0.8s; /* matches existing .d6 reveal timing */
 position: relative;
 overflow: hidden; /* needed for shimmer clip */
}

.about-card::before {
 content: '';
 position: absolute;
 inset: 0;
 background: linear-gradient(
  105deg,
  transparent 20%,
  rgba(52, 211, 153, 0.18) 50%,
  transparent 80%
 );
 transform: translateX(-100%);
 opacity: 0;
 pointer-events: none;
 animation: border-shimmer 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
 animation-delay: 1.3s; /* fires as card finishes resolving */
 z-index: 1;
}

/* Lines injected by JS */
.about-line {
 display: block;
 opacity: 0;
 animation: line-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
 animation-play-state: paused; /* JS unpauses each line with stagger */
}

.about-line.bloom strong {
 animation: word-bloom 0.4s ease forwards;
}
```

**Step 3: Replace the About card class in HTML**

Find:
```html
<div class="glass-section reveal d6">
 <div class="section-label">About</div>
```

Replace with:
```html
<div class="glass-section about-card" id="aboutCard">
 <div class="section-label">About</div>
```

Note: `reveal d6` is removed — the new `about-card` class owns the entrance animation directly. The `reveal` class was applying `fadeUp` which we're replacing.

**Step 4: Verify in browser**

Open `http://localhost:3000`. Scroll to About. The card should:
- Start invisible
- Resolve with frosted glass feel over ~700ms
- A shimmer sweep passes across it as it settles

Text is invisible at this point — that's expected (Pretext JS not wired yet).

**Step 5: Commit**

```bash
git add index.html
git commit -m "feat: add frosted resolve card entrance for About section"
```

---

## Task 3: Wire up Pretext line-by-line text reveal

**Files:**
- Modify: `index.html` — add a `<script type="module">` block just before `</body>`

**Step 1: Locate the existing script block**

Find near the bottom of `index.html`:
```html
<script>
document.getElementById('yr').textContent = new Date().getFullYear();
```

The new Pretext script goes in a **separate** `<script type="module">` block added just before the existing `<script>` tag. Do NOT modify the existing script.

**Step 2: Add the module script**

Insert this immediately before the existing `<script>` tag:

```html
<script type="module">
import { prepare, layoutWithLines } from './pretext/dist/layout.js';

const card  = document.getElementById('aboutCard');
const pEl   = card.querySelector('.about-text');

// --- 1. Extract raw text and strong-word positions before we touch the DOM ---
// Build a flat string + a map of which character ranges are <strong>
function extractTextAndRanges(el) {
 let text = '';
 const strongRanges = []; // [{start, end}]
 el.childNodes.forEach(node => {
  if (node.nodeType === Node.TEXT_NODE) {
   text += node.textContent;
  } else if (node.nodeName === 'STRONG') {
   const start = text.length;
   text += node.textContent;
   strongRanges.push({ start, end: text.length });
  }
 });
 return { text, strongRanges };
}

// --- 2. Run Pretext layout ---
function computeLines(text, font, containerWidth, lineHeight) {
 const prepared = prepare(text, font);
 const { lines } = layoutWithLines(prepared, containerWidth, lineHeight);
 return lines; // array of { text: string, ... }
}

// --- 3. Build span elements per line ---
function buildLineSpans(lines, fullText, strongRanges) {
 let charOffset = 0;
 return lines.map((line, i) => {
  const lineText = line.text;
  const lineStart = charOffset;
  const lineEnd   = lineStart + lineText.length;
  charOffset = lineEnd;
  // skip leading space carried over between lines
  if (fullText[charOffset] === ' ') charOffset++;

  // check if this line contains any strong range
  const hasStrong = strongRanges.some(r =>
   r.start < lineEnd && r.end > lineStart
  );

  // rebuild inner HTML: wrap strong tokens
  let html = lineText;
  // find strong substrings within this line's slice
  strongRanges.forEach(r => {
   if (r.start >= lineStart && r.end <= lineEnd) {
    const word = fullText.slice(r.start, r.end);
    html = html.replace(word, `<strong>${word}</strong>`);
   }
  });

  const span = document.createElement('span');
  span.className = 'about-line' + (hasStrong ? ' has-strong' : '');
  span.innerHTML = html;
  return { span, hasStrong };
 });
}

// --- 4. Stagger reveal ---
function revealLines(lineItems) {
 lineItems.forEach(({ span, hasStrong }, i) => {
  setTimeout(() => {
   span.style.animationPlayState = 'running';
   if (hasStrong) {
    // bloom strong words as the line arrives
    setTimeout(() => span.classList.add('bloom'), 120);
   }
  }, i * 80);
 });
}

// --- 5. Main: wait for card entrance to finish, then run ---
function runPretext() {
 const { text, strongRanges } = extractTextAndRanges(pEl);

 // Font must match CSS exactly: weight size family
 const font = '300 1.1rem "DM Sans", sans-serif';
 const styles = window.getComputedStyle(pEl);
 const lineHeight = parseFloat(styles.lineHeight) || 1.85 * 18;
 const containerWidth = pEl.clientWidth;

 const lines = computeLines(text, font, containerWidth, lineHeight);
 const lineItems = buildLineSpans(lines, text, strongRanges);

 // Replace paragraph content with line spans
 pEl.innerHTML = '';
 lineItems.forEach(({ span }) => pEl.appendChild(span));

 revealLines(lineItems);
}

// Fire after card entrance completes (0.8s delay + 0.7s duration = 1.5s total)
// Add a small buffer so the card is fully settled
const CARD_ENTRANCE_MS = 1550;
setTimeout(runPretext, CARD_ENTRANCE_MS);

// --- 6. ResizeObserver: re-layout on resize, no re-animation ---
let resizeTimer;
const ro = new ResizeObserver(() => {
 clearTimeout(resizeTimer);
 resizeTimer = setTimeout(() => {
  // Only re-layout if lines already revealed (pEl contains .about-line spans)
  if (!pEl.querySelector('.about-line')) return;

  const { text, strongRanges } = (() => {
   // Reconstruct raw text from existing spans
   let t = '';
   const ranges = [];
   pEl.querySelectorAll('.about-line').forEach(span => {
    const strongs = span.querySelectorAll('strong');
    if (strongs.length) {
     strongs.forEach(s => {
      const start = t.length + span.textContent.indexOf(s.textContent);
      // Approximate: rebuild from innerHTML is complex; use textContent
     });
    }
    t += span.textContent + ' ';
   });
   return { text: t.trimEnd(), strongRanges: [] };
  })();

  const font = '300 1.1rem "DM Sans", sans-serif';
  const lineHeight = parseFloat(window.getComputedStyle(pEl).lineHeight) || 20;
  const containerWidth = pEl.clientWidth;
  const lines = computeLines(text, font, containerWidth, lineHeight);
  const lineItems = buildLineSpans(lines, text, strongRanges);

  pEl.innerHTML = '';
  lineItems.forEach(({ span }) => {
   // On resize: show immediately, no animation
   span.style.opacity = '1';
   span.style.animation = 'none';
   pEl.appendChild(span);
  });
 }, 150);
});

ro.observe(card);
</script>
```

**Step 3: Verify in browser**

Reload `http://localhost:3000` and scroll to About. Expected sequence:
1. Card invisible on load
2. Card resolves (frosted glass entrance, ~700ms)
3. Border shimmer sweeps across
4. ~1.5s after page load: lines appear one-by-one from top, 80ms apart
5. Lines containing `cloud infrastructure`, `operations`, or `NocLense` briefly glow emerald then return to white

Open DevTools console — no errors expected. Resize the window — lines reflow without re-animating.

**Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add Pretext line-by-line text reveal with strong word bloom for About section"
```

---

## Task 4: Polish pass

**Files:**
- Modify: `index.html` — CSS and JS tweaks only

**Step 1: Tune animation feel**

Open the page and evaluate:

- If the card entrance feels too fast: increase `0.7s` to `0.8s` in `.about-card` animation duration
- If the shimmer is too bright: lower the `rgba(52, 211, 153, 0.18)` alpha to `0.12`
- If the line stagger feels slow: reduce `80` ms to `60` ms in `revealLines()`
- If the word bloom is too subtle: increase `text-shadow` spread from `18px` to `28px`

**Step 2: Verify mobile**

Resize browser to 375px wide. The card should still resolve cleanly. Lines should reflow correctly via ResizeObserver.

Check existing responsive rule still applies:
```css
@media (max-width: 600px) {
 .glass-section { padding: 2rem 1.5rem; border-radius: 18px; }
}
```

Since `.about-card` extends `.glass-section`, this still applies.

**Step 3: Verify no regressions**

Scroll through the full page and confirm:
- Hero orbit rings still spinning
- Background breathe gradient still animating
- Skills, Projects, Experience cards still reveal with `fadeUp`
- Experience drawer still opens/closes correctly
- Footer visible

**Step 4: Commit**

```bash
git add index.html
git commit -m "polish: tune About section animation timing and verify no regressions"
```

---

## Final Checklist

- [ ] `pretext/dist/layout.js` exists and exports `prepare`, `layoutWithLines`
- [ ] About card entrance: opacity 0→1, scale 0.97→1, backdrop-filter 0→24px over 700ms
- [ ] Border shimmer fires once, no loop
- [ ] Lines reveal sequentially at 80ms stagger
- [ ] Strong words bloom emerald then return to white
- [ ] ResizeObserver reflows lines without re-animating
- [ ] No console errors
- [ ] All other page animations unaffected
