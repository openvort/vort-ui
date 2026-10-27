/**
 * Form 模块的注入键（InjectionKey）
 *
 * 使用 Symbol 而非字符串，避免与其他库/业务代码的同名 inject 冲突，
 * 对齐 Element Plus / Naive UI 的最佳实践。
 *
 * 注：当前同时保留了字符串 key "formContext" 作为渐进迁移过渡，
 * 业务侧无 inject 该字符串 key 的代码，下个大版本可移除。
 */
import type { ComputedRef, InjectionKey } from "vue";
import type { FormContext, FormItemControlStatus } from "./types";

/** Form 上下文注入键 */
export const formContextKey: InjectionKey<ComputedRef<FormContext | undefined>> = Symbol("VortFormContext");

/** FormItem 校验状态注入键：录入控件据此显示 error / warning 样式 */
export const formItemStatusKey: InjectionKey<ComputedRef<FormItemControlStatus | undefined>> = Symbol("VortFormItemStatus");
