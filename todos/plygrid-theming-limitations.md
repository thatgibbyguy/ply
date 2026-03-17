# Plygrid Theming Limitations

Findings from attempting to create a custom "warm" theme for a plygrid-based documentation site.

## 1. Dark Mode Selector Conflicts with Custom Themes

Plygrid uses the following pattern for automatic dark mode detection:

```css
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    /* dark mode variables */
  }
}
```

This means any `data-theme` value that isn't explicitly `"light"` — including custom themes like `"warm"`, `"brand"`, or `"ocean"` — will have dark mode styles applied over them when the user's system prefers dark mode. The `:not([data-theme="light"])` selector treats the world as binary: you're either light, or you're dark.

### Workaround

Use a separate HTML attribute for the custom theme while keeping `data-theme="light"` to suppress the dark mode override:

```css
[data-ply-theme="warm"] {
  --ply-bg-body: #faf6f1;
  /* ... */
}
```

```js
document.documentElement.setAttribute("data-theme", "light");
document.documentElement.setAttribute("data-ply-theme", "warm");
```

### Suggested Fix

Replace the negation selector with an explicit opt-in:

```css
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    /* auto dark only when no explicit theme is set */
  }
}

[data-theme="dark"] {
  /* explicit dark mode */
}
```

This preserves auto-detection for users with no preference set, while allowing custom themes to exist without interference.

## 2. Typography Is Not Token-Based

Colors are cleanly themeable through `--ply-*` CSS custom properties — one variable override propagates everywhere. Typography does not follow this pattern. Font families are hardcoded directly on elements:

```css
/* In plygrid's source — no CSS variable layer */
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ...;
}
```

There is no `--ply-font-body`, `--ply-font-heading`, or `--ply-font-mono` custom property. To change typography in a custom theme, you must write element-level selector overrides:

```css
[data-ply-theme="warm"] {
  font-family: "Palatino Linotype", Palatino, Georgia, serif;

  h1, h2, h3, h4, h5, h6 {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }

  code, pre, kbd {
    font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
  }
}
```

This works, but it's brittle — if plygrid adds new elements with hardcoded font-family in a future version, the custom theme won't cover them.

### Suggested Fix

Route typography through CSS custom properties, matching the pattern already used for colors:

```css
:root {
  --ply-font-body: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --ply-font-heading: var(--ply-font-body);
  --ply-font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
}
```

Then all font-family declarations reference these variables. Custom themes override three variables instead of targeting individual elements.

## 3. The Two Issues Compound

Because custom themes require a workaround for the dark mode selector (issue 1), and typography requires its own separate element-level overrides (issue 2), theming ends up being more manual than the documentation's example suggests.

The docs show:

```css
[data-theme="brand"] {
  --ply-bg-body: #fefce8;
  --ply-color-headings: #78350f;
  /* clean, simple */
}
```

In practice, a complete custom theme requires:

- A separate HTML attribute to avoid dark mode conflicts
- JavaScript logic to manage both `data-theme` and the custom attribute
- Element-level font overrides outside the CSS variable system
- Awareness that `prefers-color-scheme: dark` will fight your theme if you use `data-theme` directly

## Summary

| Aspect | Themeable via `--ply-*` variables? | Notes |
|---|---|---|
| Background colors | Yes | Clean single-variable overrides |
| Text colors | Yes | Clean single-variable overrides |
| Border colors | Yes | Clean single-variable overrides |
| Button styles | Yes | Clean single-variable overrides |
| Navigation styles | Yes | Clean single-variable overrides |
| Elevation / shadows | Yes | Clean single-variable overrides |
| Typography / fonts | No | Requires element-level CSS overrides |
| Dark mode coexistence | No | Requires workaround with separate attribute |

## Positive Note

The color theming system itself is well-designed — 60+ CSS custom properties covering backgrounds, text, borders, buttons, navigation, tables, elevation, and the full brand palette. When you stay within what the variable system covers, theming is exactly as simple as advertised. The gaps are in typography and the dark mode architecture, both of which are fixable without breaking changes.
