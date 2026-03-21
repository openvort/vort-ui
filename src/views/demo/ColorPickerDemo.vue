<script setup lang="ts">
import { ref } from "vue";
import DemoBox from "./components/DemoBox.vue";

// 颜色值
const color1 = ref("#1677ff");
const color2 = ref("#1677ff");
const color3 = ref("rgba(22, 119, 255, 0.5)");
const color4 = ref("#1677ff");
const color5 = ref("#1677ff");

// 示例代码
const basicCode = `<script setup>
import { ref } from "vue";
const color = ref("#1677ff");
<\/script>

<template>
  <vort-color-picker v-model="color" />
  <vort-color-picker v-model="color" show-text />
</template>`;

const sizeCode = `<template>
  <vort-color-picker v-model="color" size="large" show-text />
  <vort-color-picker v-model="color" size="middle" show-text />
  <vort-color-picker v-model="color" size="small" />
</template>`;

const alphaCode = `<script setup>
import { ref } from "vue";
const color = ref("rgba(22, 119, 255, 0.5)");
<\/script>

<template>
  <vort-color-picker v-model="color" show-text />
  <vort-color-picker v-model="color" disabled-alpha show-text />
</template>`;

const formatCode = `<script setup>
import { ref } from "vue";
const hexColor = ref("#1677ff");
const rgbColor = ref("rgb(22, 119, 255)");
const hslColor = ref("hsl(215, 100%, 54%)");
<\/script>

<template>
  <vort-color-picker v-model="hexColor" format="hex" show-text />
  <vort-color-picker v-model="rgbColor" format="rgb" show-text />
  <vort-color-picker v-model="hslColor" format="hsl" show-text />
  <vort-color-picker v-model="hsbColor" format="hsb" show-text />
</template>`;

const presetsCode = `<script setup>
import { ref } from "vue";
const color = ref("#1677ff");

const presets = [
  {
    label: "推荐",
    colors: [
      "#000000",
      "#000000E0",
      "#000000A6",
      "#00000073",
      "#00000040",
      "#00000026",
      "#0000001A",
      "#00000012",
      "#0000000A",
      "#00000005",
      "#F5222D",
      "#FA8C16",
      "#FADB14",
      "#8BBB11",
      "#52C41A",
      "#13A8A8",
      "#1677FF",
      "#2F54EB",
      "#722ED1",
      "#EB2F96"
    ]
  }
];
<\/script>

<template>
  <vort-color-picker v-model="color" :presets="presets" />
</template>`;

const clearCode = `<template>
  <vort-color-picker v-model="color" allow-clear show-text />
</template>`;

const disabledCode = `<template>
  <vort-color-picker v-model="color" disabled show-text />
</template>`;

const triggerCode = `<template>
  <vort-color-picker v-model="color" trigger="click" />
  <vort-color-picker v-model="color" trigger="hover" />
</template>`;

// 预设颜色 - 参考 Ant Design
const presets = [
    {
        label: "推荐",
        colors: [
            "#000000",
            "#000000E0",
            "#000000A6",
            "#00000073",
            "#00000040",
            "#00000026",
            "#0000001A",
            "#00000012",
            "#0000000A",
            "#00000005",
            "#F5222D",
            "#FA8C16",
            "#FADB14",
            "#8BBB11",
            "#52C41A",
            "#13A8A8",
            "#1677FF",
            "#2F54EB",
            "#722ED1",
            "#EB2F96"
        ]
    }
];
</script>

<template>
    <div class="demo-page">
        <header class="demo-page-header">
            <h1 class="demo-page-title">ColorPicker 颜色选择器</h1>
            <p class="demo-page-desc">提供颜色选择器，支持多种颜色格式，可以选择颜色和透明度。参考 Ant Design 5.x 设计。</p>
        </header>

        <section class="demo-page-section">
            <h2 class="demo-section-title">何时使用</h2>
            <p class="demo-section-desc">当用户需要自定义颜色选择的时候使用。</p>
            <ul class="demo-section-list">
                <li>支持多种颜色格式：HEX、RGB、HSL、HSB。</li>
                <li>支持透明度调节。</li>
                <li>提供预设颜色，方便快速选择常用颜色。</li>
            </ul>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <!-- 基础用法 -->
                <DemoBox title="基础用法" description="最简单的用法，点击色块打开颜色选择器。支持显示颜色值文本。" :code="basicCode">
                    <vort-color-picker v-model="color1" />
                    <vort-color-picker v-model="color1" show-text />
                </DemoBox>

                <!-- 尺寸 -->
                <DemoBox title="触发器尺寸" description="通过 size 属性设置触发器的尺寸，支持 large、middle、small 三种尺寸。" :code="sizeCode">
                    <vort-color-picker v-model="color1" size="large" show-text />
                    <vort-color-picker v-model="color1" size="middle" show-text />
                    <vort-color-picker v-model="color1" size="small" />
                </DemoBox>

                <!-- 透明度 -->
                <DemoBox title="透明度" description="默认支持透明度调节，可以通过 disabled-alpha 关闭。" :code="alphaCode">
                    <vort-color-picker v-model="color3" show-text />
                    <vort-color-picker v-model="color1" disabled-alpha show-text />
                </DemoBox>

                <!-- 颜色格式 -->
                <DemoBox title="颜色格式" description="支持 hex、rgb、hsl、hsb 四种颜色格式，通过 format 属性设置。" :code="formatCode">
                    <div class="format-demo">
                        <div class="format-row">
                            <span class="format-label">HEX</span>
                            <vort-color-picker v-model="color1" format="hex" show-text />
                        </div>
                        <div class="format-row">
                            <span class="format-label">RGB</span>
                            <vort-color-picker v-model="color2" format="rgb" show-text />
                        </div>
                        <div class="format-row">
                            <span class="format-label">HSL</span>
                            <vort-color-picker v-model="color1" format="hsl" show-text />
                        </div>
                        <div class="format-row">
                            <span class="format-label">HSB</span>
                            <vort-color-picker v-model="color1" format="hsb" show-text />
                        </div>
                    </div>
                </DemoBox>

                <!-- 预设颜色 -->
                <DemoBox title="预设颜色" description="提供预设颜色，方便快速选择常用颜色。" :code="presetsCode">
                    <vort-color-picker v-model="color4" :presets="presets" show-text />
                </DemoBox>

                <!-- 清除 -->
                <DemoBox title="清除颜色" description="通过 allow-clear 属性支持清除颜色。" :code="clearCode">
                    <vort-color-picker v-model="color5" allow-clear show-text />
                </DemoBox>

                <!-- 禁用 -->
                <DemoBox title="禁用状态" description="通过 disabled 属性禁用颜色选择器。" :code="disabledCode">
                    <vort-color-picker v-model="color1" disabled show-text />
                </DemoBox>

                <!-- 触发方式 -->
                <DemoBox title="触发方式" description="通过 trigger 属性设置触发方式，支持 click 和 hover。" :code="triggerCode">
                    <div class="trigger-demo">
                        <div class="trigger-item">
                            <span class="trigger-label">Click 触发</span>
                            <vort-color-picker v-model="color1" trigger="click" />
                        </div>
                        <div class="trigger-item">
                            <span class="trigger-label">Hover 触发</span>
                            <vort-color-picker v-model="color1" trigger="hover" />
                        </div>
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
                    <tr>
                        <td><code>v-model</code></td>
                        <td>颜色值</td>
                        <td><code>string</code></td>
                        <td><code>-</code></td>
                    </tr>
                    <tr>
                        <td><code>default-value</code></td>
                        <td>默认颜色</td>
                        <td><code>string</code></td>
                        <td><code>#1677ff</code></td>
                    </tr>
                    <tr>
                        <td><code>allow-clear</code></td>
                        <td>是否允许清除</td>
                        <td><code>boolean</code></td>
                        <td><code>false</code></td>
                    </tr>
                    <tr>
                        <td><code>format</code></td>
                        <td>颜色格式</td>
                        <td><code>'hex' | 'rgb' | 'hsl' | 'hsb'</code></td>
                        <td><code>hex</code></td>
                    </tr>
                    <tr>
                        <td><code>disabled</code></td>
                        <td>是否禁用</td>
                        <td><code>boolean</code></td>
                        <td><code>false</code></td>
                    </tr>
                    <tr>
                        <td><code>disabled-alpha</code></td>
                        <td>禁用透明度</td>
                        <td><code>boolean</code></td>
                        <td><code>false</code></td>
                    </tr>
                    <tr>
                        <td><code>presets</code></td>
                        <td>预设颜色</td>
                        <td><code>Array&lt;{ label?: string; colors: string[] }&gt;</code></td>
                        <td><code>-</code></td>
                    </tr>
                    <tr>
                        <td><code>size</code></td>
                        <td>触发器尺寸</td>
                        <td><code>'large' | 'middle' | 'small'</code></td>
                        <td><code>middle</code></td>
                    </tr>
                    <tr>
                        <td><code>show-text</code></td>
                        <td>显示颜色文本</td>
                        <td><code>boolean | ((color: string) => string)</code></td>
                        <td><code>false</code></td>
                    </tr>
                    <tr>
                        <td><code>trigger</code></td>
                        <td>触发方式</td>
                        <td><code>'click' | 'hover'</code></td>
                        <td><code>click</code></td>
                    </tr>
                    <tr>
                        <td><code>placement</code></td>
                        <td>浮层位置</td>
                        <td><code>'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight'</code></td>
                        <td><code>bottomLeft</code></td>
                    </tr>
                    <tr>
                        <td><code>get-popup-container</code></td>
                        <td>菜单渲染父节点。默认渲染到 body 上</td>
                        <td><code>() => HTMLElement</code></td>
                        <td><code>() => document.body</code></td>
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
                        <td><code>change</code></td>
                        <td>颜色改变时触发</td>
                        <td><code>(value: string, hex: string) => void</code></td>
                    </tr>
                    <tr>
                        <td><code>change-complete</code></td>
                        <td>颜色选择完成时触发</td>
                        <td><code>(value: string) => void</code></td>
                    </tr>
                    <tr>
                        <td><code>clear</code></td>
                        <td>清除颜色时触发</td>
                        <td><code>() => void</code></td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>

<style scoped>
/* ColorPicker Demo 特定样式 */

/* 颜色格式演示区域 */
.format-demo {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.format-row {
    display: flex;
    align-items: center;
    gap: 16px;
}

.format-label {
    width: 64px;
    font-size: 14px;
    color: var(--vort-text-secondary);
}

/* 触发方式演示区域 */
.trigger-demo {
    display: flex;
    align-items: center;
    gap: 32px;
}

.trigger-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.trigger-label {
    font-size: 14px;
    color: var(--vort-text-tertiary);
}
</style>
