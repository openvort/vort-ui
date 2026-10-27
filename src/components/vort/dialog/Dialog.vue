<script lang="ts">
let mousePosition: { x: number; y: number } | null = null;
let isClickListenerRegistered = false;

const getClickPosition = (e: MouseEvent) => {
    mousePosition = { x: e.clientX, y: e.clientY };
    setTimeout(() => {
        mousePosition = null;
    }, 100);
};

function ensureClickListener() {
    if (!isClickListenerRegistered && typeof window !== "undefined") {
        document.documentElement.addEventListener("click", getClickPosition, true);
        isClickListenerRegistered = true;
    }
}
</script>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick, useId } from "vue";
import { CloseOutlined } from "../icons";
import { getVortTeleportTo, useZIndexProviderValue, useOverlayStack } from "../composables";
import { Button } from "../button";
import { useLocale } from "../locale";
import type { DialogProps } from "./types";
import { resetFormItemStatus } from "../form/useFormItemStatus";

defineOptions({ name: "VortDialog" });

/** Vort Dialog - 对话框组件 */

type DialogWidth = "small" | "default" | "large" | number | string;

const props = withDefaults(defineProps<DialogProps>(), {
    open: false,
    forceRender: false,
    destroyOnClose: true,
    mousePosition: null,
    title: "",
    width: "default",
    closable: true,
    maskClosable: true,
    keyboard: true,
    mask: true,
    centered: false,
    okText: undefined,
    cancelText: undefined,
    confirmLoading: false,
    footer: true,
    zIndex: 1000,
    bodyNoPadding: false,
    dividers: true,
    contentBg: "#fff",
    bodyMaxHeight: undefined
});

// 国际化
const { t } = useLocale("Modal");
const okTextValue = computed(() => props.okText ?? t("ok_text"));
const cancelTextValue = computed(() => props.cancelText ?? t("cancel_text"));

// 提供 z-index 上下文给子组件（如 Select、Dropdown 等）
// 这样子组件的弹出层会自动获得比 Dialog 更高的 z-index
useZIndexProviderValue(() => props.zIndex);

const overlay = useOverlayStack();

// 弹窗内容不继承外层 FormItem 的校验状态
resetFormItemStatus();

const emit = defineEmits<{
    "update:open": [value: boolean];
    ok: [];
    cancel: [];
    afterClose: [];
}>();

// 状态
const visible = ref(false);
const shouldRenderTeleport = ref(false); // 控制 Teleport 是否渲染，避免产生 <!--v-if--> 注释
const animationState = ref<"" | "enter" | "leave">("");
const animationGeneration = ref(0);
const overlayRegistered = ref(false);
const dialogRef = ref<HTMLDivElement | null>(null);
const wrapRef = ref<HTMLDivElement | null>(null);
const transformOriginStyle = ref("");
const teleportTo = computed(() => getVortTeleportTo());
const titleId = `vort-dialog-title-${useId()}`;

// 计算 transform-origin
const setTransformOrigin = () => {
    const origin = props.mousePosition ?? mousePosition;
    if (!dialogRef.value || !origin) {
        transformOriginStyle.value = "";
        return;
    }

    const dialogNode = dialogRef.value;
    const rect = dialogNode.getBoundingClientRect();

    // 计算点击位置相对于对话框的偏移（都是视口坐标系）
    const left = origin.x - rect.left;
    const top = origin.y - rect.top;

    transformOriginStyle.value = `${left}px ${top}px`;
};

// 宽度计算
const dialogWidth = computed(() => {
    const { width } = props;
    if (typeof width === "number") {
        return `${width}px`;
    }
    if (width === "small") return "416px";
    if (width === "large") return "800px";
    if (width === "default") return "520px";
    return width;
});

// 关闭对话框
const close = () => {
    emit("update:open", false);
    emit("cancel");
};

// 确定按钮点击
const handleOk = () => {
    if (props.confirmLoading || props.okButtonProps?.disabled || props.okButtonProps?.loading) return;
    emit("ok");
};

// 取消按钮点击
const handleCancel = () => {
    close();
};

// 遮罩点击
const handleMaskClick = () => {
    if (props.maskClosable) {
        close();
    }
};

// wrap 点击（点击对话框外部区域）
const handleWrapClick = (e: MouseEvent) => {
    // 只有点击 wrap 本身（不是对话框内部）才关闭
    if (e.target === wrapRef.value && props.maskClosable) {
        close();
    }
};

// 动画结束回调
const handleAnimationEnd = (event: AnimationEvent) => {
    // 快速关开时，旧的 leave 动画可能晚于新的 enter 事件结束；按动画名称过滤，避免旧事件清掉新状态。
    if (event.animationName.startsWith("vortDialogZoomOut") && animationState.value === "leave" && !props.open) {
        visible.value = false;
        animationState.value = "";
        document.body.style.overflow = "";
        shouldRenderTeleport.value = !props.destroyOnClose;
        emit("afterClose");
    } else if (event.animationName.startsWith("vortDialogZoomIn") && animationState.value === "enter") {
        animationState.value = "";
    }
};

// 监听 open 属性变化
watch(
    () => props.open,
    async (newVal, oldVal) => {
        if (newVal) {
            const generation = ++animationGeneration.value;
            shouldRenderTeleport.value = true;
            visible.value = true;
            document.body.style.overflow = "hidden";

            if (!overlayRegistered.value) {
                overlay.push(() => {
                    if (props.keyboard) close();
                });
                overlayRegistered.value = true;
            }

            await nextTick();

            requestAnimationFrame(() => {
                if (generation !== animationGeneration.value || !props.open) return;
                setTransformOrigin();
                animationState.value = "enter";
            });
        } else if (oldVal && !newVal) {
            animationGeneration.value++;
            if (overlayRegistered.value) {
                overlay.pop();
                overlayRegistered.value = false;
            }
            animationState.value = "leave";
        }
    },
    { immediate: true }
);

onMounted(() => {
    ensureClickListener();
});

onUnmounted(() => {
    if (overlayRegistered.value) overlay.pop();
    document.body.style.overflow = "";
});
</script>

<template>
    <Teleport v-if="shouldRenderTeleport || forceRender" :to="teleportTo">
        <div
            v-if="visible || !destroyOnClose || forceRender"
            v-show="open || (visible && !forceRender)"
            class="vort-dialog-root"
            :class="wrapClass"
            :style="{ zIndex }"
        >
            <!-- 遮罩层 -->
            <Transition name="vort-mask">
                <div v-if="mask" v-show="open" class="vort-dialog-mask" @click="handleMaskClick" />
            </Transition>

            <!-- 对话框容器 -->
            <div ref="wrapRef" class="vort-dialog-wrap" :class="{ 'vort-dialog-centered': centered }" @click="handleWrapClick">
                <div
                    ref="dialogRef"
                    :class="['vort-dialog', props.class]"
                    :style="{
                        width: dialogWidth,
                        transformOrigin: transformOriginStyle || undefined
                    }"
                    :data-state="animationState"
                    role="dialog"
                    aria-modal="true"
                    :aria-labelledby="title || $slots.title ? titleId : undefined"
                    @animationend="handleAnimationEnd"
                >
                    <div class="vort-dialog-content">
                        <!-- 关闭按钮 -->
                        <Button v-if="closable" type="text" icon class="vort-dialog-close" :aria-label="t('close')" @click="close">
                            <CloseOutlined class="vort-dialog-close-icon" />
                        </Button>

                        <!-- 头部 -->
                        <div v-if="title || $slots.title" :id="titleId" class="vort-dialog-header" :class="{ 'vort-dialog-header-no-border': !dividers }">
                            <slot name="title">
                                <span class="vort-dialog-title">{{ title }}</span>
                            </slot>
                        </div>

                        <!-- 内容区 -->
                        <div
                            class="vort-dialog-body"
                            :class="{ 'vort-dialog-body-no-padding': bodyNoPadding }"
                            :style="{ background: contentBg, maxHeight: bodyMaxHeight, overflowY: bodyMaxHeight ? 'auto' : undefined }"
                        >
                            <slot />
                        </div>

                        <!-- 底部按钮区 -->
                        <div v-if="footer" class="vort-dialog-footer" :class="{ 'vort-dialog-footer-no-border': !dividers }">
                            <slot name="footer">
                                <Button @click="handleCancel">{{ cancelTextValue }}</Button>
                                <Button type="primary" v-bind="okButtonProps" :loading="confirmLoading || okButtonProps?.loading" @click="handleOk">
                                    {{ okTextValue }}
                                </Button>
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
.vort-dialog-root {
    position: fixed;
    inset: 0;
    z-index: v-bind(zIndex);
}

/* 遮罩层 */
.vort-dialog-mask {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    z-index: 0;
    pointer-events: auto;
}

/* 遮罩动画 */
.vort-mask-enter-active,
.vort-mask-leave-active {
    transition: opacity 0.3s;
}

.vort-mask-enter-from,
.vort-mask-leave-to {
    opacity: 0;
}

/* 对话框容器 */
.vort-dialog-wrap {
    position: fixed;
    inset: 0;
    overflow: auto;
    outline: 0;
    z-index: 1;
    pointer-events: none;
}

/* 对话框主体 */
.vort-dialog {
    position: relative;
    top: 100px;
    margin: 0 auto;
    pointer-events: auto;
    max-width: calc(100vw - 32px);
}

/* 内容容器（包裹 header/body/footer，统一处理圆角和阴影） */
.vort-dialog-content {
    position: relative;
    background: #fff;
    background-clip: padding-box;
    border-radius: var(--vort-border-radius-lg, var(--vort-border-radius, 8px));
    box-shadow:
        0 6px 16px 0 rgba(0, 0, 0, 0.08),
        0 3px 6px -4px rgba(0, 0, 0, 0.12),
        0 9px 28px 8px rgba(0, 0, 0, 0.05);
    overflow: hidden;
}

/* 居中模式 */
.vort-dialog-centered {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100%;
    padding: 16px;
}

.vort-dialog-centered .vort-dialog {
    top: 0;
    margin: 0;
}

/* 缩放动画 */
.vort-dialog[data-state="enter"] {
    animation: vortDialogZoomIn 0.3s cubic-bezier(0.08, 0.82, 0.17, 1) forwards;
}

.vort-dialog[data-state="leave"] {
    animation: vortDialogZoomOut 0.2s cubic-bezier(0.78, 0.14, 0.15, 0.86) forwards;
}

@keyframes vortDialogZoomIn {
    0% {
        opacity: 0;
        transform: scale(0.2);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes vortDialogZoomOut {
    0% {
        opacity: 1;
        transform: scale(1);
    }

    100% {
        opacity: 0;
        transform: scale(0.2);
    }
}

/* 关闭按钮 */
.vort-dialog-close {
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    padding: 0;
}

.vort-dialog-close-icon {
    width: 16px;
    height: 16px;
    background: transparent;
    border: none;
    border-radius: var(--vort-border-radius-sm, 4px);
    color: rgba(0, 0, 0, 0.45);
    cursor: pointer;
    transition: all 0.2s;
}

.vort-dialog-close:hover {
    color: rgba(0, 0, 0, 0.88);
    background: rgba(0, 0, 0, 0.06);
}

.vort-dialog-close:active {
    background: rgba(0, 0, 0, 0.1);
}

/* 头部 */
.vort-dialog-header {
    padding: 16px 24px;
    border-bottom: 1px solid rgba(5, 5, 5, 0.06);
}

/*
 * 无分隔线时三段是一片连续的白，间距得按一个数走，否则连成一片才看得出原本各自为政：
 * header 与 footer 交出自己那份竖直内边距，标题到内容、内容到按钮都由 body 的 24px 决定；
 * footer 横向也从 16px 对齐到 24px——有线时它是独立的一条带子看不出来，线一去掉「确认」就
 * 比内容右缘往外多出 8px。竖直内边距仍是 header 那套 16px：标题顶部要和绝对定位在 16px 的
 * 关闭按钮对齐，动不了，底部跟着它对称。
 */
.vort-dialog-header-no-border {
    border-bottom: none;
    padding-bottom: 0;
}

.vort-dialog-title {
    font-size: 16px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.88);
    line-height: 1.5;
    word-wrap: break-word;
}

/* 内容区 */
.vort-dialog-body {
    padding: 24px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.88);
    line-height: 1.5714;
    word-wrap: break-word;
}

.vort-dialog-body-no-padding {
    padding: 0;
}

/* 底部按钮区 */
.vort-dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding: 12px 16px;
    border-top: 1px solid rgba(5, 5, 5, 0.06);
}

.vort-dialog-footer-no-border {
    border-top: none;
    padding: 0 24px 16px;
}

/* 响应式：小屏幕时对话框宽度 100% */
@media (max-width: 576px) {
    .vort-dialog {
        width: 100% !important;
        max-width: 100%;
        margin: 0;
    }

    .vort-dialog-content {
        border-radius: 0;
    }

    .vort-dialog-wrap:not(.vort-dialog-centered) .vort-dialog {
        top: 0;
        height: 100%;
    }

    .vort-dialog-wrap:not(.vort-dialog-centered) .vort-dialog-content {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .vort-dialog-wrap:not(.vort-dialog-centered) .vort-dialog-body {
        flex: 1;
        overflow-y: auto;
    }

    .vort-dialog-centered {
        padding: 0;
    }

    .vort-dialog-centered .vort-dialog {
        height: 100%;
    }

    .vort-dialog-centered .vort-dialog-content {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .vort-dialog-centered .vort-dialog-body {
        flex: 1;
        overflow-y: auto;
    }
}
</style>
