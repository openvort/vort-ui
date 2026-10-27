<script setup lang="ts">
import { computed, ref, useAttrs, useSlots, watch } from "vue";
import type { StyleValue } from "vue";
import { CloseCircleFilled } from "../icons";
import { useFormDisabled } from "../form/useFormDisabled";
import { useFormItemStatus } from "../form/useFormItemStatus";
import { useFormVariant } from "../form/useFormVariant";
import type { InputProps } from "./types";

defineOptions({ name: "VortInput", inheritAttrs: false });

/** Vort Input - 输入框组件 */

const props = withDefaults(defineProps<InputProps>(), {
    size: "middle",
    bordered: true,
    allowClear: false,
    showCount: false,
    compact: false,
    addonButtonMode: false
});

const mergedDisabled = useFormDisabled(() => props.disabled);
const mergedStatus = useFormItemStatus(() => props.status);

const emit = defineEmits<{
    "update:modelValue": [value: string];
    change: [event: Event];
    input: [event: Event];
    focus: [event: FocusEvent];
    blur: [event: FocusEvent];
    pressEnter: [event: KeyboardEvent];
    clear: [];
}>();

const attrs = useAttrs();
const slots = useSlots();
const inputRef = ref<HTMLInputElement | null>(null);
const isFocused = ref(false);
const attrsStyle = computed<StyleValue | undefined>(() => attrs.style as StyleValue | undefined);

/**
 * class、style、type 以外的 attrs 一律交给原生 input：调用方写的 @keyup / @keydown / @paste 等监听，
 * 以及 autocomplete、readonly、inputmode、id、aria-* 等原生属性。style 落在最外层，type 单独处理。
 * 模板渲染时现取而不用 computed：attrs 不是响应式对象，缓存可能拿到旧值。
 * 模板里写在内部绑定之前：同名属性以组件为准，同名监听两边都会执行。
 */
const nativeInputAttrs = () => {
    const { class: _class, style: _style, type: _type, ...rest } = attrs;
    return rest;
};

// 内部值
const innerValue = ref<string>(String(props.modelValue ?? props.defaultValue ?? ""));

// 监听 modelValue 变化
watch(
    () => props.modelValue,
    (newVal) => {
        if (newVal !== undefined) {
            innerValue.value = String(newVal ?? "");
        }
    }
);

// 是否启用清除能力（allowClear 且未禁用）
const shouldRenderClearButton = computed(() => props.allowClear && !mergedDisabled.value);

// 清除按钮只在有内容时才渲染：空值时不占位，placeholder 可用满整个输入宽度
const isClearButtonVisible = computed(() => shouldRenderClearButton.value && !!innerValue.value);

// 是否有前缀/后缀/清除按钮
const hasAffixes = computed(() => !!slots.prefix || !!slots.suffix || props.allowClear || props.showCount);

// 是否有 addon
const hasAddon = computed(() => !!slots.addonBefore || !!slots.addonAfter);

/*
 * 模板根节点按 hasAddon、hasAffixes 三选一：addon 外层容器、前后缀 wrapper、纯 input。
 * 每个分支都必须是单个元素，根级不要再包 <template> 或写注释：根节点成了 Fragment，
 * 父组件 scoped 样式的 data-v 属性就落不到这里，调用方传入的 class 只有全局样式能命中。
 */

/** 自定义计数时不能使用按源码长度截断的原生 maxlength。 */
const nativeMaxlength = computed(() => (props.countStrategy ? undefined : props.maxlength));
const valueLength = computed(() => props.countStrategy?.(innerValue.value) ?? innerValue.value.length);

// 字数统计文本
const countText = computed(() => {
    const len = valueLength.value;
    return props.maxlength !== undefined ? `${len} / ${props.maxlength}` : String(len);
});

const resolvedVariant = useFormVariant(
    () => props.variant,
    () => props.bordered
);

// ========== 类名计算（只负责切换状态类名）==========

/** Wrapper 类名 */
const wrapperClasses = computed(() => {
    const classes = ["vort-input-wrapper", `vort-input-${props.size}`, `vort-input-${resolvedVariant.value}`];

    if (mergedStatus.value) classes.push(`vort-input-${mergedStatus.value}`);
    if (mergedDisabled.value) classes.push("vort-input-disabled");
    if (hasAddon.value) classes.push("vort-input-has-addon");
    if (slots.addonBefore) classes.push("vort-input-has-addon-before");
    if (slots.addonAfter) classes.push("vort-input-has-addon-after");
    if (props.compact) classes.push("vort-input-compact");
    if (!hasAddon.value && props.class) classes.push(props.class);

    return classes;
});

/** Addon 外层容器类名 */
const addonWrapperClasses = computed(() => {
    const classes = ["vort-input-addon-wrapper"];
    if (props.class) classes.push(props.class);
    return classes;
});

/** addonBefore 类名 */
const addonBeforeClasses = computed(() => {
    const classes = ["vort-input-addon", "vort-input-addon-before", `vort-input-addon-${props.size}`];
    if (props.compact) classes.push("vort-input-addon-compact");
    return classes;
});

/** addonAfter 类名 */
const addonAfterClasses = computed(() => {
    const classes = ["vort-input-addon", "vort-input-addon-after", `vort-input-addon-${props.size}`];
    if (props.compact) classes.push("vort-input-addon-compact");
    if (props.addonButtonMode) classes.push("vort-input-addon-button");
    return classes;
});

/** 纯 Input 类名（无 wrapper 时使用） */
const inputOnlyClasses = computed(() => {
    const classes = ["vort-input", `vort-input-${props.size}`, `vort-input-${resolvedVariant.value}`];

    if (mergedStatus.value) classes.push(`vort-input-${mergedStatus.value}`);
    if (mergedDisabled.value) classes.push("vort-input-disabled");
    if (hasAddon.value) classes.push("vort-input-has-addon");
    if (slots.addonBefore) classes.push("vort-input-has-addon-before");
    if (slots.addonAfter) classes.push("vort-input-has-addon-after");
    if (props.compact) classes.push("vort-input-compact");
    if (!hasAddon.value && props.class) classes.push(props.class);

    return classes;
});

// ========== 事件处理 ==========

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (props.maxlength !== undefined && props.countStrategy && props.countStrategy(target.value) > props.maxlength) {
        target.value = innerValue.value;
        return;
    }
    innerValue.value = target.value;
    emit("update:modelValue", target.value);
    emit("input", event);
};

const handleChange = (event: Event) => {
    emit("change", event);
};

const handleFocus = (event: FocusEvent) => {
    isFocused.value = true;
    emit("focus", event);
};

const handleBlur = (event: FocusEvent) => {
    isFocused.value = false;
    emit("blur", event);
};

const handleKeydown = (event: KeyboardEvent) => {
    // 输入法组字时的回车只是上屏，不算回车提交；Safari 上屏回车的 isComposing 已是 false，靠 keyCode 229 识别
    if (event.key !== "Enter" || event.isComposing || event.keyCode === 229) return;
    emit("pressEnter", event);
};

const handleClear = (event: MouseEvent) => {
    event.stopPropagation();
    innerValue.value = "";
    emit("update:modelValue", "");
    // 构造合成 change 事件（对齐 Ant Design / Element Plus 行为）：
    // 参考 rc-input 做法，基于原 event 创建新对象并克隆 input 节点置空 value，
    // 既能让监听 @change 的业务方通过 event.target.value 读到清空后的值，
    // 又不会污染原始 MouseEvent 或真实 DOM 节点
    let changeEvent: Event = event;
    if (inputRef.value) {
        const cloneTarget = inputRef.value.cloneNode(true) as HTMLInputElement;
        cloneTarget.value = "";
        changeEvent = Object.create(event, {
            target: { value: cloneTarget, writable: false, configurable: true, enumerable: true },
            currentTarget: { value: cloneTarget, writable: false, configurable: true, enumerable: true }
        }) as Event;
    }
    emit("change", changeEvent);
    emit("clear");
    inputRef.value?.focus();
};

const handleWrapperClick = () => {
    if (!mergedDisabled.value) {
        inputRef.value?.focus();
    }
};

// 暴露方法
defineExpose({
    input: inputRef,
    focus: () => inputRef.value?.focus(),
    blur: () => inputRef.value?.blur()
});
</script>

<template>
    <span v-if="hasAddon" :class="addonWrapperClasses" :style="attrsStyle">
        <!-- 前置标签 -->
        <span v-if="$slots.addonBefore" :class="addonBeforeClasses">
            <slot name="addonBefore" />
        </span>

        <!-- 有前后缀时使用 wrapper -->
        <span v-if="hasAffixes" :class="wrapperClasses" @click="handleWrapperClick">
            <!-- 前缀 -->
            <span v-if="$slots.prefix" class="vort-input-prefix">
                <slot name="prefix" />
            </span>

            <!-- 输入框 -->
            <input
                ref="inputRef"
                v-bind="nativeInputAttrs()"
                :type="(attrs.type as string) || 'text'"
                :value="innerValue"
                class="vort-input-inner"
                :disabled="mergedDisabled"
                :placeholder="placeholder"
                :maxlength="nativeMaxlength"
                @input="handleInput"
                @change="handleChange"
                @focus="handleFocus"
                @blur="handleBlur"
                @keydown="handleKeydown"
            />

            <!-- 后缀区域 -->
            <span v-if="isClearButtonVisible || showCount || $slots.suffix" class="vort-input-suffix">
                <!-- 清除按钮 -->
                <span
                    v-if="isClearButtonVisible"
                    class="vort-input-clear"
                    role="button"
                    tabindex="-1"
                    @click="handleClear"
                    @mousedown.prevent
                >
                    <CloseCircleFilled />
                </span>
                <slot name="suffix" />
                <span v-if="showCount" class="vort-input-count">{{ countText }}</span>
            </span>
        </span>

        <!-- 无前后缀时直接渲染 input -->
        <input
            v-else
            ref="inputRef"
            v-bind="nativeInputAttrs()"
            :type="(attrs.type as string) || 'text'"
            :value="innerValue"
            :class="inputOnlyClasses"
            :disabled="mergedDisabled"
            :placeholder="placeholder"
            :maxlength="nativeMaxlength"
            @input="handleInput"
            @change="handleChange"
            @focus="handleFocus"
            @blur="handleBlur"
            @keydown="handleKeydown"
        />

        <!-- 后置标签 -->
        <span v-if="$slots.addonAfter" :class="addonAfterClasses">
            <slot name="addonAfter" />
        </span>
    </span>
    <span v-else-if="hasAffixes" :class="wrapperClasses" :style="attrsStyle" @click="handleWrapperClick">
        <!-- 前缀 -->
        <span v-if="$slots.prefix" class="vort-input-prefix">
            <slot name="prefix" />
        </span>

        <!-- 输入框 -->
        <input
            ref="inputRef"
            v-bind="nativeInputAttrs()"
            :type="(attrs.type as string) || 'text'"
            :value="innerValue"
            class="vort-input-inner"
            :disabled="mergedDisabled"
            :placeholder="placeholder"
            :maxlength="nativeMaxlength"
            @input="handleInput"
            @change="handleChange"
            @focus="handleFocus"
            @blur="handleBlur"
            @keydown="handleKeydown"
        />

        <!-- 后缀区域 -->
        <span v-if="isClearButtonVisible || showCount || $slots.suffix" class="vort-input-suffix">
            <!-- 清除按钮 -->
            <span
                v-if="isClearButtonVisible"
                class="vort-input-clear"
                role="button"
                tabindex="-1"
                @click="handleClear"
                @mousedown.prevent
            >
                <CloseCircleFilled />
            </span>
            <slot name="suffix" />
            <span v-if="showCount" class="vort-input-count">{{ countText }}</span>
        </span>
    </span>
    <input
        v-else
        ref="inputRef"
        v-bind="nativeInputAttrs()"
        :type="(attrs.type as string) || 'text'"
        :value="innerValue"
        :class="inputOnlyClasses"
        :style="attrsStyle"
        :disabled="mergedDisabled"
        :placeholder="placeholder"
        :maxlength="nativeMaxlength"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
    />
</template>

<style scoped>
/* ========================================
   CSS Variables（局部变量，可被状态类覆盖）
   使用 --_ 前缀表示私有变量
   ======================================== */

/* ========================================
   基础样式 - Wrapper
   ======================================== */
.vort-input-wrapper {
    /* 局部变量 - 可被状态类覆盖 */
    --_border-color: var(--vort-border, #d9d9d9);
    --_focus-color: var(--vort-primary, #1456f0);
    --_focus-shadow: var(--vort-primary-shadow, rgba(20, 86, 240, 0.1));
    --_bg-color: #fff;

    display: inline-flex;
    align-items: center;
    width: 100%;
    border: 1px solid var(--_border-color);
    border-radius: var(--vort-radius, 6px);
    background: var(--_bg-color);
    cursor: text;
    transition: var(--vort-transition-all, all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1));
}

/* ========================================
   基础样式 - 纯 Input（无 wrapper）
   ======================================== */
.vort-input {
    --_border-color: var(--vort-border, #d9d9d9);
    --_focus-color: var(--vort-primary, #1456f0);
    --_focus-shadow: var(--vort-primary-shadow, rgba(20, 86, 240, 0.1));
    --_bg-color: #fff;

    width: 100%;
    border: 1px solid var(--_border-color);
    border-radius: var(--vort-radius, 6px);
    background: var(--_bg-color);
    color: var(--vort-text, rgba(0, 0, 0, 0.88));
    outline: none;
    transition: var(--vort-transition-all, all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1));
}

.vort-input::placeholder,
.vort-input-inner::placeholder {
    color: var(--vort-text-quaternary, rgba(0, 0, 0, 0.25));
    /* 占位文字使用自身颜色，避免继承禁用切换时 input 的文字填充色过渡。 */
    -webkit-text-fill-color: currentColor;
}

/* ========================================
   交互状态 - Hover
   ======================================== */
.vort-input-wrapper:hover:not(.vort-input-disabled) {
    border-color: var(--_focus-color);
}

.vort-input:hover:not(.vort-input-disabled) {
    border-color: var(--_focus-color);
}

/* ========================================
   交互状态 - Focus
   ======================================== */
.vort-input-wrapper:focus-within:not(.vort-input-disabled) {
    border-color: var(--_focus-color);
    box-shadow: 0 0 0 2px var(--_focus-shadow);
}

.vort-input:focus:not(.vort-input-disabled) {
    border-color: var(--_focus-color);
    box-shadow: 0 0 0 2px var(--_focus-shadow);
}

/* ========================================
   状态覆盖 - Error
   ======================================== */
.vort-input-error {
    --_border-color: var(--vort-error, #ff4d4f);
    --_focus-color: var(--vort-error, #ff4d4f);
    --_focus-shadow: rgba(255, 77, 79, 0.06);
}

/* ========================================
   状态覆盖 - Warning
   ======================================== */
.vort-input-warning {
    --_border-color: var(--vort-warning, #faad14);
    --_focus-color: var(--vort-warning, #faad14);
    --_focus-shadow: rgba(250, 173, 20, 0.1);
}

/* ========================================
   状态覆盖 - Disabled
   ======================================== */
.vort-input-disabled {
    --_bg-color: rgba(0, 0, 0, 0.04);
    color: var(--vort-text-quaternary, rgba(0, 0, 0, 0.25));
    cursor: not-allowed;
}

/*
 * 同一个禁用色还得再落到原生 input 上：`.vort-input-inner` 自己声明了正常文本色，
 * wrapper 上那条到不了它，禁用输入框里的值会照常按正常色渲染。
 *
 * `-webkit-text-fill-color` 一并写死——浏览器对 `input:disabled` 另有一套自己的灰，
 * 只给 color 的话最终显示的是谁取决于浏览器，各平台还不一致。
 */
.vort-input-disabled .vort-input-inner,
input.vort-input-disabled {
    color: var(--vort-text-quaternary, rgba(0, 0, 0, 0.25));
    -webkit-text-fill-color: var(--vort-text-quaternary, rgba(0, 0, 0, 0.25));
    cursor: not-allowed;
}

/* ========================================
   尺寸 - Large
   ======================================== */
.vort-input-large {
    height: var(--vort-height-lg, 40px);
    font-size: var(--vort-font-size-md, 16px);
}

.vort-input-large .vort-input-inner {
    padding: 0 11px;
}

.vort-input-large .vort-input-prefix {
    padding-left: 11px;
    padding-right: 7px;
}

.vort-input-large .vort-input-suffix {
    padding-left: 7px;
    padding-right: 11px;
}

/* ========================================
   尺寸 - Middle（默认）
   ======================================== */
.vort-input-middle {
    height: var(--vort-height-md, 32px);
    font-size: var(--vort-font-size-sm, 14px);
}

.vort-input-middle .vort-input-inner {
    padding: 0 11px;
}

.vort-input-middle .vort-input-prefix {
    padding-left: 11px;
    padding-right: 7px;
}

.vort-input-middle .vort-input-suffix {
    padding-left: 7px;
    padding-right: 11px;
}

/* ========================================
   尺寸 - Small
   ======================================== */
.vort-input-small {
    height: var(--vort-height-sm, 24px);
    font-size: var(--vort-font-size-sm, 14px);
}

.vort-input-small .vort-input-inner {
    padding: 0 7px;
}

.vort-input-small .vort-input-prefix {
    padding-left: 7px;
    padding-right: 4px;
}

.vort-input-small .vort-input-suffix {
    padding-left: 4px;
    padding-right: 7px;
}

/* ========================================
   纯 Input 尺寸（无 wrapper）
   ======================================== */
.vort-input.vort-input-large {
    padding: 6.5px 11px;
}

.vort-input.vort-input-middle {
    padding: 4px 11px;
}

.vort-input.vort-input-small {
    padding: 0 7px;
}

/* ========================================
   形态变体 - Outlined（默认）
   ======================================== */
.vort-input-outlined {
    border: 1px solid var(--_border-color);
    background: var(--_bg-color);
}

/* ========================================
   形态变体 - Filled
   ======================================== */
.vort-input-filled {
    --_bg-color: rgba(0, 0, 0, 0.04);
    border: 1px solid transparent;
}

.vort-input-filled:hover:not(.vort-input-disabled) {
    --_bg-color: rgba(0, 0, 0, 0.06);
    border-color: transparent;
}

.vort-input-filled:focus-within:not(.vort-input-disabled),
.vort-input.vort-input-filled:focus:not(.vort-input-disabled) {
    --_bg-color: #fff;
    border-color: var(--_focus-color);
    box-shadow: none;
}

/* Filled + Error/Warning：状态色浅底，不显示边框，聚焦时白底 + 状态色边框（对齐 antd） */
.vort-input-filled.vort-input-error:not(.vort-input-disabled) {
    --_bg-color: var(--vort-error-bg, #fff2f0);
}

.vort-input-filled.vort-input-warning:not(.vort-input-disabled) {
    --_bg-color: var(--vort-warning-bg, #fffbe6);
}

.vort-input-filled.vort-input-error:hover:not(.vort-input-disabled) {
    --_bg-color: var(--vort-error-bg-hover, #fff1f0);
}

.vort-input-filled.vort-input-warning:hover:not(.vort-input-disabled) {
    --_bg-color: var(--vort-warning-bg-hover, #fff1b8);
}

.vort-input-filled.vort-input-error:focus-within:not(.vort-input-disabled),
.vort-input.vort-input-filled.vort-input-error:focus:not(.vort-input-disabled),
.vort-input-filled.vort-input-warning:focus-within:not(.vort-input-disabled),
.vort-input.vort-input-filled.vort-input-warning:focus:not(.vort-input-disabled) {
    --_bg-color: #fff;
}

/* ========================================
   形态变体 - Borderless
   ======================================== */
.vort-input-borderless {
    border: 1px solid transparent;
    background: transparent;
}

.vort-input-borderless:hover:not(.vort-input-disabled) {
    border-color: transparent;
}

/* 聚焦时显示 1px 边框，颜色随状态；鼠标点击与键盘聚焦都显示 */
.vort-input-borderless:focus-within:not(.vort-input-disabled),
.vort-input.vort-input-borderless:focus:not(.vort-input-disabled) {
    background: transparent;
    border-color: var(--_focus-color);
    box-shadow: none;
}

/* Filled / Borderless 没有常显的状态边框，用状态色文字提示 */
input.vort-input.vort-input-filled.vort-input-error:not(.vort-input-disabled),
.vort-input-filled.vort-input-error:not(.vort-input-disabled) .vort-input-inner,
input.vort-input.vort-input-borderless.vort-input-error:not(.vort-input-disabled),
.vort-input-borderless.vort-input-error:not(.vort-input-disabled) .vort-input-inner {
    color: var(--vort-error, #ff4d4f);
}

input.vort-input.vort-input-filled.vort-input-warning:not(.vort-input-disabled),
.vort-input-filled.vort-input-warning:not(.vort-input-disabled) .vort-input-inner,
input.vort-input.vort-input-borderless.vort-input-warning:not(.vort-input-disabled),
.vort-input-borderless.vort-input-warning:not(.vort-input-disabled) .vort-input-inner {
    color: var(--vort-warning, #faad14);
}

/* ========================================
   形态变体 - Underlined
   ======================================== */
/* 四边保留 1px 透明边框、只给底边着色：切换形态时盒子尺寸不变，也不会从 border: none 的默认粗黑边过渡出来 */
.vort-input-underlined {
    border: 1px solid transparent;
    border-bottom-color: var(--_border-color);
    border-radius: 0;
    background: transparent;
}

.vort-input-underlined:hover:not(.vort-input-disabled) {
    border-color: transparent;
    border-bottom-color: var(--_focus-color);
}

.vort-input-underlined:focus-within:not(.vort-input-disabled),
.vort-input.vort-input-underlined:focus:not(.vort-input-disabled) {
    border-color: transparent;
    border-bottom-color: var(--_focus-color);
    box-shadow: none;
}

/* ========================================
   内部元素 - Input Inner
   ======================================== */
.vort-input-inner {
    flex: 1;
    min-width: 0;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
    color: var(--vort-text, rgba(0, 0, 0, 0.88));
}

/* 有前缀时，input 不需要左 padding */
.vort-input-wrapper:has(.vort-input-prefix) .vort-input-inner {
    padding-left: 0;
}

/* 有后缀时，input 不需要右 padding */
.vort-input-wrapper:has(.vort-input-suffix) .vort-input-inner {
    padding-right: 0;
}

/* ========================================
   内部元素 - 前缀/后缀
   ======================================== */
.vort-input-prefix {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    color: var(--vort-text-quaternary, rgba(0, 0, 0, 0.25));
}

.vort-input-suffix {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    gap: 4px;
    color: var(--vort-text-quaternary, rgba(0, 0, 0, 0.25));
}

/* ========================================
   内部元素 - 清除按钮
   ======================================== */
.vort-input-clear {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: var(--vort-text-quaternary, rgba(0, 0, 0, 0.25));
    cursor: pointer;
    transition: color var(--vort-transition-colors, 0.1s);
}

.vort-input-clear:hover {
    color: var(--vort-text-tertiary, rgba(0, 0, 0, 0.45));
}

/* ========================================
   内部元素 - 字数统计
   ======================================== */
.vort-input-count {
    font-size: 12px;
    color: var(--vort-text-quaternary, rgba(0, 0, 0, 0.25));
    white-space: nowrap;
}

/* ========================================
   Addon - 外层容器
   ======================================== */
.vort-input-addon-wrapper {
    display: inline-flex;
    align-items: center;
    width: 100%;
}

/* ========================================
   Addon - 前置/后置标签
   ======================================== */
.vort-input-addon {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    background: rgba(0, 0, 0, 0.02);
    border: 1px solid var(--vort-border, #d9d9d9);
    color: var(--vort-text-secondary, rgba(0, 0, 0, 0.65));
}

.vort-input-addon-before {
    /* 仅隐藏宽度，保留边框颜色供 compact 模式恢复，避免退回 currentColor */
    border-right-width: 0;
    border-radius: var(--vort-radius, 6px) 0 0 var(--vort-radius, 6px);
}

.vort-input-addon-after {
    border-left-width: 0;
    border-radius: 0 var(--vort-radius, 6px) var(--vort-radius, 6px) 0;
}

/* 前后置位里的无边框下拉框已有输入框外框，聚焦时不再画自己的边框 */
.vort-input-addon :deep(.vort-select-borderless.vort-select-focused:not(.vort-select-disabled)) {
    border-color: transparent;
}

/* Addon 尺寸 */
.vort-input-addon-large {
    height: var(--vort-height-lg, 40px);
    padding: 0 11px;
    font-size: var(--vort-font-size-md, 16px);
}

.vort-input-addon-middle {
    height: var(--vort-height-md, 32px);
    padding: 0 11px;
    font-size: var(--vort-font-size-sm, 14px);
}

.vort-input-addon-small {
    height: var(--vort-height-sm, 24px);
    padding: 0 7px;
    font-size: var(--vort-font-size-sm, 14px);
}

/* ========================================
   Addon - Compact 模式（适合放 Select 等组件）
   ======================================== */
.vort-input-addon-compact {
    padding: 0;
    background: rgba(0, 0, 0, 0.02);
    overflow: hidden;
    position: relative;
    z-index: 1;
    transition: var(--vort-transition-colors, border-color 0.1s);
}

.vort-input-addon-compact:hover {
    border-color: var(--vort-primary, #1456f0);
    z-index: 3;
}

.vort-input-addon-compact:focus-within {
    border-color: var(--vort-primary, #1456f0);
    z-index: 3;
}

/* Compact 模式下子元素背景透明 */
.vort-input-addon-compact > :deep(*) {
    background: transparent !important;
}

/* ========================================
   Addon - Button 模式（适合放 Button 组件）
   透明容器，无 padding、无背景、无边框
   ======================================== */
.vort-input-addon-button {
    padding: 0;
    background: transparent;
    border: none;
    height: auto;
}

/* ========================================
   有 Addon 时调整 Wrapper 圆角
   ======================================== */
.vort-input-has-addon-before {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

.vort-input-has-addon-after {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.vort-input-has-addon-before.vort-input-has-addon-after {
    border-radius: 0;
}

/* ========================================
   Compact 模式下的边框重叠
   参考 InputSearch：让 addon 负 margin 覆盖输入框边框，
   hover/focus 时通过 z-index 提升完整边框
   ======================================== */
.vort-input-compact {
    position: relative;
    z-index: 2;
}

.vort-input-compact:hover,
.vort-input-compact:focus-within {
    z-index: 3;
}

.vort-input-addon-compact.vort-input-addon-before {
    border-right-width: 1px;
    border-right-style: solid;
    margin-right: -1px;
}

.vort-input-addon-compact.vort-input-addon-after {
    border-left-width: 1px;
    border-left-style: solid;
    margin-left: -1px;
}
</style>
