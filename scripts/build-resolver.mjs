#!/usr/bin/env node
import fs from "fs";
import path from "path";

function main() {
  const resolverSource = path.join(process.cwd(), "resolver-npm.ts");
  const distDir = path.join(process.cwd(), "dist");
  const resolverDest = path.join(distDir, "resolver.js");
  const resolverDestDts = path.join(distDir, "resolver.d.ts");

  if (!fs.existsSync(resolverSource)) {
    throw new Error("resolver-npm.ts 不存在");
  }

  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  let resolverContent = fs.readFileSync(resolverSource, "utf-8");
  resolverContent = resolverContent
    .replace(/import type \{[^}]+\} from [^;]+;/g, "")
    .replace(/\((\w+):\s*\w+\)/g, "($1)")
    .replace(/\):\s*\w+\s*\{/g, ") {")
    .replace(/:\s*ComponentResolver/g, "")
    .replace(/\n\n\n+/g, "\n\n");

  fs.writeFileSync(resolverDest, resolverContent);

  const dtsContent = `import type { ComponentResolver } from "unplugin-vue-components/types";

export declare function VortResolver(): ComponentResolver;
export declare const vortComponentNames: string[];
`;
  fs.writeFileSync(resolverDestDts, dtsContent);

  console.log("✓ resolver.js");
  console.log("✓ resolver.d.ts");
}

try {
  main();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`✗ ${message}`);
  process.exit(1);
}
