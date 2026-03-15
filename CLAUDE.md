# ply CSS Framework — AI Instructions

This is the ply CSS framework repository. See **PLY.md** for the complete class reference, usage rules, and copy-paste snippets.

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
9. **Only use documented ply classes** — Do NOT invent class names. Use `text-primary`, `text-secondary`, `text-tertiary` for text color hierarchy (not `.color-gray-60` etc.). See PLY.md for the full class reference.
10. **Dark mode is automatic** — override with `data-theme="dark"` or `data-theme="light"` on `<html>`. Use `var(--ply-*)` custom properties for colors, never hard-code values that break dark mode.
11. **Icons** — Use [Feather Icons](https://feathericons.com) as the preferred icon library. Any icon library works, but Feather pairs well with ply's aesthetic.

## Common Patterns

- **Equal-height cards** — Add `equal-height` to `units-row` so all children stretch to the tallest
- **Gap between flex/grid children** — Use `gap-xs`, `gap-sm`, `gap`, `gap-lg`, `gap-xl` instead of margin hacks
- **Prevent orphaned words** — Use `no-orphan` on paragraphs, `text-balance` on headings
- **Card-style links** — Use `no-link-style` on a container to suppress link color/underline on all `<a>` inside
- **Navbar variants** — Default is a thin border. Use `navbar--thick`, `navbar--borderless`, or `navbar--border-blue/green/red/yellow`
- **Text color hierarchy** — `text-primary`, `text-secondary`, `text-tertiary` (all theme-aware)

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

## CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/plygrid@1/dist/css/ply.min.css">
```

## Build

```bash
npm install
npm run build
```

## File Structure

- `src/scss/` — SCSS source (modern `@use`/`@forward` modules)
- `dist/css/` — Compiled CSS bundles
- `PLY.md` — Complete AI instruction file with class reference
- `ply-classes.json` — Machine-readable class reference
- `snippets/` — Copy-paste HTML examples
