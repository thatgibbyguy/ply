/**
 * ply PostCSS purge plugin — tree-shake unused ply CSS.
 *
 * Unlike PurgeCSS (which strips everything then safelists back), this plugin
 * flips the logic: it only removes rules where EVERY class in the selector is
 * absent from your content files. Everything else stays by default:
 *
 * - Element resets (body, h1, table, code, etc.) — no class to purge
 * - :root / custom property blocks — always kept
 * - @keyframes, @font-face, @media print — always kept
 * - Attribute selectors ([class*="unit-"]) — always kept
 * - Children of used classes — if `.form` is in content, `.form input` stays
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
 */

"use strict";

const fs = require("fs");
const path = require("path");
const { globSync } = require("glob");
const { safelistClasses } = require("./safelist");

/**
 * Add all whitespace-delimited tokens from a string as class names.
 */
function addTokens(str, classes) {
  const tokens = str.trim().split(/\s+/);
  for (const t of tokens) {
    if (t && /^[a-zA-Z_-][a-zA-Z0-9_-]*$/.test(t)) {
      classes.add(t);
    }
  }
}

/**
 * Extract class names from content files.
 *
 * Targets actual class usage rather than every word in the file:
 * 1. HTML class="..." and className="..." attributes
 * 2. JSX className={`...`} template literals (static parts)
 * 3. Class utility calls: clsx(...), classNames(...), cn(...), cva(...)
 * 4. Strings inside those calls
 *
 * This avoids false positives from HTML text content, element names,
 * and attribute values that happen to collide with CSS class names.
 */
function extractClassesFromContent(contentGlobs) {
  const classes = new Set();

  for (const pattern of contentGlobs) {
    const files = globSync(pattern, { nodir: true });
    for (const file of files) {
      const text = fs.readFileSync(file, "utf8");

      // 1. HTML: class="foo bar baz" or className="foo bar"
      const classAttrRe = /\bclass(?:Name)?\s*=\s*"([^"]*)"/g;
      let m;
      while ((m = classAttrRe.exec(text)) !== null) {
        addTokens(m[1], classes);
      }

      // 2. HTML: class='foo bar' (single quotes)
      const classAttrSingleRe = /\bclass(?:Name)?\s*=\s*'([^']*)'/g;
      while ((m = classAttrSingleRe.exec(text)) !== null) {
        addTokens(m[1], classes);
      }

      // 3. JSX: className={`static ${dynamic}`} — extract static parts
      const classTemplatRe = /\bclassName\s*=\s*\{`([^`]*)`\}/g;
      while ((m = classTemplatRe.exec(text)) !== null) {
        // Remove ${...} expressions, keep static text
        const staticParts = m[1].replace(/\$\{[^}]*\}/g, " ");
        addTokens(staticParts, classes);
      }

      // 4. Class utility calls: clsx("foo", "bar"), cn("foo bar"), etc.
      const utilRe = /\b(?:clsx|classNames|cn|cva)\s*\(/g;
      while ((m = utilRe.exec(text)) !== null) {
        // Extract string literals from the call arguments
        const start = m.index + m[0].length;
        let depth = 1;
        let i = start;
        while (i < text.length && depth > 0) {
          if (text[i] === "(") depth++;
          else if (text[i] === ")") depth--;
          i++;
        }
        const callBody = text.slice(start, i - 1);
        // Pull out all string literals (single, double, backtick)
        const strRe = /["'`]([^"'`]*)["'`]/g;
        let sm;
        while ((sm = strRe.exec(callBody)) !== null) {
          addTokens(sm[1], classes);
        }
      }

      // 5. Svelte/Vue: class:foo={condition} or :class="{ foo: true }"
      const classDirectiveRe = /\bclass:([a-zA-Z_-][a-zA-Z0-9_-]*)/g;
      while ((m = classDirectiveRe.exec(text)) !== null) {
        classes.add(m[1]);
      }
    }
  }

  return classes;
}

/**
 * Extract class names from a CSS selector string.
 * Returns an array of class names (without the leading dot).
 * Returns an empty array if the selector has no classes.
 */
function extractClassesFromSelector(selector) {
  const classes = [];
  // Match .class-name but not inside attribute selectors [class*="..."]
  // First, strip attribute selectors so we don't pick up class names from them
  const withoutAttrs = selector.replace(/\[[^\]]*\]/g, "");
  const matches = withoutAttrs.match(/\.([a-zA-Z_-][a-zA-Z0-9_-]*)/g);
  if (matches) {
    for (const m of matches) {
      classes.push(m.slice(1)); // remove leading dot
    }
  }
  return classes;
}

/**
 * Check if a rule should be kept.
 *
 * A rule is removed ONLY when:
 * - Its selector contains at least one class
 * - NONE of those classes appear in the content or safelist
 *
 * Everything else stays: element selectors, :root, attribute selectors,
 * pseudo-elements, and rules where at least one class is in use.
 */
function shouldKeepRule(selector, usedClasses) {
  // Comma-separated selectors: keep if ANY individual selector passes
  const parts = selector.split(",").map((s) => s.trim());

  for (const part of parts) {
    const classes = extractClassesFromSelector(part);

    // No classes in this selector part → element/attribute/pseudo rule → keep
    if (classes.length === 0) {
      return true;
    }

    // If ANY class in this selector part is used → keep
    if (classes.some((c) => usedClasses.has(c))) {
      return true;
    }
  }

  // All selector parts have classes, and none are used → remove
  return false;
}

/**
 * PostCSS plugin creator.
 */
function plyPurge(options = {}) {
  const { content, safelist = [] } = options;

  if (!content || content.length === 0) {
    throw new Error(
      "ply purge: `content` is required. Pass an array of glob patterns " +
        "pointing to your template/component files.\n" +
        "Example: plyPurge({ content: ['./src/**/*.{html,jsx,tsx,vue}'] })"
    );
  }

  return {
    postcssPlugin: "ply-purge",
    Once(root) {
      // Build the set of used classes from content files + safelist
      const usedClasses = extractClassesFromContent(content);
      for (const cls of safelistClasses) {
        usedClasses.add(cls);
      }
      for (const cls of safelist) {
        usedClasses.add(cls);
      }

      // Collect rules to remove (don't mutate during walk)
      const toRemove = [];

      root.walkRules((rule) => {
        // Skip rules inside @keyframes or @font-face
        let parent = rule.parent;
        while (parent && parent.type !== "root") {
          if (
            parent.type === "atrule" &&
            (parent.name === "keyframes" || parent.name === "font-face")
          ) {
            return; // inside @keyframes/@font-face — always keep
          }
          parent = parent.parent;
        }

        if (!shouldKeepRule(rule.selector, usedClasses)) {
          toRemove.push(rule);
        }
      });

      for (const rule of toRemove) {
        rule.remove();
      }

      // Clean up empty at-rules (e.g. @media blocks where all rules removed)
      let cleaned = true;
      while (cleaned) {
        cleaned = false;
        root.walkAtRules((atRule) => {
          if (
            atRule.nodes &&
            atRule.nodes.length === 0 &&
            atRule.name !== "keyframes" &&
            atRule.name !== "font-face"
          ) {
            atRule.remove();
            cleaned = true;
          }
        });
      }
    },
  };
}

plyPurge.postcss = true;

module.exports = plyPurge;
