# ply CSS Framework — AI Instructions

This is the ply CSS framework repository. See **PLY.md** for the complete class reference, usage rules, and copy-paste snippets.

## Key Rules for Generating ply Markup

1. **Always wrap `unit-*` classes inside `units-row`** — they are flex children and won't work alone
2. **Use `units-container`** for page-width centering (1200px max)
3. **Wrap forms in `.form`** to enable styled inputs
4. **Use `<button class="btn">` for buttons** — not `<a>` tags
5. **`units-row` can be nested** inside units for complex layouts
6. **Add responsive classes** — at minimum `tablet-unit-100` to stack columns on mobile
7. **Use semantic HTML** — `<nav>`, `<main>`, `<section>`, `<aside>`, `<article>`
8. **Dark mode is automatic** — override with `data-theme="dark"` or `data-theme="light"` on `<html>`

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
