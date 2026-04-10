/**
 * ply PostCSS purge plugin — tree-shake unused ply CSS.
 *
 * Wraps @fullhuman/postcss-purgecss with ply-specific defaults:
 * - Safelists dynamically-toggled classes (active, sort-asc, etc.)
 * - Preserves responsive grid variants that static analysis may miss
 * - Keeps CSS custom properties (:root), element resets, and @media blocks
 *
 * Usage in postcss.config.js:
 *
 *   const plyPurge = require('ply-css/purge');
 *
 *   module.exports = {
 *     plugins: [
 *       plyPurge({ content: ['./src/**\/*.{html,jsx,tsx,vue}'] }),
 *     ],
 *   };
 *
 * Requires: npm install -D @fullhuman/postcss-purgecss
 */

"use strict";

const { safelistClasses, safelistPatterns } = require("./safelist");

function plyPurge(options = {}) {
  const { content, safelist = {}, ...rest } = options;

  if (!content || content.length === 0) {
    throw new Error(
      "ply purge: `content` is required. Pass an array of glob patterns " +
        "pointing to your template/component files.\n" +
        "Example: plyPurge({ content: ['./src/**/*.{html,jsx,tsx,vue}'] })"
    );
  }

  let purgecss;
  try {
    purgecss = require("@fullhuman/postcss-purgecss");
  } catch {
    throw new Error(
      "ply purge requires @fullhuman/postcss-purgecss.\n" +
        "Install it: npm install -D @fullhuman/postcss-purgecss"
    );
  }

  const userSafelist = Array.isArray(safelist)
    ? { standard: safelist }
    : safelist;

  return purgecss({
    content,
    safelist: {
      standard: [
        ...safelistClasses,
        ...(userSafelist.standard || []),
      ],
      greedy: [
        // Preserve all :root, html, body rules (custom properties, resets)
        /^:root$/,
        /^html$/,
        /^body$/,
        ...(userSafelist.greedy || []),
      ],
      deep: [...safelistPatterns, ...(userSafelist.deep || [])],
    },
    // ply uses single-dash BEM-ish names; default extractor works well
    // but we add a custom one to also catch class names in JSX/TSX
    defaultExtractor: (content) => {
      // Match class="...", className="...", className={`...`}, and
      // bare words that look like ply classes
      const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
      const innerMatches =
        content.match(/[^<>"'`\s.(){}[\]#,;]+/g) || [];
      return [...new Set([...broadMatches, ...innerMatches])];
    },
    ...rest,
  });
}

module.exports = plyPurge;
