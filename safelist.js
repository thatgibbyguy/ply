/**
 * ply safelist — classes and patterns that should never be purged.
 *
 * These are either toggled dynamically via JavaScript (e.g. `active`, `on`)
 * or generated via SCSS loops (responsive variants) where static analysis
 * of content files might miss them.
 */

"use strict";

const safelistClasses = [
  // Dynamic state classes (toggled via JS)
  "active",
  "on",
  "open",
  "accordion-title-opened",
  "accordion-toggle-opened",
  "accordion-toggle-closed",
  "sort-asc",
  "sort-desc",
  "btn-active",
  "btn-disabled",
  "input-error",
  "input-success",
  "input-gray",
];

const safelistPatterns = [
  // Responsive grid units: tablet-unit-50, phone-unit-100, etc.
  /^(tablet|phone|large-phone|small-desktop|large-screen|x-large-screen|forever)-unit-(100|90|88|80|75|70|66|65|62|60|50|40|38|35|33|30|25|20|12|10|auto)$/,
  // Container query units
  /^container-(phone|large-phone|tablet|small-desktop)-unit-(100|90|88|80|75|70|66|65|62|60|50|40|38|35|33|30|25|20|12|10|auto)$/,
  // Responsive width helpers
  /^(tablet|phone|large-phone|small-desktop)-width-(100|90|80|75|70|66|50|40|33|25|20|10)$/,
  // Responsive block helpers
  /^blocks-mobile-(50|33)$/,
  // Dialog layers
  /^dialog-layer-[1-3]$/,
  // Step form states
  /^step-panel$/,
];

module.exports = { safelistClasses, safelistPatterns };
