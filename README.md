# ply

A ratio-based, AI-ready CSS framework with dark mode, accessibility, and a small footprint.

**~21KB gzipped. No JavaScript. No build step. One `<link>` tag.**

## Install

### npm + Sass (recommended)

For real projects, install ply and import the SCSS source to get the full color palette, variables, and mixins.

```sh
npm install plygrid
```

```scss
@use "plygrid/src/scss/ply" as *;
```

### CDN (prototyping)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/plygrid@1/dist/css/ply.min.css">
```

### Git

```sh
git clone https://github.com/thatgibbyguy/ply.git
```

## Why ply?

CSS frameworks were designed for humans reading documentation. But increasingly, the first consumer of your framework is an AI — a coding agent in Replit, Claude, Cursor, or Copilot generating a UI from a prompt.

- **Start semantic** — ply automatically styles `<nav>`, `<table>`, `<code>`, `<blockquote>`, `<details>`, `<dialog>`, and more. Start with what HTML gives you, then reach for classes when you need them.
- **AI-native** — ships with `PLY.md` (AI instruction file) and `ply-classes.json` (machine-readable class reference). Class names are predictable: `.alert-blue`, `.btn-sm`, `.unit-50`.
- **Accessible by default** — `:focus-visible` outlines on all interactive elements (including `<summary>` and legacy components), `prefers-reduced-motion`, `prefers-color-scheme` dark mode, semantic HTML styling, WCAG AA contrast in both light and dark themes. Published [VPAT 2.5](https://plycss.com/docs/vpat) documenting conformance against all WCAG 2.1 Level A and AA criteria.
- **Small footprint** — ~21KB gzipped (full), ~17KB (core). No JavaScript runtime, no build step, no tree-shaking.
- **Ratio-based grid** — think in percentages, not arbitrary columns. `unit-50` is 50%, `unit-33` is 33%. Responsive prefixes: `tablet-unit-*`, `phone-unit-*`.
- **Custom theming** — override `--ply-*` CSS custom properties to create any theme. Light and dark modes built in.

## Quick Start

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/plygrid@1/dist/css/ply.min.css">
</head>
<body>
  <div class="units-container">
    <div class="units-row">
      <div class="unit-50 tablet-unit-100">
        <h1>Hello, ply</h1>
        <p>A two-column layout. Stacks on tablet and below.</p>
      </div>
      <div class="unit-50 tablet-unit-100">
        <button class="btn btn-blue">Get Started</button>
      </div>
    </div>
  </div>
</body>
</html>
```

## Bundles

| Bundle | File | Description |
|--------|------|-------------|
| Full | `ply.min.css` | Everything — grid, typography, forms, buttons, navigation, notifications, labels, dropdown, loader, helpers |
| Core | `ply-core.min.css` | Grid, typography, forms, buttons, navigation, notifications, essential helpers |
| Essentials | `ply-essentials.min.css` | Grid + helpers only |

## Dark Mode

ply respects `prefers-color-scheme` automatically. No configuration needed.

To force a mode:

```html
<html data-theme="dark">  <!-- Force dark -->
<html data-theme="light"> <!-- Force light -->
<html>                     <!-- Auto (follows OS) -->
```

## Custom Themes

Override `--ply-*` CSS custom properties to create any theme:

```css
[data-theme="brand"] {
  --ply-bg-body: #fefce8;
  --ply-color-body: #1a1a1a;
  --ply-color-link: #b45309;
  --ply-btn-default-bg: #b45309;
  /* ... */
}
```

```html
<html data-theme="brand">
```

See `snippets/custom-theme.html` for a full working example.

## Icons

ply doesn't include icons. [Feather Icons](https://feathericons.com) is recommended — lightweight, clean, and pairs well with ply. Any icon library works.

```html
<script src="https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js"></script>
<script>feather.replace();</script>
```

## AI Integration

For AI agents (Claude, Cursor, Copilot, Replit AI):

- **`PLY.md`** — complete class reference, usage rules, anti-patterns, and snippets
- **`ply-classes.json`** — machine-readable class map for programmatic tool use
- **`snippets/`** — copy-paste HTML files for common patterns (dashboard, login, contact form, etc.)

ply is standalone — it should not be used alongside Tailwind, Bootstrap, or other CSS frameworks.

## Development

```sh
npm install
npm run build     # Compile all bundles
npm run watch     # Watch for changes
npm run lint      # Run stylelint
```

### Tech

- [Sass](https://sass-lang.com/) (modern `@use`/`@forward` modules)
- [PostCSS](https://postcss.org/) + [Autoprefixer](https://github.com/postcss/autoprefixer) + [cssnano](https://cssnano.github.io/cssnano/)

## Compliance

ply targets ADA Title II (28 CFR Part 35) / WCAG 2.1 AA compliance at the framework level. A [VPAT 2.5](https://plycss.com/docs/vpat) is published documenting conformance against all Level A and Level AA success criteria.

## Documentation

Full interactive docs at [plyCSS.com](https://plycss.com) — browse every class with live examples, search the entire framework, and copy-paste code snippets.

## Contributing

Fork this repo and create a Pull Request with your changes.

## License

MIT

Special thanks to [imperavi](https://imperavi.com/) for creating the CSS framework I could only envision at the time.
