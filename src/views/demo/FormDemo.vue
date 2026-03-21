<script setup lang="ts">
import { ref, reactive } from "vue";
import DemoBox from "./components/DemoBox.vue";
import { z } from "zod";

// 基础表单数据
const basicForm = reactive({
    username: "",
    password: "",
    remember: false
});

// 表单引用
const formRef = ref();

// 处理基础表单提交
const handleBasicFinish = (values: Record<string, unknown>) => {
    console.log("表单提交成功:", values);
};

const handleBasicFailed = (errors: Record<string, string>) => {
    console.log("表单验证失败:", errors);
};

// 垂直布局表单
const verticalForm = reactive({
    email: "",
    nickname: ""
});

// 行内表单
const inlineForm = reactive({
    user: "",
    pass: ""
});

// 表单验证
const validationForm = reactive({
    name: "",
    email: "",
    age: "",
    website: "",
    intro: ""
});

// 验证规则 (zod schema)
const validationSchema = z.object({
    name: z.string().min(2, "姓名至少 2 个字符").max(20, "姓名最多 20 个字符"),
    email: z.string().email("请输入有效的邮箱地址"),
    age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 18 && Number(val) <= 100, {
        message: "年龄必须在 18-100 之间"
    }),
    website: z.string().url("请输入有效的 URL").optional().or(z.literal("")),
    intro: z.string().max(200, "简介最多 200 个字符").optional()
});

const validationFormRef = ref();

const handleValidationSubmit = () => {
    validationFormRef.value?.submit();
};

const handleValidationReset = () => {
    validationFormRef.value?.resetFields();
};

// 复杂表单
const complexForm = reactive({
    username: "",
    email: "",
    gender: "",
    hobbies: [] as string[],
    agreement: false
});

const genderOptions = [
    { label: "男", value: "male" },
    { label: "女", value: "female" },
    { label: "其他", value: "other" }
];

const hobbyOptions = [
    { label: "阅读", value: "reading" },
    { label: "音乐", value: "music" },
    { label: "运动", value: "sports" },
    { label: "旅行", value: "travel" }
];

// 自定义 labelCol 和 wrapperCol
const customLabelCol = { span: 6 };
const customWrapperCol = { span: 14 };

// 示例代码
const basicCode = `<script setup>
import { reactive, ref } from 'vue';
import { Form, FormItem, Input, InputPassword, Button, Checkbox } from '@/components/vort';

const formData = reactive({
  username: '',
  password: '',
  remember: false
});

const formRef = ref();

const onFinish = (values) => {
  console.log('提交成功:', values);
};

const onFinishFailed = (errors) => {
  console.log('验证失败:', errors);
};
<\/script>

<template>
  <vort-form
    ref="formRef"
    :model="formData"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    @finish="onFinish"
    @finish-failed="onFinishFailed"
  >
    <vort-form-item label="用户名" name="username" required>
      <vort-input v-model="formData.username" placeholder="请输入用户名" />
    </vort-form-item>
    <vort-form-item label="密码" name="password" required>
      <vort-input-password v-model="formData.password" placeholder="请输入密码" />
    </vort-form-item>
    <vort-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
      <vort-checkbox v-model="formData.remember">记住我</vort-checkbox>
    </vort-form-item>
    <vort-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <vort-button variant="primary" html-type="submit">登录</vort-button>
    </vort-form-item>
  </vort-form>
</template>`;

const verticalCode = `<template>
  <vort-form :model="formData" layout="vertical">
    <vort-form-item label="邮箱" name="email">
      <vort-input v-model="formData.email" placeholder="请输入邮箱" />
    </vort-form-item>
    <vort-form-item label="昵称" name="nickname">
      <vort-input v-model="formData.nickname" placeholder="请输入昵称" />
    </vort-form-item>
    <vort-form-item>
      <vort-button variant="primary" html-type="submit">提交</vort-button>
    </vort-form-item>
  </vort-form>
</template>`;

const inlineCode = `<template>
  <vort-form :model="formData" layout="inline">
    <vort-form-item label="用户名" name="user">
      <vort-input v-model="formData.user" placeholder="用户名" />
    </vort-form-item>
    <vort-form-item label="密码" name="pass">
      <vort-input-password v-model="formData.pass" placeholder="密码" />
    </vort-form-item>
    <vort-form-item>
      <vort-button variant="primary" html-type="submit">登录</vort-button>
    </vort-form-item>
  </vort-form>
</template>`;

const validationCode = `<script setup>
import { z } from 'zod';

const validationSchema = z.object({
  name: z.string().min(2, '姓名至少 2 个字符'),
  email: z.string().email('请输入有效的邮箱地址'),
  age: z.string().refine(
    val => Number(val) >= 18 && Number(val) <= 100,
    { message: '年龄必须在 18-100 之间' }
  ),
  website: z.string().url('请输入有效的 URL').optional().or(z.literal('')),
});
<\/script>

<template>
  <vort-form
    ref="formRef"
    :model="formData"
    :rules="validationSchema"
    :label-col="{ span: 6 }"
    :wrapper-col="{ span: 14 }"
  >
    <vort-form-item label="姓名" name="name" required has-feedback>
      <vort-input v-model="formData.name" placeholder="请输入姓名" />
    </vort-form-item>
    <vort-form-item label="邮箱" name="email" required has-feedback>
      <vort-input v-model="formData.email" placeholder="请输入邮箱" />
    </vort-form-item>
    <vort-form-item label="年龄" name="age" required>
      <vort-input v-model="formData.age" placeholder="请输入年龄" />
    </vort-form-item>
    <vort-form-item label="网站" name="website">
      <vort-input v-model="formData.website" placeholder="请输入网站地址（选填）" />
    </vort-form-item>
    <vort-form-item :wrapper-col="{ offset: 6, span: 14 }">
      <vort-button variant="primary" @click="formRef?.submit()">提交</vort-button>
      <vort-button @click="formRef?.resetFields()">重置</vort-button>
    </vort-form-item>
  </vort-form>
</template>`;

const complexCode = `<template>
  <vort-form
    :model="formData"
    :label-col="{ span: 6 }"
    :wrapper-col="{ span: 14 }"
  >
    <vort-form-item label="用户名" name="username" required>
      <vort-input v-model="formData.username" placeholder="请输入用户名" />
    </vort-form-item>
    <vort-form-item label="邮箱" name="email" required>
      <vort-input v-model="formData.email" placeholder="请输入邮箱" />
    </vort-form-item>
    <vort-form-item label="性别" name="gender">
      <vort-radio-group v-model="formData.gender" :options="genderOptions" />
    </vort-form-item>
    <vort-form-item label="爱好" name="hobbies">
      <vort-checkbox-group v-model="formData.hobbies" :options="hobbyOptions" />
    </vort-form-item>
    <vort-form-item name="agreement" :wrapper-col="{ offset: 6, span: 14 }">
      <vort-checkbox v-model="formData.agreement">
        我已阅读并同意 <a href="#">用户协议</a>
      </vort-checkbox>
    </vort-form-item>
    <vort-form-item :wrapper-col="{ offset: 6, span: 14 }">
      <vort-button variant="primary" html-type="submit">注册</vort-button>
    </vort-form-item>
  </vort-form>
</template>`;

const labelAlignCode = `<template>
  <!-- 右对齐（默认） -->
  <vort-form :model="formData" label-align="right">
    <vort-form-item label="用户名" name="username">
      <vort-input v-model="formData.username" />
    </vort-form-item>
  </vort-form>

  <!-- 左对齐 -->
  <vort-form :model="formData" label-align="left">
    <vort-form-item label="用户名" name="username">
      <vort-input v-model="formData.username" />
    </vort-form-item>
  </vort-form>
</template>`;

const requiredMarkCode = `<template>
  <!-- 必填标记（默认） -->
  <vort-form :model="formData" :required-mark="true">
    <vort-form-item label="用户名" name="username" required>
      <vort-input v-model="formData.username" />
    </vort-form-item>
  </vort-form>

  <!-- 可选标记 -->
  <vort-form :model="formData" required-mark="optional">
    <vort-form-item label="用户名" name="username">
      <vort-input v-model="formData.username" />
    </vort-form-item>
    <vort-form-item label="邮箱" name="email" required>
      <vort-input v-model="formData.email" />
    </vort-form-item>
  </vort-form>
</template>`;

const labelWidthCode = `<template>
  <!-- 固定宽度 -->
  <vort-form :model="formData" label-width="100px">
    <vort-form-item label="用户名" name="username">
      <vort-input v-model="formData.username" />
    </vort-form-item>
    <vort-form-item label="电子邮箱地址" name="email">
      <vort-input v-model="formData.email" />
    </vort-form-item>
  </vort-form>

  <!-- 自动宽度：所有 label 按最长的对齐 -->
  <vort-form :model="formData" label-width="auto">
    <vort-form-item label="用户名" name="username">
      <vort-input v-model="formData.username" />
    </vort-form-item>
    <vort-form-item label="电子邮箱地址" name="email">
      <vort-input v-model="formData.email" />
    </vort-form-item>
    <vort-form-item label="手机号码" name="phoneNumber">
      <vort-input v-model="formData.phoneNumber" />
    </vort-form-item>
  </vort-form>
</template>`;

// 左对齐表单
const leftAlignForm = reactive({
    username: "",
    email: ""
});

// label 宽度表单
const labelWidthForm = reactive({
    username: "",
    email: "",
    phoneNumber: ""
});

// Props 表格数据
const formPropsData = [
    {
        prop: "model",
        desc: "表单数据对象",
        type: "Record<string, unknown>",
        default: "-"
    },
    {
        prop: "rules",
        desc: "表单验证规则（支持 zod schema）",
        type: "ZodType | Record<string, unknown>",
        default: "-"
    },
    {
        prop: "layout",
        desc: "表单布局",
        type: "'horizontal' | 'vertical' | 'inline'",
        default: "'horizontal'"
    },
    {
        prop: "labelAlign",
        desc: "label 标签的文本对齐方式",
        type: "'left' | 'right'",
        default: "'right'"
    },
    {
        prop: "labelWidth",
        desc: "标签的长度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。可以使用 'auto'，此时所有标签按最长的对齐",
        type: "string",
        default: "-"
    },
    {
        prop: "labelCol",
        desc: "label 标签布局",
        type: "{ span?: number; offset?: number }",
        default: "{ span: 8 }"
    },
    {
        prop: "wrapperCol",
        desc: "控件布局",
        type: "{ span?: number; offset?: number }",
        default: "{ span: 16 }"
    },
    {
        prop: "colon",
        desc: "配置 Form.Item 的 colon 的默认值",
        type: "boolean",
        default: "true"
    },
    {
        prop: "disabled",
        desc: "是否禁用该表单内的所有组件",
        type: "boolean",
        default: "false"
    },
    {
        prop: "size",
        desc: "设置字段组件的尺寸",
        type: "'large' | 'middle' | 'small'",
        default: "'middle'"
    },
    {
        prop: "validateTrigger",
        desc: "统一设置字段触发验证的时机",
        type: "'change' | 'blur' | Array<'change' | 'blur'>",
        default: "'change'"
    },
    {
        prop: "requiredMark",
        desc: "是否显示必填标记",
        type: "boolean | 'optional'",
        default: "true"
    }
];

const formItemPropsData = [
    {
        prop: "name",
        desc: "字段名，用于表单验证",
        type: "string",
        default: "-"
    },
    {
        prop: "label",
        desc: "label 标签的文本",
        type: "string",
        default: "-"
    },
    {
        prop: "required",
        desc: "是否必填",
        type: "boolean",
        default: "false"
    },
    {
        prop: "rules",
        desc: "验证规则",
        type: "unknown[]",
        default: "-"
    },
    {
        prop: "labelWidth",
        desc: "标签的长度，例如 '50px'。可以使用 'auto'（会覆盖 Form 的 labelWidth）",
        type: "string",
        default: "-"
    },
    {
        prop: "labelCol",
        desc: "label 标签布局（会覆盖 Form 的 labelCol）",
        type: "{ span?: number; offset?: number }",
        default: "-"
    },
    {
        prop: "wrapperCol",
        desc: "控件布局（会覆盖 Form 的 wrapperCol）",
        type: "{ span?: number; offset?: number }",
        default: "-"
    },
    {
        prop: "colon",
        desc: "配置 Form.Item 的 colon 的默认值",
        type: "boolean",
        default: "-"
    },
    {
        prop: "help",
        desc: "提示信息",
        type: "string",
        default: "-"
    },
    {
        prop: "extra",
        desc: "额外的提示信息",
        type: "string",
        default: "-"
    },
    {
        prop: "validateStatus",
        desc: "校验状态",
        type: "'success' | 'warning' | 'error' | 'validating'",
        default: "-"
    },
    {
        prop: "hasFeedback",
        desc: "是否展示校验状态图标",
        type: "boolean",
        default: "false"
    },
    {
        prop: "tooltip",
        desc: "提示信息",
        type: "string",
        default: "-"
    }
];

// Events 表格数据
const formEventsData = [
    {
        event: "finish",
        desc: "表单提交且验证通过时触发",
        params: "(values: Record<string, unknown>) => void"
    },
    {
        event: "finishFailed",
        desc: "表单提交且验证失败时触发",
        params: "(errors: Record<string, string>) => void"
    },
    {
        event: "valuesChange",
        desc: "字段值变更时触发",
        params: "(changedValues, allValues) => void"
    }
];

// Methods 表格数据
const formMethodsData = [
    {
        method: "submit",
        desc: "提交表单",
        params: "() => Promise<void>"
    },
    {
        method: "resetFields",
        desc: "重置表单",
        params: "() => void"
    },
    {
        method: "validateFields",
        desc: "验证表单",
        params: "(names?: string | string[]) => Promise<{ valid: boolean; errors: Record<string, string> }>"
    },
    {
        method: "clearValidate",
        desc: "清除验证",
        params: "(names?: string | string[]) => void"
    },
    {
        method: "setFieldsValue",
        desc: "设置字段值",
        params: "(values: Record<string, unknown>) => void"
    },
    {
        method: "getFieldsValue",
        desc: "获取字段值",
        params: "(names?: string | string[]) => Record<string, unknown>"
    }
];
</script>

<template>
    <div class="demo-page">
        <header class="demo-page-header">
            <h1 class="demo-page-title">Form 表单</h1>
            <p class="demo-page-desc">高性能表单控件，自带数据域管理。包含数据录入、校验以及对应样式。</p>
        </header>

        <section class="demo-page-section">
            <h2 class="demo-section-title">何时使用</h2>
            <ul class="demo-section-list">
                <li>用于创建一个实体或收集信息。</li>
                <li>需要对输入的数据类型进行校验时。</li>
            </ul>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <DemoBox title="基础表单" description="基础的表单数据域控制展示，包含布局、初始化、验证、提交。" :code="basicCode">
                    <div class="demo-form-container">
                        <vort-form
                            ref="formRef"
                            :model="basicForm"
                            :label-col="{ span: 8 }"
                            :wrapper-col="{ span: 16 }"
                            @finish="handleBasicFinish"
                            @finish-failed="handleBasicFailed"
                        >
                            <vort-form-item label="用户名" name="username" required>
                                <vort-input v-model="basicForm.username" placeholder="请输入用户名" />
                            </vort-form-item>
                            <vort-form-item label="密码" name="password" required>
                                <vort-input-password v-model="basicForm.password" placeholder="请输入密码" />
                            </vort-form-item>
                            <vort-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
                                <vort-checkbox v-model:checked="basicForm.remember">记住我</vort-checkbox>
                            </vort-form-item>
                            <vort-form-item :wrapper-col="{ offset: 8, span: 16 }">
                                <vort-button variant="primary" html-type="submit">登录</vort-button>
                            </vort-form-item>
                        </vort-form>
                    </div>
                </DemoBox>

                <DemoBox title="垂直布局" description="垂直排列的表单。" :code="verticalCode">
                    <div class="demo-form-container">
                        <vort-form :model="verticalForm" layout="vertical">
                            <vort-form-item label="邮箱" name="email">
                                <vort-input v-model="verticalForm.email" placeholder="请输入邮箱" />
                            </vort-form-item>
                            <vort-form-item label="昵称" name="nickname">
                                <vort-input v-model="verticalForm.nickname" placeholder="请输入昵称" />
                            </vort-form-item>
                            <vort-form-item>
                                <vort-button variant="primary" html-type="submit">提交</vort-button>
                            </vort-form-item>
                        </vort-form>
                    </div>
                </DemoBox>

                <DemoBox title="行内表单" description="行内排列的表单，适合简短的表单场景。" :code="inlineCode">
                    <div class="demo-form-inline-container">
                        <vort-form :model="inlineForm" layout="inline">
                            <vort-form-item label="用户名" name="user">
                                <vort-input v-model="inlineForm.user" placeholder="用户名" style="width: 160px" />
                            </vort-form-item>
                            <vort-form-item label="密码" name="pass">
                                <vort-input-password v-model="inlineForm.pass" placeholder="密码" style="width: 160px" />
                            </vort-form-item>
                            <vort-form-item>
                                <vort-button variant="primary" html-type="submit">登录</vort-button>
                            </vort-form-item>
                        </vort-form>
                    </div>
                </DemoBox>

                <DemoBox
                    title="表单验证"
                    description="通过 rules 属性设置表单验证规则，支持 zod schema。hasFeedback 可以显示校验状态图标。"
                    :code="validationCode"
                >
                    <div class="demo-form-container">
                        <vort-form
                            ref="validationFormRef"
                            :model="validationForm"
                            :rules="validationSchema"
                            :label-col="customLabelCol"
                            :wrapper-col="customWrapperCol"
                        >
                            <vort-form-item label="姓名" name="name" required has-feedback>
                                <vort-input v-model="validationForm.name" placeholder="请输入姓名" />
                            </vort-form-item>
                            <vort-form-item label="邮箱" name="email" required has-feedback>
                                <vort-input v-model="validationForm.email" placeholder="请输入邮箱" />
                            </vort-form-item>
                            <vort-form-item label="年龄" name="age" required>
                                <vort-input v-model="validationForm.age" placeholder="请输入年龄" style="width: 120px" />
                            </vort-form-item>
                            <vort-form-item label="网站" name="website">
                                <vort-input v-model="validationForm.website" placeholder="请输入网站地址（选填）" />
                            </vort-form-item>
                            <vort-form-item label="简介" name="intro">
                                <vort-input v-model="validationForm.intro" placeholder="请输入简介（选填）" />
                            </vort-form-item>
                            <vort-form-item :wrapper-col="{ offset: 6, span: 14 }">
                                <div class="flex gap-2">
                                    <vort-button variant="primary" @click="handleValidationSubmit">提交</vort-button>
                                    <vort-button @click="handleValidationReset">重置</vort-button>
                                </div>
                            </vort-form-item>
                        </vort-form>
                    </div>
                </DemoBox>

                <DemoBox title="复杂表单" description="包含多种表单控件的复杂表单。" :code="complexCode">
                    <div class="demo-form-container">
                        <vort-form :model="complexForm" :label-col="customLabelCol" :wrapper-col="customWrapperCol">
                            <vort-form-item label="用户名" name="username" required>
                                <vort-input v-model="complexForm.username" placeholder="请输入用户名" />
                            </vort-form-item>
                            <vort-form-item label="邮箱" name="email" required>
                                <vort-input v-model="complexForm.email" placeholder="请输入邮箱" />
                            </vort-form-item>
                            <vort-form-item label="性别" name="gender">
                                <vort-radio-group v-model="complexForm.gender">
                                    <vort-radio v-for="option in genderOptions" :key="option.value" :value="option.value">
                                        {{ option.label }}
                                    </vort-radio>
                                </vort-radio-group>
                            </vort-form-item>
                            <vort-form-item label="爱好" name="hobbies">
                                <vort-checkbox-group v-model="complexForm.hobbies">
                                    <vort-checkbox v-for="option in hobbyOptions" :key="option.value" :value="option.value">
                                        {{ option.label }}
                                    </vort-checkbox>
                                </vort-checkbox-group>
                            </vort-form-item>
                            <vort-form-item name="agreement" :wrapper-col="{ offset: 6, span: 14 }">
                                <vort-checkbox v-model:checked="complexForm.agreement">
                                    我已阅读并同意 <a href="#" class="text-[var(--vort-primary)]">用户协议</a>
                                </vort-checkbox>
                            </vort-form-item>
                            <vort-form-item :wrapper-col="{ offset: 6, span: 14 }">
                                <vort-button variant="primary" html-type="submit">注册</vort-button>
                            </vort-form-item>
                        </vort-form>
                    </div>
                </DemoBox>

                <DemoBox title="Label 对齐方式" description="设置 label 标签的文本对齐方式。" :code="labelAlignCode">
                    <div class="demo-form-compare">
                        <div class="demo-form-container">
                            <h4 class="demo-form-subtitle">右对齐（默认）</h4>
                            <vort-form :model="leftAlignForm" label-align="right" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                                <vort-form-item label="用户名" name="username">
                                    <vort-input v-model="leftAlignForm.username" placeholder="请输入用户名" />
                                </vort-form-item>
                                <vort-form-item label="电子邮箱地址" name="email">
                                    <vort-input v-model="leftAlignForm.email" placeholder="请输入邮箱" />
                                </vort-form-item>
                            </vort-form>
                        </div>
                        <div class="demo-form-container">
                            <h4 class="demo-form-subtitle">左对齐</h4>
                            <vort-form :model="leftAlignForm" label-align="left" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                                <vort-form-item label="用户名" name="username">
                                    <vort-input v-model="leftAlignForm.username" placeholder="请输入用户名" />
                                </vort-form-item>
                                <vort-form-item label="电子邮箱地址" name="email">
                                    <vort-input v-model="leftAlignForm.email" placeholder="请输入邮箱" />
                                </vort-form-item>
                            </vort-form>
                        </div>
                    </div>
                </DemoBox>

                <DemoBox
                    title="Label 宽度"
                    description="通过 labelWidth 设置标签的宽度。可以设置固定值如 '100px'，也可以使用 'auto' 让所有标签自动按最长的对齐。"
                    :code="labelWidthCode"
                >
                    <div class="demo-form-compare">
                        <div class="demo-form-container">
                            <h4 class="demo-form-subtitle">固定宽度 (100px)</h4>
                            <vort-form :model="labelWidthForm" label-width="100px">
                                <vort-form-item label="用户名" name="username">
                                    <vort-input v-model="labelWidthForm.username" placeholder="请输入用户名" />
                                </vort-form-item>
                                <vort-form-item label="电子邮箱地址" name="email">
                                    <vort-input v-model="labelWidthForm.email" placeholder="请输入邮箱" />
                                </vort-form-item>
                                <vort-form-item label="手机号码" name="phoneNumber">
                                    <vort-input v-model="labelWidthForm.phoneNumber" placeholder="请输入手机号码" />
                                </vort-form-item>
                            </vort-form>
                        </div>
                        <div class="demo-form-container">
                            <h4 class="demo-form-subtitle">自动宽度 (auto)</h4>
                            <vort-form :model="labelWidthForm" label-width="auto">
                                <vort-form-item label="用户名" name="username">
                                    <vort-input v-model="labelWidthForm.username" placeholder="请输入用户名" />
                                </vort-form-item>
                                <vort-form-item label="电子邮箱地址" name="email">
                                    <vort-input v-model="labelWidthForm.email" placeholder="请输入邮箱" />
                                </vort-form-item>
                                <vort-form-item label="手机号码" name="phoneNumber">
                                    <vort-input v-model="labelWidthForm.phoneNumber" placeholder="请输入手机号码" />
                                </vort-form-item>
                            </vort-form>
                        </div>
                    </div>
                </DemoBox>
            </div>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">API</h2>

            <h3 class="demo-api-title">Form Props</h3>
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
                    <tr v-for="item in formPropsData" :key="item.prop">
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

            <h3 class="demo-api-title">Form Events</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>事件名</th>
                        <th>说明</th>
                        <th>回调参数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in formEventsData" :key="item.event">
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

            <h3 class="demo-api-title">Form Methods</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>方法名</th>
                        <th>说明</th>
                        <th>参数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in formMethodsData" :key="item.method">
                        <td>
                            <code>{{ item.method }}</code>
                        </td>
                        <td>{{ item.desc }}</td>
                        <td>
                            <code>{{ item.params }}</code>
                        </td>
                    </tr>
                </tbody>
            </table>

            <h3 class="demo-api-title">FormItem Props</h3>
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
                    <tr v-for="item in formItemPropsData" :key="item.prop">
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

.demo-form-container {
    max-width: 600px;
    width: 100%;
}

.demo-form-inline-container {
    width: 100%;
}

.demo-form-compare {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
}

.demo-form-subtitle {
    margin: 0 0 16px;
    font-size: 14px;
    font-weight: 500;
    color: var(--vort-text-secondary);
}
</style>
