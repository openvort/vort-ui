<script setup lang="ts">
import { computed, provide, watch, ref, toRef, onMounted, onUnmounted } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import type { ZodType } from "zod";
import { formContextKey } from "./constants";
import type { FormVariant } from "./types";

// 生成唯一 ID 的计数器
let formItemIdCounter = 0;

defineOptions({ name: "VortForm" });

/** Vort Form - 表单组件 */

type FormLayout = "horizontal" | "vertical" | "inline";
type FormSize = "large" | "middle" | "small";
type LabelAlign = "left" | "right";
type ValidateTrigger = "change" | "blur" | "submit" | Array<"change" | "blur" | "submit">;

interface ColProps {
    /** 栅格占位格数 */
    span?: number;
    /** 栅格左侧的间隔格数 */
    offset?: number;
}

interface Props {
    /** 表单数据对象 */
    model?: Record<string, unknown>;
    /** 表单验证规则（支持 zod schema 或自定义规则对象） */
    rules?: ZodType | Record<string, unknown>;
    /** 表单布局 */
    layout?: FormLayout;
    /** label 标签的文本对齐方式 */
    labelAlign?: LabelAlign;
    /** 标签的长度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。可以使用 'auto' */
    labelWidth?: string;
    /** label 标签布局 */
    labelCol?: ColProps;
    /** 控件布局 */
    wrapperCol?: ColProps;
    /** 配置 Form.Item 的 colon 的默认值 */
    colon?: boolean;
    /** 是否禁用该表单内的所有组件 */
    disabled?: boolean;
    /** 设置字段组件的尺寸 */
    size?: FormSize;
    /** 表单内录入类控件的形态变体；控件自身 variant / bordered 优先 */
    variant?: FormVariant;
    /** 统一设置字段触发验证的时机，submit 表示仅在提交或手动校验时触发 */
    validateTrigger?: ValidateTrigger;
    /** FormItem 卸载时是否保留内部字段值，默认 false；不保留已卸载字段的局部验证器 */
    keepValuesOnUnmount?: boolean;
    /** 是否显示必填标记 */
    requiredMark?: boolean | "optional";
    /** 是否启用响应式布局（小屏幕自动切换为垂直布局） */
    responsive?: boolean;
    /** 响应式断点，单位 px，默认 576（对应 sm 断点） */
    responsiveBreakpoint?: number;
    /** 自定义类名 */
    class?: string;
}

const props = withDefaults(defineProps<Props>(), {
    layout: "horizontal",
    labelAlign: "right",
    colon: true,
    disabled: false,
    size: "middle",
    validateTrigger: "change",
    keepValuesOnUnmount: false,
    requiredMark: true,
    responsive: true,
    responsiveBreakpoint: 576
});

// 响应式布局状态：是否处于小屏幕模式
const isSmallScreen = ref(false);

// 实际使用的布局（考虑响应式）
const effectiveLayout = computed<FormLayout>(() => {
    // 如果启用响应式且当前是小屏幕，且原布局是 horizontal，则切换为 vertical
    if (props.responsive && isSmallScreen.value && props.layout === "horizontal") {
        return "vertical";
    }
    return props.layout;
});

// 媒体查询监听器
let mediaQueryList: MediaQueryList | null = null;

const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
    isSmallScreen.value = !e.matches;
};

onMounted(() => {
    if (props.responsive && typeof window !== "undefined") {
        // 创建媒体查询
        mediaQueryList = window.matchMedia(`(min-width: ${props.responsiveBreakpoint}px)`);
        // 初始化状态
        handleMediaChange(mediaQueryList);
        // 监听变化
        mediaQueryList.addEventListener("change", handleMediaChange);
    }
});

onUnmounted(() => {
    if (mediaQueryList) {
        mediaQueryList.removeEventListener("change", handleMediaChange);
        mediaQueryList = null;
    }
});

const emit = defineEmits<{
    /** 表单提交且验证通过时触发 */
    finish: [values: Record<string, unknown>];
    /** 表单提交且验证失败时触发 */
    finishFailed: [errors: Record<string, string>];
    /** 字段值变更时触发 */
    valuesChange: [changedValues: Record<string, unknown>, allValues: Record<string, unknown>];
}>();

// 解析验证 schema
const validationSchema = computed(() => {
    if (!props.rules) return undefined;
    // 如果是 zod schema，转换为 vee-validate schema
    if (typeof props.rules === "object" && "_def" in props.rules) {
        return toTypedSchema(props.rules as ZodType);
    }
    return undefined;
});

// 使用 vee-validate 的 useForm
// schema 以 computed 传入，rules 随业务状态切换（如阶梯表的门槛单位）时后续校验按新规则走；
// vee-validate 在 schema 变化时只重算已校验过的字段，错误是否展示仍由 FormItem 的交互状态决定。
// 挂载时 rules 为空的表单走 FormItem 字段级规则，之后再传入 schema 不会接管。
const { handleSubmit, resetForm, setFieldValue, setFieldError, setValues, validate, validateField, errors, values } = useForm({
    validationSchema,
    initialValues: props.model,
    keepValuesOnUnmount: toRef(props, "keepValuesOnUnmount")
});

// 监听 model 变化，同步到 vee-validate（实现双向绑定校验）
// setValues 合并对象、替换传入的数组，不会删除 model 中已移除的嵌套对象键；
// keepValuesOnUnmount 仅控制字段卸载时是否删值，不改变这份 model 同步策略
watch(
    () => props.model,
    (newModel) => {
        if (!newModel) return;
        // 仅提交触发时，模型同步不能在输入阶段重新校验整张表。
        const trigger = props.validateTrigger;
        const validateOnModelUpdate = Array.isArray(trigger) ? trigger.includes("change") : trigger === "change";
        setValues({ ...newModel }, validateOnModelUpdate);
    },
    { deep: true }
);

// 表单样式
const formClasses = computed(() => {
    const classes = ["vort-form"];
    if (effectiveLayout.value === "horizontal") classes.push("vort-form-horizontal");
    if (effectiveLayout.value === "vertical") classes.push("vort-form-vertical");
    if (effectiveLayout.value === "inline") classes.push("vort-form-inline");
    if (props.class) classes.push(props.class);
    return classes;
});

// ==================== labelWidth="auto" 自动计算最大宽度逻辑 ====================

// 存储所有 FormItem 注册的 label 宽度
const labelWidthMap = ref<Map<string, number>>(new Map());

// 计算是否启用自动宽度
const isAutoLabelWidth = computed(() => props.labelWidth === "auto");

// 计算所有 label 的最大宽度
const autoLabelWidth = computed(() => {
    if (!isAutoLabelWidth.value) return undefined;
    const widths = Array.from(labelWidthMap.value.values());
    if (widths.length === 0) return "auto";
    const maxWidth = Math.max(...widths);
    return maxWidth ? `${maxWidth}px` : "auto";
});

// 生成唯一 ID
const generateLabelId = () => {
    return `form-item-label-${++formItemIdCounter}`;
};

// 注册 label 宽度
const registerLabelWidth = (id: string, width: number) => {
    labelWidthMap.value.set(id, width);
};

// 更新 label 宽度
const updateLabelWidth = (id: string, width: number) => {
    labelWidthMap.value.set(id, width);
};

// 注销 label 宽度
const unregisterLabelWidth = (id: string) => {
    labelWidthMap.value.delete(id);
};

// ==================== 提供给子组件的上下文 ====================

// 是否展示字段级校验状态（例如点击提交或手动调用 validateFields）
const isValidated = ref(false);
// 重置计数器，用于通知子组件重置交互状态
const resetCount = ref(0);
// 只把服务端错误交给当前确实能展示错误文案的 FormItem，未承接项由业务层兜底提示。
const registeredFields = new Set<{ getName: () => string | undefined; canDisplay: () => boolean }>();

const registerField = (getName: () => string | undefined, canDisplay: () => boolean): (() => void) => {
    const field = { getName, canDisplay };
    registeredFields.add(field);
    return () => {
        registeredFields.delete(field);
    };
};

const canDisplayField = (name: string) => Array.from(registeredFields).some((field) => field.getName() === name && field.canDisplay());

// submit 触发模式下，校验结果由业务层以 message 形式反馈，不渲染字段级错误态。
const shouldShowValidationState = (trigger: ValidateTrigger) => {
    return Array.isArray(trigger) ? trigger.some((item) => item === "change" || item === "blur") : trigger !== "submit";
};

const updateValidationState = () => {
    isValidated.value = shouldShowValidationState(props.validateTrigger);
};

// 提供给子组件的上下文（使用 computed 保持响应性）
const formContext = computed(() => ({
    layout: effectiveLayout.value,
    labelAlign: props.labelAlign,
    labelWidth: props.labelWidth,
    autoLabelWidth: autoLabelWidth.value,
    labelCol: props.labelCol,
    wrapperCol: props.wrapperCol,
    colon: props.colon,
    disabled: props.disabled,
    size: props.size,
    variant: props.variant,
    requiredMark: props.requiredMark,
    validateTrigger: props.validateTrigger,
    errors: errors.value,
    setFieldValue,
    setFieldError,
    validateField,
    isValidated: isValidated.value,
    resetCount: resetCount.value,
    registerField,
    // labelWidth="auto" 相关方法
    registerLabelWidth,
    updateLabelWidth,
    unregisterLabelWidth,
    generateLabelId
}));

provide(formContextKey, formContext);

const formEl = ref<HTMLFormElement | null>(null);

/**
 * vee-validate 聚合结果时会把字段路径按字母序排好，业务层拿「第一条错误」提示用户时就会跳到
 * 页面中间的字段。这里按 FormItem 在页面上的先后重排，没挂到 FormItem 的字段保持原序垫在最后。
 */
const sortErrorsByFieldOrder = (errorMap: Record<string, string>): Record<string, string> => {
    const nodes = formEl.value?.querySelectorAll<HTMLElement>("[data-field]");
    if (!nodes?.length) return errorMap;
    const order = new Map<string, number>();
    nodes.forEach((node, index) => {
        const field = node.dataset.field;
        if (field && !order.has(field)) order.set(field, index);
    });
    const rank = (key: string) => order.get(key) ?? Number.MAX_SAFE_INTEGER;
    const sorted: Record<string, string> = {};
    for (const key of Object.keys(errorMap).sort((a, b) => rank(a) - rank(b))) {
        sorted[key] = errorMap[key] ?? "";
    }
    return sorted;
};

// 表单提交
const onSubmit = handleSubmit(
    (formValues) => {
        updateValidationState();
        emit("finish", formValues);
    },
    (validationErrors) => {
        updateValidationState();
        const errorMap: Record<string, string> = {};
        for (const key in validationErrors.errors) {
            errorMap[key] = validationErrors.errors[key] || "";
        }
        emit("finishFailed", sortErrorsByFieldOrder(errorMap));
    }
);

// 重置表单
const resetFields = () => {
    isValidated.value = false;
    resetCount.value++;
    resetForm({
        values: props.model
    });
};

/** 已在 FormItem 下方展示的错误字段；submit 触发模式不渲染字段错误态，始终为空 */
const getDisplayedFields = (errorMap: Record<string, string>) =>
    isValidated.value ? Object.keys(errorMap).filter((name) => errorMap[name] && canDisplayField(name)) : [];

// 验证表单
const validateFields = async (names?: string | string[]) => {
    updateValidationState();
    const result = await validate();
    if (names) {
        const nameArr = Array.isArray(names) ? names : [names];
        const filteredErrors: Record<string, string> = {};
        for (const name of nameArr) {
            if (errors.value[name]) {
                filteredErrors[name] = errors.value[name] || "";
            }
        }
        const sortedErrors = sortErrorsByFieldOrder(filteredErrors);
        return {
            valid: Object.keys(filteredErrors).length === 0,
            errors: sortedErrors,
            displayedFields: getDisplayedFields(sortedErrors)
        };
    }
    const sortedErrors = sortErrorsByFieldOrder(result.errors as Record<string, string>);
    return { ...result, errors: sortedErrors, displayedFields: getDisplayedFields(sortedErrors) };
};

/** 把字段所在的 FormItem 滚动到可视区，已在可视区时不滚动 */
const scrollToField = (name: string) => {
    const nodes = formEl.value?.querySelectorAll<HTMLElement>("[data-field]") ?? [];
    Array.from(nodes)
        .find((node) => node.dataset.field === name)
        ?.scrollIntoView({ block: "nearest" });
};

/**
 * - 校验通过：resolve(true)
 * - 校验失败：reject({ errorFields })，不提供 message，避免业务层误弹 toast
 */
const validateCompat = async (names?: string | string[]) => {
    const result = (await validateFields(names)) as unknown as { valid?: boolean; errors?: Record<string, string> };
    const isValid = result?.valid ?? true;
    if (!isValid) {
        return Promise.reject({
            errorFields: result?.errors || {}
        });
    }
    return true;
};

// 清除验证
const clearValidate = (names?: string | string[]) => {
    if (!names) {
        isValidated.value = false;
        resetCount.value++;
    }
    if (names) {
        const nameArr = Array.isArray(names) ? names : [names];
        for (const name of nameArr) {
            setFieldError(name, "");
        }
    } else {
        for (const key in errors.value) {
            setFieldError(key, "");
        }
    }
};

// 设置字段值
const setFieldsValue = (fieldsValue: Record<string, unknown>) => {
    for (const [key, value] of Object.entries(fieldsValue)) {
        setFieldValue(key, value);
    }
};

/**
 * 写入外部校验结论（服务端返回的字段级错误），返回本次可展示错误的字段路径。
 * 字段路径与 FormItem.name 精确匹配；空文案、未注册或不能展示错误的字段不写入。
 *
 * 同时置 isValidated：这些错误不是用户交互产生的，若不放行，FormItem 会因为
 * 「用户还没碰过这个字段」而拒绝渲染，错误就静默消失了。
 *
 * 用户随后修改字段会触发 model 的整表重新校验，把这里写入的错误清掉——这是对的，
 * 服务端针对旧值的结论不该压在新输入上。
 */
const setFields = (fieldErrors: Record<string, string>): string[] => {
    const displayedFields: string[] = [];
    for (const [name, error] of Object.entries(fieldErrors)) {
        if (!name || !error.trim()) continue;
        if (!canDisplayField(name)) continue;
        setFieldError(name, error);
        displayedFields.push(name);
    }
    if (displayedFields.length > 0) isValidated.value = true;
    return displayedFields;
};

// 获取字段值
const getFieldsValue = (names?: string | string[]) => {
    if (names) {
        const nameArr = Array.isArray(names) ? names : [names];
        const result: Record<string, unknown> = {};
        for (const name of nameArr) {
            result[name] = values[name];
        }
        return result;
    }
    return { ...values };
};

// 暴露方法
defineExpose({
    /** 提交表单 */
    submit: onSubmit,
    /** 重置表单 */
    resetFields,
    /** 兼容：validate() */
    validate: validateCompat,
    /** 验证表单 */
    validateFields,
    /** 清除验证 */
    clearValidate,
    /** 设置字段值 */
    setFieldsValue,
    /** 获取字段值 */
    getFieldsValue,
    /** 写入外部（服务端）字段级错误，返回已承接的字段路径 */
    setFields,
    /** 滚动到字段 */
    scrollToField
});
</script>

<template>
    <form ref="formEl" :class="formClasses" @submit.prevent="onSubmit">
        <slot />
    </form>
</template>

<style scoped>
.vort-form {
    font-size: 14px;
    color: var(--vort-text);
}

/* 水平布局 - 样式由 FormItem 处理 */

/* 垂直布局 - 样式由 FormItem 处理 */

/* 行内布局 */
.vort-form-inline {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}

.vort-form-inline :deep(.vort-form-item) {
    margin-bottom: 0;
}

/* 响应式布局过渡效果 */
.vort-form :deep(.vort-form-item) {
    transition:
        flex-direction 0.2s ease,
        padding 0.2s ease;
}

.vort-form :deep(.vort-form-item-label) {
    transition:
        width 0.2s ease,
        padding 0.2s ease,
        text-align 0.2s ease,
        justify-content 0.2s ease;
}

.vort-form :deep(.vort-form-item-control) {
    transition: width 0.2s ease;
}
</style>
