# ply

A ratio-based, AI-ready CSS framework with dark mode, accessibility, and a small footprint.

**~21KB gzipped. No JavaScript. No build step. One `<link>` tag.**

## Install

### npm + Sass (recommended)

For real projects, install ply and import the SCSS source to get the full color palette, variables, and mixins.

```sh
npm install ply-css
```

```scss
@use "ply-css/src/scss/ply" as *;
```

### CDN (prototyping)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ply-css@1/dist/css/ply.min.css">
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
- **Small footprint** — ~21KB gzipped (full), ~17KB (core), ~5KB with tree-shaking. No JavaScript runtime, no build step required.
- **Ratio-based grid** — think in percentages, not arbitrary columns. `unit-50` is 50%, `unit-33` is 33%. Responsive prefixes: `tablet-unit-*`, `phone-unit-*`.
- **Custom theming** — override `--ply-*` CSS custom properties to create any theme. Light and dark modes built in.

## Quick Start

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ply-css@1/dist/css/ply.min.css">
</head>
<body>
  <div class="units-container">
    <div class="units-row">
      <div class="unit-50 tablet-unit-100">
        <h1>Hello, ply</h1>
        <p>A two-column layout. Stacks on tablet and below.</p>
      </div>
      <div class="unit-50 tablet-unit-100">
        <button class="btn btn-primary">Get Started</button>
      </div>
    </div>
  </div>
</body>
</html>
```

## Bundles

| Bundle | File | Description |
|--------|------|-------------|
| Full | `ply.min.css` | Everything — grid, typography, forms, buttons, navigation, notifications, labels, loader, helpers |
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
[data-theme="warm"] {
  --ply-bg-body: #faf5f0;
  --ply-color-body: #1c1917;
  --ply-color-headings: #44240e;
  --ply-color-accent: #92400e;     /* Icons, badges, section accents */
  --ply-btn-default-bg: #92400e;   /* Primary button + links */
  --ply-btn-secondary-bg: #78350f; /* Secondary button */
  --ply-border-radius: 0.375rem;   /* Global border radius */
  --ply-btn-border-radius: 0.5rem; /* Button corner radius */
  --ply-font-body: Palatino, Georgia, serif;
  --ply-font-heading: Palatino, Georgia, serif;
  /* ... */
}
```

```html
<html data-theme="warm">
```

See `snippets/custom-theme.html` for a full working example.

## Icons

ply doesn't include icons. [Lucide](https://lucide.dev) is recommended — lightweight, clean, and pairs well with ply. Any icon library works.

```html
<script src="https://cdn.jsdelivr.net/npm/lucide@latest/dist/umd/lucide.min.js"></script>
<script>lucide.createIcons();</script>
```

## AI Integration

For AI agents (Claude, Cursor, Copilot, Replit AI):

- **`PLY.md`** — complete class reference, usage rules, anti-patterns, and snippets
- **`ply-classes.json`** — machine-readable class map for programmatic tool use
- **`snippets/`** — copy-paste HTML files for common patterns (dashboard, login, contact form, etc.)

ply is standalone — it should not be used alongside Tailwind, Bootstrap, or other CSS frameworks.

## Tree-Shaking (Purge Unused CSS)

ply ships all 457 classes in every bundle. For production, you can purge unused
classes to get Tailwind-level bundle sizes (~5KB gzipped for a typical page).

### PostCSS Plugin

The recommended approach for projects with an existing PostCSS pipeline:

```sh
npm install -D @fullhuman/postcss-purgecss
```

```js
// postcss.config.js
const plyPurge = require('ply-css/purge');

module.exports = {
  plugins: [
    plyPurge({ content: ['./src/**/*.{html,jsx,tsx,vue}'] }),
  ],
};
```

### CLI

For standalone use or CI pipelines:

```sh
npm install -D purgecss
npx ply-purge --css node_modules/ply-css/dist/css/ply.min.css \
              --content 'src/**/*.{html,jsx,tsx}' \
              -o public/ply.css
```

### Results

| Scenario | Before | After (gzipped) | Reduction |
|----------|--------|-----------------|-----------|
| Single page (card) | 21 KB | ~5 KB | ~75% |
| All snippets (13 pages) | 21 KB | ~11 KB | ~48% |
| Real-world app page | 21 KB | ~5.5 KB | ~74% |

The purge tool auto-safelists dynamically-toggled classes (`active`,
`sort-asc`, etc.) and responsive grid variants so they aren't incorrectly
removed. Pass additional safelisted classes with `--safelist` (CLI) or the
`safelist` option (PostCSS).

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

Full interactive docs at [plycss.com](https://plycss.com) — browse every class with live examples, search the entire framework, and copy-paste code snippets.

## Roadmap

- CSS logical properties for native RTL support (replaces bolt-on mirroring)
- Build-time class validator / VS Code extension
- Automated accessibility test suite (VPAT evidence)

## Contributing

Fork this repo and create a Pull Request with your changes.

## License

MIT

Special thanks to [imperavi](https://imperavi.com/) for creating the CSS framework I could only envision at the time.
