<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from "vue";
import { Input } from "../input";
import { getVortPopupContainer, isEventInside, useZIndex } from "../composables";
import { useLocale } from "../locale/useLocale";
import { useFormDisabled } from "../form/useFormDisabled";
import { useFormVariant } from "../form/useFormVariant";
import type { FormVariant } from "../form/types";

defineOptions({ name: "VortAutoComplete" });

// 同一页面可能同时存在多个自动完成输入框。给最近打开的面板一个递增层级，
// 避免它被同级表单行或仍在离场动画中的旧面板覆盖。
let autoCompletePopupSequence = 0;

const { t: acT } = useLocale("AutoComplete");

// 使用 z-index 上下文，在 Dialog/Drawer 内时自动获得更高的层级
const zIndex = useZIndex("popup");

/** Vort AutoComplete - 自动完成组件 */

export interface AutoCompleteOption {
    /** 选项值 */
    value: string | number;
    /** 选项标签（显示文本），不传则使用 value */
    label?: string;
    /** 是否禁用 */
    disabled?: boolean;
}

type InputSize = "large" | "middle" | "small";
type InputStatus = "error" | "warning";

interface Props {
    /** 输入框内容（v-model） */
    modelValue?: string;
    /** 默认值 */
    defaultValue?: string;
    /** 选项数据源 */
    options?: AutoCompleteOption[];
    /** 输入框占位文本 */
    placeholder?: string;
    /** 输入框尺寸 */
    size?: InputSize;
    /** 输入框状态 */
    status?: InputStatus;
    /** 是否禁用 */
    disabled?: boolean;
    /** 形态变体；不传时依次回退 bordered、Form、ConfigProvider */
    variant?: FormVariant;
    /** 是否有边框（兼容旧用法，false 等同 variant="borderless"，优先使用 variant） */
    bordered?: boolean;
    /** 是否支持清除 */
    allowClear?: boolean;
    /** 自定义类名 */
    class?: string;
    /** 空数据时显示的内容 */
    notFoundContent?: string | null;
    /** 选项正在异步加载：没有可显示的选项时下拉展示加载提示，而不是空状态 */
    loading?: boolean;
    /**
     * 加载提示的延迟显示时间（毫秒）。加载在此时间内完成就不显示加载提示，面板直接以结果出现，
     * 避免快请求下「加载中」空态闪一下再缩成短列表；期间也不会把「无匹配」当结果展示。0 为立即显示
     */
    loadingDelay?: number;
    /** 聚焦时是否总是展开下拉。默认只在已有选项时展开；选项由聚焦触发异步加载的场景应开启，以便先展示加载中 / 空状态 */
    openOnFocus?: boolean;
    /** 是否根据输入项进行筛选，默认按 value 进行筛选 */
    filterOption?: boolean | ((inputValue: string, option: AutoCompleteOption) => boolean);
    /** 是否默认高亮第一个选项 */
    defaultActiveFirstOption?: boolean;
    /** 使浮层跟随滚动（默认 false） */
    autoAdjustOverflow?: boolean;
    /** 下拉菜单的最大高度 */
    listHeight?: number;
    /** 是否在选中后自动失焦 */
    autoBlur?: boolean;
    /** 选中后是否回填到输入框 */
    backfill?: boolean;
    /** 是否打开下拉菜单 */
    open?: boolean;
    /** 默认是否打开下拉菜单 */
    defaultOpen?: boolean;
    /** 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位 */
    getPopupContainer?: () => HTMLElement;
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: undefined,
    defaultValue: "",
    options: () => [],
    placeholder: undefined,
    size: "middle",
    bordered: true,
    allowClear: false,
    notFoundContent: undefined,
    loading: false,
    loadingDelay: 0,
    openOnFocus: false,
    filterOption: true,
    defaultActiveFirstOption: true,
    autoAdjustOverflow: true,
    listHeight: 256,
    autoBlur: false,
    backfill: false,
    open: undefined,
    defaultOpen: false
});

const mergedDisabled = useFormDisabled(() => props.disabled);
// 外层解析后显式传给内层 Input，避免内层再按自身 bordered 默认值判断
const mergedVariant = useFormVariant(
    () => props.variant,
    () => props.bordered
);

const popupContainer = computed(() => props.getPopupContainer?.() ?? getVortPopupContainer());
const resolvedPlaceholder = computed(() => props.placeholder ?? acT("placeholder"));

const emit = defineEmits<{
    "update:modelValue": [value: string];
    "update:open": [value: boolean];
    change: [value: string];
    search: [value: string];
    select: [value: string, option: AutoCompleteOption];
    focus: [event: FocusEvent];
    blur: [event: FocusEvent];
    clear: [];
    dropdownVisibleChange: [visible: boolean];
}>();

// ============ 组件状态 ============
const inputRef = ref<InstanceType<typeof Input> | null>(null);
const dropdownRef = ref<HTMLElement | null>(null);
const triggerRef = ref<HTMLElement | null>(null);
const isOpen = ref(props.defaultOpen);
const shouldRenderTeleport = ref(false); // 控制 Teleport 是否渲染，避免产生 <!--v-if--> 注释
const popupZIndex = ref(zIndex.value);
const innerValue = ref(props.modelValue ?? props.defaultValue ?? "");
const activeIndex = ref(-1);
const position = ref({ top: 0, left: 0, width: 0 });
const isFocused = ref(false);
const placement = ref<"top" | "bottom">("bottom");
const justSelected = ref(false); // 标记是否刚选择了选项，防止重新打开

// 空状态/加载状态是异步挂载的，面板高度可能在打开后才确定。
// 监听真实 DOM 尺寸，避免沿用打开前的估算高度。
let dropdownResizeObserver: ResizeObserver | null = null;

// ============ 受控/非受控模式 ============
const isControlledOpen = computed(() => props.open !== undefined);
const dropdownVisible = computed(() => {
    if (isControlledOpen.value) {
        return props.open;
    }
    return isOpen.value;
});

// ============ 过滤后的选项 ============
const filteredOptions = computed(() => {
    if (!props.filterOption || !innerValue.value) {
        return props.options;
    }

    const searchValue = innerValue.value.toLowerCase();

    const filterOption = props.filterOption;
    if (typeof filterOption === "function") {
        return props.options.filter((opt) => filterOption(innerValue.value, opt));
    }

    // 默认过滤逻辑：匹配 value 或 label
    return props.options.filter((opt) => {
        const label = (opt.label ?? String(opt.value)).toLowerCase();
        const value = String(opt.value).toLowerCase();
        return label.includes(searchValue) || value.includes(searchValue);
    });
});

// ============ 加载提示延迟显示 ============
const loadingDelayElapsed = ref(false);
let loadingDelayTimer: ReturnType<typeof setTimeout> | null = null;

const clearLoadingDelayTimer = () => {
    if (loadingDelayTimer !== null) {
        clearTimeout(loadingDelayTimer);
        loadingDelayTimer = null;
    }
};

watch(
    () => props.loading,
    (loading) => {
        clearLoadingDelayTimer();
        loadingDelayElapsed.value = false;
        if (!loading || props.loadingDelay <= 0) return;
        loadingDelayTimer = setTimeout(() => {
            loadingDelayTimer = null;
            loadingDelayElapsed.value = true;
        }, props.loadingDelay);
    },
    { immediate: true }
);

/** 加载提示是否该显示出来：没有延迟就跟随 loading，有延迟则要等过了阈值 */
const loadingShown = computed(() => props.loading && (props.loadingDelay <= 0 || loadingDelayElapsed.value));

// ============ 是否显示空状态（加载中也占用这块区域） ============
// 加载中且还没到延迟阈值时什么都不显示：此刻的「无匹配」不是结果，闪出来只会误导
const showEmpty = computed(() => {
    if (filteredOptions.value.length > 0) return false;
    if (props.loading) return loadingShown.value;
    return props.notFoundContent !== null;
});

const emptyText = computed(() => {
    if (loadingShown.value) return acT("loading");
    return props.notFoundContent ?? acT("no_match");
});

// ============ 监听 modelValue 变化 ============
watch(
    () => props.modelValue,
    (newVal) => {
        if (newVal !== undefined) {
            innerValue.value = newVal;
        }
    }
);

// 异步加载场景：下拉先以加载中展开，选项到达后再补上默认高亮
watch(
    () => filteredOptions.value.length,
    (count, prevCount) => {
        if (!dropdownVisible.value) return;
        if (prevCount === 0 && count > 0 && props.defaultActiveFirstOption) {
            activeIndex.value = 0;
        }
        // 列表条目更新后重新测量，未支持 ResizeObserver 时也能校正。
        nextTick(updatePosition);
    }
);

// ============ 计算下拉位置 ============
const updatePosition = () => {
    if (!triggerRef.value) return;

    const rect = triggerRef.value.getBoundingClientRect();
    // 挂载前仅预估位置；面板真正挂载及尺寸变化后会按实际高度校正。
    // offsetHeight 不受进入动画的缩放影响。
    // 不要用 transform 把整个面板向上移：进入动画也会改写 transform，二者会互相覆盖。
    const dropdownHeight = dropdownRef.value?.offsetHeight ?? Math.min(props.listHeight + 16, 300);
    const viewportHeight = window.innerHeight;

    let top = rect.bottom + 4;

    // 边界检测：如果下方空间不够，则显示在上方
    if (props.autoAdjustOverflow && top + dropdownHeight > viewportHeight) {
        // 向上弹出时直接设置面板顶部，给进入动画保留 transform 属性。
        placement.value = "top";
        top = Math.max(8, rect.top - dropdownHeight - 4);
    } else {
        placement.value = "bottom";
    }

    position.value = {
        top,
        left: rect.left,
        width: rect.width
    };
};

const stopDropdownResizeObserver = () => {
    dropdownResizeObserver?.disconnect();
    dropdownResizeObserver = null;
};

const observeDropdownSize = (dropdown: HTMLElement | null) => {
    stopDropdownResizeObserver();
    if (!dropdown || typeof ResizeObserver === "undefined") return;

    dropdownResizeObserver = new ResizeObserver(() => {
        // 面板离场后仍可能收到一次回调，避免用旧节点覆盖新状态。
        if (dropdownVisible.value && dropdownRef.value === dropdown) {
            updatePosition();
        }
    });
    dropdownResizeObserver.observe(dropdown, { box: "border-box" });
};

// Teleport 的面板在 loadingDelay 结束或异步结果变化后才会挂载，
// flush:'post' 确保测量发生在 DOM 更新之后。
watch(
    () => dropdownRef.value,
    (dropdown) => {
        observeDropdownSize(dropdown);
        if (dropdown && dropdownVisible.value) {
            updatePosition();
        }
    },
    { flush: "post" }
);

// ============ 打开/关闭下拉 ============
const openDropdown = () => {
    if (mergedDisabled.value) return;

    popupZIndex.value = zIndex.value + ++autoCompletePopupSequence;

    // 先计算位置，再打开下拉，避免动画从 (0,0) 开始
    updatePosition();

    shouldRenderTeleport.value = true; // 先渲染 Teleport
    if (!isControlledOpen.value) {
        isOpen.value = true;
    }
    emit("update:open", true);
    emit("dropdownVisibleChange", true);

    nextTick(() => {
        // 已有面板时按真实高度校正；延迟挂载由 dropdownRef 监听补齐。
        updatePosition();
        // 默认高亮第一个选项
        if (props.defaultActiveFirstOption && filteredOptions.value.length > 0) {
            activeIndex.value = 0;
        }
    });
};

const closeDropdown = () => {
    if (!isControlledOpen.value) {
        isOpen.value = false;
    }
    emit("update:open", false);
    emit("dropdownVisibleChange", false);
    activeIndex.value = -1;
    // 面板还没渲染出来（加载提示延迟期间）就关闭，不会有离开动画来触发卸载，这里直接收掉 Teleport
    if (filteredOptions.value.length === 0 && !showEmpty.value) {
        shouldRenderTeleport.value = false;
    }
};

// Transition 离开动画完成后移除 Teleport
const handleAfterLeave = () => {
    // 加载延迟可能暂时隐藏面板；仍打开时保留 Teleport，供结果到达后重新挂载。
    if (!dropdownVisible.value) {
        shouldRenderTeleport.value = false;
    }
};

// ============ 事件处理 ============
const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    innerValue.value = value;
    emit("update:modelValue", value);
    emit("change", value);
    emit("search", value);

    // 输入时打开下拉
    if (!dropdownVisible.value) {
        openDropdown();
    } else {
        // 更新位置和重置高亮
        updatePosition();
        if (props.defaultActiveFirstOption && filteredOptions.value.length > 0) {
            activeIndex.value = 0;
        } else {
            activeIndex.value = -1;
        }
    }
};

const handleFocus = (e: FocusEvent) => {
    isFocused.value = true;
    emit("focus", e);

    // 如果是刚选择完选项后的聚焦，不重新打开下拉
    if (justSelected.value) {
        justSelected.value = false;
        return;
    }

    // 聚焦时打开下拉：默认要有选项才弹；异步加载场景由 openOnFocus 放开，先弹出加载中 / 空状态
    if (props.options.length > 0 || props.openOnFocus) {
        openDropdown();
    }
};

const handleBlur = (e: FocusEvent) => {
    isFocused.value = false;
    emit("blur", e);

    // 延迟关闭，允许点击选项
    setTimeout(() => {
        if (!isFocused.value) {
            closeDropdown();
        }
    }, 150);
};

const handleClear = () => {
    innerValue.value = "";
    emit("update:modelValue", "");
    emit("change", "");
    emit("clear");
    inputRef.value?.focus();
};

const handleSelect = (option: AutoCompleteOption) => {
    if (option.disabled) return;

    // label 只负责下拉展示；选中后写回稳定的 value，避免业务标签混入表单数据。
    const value = String(option.value);

    innerValue.value = value;
    emit("update:modelValue", value);
    emit("change", value);
    emit("select", value, option);

    closeDropdown();

    if (props.autoBlur) {
        inputRef.value?.blur();
    } else {
        // 设置标志，防止 focus 事件重新打开下拉
        justSelected.value = true;
        inputRef.value?.focus();
    }
};

const handleOptionMouseEnter = (index: number) => {
    const option = filteredOptions.value[index];
    if (option && !option.disabled) {
        activeIndex.value = index;
    }
};

const handleKeydown = (e: KeyboardEvent) => {
    // 输入法组字时的上下键、回车用于选词和上屏，不拿来切换或选中候选项（判断同 Input 的 pressEnter）
    if (e.isComposing || e.keyCode === 229) return;
    if (!dropdownVisible.value) {
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            openDropdown();
            return;
        }
        return;
    }

    switch (e.key) {
        case "ArrowDown":
            e.preventDefault();
            navigateOptions(1);
            break;
        case "ArrowUp":
            e.preventDefault();
            navigateOptions(-1);
            break;
        case "Enter":
            e.preventDefault();
            if (activeIndex.value >= 0) {
                const option = filteredOptions.value[activeIndex.value];
                if (option && !option.disabled) {
                    handleSelect(option);
                }
            }
            break;
        case "Escape":
            e.preventDefault();
            closeDropdown();
            break;
    }
};

const navigateOptions = (direction: number) => {
    const options = filteredOptions.value;
    if (options.length === 0) return;

    let newIndex = activeIndex.value + direction;

    // 循环导航
    if (newIndex < 0) {
        newIndex = options.length - 1;
    } else if (newIndex >= options.length) {
        newIndex = 0;
    }

    // 跳过禁用选项
    const startIndex = newIndex;
    while (options[newIndex]?.disabled) {
        newIndex += direction;
        if (newIndex < 0) newIndex = options.length - 1;
        if (newIndex >= options.length) newIndex = 0;
        if (newIndex === startIndex) break; // 所有选项都禁用
    }

    activeIndex.value = newIndex;

    // backfill：将高亮选项回填到输入框
    const option = options[newIndex];
    if (props.backfill && option) {
        innerValue.value = String(option.value);
        emit("update:modelValue", innerValue.value);
    }

    // 滚动到可视区域
    scrollToOption(newIndex);
};

const scrollToOption = (index: number) => {
    nextTick(() => {
        const dropdown = dropdownRef.value;
        if (!dropdown) return;

        const items = dropdown.querySelectorAll(".vort-auto-complete-item");
        const item = items[index] as HTMLElement;
        if (!item) return;

        const dropdownRect = dropdown.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();

        if (itemRect.top < dropdownRect.top) {
            item.scrollIntoView({ block: "start" });
        } else if (itemRect.bottom > dropdownRect.bottom) {
            item.scrollIntoView({ block: "end" });
        }
    });
};

// ============ 点击外部关闭 ============
const handleClickOutside = (e: MouseEvent) => {
    if (isEventInside(e, triggerRef.value, dropdownRef.value)) {
        return;
    }
    closeDropdown();
};

// ============ 滚动/resize 时更新位置 ============
const handleScroll = () => {
    if (dropdownVisible.value) {
        updatePosition();
    }
};

// ============ 生命周期 ============
onMounted(() => {
    document.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleScroll);
});

onUnmounted(() => {
    clearLoadingDelayTimer();
    stopDropdownResizeObserver();
    document.removeEventListener("click", handleClickOutside);
    window.removeEventListener("scroll", handleScroll, true);
    window.removeEventListener("resize", handleScroll);
});

// ============ 样式类（简洁的类名切换） ============

/** 选项类名 */
const getItemClasses = (index: number, option: AutoCompleteOption) => {
    const classes = ["vort-auto-complete-item"];

    if (index === activeIndex.value && !option.disabled) {
        classes.push("vort-auto-complete-item-active");
    }
    if (option.disabled) {
        classes.push("vort-auto-complete-item-disabled");
    }

    return classes;
};

// ============ 暴露方法 ============
defineExpose({
    /** 聚焦输入框 */
    focus: () => inputRef.value?.focus(),
    /** 失焦输入框并收起下拉 */
    blur: () => {
        closeDropdown();
        inputRef.value?.blur();
    },
    /** 关闭下拉菜单 */
    close: closeDropdown,
    closeDropdown,
    /** 打开下拉菜单 */
    open: openDropdown,
    openDropdown,
    /** 获取输入框元素 */
    input: inputRef
});
</script>

<template>
    <div ref="triggerRef" class="vort-auto-complete" :class="props.class">
        <!-- 输入框 -->
        <Input
            ref="inputRef"
            :model-value="innerValue"
            :placeholder="resolvedPlaceholder"
            :size="size"
            :status="status"
            :disabled="mergedDisabled"
            :variant="mergedVariant"
            :allow-clear="allowClear"
            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"
            @keydown="handleKeydown"
            @clear="handleClear"
        >
            <template v-if="$slots.prefix" #prefix>
                <slot name="prefix" />
            </template>
            <template v-if="$slots.suffix" #suffix>
                <slot name="suffix" />
            </template>
        </Input>

        <!-- 下拉菜单 -->
        <Teleport v-if="shouldRenderTeleport" :to="popupContainer">
            <Transition :name="placement === 'top' ? 'vort-slide-down' : 'vort-slide-up'" appear @after-leave="handleAfterLeave">
                <div
                    v-if="dropdownVisible && (filteredOptions.length > 0 || showEmpty)"
                    ref="dropdownRef"
                    class="vort-auto-complete-dropdown"
                    :style="{
                        top: `${position.top}px`,
                        left: `${position.left}px`,
                        width: `${position.width}px`,
                        zIndex: popupZIndex
                    }"
                >
                    <div class="vort-auto-complete-list" :style="{ maxHeight: `${listHeight}px` }">
                        <!-- 选项列表 -->
                        <template v-if="filteredOptions.length > 0">
                            <div
                                v-for="(option, index) in filteredOptions"
                                :key="String(option.value)"
                                :class="getItemClasses(index, option)"
                                @click="handleSelect(option)"
                                @mouseenter="handleOptionMouseEnter(index)"
                            >
                                <!-- 自定义选项渲染 -->
                                <slot name="option" :option="option" :index="index">
                                    {{ option.label ?? option.value }}
                                </slot>
                            </div>
                        </template>

                        <!-- 空状态 / 加载中 -->
                        <div v-else-if="showEmpty" class="vort-auto-complete-empty">
                            <slot name="notFoundContent" :loading="loading">
                                {{ emptyText }}
                            </slot>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<style scoped>
/* ========================================
   基础样式
   ======================================== */
.vort-auto-complete {
    display: inline-block;
    width: 100%;
}

/* ========================================
   下拉面板
   ======================================== */
.vort-auto-complete-dropdown {
    position: fixed;
    background: #fff;
    border-radius: var(--vort-radius-lg, 8px);
    overflow: hidden;
    padding: 4px;
    box-shadow:
        0 6px 16px 0 rgba(0, 0, 0, 0.08),
        0 3px 6px -4px rgba(0, 0, 0, 0.12),
        0 9px 28px 8px rgba(0, 0, 0, 0.05);
}

/* ========================================
   选项列表
   ======================================== */
.vort-auto-complete-list {
    overflow-y: auto;
}

.vort-auto-complete-item {
    padding: 5px 12px;
    font-size: var(--vort-font-size-sm, 14px);
    color: var(--vort-text, rgba(0, 0, 0, 0.88));
    cursor: pointer;
    user-select: none;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border-radius: var(--vort-radius-sm, 4px);
    transition: background-color var(--vort-transition-colors, 0.15s);
}

.vort-auto-complete-item:hover:not(.vort-auto-complete-item-disabled) {
    background: rgba(0, 0, 0, 0.04);
}

.vort-auto-complete-item-active {
    background: rgba(0, 0, 0, 0.04);
}

.vort-auto-complete-item-disabled {
    color: var(--vort-text-quaternary, rgba(0, 0, 0, 0.25));
    cursor: not-allowed;
}

/* ========================================
   空状态
   ======================================== */
.vort-auto-complete-empty {
    padding: 24px 12px;
    text-align: center;
    font-size: var(--vort-font-size-sm, 14px);
    color: var(--vort-text-quaternary, rgba(0, 0, 0, 0.25));
}

/* ========================================
   动画 - 复用 motion.css 中的通用下拉动画
   ======================================== */
.vort-slide-up-enter-active {
    animation: vort-dropdown-slide-up-in var(--vort-duration-normal, 150ms) var(--vort-ease-decelerate, cubic-bezier(0, 0, 0.2, 1));
    transform-origin: top center;
}

.vort-slide-up-leave-active {
    animation: vort-dropdown-slide-up-out var(--vort-duration-normal, 150ms) var(--vort-ease-accelerate, cubic-bezier(0.4, 0, 1, 1));
    transform-origin: top center;
}

.vort-slide-down-enter-active {
    animation: vort-dropdown-slide-down-in var(--vort-duration-normal, 150ms) var(--vort-ease-decelerate, cubic-bezier(0, 0, 0.2, 1));
    transform-origin: bottom center;
}

.vort-slide-down-leave-active {
    animation: vort-dropdown-slide-down-out var(--vort-duration-normal, 150ms) var(--vort-ease-accelerate, cubic-bezier(0.4, 0, 1, 1));
    transform-origin: bottom center;
}

/* ========================================
   滚动条样式
   ======================================== */
.vort-auto-complete-list::-webkit-scrollbar {
    width: 6px;
}

.vort-auto-complete-list::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.15);
    border-radius: 3px;
}

.vort-auto-complete-list::-webkit-scrollbar-track {
    background: transparent;
}

/* ========================================
   响应用户"减少动画"偏好设置
   ======================================== */
@media (prefers-reduced-motion: reduce) {
    .vort-slide-up-enter-active,
    .vort-slide-up-leave-active,
    .vort-slide-down-enter-active,
    .vort-slide-down-leave-active {
        animation-duration: 0ms;
    }
}
</style>
