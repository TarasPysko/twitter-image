import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const layoutPath = resolve(process.cwd(), "src/app/layout.tsx");
const source = readFileSync(layoutPath, "utf8");

const stageRegex = /const stage = "(\d+)";/;
const stageMatch = source.match(stageRegex);

if (!stageMatch) {
  throw new Error('Could not find `const stage = "<number>"` in src/app/layout.tsx');
}

const currentValue = Number.parseInt(stageMatch[1], 10);
const nextValue = Number.isNaN(currentValue) ? 1 : currentValue + 1;
const nextStage = String(nextValue);

const nextSource = source.replace(stageRegex, `const stage = "${nextStage}";`);

if (nextSource === source) {
  throw new Error("No stage value was updated");
}

writeFileSync(layoutPath, nextSource, "utf8");
process.stdout.write(`${nextStage}\n`);
