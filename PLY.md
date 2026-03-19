# PLY — AI-Ready CSS Framework

ply is a ratio-based, flexbox CSS framework with dark mode, accessibility defaults, and a small footprint (~20KB gzip full, ~16KB core). 423 utility classes, 60+ CSS custom properties, 13 auto-styled semantic elements.

**Differentiators:** Small bundle, AI-parseable class system, accessible out of the box, dark mode built-in.

## Before Writing Custom CSS — Search ply-classes.json

**`ply-classes.json`** is the complete searchable reference. Before writing any custom CSS, search it first:

- **`classes`** — Every ply class (423) with category, description, and usage examples. Search here before inventing a class name or writing a custom style.
- **`customProperties`** — All `--ply-*` CSS variables organized by category (background, text, borders, interactive, forms, code, tables, buttons, navigation, elevation, brand, palette). Each entry includes light and dark mode values. Use these instead of hardcoding colors.
- **`semanticElements`** — Every HTML element ply auto-styles (`<dialog>`, `<details>`, `<table>`, `<code>`, `<kbd>`, `<mark>`, `<progress>`, `<meter>`, headings, form controls) with styling details and usage tips. Check here before building a custom component.

The JSON is the source of truth. If a class, variable, or semantic element already does what you need, use it instead of writing custom CSS.

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
  --ply-btn-default-bg: #b45309;
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

See `customProperties` in `ply-classes.json` for the full list of overridable variables.

### Custom Theme Browser Compatibility

ply uses `color-mix()` to auto-compute hover/active button states from your base color. This works in all modern browsers (Chrome 111+, Firefox 113+, Safari 16.4+, Edge 111+). On older browsers (pre-2023), `color-mix()` is ignored and the fallback hex values from ply's default theme are used instead. For custom themes targeting legacy browsers, also set `--ply-btn-default-bg-hover`, `--ply-btn-default-bg-active`, `--ply-btn-secondary-bg-hover`, and `--ply-btn-secondary-bg-active` explicitly. In modern browsers, `color-mix()` overrides these fallbacks automatically.

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

ply auto-detects `prefers-color-scheme: dark` only when no `data-theme` attribute is set on `<html>`. This means custom themes (e.g., `data-theme="warm"`) won't have dark styles applied over them. To manually set a mode:

```html
<!-- Auto (OS preference) — no data-theme attribute -->
<html>

<!-- Explicit light mode -->
<html data-theme="light">

<!-- Explicit dark mode -->
<html data-theme="dark">

<!-- Custom theme (no auto dark mode interference) -->
<html data-theme="warm">
```

Toggle with JavaScript:
```js
document.documentElement.dataset.theme =
  document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
```

---

## Container Queries

Container queries let units respond to their parent's width instead of the viewport. This is useful for reusable components (cards, widgets, sidebars) that need to adapt based on the space they're placed in, not the screen size.

**Wrapper:** Add `container-query` to the parent element to enable container queries.

**Container prefixes** mirror viewport prefixes with a `container-` prefix:

| Container prefix | Breakpoint | Mirrors |
|---|---|---|
| `container-phone-unit-*` | 480px | `phone-unit-*` |
| `container-large-phone-unit-*` | 650px | `large-phone-unit-*` |
| `container-tablet-unit-*` | 767px | `tablet-unit-*` |
| `container-small-desktop-unit-*` | 1024px | `small-desktop-unit-*` |

All 21 unit sizes are available (100, 90, 88, 80, 75, 70, 66, 65, 62, 60, 50, 40, 38, 35, 33, 30, 25, 20, 12, 10, auto).

Container query classes use `@container` rules instead of `@media` — they fire based on the `.container-query` element's inline size. Mix viewport and container prefixes freely on the same element.

---

## Class Reference — See ply-classes.json

All classes, CSS custom properties, and semantic element styles are documented in **`ply-classes.json`**. Search it for class names, categories, descriptions, and usage examples. The JSON is the source of truth — do not invent class names that aren't in it.

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

### Button Hierarchy

- **`btn-primary`** — Primary call-to-action. Blue by default, themed via `--ply-btn-default-bg`. WCAG AA compliant (4.56:1 contrast on white).
- **`btn-secondary`** (or plain `btn`) — Secondary actions. Dark gray by default, themed via `--ply-btn-secondary-bg`.
- **`btn-primary-outline`** / **`btn-secondary-outline`** — Outlined variants. Transparent bg, border + text from the respective theme color. Fills on hover.
- **`btn-ghost`** — Ghost button. Text-only with subtle hover tint.
- **`btn-blue`**, **`btn-red`**, **`btn-green`**, **`btn-yellow`** — Static color buttons with hardcoded hex values. Immune to theming. Use for color-coded actions (e.g., delete = red, success = green).

```html
<!-- Primary + Secondary pair -->
<button class="btn btn-primary">Save</button>
<button class="btn btn-secondary">Cancel</button>

<!-- Themed: --ply-btn-default-bg controls primary + links -->
<html data-theme="warm">
<style>[data-theme="warm"] { --ply-btn-default-bg: #92400e; }</style>

<!-- Static: btn-blue stays blue regardless of theme -->
<button class="btn btn-blue">Always Blue</button>
```

### Icon Buttons

- **`btn-icon`** — Icon-only button modifier. Equal padding for a square aspect ratio. Always add `aria-label` (no visible text).
- Combine with `btn-ghost` for toolbar-style icon buttons. Combine with size modifiers (`btn-sm`, `btn-xs`) for smaller icons.
- For icon + text buttons, use a regular `btn` with an inline SVG — no `btn-icon` needed.

## Common Patterns

### Responsive Collapsible Header (CSS-Only)

Use `<details>`/`<summary>` as a hamburger toggle for mobile. No JavaScript required. The nav shows inline on desktop and collapses behind a toggle on mobile.

```html
<header class="sticky" style="top: 0; z-index: 100;">
  <nav class="navbar" aria-label="Main navigation">
    <!-- Desktop nav — hidden on mobile -->
    <ul class="phone-hide">
      <li class="active"><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Services</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
    <!-- Mobile hamburger — hidden on desktop -->
    <details class="tablet-hide desktop-hide">
      <summary aria-label="Menu">&#9776; Menu</summary>
      <ul>
        <li class="active"><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </details>
  </nav>
</header>
```

**How it works:**
- `sticky` + `top: 0` keeps the header pinned on scroll.
- `phone-hide` hides the desktop `<ul>` on small screens (≤ 767px).
- `tablet-hide desktop-hide` shows the `<details>` toggle only on mobile.
- `<details>`/`<summary>` is natively keyboard-accessible — Enter/Space toggles it, no JS needed.
- Start mobile-first: design the collapsed state first, then override with wider breakpoints.

**Always include the viewport meta tag** in your `<head>` for responsive behavior:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

See `snippets/responsive-header.html` for a full working example.

### Other Common Patterns

- **Equal-height cards** — Add `equal-height` to `units-row` so all children stretch to the tallest
- **Gap between flex/grid children** — Use `gap-xs`, `gap-sm`, `gap`, `gap-lg`, `gap-xl` instead of margin hacks
- **Prevent orphaned words** — Use `no-orphan` on paragraphs, `text-balance` on headings
- **Card-style links** — Use `no-link-style` on a container to suppress link color/underline on all `<a>` inside
- **Navbar variants** — Default is a thin border. Use `navbar-thick`, `navbar-borderless`, or `navbar-border-blue/green/red/yellow`
- **Text color hierarchy** — `text-primary`, `text-secondary`, `text-tertiary` (all theme-aware)

## Accessibility (WCAG 2.1 AA)

ply is built for Section 508 / WCAG 2.1 AA compliance out of the box:

- **Focus indicators** — All interactive elements (buttons, links, inputs, nav items, dropdowns) use `:focus-visible` with a 2px blue outline. Keyboard users see clear focus rings; mouse users don't.
- **High contrast mode** — `@media (prefers-contrast: more)` is supported. Text colors and link colors become stronger for users who need more contrast.
- **Reduced motion** — `@media (prefers-reduced-motion: reduce)` disables animations and transitions.
- **Dark mode** — `prefers-color-scheme: dark` is respected automatically when no `data-theme` attribute is set. Theme-aware colors maintain WCAG AA contrast in both modes.
- **Skip link** — Use `.skip-link` as the first focusable element to let keyboard users skip past navigation.
- **Screen reader support** — `.sr-only` hides content visually while keeping it accessible to assistive technology.
- **Sortable table headers** — `th.sortable` elements have `:focus-visible` outlines for keyboard users.
- **Pagination** — Focus-visible outlines on all page links, disabled states prevent interaction, `aria-current="page"` supported on active items.
- **Dialog patterns** — Dialog open/close respects `prefers-reduced-motion` (no animation when reduced motion is preferred).
- **Multi-step forms** — Step transitions respect `prefers-reduced-motion`.
- **RTL support** — `dir="rtl"` enables proper internationalization with automatic layout mirroring for Arabic, Hebrew, and other RTL languages.

```html
<!-- Skip link — first element inside <body> -->
<a href="#main" class="skip-link">Skip to main content</a>
<nav class="navbar">...</nav>
<main id="main">...</main>
```

## Title II / WCAG 2.1 AA Compliance

ply targets ADA Title II compliance (28 CFR Part 35) by meeting WCAG 2.1 Level AA success criteria at the framework level. As of June 2024, state and local government web content must conform to WCAG 2.1 AA. ply provides a compliant foundation so that applications built on it start closer to full conformance.

### WCAG criteria ply satisfies at the framework level

| WCAG Criterion | How ply addresses it |
|----------------|---------------------|
| **1.3.1 Info and Relationships** | Semantic HTML auto-styling encourages correct use of `<nav>`, `<main>`, `<aside>`, `<table>`, `<details>`, headings, and form elements. `.sr-only` exposes supplemental info to assistive technology. |
| **1.4.3 Contrast (Minimum)** | All default color pairings (text on background, button labels, link colors) meet 4.5:1 contrast in both light and dark modes. The brand palette levels are tuned for AA. |
| **1.4.6 Contrast (Enhanced)** | `@media (prefers-contrast: more)` strengthens text and link colors beyond AA minimums. |
| **1.4.11 Non-Text Contrast** | Focus indicators, button borders, and input borders all meet the 3:1 non-text contrast ratio. |
| **2.1.1 Keyboard** | All ply interactive elements (buttons, links, inputs, nav items, `<details>`, `<dialog>`) are natively keyboard-operable. No custom JS required. |
| **2.3.3 Animation from Interactions** | `@media (prefers-reduced-motion: reduce)` disables all CSS animations and transitions. |
| **2.4.1 Bypass Blocks** | `.skip-link` lets keyboard users jump past navigation to main content. |
| **2.4.7 Focus Visible** | `:focus-visible` outlines appear on every interactive element. Mouse users do not see them; keyboard users always do. |
| **4.1.2 Name, Role, Value** | ply ships zero JavaScript. All interactivity comes from native HTML elements (`<button>`, `<a>`, `<input>`, `<dialog>`, `<details>`), which expose correct roles and states automatically. No ARIA state management failures from framework code. |

### WCAG criteria that require application-level work

These criteria depend on content and custom code — ply cannot enforce them automatically:

| WCAG Criterion | What you need to do |
|----------------|---------------------|
| **1.1.1 Non-text Content** | Add `alt` attributes to all `<img>` elements. Use `alt=""` for purely decorative images. Provide text alternatives for `<svg>` icons (`aria-label` or `<title>`). |
| **1.3.1 Info and Relationships** (content) | Use one `<h1>` per page. Follow heading hierarchy (h1 > h2 > h3) without skipping levels. Use `<label>` elements for form inputs. Group related form fields with `<fieldset>` and `<legend>`. |
| **1.3.2 Meaningful Sequence** | Ensure DOM order matches visual order. ply's `reverse-direction` class reverses visual order but not DOM order — use it only when the visual reorder is cosmetic. |
| **1.4.1 Use of Color** | Do not rely on color alone to convey information. Pair colored status indicators (`.success`, `.error`) with text labels or icons. |
| **1.4.3 Contrast (Minimum)** (custom colors) | If you override `--ply-*` variables or add custom colors, verify 4.5:1 contrast for normal text and 3:1 for large text (18px bold / 24px regular) and UI components. |
| **2.1.1 Keyboard** (custom widgets) | Custom JavaScript components (tabs, carousels, drag-and-drop, custom dropdowns) must be fully operable with keyboard alone. Manage `tabindex`, arrow key navigation, and Escape to close. |
| **2.4.2 Page Titled** | Every page needs a descriptive `<title>` element. |
| **2.4.4 Link Purpose** | Link text should describe the destination. Avoid "click here" — use descriptive text or add `aria-label` when the visible text is ambiguous. |
| **2.4.6 Headings and Labels** | Headings and form labels must describe their content or purpose. ply styles them, but you write the text. |
| **3.1.1 Language of Page** | Set `lang` attribute on `<html>` (e.g., `<html lang="en">`). |
| **3.3.1 Error Identification** | When form validation fails, identify the error in text (not just color). Use `input-error` alongside a visible error message. |
| **3.3.2 Labels or Instructions** | Provide visible labels for form inputs. ply's `.form` wrapper styles `<label>` elements — use them. |
| **4.1.2 Name, Role, Value** (custom widgets) | Custom interactive widgets (JS-powered dropdowns, modals, tab panels) need ARIA attributes: `aria-expanded`, `aria-controls`, `aria-selected`, `role="tablist"`, etc. |

### AI agent guidance for accessible markup

When generating ply markup, follow these practices to produce Title II compliant output:

1. **Use semantic elements for landmarks** — `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`, `<section>`, `<article>`. Never use `<div>` for structural roles.
2. **Add `aria-label` to custom widgets** — Any interactive element without a visible text label needs `aria-label` or `aria-labelledby`.
3. **Use `<form role="search">` for search forms** — This creates a search landmark for screen reader users.
4. **Include `.skip-link` in page templates** — Add `<a href="#main" class="skip-link">Skip to main content</a>` as the first focusable element inside `<body>`.
5. **Add `alt` text to all images** — Describe the image content. Use `alt=""` only for decorative images.
6. **Maintain heading hierarchy** — Start with `<h1>`, follow with `<h2>`, then `<h3>`. Never skip levels. Use `.h1`-`.h6` classes for visual sizing when the semantic level differs.
7. **Label all form inputs** — Wrap inputs in `<label>` or use `for`/`id` pairing. Add `<fieldset>` and `<legend>` for radio/checkbox groups.
8. **Set `lang` on `<html>`** — Always include `<html lang="en">` (or the appropriate language code).
9. **Pair color with text** — When using `.success` or `.error` classes, include a text label (not just color) to convey meaning.
10. **Use native elements over ARIA** — Prefer `<button>` over `<div role="button">`, `<dialog>` over `<div role="dialog">`, `<details>` over custom accordion JS. Native elements handle keyboard and ARIA automatically.

## Focus Management & Keyboard Patterns

ply provides `:focus-visible` outlines on all native interactive elements. For custom widgets built with JavaScript, you need to manage focus order, keyboard navigation, and screen reader announcements yourself.

### Focus Order Strategy

1. **Use semantic HTML first** — Native `<button>`, `<a>`, `<input>`, `<select>`, `<details>`, and `<dialog>` are already in the tab order. No extra work needed.
2. **`tabindex="0"`** — Add to custom interactive elements (e.g., a `<div>` that acts as a button) to include them in the natural tab order. ply's `:focus-visible` outline will apply automatically.
3. **`tabindex="-1"`** — Use for elements that should receive focus programmatically (e.g., a modal container after opening, an error message after form validation) but should NOT be in the tab order.
4. **Never use `tabindex` > 0** — It overrides natural DOM order and creates confusing navigation.

```html
<!-- Native elements — already focusable, no tabindex needed -->
<button class="btn">Save</button>
<a href="/settings">Settings</a>

<!-- Custom interactive element — add tabindex="0" -->
<div role="button" tabindex="0" onclick="doAction()" onkeydown="if(event.key==='Enter'||event.key===' ')doAction()">
  Custom Action
</div>

<!-- Programmatic focus target — tabindex="-1" -->
<div id="error-summary" tabindex="-1" role="alert">
  Please fix the errors below.
</div>
<script>
  // After form validation fails, move focus to the error summary
  document.getElementById('error-summary').focus();
</script>
```

### Arrow Key Navigation (Roving Tabindex)

For grouped controls like tabs, toolbars, or menu items, use roving tabindex: only one item in the group has `tabindex="0"` (the active one), the rest have `tabindex="-1"`. Arrow keys move focus within the group.

```html
<!-- Roving tabindex — only the active tab is in the tab order -->
<div role="tablist" aria-label="Settings">
  <button role="tab" aria-selected="true" tabindex="0" aria-controls="panel-general" id="tab-general">General</button>
  <button role="tab" aria-selected="false" tabindex="-1" aria-controls="panel-security" id="tab-security">Security</button>
  <button role="tab" aria-selected="false" tabindex="-1" aria-controls="panel-notifications" id="tab-notifications">Notifications</button>
</div>
<div role="tabpanel" id="panel-general" aria-labelledby="tab-general">
  <p>General settings content.</p>
</div>
```

```js
// Arrow key handler for roving tabindex
tablist.addEventListener('keydown', (e) => {
  const tabs = [...tablist.querySelectorAll('[role="tab"]')];
  const current = tabs.indexOf(document.activeElement);
  let next;
  if (e.key === 'ArrowRight') next = (current + 1) % tabs.length;
  else if (e.key === 'ArrowLeft') next = (current - 1 + tabs.length) % tabs.length;
  else if (e.key === 'Home') next = 0;
  else if (e.key === 'End') next = tabs.length - 1;
  else return;
  e.preventDefault();
  tabs[current].setAttribute('tabindex', '-1');
  tabs[current].setAttribute('aria-selected', 'false');
  tabs[next].setAttribute('tabindex', '0');
  tabs[next].setAttribute('aria-selected', 'true');
  tabs[next].focus();
  // Show corresponding panel
  tabs.forEach((tab, i) => {
    document.getElementById(tab.getAttribute('aria-controls')).hidden = (i !== next);
  });
});
```

### ARIA Attributes Reference

| Attribute | When to use | Example |
|-----------|-------------|---------|
| `aria-expanded` | Toggleable content (dropdowns, accordions, hamburger menus) | `<button aria-expanded="false" aria-controls="menu">Menu</button>` |
| `aria-controls` | Links a trigger to the element it controls | `<button aria-controls="dropdown-1">Options</button>` |
| `aria-selected` | Active item in tabs, listboxes | `<button role="tab" aria-selected="true">Tab 1</button>` |
| `aria-current="page"` | Current page in navigation | `<a href="/" aria-current="page">Home</a>` |
| `aria-live="polite"` | Dynamic content that updates (notifications, status messages) | `<div aria-live="polite">3 results found.</div>` |
| `aria-live="assertive"` | Urgent announcements (errors) | `<div aria-live="assertive" role="alert">Session expired.</div>` |
| `role="status"` | Non-urgent status updates | `<div role="status">Saving...</div>` |
| `aria-label` | Labels for elements without visible text | `<button aria-label="Close">&#215;</button>` |
| `aria-labelledby` | Points to another element for its label | `<div role="tabpanel" aria-labelledby="tab-1">` |
| `aria-describedby` | Additional description for an element | `<input aria-describedby="password-hint">` |

### Live Regions for Dynamic Content

When content updates without a page reload (e.g., search results, form validation, notifications), screen readers need to be told about the change.

```html
<!-- Status message — announced politely after current speech -->
<div aria-live="polite" role="status" class="sr-only" id="search-status"></div>
<script>
  document.getElementById('search-status').textContent = '12 results found.';
</script>

<!-- Error alert — announced immediately -->
<div aria-live="assertive" role="alert">
  Your session has expired. Please log in again.
</div>
```

### Fieldset & Legend for Grouped Controls

Group related radio buttons and checkboxes with `<fieldset>` and `<legend>`. This tells screen readers the group label.

```html
<form class="form">
  <fieldset>
    <legend>Notification preferences</legend>
    <label><input type="checkbox" name="notify" value="email"> Email</label>
    <label><input type="checkbox" name="notify" value="sms"> SMS</label>
    <label><input type="checkbox" name="notify" value="push"> Push notification</label>
  </fieldset>
  <fieldset>
    <legend>Frequency</legend>
    <label><input type="radio" name="freq" value="immediate"> Immediate</label>
    <label><input type="radio" name="freq" value="daily"> Daily digest</label>
    <label><input type="radio" name="freq" value="weekly"> Weekly digest</label>
  </fieldset>
</form>
```

### Screen Reader Testing Quick Reference

Test with VoiceOver (macOS) to verify your custom widgets are accessible:

| Action | Shortcut |
|--------|----------|
| Turn on/off VoiceOver | Cmd + F5 |
| Navigate next element | VO + Right Arrow (VO = Ctrl + Option) |
| Navigate previous element | VO + Left Arrow |
| Activate (click) element | VO + Space |
| Read current element | VO + F3 |
| Open rotor (landmarks, headings, links) | VO + U |
| Enter/exit groups | VO + Shift + Down/Up |

**What to check:**
- Every interactive element is reachable with Tab or arrow keys
- Buttons and links announce their label and role
- Expanded/collapsed state is announced when toggling (`aria-expanded`)
- Dynamic content changes are announced (`aria-live`)
- Form inputs announce their label, required state, and error messages
- Heading hierarchy is logical (use rotor > Headings to verify)

## Custom Widget Accessibility Patterns

When building custom interactive widgets beyond ply's built-in components, follow these patterns to maintain WCAG 2.1 AA compliance.

### Drag-and-Drop Keyboard Pattern

Drag-and-drop interfaces must be fully keyboard operable (WCAG 2.1.1). Use a listbox pattern with grab/move/drop states and an `aria-live` region to announce changes:

```html
<div class="sr-only" aria-live="assertive" id="dnd-status"></div>
<p class="text-secondary text-sm">Keyboard: Tab to list, Space to grab, ↑↓ to move, Enter to drop, Escape to cancel.</p>
<ul role="listbox" aria-label="Sortable list" id="sortable-list">
  <li role="option" tabindex="0" aria-grabbed="false" data-index="0">Item 1</li>
  <li role="option" tabindex="-1" aria-grabbed="false" data-index="1">Item 2</li>
  <li role="option" tabindex="-1" aria-grabbed="false" data-index="2">Item 3</li>
</ul>
```

```js
const list = document.getElementById('sortable-list');
const status = document.getElementById('dnd-status');
let grabbed = null;

list.addEventListener('keydown', (e) => {
  const item = e.target;
  if (item.role !== 'option') return;

  if (e.key === ' ' && !grabbed) {
    e.preventDefault();
    grabbed = item;
    item.setAttribute('aria-grabbed', 'true');
    status.textContent = `Grabbed ${item.textContent}. Use arrow keys to move, Enter to drop.`;
  } else if (e.key === 'ArrowDown' && grabbed) {
    e.preventDefault();
    const next = grabbed.nextElementSibling;
    if (next) { list.insertBefore(next, grabbed); status.textContent = `Moved down to position ${[...list.children].indexOf(grabbed) + 1}.`; }
  } else if (e.key === 'ArrowUp' && grabbed) {
    e.preventDefault();
    const prev = grabbed.previousElementSibling;
    if (prev) { list.insertBefore(grabbed, prev); status.textContent = `Moved up to position ${[...list.children].indexOf(grabbed) + 1}.`; }
  } else if (e.key === 'Enter' && grabbed) {
    e.preventDefault();
    grabbed.setAttribute('aria-grabbed', 'false');
    status.textContent = `Dropped ${grabbed.textContent} at position ${[...list.children].indexOf(grabbed) + 1}.`;
    grabbed = null;
  } else if (e.key === 'Escape' && grabbed) {
    e.preventDefault();
    grabbed.setAttribute('aria-grabbed', 'false');
    status.textContent = 'Reorder cancelled.';
    grabbed = null;
  }
});
```

See `snippets/accessible-drag-and-drop.html` for a complete working example.

### Focus Trap for Modals

Prefer native `<dialog>` — ply styles it automatically and the browser handles focus trapping. For custom modals, trap Tab/Shift+Tab and set `aria-modal="true"`:

```js
function trapFocus(modal) {
  const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  const first = focusable[0], last = focusable[focusable.length - 1];
  modal.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  first?.focus();
}
```

### Focus Return After Close

Always restore focus to the element that triggered the widget:

```js
const trigger = document.activeElement; // Store before opening
modal.showModal();
modal.addEventListener('close', () => trigger.focus(), { once: true });
```

### Custom Widget Checklist

| Requirement | WCAG | How to verify |
|---|---|---|
| Keyboard operable (no mouse required) | 2.1.1 | Tab, Enter, Space, arrows all work |
| Focus indicator visible | 2.4.7 | ply provides `:focus-visible` — don't override `outline: none` |
| States announced to screen readers | 4.1.2 | `aria-grabbed`, `aria-expanded`, `aria-selected` update on interaction |
| Focus trapped in modals | 2.4.3 | Tab does not leave an open dialog |
| Focus restored on close | 2.4.3 | Closing returns focus to the trigger element |
| Touch targets ≥ 44×44px | 2.5.5 | Measure interactive elements |
| Alternative input available | 2.1.1 | Drag-and-drop has keyboard fallback |
| Screen reader tested | 4.1.2 | Verify with VoiceOver (macOS) or NVDA (Windows) |

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

## Copy-Paste Snippets — See `snippets/`

Ready-to-use HTML examples are in the `snippets/` directory:

| File | Description |
|------|-------------|
| `starter-page.html` | Minimal ply page with CDN link |
| `two-column-layout.html` | Sidebar + main content |
| `card.html` | Card with border and button |
| `contact-form.html` | Styled form with validation |
| `navbar-page.html` | Navbar + page content |
| `dashboard.html` | Dashboard with stats cards |
| `notifications.html` | Alert variants |
| `data-table.html` | Styled data table |
| `login-page.html` | Centered login form |
| `pricing-cards.html` | Pricing tier cards |
| `custom-theme.html` | Custom theme example |
| `responsive-header.html` | CSS-only collapsible responsive header |
| `accessible-drag-and-drop.html` | Keyboard-accessible sortable list with ARIA live announcements |

---

## Bundles

| Bundle | Includes | Size (gzip) |
|--------|----------|-------------|
| `ply.min.css` | Everything | ~20KB |
| `ply-core.min.css` | Grid, buttons, forms, nav, alerts, tables, typography, essential helpers | ~17KB |
| `ply-essentials.min.css` | Grid, helpers, alignments, blocks only | ~6KB |
| `ply-helpers.min.css` | Helper utilities only | ~4KB |
