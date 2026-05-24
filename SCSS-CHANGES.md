# SCSS Changes Log

Tracks framework-level SCSS changes made during the Figma ↔ SCSS parity work, with rationale. Companion to the Figma component restructuring (see `TODO-PLAN.md`).

All changes are additive/token-driven — the goal is that **every value in every component is bound to a `--ply-*` variable**, so the whole system can be themed from a small set of root tokens.

---

## 1. Border radius scale

**File:** `src/scss/components/_colors.scss`

**Before:** Two unrelated radius values — `--ply-border-radius: 0.25rem` (4px) and `--ply-btn-border-radius: 2rem` (32px). Everything else (labels, badges, inputs) hardcoded their own radius (e.g., `.badge { border-radius: 15px }`).

**After:** A proper scale plus semantic aliases:

```scss
--ply-radius-none: 0;
--ply-radius-xs: 0.125rem;   // 2px
--ply-radius-sm: 0.25rem;    // 4px
--ply-radius-md: 0.5rem;     // 8px
--ply-radius-lg: 0.75rem;    // 12px
--ply-radius-xl: 1rem;       // 16px
--ply-radius-full: 9999px;   // pill / circle

--ply-border-radius: var(--ply-radius-sm);
--ply-btn-border-radius: var(--ply-radius-full);
--ply-label-radius: var(--ply-radius-sm);    // labels: small by default
--ply-badge-radius: var(--ply-radius-full);  // badges: pill by default
--ply-input-radius: var(--ply-radius-sm);
```

**Why:** Radius was the one dimension with no scale. Components hardcoded values, so a themer couldn't change "all the roundedness" from one place. The two-layer model (scale tokens + semantic aliases) lets a themer change the scale once *or* retarget a single component's alias.

**Knock-on edits:** `_labels.scss` — `.badge` now uses `var(--ply-badge-radius)` (was `15px`); added `.label { border-radius: var(--ply-label-radius) }` (labels previously had no radius).

---

## 2. `--ply-space` (16px default spacing)

**File:** `src/scss/components/_colors.scss`

**Before:** Spacing scale jumped `--ply-space-md` (12px) → `--ply-space-lg` (24px), with no 16px step. 16px is the single most common UI spacing value, so it kept getting needed and rounded.

**After:**

```scss
--ply-space-md: 0.75rem;
--ply-space: 1rem;           // 16px — the default ply spacing unit
--ply-space-lg: 1.5rem;
```

**Why:** Fills the gap non-destructively. Named bare (`--ply-space`, not `--ply-space-default`) because it's *the* default spacing unit — bare name reads cleaner and avoids redundant suffixes. Non-breaking: existing `space-*` names and their utility classes keep their meanings.

---

## 3. Control sizing scale (the big one)

**Files:** `_colors.scss` (tokens), `_buttons.scss` + `_forms.scss` (consumption)

**Problem:** Inputs and buttons were sized by two independent systems. A "Small" input was 35px tall (16px font, 7px padding) while a "Small" button was 28px tall (14px font, 4px padding). They didn't line up in input groups or form rows. Inputs also kept 16px font at *every* size (only padding changed), while buttons scaled font per size.

**Principle (per project owner):** ply controls are **not fixed-height**. Height is emergent = `padding-y × 2 + line-height`. So the fix is shared sizing tokens, not fixed heights.

**After — 16 tokens in `_colors.scss`:**

```scss
--ply-control-font-lg: 1.125rem;  --ply-control-font: 1rem;
--ply-control-font-sm: 0.875rem;  --ply-control-font-xs: 0.75rem;
--ply-control-py-lg: 0.875rem;    --ply-control-py: 0.625rem;
--ply-control-py-sm: 0.375rem;    --ply-control-py-xs: 0.25rem;
--ply-control-px-lg: 2rem;        --ply-control-px: 1.5rem;
--ply-control-px-sm: 1rem;        --ply-control-px-xs: 0.75rem;
--ply-control-lh-lg: 1.75rem;     --ply-control-lh: 1.5rem;
--ply-control-lh-sm: 1.25rem;     --ply-control-lh-xs: 1rem;
```

Values derived directly from the existing button size definitions in `_buttons.scss` (`.btn-lg/sm/xs`), so no visual drift for buttons.

**Consumption — `_buttons.scss`:**
- `.btn` base: `font-size: var(--ply-btn-font-size, var(--ply-control-font))`, `line-height: var(--ply-control-lh)`, `padding: var(--ply-control-py) var(--ply-control-px)`
- `.btn-lg` / `.btn-sm` / `.btn-xs`: font + line-height + padding all from the matching `lg/sm/xs` control tokens

**Consumption — `_forms.scss`:**
- `.form input/textarea/select` base: font + line-height + padding from default control tokens (was `0.5em 0.75em`)
- `.input-lg` / `.input-sm` / `.input-xs`: font + line-height + padding from matching control tokens (previously only set font-size)

**Result:** A given size label now produces the same height for any control. Verified in Figma: Large 56 / Default 44 / Small 32 / XSmall 24, input == button at each size.

**Why this shape:** Specific per-size tokens (rather than em-derived) because Figma variables are px-only with no `calc`/`em` — specific tokens keep SCSS and Figma numerically locked. Line-height is per-size (28/24/20/16) because the ratio isn't constant across sizes, so a single multiplier wouldn't reproduce the intended heights.

---

## Build verification

`npx sass src/scss/ply-iso.scss` compiles cleanly after all changes. `--ply-control-*` resolves 40× in the output bundle.

---

## Still pending (SCSS side)

- **Accordion caret** — move from left `::before` to right side in `_reset.scss` (Figma side already done).
- **`--ply-color-black` / `--ply-bg-inverse`** — inverse/black tokens (Figma already has `bg/inverse`, `layer/inverse-*`).
- **Select / Textarea / Checkbox & Radio** — confirm they consume the control sizing tokens so they match buttons/inputs.
- Mirror the radius + control tokens into `ply-classes.json` `customProperties` and `themeTemplate`.
