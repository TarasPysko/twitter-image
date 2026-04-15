import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const layoutPath = resolve(process.cwd(), "src/app/layout.tsx");
const source = readFileSync(layoutPath, "utf8");

const topLevelTitleRegex = /title:\s*"([^"]+)"/;
const topLevelMatch = source.match(topLevelTitleRegex);

if (!topLevelMatch) {
  throw new Error("Could not find metadata title in src/app/layout.tsx");
}

const currentValue = Number.parseInt(topLevelMatch[1], 10);
const nextValue = Number.isNaN(currentValue) ? 1 : currentValue + 1;
const nextTitle = String(nextValue);

const nextSource = source
  .replace(/title:\s*"[^"]+"/g, `title: "${nextTitle}"`)
  .replace(/og:title"\s*content="[^"]+"/g, `og:title" content="${nextTitle}"`)
  .replace(/twitter:title"\s*content="[^"]+"/g, `twitter:title" content="${nextTitle}"`);

if (nextSource === source) {
  throw new Error("No title values were updated");
}

writeFileSync(layoutPath, nextSource, "utf8");
process.stdout.write(`${nextTitle}\n`);
