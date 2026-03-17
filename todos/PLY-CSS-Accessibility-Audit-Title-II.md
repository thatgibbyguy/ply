# Accessibility Compliance Audit
## plycss.com
### WCAG 2.1 Level AA | ADA Title II (28 CFR Part 35)

**Audit Date:** March 16, 2026

---

## Executive Summary

This audit evaluates plycss.com (the marketing site for the PLY CSS framework) and the PLY framework itself against WCAG 2.1 Level AA success criteria, as required by the DOJ's April 2024 final rule on ADA Title II web accessibility (28 CFR Part 35). The rule mandates that state and local government web content conform to WCAG 2.1 AA, with compliance deadlines of April 2026 (large entities) and April 2027 (smaller entities).

The PLY framework demonstrates strong accessibility foundations: semantic HTML defaults, focus-visible outlines, prefers-reduced-motion support, dark mode, and WCAG AA contrast ratios built into the CSS. However, the plycss.com marketing site itself has several issues that would need remediation before it could be cited as evidence of compliance in a government procurement context. The issues are all straightforward to fix.

---

## Scope & Methodology

**Scope:** The homepage of plycss.com, documentation pages (/docs/*), and the framework's CSS source and README. Both dark mode and light mode were tested.

**Tools:** Automated accessibility tree inspection (Chrome DevTools Protocol), programmatic contrast ratio calculation (WCAG relative luminance algorithm), DOM structure analysis, ARIA attribute auditing, and CSS stylesheet rule inspection.

**Standard:** WCAG 2.1 Level AA, as specified in 28 CFR § 35.200(b)(2). Findings are mapped to specific WCAG success criteria.

---

## Findings: Issues Requiring Remediation

The following issues were identified during testing. Severity ratings reflect the impact on users with disabilities in the context of a Title II government deployment.

### 🔴 Critical

**1. No Skip Navigation Link**
- **WCAG:** 2.4.1 (Bypass Blocks), 2.1.1 (Keyboard)
- **Finding:** No skip navigation link exists anywhere on the site. Keyboard-only users must tab through all nav items, two search fields, and a theme toggle on every page load before reaching main content.
- **Recommendation:** Add a visually-hidden skip link as the first focusable element: `<a href="#main" class="sr-only">Skip to main content</a>`. The framework's own `sr-only` class can be used.

**2. Unlabeled Search Inputs**
- **WCAG:** 1.3.1 (Info & Relationships), 4.1.2 (Name, Role, Value)
- **Finding:** Two search text inputs rely solely on placeholder text ("Search classes, properties, elements...") with no `<label>`, `aria-label`, or `aria-labelledby`. Placeholders are not accessible names per WCAG. Screen readers may announce these as unlabeled text fields.
- **Recommendation:** Add `aria-label="Search documentation"` to each input, or associate a visually-hidden `<label>`. Also wrap inputs in a `<form role="search">` for proper search landmark semantics.

**3. Pinch-to-Zoom Disabled**
- **WCAG:** 1.4.4 (Resize Text), 1.4.10 (Reflow)
- **Finding:** The viewport meta tag includes `maximum-scale=1`, which prevents pinch-to-zoom on mobile devices. This directly violates SC 1.4.4 and is flagged as a failure by every major audit tool. Under Title II, this affects users with low vision who rely on zoom.
- **Recommendation:** Remove `maximum-scale=1` from the viewport meta tag, or set it to at least 5.0. The viewport should read: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.

### 🟠 Major

**4. Dark-Mode Contrast Failures**
- **WCAG:** 1.4.3 (Contrast Minimum)
- **Finding:** In dark mode, the GitHub button (hero section) has a contrast ratio of 3.60:1 (dark text `rgb(22,22,22)` on gray background `rgb(111,111,111)`). The AA minimum for normal text is 4.5:1. Two icon badge elements also fail at 3.35:1 (white on blue `rgb(69,137,255)`).
- **Recommendation:** Lighten the GitHub button background or use white text on a darker background. For the blue badges, darken the blue to at least `rgb(40, 100, 220)` or use a darker text color.

### 🟡 Moderate

**5. Missing Search Landmark**
- **WCAG:** 4.1.2 (Name, Role, Value), 1.3.1 (Info & Relationships)
- **Finding:** The search inputs are not wrapped in `<form>` or `<form role="search">`. There is no search landmark on the page. ARIA usage is minimal overall (only 6 ARIA attributes on the entire page). The search button and toggle button lack `aria-controls` pointing to the elements they operate.
- **Recommendation:** Wrap each search input in `<form role="search">` to create a search landmark. Add `aria-controls` to the search buttons referencing the associated input. Add `aria-expanded` to the mobile menu toggle.

**6. Section Regions Lack Accessible Names**
- **WCAG:** 2.4.6 (Headings & Labels), 1.3.1
- **Finding:** Several section regions use generic `<div>` containers with decorative label text ("WCAG 2.1 AA", "AI native", "Compliance") that function as visual section labels but are not coded as headings or `aria-label` attributes on the regions. These `<section>` elements lack accessible names.
- **Recommendation:** Add `aria-labelledby` pointing to the section's heading, or add `aria-label` to each `<section>` element. Ensure decorative labels are either promoted to headings or connected via ARIA.

**7. Input Purpose Not Identified**
- **WCAG:** 1.3.5 (Identify Input Purpose)
- **Finding:** The search inputs lack `autocomplete` attributes. While search fields are not strictly required to have autocomplete, under Title II's strict interpretation, identifying input purpose helps users with cognitive disabilities who use autofill tools.
- **Recommendation:** Consider adding `autocomplete="off"` (if search results are dynamic) or a clear `aria-description` explaining the input's purpose.

### 🟢 Minor

**8. One SVG Exposed to Accessibility Tree**
- **WCAG:** 1.1.1 (Non-text Content)
- **Finding:** 24 of 25 SVG icons are correctly marked `aria-hidden="true"`. One SVG (inside a button) is exposed to the accessibility tree without a `<title>` or `aria-label`. The parent button has visible text so impact is low, but the SVG may contribute empty content to the accessible name.
- **Recommendation:** Add `aria-hidden="true"` to the remaining SVG, or add a `<title>` element if the icon conveys meaning independent of the button text.

**9. Missing Meta Description**
- **WCAG:** Best Practice (SEO/Discoverability)
- **Finding:** No `<meta name="description">` tag exists on the homepage. While not a WCAG criterion, search accessibility and discoverability matter for government procurement officers trying to evaluate the framework.
- **Recommendation:** Add a descriptive meta description summarizing the framework's accessibility-first value proposition.

---

## Findings: Areas of Compliance

| WCAG Criterion | Assessment | Status |
|---|---|---|
| 1.3.1 Info & Relationships | Proper landmark regions: `<header>`, `<nav>` (×2), `<main>`, `<footer>`. All present and correctly structured. | ✅ Pass |
| 1.3.2 Meaningful Sequence | DOM order matches visual presentation. Content flows logically top-to-bottom. | ✅ Pass |
| 2.4.2 Page Titled | Homepage title is "ply — CSS Framework Showcase" — descriptive and unique. | ✅ Pass |
| 2.4.3 Focus Order | No positive tabindex values found. Tab order follows DOM order naturally. | ✅ Pass |
| 2.4.6 Headings & Labels | Clean hierarchy: single H1, logical H1→H2→H3 nesting with no skipped levels. 18 total headings, all properly structured. | ✅ Pass |
| 2.4.4 Link Purpose | All links have visible text content. The logo home link has `aria-label="Home"`. No empty or ambiguous links. | ✅ Pass |
| 1.4.3 Contrast (Light Mode) | All sampled text elements in light mode pass AA contrast thresholds. No failures detected. | ✅ Pass |
| 1.4.5 Images of Text | No images of text found. All text is rendered as actual HTML text. | ✅ Pass |
| 4.1.1 Parsing | No duplicate IDs found on the page. | ✅ Pass |
| 2.3.1 Three Flashes | No flashing or blinking content observed on the page. | ✅ Pass |

---

## Framework-Level Assessment (for Government Adopters)

Beyond the marketing site, the PLY CSS framework itself makes several claims about built-in accessibility. Here is our assessment of those claims based on the CSS source, the README, and computed styles:

### Verified Claims

- **Focus management:** 54 CSS rules targeting `:focus` states, 18 using `:focus-visible`. This is strong coverage and aligns with WCAG 2.4.7 (Focus Visible).
- **Dark mode:** 3 `prefers-color-scheme` media queries plus `data-theme` attribute support. Automatic OS-level detection confirmed working.
- **Reduced motion:** `prefers-reduced-motion` media query present in stylesheets. Animations respect user preference.
- **Forced colors / high contrast:** 3 rules targeting `forced-colors` or `prefers-contrast`. This goes beyond baseline AA requirements.
- **Semantic HTML defaults:** The README confirms PLY auto-styles `<nav>`, `<table>`, `<code>`, `<blockquote>`, `<details>`, `<dialog>`. This encourages semantic markup from the start.
- **Screen reader utilities:** `sr-only` class documented for visually-hidden labels and skip links.
- **Zero JavaScript:** No JS runtime means no dynamic content that could create ARIA state management issues.

### Concerns for Government Procurement

- **No VPAT/ACR:** Government procurement typically requires a completed VPAT (Voluntary Product Accessibility Template) documenting conformance. PLY does not currently publish one.
- **AI instruction file:** The PLY.md AI instruction file and ply-classes.json are strong differentiators for AI-assisted development, but their accessibility guidance should be independently audited to ensure agents produce compliant output.
- **Marketing site contrast:** Contrast failures on the marketing site (dark mode) undermine the framework's core message of "accessible by default." The irony of a WCAG-focused framework having contrast failures on its own site would be noted in any procurement review.
- **Claim qualification:** The framework claims WCAG AA contrast "in both light and dark themes," but the marketing site demonstrates at least two dark-mode contrast failures. This claim needs to be qualified or the site needs to be fixed.

---

## Remediation Priority

Ordered by impact on Title II compliance:

| # | Priority | Action | Effort |
|---|---|---|---|
| 1 | 🔴 Critical | Remove `maximum-scale=1` from viewport meta tag | 5 minutes |
| 2 | 🔴 Critical | Add `aria-label` to both search inputs; wrap in `<form role="search">` | 30 minutes |
| 3 | 🔴 Critical | Add skip navigation link to all page templates | 15 minutes |
| 4 | 🟠 Major | Fix dark-mode contrast on GitHub button and icon badges | 1 hour |
| 5 | 🟡 Moderate | Add `aria-labelledby` or `aria-label` to all `<section>` elements | 1 hour |
| 6 | Recommended | Publish a VPAT/ACR to support government procurement | 1–2 weeks |

---

## Conclusion

PLY's core value proposition — accessibility baked into the CSS itself — is well-founded. The framework's approach of encoding WCAG compliance into default styles, focus management, and media query support is architecturally sound and genuinely reduces the barrier to building compliant interfaces.

However, the marketing site (plycss.com) currently has three critical WCAG 2.1 AA failures and a handful of moderate issues that would flag in a Title II compliance review. The contrast failures in dark mode are particularly notable given the framework's core value proposition of built-in WCAG compliance.

The good news is that all identified issues are straightforward to fix. Items 1–3 on the remediation list can be resolved in under an hour. Once the site issues are addressed and a VPAT is published, PLY would be well-positioned for Title II government procurement as a CSS framework that genuinely delivers on its accessibility promises.

---

*Disclaimer: This audit was conducted using automated tools and manual inspection of the accessibility tree, DOM structure, and computed styles. It does not constitute a full manual WCAG audit, which would additionally require testing with multiple screen readers (NVDA, JAWS, VoiceOver), manual keyboard navigation verification, and cognitive accessibility review. For Title II compliance certification, a comprehensive audit by a certified accessibility professional is recommended.*
