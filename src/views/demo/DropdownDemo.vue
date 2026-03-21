<script setup lang="ts">
import DemoBox from "./components/DemoBox.vue";

// 示例代码
const basicCode = `<template>
  <vort-dropdown>
    <a class="ant-dropdown-link" @click.prevent>
      Hover me <DownOutlined />
    </a>
    <template #overlay>
      <vort-dropdown-menu-item @click="handleClick('1st')">
        1st menu item
      </vort-dropdown-menu-item>
      <vort-dropdown-menu-item @click="handleClick('2nd')">
        2nd menu item
      </vort-dropdown-menu-item>
      <vort-dropdown-menu-item @click="handleClick('3rd')">
        3rd menu item
      </vort-dropdown-menu-item>
    </template>
  </vort-dropdown>
</template>`;

const clickCode = `<template>
  <vort-dropdown trigger="click">
    <vort-button>Click me</vort-button>
    <template #overlay>
      <vort-dropdown-menu-item>1st menu item</vort-dropdown-menu-item>
      <vort-dropdown-menu-item>2nd menu item</vort-dropdown-menu-item>
      <vort-dropdown-menu-separator />
      <vort-dropdown-menu-item>3rd menu item</vort-dropdown-menu-item>
    </template>
  </vort-dropdown>
</template>`;

const placementCode = `<template>
  <vort-dropdown placement="bottomLeft">
    <vort-button>bottomLeft</vort-button>
    <template #overlay>...</template>
  </vort-dropdown>
  <vort-dropdown placement="bottom">
    <vort-button>bottom</vort-button>
    <template #overlay>...</template>
  </vort-dropdown>
  <vort-dropdown placement="bottomRight">
    <vort-button>bottomRight</vort-button>
    <template #overlay>...</template>
  </vort-dropdown>
</template>`;

const arrowCode = `<template>
  <vort-dropdown :arrow="true">
    <vort-button>With arrow</vort-button>
    <template #overlay>
      <vort-dropdown-menu-item>1st menu item</vort-dropdown-menu-item>
      <vort-dropdown-menu-item>2nd menu item</vort-dropdown-menu-item>
    </template>
  </vort-dropdown>
  <vort-dropdown :arrow="{ pointAtCenter: true }">
    <vort-button>Arrow point at center</vort-button>
    <template #overlay>...</template>
  </vort-dropdown>
</template>`;

const dangerCode = `<template>
  <vort-dropdown>
    <vort-button>Danger Item</vort-button>
    <template #overlay>
      <vort-dropdown-menu-item>Normal item</vort-dropdown-menu-item>
      <vort-dropdown-menu-item danger>Danger item</vort-dropdown-menu-item>
    </template>
  </vort-dropdown>
</template>`;

const iconCode = `<template>
  <vort-dropdown>
    <vort-button>With Icon</vort-button>
    <template #overlay>
      <vort-dropdown-menu-item>
        <template #icon><UserOutlined /></template>
        User Center
      </vort-dropdown-menu-item>
      <vort-dropdown-menu-item>
        <template #icon><SettingOutlined /></template>
        Settings
      </vort-dropdown-menu-item>
      <vort-dropdown-menu-separator />
      <vort-dropdown-menu-item danger>
        <template #icon><LogoutOutlined /></template>
        Logout
      </vort-dropdown-menu-item>
    </template>
  </vort-dropdown>
</template>`;

const subMenuCode = `<template>
  <vort-dropdown>
    <vort-button>Cascading menu</vort-button>
    <template #overlay>
      <vort-dropdown-menu-item>1st menu item</vort-dropdown-menu-item>
      <vort-dropdown-menu-item>2nd menu item</vort-dropdown-menu-item>
      <vort-dropdown-menu-sub title="sub menu">
        <vort-dropdown-menu-item>3rd menu item</vort-dropdown-menu-item>
        <vort-dropdown-menu-item>4th menu item</vort-dropdown-menu-item>
      </vort-dropdown-menu-sub>
    </template>
  </vort-dropdown>
</template>`;

const contextMenuCode = `<template>
  <vort-dropdown :trigger="['contextMenu']">
    <div class="context-area">Right Click on here</div>
    <template #overlay>
      <vort-dropdown-menu-item>1st menu item</vort-dropdown-menu-item>
      <vort-dropdown-menu-item>2nd menu item</vort-dropdown-menu-item>
      <vort-dropdown-menu-item>3rd menu item</vort-dropdown-menu-item>
    </template>
  </vort-dropdown>
</template>`;

const dropdownButtonCode = `<template>
  <vort-dropdown-button @click="handleButtonClick">
    Dropdown
    <template #overlay>
      <vort-dropdown-menu-item key="1">1st menu item</vort-dropdown-menu-item>
      <vort-dropdown-menu-item key="2">2nd menu item</vort-dropdown-menu-item>
      <vort-dropdown-menu-item key="3">3rd menu item</vort-dropdown-menu-item>
    </template>
  </vort-dropdown-button>
</template>`;

const dropdownButtonTypesCode = `<template>
  <vort-dropdown-button type="primary">Primary</vort-dropdown-button>
  <vort-dropdown-button>Default</vort-dropdown-button>
  <vort-dropdown-button type="dashed">Dashed</vort-dropdown-button>
  <vort-dropdown-button danger>Danger</vort-dropdown-button>
</template>`;

const dropdownButtonSizesCode = `<template>
  <vort-dropdown-button size="large">Large</vort-dropdown-button>
  <vort-dropdown-button size="middle">Middle</vort-dropdown-button>
  <vort-dropdown-button size="small">Small</vort-dropdown-button>
</template>`;

const dropdownButtonLoadingCode = `<template>
  <vort-dropdown-button loading>Loading</vort-dropdown-button>
  <vort-dropdown-button type="primary" loading>Loading</vort-dropdown-button>
</template>`;

const disabledCode = `<template>
  <vort-dropdown disabled>
    <vort-button>Disabled</vort-button>
    <template #overlay>
      <vort-dropdown-menu-item>1st menu item</vort-dropdown-menu-item>
    </template>
  </vort-dropdown>

  <vort-dropdown>
    <vort-button>Menu item disabled</vort-button>
    <template #overlay>
      <vort-dropdown-menu-item>1st menu item</vort-dropdown-menu-item>
      <vort-dropdown-menu-item disabled>2nd menu item (disabled)</vort-dropdown-menu-item>
      <vort-dropdown-menu-item>3rd menu item</vort-dropdown-menu-item>
    </template>
  </vort-dropdown>
</template>`;

// Props 表格数据
const propsData = [
    { prop: "open", desc: "菜单是否显示（受控模式）", type: "boolean", default: "-" },
    { prop: "defaultOpen", desc: "菜单是否默认显示", type: "boolean", default: "false" },
    { prop: "trigger", desc: "触发下拉的行为", type: "'hover' | 'click' | 'contextMenu' | Array", default: "'hover'" },
    { prop: "placement", desc: "菜单弹出位置", type: "DropdownPlacement", default: "'bottomLeft'" },
    { prop: "disabled", desc: "菜单是否禁用", type: "boolean", default: "false" },
    { prop: "overlayClassName", desc: "下拉菜单的 class", type: "string", default: "-" },
    { prop: "overlayStyle", desc: "下拉菜单的 style", type: "object", default: "-" },
    { prop: "arrow", desc: "是否显示箭头", type: "boolean | { pointAtCenter: boolean }", default: "false" },
    { prop: "destroyPopupOnHide", desc: "关闭后是否销毁下拉菜单", type: "boolean", default: "false" },
    { prop: "offset", desc: "下拉框距触发元素的距离", type: "number", default: "4" },
    {
        prop: "getPopupContainer",
        desc: "菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位",
        type: "() => HTMLElement",
        default: "() => document.body"
    }
];

const eventsData = [
    { event: "update:open", desc: "菜单显示状态改变时调用", params: "(open: boolean) => void" },
    { event: "openChange", desc: "菜单显示状态改变时调用", params: "(open: boolean) => void" }
];

const slotsData = [
    { slot: "default", desc: "触发下拉菜单的元素" },
    { slot: "overlay", desc: "下拉菜单内容" }
];

const menuItemPropsData = [
    { prop: "disabled", desc: "是否禁用", type: "boolean", default: "false" },
    { prop: "danger", desc: "是否为危险项", type: "boolean", default: "false" }
];

// DropdownButton Props 表格数据
const dropdownButtonPropsData = [
    { prop: "open", desc: "下拉菜单是否显示（受控模式）", type: "boolean", default: "-" },
    { prop: "type", desc: "按钮类型", type: "'primary' | 'default' | 'dashed' | 'text' | 'link'", default: "'default'" },
    { prop: "size", desc: "按钮尺寸", type: "'large' | 'middle' | 'small'", default: "'middle'" },
    { prop: "danger", desc: "是否为危险按钮", type: "boolean", default: "false" },
    { prop: "disabled", desc: "左侧按钮是否禁用", type: "boolean", default: "false" },
    { prop: "buttonsDisabled", desc: "整个按钮组是否禁用", type: "boolean", default: "-" },
    { prop: "loading", desc: "是否加载中", type: "boolean", default: "false" },
    { prop: "trigger", desc: "触发下拉的行为", type: "'hover' | 'click' | Array", default: "'hover'" },
    { prop: "placement", desc: "菜单弹出位置", type: "DropdownButtonPlacement", default: "'bottomRight'" },
    { prop: "overlayClassName", desc: "下拉菜单的 class", type: "string", default: "-" },
    { prop: "overlayStyle", desc: "下拉菜单的 style", type: "object", default: "-" },
    { prop: "arrow", desc: "是否显示箭头", type: "boolean | { pointAtCenter: boolean }", default: "false" }
];

const dropdownButtonEventsData = [
    { event: "click", desc: "左侧按钮点击事件", params: "(event: MouseEvent) => void" },
    { event: "update:open", desc: "下拉菜单显示状态改变时调用", params: "(open: boolean) => void" },
    { event: "openChange", desc: "下拉菜单显示状态改变时调用", params: "(open: boolean) => void" }
];

const dropdownButtonSlotsData = [
    { slot: "default", desc: "左侧按钮内容" },
    { slot: "overlay", desc: "下拉菜单内容" },
    { slot: "icon", desc: "自定义右侧下拉触发按钮的图标" }
];

// 处理点击
const handleClick = (key: string) => {
    console.log("Click:", key);
};

// 处理按钮点击
const handleButtonClick = () => {
    console.log("Button clicked!");
};
</script>

<template>
    <div class="demo-page">
        <header class="demo-page-header">
            <h1 class="demo-page-title">Dropdown 下拉菜单</h1>
            <p class="demo-page-desc">向下弹出的列表。</p>
        </header>

        <section class="demo-page-section">
            <h2 class="demo-section-title">何时使用</h2>
            <ul class="demo-section-list">
                <li>当页面上的操作命令过多时，用此组件可以收纳操作元素。</li>
                <li>点击或移入触点，会出现一个下拉菜单。可在列表中进行选择，并执行相应的命令。</li>
            </ul>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <DemoBox title="基本使用" description="最简单的下拉菜单。默认通过 hover 触发。" :code="basicCode">
                    <vort-dropdown>
                        <a class="dropdown-link">
                            Hover me
                            <svg class="dropdown-arrow" viewBox="0 0 12 12" width="12" height="12">
                                <path
                                    d="M2.5 4.5L6 8L9.5 4.5"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </a>
                        <template #overlay>
                            <vort-dropdown-menu-item @click="handleClick('1st')"> 1st menu item </vort-dropdown-menu-item>
                            <vort-dropdown-menu-item @click="handleClick('2nd')"> 2nd menu item </vort-dropdown-menu-item>
                            <vort-dropdown-menu-item @click="handleClick('3rd')"> 3rd menu item </vort-dropdown-menu-item>
                        </template>
                    </vort-dropdown>
                </DemoBox>

                <DemoBox title="点击触发" description="使用 trigger='click' 使下拉菜单通过点击触发。" :code="clickCode">
                    <vort-dropdown trigger="click">
                        <vort-button>Click me</vort-button>
                        <template #overlay>
                            <vort-dropdown-menu-item>1st menu item</vort-dropdown-menu-item>
                            <vort-dropdown-menu-item>2nd menu item</vort-dropdown-menu-item>
                            <vort-dropdown-menu-separator />
                            <vort-dropdown-menu-item>3rd menu item</vort-dropdown-menu-item>
                        </template>
                    </vort-dropdown>
                </DemoBox>

                <DemoBox title="弹出位置" description="支持 12 个弹出位置。" :code="placementCode">
                    <div class="placement-demo">
                        <div class="placement-row top-row">
                            <vort-dropdown placement="topLeft">
                                <vort-button>topLeft</vort-button>
                                <template #overlay>
                                    <vort-dropdown-menu-item>1st menu item</vort-dropdown-menu-item>
                                    <vort-dropdown-menu-item>2nd menu item</vort-dropdown-menu-item>
                                </template>
                            </vort-dropdown>
                            <vort-dropdown placement="top">
                                <vort-button>top</vort-button>
                                <template #overlay>
                                    <vort-dropdown-menu-item>1st menu item</vort-dropdown-menu-item>
                                    <vort-dropdown-menu-item>2nd menu item</vort-dropdown-menu-item>
                                </template>
                            </vort-dropdown>
                            <vort-dropdown placement="topRight">
                                <vort-button>topRight</vort-button>
                                <template #overlay>
                                    <vort-dropdown-menu-item>1st menu item</vort-dropdown-menu-item>
                                    <vort-dropdown-menu-item>2nd menu item</vort-dropdown-menu-item>
                                </template>
                            </vort-dropdown>
                        </div>
                        <div class="placement-row bottom-row">
                            <vort-dropdown placement="bottomLeft">
                                <vort-button>bottomLeft</vort-button>
                                <template #overlay>
                                    <vort-dropdown-menu-item>1st menu item</vort-dropdown-menu-item>
                                    <vort-dropdown-menu-item>2nd menu item</vort-dropdown-menu-item>
                                </template>
                            </vort-dropdown>
                            <vort-dropdown placement="bottom">
                                <vort-button>bottom</vort-button>
                                <template #overlay>
                                    <vort-dropdown-menu-item>1st menu item</vort-dropdown-menu-item>
                                    <vort-dropdown-menu-item>2nd menu item</vort-dropdown-menu-item>
                                </template>
                            </vort-dropdown>
                            <vort-dropdown placement="bottomRight">
                                <vort-button>bottomRight</vort-button>
                                <template #overlay>
                                    <vort-dropdown-menu-item>1st menu item</vort-dropdown-menu-item>
                                    <vort-dropdown-menu-item>2nd menu item</vort-dropdown-menu-item>
                                </template>
                            </vort-dropdown>
                        </div>
                    </div>
                </DemoBox>

                <DemoBox title="带箭头" description="通过 arrow 属性显示箭头。" :code="arrowCode">
                    <div class="demo-row">
                        <vort-dropdown :arrow="true" placement="bottom">
                            <vort-button>With arrow</vort-button>
                            <template #overlay>
                                <vort-dropdown-menu-item>1st menu item</vort-dropdown-menu-item>
                                <vort-dropdown-menu-item>2nd menu item</vort-dropdown-menu-item>
                            </template>
                        </vort-dropdown>
                        <vort-dropdown :arrow="{ pointAtCenter: true }" placement="bottom">
                            <vort-button>Arrow point at center</vort-button>
                            <template #overlay>
                                <vort-dropdown-menu-item>1st menu item</vort-dropdown-menu-item>
                                <vort-dropdown-menu-item>2nd menu item</vort-dropdown-menu-item>
                            </template>
                        </vort-dropdown>
                    </div>
                </DemoBox>

                <DemoBox title="危险菜单项" description="通过 danger 属性设置危险菜单项。" :code="dangerCode">
                    <vort-dropdown>
                        <vort-button>Danger Item</vort-button>
                        <template #overlay>
                            <vort-dropdown-menu-item>Normal item</vort-dropdown-menu-item>
                            <vort-dropdown-menu-item danger>Danger item</vort-dropdown-menu-item>
                        </template>
                    </vort-dropdown>
                </DemoBox>

                <DemoBox title="带图标的菜单" description="菜单项可以添加图标。" :code="iconCode">
                    <vort-dropdown>
                        <vort-button>With Icon</vort-button>
                        <template #overlay>
                            <vort-dropdown-menu-item>
                                <template #icon>
                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                                        <path
                                            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                                        />
                                    </svg>
                                </template>
                                User Center
                            </vort-dropdown-menu-item>
                            <vort-dropdown-menu-item>
                                <template #icon>
                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                                        <path
                                            d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"
                                        />
                                    </svg>
                                </template>
                                Settings
                            </vort-dropdown-menu-item>
                            <vort-dropdown-menu-separator />
                            <vort-dropdown-menu-item danger>
                                <template #icon>
                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                                        <path
                                            d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"
                                        />
                                    </svg>
                                </template>
                                Logout
                            </vort-dropdown-menu-item>
                        </template>
                    </vort-dropdown>
                </DemoBox>

                <DemoBox title="多级菜单" description="传入的菜单里有子菜单。" :code="subMenuCode">
                    <vort-dropdown>
                        <vort-button>Cascading menu</vort-button>
                        <template #overlay>
                            <vort-dropdown-menu-item>1st menu item</vort-dropdown-menu-item>
                            <vort-dropdown-menu-item>2nd menu item</vort-dropdown-menu-item>
                            <vort-dropdown-menu-sub title="sub menu">
                                <vort-dropdown-menu-item>3rd menu item</vort-dropdown-menu-item>
                                <vort-dropdown-menu-item>4th menu item</vort-dropdown-menu-item>
                            </vort-dropdown-menu-sub>
                            <vort-dropdown-menu-sub title="disabled sub menu" disabled>
                                <vort-dropdown-menu-item>5th menu item</vort-dropdown-menu-item>
                                <vort-dropdown-menu-item>6th menu item</vort-dropdown-menu-item>
                            </vort-dropdown-menu-sub>
                        </template>
                    </vort-dropdown>
                </DemoBox>

                <DemoBox title="右键菜单" description="使用 trigger='contextMenu' 触发右键菜单。" :code="contextMenuCode">
                    <vort-dropdown :trigger="['contextMenu']">
                        <div class="context-area">Right Click on here</div>
                        <template #overlay>
                            <vort-dropdown-menu-item>1st menu item</vort-dropdown-menu-item>
                            <vort-dropdown-menu-item>2nd menu item</vort-dropdown-menu-item>
                            <vort-dropdown-menu-item>3rd menu item</vort-dropdown-menu-item>
                        </template>
                    </vort-dropdown>
                </DemoBox>

                <DemoBox title="禁用状态" description="整体禁用或禁用单个菜单项。" :code="disabledCode">
                    <div class="demo-row">
                        <vort-dropdown disabled>
                            <vort-button>Disabled</vort-button>
                            <template #overlay>
                                <vort-dropdown-menu-item>1st menu item</vort-dropdown-menu-item>
                            </template>
                        </vort-dropdown>

                        <vort-dropdown>
                            <vort-button>Menu item disabled</vort-button>
                            <template #overlay>
                                <vort-dropdown-menu-item>1st menu item</vort-dropdown-menu-item>
                                <vort-dropdown-menu-item disabled>2nd menu item (disabled)</vort-dropdown-menu-item>
                                <vort-dropdown-menu-item>3rd menu item</vort-dropdown-menu-item>
                            </template>
                        </vort-dropdown>
                    </div>
                </DemoBox>

                <!-- DropdownButton 示例 -->
                <h2 class="demo-section-title mt-12">DropdownButton 带下拉框的按钮</h2>
                <p class="demo-section-desc">左边是按钮，右边是额外的相关功能菜单。可设置 icon 属性来修改右边的图标。</p>

                <DemoBox title="基本使用" description="最基本的带下拉框的按钮。" :code="dropdownButtonCode">
                    <div class="demo-row">
                        <vort-dropdown-button @click="handleButtonClick">
                            Dropdown
                            <template #overlay>
                                <vort-dropdown-menu-item @click="handleClick('1st')">1st menu item</vort-dropdown-menu-item>
                                <vort-dropdown-menu-item @click="handleClick('2nd')">2nd menu item</vort-dropdown-menu-item>
                                <vort-dropdown-menu-item @click="handleClick('3rd')">3rd menu item</vort-dropdown-menu-item>
                            </template>
                        </vort-dropdown-button>

                        <vort-dropdown-button trigger="click" @click="handleButtonClick">
                            Click Trigger
                            <template #overlay>
                                <vort-dropdown-menu-item>1st menu item</vort-dropdown-menu-item>
                                <vort-dropdown-menu-item>2nd menu item</vort-dropdown-menu-item>
                                <vort-dropdown-menu-item>3rd menu item</vort-dropdown-menu-item>
                            </template>
                        </vort-dropdown-button>
                    </div>
                </DemoBox>

                <DemoBox title="按钮类型" description="支持 primary、default、dashed 等按钮类型，以及危险按钮。" :code="dropdownButtonTypesCode">
                    <div class="demo-row">
                        <vort-dropdown-button type="primary" @click="handleButtonClick">
                            Primary
                            <template #overlay>
                                <vort-dropdown-menu-item>1st menu item</vort-dropdown-menu-item>
                                <vort-dropdown-menu-item>2nd menu item</vort-dropdown-menu-item>
                            </template>
                        </vort-dropdown-button>

                        <vort-dropdown-button @click="handleButtonClick">
                            Default
                            <template #overlay>
                                <vort-dropdown-menu-item>1st menu item</vort-dropdown-menu-item>
                                <vort-dropdown-menu-item>2nd menu item</vort-dropdown-menu-item>
                            </template>
                        </vort-dropdown-button>

                        <vort-dropdown-button type="dashed" @click="handleButtonClick">
                            Dashed
                            <template #overlay>
                                <vort-dropdown-menu-item>1st menu item</vort-dropdown-menu-item>
                                <vort-dropdown-menu-item>2nd menu item</vort-dropdown-menu-item>
                            </template>
                        </vort-dropdown-button>

                        <vort-dropdown-button danger @click="handleButtonClick">
                            Danger
                            <template #overlay>
                                <vort-dropdown-menu-item>1st menu item</vort-dropdown-menu-item>
                                <vort-dropdown-menu-item danger>Delete</vort-dropdown-menu-item>
                            </template>
                        </vort-dropdown-button>

                        <vort-dropdown-button type="primary" danger @click="handleButtonClick">
                            Primary Danger
                            <template #overlay>
                                <vort-dropdown-menu-item>1st menu item</vort-dropdown-menu-item>
                                <vort-dropdown-menu-item danger>Delete</vort-dropdown-menu-item>
                            </template>
                        </vort-dropdown-button>
                    </div>
                </DemoBox>

                <DemoBox title="按钮尺寸" description="支持 large、middle、small 三种尺寸。" :code="dropdownButtonSizesCode">
                    <div class="demo-row">
                        <vort-dropdown-button size="large" @click="handleButtonClick">
                            Large
                            <template #overlay>
                                <vort-dropdown-menu-item>1st menu item</vort-dropdown-menu-item>
                                <vort-dropdown-menu-item>2nd menu item</vort-dropdown-menu-item>
                            </template>
                        </vort-dropdown-button>

                        <vort-dropdown-button size="middle" @click="handleButtonClick">
                            Middle
                            <template #overlay>
                                <vort-dropdown-menu-item>1st menu item</vort-dropdown-menu-item>
                                <vort-dropdown-menu-item>2nd menu item</vort-dropdown-menu-item>
                            </template>
                        </vort-dropdown-button>

                        <vort-dropdown-button size="small" @click="handleButtonClick">
                            Small
                            <template #overlay>
                                <vort-dropdown-menu-item>1st menu item</vort-dropdown-menu-item>
                                <vort-dropdown-menu-item>2nd menu item</vort-dropdown-menu-item>
                            </template>
                        </vort-dropdown-button>
                    </div>
                </DemoBox>

                <DemoBox title="加载中状态" description="设置 loading 属性可以让左侧按钮显示加载状态。" :code="dropdownButtonLoadingCode">
                    <div class="demo-row">
                        <vort-dropdown-button loading @click="handleButtonClick">
                            Loading
                            <template #overlay>
                                <vort-dropdown-menu-item>1st menu item</vort-dropdown-menu-item>
                            </template>
                        </vort-dropdown-button>

                        <vort-dropdown-button type="primary" loading @click="handleButtonClick">
                            Loading
                            <template #overlay>
                                <vort-dropdown-menu-item>1st menu item</vort-dropdown-menu-item>
                            </template>
                        </vort-dropdown-button>

                        <vort-dropdown-button disabled @click="handleButtonClick">
                            Disabled
                            <template #overlay>
                                <vort-dropdown-menu-item>1st menu item</vort-dropdown-menu-item>
                            </template>
                        </vort-dropdown-button>

                        <vort-dropdown-button :buttons-disabled="true" @click="handleButtonClick">
                            All Disabled
                            <template #overlay>
                                <vort-dropdown-menu-item>1st menu item</vort-dropdown-menu-item>
                            </template>
                        </vort-dropdown-button>
                    </div>
                </DemoBox>
            </div>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">API</h2>

            <h3 class="demo-api-title">Dropdown Props</h3>
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
                        <td>
                            <code>{{ item.prop }}</code>
                        </td>
                        <td>{{ item.desc }}</td>
                        <td>
                            <code>{{ item.type }}</code>
                        </td>
                        <td>
                            <code>{{ item.default }}</code>
                        </td>
                    </tr>
                </tbody>
            </table>

            <h3 class="demo-api-title">Dropdown Events</h3>
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
                        <td>
                            <code>{{ item.event }}</code>
                        </td>
                        <td>{{ item.desc }}</td>
                        <td>
                            <code>{{ item.params }}</code>
                        </td>
                    </tr>
                </tbody>
            </table>

            <h3 class="demo-api-title">Dropdown Slots</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>插槽名</th>
                        <th>说明</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in slotsData" :key="item.slot">
                        <td>
                            <code>{{ item.slot }}</code>
                        </td>
                        <td>{{ item.desc }}</td>
                    </tr>
                </tbody>
            </table>

            <h3 class="demo-api-title">DropdownMenuItem Props</h3>
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
                        <td>
                            <code>{{ item.prop }}</code>
                        </td>
                        <td>{{ item.desc }}</td>
                        <td>
                            <code>{{ item.type }}</code>
                        </td>
                        <td>
                            <code>{{ item.default }}</code>
                        </td>
                    </tr>
                </tbody>
            </table>

            <h3 class="demo-api-title">DropdownPlacement</h3>
            <p class="demo-api-desc">
                <code
                    >'bottom' | 'bottomLeft' | 'bottomRight' | 'top' | 'topLeft' | 'topRight' | 'left' | 'leftTop' | 'leftBottom' | 'right' | 'rightTop' |
                    'rightBottom'</code
                >
            </p>

            <h3 class="demo-api-title mt-8">DropdownButton Props</h3>
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
                    <tr v-for="item in dropdownButtonPropsData" :key="item.prop">
                        <td>
                            <code>{{ item.prop }}</code>
                        </td>
                        <td>{{ item.desc }}</td>
                        <td>
                            <code>{{ item.type }}</code>
                        </td>
                        <td>
                            <code>{{ item.default }}</code>
                        </td>
                    </tr>
                </tbody>
            </table>

            <h3 class="demo-api-title">DropdownButton Events</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>事件名</th>
                        <th>说明</th>
                        <th>回调参数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in dropdownButtonEventsData" :key="item.event">
                        <td>
                            <code>{{ item.event }}</code>
                        </td>
                        <td>{{ item.desc }}</td>
                        <td>
                            <code>{{ item.params }}</code>
                        </td>
                    </tr>
                </tbody>
            </table>

            <h3 class="demo-api-title">DropdownButton Slots</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>插槽名</th>
                        <th>说明</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in dropdownButtonSlotsData" :key="item.slot">
                        <td>
                            <code>{{ item.slot }}</code>
                        </td>
                        <td>{{ item.desc }}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>

<style scoped>
/* 特有样式 - 公共样式已在 demo.css 中定义 */

/* Dropdown link */
.dropdown-link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: var(--vort-primary);
    cursor: pointer;
}

.dropdown-link:hover {
    color: var(--vort-primary-hover);
}

.dropdown-arrow {
    transition: transform 0.2s;
}

/* Placement demo */
.placement-demo {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.placement-row {
    display: flex;
    gap: 8px;
}

.top-row {
    justify-content: center;
}

.bottom-row {
    justify-content: center;
}

/* Context menu area */
.context-area {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 100px;
    background: rgba(0, 0, 0, 0.04);
    border: 1px dashed var(--vort-border);
    border-radius: 8px;
    color: var(--vort-text-secondary);
}
</style>
