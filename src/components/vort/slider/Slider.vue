<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount, nextTick } from "vue";
import { Tooltip } from "../tooltip";
import { useFormDisabled } from "../form/useFormDisabled";
import type { SliderComponentProps } from "./component-props";

type TooltipRef = { updatePosition?: () => void };

defineOptions({ name: "VortSlider" });

/** Vort Slider - 滑动输入条组件 */

const props = withDefaults(defineProps<SliderComponentProps>(), {
    min: 0,
    max: 100,
    step: 1,
    tooltip: true,
    range: false,
    vertical: false,
    reverse: false,
    included: true,
    dots: false
});

const mergedDisabled = useFormDisabled(() => props.disabled);

const emit = defineEmits<{
    "update:modelValue": [value: number | [number, number]];
    change: [value: number | [number, number]];
    afterChange: [value: number | [number, number]];
}>();

// 滑块容器和轨道引用
const railRef = ref<HTMLElement | null>(null);
const isDragging = ref(false);
const activeHandleIndex = ref<number | null>(null);

// 拖拽会话
let dragPointerId: number | null = null;
/** 按下手柄时指针相对手柄中心的偏移（百分比），拖动全程保持，按住手柄边缘也不会跳值 */
let dragOffsetPercent = 0;
/** 范围模式两个手柄重叠时，等第一次移动再按方向决定拖哪一个，否则会被另一个挡住拖不动 */
let overlapPending = false;
/** 拖动期间外部值有变化，松手后再同步 */
let modelChangedWhileDragging = false;

// 显示 Tooltip 状态
const showTooltip = ref<boolean[]>([false, false]);

// Tooltip 引用，用于强制更新位置
const tooltipRef0 = ref<TooltipRef | null>(null);
const tooltipRef1 = ref<TooltipRef | null>(null);

// 内部值
const internalValue = ref<[number, number]>([props.min, props.min]);

// 初始化值
const initValue = () => {
    if (props.modelValue === undefined) {
        internalValue.value = [props.min, props.min];
    } else if (props.range && Array.isArray(props.modelValue)) {
        internalValue.value = [props.modelValue[0], props.modelValue[1]];
    } else if (!props.range && typeof props.modelValue === "number") {
        internalValue.value = [props.min, props.modelValue];
    } else {
        internalValue.value = [props.min, props.min];
    }
};

initValue();

const applyModelValue = (newVal: SliderComponentProps["modelValue"]) => {
    if (newVal === undefined) {
        internalValue.value = [props.min, props.min];
    } else if (props.range && Array.isArray(newVal)) {
        internalValue.value = [newVal[0], newVal[1]];
    } else if (!props.range && typeof newVal === "number") {
        internalValue.value = [props.min, newVal];
    }
};

// 监听外部值变化
watch(
    () => props.modelValue,
    (newVal) => {
        // 拖动中以手上的值为准：父组件回写若滞后一拍，直接同步会把手柄拽回旧位置
        if (isDragging.value) {
            modelChangedWhileDragging = true;
            return;
        }
        applyModelValue(newVal);
    }
);

// 计算百分比
const getPercent = (value: number): number => {
    const percent = ((value - props.min) / (props.max - props.min)) * 100;
    return Math.max(0, Math.min(100, percent));
};

// 获取数字的小数位数
const getDecimalPlaces = (num: number): number => {
    const str = String(num);
    const decimalIndex = str.indexOf(".");
    return decimalIndex === -1 ? 0 : str.length - decimalIndex - 1;
};

// 根据百分比计算值
const getValueFromPercent = (percent: number): number => {
    let value = props.min + (percent / 100) * (props.max - props.min);

    // 步长处理
    if (props.step > 0) {
        const steps = Math.round((value - props.min) / props.step);
        value = props.min + steps * props.step;

        // 修正浮点数精度问题：根据 step 的小数位数进行四舍五入
        const decimals = getDecimalPlaces(props.step);
        const factor = Math.pow(10, decimals);
        value = Math.round(value * factor) / factor;
    }

    // 边界限制
    value = Math.max(props.min, Math.min(props.max, value));

    return value;
};

const clampPercent = (percent: number): number => Math.max(0, Math.min(100, percent));

// 指针在轨道上的百分比；不做边界限制，拖动时要先扣掉按下偏移再限制
const getPointerPercent = (e: PointerEvent): number => {
    if (!railRef.value) return 0;

    const rect = railRef.value.getBoundingClientRect();
    const total = props.vertical ? rect.height : rect.width;
    if (total <= 0) return 0;

    const offset = props.vertical ? rect.bottom - e.clientY : e.clientX - rect.left;
    const percent = (offset / total) * 100;

    return props.reverse ? 100 - percent : percent;
};

// 轨道样式（已填充部分）
const trackStyle = computed(() => {
    const [startValue, endValue] = internalValue.value;
    const startPercent = getPercent(props.range ? startValue : props.min);
    const endPercent = getPercent(endValue);

    if (props.vertical) {
        if (props.reverse) {
            return {
                top: `${startPercent}%`,
                height: `${endPercent - startPercent}%`,
                bottom: "auto"
            };
        } else {
            return {
                bottom: `${startPercent}%`,
                height: `${endPercent - startPercent}%`,
                top: "auto"
            };
        }
    } else {
        if (props.reverse) {
            return {
                right: `${startPercent}%`,
                width: `${endPercent - startPercent}%`,
                left: "auto"
            };
        } else {
            return {
                left: `${startPercent}%`,
                width: `${endPercent - startPercent}%`,
                right: "auto"
            };
        }
    }
});

// 手柄、步长点沿主轴的定位。用 transform 让自身中心对齐数值位置：
// 写死的负 margin 只对 left / bottom 定位生效，反向或垂直反向时会偏开半个手柄
const getAxisStyle = (percent: number): Record<string, string> => {
    if (props.vertical) {
        return props.reverse ? { top: `${percent}%`, transform: "translateY(-50%)" } : { bottom: `${percent}%`, transform: "translateY(50%)" };
    }
    return props.reverse ? { right: `${percent}%`, transform: "translateX(50%)" } : { left: `${percent}%`, transform: "translateX(-50%)" };
};

// 手柄位置
const getHandleStyle = (index: number) => {
    const value = internalValue.value[index] ?? 0;
    const percent = getPercent(value);

    return {
        ...getAxisStyle(percent),
        ...(props.vertical ? { left: "0", right: "auto" } : { top: "0", bottom: "auto" })
    };
};

// 写入某个手柄的新值。范围模式下两个手柄不交叉；值没变就不通知，拖动时少触发外部更新
const updateHandleValue = (index: number, value: number) => {
    const newValue = [...internalValue.value] as [number, number];

    if (props.range) {
        if (index === 0) {
            newValue[0] = Math.min(value, newValue[1]);
        } else {
            newValue[1] = Math.max(value, newValue[0]);
        }
    } else {
        newValue[1] = value;
    }

    if (newValue[0] === internalValue.value[0] && newValue[1] === internalValue.value[1]) return;

    internalValue.value = newValue;
    emitChange();

    // 强制更新 Tooltip 位置
    nextTick(() => {
        (index === 0 ? tooltipRef0 : tooltipRef1).value?.updatePosition?.();
    });
};

/**
 * 开始拖拽。
 *
 * 整个滑块（轨道、手柄、刻度）都在 pointerdown 时进入拖动：按在轨道上，最近的手柄先跳到按下位置，
 * 不松手可以继续拖；按在手柄上则不跳值，拖动时保持按下那一刻的偏移。
 * 指针被捕获到滑块上，拖出组件、移到画布 iframe 上或窗口外时，移动和松手事件仍然回到这里。
 */
const handlePointerDown = (e: PointerEvent) => {
    // 只响应主指针的左键，右键、中键和多指触控的其余手指不触发
    if (mergedDisabled.value || !e.isPrimary || e.button !== 0) return;
    // 上一次拖动没等到松手事件时先收尾，不能让滑块一直卡在拖动态
    if (isDragging.value) finishDrag();

    // 让当前聚焦的元素失焦，避免与其他输入组件（如 InputNumber）的焦点冲突
    if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
    }

    const pointerPercent = getPointerPercent(e);
    const handleEl = (e.target as Element).closest<HTMLElement>(".vort-slider-handle");
    let index: number;

    if (handleEl) {
        index = handleEl.dataset.index === "0" ? 0 : 1;
        dragOffsetPercent = pointerPercent - getPercent(internalValue.value[index] ?? props.min);
        overlapPending = props.range && internalValue.value[0] === internalValue.value[1];
    } else {
        const value = getValueFromPercent(clampPercent(pointerPercent));
        const [start, end] = internalValue.value;
        index = props.range && value < (start + end) / 2 ? 0 : 1;
        dragOffsetPercent = 0;
        overlapPending = false;
        updateHandleValue(index, value);
    }

    isDragging.value = true;
    activeHandleIndex.value = index;
    dragPointerId = e.pointerId;

    try {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
        // 指针已失效（如合成事件）时拿不到捕获，退回下面的 document 监听
    }

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("pointercancel", handlePointerUp);
};

// 拖拽中
const handlePointerMove = (e: PointerEvent) => {
    if (!isDragging.value || e.pointerId !== dragPointerId || activeHandleIndex.value === null) return;

    const value = getValueFromPercent(clampPercent(getPointerPercent(e) - dragOffsetPercent));

    if (overlapPending) {
        const shared = internalValue.value[0];
        if (value === shared) return;
        overlapPending = false;
        activeHandleIndex.value = value < shared ? 0 : 1;
    }

    updateHandleValue(activeHandleIndex.value, value);
};

const handlePointerUp = (e: PointerEvent) => {
    if (e.pointerId !== dragPointerId) return;
    finishDrag();
};

// 结束拖拽。pointerup 之后浏览器还会补发 lostpointercapture，这里需要可重入
const finishDrag = () => {
    if (!isDragging.value) return;

    document.removeEventListener("pointermove", handlePointerMove);
    document.removeEventListener("pointerup", handlePointerUp);
    document.removeEventListener("pointercancel", handlePointerUp);

    isDragging.value = false;
    // 重叠手柄拖动中可能换过手柄，两个提示都收起
    showTooltip.value = [false, false];
    activeHandleIndex.value = null;
    dragPointerId = null;
    overlapPending = false;

    if (modelChangedWhileDragging) {
        modelChangedWhileDragging = false;
        applyModelValue(props.modelValue);
    }

    emitAfterChange();
};

// 键盘控制
const handleKeyDown = (e: KeyboardEvent, index: number) => {
    if (mergedDisabled.value) return;

    const step = props.step || 1;
    let handled = false;

    const newValue = [...internalValue.value] as [number, number];

    switch (e.key) {
        case "ArrowLeft":
        case "ArrowDown":
            newValue[index] = Math.max(props.min, (newValue[index] ?? 0) - step);
            handled = true;
            break;
        case "ArrowRight":
        case "ArrowUp":
            newValue[index] = Math.min(props.max, (newValue[index] ?? 0) + step);
            handled = true;
            break;
        case "Home":
            newValue[index] = props.min;
            handled = true;
            break;
        case "End":
            newValue[index] = props.max;
            handled = true;
            break;
    }

    if (handled) {
        e.preventDefault();

        // 范围模式：确保两个手柄不交叉
        if (props.range) {
            if (index === 0) {
                newValue[0] = Math.min(newValue[0], newValue[1]);
            } else {
                newValue[1] = Math.max(newValue[1], newValue[0]);
            }
        }

        internalValue.value = newValue;
        emitChange();
        emitAfterChange();
    }
};

// 触发事件
const emitChange = () => {
    const value = props.range ? ([internalValue.value[0], internalValue.value[1]] as [number, number]) : internalValue.value[1];
    emit("update:modelValue", value);
    emit("change", value);
};

const emitAfterChange = () => {
    const value = props.range ? ([internalValue.value[0], internalValue.value[1]] as [number, number]) : internalValue.value[1];
    emit("afterChange", value);
};

// 格式化 Tooltip 显示内容
const formatTooltip = (value: number): string => {
    if (props.tipFormatter === null) return "";
    if (props.tipFormatter) return props.tipFormatter(value);
    return String(value);
};

// 解析标记
const parsedMarks = computed(() => {
    if (!props.marks) return [];

    return Object.keys(props.marks)
        .map((key) => {
            const value = Number(key);
            const mark = props.marks![value];

            if (typeof mark === "string") {
                return { value, label: mark };
            } else if (typeof mark === "object") {
                return { value, label: mark.label || String(value) };
            }
            return { value, label: String(value) };
        })
        .filter((mark) => mark.value >= props.min && mark.value <= props.max);
});

// 点样式
const dotStyle = (value: number) => getAxisStyle(getPercent(value));

// 计算步长点
const stepDots = computed(() => {
    // 只有开启 dots 时才显示所有步长点
    if (!props.dots) return [];

    const dots: number[] = [];
    const total = props.max - props.min;
    const count = Math.floor(total / props.step);

    for (let i = 0; i <= count; i++) {
        const value = props.min + i * props.step;
        if (value >= props.min && value <= props.max) {
            dots.push(value);
        }
    }

    return dots;
});

// 判断点是否激活
const isDotActive = (value: number): boolean => {
    const [start, end] = internalValue.value;
    if (props.included) {
        return value >= (props.range ? start : props.min) && value <= end;
    } else {
        return value === end || (props.range && value === start);
    }
};

// 显示 Tooltip 条件
const shouldShowTooltip = (index: number): boolean => {
    if (props.tooltip === false || props.tipFormatter === null) return false;
    if (props.tooltip === "always") return true;
    return showTooltip.value[index] || activeHandleIndex.value === index;
};

// 处理指针进入/离开手柄。
// 触屏没有悬停：用 mouseenter 的话，点按结束后浏览器补发的兼容鼠标事件会把提示重新打开且一直挂着
const handleHandlePointerEnter = (e: PointerEvent, index: number) => {
    if (mergedDisabled.value || isDragging.value || e.pointerType === "touch") return;
    showTooltip.value[index] = true;
};

const handleHandlePointerLeave = (index: number) => {
    if (mergedDisabled.value || isDragging.value) return;
    showTooltip.value[index] = false;
};

// 清理事件监听
onBeforeUnmount(() => {
    document.removeEventListener("pointermove", handlePointerMove);
    document.removeEventListener("pointerup", handlePointerUp);
    document.removeEventListener("pointercancel", handlePointerUp);
});

// 计算容器类名
const containerClass = computed(() => {
    const classes = ["vort-slider"];
    if (mergedDisabled.value) classes.push("vort-slider-disabled");
    if (props.vertical) classes.push("vort-slider-vertical");
    if (parsedMarks.value.length > 0) classes.push("vort-slider-with-marks");
    if (props.class) classes.push(props.class);
    return classes;
});
</script>

<template>
    <!-- mousedown.prevent：不抢焦点、不起文本选择；mousedown 照常冒泡，下拉等浮层的点外关闭不受影响 -->
    <div :class="containerClass" @pointerdown="handlePointerDown" @lostpointercapture="finishDrag" @mousedown.prevent>
        <div ref="railRef" class="vort-slider-rail">
            <!-- 轨道 -->
            <div class="vort-slider-track" :style="trackStyle" />

            <!-- 步长点 -->
            <template v-if="dots">
                <span
                    v-for="dot in stepDots"
                    :key="dot"
                    class="vort-slider-dot"
                    :class="{ 'vort-slider-dot-active': isDotActive(dot) }"
                    :style="dotStyle(dot)"
                />
            </template>

            <!-- 标记点 -->
            <template v-if="marks && !dots">
                <span
                    v-for="mark in parsedMarks"
                    :key="mark.value"
                    class="vort-slider-dot"
                    :class="{ 'vort-slider-dot-active': isDotActive(mark.value) }"
                    :style="dotStyle(mark.value)"
                />
            </template>

            <!-- 手柄 1（范围模式的起始手柄，或单值模式隐藏） -->
            <div
                v-if="range"
                class="vort-slider-handle"
                :class="{ 'vort-slider-handle-dragging': activeHandleIndex === 0 }"
                :style="getHandleStyle(0)"
                data-index="0"
                tabindex="0"
                role="slider"
                :aria-valuenow="internalValue[0]"
                :aria-valuemin="min"
                :aria-valuemax="max"
                :aria-disabled="mergedDisabled"
                @pointerenter="handleHandlePointerEnter($event, 0)"
                @pointerleave="handleHandlePointerLeave(0)"
                @keydown="handleKeyDown($event, 0)"
            >
                <Tooltip
                    v-if="tooltip !== false && tipFormatter !== null"
                    ref="tooltipRef0"
                    :open="shouldShowTooltip(0)"
                    :title="formatTooltip(internalValue[0])"
                    :placement="vertical ? 'right' : 'top'"
                    trigger="manual"
                    dark
                >
                    <div class="vort-slider-handle-inner" />
                </Tooltip>
                <div v-else class="vort-slider-handle-inner" />
            </div>

            <!-- 手柄 2（单值模式的唯一手柄，或范围模式的结束手柄） -->
            <div
                class="vort-slider-handle"
                :class="{ 'vort-slider-handle-dragging': activeHandleIndex === 1 }"
                :style="getHandleStyle(1)"
                data-index="1"
                tabindex="0"
                role="slider"
                :aria-valuenow="internalValue[1]"
                :aria-valuemin="min"
                :aria-valuemax="max"
                :aria-disabled="mergedDisabled"
                @pointerenter="handleHandlePointerEnter($event, 1)"
                @pointerleave="handleHandlePointerLeave(1)"
                @keydown="handleKeyDown($event, 1)"
            >
                <Tooltip
                    v-if="tooltip !== false && tipFormatter !== null"
                    ref="tooltipRef1"
                    :open="shouldShowTooltip(1)"
                    :title="formatTooltip(internalValue[1])"
                    :placement="vertical ? 'right' : 'top'"
                    trigger="manual"
                    dark
                >
                    <div class="vort-slider-handle-inner" />
                </Tooltip>
                <div v-else class="vort-slider-handle-inner" />
            </div>
        </div>

        <!-- 刻度标记 -->
        <div v-if="marks && parsedMarks.length > 0" class="vort-slider-marks">
            <span
                v-for="mark in parsedMarks"
                :key="mark.value"
                class="vort-slider-mark"
                :class="{ 'vort-slider-mark-active': isDotActive(mark.value) }"
                :style="dotStyle(mark.value)"
            >
                <span class="vort-slider-mark-text">{{ mark.label }}</span>
            </span>
        </div>
    </div>
</template>

<style scoped>
/* 容器 */
.vort-slider {
    position: relative;
    display: block;
    padding: 4px 0;
    cursor: pointer;
    touch-action: none;
    user-select: none;
}

.vort-slider-vertical {
    width: 12px;
    height: 100%;
    min-height: 100px;
    padding: 0 4px;
    display: inline-block;
}

.vort-slider-disabled {
    cursor: not-allowed;
}

/* 轨道容器 */
.vort-slider-rail {
    position: relative;
    width: 100%;
    height: 4px;
    background: rgba(0, 0, 0, 0.04);
    border-radius: 2px;
    transition: background-color 0.2s;
    user-select: none;
}

.vort-slider-vertical .vort-slider-rail {
    width: 4px;
    height: 100%;
}

.vort-slider:hover .vort-slider-rail {
    background: rgba(0, 0, 0, 0.06);
}

.vort-slider-disabled .vort-slider-rail {
    background: rgba(0, 0, 0, 0.04) !important;
}

/* 已填充轨道 */
.vort-slider-track {
    position: absolute;
    z-index: 1;
    height: 4px;
    background: var(--vort-primary);
    border-radius: 2px;
    transition: background-color 0.2s;
}

.vort-slider-vertical .vort-slider-track {
    width: 4px;
    height: auto;
}

.vort-slider:hover .vort-slider-track {
    background: var(--vort-primary-hover);
}

.vort-slider-disabled .vort-slider-track {
    background: rgba(0, 0, 0, 0.25) !important;
}

/* 手柄 */
.vort-slider-handle {
    position: absolute;
    z-index: 2;
    width: 14px;
    height: 14px;
    outline: none;
    cursor: pointer;
    user-select: none;
}

/* 水平模式定位（主轴居中由 getAxisStyle 的 transform 负责） */
.vort-slider:not(.vort-slider-vertical) .vort-slider-handle {
    top: 0;
    margin-top: -5px;
}

/* 垂直模式定位 */
.vort-slider-vertical .vort-slider-handle {
    left: 0;
    margin-left: -5px;
}

.vort-slider-handle :deep(.vort-tooltip-trigger) {
    display: block;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.vort-slider-handle-inner {
    width: 14px;
    height: 14px;
    background: #fff;
    border: 2px solid var(--vort-primary);
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    transition: all 0.2s;
    pointer-events: auto;
}

/* 拖动时指针被捕获到容器上、离开了手柄，仍保持悬停态 */
.vort-slider-handle:hover .vort-slider-handle-inner,
.vort-slider-handle-dragging .vort-slider-handle-inner {
    border-color: var(--vort-primary-hover);
    transform: scale(1.2);
}

.vort-slider-handle:focus .vort-slider-handle-inner {
    border-color: var(--vort-primary);
    box-shadow: 0 0 0 4px var(--vort-primary-shadow);
}

.vort-slider-disabled .vort-slider-handle {
    cursor: not-allowed;
}

.vort-slider-disabled .vort-slider-handle-inner {
    border-color: #d9d9d9;
    background: #fff;
    box-shadow: none;
}

.vort-slider-disabled .vort-slider-handle:hover .vort-slider-handle-inner {
    transform: none;
}

/* 步长点 */
.vort-slider-dot {
    position: absolute;
    z-index: 3;
    width: 8px;
    height: 8px;
    margin-top: -2px;
    background: #fff;
    border: 2px solid rgba(0, 0, 0, 0.06);
    border-radius: 50%;
    cursor: pointer;
}

.vort-slider-vertical .vort-slider-dot {
    margin-top: 0;
    margin-left: -2px;
}

.vort-slider-dot-active {
    border-color: var(--vort-primary);
}

.vort-slider-disabled .vort-slider-dot {
    cursor: not-allowed;
}

/* 刻度标记 */
.vort-slider-marks {
    position: absolute;
    top: 18px;
    left: 0;
    width: 100%;
}

.vort-slider-vertical .vort-slider-marks {
    top: 0;
    left: 18px;
    width: auto;
    height: 100%;
}

.vort-slider-mark {
    position: absolute;
    cursor: pointer;
}

.vort-slider-mark-text {
    position: absolute;
    display: inline-block;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    line-height: 1;
    white-space: nowrap;
    text-align: center;
    transform: translateX(-50%);
    cursor: pointer;
    user-select: none;
}

.vort-slider-vertical .vort-slider-mark-text {
    transform: translateY(-50%);
    margin-left: 4px;
}

.vort-slider-mark-active .vort-slider-mark-text {
    color: rgba(0, 0, 0, 0.88);
}

.vort-slider-disabled .vort-slider-mark-text {
    color: rgba(0, 0, 0, 0.25);
    cursor: not-allowed;
}

/* 带标记的滑块需要更多底部空间 */
.vort-slider-with-marks {
    margin-bottom: 28px;
}

.vort-slider-vertical.vort-slider-with-marks {
    margin-bottom: 0;
    margin-right: 28px;
}
</style>
