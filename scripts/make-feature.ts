#!/usr/bin/env npx tsx
/**
 * Generate a new feature with controller, routes, schema, service, repository, and index.
 * Usage: pnpm make:feature <name>
 * Example: pnpm make:feature notification
 *
 * Stubs are read from ./stubs (relative to project root). Edit those files to change generated output.
 */

import * as fs from "fs";
import * as path from "path";

const FEATURE_NAME_PASCAL = "FEATURE_NAME_PASCAL";
const FEATURE_NAME_CAMEL = "FEATURE_NAME_CAMEL";
const FEATURE_NAME = "FEATURE_NAME";
const FEATURE_NAME_PLURAL = "FEATURE_NAME_PLURAL";
const FEATURE_NAME_KEBAB = "FEATURE_NAME_KEBAB";

function toPascalCase(s: string): string {
  return s
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""))
    .replace(/^(.)/, (c) => c.toUpperCase());
}

function toCamelCase(s: string): string {
  const pascal = toPascalCase(s);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

function simplePluralize(word: string): string {
  if (word.length === 0) return word;
  const lower = word.toLowerCase();
  if (lower.endsWith("s") || lower.endsWith("x") || lower.endsWith("ch") || lower.endsWith("sh"))
    return lower + "es";
  if (lower.endsWith("y") && !/[aeiou]y$/.test(lower)) return lower.slice(0, -1) + "ies";
  return lower + "s";
}

function replacePlaceholders(content: string, replacements: Record<string, string>): string {
  let out = content;
  for (const [key, value] of Object.entries(replacements)) {
    out = out.split(key).join(value);
  }
  return out;
}

function main() {
  const rawName = process.argv[2];
  if (!rawName || rawName.startsWith("-")) {
    console.error("Usage: pnpm make:feature <name>");
    console.error("Example: pnpm make:feature notification");
    process.exit(1);
  }

  const name = rawName.replace(/^features?[/\\]/, "").trim().toLowerCase();
  const pascal = toPascalCase(name);
  const camel = toCamelCase(name);
  const plural = simplePluralize(name);

  const projectRoot = path.resolve(__dirname, "..");
  const stubsDir = path.join(projectRoot, "stubs");
  const featureDir = path.join(projectRoot, "src", "features", name);

  if (!fs.existsSync(stubsDir)) {
    console.error("Stubs directory not found:", stubsDir);
    process.exit(1);
  }

  if (fs.existsSync(featureDir)) {
    console.error("Feature directory already exists:", featureDir);
    process.exit(1);
  }

  const replacements: Record<string, string> = {
    [FEATURE_NAME_PASCAL]: pascal,
    [FEATURE_NAME_CAMEL]: camel,
    [FEATURE_NAME]: camel,
    [FEATURE_NAME_PLURAL]: plural,
    [FEATURE_NAME_KEBAB]: name,
  };

  const stubFiles = [
    "controller.stub",
    "routes.stub",
    "schema.stub",
    "service.stub",
    "repository.stub",
    "index.stub",
  ];
  const outputNames: Record<string, string> = {
    "controller.stub": `${name}.controller.ts`,
    "routes.stub": `${name}.routes.ts`,
    "schema.stub": `${name}.schema.ts`,
    "service.stub": `${name}.service.ts`,
    "repository.stub": `${name}.repository.ts`,
    "index.stub": "index.ts",
  };

  fs.mkdirSync(featureDir, { recursive: true });

  for (const stub of stubFiles) {
    const stubPath = path.join(stubsDir, stub);
    if (!fs.existsSync(stubPath)) {
      console.warn("Stub not found, skipping:", stub);
      continue;
    }
    const content = fs.readFileSync(stubPath, "utf-8");
    const outContent = replacePlaceholders(content, replacements);
    const outName = outputNames[stub];
    const outPath = path.join(featureDir, outName);
    fs.writeFileSync(outPath, outContent, "utf-8");
    console.log("Created", path.relative(projectRoot, outPath));
  }

  const routesPath = path.join(projectRoot, "src", "routes", "index.ts");
  if (fs.existsSync(routesPath)) {
    const routesContent = fs.readFileSync(routesPath, "utf-8");
    const routeVar = `${camel}Routes`;
    const routePath = `/${plural}`;
    if (routesContent.includes(routeVar)) {
      console.log("Routes already import", routeVar);
    } else {
      const insertImport = `import { ${routeVar} } from '@/features/${name}/${name}.routes';`;
      const insertRoute = `router.use('${routePath}', ${routeVar});`;
      let newContent = routesContent;
      if (!newContent.includes(insertImport)) {
        const lines = newContent.split("\n");
        let lastImportIdx = -1;
        for (let i = lines.length - 1; i >= 0; i--) {
          if (lines[i].includes("Routes }") && lines[i].includes("from")) {
            lastImportIdx = i;
            break;
          }
        }
        const insertIdx = lastImportIdx >= 0 ? lastImportIdx + 1 : lines.length;
        lines.splice(insertIdx, 0, insertImport);
        newContent = lines.join("\n");
      }
      if (!newContent.includes(insertRoute)) {
        newContent = newContent.replace(
          /\n(export const routes = router)/,
          `\n${insertRoute}\n$1`
        );
      }
      fs.writeFileSync(routesPath, newContent, "utf-8");
      console.log("Updated", path.relative(projectRoot, routesPath), "with", routePath, "->", routeVar);
    }
  }

  console.log("\nDone. Next steps:");
  console.log("  1. Ensure you have a Prisma model for", pascal, "(or update the repository to use the correct model name).");
  console.log("  2. Adjust", path.join("src", "features", name, `${name}.schema.ts`), "with your validation fields.");
  console.log("  3. Edit stubs in ./stubs if you want to change how future features are generated.");
}

main();
