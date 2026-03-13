# PLY Typography Modernization + Example Page

## Context
PLY's typography uses font-weight 100 (ultra-light) for headings, a non-standard 15px base, em-based calculations, and identical heading sizes across all breakpoints. The goal is to modernize to a system-font, rem-based type system inspired by Tailwind/Carbon with proper font weights, a granular type scale, and responsive heading sizes. Also create an example page showcasing all components.

## Files to Modify
- `src/scss/components/_variables.scss` — rework all tokens (do first, everything depends on it)
- `src/scss/components/_typography.scss` — heading/body styles, responsive sizes
- `src/scss/components/_helpers.scss` — add new utility classes (text-xs..5xl, font-*, leading-*)
- `src/scss/components/_mixins.scss` — verify grid math compiles with rem gutter
- Other component files (_buttons, _forms, _navigation, _labels, etc.) auto-update via variables

## New File
- `examples/index.html` — component showcase page linking to `../dist/css/ply.css`

---

## Step 1: Rework `_variables.scss`

### Font stacks
- Base: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'`
- Code/Mono: `ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace`

### Type scale (rem-based, 16px root)
```
$font-size-xs:   0.75rem   // 12px
$font-size-sm:   0.875rem  // 14px
$font-size-base: 1rem      // 16px
$font-size-lg:   1.125rem  // 18px
$font-size-xl:   1.25rem   // 20px
$font-size-2xl:  1.5rem    // 24px
$font-size-3xl:  1.875rem  // 30px
$font-size-4xl:  2.25rem   // 36px
$font-size-5xl:  3rem      // 48px
```

### Backward-compatible aliases
- `$font-size-big` → `$font-size-lg`
- `$font-size-small` → `$font-size-sm`
- `$font-size-smaller` → `$font-size-xs`
- `$font-size-lead` → `$font-size-xl`

### Font weights
- `$font-weight-normal: 400`, `$font-weight-medium: 500`, `$font-weight-semibold: 600`, `$font-weight-bold: 700`
- `$header-font-weight: $font-weight-semibold` (was 100)

### Line heights
- `$line-height-tight: 1.25`, `$line-height-snug: 1.375`, `$line-height-normal: 1.5`, `$line-height-relaxed: 1.625`
- `$base-line: 1.5rem` (24px, was ~24.75px)

### Heading sizes — now responsive
- Desktop: h1=5xl(48px), h2=4xl(36px), h3=3xl(30px), h4=2xl(24px), h5=xl(20px), h6=sm(14px)
- Tablet: h1=4xl(36px), h2=3xl(30px), h3=2xl(24px), h4=xl(20px), h5=lg(18px), h6=sm(14px)
- Mobile: h1=3xl(30px), h2=2xl(24px), h3=xl(20px), h4=lg(18px), h5=base(16px), h6=sm(14px)

### Spacing (rem, 4px/8px grid)
- `$padding: 0.75rem` (12px), `$margin: 0.75rem`
- `$border-radius: 0.25rem`, `$button-radius: 2rem`
- `$grid-gutter-width: 0.5rem` (8px, was ~0.5em)

### Button/input padding (rem-based)
- `$padding-input-base: 0.5rem`, `$padding-btn-base: 0.625rem`
- `$padding-btn-side-base: 1.5rem`, `$padding-btn-side-in-forms-base: 1rem`

---

## Step 2: Rework `_typography.scss`

- Body: `font-size: 1rem`, `line-height: 1.5rem`
- Heading weights: 600 (from variable)
- Heading margins: `0 0 0.5rem`
- h1/h2 line-height: `$line-height-tight` (1.25)
- h3/h4 line-height: `$line-height-snug` (1.375)
- Responsive media queries now have genuinely different sizes at each breakpoint
- List margins: `$base-line * 2` → keep or tighten to `2rem`

---

## Step 3: Add utility classes to `_helpers.scss`

- `.text-xs` through `.text-5xl` (9 size utilities)
- `.font-normal`, `.font-medium`, `.font-semibold`, `.font-bold`
- `.leading-tight`, `.leading-snug`, `.leading-normal`, `.leading-relaxed`
- Existing helpers (.big, .small, .bold, etc.) remain unchanged

---

## Step 4: Verify `_mixins.scss` grid math

Grid mixins do `math.div` with `$grid-gutter-width`. Changing from em→rem keeps the same numeric value (0.5). If unit mismatch errors occur, introduce a unitless variable for the grid math.

---

## Step 5: Create `examples/index.html`

Showcase page with sections for:
1. Typography (h1-h6, body, lead, inline elements, blockquote, lists, code)
2. Text utilities (size, weight, line-height classes)
3. Grid system (2/3/4-col layouts, responsive units)
4. Buttons (all colors, outline, disabled, sizes, groups)
5. Forms (labels, inputs, states, inline, fancy select, input groups)
6. Navigation (navbar, pills, tabs, breadcrumbs, pagination)
7. Labels & badges
8. Notifications/alerts
9. Color palette swatches
10. Helpers (spacing, display, positioning)

---

## Verification
1. `npm run build` — must compile with zero errors and zero warnings
2. `npm run lint` — must pass
3. Open `examples/index.html` in browser — verify typography, grid, buttons, forms, nav all render correctly
4. Resize browser to verify responsive heading scaling at tablet/mobile breakpoints
