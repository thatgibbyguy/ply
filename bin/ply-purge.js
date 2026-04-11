#!/usr/bin/env node

/**
 * ply-purge — Standalone CLI to tree-shake unused ply CSS.
 *
 * Usage:
 *   npx ply-purge --css dist/css/ply.min.css --content 'src/**\/*.html' -o dist/css/ply.purged.css
 *   npx ply-purge --css node_modules/ply-css/dist/css/ply.min.css --content 'app/**\/*.tsx' --content 'components/**\/*.tsx'
 *
 * Options:
 *   --css <file>        Input CSS file (required)
 *   --content <glob>    Content glob to scan for used classes (repeatable, required)
 *   -o, --output <file> Output file (defaults to <input>.purged.css)
 *   --safelist <class>  Additional class names to keep (repeatable)
 *   --json              Print stats as JSON instead of human-readable
 *   -h, --help          Show help
 */

"use strict";

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);

if (args.includes("-h") || args.includes("--help") || args.length === 0) {
  console.log(`
ply-purge — Tree-shake unused ply CSS

Usage:
  ply-purge --css <file> --content <glob> [-o <output>]

Options:
  --css <file>         Input CSS file to purge
  --content <glob>     Glob pattern for content files (repeatable)
  -o, --output <file>  Output file (default: <name>.purged.css)
  --safelist <class>   Extra class to preserve (repeatable)
  --json               Output stats as JSON
  -h, --help           Show this help

Examples:
  ply-purge --css node_modules/ply-css/dist/css/ply.min.css \\
            --content 'src/**/*.{html,jsx,tsx}' \\
            -o public/ply.css

  ply-purge --css dist/css/ply.min.css \\
            --content 'app/**/*.tsx' --content 'components/**/*.tsx'
`.trim());
  process.exit(0);
}

function parseArgs(argv) {
  const result = { content: [], safelist: [], json: false };
  let i = 0;
  while (i < argv.length) {
    const arg = argv[i];
    if (arg === "--css" && argv[i + 1]) {
      result.css = argv[++i];
    } else if (arg === "--content" && argv[i + 1]) {
      result.content.push(argv[++i]);
    } else if ((arg === "-o" || arg === "--output") && argv[i + 1]) {
      result.output = argv[++i];
    } else if (arg === "--safelist" && argv[i + 1]) {
      result.safelist.push(argv[++i]);
    } else if (arg === "--json") {
      result.json = true;
    }
    i++;
  }
  return result;
}

async function main() {
  const opts = parseArgs(args);

  if (!opts.css) {
    console.error("Error: --css is required");
    process.exit(1);
  }
  if (opts.content.length === 0) {
    console.error("Error: at least one --content glob is required");
    process.exit(1);
  }

  let PurgeCSS;
  try {
    PurgeCSS = require("purgecss").PurgeCSS;
  } catch {
    console.error(
      "ply-purge requires purgecss.\n" +
        "Install it: npm install -D purgecss"
    );
    process.exit(1);
  }

  const { safelistClasses, safelistPatterns } = require("../safelist");

  const cssPath = path.resolve(opts.css);
  if (!fs.existsSync(cssPath)) {
    console.error(`Error: CSS file not found: ${cssPath}`);
    process.exit(1);
  }

  const rawCss = fs.readFileSync(cssPath, "utf8");
  const originalSize = Buffer.byteLength(rawCss, "utf8");

  const purger = new PurgeCSS();
  const results = await purger.purge({
    content: opts.content,
    css: [{ raw: rawCss }],
    safelist: {
      standard: [...safelistClasses, ...opts.safelist],
      deep: safelistPatterns,
      greedy: [/^:root$/, /^html$/, /^body$/],
    },
    defaultExtractor: (content) => {
      const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
      const innerMatches = content.match(/[^<>"'`\s.(){}[\]#,;]+/g) || [];
      return [...new Set([...broadMatches, ...innerMatches])];
    },
  });

  if (results.length === 0) {
    console.error("Error: PurgeCSS returned no results");
    process.exit(1);
  }

  const purgedCss = results[0].css;
  const purgedSize = Buffer.byteLength(purgedCss, "utf8");

  const outputPath = opts.output
    ? path.resolve(opts.output)
    : cssPath.replace(/(\.\w+)$/, ".purged$1");

  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, purgedCss, "utf8");

  const reduction = (((originalSize - purgedSize) / originalSize) * 100).toFixed(1);

  if (opts.json) {
    console.log(
      JSON.stringify({
        input: opts.css,
        output: path.relative(process.cwd(), outputPath),
        originalBytes: originalSize,
        purgedBytes: purgedSize,
        reductionPercent: parseFloat(reduction),
      })
    );
  } else {
    console.log(`ply-purge complete`);
    console.log(`  Input:     ${opts.css} (${formatBytes(originalSize)})`);
    console.log(
      `  Output:    ${path.relative(process.cwd(), outputPath)} (${formatBytes(purgedSize)})`
    );
    console.log(`  Reduction: ${reduction}% removed`);
  }
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
