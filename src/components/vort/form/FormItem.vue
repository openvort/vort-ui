<script setup lang="ts">
import { computed, inject, provide, ref, onMounted, onBeforeUnmount, watch, nextTick } from "vue";
import { useField } from "vee-validate";
import { CheckCircleFilled, CloseCircleFilled, ExclamationCircleFilled, LoadingOutlined, QuestionOutlined } from "../icons";
import { Tooltip } from "../tooltip";
import { useLocale } from "../locale/useLocale";
import { formContextKey, formItemStatusKey } from "./constants";

defineOptions({ name: "VortFormItem" });

const { t: formT } = useLocale("Form");

/** Vort FormItem - 表单项组件 */

type ValidateStatus = "success" | "warning" | "error" | "validating" | "";
type RuleValidator = (rule: Record<string, unknown>, value: unknown, callback: (error?: Error | string) => void) => void;
type RuleRecord = Record<string, unknown> & { validator?: RuleValidator };

interface ColProps {
    /** 栅格占位格数 */
    span?: number;
    /** 栅格左侧的间隔格数 */
    offset?: number;
}

interface Props {
    /** 字段名，用于表单验证 */
    name?: string;
    /** label 标签的文本 */
    label?: string;
    /** 是否必填 */
    required?: boolean;
    /** 验证规则 */
    rules?: unknown[];
    /** 标签的长度，例如 '50px'。可以使用 'auto'（会覆盖 Form 的 labelWidth） */
    labelWidth?: string;
    /** label 标签布局（会覆盖 Form 的 labelCol） */
    labelCol?: ColProps;
    /** 控件布局（会覆盖 Form 的 wrapperCol） */
    wrapperCol?: ColProps;
    /** 是否显示 label 后面的冒号 */
    colon?: boolean;
    /** 提示信息 */
    help?: string;
    /** 额外的提示信息 */
    extra?: string;
    /** 校验状态 */
    validateStatus?: ValidateStatus;
    /** 是否展示校验状态图标 */
    hasFeedback?: boolean;
    /** 提示信息 */
    tooltip?: string;
    /** 自定义类名 */
    class?: string;
}

const props = withDefaults(defineProps<Props>(), {
    required: false,
    hasFeedback: false
});

// 注入 Form 上下文（类型由 formContextKey 的 InjectionKey 自动推导）
const formContext = inject(formContextKey, undefined);
const formItemEl = ref<HTMLElement | null>(null);
let unregisterField: (() => void) | undefined;

// 离屏但可滚动到的字段仍可承接错误；隐藏项、帮助文案覆盖和 inline 布局不能承接。
const canDisplayFieldError = () => {
    const element = formItemEl.value;
    if (!element?.isConnected || props.help || layout.value === "inline" || element.getClientRects().length === 0) return false;
    const visibility = getComputedStyle(element).visibility;
    return visibility !== "hidden" && visibility !== "collapse";
};

// Label 元素引用
const labelRef = ref<HTMLElement | null>(null);

// 当前 FormItem 的 label ID（用于注册宽度）
let labelId: string | null = null;

// 是否使用自动宽度
const isAutoLabelWidth = computed(() => {
    const width = props.labelWidth || formContext?.value?.labelWidth;
    return width === "auto";
});

// 测量并注册 label 宽度
const measureAndRegisterLabelWidth = () => {
    if (!isAutoLabelWidth.value || !labelRef.value) return;

    const ctx = formContext?.value;
    if (!ctx?.registerLabelWidth || !ctx?.generateLabelId) return;

    // 获取 label 内部文本元素的宽度
    const labelTextEl = labelRef.value.querySelector(".vort-form-item-label-text") as HTMLElement;
    if (!labelTextEl) return;

    const width = labelTextEl.offsetWidth;

    if (!labelId) {
        labelId = ctx.generateLabelId();
        ctx.registerLabelWidth(labelId, width);
    } else if (ctx.updateLabelWidth) {
        ctx.updateLabelWidth(labelId, width);
    }
};

// 注销 label 宽度
const unregisterLabel = () => {
    if (labelId && formContext?.value?.unregisterLabelWidth) {
        formContext.value.unregisterLabelWidth(labelId);
        labelId = null;
    }
};

onMounted(() => {
    unregisterField = formContext?.value?.registerField(() => props.name, canDisplayFieldError);
    // 延迟测量，确保 DOM 渲染完成
    nextTick(() => {
        measureAndRegisterLabelWidth();
    });
});

onBeforeUnmount(() => {
    unregisterField?.();
    unregisterLabel();
});

// 监听 label 变化，重新测量
watch(
    () => props.label,
    () => {
        nextTick(() => {
            measureAndRegisterLabelWidth();
        });
    }
);

// ===================== 自定义规则验证器 =====================
/**
 * 将 Ant Design 风格的 rules 转换为 vee-validate 验证函数
 * 支持的规则格式：
 * - { required: true, message: '必填' }
 * - { type: 'number', min: 0, message: '...' }
 * - { validator: (rule, value, callback) => void }
 */
const createRulesValidator = (rules: unknown[]) => {
    return async (value: unknown) => {
        if (!rules || rules.length === 0) return true;

        for (const rule of rules) {
            const r = rule as RuleRecord;

            // 自定义验证器
            if (typeof r.validator === "function") {
                const validator = r.validator;
                try {
                    await new Promise<void>((resolve, reject) => {
                        validator(r, value, (error?: Error | string) => {
                            if (error) {
                                reject(typeof error === "string" ? new Error(error) : error);
                            } else {
                                resolve();
                            }
                        });
                    });
                } catch (e: unknown) {
                    return e instanceof Error ? e.message || formT("validation_failed") : formT("validation_failed");
                }
                continue;
            }

            // 必填验证
            if (r.required) {
                const isEmpty = value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0);
                if (isEmpty) {
                    return (r.message as string) || formT("required");
                }
            }

            // 类型验证
            if (r.type === "number" && value !== undefined && value !== null && value !== "") {
                const numValue = Number(value);
                if (isNaN(numValue)) {
                    return (r.message as string) || formT("number");
                }
                if (typeof r.min === "number" && numValue < r.min) {
                    return (r.message as string) || formT("min_value", { min: r.min as number });
                }
                if (typeof r.max === "number" && numValue > r.max) {
                    return (r.message as string) || formT("max_value", { max: r.max as number });
                }
            }

            // 字符串长度验证
            if (r.type === "string" || (!r.type && typeof value === "string")) {
                const strValue = String(value || "");
                if (typeof r.min === "number" && strValue.length < r.min) {
                    return (r.message as string) || formT("min_length", { min: r.min as number });
                }
                if (typeof r.max === "number" && strValue.length > r.max) {
                    return (r.message as string) || formT("max_length", { max: r.max as number });
                }
            }

            // 正则验证
            if (r.pattern && value) {
                const regex = r.pattern instanceof RegExp ? r.pattern : new RegExp(r.pattern as string);
                if (!regex.test(String(value))) {
                    return (r.message as string) || formT("pattern");
                }
            }
        }

        return true;
    };
};

// 使用 vee-validate 的 useField（仅在有 name 时）
const fieldName = computed(() => props.name || "");
const rulesValidator = computed(() => {
    if (props.rules && Array.isArray(props.rules) && props.rules.length > 0) {
        return createRulesValidator(props.rules);
    }
    return undefined;
});

const validateTrigger = formContext?.value?.validateTrigger;
const validateOnValueUpdate = Array.isArray(validateTrigger) ? validateTrigger.includes("change") : validateTrigger ? validateTrigger === "change" : true;

const { errorMessage, meta } = props.name
    ? useField(fieldName, rulesValidator, {
          // submit 触发的表单由业务提交动作统一校验，输入时不产生字段错误态。
          validateOnValueUpdate
      })
    : { errorMessage: ref(""), meta: ref<Record<string, unknown>>({}) };

// 计算最终的 labelWidth
const finalLabelWidth = computed(() => {
    const width = props.labelWidth || formContext?.value?.labelWidth;
    // 如果是 auto，返回 Form 计算的自动宽度
    if (width === "auto") {
        return formContext?.value?.autoLabelWidth || "auto";
    }
    return width;
});

// 计算最终的 labelCol
const finalLabelCol = computed(() => {
    return props.labelCol || formContext?.value?.labelCol || { span: 8 };
});

// 计算最终的 wrapperCol
const finalWrapperCol = computed(() => {
    return props.wrapperCol || formContext?.value?.wrapperCol || { span: 16 };
});

// 计算是否显示冒号
const showColon = computed(() => {
    // 如果 FormItem 明确设置了 colon，使用它
    if (props.colon !== undefined) return props.colon;
    // 否则使用 Form 的 colon 设置，默认为 true
    return formContext?.value?.colon ?? true;
});

// 计算布局
const layout = computed(() => formContext?.value?.layout || "horizontal");
const labelAlign = computed(() => formContext?.value?.labelAlign || "right");

// 记录用户是否与此表单项发生过交互
const isInteracted = ref(false);

const handleUserInteraction = (event: Event) => {
    // 聚焦问号只为查看说明，不算编辑字段，不能触发或清除校验状态。
    if (event.target instanceof Element && event.target.closest(".vort-form-item-tooltip")) return;
    // 提交触发模式下，聚焦、输入和 change 都不能提前展示错误状态。
    const context = formContext?.value;
    const trigger = context?.validateTrigger;
    const tracksInteraction = Array.isArray(trigger) ? trigger.some((item) => item === "change" || item === "blur") : trigger ? trigger !== "submit" : true;
    if (!tracksInteraction) {
        // 用户开始修改已提交过的字段时清除上一轮结论，但不重新触发校验。
        if (props.name && context) context.setFieldError(props.name, "");
        return;
    }
    isInteracted.value = true;
};

// 监听表单整体校验状态和重置计数器，如果被重置，则同步重置当前项的交互状态
watch(
    () => formContext?.value?.resetCount,
    () => {
        isInteracted.value = false;
    }
);

watch(
    () => formContext?.value?.isValidated,
    (val) => {
        if (!val) {
            isInteracted.value = false;
        }
    }
);

// 验证状态
const validateStatus = computed<ValidateStatus>(() => {
    if (props.validateStatus) return props.validateStatus;
    if (!props.name) return "";

    // 从 form context 获取错误信息
    const contextError = formContext?.value?.errors?.[props.name];
    if (contextError || errorMessage.value) {
        // 只有当用户与当前项交互过，或表单整体被校验过，才显示错误状态
        if (isInteracted.value || formContext?.value?.isValidated) {
            return "error";
        }
    }
    if ("value" in meta && (meta.value as { valid?: boolean })?.valid) {
        // 只有当用户与当前项交互过，或表单整体被校验过，才显示成功状态
        if (isInteracted.value || formContext?.value?.isValidated) {
            return "success";
        }
    }
    return "";
});

// 把 error / warning 下发给其中的录入控件，由控件按自身形态显示状态样式
provide(
    formItemStatusKey,
    computed(() => (validateStatus.value === "error" || validateStatus.value === "warning" ? validateStatus.value : undefined))
);

// 验证消息
const validationMessage = computed(() => {
    if (props.help) return props.help;
    if (!props.name) return "";
    const error = formContext?.value?.errors?.[props.name] || errorMessage.value || "";
    if (error) {
        // 只有当用户与当前项交互过，或表单整体被校验过，才显示错误消息
        if (isInteracted.value || formContext?.value?.isValidated) {
            return error;
        }
    }
    return "";
});

// 是否为 optional 模式
const isOptionalMode = computed(() => {
    return formContext?.value?.requiredMark === "optional";
});

// ===================== 问号提示 =====================
const tooltipRef = ref<InstanceType<typeof Tooltip> | null>(null);
const isTooltipOpen = ref(false);

const tooltipAriaLabel = computed(() => (props.label ? formT("tooltip_label", { label: props.label }) : formT("tooltip_label_default")));

// 悬停之外也支持键盘：聚焦即打开，失焦关闭，Enter / 空格重新打开。
const showTooltip = () => tooltipRef.value?.show();
const hideTooltip = () => tooltipRef.value?.hide();

const handleTooltipKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
        // 提示打开时 Esc 只关闭提示，不连带关闭外层弹窗。
        if (!isTooltipOpen.value) return;
        event.stopPropagation();
        hideTooltip();
    } else if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        showTooltip();
    }
};

// 表单项样式
const formItemClasses = computed(() => {
    const classes = ["vort-form-item"];
    if (layout.value === "horizontal") classes.push("vort-form-item-horizontal");
    if (layout.value === "vertical") classes.push("vort-form-item-vertical");
    if (layout.value === "inline") classes.push("vort-form-item-inline");
    if (validateStatus.value === "error") classes.push("vort-form-item-has-error");
    if (validateStatus.value === "success") classes.push("vort-form-item-has-success");
    if (validateStatus.value === "warning") classes.push("vort-form-item-has-warning");
    if (validateStatus.value === "validating") classes.push("vort-form-item-is-validating");
    if (props.hasFeedback) classes.push("vort-form-item-has-feedback");
    if (props.class) classes.push(props.class);
    return classes;
});

// Label 样式
const labelClasses = computed(() => {
    const classes = ["vort-form-item-label"];
    if (labelAlign.value === "left") classes.push("vort-form-item-label-left");
    if (labelAlign.value === "right") classes.push("vort-form-item-label-right");
    return classes;
});

// 栅格宽度计算
const labelStyle = computed(() => {
    if (layout.value !== "horizontal") return {};

    // 如果是 auto 模式
    if (isAutoLabelWidth.value) {
        const autoWidth = formContext?.value?.autoLabelWidth;
        // 如果已经计算出了自动宽度，使用它
        if (autoWidth && autoWidth !== "auto") {
            return {
                width: autoWidth,
                flexShrink: 0
            };
        }
        // 否则让 label 以自然宽度渲染（用于测量）
        return {
            width: "auto",
            flexShrink: 0
        };
    }

    // 如果设置了固定的 labelWidth
    if (finalLabelWidth.value) {
        return {
            width: finalLabelWidth.value,
            flexShrink: 0
        };
    }

    // 否则使用栅格系统
    const span = finalLabelCol.value.span || 8;
    const offset = finalLabelCol.value.offset || 0;
    return {
        width: `${(span / 24) * 100}%`,
        marginLeft: offset ? `${(offset / 24) * 100}%` : undefined
    };
});

const wrapperStyle = computed(() => {
    if (layout.value !== "horizontal") return {};

    // 如果使用了 labelWidth（包括 auto），wrapper 自动占用剩余空间
    if (isAutoLabelWidth.value || finalLabelWidth.value) {
        return {
            flex: 1,
            minWidth: 0
        };
    }

    // 否则使用栅格系统
    const span = finalWrapperCol.value.span || 16;
    const offset = finalWrapperCol.value.offset || 0;
    return {
        width: `${(span / 24) * 100}%`,
        marginLeft: offset ? `${(offset / 24) * 100}%` : undefined
    };
});

// 错误信息行的样式（在水平布局下需要和控件区域对齐）
const explainRowStyle = computed(() => {
    if (layout.value !== "horizontal") return {};

    // 如果是 auto 模式
    if (isAutoLabelWidth.value) {
        const autoWidth = formContext?.value?.autoLabelWidth;
        if (autoWidth && autoWidth !== "auto") {
            return {
                marginLeft: autoWidth
            };
        }
        // auto 还没计算出来时，不设置左边距
        return {};
    }

    // 如果设置了固定的 labelWidth
    if (finalLabelWidth.value) {
        return {
            marginLeft: finalLabelWidth.value
        };
    }

    // 否则使用栅格系统计算
    const labelSpan = finalLabelCol.value.span || 8;
    const labelOffset = finalLabelCol.value.offset || 0;
    const wrapperOffset = finalWrapperCol.value.offset || 0;
    // 错误信息行的左边距 = label 宽度 + label offset + wrapper offset
    const totalOffset = labelSpan + labelOffset + wrapperOffset;
    return {
        marginLeft: `${(totalOffset / 24) * 100}%`
    };
});

// 反馈图标
const feedbackIcon = computed(() => {
    if (!props.hasFeedback) return null;
    switch (validateStatus.value) {
        case "success":
            return CheckCircleFilled;
        case "error":
            return CloseCircleFilled;
        case "warning":
            return ExclamationCircleFilled;
        case "validating":
            return LoadingOutlined;
        default:
            return null;
    }
});

// 反馈图标颜色
const feedbackIconClass = computed(() => {
    switch (validateStatus.value) {
        case "success":
            return "vort-form-item-feedback-success";
        case "error":
            return "vort-form-item-feedback-error";
        case "warning":
            return "vort-form-item-feedback-warning";
        case "validating":
            return "vort-form-item-feedback-validating";
        default:
            return "";
    }
});
</script>

<template>
    <div
        ref="formItemEl"
        :class="formItemClasses"
        :data-field="name || undefined"
        @focusin="handleUserInteraction"
        @change="handleUserInteraction"
        @input="handleUserInteraction"
    >
        <!-- Label 区域 -->
        <div v-if="label || $slots.label" ref="labelRef" :class="labelClasses" :style="labelStyle">
            <label :for="name" class="vort-form-item-label-text">
                <!-- 必填标记（非 optional 模式） -->
                <span v-if="props.required && !isOptionalMode" class="vort-form-item-required-mark">*</span>
                <!-- Label 文本 -->
                <slot name="label">{{ label }}</slot>
                <!-- 可选标记（optional 模式下的非必填项） -->
                <span v-if="!props.required && isOptionalMode" class="vort-form-item-optional-mark">{{ formT("optional") }}</span>
                <!-- 冒号 -->
                <span v-if="showColon" class="vort-form-item-colon">:</span>
                <!-- 问号提示：外层只管与标签文字的间距，让触发区与图标同大、浮层对准图标中心。
                     阻止点击的默认行为，避免点问号时 label 把焦点转给关联控件。 -->
                <span v-if="tooltip" class="vort-form-item-tooltip-wrapper">
                    <Tooltip ref="tooltipRef" placement="top" @open-change="isTooltipOpen = $event">
                        <template #title>{{ tooltip }}</template>
                        <span
                            class="vort-form-item-tooltip"
                            role="button"
                            tabindex="0"
                            :aria-label="tooltipAriaLabel"
                            @click.prevent
                            @focus="showTooltip"
                            @blur="hideTooltip"
                            @keydown="handleTooltipKeydown"
                        >
                            <QuestionOutlined />
                        </span>
                    </Tooltip>
                </span>
            </label>
        </div>

        <!-- 控件区域 -->
        <div class="vort-form-item-control" :style="wrapperStyle">
            <div class="vort-form-item-control-input">
                <div class="vort-form-item-control-input-content">
                    <slot />
                </div>
                <!-- 反馈图标 -->
                <span v-if="hasFeedback && feedbackIcon" class="vort-form-item-feedback-icon" :class="feedbackIconClass">
                    <component :is="feedbackIcon" :class="{ 'animate-spin': validateStatus === 'validating' }" />
                </span>
            </div>

            <!-- 额外信息 -->
            <div v-if="extra || $slots.extra" class="vort-form-item-extra">
                <slot name="extra">{{ extra }}</slot>
            </div>
        </div>

        <!-- 错误/帮助信息  -->
        <div v-if="layout !== 'inline'" class="vort-form-item-explain-row" :style="explainRowStyle">
            <Transition name="vort-form-explain">
                <div v-if="validationMessage" class="vort-form-item-explain">
                    <div
                        class="vort-form-item-explain-text"
                        :class="{
                            'vort-form-item-explain-error': validateStatus === 'error',
                            'vort-form-item-explain-warning': validateStatus === 'warning',
                            'vort-form-item-explain-success': validateStatus === 'success'
                        }"
                    >
                        {{ validationMessage }}
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>

<style scoped>
.vort-form-item {
    margin-bottom: 24px;
    position: relative;
}

/* 水平布局 */
.vort-form-item-horizontal {
    display: flex;
    flex-wrap: wrap;
}

.vort-form-item-horizontal .vort-form-item-label {
    flex-shrink: 0;
}

.vort-form-item-horizontal .vort-form-item-control {
    flex: 1;
    min-width: 0;
}

/* 垂直布局 */
.vort-form-item-vertical {
    display: flex;
    flex-direction: column;
}

.vort-form-item-vertical .vort-form-item-label {
    padding: 0 0 8px;
    line-height: 1.5;
    text-align: left !important;
    justify-content: flex-start !important;
}

/* 行内布局 */
.vort-form-item-inline {
    display: inline-flex;
    flex-wrap: nowrap;
    margin-right: 16px;
    margin-bottom: 0;
}

.vort-form-item-inline .vort-form-item-label {
    flex-shrink: 0;
}

/* Label 样式 */
.vort-form-item-label {
    display: flex;
    align-items: flex-start;
    color: var(--vort-text);
    font-size: 14px;
    height: 32px;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
}

.vort-form-item-label-text {
    display: inline-flex;
    align-items: center;
    height: 32px;
    line-height: 32px;
    position: relative;
}

.vort-form-item-label-left {
    justify-content: flex-start;
}

.vort-form-item-label-left .vort-form-item-label-text {
    padding-right: 12px;
}

.vort-form-item-label-right {
    justify-content: flex-end;
}

.vort-form-item-label-right .vort-form-item-label-text {
    padding-right: 12px;
}

/* 必填标记 - Ant Design 样式 */
.vort-form-item-required-mark {
    display: inline-block;
    margin-inline-end: 4px;
    color: var(--vort-error);
    font-size: 14px;
    font-family: SimSun, sans-serif;
    line-height: 1;
}

/* 可选标记 */
.vort-form-item-optional-mark {
    color: var(--vort-text-quaternary);
    font-size: 14px;
    margin-inline-start: 4px;
}

/* 冒号 - Ant Design 样式：紧跟文字，无间距 */
.vort-form-item-colon {
    position: relative;
    margin-block: 0;
    margin-inline-start: 2px;
    margin-inline-end: 8px;
}

/* 问号提示：紧跟标签文字，与文字垂直居中 */
.vort-form-item-tooltip-wrapper {
    display: inline-flex;
    margin-inline-start: 4px;
    /* 标签文字被改成块级排版时（如英文环境）仍与文字居中 */
    vertical-align: -0.125em;
}

.vort-form-item-tooltip {
    display: inline-flex;
    align-items: center;
    color: var(--vort-text-quaternary);
    border-radius: 50%;
    transition:
        color 0.2s,
        box-shadow 0.2s;
}

.vort-form-item-tooltip:hover,
.vort-form-item-tooltip:focus-visible {
    color: var(--vort-text-secondary);
}

.vort-form-item-tooltip:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--vort-primary-shadow, rgba(20, 86, 240, 0.1));
}

/* 控件区域 */
.vort-form-item-control {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.vort-form-item-control-input {
    position: relative;
    display: flex;
    align-items: center;
    min-height: 32px;
}

.vort-form-item-control-input-content {
    flex: auto;
    max-width: 100%;
}

/* 反馈图标 */
.vort-form-item-feedback-icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    line-height: 1;
    pointer-events: none;
    z-index: 1;
}

/* 错误/帮助信息行 - Ant Design 风格
 * 放在表单项主行之外，使用负 margin 占用 margin-bottom 空间
 * 这样错误信息出现时不会挤占其他表单项的空间
 */
.vort-form-item-explain-row {
    /* 占据整行宽度，让它换行显示 */
    width: 100%;
    flex-basis: 100%;
    /* 预留高度用于显示错误信息 */
    min-height: 24px;
    /* 使用负 margin 占用表单项的 margin-bottom 空间 */
    margin-top: 0;
    margin-bottom: -24px;
}
.vort-form-item {
    .vort-form-item {
        margin-bottom: 0;
        .vort-form-item-explain-row {
            margin-left: 1px !important;
            position: absolute;
            top: 100%;
        }
    }
}

.vort-form-item-explain {
    font-size: 14px;
    line-height: 1.5715;
    color: var(--vort-text-secondary);
}

.vort-form-item-explain-text {
    color: var(--vort-error);
}

.vort-form-item-explain-error {
    color: var(--vort-error);
}

.vort-form-item-explain-warning {
    color: var(--vort-warning);
}

.vort-form-item-explain-success {
    color: var(--vort-success);
}

/* 反馈图标颜色 */
.vort-form-item-feedback-success {
    color: var(--vort-success);
}

.vort-form-item-feedback-error {
    color: var(--vort-error);
}

.vort-form-item-feedback-warning {
    color: var(--vort-warning);
}

.vort-form-item-feedback-validating {
    color: var(--vort-primary);
}

/* 错误信息展示动画 */
.vort-form-explain-enter-active,
.vort-form-explain-leave-active {
    transition:
        opacity 0.15s ease-in-out,
        transform 0.15s ease-in-out;
}

.vort-form-explain-enter-from,
.vort-form-explain-leave-to {
    opacity: 0;
    transform: translateY(-4px);
}

/* 额外信息 */
.vort-form-item-extra {
    color: var(--vort-form-extra-color);
    font-size: var(--vort-form-extra-font-size);
    line-height: 1.5715;
    padding-top: 2px;
}

/* 加载动画 */
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.animate-spin {
    animation: spin 1s linear infinite;
}
</style>
