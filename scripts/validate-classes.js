#!/usr/bin/env node
"use strict";

/**
 * validate-classes.js — Check HTML files for unknown ply classes.
 *
 * Usage:
 *   node scripts/validate-classes.js [--strict] [files...]
 *
 * Defaults to snippets/*.html and examples/*.html when no files are given.
 *
 * --strict   Flag every unknown class. Without this flag, only classes that
 *            look like they intended to be ply classes are reported (i.e.
 *            classes defined in an inline <style> block are ignored).
 *
 * Exit codes:
 *   0  No unknown classes found
 *   1  One or more unknown classes found
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

// ---------------------------------------------------------------------------
// 1. Load the known class set from ply-classes.json
// ---------------------------------------------------------------------------

const json = JSON.parse(
  fs.readFileSync(path.join(ROOT, "ply-classes.json"), "utf8")
);

const knownClasses = new Set(Object.keys(json.classes));

// Also add "on" as an alias for "active" (documented in CLAUDE.md)
knownClasses.add("on");

// ---------------------------------------------------------------------------
// 2. Build pattern prefixes for responsive / dynamic classes
// ---------------------------------------------------------------------------

// These prefixes accept a numeric or keyword suffix (e.g. unit-50, phone-unit-100)
const UNIT_PREFIXES = [
  "unit-",
  "tablet-unit-",
  "phone-unit-",
  "large-phone-unit-",
  "small-desktop-unit-",
  "large-screen-unit-",
  "x-large-screen-unit-",
  "forever-unit-",
];

// Valid unit suffixes (numbers that ply actually generates, plus "auto")
const UNIT_SUFFIXES = new Set([
  "100", "90", "88", "80", "75", "70", "66", "65", "62",
  "60", "50", "40", "38", "35", "33", "30", "25", "20", "12", "10", "auto",
]);

/**
 * Check whether a class name matches a known ply pattern.
 */
function matchesPattern(cls) {
  // Responsive unit classes: <prefix><suffix>
  for (const prefix of UNIT_PREFIXES) {
    if (cls.startsWith(prefix)) {
      const suffix = cls.slice(prefix.length);
      if (UNIT_SUFFIXES.has(suffix)) return true;
    }
  }

  // BEM-style double-dash aliases (e.g. navbar--centered -> navbar-centered)
  if (cls.includes("--")) {
    const singleDash = cls.replace(/--/g, "-");
    if (knownClasses.has(singleDash)) return true;
  }

  return false;
}

// ---------------------------------------------------------------------------
// 3. Extract inline-defined classes from <style> blocks
// ---------------------------------------------------------------------------

/**
 * Parse all <style>...</style> blocks in the HTML and return a Set of class
 * names defined within them (simple regex — catches `.foo` selectors).
 */
function extractInlineClasses(html) {
  const inlineClasses = new Set();
  const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let styleMatch;

  while ((styleMatch = styleRegex.exec(html)) !== null) {
    const css = styleMatch[1];
    // Match class selectors: .class-name
    const classRegex = /\.([a-zA-Z_-][a-zA-Z0-9_-]*)/g;
    let clsMatch;
    while ((clsMatch = classRegex.exec(css)) !== null) {
      inlineClasses.add(clsMatch[1]);
    }
  }

  return inlineClasses;
}

// ---------------------------------------------------------------------------
// 4. Resolve file list
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
const strict = args.includes("--strict");
const fileArgs = args.filter((a) => a !== "--strict");

let files;

if (fileArgs.length > 0) {
  files = fileArgs.filter((f) => fs.existsSync(f));
} else {
  // Default: snippets/*.html + examples/*.html
  files = [];
  for (const dir of ["snippets", "examples"]) {
    const abs = path.join(ROOT, dir);
    if (fs.existsSync(abs)) {
      fs.readdirSync(abs)
        .filter((f) => f.endsWith(".html"))
        .forEach((f) => files.push(path.join(abs, f)));
    }
  }
}

if (files.length === 0) {
  console.log("No HTML files to validate.");
  process.exit(0);
}

// ---------------------------------------------------------------------------
// 5. Strip <script> blocks so JS string-built class attrs aren't scanned
// ---------------------------------------------------------------------------

/**
 * Replace <script>...</script> content with blank lines (to preserve line
 * numbers) so that class="..." inside JavaScript template strings are not
 * incorrectly parsed.
 */
function stripScripts(html) {
  return html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, (match) => {
    // Preserve the same number of newlines so line numbers stay accurate
    return match.replace(/[^\n]/g, "");
  });
}

// ---------------------------------------------------------------------------
// 6. Scan files and report unknown classes
// ---------------------------------------------------------------------------

let totalUnknown = 0;

for (const file of files) {
  const rawHtml = fs.readFileSync(file, "utf8");
  const html = stripScripts(rawHtml);
  const lines = html.split("\n");
  const inlineClasses = extractInlineClasses(rawHtml);

  const classAttrRegex = /\bclass\s*=\s*"([^"]*)"/g;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let match;

    // Reset regex state for each line
    classAttrRegex.lastIndex = 0;

    while ((match = classAttrRegex.exec(line)) !== null) {
      const classValue = match[1];
      const classList = classValue.split(/\s+/).filter(Boolean);

      for (const cls of classList) {
        if (knownClasses.has(cls)) continue;
        if (matchesPattern(cls)) continue;
        if (!strict && inlineClasses.has(cls)) continue;

        totalUnknown++;
        const relPath = path.relative(ROOT, file);
        console.log(`${relPath}:${i + 1}  unknown class "${cls}"`);
      }
    }
  }
}

// ---------------------------------------------------------------------------
// 7. Summary
// ---------------------------------------------------------------------------

if (totalUnknown > 0) {
  console.log(`\n${totalUnknown} unknown class${totalUnknown === 1 ? "" : "es"} found.`);
  process.exit(1);
} else {
  console.log(`Checked ${files.length} file${files.length === 1 ? "" : "s"} — all classes valid.`);
  process.exit(0);
}
