<script setup lang="ts">
import DemoBox from "./components/DemoBox.vue";

// 示例代码
const basicCode = `<template>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  <vort-divider />
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
</template>`;

const textCode = `<template>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  <vort-divider>Text</vort-divider>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  <vort-divider orientation="left">Left Text</vort-divider>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  <vort-divider orientation="right">Right Text</vort-divider>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
</template>`;

const dashedCode = `<template>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  <vort-divider dashed />
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  <vort-divider dashed>Text</vort-divider>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
</template>`;

const verticalCode = `<template>
  Text
  <vort-divider type="vertical" />
  <a href="#">Link</a>
  <vort-divider type="vertical" />
  <a href="#">Link</a>
</template>`;

const plainCode = `<template>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  <vort-divider plain>Text</vort-divider>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  <vort-divider plain orientation="left">Left Text</vort-divider>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  <vort-divider plain orientation="right">Right Text</vort-divider>
</template>`;

const orientationMarginCode = `<template>
  <vort-divider orientation="left" :orientation-margin="0">
    Left Text with margin 0
  </vort-divider>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  <vort-divider orientation="left" orientation-margin="50px">
    Left Text with margin 50px
  </vort-divider>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
</template>`;

// Props 表格数据
const propsData = [
    {
        prop: "type",
        desc: "分割线方向",
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'"
    },
    {
        prop: "dashed",
        desc: "是否虚线",
        type: "boolean",
        default: "false"
    },
    {
        prop: "orientation",
        desc: "分割线标题的位置",
        type: "'left' | 'right' | 'center'",
        default: "'center'"
    },
    {
        prop: "orientationMargin",
        desc: "标题和最近 left/right 边框之间的距离，无默认值时 orientation 必须为 left 或 right",
        type: "string | number",
        default: "-"
    },
    {
        prop: "plain",
        desc: "文字是否显示为普通正文样式",
        type: "boolean",
        default: "false"
    }
];

// Slots 表格数据
const slotsData = [
    {
        name: "default",
        desc: "分割线标题内容（仅 horizontal 模式有效）"
    }
];
</script>

<template>
    <div class="demo-page">
        <header class="demo-page-header">
            <h1 class="demo-page-title">Divider 分割线</h1>
            <p class="demo-page-desc">区隔内容的分割线。</p>
        </header>

        <section class="demo-page-section">
            <h2 class="demo-section-title">何时使用</h2>
            <ul class="demo-section-list">
                <li>对不同章节的文本段落进行分割。</li>
                <li>对行内文字/链接进行分割，例如表格的操作列。</li>
            </ul>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <DemoBox title="水平分割线" description="默认为水平分割线，可在中间加入文字。" :code="basicCode">
                    <div class="demo-content">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne mereministi licere mihi ista probare, quae sunt a te dicta?
                            Refert tamen, quo modo.
                        </p>
                        <vort-divider />
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne mereministi licere mihi ista probare, quae sunt a te dicta?
                            Refert tamen, quo modo.
                        </p>
                    </div>
                </DemoBox>

                <DemoBox title="带文字的分割线" description="分割线中带有文字，可以用 orientation 指定文字位置。" :code="textCode">
                    <div class="demo-content">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne mereministi licere mihi ista probare, quae sunt a te dicta?
                            Refert tamen, quo modo.
                        </p>
                        <vort-divider>Text</vort-divider>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne mereministi licere mihi ista probare, quae sunt a te dicta?
                            Refert tamen, quo modo.
                        </p>
                        <vort-divider orientation="left">Left Text</vort-divider>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne mereministi licere mihi ista probare, quae sunt a te dicta?
                            Refert tamen, quo modo.
                        </p>
                        <vort-divider orientation="right">Right Text</vort-divider>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne mereministi licere mihi ista probare, quae sunt a te dicta?
                            Refert tamen, quo modo.
                        </p>
                    </div>
                </DemoBox>

                <DemoBox title="虚线" description="虚线分割线。" :code="dashedCode">
                    <div class="demo-content">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne mereministi licere mihi ista probare, quae sunt a te dicta?
                            Refert tamen, quo modo.
                        </p>
                        <vort-divider dashed />
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne mereministi licere mihi ista probare, quae sunt a te dicta?
                            Refert tamen, quo modo.
                        </p>
                        <vort-divider dashed>Text</vort-divider>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne mereministi licere mihi ista probare, quae sunt a te dicta?
                            Refert tamen, quo modo.
                        </p>
                    </div>
                </DemoBox>

                <DemoBox title="垂直分割线" description="使用 type='vertical' 设置为行内的垂直分割线。" :code="verticalCode">
                    <div class="demo-content">
                        Text
                        <vort-divider type="vertical" />
                        <a href="#" @click.prevent>Link</a>
                        <vort-divider type="vertical" />
                        <a href="#" @click.prevent>Link</a>
                    </div>
                </DemoBox>

                <DemoBox title="正文样式" description="使用 plain 可以设置为更轻量的分割文字样式。" :code="plainCode">
                    <div class="demo-content">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne mereministi licere mihi ista probare, quae sunt a te dicta?
                            Refert tamen, quo modo.
                        </p>
                        <vort-divider plain>Text</vort-divider>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne mereministi licere mihi ista probare, quae sunt a te dicta?
                            Refert tamen, quo modo.
                        </p>
                        <vort-divider plain orientation="left">Left Text</vort-divider>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne mereministi licere mihi ista probare, quae sunt a te dicta?
                            Refert tamen, quo modo.
                        </p>
                        <vort-divider plain orientation="right">Right Text</vort-divider>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne mereministi licere mihi ista probare, quae sunt a te dicta?
                            Refert tamen, quo modo.
                        </p>
                    </div>
                </DemoBox>

                <DemoBox title="自定义分割线边距" description="使用 orientationMargin 指定标题和边框的距离。" :code="orientationMarginCode">
                    <div class="demo-content">
                        <vort-divider orientation="left" :orientation-margin="0"> Left Text with margin 0 </vort-divider>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne mereministi licere mihi ista probare, quae sunt a te dicta?
                            Refert tamen, quo modo.
                        </p>
                        <vort-divider orientation="left" orientation-margin="50px"> Left Text with margin 50px </vort-divider>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne mereministi licere mihi ista probare, quae sunt a te dicta?
                            Refert tamen, quo modo.
                        </p>
                    </div>
                </DemoBox>
            </div>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">API</h2>

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

            <h3 class="demo-api-title">Slots</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>插槽名</th>
                        <th>说明</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in slotsData" :key="item.name">
                        <td>
                            <code>{{ item.name }}</code>
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

.demo-content {
    width: 100%;
}

.demo-content p {
    margin: 0;
    color: var(--vort-text);
    font-size: 14px;
    line-height: 1.6;
}

.demo-content a {
    color: var(--vort-primary);
    text-decoration: none;
}

.demo-content a:hover {
    color: var(--vort-primary-hover);
}
</style>
