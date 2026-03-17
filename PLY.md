# PLY — AI-Ready CSS Framework

ply is a ratio-based, flexbox CSS framework with dark mode, accessibility defaults, and a small footprint (~19KB gzip full, ~17KB core). 414 utility classes, 60 CSS custom properties, 13 auto-styled semantic elements.

**Differentiators:** Small bundle, AI-parseable class system, accessible out of the box, dark mode built-in.

## Before Writing Custom CSS — Search ply-classes.json

**`ply-classes.json`** is the complete searchable reference. Before writing any custom CSS, search it first:

- **`classes`** — Every ply class (265+) with category, description, and usage examples. Search here before inventing a class name or writing a custom style.
- **`customProperties`** — All `--ply-*` CSS variables organized by category (background, text, borders, interactive, forms, code, tables, buttons, navigation, elevation, brand, palette). Each entry includes light and dark mode values. Use these instead of hardcoding colors.
- **`semanticElements`** — Every HTML element ply auto-styles (`<dialog>`, `<details>`, `<table>`, `<code>`, `<kbd>`, `<mark>`, `<progress>`, `<meter>`, headings, form controls) with styling details and usage tips. Check here before building a custom component.

The JSON is the source of truth. If a class, variable, or semantic element already does what you need, use it instead of writing custom CSS.

## Custom Themes

Create a custom theme by defining a `data-theme` value and overriding `--ply-*` custom properties. Every ply component respects these variables, so one block themes the entire app.

```css
[data-theme="brand"] {
  --ply-bg-body: #fefce8;
  --ply-bg-surface: #fef9c3;
  --ply-bg-muted: #fef08a;
  --ply-color-body: #1a1a1a;
  --ply-color-headings: #78350f;
  --ply-color-link: #b45309;
  --ply-color-link-hover: #92400e;
  --ply-border-color: #fbbf24;
  --ply-btn-default-bg: #b45309;
  --ply-btn-default-hover: #92400e;
  --ply-nav-bg: #fef3c7;
  --ply-nav-border: #f59e0b;
}
```

```html
<html data-theme="brand">
```

See `customProperties` in `ply-classes.json` for the full list of overridable variables.

## Philosophy: Start Semantic

ply automatically styles semantic HTML elements — tables, code blocks, blockquotes, navs, details/summary, dialogs, progress bars, meters, forms, and more. Before reaching for a `<div>` with a custom class, check if a semantic element already does what you need. Custom styling is fine when you need it, but start with what HTML and ply give you for free.

```html
<!-- Start here — ply styles these automatically -->
<nav>  <table>  <code>  <blockquote>  <details>  <dialog>  <progress>

<!-- Then reach for ply classes when you need layout or variants -->
<div class="units-row">  <div class="alert alert-blue">  <button class="btn">
```

## Quick Start

### npm + Sass (recommended)

For any real project, install ply and work with the SCSS source. This gives you the full color palette, spacing variables, mixins, and the ability to customize everything at the Sass level.

```sh
npm install plygrid
```

```scss
// Import all of ply
@use "plygrid/src/scss/ply" as *;

// Or import just what you need
@use "plygrid/src/scss/components/colors" as colors;
@use "plygrid/src/scss/components/variables" as variables;
@use "plygrid/src/scss/components/mixins" as mixins;

// Now you can use ply's Sass variables and mixins
.my-component {
  color: colors.$color-blue;
  background: colors.$color-blue-pastel;
  @include mixins.border-bottom-radius(variables.$border-radius);
}
```

The SCSS source lives in `src/scss/`. Key files:
- `components/_colors.scss` — Full color palette (brand colors, dark/light/pastel variants, neutral scale)
- `components/_variables.scss` — Spacing, font sizes, breakpoints, border radius
- `components/_mixins.scss` — Button generator, clearfix, gradients, arrows, animations

### CDN (prototyping only)

For quick demos or prototypes, drop in the CSS directly:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/plygrid@1/dist/css/ply.min.css">
```

Or the lean core bundle (no labels, dropdowns, loaders, print styles):

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/plygrid@1/dist/css/ply-core.min.css">
```

Note: The CDN approach gives you ply's classes and dark mode, but you won't have access to Sass variables, the full color palette, or mixins for custom components.

## Icons

ply does not include icons. [Feather Icons](https://feathericons.com) is the recommended icon library — it's lightweight, clean, and pairs well with ply's aesthetic. Any icon library works.

```html
<script src="https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js"></script>
<script>feather.replace();</script>

<!-- Usage -->
<i data-feather="check"></i> Saved
<button class="btn btn-blue"><i data-feather="send"></i> Send</button>
```

## Dark Mode

ply auto-detects `prefers-color-scheme: dark`. To manually toggle:

```html
<!-- Light mode -->
<html data-theme="light">

<!-- Dark mode -->
<html data-theme="dark">
```

Toggle with JavaScript:
```js
document.documentElement.dataset.theme =
  document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
```

---

## Class Reference

### Grid

ply uses a **ratio-based flexbox grid**. Units are defined by percentage width.

| Class | Width |
|-------|-------|
| `unit-100` | 100% |
| `unit-90` | 90% |
| `unit-80` | 80% |
| `unit-75` | 75% |
| `unit-70` | 70% |
| `unit-66` | 66.6% |
| `unit-65` | 65% |
| `unit-60` | 60% |
| `unit-50` | 50% |
| `unit-40` | 40% |
| `unit-35` | 35% |
| `unit-33` | 33.3% |
| `unit-30` | 30% |
| `unit-25` | 25% |
| `unit-20` | 20% |
| `unit-10` | 10% |
| `unit-auto` | auto |

**Container:** `units-container` — max-width 1200px, centered. Use `units-container fill-width` for full-width.

**Row:** `units-row` — flex row container. **All unit-\* classes MUST be direct children of units-row.**

```html
<div class="units-container">
  <div class="units-row">
    <div class="unit-25">Sidebar</div>
    <div class="unit-75">Content</div>
  </div>
</div>
```

#### Responsive Prefixes

Apply at specific breakpoints (all override the base `unit-*`):

| Prefix | Breakpoint |
|--------|-----------|
| `x-large-screen-unit-*` | ≥ 1800px |
| `large-screen-unit-*` | ≥ 1400px |
| `small-desktop-unit-*` | ≤ 1024px |
| `tablet-unit-*` | ≤ 767px |
| `large-phone-unit-*` | ≤ 650px |
| `phone-unit-*` | ≤ 480px |
| `forever-unit-*` | Never collapses |

```html
<div class="units-row">
  <div class="unit-25 tablet-unit-100">Sidebar (full-width on tablet)</div>
  <div class="unit-75 tablet-unit-100">Content (full-width on tablet)</div>
</div>
```

#### Nesting

`units-row` **CAN be nested** inside units for complex multi-breakpoint layouts:

```html
<div class="units-row">
  <div class="unit-50">
    <div class="units-row">
      <div class="unit-50">Quarter A</div>
      <div class="unit-50">Quarter B</div>
    </div>
  </div>
  <div class="unit-50">Half</div>
</div>
```

#### Row Modifiers

| Class | Effect |
|-------|--------|
| `reverse-direction` | Reverse row order |
| `split` | Remove gutters |
| `centered-content` | Center children horizontally |
| `stacked` | Remove bottom margin |
| `equal-height` | Stretch all cards/children to the same height |

#### Unit Modifiers

| Class | Effect |
|-------|--------|
| `centered` / `unit-centered` | Center unit with auto margins |
| `unit-push-*` | Offset unit with margin-left |
| `fill-height` | 100% height |
| `fill-width` | 100% width |

---

### Buttons

```html
<button class="btn">Default</button>
<button class="btn btn-blue">Blue</button>
<button class="btn btn-outline">Outline</button>
```

#### Colors

| Class | Color |
|-------|-------|
| `btn-blue` | Blue (primary) |
| `btn-red` | Red (danger) |
| `btn-green` | Green (success) |
| `btn-yellow` | Yellow (warning) |
| `btn-black` | Black |
| `btn-white` | White |

#### Sizes

| Class | Alias | Size |
|-------|-------|------|
| `btn-big` | `btn-lg` | Large |
| *(default)* | | Normal |
| `btn-small` | `btn-sm` | Small |
| `btn-smaller` | `btn-xs` | Extra small |

#### Variants

| Class | Effect |
|-------|--------|
| `btn-outline` | Border only, transparent background |
| `btn-outline bold` | Thicker border outline |
| `btn-active` | Pressed/active state |
| `btn-disabled` / `btn[disabled]` | Disabled state |
| `btn-straight` / `btn-square` | No border-radius |

#### Button Groups

```html
<div class="btn-group">
  <button class="btn btn-blue">Save</button>
  <button class="btn">Cancel</button>
</div>
```

Modifiers: `align-right`, `align-left`, `align-center`, `fill-width`, `rounded`

---

### Forms

Wrap in `.form` to enable ply form styling:

```html
<form class="form">
  <label>
    Email
    <input type="email" placeholder="you@example.com">
  </label>
  <label>
    Message
    <textarea></textarea>
  </label>
  <button class="btn btn-blue" type="submit">Send</button>
</form>
```

#### Input Sizes

| Class | Alias | Size |
|-------|-------|------|
| `input-big` | `input-lg` | Large |
| *(default)* | | Normal |
| `input-small` | `input-sm` | Small |
| `input-smaller` | `input-xs` | Extra small |

#### Input States

| Class | Meaning |
|-------|---------|
| `input-error` | Red border — validation error |
| `input-success` | Green border — valid |
| `input-gray` | Gray border — neutral |

#### Input Groups

```html
<div class="input-groups">
  <span class="input-prepend">$</span>
  <input type="text" placeholder="Amount">
  <span class="input-append">.00</span>
</div>
```

#### Select

```html
<form class="form">
  <select>
    <option>Choose...</option>
    <option>Option A</option>
  </select>
</form>
```

Use `select-outlined` for a transparent-background outlined variant.

#### Form Layouts

| Class | Layout |
|-------|--------|
| `form-inline` | Inline elements |
| `form-inline-list` | Inline list items |
| `form-list` | Stacked list items |

---

### Navigation

#### Navbar (horizontal)

```html
<nav class="navbar">
  <ul>
    <li class="active"><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>
```

Active state: use `class="active"` (or legacy `class="on"`) on the `<li>`.

Alignment: `navbar-centered`, `navbar-left`, `navbar-right`, `navbar-vertical`

##### Border Variants

| Class | Effect |
|-------|--------|
| *(default)* | Thin 1px subtle border |
| `navbar-thick` | Bold 2px border |
| `navbar-borderless` | No border, active items use background highlight |
| `navbar-border-blue` | Blue bottom border |
| `navbar-border-green` | Green bottom border |
| `navbar-border-red` | Red bottom border |
| `navbar-border-yellow` | Yellow bottom border |

##### Mobile Overflow

On small screens (≤ 767px), the navbar scrolls horizontally with a hidden scrollbar. Items never wrap to a second line.

| Class | Effect |
|-------|--------|
| *(default)* | Horizontal scroll on mobile |
| `navbar-stack` | Wrap items instead of scrolling |

#### Pills

```html
<nav class="navbar-pills">
  <ul>
    <li class="active"><a href="#">Tab 1</a></li>
    <li><a href="#">Tab 2</a></li>
  </ul>
</nav>
```

#### Tabs

```html
<div class="nav-tabs">
  <ul>
    <li class="active"><a href="#">Tab 1</a></li>
    <li><a href="#">Tab 2</a></li>
  </ul>
</div>
```

#### Stacked (vertical)

```html
<nav class="nav-stacked">
  <ul>
    <li class="active"><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a></li>
  </ul>
</nav>
```

#### Breadcrumbs

```html
<nav class="breadcrumbs" aria-label="Breadcrumb">
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">Products</a></li>
    <li class="active"><span>Widget</span></li>
  </ul>
</nav>
```

#### Pagination

```html
<ul class="pagination">
  <li><a href="#">&laquo;</a></li>
  <li><a href="#">1</a></li>
  <li class="active"><a href="#">2</a></li>
  <li><a href="#">3</a></li>
  <li><a href="#">&raquo;</a></li>
</ul>
```

---

### Notifications / Alerts

```html
<div class="alert alert-blue">
  <span class="alert-content">This is an informational message.</span>
  <button class="alert-dismiss" aria-label="Dismiss"></button>
</div>
```

You can also use the original `tools-alert` class names. The `alert` aliases are equivalent.

#### Alert Colors

| Class | Use |
|-------|-----|
| `alert` | Default (gray) |
| `alert-blue` | Info |
| `alert-red` | Error / danger |
| `alert-green` | Success |
| `alert-yellow` | Warning |
| `alert-black` | Neutral |

#### Alert Variants

| Class | Style |
|-------|-------|
| `alert-outline` | Tinted background + full border |
| `alert-ghost` | Transparent background, border only |

#### Toast Messages

`tools-message` / `message` — Fixed-position toast (hidden by default, show with JS).

---

### Typography

#### Text Size

| Class | Size |
|-------|------|
| `text-xs` | 12px |
| `text-sm` | 14px |
| `text-base` | 16px |
| `text-lg` | 18px |
| `text-xl` | 24px |
| `text-2xl` | 30px |
| `text-3xl` | 36px |
| `text-4xl` | 48px |
| `text-5xl` | 60px |

#### Font Weight

`font-normal` (400), `font-medium` (500), `font-semibold` (600), `font-bold` (700)

Also: `bold`, `italic`, `uppercase`, `nowrap`

#### Line Height

`leading-tight` (1.25), `leading-snug` (1.375), `leading-normal` (1.5), `leading-relaxed` (1.625)

#### Text Alignment

`text-centered` / `text-center`, `text-right`, `text-left`

#### Heading Classes

`.h1` through `.h6` — Apply heading styles to any element.

---

### Helpers

#### Position
`fixed`, `absolute`, `relative`, `static`, `sticky`

#### Display
`display-flex`, `display-block`, `display-inline-block`, `display-grid`, `display-none`, `display-table`, `display-table-cell`

#### Spacing (margin)

| Class | Effect |
|-------|--------|
| `margin` | All sides (0.75rem) |
| `margin-top` | Top margin |
| `margin-bottom` | Bottom margin |
| `margin-left` | Left margin |
| `margin-right` | Right margin |
| `margin-top-extra` | Double top margin |
| `margin-bottom-extra` | Double bottom margin |
| `no-margin` | Remove all margins |
| `no-top-margin` | Remove top margin |
| `no-bottom-margin` | Remove bottom margin |

#### Spacing (padding)

| Class | Effect |
|-------|--------|
| `padding` | All sides (0.75rem) |
| `padding-top` | Top padding |
| `padding-bottom` | Bottom padding |
| `padding-left` | Left padding |
| `padding-right` | Right padding |
| `padding-top-extra` | Double top padding |
| `no-padding` | Remove all padding |
| `no-spacing` | Remove margin + padding |

#### Borders

`border`, `border-top`, `border-bottom`, `border-left`, `border-right`, `no-border`

#### Width / Height

`width-100` through `width-10` (percentage-based). Responsive: `tablet-width-*`, `phone-width-*`, `small-desktop-width-*`, `large-phone-width-*`

`height-100` through `height-10` (percentage-based)

#### Visibility

| Class | Effect |
|-------|--------|
| `hide` | `display: none` |
| `sr-only` | Visually hidden, accessible to screen readers |
| `skip-link` | Skip navigation link — visible only on keyboard focus |
| `hide-on-desktop` | Hidden on desktop, visible on mobile |
| `hide-on-mobile` | Hidden on mobile |

#### Text Color

| Class | Color |
|-------|-------|
| `text-primary` | Body text color (theme-aware) |
| `text-secondary` | Secondary/subdued text (theme-aware) |
| `text-tertiary` / `text-muted` | Muted/tertiary text (theme-aware) |
| `text-inverse` | Inverse text color (theme-aware) |
| `success` | Green |
| `error` | Red |

#### Other

#### Text Wrap

| Class | Effect |
|-------|--------|
| `no-orphan` | Prevents orphaned words (`text-wrap: pretty`) |
| `text-balance` | Balances line lengths for headings (`text-wrap: balance`) |

#### Gap

| Class | Size |
|-------|------|
| `gap-xs` | 0.25rem |
| `gap-sm` | 0.5rem |
| `gap` | 0.75rem |
| `gap-lg` | 1.5rem |
| `gap-xl` | 2rem |

#### Link Reset

| Class | Effect |
|-------|--------|
| `no-link-style` | Suppresses link color and underline on all `<a>` inside the container |

#### Glass Background

| Class | Effect |
|-------|--------|
| `bg-glass` | Transparent background with backdrop blur. White tint in light mode, dark gray tint in dark mode. Customizable via `--ply-bg-glass`. |

```html
<!-- Frosted overlay on a colored or image background -->
<div class="bg-glass border-radius padding">
  <code>npm install plygrid</code>
</div>
```

#### Other

`clearfix`, `flat-list` (no bullets/margin), `circle` (border-radius 100%), `border-radius`, `spinning` (animation), `fade-in`

---

### Tables

Tables are styled automatically. Just use semantic HTML:

```html
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Jane Doe</td>
      <td>jane@example.com</td>
    </tr>
  </tbody>
</table>
```

---

### Native HTML Elements (styled automatically)

ply styles these elements without needing classes:

- **`<details>/<summary>`** — Styled accordion with arrow indicator
- **`<dialog>`** — Modal with backdrop, max-width 32rem
- **`<progress>`** — Styled progress bar
- **`<meter>`** — Styled meter element

```html
<details>
  <summary>Click to expand</summary>
  <p>Hidden content here.</p>
</details>

<dialog id="myDialog">
  <h3>Dialog Title</h3>
  <p>Dialog content.</p>
  <button class="btn" onclick="this.closest('dialog').close()">Close</button>
</dialog>
```

---

### Color Palette

Brand colors are **theme-aware** — they automatically shift between light and dark mode to maintain WCAG AA contrast (4.5:1) against the text-inverse color. Each color has 3 levels: level 1 is the primary action color, level 2 is hover/emphasis, level 3 is the strongest.

Use the CSS custom properties (`var(--ply-blue-1)`, etc.) in custom styles to get automatic theme switching.

#### Light Mode Values

| Color | Level 1 | Level 2 | Level 3 |
|-------|---------|---------|---------|
| Blue | `#0f62fe` | `#0043ce` | `#002d9c` |
| Red | `#da1e28` | `#a2191f` | `#750e13` |
| Green | `#198038` | `#0e6027` | `#044317` |
| Yellow | `#f1c21b` | `#d2a106` | `#b28600` |
| Indigo | `#4f46e5` | `#3730a3` | `#312e81` |
| Purple | `#7c3aed` | `#6d28d9` | `#5b21b6` |
| Pink | `#be185d` | `#9d174d` | `#831843` |
| Orange | `#c2410c` | `#9a3412` | `#7c2d12` |
| Teal | `#0f766e` | `#115e59` | `#134e4a` |
| Cyan | `#0e7490` | `#155e75` | `#164e63` |

#### Dark Mode Values

| Color | Level 1 | Level 2 | Level 3 |
|-------|---------|---------|---------|
| Blue | `#4589ff` | `#78a9ff` | `#a6c8ff` |
| Red | `#ff8389` | `#fa4d56` | `#da1e28` |
| Green | `#42be65` | `#6fdc8c` | `#a7f0ba` |
| Yellow | `#f1c21b` | `#d2a106` | `#b28600` |
| Indigo | `#818cf8` | `#a5b4fc` | `#c7d2fe` |
| Purple | `#a78bfa` | `#c4b5fd` | `#ddd6fe` |
| Pink | `#f472b6` | `#f9a8d4` | `#fbcfe8` |
| Orange | `#fb923c` | `#fdba74` | `#fed7aa` |
| Teal | `#2dd4bf` | `#5eead4` | `#99f6e4` |
| Cyan | `#22d3ee` | `#67e8f9` | `#a5f3fc` |

#### Usage

```css
/* These automatically adapt to the current theme */
.my-badge {
  background: var(--ply-blue-1);
  color: var(--ply-color-text-inverse);
}
```

#### Sass Variables (static, for build-time use)

The full Sass palette is available in `_colors.scss` for build-time use. These do NOT change between themes.

| Name | Base | Dark | Light | Pastel |
|------|------|------|-------|--------|
| Blue | `$color-blue` `#2575ed` | `$color-blue-dark` `#1a52a5` | `$color-blue-light` `#92baf6` | `$color-blue-pastel` `#d3e3fb` |
| Red | `$color-red` `#de2c3b` | `$color-red-dark` `#b2232f` | `$color-red-light` `#ef969d` | `$color-red-pastel` `#f8d5d8` |
| Green | `$color-green` `#2c9f42` | `$color-green-dark` `#237f35` | `$color-green-light` `#96cfa1` | `$color-green-pastel` `#d5ecd9` |
| Yellow | `$color-yellow` `#ffc800` | `$color-yellow-dark` `#cca000` | `$color-yellow-light` `#ffe480` | `$color-yellow-pastel` `#fff4cc` |
| Indigo | `$color-indigo` `#4f46e5` | `$color-indigo-dark` `#3730a3` | `$color-indigo-light` `#a5b4fc` | `$color-indigo-pastel` `#e0e7ff` |
| Purple | `$color-purple` `#7c3aed` | `$color-purple-dark` `#5b21b6` | `$color-purple-light` `#c4b5fd` | `$color-purple-pastel` `#ede9fe` |
| Pink | `$color-pink` `#db2777` | `$color-pink-dark` `#9d174d` | `$color-pink-light` `#f9a8d4` | `$color-pink-pastel` `#fce7f3` |
| Orange | `$color-orange` `#ea580c` | `$color-orange-dark` `#c2410c` | `$color-orange-light` `#fdba74` | `$color-orange-pastel` `#ffedd5` |
| Teal | `$color-teal` `#0d9488` | `$color-teal-dark` `#0f766e` | `$color-teal-light` `#5eead4` | `$color-teal-pastel` `#ccfbf1` |
| Cyan | `$color-cyan` `#0891b2` | `$color-cyan-dark` `#0e7490` | `$color-cyan-light` `#67e8f9` | `$color-cyan-pastel` `#cffafe` |
| Black | `$color-black` `#0f0f0f` | `$color-black-dark` `#000` | `$color-black-light` `#363738` | `$color-black-pastel` `#dadada` |
| Gray | `$color-gray` `#e0e3e5` | `$color-gray-dark` `#b3b6b7` | `$color-gray-light` `#f0f1f2` | `$color-gray-pastel` `#f7f8f8` |

#### Neutral Scale (Sass)

| Variable | Hex |
|----------|-----|
| `$color-neutral-50` | `#fafafa` |
| `$color-neutral-100` | `#f5f5f5` |
| `$color-neutral-200` | `#e5e5e5` |
| `$color-neutral-300` | `#d4d4d4` |
| `$color-neutral-400` | `#a3a3a3` |
| `$color-neutral-500` | `#737373` |
| `$color-neutral-600` | `#525252` |
| `$color-neutral-700` | `#404040` |
| `$color-neutral-800` | `#262626` |
| `$color-neutral-900` | `#171717` |

### CSS Custom Properties

All colors are customizable via CSS custom properties:

```css
:root {
  /* Backgrounds */
  --ply-bg-body: #ffffff;
  --ply-bg-surface: #ffffff;
  --ply-bg-surface-alt: #f4f4f4;
  --ply-bg-muted: #e0e0e0;

  /* Text */
  --ply-color-body: #161616;
  --ply-color-headings: #161616;
  --ply-color-secondary: #525252;
  --ply-color-muted: #6f6f6f;
  --ply-color-placeholder: #a8a8a8;
  --ply-color-text-inverse: #ffffff;

  /* Borders */
  --ply-border-color: #e0e0e0;
  --ply-border-strong: #8d8d8d;

  /* Interactive */
  --ply-color-link: #0f62fe;
  --ply-color-link-hover: #0043ce;
  --ply-color-focus: #0f62fe;

  /* Inputs */
  --ply-color-input-border: #8d8d8d;
  --ply-color-input-bg: #f4f4f4;

  /* Buttons */
  --ply-btn-default-bg: #393939;
  --ply-btn-default-hover: #4c4c4c;

  /* Navigation */
  --ply-nav-bg: #ffffff;
  --ply-nav-color: #161616;
  --ply-nav-border: #161616;
  --ply-nav-hover: #e8e8e8;
  --ply-nav-active-bg: transparent;

  /* Brand palette (swap automatically in dark mode — see Color Palette section) */
  --ply-blue-1: #0f62fe;    --ply-blue-2: #0043ce;    --ply-blue-3: #002d9c;
  --ply-red-1: #da1e28;     --ply-red-2: #a2191f;     --ply-red-3: #750e13;
  --ply-green-1: #198038;   --ply-green-2: #0e6027;   --ply-green-3: #044317;
  --ply-yellow-1: #f1c21b;  --ply-yellow-2: #d2a106;  --ply-yellow-3: #b28600;
  /* ... plus indigo, purple, pink, orange, teal, cyan */
}
```

---

## Usage Rules

1. **ply is standalone** — Do NOT use Tailwind, Bootstrap, or other CSS frameworks alongside ply. Remove them first.
2. **Always wrap units in `units-row`** — `unit-*` classes must be direct children of `units-row`.
3. **Use `<button>` for buttons, not `<a>`** — Links are for navigation, buttons for actions.
4. **Wrap forms in `.form`** for styled inputs — Without the wrapper, inputs get minimal styling.
5. **Use semantic HTML first** — ply automatically styles `<code>`, `<pre>`, `<kbd>`, `<blockquote>`, `<mark>`, `<table>`, `<details>`, `<summary>`, `<dialog>`, `<progress>`, `<meter>`, `<nav>`, `<hr>`, and heading tags. Use the native element before creating custom classes.
6. **Only use classes documented here** — Do NOT invent utility classes (e.g. `.color-gray-60` does not exist). If ply doesn't have a class for something, use a CSS custom property or write a small custom rule.
7. **Use `units-container` for page width** — Centers content at 1200px max-width.
8. **Add responsive classes for mobile** — At minimum use `tablet-unit-100` to stack on tablets.
9. **Use CSS custom properties for theming** — All colors, backgrounds, and borders are customizable via `--ply-*` variables. Do not hard-code colors that break dark mode.
10. **Use single-dash class names** — `navbar-centered`, `display-flex`, `margin-top-extra`. Double-dash (`navbar--centered`, `display--flex`) are supported as legacy aliases but single-dash is preferred.

## Accessibility (WCAG 2.1 AA)

ply is built for Section 508 / WCAG 2.1 AA compliance out of the box:

- **Focus indicators** — All interactive elements (buttons, links, inputs, nav items, dropdowns) use `:focus-visible` with a 2px blue outline. Keyboard users see clear focus rings; mouse users don't.
- **High contrast mode** — `@media (prefers-contrast: more)` is supported. Text colors and link colors become stronger for users who need more contrast.
- **Reduced motion** — `@media (prefers-reduced-motion: reduce)` disables animations and transitions.
- **Dark mode** — `prefers-color-scheme: dark` is respected automatically. Theme-aware colors maintain WCAG AA contrast in both modes.
- **Skip link** — Use `.skip-link` as the first focusable element to let keyboard users skip past navigation.
- **Screen reader support** — `.sr-only` hides content visually while keeping it accessible to assistive technology.

```html
<!-- Skip link — first element inside <body> -->
<a href="#main" class="skip-link">Skip to main content</a>
<nav class="navbar">...</nav>
<main id="main">...</main>
```

## Anti-Patterns

- **DON'T** skip semantic HTML — Before adding `<div class="something">`, check if a semantic element works. ply styles `<nav>`, `<code>`, `<table>`, `<details>`, `<dialog>`, `<blockquote>`, etc. automatically.
- **DON'T** use Tailwind, Bootstrap, or other frameworks with ply — They will conflict.
- **DON'T** create custom classes for elements ply already styles — Use `<code>` not `.code-example`, use `<blockquote>` not `.quote-block`, etc.
- **DON'T** invent ply class names — Only use classes from this reference (e.g. `.color-gray-60` does not exist — use `text-secondary` or `text-tertiary` instead).
- **DON'T** use `role="button"` on links — Use actual `<button>` elements.
- **DON'T** put `unit-*` classes outside a `units-row` — They won't work correctly.
- **DON'T** use inline styles for layout — Use the grid system instead.
- **DON'T** forget the `.form` wrapper — Without it, form elements won't be styled.
- **DON'T** hard-code colors — Use `var(--ply-color-*)` custom properties so dark mode works correctly.

---

## Copy-Paste Snippets

### Starter Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Page</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/plygrid@1/dist/css/ply.min.css">
</head>
<body>
  <div class="units-container">
    <h1>Hello, ply</h1>
    <p>A ratio-based CSS framework.</p>
    <button class="btn btn-blue">Get Started</button>
  </div>
</body>
</html>
```

### Two-Column Layout

```html
<div class="units-container">
  <div class="units-row">
    <aside class="unit-25 tablet-unit-100">
      <nav class="nav-stacked">
        <ul>
          <li class="active"><a href="#">Dashboard</a></li>
          <li><a href="#">Settings</a></li>
          <li><a href="#">Profile</a></li>
        </ul>
      </nav>
    </aside>
    <main class="unit-75 tablet-unit-100">
      <h2>Main Content</h2>
      <p>Your content goes here.</p>
    </main>
  </div>
</div>
```

### Card

```html
<div class="units-row">
  <div class="unit-33 tablet-unit-100">
    <div class="border border-radius padding">
      <h3>Card Title</h3>
      <p>Card description text goes here.</p>
      <button class="btn btn-blue btn-sm">Learn More</button>
    </div>
  </div>
</div>
```

### Contact Form

```html
<form class="form">
  <label>
    Name
    <input type="text" placeholder="Your name" required>
  </label>
  <label>
    Email
    <input type="email" placeholder="you@example.com" required>
  </label>
  <label>
    Subject
    <select>
      <option value="">Choose a topic...</option>
      <option>General Inquiry</option>
      <option>Support</option>
      <option>Feedback</option>
    </select>
  </label>
  <label>
    Message
    <textarea rows="4" placeholder="Your message..."></textarea>
  </label>
  <button class="btn btn-blue" type="submit">Send Message</button>
</form>
```

### Navbar + Page

```html
<nav class="navbar">
  <ul>
    <li class="active"><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Services</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>
<div class="units-container">
  <h1>Welcome</h1>
  <p>Page content below the navbar.</p>
</div>
```

### Dashboard

```html
<nav class="navbar">
  <ul>
    <li class="active"><a href="#">Dashboard</a></li>
    <li><a href="#">Reports</a></li>
    <li><a href="#">Settings</a></li>
  </ul>
</nav>
<div class="units-container">
  <div class="units-row">
    <aside class="unit-20 tablet-unit-100">
      <nav class="nav-stacked">
        <ul>
          <li class="active"><a href="#">Overview</a></li>
          <li><a href="#">Analytics</a></li>
          <li><a href="#">Users</a></li>
        </ul>
      </nav>
    </aside>
    <main class="unit-80 tablet-unit-100">
      <div class="units-row">
        <div class="unit-33 tablet-unit-100">
          <div class="border border-radius padding">
            <h4 class="text-sm uppercase">Revenue</h4>
            <p class="text-3xl font-bold">$12,340</p>
          </div>
        </div>
        <div class="unit-33 tablet-unit-100">
          <div class="border border-radius padding">
            <h4 class="text-sm uppercase">Users</h4>
            <p class="text-3xl font-bold">1,234</p>
          </div>
        </div>
        <div class="unit-33 tablet-unit-100">
          <div class="border border-radius padding">
            <h4 class="text-sm uppercase">Orders</h4>
            <p class="text-3xl font-bold">567</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</div>
```

### All Alert Variants

```html
<div class="alert">Default alert — neutral message.</div>
<div class="alert alert-blue">
  <span class="alert-content">Info — something to know about.</span>
</div>
<div class="alert alert-green">
  <span class="alert-content">Success — operation completed.</span>
</div>
<div class="alert alert-yellow">
  <span class="alert-content">Warning — proceed with caution.</span>
</div>
<div class="alert alert-red">
  <span class="alert-content">Error — something went wrong.</span>
  <button class="alert-dismiss" aria-label="Dismiss"></button>
</div>
<div class="alert alert-blue alert-outline">Outlined info alert.</div>
<div class="alert alert-red alert-ghost">Ghost error alert.</div>
```

### Data Table

```html
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Jane Cooper</td>
      <td>jane@example.com</td>
      <td>Admin</td>
      <td><span class="success">Active</span></td>
    </tr>
    <tr>
      <td>John Smith</td>
      <td>john@example.com</td>
      <td>Editor</td>
      <td><span class="success">Active</span></td>
    </tr>
    <tr>
      <td>Bob Johnson</td>
      <td>bob@example.com</td>
      <td>Viewer</td>
      <td><span class="error">Inactive</span></td>
    </tr>
  </tbody>
</table>
```

### Login Page

```html
<div class="units-container" style="min-height: 100vh; display: flex; align-items: center;">
  <div class="units-row centered-content" style="width: 100%;">
    <div class="unit-33 tablet-unit-66 phone-unit-100">
      <div class="border border-radius padding">
        <h2 class="text-center">Sign In</h2>
        <form class="form">
          <label>
            Email
            <input type="email" placeholder="you@example.com" required>
          </label>
          <label>
            Password
            <input type="password" placeholder="••••••••" required>
          </label>
          <button class="btn btn-blue width-100" type="submit">Sign In</button>
        </form>
      </div>
    </div>
  </div>
</div>
```

### Pricing Cards

```html
<div class="units-container">
  <div class="units-row equal-height">
    <div class="unit-33 tablet-unit-100">
      <div class="border border-radius padding text-center">
        <h3>Starter</h3>
        <p class="text-3xl font-bold">$9<span class="text-sm font-normal">/mo</span></p>
        <ul class="flat-list">
          <li>5 Projects</li>
          <li>1 GB Storage</li>
          <li>Email Support</li>
        </ul>
        <button class="btn btn-outline width-100">Choose Starter</button>
      </div>
    </div>
    <div class="unit-33 tablet-unit-100">
      <div class="border border-radius padding text-center">
        <h3>Pro</h3>
        <p class="text-3xl font-bold">$29<span class="text-sm font-normal">/mo</span></p>
        <ul class="flat-list">
          <li>25 Projects</li>
          <li>10 GB Storage</li>
          <li>Priority Support</li>
        </ul>
        <button class="btn btn-blue width-100">Choose Pro</button>
      </div>
    </div>
    <div class="unit-33 tablet-unit-100">
      <div class="border border-radius padding text-center">
        <h3>Enterprise</h3>
        <p class="text-3xl font-bold">$99<span class="text-sm font-normal">/mo</span></p>
        <ul class="flat-list">
          <li>Unlimited Projects</li>
          <li>100 GB Storage</li>
          <li>24/7 Support</li>
        </ul>
        <button class="btn btn-outline width-100">Choose Enterprise</button>
      </div>
    </div>
  </div>
</div>
```

---

## Bundles

| Bundle | Includes | Size (gzip) |
|--------|----------|-------------|
| `ply.min.css` | Everything | ~19KB |
| `ply-core.min.css` | Grid, buttons, forms, nav, alerts, tables, typography, essential helpers | ~17KB |
| `ply-essentials.min.css` | Grid, helpers, alignments, blocks only | ~6KB |
| `ply-helpers.min.css` | Helper utilities only | ~4KB |

