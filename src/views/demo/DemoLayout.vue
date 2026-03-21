<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { ChevronRight, Component, Box, Palette } from "lucide-vue-next";
import { useConfigStore } from "@/stores";

// 引入公共样式
import "./demo.css";

// 内容区滚动条 ref
const contentScrollbarRef = ref<InstanceType<typeof import("@/components/vort/scrollbar/Scrollbar.vue").default> | null>(null);

// 组件分组配置
const componentGroups = [
    {
        name: "开发指南",
        components: [
            { name: "介绍", path: "introduction" },
            { name: "使用指南", path: "installation" },
            { name: "ConfigProvider 全局配置", path: "config-provider" }
        ]
    },
    // =====================
    // UI 基础库 (ui/)
    // =====================
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
    // =====================
    // 业务 UI 库 (ui-biz/)
    // =====================
    {
        name: "业务组件",
        icon: Component,
        components: [{ name: "Icon 图标", path: "icon" }]
    }
    // 后续添加更多组件分组
];

// 主题配置
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
    // 更新 configStore，触发 App.vue 中 ConfigProvider 的主题色变化
    configStore.setConfig({ primaryColor: theme });
};

const route = useRoute();
// 从路由路径中提取当前组件名，如 /components/select -> select
const currentComponent = computed(() => {
    const path = route.path;
    const match = path.match(/\/components\/([\w-]+)/);
    return match ? match[1] : "button";
});

// 根据组件路径找到所属分组
const findGroupByComponent = (componentPath: string) => {
    return componentGroups.find((group) => group.components.some((comp) => comp.path === componentPath));
};

// 侧边栏展开状态 - 默认展开所有分组
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

// 监听路由变化，自动滚动到顶部
watch(
    () => route.path,
    () => {
        contentScrollbarRef.value?.setScrollTop(0);
    }
);
</script>

<template>
    <div class="demo-layout">
        <!-- 侧边栏 -->
        <aside class="demo-sidebar">
            <vort-scrollbar class="demo-sidebar-scroll">
                <div class="demo-sidebar-header">
                    <Component class="w-6 h-6 text-[var(--vort-primary)]" />
                    <span class="demo-sidebar-title">Vort UI</span>
                </div>

                <!-- 主题切换 -->
                <div class="demo-theme-switcher">
                    <div class="demo-theme-label">
                        <Palette class="w-4 h-4" />
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
                            <component :is="group.icon" class="w-4 h-4" />
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
</template>

<style scoped>
.demo-layout {
    display: flex;
    height: 100vh;
    overflow: hidden;
    background: var(--vort-bg);
    -webkit-font-smoothing: antialiased;
}

.demo-sidebar {
    width: 260px;
    flex-shrink: 0;
    border-right: 1px solid var(--vort-border-secondary);
    background: var(--vort-bg-elevated);
    height: 100vh;
}

.demo-sidebar-scroll {
    height: 100%;
}

.demo-sidebar-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 20px 24px;
    border-bottom: 1px solid var(--vort-border-secondary);
}

.demo-sidebar-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--vort-text);
}

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

.demo-nav-group-header:hover {
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
    padding: 16px 24px 16px 24px;
    font-size: 14px;
    margin: 4px 20px;
    border-radius: 8px;
    color: var(--vort-text-secondary);
    text-decoration: none;
    transition: all 0.2s;
}

.demo-nav-link:hover {
    background: rgba(0, 0, 0, 0.06);
}

.demo-nav-link.active {
    color: var(--vort-primary);
    background: var(--vort-primary-bg);
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
}

.demo-theme-color:hover {
    transform: scale(1.1);
}

.demo-theme-color.active {
    border-color: var(--vort-text);
    box-shadow:
        0 0 0 2px white,
        0 0 0 4px currentColor;
}

.demo-content {
    flex: 1;
    height: 100vh;
    overflow: hidden;
}

.demo-content-scroll {
    height: 100%;
}

.demo-content-inner {
    padding: 40px 48px;
}
</style>
