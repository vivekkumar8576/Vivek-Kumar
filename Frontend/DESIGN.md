# KrishiVani Design Direction

## Aesthetic Direction
KrishiVani uses a calm, premium agri interface grounded in earth and crop tones. The visual anchor is real farm photography paired with restrained surfaces and clear hierarchy, so the product feels dependable for daily decisions.

## Anti-Slop Baseline
- No neon gradients, glassy crypto look, or synthetic SaaS blue.
- No crowded hero with stat chips, badges, promos, or floating overlays.
- No random icon strips, decorative cards, or heavy shadows as structure.
- No inconsistent corner radii and no noisy motion loops.
- No placeholder lorem blocks or fake dashboards.

## Typography System
- Display font: Fraunces (section and hero emphasis).
- Body font: Inter (forms, tables, labels, data).
- Fluid scale:
1. Hero Display: `clamp(2rem, 5vw, 4rem)`
2. Section Title: `clamp(1.3rem, 2.1vw, 2rem)`
3. Body: `0.95rem - 1rem`
4. Micro Label: `0.72rem - 0.78rem` uppercase tracking

## Color Tokens (OKLCH)
```css
--surface-base: oklch(0.99 0.008 95);
--surface-cream: oklch(0.965 0.018 95);
--ink-strong: oklch(0.27 0.034 156);
--ink-muted: oklch(0.45 0.02 140);
--line-soft: oklch(0.83 0.018 120);
--tone-leaf: oklch(0.53 0.12 145);
--tone-warning: oklch(0.57 0.19 45);
--tone-warning-soft: oklch(0.92 0.05 45);
```

## Layout Philosophy
- Two-page flow only: Auth and Dashboard.
- Full-bleed image planes for first impression (auth and dashboard hero).
- Content area constrained to `max-w-6xl` for readability.
- Each section has one clear job: crops, schemes, prices.

## Spacing Tokens
- Section padding: `py-12` default, `py-20/py-28` for hero.
- Component gap: `gap-3` to `gap-7` based on density.
- Border-first separation over shadow-first separation.

## Motion Rules
- Page entry fades and short y-shifts (`0.24s - 0.45s`).
- Hover lift only on interactive modules (`y: -2 to -5`).
- Price rows animate on update subtly via layout/opacity transitions.

## Imagery Direction
- Real farm, field, and crop photography from Unsplash.
- Warm daylight with natural contrast; no abstract placeholders.
- Imagery supports context (farming reality), not decoration.