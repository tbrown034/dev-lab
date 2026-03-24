# Design System — learn-coding

> **First impression (5 seconds):** Sharp. Professional. Confident.

This document defines the visual language, layout philosophy, and component patterns for the learn-coding platform. Every design decision should pass this test: *does it make the platform feel sharper, more professional, and more confident?*

---

## 1. Design Principles

### Spacious, not sparse
Generous whitespace in lessons and content areas. Information is already complex — the design should never add visual noise. Break content into small, digestible sections. Use space to create rhythm and hierarchy, not decoration.

### Structured, not rigid
Grid-first layouts for consistency across all breakpoints. Linear learning paths with clear entry points. Users should always know where they are and what's next. But the structure should feel like a well-organized magazine, not a spreadsheet.

### Familiar, then surprising
Lessons should feel like reading a well-designed blog post or article. The baseline experience is comfortable and expected. Quizzes, games, interactive demos, and use cases are *surprises within* that familiar frame — moments of delight, not the default.

### Consistent above clever
No CSS tricks that break on edge cases. Grid over flexbox when layout needs to hold across breakpoints. Flexbox only where content genuinely adapts to unknown sizes (inline tags, variable-length lists). If something looks different on mobile than desktop, that's a bug in the system, not a feature.

---

## 2. Color

### Philosophy
Color is **functional, not decorative**. It identifies tracks, signals state, and creates hierarchy. We don't use color for atmosphere or mood — the typography and spacing handle that.

### Neutral Palette

Dark mode (default):
```
Background:    #060608     (near-black, warm undertone)
Surface:       #0e0e12     (cards, raised elements)
Surface-2:     #16161d     (hover states)
Border:        #1e1e28     (dividers, card edges)
Border-hover:  #2a2a38     (interactive borders)
Text:          #e8e6f0     (primary — warm white, not pure white)
Text-dim:      #8886a0     (secondary labels, descriptions)
Text-muted:    #55536a     (tertiary, timestamps, metadata)
```

Light mode:
```
Background:    #f5f4f1     (warm off-white, not cold gray)
Surface:       #ffffff     (cards)
Surface-2:     #eeecea     (hover states)
Border:        #ddd9d4     (warm beige, not blue-gray)
Text:          #1a1918     (dark brown-black, not pure black)
Text-dim:      #5c5850     (warm brown-gray)
Text-muted:    #8a857c     (lightest readable)
```

Key detail: Light mode leans **warm** (beige, brown) not cold (blue-gray). This is intentional and distinctive.

### Track Colors

Track colors come from the technology's own branding where possible. This keeps them feeling natural rather than arbitrarily assigned.

```
D3.js:         #f97316     (orange — matches d3js.org)
Django/Python: #22c55e     (green — matches Django branding)
SQL:           #3b82f6     (blue — database/data conventions)
JS/TS:         #eab308     (yellow — JS community color)
React:         #06b6d4     (cyan — React's brand blue)
CSS:           #a855f7     (purple — no strong convention, distinct from others)
AI/LLM:        #f472b6     (pink — distinct, no overlap)
```

Rules:
- Track color is used for **identification only**: track labels, active states, lesson accent highlights, icon backgrounds
- Track color at **10-15% opacity** for backgrounds (e.g., `rgba(249,115,22,0.12)` for D3 icon containers)
- Never use track color for large fills, gradients, or decorative backgrounds
- If a track doesn't have obvious brand-color precedent, pick something that's visually distinct from existing tracks at a glance

### Semantic Colors
```
Success:       #4ade80
Warning:       #fde68a
Error:         #f87171
Info:          #818cf8     (indigo — callouts, tips, notes)
```

---

## 3. Typography

### Font Stack
```
Headlines:     'Instrument Serif', Georgia, serif
Body/UI:       'DM Sans', -apple-system, system-ui, sans-serif
Code/Labels:   'JetBrains Mono', 'SF Mono', 'Fira Code', monospace
```

### Roles
- **Instrument Serif** — Headlines, hero text, section titles. Gives the platform its editorial, confident voice. Used sparingly for impact.
- **DM Sans** — Body text, UI elements, descriptions, navigation. Clean and readable. The workhorse.
- **JetBrains Mono** — Code blocks, inline code, technical labels, metadata tags, kickers. Signals "this is technical" instantly.

### Scale

Base: `1rem` (16px)

```
Hero:          clamp(3rem, 8vw, 5.5rem)   serif, 400
Page title:    2rem                         serif, 400
Section head:  1.6rem                       serif, 400
Card title:    1.15rem                      sans, 600
Body:          1rem                         sans, 400, line-height 1.8
Body small:    0.9rem                       sans, 400, line-height 1.7
Label:         0.7rem                       mono, 400, 0.04em tracking, uppercase
Code inline:   0.85rem                      mono, 400
Code block:    0.85rem                      mono, 400, line-height 1.7
```

### Rules
- **Line height for body text is always 1.7-1.8.** Lessons are long-form reading — generous line height reduces fatigue.
- **Monospace labels always get letter-spacing** (0.04-0.15em) and uppercase. This creates the "sharp" technical feel.
- **Never use more than 2 font weights on a single page** (400 and 600). If something needs emphasis, use size, color, or spacing — not bold.
- **Serif is for headlines only.** Never in body text, never in UI controls.

---

## 4. Spacing

### Base Unit
`0.5rem` (8px). All spacing should be a multiple of this.

```
xs:    0.25rem   (4px)    — inner padding on tags, tight gaps
sm:    0.5rem    (8px)    — between related elements
md:    1rem      (16px)   — standard padding, card internals
lg:    1.5rem    (24px)   — between sections within a card
xl:    2rem      (32px)   — between major sections
2xl:   3rem      (48px)   — page section breaks
3xl:   4rem      (64px)   — hero/major visual breaks
```

### Rules
- Lesson content max-width: **900px** (optimal reading width)
- Home/catalog pages max-width: **1280px**
- Feed max-width: **680px** (social/conversational width)
- Card padding: **1.5-2rem** consistently
- Section spacing: **2-3rem** between major blocks in lessons

---

## 5. Layout

### Grid-First Philosophy
Use CSS Grid for any layout where elements should hold their position across breakpoints. Use flexbox only where content is truly variable-length (tag lists, inline badges, wrapping nav items).

```css
/* Track cards — holds structure on all screens */
.tracks { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; }

/* Lesson list — always a consistent list */
.lessons { display: grid; grid-template-columns: 1fr; gap: 0; }

/* Tag list — variable number of items, wraps naturally */
.tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
```

### Breakpoints
```
Mobile:        < 768px      (single column, tighter padding)
Tablet:        768-1024px   (2-column grids)
Desktop:       > 1024px     (full layout, 3+ columns)
```

### Rules
- Mobile is not an afterthought — every layout must be designed mobile-first or at minimum tested on mobile before shipping
- Prefer `repeat(auto-fit, minmax(Xpx, 1fr))` for grids that need to adapt, over media-query-based column changes
- Sticky header: 60px height, always, both modes
- Lesson pages: single-column centered content, no sidebar. Sidebar patterns are for tools (podcast-prep) not learning.

---

## 6. Components

### Cards
- Border: `1px solid var(--border)`, not shadows
- Border-radius: `6-8px` for standalone cards, `0` for grid cells separated by 1px borders
- Hover: subtle background shift to `var(--surface-2)`, border to `var(--border-hover)`. No scale transforms, no shadows on hover.
- The **1px border grid** (cards separated by single-pixel lines) is a signature pattern. Use it for track listings and lesson grids. It creates an editorial, newspaper feel.

### Buttons
- Primary: Track accent color background, dark text
- Secondary: Transparent with 1px border, text color
- Size: `padding: 0.5rem 1rem`, `border-radius: 6px`
- Never pill-shaped (`border-radius: 999px`). We're sharp, not soft.
- Hover: slight brightness shift, not color change

### Code Blocks
- Background: `#141414` (dark mode), slightly darker than surface
- Border: `1px solid #222`
- Padding: `1.25rem`
- Border-radius: `6px`
- Inline code: Track accent color for text, `rgba` background tint, `0.2-0.4rem` horizontal padding

### Callouts / Tip Boxes
- Left border: `3px solid` in semantic color (info=indigo, warning=yellow, success=green)
- Background: semantic color at 5-8% opacity
- No icons in the border area. Keep it clean.
- Padding: `1rem 1.25rem`

### Navigation
- Monospace, uppercase, small (0.7rem), tracked (0.04em)
- Active state: accent color text or colored underline/background
- Lesson nav: horizontal scrollable, current lesson highlighted with accent background

---

## 7. Texture & Atmosphere

### Noise Overlay
The SVG fractal noise overlay is a **signature element**. It adds a subtle grain texture that gives the interface a physical, editorial quality — like printed paper or film.

```
Dark mode opacity:  0.03-0.05 (subtle)
Light mode opacity: 0.015     (barely perceptible)
Filter: baseFrequency 0.9, contrast(170%) brightness(1000%)
```

Rules:
- Always present on the background layer
- Never applied to cards or interactive elements
- Opacity should be felt, not seen — if you can clearly see the dots, it's too strong

### Header Blur
- `backdrop-filter: blur(20px)` on sticky header
- Semi-transparent background: `rgba(6,6,8,0.85)` dark, `rgba(245,244,241,0.85)` light
- Creates depth without heavy shadows

### Easing
```
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)
```
Use for all transitions. Fast start, gentle landing. Feels confident and decisive, not bouncy or lazy.

---

## 8. Three Learning Modes

The platform offers three ways to learn. Each should be visually distinct on the home page so users immediately understand their options:

### Lessons (Structured)
The traditional path. Linear curriculum, one lesson at a time. Visual language: **ordered, numbered, sequential.** Grid layouts, clear progression indicators, chapter-like structure.

### Podcasts (Passive)
Listen and absorb. Companion audio for each lesson. Visual language: **minimal, ambient.** A simple player bar, not a complex audio interface. The content is in your ears, not your eyes.

### Feed (Social/Active)
Bite-sized posts, tips, connections between topics. Visual language: **conversational, stream-like.** Narrow column, card-based, scrollable. Think curated blog feed, not social media timeline.

---

## 9. What We Don't Do

- **No gradient backgrounds** on cards or sections. Gradients are for hero areas at most, and only subtle radial ones.
- **No shadows** as primary depth cue. We use borders and background color shifts.
- **No pill buttons** (border-radius: 999px). Radius is 6-8px max.
- **No emoji as design elements.** If an emoji appears, it's in user content or a very intentional moment, never decoration.
- **No arbitrary color.** Every color in the palette has a defined role. If you need a new color, define its role first.
- **No inconsistent mobile.** If it doesn't work on a phone, it doesn't ship.
- **No decorative illustrations.** The content is the visual. Code, charts, and interactive demos are our illustration.
- **No "AI aesthetic."** No purple gradients, no floating orbs, no chat-bubble-everything, no "powered by AI" badges. The AI features (tutor, podcast scripts) are tools in the background, not the brand.

---

## 10. Voice Check

Before adding any visual element, ask:

1. **Is it sharp?** — Does it have clear edges, defined hierarchy, intentional placement? Or is it soft, vague, decorative?
2. **Is it professional?** — Would this feel at home in a newsroom tool or a Bloomberg terminal? Or does it feel like a toy?
3. **Is it confident?** — Does it commit to a choice (this font, this size, this color) or hedge with options and decoration?

If the answer to any of these is no, simplify.
