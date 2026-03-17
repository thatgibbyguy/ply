# Plygrid: AI Builder Review

An honest review of building a full documentation site with plygrid, from the perspective of an AI agent.

## What Worked

### Small API Surface

414 classes, one context file. I didn't have to hold hundreds of utility combinations in memory. A card in Tailwind is `flex flex-col gap-4 p-6 rounded-lg border border-gray-200 shadow-sm bg-white`. In plygrid it's `border border-radius padding layer-1`. Fewer decisions, fewer things to get wrong, faster output.

### Semantic HTML Styling

This was the biggest win. Tables, forms, blockquotes, dialogs, details/summary, progress bars, code blocks — I wrote the HTML element and it looked right. No classes needed. For an AI generating markup, less styling logic means less chance of producing something broken.

### PLY.md — One File, Whole Framework

The entire framework documented in a single file that fits in a context window. Compare that to Tailwind where the full docs are enormous and I'd realistically only have a subset loaded at any time. With plygrid I had the whole picture, all the time.

### ply-classes.json — Machine-Readable Reference

A structured JSON index of every class, CSS variable, and auto-styled element. I used this directly to build a working search component. That's not something most frameworks provide, and it's exactly the kind of thing that makes a framework AI-friendly beyond marketing.

### Dark Mode Was Trivial

One attribute on `<html>`, everything adapts. No theme provider wrappers, no separate color tokens to manage, no build step. It just worked.

### Grid System Is Intuitive

`unit-50`, `unit-33`, `phone-unit-100` — I never had to look anything up. The naming maps directly to what it does. I built a full responsive three-column doc layout without checking docs once.

### Speed

I built 14 pages, a three-column doc layout, a navbar with dropdowns, a search dialog, a theme toggle, a responsive mobile menu, and a full landing page. Almost none of the time was spent fighting CSS. The framework got out of the way and let me build.

### Accessibility as the Default Path

This is plygrid's strongest differentiator and where it matters most for real-world impact. Because the framework styles semantic HTML elements directly, the accessible path is also the easiest path. I didn't have to think about ARIA roles, landmark regions, or focus management — I used `<nav>`, `<table>`, `<dialog>`, `<button>`, and they were both styled and accessible automatically.

For government agencies under ADA Title II deadlines (WCAG 2.1 AA by April 2026/2027), this matters more than any other feature. Most AI-generated web content is div soup with broken semantics. Plygrid makes it structurally difficult to produce inaccessible output — the framework rewards correct HTML with automatic styling, so the compliance-friendly approach is also the fastest approach.

Key accessibility features that come free:
- WCAG AA color contrast in both light and dark modes, enforced through the CSS variable system
- `prefers-reduced-motion` support — all animations disabled automatically
- `prefers-contrast: more` support — enhanced borders and distinctions
- `:focus-visible` on all interactive elements with no configuration
- `.skip-link` for keyboard bypass navigation
- `.sr-only` for screen reader content
- Zero JavaScript means zero dynamic ARIA state management failures
- 19KB bundle means fast load times on constrained government networks and older devices

## What I Wish Were Different

### Theming Dark Mode Architecture

Plygrid uses `@media (prefers-color-scheme: dark) { :root:not([data-theme=light]) }` for auto dark mode. This means any custom theme that isn't literally "light" gets dark styles applied over it. We spent more time debugging this specificity conflict than we spent building several entire pages. The fix is straightforward (use `:root:not([data-theme])` instead), and it would make custom themes work without workarounds.

### Typography Should Be Token-Based

Colors are cleanly themeable through 60+ CSS custom properties. Typography is hardcoded directly on elements. There's no `--ply-font-body`, `--ply-font-heading`, or `--ply-font-mono`. To change fonts in a custom theme, you write element-level overrides for every heading, code block, and body element. Adding three CSS variables would put typography on par with the color system.

### Inconsistent Class Naming

- `no-margin` vs `bottom-margin` — one removes, one adds, different naming patterns
- `bg-blue` vs `background-black` — inconsistent prefix
- `text-secondary` vs `text-muted` — aliases with no indication they're equivalent
- `padding` vs `padding-extra` — only two levels, no scale

These are small individually but add up. I occasionally guessed wrong on a class name and got silent failure.

### Coarse Spacing Scale

You get `padding` and `padding-extra`. `margin` and `margin-extra`. That's it — two levels. No `spacing-1` through `spacing-8` scale. For a documentation site this was fine. For anything with tighter layout requirements, you'd be writing custom CSS constantly.

### Silent Failure on Typos

If you write `btn-bluee` instead of `btn-blue`, nothing happens. No warning, no error, no visual indication. The class just doesn't exist and the element renders unstyled. Tailwind's tooling catches this immediately. With plygrid you stare at the screen wondering what went wrong.

### Limited Component Depth

Accordion, dropdown, modal, and tooltip classes exist for styling, but there's no interactivity. You get the CSS and write all the JavaScript yourself. That's a reasonable scope decision for a CSS framework, but it means plygrid components require more work than something like DaisyUI.

## Summary

For the core job — "take these components and make them look good, fast" — plygrid delivered. The small API surface, semantic HTML styling, and single-file documentation make it genuinely well-suited for AI-assisted development. It's not trying to be a design system or a Tailwind competitor, and it's better for knowing its lane.

The accessibility story is the real standout. For government agencies facing Title II compliance deadlines, the value proposition is clear: a framework where the default output is WCAG 2.1 AA compliant removes an entire category of compliance risk before a single audit happens. When AI tools are generating the markup, having the accessible path also be the path of least resistance isn't just a nice feature — it's the difference between passing and failing an audit.

The rough edges are real but fixable: the dark mode selector, typography tokens, and class naming consistency are all incremental improvements that wouldn't require breaking changes. The foundation is solid.
