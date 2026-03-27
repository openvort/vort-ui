<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { ChevronRight, Component as ComponentIcon } from "lucide-vue-next";
import { useConfigStore } from "@/stores";

import "./demo.css";

const contentScrollbarRef = ref<InstanceType<typeof import("@/components/vort/scrollbar/Scrollbar.vue").default> | null>(null);

const componentGroups = [
    {
        name: "开发指南",
        components: [
            { name: "介绍", path: "introduction" },
            { name: "使用指南", path: "installation" },
            { name: "ConfigProvider 全局配置", path: "config-provider" }
        ]
    },
    {
        name: "通用",
        components: [
            { name: "Button 按钮", path: "button" },
            { name: "Dropdown 下拉菜单", path: "dropdown" },
            { name: "Menu 导航菜单", path: "menu" },
            { name: "Divider 分割线", path: "divider" }
        ]
    },
    {
        name: "布局",
        components: [
            { name: "Card 卡片", path: "card" },
            { name: "Grid 栅格", path: "grid" },
            { name: "Scrollbar 滚动条", path: "scrollbar" },
            { name: "Anchor 锚点", path: "anchor" }
        ]
    },
    {
        name: "数据录入",
        components: [
            { name: "AutoComplete 自动完成", path: "auto-complete" },
            { name: "Cascader 级联选择", path: "cascader" },
            { name: "Checkbox 复选框", path: "checkbox" },
            { name: "ColorPicker 颜色选择器", path: "color-picker" },
            { name: "DatePicker 日期选择器", path: "date-picker" },
            { name: "TimePicker 时间选择器", path: "time-picker" },
            { name: "Form 表单", path: "form" },
            { name: "Input 输入框", path: "input" },
            { name: "InputNumber 数字输入框", path: "input-number" },
            { name: "Radio 单选框", path: "radio" },
            { name: "Select 选择器", path: "select" },
            { name: "Slider 滑动输入条", path: "slider" },
            { name: "Switch 开关", path: "switch" },
            { name: "Upload 上传", path: "upload" }
        ]
    },
    {
        name: "数据展示",
        components: [
            { name: "Badge 徽标数", path: "badge" },
            { name: "Image 图片", path: "image" },
            { name: "Pagination 分页", path: "pagination" },
            { name: "Segmented 分段控制器", path: "segmented" },
            { name: "Statistic 统计数值", path: "statistic" },
            { name: "Steps 步骤条", path: "steps" },
            { name: "Table 表格", path: "table" },
            { name: "Tabs 标签页", path: "tabs" },
            { name: "Tag 标签", path: "tag" },
            { name: "Timeline 时间轴", path: "timeline" }
        ]
    },
    {
        name: "反馈",
        components: [
            { name: "Alert 警告提示", path: "alert" },
            { name: "Dialog 对话框", path: "dialog" },
            { name: "Drawer 抽屉", path: "drawer" },
            { name: "Message 全局提示", path: "message" },
            { name: "Notification 通知提醒框", path: "notification" },
            { name: "Popover 气泡卡片", path: "popover" },
            { name: "Popconfirm 气泡确认框", path: "popconfirm" },
            { name: "Skeleton 骨架屏", path: "skeleton" },
            { name: "Spin 加载中", path: "spin" },
            { name: "Tooltip 文字提示", path: "tooltip" }
        ]
    },
    {
        name: "业务组件",
        icon: ComponentIcon,
        components: [{ name: "Icon 图标", path: "icon" }]
    }
];

const themes = [
    { name: "蓝色", value: "blue", color: "#1456f0" },
    { name: "红色", value: "red", color: "#f5222d" },
    { name: "橙色", value: "orange", color: "#faad14" },
    { name: "绿色", value: "green", color: "#52c41a" },
    { name: "紫色", value: "purple", color: "#722ed1" }
];

const configStore = useConfigStore();
const currentTheme = ref((configStore.config.primaryColor as string) || "blue");

const setTheme = (theme: string) => {
    currentTheme.value = theme;
    configStore.setConfig({ primaryColor: theme });
};

const route = useRoute();
const currentComponent = computed(() => {
    const path = route.path;
    const match = path.match(/\/components\/([\w-]+)/);
    return match ? match[1] : "button";
});

const expandedGroups = ref<string[]>(componentGroups.map((group) => group.name));

const toggleGroup = (groupName: string) => {
    const index = expandedGroups.value.indexOf(groupName);
    if (index > -1) {
        expandedGroups.value.splice(index, 1);
    } else {
        expandedGroups.value.push(groupName);
    }
};

const isGroupExpanded = (groupName: string) => expandedGroups.value.includes(groupName);

watch(
    () => route.path,
    () => {
        contentScrollbarRef.value?.setScrollTop(0);
    }
);
</script>

<template>
    <div class="demo-layout">
        <!-- 顶部导航栏 -->
        <header class="demo-header">
            <div class="demo-header-left">
                <ComponentIcon class="demo-logo-icon" />
                <span class="demo-header-title">Vort UI</span>
            </div>

            <div class="demo-header-right">
                <!-- Vort Admin 导航链接 -->
                <a
                    href="https://github.com/openvort/vort-admin"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="demo-header-nav-link"
                    title="Vort Admin - 开源管理后台模板"
                >
                    <span>Vort Admin</span>
                </a>

                <span class="demo-header-divider"></span>

                <!-- GitHub 图标链接 -->
                <a href="https://github.com/openvort/vort-ui" target="_blank" rel="noopener noreferrer" class="demo-header-action-link" title="GitHub">
                    <svg class="demo-header-action-icon" viewBox="64 64 896 896" fill="currentColor" aria-hidden="true">
                        <path
                            d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0138.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"
                        />
                    </svg>
                </a>
            </div>
        </header>

        <div class="demo-body">
            <!-- 侧边栏 -->
            <aside class="demo-sidebar">
                <vort-scrollbar class="demo-sidebar-scroll">
                    <!-- 主题切换 -->
                    <div class="demo-theme-switcher">
                        <div class="demo-theme-label">
                            <span>主题色</span>
                        </div>
                        <div class="demo-theme-colors">
                            <button
                                v-for="theme in themes"
                                :key="theme.value"
                                class="demo-theme-color"
                                :class="{ active: currentTheme === theme.value }"
                                :style="{ backgroundColor: theme.color }"
                                :title="theme.name"
                                @click="setTheme(theme.value)"
                            />
                        </div>
                    </div>

                    <nav class="demo-nav">
                        <div v-for="group in componentGroups" :key="group.name" class="demo-nav-group">
                            <button class="demo-nav-group-header" @click="toggleGroup(group.name)">
                                <component :is="group.icon" class="w-4 h-4" v-if="group.icon" />
                                <span>{{ group.name }}</span>
                                <ChevronRight class="demo-nav-chevron" :class="{ 'rotate-90': isGroupExpanded(group.name) }" />
                            </button>

                            <ul v-show="isGroupExpanded(group.name)" class="demo-nav-list">
                                <li v-for="comp in group.components" :key="comp.path">
                                    <router-link :to="`/components/${comp.path}`" class="demo-nav-link" :class="{ active: currentComponent === comp.path }">
                                        {{ comp.name }}
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </vort-scrollbar>
            </aside>

            <!-- 主内容区 -->
            <main class="demo-content">
                <vort-scrollbar ref="contentScrollbarRef" class="demo-content-scroll">
                    <div class="demo-content-inner">
                        <router-view />
                    </div>
                </vort-scrollbar>
            </main>
        </div>
    </div>
</template>

<style scoped>
/* ========== 整体布局 ========== */
.demo-layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
    background: var(--vort-bg);
    -webkit-font-smoothing: antialiased;
}

/* ========== 顶部导航栏 ========== */
.demo-header {
    height: 64px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--vort-border-secondary);
    background: var(--vort-bg-elevated);
    box-sizing: border-box;
}

.demo-header-left {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 260px;
    padding: 0 24px;
    box-sizing: border-box;
}

.demo-logo-icon {
    width: 28px;
    height: 28px;
    color: var(--vort-primary);
}

.demo-header-title {
    font-size: 19px;
    font-weight: 600;
    color: var(--vort-text);
    letter-spacing: -0.01em;
}

.demo-header-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 24px;
    gap: 8px;
}

/* 顶部文字导航链接 */
.demo-header-nav-link {
    display: inline-flex;
    align-items: center;
    height: 32px;
    padding: 0 6px;
    border-radius: 6px;
    color: var(--vort-text-secondary);
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease;
    gap: 6px;
}

.demo-header-nav-link:hover {
    color: var(--vort-text);
    background-color: rgba(0, 0, 0, 0.04);
}

.demo-header-nav-icon {
    width: 18px;
    height: 18px;
    opacity: 0.8;
}

/* 分割线 */
.demo-header-divider {
    width: 1px;
    height: 16px;
    background-color: var(--vort-border-secondary);
    margin: 0 4px;
}

/* 右侧图标操作按钮 */
.demo-header-action-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--vort-text-secondary);
    text-decoration: none;
    transition: all 0.2s ease;
    width: 32px;
    height: 32px;
    border-radius: 6px;
}

.demo-header-action-link:hover {
    color: var(--vort-text);
    background-color: rgba(0, 0, 0, 0.04);
}

.demo-header-action-icon {
    width: 20px;
    height: 20px;
}

/* ========== 下方主体 ========== */
.demo-body {
    display: flex;
    flex: 1;
    min-height: 0;
}

/* ========== 侧边栏 ========== */
.demo-sidebar {
    width: 260px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    border-right: 1px solid var(--vort-border-secondary);
    background: var(--vort-bg-elevated);
}

.demo-sidebar-scroll {
    flex: 1;
    min-height: 0;
}

/* 主题切换器 */
.demo-theme-switcher {
    padding: 16px 24px;
    border-bottom: 1px solid var(--vort-border-secondary);
}

.demo-theme-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: var(--vort-text-secondary);
    margin-bottom: 12px;
}

.demo-theme-colors {
    display: flex;
    gap: 8px;
}

.demo-theme-color {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    border: 2px solid transparent;
    cursor: pointer;
    transition: all 0.2s;
    padding: 0;
}

.demo-theme-color:hover {
    transform: scale(1.1);
}

.demo-theme-color.active {
    border-color: var(--vort-text);
    box-shadow:
        0 0 0 2px var(--vort-bg-elevated),
        0 0 0 4px currentColor;
}

/* 导航菜单 */
.demo-nav {
    padding: 12px 0;
}

.demo-nav-group {
    margin-bottom: 4px;
}

.demo-nav-group-header {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 10px 24px;
    font-size: 14px;
    color: var(--vort-text);
    background: transparent;
    border: none;
    cursor: pointer;
    transition: background 0.2s;
    font-weight: 700;
}

.demo-nav-chevron {
    margin-left: auto;
    width: 16px;
    height: 16px;
    color: var(--vort-text-tertiary);
    transition: transform 0.2s;
}

.demo-nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.demo-nav-link {
    display: block;
    padding: 10px 24px 10px 24px;
    font-size: 14px;
    margin: 4px 20px;
    border-radius: 8px;
    color: var(--vort-text-secondary);
    text-decoration: none;
    transition: all 0.2s;
}

.demo-nav-link:hover {
    background: rgba(0, 0, 0, 0.04);
    color: var(--vort-text);
}

.demo-nav-link.active {
    color: var(--vort-primary);
    background: var(--vort-primary-bg);
}

/* ========== 主内容区 ========== */
.demo-content {
    flex: 1;
    min-width: 0;
}

.demo-content-scroll {
    height: 100%;
}

.demo-content-inner {
    padding: 40px 48px;
}
</style>
