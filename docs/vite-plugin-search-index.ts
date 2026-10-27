import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

const VIRTUAL_MODULE_ID = "virtual:vort-docs-search";
const RESOLVED_VIRTUAL_MODULE_ID = `\0${VIRTUAL_MODULE_ID}`;

type SearchSectionType = "description" | "demo" | "prop" | "event" | "slot" | "method" | "content";

interface SearchSection {
    type: SearchSectionType;
    heading: string;
    text: string;
}

interface SearchEntry {
    file: string;
    sections: SearchSection[];
}

const field = (body: string, name: string) => body.match(new RegExp(`\\b${name}:\\s*"([^"]*)"`))?.[1];
const captures = (content: string, pattern: RegExp) => [...content.matchAll(pattern)].map((m) => m[1]?.trim() ?? "").filter(Boolean);

// 只在同一个对象字面量内取字段，避免缺少 desc 的行借用下一行的说明。
function apiRows(content: string, key: string) {
    return [...content.matchAll(new RegExp(`\\{\\s*${key}:\\s*"([^"]+)"([^{}]*)\\}`, "g"))].map((m) => ({
        value: m[1] ?? "",
        desc: field(m[2] ?? "", "desc"),
        type: field(m[2] ?? "", "type")
    }));
}

function extractSections(content: string): SearchSection[] {
    const sections: SearchSection[] = [];
    for (const text of captures(content, /<p[^>]*class="demo-page-desc"[^>]*>([^<]+)<\/p>/g)) {
        sections.push({ type: "description", heading: "描述", text });
    }
    for (const text of captures(content, /<p[^>]*class="demo-section-desc"[^>]*>([^<]+)<\/p>/g)) {
        sections.push({ type: "description", heading: "说明", text });
    }
    for (const attrs of captures(content, /<DemoBox\s([\s\S]*?)>/g)) {
        const title = attrs.match(/title="([^"]+)"/)?.[1];
        const description = attrs.match(/description="([^"]+)"/)?.[1];
        if (title) sections.push({ type: "demo", heading: "示例", text: description ? `${title} - ${description}` : title });
    }
    for (const row of apiRows(content, "prop")) {
        if (row.desc) sections.push({ type: "prop", heading: "Props", text: `${row.value} - ${row.desc}${row.type ? ` (${row.type})` : ""}` });
    }
    for (const row of apiRows(content, "event")) {
        if (row.desc) sections.push({ type: "event", heading: "Events", text: `${row.value} - ${row.desc}` });
    }
    // DemoApiTable 的插槽行使用 slot 或 name 字段。
    for (const row of [...apiRows(content, "slot"), ...apiRows(content, "name")]) {
        if (row.desc) sections.push({ type: "slot", heading: "Slots", text: `${row.value} - ${row.desc}` });
    }
    for (const row of apiRows(content, "method")) {
        if (row.desc) sections.push({ type: "method", heading: "Methods", text: `${row.value} - ${row.desc}` });
    }
    for (const text of captures(content, /<li>([^<]{6,})<\/li>/g)) {
        sections.push({ type: "content", heading: "说明", text });
    }
    return sections;
}

/**
 * 构建时扫描 Demo 页面，生成 ⌘K 搜索使用的文本索引。
 * 页面标题与路由来自 demo-catalog，这里只按文件名提供可搜索的段落。
 */
export function searchIndexPlugin(): Plugin {
    let demoDir = "";

    return {
        name: "vort-docs-search-index",
        configResolved(config) {
            demoDir = path.resolve(config.root, "src/views/demo");
        },
        resolveId(id) {
            if (id === VIRTUAL_MODULE_ID) return RESOLVED_VIRTUAL_MODULE_ID;
        },
        load(id) {
            if (id !== RESOLVED_VIRTUAL_MODULE_ID) return;
            const entries: SearchEntry[] = fs
                .readdirSync(demoDir)
                .filter((file) => file.endsWith("Demo.vue"))
                .sort()
                .map((file) => ({ file, sections: extractSections(fs.readFileSync(path.join(demoDir, file), "utf8")) }));
            return `export default ${JSON.stringify(entries)};`;
        },
        handleHotUpdate({ file, server }) {
            if (!file.startsWith(demoDir) || !file.endsWith("Demo.vue")) return;
            const mod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_MODULE_ID);
            if (!mod) return;
            server.moduleGraph.invalidateModule(mod);
            return [mod];
        }
    };
}
