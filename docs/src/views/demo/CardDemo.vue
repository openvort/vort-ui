<script setup lang="ts">
import DemoBox from "./components/DemoBox.vue";

// 示例代码
const basicCode = `<template>
  <vort-card>
    <p>这是一个基础卡片</p>
  </vort-card>
</template>`;

const borderedCode = `<template>
  <vort-card bordered :shadow="false">
    <p>有边框无阴影的卡片</p>
  </vort-card>
</template>`;

const paddingCode = `<template>
  <vort-card padding="none">无内边距</vort-card>
  <vort-card padding="small">小内边距</vort-card>
  <vort-card padding="default">默认内边距</vort-card>
  <vort-card padding="large">大内边距</vort-card>
</template>`;

const listPageCode = `<template>
  <!-- 列表页典型用法 -->
  <div class="page-list">
    <vort-card>
      <!-- 搜索区域 -->
      <vort-form layout="inline">
        <vort-form-item label="关键词">
          <vort-input placeholder="请输入" />
        </vort-form-item>
        <vort-form-item>
          <vort-button variant="primary">搜索</vort-button>
        </vort-form-item>
      </vort-form>
    </vort-card>

    <vort-card>
      <!-- 表格区域 -->
      <div class="toolbar">
        <vort-button variant="primary">新增</vort-button>
      </div>
      <vort-table :data="[]" />
    </vort-card>
  </div>
</template>

<style scoped>
.page-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>`;
</script>

<template>
    <div class="demo-page">
        <h1 class="demo-page-title">Card 卡片</h1>
        <p class="demo-page-desc">通用卡片容器，用于页面内容分块展示。样式通过 CSS 变量控制，可在 theme/ 中统一定义。</p>

        <div class="demo-grid">
            <!-- 基础用法 -->
            <DemoBox title="基础用法" desc="默认带阴影的卡片容器" :code="basicCode">
                <vort-card>
                    <p>这是一个基础卡片</p>
                    <p style="color: #999; margin-top: 8px">Card 组件提供统一的白底圆角容器样式</p>
                </vort-card>
            </DemoBox>

            <!-- 边框样式 -->
            <DemoBox title="边框样式" desc="使用 bordered 添加边框，shadow 控制阴影" :code="borderedCode">
                <div style="display: flex; gap: 16px; flex-wrap: wrap">
                    <vort-card style="flex: 1; min-width: 200px">
                        <p>默认样式（有阴影）</p>
                    </vort-card>
                    <vort-card bordered :shadow="false" style="flex: 1; min-width: 200px">
                        <p>有边框无阴影</p>
                    </vort-card>
                    <vort-card bordered style="flex: 1; min-width: 200px">
                        <p>边框 + 阴影</p>
                    </vort-card>
                </div>
            </DemoBox>

            <!-- 内边距 -->
            <DemoBox title="内边距" desc="通过 padding 属性控制内边距大小" :code="paddingCode">
                <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: flex-start">
                    <vort-card padding="none" bordered style="min-width: 120px">
                        <div style="padding: 8px; background: #f5f5f5">none</div>
                    </vort-card>
                    <vort-card padding="small" bordered style="min-width: 120px">
                        <div>small</div>
                    </vort-card>
                    <vort-card padding="default" bordered style="min-width: 120px">
                        <div>default</div>
                    </vort-card>
                    <vort-card padding="large" bordered style="min-width: 120px">
                        <div>large</div>
                    </vort-card>
                </div>
            </DemoBox>

            <!-- 列表页用法 -->
            <DemoBox title="列表页典型用法" desc="搜索区 + 表格区分块展示" :code="listPageCode">
                <div class="page-list-demo">
                    <vort-card>
                        <div style="display: flex; gap: 16px; align-items: center">
                            <span>关键词：</span>
                            <vort-input placeholder="请输入" style="width: 200px" />
                            <vort-button variant="primary">搜索</vort-button>
                            <vort-button>重置</vort-button>
                        </div>
                    </vort-card>

                    <vort-card>
                        <div style="margin-bottom: 16px">
                            <vort-button variant="primary">新增</vort-button>
                            <vort-button style="margin-left: 8px">批量删除</vort-button>
                        </div>
                        <div style="padding: 40px; text-align: center; color: #999; background: #fafafa; border-radius: 4px">表格区域</div>
                    </vort-card>
                </div>
            </DemoBox>
        </div>

        <!-- API 文档 -->
        <h2 class="demo-section-title">API</h2>

        <h3 class="demo-subsection-title">Props</h3>
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
                    <td>bordered</td>
                    <td>是否有边框</td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>shadow</td>
                    <td>是否有阴影</td>
                    <td><code>boolean</code></td>
                    <td><code>true</code></td>
                </tr>
                <tr>
                    <td>padding</td>
                    <td>内边距大小</td>
                    <td><code>'none' | 'small' | 'default' | 'large'</code></td>
                    <td><code>'default'</code></td>
                </tr>
            </tbody>
        </table>

        <h3 class="demo-subsection-title">CSS 变量</h3>
        <table class="demo-api-table">
            <thead>
                <tr>
                    <th>变量名</th>
                    <th>说明</th>
                    <th>默认值</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>--vort-layout-container-bg</td>
                    <td>背景色</td>
                    <td><code>#fafcff</code></td>
                </tr>
                <tr>
                    <td>--vort-layout-radius</td>
                    <td>圆角</td>
                    <td><code>10px</code></td>
                </tr>
                <tr>
                    <td>--vort-layout-shadow</td>
                    <td>阴影</td>
                    <td><code>0px 0px 16px 0px rgba(0,0,0,0.035)</code></td>
                </tr>
                <tr>
                    <td>--vort-border-color</td>
                    <td>边框色（bordered 时生效）</td>
                    <td><code>#f0f0f0</code></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
/* 列表页演示区域（特有样式） */
.page-list-demo {
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: #f5f5f5;
    padding: 16px;
    border-radius: 8px;
}
</style>
