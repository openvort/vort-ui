<script setup lang="ts">
import { ref } from "vue";
import DemoBox from "./components/DemoBox.vue";
import { Search, Download, Plus, Trash2, PowerOff } from "lucide-vue-next";

// 加载状态
const loading1 = ref(false);
const loading2 = ref(false);

const enterLoading1 = () => {
    loading1.value = true;
    setTimeout(() => {
        loading1.value = false;
    }, 3000);
};

const enterLoading2 = () => {
    loading2.value = true;
    setTimeout(() => {
        loading2.value = false;
    }, 3000);
};

// 示例代码
const variantCode = `<template>
  <vort-button variant="primary">Primary Button</vort-button>
  <vort-button>Default Button</vort-button>
  <vort-button variant="dashed">Dashed Button</vort-button>
  <vort-button variant="plain">Plain Button</vort-button>
  <vort-button variant="soft">Soft Button</vort-button>
  <vort-button variant="text">Text Button</vort-button>
  <vort-button variant="link">Link Button</vort-button>
</template>`;

const sizeCode = `<template>
  <vort-button variant="primary" size="large">Large</vort-button>
  <vort-button variant="primary">Middle</vort-button>
  <vort-button variant="primary" size="small">Small</vort-button>
</template>`;

const iconCode = `<template>
  <vort-button variant="primary" shape="circle" icon>
    <Search class="w-4 h-4" />
  </vort-button>
  <vort-button variant="primary">
    <Search class="w-4 h-4" />
    Search
  </vort-button>
  <vort-button shape="circle" icon>
    <Search class="w-4 h-4" />
  </vort-button>
  <vort-button>
    <Search class="w-4 h-4" />
    Search
  </vort-button>
</template>`;

const loadingCode = `<script setup>
const loading = ref(false);

const enterLoading = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 3000);
};
<\/script>

<template>
  <vort-button variant="primary" loading>Loading</vort-button>
  <vort-button variant="primary" :loading="loading" @click="enterLoading">
    Click me!
  </vort-button>
</template>`;

const dangerCode = `<template>
  <vort-button variant="primary" danger>Primary</vort-button>
  <vort-button danger>Default</vort-button>
  <vort-button variant="dashed" danger>Dashed</vort-button>
  <vort-button variant="plain" danger>Plain</vort-button>
  <vort-button variant="soft" danger>Soft</vort-button>
  <vort-button variant="text" danger>Text</vort-button>
  <vort-button variant="link" danger>Link</vort-button>
</template>`;

const ghostCode = `<template>
  <div class="p-4 bg-gray-500 flex gap-2">
    <vort-button variant="primary" ghost>Primary</vort-button>
    <vort-button ghost>Default</vort-button>
    <vort-button variant="dashed" ghost>Dashed</vort-button>
    <vort-button variant="primary" danger ghost>Danger</vort-button>
  </div>
</template>`;

const shapeCode = `<template>
  <vort-button variant="primary" shape="default">Default</vort-button>
  <vort-button variant="primary" shape="round">Round</vort-button>
  <vort-button variant="primary" shape="circle" icon>
    <Search class="w-4 h-4" />
  </vort-button>
</template>`;

const blockCode = `<template>
  <vort-button variant="primary" block>Primary</vort-button>
  <vort-button block>Default</vort-button>
  <vort-button variant="dashed" block>Dashed</vort-button>
</template>`;

const disabledCode = `<template>
  <vort-button variant="primary" disabled>Primary</vort-button>
  <vort-button disabled>Default</vort-button>
  <vort-button variant="dashed" disabled>Dashed</vort-button>
  <vort-button variant="plain" disabled>Plain</vort-button>
  <vort-button variant="soft" disabled>Soft</vort-button>
  <vort-button variant="text" disabled>Text</vort-button>
  <vort-button variant="link" disabled>Link</vort-button>
</template>`;

// Props 表格数据
const propsData = [
    {
        prop: "variant",
        desc: "设置按钮变体（样式类型）",
        type: "'primary' | 'default' | 'dashed' | 'plain' | 'soft' | 'text' | 'link'",
        default: "'default'"
    },
    {
        prop: "size",
        desc: "设置按钮大小",
        type: "'large' | 'middle' | 'small'",
        default: "'middle'"
    },
    {
        prop: "shape",
        desc: "设置按钮形状",
        type: "'default' | 'round' | 'circle'",
        default: "'default'"
    },
    {
        prop: "danger",
        desc: "设置危险按钮",
        type: "boolean",
        default: "false"
    },
    {
        prop: "disabled",
        desc: "设置按钮失效状态",
        type: "boolean",
        default: "false"
    },
    {
        prop: "loading",
        desc: "设置按钮载入状态",
        type: "boolean",
        default: "false"
    },
    {
        prop: "ghost",
        desc: "幽灵属性，使按钮背景透明",
        type: "boolean",
        default: "false"
    },
    {
        prop: "block",
        desc: "将按钮宽度调整为其父宽度",
        type: "boolean",
        default: "false"
    },
    {
        prop: "icon",
        desc: "设置为图标按钮（仅显示图标）",
        type: "boolean",
        default: "false"
    },
    {
        prop: "htmlType",
        desc: "设置 button 原生的 type 值",
        type: "'button' | 'submit' | 'reset'",
        default: "'button'"
    }
];
</script>

<template>
    <div class="demo-page">
        <header class="demo-page-header">
            <h1 class="demo-page-title">Button 按钮</h1>
            <p class="demo-page-desc">按钮用于开始一个即时操作。</p>
        </header>

        <section class="demo-page-section">
            <h2 class="demo-section-title">何时使用</h2>
            <p class="demo-section-desc">标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。</p>
            <p class="demo-section-desc">在 Vort 中我们提供了七种按钮。</p>
            <ul class="demo-section-list">
                <li>主按钮：用于主行动点，一个操作区域只能有一个主按钮。</li>
                <li>默认按钮：用于没有主次之分的一组行动点。</li>
                <li>虚线按钮：常用于添加操作。</li>
                <li>朴素按钮：淡色背景的按钮，hover 时变为主色填充。</li>
                <li>柔和按钮：固定灰色背景 + 主题色文字，适用于轻量级操作。</li>
                <li>文本按钮：用于最次级的行动点。</li>
                <li>链接按钮：一般用于链接，即导航至某位置。</li>
            </ul>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <DemoBox
                    title="按钮变体"
                    description="按钮有七种变体：主按钮、默认按钮、虚线按钮、朴素按钮、柔和按钮、文本按钮和链接按钮。"
                    :code="variantCode"
                >
                    <vort-button variant="primary">Primary Button</vort-button>
                    <vort-button>Default Button</vort-button>
                    <vort-button variant="dashed">Dashed Button</vort-button>
                    <vort-button variant="plain">Plain Button</vort-button>
                    <vort-button variant="soft">Soft Button</vort-button>
                    <vort-button variant="text">Text Button</vort-button>
                    <vort-button variant="link">Link Button</vort-button>
                </DemoBox>

                <DemoBox
                    title="按钮尺寸"
                    description="按钮有大、中、小三种尺寸。通过设置 size 为 large、small 分别把按钮设为大、小尺寸。若不设置 size，则尺寸为中。"
                    :code="sizeCode"
                >
                    <vort-button variant="primary" size="large">Large</vort-button>
                    <vort-button variant="primary">Middle</vort-button>
                    <vort-button variant="primary" size="small">Small</vort-button>
                </DemoBox>

                <DemoBox title="图标按钮" description="当需要在 Button 内嵌入图标时，可以配合 lucide-vue-next 图标库使用。" :code="iconCode">
                    <vort-button variant="primary" shape="circle" icon>
                        <Search class="w-4 h-4" />
                    </vort-button>
                    <vort-button variant="primary">
                        <Search class="w-4 h-4" />
                        Search
                    </vort-button>
                    <vort-button shape="circle" icon>
                        <Search class="w-4 h-4" />
                    </vort-button>
                    <vort-button>
                        <Search class="w-4 h-4" />
                        Search
                    </vort-button>
                    <vort-button variant="dashed" shape="circle" icon>
                        <Search class="w-4 h-4" />
                    </vort-button>
                    <vort-button variant="dashed">
                        <Download class="w-4 h-4" />
                        Download
                    </vort-button>
                </DemoBox>

                <DemoBox title="加载中状态" description="添加 loading 属性即可让按钮处于加载状态，最后两个按钮演示点击后进入加载状态。" :code="loadingCode">
                    <vort-button variant="primary" loading>Loading</vort-button>
                    <vort-button variant="primary" size="small" loading>Loading</vort-button>
                    <vort-button variant="primary" :loading="loading1" @click="enterLoading1"> Click me! </vort-button>
                    <vort-button :loading="loading2" @click="enterLoading2"> Click me! </vort-button>
                </DemoBox>

                <DemoBox title="危险按钮" description="在危险的情况下使用，例如删除操作。" :code="dangerCode">
                    <vort-button variant="primary" danger>Primary</vort-button>
                    <vort-button danger>Default</vort-button>
                    <vort-button variant="dashed" danger>Dashed</vort-button>
                    <vort-button variant="plain" danger>Plain</vort-button>
                    <vort-button variant="soft" danger>Soft</vort-button>
                    <vort-button variant="text" danger>Text</vort-button>
                    <vort-button variant="link" danger>Link</vort-button>
                </DemoBox>

                <DemoBox title="幽灵按钮" description="幽灵按钮将按钮的内容反色，背景变为透明，常用在有色背景上。" :code="ghostCode">
                    <div class="p-6 bg-[#bec8c8] rounded-lg flex flex-wrap gap-3">
                        <vort-button variant="primary" ghost>Primary</vort-button>
                        <vort-button ghost>Default</vort-button>
                        <vort-button variant="dashed" ghost>Dashed</vort-button>
                        <vort-button variant="primary" danger ghost>Danger</vort-button>
                    </div>
                </DemoBox>

                <DemoBox title="按钮形状" description="按钮有三种形状：默认、圆形、圆角矩形。" :code="shapeCode">
                    <vort-button variant="primary" shape="default">Default</vort-button>
                    <vort-button variant="primary" shape="round">Round</vort-button>
                    <vort-button variant="primary" shape="circle" icon>
                        <Search class="w-4 h-4" />
                    </vort-button>
                </DemoBox>

                <DemoBox title="Block 按钮" description="block 属性将使按钮适合其父宽度。" :code="blockCode">
                    <div class="w-full flex flex-col gap-3">
                        <vort-button variant="primary" block>Primary</vort-button>
                        <vort-button block>Default</vort-button>
                        <vort-button variant="dashed" block>Dashed</vort-button>
                    </div>
                </DemoBox>

                <DemoBox title="禁用状态" description="添加 disabled 属性即可让按钮处于不可用状态，同时按钮样式也会改变。" :code="disabledCode">
                    <vort-button variant="primary" disabled>Primary</vort-button>
                    <vort-button disabled>Default</vort-button>
                    <vort-button variant="dashed" disabled>Dashed</vort-button>
                    <vort-button variant="plain" disabled>Plain</vort-button>
                    <vort-button variant="soft" disabled>Soft</vort-button>
                    <vort-button variant="text" disabled>Text</vort-button>
                    <vort-button variant="link" disabled>Link</vort-button>
                </DemoBox>
            </div>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">API</h2>

            <p class="demo-section-desc">通过设置 Button 的属性来产生不同的按钮样式，推荐顺序为：variant -> shape -> size -> loading -> disabled。</p>

            <h3 class="demo-api-title">Props</h3>
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
                    <tr>
                        <td><code>click</code></td>
                        <td>点击按钮时触发</td>
                        <td><code>(event: MouseEvent) => void</code></td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>

<!-- 公共样式已在 demo.css 中定义 -->
