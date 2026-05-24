# Navbar Restructure — Executable Plan ✅ COMPLETE

**Result:** Pill Nav / Tab Nav / Stacked Nav pages deleted. Navbar page now contains all 7 styles as variants. Nav Item set: 20 variants. Navbar set: 10 variants. Zero binding issues (all fills, strokes, text styles, spacing bound to variables).

Spacing decision taken: rounded 10→8 (sm), 16→12 (md), 20→24 (lg), 2→4 (xs). These are minor visual changes from the original; if pixel-perfect fidelity matters, add the component-spacing tokens listed at the bottom.

---


Goal: collapse Pill Nav, Tab Nav, Stacked Nav into the Navbar page as style variants, matching the SCSS where `.navbar-pills`, `.nav-tabs`, `.nav-stacked` are all part of the navigation family using the same `--ply-nav-*` vars.

---

## Target Figma structure

**Navbar page** (only page after this work):

```
Subcomponents
└── Nav Item (COMPONENT_SET)
    Variants: Style × Orientation × State
    Style    = Default | Thick | Borderless | Pills | Tabs | Stacked | Stacked-Blocked
    Orient.  = Horizontal | Vertical   (some styles ignore one — see SCSS)
    State    = Default | Active | Hover

Component
└── Navbar (COMPONENT_SET)
    Variants: Style × Orientation
    Same Style values as Nav Item

Examples
├── Default horizontal
├── Thick border horizontal
├── Borderless horizontal
├── Pills row
├── Tabs row
├── Stacked vertical
├── Stacked-blocked vertical
└── Default vertical
```

---

## SCSS-derived anatomy reference

From `_navigation.scss`:

| Style           | Item padding (y/x)   | Active indicator                         | Background          | Notes                            |
| --------------- | -------------------- | ---------------------------------------- | ------------------- | -------------------------------- |
| Default         | (already in Figma)   | bottom border / left-border (vertical)   | none                | base `.navbar` class             |
| Thick           | (already in Figma)   | thicker bottom border                    | none                | `.navbar-thick`                  |
| Borderless      | (already in Figma)   | none                                     | none                | `.navbar-borderless`             |
| **Pills**       | 0.625rem × 1rem      | filled bg = `--ply-bg-muted`             | none default        | `.navbar-pills`, 2px gap         |
| **Tabs**        | 0.5em × 1em          | bottom border = `--ply-nav-border`       | none                | `.nav-tabs`, parent has border   |
| **Stacked**     | 0.25rem × 0.75rem    | left border 2px = `--ply-btn-default-bg` | none                | `.nav-stacked`, vertical only    |
| **Stacked-Bl.** | 0.6rem × 0.75rem     | bg = `--ply-bg-surface` (active)         | `--ply-bg-surface-alt` | `.nav-stacked-blocked`         |

---

## Execution steps

### Step 1 — Pre-flight audit
- [ ] **1.1** Inspect existing Pill Nav, Tab Nav, Stacked Nav pages — capture all unique frames so nothing is lost on deletion.
- [ ] **1.2** Confirm variable IDs we'll need: `text/body`, `text/muted`, `nav/color`, `nav/active-color`, `nav/bg`, `nav/hover`, `nav/border`, `bg/muted`, `bg/surface`, `bg/surface-alt`, `border/default`, `border/strong`, `space/xs..xxl`, `border/radius`, `button/primary-bg`.
- [ ] **1.3** Capture screenshots of Pill, Tab, Stacked components for visual reference before deletion.

### Step 2 — Extend Nav Item subcomponent
- [ ] **2.1** Add new variants to existing `Nav Item` COMPONENT_SET:
  - `Style=Pills, Orientation=Horizontal, State=Default`
  - `Style=Pills, Orientation=Horizontal, State=Active`
  - `Style=Tabs, Orientation=Horizontal, State=Default`
  - `Style=Tabs, Orientation=Horizontal, State=Active`
  - `Style=Stacked, Orientation=Vertical, State=Default`
  - `Style=Stacked, Orientation=Vertical, State=Active`
  - `Style=Stacked-Blocked, Orientation=Vertical, State=Default`
  - `Style=Stacked-Blocked, Orientation=Vertical, State=Active`
- [ ] **2.2** For each: bind padding, fills, borders, text style per SCSS table above.
- [ ] **2.3** Pills: fill `--ply-bg-muted` on active, transparent default, no border. Need `border/radius` bound (likely full pill = height/2 or fixed `--ply-border-radius`).
- [ ] **2.4** Tabs: bottom border on active = `--ply-nav-border`, no fill.
- [ ] **2.5** Stacked: left border 2px on active = `--ply-btn-default-bg` (use `interactive/accent` var).
- [ ] **2.6** Stacked-Blocked: default bg `--ply-bg-surface-alt`, active bg `--ply-bg-surface`, bottom border `--ply-border-color`.

### Step 3 — Extend Navbar assembly
- [ ] **3.1** Add new Navbar variants matching the Style values from Step 2:
  - `Style=Pills, Orientation=Horizontal`
  - `Style=Tabs, Orientation=Horizontal`
  - `Style=Stacked, Orientation=Vertical`
  - `Style=Stacked-Blocked, Orientation=Vertical`
- [ ] **3.2** Each variant uses 4–5 instances of the matching Nav Item variants (one Active, rest Default).
- [ ] **3.3** Bind container gap to `space/xs` (2px for pills, 0 for stacked) — flag if a new sub-pixel token is needed.

### Step 4 — Restructure Navbar page
- [ ] **4.1** Confirm three sections already exist: `Subcomponents`, `Component`, `Examples` (done in earlier pass).
- [ ] **4.2** Replace existing Examples frames with the 8 examples listed above. Each frame: label + assembled navbar instance.
- [ ] **4.3** Update Navbar COMPONENT_SET description to mention all styles + link to docs.
- [ ] **4.4** Update Nav Item COMPONENT_SET description similarly.

### Step 5 — Delete redundant pages
- [ ] **5.1** Delete `Pill Nav` page.
- [ ] **5.2** Delete `Tab Nav` page.
- [ ] **5.3** Delete `Stacked Nav` page.
- [ ] **5.4** Confirm sidebar `· Navigation` divider still groups Stepper, Navbar, Breadcrumbs, Pagination, Navigation Toggle.

### Step 6 — Final audit
- [ ] **6.1** Re-run the variable-binding audit on the new variants (zero hardcoded fills, all spacing bound, all text styled).
- [ ] **6.2** Screenshot final Navbar page.
- [ ] **6.3** Update `TODO-PLAN.md` to mark Navbar family complete.

---

## Open spacing-token gaps (carry into the variables task §2)

These exact pixel values aren't in the current `space/*` scale and either need new tokens or a documented mapping decision:

| Used by      | Value | Closest existing |
| ------------ | ----- | ---------------- |
| Pill px      | 16    | space/md=12, space/lg=24 |
| Pill py      | 10    | space/sm=8, space/md=12  |
| Pill gap     | 2     | space/xs=4 or 0          |
| Tab py       | ~10   | space/sm=8, space/md=12  |
| Stacked py   | 4     | space/xs=4 ✓             |
| Stacked px   | 12    | space/md=12 ✓            |
| Stacked-Bl py| ~10   | space/sm=8, space/md=12  |

**Decision needed:** add `space/component-xs` (2), `space/component-sm` (10), `space/component-md` (16) tokens, OR round to nearest existing tokens and accept minor visual changes.
