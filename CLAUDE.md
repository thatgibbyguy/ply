# ply CSS Framework — AI Instructions

This is the ply CSS framework repository. See **PLY.md** for the complete class reference, usage rules, and copy-paste snippets.

## Before Writing Custom CSS — Search ply-classes.json

**`ply-classes.json`** is the complete searchable reference. Before writing any custom CSS, search it first:

- **`classes`** — Every ply class with category, description, and examples. Search here before inventing a class name.
- **`customProperties`** — All 60+ `--ply-*` CSS variables organized by category (typography, background, text, borders, interactive, elevation, brand, palette) with light/dark values. Use these instead of hardcoding colors or font stacks.
- **`semanticElements`** — Every HTML element ply auto-styles (`<dialog>`, `<details>`, `<table>`, `<code>`, `<kbd>`, `<mark>`, `<progress>`, `<meter>`, etc.) with tips on usage. Check here before building a custom component — ply may already style the native element.

**Rule: If you're about to write custom CSS, search `ply-classes.json` first.** If a class, variable, or semantic element already does what you need, use it.

## Start Semantic, Then Customize

ply automatically styles semantic HTML elements — `<nav>`, `<table>`, `<code>`, `<blockquote>`, `<details>`, `<dialog>`, `<progress>`, `<meter>`, headings, forms, and more. Start with semantic elements before reaching for `<div>` wrappers or custom classes. Custom styling is fine when you need it, but use what HTML and ply give you for free first.

## Key Rules for Generating ply Markup

1. **ply is standalone** — Do NOT use Tailwind, Bootstrap, or other CSS frameworks alongside ply. Remove them first.
2. **Always wrap `unit-*` classes inside `units-row`** — they are flex children and won't work alone
3. **Use `units-container`** for page-width centering (1200px max)
4. **Wrap forms in `.form`** to enable styled inputs
5. **Use `<button class="btn">` for buttons** — not `<a>` tags. Use `btn-primary` for primary actions, `btn-secondary` (or plain `btn`) for secondary actions. Color buttons (`btn-blue`, `btn-red`, etc.) are static and immune to theming — use them for color-coded actions, not as primary/secondary.
6. **`units-row` can be nested** inside units for complex layouts
7. **Add responsive classes** — at minimum `tablet-unit-100` to stack columns on mobile
8. **Use semantic HTML first** — ply auto-styles `<code>`, `<pre>`, `<kbd>`, `<blockquote>`, `<mark>`, `<table>`, `<details>`, `<dialog>`, `<nav>`, etc. Use native elements before creating custom classes.
9. **Only use documented ply classes** — Do NOT invent class names. Search `ply-classes.json` to find the right class. See PLY.md for the full prose reference.
10. **Dark mode is automatic** — Auto dark mode activates only when no `data-theme` attribute is set on `<html>`. Use `data-theme="dark"` for explicit dark mode, `data-theme="light"` for explicit light mode, or any custom value (e.g., `data-theme="warm"`) for a custom theme without dark-mode interference. Use `var(--ply-*)` custom properties for colors (see `customProperties` in the JSON), never hard-code values that break dark mode.
11. **Icons** — Use [Feather Icons](https://feathericons.com) as the preferred icon library. Any icon library works, but Feather pairs well with ply's aesthetic.
12. **Container queries** — Use `container-query` on a parent element and `container-tablet-unit-*`, `container-phone-unit-*`, etc. for component-level responsive behavior (responds to parent width, not viewport). See PLY.md for details.

## Custom Themes

Create a custom theme by defining a `data-theme` value and overriding `--ply-*` custom properties. Every ply component respects these variables, so one block themes the entire app.

```css
[data-theme="brand"] {
  /* Colors */
  --ply-bg-body: #fefce8;
  --ply-bg-surface: #fef9c3;
  --ply-bg-muted: #fef08a;
  --ply-color-body: #1a1a1a;
  --ply-color-headings: #78350f;
  --ply-border-color: #fbbf24;
  --ply-color-accent: #b45309;
  --ply-btn-default-bg: #b45309;  /* Controls btn-primary + links */
  --ply-btn-default-bg-hover: #92400e;
  --ply-btn-default-bg-active: #7c2d12;
  --ply-btn-secondary-bg: #78350f;
  --ply-btn-border-radius: 0.5rem;
  --ply-nav-bg: #fef3c7;
  --ply-nav-border: #f59e0b;

  /* Typography (optional) */
  --ply-font-body: "Palatino Linotype", Palatino, Georgia, serif;
  --ply-font-heading: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --ply-font-mono: "Fira Code", "Source Code Pro", monospace;
}
```

```html
<html data-theme="brand">
```

Setting a custom `data-theme` value prevents auto dark mode from interfering with the theme. The `--ply-font-body`, `--ply-font-heading`, and `--ply-font-mono` properties let you override typography alongside colors.

See `customProperties` in `ply-classes.json` for the full list of overridable variables. Use the `themeTemplate` key in `ply-classes.json` for a complete copy-paste CSS block with every overridable variable grouped by category.

## Common Patterns

- **Equal-height cards** — Add `equal-height` to `units-row` so all children stretch to the tallest
- **Gap between flex/grid children** — Use `gap-xs`, `gap-sm`, `gap`, `gap-lg`, `gap-xl` instead of margin hacks
- **Prevent orphaned words** — Use `no-orphan` on paragraphs, `text-balance` on headings
- **Card-style links** — Use `no-link-style` on a container to suppress link color/underline on all `<a>` inside
- **Navbar variants** — Default is a thin border. Use `navbar-thick`, `navbar-borderless`, or `navbar-border-blue/green/red/yellow`
- **Text color hierarchy** — `text-primary`, `text-secondary`, `text-tertiary` (all theme-aware)

## Class Naming

ply follows `{property}-{direction}-{modifier}` — mirrors CSS property names:

- `margin-top`, `padding-left-extra`, `border-top-thick`
- `padding-top-xs`, `margin-bottom-xxl`
- `btn-lg`, `btn-sm`, `btn-xs`, `input-lg`, `input-sm`, `input-xs`
- `bg-white`, `bg-black`, `navbar-centered`, `display-flex`
- **Size scale:** `xs`, `sm`, `lg`, `xl`, `xxl`

## Accessibility (WCAG 2.1 AA)

ply targets Section 508 / WCAG 2.1 AA compliance:
- `:focus-visible` outlines on all interactive elements (buttons, links, inputs, nav items, dropdowns)
- `prefers-contrast: more` support for high contrast mode
- `prefers-reduced-motion: reduce` disables animations
- `prefers-color-scheme: dark` automatic dark mode with WCAG AA contrast (only when no `data-theme` is set)
- `.skip-link` — Add as the first focusable element inside `<body>` for keyboard navigation
- `.sr-only` — Visually hidden, accessible to screen readers

## Title II / WCAG 2.1 AA Compliance

ply targets ADA Title II compliance (28 CFR Part 35) by meeting WCAG 2.1 AA success criteria at the framework level. State and local government web content must conform to WCAG 2.1 AA as of June 2024.

### What ply handles at the framework level

- **Focus management** — `:focus-visible` outlines on all interactive elements (1.4.11 Non-Text Contrast, 2.4.7 Focus Visible)
- **Reduced motion** — `prefers-reduced-motion: reduce` disables animations (2.3.3 Animation from Interactions)
- **High contrast** — `prefers-contrast: more` strengthens text and link colors (1.4.3 Contrast Minimum, 1.4.6 Contrast Enhanced)
- **Dark mode with AA contrast** — `prefers-color-scheme: dark` auto-adjusts colors to maintain 4.5:1 contrast (1.4.3 Contrast Minimum)
- **Semantic HTML auto-styling** — Encourages correct landmarks (`<nav>`, `<main>`, `<aside>`) and heading hierarchy (1.3.1 Info and Relationships, 2.4.6 Headings and Labels)
- **`.skip-link`** — Keyboard skip navigation (2.4.1 Bypass Blocks)
- **`.sr-only`** — Screen-reader-only content (1.3.1 Info and Relationships)
- **Zero JavaScript** — No ARIA state management failures from framework code (4.1.2 Name, Role, Value)

### What needs application-level attention

- **Alt text on images** — Add `alt` to every `<img>`; use `alt=""` for decorative images (1.1.1 Non-text Content)
- **ARIA attributes on custom widgets** — Custom dropdowns, modals triggered by JS, and interactive components need `aria-expanded`, `aria-controls`, `role`, etc. (4.1.2 Name, Role, Value)
- **Heading hierarchy** — ply styles h1-h6 but does not enforce order. Use one `<h1>` per page, then h2-h6 in sequence (1.3.1 Info and Relationships)
- **Color contrast on custom colors** — If you override `--ply-*` variables or add custom colors, verify 4.5:1 contrast for text, 3:1 for large text and UI components (1.4.3 Contrast Minimum)
- **Keyboard operability** — Custom JavaScript components (tabs, accordions, drag-and-drop) must be fully operable with keyboard alone (2.1.1 Keyboard)

### AI agent guidance

When generating markup with ply, always:
- Use semantic HTML elements (`<nav>`, `<main>`, `<aside>`, `<section>`, `<article>`) for correct landmarks
- Add `aria-label` to custom interactive widgets that lack visible text labels
- Use `<form role="search">` for search forms
- Include `.skip-link` as the first focusable element in page templates
- Add `alt` text to all `<img>` elements
- Maintain heading hierarchy (h1 > h2 > h3, no skipping levels)

## Custom Widget Accessibility

When building tabs, dropdowns, drag-and-drop, or other custom JS widgets with ply, see the **"Focus Management & Keyboard Patterns"** and **"Custom Widget Accessibility Patterns"** sections in PLY.md for complete ARIA attribute examples, roving tabindex patterns, `aria-live` region usage, and keyboard navigation code.

## Responsive Headers

For CSS-only collapsible navigation (hamburger menu on mobile, inline nav on desktop), see **"Responsive Collapsible Header"** in PLY.md's Navigation section and `snippets/responsive-header.html` for a full working example using `<details>`/`<summary>` — no JavaScript required.

## Installation

### npm + Sass (recommended)
For real projects, install ply and import the SCSS source. This gives access to the full color palette, spacing variables, mixins, and Sass-level customization.

```sh
npm install ply-css
```

```scss
@use "ply-css/src/scss/components/colors" as colors;
@use "ply-css/src/scss/components/variables" as variables;
@use "ply-css/src/scss/components/mixins" as mixins;

.custom {
  color: colors.$color-blue;
  background: colors.$color-blue-pastel;
}
```

### CDN (prototyping only)
For quick demos — gives you ply's classes and dark mode, but no Sass variables, color palette, or mixins.
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ply-css@1/dist/css/ply.min.css">
```

## File Structure

- `src/scss/` — SCSS source (modern `@use`/`@forward` modules). **Use this when the project has a build step.**
  - `components/_colors.scss` — Full color palette, brand colors, dark/light/pastel variants, neutral scale
  - `components/_variables.scss` — Spacing, font sizes, breakpoints, border radius
  - `components/_mixins.scss` — Button generator, clearfix, gradients, arrows, animations
- `dist/css/` — Compiled CSS bundles (for CDN or direct linking)
- `PLY.md` — Complete AI instruction file with class reference
- `ply-classes.json` — Machine-readable class reference
- `snippets/` — Copy-paste HTML examples
