<script lang="ts">
import type { FormVariant } from "../form/types";

// ============ 导出类型 ============
export interface CascaderOption {
    /** 选项值 */
    value: string | number;
    /** 选项标签 */
    label: string;
    /** 子选项 */
    children?: CascaderOption[];
    /** 是否禁用 */
    disabled?: boolean;
    /** 是否是叶子节点 */
    isLeaf?: boolean;
}

export type CascaderValue = (string | number)[];
export type CascaderMultipleValue = CascaderValue[];

/** 选中项回填策略 */
export type ShowCheckedStrategy = "SHOW_CHILD" | "SHOW_PARENT";

/** 策略常量 */
export const SHOW_CHILD: ShowCheckedStrategy = "SHOW_CHILD";
export const SHOW_PARENT: ShowCheckedStrategy = "SHOW_PARENT";

type CascaderSize = "large" | "middle" | "small";
type CascaderStatus = "error" | "warning";
type CascaderExpandTrigger = "click" | "hover";

interface Props {
    /** 选中的值 (v-model) - 单选时为数组，多选时为二维数组 */
    modelValue?: CascaderValue | CascaderMultipleValue;
    /** 控制下拉面板展开（受控模式）。不传时为非受控模式 */
    open?: boolean;
    /** 选项列表 */
    options?: CascaderOption[];
    /** 选择框占位文本 */
    placeholder?: string;
    /** 选择框大小 */
    size?: CascaderSize;
    /** 是否禁用 */
    disabled?: boolean;
    /** 设置校验状态 */
    status?: CascaderStatus;
    /** 形态变体；不传时依次回退 Form、ConfigProvider */
    variant?: FormVariant;
    /** 自定义类名 */
    class?: string;
    /** 是否支持多选 */
    multiple?: boolean;
    /** 是否支持搜索 */
    showSearch?: boolean;
    /** 是否支持清除 */
    allowClear?: boolean;
    /** 次级菜单的展开方式 */
    expandTrigger?: CascaderExpandTrigger;
    /** 是否在选中项后清空搜索框 */
    autoClearSearchValue?: boolean;
    /** 空数据时显示的内容 */
    notFoundContent?: string;
    /** 下拉菜单的最大高度 */
    listHeight?: number;
    /** 选择完成后是否关闭弹窗（仅单选有效） */
    changeOnSelect?: boolean;
    /** 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位 */
    getPopupContainer?: () => HTMLElement;
    /** 用于显示的字段名 */
    fieldNames?: {
        label?: string;
        value?: string;
        children?: string;
    };
    /** 最多显示多少个 tag */
    maxTagCount?: number;
    /** 隐藏 tag 时显示的内容 */
    maxTagPlaceholder?: string | ((omittedValues: CascaderOption[][]) => string);
    /** 自定义显示值的函数 */
    displayRender?: (labels: string[], selectedOptions: CascaderOption[]) => string;
    /** 定义选中项回填的方式 */
    showCheckedStrategy?: ShowCheckedStrategy;
    /** 关闭时是否销毁弹出层 DOM */
    destroyPopupOnHide?: boolean;
    /** 多选模式下是否允许点击整行直接选中 */
    selectOnItemClickInMultiple?: boolean;
}

export type { Props as CascaderProps };
</script>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { CloseCircleFilled, CloseOutlined, DownOutlined, RightOutlined } from "../icons";
import { Checkbox } from "../checkbox";
import { getVortPopupContainer, isEventInside, useZIndex } from "../composables";
import { useLocale } from "../locale/useLocale";
import { useFormDisabled } from "../form/useFormDisabled";
import { useFormItemStatus } from "../form/useFormItemStatus";
import { useFormVariant } from "../form/useFormVariant";

defineOptions({ name: "VortCascader" });

const { t: casT } = useLocale("Cascader");

// 使用 z-index 上下文，在 Dialog/Drawer 内时自动获得更高的层级
const zIndex = useZIndex("popup");

/** Vort Cascader - 级联选择器组件 */

const props = withDefaults(defineProps<Props>(), {
    modelValue: undefined,
    options: () => [],
    placeholder: undefined,
    size: "middle",
    status: undefined,
    multiple: false,
    showSearch: false,
    allowClear: false,
    expandTrigger: "click",
    autoClearSearchValue: true,
    notFoundContent: undefined,
    listHeight: 180,
    changeOnSelect: false,
    fieldNames: () => ({ label: "label", value: "value", children: "children" }),
    maxTagCount: undefined,
    maxTagPlaceholder: undefined,
    displayRender: undefined,
    showCheckedStrategy: "SHOW_CHILD",
    destroyPopupOnHide: false,
    selectOnItemClickInMultiple: true
});

const placeholder = computed(() => props.placeholder ?? casT("placeholder"));
const notFoundContent = computed(() => props.notFoundContent ?? casT("no_data"));

const mergedDisabled = useFormDisabled(() => props.disabled);
const mergedStatus = useFormItemStatus(() => props.status);
const mergedVariant = useFormVariant(() => props.variant);

const emit = defineEmits<{
    "update:modelValue": [value: CascaderValue | CascaderMultipleValue | undefined];
    change: [value: CascaderValue | CascaderMultipleValue | undefined, selectedOptions: CascaderOption[] | CascaderOption[][]];
    "update:open": [open: boolean];
    openChange: [open: boolean];
    search: [value: string];
    clear: [];
    focus: [event: FocusEvent];
    blur: [event: FocusEvent];
}>();

// ============ 组件状态 ============
const isOpen = ref(false);

const shouldRenderTeleport = ref(false); // 控制 Teleport 是否渲染，避免产生 <!--v-if--> 注释
const searchValue = ref("");
const isHovered = ref(false);
const isFocused = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);
const triggerRef = ref<HTMLElement | null>(null);
const dropdownRef = ref<HTMLElement | null>(null);
const lastTriggerRect = ref<DOMRect | null>(null);
const popupContainer = computed(() => props.getPopupContainer?.() ?? getVortPopupContainer());

// 监听下拉面板尺寸变化（“边选边展开”会动态改变宽高）
let resizeObserver: ResizeObserver | null = null;
let adjustRafId = 0;

// 当前展开的路径（存储每一级选中的值）
const expandedPath = ref<(string | number)[]>([]);
// 临时选择路径（用于追踪当前悬停/点击路径）
const hoverPath = ref<(string | number)[]>([]);
/**
 * 面板实际展示的路径：悬停展开时以悬停路径为准。
 * 点击、复选都要按它取父级，否则在 hover 模式下点到的子项会拼到上次点击的旧父级后面。
 */
const activePath = computed(() => (hoverPath.value.length > 0 ? hoverPath.value : expandedPath.value));

// 下拉框位置
const dropdownPosition = ref({ top: 0, left: 0, width: 0 });

// 空状态没有列宽支撑，面板会收缩到只剩文案宽度，因此对齐触发器宽度
const emptyStyle = computed(() => ({ minWidth: `${dropdownPosition.value.width}px` }));

// ============ 字段名映射 ============
const labelField = computed(() => props.fieldNames.label || "label");
const valueField = computed(() => props.fieldNames.value || "value");
const childrenField = computed(() => props.fieldNames.children || "children");

// ============ 获取选项属性的辅助函数 ============
const getOptionLabel = (option: CascaderOption): string => {
    // CascaderOption is a loose tree node; narrow via unknown for dynamic field access
    const v = (option as unknown as Record<string, unknown>)[labelField.value];
    return v == null || v === "" ? "" : String(v);
};

const getOptionValue = (option: CascaderOption): string | number => {
    return (option as unknown as Record<string, unknown>)[valueField.value] as string | number;
};

const getOptionChildren = (option: CascaderOption): CascaderOption[] | undefined => {
    return (option as unknown as Record<string, unknown>)[childrenField.value] as CascaderOption[] | undefined;
};

// ============ 选项树元数据缓存（性能优化核心） ============
interface OptionMeta {
    pathKey: string; // 路径键，如 "1,2,3"
    path: CascaderValue; // 路径数组
    leafCount: number; // 该节点下的叶子节点数量（含自身如果是叶子）
    leafPathKeys: Set<string>; // 该节点下所有叶子节点的路径键
    isLeaf: boolean; // 是否是叶子节点
    option: CascaderOption; // 原始选项
}

/**
 * 预计算选项树的元数据，缓存每个节点的叶子信息
 * 这样在勾选/取消时就不需要每次都遍历整个子树
 */
const optionMetaMap = computed(() => {
    const map = new Map<string, OptionMeta>();

    const buildMeta = (options: CascaderOption[], parentPath: CascaderValue): { leafCount: number; leafPathKeys: Set<string> } => {
        let totalLeafCount = 0;
        const allLeafPathKeys = new Set<string>();

        for (const option of options) {
            if (option.disabled) continue;

            const value = getOptionValue(option);
            const currentPath = [...parentPath, value];
            const pathKey = currentPath.join(",");
            const children = getOptionChildren(option);
            const hasChildren = children && children.length > 0;

            let leafCount = 0;
            let leafPathKeys = new Set<string>();

            if (hasChildren) {
                // 递归处理子节点
                const childResult = buildMeta(children, currentPath);
                leafCount = childResult.leafCount;
                leafPathKeys = childResult.leafPathKeys;
            } else {
                // 叶子节点
                leafCount = 1;
                leafPathKeys.add(pathKey);
            }

            map.set(pathKey, {
                pathKey,
                path: currentPath,
                leafCount,
                leafPathKeys,
                isLeaf: !hasChildren,
                option
            });

            totalLeafCount += leafCount;
            leafPathKeys.forEach((key) => allLeafPathKeys.add(key));
        }

        return { leafCount: totalLeafCount, leafPathKeys: allLeafPathKeys };
    };

    buildMeta(props.options, []);
    return map;
});

// ============ 计算属性 ============

// 标准化后的内部值（直接来自 v-model，可能是策略处理后的值）
const internalValue = computed(() => {
    if (!props.modelValue) {
        return props.multiple ? [] : [];
    }
    if (props.multiple) {
        return props.modelValue as CascaderMultipleValue;
    }
    return [props.modelValue as CascaderValue];
});

// ============ 策略相关辅助函数（使用缓存优化） ============

/**
 * 将存储的路径展开为所有叶子节点路径键（使用缓存，O(1)）
 */
const expandPathToLeafPathKeys = (path: CascaderValue): Set<string> => {
    const pathKey = path.join(",");
    const meta = optionMetaMap.value.get(pathKey);

    if (!meta) {
        // 找不到元数据，返回自身
        return new Set([pathKey]);
    }

    return meta.leafPathKeys;
};

/**
 * 已选中的叶子节点路径键集合（核心缓存，用于快速判断选中状态）
 */
const selectedLeafPathKeys = computed((): Set<string> => {
    if (!props.multiple) return new Set();

    const values = internalValue.value as CascaderMultipleValue;
    const result = new Set<string>();

    if (props.showCheckedStrategy === "SHOW_CHILD") {
        // SHOW_CHILD 模式下，存储的就是叶子节点
        for (const path of values) {
            result.add(path.join(","));
        }
    } else {
        // SHOW_PARENT 模式下，需要展开父节点为所有叶子节点
        for (const path of values) {
            const leafKeys = expandPathToLeafPathKeys(path);
            leafKeys.forEach((key) => result.add(key));
        }
    }

    return result;
});

/**
 * 根据策略格式化叶子节点路径键为存储值（使用缓存优化）
 * SHOW_PARENT: 合并为最高层的全选父节点
 * SHOW_CHILD: 保持叶子节点
 */
const formatStrategyValues = (leafPathKeys: Set<string>): CascaderMultipleValue => {
    if (props.showCheckedStrategy === "SHOW_CHILD") {
        // 直接返回叶子节点路径
        return Array.from(leafPathKeys).map((key) => key.split(",").map((v) => (isNaN(Number(v)) ? v : Number(v))));
    }

    // SHOW_PARENT: 找到最高层的全选父节点
    const result: CascaderValue[] = [];
    const processedPathKeys = new Set<string>();

    // 使用缓存的元数据快速判断是否全选
    const isFullySelected = (pathKey: string): boolean => {
        const meta = optionMetaMap.value.get(pathKey);
        if (!meta) return false;

        // 检查该节点下所有叶子是否都被选中
        for (const leafKey of meta.leafPathKeys) {
            if (!leafPathKeys.has(leafKey)) {
                return false;
            }
        }
        return true;
    };

    // 找到最高层的全选父节点
    const findHighestFullySelectedParent = (pathKey: string): string => {
        const parts = pathKey.split(",");

        for (let i = 1; i <= parts.length; i++) {
            const parentKey = parts.slice(0, i).join(",");
            const meta = optionMetaMap.value.get(parentKey);

            if (meta && !meta.isLeaf && isFullySelected(parentKey)) {
                return parentKey;
            }
        }
        return pathKey;
    };

    // 遍历所有选中的叶子节点，找到最高层的全选父节点
    for (const leafKey of leafPathKeys) {
        const strategyKey = findHighestFullySelectedParent(leafKey);

        if (!processedPathKeys.has(strategyKey)) {
            processedPathKeys.add(strategyKey);
            const meta = optionMetaMap.value.get(strategyKey);
            if (meta) {
                result.push(meta.path);
            } else {
                // fallback: 解析路径键
                result.push(strategyKey.split(",").map((v) => (isNaN(Number(v)) ? v : Number(v))));
            }
        }
    }

    return result;
};

// 根据路径获取选项
const getOptionByPath = (path: (string | number)[]): CascaderOption[] => {
    const result: CascaderOption[] = [];
    let currentOptions = props.options;

    for (const value of path) {
        const found = currentOptions.find((opt) => getOptionValue(opt) === value);
        if (found) {
            result.push(found);
            currentOptions = getOptionChildren(found) || [];
        } else {
            break;
        }
    }
    return result;
};

// 获取显示的标签
const getDisplayLabels = (path: CascaderValue): string[] => {
    const options = getOptionByPath(path);
    return options.map((opt) => getOptionLabel(opt));
};

// 显示文本（单选模式）
const displayText = computed(() => {
    if (props.multiple) return "";
    if (!props.modelValue || (props.modelValue as CascaderValue).length === 0) return "";

    const path = props.modelValue as CascaderValue;
    const labels = getDisplayLabels(path);
    const options = getOptionByPath(path);

    if (props.displayRender) {
        return props.displayRender(labels, options);
    }
    return labels.join(" / ");
});

// 多选时显示的标签（直接使用 internalValue，因为它已经是策略处理后的值）
const selectedTags = computed(() => {
    if (!props.multiple) return [];
    const values = internalValue.value as CascaderMultipleValue;

    return values.map((path) => ({
        path,
        labels: getDisplayLabels(path),
        options: getOptionByPath(path)
    }));
});

// 显示的标签（考虑 maxTagCount）
const displayedTags = computed(() => {
    if (props.maxTagCount === undefined) {
        return selectedTags.value;
    }
    return selectedTags.value.slice(0, props.maxTagCount);
});

// 隐藏的标签数量
const hiddenTagCount = computed(() => {
    if (props.maxTagCount === undefined) return 0;
    return Math.max(0, selectedTags.value.length - props.maxTagCount);
});

// 隐藏标签的占位文本
const hiddenTagPlaceholder = computed(() => {
    if (hiddenTagCount.value <= 0) return "";
    if (typeof props.maxTagPlaceholder === "function") {
        const hiddenOptions = selectedTags.value.slice(props.maxTagCount).map((t) => t.options as CascaderOption[]);
        return props.maxTagPlaceholder(hiddenOptions);
    }
    if (props.maxTagPlaceholder) {
        return props.maxTagPlaceholder;
    }
    return `+ ${hiddenTagCount.value} ...`;
});

// 是否显示占位符
const showPlaceholder = computed(() => {
    if (props.multiple) {
        return selectedTags.value.length === 0 && !searchValue.value;
    }
    return !displayText.value && !searchValue.value;
});

// 是否显示清除按钮
const showClearButton = computed(() => {
    if (!props.allowClear || mergedDisabled.value) return false;
    if (props.multiple) {
        return selectedTags.value.length > 0;
    }
    return !!displayText.value;
});

const isClearButtonVisible = computed(() => showClearButton.value && isHovered.value);

// 获取某一级的选项列表
const getColumnsOptions = computed(() => {
    const columns: { options: CascaderOption[]; selectedValue: string | number | undefined }[] = [];
    let currentOptions = props.options;
    const path = activePath.value;

    // 第一列：根选项
    columns.push({
        options: currentOptions,
        selectedValue: path[0]
    });

    // 根据当前路径生成后续列
    for (let i = 0; i < path.length; i++) {
        const value = path[i];
        const found = currentOptions.find((opt) => getOptionValue(opt) === value);
        if (found) {
            const children = getOptionChildren(found);
            if (children && children.length > 0) {
                columns.push({
                    options: children,
                    selectedValue: path[i + 1]
                });
                currentOptions = children;
            }
        }
    }

    return columns;
});

// 搜索过滤后的选项（扁平化的路径列表）
const filteredSearchOptions = computed(() => {
    if (!searchValue.value) return [];

    const result: { path: CascaderValue; labels: string[]; options: CascaderOption[] }[] = [];
    const search = searchValue.value.toLowerCase();

    // 递归搜索所有路径
    const searchPath = (options: CascaderOption[], currentPath: CascaderValue, currentLabels: string[], currentOptions: CascaderOption[]) => {
        for (const option of options) {
            if (option.disabled) continue;

            const value = getOptionValue(option);
            const label = getOptionLabel(option);
            const newPath = [...currentPath, value];
            const newLabels = [...currentLabels, label];
            const newOptions = [...currentOptions, option];
            const children = getOptionChildren(option);

            // 检查是否匹配搜索词
            const matchesSearch = newLabels.some((l) => l.toLowerCase().includes(search));

            if (children && children.length > 0) {
                // 如果有子节点，继续递归
                searchPath(children, newPath, newLabels, newOptions);
            } else if (matchesSearch) {
                // 如果是叶子节点且匹配搜索词，添加到结果
                result.push({ path: newPath, labels: newLabels, options: newOptions });
            }
        }
    };

    searchPath(props.options, [], [], []);
    return result;
});

// ============ 样式类（简洁的类名切换） ============

/** 触发器类名 */
const triggerClasses = computed(() => {
    const classes = ["vort-cascader-selector", `vort-cascader-${props.size}`, `vort-cascader-${mergedVariant.value}`];

    if (props.multiple) classes.push("vort-cascader-multiple");
    if (mergedStatus.value) classes.push(`vort-cascader-${mergedStatus.value}`);
    if (mergedDisabled.value) classes.push("vort-cascader-selector-disabled");
    if (isFocused.value || isOpen.value) classes.push("vort-cascader-focused");
    if (props.class) classes.push(props.class);

    return classes;
});

/** 标签类名 */
const tagClasses = computed(() => {
    return ["vort-cascader-tag", `vort-cascader-tag-${props.size}`];
});

// ============ 方法 ============

// 更新下拉框位置
const updateDropdownPosition = () => {
    if (!triggerRef.value) return;
    const rect = triggerRef.value.getBoundingClientRect();
    const container = popupContainer.value;
    const useCustomContainer = container && container !== document.body;
    const scrollTop = useCustomContainer ? container.scrollTop : window.scrollY;
    const scrollLeft = useCustomContainer ? container.scrollLeft : window.scrollX;
    const containerRect = useCustomContainer ? container.getBoundingClientRect() : null;
    lastTriggerRect.value = rect;

    const baseTop = useCustomContainer && containerRect ? rect.bottom - containerRect.top + scrollTop : rect.bottom + scrollTop;
    const baseLeft = useCustomContainer && containerRect ? rect.left - containerRect.left + scrollLeft : rect.left + scrollLeft;

    dropdownPosition.value = {
        top: baseTop + 4,
        left: baseLeft,
        width: rect.width
    };

    // 滚动/窗口变化时也做一次防溢出修正
    scheduleAdjustDropdown();
};

// 修正下拉框位置，避免超出视口导致“展示不完整”
const adjustDropdownInViewport = () => {
    if (!dropdownRef.value) return;

    const dropdownRect = dropdownRef.value.getBoundingClientRect();
    const container = popupContainer.value;
    const useCustomContainer = container && container !== document.body;
    const viewportWidth = useCustomContainer ? container.clientWidth : document.documentElement.clientWidth;
    const viewportHeight = useCustomContainer ? container.clientHeight : window.innerHeight;
    const scrollTop = useCustomContainer ? container.scrollTop : window.scrollY;
    const scrollLeft = useCustomContainer ? container.scrollLeft : window.scrollX;
    const padding = 8;

    // 水平方向：尽量保证不超出视口
    if (dropdownRect.right > viewportWidth - padding) {
        const delta = dropdownRect.right - (viewportWidth - padding);
        dropdownPosition.value.left = Math.max(scrollLeft + padding, dropdownPosition.value.left - delta);
    }
    if (dropdownRect.left < padding) {
        const delta = padding - dropdownRect.left;
        dropdownPosition.value.left = dropdownPosition.value.left + delta;
    }

    // 垂直方向：下方空间不足时尝试向上展开
    const triggerRect = lastTriggerRect.value;
    if (triggerRect) {
        const dropdownHeight = dropdownRef.value.offsetHeight;
        const containerRect = useCustomContainer ? container.getBoundingClientRect() : null;
        const offsetTop = useCustomContainer && containerRect ? triggerRect.top - containerRect.top + scrollTop : triggerRect.top + scrollTop;
        const offsetBottom = offsetTop + triggerRect.height;
        const spaceBelow = viewportHeight - (offsetBottom - scrollTop);
        const spaceAbove = offsetTop - scrollTop;

        if (spaceBelow < dropdownHeight + padding && spaceAbove > spaceBelow) {
            dropdownPosition.value.top = offsetTop - dropdownHeight - 4;
        }
    }
};

const scheduleAdjustDropdown = () => {
    if (!isOpen.value) return;
    if (adjustRafId) {
        cancelAnimationFrame(adjustRafId);
    }
    adjustRafId = requestAnimationFrame(() => {
        adjustRafId = 0;
        adjustDropdownInViewport();
    });
};

// 打开/关闭下拉框
const openDropdown = () => {
    if (mergedDisabled.value) return;
    if (!shouldRenderTeleport.value) {
        shouldRenderTeleport.value = true; // 首次打开时渲染 Teleport
    }
    isOpen.value = true;
    updateDropdownPosition();
    nextTick(() => {
        scheduleAdjustDropdown();
    });

    // 初始化展开路径（如果保留弹出层且已有展开路径，则不重置）
    if (!props.destroyPopupOnHide && expandedPath.value.length > 0) {
        // 保留之前的展开状态
    } else if (!props.multiple && props.modelValue) {
        expandedPath.value = [...(props.modelValue as CascaderValue)];
        hoverPath.value = [];
    } else {
        expandedPath.value = [];
        hoverPath.value = [];
    }

    nextTick(() => {
        if (props.showSearch && inputRef.value) {
            inputRef.value.focus();
        }
    });
};

const closeDropdown = () => {
    isOpen.value = false;
    searchValue.value = "";
    // 如果不销毁弹出层，保留展开状态
    if (props.destroyPopupOnHide) {
        expandedPath.value = [];
        hoverPath.value = [];
    }
};

// Transition 离开动画完成后移除 Teleport（仅 destroyPopupOnHide 为 true 时）
const handleAfterLeave = () => {
    if (props.destroyPopupOnHide) {
        shouldRenderTeleport.value = false;
    }
};

const toggleDropdown = () => {
    if (isOpen.value) {
        closeDropdown();
    } else {
        openDropdown();
    }
};

// 处理选项展开
const handleOptionExpand = (option: CascaderOption, columnIndex: number) => {
    const value = getOptionValue(option);
    const newPath = [...hoverPath.value.slice(0, columnIndex), value];
    hoverPath.value = newPath;
};

const buildDeepestExpandedPath = (path: CascaderValue): CascaderValue => {
    const result = [...path];
    let currentOptions = props.options;

    for (const value of path) {
        const currentOption = currentOptions.find((opt) => getOptionValue(opt) === value);
        currentOptions = currentOption ? getOptionChildren(currentOption) || [] : [];
    }

    while (currentOptions.length > 0) {
        const nextOption = currentOptions.find((option) => !option.disabled) || currentOptions[0];
        if (!nextOption) break;

        result.push(getOptionValue(nextOption));
        currentOptions = getOptionChildren(nextOption) || [];
    }

    return result;
};

// 处理选项点击
const handleOptionClick = (option: CascaderOption, columnIndex: number) => {
    if (option.disabled) return;

    const value = getOptionValue(option);
    const children = getOptionChildren(option);
    const newPath = [...activePath.value.slice(0, columnIndex), value];
    const expandedTargetPath = props.multiple && !props.selectOnItemClickInMultiple ? buildDeepestExpandedPath(newPath) : newPath;

    // 如果是 hover 展开模式，点击时更新 expandedPath
    if (props.expandTrigger === "hover") {
        expandedPath.value = expandedTargetPath;
    } else {
        expandedPath.value = expandedTargetPath;
        hoverPath.value = expandedTargetPath;
    }

    if (props.multiple && !props.selectOnItemClickInMultiple) {
        return;
    }

    // 检查是否是叶子节点
    const isLeaf = !children || children.length === 0 || option.isLeaf;

    if (isLeaf || props.changeOnSelect) {
        selectValue(newPath);
    }
};

// 选择值 - 使用缓存优化
const selectValue = (path: CascaderValue) => {
    const options = getOptionByPath(path);

    if (props.multiple) {
        const pathKey = path.join(",");

        // 创建新的叶子节点集合
        const newLeafPathKeys = new Set(selectedLeafPathKeys.value);

        if (newLeafPathKeys.has(pathKey)) {
            // 取消选择
            newLeafPathKeys.delete(pathKey);
        } else {
            // 添加选择
            newLeafPathKeys.add(pathKey);
        }

        // 根据策略格式化输出值
        const outputValues = formatStrategyValues(newLeafPathKeys);
        emit("update:modelValue", outputValues);
        emit(
            "change",
            outputValues,
            outputValues.map((p) => getOptionByPath(p))
        );
    } else {
        emit("update:modelValue", path);
        emit("change", path, options);

        // 只有在选择了叶子节点时才关闭下拉框
        // changeOnSelect 模式下，选择非叶子节点不关闭，允许继续展开子级
        const lastOption = options[options.length - 1];
        const children = lastOption ? getOptionChildren(lastOption) : undefined;
        const isLeaf = !children || children.length === 0 || lastOption?.isLeaf;

        if (isLeaf) {
            closeDropdown();
        }
    }

    if (props.autoClearSearchValue) {
        searchValue.value = "";
    }
};

// 选择目录（选择/取消该目录下所有叶子节点）- 使用缓存优化
const selectDirectory = (option: CascaderOption, parentPath: CascaderValue) => {
    const currentPath = [...parentPath, getOptionValue(option)];
    const pathKey = currentPath.join(",");
    const meta = optionMetaMap.value.get(pathKey);

    if (!meta) return;

    if (meta.isLeaf) {
        // 叶子节点，直接选择
        selectValue(currentPath);
        return;
    }

    const { leafPathKeys } = meta;
    if (leafPathKeys.size === 0) return;

    // 使用缓存的选中状态
    const { checked, indeterminate } = getDirectoryCheckState(option, parentPath);

    // 创建新的叶子节点集合
    const newLeafPathKeys = new Set(selectedLeafPathKeys.value);

    if (checked || indeterminate) {
        // 当前是选中或半选状态，取消所有
        leafPathKeys.forEach((key) => newLeafPathKeys.delete(key));
    } else {
        // 当前未选中，全选
        leafPathKeys.forEach((key) => newLeafPathKeys.add(key));
    }

    // 根据策略格式化输出值
    const outputValues = formatStrategyValues(newLeafPathKeys);
    emit("update:modelValue", outputValues);
    emit(
        "change",
        outputValues,
        outputValues.map((p) => getOptionByPath(p))
    );
};

// 检查叶子路径是否被选中（使用缓存的 Set，O(1) 查找）
const isLeafPathSelected = (path: CascaderValue): boolean => {
    if (props.multiple) {
        return selectedLeafPathKeys.value.has(path.join(","));
    }
    return false;
};

// 检查路径是否被选中（用于搜索结果等）
const isPathSelected = (path: CascaderValue): boolean => {
    return isLeafPathSelected(path);
};

// 检查目录的选中状态（使用缓存的元数据，O(leafCount) 而非 O(n) 遍历）
const getDirectoryCheckState = (option: CascaderOption, parentPath: CascaderValue): { checked: boolean; indeterminate: boolean } => {
    const currentPath = [...parentPath, getOptionValue(option)];
    const pathKey = currentPath.join(",");
    const meta = optionMetaMap.value.get(pathKey);

    if (!meta) {
        return { checked: false, indeterminate: false };
    }

    if (meta.isLeaf) {
        // 叶子节点，直接检查是否选中
        return { checked: selectedLeafPathKeys.value.has(pathKey), indeterminate: false };
    }

    // 使用缓存的叶子节点信息计算选中数量
    const { leafPathKeys, leafCount } = meta;
    if (leafCount === 0) {
        return { checked: false, indeterminate: false };
    }

    let selectedCount = 0;
    for (const leafKey of leafPathKeys) {
        if (selectedLeafPathKeys.value.has(leafKey)) {
            selectedCount++;
        }
    }

    if (selectedCount === 0) {
        return { checked: false, indeterminate: false };
    } else if (selectedCount === leafCount) {
        return { checked: true, indeterminate: false };
    } else {
        return { checked: false, indeterminate: true };
    }
};

// 删除标签 - 使用缓存优化
const handleRemoveTag = (tag: { path: CascaderValue; labels: string[]; options: CascaderOption[] }) => {
    if (mergedDisabled.value) return;

    // 获取要删除的路径对应的所有叶子节点键
    const pathKey = tag.path.join(",");
    const leafKeysToRemove = expandPathToLeafPathKeys(tag.path);

    // 创建新的叶子节点集合
    const newLeafPathKeys = new Set(selectedLeafPathKeys.value);
    leafKeysToRemove.forEach((key) => newLeafPathKeys.delete(key));

    // 根据策略格式化输出值
    const outputValues = formatStrategyValues(newLeafPathKeys);
    emit("update:modelValue", outputValues);
    emit(
        "change",
        outputValues,
        outputValues.map((p) => getOptionByPath(p))
    );
};

// 清除所有值
const handleClear = (e: Event) => {
    e.stopPropagation();
    if (props.multiple) {
        emit("update:modelValue", []);
        emit("change", [], []);
    } else {
        emit("update:modelValue", undefined);
        emit("change", undefined, []);
    }
    searchValue.value = "";
    emit("clear");
};

// 搜索输入
const handleSearchInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    searchValue.value = target.value;
    emit("search", target.value);
};

// 选择搜索结果
const handleSearchOptionClick = (item: { path: CascaderValue; labels: string[]; options: CascaderOption[] }) => {
    selectValue(item.path);
};

// 点击外部关闭
const handleClickOutside = (e: MouseEvent) => {
    if (!isOpen.value) return;
    if (isEventInside(e, triggerRef.value, dropdownRef.value)) {
        return;
    }
    closeDropdown();
};

// 受控 open：同步外部状态到内部展示
watch(
    () => props.open,
    (val) => {
        if (val === undefined) return;
        if (val) {
            if (!isOpen.value) {
                openDropdown();
            }
        } else {
            if (isOpen.value) {
                closeDropdown();
            }
        }
    },
    { immediate: true }
);

// 处理 hover 展开
const handleOptionMouseEnter = (option: CascaderOption, columnIndex: number) => {
    if (props.expandTrigger === "hover" && !option.disabled) {
        handleOptionExpand(option, columnIndex);
    }
};

// ============ 生命周期 ============
onMounted(() => {
    document.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", updateDropdownPosition, true);
    window.addEventListener("resize", updateDropdownPosition);
});

onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside);
    window.removeEventListener("scroll", updateDropdownPosition, true);
    window.removeEventListener("resize", updateDropdownPosition);

    resizeObserver?.disconnect();
    resizeObserver = null;
    if (adjustRafId) {
        cancelAnimationFrame(adjustRafId);
        adjustRafId = 0;
    }
});

// 监听打开状态更新位置
watch(isOpen, (val) => {
    if (val) {
        nextTick(() => {
            updateDropdownPosition();
            scheduleAdjustDropdown();
        });
    } else {
        resizeObserver?.disconnect();
        resizeObserver = null;
    }
});

// 监听面板 DOM 挂载与尺寸变化（展开列会改变宽高）
watch(
    () => dropdownRef.value,
    (el) => {
        if (!el || !isOpen.value) return;
        resizeObserver?.disconnect();
        resizeObserver = new ResizeObserver(() => {
            scheduleAdjustDropdown();
        });
        resizeObserver.observe(el);
    }
);

// ============ 暴露方法 ============
defineExpose({
    focus: () => inputRef.value?.focus(),
    blur: () => inputRef.value?.blur(),
    setExpandedPath: (path: (string | number)[]) => {
        expandedPath.value = buildDeepestExpandedPath(path);
        hoverPath.value = [];
    }
});
</script>

<template>
    <div class="vort-cascader" :class="{ 'vort-cascader-disabled': mergedDisabled }">
        <!-- 触发器 -->
        <div
            ref="triggerRef"
            :class="triggerClasses"
            tabindex="0"
            @mouseenter="isHovered = true"
            @mouseleave="isHovered = false"
            @click="toggleDropdown"
            @focus="
                (e) => {
                    isFocused = true;
                    emit('focus', e);
                }
            "
            @blur="
                (e) => {
                    isFocused = false;
                    emit('blur', e);
                }
            "
        >
            <!-- 多选模式 -->
            <template v-if="multiple">
                <div class="vort-cascader-selection">
                    <!-- 已选标签 -->
                    <span v-for="tag in displayedTags" :key="tag.path.join(',')" :class="tagClasses">
                        <span class="vort-cascader-tag-text">{{ tag.labels.join(" / ") }}</span>
                        <span v-if="!mergedDisabled" class="vort-cascader-tag-remove" @click.stop="handleRemoveTag(tag)">
                            <CloseOutlined class="vort-cascader-tag-remove-icon" />
                        </span>
                    </span>

                    <!-- 隐藏标签数量提示 -->
                    <span v-if="hiddenTagCount > 0" class="vort-cascader-tag vort-cascader-tag-placeholder">
                        {{ hiddenTagPlaceholder }}
                    </span>

                    <!-- 搜索输入框 -->
                    <input
                        v-if="showSearch"
                        ref="inputRef"
                        :value="searchValue"
                        :placeholder="showPlaceholder ? placeholder : ''"
                        :disabled="mergedDisabled"
                        class="vort-cascader-search-input"
                        @input="handleSearchInput"
                        @click.stop
                    />

                    <!-- 非搜索模式的占位符 -->
                    <span v-else-if="showPlaceholder" class="vort-cascader-placeholder">
                        {{ placeholder }}
                    </span>
                </div>
            </template>

            <!-- 单选模式 -->
            <template v-else>
                <div class="vort-cascader-selection-single">
                    <!-- 搜索输入框 -->
                    <input
                        v-if="showSearch && isOpen"
                        ref="inputRef"
                        :value="searchValue"
                        :placeholder="displayText || placeholder"
                        :disabled="mergedDisabled"
                        class="vort-cascader-search-input"
                        @input="handleSearchInput"
                        @click.stop
                    />

                    <!-- 非搜索模式或未打开时显示文本 -->
                    <template v-else>
                        <span v-if="displayText" class="vort-cascader-value">
                            {{ displayText }}
                        </span>
                        <span v-else class="vort-cascader-placeholder">
                            {{ placeholder }}
                        </span>
                    </template>
                </div>
            </template>

            <!-- 后缀区域 -->
            <span class="vort-cascader-suffix">
                <span class="vort-cascader-indicator">
                    <!-- 清除按钮 -->
                    <span class="vort-cascader-clear" :class="{ 'vort-cascader-clear-visible': isClearButtonVisible }" @click="handleClear" @mousedown.prevent>
                        <CloseCircleFilled />
                    </span>

                    <!-- 下拉箭头 -->
                    <span class="vort-cascader-arrow-wrapper" :class="{ 'vort-cascader-arrow-wrapper-hidden': isClearButtonVisible }">
                        <DownOutlined :class="['vort-cascader-arrow', isOpen && 'vort-cascader-arrow-open']" />
                    </span>
                </span>
            </span>
        </div>

        <!-- 下拉面板 -->
        <Teleport v-if="shouldRenderTeleport" :to="popupContainer">
            <Transition name="vort-slide-up" appear @after-leave="handleAfterLeave">
                <div
                    v-show="isOpen"
                    ref="dropdownRef"
                    class="vort-cascader-dropdown"
                    :style="{
                        top: `${dropdownPosition.top}px`,
                        left: `${dropdownPosition.left}px`,
                        zIndex: zIndex
                    }"
                >
                    <!-- 搜索模式下的结果列表 -->
                    <template v-if="searchValue && showSearch">
                        <div v-if="filteredSearchOptions.length === 0" class="vort-cascader-empty" :style="emptyStyle">
                            {{ notFoundContent }}
                        </div>
                        <div v-else class="vort-cascader-search-list" :style="{ maxHeight: `${listHeight}px` }">
                            <div
                                v-for="item in filteredSearchOptions"
                                :key="item.path.join(',')"
                                class="vort-cascader-search-item"
                                :class="{ 'is-selected': isPathSelected(item.path) }"
                                @click="handleSearchOptionClick(item)"
                            >
                                <Checkbox v-if="multiple" :checked="isPathSelected(item.path)" @click.stop @change="handleSearchOptionClick(item)" />
                                <span class="vort-cascader-search-label">{{ item.labels.join(" / ") }}</span>
                            </div>
                        </div>
                    </template>

                    <!-- 级联面板 -->
                    <template v-else>
                        <div v-if="options.length === 0" class="vort-cascader-empty" :style="emptyStyle">
                            {{ notFoundContent }}
                        </div>
                        <div v-else class="vort-cascader-menus">
                            <div
                                v-for="(column, columnIndex) in getColumnsOptions"
                                :key="columnIndex"
                                class="vort-cascader-menu"
                                :style="{ maxHeight: `${listHeight}px` }"
                            >
                                <div
                                    v-for="option in column.options"
                                    :key="String(getOptionValue(option))"
                                    class="vort-cascader-menu-item"
                                    :class="{
                                        'is-selected': column.selectedValue === getOptionValue(option),
                                        'is-disabled': option.disabled
                                    }"
                                    @click="handleOptionClick(option, columnIndex)"
                                    @mouseenter="handleOptionMouseEnter(option, columnIndex)"
                                >
                                    <!-- 多选复选框 -->
                                    <Checkbox
                                        v-if="multiple"
                                        :checked="getDirectoryCheckState(option, activePath.slice(0, columnIndex)).checked"
                                        :indeterminate="getDirectoryCheckState(option, activePath.slice(0, columnIndex)).indeterminate"
                                        :disabled="option.disabled"
                                        @click.stop
                                        @change="selectDirectory(option, activePath.slice(0, columnIndex))"
                                    />

                                    <span class="vort-cascader-menu-item-label">{{ getOptionLabel(option) }}</span>

                                    <!-- 展开箭头 -->
                                    <RightOutlined v-if="getOptionChildren(option)?.length" class="vort-cascader-menu-item-arrow" />
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<style scoped>
/* ========================================
   基础样式
   ======================================== */
.vort-cascader {
    display: inline-block;
    width: 100%;
}

/* ========================================
   选择器触发器
   ======================================== */
.vort-cascader-selector {
    --_border-color: var(--vort-border, #d9d9d9);
    --_focus-color: var(--vort-primary, #1456f0);
    --_focus-shadow: var(--vort-primary-shadow, rgba(20, 86, 240, 0.1));
    --_bg-color: #fff;

    position: relative;
    display: inline-flex;
    align-items: center;
    width: 100%;
    border: 1px solid var(--_border-color);
    border-radius: var(--vort-radius, 6px);
    background: var(--_bg-color);
    cursor: pointer;
    transition: var(--vort-transition-all, all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1));
}

.vort-cascader-selector:hover:not(.vort-cascader-selector-disabled) {
    border-color: var(--_focus-color);
}

.vort-cascader-focused:not(.vort-cascader-selector-disabled) {
    border-color: var(--_focus-color);
    box-shadow: 0 0 0 2px var(--_focus-shadow);
}

.vort-cascader-error {
    --_border-color: var(--vort-error, #ff4d4f);
    --_focus-color: var(--vort-error, #ff4d4f);
    --_focus-shadow: rgba(255, 77, 79, 0.06);
}

.vort-cascader-warning {
    --_border-color: var(--vort-warning, #faad14);
    --_focus-color: var(--vort-warning, #faad14);
    --_focus-shadow: rgba(250, 173, 20, 0.1);
}

.vort-cascader-selector-disabled {
    --_bg-color: rgba(0, 0, 0, 0.04);
    color: var(--vort-text-quaternary, rgba(0, 0, 0, 0.25));
    cursor: not-allowed;
}

.vort-cascader-selector-disabled .vort-cascader-value {
    color: var(--vort-text-quaternary, rgba(0, 0, 0, 0.25));
}

.vort-cascader-selector-disabled .vort-cascader-search-input {
    color: var(--vort-text-quaternary, rgba(0, 0, 0, 0.25));
    -webkit-text-fill-color: var(--vort-text-quaternary, rgba(0, 0, 0, 0.25));
    cursor: not-allowed;
}

/* ========================================
   形态变体 - Outlined（默认）
   ======================================== */
.vort-cascader-outlined {
    border: 1px solid var(--_border-color);
    background: var(--_bg-color);
}

/* ========================================
   形态变体 - Filled
   ======================================== */
.vort-cascader-filled {
    --_bg-color: rgba(0, 0, 0, 0.04);
    border: 1px solid transparent;
}

.vort-cascader-filled:hover:not(.vort-cascader-selector-disabled) {
    --_bg-color: rgba(0, 0, 0, 0.06);
    border-color: transparent;
}

.vort-cascader-filled.vort-cascader-focused:not(.vort-cascader-selector-disabled) {
    --_bg-color: #fff;
    border-color: var(--_focus-color);
    box-shadow: none;
}

/* Filled + Error/Warning：状态色浅底，不显示边框，聚焦时白底 + 状态色边框（对齐 antd） */
.vort-cascader-filled.vort-cascader-error:not(.vort-cascader-selector-disabled) {
    --_bg-color: var(--vort-error-bg, #fff2f0);
}

.vort-cascader-filled.vort-cascader-warning:not(.vort-cascader-selector-disabled) {
    --_bg-color: var(--vort-warning-bg, #fffbe6);
}

.vort-cascader-filled.vort-cascader-error:hover:not(.vort-cascader-selector-disabled) {
    --_bg-color: var(--vort-error-bg-hover, #fff1f0);
}

.vort-cascader-filled.vort-cascader-warning:hover:not(.vort-cascader-selector-disabled) {
    --_bg-color: var(--vort-warning-bg-hover, #fff1b8);
}

.vort-cascader-filled.vort-cascader-error.vort-cascader-focused:not(.vort-cascader-selector-disabled),
.vort-cascader-filled.vort-cascader-warning.vort-cascader-focused:not(.vort-cascader-selector-disabled) {
    --_bg-color: #fff;
}

/* 填充底色上的多选标签改用白底细边，避免与底色融为一片 */
.vort-cascader-filled .vort-cascader-tag {
    background: #fff;
    box-shadow: inset 0 0 0 1px rgba(5, 5, 5, 0.06);
}

/* ========================================
   形态变体 - Borderless
   ======================================== */
.vort-cascader-borderless {
    border: 1px solid transparent;
    background: transparent;
}

.vort-cascader-borderless:hover:not(.vort-cascader-selector-disabled) {
    border-color: transparent;
}

/* 聚焦时显示 1px 边框，颜色随状态；鼠标点击与键盘聚焦都显示 */
.vort-cascader-borderless.vort-cascader-focused:not(.vort-cascader-selector-disabled) {
    background: transparent;
    border-color: var(--_focus-color);
    box-shadow: none;
}

/* Filled / Borderless 没有常显的状态边框，用状态色文字提示 */
.vort-cascader-filled.vort-cascader-error:not(.vort-cascader-selector-disabled) .vort-cascader-value,
.vort-cascader-filled.vort-cascader-error:not(.vort-cascader-selector-disabled) .vort-cascader-search-input,
.vort-cascader-borderless.vort-cascader-error:not(.vort-cascader-selector-disabled) .vort-cascader-value,
.vort-cascader-borderless.vort-cascader-error:not(.vort-cascader-selector-disabled) .vort-cascader-search-input {
    color: var(--vort-error, #ff4d4f);
}

.vort-cascader-filled.vort-cascader-warning:not(.vort-cascader-selector-disabled) .vort-cascader-value,
.vort-cascader-filled.vort-cascader-warning:not(.vort-cascader-selector-disabled) .vort-cascader-search-input,
.vort-cascader-borderless.vort-cascader-warning:not(.vort-cascader-selector-disabled) .vort-cascader-value,
.vort-cascader-borderless.vort-cascader-warning:not(.vort-cascader-selector-disabled) .vort-cascader-search-input {
    color: var(--vort-warning, #faad14);
}

/* ========================================
   形态变体 - Underlined
   ======================================== */
/* 四边保留 1px 透明边框、只给底边着色：切换形态时盒子尺寸不变，也不会从 border: none 的默认粗黑边过渡出来 */
.vort-cascader-underlined {
    border: 1px solid transparent;
    border-bottom-color: var(--_border-color);
    border-radius: 0;
    background: transparent;
}

.vort-cascader-underlined:hover:not(.vort-cascader-selector-disabled) {
    border-color: transparent;
    border-bottom-color: var(--_focus-color);
}

.vort-cascader-underlined.vort-cascader-focused:not(.vort-cascader-selector-disabled) {
    border-color: transparent;
    border-bottom-color: var(--_focus-color);
    box-shadow: none;
}

/* 尺寸 */
.vort-cascader-large {
    height: var(--vort-height-lg, 40px);
    padding: 0 11px;
    font-size: var(--vort-font-size-md, 16px);
}

.vort-cascader-large.vort-cascader-multiple {
    min-height: var(--vort-height-lg, 40px);
    height: auto;
}

.vort-cascader-middle {
    height: var(--vort-height-md, 32px);
    padding: 0 11px;
    font-size: var(--vort-font-size-sm, 14px);
}

.vort-cascader-middle.vort-cascader-multiple {
    min-height: var(--vort-height-md, 32px);
    height: auto;
}

.vort-cascader-small {
    height: var(--vort-height-sm, 24px);
    padding: 0 7px;
    font-size: var(--vort-font-size-sm, 14px);
}

.vort-cascader-small.vort-cascader-multiple {
    min-height: var(--vort-height-sm, 24px);
    height: auto;
}

/* ========================================
   选择区域
   ======================================== */
.vort-cascader-selection {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex: 1;
    min-width: 0;
    gap: 4px;
    padding: 3px 0;
}

.vort-cascader-selection-single {
    display: flex;
    flex: 1;
    min-width: 0;
    align-items: center;
}

/* ========================================
   多选标签
   ======================================== */
.vort-cascader-tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    max-width: 100%;
    padding: 0 4px;
    background: rgba(0, 0, 0, 0.06);
    border-radius: var(--vort-radius-sm, 4px);
}

.vort-cascader-tag-placeholder {
    color: var(--vort-text-secondary, rgba(0, 0, 0, 0.65));
}

.vort-cascader-tag-large {
    height: 24px;
    font-size: var(--vort-font-size-sm, 14px);
}

.vort-cascader-tag-middle {
    height: 22px;
    font-size: var(--vort-font-size-sm, 14px);
}

.vort-cascader-tag-small {
    height: 16px;
    font-size: var(--vort-font-size-xs, 12px);
}

.vort-cascader-tag-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.vort-cascader-tag-remove {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    border-radius: var(--vort-radius-sm, 4px);
    cursor: pointer;
    transition: background-color var(--vort-transition-colors, 0.1s);
}

.vort-cascader-tag-remove:hover {
    background: rgba(0, 0, 0, 0.1);
}

.vort-cascader-tag-remove-icon {
    font-size: 10px;
    color: var(--vort-text-tertiary, rgba(0, 0, 0, 0.45));
}

/* ========================================
   输入框和文本
   ======================================== */
.vort-cascader-search-input {
    flex: 1;
    min-width: 60px;
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    color: var(--vort-text, rgba(0, 0, 0, 0.88));
}

.vort-cascader-search-input::placeholder {
    color: var(--vort-text-quaternary, rgba(0, 0, 0, 0.25));
    -webkit-text-fill-color: currentColor;
}

.vort-cascader-placeholder {
    color: var(--vort-text-quaternary, rgba(0, 0, 0, 0.25));
}

.vort-cascader-value {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--vort-text, rgba(0, 0, 0, 0.88));
}

/* ========================================
   后缀区域
   ======================================== */
.vort-cascader-suffix {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    margin-left: 4px;
    gap: 4px;
}

.vort-cascader-indicator {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    flex-shrink: 0;
}

.vort-cascader-clear {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: var(--vort-text-quaternary, rgba(0, 0, 0, 0.25));
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition:
        color var(--vort-transition-colors, 0.1s),
        opacity var(--vort-transition-colors, 0.1s);
}

.vort-cascader-clear-visible {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
}

.vort-cascader-clear:hover {
    color: var(--vort-text-tertiary, rgba(0, 0, 0, 0.45));
}

.vort-cascader-arrow-wrapper {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity var(--vort-transition-colors, 0.1s);
}

.vort-cascader-arrow-wrapper-hidden {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
}

.vort-cascader-arrow {
    font-size: 12px;
    color: var(--vort-text-quaternary, rgba(0, 0, 0, 0.25));
    transition: transform var(--vort-transition-colors, 0.2s);
}

.vort-cascader-arrow-open {
    transform: rotate(180deg);
}

/* ========================================
   下拉面板
   ======================================== */
.vort-cascader-dropdown {
    position: absolute;
    background: white;
    border-radius: var(--vort-radius-lg, 8px);
    pointer-events: auto;
    box-shadow:
        0 6px 16px 0 rgba(0, 0, 0, 0.08),
        0 3px 6px -4px rgba(0, 0, 0, 0.12),
        0 9px 28px 8px rgba(0, 0, 0, 0.05);
}

.vort-cascader-menus {
    display: flex;
}

.vort-cascader-menu {
    min-width: 120px;
    overflow-y: auto;
    border-right: 1px solid var(--vort-border-secondary, rgba(5, 5, 5, 0.06));
    padding: 4px;
}

.vort-cascader-menu:last-child {
    border-right: none;
}

.vort-cascader-menu-item {
    display: flex;
    align-items: center;
    padding: 5px 12px;
    cursor: pointer;
    transition: background-color var(--vort-transition-colors, 0.15s);
    font-size: var(--vort-font-size-sm, 14px);
    color: var(--vort-text, rgba(0, 0, 0, 0.88));
    gap: 8px;
    min-height: 36px;
    border-radius: var(--vort-radius-sm, 4px);
    label {
        min-height: auto;
    }
}

.vort-cascader-menu-item:hover {
    background-color: rgba(0, 0, 0, 0.04);
}

.vort-cascader-menu-item.is-selected {
    background-color: var(--vort-primary-bg, #e8f0fe);
    font-weight: 500;
}

.vort-cascader-menu-item.is-disabled {
    color: var(--vort-text-quaternary, rgba(0, 0, 0, 0.25));
    cursor: not-allowed;
}

.vort-cascader-menu-item.is-disabled:hover {
    background-color: transparent;
}

.vort-cascader-menu-item-label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.vort-cascader-menu-item-arrow {
    font-size: 10px;
    color: var(--vort-text-quaternary, rgba(0, 0, 0, 0.25));
    flex-shrink: 0;
}

.vort-cascader-empty {
    box-sizing: border-box;
    padding: 24px 12px;
    text-align: center;
    color: var(--vort-text-quaternary, rgba(0, 0, 0, 0.25));
    font-size: var(--vort-font-size-sm, 14px);
}

.vort-cascader-search-list {
    overflow-y: auto;
    padding: 4px;
}

.vort-cascader-search-item {
    display: flex;
    align-items: center;
    padding: 5px 12px;
    cursor: pointer;
    transition: background-color var(--vort-transition-colors, 0.15s);
    font-size: var(--vort-font-size-sm, 14px);
    color: var(--vort-text, rgba(0, 0, 0, 0.88));
    gap: 8px;
    border-radius: var(--vort-radius-sm, 4px);
}

.vort-cascader-search-item:hover {
    background-color: rgba(0, 0, 0, 0.04);
}

.vort-cascader-search-item.is-selected {
    background-color: var(--vort-primary-bg, #e8f0fe);
    font-weight: 500;
}

.vort-cascader-search-label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* ========================================
   动画 - 复用 motion.css 中的通用下拉动画
   ======================================== */
.vort-slide-up-enter-active {
    animation: vort-dropdown-slide-up-in var(--vort-duration-normal, 150ms) var(--vort-ease-decelerate, cubic-bezier(0, 0, 0.2, 1));
}

.vort-slide-up-leave-active {
    animation: vort-dropdown-slide-up-out var(--vort-duration-normal, 150ms) var(--vort-ease-accelerate, cubic-bezier(0.4, 0, 1, 1));
}

/* ========================================
   响应用户"减少动画"偏好设置
   ======================================== */
@media (prefers-reduced-motion: reduce) {
    .vort-slide-up-enter-active,
    .vort-slide-up-leave-active {
        animation-duration: 0ms;
    }
}
</style>
