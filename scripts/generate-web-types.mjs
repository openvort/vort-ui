// 基于 openvort/vort-ui ba7e128 的 MIT 许可生成器迁移；仅写入本包 dist，不生成其他仓库的规则文件。
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as ts from "typescript";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const demoRoot = path.resolve(projectRoot, "docs/src/views/demo");
const componentsRoot = path.resolve(projectRoot, "src/components/vort");
const webTypesOutput = path.resolve(projectRoot, "dist/web-types.json");
const sectionTitleSuffixes = ["Props", "Events", "Slots", "Methods"];
const extraAliases = {
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
    writeWebTypes(buildComponentRegistry(), collectDemoDocuments());
    console.log("Generated: dist/web-types.json");
}
function buildComponentRegistry() {
    const entries = listFiles(componentsRoot)
        .filter((filePath) => path.basename(filePath) === "index.ts")
        .filter((filePath) => filePath !== path.resolve(componentsRoot, "index.ts"))
        .flatMap(readComponentEntriesFromIndex);
    const registry = new Map();
    for (const entry of entries) {
        for (const alias of entry.aliases) {
            if (!registry.has(alias)) {
                registry.set(alias, entry);
            }
        }
    }
    return registry;
}
function readComponentEntriesFromIndex(indexPath) {
    const source = fs.readFileSync(indexPath, "utf8");
    const exportPattern = /export\s*\{\s*default\s+as\s+([A-Za-z0-9_]+)[^}]*\}\s*from\s*"(.+?\.vue)";/g;
    const entries = [];
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
function readComponentName(vuePath, fallbackSymbol) {
    const source = fs.readFileSync(vuePath, "utf8");
    const match = source.match(/defineOptions\(\{\s*name:\s*"([^"]+)"/);
    if (match?.[1]) {
        return match[1];
    }
    return fallbackSymbol.startsWith("Vort") ? fallbackSymbol : `Vort${fallbackSymbol}`;
}
function buildComponentAliases(symbol, componentName, tagName) {
    const aliases = new Set();
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
function collectDemoDocuments() {
    return listFiles(demoRoot)
        .filter((filePath) => filePath.endsWith("Demo.vue"))
        .sort((left, right) => left.localeCompare(right))
        .map((filePath) => parseDemoDocument(filePath))
        .filter((demo) => demo.sections.length > 0);
}
function parseDemoDocument(filePath) {
    const source = fs.readFileSync(filePath, "utf8");
    const scriptContent = extractBlock(source, "script");
    const templateContent = extractBlock(source, "template");
    const dataMap = readDataArrays(scriptContent, filePath);
    const templateSections = extractTemplateSections(extractApiTemplateContent(templateContent));
    const consumedVariables = new Set();
    const sections = [];
    for (const templateSection of templateSections) {
        const rows = templateSection.variableName ? (dataMap.get(templateSection.variableName) ?? templateSection.rows ?? []) : (templateSection.rows ?? []);
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
function extractBlock(source, tagName) {
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
function readDataArrays(scriptContent, filePath) {
    const sourceFile = ts.createSourceFile(filePath, scriptContent, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const dataMap = new Map();
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
                const normalizedRows = rows.filter((row) => isPlainObject(row)).map((row) => coerceRow(row));
                if (normalizedRows.length > 0 && inferApiKind(normalizedRows) !== "unknown") {
                    dataMap.set(variableName, normalizedRows);
                }
            }
        }
    });
    return dataMap;
}
function literalToValue(node, sourceFile) {
    if (ts.isArrayLiteralExpression(node)) {
        return node.elements
            .map((element) => {
                if (ts.isSpreadElement(element)) {
                    return null;
                }
                return literalToValue(element, sourceFile);
            })
            .filter((value) => value !== null);
    }
    if (ts.isObjectLiteralExpression(node)) {
        const record = {};
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
function readPropertyName(name, sourceFile) {
    if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) {
        return name.text;
    }
    return name.getText(sourceFile).trim();
}
function coerceRow(row) {
    const normalized = {};
    for (const [key, value] of Object.entries(row)) {
        if (typeof value === "string" || typeof value === "number" || typeof value === "boolean" || value === null) {
            normalized[key] = value;
        } else {
            normalized[key] = JSON.stringify(value);
        }
    }
    return normalized;
}
function extractTemplateSections(templateContent) {
    const sections = [];
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
function extractApiTemplateContent(templateContent) {
    const apiSectionPattern = /<h2[^>]*class="[^"]*demo-section-title[^"]*"[^>]*>\s*API(?:\s*文档)?\s*<\/h2>/g;
    const matches = [...templateContent.matchAll(apiSectionPattern)];
    if (matches.length === 0) {
        return templateContent;
    }
    const lastMatch = matches[matches.length - 1];
    return templateContent.slice(lastMatch.index ?? 0);
}
function readPageTitle(templateContent) {
    const match = templateContent.match(/<h1 class="demo-page-title">([\s\S]*?)<\/h1>/);
    return match?.[1] ? cleanupTitle(match[1]) : null;
}
function buildFallbackTitle(variableName) {
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
function inferApiKind(rows) {
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
function writeWebTypes(componentRegistry, demos) {
    const tagMap = new Map();
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
    const packageJson = JSON.parse(fs.readFileSync(path.resolve(projectRoot, "package.json"), "utf8"));
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
function getOrCreateWebTypesTag(tagMap, entry, description) {
    const existing = tagMap.get(entry.tagName);
    if (existing) {
        return existing;
    }
    const tag = {
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
function mergeSectionIntoTag(tag, section) {
    if (section.kind === "props") {
        const attributes = tag.attributes ?? [];
        for (const row of section.rows) {
            const name = normalizeWebTypesAttributeName(stringifyValue(row.prop));
            if (!name || attributes.some((attribute) => attribute.name === name)) {
                continue;
            }
            const attribute = {
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
function buildEventDescription(row) {
    const description = stringifyValue(row.desc);
    const params = stringifyValue(row.params);
    if (description && params) {
        return `${description} 参数：${params}`;
    }
    return description || params;
}
function resolveSectionComponent(componentRegistry, demo, section) {
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
    const candidateKeys = new Set();
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
function readComponentKeyFromSectionTitle(title) {
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
function readComponentKeyFromVariableName(variableName) {
    const normalizedName = variableName.replace(/Data$/, "");
    const suffix = sectionTitleSuffixes.find((item) => normalizedName.toLowerCase().endsWith(item.toLowerCase()));
    const key = suffix ? normalizedName.slice(0, -suffix.length) : normalizedName;
    if (!key) {
        return null;
    }
    return normalizeComponentKey(key);
}
function isGenericSectionTitle(title) {
    return new Set(["Props", "Events", "Slots", "Methods"]).has(cleanupTitle(title));
}
function normalizeComponentKey(value) {
    const cleaned = cleanupTitle(value)
        .replace(/^Vort\s*/i, "")
        .replace(/^Vort/, "")
        .replace(/（.*?）/g, "")
        .replace(/\(.*?\)/g, "")
        .replace(/\s+/g, "")
        .replace(/\.([a-zA-Z])/g, (_, initial) => initial.toUpperCase())
        .replace(/[^a-zA-Z0-9]/g, "");
    if (!cleaned) {
        return "";
    }
    return cleaned.charAt(0).toLowerCase() + cleaned.slice(1);
}
function stripVortPrefix(value) {
    return value.replace(/^Vort/, "");
}
function buildTagName(componentName) {
    const normalized = stripVortPrefix(componentName);
    return `vort-${pascalToKebab(normalized)}`;
}
function pascalToKebab(value) {
    return value
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
        .toLowerCase();
}
function kebabToCamel(value) {
    return value.replace(/-([a-z])/g, (_, initial) => initial.toUpperCase());
}
function toTitleCase(value) {
    return value
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
        .trim();
}
function cleanupTitle(value) {
    return value
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}
function stringifyValue(value) {
    if (value === null || value === undefined) {
        return "";
    }
    return String(value).trim();
}
function normalizeWebTypesAttributeName(value) {
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
function isPlainObject(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}
function listFiles(targetPath) {
    const entries = fs.readdirSync(targetPath, { withFileTypes: true });
    const files = [];
    for (const entry of entries) {
        if (["__tests__", "tests", "test", "node_modules"].includes(entry.name) || /\.(test|spec)\./.test(entry.name)) continue;
        const entryPath = path.join(targetPath, entry.name);
        if (entry.isDirectory()) {
            files.push(...listFiles(entryPath));
            continue;
        }
        files.push(entryPath);
    }
    return files;
}
function parseStaticTableRows(title, tableContent) {
    const headers = [...tableContent.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g)]
        .map((match) => normalizeHeaderKey(cleanupTableCell(match[1]), title))
        .filter(Boolean);
    const bodyMatch = tableContent.match(/<tbody>([\s\S]*?)<\/tbody>/);
    if (!bodyMatch?.[1] || headers.length === 0) {
        return [];
    }
    const rows = [];
    for (const rowMatch of bodyMatch[1].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)) {
        const rowContent = rowMatch[1];
        if (rowContent.includes("v-for=")) {
            continue;
        }
        const cells = [...rowContent.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((match) => cleanupTableCell(match[1]));
        if (cells.length === 0) {
            continue;
        }
        const row = {};
        headers.forEach((header, index) => {
            row[header] = cells[index] ?? "";
        });
        rows.push(row);
    }
    return rows;
}
function normalizeHeaderKey(headerLabel, title) {
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
function cleanupTableCell(value) {
    return value
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<\/?(code|strong|span|p|div|template)[^>]*>/gi, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s*\n\s*/g, "\n")
        .replace(/[ \t]+/g, " ")
        .trim();
}
main();
