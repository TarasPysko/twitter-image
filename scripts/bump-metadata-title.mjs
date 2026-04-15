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

const nextSource = source.replace(
  /(twitter:\s*\{[\s\S]*?title:\s*")([^"]+)(")/,
  `$1${nextTitle}$3`,
);

if (nextSource === source) {
  throw new Error("No twitter title value was updated");
}

writeFileSync(layoutPath, nextSource, "utf8");
process.stdout.write(`${nextTitle}\n`);
