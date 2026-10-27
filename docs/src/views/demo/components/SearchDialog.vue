<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { Search, CornerDownLeft, ArrowUp, ArrowDown, FileText, Settings, Puzzle, Zap } from "lucide-vue-next";
import searchEntries, { type DocsSearchSection } from "virtual:vort-docs-search";
import { demoPages } from "../../../demo-catalog";

interface SearchResultGroup {
    id: string;
    title: string;
    path: string;
    matches: DocsSearchSection[];
    score: number;
}

interface TextSegment {
    text: string;
    hit: boolean;
}

const router = useRouter();
const visible = ref(false);
const query = ref("");
const activeIndex = ref(0);
const inputRef = ref<HTMLInputElement | null>(null);
const resultListRef = ref<HTMLDivElement | null>(null);

// 标题与路由以 demo-catalog 为准；未登记的 Demo 文件不进入搜索。
const sectionsByFile = new Map(searchEntries.map((entry) => [entry.file, entry.sections]));
const searchIndex = demoPages.map((page) => ({
    id: page.path,
    title: page.title,
    path: `/${page.path}`,
    sections: sectionsByFile.get(page.file) ?? []
}));

const typeIcons: Record<string, typeof FileText> = {
    prop: Settings,
    event: Zap,
    slot: Puzzle
};

const results = computed<SearchResultGroup[]>(() => {
    const q = query.value.toLowerCase().trim();
    if (!q) return [];

    const groups: SearchResultGroup[] = [];
    for (const entry of searchIndex) {
        const title = entry.title.toLowerCase();
        const titleMatch = title.includes(q);
        const matches = entry.sections.filter((section) => section.text.toLowerCase().includes(q));
        if (!titleMatch && !matches.length) continue;

        let score = matches.length;
        if (titleMatch) score += 10;
        if (title.startsWith(q)) score += 5;
        groups.push({ id: entry.id, title: entry.title, path: entry.path, matches: matches.slice(0, 4), score });
    }
    return groups.sort((a, b) => b.score - a.score).slice(0, 10);
});

const flatItems = computed(() => {
    const items: { groupIndex: number; path: string; match?: DocsSearchSection }[] = [];
    results.value.forEach((group, groupIndex) => {
        if (!group.matches.length) items.push({ groupIndex, path: group.path });
        for (const match of group.matches) items.push({ groupIndex, path: group.path, match });
    });
    return items;
});

const itemIndex = (groupIndex: number, match?: DocsSearchSection) => flatItems.value.findIndex((item) => item.groupIndex === groupIndex && item.match === match);

// 拆成普通文本与命中片段渲染，不使用 v-html。
function highlight(text: string, q: string): TextSegment[] {
    const needle = q.trim().toLowerCase();
    if (!needle) return [{ text, hit: false }];
    const segments: TextSegment[] = [];
    const lower = text.toLowerCase();
    let cursor = 0;
    for (let index = lower.indexOf(needle); index !== -1; index = lower.indexOf(needle, cursor)) {
        if (index > cursor) segments.push({ text: text.slice(cursor, index), hit: false });
        segments.push({ text: text.slice(index, index + needle.length), hit: true });
        cursor = index + needle.length;
    }
    if (cursor < text.length) segments.push({ text: text.slice(cursor), hit: false });
    return segments;
}

function truncateAround(text: string, q: string, maxLen = 80): string {
    const index = text.toLowerCase().indexOf(q.trim().toLowerCase());
    if (index === -1 || text.length <= maxLen) return text;
    const start = Math.max(0, index - 20);
    const end = Math.min(text.length, index + q.length + 60);
    return `${start > 0 ? "..." : ""}${text.slice(start, end)}${end < text.length ? "..." : ""}`;
}

function open() {
    visible.value = true;
    query.value = "";
    activeIndex.value = 0;
    nextTick(() => inputRef.value?.focus());
}

function close() {
    visible.value = false;
    query.value = "";
}

function navigateTo(path: string) {
    router.push(path);
    close();
}

function scrollActiveIntoView() {
    nextTick(() => resultListRef.value?.querySelector(".search-item.active")?.scrollIntoView({ block: "nearest" }));
}

function handleKeydown(e: KeyboardEvent) {
    if (e.key === "ArrowDown") {
        e.preventDefault();
        activeIndex.value = Math.min(activeIndex.value + 1, flatItems.value.length - 1);
        scrollActiveIntoView();
    } else if (e.key === "ArrowUp") {
        e.preventDefault();
        activeIndex.value = Math.max(activeIndex.value - 1, 0);
        scrollActiveIntoView();
    } else if (e.key === "Enter") {
        e.preventDefault();
        const item = flatItems.value[activeIndex.value];
        if (item) navigateTo(item.path);
    }
}

watch(query, () => {
    activeIndex.value = 0;
});

function onGlobalKeydown(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (visible.value) close();
        else open();
    } else if (e.key === "Escape" && visible.value) {
        close();
    }
}

onMounted(() => document.addEventListener("keydown", onGlobalKeydown));
onUnmounted(() => document.removeEventListener("keydown", onGlobalKeydown));

defineExpose({ open, close });
</script>

<template>
    <Teleport to="body">
        <Transition name="search-fade">
            <div v-if="visible" class="search-overlay" @mousedown.self="close">
                <div class="search-dialog" role="dialog" aria-modal="true" aria-label="搜索文档" @keydown="handleKeydown">
                    <div class="search-input-wrapper">
                        <Search class="search-input-icon" />
                        <input
                            ref="inputRef"
                            v-model="query"
                            class="search-input"
                            placeholder="搜索组件、属性、事件、描述..."
                            spellcheck="false"
                            autocomplete="off"
                        />
                        <kbd class="search-kbd">ESC</kbd>
                    </div>

                    <div v-if="flatItems.length" ref="resultListRef" class="search-results">
                        <template v-for="(group, gi) in results" :key="group.id">
                            <div class="search-group-label">{{ group.title }}</div>
                            <div
                                v-if="!group.matches.length"
                                class="search-item"
                                :class="{ active: activeIndex === itemIndex(gi) }"
                                @click="navigateTo(group.path)"
                                @mouseenter="activeIndex = itemIndex(gi)"
                            >
                                <FileText class="search-item-icon" />
                                <span class="search-item-text">
                                    <template v-for="(segment, si) in highlight(group.title, query)" :key="si">
                                        <mark v-if="segment.hit" class="search-highlight">{{ segment.text }}</mark>
                                        <template v-else>{{ segment.text }}</template>
                                    </template>
                                </span>
                                <CornerDownLeft class="search-item-enter" />
                            </div>
                            <div
                                v-for="(match, mi) in group.matches"
                                v-else
                                :key="`${group.id}-${mi}`"
                                class="search-item"
                                :class="{ active: activeIndex === itemIndex(gi, match) }"
                                @click="navigateTo(group.path)"
                                @mouseenter="activeIndex = itemIndex(gi, match)"
                            >
                                <component :is="typeIcons[match.type] || FileText" class="search-item-icon" />
                                <div class="search-item-content">
                                    <span class="search-item-heading">{{ match.heading }}</span>
                                    <span class="search-item-text">
                                        <template v-for="(segment, si) in highlight(truncateAround(match.text, query), query)" :key="si">
                                            <mark v-if="segment.hit" class="search-highlight">{{ segment.text }}</mark>
                                            <template v-else>{{ segment.text }}</template>
                                        </template>
                                    </span>
                                </div>
                                <CornerDownLeft class="search-item-enter" />
                            </div>
                        </template>
                    </div>

                    <div v-else-if="query.trim()" class="search-empty">
                        <span>没有找到与 "{{ query }}" 相关的结果</span>
                    </div>

                    <div class="search-footer">
                        <div class="search-footer-item">
                            <span class="search-footer-keys">
                                <kbd><CornerDownLeft class="search-footer-icon" /></kbd>
                            </span>
                            <span>跳转</span>
                        </div>
                        <div class="search-footer-item">
                            <span class="search-footer-keys">
                                <kbd><ArrowUp class="search-footer-icon" /></kbd>
                                <kbd><ArrowDown class="search-footer-icon" /></kbd>
                            </span>
                            <span>导航</span>
                        </div>
                        <div class="search-footer-item">
                            <span class="search-footer-keys"><kbd>ESC</kbd></span>
                            <span>关闭</span>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.search-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: min(20vh, 160px);
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
}

.search-dialog {
    width: 100%;
    max-width: 580px;
    border-radius: 12px;
    background: var(--vort-bg-elevated, #fff);
    box-shadow:
        0 24px 48px rgba(0, 0, 0, 0.16),
        0 0 0 1px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    max-height: min(60vh, 480px);
}

.search-input-wrapper {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 18px;
    border-bottom: 1px solid var(--vort-border-secondary, #f0f0f0);
}

.search-input-icon {
    width: 20px;
    height: 20px;
    color: var(--vort-text-tertiary, #bbb);
    flex-shrink: 0;
}

.search-input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: 15px;
    color: var(--vort-text, #1a1a1a);
    line-height: 1.5;
}

.search-input::placeholder {
    color: var(--vort-text-quaternary, #ccc);
}

.search-kbd {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    padding: 2px 6px;
    border-radius: 4px;
    border: 1px solid var(--vort-border, #d9d9d9);
    background: var(--vort-bg, #fafafa);
    color: var(--vort-text-tertiary, #999);
    font-size: 11px;
    font-family: inherit;
    line-height: 1.4;
}

.search-results {
    overflow-y: auto;
    padding: 6px 8px;
    overscroll-behavior: contain;
}

.search-group-label {
    padding: 8px 10px 4px;
    font-size: 11px;
    font-weight: 600;
    color: var(--vort-text-tertiary, #999);
    letter-spacing: 0.04em;
    user-select: none;
}

.search-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 10px;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.1s;
}

.search-item:hover,
.search-item.active {
    background: var(--vort-primary-bg, #e8f0fe);
}

.search-item.active .search-item-enter {
    opacity: 1;
}

.search-item-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: var(--vort-text-tertiary, #999);
}

.search-item.active .search-item-icon {
    color: var(--vort-primary, #1456f0);
}

.search-item-content {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: baseline;
    gap: 8px;
}

.search-item-heading {
    flex-shrink: 0;
    font-size: 11px;
    font-weight: 500;
    color: var(--vort-text-tertiary, #999);
    padding: 1px 5px;
    border-radius: 3px;
    background: rgba(0, 0, 0, 0.04);
}

.search-item-text {
    flex: 1;
    min-width: 0;
    font-size: 13px;
    color: var(--vort-text-secondary, #666);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.search-item.active .search-item-text {
    color: var(--vort-text, #1a1a1a);
}

.search-highlight {
    background: rgba(255, 213, 0, 0.35);
    color: inherit;
    border-radius: 2px;
    padding: 0 1px;
}

.search-item-enter {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    color: var(--vort-text-quaternary, #ccc);
    opacity: 0;
    transition: opacity 0.1s;
}

.search-empty {
    padding: 32px 18px;
    text-align: center;
    font-size: 13px;
    color: var(--vort-text-tertiary, #999);
}

.search-footer {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 10px 18px;
    border-top: 1px solid var(--vort-border-secondary, #f0f0f0);
    background: var(--vort-bg, #fafafa);
}

.search-footer-item {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    color: var(--vort-text-tertiary, #999);
}

.search-footer-keys {
    display: flex;
    gap: 2px;
}

.search-footer-keys kbd {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 20px;
    height: 20px;
    padding: 0 4px;
    border-radius: 4px;
    border: 1px solid var(--vort-border, #d9d9d9);
    background: var(--vort-bg-elevated, #fff);
    font-size: 10px;
    font-family: inherit;
    color: var(--vort-text-secondary, #666);
}

.search-footer-icon {
    width: 12px;
    height: 12px;
}

.search-fade-enter-active {
    transition: opacity 0.15s ease;
}

.search-fade-enter-active .search-dialog {
    transition:
        opacity 0.15s ease,
        transform 0.15s ease;
}

.search-fade-leave-active {
    transition: opacity 0.1s ease;
}

.search-fade-leave-active .search-dialog {
    transition:
        opacity 0.1s ease,
        transform 0.1s ease;
}

.search-fade-enter-from,
.search-fade-leave-to {
    opacity: 0;
}

.search-fade-enter-from .search-dialog,
.search-fade-leave-to .search-dialog {
    opacity: 0;
    transform: scale(0.97) translateY(-8px);
}
</style>
