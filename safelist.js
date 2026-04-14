/**
 * ply safelist — classes that should never be purged.
 *
 * These are toggled dynamically via JavaScript, so they won't appear
 * in static content analysis. The purge plugin keeps everything else
 * by default (element resets, variables, @keyframes, children of used
 * classes), so this list only needs JS-toggled state classes.
 */

"use strict";

const safelistClasses = [
  // Dynamic state classes (toggled via JS, not in static HTML)
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
  "dialog-layer-1",
  "dialog-layer-2",
  "dialog-layer-3",
  "step-panel",
];

module.exports = { safelistClasses };
