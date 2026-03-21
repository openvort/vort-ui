<script setup lang="ts">
import { ref } from "vue";
import DemoBox from "./components/DemoBox.vue";

// 基础抽屉
const open1 = ref(false);

// 自定义宽度
const open2 = ref(false);

// 四个方向
const openTop = ref(false);
const openRight = ref(false);
const openBottom = ref(false);
const openLeft = ref(false);

// 嵌套抽屉（重点：展示动画效果）
const openNested1 = ref(false);
const openNested2 = ref(false);

// 多层嵌套（测试多层偏移动画）
const openMulti1 = ref(false);
const openMulti2 = ref(false);
const openMulti3 = ref(false);

// 无遮罩
const openNoMask = ref(false);

// 额外操作
const openExtra = ref(false);

// 代码示例（使用转义避免 Vue Inspector 解析问题）
const basicCode = `<vort-button variant="primary" @click="open = true">
  打开抽屉
</vort-button>

<vort-drawer v-model:open="open" title="基础抽屉" content-bg="#fff">
  <p>抽屉内容...</p>
</vort-drawer>`;

const widthCode = `<vort-drawer
  v-model:open="open"
  title="大抽屉"
  :width="720"
  content-bg="#fff"
>
  <p>更宽的抽屉内容...</p>
</vort-drawer>`;

const placementCode = `<!-- 支持四个方向 -->
<vort-drawer placement="top" :height="256" content-bg="#fff" />
<vort-drawer placement="right" content-bg="#fff" />  <!-- 默认 -->
<vort-drawer placement="bottom" :height="256" content-bg="#fff" />
<vort-drawer placement="left" content-bg="#fff" />`;

const nestedCode = `<!-- 嵌套抽屉，打开新抽屉时前一个会自动偏移 -->
<vort-drawer v-model:open="open1" title="第一层" content-bg="#fff">
  <vort-button @click="open2 = true">
    打开第二层
  </vort-button>

  <vort-drawer v-model:open="open2" title="第二层" content-bg="#fff">
    <p>第一层会自动向外偏移 180px</p>
  </vort-drawer>
</vort-drawer>`;

const noMaskCode = `<vort-drawer
  v-model:open="open"
  title="无遮罩"
  :mask="false"
  content-bg="#fff"
>
  <p>没有遮罩层</p>
</vort-drawer>`;

const extraCode = `<vort-drawer v-model:open="open" title="表单" footer content-bg="#fff">
  <!-- 表单内容 -->
  <template #footer>
    <vort-button @click="open = false">取消</vort-button>
    <vort-button variant="primary">提交</vort-button>
  </template>
</vort-drawer>`;
</script>

<template>
    <div class="p-6 space-y-6">
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Drawer 抽屉</h1>
            <p class="text-gray-600">屏幕边缘滑出的浮层面板。</p>
        </div>

        <div class="demo-grid">
            <!-- 基础用法 -->
            <DemoBox title="基础用法" description="基础的抽屉，从右侧滑出。" :code="basicCode">
                <vort-button variant="primary" @click="open1 = true">打开抽屉</vort-button>
                <vort-drawer v-model:open="open1" title="基础抽屉" content-bg="#fff">
                    <p>这是一个基础的抽屉示例。</p>
                    <p class="mt-4">抽屉内容可以是任意的 HTML 或组件。</p>
                </vort-drawer>
            </DemoBox>

            <!-- 自定义宽度 -->
            <DemoBox title="自定义宽度" description="通过 width 属性自定义抽屉宽度，默认 378px。" :code="widthCode">
                <vort-button @click="open2 = true">打开大抽屉（720px）</vort-button>
                <vort-drawer v-model:open="open2" title="大抽屉" :width="720" content-bg="#fff">
                    <p>通过 <code>width</code> 属性可以设置抽屉的宽度。</p>
                    <p class="mt-4">支持数字（单位 px）或字符串（如 "50%"）。</p>
                </vort-drawer>
            </DemoBox>

            <!-- 四个方向 -->
            <DemoBox title="四个方向" description="支持 top、right、bottom、left 四个方向。" :code="placementCode">
                <div class="flex gap-2">
                    <vort-button @click="openTop = true">上</vort-button>
                    <vort-button @click="openRight = true">右</vort-button>
                    <vort-button @click="openBottom = true">下</vort-button>
                    <vort-button @click="openLeft = true">左</vort-button>
                </div>

                <vort-drawer v-model:open="openTop" placement="top" title="上方抽屉" :height="256" content-bg="#fff">
                    <p>从上方滑出的抽屉</p>
                </vort-drawer>

                <vort-drawer v-model:open="openRight" placement="right" title="右侧抽屉" content-bg="#fff">
                    <p>从右侧滑出的抽屉（默认）</p>
                </vort-drawer>

                <vort-drawer v-model:open="openBottom" placement="bottom" title="下方抽屉" :height="256" content-bg="#fff">
                    <p>从下方滑出的抽屉</p>
                </vort-drawer>

                <vort-drawer v-model:open="openLeft" placement="left" title="左侧抽屉" content-bg="#fff">
                    <p>从左侧滑出的抽屉</p>
                </vort-drawer>
            </DemoBox>

            <!-- 嵌套抽屉 -->
            <DemoBox
                title="嵌套抽屉（重点）"
                description="支持多层嵌套，打开新抽屉时，之前的抽屉会自动向外偏移 180px（与 Ant Design 一致）。"
                :code="nestedCode"
            >
                <vort-button variant="primary" @click="openNested1 = true">打开嵌套抽屉</vort-button>

                <vort-drawer v-model:open="openNested1" title="第一层抽屉" content-bg="#fff">
                    <div class="space-y-4">
                        <p>这是第一层抽屉的内容。</p>
                        <p class="text-sm text-gray-500">💡 点击下方按钮打开第二层抽屉，注意观察动画效果：</p>
                        <ul class="text-sm text-gray-500 list-disc list-inside space-y-1">
                            <li>第一层抽屉会向外偏移 180px</li>
                            <li>第二层抽屉从右侧滑入</li>
                            <li>关闭第二层时，第一层会回到原位</li>
                        </ul>
                        <vort-button variant="primary" @click="openNested2 = true"> 打开第二层抽屉 </vort-button>
                    </div>

                    <vort-drawer v-model:open="openNested2" title="第二层抽屉" content-bg="#fff">
                        <div class="space-y-4">
                            <p>这是第二层抽屉的内容。</p>
                            <p class="text-sm text-gray-500">✅ 第一层抽屉已经向外偏移了！</p>
                        </div>
                    </vort-drawer>
                </vort-drawer>
            </DemoBox>

            <!-- 多层嵌套 -->
            <DemoBox title="多层嵌套" description="支持多层嵌套，每打开一层，前面的抽屉都会向外偏移。" :code="nestedCode">
                <vort-button variant="primary" @click="openMulti1 = true">打开多层嵌套</vort-button>

                <vort-drawer v-model:open="openMulti1" title="第一层" content-bg="#fff">
                    <div class="space-y-4">
                        <p>第一层抽屉内容</p>
                        <vort-button @click="openMulti2 = true">打开第二层</vort-button>
                    </div>

                    <vort-drawer v-model:open="openMulti2" title="第二层" content-bg="#fff">
                        <div class="space-y-4">
                            <p>第二层抽屉内容</p>
                            <vort-button @click="openMulti3 = true">打开第三层</vort-button>
                        </div>

                        <vort-drawer v-model:open="openMulti3" title="第三层" content-bg="#fff">
                            <div class="space-y-4">
                                <p>第三层抽屉内容</p>
                                <p class="text-sm text-gray-500">💡 观察效果：前面两层抽屉都向外偏移了！</p>
                            </div>
                        </vort-drawer>
                    </vort-drawer>
                </vort-drawer>
            </DemoBox>

            <!-- 无遮罩 -->
            <DemoBox title="无遮罩" description='设置 :mask="false" 可以去除遮罩层。' :code="noMaskCode">
                <vort-button @click="openNoMask = true">打开无遮罩抽屉</vort-button>
                <vort-drawer v-model:open="openNoMask" title="无遮罩抽屉" :mask="false" content-bg="#fff">
                    <p>没有遮罩层，可以继续操作页面内容。</p>
                </vort-drawer>
            </DemoBox>

            <!-- 底部操作 -->
            <DemoBox title="底部操作" description="通过 footer 插槽可以添加底部操作按钮。" :code="extraCode">
                <vort-button variant="primary" @click="openExtra = true">打开带操作的抽屉</vort-button>
                <vort-drawer v-model:open="openExtra" title="用户信息" footer content-bg="#fff">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium mb-1">用户名</label>
                            <vort-input placeholder="请输入用户名" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">邮箱</label>
                            <vort-input placeholder="请输入邮箱" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">密码</label>
                            <vort-input-password placeholder="请输入密码" />
                        </div>
                    </div>

                    <template #footer>
                        <div class="flex justify-end gap-2">
                            <vort-button @click="openExtra = false">取消</vort-button>
                            <vort-button variant="primary" @click="openExtra = false">提交</vort-button>
                        </div>
                    </template>
                </vort-drawer>
            </DemoBox>
        </div>

        <!-- API 文档 -->
        <section class="demo-page-section">
            <h2 class="demo-section-title">API</h2>

            <h3 class="demo-api-title">Drawer Props</h3>
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
                        <td><code>open</code></td>
                        <td>是否显示抽屉（支持 v-model）</td>
                        <td><code>boolean</code></td>
                        <td><code>false</code></td>
                    </tr>
                    <tr>
                        <td><code>title</code></td>
                        <td>标题</td>
                        <td><code>string</code></td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td><code>placement</code></td>
                        <td>抽屉方向</td>
                        <td><code>'top' | 'right' | 'bottom' | 'left'</code></td>
                        <td><code>'right'</code></td>
                    </tr>
                    <tr>
                        <td><code>width</code></td>
                        <td>宽度（仅 left/right 有效）</td>
                        <td><code>number | string</code></td>
                        <td><code>378</code></td>
                    </tr>
                    <tr>
                        <td><code>height</code></td>
                        <td>高度（仅 top/bottom 有效）</td>
                        <td><code>number | string</code></td>
                        <td><code>378</code></td>
                    </tr>
                    <tr>
                        <td><code>mask</code></td>
                        <td>是否显示遮罩</td>
                        <td><code>boolean</code></td>
                        <td><code>true</code></td>
                    </tr>
                    <tr>
                        <td><code>maskClosable</code></td>
                        <td>点击遮罩是否允许关闭</td>
                        <td><code>boolean</code></td>
                        <td><code>true</code></td>
                    </tr>
                    <tr>
                        <td><code>closable</code></td>
                        <td>是否显示关闭按钮</td>
                        <td><code>boolean</code></td>
                        <td><code>true</code></td>
                    </tr>
                    <tr>
                        <td><code>push</code></td>
                        <td>嵌套抽屉偏移距离（设为 false 禁用）</td>
                        <td><code>number | false</code></td>
                        <td><code>180</code></td>
                    </tr>
                    <tr>
                        <td><code>zIndex</code></td>
                        <td>z-index 层级</td>
                        <td><code>number</code></td>
                        <td><code>1000</code></td>
                    </tr>
                    <tr>
                        <td><code>footer</code></td>
                        <td>是否显示底部区域</td>
                        <td><code>boolean</code></td>
                        <td><code>false</code></td>
                    </tr>
                    <tr>
                        <td><code>contentBg</code></td>
                        <td>内容区域背景色（仅 body 区域）</td>
                        <td><code>string</code></td>
                        <td><code>"#fff"</code></td>
                    </tr>
                    <tr>
                        <td><code>keyboard</code></td>
                        <td>是否支持 ESC 键关闭</td>
                        <td><code>boolean</code></td>
                        <td><code>true</code></td>
                    </tr>
                    <tr>
                        <td><code>destroyOnClose</code></td>
                        <td>关闭时是否销毁子组件</td>
                        <td><code>boolean</code></td>
                        <td><code>false</code></td>
                    </tr>
                </tbody>
            </table>

            <h3 class="demo-api-title">Drawer Events</h3>
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
                        <td><code>update:open</code></td>
                        <td>显示状态变化时触发</td>
                        <td><code>(value: boolean) =&gt; void</code></td>
                    </tr>
                    <tr>
                        <td><code>close</code></td>
                        <td>关闭抽屉时触发</td>
                        <td><code>() =&gt; void</code></td>
                    </tr>
                    <tr>
                        <td><code>afterOpenChange</code></td>
                        <td>打开/关闭动画完成后触发</td>
                        <td><code>(open: boolean) =&gt; void</code></td>
                    </tr>
                </tbody>
            </table>

            <h3 class="demo-api-title">Drawer Slots</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>插槽名</th>
                        <th>说明</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>default</code></td>
                        <td>抽屉内容</td>
                    </tr>
                    <tr>
                        <td><code>title</code></td>
                        <td>自定义标题</td>
                    </tr>
                    <tr>
                        <td><code>footer</code></td>
                        <td>底部内容</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>

<!-- 公共样式已在 demo.css 中定义 -->
