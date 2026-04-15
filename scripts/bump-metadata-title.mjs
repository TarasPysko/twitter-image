import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const layoutPath = resolve(process.cwd(), "src/app/layout.tsx");
const source = readFileSync(layoutPath, "utf8");

const twitterTitleRegex = /twitter:\s*\{[\s\S]*?title:\s*"([^"]+)"/;
const twitterTitleMatch = source.match(twitterTitleRegex);

if (!twitterTitleMatch) {
  throw new Error("Could not find twitter title in src/app/layout.tsx");
}

const currentValue = Number.parseInt(twitterTitleMatch[1], 10);
const nextValue = Number.isNaN(currentValue) ? 1 : currentValue + 1;
const nextTitle = String(nextValue);

const twitterBlockRegex = /twitter:\s*\{[\s\S]*?\},/;
const twitterBlockMatch = source.match(twitterBlockRegex);

if (!twitterBlockMatch) {
  throw new Error("Could not find twitter metadata block in src/app/layout.tsx");
}

const nextTwitterBlock = twitterBlockMatch[0]
  .replace(/(title:\s*")([^"]+)(")/, `$1${nextTitle}$3`)
  .replace(/images:\s*\[[^\]]+\]/, `images: ["/1.png?v=${nextTitle}"]`);

const nextSource = source.replace(twitterBlockRegex, nextTwitterBlock);

if (nextSource === source) {
  throw new Error("No twitter title value was updated");
}

writeFileSync(layoutPath, nextSource, "utf8");
process.stdout.write(`${nextTitle}\n`);
