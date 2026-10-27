<script setup lang="ts">
import { computed, useSlots } from "vue";
import { CheckCircleFilled, CloseCircleFilled, EmptyOutlined, ExclamationCircleFilled, InfoCircleFilled, QuestionOutlined } from "../icons";
import { useLocale } from "../locale/useLocale";

defineOptions({ name: "VortResult" });

/** Vort Result - 结果与占位状态 */

/**
 * 占位状态。`error` / `403` / `404` 承载请求失败的三种语义，`empty` 承载「查得到但没有数据」——
 * 二者必须分开：把加载失败画成空态会让用户以为业务上真的没有数据，从此不再重试。
 */
type ResultStatus = "error" | "warning" | "info" | "success" | "empty" | "403" | "404";

interface Props {
    status?: ResultStatus;
    /** 主标题，留空时按 status 取内置文案 */
    title?: string;
    /** 副标题，通常放服务端返回的具体原因 */
    subTitle?: string;
    /** 紧凑留白，用于卡片与区块内的占位 */
    compact?: boolean;
    class?: string;
}

const props = withDefaults(defineProps<Props>(), {
    status: "info",
    compact: false
});

defineSlots<{
    /** 自定义图标 */
    icon?: () => unknown;
    /** 自定义主标题 */
    title?: () => unknown;
    /** 自定义副标题 */
    subTitle?: () => unknown;
    /** 操作区，放重试、返回等按钮 */
    extra?: () => unknown;
    /** 补充内容，位于操作区之上 */
    default?: () => unknown;
}>();

const { t } = useLocale("Result");
const slots = useSlots();

const iconComponents = {
    error: CloseCircleFilled,
    warning: ExclamationCircleFilled,
    info: InfoCircleFilled,
    success: CheckCircleFilled,
    empty: EmptyOutlined,
    "403": ExclamationCircleFilled,
    "404": QuestionOutlined
} as const;

const IconComponent = computed(() => iconComponents[props.status]);

// warning / info / success 没有内置文案：它们的标题完全取决于业务语境，猜一句只会更糟
const resolvedTitle = computed(() => {
    if (props.title) return props.title;
    switch (props.status) {
        case "error":
            return t("error");
        case "403":
            return t("forbidden");
        case "404":
            return t("not_found");
        case "empty":
            return t("empty");
        default:
            return "";
    }
});

const resultClasses = computed(() => {
    const classes = ["vort-result", `vort-result-${props.status}`];
    if (props.compact) classes.push("vort-result-compact");
    if (props.class) classes.push(props.class);
    return classes;
});

const hasTitle = computed(() => Boolean(resolvedTitle.value) || typeof slots.title === "function");
const hasSubTitle = computed(() => Boolean(props.subTitle) || typeof slots.subTitle === "function");
</script>

<template>
    <div :class="resultClasses">
        <div class="vort-result-icon">
            <slot name="icon">
                <component :is="IconComponent" />
            </slot>
        </div>

        <div v-if="hasTitle" class="vort-result-title">
            <slot name="title">{{ resolvedTitle }}</slot>
        </div>

        <div v-if="hasSubTitle" class="vort-result-subtitle">
            <slot name="subTitle">{{ subTitle }}</slot>
        </div>

        <div v-if="$slots.default" class="vort-result-content">
            <slot />
        </div>

        <div v-if="$slots.extra" class="vort-result-extra">
            <slot name="extra" />
        </div>
    </div>
</template>

<style scoped>
.vort-result {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 24px;
    text-align: center;
}

.vort-result-compact {
    padding: 24px 16px;
}

/* ========================================
   图标
   ======================================== */

.vort-result-icon {
    line-height: 1;
    font-size: 48px;
    color: var(--vort-text-quaternary, rgba(0, 0, 0, 0.25));
}

.vort-result-compact .vort-result-icon {
    font-size: 32px;
}

.vort-result-icon :deep(svg) {
    width: 1em;
    height: 1em;
}

.vort-result-error .vort-result-icon {
    color: var(--vort-error, #ff4d4f);
}

.vort-result-warning .vort-result-icon,
.vort-result-403 .vort-result-icon {
    color: var(--vort-warning, #faad14);
}

.vort-result-info .vort-result-icon {
    color: var(--vort-info, #1456f0);
}

.vort-result-success .vort-result-icon {
    color: var(--vort-success, #52c41a);
}

/* ========================================
   文字
   ======================================== */

.vort-result-title {
    margin-top: 16px;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    color: var(--vort-text, rgba(0, 0, 0, 0.88));
}

.vort-result-compact .vort-result-title {
    margin-top: 12px;
    font-size: 14px;
    line-height: 20px;
}

.vort-result-subtitle {
    margin-top: 8px;
    max-width: 480px;
    font-size: 14px;
    line-height: 22px;
    color: var(--vort-text-tertiary, rgba(0, 0, 0, 30%));
    /* 服务端文案长度不可控，超长时截断而不是把占位撑成一屏 */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    word-break: break-word;
}

.vort-result-content {
    margin-top: 16px;
    width: 100%;
}

.vort-result-extra {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 20px;
}

.vort-result-compact .vort-result-extra {
    margin-top: 12px;
}
</style>
