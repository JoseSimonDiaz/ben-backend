---
name: ui-ux-design
description: "Use when designing UI/UX for web apps. Covers: design system setup, accessibility, responsive layout, micro-interactions, and visual hierarchy grounded in UX research."
---

# UI/UX Design

## Design System (Default: Neutral Modern)

### Palette
- **Background:** `#FAFAFA` / **Foreground:** `#111111`
- **Surface:** `#FFFFFF` (cards, modals)
- **Accent:** `#2F6FEB` (cobalt) — 1 per screen max
- **Muted:** `#6B6B6B` / **Border:** `#E5E5E5`
- **Semantic:** Success `#17A34A`, Warn `#EAB308`, Danger `#DC2626`
- Dark mode: bg `#0f0f0f`, fg `#f0f0f0` (never pure black/white)

### Typography
- **Font:** Inter, system-ui, sans-serif
- **Scale (px):** 12 · 14 · 16 · 20 · 24 · 32 · 48 · 64
- **Line-height:** body 1.5, headings 1.2
- **Letter-spacing:** display ≥32px `-0.01em`, ALL CAPS `0.06em–0.1em`
- **Weights:** 3 max — 400 (body), 500 (labels/UI), 600 (headlines)

### Components
- **Buttons:** 8px radius, 10/16px padding, primary = accent fill
- **Cards:** 1px border, 12px radius, 20px padding, no shadow
- **Inputs:** 1px border, 8px radius, 10px padding, accent focus

### Layout
- 12-col grid, 1200px max-width, 24px gutters
- Section spacing: 80px desktop / 48px tablet / 32px phone
- Semantic tokens for colors (purpose-based, never hue-based)

## Craft Rules

### State Coverage
Every component needs 5 states: **Loading, Empty, Error, Populated, Edge**. Missing states are the #1 AI-generated UI failure. Never render only the populated state.

### Color Discipline
- Neutrals 70-90% of pixels, accent 5-10%, semantic <5%
- Max 2 visible accent uses per screen (e.g. one eyebrow + one CTA)
- Contrast: body ≥4.5:1, large text ≥3:1, components ≥3:1

### Anti-AI-Slop
Avoid these P0 tells:
- Indigo `#6366f1` as accent (default Tailwind tell)
- Two-stop gradient on hero (purple→blue)
- Emoji as feature icons — use 1.6px-stroke SVG with `currentColor`
- Rounded card with colored left-border
- Invented metrics ("10x faster") or filler copy (lorem ipsum)

### Forms
- Validate on blur, not first keystroke
- Once invalid, re-validate on every input
- Preserve user input on error
- Server is truth, client is optimization
- Clear errors the moment input becomes valid

### Animation
- Duration: 50-100ms (instant), 150ms (default), 200-300ms (enter), 300-500ms (cross-screen)
- Curve for opacity/color, spring for position/scale
- Respect `prefers-reduced-motion`
- Cap spinners at 60s then show error

## Laws of UX (Quick Reference)

| Law | Rule |
|-----|------|
| Hick's | Cap decisions at 3-5 visible options |
| Fitts's | Touch targets ≥24×24px, place frequent actions in thumb arc |
| Miller's 7±2 | Group related items — settings in sections beats flat list of 30 |
| Peak-End | Stage a celebratory success state; end strong |
| Zeigarnik | Show progress ("3 of 5 steps") to pull users through flows |
| Serial Position | Anchor important nav at left/right extremes, utilities in middle |
| Proximity | 8-12px within group, 32-48px between groups |
| Similarity | Same affordances = same treatment; deviation draws attention |
| Choice Overload | 3-4 pricing tiers, 6-9 product cards above fold |
| Cognitive Load | You own extraneous (poor layout, jargon, visual noise); you can't reduce intrinsic |

## Responsive Breakpoints
- Desktop ≥1024px: 12-col, 24px gutters
- Tablet 640-1023px: 8-col, 16px gutters
- Phone <640px: 4-col, 12px gutters

## Accessibility Baseline (WCAG 2.2 AA)
- Touch targets ≥24×24 CSS px
- Labels paired with inputs via `<label>` or `aria-label`
- Error messages linked via `aria-describedby`
- Color never the only signal — pair with icon/text/pattern
- Loading: `role="status"` announcement
- Reduced motion: strip translate/scale/rotate, keep opacity crossfade
- Flash limit: max 3 flashes per second
- Error on submit: focus moves to first invalid field or error summary

## Common Mistakes to Lint
- Only populated state rendered; no loading/empty/error/edge
- Accent overuse (>2 per screen) or indigo as accent
- ALL CAPS without letter-spacing ≥0.06em
- Body copy at `text-align: justify`
- Emoji icons instead of SVG
- Rounded card + left colored border
- Generic error messages ("Something went wrong")
- Spinner with no timeout
- Styling off `:invalid` instead of `:user-invalid` (red on page load)
- Validating on every keystroke
