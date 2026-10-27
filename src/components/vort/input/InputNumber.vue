<script setup lang="ts" generic="T extends number | string = number">
import { computed, ref, shallowRef, watch, onMounted, onUnmounted, useSlots, useAttrs } from "vue";
import type { StyleValue } from "vue";
import { UpOutlined, DownOutlined } from "../icons";
import { useFormDisabled } from "../form/useFormDisabled";
import { useFormItemStatus } from "../form/useFormItemStatus";
import { useFormVariant } from "../form/useFormVariant";
import type { InputNumberProps } from "./types";
import Decimal from "decimal.js";

const D = Decimal.clone({ precision: 256, rounding: Decimal.ROUND_HALF_UP });

defineOptions({ name: "VortInputNumber", inheritAttrs: false });

/** Vort InputNumber - 数字输入框组件 */

const props = withDefaults(defineProps<InputNumberProps<T>>(), {
    step: 1,
    size: "middle",
    readOnly: false,
    bordered: true,
    controls: true,
    handleVisible: "auto",
    keyboard: true,
    stringMode: undefined,
    compact: false
});

const mergedDisabled = useFormDisabled(() => props.disabled);
const mergedStatus = useFormItemStatus(() => props.status);
const mergedVariant = useFormVariant(
    () => props.variant,
    () => props.bordered
);
const hasControls = computed(() => props.controls && !mergedDisabled.value && !props.readOnly);

const emit = defineEmits<{
    "update:modelValue": [value: T | null];
    change: [value: T | null];
    step: [value: T | null, info: { offset: number; type: "up" | "down" }];
    focus: [event: FocusEvent];
    blur: [event: FocusEvent];
    pressEnter: [event: KeyboardEvent];
}>();

const attrs = useAttrs();
const slots = useSlots();
const inputRef = ref<HTMLInputElement | null>(null);
const isFocused = ref(false);
const isHovered = ref(false);
const attrsStyle = computed<StyleValue | undefined>(() => attrs.style as StyleValue | undefined);

// 是否有 addon（前置/后置标签）
const hasAddon = computed(() => !!slots.addonBefore || !!slots.addonAfter);

// 内部显示值
const displayValue = ref("");

const inputStyle = computed(() => ({ "--_value-chars": Math.max(displayValue.value.length, 1) }));

// 当前数值
const innerValue = shallowRef<number | string | null>(props.modelValue ?? props.defaultValue ?? null);
const useString = computed(() => props.stringMode ?? (typeof props.modelValue === "string" || typeof props.defaultValue === "string"));
const externalValue = (value: number | string | null) => value as T | null;
const toValue = (value: Decimal): number | string | null => {
    if (!value.isFinite()) return null;
    if (useString.value) return value.toFixed();
    const number = value.toNumber();
    return Number.isFinite(number) ? number : null;
};
const decimalValue = (value: number | string | null | undefined): Decimal | null => {
    if (value == null || value === "") return null;
    try {
        const decimal = new D(value);
        return decimal.isFinite() ? decimal : null;
    } catch {
        return null;
    }
};

// 步进值
const stepNum = computed(() => {
    return (decimalValue(props.step) ?? new D(1)).toNumber();
});

// 精度计算
const getPrecision = (value: number | string): number => {
    try {
        return new D(value).decimalPlaces();
    } catch {
        return 0;
    }
};

const precision = computed(() => props.precision ?? Math.max(getPrecision(props.step), innerValue.value === null ? 0 : getPrecision(innerValue.value)));

const formatValue = (value: number | string | null): string => {
    if (value == null) return "";
    try {
        const number = new D(value);
        if (!number.isFinite()) return "";
        const formatted = number.toFixed(precision.value, Decimal.ROUND_HALF_UP);
        return props.formatter ? props.formatter(formatted) : formatted;
    } catch {
        return "";
    }
};

const parseValue = (value: string): number | string | null => {
    const parsed = String(props.parser ? props.parser(value) : value).trim();
    if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(parsed) || parsed.length > 128) return null;
    try {
        const number = new D(parsed);
        return number.isFinite() ? toValue(number) : null;
    } catch {
        return null;
    }
};

const clampValue = (value: number | string | null): number | string | null => {
    if (value == null) return null;
    try {
        let number = new D(value);
        if (!number.isFinite()) return null;
        if (props.min !== undefined) number = D.max(number, props.min);
        if (props.max !== undefined) number = D.min(number, props.max);
        return toValue(number.toDecimalPlaces(precision.value, Decimal.ROUND_HALF_UP));
    } catch {
        return null;
    }
};

// 监听 modelValue 变化
watch(
    () => props.modelValue,
    (newVal) => {
        innerValue.value = newVal ?? null;
        if (!isFocused.value) displayValue.value = formatValue(innerValue.value);
    },
    { immediate: true }
);

// 监听 innerValue 变化更新显示值
watch(
    () => innerValue.value,
    (newVal) => {
        if (!isFocused.value) displayValue.value = formatValue(newVal);
    }
);

// 初始化显示值
onMounted(() => {
    displayValue.value = formatValue(innerValue.value);
});

// 是否可以增加
const canIncrease = computed(() => {
    if (mergedDisabled.value || props.readOnly) return false;
    if (props.max === undefined) return true;
    const current = decimalValue(innerValue.value),
        max = decimalValue(props.max);
    return !current || !max || current.lt(max);
});

// 是否可以减少
const canDecrease = computed(() => {
    if (mergedDisabled.value || props.readOnly) return false;
    if (props.min === undefined) return true;
    const current = decimalValue(innerValue.value),
        min = decimalValue(props.min);
    return !current || !min || current.gt(min);
});

// ========== 类名计算（只负责切换状态类名）==========

/** Wrapper 类名 */
const wrapperClasses = computed(() => {
    const classes = ["vort-input-number", `vort-input-number-${props.size}`, `vort-input-number-${mergedVariant.value}`];

    if (mergedStatus.value) classes.push(`vort-input-number-${mergedStatus.value}`);
    if (mergedDisabled.value) classes.push("vort-input-number-disabled");
    if (hasControls.value) classes.push("vort-input-number-with-controls");
    if (props.handleVisible === true) classes.push("vort-input-number-controls-always");
    if (hasAddon.value) classes.push("vort-input-number-has-addon");
    if (slots.addonBefore) classes.push("vort-input-number-has-addon-before");
    if (slots.addonAfter) classes.push("vort-input-number-has-addon-after");
    if (props.compact) classes.push("vort-input-number-compact");
    if (isHovered.value || isFocused.value) classes.push("vort-input-number-active");
    if (!hasAddon.value && props.class) classes.push(props.class);

    return classes;
});

/** Addon 外层容器类名 */
const addonWrapperClasses = computed(() => {
    const classes = ["vort-input-number-addon-wrapper"];
    if (props.class) classes.push(props.class);
    return classes;
});

/** addonBefore 类名 */
const addonBeforeClasses = computed(() => {
    const classes = ["vort-input-number-addon", "vort-input-number-addon-before", `vort-input-number-addon-${props.size}`];
    if (props.compact) classes.push("vort-input-number-addon-compact");
    return classes;
});

/** addonAfter 类名 */
const addonAfterClasses = computed(() => {
    const classes = ["vort-input-number-addon", "vort-input-number-addon-after", `vort-input-number-addon-${props.size}`];
    if (props.compact) classes.push("vort-input-number-addon-compact");
    return classes;
});

/** 控制按钮类名 */
const getControlBtnClasses = (type: "up" | "down", enabled: boolean) => {
    const classes = ["vort-input-number-handler", `vort-input-number-handler-${type}`];
    if (!enabled) classes.push("vort-input-number-handler-disabled");
    return classes;
};

// ========== 事件处理 ==========

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    displayValue.value = target.value;
    // 输入过程中即时 emit，让外部依赖数值的联动校验 / 显示能实时响应，
    // 避免必须 blur 才能拿到最新值。min/max/precision 的规范化留到 change / blur 时统一处理。
    if (target.value === "" || target.value === "-") {
        if (innerValue.value !== null) {
            innerValue.value = null;
            emit("update:modelValue", null);
        }
        return;
    }
    const parsed = parseValue(target.value);
    if (parsed !== null && parsed !== innerValue.value) {
        innerValue.value = parsed;
        emit("update:modelValue", externalValue(parsed));
    }
};

const handleChange = () => {
    const parsed = parseValue(displayValue.value);
    const clamped = clampValue(parsed);
    innerValue.value = clamped;
    displayValue.value = formatValue(clamped);
    emit("update:modelValue", externalValue(clamped));
    emit("change", externalValue(clamped));
};

const handleFocus = (event: FocusEvent) => {
    isFocused.value = true;
    if (innerValue.value !== null) displayValue.value = String(innerValue.value);
    emit("focus", event);
};

const handleBlur = (event: FocusEvent) => {
    isFocused.value = false;
    handleChange();
    emit("blur", event);
};

const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
        handleChange();
        emit("pressEnter", event);
    }
    if (props.keyboard) {
        if (event.key === "ArrowUp") {
            event.preventDefault();
            handleStep("up");
        } else if (event.key === "ArrowDown") {
            event.preventDefault();
            handleStep("down");
        }
    }
};

// 步进操作
const handleStep = (type: "up" | "down") => {
    if (mergedDisabled.value || props.readOnly) return;
    if (type === "up" && !canIncrease.value) return;
    if (type === "down" && !canDecrease.value) return;

    const offset = type === "up" ? stepNum.value : -stepNum.value;
    const currentVal = decimalValue(innerValue.value) ?? new D(0);
    const delta = (decimalValue(props.step) ?? new D(1)).mul(type === "up" ? 1 : -1);
    const newVal = clampValue(currentVal.add(delta).toFixed());

    innerValue.value = newVal;
    displayValue.value = formatValue(newVal);
    emit("update:modelValue", externalValue(newVal));
    emit("change", externalValue(newVal));
    emit("step", externalValue(newVal), { offset, type });
};

// 长按支持
let longPressTimer: ReturnType<typeof setTimeout> | null = null;
let longPressInterval: ReturnType<typeof setInterval> | null = null;

const startLongPress = (type: "up" | "down") => {
    handleStep(type);
    longPressTimer = setTimeout(() => {
        longPressInterval = setInterval(() => handleStep(type), 50);
    }, 300);
};

const stopLongPress = () => {
    if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
    }
    if (longPressInterval) {
        clearInterval(longPressInterval);
        longPressInterval = null;
    }
};

onUnmounted(() => stopLongPress());

const handleMouseEnter = () => {
    isHovered.value = true;
};

const handleMouseLeave = () => {
    isHovered.value = false;
};

const handleWrapperClick = () => {
    if (!mergedDisabled.value) inputRef.value?.focus();
};

// 暴露方法
defineExpose({
    input: inputRef,
    focus: () => inputRef.value?.focus(),
    blur: () => inputRef.value?.blur()
});
</script>

<template>
    <!-- 有 addon 时需要外层容器 -->
    <span v-if="hasAddon" :class="addonWrapperClasses" :style="attrsStyle">
        <!-- 前置标签 -->
        <span v-if="$slots.addonBefore" :class="addonBeforeClasses">
            <slot name="addonBefore" />
        </span>

        <!-- 输入框主体 -->
        <span :class="wrapperClasses" @click="handleWrapperClick" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
            <!-- 前缀 -->
            <span v-if="$slots.prefix || prefix" class="vort-input-number-prefix">
                <slot name="prefix">{{ prefix }}</slot>
            </span>

            <!-- 输入框 -->
            <input
                ref="inputRef"
                type="text"
                inputmode="decimal"
                :value="displayValue"
                class="vort-input-number-input"
                :style="inputStyle"
                :disabled="mergedDisabled"
                :readonly="readOnly"
                :placeholder="placeholder"
                @input="handleInput"
                @change="handleChange"
                @focus="handleFocus"
                @blur="handleBlur"
                @keydown="handleKeydown"
            />

            <!-- 后缀内容 -->
            <span v-if="$slots.suffix" class="vort-input-number-suffix">
                <slot name="suffix" />
            </span>

            <!-- 控制按钮 -->
            <span v-if="hasControls" class="vort-input-number-handler-wrap">
                <span
                    :class="getControlBtnClasses('up', canIncrease)"
                    role="button"
                    aria-label="Increase Value"
                    @mousedown.prevent="canIncrease && startLongPress('up')"
                    @mouseup="stopLongPress"
                    @mouseleave="stopLongPress"
                >
                    <UpOutlined class="vort-input-number-handler-icon" />
                </span>
                <span
                    :class="getControlBtnClasses('down', canDecrease)"
                    role="button"
                    aria-label="Decrease Value"
                    @mousedown.prevent="canDecrease && startLongPress('down')"
                    @mouseup="stopLongPress"
                    @mouseleave="stopLongPress"
                >
                    <DownOutlined class="vort-input-number-handler-icon" />
                </span>
            </span>
        </span>

        <!-- 后置标签 -->
        <span v-if="$slots.addonAfter" :class="addonAfterClasses">
            <slot name="addonAfter" />
        </span>
    </span>

    <!-- 无 addon 时 -->
    <span v-else :class="wrapperClasses" :style="attrsStyle" @click="handleWrapperClick" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
        <!-- 前缀 -->
        <span v-if="$slots.prefix || prefix" class="vort-input-number-prefix">
            <slot name="prefix">{{ prefix }}</slot>
        </span>

        <!-- 输入框 -->
        <input
            ref="inputRef"
            type="text"
            inputmode="decimal"
            :value="displayValue"
            class="vort-input-number-input"
            :style="inputStyle"
            :disabled="mergedDisabled"
            :readonly="readOnly"
            :placeholder="placeholder"
            @input="handleInput"
            @change="handleChange"
            @focus="handleFocus"
            @blur="handleBlur"
            @keydown="handleKeydown"
        />

        <!-- 后缀内容 -->
        <span v-if="$slots.suffix" class="vort-input-number-suffix">
            <slot name="suffix" />
        </span>

        <!-- 控制按钮 -->
        <span v-if="hasControls" class="vort-input-number-handler-wrap">
            <span
                :class="getControlBtnClasses('up', canIncrease)"
                role="button"
                aria-label="Increase Value"
                @mousedown.prevent="canIncrease && startLongPress('up')"
                @mouseup="stopLongPress"
                @mouseleave="stopLongPress"
            >
                <UpOutlined class="vort-input-number-handler-icon" />
            </span>
            <span
                :class="getControlBtnClasses('down', canDecrease)"
                role="button"
                aria-label="Decrease Value"
                @mousedown.prevent="canDecrease && startLongPress('down')"
                @mouseup="stopLongPress"
                @mouseleave="stopLongPress"
            >
                <DownOutlined class="vort-input-number-handler-icon" />
            </span>
        </span>
    </span>
</template>

<style scoped>
/* ========================================
   CSS Variables（局部变量，可被状态类覆盖）
   ======================================== */

/* ========================================
   基础样式 - Wrapper
   ======================================== */
.vort-input-number {
    /* 局部变量 - 可被状态类覆盖 */
    --_border-color: var(--vort-border, #d9d9d9);
    --_focus-color: var(--vort-primary, #1456f0);
    --_focus-shadow: var(--vort-primary-shadow, rgba(20, 86, 240, 0.1));
    --_bg-color: #fff;
    --_input-padding: 11px;
    --_handler-width: 22px;
    --_handler-visible-width: 0px;
    --_handler-opacity: 0;
    --_handler-motion: var(--vort-motion-duration-mid, 200ms) var(--vort-motion-ease-in-out, cubic-bezier(0.645, 0.045, 0.355, 1));

    position: relative;
    display: inline-flex;
    align-items: center;
    width: 100%;
    border: 1px solid var(--_border-color);
    border-radius: var(--vort-radius, 6px);
    background: var(--_bg-color);
    cursor: text;
    overflow: hidden; /* 防止控制按钮超出圆角边界 */
    transition: var(--vort-transition-all, all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1));
}

/* ========================================
   交互状态 - Hover
   ======================================== */
.vort-input-number:hover:not(.vort-input-number-disabled) {
    border-color: var(--_focus-color);
}

/* ========================================
   交互状态 - Focus
   ======================================== */
.vort-input-number:focus-within:not(.vort-input-number-disabled) {
    border-color: var(--_focus-color);
    box-shadow: 0 0 0 2px var(--_focus-shadow);
}

/* ========================================
   状态覆盖 - Error
   ======================================== */
.vort-input-number-error {
    --_border-color: var(--vort-error, #ff4d4f);
    --_focus-color: var(--vort-error, #ff4d4f);
    --_focus-shadow: rgba(255, 77, 79, 0.06);
}

/* ========================================
   状态覆盖 - Warning
   ======================================== */
.vort-input-number-warning {
    --_border-color: var(--vort-warning, #faad14);
    --_focus-color: var(--vort-warning, #faad14);
    --_focus-shadow: rgba(250, 173, 20, 0.1);
}

/* ========================================
   状态覆盖 - Disabled
   ======================================== */
.vort-input-number-disabled {
    --_bg-color: rgba(0, 0, 0, 0.04);
    color: var(--vort-text-quaternary, rgba(0, 0, 0, 0.25));
    cursor: not-allowed;
}

/*
 * 与 Input 同因：`.vort-input-number-input` 自己声明了正常文本色，
 * 外层禁用色到不了它；原生 input 还要压住浏览器自带的禁用灰。
 */
.vort-input-number-disabled .vort-input-number-input {
    color: var(--vort-text-quaternary, rgba(0, 0, 0, 0.25));
    -webkit-text-fill-color: var(--vort-text-quaternary, rgba(0, 0, 0, 0.25));
    cursor: not-allowed;
}

/* ========================================
   形态变体 - Outlined（默认）
   ======================================== */
.vort-input-number-outlined {
    border: 1px solid var(--_border-color);
    background: var(--_bg-color);
}

/* ========================================
   形态变体 - Filled
   ======================================== */
.vort-input-number-filled {
    --_bg-color: rgba(0, 0, 0, 0.04);
    /* 步进器叠在输入区上方，需要不透明底色遮住长数值；取 0.06 灰叠白后的实色 */
    --_handler-bg: #f0f0f0;
    border: 1px solid transparent;
}

.vort-input-number-filled:hover:not(.vort-input-number-disabled) {
    --_bg-color: rgba(0, 0, 0, 0.06);
    border-color: transparent;
}

.vort-input-number-filled:focus-within:not(.vort-input-number-disabled) {
    --_bg-color: #fff;
    --_handler-bg: #fff;
    border-color: var(--_focus-color);
    box-shadow: none;
}

/* Filled + Error/Warning：状态色浅底，不显示边框，聚焦时白底 + 状态色边框（对齐 antd） */
.vort-input-number-filled.vort-input-number-error:not(.vort-input-number-disabled) {
    --_bg-color: var(--vort-error-bg, #fff2f0);
    --_handler-bg: var(--vort-error-bg, #fff2f0);
}

.vort-input-number-filled.vort-input-number-warning:not(.vort-input-number-disabled) {
    --_bg-color: var(--vort-warning-bg, #fffbe6);
    --_handler-bg: var(--vort-warning-bg, #fffbe6);
}

.vort-input-number-filled.vort-input-number-error:hover:not(.vort-input-number-disabled) {
    --_bg-color: var(--vort-error-bg-hover, #fff1f0);
    --_handler-bg: var(--vort-error-bg-hover, #fff1f0);
}

.vort-input-number-filled.vort-input-number-warning:hover:not(.vort-input-number-disabled) {
    --_bg-color: var(--vort-warning-bg-hover, #fff1b8);
    --_handler-bg: var(--vort-warning-bg-hover, #fff1b8);
}

.vort-input-number-filled.vort-input-number-error:focus-within:not(.vort-input-number-disabled),
.vort-input-number-filled.vort-input-number-warning:focus-within:not(.vort-input-number-disabled) {
    --_bg-color: #fff;
    --_handler-bg: #fff;
}

/* ========================================
   形态变体 - Borderless
   ======================================== */
.vort-input-number-borderless {
    border-color: transparent;
    background: transparent;
}

.vort-input-number-borderless:hover:not(.vort-input-number-disabled) {
    border-color: transparent;
}

/* 聚焦时显示 1px 边框，颜色随状态；鼠标点击与键盘聚焦都显示 */
.vort-input-number-borderless:focus-within:not(.vort-input-number-disabled) {
    border-color: var(--_focus-color);
    box-shadow: none;
}

/* Filled / Borderless 没有常显的状态边框，用状态色文字提示 */
.vort-input-number-filled.vort-input-number-error:not(.vort-input-number-disabled) .vort-input-number-input,
.vort-input-number-borderless.vort-input-number-error:not(.vort-input-number-disabled) .vort-input-number-input {
    color: var(--vort-error, #ff4d4f);
}

.vort-input-number-filled.vort-input-number-warning:not(.vort-input-number-disabled) .vort-input-number-input,
.vort-input-number-borderless.vort-input-number-warning:not(.vort-input-number-disabled) .vort-input-number-input {
    color: var(--vort-warning, #faad14);
}

/* ========================================
   形态变体 - Underlined
   ======================================== */
/* 四边保留 1px 透明边框、只给底边着色：切换形态时盒子尺寸不变，也不会从 border: none 的默认粗黑边过渡出来 */
.vort-input-number-underlined {
    border: 1px solid transparent;
    border-bottom-color: var(--_border-color);
    border-radius: 0;
    background: transparent;
}

.vort-input-number-underlined:hover:not(.vort-input-number-disabled) {
    border-color: transparent;
    border-bottom-color: var(--_focus-color);
}

.vort-input-number-underlined:focus-within:not(.vort-input-number-disabled) {
    border-color: transparent;
    border-bottom-color: var(--_focus-color);
    box-shadow: none;
}

.vort-input-number-underlined .vort-input-number-handler-wrap {
    border-radius: 0;
}

/* ========================================
   尺寸 - Large
   ======================================== */
.vort-input-number-large {
    height: var(--vort-height-lg, 40px);
    font-size: var(--vort-font-size-md, 16px);
}

.vort-input-number-large .vort-input-number-prefix {
    padding-left: 11px;
    padding-right: 7px;
}

.vort-input-number-large .vort-input-number-suffix {
    padding-left: 7px;
    padding-right: 11px;
}

/* ========================================
   尺寸 - Middle（默认）
   ======================================== */
.vort-input-number-middle {
    height: var(--vort-height-md, 32px);
    font-size: var(--vort-font-size-sm, 14px);
}

.vort-input-number-middle .vort-input-number-prefix {
    padding-left: 11px;
    padding-right: 7px;
}

.vort-input-number-middle .vort-input-number-suffix {
    padding-left: 7px;
    padding-right: 11px;
}

/* ========================================
   尺寸 - Small
   ======================================== */
.vort-input-number-small {
    --_input-padding: 7px;
    --_handler-width: 18px;
    height: var(--vort-height-sm, 24px);
    font-size: var(--vort-font-size-sm, 14px);
}

.vort-input-number-small .vort-input-number-prefix {
    padding-left: 7px;
    padding-right: 4px;
}

.vort-input-number-small .vort-input-number-suffix {
    padding-left: 4px;
    padding-right: 7px;
}

/* ========================================
   内部元素 - Input
   ======================================== */
.vort-input-number-input {
    --_input-padding-start: var(--_input-padding);
    --_input-padding-end: var(--_input-padding);
    flex: 1;
    box-sizing: border-box;
    /* 按当前字数保底，窄框里由后缀让位给步进器，值始终可见可输入；上限避免长值撑出外框 */
    min-width: min(calc(var(--_value-chars, 1) * 1ch + var(--_input-padding-start) + var(--_input-padding-end)), calc(100% - var(--_handler-visible-width)));
    height: 100%;
    padding: 0 var(--_input-padding-end) 0 var(--_input-padding-start);
    background: transparent;
    border: none;
    outline: none;
    color: var(--vort-text, rgba(0, 0, 0, 0.88));
}

.vort-input-number-input::placeholder {
    color: var(--vort-text-quaternary, rgba(0, 0, 0, 0.25));
    -webkit-text-fill-color: currentColor;
}

/* 有前缀时，input 不需要左 padding */
.vort-input-number:has(.vort-input-number-prefix) .vort-input-number-input {
    --_input-padding-start: 0px;
}

/* 有后缀时，input 不需要右 padding */
.vort-input-number:has(.vort-input-number-suffix) .vort-input-number-input {
    --_input-padding-end: 0px;
}

/* ========================================
   内部元素 - 前缀/后缀
   ======================================== */
.vort-input-number-prefix {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    color: var(--vort-text-quaternary, rgba(0, 0, 0, 0.25));
}

.vort-input-number-suffix {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex-shrink: 1;
    min-width: 0;
    height: 100%;
    overflow: hidden;
    white-space: nowrap;
    margin-right: var(--_handler-visible-width);
    transition: margin-right var(--_handler-motion);
    color: var(--vort-text-quaternary, rgba(0, 0, 0, 0.25));
}

/* 零宽占位撑满首行：放不下的后缀整体换到被裁掉的第二行，避免被切成半截贴边 */
.vort-input-number-suffix::before {
    content: "";
    height: 100%;
}

/* ========================================
   控制按钮容器
   ======================================== */
.vort-input-number-handler-wrap {
    position: absolute;
    inset-block: 0;
    right: 0;
    width: var(--_handler-visible-width);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    background: var(--_handler-bg, #fff);
    border-radius: 0 var(--vort-radius, 6px) var(--vort-radius, 6px) 0;
    overflow: hidden;
    opacity: var(--_handler-opacity);
    transition:
        width var(--_handler-motion),
        opacity var(--_handler-motion);
}

/* 步进器与后缀同步展开；禁用、只读、controls=false 时不占位 */
.vort-input-number-with-controls:is(:hover, :focus-within, .vort-input-number-active, .vort-input-number-controls-always) {
    --_handler-visible-width: var(--_handler-width);
    --_handler-opacity: 1;
}

/* ========================================
   控制按钮
   ======================================== */
.vort-input-number-handler {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 1px solid var(--vort-border, #d9d9d9);
    cursor: pointer;
    user-select: none;
    color: var(--vort-text-quaternary, rgba(0, 0, 0, 0.25));
    transition: all var(--vort-transition-colors, 0.1s);
}

.vort-input-number-handler-up {
    border-bottom: 1px solid var(--vort-border, #d9d9d9);
}

.vort-input-number-handler:hover:not(.vort-input-number-handler-disabled) {
    color: var(--vort-primary, #1456f0);
    background: var(--vort-primary-bg, #e8f0fe);
}

.vort-input-number-handler-disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.vort-input-number-handler-icon {
    font-size: 10px;
}

/* ========================================
   Addon - 外层容器
   ======================================== */
.vort-input-number-addon-wrapper {
    display: inline-flex;
    align-items: center;
    width: 100%;
}

/* ========================================
   Addon - 前置/后置标签
   ======================================== */
.vort-input-number-addon {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    background: rgba(0, 0, 0, 0.02);
    border: 1px solid var(--vort-border, #d9d9d9);
    color: var(--vort-text-secondary, rgba(0, 0, 0, 0.65));
}

.vort-input-number-addon-before {
    border-right: none;
    border-radius: var(--vort-radius, 6px) 0 0 var(--vort-radius, 6px);
}

.vort-input-number-addon-after {
    border-left: none;
    border-radius: 0 var(--vort-radius, 6px) var(--vort-radius, 6px) 0;
}

/* 前后置位里的无边框下拉框已有输入框外框，聚焦时不再画自己的边框 */
.vort-input-number-addon :deep(.vort-select-borderless.vort-select-focused:not(.vort-select-disabled)) {
    border-color: transparent;
}

/* Addon 尺寸 */
.vort-input-number-addon-large {
    height: var(--vort-height-lg, 40px);
    padding: 0 11px;
    font-size: var(--vort-font-size-md, 16px);
}

.vort-input-number-addon-middle {
    height: var(--vort-height-md, 32px);
    padding: 0 11px;
    font-size: var(--vort-font-size-sm, 14px);
}

.vort-input-number-addon-small {
    height: var(--vort-height-sm, 24px);
    padding: 0 7px;
    font-size: var(--vort-font-size-sm, 14px);
}

/* ========================================
   Addon - Compact 模式（适合放 Select 等组件）
   ======================================== */
.vort-input-number-addon-compact {
    padding: 0;
    background: rgba(0, 0, 0, 0.02);
    overflow: hidden;
    position: relative;
    transition: var(--vort-transition-colors, border-color 0.1s);
}

.vort-input-number-addon-compact:hover {
    border-color: var(--vort-primary, #1456f0);
    z-index: 1;
}

.vort-input-number-addon-compact:focus-within {
    border-color: var(--vort-primary, #1456f0);
    z-index: 1;
}

/* Compact 模式下子元素背景透明 */
.vort-input-number-addon-compact > :deep(*) {
    background: transparent !important;
}

/* ========================================
   有 Addon 时调整 Wrapper 圆角
   ======================================== */
.vort-input-number-has-addon-before {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

.vort-input-number-has-addon-after {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.vort-input-number-has-addon-before.vort-input-number-has-addon-after {
    border-radius: 0;
}

/* ========================================
   Compact 模式下的边框重叠
   ======================================== */
.vort-input-number-compact.vort-input-number-has-addon-before {
    margin-left: -1px;
}

.vort-input-number-compact:hover,
.vort-input-number-compact:focus-within {
    position: relative;
    z-index: 1;
}

.vort-input-number-addon-compact.vort-input-number-addon-after {
    margin-left: -1px;
}
</style>
