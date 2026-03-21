<script setup lang="ts">
import DemoBox from "./components/DemoBox.vue";

// 示例代码
const basicCode = `<template>
  <vort-row>
    <vort-col :span="12">col-12</vort-col>
    <vort-col :span="12">col-12</vort-col>
  </vort-row>
  <vort-row>
    <vort-col :span="8">col-8</vort-col>
    <vort-col :span="8">col-8</vort-col>
    <vort-col :span="8">col-8</vort-col>
  </vort-row>
  <vort-row>
    <vort-col :span="6">col-6</vort-col>
    <vort-col :span="6">col-6</vort-col>
    <vort-col :span="6">col-6</vort-col>
    <vort-col :span="6">col-6</vort-col>
  </vort-row>
</template>`;

const gutterCode = `<template>
  <vort-row :gutter="16">
    <vort-col :span="6">
      <div>col-6</div>
    </vort-col>
    <vort-col :span="6">
      <div>col-6</div>
    </vort-col>
    <vort-col :span="6">
      <div>col-6</div>
    </vort-col>
    <vort-col :span="6">
      <div>col-6</div>
    </vort-col>
  </vort-row>
  <!-- 垂直间隔 -->
  <vort-row :gutter="[16, 24]">
    <vort-col :span="6">
      <div>col-6</div>
    </vort-col>
    <vort-col :span="6">
      <div>col-6</div>
    </vort-col>
    <vort-col :span="6">
      <div>col-6</div>
    </vort-col>
    <vort-col :span="6">
      <div>col-6</div>
    </vort-col>
    <vort-col :span="6">
      <div>col-6</div>
    </vort-col>
    <vort-col :span="6">
      <div>col-6</div>
    </vort-col>
    <vort-col :span="6">
      <div>col-6</div>
    </vort-col>
    <vort-col :span="6">
      <div>col-6</div>
    </vort-col>
  </vort-row>
</template>`;

const offsetCode = `<template>
  <vort-row>
    <vort-col :span="8">col-8</vort-col>
    <vort-col :span="8" :offset="8">col-8 offset-8</vort-col>
  </vort-row>
  <vort-row>
    <vort-col :span="6" :offset="6">col-6 offset-6</vort-col>
    <vort-col :span="6" :offset="6">col-6 offset-6</vort-col>
  </vort-row>
  <vort-row>
    <vort-col :span="12" :offset="6">col-12 offset-6</vort-col>
  </vort-row>
</template>`;

const alignCode = `<template>
  <!-- 水平排列 -->
  <vort-row justify="start">
    <vort-col :span="4">col-4</vort-col>
    <vort-col :span="4">col-4</vort-col>
    <vort-col :span="4">col-4</vort-col>
  </vort-row>
  <vort-row justify="center">
    <vort-col :span="4">col-4</vort-col>
    <vort-col :span="4">col-4</vort-col>
    <vort-col :span="4">col-4</vort-col>
  </vort-row>
  <vort-row justify="end">
    <vort-col :span="4">col-4</vort-col>
    <vort-col :span="4">col-4</vort-col>
    <vort-col :span="4">col-4</vort-col>
  </vort-row>
  <vort-row justify="space-between">
    <vort-col :span="4">col-4</vort-col>
    <vort-col :span="4">col-4</vort-col>
    <vort-col :span="4">col-4</vort-col>
  </vort-row>
  <vort-row justify="space-around">
    <vort-col :span="4">col-4</vort-col>
    <vort-col :span="4">col-4</vort-col>
    <vort-col :span="4">col-4</vort-col>
  </vort-row>
  <vort-row justify="space-evenly">
    <vort-col :span="4">col-4</vort-col>
    <vort-col :span="4">col-4</vort-col>
    <vort-col :span="4">col-4</vort-col>
  </vort-row>
</template>`;

const verticalAlignCode = `<template>
  <vort-row justify="center" align="top">
    <vort-col :span="4"><div style="height: 100px">col-4</div></vort-col>
    <vort-col :span="4"><div style="height: 50px">col-4</div></vort-col>
    <vort-col :span="4"><div style="height: 120px">col-4</div></vort-col>
  </vort-row>
  <vort-row justify="center" align="middle">
    <vort-col :span="4"><div style="height: 100px">col-4</div></vort-col>
    <vort-col :span="4"><div style="height: 50px">col-4</div></vort-col>
    <vort-col :span="4"><div style="height: 120px">col-4</div></vort-col>
  </vort-row>
  <vort-row justify="center" align="bottom">
    <vort-col :span="4"><div style="height: 100px">col-4</div></vort-col>
    <vort-col :span="4"><div style="height: 50px">col-4</div></vort-col>
    <vort-col :span="4"><div style="height: 120px">col-4</div></vort-col>
  </vort-row>
</template>`;

const flexCode = `<template>
  <vort-row>
    <vort-col :flex="2">2 / 5</vort-col>
    <vort-col :flex="3">3 / 5</vort-col>
  </vort-row>
  <vort-row>
    <vort-col flex="100px">100px</vort-col>
    <vort-col flex="auto">Fill Rest</vort-col>
  </vort-row>
  <vort-row>
    <vort-col flex="1 1 200px">1 1 200px</vort-col>
    <vort-col flex="0 1 300px">0 1 300px</vort-col>
  </vort-row>
</template>`;

const orderCode = `<template>
  <vort-row>
    <vort-col :span="6" :order="4">1 col-order-4</vort-col>
    <vort-col :span="6" :order="3">2 col-order-3</vort-col>
    <vort-col :span="6" :order="2">3 col-order-2</vort-col>
    <vort-col :span="6" :order="1">4 col-order-1</vort-col>
  </vort-row>
</template>`;

// Row Props 表格数据
const rowPropsData = [
    {
        prop: "gutter",
        desc: "栅格间隔，可以是数字或数组 [水平, 垂直]",
        type: "number | [number, number]",
        default: "0"
    },
    {
        prop: "justify",
        desc: "水平排列方式",
        type: "'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'",
        default: "'start'"
    },
    {
        prop: "align",
        desc: "垂直对齐方式",
        type: "'top' | 'middle' | 'bottom' | 'stretch'",
        default: "'top'"
    },
    {
        prop: "wrap",
        desc: "是否自动换行",
        type: "boolean",
        default: "true"
    }
];

// Col Props 表格数据
const colPropsData = [
    {
        prop: "span",
        desc: "栅格占位格数，0 时相当于 display: none",
        type: "number | string",
        default: "-"
    },
    {
        prop: "offset",
        desc: "栅格左侧的间隔格数",
        type: "number",
        default: "0"
    },
    {
        prop: "order",
        desc: "栅格顺序",
        type: "number",
        default: "0"
    },
    {
        prop: "pull",
        desc: "栅格向左移动格数",
        type: "number",
        default: "0"
    },
    {
        prop: "push",
        desc: "栅格向右移动格数",
        type: "number",
        default: "0"
    },
    {
        prop: "flex",
        desc: "flex 布局属性",
        type: "string | number",
        default: "-"
    },
    {
        prop: "xs",
        desc: "屏幕 < 576px 响应式栅格",
        type: "number | ColSize",
        default: "-"
    },
    {
        prop: "sm",
        desc: "屏幕 ≥ 576px 响应式栅格",
        type: "number | ColSize",
        default: "-"
    },
    {
        prop: "md",
        desc: "屏幕 ≥ 768px 响应式栅格",
        type: "number | ColSize",
        default: "-"
    },
    {
        prop: "lg",
        desc: "屏幕 ≥ 992px 响应式栅格",
        type: "number | ColSize",
        default: "-"
    },
    {
        prop: "xl",
        desc: "屏幕 ≥ 1200px 响应式栅格",
        type: "number | ColSize",
        default: "-"
    },
    {
        prop: "xxl",
        desc: "屏幕 ≥ 1600px 响应式栅格",
        type: "number | ColSize",
        default: "-"
    }
];
</script>

<template>
    <div class="demo-page">
        <header class="demo-page-header">
            <h1 class="demo-page-title">Grid 栅格</h1>
            <p class="demo-page-desc">24 栅格系统。</p>
        </header>

        <section class="demo-page-section">
            <h2 class="demo-section-title">设计理念</h2>
            <div class="demo-section-desc">
                <p>
                    在多数业务情况下，Ant Design 需要在设计区域内解决大量信息收纳的问题，因此在 12 栅格系统的基础上，我们将整个设计建议区域按照 24
                    等分的原则进行划分。
                </p>
                <p>
                    划分之后的信息区块我们称之为『盒子』。建议横向排列的盒子数量最多四个，最少一个。『盒子』在整个屏幕上占比见上图。设计部分基于盒子的单位定制盒子内部的排版规则，以保证视觉层面的舒适感。
                </p>
            </div>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <DemoBox
                    title="基础栅格"
                    description="从堆叠到水平排列。使用单一的一组 Row 和 Col 栅格组件，就可以创建一个基本的栅格系统，所有列（Col）必须放在 Row 内。"
                    :code="basicCode"
                >
                    <div class="grid-demo">
                        <vort-row>
                            <vort-col :span="12">
                                <div class="grid-col-content">col-12</div>
                            </vort-col>
                            <vort-col :span="12">
                                <div class="grid-col-content">col-12</div>
                            </vort-col>
                        </vort-row>
                        <vort-row>
                            <vort-col :span="8">
                                <div class="grid-col-content">col-8</div>
                            </vort-col>
                            <vort-col :span="8">
                                <div class="grid-col-content">col-8</div>
                            </vort-col>
                            <vort-col :span="8">
                                <div class="grid-col-content">col-8</div>
                            </vort-col>
                        </vort-row>
                        <vort-row>
                            <vort-col :span="6">
                                <div class="grid-col-content">col-6</div>
                            </vort-col>
                            <vort-col :span="6">
                                <div class="grid-col-content">col-6</div>
                            </vort-col>
                            <vort-col :span="6">
                                <div class="grid-col-content">col-6</div>
                            </vort-col>
                            <vort-col :span="6">
                                <div class="grid-col-content">col-6</div>
                            </vort-col>
                        </vort-row>
                    </div>
                </DemoBox>

                <DemoBox
                    title="区块间隔"
                    description="栅格常常需要和间隔进行配合，你可以使用 Row 的 gutter 属性。支持 [水平, 垂直] 数组形式设置间隔。"
                    :code="gutterCode"
                >
                    <div class="grid-demo">
                        <p class="demo-label">水平间隔</p>
                        <vort-row :gutter="16">
                            <vort-col :span="6">
                                <div class="grid-col-content">col-6</div>
                            </vort-col>
                            <vort-col :span="6">
                                <div class="grid-col-content">col-6</div>
                            </vort-col>
                            <vort-col :span="6">
                                <div class="grid-col-content">col-6</div>
                            </vort-col>
                            <vort-col :span="6">
                                <div class="grid-col-content">col-6</div>
                            </vort-col>
                        </vort-row>
                        <p class="demo-label">垂直间隔</p>
                        <vort-row :gutter="[16, 24]">
                            <vort-col :span="6">
                                <div class="grid-col-content">col-6</div>
                            </vort-col>
                            <vort-col :span="6">
                                <div class="grid-col-content">col-6</div>
                            </vort-col>
                            <vort-col :span="6">
                                <div class="grid-col-content">col-6</div>
                            </vort-col>
                            <vort-col :span="6">
                                <div class="grid-col-content">col-6</div>
                            </vort-col>
                            <vort-col :span="6">
                                <div class="grid-col-content">col-6</div>
                            </vort-col>
                            <vort-col :span="6">
                                <div class="grid-col-content">col-6</div>
                            </vort-col>
                            <vort-col :span="6">
                                <div class="grid-col-content">col-6</div>
                            </vort-col>
                            <vort-col :span="6">
                                <div class="grid-col-content">col-6</div>
                            </vort-col>
                        </vort-row>
                    </div>
                </DemoBox>

                <DemoBox title="左右偏移" description="使用 offset 可以将列向右侧偏移。" :code="offsetCode">
                    <div class="grid-demo">
                        <vort-row>
                            <vort-col :span="8">
                                <div class="grid-col-content">col-8</div>
                            </vort-col>
                            <vort-col :span="8" :offset="8">
                                <div class="grid-col-content">col-8 offset-8</div>
                            </vort-col>
                        </vort-row>
                        <vort-row>
                            <vort-col :span="6" :offset="6">
                                <div class="grid-col-content">col-6 offset-6</div>
                            </vort-col>
                            <vort-col :span="6" :offset="6">
                                <div class="grid-col-content">col-6 offset-6</div>
                            </vort-col>
                        </vort-row>
                        <vort-row>
                            <vort-col :span="12" :offset="6">
                                <div class="grid-col-content">col-12 offset-6</div>
                            </vort-col>
                        </vort-row>
                    </div>
                </DemoBox>

                <DemoBox
                    title="排列"
                    description="子元素根据不同的值 start、center、end、space-between、space-around、space-evenly，分别定义其在父节点里面的排版方式。"
                    :code="alignCode"
                >
                    <div class="grid-demo">
                        <p class="demo-label">start</p>
                        <vort-row justify="start" class="demo-row-bg">
                            <vort-col :span="4">
                                <div class="grid-col-content">col-4</div>
                            </vort-col>
                            <vort-col :span="4">
                                <div class="grid-col-content">col-4</div>
                            </vort-col>
                            <vort-col :span="4">
                                <div class="grid-col-content">col-4</div>
                            </vort-col>
                        </vort-row>
                        <p class="demo-label">center</p>
                        <vort-row justify="center" class="demo-row-bg">
                            <vort-col :span="4">
                                <div class="grid-col-content">col-4</div>
                            </vort-col>
                            <vort-col :span="4">
                                <div class="grid-col-content">col-4</div>
                            </vort-col>
                            <vort-col :span="4">
                                <div class="grid-col-content">col-4</div>
                            </vort-col>
                        </vort-row>
                        <p class="demo-label">end</p>
                        <vort-row justify="end" class="demo-row-bg">
                            <vort-col :span="4">
                                <div class="grid-col-content">col-4</div>
                            </vort-col>
                            <vort-col :span="4">
                                <div class="grid-col-content">col-4</div>
                            </vort-col>
                            <vort-col :span="4">
                                <div class="grid-col-content">col-4</div>
                            </vort-col>
                        </vort-row>
                        <p class="demo-label">space-between</p>
                        <vort-row justify="space-between" class="demo-row-bg">
                            <vort-col :span="4">
                                <div class="grid-col-content">col-4</div>
                            </vort-col>
                            <vort-col :span="4">
                                <div class="grid-col-content">col-4</div>
                            </vort-col>
                            <vort-col :span="4">
                                <div class="grid-col-content">col-4</div>
                            </vort-col>
                        </vort-row>
                        <p class="demo-label">space-around</p>
                        <vort-row justify="space-around" class="demo-row-bg">
                            <vort-col :span="4">
                                <div class="grid-col-content">col-4</div>
                            </vort-col>
                            <vort-col :span="4">
                                <div class="grid-col-content">col-4</div>
                            </vort-col>
                            <vort-col :span="4">
                                <div class="grid-col-content">col-4</div>
                            </vort-col>
                        </vort-row>
                        <p class="demo-label">space-evenly</p>
                        <vort-row justify="space-evenly" class="demo-row-bg">
                            <vort-col :span="4">
                                <div class="grid-col-content">col-4</div>
                            </vort-col>
                            <vort-col :span="4">
                                <div class="grid-col-content">col-4</div>
                            </vort-col>
                            <vort-col :span="4">
                                <div class="grid-col-content">col-4</div>
                            </vort-col>
                        </vort-row>
                    </div>
                </DemoBox>

                <DemoBox title="对齐" description="子元素垂直对齐。" :code="verticalAlignCode">
                    <div class="grid-demo">
                        <p class="demo-label">Align Top</p>
                        <vort-row justify="center" align="top" class="demo-row-bg">
                            <vort-col :span="4">
                                <div class="grid-col-content" style="height: 100px">col-4</div>
                            </vort-col>
                            <vort-col :span="4">
                                <div class="grid-col-content" style="height: 50px">col-4</div>
                            </vort-col>
                            <vort-col :span="4">
                                <div class="grid-col-content" style="height: 120px">col-4</div>
                            </vort-col>
                        </vort-row>
                        <p class="demo-label">Align Middle</p>
                        <vort-row justify="center" align="middle" class="demo-row-bg">
                            <vort-col :span="4">
                                <div class="grid-col-content" style="height: 100px">col-4</div>
                            </vort-col>
                            <vort-col :span="4">
                                <div class="grid-col-content" style="height: 50px">col-4</div>
                            </vort-col>
                            <vort-col :span="4">
                                <div class="grid-col-content" style="height: 120px">col-4</div>
                            </vort-col>
                        </vort-row>
                        <p class="demo-label">Align Bottom</p>
                        <vort-row justify="center" align="bottom" class="demo-row-bg">
                            <vort-col :span="4">
                                <div class="grid-col-content" style="height: 100px">col-4</div>
                            </vort-col>
                            <vort-col :span="4">
                                <div class="grid-col-content" style="height: 50px">col-4</div>
                            </vort-col>
                            <vort-col :span="4">
                                <div class="grid-col-content" style="height: 120px">col-4</div>
                            </vort-col>
                        </vort-row>
                    </div>
                </DemoBox>

                <DemoBox title="排序" description="通过 order 来改变元素的排序。" :code="orderCode">
                    <div class="grid-demo">
                        <vort-row>
                            <vort-col :span="6" :order="4">
                                <div class="grid-col-content">1 col-order-4</div>
                            </vort-col>
                            <vort-col :span="6" :order="3">
                                <div class="grid-col-content">2 col-order-3</div>
                            </vort-col>
                            <vort-col :span="6" :order="2">
                                <div class="grid-col-content">3 col-order-2</div>
                            </vort-col>
                            <vort-col :span="6" :order="1">
                                <div class="grid-col-content">4 col-order-1</div>
                            </vort-col>
                        </vort-row>
                    </div>
                </DemoBox>

                <DemoBox title="Flex 填充" description="Col 提供 flex 属性以支持填充。" :code="flexCode">
                    <div class="grid-demo">
                        <p class="demo-label">比例填充</p>
                        <vort-row>
                            <vort-col :flex="2">
                                <div class="grid-col-content">2 / 5</div>
                            </vort-col>
                            <vort-col :flex="3">
                                <div class="grid-col-content">3 / 5</div>
                            </vort-col>
                        </vort-row>
                        <p class="demo-label">固定宽度 + 自适应</p>
                        <vort-row>
                            <vort-col flex="100px">
                                <div class="grid-col-content">100px</div>
                            </vort-col>
                            <vort-col flex="auto">
                                <div class="grid-col-content">Fill Rest</div>
                            </vort-col>
                        </vort-row>
                        <p class="demo-label">原始 flex 属性</p>
                        <vort-row>
                            <vort-col flex="1 1 200px">
                                <div class="grid-col-content">1 1 200px</div>
                            </vort-col>
                            <vort-col flex="0 1 300px">
                                <div class="grid-col-content">0 1 300px</div>
                            </vort-col>
                        </vort-row>
                    </div>
                </DemoBox>
            </div>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">API</h2>

            <h3 class="demo-api-title">Row Props</h3>
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
                    <tr v-for="item in rowPropsData" :key="item.prop">
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

            <h3 class="demo-api-title">Col Props</h3>
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
                    <tr v-for="item in colPropsData" :key="item.prop">
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
        </section>
    </div>
</template>

<style scoped>
/* 特有样式 - 公共样式已在 demo.css 中定义 */

/* 设计理念描述段落样式 */
.demo-section-desc {
    margin: 0 0 24px;
    font-size: 14px;
    color: var(--vort-text-secondary);
    line-height: 1.8;
}

.demo-section-desc p {
    margin: 0 0 8px;
}

/* Grid Demo 样式 */
.grid-demo {
    width: 100%;
}

.grid-demo .vort-row {
    margin-bottom: 16px;
}

.grid-demo .vort-row:last-child {
    margin-bottom: 0;
}

.grid-col-content {
    background: var(--vort-primary);
    color: #fff;
    padding: 16px 0;
    text-align: center;
    border-radius: 0;
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.grid-demo .vort-col:nth-child(odd) .grid-col-content {
    background: var(--vort-primary);
}

.grid-demo .vort-col:nth-child(even) .grid-col-content {
    background: var(--vort-primary-hover);
}

.demo-row-bg {
    background: rgba(0, 0, 0, 0.04);
    padding: 8px 0;
    border-radius: 4px;
}

.demo-label {
    margin: 16px 0 8px;
    font-size: 13px;
    color: var(--vort-text-secondary);
}

.demo-label:first-child {
    margin-top: 0;
}
</style>
