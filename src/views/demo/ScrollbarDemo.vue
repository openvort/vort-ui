<script setup lang="ts">
import { ref } from "vue";
import DemoBox from "./components/DemoBox.vue";

// 基础使用
const value = ref(1);

// 手动滚动
const scrollbarRef = ref<InstanceType<typeof import("@/components/vort/scrollbar").Scrollbar> | null>(null);
const inputValue = ref(100);

const handleScrollTo = () => {
    scrollbarRef.value?.setScrollTop(inputValue.value);
};

// 示例代码
const basicCode = `<template>
  <vort-scrollbar height="400px">
    <p v-for="item in 20" :key="item" class="scrollbar-demo-item">
      {{ item }}
    </p>
  </vort-scrollbar>
</template>`;

const horizontalCode = `<template>
  <vort-scrollbar>
    <div class="scrollbar-demo-horizontal">
      <p v-for="item in 20" :key="item" class="scrollbar-demo-item-h">
        {{ item }}
      </p>
    </div>
  </vort-scrollbar>
</template>

<style scoped>
.scrollbar-demo-horizontal {
  display: flex;
}
.scrollbar-demo-item-h {
  flex-shrink: 0;
  width: 100px;
  height: 50px;
  /* ... */
}
</style>`;

const maxHeightCode = `<template>
  <vort-button @click="addItem">添加项目</vort-button>
  <vort-scrollbar max-height="400px">
    <p v-for="item in count" :key="item" class="scrollbar-demo-item">
      {{ item }}
    </p>
  </vort-scrollbar>
</template>

<script setup>
const count = ref(3);
const addItem = () => {
  count.value++;
};
<\/script>`;

const scrollToCode = `<script setup>
const scrollbarRef = ref(null);
const inputValue = ref(100);

const handleScrollTo = () => {
  scrollbarRef.value?.setScrollTop(inputValue.value);
};
<\/script>

<template>
  <vort-input v-model="inputValue" placeholder="滚动距离" />
  <vort-button @click="handleScrollTo">滚动</vort-button>

  <vort-scrollbar ref="scrollbarRef" height="400px" always>
    <p v-for="item in 20" :key="item" class="scrollbar-demo-item">
      {{ item }}
    </p>
  </vort-scrollbar>
</template>`;

const alwaysCode = `<template>
  <!-- 滚动条始终显示 -->
  <vort-scrollbar height="400px" always>
    <p v-for="item in 20" :key="item" class="scrollbar-demo-item">
      {{ item }}
    </p>
  </vort-scrollbar>
</template>`;

const nativeCode = `<template>
  <!-- 使用原生滚动条 -->
  <vort-scrollbar height="400px" native>
    <p v-for="item in 20" :key="item" class="scrollbar-demo-item">
      {{ item }}
    </p>
  </vort-scrollbar>
</template>`;

// 最大高度演示
const count = ref(3);
const addItem = () => {
    count.value++;
};

// Props 表格数据
const propsData = [
    {
        prop: "height",
        desc: "滚动条高度",
        type: "string | number",
        default: "-"
    },
    {
        prop: "maxHeight",
        desc: "滚动条最大高度",
        type: "string | number",
        default: "-"
    },
    {
        prop: "native",
        desc: "是否使用原生滚动条样式",
        type: "boolean",
        default: "false"
    },
    {
        prop: "wrapStyle",
        desc: "包裹容器的自定义样式",
        type: "string | object",
        default: "-"
    },
    {
        prop: "wrapClass",
        desc: "包裹容器的自定义类名",
        type: "string",
        default: "-"
    },
    {
        prop: "viewStyle",
        desc: "视图的自定义样式",
        type: "string | object",
        default: "-"
    },
    {
        prop: "viewClass",
        desc: "视图的自定义类名",
        type: "string",
        default: "-"
    },
    {
        prop: "noresize",
        desc: "不响应容器尺寸变化，如果容器尺寸不会发生变化，最好设置它可以优化性能",
        type: "boolean",
        default: "false"
    },
    {
        prop: "tag",
        desc: "视图的元素标签",
        type: "string",
        default: "div"
    },
    {
        prop: "always",
        desc: "滚动条总是显示",
        type: "boolean",
        default: "false"
    },
    {
        prop: "minSize",
        desc: "滚动条最小尺寸",
        type: "number",
        default: "20"
    }
];

// Events 表格数据
const eventsData = [
    {
        event: "scroll",
        desc: "当触发滚动事件时触发",
        params: "{ scrollTop: number, scrollLeft: number }"
    }
];

// Exposes 表格数据
const exposesData = [
    {
        name: "handleScroll",
        desc: "触发滚动事件",
        type: "() => void"
    },
    {
        name: "scrollTo",
        desc: "滚动到一组特定坐标",
        type: "(options: ScrollToOptions | number, yCoord?: number) => void"
    },
    {
        name: "setScrollTop",
        desc: "设置滚动条到顶部的距离",
        type: "(value: number) => void"
    },
    {
        name: "setScrollLeft",
        desc: "设置滚动条到左边的距离",
        type: "(value: number) => void"
    },
    {
        name: "update",
        desc: "手动更新滚动条状态",
        type: "() => void"
    },
    {
        name: "wrapRef",
        desc: "滚动条包裹的 ref 对象",
        type: "Ref<HTMLElement>"
    }
];

// Slots 表格数据
const slotsData = [
    {
        slot: "default",
        desc: "自定义默认内容"
    }
];
</script>

<template>
    <div class="demo-page">
        <header class="demo-page-header">
            <h1 class="demo-page-title">Scrollbar 滚动条</h1>
            <p class="demo-page-desc">用于替换浏览器原生滚动条。</p>
        </header>

        <section class="demo-page-section">
            <h2 class="demo-section-title">何时使用</h2>
            <p class="demo-section-desc">当需要美化滚动条样式，或者需要更好地控制滚动行为时，可以使用 Scrollbar 组件替换原生滚动条。</p>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <DemoBox title="基础用法" description="通过 height 属性设置滚动区域的高度。鼠标悬停时显示滚动条。" :code="basicCode">
                    <vort-scrollbar height="200px" style="width: 100%">
                        <p v-for="item in 20" :key="item" class="scrollbar-demo-item">
                            {{ item }}
                        </p>
                    </vort-scrollbar>
                </DemoBox>

                <DemoBox title="横向滚动" description="当内容宽度超过容器宽度时，会出现横向滚动条。" :code="horizontalCode">
                    <vort-scrollbar>
                        <div class="scrollbar-demo-horizontal">
                            <p v-for="item in 20" :key="item" class="scrollbar-demo-item-h">
                                {{ item }}
                            </p>
                        </div>
                    </vort-scrollbar>
                </DemoBox>

                <DemoBox title="最大高度" description="通过 max-height 属性设置最大高度，只有当内容超过最大高度时才显示滚动条。" :code="maxHeightCode">
                    <vort-button style="margin-bottom: 12px" @click="addItem">添加项目</vort-button>
                    <vort-scrollbar max-height="200px" style="width: 100%">
                        <p v-for="item in count" :key="item" class="scrollbar-demo-item">
                            {{ item }}
                        </p>
                    </vort-scrollbar>
                </DemoBox>

                <DemoBox title="手动滚动" description="通过 ref 可以获取组件实例，调用 scrollTo 或 setScrollTop 方法手动滚动。" :code="scrollToCode">
                    <div style="display: flex; gap: 12px; margin-bottom: 12px">
                        <vort-input v-model="inputValue" placeholder="滚动距离" style="width: 200px" />
                        <vort-button @click="handleScrollTo">滚动到指定位置</vort-button>
                    </div>
                    <vort-scrollbar ref="scrollbarRef" height="200px" always style="width: 100%">
                        <p v-for="item in 20" :key="item" class="scrollbar-demo-item">
                            {{ item }}
                        </p>
                    </vort-scrollbar>
                </DemoBox>

                <DemoBox title="始终显示" description="通过 always 属性可以让滚动条始终显示，而不是悬停时才显示。" :code="alwaysCode">
                    <vort-scrollbar height="200px" always style="width: 100%">
                        <p v-for="item in 20" :key="item" class="scrollbar-demo-item">
                            {{ item }}
                        </p>
                    </vort-scrollbar>
                </DemoBox>

                <DemoBox title="原生滚动条" description="通过 native 属性可以使用浏览器原生滚动条样式。" :code="nativeCode">
                    <vort-scrollbar height="200px" native style="width: 100%">
                        <p v-for="item in 20" :key="item" class="scrollbar-demo-item">
                            {{ item }}
                        </p>
                    </vort-scrollbar>
                </DemoBox>
            </div>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">API</h2>

            <h3 class="demo-api-title">Scrollbar Props</h3>
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

            <h3 class="demo-api-title">Scrollbar Events</h3>
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

            <h3 class="demo-api-title">Scrollbar Slots</h3>
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

            <h3 class="demo-api-title">Scrollbar Exposes</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>方法名</th>
                        <th>说明</th>
                        <th>类型</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in exposesData" :key="item.name">
                        <td>
                            <code>{{ item.name }}</code>
                        </td>
                        <td>{{ item.desc }}</td>
                        <td>
                            <code>{{ item.type }}</code>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>

<style scoped>
/* Demo 内容样式 */
.scrollbar-demo-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--vort-primary-bg);
    color: var(--vort-primary);
}

.scrollbar-demo-horizontal {
    display: flex;
}

.scrollbar-demo-item-h {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 100px;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--vort-primary-bg);
    color: var(--vort-primary);
}
</style>
