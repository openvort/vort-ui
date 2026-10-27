/**
 * useFormItemStatus - FormItem 校验状态与控件 status 合并 composable
 *
 * 设计参考 antd 的 FormItemInputContext / NoFormStyle：
 *   FormItem 把 error / warning 下发给其中的录入控件，控件按自身形态显示状态样式；
 *   弹层内容（Dialog、Drawer、Popover 等）与组件内部的辅助控件（Pagination、ColorPicker 面板）
 *   用 NoFormItemStatus 隔断，避免误继承外层字段的校验结果。
 *
 * 优先级：控件自身 status > 所在 FormItem 的校验状态 > 无。
 *
 * 用法：
 *
 *   const mergedStatus = useFormItemStatus(() => props.status);
 *   // 类名里把 props.status 换成 mergedStatus.value
 *
 * ⚠️ 注意：必须在组件的 setup() 顶层（同步阶段）调用，因为内部依赖 inject() / provide()。
 */
import { computed, defineComponent, inject, provide, toValue, type MaybeRefOrGetter } from "vue";
import { formItemStatusKey } from "./constants";
import type { FormItemControlStatus } from "./types";

export function useFormItemStatus<T extends string>(propStatus: MaybeRefOrGetter<T | undefined>) {
    const formItemStatus = inject(formItemStatusKey, undefined);
    return computed<T | FormItemControlStatus | undefined>(() => toValue(propStatus) ?? formItemStatus?.value);
}

/** 在当前组件内隔断外层 FormItem 的校验状态 */
export function resetFormItemStatus() {
    provide(
        formItemStatusKey,
        computed(() => undefined)
    );
}

/** 包裹弹层内容，其中的录入控件不继承外层 FormItem 的校验状态 */
export const NoFormItemStatus = defineComponent({
    name: "VortNoFormItemStatus",
    setup(_, { slots }) {
        resetFormItemStatus();
        return () => slots.default?.();
    }
});
