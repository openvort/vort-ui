/**
 * Form 组件类型定义
 */
import type { ZodType } from "zod";

/** 表单布局类型 */
export type FormLayout = "horizontal" | "vertical" | "inline";

/** 表单尺寸 */
export type FormSize = "large" | "middle" | "small";

/**
 * 录入类控件的形态变体（对齐 antd Variant）
 * - outlined: 默认有边框
 * - filled: 填充背景
 * - borderless: 无边框
 * - underlined: 下划线
 */
export type FormVariant = "outlined" | "filled" | "borderless" | "underlined";

/** 标签对齐方式 */
export type LabelAlign = "left" | "right";

/** 验证触发时机 */
export type ValidateTrigger = "change" | "blur" | "submit" | Array<"change" | "blur" | "submit">;

/** 验证状态 */
export type ValidateStatus = "success" | "warning" | "error" | "validating" | "";

/** FormItem 下发给录入控件的校验状态；成功、校验中不改变控件外观（对齐 antd） */
export type FormItemControlStatus = "error" | "warning";

/** 栅格配置 */
export interface ColProps {
    /** 栅格占位格数 */
    span?: number;
    /** 栅格左侧的间隔格数 */
    offset?: number;
}

/** Form 组件 Props */
export interface FormProps {
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

/** Form 组件 Emits */
export interface FormEmits {
    /** 表单提交且验证通过时触发 */
    (e: "finish", values: Record<string, unknown>): void;
    /** 表单提交且验证失败时触发 */
    (e: "finishFailed", errors: Record<string, string>): void;
    /** 字段值变更时触发 */
    (e: "valuesChange", changedValues: Record<string, unknown>, allValues: Record<string, unknown>): void;
}

/** Form 组件暴露的方法 */
export interface FormExpose {
    /** 提交表单 */
    submit: () => Promise<void>;
    /** 重置表单 */
    resetFields: () => void;
    validate: (names?: string | string[]) => Promise<true | never>;
    /** 验证表单字段；displayedFields 为已在 FormItem 下方展示的错误字段，其余错误需调用方自行提示 */
    validateFields: (names?: string | string[]) => Promise<{ valid: boolean; errors: Record<string, string>; displayedFields: string[] }>;
    /** 清除验证 */
    clearValidate: (names?: string | string[]) => void;
    /** 设置字段值 */
    setFieldsValue: (fieldsValue: Record<string, unknown>) => void;
    /** 获取字段值 */
    getFieldsValue: (names?: string | string[]) => Record<string, unknown>;
    /** 写入外部（服务端）字段级错误，返回已承接的字段路径；路径与 FormItem.name 精确匹配 */
    setFields: (fieldErrors: Record<string, string>) => string[];
    /** 把字段所在的 FormItem 滚动到可视区，已在可视区时不滚动 */
    scrollToField: (name: string) => void;
}

/** FormItem 组件 Props */
export interface FormItemProps {
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

/** Form 上下文（注入给子组件） */
export interface FormContext {
    layout: FormLayout;
    labelAlign: LabelAlign;
    labelWidth?: string;
    autoLabelWidth?: string;
    labelCol?: ColProps;
    wrapperCol?: ColProps;
    colon: boolean;
    disabled: boolean;
    size: FormSize;
    /** 未设置时为 undefined，由控件继续向 ConfigProvider 回退 */
    variant?: FormVariant;
    requiredMark: boolean | "optional";
    validateTrigger: ValidateTrigger;
    errors: Partial<Record<string, string>>;
    /** 是否已经执行过表单校验 */
    isValidated: boolean;
    /** 重置次数，用于通知字段清理交互状态 */
    resetCount: number;
    /** 注册字段名和错误文案展示能力，返回注销方法 */
    registerField: (getName: () => string | undefined, canDisplay: () => boolean) => () => void;
    setFieldValue: (name: string, value: unknown) => void;
    setFieldError: (name: string, message: string) => void;
    validateField: (name: string) => Promise<unknown>;
    registerLabelWidth?: (id: string, width: number) => void;
    updateLabelWidth?: (id: string, width: number) => void;
    unregisterLabelWidth?: (id: string) => void;
    generateLabelId?: () => string;
}
