# ply CSS Framework — AI Instructions

This is the ply CSS framework repository. See **PLY.md** for the complete class reference, usage rules, and copy-paste snippets.

## Before Writing Custom CSS — Search ply-classes.json

**`ply-classes.json`** is the complete searchable reference. Before writing any custom CSS, search it first:

- **`classes`** — Every ply class with category, description, and examples. Search here before inventing a class name.
- **`customProperties`** — All 60+ `--ply-*` CSS variables organized by category (background, text, borders, interactive, elevation, brand, palette) with light/dark values. Use these instead of hardcoding colors.
- **`semanticElements`** — Every HTML element ply auto-styles (`<dialog>`, `<details>`, `<table>`, `<code>`, `<kbd>`, `<mark>`, `<progress>`, `<meter>`, etc.) with tips on usage. Check here before building a custom component — ply may already style the native element.

**Rule: If you're about to write custom CSS, search `ply-classes.json` first.** If a class, variable, or semantic element already does what you need, use it.

## Start Semantic, Then Customize

ply automatically styles semantic HTML elements — `<nav>`, `<table>`, `<code>`, `<blockquote>`, `<details>`, `<dialog>`, `<progress>`, `<meter>`, headings, forms, and more. Start with semantic elements before reaching for `<div>` wrappers or custom classes. Custom styling is fine when you need it, but use what HTML and ply give you for free first.

## Key Rules for Generating ply Markup

1. **ply is standalone** — Do NOT use Tailwind, Bootstrap, or other CSS frameworks alongside ply. Remove them first.
2. **Always wrap `unit-*` classes inside `units-row`** — they are flex children and won't work alone
3. **Use `units-container`** for page-width centering (1200px max)
4. **Wrap forms in `.form`** to enable styled inputs
5. **Use `<button class="btn">` for buttons** — not `<a>` tags
6. **`units-row` can be nested** inside units for complex layouts
7. **Add responsive classes** — at minimum `tablet-unit-100` to stack columns on mobile
8. **Use semantic HTML first** — ply auto-styles `<code>`, `<pre>`, `<kbd>`, `<blockquote>`, `<mark>`, `<table>`, `<details>`, `<dialog>`, `<nav>`, etc. Use native elements before creating custom classes.
9. **Only use documented ply classes** — Do NOT invent class names. Search `ply-classes.json` to find the right class. See PLY.md for the full prose reference.
10. **Dark mode is automatic** — override with `data-theme="dark"` or `data-theme="light"` on `<html>`. Use `var(--ply-*)` custom properties for colors (see `customProperties` in the JSON), never hard-code values that break dark mode.
11. **Icons** — Use [Feather Icons](https://feathericons.com) as the preferred icon library. Any icon library works, but Feather pairs well with ply's aesthetic.

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

## Common Patterns

- **Equal-height cards** — Add `equal-height` to `units-row` so all children stretch to the tallest
- **Gap between flex/grid children** — Use `gap-xs`, `gap-sm`, `gap`, `gap-lg`, `gap-xl` instead of margin hacks
- **Prevent orphaned words** — Use `no-orphan` on paragraphs, `text-balance` on headings
- **Card-style links** — Use `no-link-style` on a container to suppress link color/underline on all `<a>` inside
- **Navbar variants** — Default is a thin border. Use `navbar-thick`, `navbar-borderless`, or `navbar-border-blue/green/red/yellow`
- **Text color hierarchy** — `text-primary`, `text-secondary`, `text-tertiary` (all theme-aware)

## Class Naming

ply uses single-dash names: `navbar-centered`, `display-flex`, `margin-top-extra`. Double-dash BEM-style names (`navbar--centered`, `display--flex`) are supported as legacy aliases but single-dash is preferred.

## AI-Friendly Aliases

These aliases are equivalent to their longer counterparts:

| Short | Long |
|-------|------|
| `alert` | `tools-alert` |
| `alert-blue` | `tools-alert-blue` |
| `message` | `tools-message` |
| `btn-lg` | `btn-big` |
| `btn-sm` | `btn-small` |
| `btn-xs` | `btn-smaller` |
| `input-lg` | `input-big` |
| `input-sm` | `input-small` |
| `input-xs` | `input-smaller` |
| `li.active` (navbar) | `li.on` |

## Accessibility (WCAG 2.1 AA)

ply targets Section 508 / WCAG 2.1 AA compliance:
- `:focus-visible` outlines on all interactive elements (buttons, links, inputs, nav items, dropdowns)
- `prefers-contrast: more` support for high contrast mode
- `prefers-reduced-motion: reduce` disables animations
- `prefers-color-scheme: dark` automatic dark mode with WCAG AA contrast
- `.skip-link` — Add as the first focusable element inside `<body>` for keyboard navigation
- `.sr-only` — Visually hidden, accessible to screen readers

## Installation

### npm + Sass (recommended)
For real projects, install ply and import the SCSS source. This gives access to the full color palette, spacing variables, mixins, and Sass-level customization.

```sh
npm install plygrid
```

```scss
@use "plygrid/src/scss/components/colors" as colors;
@use "plygrid/src/scss/components/variables" as variables;
@use "plygrid/src/scss/components/mixins" as mixins;

.custom {
  color: colors.$color-blue;
  background: colors.$color-blue-pastel;
}
```

### CDN (prototyping only)
For quick demos — gives you ply's classes and dark mode, but no Sass variables, color palette, or mixins.
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/plygrid@1/dist/css/ply.min.css">
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
