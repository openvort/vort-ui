/**
 * useFormVariant - 录入类组件形态变体合并 composable
 *
 * 设计参考 antd 5.13+ 的 useVariant（components/form/hooks/useVariants.ts）。
 *
 * 优先级（从高到低）：
 *   1. 组件自身 variant
 *   2. 组件自身 bordered === false → borderless（兼容旧属性；bordered 为 true 时不拦截上下文）
 *   3. Form 级 variant（来自 <vort-form variant="...">）
 *   4. ConfigProvider 级 variant（来自 <vort-config-provider variant="...">）
 *   5. 默认 outlined
 *
 * 用法：
 *
 *   const props = withDefaults(defineProps<{ variant?: FormVariant; bordered?: boolean }>(), {
 *       bordered: true   // variant 不要给默认值，否则上下文永远不会生效
 *   });
 *   const mergedVariant = useFormVariant(() => props.variant, () => props.bordered);
 *
 * 二次封装组件（如 AutoComplete、InputSearch）应在外层解析后把结果作为 variant 显式传给内层控件，
 * 避免内层再按自己的 bordered 默认值重新判断。
 *
 * ⚠️ 注意：必须在组件的 setup() 顶层（同步阶段）调用，因为内部依赖 inject()。
 */
import { computed, inject, toValue, type MaybeRefOrGetter } from "vue";
import { CONFIG_PROVIDER_KEY } from "../config-provider/types";
import { formContextKey } from "./constants";
import type { FormVariant } from "./types";

export function useFormVariant(propVariant: MaybeRefOrGetter<FormVariant | undefined>, propBordered?: MaybeRefOrGetter<boolean | undefined>) {
    const formContext = inject(formContextKey, undefined);
    const configContext = inject(CONFIG_PROVIDER_KEY, undefined);

    return computed<FormVariant>(() => {
        const variant = toValue(propVariant);
        if (variant) return variant;
        if (toValue(propBordered) === false) return "borderless";
        return formContext?.value?.variant ?? configContext?.value.variant ?? "outlined";
    });
}
