<script setup lang="ts">
import { ref } from "vue";
import DemoBox from "./components/DemoBox.vue";
import { ArrowUpOutlined, ArrowDownOutlined, LikeOutlined } from "@/components/vort/icons";

// 倒计时目标时间（当前时间 + 24 小时 + 1 分钟）
const deadline = ref(Date.now() + 1000 * 60 * 60 * 24 + 1000 * 60);

// 倒计时完成回调
const onCountdownFinish = () => {
    console.log("倒计时完成！");
};

// 示例代码
const basicCode = `<template>
  <vort-statistic title="Active Users" :value="112893" />
  <vort-statistic title="Account Balance (CNY)" :value="112893" :precision="2" />
</template>`;

const unitCode = `<template>
  <vort-statistic title="Feedback" :value="1128" suffix="人">
    <template #prefix>
      <LikeOutlined />
    </template>
  </vort-statistic>
  <vort-statistic title="Unmerged" :value="93" suffix="/ 100" />
</template>`;

const cardCode = `<template>
  <div class="grid grid-cols-2 gap-4">
    <vort-card>
      <vort-statistic
        title="Active"
        :value="11.28"
        :precision="2"
        suffix="%"
        :value-style="{ color: '#3f8600' }"
      >
        <template #prefix>
          <ArrowUpOutlined />
        </template>
      </vort-statistic>
    </vort-card>
    <vort-card>
      <vort-statistic
        title="Idle"
        :value="9.3"
        :precision="2"
        suffix="%"
        :value-style="{ color: '#cf1322' }"
      >
        <template #prefix>
          <ArrowDownOutlined />
        </template>
      </vort-statistic>
    </vort-card>
  </div>
</template>`;

const countdownCode = `<template>
  <vort-statistic-countdown
    title="Countdown"
    :value="deadline"
    @finish="onFinish"
  />
  <vort-statistic-countdown
    title="Million Seconds"
    :value="deadline"
    format="HH:mm:ss:SSS"
  />
  <vort-statistic-countdown
    title="Day Level"
    :value="deadline"
    format="D 天 H 时 m 分 s 秒"
  />
</template>

<script setup>
const deadline = Date.now() + 1000 * 60 * 60 * 24 + 1000 * 60;
const onFinish = () => {
  console.log('倒计时完成！');
};
<\/script>`;

const loadingCode = `<template>
  <vort-statistic title="Active Users" :value="112893" loading />
</template>`;

const formatterCode = `<template>
  <vort-statistic title="Custom Format" :value="1234567890">
    <template #formatter="{ value }">
      {{ formatNumber(value) }}
    </template>
  </vort-statistic>
</template>

<script setup>
const formatNumber = (value) => {
  return new Intl.NumberFormat('zh-CN').format(value);
};
<\/script>`;

const separatorCode = `<template>
  <!-- 默认千分位分隔符为 "," -->
  <vort-statistic title="Default Separator" :value="1234567" />

  <!-- 使用空格作为千分位分隔符 -->
  <vort-statistic title="Space Separator" :value="1234567" group-separator=" " />

  <!-- 使用中文逗号作为千分位分隔符 -->
  <vort-statistic title="Chinese Separator" :value="1234567.89" :precision="2" group-separator="，" decimal-separator="。" />
</template>`;

// Props 表格数据
const propsData = [
    {
        prop: "title",
        desc: "数值标题",
        type: "string",
        default: "-"
    },
    {
        prop: "value",
        desc: "数值内容",
        type: "string | number",
        default: "-"
    },
    {
        prop: "precision",
        desc: "数值精度（小数位数）",
        type: "number",
        default: "-"
    },
    {
        prop: "decimalSeparator",
        desc: "设置小数点",
        type: "string",
        default: "'.'"
    },
    {
        prop: "groupSeparator",
        desc: "设置千分位标识符",
        type: "string",
        default: "','"
    },
    {
        prop: "prefix",
        desc: "数值的前缀",
        type: "string",
        default: "-"
    },
    {
        prop: "suffix",
        desc: "数值的后缀",
        type: "string",
        default: "-"
    },
    {
        prop: "loading",
        desc: "是否加载中（显示骨架屏）",
        type: "boolean",
        default: "false"
    },
    {
        prop: "valueStyle",
        desc: "设置数值区域的样式",
        type: "CSSProperties",
        default: "-"
    }
];

// Countdown Props 表格数据
const countdownPropsData = [
    {
        prop: "title",
        desc: "数值标题",
        type: "string",
        default: "-"
    },
    {
        prop: "value",
        desc: "目标时间戳（毫秒）",
        type: "number",
        default: "-"
    },
    {
        prop: "format",
        desc: "格式化字符串",
        type: "string",
        default: "'HH:mm:ss'"
    },
    {
        prop: "prefix",
        desc: "数值的前缀",
        type: "string",
        default: "-"
    },
    {
        prop: "suffix",
        desc: "数值的后缀",
        type: "string",
        default: "-"
    },
    {
        prop: "valueStyle",
        desc: "设置数值区域的样式",
        type: "CSSProperties",
        default: "-"
    }
];

// Countdown Events 表格数据
const countdownEventsData = [
    {
        event: "finish",
        desc: "倒计时完成时触发",
        params: "() => void"
    },
    {
        event: "change",
        desc: "倒计时变化时触发",
        params: "(value: number) => void"
    }
];

// Slots 表格数据
const slotsData = [
    {
        name: "title",
        desc: "自定义标题"
    },
    {
        name: "prefix",
        desc: "自定义前缀"
    },
    {
        name: "suffix",
        desc: "自定义后缀"
    },
    {
        name: "formatter",
        desc: "自定义格式化（会覆盖默认的数值展示），参数为 { value }"
    }
];

// Countdown Slots 表格数据
const countdownSlotsData = [
    {
        name: "title",
        desc: "自定义标题"
    },
    {
        name: "prefix",
        desc: "自定义前缀"
    },
    {
        name: "suffix",
        desc: "自定义后缀"
    }
];

// 格式化字符串说明
const formatData = [
    { token: "D", desc: "天数" },
    { token: "DD", desc: "天数（补零）" },
    { token: "H", desc: "小时" },
    { token: "HH", desc: "小时（补零）" },
    { token: "m", desc: "分钟" },
    { token: "mm", desc: "分钟（补零）" },
    { token: "s", desc: "秒" },
    { token: "ss", desc: "秒（补零）" },
    { token: "S", desc: "毫秒（百位）" },
    { token: "SS", desc: "毫秒（十位，补零）" },
    { token: "SSS", desc: "毫秒（补零）" }
];
</script>

<template>
    <div class="demo-page">
        <header class="demo-page-header">
            <h1 class="demo-page-title">Statistic 统计数值</h1>
            <p class="demo-page-desc">展示统计数值。</p>
        </header>

        <section class="demo-page-section">
            <h2 class="demo-section-title">何时使用</h2>
            <ul class="demo-section-list">
                <li>当需要突出某个或某组数字时。</li>
                <li>当需要展示带描述的统计类数据时使用。</li>
            </ul>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <DemoBox title="基本" description="简单的展示。" :code="basicCode">
                    <div class="flex flex-wrap gap-12">
                        <vort-statistic title="Active Users" :value="112893" />
                        <vort-statistic title="Account Balance (CNY)" :value="112893" :precision="2" />
                    </div>
                </DemoBox>

                <DemoBox title="单位" description="通过 prefix 和 suffix 添加前缀和后缀。" :code="unitCode">
                    <div class="flex flex-wrap gap-12">
                        <vort-statistic title="Feedback" :value="1128">
                            <template #prefix>
                                <LikeOutlined class="w-5 h-5" />
                            </template>
                            <template #suffix>人</template>
                        </vort-statistic>
                        <vort-statistic title="Unmerged" :value="93" suffix="/ 100" />
                    </div>
                </DemoBox>

                <DemoBox title="在卡片中使用" description="在卡片中展示统计数值。" :code="cardCode">
                    <div class="grid grid-cols-2 gap-4 w-full max-w-md">
                        <vort-card>
                            <vort-statistic title="Active" :value="11.28" :precision="2" suffix="%" :value-style="{ color: '#3f8600' }">
                                <template #prefix>
                                    <ArrowUpOutlined class="w-5 h-5" />
                                </template>
                            </vort-statistic>
                        </vort-card>
                        <vort-card>
                            <vort-statistic title="Idle" :value="9.3" :precision="2" suffix="%" :value-style="{ color: '#cf1322' }">
                                <template #prefix>
                                    <ArrowDownOutlined class="w-5 h-5" />
                                </template>
                            </vort-statistic>
                        </vort-card>
                    </div>
                </DemoBox>

                <DemoBox title="倒计时" description="倒计时组件。" :code="countdownCode">
                    <div class="flex flex-wrap gap-12">
                        <vort-statistic-countdown title="Countdown" :value="deadline" @finish="onCountdownFinish" />
                        <vort-statistic-countdown title="Million Seconds" :value="deadline" format="HH:mm:ss:SSS" />
                        <vort-statistic-countdown title="Day Level" :value="deadline" format="D 天 H 时 m 分 s 秒" />
                    </div>
                </DemoBox>

                <DemoBox title="加载中" description="加载中状态显示骨架屏。" :code="loadingCode">
                    <div class="flex flex-wrap gap-12">
                        <vort-statistic title="Active Users" :value="112893" loading />
                        <vort-statistic title="Account Balance" :value="112893" :precision="2" />
                    </div>
                </DemoBox>

                <DemoBox title="自定义分隔符" description="可以自定义千分位分隔符和小数点。" :code="separatorCode">
                    <div class="flex flex-wrap gap-12">
                        <vort-statistic title="Default Separator" :value="1234567" />
                        <vort-statistic title="Space Separator" :value="1234567" group-separator=" " />
                        <vort-statistic title="Chinese Separator" :value="1234567.89" :precision="2" group-separator="，" decimal-separator="。" />
                    </div>
                </DemoBox>
            </div>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">API</h2>

            <h3 class="demo-api-title">Statistic Props</h3>
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

            <h3 class="demo-api-title">Statistic Slots</h3>
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

            <h3 class="demo-api-title">Statistic.Countdown Props</h3>
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
                    <tr v-for="item in countdownPropsData" :key="item.prop">
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

            <h3 class="demo-api-title">Statistic.Countdown Events</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>事件名</th>
                        <th>说明</th>
                        <th>回调参数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in countdownEventsData" :key="item.event">
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

            <h3 class="demo-api-title">Statistic.Countdown Slots</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>插槽名</th>
                        <th>说明</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in countdownSlotsData" :key="item.name">
                        <td>
                            <code>{{ item.name }}</code>
                        </td>
                        <td>{{ item.desc }}</td>
                    </tr>
                </tbody>
            </table>

            <h3 class="demo-api-title">format 格式化字符串</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>Token</th>
                        <th>说明</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in formatData" :key="item.token">
                        <td>
                            <code>{{ item.token }}</code>
                        </td>
                        <td>{{ item.desc }}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>

<!-- 公共样式已在 demo.css 中定义 -->
