# Voluntary Product Accessibility Template (VPAT)

## VPAT 2.5 Rev — WCAG 2.1 Edition

**Product name:** ply CSS Framework v1.6.0
**Product description:** A ratio-based, AI-ready CSS framework with built-in accessibility support for semantic HTML styling, responsive layouts, dark mode, and theming via CSS custom properties.
**Date:** March 2026
**Contact:** GitHub Issues — <https://github.com/thatgibbyguy/ply/issues>
**Evaluation methods used:** Source code review of SCSS components, compiled CSS analysis, manual inspection of rendered output, and automated Lighthouse accessibility audits (v12.8.2) across six pages of the plycss.com documentation site (scores: 95–96/100).

---

## Scope and Disclaimers

This VPAT evaluates the **ply CSS framework itself** — its stylesheets, CSS custom properties, utility classes, and semantic HTML auto-styling. It does **not** evaluate any specific application built with ply.

**Important limitations:**

- ply is a CSS-only framework with zero JavaScript. It provides visual presentation and layout but does not manage DOM structure, ARIA attributes, or dynamic state.
- Application-level conformance (content structure, alternative text, ARIA for custom widgets, form labels, error identification, page titles, language declarations, etc.) is the responsibility of the application developer.
- ply provides the visual infrastructure to support accessible applications, but using ply does not automatically make an application conformant.
- Color contrast ratios cited below are based on the framework's default theme tokens. Custom themes created by overriding `--ply-*` variables may alter contrast ratios.

---

## Conformance Level Definitions

| Term | Definition |
|------|-----------|
| **Supports** | The functionality of the product has at least one method that meets the criterion without known defects or meets with equivalent facilitation. |
| **Partially Supports** | Some functionality of the product does not meet the criterion. |
| **Does Not Support** | The majority of product functionality does not meet the criterion. |
| **Not Applicable** | The criterion is not relevant to the product. |

---

## Table 1: WCAG 2.1 Level A

| Criteria | Conformance Level | Remarks and Explanations |
|----------|-------------------|--------------------------|
| **1.1.1 Non-text Content** | Not Applicable | ply does not generate non-text content. Alternative text for images, icons, and media is an application-level concern. ply provides `.sr-only` to help authors supply screen-reader-only text. |
| **1.2.1 Audio-only and Video-only (Prerecorded)** | Not Applicable | ply does not include audio or video content. |
| **1.2.2 Captions (Prerecorded)** | Not Applicable | ply does not include multimedia content. |
| **1.2.3 Audio Description or Media Alternative (Prerecorded)** | Not Applicable | ply does not include multimedia content. |
| **1.3.1 Info and Relationships** | Supports | ply auto-styles semantic HTML elements (`<nav>`, `<table>`, `<details>`, `<summary>`, `<dialog>`, `<blockquote>`, `<code>`, `<kbd>`, `<mark>`, `<fieldset>`, `<legend>`, `<progress>`, `<meter>`, headings `<h1>`-`<h6>`) so that visual presentation follows semantic structure. Using native HTML elements with ply preserves programmatic relationships without requiring extra attributes. |
| **1.3.2 Meaningful Sequence** | Supports | ply's layout system (`units-row`, `units-container`) uses CSS flexbox for visual arrangement without altering DOM order. Reading order follows source order. |
| **1.3.3 Sensory Characteristics** | Supports | ply does not rely solely on shape, color, size, or visual location to convey information. Framework components use multiple cues (borders, backgrounds, text weight, icons) for differentiation. Color-coded components (alerts, buttons) include text labels as the primary identifier. |
| **1.4.1 Use of Color** | Partially Supports | ply button variants (`.btn-blue`, `.btn-red`, `.btn-green`, `.btn-yellow`) and alert variants use color for visual distinction. The framework relies on application developers to provide text labels that convey meaning independently of color. The framework does not use color as the sole indicator for any framework-level functionality. |
| **1.4.2 Audio Control** | Not Applicable | ply does not produce audio. |
| **2.1.1 Keyboard** | Supports | ply provides `:focus-visible` outlines (2px solid, offset 2px) on all interactive elements: links (`a`), buttons (`button`, `.btn` variants), form inputs, navigation items, dropdown items, `<summary>` disclosure elements, accordion titles, and any element with `[tabindex]`. The `.skip-link` class enables keyboard bypass navigation. All framework interactions are CSS-based (`:hover`, `:focus`, `:focus-visible`) and do not require JavaScript or pointer-specific input. |
| **2.1.2 No Keyboard Trap** | Supports | ply is CSS-only and does not create focus traps. Native `<dialog>` focus trapping is handled by the browser's built-in behavior per the HTML spec. |
| **2.1.4 Character Key Shortcuts** | Not Applicable | ply does not define any keyboard shortcuts. |
| **2.2.1 Timing Adjustable** | Not Applicable | ply does not impose time limits. |
| **2.2.2 Pause, Stop, Hide** | Supports | ply respects `prefers-reduced-motion: reduce` by setting `animation-duration: 0.01ms`, `animation-iteration-count: 1`, and `transition-duration: 0.01ms` on all elements via a universal selector. The framework's default animations are limited to subtle transitions (button hover scale, color transitions) and are not auto-playing or continuous. |
| **2.3.1 Three Flashes or Below Threshold** | Supports | ply does not include any flashing or strobing content. Transitions are limited to subtle hover effects (color, scale). |
| **2.4.1 Bypass Blocks** | Supports | ply provides `.skip-link` — a class that positions a link off-screen and reveals it on focus, enabling keyboard users to bypass navigation. The framework also styles `<nav>` semantically, supporting landmark-based navigation. |
| **2.4.2 Page Titled** | Not Applicable | Page titles are an application-level concern. ply does not generate or modify `<title>` elements. |
| **2.4.3 Focus Order** | Supports | ply does not manipulate `tabindex` or alter focus order. Focus follows DOM source order. Layout classes use flexbox without `order` properties that would create a discrepancy between visual and focus order. |
| **2.4.4 Link Purpose (In Context)** | Not Applicable | Link text content is an application-level concern. ply styles links visually (color, hover state) but does not generate link text. |
| **2.5.1 Pointer Gestures** | Not Applicable | ply does not require multipoint or path-based gestures. |
| **2.5.2 Pointer Cancellation** | Not Applicable | ply is CSS-only and does not bind pointer events via JavaScript. |
| **2.5.3 Label in Name** | Not Applicable | Visible labels and accessible names are application-level concerns. |
| **2.5.4 Motion Actuation** | Not Applicable | ply does not use device motion for any functionality. |
| **3.1.1 Language of Page** | Not Applicable | The `lang` attribute on `<html>` is an application-level concern. |
| **3.2.1 On Focus** | Supports | ply does not initiate context changes on focus. Focus styles are limited to visual outline indicators. |
| **3.2.2 On Input** | Not Applicable | ply is CSS-only and does not perform actions on input. Form submission behavior is an application-level concern. |
| **3.3.1 Error Identification** | Not Applicable | Error identification requires JavaScript and is an application-level concern. ply provides visual styling for alerts and form states that can be used to present errors accessibly. |
| **3.3.2 Labels or Instructions** | Not Applicable | Form labels and instructions are application-level content concerns. ply's `.form` wrapper styles `<label>` elements but does not generate them. |
| **4.1.1 Parsing** | Not Applicable | Deprecated in WCAG 2.2. ply generates valid CSS. HTML parsing validity is an application-level concern. |
| **4.1.2 Name, Role, Value** | Partially Supports | ply encourages semantic HTML which provides native name, role, and value to assistive technology. However, custom widget ARIA attributes (e.g., `aria-expanded` on dropdowns, `aria-label` on icon buttons) are application-level concerns that ply cannot enforce via CSS alone. |

---

## Table 2: WCAG 2.1 Level AA

| Criteria | Conformance Level | Remarks and Explanations |
|----------|-------------------|--------------------------|
| **1.3.4 Orientation** | Supports | ply does not restrict display to a single orientation. Responsive breakpoints adapt layout to both portrait and landscape viewports. |
| **1.3.5 Identify Input Purpose** | Not Applicable | Input `autocomplete` attributes are an application-level concern. ply styles inputs visually but does not generate or require specific `autocomplete` values. |
| **1.4.3 Contrast (Minimum)** | Supports | ply's default light theme uses `#161616` text on `#ffffff` background (~15.4:1). Dark theme uses `#f4f4f4` text on `#161616` (~13.9:1). Secondary text: `#525252` on white (~7.5:1 light), `#c6c6c6` on `#161616` (~9.6:1 dark). Muted/tertiary text (supplementary content only): `#767676` on white (~4.5:1 light), `#8d8d8d` on `#161616` (~4.3:1 dark). Link colors: `#0353e9` on white (~4.6:1 light), `#4589ff` on `#161616` (~5.3:1 dark). Ghost button and link colors share the same token in dark mode (`--ply-btn-ghost-color: #4589ff`), ensuring visual consistency and AA compliance. Default buttons use `--ply-btn-default-color` token to maintain 4.5:1+ contrast in both modes. The `prefers-contrast: more` media query further increases contrast by switching to pure black/white text and borders. |
| **1.4.4 Resize Text** | Supports | ply uses relative units (`em`, `rem`) for font sizes and spacing. Typography scales responsively across three breakpoints (small, medium, large). Layout containers use percentage-based widths. Text can be resized up to 200% without loss of content or functionality. |
| **1.4.5 Images of Text** | Not Applicable | ply does not use images of text. All text is rendered as styled HTML text. |
| **1.4.10 Reflow** | Supports | ply's responsive grid system (`units-row` with `tablet-unit-*` and `phone-unit-*` classes) reflows content to a single column at narrow viewports. The `units-container` class uses `max-width` with percentage fallbacks. Content reflows without requiring horizontal scrolling at 320px CSS width. |
| **1.4.11 Non-text Contrast** | Supports | ply's interactive component boundaries meet the 3:1 contrast requirement. Form input borders use `--ply-color-input-border` (`#8d8d8d` on white ~3.5:1, `#6f6f6f` on `#262626` ~3.1:1). Focus indicators use a 2px solid outline in `--ply-color-focus` (`#0f62fe` on white ~4.6:1, `#0f62fe` on `#161616` ~5.5:1). Button backgrounds exceed 3:1 in both modes. Modal close buttons use `--ply-color-secondary` for theme-aware contrast. The `prefers-contrast: more` query enhances all borders to pure black or white. |
| **1.4.12 Text Spacing** | Supports | ply does not set `!important` on `line-height`, `letter-spacing`, `word-spacing`, or paragraph spacing. Users and authors can override these properties. The framework's typography uses `line-height: 1.65` (base) which already exceeds the 1.5x criterion, and paragraph `margin-bottom` provides spacing between blocks. |
| **1.4.13 Content on Hover or Focus** | Supports | ply's hover/focus interactions are limited to visual style changes (color shifts, subtle scale transforms on buttons). The framework does not display additional content on hover or focus that would obscure other content. Dropdown menus are CSS-based and can be dismissed by moving focus. |
| **2.4.5 Multiple Ways** | Not Applicable | Providing multiple navigation mechanisms (search, site map, etc.) is an application-level concern. ply provides styling for `<nav>` elements and navigation components. |
| **2.4.6 Headings and Labels** | Supports | ply styles heading elements (`<h1>`-`<h6>`) with distinct sizes, weights, and line heights that create a clear visual hierarchy. The framework encourages semantic HTML heading structure through auto-styling. Heading content and descriptive labels are application-level concerns. |
| **2.4.7 Focus Visible** | Supports | ply provides `:focus-visible` outlines on all interactive elements. The reset layer applies `outline: 2px solid var(--ply-color-focus, #0f62fe); outline-offset: 2px` to `a:focus-visible`, `button:focus-visible`, `summary:focus-visible`, and `[tabindex]:focus-visible`. Component-specific focus styles are defined for buttons (`.btn`, `.btn-outline`, `.btn-ghost`), navigation links, dropdown items, form inputs, modal close buttons, accordion titles, and notification dismiss buttons. The global `button:active` rule suppresses outlines only during the active (click) state, not during keyboard focus. |
| **3.1.2 Language of Parts** | Not Applicable | The `lang` attribute on elements with different languages is an application-level concern. |
| **3.2.3 Consistent Navigation** | Supports | ply's navigation components (`.navbar`, `.nav-list`, `.pagination`, `.breadcrumb`, `.tabs`) provide consistent visual presentation. Repeated navigation patterns render identically across pages when the same classes are applied. Consistent ordering of navigation items is an application-level concern. |
| **3.2.4 Consistent Identification** | Supports | ply uses consistent class names and visual styling for components with the same function. Buttons (`.btn`), alerts (`.alert`), and form controls render identically wherever used. Visual consistency is enforced at the framework level through CSS custom properties. |
| **3.3.3 Error Suggestion** | Not Applicable | Error suggestions require JavaScript logic and are an application-level concern. |
| **3.3.4 Error Prevention (Legal, Financial, Data)** | Not Applicable | Error prevention for submissions is an application-level concern. |
| **4.1.3 Status Messages** | Not Applicable | Status messages and `role="status"` / `aria-live` regions require JavaScript and ARIA attributes, which are application-level concerns. ply provides visual styling for alerts and notifications that can be used in conjunction with appropriate ARIA roles. |

---

## Accessibility Features Summary

The following accessibility features are built into the ply CSS framework at the source level, verified by review of the SCSS source files:

### Focus Management
- `:focus-visible` outlines on all interactive elements via `_reset.scss` (links, buttons, `<summary>`, `[tabindex]`)
- Component-specific focus styles in `_buttons.scss`, `_navigation.scss`, `_forms.scss`, `_dropdown.scss`, `_notifications.scss`, `_modal.scss`, `_accordion.scss`
- Consistent focus indicator: `2px solid var(--ply-color-focus, #0f62fe)` with `outline-offset: 2px`
- `button:active` suppresses outlines only during click, preserving `:focus-visible` for keyboard users

### Color and Contrast
- Light theme: `#161616` on `#ffffff` (~15.4:1 contrast ratio)
- Dark theme: `#f4f4f4` on `#161616` (~13.9:1 contrast ratio)
- Secondary text: `#525252` light (~7.5:1), `#c6c6c6` dark (~9.6:1)
- Muted/tertiary text (supplementary content only): `#767676` light (~4.5:1), `#8d8d8d` dark (~4.3:1)
- Link colors: `#0353e9` light (~4.6:1 on white), `#4589ff` dark (~5.3:1 on `#161616`)
- Ghost button and link colors share `#4589ff` in dark mode via `--ply-btn-ghost-color`, ensuring visual consistency
- Default button text uses `--ply-btn-default-color` token — white text on dark bg in light mode, `#fff` on dark bg in dark mode, both exceeding 4.5:1
- `prefers-color-scheme: dark` automatic dark mode with WCAG AA contrast
- `prefers-contrast: more` support — enhances text to pure black/white and borders to maximum contrast
- `prefers-contrast: more` + dark mode combination handled separately
- 120+ CSS custom properties for theming, all respecting light/dark modes
- Brand color tokens annotated as "WCAG AA" in source

### Motion and Animation
- `prefers-reduced-motion: reduce` — disables all animations and transitions via universal selector in `_reset.scss`
- Default animations limited to subtle hover transitions (no auto-playing, looping, or flashing content)

### Screen Reader Support
- `.sr-only` class — visually hidden content accessible to assistive technology (clip method)
- `.skip-link` class — visible on focus for keyboard bypass navigation

### Semantic HTML Auto-styling
- `<nav>`, `<table>`, `<details>`, `<summary>`, `<dialog>`, `<blockquote>`, `<code>`, `<pre>`, `<kbd>`, `<mark>`, `<progress>`, `<meter>`, `<fieldset>`, `<legend>`, `<figcaption>`, `<abbr>`, headings `<h1>`-`<h6>`
- Native element styling preserves programmatic semantics without requiring wrapper divs or ARIA overrides

### Typography
- Relative units (`em`, `rem`) throughout — supports browser text zoom
- Responsive font scaling across three breakpoints
- Typography tokens (`--ply-font-body`, `--ply-font-heading`, `--ply-font-mono`) for consistent font stacks
- Base `line-height: 1.65` exceeds WCAG 1.5x recommendation

### Layout
- Flexbox-based grid does not reorder DOM (no `order` property usage that breaks focus/reading order)
- Responsive breakpoints reflow to single column at narrow viewports
- `max-width: 100%` on images, video, and embedded content for responsive media

### Legacy Components
- `.modal` and `.accordion-title` are legacy components that now include `:focus-visible` outlines and theme-aware colors. Applications using these components should still provide ARIA attributes (`aria-expanded`, `aria-controls`, `role`) as these cannot be enforced via CSS.

---

## Notes for Application Developers

To build a WCAG 2.1 AA conformant application with ply, developers should:

1. **Use semantic HTML** — ply auto-styles native elements; avoid `<div>` soup
2. **Add a skip link** — Place `<a class="skip-link" href="#main">Skip to content</a>` as the first focusable element in `<body>`
3. **Set the page language** — Add `lang` attribute to `<html>`
4. **Provide alt text** — All `<img>` elements need `alt` attributes; use `alt=""` only for purely decorative images
5. **Label form controls** — Associate `<label>` elements with inputs using `for`/`id`
6. **Add ARIA where needed** — Custom widgets (dropdowns, modals, tabs) need appropriate ARIA roles and states; use `aria-current="page"` on active navigation links
7. **Test custom themes** — When overriding `--ply-*` variables, verify contrast ratios meet WCAG AA (4.5:1 for normal text, 3:1 for large text and UI components)
8. **Use `.sr-only`** — Provide screen-reader-only text for icon-only buttons and visual-only indicators
9. **Identify errors** — Use JavaScript and ARIA to programmatically identify and describe form errors
10. **Maintain heading hierarchy** — Use `<h1>`-`<h6>` in logical order; use `.h1`-`.h6` classes on non-heading elements when visual heading style is needed without semantic heading level
11. **Label dialogs** — Add `aria-labelledby` to `<dialog>` elements pointing to the dialog's heading; restore focus to the trigger element on close
12. **Hide decorative icons** — Add `aria-hidden="true"` to icons that are purely decorative and convey no unique information
