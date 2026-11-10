// Content guard for the portfolio: fails if copy drifts back to the old
// ML-pitch site, uses filler words, or exposes links it should not.
// Run: npm run check
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const failures = [];
const fail = (msg) => failures.push(msg);

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const sourceFiles = ["lib", "components", "app"]
  .flatMap((d) => walk(join(root, d)))
  .filter((p) => /\.(tsx?|css)$/.test(p));

const banned = [
  "delve", "foster", "leverage", "utilize", "facilitate", "empower",
  "streamline", "robust", "cutting-edge", "transformative", "elevate",
  "harness", "supercharge", "seamless", "passionate",
  "hiring", "open to", "freelance", "available for",
];

for (const file of sourceFiles) {
  const text = readFileSync(file, "utf8");
  const rel = file.slice(root.length);
  for (const word of banned) {
    const re = new RegExp(`\\b${word.replace("-", "\\-")}\\b`, "i");
    if (re.test(text)) fail(`${rel}: contains "${word}"`);
  }
}

const data = readFileSync(join(root, "lib/data.ts"), "utf8");
if (!data.includes("Muzzamil755@gmail.com")) fail("lib/data.ts: site email missing");
for (const company of ["Sola", "Ginseng", "Sharpmind", "Xceedure"]) {
  if (!data.includes(company)) fail(`lib/data.ts: missing ${company}`);
}
for (const old of ["Data Scientist\",\n    company: \"Ginseng", "Finance Intern"]) {
  if (data.includes(old)) fail(`lib/data.ts: old experience entry "${old.split("\"")[0]}"`);
}

for (const removed of ["QuickScan", "FocusCard", "MoreProjects", "Skills", "TechStack"]) {
  if (existsSync(join(root, `components/${removed}.tsx`))) fail(`components/${removed}.tsx should be deleted`);
}

// Private / client projects must never carry a GitHub link.
for (const slug of ["contract-rag"]) {
  for (const file of ["lib/data.ts", "lib/caseStudies.ts"]) {
    const text = readFileSync(join(root, file), "utf8");
    const start = text.indexOf(`slug: "${slug}"`);
    if (start === -1) {
      fail(`${file}: missing project ${slug}`);
      continue;
    }
    const next = text.indexOf("slug: \"", start + 1);
    const block = text.slice(start, next === -1 ? undefined : next);
    if (/github:/.test(block)) fail(`${file}: ${slug} must not have a github link`);
  }
}

const cv = data.match(/cvHref:\s*"([^"]+)"/);
if (cv && !existsSync(join(root, "public", cv[1]))) fail(`cvHref points at missing public${cv[1]}`);

if (failures.length) {
  console.error(`Content check failed (${failures.length}):\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
console.log("Content check passed.");
