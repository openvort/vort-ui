export { default as Form } from "./Form.vue";
export { default as FormItem } from "./FormItem.vue";

// 注入键 / Composable 导出（供录入类组件接通 Form disabled / variant 上下文使用）
export { formContextKey, formItemStatusKey } from "./constants";
export { useFormDisabled } from "./useFormDisabled";
export { useFormVariant } from "./useFormVariant";
export { useFormItemStatus, NoFormItemStatus } from "./useFormItemStatus";

// 类型导出
export type {
    FormLayout,
    FormSize,
    FormVariant,
    LabelAlign,
    ValidateTrigger,
    ValidateStatus,
    FormItemControlStatus,
    ColProps,
    FormProps,
    FormEmits,
    FormExpose,
    FormItemProps,
    FormContext
} from "./types";
