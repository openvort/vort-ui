/**
 * useFormDisabled - 表单 disabled 状态合并 composable
 *
 * 设计参考 Element Plus 2.12+ 的 useFormDisabled hook：
 * https://github.com/element-plus/element-plus/blob/dev/packages/components/form/src/hooks/use-form-common-props.ts
 *
 * 优先级（从高到低）：
 *   1. 组件自身 prop（显式传值，含 false）
 *   2. fallback 回退值（可选，便于二次封装传入额外上下文，如 RadioGroup/CheckboxGroup 的 disabled）
 *   3. Form 级 disabled（来自 <vort-form :disabled="...">）
 *   4. 默认 false
 *
 * --------------------------------------------------------------------
 * 基础用法（普通录入组件，如 Input / Textarea / Switch / Select 等）：
 *
 *   const props = defineProps<{ disabled?: boolean }>();  // disabled 不要给默认 false
 *   const mergedDisabled = useFormDisabled(() => props.disabled);
 *   // 模板里把所有 props.disabled 替换为 mergedDisabled
 *
 * --------------------------------------------------------------------
 * 进阶用法（容器型组件的子项，如 Radio / Checkbox / RadioButton）：
 *
 *   通过 fallback 形参传入 Group 上下文的 disabled，实现三层优先级：
 *
 *   const groupCtx = inject<RadioGroupContext | null>("radioGroupContext", null);
 *   const isDisabled = useFormDisabled(
 *       () => props.disabled,                    // 自身显式 prop（最高优先级）
 *       () => groupCtx?.disabled.value           // Group 级 disabled（中间层）
 *   );
 *   // Form 级 disabled 自动作为最后兜底
 *
 *   行为示例：
 *     - <vort-radio-group :disabled="true"><vort-radio /></vort-radio-group> → 禁用（Group 生效）
 *     - <vort-radio-group :disabled="true"><vort-radio :disabled="false" /></vort-radio-group>
 *       → 不禁用（自身显式 false 覆盖 Group，对齐 element-plus 2.12+ / antd 5.x）
 *
 * --------------------------------------------------------------------
 * ⚠️ 注意：必须在组件的 setup() 顶层（同步阶段）调用，
 *   因为内部依赖 getCurrentInstance() 与 inject()。
 *   在 setup 异步回调、生命周期之外、或独立工具函数中调用都会失效。
 *
 * 实现细节：
 *   - Vue 3.x 的 Boolean Casting 会把"未传"的纯 Boolean prop 自动转为 false，
 *     无法仅靠 props.disabled === undefined 判断"是否显式传值"。
 *   - 因此通过 getCurrentInstance().vnode.props 检查用户是否真的在模板中
 *     写了 disabled key（无论值是 true / false / 空字符串），以正确区分
 *     "未传"和"显式传 false"两种情况。
 *   - 同时兼容 kebab-case（虽然 disabled 不会被 kebab，但 prop 名可能扩展）。
 */
import { computed, getCurrentInstance, inject, toValue, type MaybeRefOrGetter } from "vue";
import { formContextKey } from "./constants";

/** 把 camelCase 转为 kebab-case */
const camelToKebab = (s: string) => s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);

/** 判断组件用户是否在模板上显式传入了某个 prop key */
const useIsPropProvided = (propName: string) => {
    const vm = getCurrentInstance();
    return () => {
        const rawProps = vm?.vnode?.props;
        if (!rawProps) return false;
        const kebab = camelToKebab(propName);
        return propName in rawProps || kebab in rawProps;
    };
};

export function useFormDisabled(propDisabled: MaybeRefOrGetter<boolean | undefined>, fallback?: MaybeRefOrGetter<boolean | undefined>) {
    const formContext = inject(formContextKey, undefined);
    const isDisabledExplicit = useIsPropProvided("disabled");

    return computed<boolean>(() => {
        // 用户显式传了 :disabled（含 false），以组件自身为准
        if (isDisabledExplicit()) {
            return !!toValue(propDisabled);
        }
        // 否则尝试 fallback（如二次封装组件透传的中间状态）
        const fb = toValue(fallback);
        if (fb !== undefined) return fb;
        // 最后回退到 Form 级 disabled
        return formContext?.value?.disabled ?? false;
    });
}
