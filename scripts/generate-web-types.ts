#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as ts from "typescript";

type ApiKind = "props" | "events" | "slots" | "methods" | "unknown";

type ApiValue = string | number | boolean | null;

type ApiRow = Record<string, ApiValue>;

interface ApiSection {
  title: string;
  variableName: string;
  kind: ApiKind;
  rows: ApiRow[];
  order: number;
}

interface TemplateSection {
  title: string;
  variableName?: string;
  rows?: ApiRow[];
  order: number;
}

interface DemoDocument {
  filePath: string;
  relativePath: string;
  demoName: string;
  pageTitle: string;
  defaultComponentKey: string;
  sections: ApiSection[];
}

interface ComponentEntry {
  symbol: string;
  tagName: string;
  aliases: string[];
}

interface WebTypesAttribute {
  name: string;
  description?: string;
  default?: string;
  value?: {
    type?: string;
  };
}

interface WebTypesEvent {
  name: string;
  description?: string;
}

interface WebTypesSlot {
  name: string;
  description?: string;
}

interface WebTypesTag {
  name: string;
  description?: string;
  source: {
    module: string;
    symbol: string;
  };
  attributes?: WebTypesAttribute[];
  events?: WebTypesEvent[];
  slots?: WebTypesSlot[];
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const demoRoot = path.resolve(projectRoot, "src/views/demo");
const componentsRoot = path.resolve(projectRoot, "src/components/vort");
const webTypesOutput = path.resolve(projectRoot, "dist/web-types.json");
const ruleOutput = path.resolve(projectRoot, "../vortmall-pc/.cursor/rules/21-vort-ui-api/RULE.md");

const ruleGlobs = [
  "app/components/**",
  "app/pages/**"
];

const tableHeaderLabels: Record<string, string> = {
  prop: "属性",
  desc: "说明",
  type: "类型",
  default: "默认值",
  event: "事件名",
  params: "参数",
  slot: "插槽名",
  name: "名称",
  method: "方法",
  return: "返回值"
};

const sectionTitleSuffixes = ["Props", "Events", "Slots", "Methods"];

const extraAliases: Record<string, string> = {
  checkable: "checkableTag",
  draggable: "draggableTags",
  countdown: "statisticCountdown",
  link: "anchorLink"
};

const ignoredComponentKeys = new Set([
  "column",
  "tablePagination",
  "tableRowSelection",
  "tree",
  "token",
  "themeToken",
  "skeletonTitleProps",
  "skeletonParagraphProps",
  "titleProps",
  "paragraphProps"
]);

const ignoredSectionVariables = new Set([
  "columnPropsData",
  "paginationPropsData",
  "rowSelectionPropsData",
  "treePropsData",
  "treeMethodsData",
  "tokenData",
  "titlePropsData",
  "paragraphPropsData"
]);

function main() {
  const shouldWriteRule = process.argv.includes("--rule");
  const componentRegistry = buildComponentRegistry();
  const demos = collectDemoDocuments();

  writeWebTypes(componentRegistry, demos);

  if (shouldWriteRule) {
    writeRuleDocument(componentRegistry, demos);
  }

  const generatedFiles = [path.relative(projectRoot, webTypesOutput)];
  if (shouldWriteRule) {
    generatedFiles.push(path.relative(projectRoot, ruleOutput));
  }

  console.log(`Generated: ${generatedFiles.join(", ")}`);
}

function buildComponentRegistry(): Map<string, ComponentEntry> {
  const entries = listFiles(componentsRoot)
    .filter((filePath) => path.basename(filePath) === "index.ts")
    .filter((filePath) => filePath !== path.resolve(componentsRoot, "index.ts"))
    .flatMap(readComponentEntriesFromIndex);

  const registry = new Map<string, ComponentEntry>();

  for (const entry of entries) {
    for (const alias of entry.aliases) {
      if (!registry.has(alias)) {
        registry.set(alias, entry);
      }
    }
  }

  return registry;
}

function readComponentEntriesFromIndex(indexPath: string): ComponentEntry[] {
  const source = fs.readFileSync(indexPath, "utf8");
  const exportPattern = /export\s*\{\s*default\s+as\s+([A-Za-z0-9_]+)[^}]*\}\s*from\s*"(.+?\.vue)";/g;
  const entries: ComponentEntry[] = [];

  for (const match of source.matchAll(exportPattern)) {
    const symbol = match[1];
    const relativeVuePath = match[2];
    const vuePath = path.resolve(path.dirname(indexPath), relativeVuePath);
    const componentName = readComponentName(vuePath, symbol);
    const tagName = buildTagName(componentName);
    const aliases = buildComponentAliases(symbol, componentName, tagName);

    entries.push({
      symbol,
      tagName,
      aliases
    });
  }

  return entries;
}

function readComponentName(vuePath: string, fallbackSymbol: string): string {
  const source = fs.readFileSync(vuePath, "utf8");
  const match = source.match(/defineOptions\(\{\s*name:\s*"([^"]+)"/);

  if (match?.[1]) {
    return match[1];
  }

  return fallbackSymbol.startsWith("Vort") ? fallbackSymbol : `Vort${fallbackSymbol}`;
}

function buildComponentAliases(symbol: string, componentName: string, tagName: string): string[] {
  const aliases = new Set<string>();
  const normalizedSymbol = stripVortPrefix(symbol);
  const normalizedComponentName = stripVortPrefix(componentName);
  const tagAlias = kebabToCamel(tagName.replace(/^vort-/, ""));

  aliases.add(normalizeComponentKey(normalizedSymbol));
  aliases.add(normalizeComponentKey(normalizedComponentName));
  aliases.add(normalizeComponentKey(tagAlias));

  for (const [alias, target] of Object.entries(extraAliases)) {
    if (normalizeComponentKey(target) === normalizeComponentKey(normalizedSymbol)) {
      aliases.add(alias);
    }
  }

  return [...aliases].filter(Boolean);
}

function collectDemoDocuments(): DemoDocument[] {
  return listFiles(demoRoot)
    .filter((filePath) => filePath.endsWith("Demo.vue"))
    .sort((left, right) => left.localeCompare(right))
    .map((filePath) => parseDemoDocument(filePath))
    .filter((demo): demo is DemoDocument => demo.sections.length > 0);
}

function parseDemoDocument(filePath: string): DemoDocument {
  const source = fs.readFileSync(filePath, "utf8");
  const scriptContent = extractBlock(source, "script");
  const templateContent = extractBlock(source, "template");
  const dataMap = readDataArrays(scriptContent, filePath);
  const templateSections = extractTemplateSections(extractApiTemplateContent(templateContent));
  const consumedVariables = new Set<string>();
  const sections: ApiSection[] = [];

  for (const templateSection of templateSections) {
    const rows = templateSection.variableName
      ? dataMap.get(templateSection.variableName) ?? templateSection.rows ?? []
      : templateSection.rows ?? [];

    if (templateSection.variableName) {
      consumedVariables.add(templateSection.variableName);
    }

    if (rows.length === 0) {
      continue;
    }

    sections.push({
      title: templateSection.title,
      variableName: templateSection.variableName ?? "",
      kind: inferApiKind(rows),
      rows,
      order: templateSection.order
    });
  }

  [...dataMap.entries()].forEach(([variableName, rows], index) => {
    if (consumedVariables.has(variableName) || rows.length === 0) {
      return;
    }

    sections.push({
      title: buildFallbackTitle(variableName),
      variableName,
      kind: inferApiKind(rows),
      rows,
      order: templateSections.length + index
    });
  });

  sections.sort((left, right) => left.order - right.order);

  const demoName = path.basename(filePath, ".vue");
  const baseName = demoName.replace(/Demo$/, "");
  const pageTitle = readPageTitle(templateContent) ?? baseName;

  return {
    filePath,
    relativePath: path.relative(projectRoot, filePath).replace(/\\/g, "/"),
    demoName,
    pageTitle,
    defaultComponentKey: normalizeComponentKey(baseName),
    sections
  };
}

function extractBlock(source: string, tagName: "script" | "template"): string {
  if (tagName === "script") {
    const pattern = /<script[^>]*>([\s\S]*?)<\/script>/m;
    const match = source.match(pattern);
    return match?.[1] ?? "";
  }

  const scriptEndIndex = source.indexOf("</script>");
  const searchStart = scriptEndIndex === -1 ? 0 : scriptEndIndex + "</script>".length;
  const templateStart = source.indexOf("<template", searchStart);

  if (templateStart === -1) {
    return "";
  }

  const contentStart = source.indexOf(">", templateStart);
  if (contentStart === -1) {
    return "";
  }

  const templateEnd = source.indexOf("</template>", contentStart);
  if (templateEnd === -1) {
    return "";
  }

  return source.slice(contentStart + 1, templateEnd);
}

function readDataArrays(scriptContent: string, filePath: string): Map<string, ApiRow[]> {
  const sourceFile = ts.createSourceFile(filePath, scriptContent, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const dataMap = new Map<string, ApiRow[]>();

  sourceFile.forEachChild((node) => {
    if (!ts.isVariableStatement(node)) {
      return;
    }

    for (const declaration of node.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || !declaration.initializer) {
        continue;
      }

      const variableName = declaration.name.text;

      if (!variableName.endsWith("Data") || !ts.isArrayLiteralExpression(declaration.initializer)) {
        continue;
      }

      const rows = literalToValue(declaration.initializer, sourceFile);

      if (Array.isArray(rows)) {
        const normalizedRows = rows
          .filter((row): row is Record<string, unknown> => isPlainObject(row))
          .map((row) => coerceRow(row));

        if (normalizedRows.length > 0 && inferApiKind(normalizedRows) !== "unknown") {
          dataMap.set(variableName, normalizedRows);
        }
      }
    }
  });

  return dataMap;
}

function literalToValue(node: ts.Expression, sourceFile: ts.SourceFile): unknown {
  if (ts.isArrayLiteralExpression(node)) {
    return node.elements
      .map((element) => {
        if (ts.isSpreadElement(element)) {
          return null;
        }

        return literalToValue(element as ts.Expression, sourceFile);
      })
      .filter((value) => value !== null);
  }

  if (ts.isObjectLiteralExpression(node)) {
    const record: Record<string, unknown> = {};

    for (const property of node.properties) {
      if (ts.isPropertyAssignment(property)) {
        const propertyName = readPropertyName(property.name, sourceFile);

        if (!propertyName) {
          continue;
        }

        record[propertyName] = literalToValue(property.initializer, sourceFile);
      }
    }

    return record;
  }

  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text;
  }

  if (ts.isNumericLiteral(node)) {
    return Number(node.text);
  }

  if (node.kind === ts.SyntaxKind.TrueKeyword) {
    return true;
  }

  if (node.kind === ts.SyntaxKind.FalseKeyword) {
    return false;
  }

  if (node.kind === ts.SyntaxKind.NullKeyword) {
    return null;
  }

  return node.getText(sourceFile).trim();
}

function readPropertyName(name: ts.PropertyName, sourceFile: ts.SourceFile): string {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) {
    return name.text;
  }

  return name.getText(sourceFile).trim();
}

function coerceRow(row: Record<string, unknown>): ApiRow {
  const normalized: ApiRow = {};

  for (const [key, value] of Object.entries(row)) {
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean" || value === null) {
      normalized[key] = value;
    } else {
      normalized[key] = JSON.stringify(value);
    }
  }

  return normalized;
}

function extractTemplateSections(templateContent: string): TemplateSection[] {
  const sections: TemplateSection[] = [];

  const componentPattern = /<DemoApiTable\b[^>]*\btitle="([^"]+)"[^>]*\b:data="([A-Za-z0-9_]+)"[^>]*\/?>/g;
  for (const match of templateContent.matchAll(componentPattern)) {
    sections.push({
      title: cleanupTitle(match[1]),
      variableName: match[2],
      order: match.index ?? sections.length
    });
  }

  const nativePattern = /<h3 class="demo-api-title">([\s\S]*?)<\/h3>\s*<table class="demo-api-table">([\s\S]*?)<\/table>/g;
  for (const match of templateContent.matchAll(nativePattern)) {
    const title = cleanupTitle(match[1]);
    const tableContent = match[2];
    const variableMatch = tableContent.match(/v-for="[^"]+\s+in\s+([A-Za-z0-9_]+)"/);

    sections.push({
      title,
      variableName: variableMatch?.[1],
      rows: variableMatch ? undefined : parseStaticTableRows(title, tableContent),
      order: match.index ?? sections.length
    });
  }

  return sections.sort((left, right) => left.order - right.order);
}

function extractApiTemplateContent(templateContent: string): string {
  const apiSectionPattern = /<h2[^>]*class="[^"]*demo-section-title[^"]*"[^>]*>\s*API(?:\s*文档)?\s*<\/h2>/g;
  const matches = [...templateContent.matchAll(apiSectionPattern)];

  if (matches.length === 0) {
    return templateContent;
  }

  const lastMatch = matches[matches.length - 1];
  return templateContent.slice(lastMatch.index ?? 0);
}

function readPageTitle(templateContent: string): string | null {
  const match = templateContent.match(/<h1 class="demo-page-title">([\s\S]*?)<\/h1>/);
  return match?.[1] ? cleanupTitle(match[1]) : null;
}

function buildFallbackTitle(variableName: string): string {
  const normalizedName = variableName.replace(/Data$/, "");
  const suffix = sectionTitleSuffixes.find((item) => normalizedName.toLowerCase().endsWith(item.toLowerCase()));

  if (!suffix) {
    return toTitleCase(normalizedName);
  }

  const componentName = normalizedName.slice(0, -suffix.length);

  if (!componentName) {
    return suffix;
  }

  return `${toTitleCase(componentName)} ${suffix}`;
}

function inferApiKind(rows: ApiRow[]): ApiKind {
  const sample = rows[0];

  if (!sample) {
    return "unknown";
  }

  if ("prop" in sample && "desc" in sample) {
    return "props";
  }

  if ("event" in sample && "desc" in sample) {
    return "events";
  }

  if (("slot" in sample && "desc" in sample) || ("name" in sample && "desc" in sample)) {
    return "slots";
  }

  if ("method" in sample && ("desc" in sample || "params" in sample || "return" in sample)) {
    return "methods";
  }

  return "unknown";
}

function writeRuleDocument(componentRegistry: Map<string, ComponentEntry>, demos: DemoDocument[]) {
  const output = [
    "---",
    "description: vort-ui 组件 Props / Events / Slots / Methods API 参考",
    "globs:",
    ...ruleGlobs.map((glob) => `  - "${glob}"`),
    "alwaysApply: false",
    "---",
    "",
    "## vort-ui API 参考",
    "",
    "- 以下内容由 `vort-ui-demo/src/views/demo/*Demo.vue` 中维护的 API 表格提取而来。",
    "- 优先按照对应标签名使用组件；若当前页面已有存量写法，保持同文件风格一致。",
    "- 命令式能力如 `message`、`notification`、`dialog` 也在此规则中统一记录。",
    ""
  ];

  for (const demo of demos) {
    const relatedTags = collectDemoTags(componentRegistry, demo);

    output.push(`### ${demo.pageTitle}`);
    output.push("");
    output.push(`- Demo 来源：\`${demo.relativePath}\``);
    if (relatedTags.length > 0) {
      output.push(`- 相关标签：${relatedTags.map((tag) => `\`${tag}\``).join("、")}`);
    }
    output.push("");

    for (const section of demo.sections) {
      output.push(`#### ${section.title}`);
      output.push("");
      output.push(...renderMarkdownTable(section.rows));
      output.push("");
    }
  }

  fs.mkdirSync(path.dirname(ruleOutput), { recursive: true });
  fs.writeFileSync(ruleOutput, `${output.join("\n").trimEnd()}\n`, "utf8");
}

function collectDemoTags(componentRegistry: Map<string, ComponentEntry>, demo: DemoDocument): string[] {
  const tags = new Set<string>();

  for (const section of demo.sections) {
    const componentEntry = resolveSectionComponent(componentRegistry, demo, section);
    if (componentEntry) {
      tags.add(componentEntry.tagName);
    }
  }

  return [...tags];
}

function renderMarkdownTable(rows: ApiRow[]): string[] {
  if (rows.length === 0) {
    return ["暂无数据。"];
  }

  const columns = [...new Set(rows.flatMap((row) => Object.keys(row)))];
  const headers = columns.map((column) => tableHeaderLabels[column] ?? column);
  const divider = columns.map(() => "---");

  return [
    `| ${headers.join(" | ")} |`,
    `| ${divider.join(" | ")} |`,
    ...rows.map((row) => `| ${columns.map((column) => escapeMarkdownCell(row[column])).join(" | ")} |`)
  ];
}

function writeWebTypes(componentRegistry: Map<string, ComponentEntry>, demos: DemoDocument[]) {
  const tagMap = new Map<string, WebTypesTag>();

  for (const demo of demos) {
    for (const section of demo.sections) {
      if (!["props", "events", "slots"].includes(section.kind)) {
        continue;
      }

      const componentEntry = resolveSectionComponent(componentRegistry, demo, section);
      if (!componentEntry) {
        continue;
      }

      const webTypesTag = getOrCreateWebTypesTag(tagMap, componentEntry, demo.pageTitle);
      mergeSectionIntoTag(webTypesTag, section);
    }
  }

  const packageJson = JSON.parse(fs.readFileSync(path.resolve(projectRoot, "package.json"), "utf8")) as { name: string; version: string };
  const webTypesDocument = {
    $schema: "https://json.schemastore.org/web-types",
    framework: "vue",
    name: packageJson.name,
    version: packageJson.version,
    "js-types-syntax": "typescript",
    contributions: {
      html: {
        tags: [...tagMap.values()].sort((left, right) => left.name.localeCompare(right.name))
      }
    }
  };

  fs.mkdirSync(path.dirname(webTypesOutput), { recursive: true });
  fs.writeFileSync(webTypesOutput, `${JSON.stringify(webTypesDocument, null, 2)}\n`, "utf8");
}

function getOrCreateWebTypesTag(tagMap: Map<string, WebTypesTag>, entry: ComponentEntry, description: string): WebTypesTag {
  const existing = tagMap.get(entry.tagName);
  if (existing) {
    return existing;
  }

  const tag: WebTypesTag = {
    name: entry.tagName,
    description,
    source: {
      module: "@openvort/vort-ui",
      symbol: entry.symbol
    },
    attributes: [],
    events: [],
    slots: []
  };

  tagMap.set(entry.tagName, tag);
  return tag;
}

function mergeSectionIntoTag(tag: WebTypesTag, section: ApiSection) {
  if (section.kind === "props") {
    const attributes = tag.attributes ?? [];
    for (const row of section.rows) {
      const name = normalizeWebTypesAttributeName(stringifyValue(row.prop));
      if (!name || attributes.some((attribute) => attribute.name === name)) {
        continue;
      }

      const attribute: WebTypesAttribute = {
        name,
        description: stringifyValue(row.desc)
      };

      const defaultValue = stringifyValue(row.default);
      if (defaultValue && defaultValue !== "-") {
        attribute.default = defaultValue;
      }

      const typeValue = stringifyValue(row.type);
      if (typeValue) {
        attribute.value = {
          type: typeValue
        };
      }

      attributes.push(attribute);
    }

    tag.attributes = attributes;
  }

  if (section.kind === "events") {
    const events = tag.events ?? [];
    for (const row of section.rows) {
      const name = stringifyValue(row.event);
      if (!name || events.some((event) => event.name === name)) {
        continue;
      }

      events.push({
        name,
        description: buildEventDescription(row)
      });
    }

    tag.events = events;
  }

  if (section.kind === "slots") {
    const slots = tag.slots ?? [];
    for (const row of section.rows) {
      const name = stringifyValue(row.slot) || stringifyValue(row.name);
      if (!name || slots.some((slot) => slot.name === name)) {
        continue;
      }

      slots.push({
        name,
        description: stringifyValue(row.desc)
      });
    }

    tag.slots = slots;
  }
}

function buildEventDescription(row: ApiRow): string | undefined {
  const description = stringifyValue(row.desc);
  const params = stringifyValue(row.params);

  if (description && params) {
    return `${description} 参数：${params}`;
  }

  return description || params;
}

function resolveSectionComponent(
  componentRegistry: Map<string, ComponentEntry>,
  demo: DemoDocument,
  section: ApiSection
): ComponentEntry | null {
  if (section.variableName && ignoredSectionVariables.has(section.variableName)) {
    return null;
  }

  const explicitKey = readComponentKeyFromSectionTitle(section.title);

  if (explicitKey && !isGenericSectionTitle(section.title)) {
    if (ignoredComponentKeys.has(explicitKey)) {
      return null;
    }

    const mappedExplicitKey = extraAliases[explicitKey] ? normalizeComponentKey(extraAliases[explicitKey]) : explicitKey;
    const explicitEntry = componentRegistry.get(mappedExplicitKey);

    if (explicitEntry) {
      return explicitEntry;
    }
  }

  const candidateKeys = new Set<string>();
  const variableKey = readComponentKeyFromVariableName(section.variableName);
  if (variableKey) {
    candidateKeys.add(variableKey);
  }

  if (isGenericSectionTitle(section.title)) {
    candidateKeys.add(demo.defaultComponentKey);
  }

  for (const candidateKey of candidateKeys) {
    if (ignoredComponentKeys.has(candidateKey)) {
      continue;
    }

    const mappedKey = extraAliases[candidateKey] ? normalizeComponentKey(extraAliases[candidateKey]) : candidateKey;
    const componentEntry = componentRegistry.get(mappedKey);
    if (componentEntry) {
      return componentEntry;
    }
  }

  return null;
}

function readComponentKeyFromSectionTitle(title: string): string | null {
  const normalizedTitle = cleanupTitle(title);

  if (isGenericSectionTitle(normalizedTitle)) {
    return null;
  }

  const explicitSuffix = sectionTitleSuffixes.find((suffix) => normalizedTitle.endsWith(` ${suffix}`));
  if (explicitSuffix) {
    return normalizeComponentKey(normalizedTitle.slice(0, -(explicitSuffix.length + 1)));
  }

  if (normalizedTitle.endsWith("Props") || normalizedTitle.endsWith("Events") || normalizedTitle.endsWith("Slots") || normalizedTitle.endsWith("Methods")) {
    return normalizeComponentKey(normalizedTitle.replace(/(Props|Events|Slots|Methods)$/, ""));
  }

  return normalizeComponentKey(normalizedTitle);
}

function readComponentKeyFromVariableName(variableName: string): string | null {
  const normalizedName = variableName.replace(/Data$/, "");
  const suffix = sectionTitleSuffixes.find((item) => normalizedName.toLowerCase().endsWith(item.toLowerCase()));
  const key = suffix ? normalizedName.slice(0, -suffix.length) : normalizedName;

  if (!key) {
    return null;
  }

  return normalizeComponentKey(key);
}

function isGenericSectionTitle(title: string): boolean {
  return new Set(["Props", "Events", "Slots", "Methods"]).has(cleanupTitle(title));
}

function normalizeComponentKey(value: string): string {
  const cleaned = cleanupTitle(value)
    .replace(/^Vort\s*/i, "")
    .replace(/^Vort/, "")
    .replace(/（.*?）/g, "")
    .replace(/\(.*?\)/g, "")
    .replace(/\s+/g, "")
    .replace(/\.([a-zA-Z])/g, (_, initial: string) => initial.toUpperCase())
    .replace(/[^a-zA-Z0-9]/g, "");

  if (!cleaned) {
    return "";
  }

  return cleaned.charAt(0).toLowerCase() + cleaned.slice(1);
}

function stripVortPrefix(value: string): string {
  return value.replace(/^Vort/, "");
}

function buildTagName(componentName: string): string {
  const normalized = stripVortPrefix(componentName);
  return `vort-${pascalToKebab(normalized)}`;
}

function pascalToKebab(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

function kebabToCamel(value: string): string {
  return value.replace(/-([a-z])/g, (_, initial: string) => initial.toUpperCase());
}

function toTitleCase(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
    .trim();
}

function cleanupTitle(value: string): string {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeMarkdownCell(value: ApiValue | undefined): string {
  return stringifyValue(value)
    ?.replace(/\|/g, "\\|")
    .replace(/\n/g, "<br />") ?? "";
}

function stringifyValue(value: ApiValue | undefined): string {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();
}

function normalizeWebTypesAttributeName(value: string): string {
  if (!value) {
    return "";
  }

  if (value.includes("modelValue")) {
    return "modelValue";
  }

  const vModelMatch = value.match(/^v-model:([a-zA-Z0-9_-]+)/);
  if (vModelMatch?.[1]) {
    return vModelMatch[1];
  }

  const parenthesesMatch = value.match(/^(.+?)\s*\(v-model\)$/);
  if (parenthesesMatch?.[1]) {
    return parenthesesMatch[1].trim();
  }

  return value;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function listFiles(targetPath: string): string[] {
  const entries = fs.readdirSync(targetPath, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const entryPath = path.join(targetPath, entry.name);

    if (entry.isDirectory()) {
      files.push(...listFiles(entryPath));
      continue;
    }

    files.push(entryPath);
  }

  return files;
}

function parseStaticTableRows(title: string, tableContent: string): ApiRow[] {
  const headers = [...tableContent.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g)]
    .map((match) => normalizeHeaderKey(cleanupTableCell(match[1]), title))
    .filter(Boolean);

  const bodyMatch = tableContent.match(/<tbody>([\s\S]*?)<\/tbody>/);
  if (!bodyMatch?.[1] || headers.length === 0) {
    return [];
  }

  const rows: ApiRow[] = [];

  for (const rowMatch of bodyMatch[1].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)) {
    const rowContent = rowMatch[1];

    if (rowContent.includes("v-for=")) {
      continue;
    }

    const cells = [...rowContent.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((match) => cleanupTableCell(match[1]));
    if (cells.length === 0) {
      continue;
    }

    const row: ApiRow = {};
    headers.forEach((header, index) => {
      row[header] = cells[index] ?? "";
    });
    rows.push(row);
  }

  return rows;
}

function normalizeHeaderKey(headerLabel: string, title: string): string {
  const normalized = headerLabel.replace(/\s+/g, "");

  if (normalized === "参数" || normalized === "属性") {
    return title.includes("Methods") || title === "Methods" ? "method" : "prop";
  }

  if (normalized === "说明" || normalized === "描述") {
    return "desc";
  }

  if (normalized === "类型") {
    return "type";
  }

  if (normalized === "默认值") {
    return "default";
  }

  if (normalized === "事件名" || normalized === "事件名称") {
    return "event";
  }

  if (normalized === "回调参数" || normalized === "参数列表") {
    return "params";
  }

  if (normalized === "插槽名") {
    return "slot";
  }

  if (normalized === "方法") {
    return "method";
  }

  if (normalized === "返回值") {
    return "return";
  }

  if (normalized === "名称") {
    return "name";
  }

  return normalizeComponentKey(normalized) || "value";
}

function cleanupTableCell(value: string): string {
  return value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/?(code|strong|span|p|div|template)[^>]*>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/\s*\n\s*/g, "\n")
    .replace(/[ \t]+/g, " ")
    .trim();
}

main();
