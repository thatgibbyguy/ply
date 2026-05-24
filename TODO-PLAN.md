# ply — Investigative Work Plan

Generated after auditing SCSS, docs, and Figma (file: Ply, key `TCVYvIiyczmKhFpy7Bkc5F`).

---

## ✅ Progress (as of 2026-05-24)

### Figma pages restructured to Stepper template (Subcomponents / Component / Examples)

Every component below has: section structure, component descriptions, bg/body on examples + component frames, em-dashes removed, all fills/strokes/text/spacing bound to variables. Zero binding issues.

- ✅ **Accordion** — Content Slot + Summary subcomponents, caret on right, 3 examples
- ✅ **Navbar** — Nav Item (20 variants) + Toggle, 10 Navbar variants, 10 examples. **Absorbed Pill Nav / Tab Nav / Stacked Nav / Navigation Toggle pages** (4 pages deleted)
- ✅ **Breadcrumbs** — Crumb + Separator subcomponents, 3 examples
- ✅ **Pagination** — Pagination / Item subcomponent, 3 examples
- ✅ **Table** — Cell + Column subcomponents, 6 style examples
- ✅ **Alert** — Dismiss subcomponent, 8 examples
- ✅ **Dialog** — Close Button subcomponent, 4 examples
- ✅ **Label** — atomic, 3 examples, now uses `--ply-label-radius`
- ✅ **Badge** — atomic, 3 examples, now uses `--ply-badge-radius`
- ✅ **Tooltip** — atomic, 2 examples
- ✅ **Progress** — atomic, 5 examples
- ✅ **Meter** — atomic, 4 examples

23 components total, all with descriptions stored in their `description` field.

### Framework additions

- ✅ **Border radius scale** added to SCSS + Figma:
  - 7 scale tokens: `--ply-radius-none/xs/sm/md/lg/xl/full`
  - 5 semantic aliases: `--ply-border-radius`, `--ply-btn-border-radius`, `--ply-label-radius`, `--ply-badge-radius`, `--ply-input-radius`
- ✅ **`--ply-space` (16px default)** added to SCSS + Figma — fills the gap between `space-md` (12) and `space-lg` (24).
- ✅ **Control sizing scale** added to SCSS + Figma — `--ply-control-font/py/px/lh` × `lg/(default)/sm/xs` (16 tokens). Shared by inputs, buttons, selects, textareas so a given size = same height across all controls. Heights are emergent (font + padding + line-height), never fixed. Verified: Large 56 / Default 44 / Small 32 / XSmall 24 — input and button match at every size. SCSS button base + `.btn-lg/sm/xs` and input base + `.input-lg/sm/xs` wired to these tokens; compiles clean.
- ✅ **Icon toggles** on Label + Badge — `Show Left Icon` / `Show Right Icon` boolean component properties.
- ✅ **Input + Input Group** done — extracted shared `Input / Field` subcomponent (20 variants); Input Group instances the real Field + Button components.

### Form components — ✅ all done

- ✅ Button (384 variants, control tokens, usage examples)
- ✅ Input (+ shared Input / Field subcomponent)
- ✅ Select, Textarea — control tokens, match input/button heights
- ✅ Checkbox & Radio — two sets, usage examples
- ✅ Input Group — instances real Field + Button
- ✅ Autocomplete — input is a Field instance
- ✅ Multi-Select — tags + dropdown bound to tokens
- ✅ File Upload — dropzone states
- ✅ Date & Time Picker — Date/Time/DateTime, control tokens

### Pages remaining

- Colors & Theming, Typography, Grid (style-guide pages — likely a different layout, not the Subcomponents/Component/Examples component pattern)

### Other deferred items

- Section 1.2 (Accordion SCSS caret move to right) — still pending; only the Figma side is done
- Section 2 (`--ply-color-black`, `--ply-bg-inverse`) — not started

---

## 1. Accordion

### What I found

- **Real implementation:** `src/scss/components/_reset.scss:265-301` — uses native `<details>`/`<summary>`. Caret is a `::before` pseudo with `\25B6` (▶) on the **left**, rotates to 90° on `[open]`. Native `::marker` and `::-webkit-details-marker` are hidden (line 279-282) — this is correct because we draw our own; the user-facing complaint is that the *custom* caret is on the wrong side, not that the hide is wrong.
- **Dead code:** `src/scss/components/_accordion.scss` is the legacy JS-dependent component (parallel to the removed dropdown). It still uses `$color-gray-pastel`, hardcoded `#000`, and `.accordion-toggle` ± / × icons. Not used by `<details>`.
- **Reset has hardcoded fallback** `#e0e0e0` (lines 267, 299) — should use the var only.
- **Figma page "Accordion":** one Section with two items (`Slot/Default`, `Accordion`). No Subcomponents/Examples structure, no visible caret on the component when inspected, no documentation block.
- **Docs site:** no `accordion.astro` page. Only mention is two bare `<details>` examples in `plygrid-web-and-docs/src/pages/docs/semantic-html.astro:207-215`.

### Steps

- [ ] **1.1 Decide the dead-code question.** `_accordion.scss` is unused and predates `<details>`. Delete it (mirrors the dropdown removal) — confirm with you before deleting.
- [ ] **1.2 Move caret to the right** in `_reset.scss:273-291`:
  - Make `summary` `display: flex; align-items: center; gap: 0.5em;`.
  - Move the `::before` rule to `::after`, drop `margin-right`, add `margin-left: auto`.
  - Update the `[open]` rotation rule (line 293) to target `::after`.
  - Pick a caret glyph that reads as "expand" on the right — `\25BC` (▼) collapsed, no rotation needed, OR keep `▶` and rotate to 90°. Recommend ▼/▲ pattern since right-side ▶ reads as "go forward" rather than "expand".
- [ ] **1.3 Drop hardcoded `#e0e0e0` fallbacks** (lines 267, 299) — `var(--ply-border-color)` only.
- [ ] **1.4 Figma parity** — open the Accordion page and:
  - Add the caret on the right of the summary row (icon matching SCSS choice).
  - Add open/closed variants.
  - Restructure the page using the Stepper template (see §3).
- [ ] **1.5 Add a docs page.** New `plygrid-web-and-docs/src/pages/docs/accordion.astro`, modeled on `alerts.astro` (540 lines, has the documentation pattern you want everywhere). Include: default, multiple open, nested, with-form-content. Add to nav.
- [ ] **1.6 Update `ply-classes.json`** `semanticElements` entry for `<details>`/`<summary>` to describe the right-side caret and link to the new docs page. Update `PLY.md` accordion paragraph.
- [ ] **1.7 Verify** in browser light + dark + a custom `data-theme`, then commit.

---

## 2. CSS variables

### What I found

In `src/scss/components/_colors.scss`:
- `--ply-color-text-inverse` already exists: `#ffffff` (light) → `#161616` (dark). This is a **text** color, not a surface.
- There is **no `--ply-color-black`**.
- There is **no `--ply-bg-inverse`** or `--ply-color-inverse` surface token. "Body/Layer Inverse" in your Figma matches this gap — a surface that flips opposite the body.

### Steps

- [ ] **2.1 Add `--ply-color-black`** in `_colors.scss`:
  - Define in `:root` light block AND dark block as `#000000` (identical — survives all themes).
  - Add equivalent for white if missing (audit).
- [ ] **2.2 Add inverse surface tokens** in `_colors.scss`:
  - Light: `--ply-bg-inverse: #161616;` `--ply-color-on-inverse: #f4f4f4;`
  - Dark:  `--ply-bg-inverse: #f4f4f4;` `--ply-color-on-inverse: #161616;`
  - Naming question for you: keep existing `--ply-color-text-inverse` or rename to `--ply-color-on-inverse` for symmetry with `bg-inverse`? Recommend **keeping `text-inverse` and adding `bg-inverse`** to avoid a breaking rename — they pair naturally (`text-inverse` is the text color *for use on* `bg-inverse`).
- [ ] **2.3 Update `ply-classes.json`** `customProperties` with the new tokens (both light/dark values) and add them to `themeTemplate`.
- [ ] **2.4 Update PLY.md** custom theme example to include the new vars.
- [ ] **2.5 Figma sync:** Figma already has the inverse vars pointing to text-primary/secondary — rename Figma vars to match the final SCSS names from 2.2 exactly.
- [ ] **2.6 Smoke-test** the inverse tokens by building a small "footer on dark" snippet that uses only the new vars; flip to dark mode to confirm it inverts correctly.

---

## 3. Figma — architecture (atoms vs molecules)

### What I found

- **Stepper page (template):** 4 sections — `Subcomponents`, `Component`, `Examples — Horizontal`, `Examples — Vertical`. This is the gold standard.
- **Navbar page:** has 2 `COMPONENT_SET`s — `Navbar` (6 variants: Default/Thick/Borderless × Horizontal/Vertical) and `Nav Item` (12 variants). Subcomponents exist *inline* but not sectioned, and no Examples.
- **Pill Nav page:** standalone `COMPONENT` "Pills" containing 4 Pill instances (one Active). Structurally separate from Navbar.
- **Tab Nav page:** standalone `COMPONENT` "Tabs" containing 3 Tab instances.
- **Stacked Nav page:** `COMPONENT_SET` with Default/Blocked styles.
- **Accordion page:** single Section, two items, no structure.

### Decision needed (recommendation in bold)

- Pill Nav / Tab Nav / Stacked Nav are **already standalone components in Figma and standalone class families in SCSS** (`.pill-nav`, `.tabs`, `.stacked-nav` — verify in `_navigation.scss`). **Recommendation: keep them standalone, do not collapse into Navbar variants.** Each gets its own Stepper-style page.

### Steps

- [ ] **3.1 Confirm SCSS class separation.** Grep `_navigation.scss` for `.pill-nav`, `.tabs`, `.stacked-nav` — confirm they are independent class trees. If yes, the standalone-component decision is locked in.
- [ ] **3.2 Restructure each component page** to the Stepper template:
  - Navbar: add `Subcomponents` section (lift `Nav Item` into it), add `Examples` section with Horizontal/Vertical/Thick/Borderless examples.
  - Pill Nav: add `Subcomponents` (Pill atom), `Component` (the Pills container), `Examples` (active state, with-icons, etc.).
  - Tab Nav: same — Tab atom → Tabs container → Examples.
  - Stacked Nav: Subcomponents (Stacked Nav Item), Component, Examples for Default + Blocked.
  - Accordion: Subcomponents (Summary row, Content panel), Component, Examples (closed, open, nested, with-form).
- [ ] **3.3 Audit the other 27 pages** against the template — produce a per-page checklist (this is a follow-on plan, not in this pass).

---

## 4. Figma — component documentation

### What I found

- Alert page is the template you cited but Figma shows it as just one Section with one `Alert` item — the "documentation block" you mean is presumably on the component's description / properties panel, not in the canvas listing. Need to inspect the Alert component's `description` field to capture the exact pattern.

### Steps

- [ ] **4.1 Extract the Alert template.** Use `figma_get_component_details` on the Alert component to capture: description text, property docs, link format. Save as the canonical doc block.
- [ ] **4.2 For each component, fill in:**
  - One-line description
  - Variants enumerated
  - Anatomy (named sub-parts — depends on §3 being done first)
  - Do / Don't pairs
  - Link to `https://ply.dev/docs/<page>` (or the local docs URL)
- [ ] **4.3 Cross-check** every entry in `ply-classes.json` `classes` has a matching Figma component with a description block, and vice versa. Produce a gap list.

---

## 5. Figma — library mapping (text, color, spacing)

Depends on §2 (new vars must exist before colors can be mapped to them) and §3 (structure must be stable so we don't map twice).

### Steps

- [ ] **5.1 Text styles audit.**
  - Use `figma_execute` to walk every TEXT node and report any whose `textStyleId` is empty.
  - For each unmapped text: either bind to an existing style or define a new style first.
- [ ] **5.2 Color variables audit.**
  - Walk every node's `fills` and `strokes`; report any solid paints not bound to a variable.
  - For each: bind to a `--ply-*` token. If no token fits, **add to ply framework first** (this is why §2 ships before §5), then bind.
- [ ] **5.3 Spacing variables audit.**
  - Walk every AutoLayout frame's `paddingLeft/Right/Top/Bottom`, `itemSpacing`. Report any not bound to a Number variable.
  - Bind to spacing tokens; add new tokens to `_variables.scss` first if a needed value is missing.
- [ ] **5.4 Final lint.** Re-run the three audits and confirm zero unbound values.

---

## Execution order

1. **§1 Accordion** — self-contained, ships value immediately.
2. **§2 Variables** — must land before §5 color mapping.
3. **§3 Figma architecture** — restructure before adding docs to avoid rework.
4. **§4 Component docs** — depends on §3 anatomy being stable.
5. **§5 Library mapping** — last; depends on §2 tokens and §3 structure.

## Open questions for you

1. Accordion caret glyph — keep `▶` rotating, or switch to `▼`/`▲` pair on the right?
2. Delete `_accordion.scss` legacy file? (Same situation as the dropdown you just removed.)
3. New inverse var naming — `--ply-bg-inverse` + existing `--ply-color-text-inverse`, or rename to `--ply-color-on-inverse` for symmetry (breaking change)?
4. Confirm Pill Nav / Tab Nav / Stacked Nav stay as standalone components (not Navbar variants)?
