<script setup lang="ts">
/**
 * Vort UI 使用指南
 */
import { ref } from "vue";
import DemoBox from "./components/DemoBox.vue";

const basicUsageCode = `<template>
  <vort-button variant="primary">Primary Button</vort-button>
  <vort-button>Default Button</vort-button>
  <vort-switch v-model:checked="checked" />
</template>

<script setup>
import { ref } from "vue";
const checked = ref(false);
<\/script>`;

const formUsageCode = `<template>
  <vort-form :model="formData" :rules="rules">
    <vort-form-item label="用户名" name="username">
      <vort-input v-model="formData.username" placeholder="请输入用户名" />
    </vort-form-item>
    <vort-form-item label="密码" name="password">
      <vort-input-password v-model="formData.password" placeholder="请输入密码" />
    </vort-form-item>
    <vort-form-item>
      <vort-button variant="primary" html-type="submit">提交</vort-button>
    </vort-form-item>
  </vort-form>
</template>`;

// 演示数据
const checked = ref(false);
</script>

<template>
    <div class="demo-page">
        <header class="demo-page-header">
            <h1 class="demo-page-title">使用指南</h1>
            <p class="demo-page-desc">了解如何在项目中使用 Vort UI 组件。</p>
        </header>

        <section class="demo-page-section">
            <h2 class="demo-section-title">自动导入</h2>
            <p class="demo-section-desc">项目已配置 <code>unplugin-vue-components</code> 自动导入，无需手动引入组件，直接在模板中使用即可。</p>
            <div class="info-box">
                <p>💡 所有 Vort 组件都支持自动导入，可以直接在模板中使用 <code>&lt;vort-xxx&gt;</code> 或 <code>&lt;VortXxx&gt;</code> 形式。</p>
            </div>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">基础使用</h2>
            <DemoBox title="快速开始" description="无需导入，直接使用组件。" :code="basicUsageCode">
                <div class="demo-row">
                    <vort-button variant="primary">Primary Button</vort-button>
                    <vort-button>Default Button</vort-button>
                    <vort-switch v-model:checked="checked" />
                </div>
            </DemoBox>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">组件命名规范</h2>
            <p class="demo-section-desc">Vort UI 组件支持两种命名方式：</p>

            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>写法</th>
                        <th>示例</th>
                        <th>说明</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>kebab-case</code></td>
                        <td><code>&lt;vort-button&gt;</code></td>
                        <td>推荐，与 HTML 标准一致</td>
                    </tr>
                    <tr>
                        <td><code>PascalCase</code></td>
                        <td><code>&lt;VortButton&gt;</code></td>
                        <td>也支持，与 Vue 组件命名一致</td>
                    </tr>
                </tbody>
            </table>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">可用组件列表</h2>
            <p class="demo-section-desc">以下是目前可用的所有组件：</p>

            <h3 class="demo-api-title">通用组件</h3>
            <div class="component-grid">
                <code>&lt;vort-button&gt;</code>
                <code>&lt;vort-dropdown&gt;</code>
                <code>&lt;vort-divider&gt;</code>
            </div>

            <h3 class="demo-api-title">布局组件</h3>
            <div class="component-grid">
                <code>&lt;vort-card&gt;</code>
                <code>&lt;vort-row&gt;</code>
                <code>&lt;vort-col&gt;</code>
                <code>&lt;vort-scrollbar&gt;</code>
            </div>

            <h3 class="demo-api-title">数据录入</h3>
            <div class="component-grid">
                <code>&lt;vort-input&gt;</code>
                <code>&lt;vort-input-password&gt;</code>
                <code>&lt;vort-input-search&gt;</code>
                <code>&lt;vort-input-number&gt;</code>
                <code>&lt;vort-select&gt;</code>
                <code>&lt;vort-checkbox&gt;</code>
                <code>&lt;vort-checkbox-group&gt;</code>
                <code>&lt;vort-radio&gt;</code>
                <code>&lt;vort-radio-group&gt;</code>
                <code>&lt;vort-switch&gt;</code>
                <code>&lt;vort-slider&gt;</code>
                <code>&lt;vort-date-picker&gt;</code>
                <code>&lt;vort-time-picker&gt;</code>
                <code>&lt;vort-cascader&gt;</code>
                <code>&lt;vort-color-picker&gt;</code>
                <code>&lt;vort-upload&gt;</code>
                <code>&lt;vort-form&gt;</code>
                <code>&lt;vort-form-item&gt;</code>
            </div>

            <h3 class="demo-api-title">数据展示</h3>
            <div class="component-grid">
                <code>&lt;vort-table&gt;</code>
                <code>&lt;vort-pagination&gt;</code>
                <code>&lt;vort-badge&gt;</code>
                <code>&lt;vort-tag&gt;</code>
                <code>&lt;vort-tabs&gt;</code>
                <code>&lt;vort-image&gt;</code>
                <code>&lt;vort-steps&gt;</code>
            </div>

            <h3 class="demo-api-title">反馈组件</h3>
            <div class="component-grid">
                <code>&lt;vort-alert&gt;</code>
                <code>&lt;vort-dialog&gt;</code>
                <code>&lt;vort-drawer&gt;</code>
                <code>&lt;vort-tooltip&gt;</code>
                <code>&lt;vort-popover&gt;</code>
                <code>&lt;vort-popconfirm&gt;</code>
                <code>&lt;vort-spin&gt;</code>
                <code>&lt;vort-skeleton&gt;</code>
            </div>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">表单示例</h2>
            <DemoBox title="表单组件组合" description="展示表单组件的典型用法。" :code="formUsageCode">
                <div style="width: 400px">
                    <vort-form>
                        <vort-form-item label="用户名">
                            <vort-input placeholder="请输入用户名" />
                        </vort-form-item>
                        <vort-form-item label="密码">
                            <vort-input-password placeholder="请输入密码" />
                        </vort-form-item>
                        <vort-form-item>
                            <vort-button variant="primary">提交</vort-button>
                        </vort-form-item>
                    </vort-form>
                </div>
            </DemoBox>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">下一步</h2>
            <p class="demo-section-desc">现在你已经了解了基本用法，可以浏览左侧的组件列表，查看每个组件的详细文档和示例。</p>
            <div class="next-links">
                <router-link to="/components/button" class="next-link">
                    <span class="next-link-title">Button 按钮</span>
                    <span class="next-link-desc">了解按钮组件的各种用法</span>
                </router-link>
                <router-link to="/components/form" class="next-link">
                    <span class="next-link-title">Form 表单</span>
                    <span class="next-link-desc">构建完整的表单功能</span>
                </router-link>
                <router-link to="/components/table" class="next-link">
                    <span class="next-link-title">Table 表格</span>
                    <span class="next-link-desc">展示和操作数据</span>
                </router-link>
            </div>
        </section>
    </div>
</template>

<style scoped>
/* 提示框 */
.info-box {
    padding: 16px;
    background: var(--vort-primary-bg);
    border-left: 4px solid var(--vort-primary);
    border-radius: 4px;
    margin-bottom: 24px;
}

.info-box p {
    margin: 0;
    font-size: 14px;
    color: var(--vort-text-secondary);
    line-height: 1.6;
}

.info-box code {
    padding: 2px 6px;
    background: rgba(0, 0, 0, 0.06);
    border-radius: 4px;
    font-family: "SF Mono", Consolas, monospace;
    font-size: 13px;
}

/* 组件列表 */
.component-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
}

.component-grid code {
    padding: 6px 12px;
    background: var(--vort-primary-bg);
    border-radius: 6px;
    font-family: "SF Mono", Consolas, monospace;
    font-size: 13px;
    color: var(--vort-primary);
}

/* 下一步链接 */
.next-links {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
}

.next-link {
    display: block;
    padding: 20px;
    background: var(--vort-bg-elevated);
    border: 1px solid var(--vort-border-secondary);
    border-radius: 8px;
    text-decoration: none;
    transition: all 0.2s;
}

.next-link:hover {
    border-color: var(--vort-primary);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.next-link-title {
    display: block;
    font-size: 15px;
    font-weight: 600;
    color: var(--vort-text);
    margin-bottom: 4px;
}

.next-link-desc {
    display: block;
    font-size: 13px;
    color: var(--vort-text-secondary);
}
</style>
