# PLY — AI-Ready CSS Framework

ply is a ratio-based, flexbox CSS framework with dark mode, accessibility defaults, and a small footprint (~18KB gzip full, ~16KB core).

**Differentiators:** Small bundle, AI-parseable class system, accessible out of the box, dark mode built-in.

## Quick Start

Add one line to your HTML `<head>`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/plygrid@1/dist/css/ply.min.css">
```

Or use the lean core bundle (no labels, dropdowns, loaders, print styles):

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/plygrid@1/dist/css/ply-core.min.css">
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

Alignment: `navbar--centered`, `navbar--left`, `navbar--right`, `navbar--vertical`

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
`display--flex`, `display--block`, `display--inline-block`, `display--grid`, `display--none`, `display--table`, `display--table-cell`

#### Spacing (margin)

| Class | Effect |
|-------|--------|
| `margin` | All sides (0.75rem) |
| `margin-top` | Top margin |
| `margin-bottom` | Bottom margin |
| `margin-left` | Left margin |
| `margin-right` | Right margin |
| `margin-top--extra` | Double top margin |
| `margin-bottom--extra` | Double bottom margin |
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
| `padding-top--extra` | Double top padding |
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
| `hide-on-desktop` | Hidden on desktop, visible on mobile |
| `hide-on-mobile` | Hidden on mobile |

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
  --ply-nav-active-color: #525252;
}
```

---

## Usage Rules

1. **Always wrap units in `units-row`** — `unit-*` classes must be direct children of `units-row`.
2. **Use `<button>` for buttons, not `<a>`** — Links are for navigation, buttons for actions.
3. **Wrap forms in `.form`** for styled inputs — Without the wrapper, inputs get minimal styling.
4. **Use semantic HTML** — ply enhances native elements (`<nav>`, `<table>`, `<details>`, etc.).
5. **Use `units-container` for page width** — Centers content at 1200px max-width.
6. **Add responsive classes for mobile** — At minimum use `tablet-unit-100` to stack on tablets.

## Anti-Patterns

- **DON'T** use `role="button"` on links — Use actual `<button>` elements.
- **DON'T** put `unit-*` classes outside a `units-row` — They won't work correctly.
- **DON'T** use inline styles for layout — Use the grid system instead.
- **DON'T** forget the `.form` wrapper — Without it, form elements won't be styled.
- **DON'T** use `<div>` when a semantic element exists — Use `<nav>`, `<main>`, `<section>`, `<article>`.

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
  <div class="units-row">
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
| `ply.min.css` | Everything | ~18KB |
| `ply-core.min.css` | Grid, buttons, forms, nav, alerts, tables, typography, essential helpers | ~16KB |
| `ply-essentials.min.css` | Grid, helpers, alignments, blocks only | ~5KB |
| `ply-helpers.min.css` | Helper utilities only | ~3KB |

## Machine-Readable Reference

See `ply-classes.json` for a complete structured class reference parseable by AI tools.
