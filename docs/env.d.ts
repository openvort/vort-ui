/// <reference types="vite/client" />

declare module "*.vue" {
    import type { DefineComponent } from "vue";

    const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>;
    export default component;
}

declare module "virtual:vort-docs-search" {
    export interface DocsSearchSection {
        type: "description" | "demo" | "prop" | "event" | "slot" | "method" | "content";
        heading: string;
        text: string;
    }

    export interface DocsSearchEntry {
        file: string;
        sections: DocsSearchSection[];
    }

    const entries: DocsSearchEntry[];
    export default entries;
}

interface ImportMetaEnv {
    readonly VITE_DOCS_BASE?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
