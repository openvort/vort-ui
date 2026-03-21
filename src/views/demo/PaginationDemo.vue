<script setup lang="ts">
import { ref } from "vue";
import { Pagination } from "@/components/vort/pagination";
import DemoBox from "./components/DemoBox.vue";

// 基础示例
const current1 = ref(1);

// 更多页码
const current2 = ref(6);

// 改变每页条数
const current3 = ref(1);
const pageSize3 = ref(10);

// 快速跳转
const current4 = ref(1);
const pageSize4 = ref(10);

// 迷你版本
const current5 = ref(1);

// 简洁版本
const current6 = ref(3);

// 受控分页
const current7 = ref(1);
const pageSize7 = ref(20);

// 显示总数
const showTotal = (total: number, range: [number, number]) => {
    return `第 ${range[0]}-${range[1]} 条，共 ${total} 条`;
};

// 禁用状态
const current8 = ref(1);

// 完整功能
const current9 = ref(1);
const pageSize9 = ref(10);

// 代码示例
const basicCode = `<script setup lang="ts">
import { ref } from "vue";
const current = ref(1);
<\/script>

<template>
  <vort-pagination v-model:current="current" :total="50" />
</template>`;

const moreCode = `<vort-pagination v-model:current="current" :total="500" />`;

const sizeChangerCode = `<vort-pagination
  v-model:current="current"
  v-model:page-size="pageSize"
  :total="500"
  show-size-changer
  :page-size-options="[10, 20, 30, 40]"
/>`;

const quickJumperCode = `<vort-pagination
  v-model:current="current"
  v-model:page-size="pageSize"
  :total="500"
  show-size-changer
  show-quick-jumper
/>`;

const smallCode = `<!-- 迷你版本 -->
<vort-pagination v-model:current="current" :total="50" size="small" />

<!-- 迷你版本 + 功能组合 -->
<vort-pagination
  v-model:current="current"
  :total="500"
  size="small"
  show-size-changer
  show-quick-jumper
/>`;

const simpleCode = `<vort-pagination v-model:current="current" :total="50" simple />`;

const showTotalCode = `<script setup lang="ts">
import { ref } from "vue";
const current = ref(1);
const pageSize = ref(20);

const showTotal = (total: number, range: [number, number]) => {
  return \`第 \${range[0]}-\${range[1]} 条，共 \${total} 条\`;
};
<\/script>

<template>
  <!-- 简单展示 -->
  <vort-pagination
    v-model:current="current"
    v-model:page-size="pageSize"
    :total="85"
    :show-total="(total) => \`共 \${total} 条\`"
  />

  <!-- 带范围展示 -->
  <vort-pagination
    v-model:current="current"
    v-model:page-size="pageSize"
    :total="85"
    :show-total="showTotal"
  />
</template>`;

const disabledCode = `<!-- 禁用状态 -->
<vort-pagination v-model:current="current" :total="50" disabled />

<!-- 禁用 + 功能组合 -->
<vort-pagination
  v-model:current="current"
  :total="500"
  disabled
  show-size-changer
  show-quick-jumper
/>`;

const fullCode = `<vort-pagination
  v-model:current="current"
  v-model:page-size="pageSize"
  :total="500"
  :show-total="showTotal"
  show-size-changer
  show-quick-jumper
  :page-size-options="[10, 20, 50, 100]"
/>`;
</script>

<template>
    <div class="p-6 space-y-6">
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Pagination 分页</h1>
            <p class="text-gray-600">采用分页的形式分隔长列表，每次只加载一个页面。</p>
        </div>

        <!-- 何时使用 -->
        <section class="demo-page-section">
            <h2 class="demo-section-title">何时使用</h2>
            <ul class="demo-list">
                <li>当加载/渲染所有数据将花费很多时间时；</li>
                <li>可切换页码浏览数据。</li>
            </ul>
        </section>

        <div class="demo-grid">
            <!-- 基础用法 -->
            <DemoBox title="基础用法" description="基础分页。" :code="basicCode">
                <div class="w-full">
                    <Pagination v-model:current="current1" :total="50" />
                    <div class="demo-info">当前页：{{ current1 }}</div>
                </div>
            </DemoBox>

            <!-- 更多页码 -->
            <DemoBox title="更多页码" description="当数据量较多时，会自动显示省略号。" :code="moreCode">
                <div class="w-full">
                    <Pagination v-model:current="current2" :total="500" />
                    <div class="demo-info">当前页：{{ current2 }}</div>
                </div>
            </DemoBox>

            <!-- 改变每页条数 -->
            <DemoBox title="改变每页条数" description="改变每页显示条目数。" :code="sizeChangerCode">
                <div class="w-full">
                    <Pagination v-model:current="current3" v-model:page-size="pageSize3" :total="500" show-size-changer :page-size-options="[10, 20, 30, 40]" />
                    <div class="demo-info">当前页：{{ current3 }}，每页条数：{{ pageSize3 }}</div>
                </div>
            </DemoBox>

            <!-- 快速跳转 -->
            <DemoBox title="快速跳转" description="快速跳转到某一页。" :code="quickJumperCode">
                <div class="w-full">
                    <Pagination v-model:current="current4" v-model:page-size="pageSize4" :total="500" show-size-changer show-quick-jumper />
                    <div class="demo-info">当前页：{{ current4 }}</div>
                </div>
            </DemoBox>

            <!-- 迷你版本 -->
            <DemoBox title="迷你版本" description="迷你版本，适合在空间有限的情况下使用。" :code="smallCode">
                <div class="w-full space-y-4">
                    <Pagination v-model:current="current5" :total="50" size="small" />
                    <Pagination v-model:current="current5" :total="500" size="small" show-size-changer show-quick-jumper />
                </div>
            </DemoBox>

            <!-- 简洁模式 -->
            <DemoBox title="简洁模式" description="简单的翻页。" :code="simpleCode">
                <div class="w-full">
                    <Pagination v-model:current="current6" :total="50" simple />
                    <div class="demo-info">当前页：{{ current6 }}</div>
                </div>
            </DemoBox>

            <!-- 显示总数 -->
            <DemoBox title="显示总数" description="通过设置 showTotal 展示总共有多少数据。" :code="showTotalCode">
                <div class="w-full space-y-4">
                    <Pagination v-model:current="current7" v-model:page-size="pageSize7" :total="85" :show-total="(total) => `共 ${total} 条`" />
                    <Pagination v-model:current="current7" v-model:page-size="pageSize7" :total="85" :show-total="showTotal" />
                </div>
            </DemoBox>

            <!-- 禁用状态 -->
            <DemoBox title="禁用状态" description="禁用分页。" :code="disabledCode">
                <div class="w-full space-y-4">
                    <Pagination v-model:current="current8" :total="50" disabled />
                    <Pagination v-model:current="current8" :total="500" disabled show-size-changer show-quick-jumper />
                </div>
            </DemoBox>

            <!-- 完整功能 -->
            <DemoBox title="完整功能" description="展示所有配置选项的组合效果。" :code="fullCode">
                <div class="w-full">
                    <Pagination
                        v-model:current="current9"
                        v-model:page-size="pageSize9"
                        :total="500"
                        :show-total="showTotal"
                        show-size-changer
                        show-quick-jumper
                        :page-size-options="[10, 20, 50, 100]"
                    />
                    <div class="demo-info">当前页：{{ current9 }}，每页条数：{{ pageSize9 }}，总数：500，总页数：{{ Math.ceil(500 / pageSize9) }}</div>
                </div>
            </DemoBox>
        </div>

        <!-- API 文档 -->
        <section class="demo-page-section">
            <h2 class="demo-section-title">API</h2>

            <h3 class="demo-api-title">Props</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>参数</th>
                        <th>说明</th>
                        <th>类型</th>
                        <th>默认值</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>current (v-model)</td>
                        <td>当前页数</td>
                        <td><code>number</code></td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>pageSize (v-model)</td>
                        <td>每页条数</td>
                        <td><code>number</code></td>
                        <td>10</td>
                    </tr>
                    <tr>
                        <td>total</td>
                        <td>数据总数</td>
                        <td><code>number</code></td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>disabled</td>
                        <td>禁用分页</td>
                        <td><code>boolean</code></td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>hideOnSinglePage</td>
                        <td>只有一页时是否隐藏分页器</td>
                        <td><code>boolean</code></td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>showTotal</td>
                        <td>用于显示数据总量和当前数据顺序</td>
                        <td><code>(total, range) => string</code></td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>showSizeChanger</td>
                        <td>是否展示 pageSize 切换器</td>
                        <td><code>boolean</code></td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>pageSizeOptions</td>
                        <td>指定每页可以显示多少条</td>
                        <td><code>number[]</code></td>
                        <td>[10, 20, 50, 100]</td>
                    </tr>
                    <tr>
                        <td>showQuickJumper</td>
                        <td>是否可以快速跳转至某页</td>
                        <td><code>boolean</code></td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>showLessItems</td>
                        <td>是否显示较少的页码按钮</td>
                        <td><code>boolean</code></td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>simple</td>
                        <td>简洁模式</td>
                        <td><code>boolean</code></td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>size</td>
                        <td>尺寸</td>
                        <td><code>'default' | 'small'</code></td>
                        <td>'default'</td>
                    </tr>
                </tbody>
            </table>

            <h3 class="demo-api-title">Events</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>事件名称</th>
                        <th>说明</th>
                        <th>回调参数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>change</td>
                        <td>页码或 pageSize 改变的回调</td>
                        <td><code>(page: number, pageSize: number) => void</code></td>
                    </tr>
                    <tr>
                        <td>showSizeChange</td>
                        <td>pageSize 变化的回调</td>
                        <td><code>(current: number, size: number) => void</code></td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>

<style scoped>
.demo-info {
    margin-top: 12px;
    padding: 8px 12px;
    background: var(--vort-bg-secondary, #f5f5f5);
    border-radius: 4px;
    font-size: 13px;
    color: var(--vort-text-secondary);
}

.space-y-4 > * + * {
    margin-top: 16px;
}
</style>

<!-- 公共样式已在 demo.css 中定义 -->
