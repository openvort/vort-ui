/**
 * Dialog 组件类型定义
 */

import type { ButtonProps } from "../button/types";

/** 对话框宽度类型 */
export type DialogWidth = "small" | "default" | "large" | number | string;

/** Dialog 组件 Props */
export interface DialogProps {
    /** 对话框是否可见（v-model） */
    open?: boolean;
    /** 是否提前挂载内容但保持不可见；不触发打开动画、遮罩和浮层行为 */
    forceRender?: boolean;
    /** 关闭动画结束后销毁内容，默认 true；显式 false 保留表单等子组件状态。 */
    destroyOnClose?: boolean;
    /** 触发打开的位置，用于延迟打开时仍从触发点播放入场动画 */
    mousePosition?: { x: number; y: number } | null;
    /** 标题 */
    title?: string;
    /** 对话框宽度 */
    width?: DialogWidth;
    /** 是否显示右上角关闭按钮 */
    closable?: boolean;
    /** 点击蒙层是否允许关闭 */
    maskClosable?: boolean;
    /** 是否支持键盘 ESC 关闭 */
    keyboard?: boolean;
    /** 是否显示遮罩 */
    mask?: boolean;
    /** 垂直居中展示 */
    centered?: boolean;
    /** 确定按钮文字 */
    okText?: string;
    /** 取消按钮文字 */
    cancelText?: string;
    /** 确定按钮 loading */
    confirmLoading?: boolean;
    /** 确定按钮属性，可用于控制禁用等状态 */
    okButtonProps?: ButtonProps;
    /** 是否显示底部按钮区域 */
    footer?: boolean;
    /** z-index */
    zIndex?: number;
    /** 自定义类名 */
    class?: string;
    /** 对话框外层容器类名 */
    wrapClass?: string;
    /** body 区域是否无内边距 */
    bodyNoPadding?: boolean;
    /**
     * 是否画头部与底部的分隔线，默认画。
     *
     * body 里已经是一张带表头底色的表格、或一块自带边框的卡片时关掉：那两条线会和内容自己的
     * 横线叠成三四道，把一个弹窗切得像列表。
     */
    dividers?: boolean;
    /** 内容区域背景色（仅 body 区域），默认白色 */
    contentBg?: string;
    /** body 区域最大高度，超出后滚动 */
    bodyMaxHeight?: string;
}

/** Dialog 组件 Emits */
export interface DialogEmits {
    /** 对话框显示/隐藏时触发 */
    (e: "update:open", value: boolean): void;
    /** 点击确定按钮时触发 */
    (e: "ok"): void;
    /** 点击取消按钮时触发 */
    (e: "cancel"): void;
    /** 对话框关闭动画完成后触发 */
    (e: "afterClose"): void;
}

/** 确认对话框类型 */
export type ConfirmDialogType = "info" | "success" | "error" | "warning" | "confirm";

/** ConfirmDialog 组件 Props */
export interface ConfirmDialogProps {
    /** 对话框是否可见 */
    open?: boolean;
    /** 对话框类型 */
    type?: ConfirmDialogType;
    /** 标题 */
    title?: string;
    /** 内容 */
    content?: string;
    /** 对话框宽度 */
    width?: number | string;
    /** 是否显示右上角关闭按钮 */
    closable?: boolean;
    /** 点击蒙层是否允许关闭 */
    maskClosable?: boolean;
    /** 是否支持键盘 ESC 关闭 */
    keyboard?: boolean;
    /** 确定按钮文字 */
    okText?: string;
    /** 取消按钮文字 */
    cancelText?: string;
    /** 确定按钮 loading */
    confirmLoading?: boolean;
    /** 确定按钮类型 */
    okType?: "primary" | "danger";
    /** z-index */
    zIndex?: number;
    /** 垂直居中展示 */
    centered?: boolean;
    /** 鼠标点击位置（用于动画起点） */
    mousePosition?: { x: number; y: number } | null;
    /** 内容区域背景色（仅 body 区域），默认白色 */
    contentBg?: string;
}

/** ConfirmDialog 组件 Emits */
export interface ConfirmDialogEmits {
    /** 对话框显示/隐藏时触发 */
    (e: "update:open", value: boolean): void;
    /** 点击确定按钮时触发 */
    (e: "ok"): void;
    /** 点击取消按钮时触发 */
    (e: "cancel"): void;
    /** 对话框关闭动画完成后触发 */
    (e: "afterClose"): void;
}
