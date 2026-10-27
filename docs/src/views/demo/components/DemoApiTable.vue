<script setup lang="ts">
/**
 * Demo API 文档表格组件
 * 用于展示组件的 Props、Events、Slots 等 API 文档
 */

export interface PropItem {
    /** 属性名 */
    prop: string;
    /** 属性说明 */
    desc: string;
    /** 属性类型 */
    type: string;
    /** 默认值 */
    default: string;
}

export interface EventItem {
    /** 事件名 */
    event: string;
    /** 事件说明 */
    desc: string;
    /** 回调参数 */
    params: string;
}

export interface SlotItem {
    /** 插槽名 */
    slot?: string;
    /** 插槽名（别名） */
    name?: string;
    /** 插槽说明 */
    desc: string;
}

export interface MethodItem {
    /** 方法名 */
    method: string;
    /** 方法说明 */
    desc: string;
    /** 参数类型 */
    params: string;
}

interface Props {
    /** 表格标题 */
    title: string;
    /** 表格类型 */
    type: "props" | "events" | "slots" | "methods";
    /** 数据列表 */
    data: PropItem[] | EventItem[] | SlotItem[] | MethodItem[];
    /** 表格说明（可选） */
    description?: string;
}

defineProps<Props>();
type ApiItem = PropItem | EventItem | SlotItem | MethodItem;

// 根据类型获取表头配置
const getHeaders = (type: string) => {
    switch (type) {
        case "props":
            return [
                { key: "prop", label: "属性" },
                { key: "desc", label: "说明" },
                { key: "type", label: "类型" },
                { key: "default", label: "默认值" }
            ];
        case "events":
            return [
                { key: "event", label: "事件名" },
                { key: "desc", label: "说明" },
                { key: "params", label: "回调参数" }
            ];
        case "slots":
            return [
                { key: "slot", label: "插槽名" },
                { key: "desc", label: "说明" }
            ];
        case "methods":
            return [
                { key: "method", label: "方法名" },
                { key: "desc", label: "说明" },
                { key: "params", label: "参数" }
            ];
        default:
            return [];
    }
};

// 获取单元格内容（支持 slot/name 别名）
const getCellValue = (item: ApiItem, key: string): string => {
    const record = item as unknown as Partial<Record<string, string>>;
    if (key === "slot") {
        return record.slot || record.name || "";
    }
    return record[key] || "";
};

// 判断是否需要 code 格式
const needsCode = (key: string): boolean => {
    return ["prop", "event", "slot", "name", "method", "type", "default", "params"].includes(key);
};
</script>

<template>
    <div class="demo-api-section">
        <h3 class="demo-api-title">{{ title }}</h3>
        <p v-if="description" class="demo-api-desc">{{ description }}</p>
        <table class="demo-api-table">
            <thead>
                <tr>
                    <th v-for="header in getHeaders(type)" :key="header.key">
                        {{ header.label }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in data" :key="index">
                    <td v-for="header in getHeaders(type)" :key="header.key">
                        <code v-if="needsCode(header.key) && getCellValue(item, header.key)">
                            {{ getCellValue(item, header.key) }}
                        </code>
                        <template v-else>
                            {{ getCellValue(item, header.key) }}
                        </template>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
