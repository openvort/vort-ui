import type { InjectionKey, Ref } from "vue";

/**
 * 卡片标题行右侧容器（`.vort-card-extra`）的 DOM 引用。
 *
 * 卡片显示头部时通过 provide 暴露，子组件可以把内容 Teleport 进来与标题同行，
 * 典型用法是列表工具栏左侧没有按钮时把筛选控件挪上去。没有头部时为 null。
 */
export const cardExtraTargetKey: InjectionKey<Ref<HTMLElement | null>> = Symbol("VortCardExtraTarget");
