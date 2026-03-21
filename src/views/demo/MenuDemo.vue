<script setup lang="ts">
import { ref, computed } from "vue";
import DemoBox from "./components/DemoBox.vue";
import { Home, Settings, User, Mail, Calendar, FileText, Folder, Bell, Heart, Star, Search, Plus, Link } from "lucide-vue-next";

// 选中和展开状态
const selectedKeys = ref(["1"]);
const openKeys = ref(["sub1"]);

const selectedKeys2 = ref(["1"]);
const openKeys2 = ref(["sub1"]);

const selectedKeys3 = ref(["1"]);
const selectedKeys4 = ref(["1"]);

const inlineCollapsed = ref(false);

// Switch 演示状态
const switchDemoSelectedKeys = ref(["1"]);
const switchDemoOpenKeys = ref(["sub1"]);
const switchCollapsed = ref(false);
const switchDarkMode = ref(false);

// 计算主题
const switchTheme = computed(() => (switchDarkMode.value ? "dark" : "light"));

// 计算菜单宽度
const switchMenuWidth = computed(() => {
    if (switchCollapsed.value) return "56px";
    return "256px";
});

// 事件处理
const handleSelect = (info: { key: string; keyPath: string[]; selectedKeys: string[] }) => {
    console.log("select", info);
};

const handleClick = (info: { key: string; keyPath: string[] }) => {
    console.log("click", info);
};

const handleOpenChange = (keys: string[]) => {
    console.log("openChange", keys);
};

// 示例代码
const basicCode = `<template>
  <vort-menu
    v-model:selected-keys="selectedKeys"
    v-model:open-keys="openKeys"
    mode="inline"
    @select="handleSelect"
  >
    <vort-menu-item item-key="1">
      <template #icon><Home /></template>
      Navigation One
    </vort-menu-item>
    <vort-menu-item item-key="2">
      <template #icon><Settings /></template>
      Navigation Two
    </vort-menu-item>
    <vort-sub-menu item-key="sub1" title="Navigation Three">
      <template #icon><User /></template>
      <vort-menu-item item-key="3">Option 3</vort-menu-item>
      <vort-menu-item item-key="4">Option 4</vort-menu-item>
      <vort-sub-menu item-key="sub1-2" title="Submenu">
        <vort-menu-item item-key="5">Option 5</vort-menu-item>
        <vort-menu-item item-key="6">Option 6</vort-menu-item>
      </vort-sub-menu>
    </vort-sub-menu>
  </vort-menu>
</template>`;

const horizontalCode = `<template>
  <vort-menu
    v-model:selected-keys="selectedKeys"
    mode="horizontal"
  >
    <vort-menu-item item-key="mail">
      <template #icon><Mail /></template>
      Navigation One
    </vort-menu-item>
    <vort-menu-item item-key="app" disabled>
      Navigation Two (disabled)
    </vort-menu-item>
    <vort-sub-menu item-key="sub1" title="Navigation Three - Submenu">
      <vort-menu-item-group title="Item 1">
        <vort-menu-item item-key="setting:1">Option 1</vort-menu-item>
        <vort-menu-item item-key="setting:2">Option 2</vort-menu-item>
      </vort-menu-item-group>
      <vort-menu-item-group title="Item 2">
        <vort-menu-item item-key="setting:3">Option 3</vort-menu-item>
        <vort-menu-item item-key="setting:4">Option 4</vort-menu-item>
      </vort-menu-item-group>
    </vort-sub-menu>
    <vort-menu-item item-key="link">
      <a href="https://antdv.com" target="_blank">Navigation Four</a>
    </vort-menu-item>
  </vort-menu>
</template>`;

const verticalCode = `<template>
  <vort-menu
    v-model:selected-keys="selectedKeys"
    mode="vertical"
    style="width: 256px"
  >
    <vort-menu-item item-key="1">
      <template #icon><Mail /></template>
      Navigation One
    </vort-menu-item>
    <vort-menu-item item-key="2">
      <template #icon><Calendar /></template>
      Navigation Two
    </vort-menu-item>
    <vort-sub-menu item-key="sub1" title="Navigation Three">
      <template #icon><Settings /></template>
      <vort-menu-item item-key="3">Option 1</vort-menu-item>
      <vort-menu-item item-key="4">Option 2</vort-menu-item>
      <vort-menu-item item-key="5">Option 3</vort-menu-item>
    </vort-sub-menu>
    <vort-sub-menu item-key="sub2" title="Navigation Four">
      <template #icon><Folder /></template>
      <vort-menu-item item-key="6">Option 4</vort-menu-item>
      <vort-menu-item item-key="7">Option 5</vort-menu-item>
    </vort-sub-menu>
  </vort-menu>
</template>`;

const collapsedCode = `<template>
  <vort-button @click="inlineCollapsed = !inlineCollapsed" style="margin-bottom: 16px">
    {{ inlineCollapsed ? 'Expand' : 'Collapse' }}
  </vort-button>
  <vort-menu
    v-model:selected-keys="selectedKeys"
    v-model:open-keys="openKeys"
    mode="inline"
    :inline-collapsed="inlineCollapsed"
    style="width: 256px"
  >
    <vort-menu-item item-key="1">
      <template #icon><Home /></template>
      Option 1
    </vort-menu-item>
    <vort-menu-item item-key="2">
      <template #icon><Settings /></template>
      Option 2
    </vort-menu-item>
    <vort-sub-menu item-key="sub1" title="Navigation One">
      <template #icon><User /></template>
      <vort-menu-item item-key="3">Option 3</vort-menu-item>
      <vort-menu-item item-key="4">Option 4</vort-menu-item>
    </vort-sub-menu>
    <vort-sub-menu item-key="sub2" title="Navigation Two">
      <template #icon><Folder /></template>
      <vort-menu-item item-key="5">Option 5</vort-menu-item>
      <vort-menu-item item-key="6">Option 6</vort-menu-item>
    </vort-sub-menu>
  </vort-menu>
</template>`;

const darkCode = `<template>
  <vort-menu
    v-model:selected-keys="selectedKeys"
    v-model:open-keys="openKeys"
    mode="inline"
    theme="dark"
    style="width: 256px"
  >
    <vort-menu-item item-key="1">
      <template #icon><Home /></template>
      Option 1
    </vort-menu-item>
    <vort-menu-item item-key="2">
      <template #icon><Settings /></template>
      Option 2
    </vort-menu-item>
    <vort-sub-menu item-key="sub1" title="Navigation">
      <template #icon><User /></template>
      <vort-menu-item item-key="3">Option 3</vort-menu-item>
      <vort-menu-item item-key="4">Option 4</vort-menu-item>
    </vort-sub-menu>
  </vort-menu>
</template>`;

const groupCode = `<template>
  <vort-menu
    v-model:selected-keys="selectedKeys"
    mode="vertical"
    style="width: 256px"
  >
    <vort-menu-item-group title="Group 1">
      <vort-menu-item item-key="1">Option 1</vort-menu-item>
      <vort-menu-item item-key="2">Option 2</vort-menu-item>
    </vort-menu-item-group>
    <vort-menu-divider />
    <vort-menu-item-group title="Group 2">
      <vort-menu-item item-key="3">Option 3</vort-menu-item>
      <vort-menu-item item-key="4">Option 4</vort-menu-item>
    </vort-menu-item-group>
  </vort-menu>
</template>`;

const disabledDangerCode = `<template>
  <vort-menu v-model:selected-keys="selectedKeys" mode="inline">
    <vort-menu-item item-key="normal">
      <template #icon><FileText /></template>
      Normal Item
    </vort-menu-item>
    <vort-menu-item item-key="disabled" disabled>
      <template #icon><Plus /></template>
      Disabled Item
    </vort-menu-item>
    <vort-menu-divider />
    <vort-menu-item item-key="danger" danger>
      Danger Item
    </vort-menu-item>
  </vort-menu>
</template>`;

const switchDemoCode = `<script setup>
const mode = ref('inline');
const theme = ref('light');
const collapsed = ref(false);
<\/script>

<template>
  <div class="flex items-center gap-4 mb-4">
    <vort-switch v-model="collapsed" />
    <span>Collapsed</span>
    <vort-switch v-model="theme" checked-value="dark" unchecked-value="light" />
    <span>Dark</span>
  </div>
  <vort-menu
    v-model:selected-keys="selectedKeys"
    v-model:open-keys="openKeys"
    :mode="mode"
    :theme="theme"
    :inline-collapsed="collapsed"
  >
    <vort-menu-item item-key="1" title="Navigation One">
      <template #icon><Mail /></template>
      Navigation One
    </vort-menu-item>
    ...
  </vort-menu>
</template>`;

// API 数据
const propsData = [
    { prop: "mode", desc: "菜单模式", type: "'vertical' | 'horizontal' | 'inline'", default: "'vertical'" },
    { prop: "theme", desc: "主题颜色", type: "'light' | 'dark'", default: "'light'" },
    { prop: "selectedKeys / v-model:selectedKeys", desc: "当前选中的菜单项 key 数组", type: "string[]", default: "[]" },
    { prop: "defaultSelectedKeys", desc: "初始选中的菜单项 key 数组", type: "string[]", default: "[]" },
    { prop: "openKeys / v-model:openKeys", desc: "当前展开的 SubMenu 菜单项 key 数组", type: "string[]", default: "[]" },
    { prop: "defaultOpenKeys", desc: "初始展开的 SubMenu 菜单项 key 数组", type: "string[]", default: "[]" },
    { prop: "inlineCollapsed", desc: "inline 模式下菜单是否折叠", type: "boolean", default: "false" },
    { prop: "inlineIndent", desc: "inline 模式的菜单缩进宽度", type: "number", default: "24" },
    { prop: "multiple", desc: "是否允许多选", type: "boolean", default: "false" },
    { prop: "selectable", desc: "是否允许选中", type: "boolean", default: "true" },
    { prop: "triggerSubMenuAction", desc: "SubMenu 展开/关闭的触发行为", type: "'hover' | 'click'", default: "'hover'" }
];

const menuItemPropsData = [
    { prop: "itemKey", desc: "唯一标识（必填）", type: "string", default: "-" },
    { prop: "disabled", desc: "是否禁用", type: "boolean", default: "false" },
    { prop: "danger", desc: "是否危险项（红色）", type: "boolean", default: "false" },
    { prop: "title", desc: "菜单标题", type: "string", default: "-" }
];

const subMenuPropsData = [
    { prop: "itemKey", desc: "唯一标识（必填）", type: "string", default: "-" },
    { prop: "disabled", desc: "是否禁用", type: "boolean", default: "false" },
    { prop: "title", desc: "子菜单标题", type: "string", default: "-" },
    { prop: "popupClassName", desc: "弹出菜单的类名", type: "string", default: "-" }
];

const eventsData = [
    { event: "select", desc: "选中菜单项时触发", params: "{ key, keyPath, selectedKeys }" },
    { event: "deselect", desc: "取消选中菜单项时触发（仅多选模式）", params: "{ key, keyPath, selectedKeys }" },
    { event: "click", desc: "点击菜单项时触发", params: "{ key, keyPath }" },
    { event: "openChange", desc: "SubMenu 展开/关闭时触发", params: "openKeys: string[]" }
];

const slotsData = [
    { slot: "default", desc: "菜单内容" },
    { slot: "icon", desc: "菜单项图标（MenuItem/SubMenu）" },
    { slot: "title", desc: "子菜单标题（SubMenu）" }
];
</script>

<template>
    <div class="demo-page">
        <header class="demo-page-header">
            <h1 class="demo-page-title">Menu 导航菜单</h1>
            <p class="demo-page-desc">为页面和功能提供导航的菜单列表。</p>
        </header>

        <section class="demo-page-section">
            <h2 class="demo-section-title">何时使用</h2>
            <p class="demo-section-desc">导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。</p>
            <p class="demo-section-desc">一般分为顶部导航和侧边导航，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构。</p>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <!-- 基础用法 -->
                <DemoBox title="内联菜单" description="垂直菜单，子菜单内嵌在菜单区域。" :code="basicCode">
            <div style="width: 256px">
                <vort-menu
                    v-model:selected-keys="selectedKeys"
                    v-model:open-keys="openKeys"
                    mode="inline"
                    @select="handleSelect"
                    @click="handleClick"
                    @open-change="handleOpenChange"
                >
                    <vort-menu-item item-key="1">
                        <template #icon><Home class="w-4 h-4" /></template>
                        Navigation One
                    </vort-menu-item>
                    <vort-menu-item item-key="2">
                        <template #icon><Settings class="w-4 h-4" /></template>
                        Navigation Two
                    </vort-menu-item>
                    <vort-sub-menu item-key="sub1" title="Navigation Three">
                        <template #icon><User class="w-4 h-4" /></template>
                        <vort-menu-item item-key="3">Option 3</vort-menu-item>
                        <vort-menu-item item-key="4">Option 4</vort-menu-item>
                        <vort-sub-menu item-key="sub1-2" title="Submenu">
                            <vort-menu-item item-key="5">Option 5</vort-menu-item>
                            <vort-menu-item item-key="6">Option 6</vort-menu-item>
                        </vort-sub-menu>
                    </vort-sub-menu>
                    <vort-sub-menu item-key="sub2" title="Navigation Four">
                        <template #icon><Folder class="w-4 h-4" /></template>
                        <vort-menu-item item-key="7">Option 7</vort-menu-item>
                        <vort-menu-item item-key="8">Option 8</vort-menu-item>
                    </vort-sub-menu>
                </vort-menu>
            </div>
        </DemoBox>

        <!-- 切换菜单类型 -->
        <DemoBox title="切换菜单类型" description="展示 inline 模式的菜单，可以控制折叠和切换主题。" :code="switchDemoCode">
            <div>
                <div class="flex items-center gap-6 mb-4">
                    <div class="flex items-center gap-2">
                        <vort-switch v-model:checked="switchCollapsed" />
                        <span>Collapsed</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <vort-switch v-model:checked="switchDarkMode" />
                        <span>Dark</span>
                    </div>
                </div>
                <div :style="{ width: switchMenuWidth, transition: 'width 0.2s' }">
                    <vort-menu
                        v-model:selected-keys="switchDemoSelectedKeys"
                        v-model:open-keys="switchDemoOpenKeys"
                        mode="inline"
                        :theme="switchTheme"
                        :inline-collapsed="switchCollapsed"
                    >
                        <vort-menu-item item-key="1" title="Navigation One">
                            <template #icon><Mail class="w-4 h-4" /></template>
                            Navigation One
                        </vort-menu-item>
                        <vort-menu-item item-key="2" title="Navigation Two">
                            <template #icon><Calendar class="w-4 h-4" /></template>
                            Navigation Two
                        </vort-menu-item>
                        <vort-sub-menu item-key="sub1" title="Navigation Two">
                            <template #icon><Settings class="w-4 h-4" /></template>
                            <vort-menu-item item-key="3">Option 1</vort-menu-item>
                            <vort-menu-item item-key="4">Option 2</vort-menu-item>
                            <vort-menu-item item-key="5">Option 3</vort-menu-item>
                            <vort-menu-item item-key="6">Option 4</vort-menu-item>
                        </vort-sub-menu>
                        <vort-sub-menu item-key="sub2" title="Navigation Three">
                            <template #icon><Settings class="w-4 h-4" /></template>
                            <vort-menu-item item-key="7">Option 5</vort-menu-item>
                            <vort-menu-item item-key="8">Option 6</vort-menu-item>
                            <vort-menu-item item-key="9">Option 7</vort-menu-item>
                            <vort-menu-item item-key="10">Option 8</vort-menu-item>
                        </vort-sub-menu>
                        <vort-menu-item item-key="link" title="Ant Design">
                            <template #icon><Link class="w-4 h-4" /></template>
                            <a href="https://antdv.com" target="_blank" rel="noopener">Ant Design</a>
                        </vort-menu-item>
                    </vort-menu>
                </div>
            </div>
        </DemoBox>

        <!-- 顶部导航 -->
        <DemoBox title="顶部导航" description="水平的顶部导航菜单。" :code="horizontalCode">
            <vort-menu v-model:selected-keys="selectedKeys2" mode="horizontal">
                <vort-menu-item item-key="mail">
                    <template #icon><Mail class="w-4 h-4" /></template>
                    Navigation One
                </vort-menu-item>
                <vort-menu-item item-key="app" disabled> Navigation Two (disabled) </vort-menu-item>
                <vort-sub-menu item-key="sub1" title="Navigation Three - Submenu">
                    <vort-menu-item-group title="Item 1">
                        <vort-menu-item item-key="setting:1">Option 1</vort-menu-item>
                        <vort-menu-item item-key="setting:2">Option 2</vort-menu-item>
                    </vort-menu-item-group>
                    <vort-menu-item-group title="Item 2">
                        <vort-menu-item item-key="setting:3">Option 3</vort-menu-item>
                        <vort-menu-item item-key="setting:4">Option 4</vort-menu-item>
                    </vort-menu-item-group>
                </vort-sub-menu>
                <vort-menu-item item-key="link">
                    <a href="https://antdv.com" target="_blank" rel="noopener">Navigation Four</a>
                </vort-menu-item>
            </vort-menu>
        </DemoBox>

        <!-- 垂直菜单 -->
        <DemoBox title="垂直菜单" description="子菜单是弹出的形式。" :code="verticalCode">
            <div style="width: 256px">
                <vort-menu v-model:selected-keys="selectedKeys3" mode="vertical">
                    <vort-menu-item item-key="1">
                        <template #icon><Mail class="w-4 h-4" /></template>
                        Navigation One
                    </vort-menu-item>
                    <vort-menu-item item-key="2">
                        <template #icon><Calendar class="w-4 h-4" /></template>
                        Navigation Two
                    </vort-menu-item>
                    <vort-sub-menu item-key="sub1" title="Navigation Three">
                        <template #icon><Settings class="w-4 h-4" /></template>
                        <vort-menu-item item-key="3">Option 1</vort-menu-item>
                        <vort-menu-item item-key="4">Option 2</vort-menu-item>
                        <vort-menu-item item-key="5">Option 3</vort-menu-item>
                    </vort-sub-menu>
                    <vort-sub-menu item-key="sub2" title="Navigation Four">
                        <template #icon><Folder class="w-4 h-4" /></template>
                        <vort-menu-item item-key="6">Option 4</vort-menu-item>
                        <vort-menu-item item-key="7">Option 5</vort-menu-item>
                    </vort-sub-menu>
                </vort-menu>
            </div>
        </DemoBox>

        <!-- 可折叠菜单 -->
        <DemoBox title="可折叠菜单" description="内嵌菜单可以被缩起/展开。折叠后 hover 显示 tooltip，点击子菜单会弹出。" :code="collapsedCode">
            <div>
                <vort-button style="margin-bottom: 16px" @click="inlineCollapsed = !inlineCollapsed">
                    {{ inlineCollapsed ? "展开" : "收起" }}
                </vort-button>
                <div :style="{ width: inlineCollapsed ? '56px' : '256px', transition: 'width 0.2s' }">
                    <vort-menu v-model:selected-keys="selectedKeys4" v-model:open-keys="openKeys2" mode="inline" theme="dark" :inline-collapsed="inlineCollapsed">
                        <vort-menu-item item-key="1" title="Option 1">
                            <template #icon><Home class="w-4 h-4" /></template>
                            Option 1
                        </vort-menu-item>
                        <vort-menu-item item-key="2" title="Option 2">
                            <template #icon><Settings class="w-4 h-4" /></template>
                            Option 2
                        </vort-menu-item>
                        <vort-sub-menu item-key="sub1" title="Navigation One">
                            <template #icon><User class="w-4 h-4" /></template>
                            <vort-menu-item item-key="3">Option 3</vort-menu-item>
                            <vort-menu-item item-key="4">Option 4</vort-menu-item>
                        </vort-sub-menu>
                        <vort-sub-menu item-key="sub2" title="Navigation Two">
                            <template #icon><Folder class="w-4 h-4" /></template>
                            <vort-menu-item item-key="5">Option 5</vort-menu-item>
                            <vort-menu-item item-key="6">Option 6</vort-menu-item>
                        </vort-sub-menu>
                    </vort-menu>
                </div>
            </div>
        </DemoBox>

        <!-- 暗色主题 -->
        <DemoBox title="暗色主题" description="内建的暗色主题。" :code="darkCode">
            <div style="width: 256px">
                <vort-menu v-model:selected-keys="selectedKeys" v-model:open-keys="openKeys" mode="inline" theme="dark">
                    <vort-menu-item item-key="1">
                        <template #icon><Home class="w-4 h-4" /></template>
                        Option 1
                    </vort-menu-item>
                    <vort-menu-item item-key="2">
                        <template #icon><Settings class="w-4 h-4" /></template>
                        Option 2
                    </vort-menu-item>
                    <vort-sub-menu item-key="sub1" title="Navigation">
                        <template #icon><User class="w-4 h-4" /></template>
                        <vort-menu-item item-key="3">Option 3</vort-menu-item>
                        <vort-menu-item item-key="4">Option 4</vort-menu-item>
                    </vort-sub-menu>
                </vort-menu>
            </div>
        </DemoBox>

        <!-- 分组菜单 -->
        <DemoBox title="分组菜单" description="使用 MenuItemGroup 进行菜单分组。" :code="groupCode">
            <div style="width: 256px">
                <vort-menu v-model:selected-keys="selectedKeys" mode="vertical">
                    <vort-menu-item-group title="Group 1">
                        <vort-menu-item item-key="g1-1">
                            <template #icon><Star class="w-4 h-4" /></template>
                            Option 1
                        </vort-menu-item>
                        <vort-menu-item item-key="g1-2">
                            <template #icon><Heart class="w-4 h-4" /></template>
                            Option 2
                        </vort-menu-item>
                    </vort-menu-item-group>
                    <vort-menu-divider />
                    <vort-menu-item-group title="Group 2">
                        <vort-menu-item item-key="g2-1">
                            <template #icon><Bell class="w-4 h-4" /></template>
                            Option 3
                        </vort-menu-item>
                        <vort-menu-item item-key="g2-2">
                            <template #icon><Search class="w-4 h-4" /></template>
                            Option 4
                        </vort-menu-item>
                    </vort-menu-item-group>
                </vort-menu>
            </div>
        </DemoBox>

        <!-- 禁用和危险项 -->
        <DemoBox title="禁用和危险项" description="菜单项可以设置禁用状态或危险样式。" :code="disabledDangerCode">
            <div style="width: 256px">
                <vort-menu v-model:selected-keys="selectedKeys" mode="inline">
                    <vort-menu-item item-key="normal">
                        <template #icon><FileText class="w-4 h-4" /></template>
                        Normal Item
                    </vort-menu-item>
                    <vort-menu-item item-key="disabled" disabled>
                        <template #icon><Plus class="w-4 h-4" /></template>
                        Disabled Item
                    </vort-menu-item>
                    <vort-menu-divider />
                    <vort-menu-item item-key="danger" danger> Danger Item </vort-menu-item>
                </vort-menu>
            </div>
        </DemoBox>
            </div>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">API</h2>

            <h3 class="demo-api-title">Menu Props</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>属性</th>
                        <th>说明</th>
                        <th>类型</th>
                        <th>默认值</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in propsData" :key="item.prop">
                        <td><code>{{ item.prop }}</code></td>
                        <td>{{ item.desc }}</td>
                        <td><code>{{ item.type }}</code></td>
                        <td><code>{{ item.default }}</code></td>
                    </tr>
                </tbody>
            </table>

            <h3 class="demo-api-title">MenuItem Props</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>属性</th>
                        <th>说明</th>
                        <th>类型</th>
                        <th>默认值</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in menuItemPropsData" :key="item.prop">
                        <td><code>{{ item.prop }}</code></td>
                        <td>{{ item.desc }}</td>
                        <td><code>{{ item.type }}</code></td>
                        <td><code>{{ item.default }}</code></td>
                    </tr>
                </tbody>
            </table>

            <h3 class="demo-api-title">SubMenu Props</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>属性</th>
                        <th>说明</th>
                        <th>类型</th>
                        <th>默认值</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in subMenuPropsData" :key="item.prop">
                        <td><code>{{ item.prop }}</code></td>
                        <td>{{ item.desc }}</td>
                        <td><code>{{ item.type }}</code></td>
                        <td><code>{{ item.default }}</code></td>
                    </tr>
                </tbody>
            </table>

            <h3 class="demo-api-title">Events</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>事件名</th>
                        <th>说明</th>
                        <th>回调参数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in eventsData" :key="item.event">
                        <td><code>{{ item.event }}</code></td>
                        <td>{{ item.desc }}</td>
                        <td><code>{{ item.params }}</code></td>
                    </tr>
                </tbody>
            </table>

            <h3 class="demo-api-title">Slots</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>插槽名</th>
                        <th>说明</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in slotsData" :key="item.slot">
                        <td><code>{{ item.slot }}</code></td>
                        <td>{{ item.desc }}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>
