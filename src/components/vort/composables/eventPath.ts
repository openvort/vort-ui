/**
 * 判断事件是否发生在给定元素内部。
 *
 * 不能用 `el.contains(event.target)`：真实点击会在两个监听器之间跑微任务检查点，Vue 可能已把被点中的节点
 * （如打开下拉后被搜索框替换掉的占位文本）移出 DOM，contains 随之恒为 false。composedPath 在派发开始时
 * 就已确定，不受这次重渲染影响。
 */
export const isEventInside = (event: Event, ...elements: (Element | null | undefined)[]): boolean => {
    const path = typeof event.composedPath === "function" ? event.composedPath() : [];
    if (path.length > 0) {
        return elements.some((el) => !!el && path.includes(el));
    }

    const target = event.target as Node | null;
    if (!target) return false;
    return elements.some((el) => !!el && el.contains(target));
};
