<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { TableColumnType, TableRowSelection } from "@/components/vort";
import DemoBox from "./components/DemoBox.vue";

// 基础数据类型
interface UserRecord {
    id: number;
    name: string;
    age: number;
    address: string;
    email?: string;
    status?: "active" | "inactive";
    tags?: string[];
    salary?: number;
}

// 基础列配置
const basicColumns: TableColumnType<UserRecord>[] = [
    { title: "姓名", dataIndex: "name", key: "name" },
    { title: "年龄", dataIndex: "age", key: "age" },
    { title: "住址", dataIndex: "address", key: "address" }
];

// 基础数据
const basicData: UserRecord[] = [
    { id: 1, name: "John Brown", age: 32, address: "New York No. 1 Lake Park" },
    { id: 2, name: "Jim Green", age: 42, address: "London No. 1 Lake Park" },
    { id: 3, name: "Joe Black", age: 28, address: "Sidney No. 1 Lake Park" }
];

// 排序列配置
const sortColumns: TableColumnType<UserRecord>[] = [
    { title: "姓名", dataIndex: "name", key: "name", sorter: true },
    { title: "年龄", dataIndex: "age", key: "age", sorter: (a, b) => a.age - b.age, defaultSortOrder: "ascend" },
    { title: "住址", dataIndex: "address", key: "address" }
];

// 排序数据
const sortData: UserRecord[] = [
    { id: 1, name: "John Brown", age: 32, address: "New York No. 1 Lake Park" },
    { id: 2, name: "Jim Green", age: 42, address: "London No. 1 Lake Park" },
    { id: 3, name: "Joe Black", age: 28, address: "Sidney No. 1 Lake Park" },
    { id: 4, name: "Alice Wang", age: 25, address: "Beijing No. 2 Lake Park" },
    { id: 5, name: "Bob Smith", age: 35, address: "Tokyo No. 3 Lake Park" }
];

// 固定表头/列数据
const fixedData: UserRecord[] = [];
for (let i = 1; i <= 50; i++) {
    fixedData.push({
        id: i,
        name: `User ${i}`,
        age: Math.floor(Math.random() * 40) + 20,
        address: `Address ${i}, Street ${Math.floor(Math.random() * 100)}, Building ${Math.floor(Math.random() * 50)}`,
        email: `user${i}@example.com`,
        salary: Math.floor(Math.random() * 50000) + 30000
    });
}

// ==================== 虚拟滚动数据 ====================
// 生成大数据量测试数据（延迟加载，避免阻塞页面初始渲染）
const virtualData = ref<UserRecord[]>([]);
const virtualDataCount = ref(1000);
const virtualDataLoading = ref(true);
const generateVirtualData = () => {
    virtualDataLoading.value = true;
    // 使用 setTimeout 避免阻塞主线程
    setTimeout(() => {
        const data: UserRecord[] = [];
        for (let i = 1; i <= virtualDataCount.value; i++) {
            data.push({
                id: i,
                name: `用户 ${i}`,
                age: Math.floor(Math.random() * 40) + 20,
                address: `地址 ${i}，街道 ${Math.floor(Math.random() * 100)} 号，${Math.floor(Math.random() * 50)} 栋`,
                email: `user${i}@example.com`,
                salary: Math.floor(Math.random() * 50000) + 30000
            });
        }
        virtualData.value = data;
        virtualDataLoading.value = false;
    }, 100);
};

// 延迟加载虚拟滚动数据
onMounted(() => {
    generateVirtualData();
});

// 虚拟滚动列配置
const virtualColumns: TableColumnType<UserRecord>[] = [
    { title: "ID", dataIndex: "id", key: "id", width: 80 },
    { title: "姓名", dataIndex: "name", key: "name", width: 120 },
    { title: "年龄", dataIndex: "age", key: "age", width: 80, align: "center" },
    { title: "住址", dataIndex: "address", key: "address" },
    { title: "邮箱", dataIndex: "email", key: "email", width: 180 }
];

// 虚拟滚动性能统计
const virtualRenderTime = ref(0);
const measureVirtualRender = () => {
    const start = performance.now();
    virtualData.value = [...virtualData.value]; // 触发重渲染
    requestAnimationFrame(() => {
        virtualRenderTime.value = Math.round(performance.now() - start);
    });
};

// 固定表头列配置
const fixedHeaderColumns: TableColumnType<UserRecord>[] = [
    { title: "ID", dataIndex: "id", key: "id", width: 80 },
    { title: "姓名", dataIndex: "name", key: "name", width: 120 },
    { title: "年龄", dataIndex: "age", key: "age", width: 80, sorter: true },
    { title: "住址", dataIndex: "address", key: "address", width: 300 },
    { title: "邮箱", dataIndex: "email", key: "email", width: 200 }
];

// 固定列配置
const fixedColumnColumns: TableColumnType<UserRecord>[] = [
    { title: "ID", dataIndex: "id", key: "id", width: 80, fixed: "left" },
    { title: "姓名", dataIndex: "name", key: "name", width: 120, fixed: "left" },
    { title: "年龄", dataIndex: "age", key: "age", width: 100, sorter: true },
    { title: "住址", dataIndex: "address", key: "address", width: 300 },
    { title: "邮箱", dataIndex: "email", key: "email", width: 200 },
    { title: "薪资", dataIndex: "salary", key: "salary", width: 120, sorter: true },
    { title: "操作", key: "action", slot: "action", width: 120, fixed: "right" }
];

// 处理排序变化
const handleSortChange = (pagination: any, filters: any, sorter: any) => {
    console.log("排序变化:", sorter);
};

// 带状态的列配置
const statusColumns: TableColumnType<UserRecord>[] = [
    { title: "姓名", dataIndex: "name", key: "name", width: 120 },
    { title: "年龄", dataIndex: "age", key: "age", width: 80, align: "center" },
    { title: "邮箱", dataIndex: "email", key: "email" },
    { title: "状态", dataIndex: "status", key: "status", slot: "status", width: 100, align: "center" },
    { title: "操作", key: "action", slot: "action", width: 150, align: "center" }
];

// 带状态的数据
const statusData: UserRecord[] = [
    { id: 1, name: "John Brown", age: 32, address: "New York", email: "john@example.com", status: "active" },
    { id: 2, name: "Jim Green", age: 42, address: "London", email: "jim@example.com", status: "inactive" },
    { id: 3, name: "Joe Black", age: 28, address: "Sidney", email: "joe@example.com", status: "active" },
    { id: 4, name: "Jack White", age: 36, address: "Dublin", email: "jack@example.com", status: "active" }
];

// 分页数据
const paginationData = ref<UserRecord[]>([]);
const generatePaginationData = () => {
    const data: UserRecord[] = [];
    for (let i = 1; i <= 86; i++) {
        data.push({
            id: i,
            name: `User ${i}`,
            age: Math.floor(Math.random() * 40) + 20,
            address: `Address ${i}, Street ${Math.floor(Math.random() * 100)}`
        });
    }
    paginationData.value = data;
};
generatePaginationData();

// 分页配置
const paginationConfig = ref({
    current: 1,
    pageSize: 10,
    total: 86,
    showPagination: true,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: true
});

// 行选择
const selectedRowKeys = ref<number[]>([]);
const rowSelection = computed<TableRowSelection<UserRecord>>(() => ({
    selectedRowKeys: selectedRowKeys.value,
    onChange: (keys, rows) => {
        selectedRowKeys.value = keys as number[];
        console.log("选中行:", keys, rows);
    }
}));

// 加载状态
const loading = ref(false);
const toggleLoading = () => {
    loading.value = true;
    setTimeout(() => {
        loading.value = false;
    }, 2000);
};

// 带操作的行选择
const actionSelectedKeys = ref<number[]>([]);
const actionRowSelection = computed<TableRowSelection<UserRecord>>(() => ({
    selectedRowKeys: actionSelectedKeys.value,
    onChange: (keys) => {
        actionSelectedKeys.value = keys as number[];
    },
    getCheckboxProps: (record) => ({
        disabled: record.status === "inactive"
    })
}));

// 事件处理（使用泛型支持多种记录类型）
const handleEdit = <T extends { id: number }>(record: T) => {
    console.log("编辑:", record);
};

const handleDelete = <T extends { id: number }>(record: T) => {
    console.log("删除:", record);
};

const handleChange = (pagination: { current: number; pageSize: number }) => {
    console.log("分页变化:", pagination);
    paginationConfig.value.current = pagination.current;
    paginationConfig.value.pageSize = pagination.pageSize;
};

// 示例代码
const basicCode = `<script setup>

const columns = [
    { title: "姓名", dataIndex: "name" },
    { title: "年龄", dataIndex: "age" },
    { title: "住址", dataIndex: "address" }
];

const dataSource = [
    { id: 1, name: "John Brown", age: 32, address: "New York" },
    { id: 2, name: "Jim Green", age: 42, address: "London" },
    { id: 3, name: "Joe Black", age: 28, address: "Sidney" }
];
<\/script>

<template>
    <vort-table :columns="columns" :data-source="dataSource" />
</template>`;

const borderedCode = `<template>
    <vort-table :columns="columns" :data-source="dataSource" bordered />
</template>`;

const stripeCode = `<template>
    <vort-table :columns="columns" :data-source="dataSource" stripe />
</template>`;

const sizeCode = `<template>
    <vort-table :columns="columns" :data-source="dataSource" size="large" />
    <vort-table :columns="columns" :data-source="dataSource" size="middle" />
    <vort-table :columns="columns" :data-source="dataSource" size="small" />
</template>`;

const loadingCode = `<script setup>
import { ref } from "vue";

const loading = ref(false);
<\/script>

<template>
    <vort-table :columns="columns" :data-source="dataSource" :loading="loading" />
</template>`;

const paginationCode = `<script setup>
import { ref } from "vue";

const paginationConfig = ref({
    current: 1,
    pageSize: 10,
    total: 86,
    showPagination: true,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: true
});

const handleChange = (pagination) => {
    paginationConfig.value.current = pagination.current;
    paginationConfig.value.pageSize = pagination.pageSize;
};
<\/script>

<template>
    <vort-table
        :columns="columns"
        :data-source="dataSource"
        :pagination="paginationConfig"
        @change="handleChange"
    />
</template>`;

const selectionCode = `<script setup>
import { ref, computed } from "vue";

const selectedRowKeys = ref([]);

const rowSelection = computed(() => ({
    selectedRowKeys: selectedRowKeys.value,
    onChange: (keys, rows) => {
        selectedRowKeys.value = keys;
        console.log("选中行:", keys, rows);
    }
}));
<\/script>

<template>
    <vort-table
        :columns="columns"
        :data-source="dataSource"
        :row-selection="rowSelection"
    />
</template>`;

const slotCode = `<script setup>
const columns = [
    { title: "姓名", dataIndex: "name" },
    { title: "状态", dataIndex: "status", slot: "status" },
    { title: "操作", key: "action", slot: "action" }
];
<\/script>

<template>
    <vort-table :columns="columns" :data-source="dataSource">
        <!-- 自定义状态列 -->
        <template #status="{ text }">
            <span :class="text === 'active' ? 'status-active' : 'status-inactive'">
                {{ text === 'active' ? '在线' : '离线' }}
            </span>
        </template>

        <!-- 自定义操作列 -->
        <template #action="{ record }">
            <vort-button variant="link" size="small">编辑</vort-button>
            <vort-button variant="link" size="small" danger>删除</vort-button>
        </template>
    </vort-table>
</template>`;

const emptyCode = `<template>
    <vort-table :columns="columns" :data-source="[]" />

    <!-- 自定义空状态 -->
    <vort-table :columns="columns" :data-source="[]">
        <template #empty>
            <div class="custom-empty">暂时没有数据哦~</div>
        </template>
    </vort-table>
</template>`;

const sortCode = `<script setup>
const columns = [
    { title: "姓名", dataIndex: "name", sorter: true },
    { title: "年龄", dataIndex: "age", sorter: (a, b) => a.age - b.age, defaultSortOrder: "ascend" },
    { title: "住址", dataIndex: "address" }
];

const handleChange = (pagination, filters, sorter) => {
    console.log("排序变化:", sorter);
};
<\/script>

<template>
    <vort-table
        :columns="columns"
        :data-source="dataSource"
        @change="handleChange"
    />
</template>`;

const fixedHeaderCode = `<script setup>
const columns = [
    { title: "ID", dataIndex: "id", width: 80 },
    { title: "姓名", dataIndex: "name", width: 120 },
    { title: "年龄", dataIndex: "age", width: 80 },
    { title: "住址", dataIndex: "address", width: 300 },
    { title: "邮箱", dataIndex: "email", width: 200 }
];
<\/script>

<template>
    <vort-table
        :columns="columns"
        :data-source="dataSource"
        :scroll="{ y: 300 }"
        :pagination="false"
    />
</template>`;

const fixedColumnCode = `<script setup>
const columns = [
    { title: "ID", dataIndex: "id", width: 80, fixed: "left" },
    { title: "姓名", dataIndex: "name", width: 120, fixed: "left" },
    { title: "年龄", dataIndex: "age", width: 100 },
    { title: "住址", dataIndex: "address", width: 300 },
    { title: "邮箱", dataIndex: "email", width: 200 },
    { title: "薪资", dataIndex: "salary", width: 120 },
    { title: "操作", key: "action", slot: "action", width: 120, fixed: "right" }
];
<\/script>

<template>
    <vort-table
        :columns="columns"
        :data-source="dataSource"
        :scroll="{ x: 1200, y: 300 }"
        :pagination="false"
    />
</template>`;

// TableColumn 子组件方式
const tableColumnCode = `<script setup>
import { ref } from "vue";

const dataSource = ref([
    { id: 1, name: "John Brown", age: 32, status: "active" },
    { id: 2, name: "Jim Green", age: 42, status: "inactive" },
    { id: 3, name: "Joe Black", age: 28, status: "active" }
]);

const handleEdit = (row) => {
    console.log("编辑:", row);
};
<\/script>

<template>
    <!-- Element Plus 风格：使用 TableColumn 子组件 -->
    <vort-table :data-source="dataSource" :pagination="false">
        <vort-table-column prop="name" label="姓名" />
        <vort-table-column prop="age" label="年龄" :width="100" align="center" />
        <vort-table-column prop="status" label="状态" :width="120">
            <template #default="{ row }">
                <span :class="row.status === 'active' ? 'status-active' : 'status-inactive'">
                    {{ row.status === "active" ? "在线" : "离线" }}
                </span>
            </template>
        </vort-table-column>
        <vort-table-column label="操作" :width="150">
            <template #default="{ row }">
                <vort-button variant="link" size="small" @click="handleEdit(row)">编辑</vort-button>
            </template>
        </vort-table-column>
    </vort-table>
</template>`;

// Props 表格数据
const propsData = [
    { prop: "columns", desc: "列配置", type: "TableColumn[]", default: "-" },
    { prop: "dataSource", desc: "数据源", type: "any[]", default: "[]" },
    { prop: "rowKey", desc: "行 key 的取值字段或函数", type: "string | ((record) => string | number)", default: "'id'" },
    { prop: "bordered", desc: "是否显示边框", type: "boolean", default: "false" },
    { prop: "stripe", desc: "是否显示斑马纹", type: "boolean", default: "false" },
    { prop: "size", desc: "表格尺寸", type: "'large' | 'middle' | 'small'", default: "'middle'" },
    { prop: "loading", desc: "是否加载中", type: "boolean", default: "false" },
    { prop: "pagination", desc: "分页配置，设为 false 关闭分页", type: "TablePagination | false", default: "{ current: 1, pageSize: 10 }" },
    { prop: "rowSelection", desc: "行选择配置", type: "TableRowSelection", default: "-" },
    { prop: "scroll", desc: "滚动配置", type: "{ x?: number | string, y?: number | string }", default: "-" },
    { prop: "showHeader", desc: "是否显示表头", type: "boolean", default: "true" },
    { prop: "emptyText", desc: "空状态文案", type: "string", default: "'暂无数据'" },
    { prop: "rowClassName", desc: "行类名", type: "string | ((record, index) => string)", default: "-" },
    { prop: "virtual", desc: "是否启用虚拟滚动（大数据量时建议开启）", type: "boolean", default: "false" },
    { prop: "virtualRowHeight", desc: "虚拟滚动行高估算值（像素）", type: "number", default: "根据 size 自动计算" },
    { prop: "virtualOverscan", desc: "虚拟滚动过扫描行数", type: "number", default: "5" }
];

// Column 类型说明
const columnPropsData = [
    { prop: "key", desc: "列唯一标识", type: "string", default: "-" },
    { prop: "dataIndex", desc: "列数据字段名", type: "string", default: "-" },
    { prop: "title", desc: "列标题", type: "string", default: "-" },
    { prop: "width", desc: "列宽度", type: "number | string", default: "-" },
    { prop: "align", desc: "对齐方式", type: "'left' | 'center' | 'right'", default: "'left'" },
    { prop: "fixed", desc: "固定列", type: "'left' | 'right'", default: "-" },
    { prop: "sorter", desc: "排序函数或开关", type: "boolean | ((a, b) => number)", default: "-" },
    { prop: "sortOrder", desc: "排序顺序（受控）", type: "'ascend' | 'descend' | null", default: "-" },
    { prop: "defaultSortOrder", desc: "默认排序顺序", type: "'ascend' | 'descend'", default: "-" },
    { prop: "slot", desc: "自定义渲染插槽名称", type: "string", default: "-" },
    { prop: "ellipsis", desc: "是否省略超长内容", type: "boolean", default: "false" },
    { prop: "className", desc: "单元格样式类名", type: "string", default: "-" },
    { prop: "headerClassName", desc: "表头样式类名", type: "string", default: "-" },
    { prop: "children", desc: "子列配置（用于多级表头）", type: "TableColumn[]", default: "-" }
];

// Pagination 类型说明
const paginationPropsData = [
    { prop: "current", desc: "当前页码", type: "number", default: "1" },
    { prop: "pageSize", desc: "每页条数", type: "number", default: "10" },
    { prop: "total", desc: "总条数", type: "number", default: "0" },
    { prop: "showPagination", desc: "是否显示分页", type: "boolean", default: "true" },
    { prop: "showSizeChanger", desc: "是否显示每页条数切换", type: "boolean", default: "false" },
    { prop: "showQuickJumper", desc: "是否显示快速跳转", type: "boolean", default: "false" },
    { prop: "showTotal", desc: "是否显示总数", type: "boolean | ((total, range) => string)", default: "false" },
    { prop: "pageSizeOptions", desc: "每页条数选项", type: "number[]", default: "[10, 20, 50, 100]" }
];

// RowSelection 类型说明
const rowSelectionPropsData = [
    { prop: "selectedRowKeys", desc: "选中项的 key 数组", type: "(string | number)[]", default: "[]" },
    { prop: "type", desc: "选择类型", type: "'checkbox' | 'radio'", default: "'checkbox'" },
    { prop: "fixed", desc: "是否固定选择列", type: "boolean", default: "false" },
    { prop: "onChange", desc: "选择回调", type: "(selectedRowKeys, selectedRows) => void", default: "-" },
    { prop: "onSelect", desc: "单行选择回调", type: "(record, selected, selectedRows) => void", default: "-" },
    { prop: "onSelectAll", desc: "全选回调", type: "(selected, selectedRows, changeRows) => void", default: "-" },
    { prop: "getCheckboxProps", desc: "获取 Checkbox 属性", type: "(record) => { disabled?: boolean }", default: "-" },
    { prop: "columnWidth", desc: "选择列宽度", type: "number | string", default: "'48px'" },
    { prop: "hideSelectAll", desc: "是否隐藏全选", type: "boolean", default: "false" }
];

// Events 表格数据
const eventsData = [
    { event: "change", desc: "分页、排序、筛选变化时触发", params: "(pagination, filters, sorter) => void" },
    { event: "update:selectedRowKeys", desc: "行选择变化时触发（v-model）", params: "(keys: (string | number)[]) => void" }
];

// Slots 表格数据
const slotsData = [
    { slot: "empty", desc: "自定义空状态" },
    { slot: "[dataIndex]", desc: "自定义单元格内容，参数：{ text, record, index, column }" },
    { slot: "header-[dataIndex]", desc: "自定义表头，参数：{ column }" }
];

// TableColumn 组件 Props
const tableColumnPropsData = [
    { prop: "prop", desc: "列数据字段名", type: "string", default: "-" },
    { prop: "label", desc: "列标题", type: "string", default: "-" },
    { prop: "width", desc: "列宽度", type: "number | string", default: "-" },
    { prop: "align", desc: "对齐方式", type: "'left' | 'center' | 'right'", default: "'left'" },
    { prop: "fixed", desc: "固定列", type: "'left' | 'right'", default: "-" },
    { prop: "sortable", desc: "是否可排序", type: "boolean | 'custom'", default: "-" },
    { prop: "sortMethod", desc: "自定义排序函数", type: "(a, b) => number", default: "-" },
    { prop: "defaultSort", desc: "默认排序顺序", type: "'ascend' | 'descend'", default: "-" },
    { prop: "ellipsis", desc: "是否省略超长内容", type: "boolean", default: "false" },
    { prop: "className", desc: "单元格样式类名", type: "string", default: "-" },
    { prop: "headerClassName", desc: "表头样式类名", type: "string", default: "-" }
];

// TableColumn 组件 Slots
const tableColumnSlotsData = [
    { slot: "default", desc: "自定义单元格内容，参数：{ value, row, index, column }；或嵌套子 TableColumn 实现多级表头" },
    { slot: "header", desc: "自定义表头，参数：{ column }" }
];

// ==================== 树形表格数据 ====================
interface TreeRecord {
    id: number;
    name: string;
    description: string;
    hasChildren?: boolean;
    children?: TreeRecord[];
}

// 树形表格数据（带子节点）
const treeData = ref<TreeRecord[]>([
    {
        id: 1,
        name: "系统管理",
        description: "系统相关功能管理",
        hasChildren: true
    },
    {
        id: 2,
        name: "用户管理",
        description: "用户相关功能管理",
        hasChildren: true
    },
    {
        id: 3,
        name: "日志管理",
        description: "系统日志记录",
        hasChildren: false
    }
]);

// 模拟懒加载子节点
const loadTreeChildren = async (row: TreeRecord): Promise<TreeRecord[]> => {
    // 模拟 API 请求延迟
    await new Promise((resolve) => setTimeout(resolve, 800));

    // 模拟返回子节点数据
    if (row.id === 1) {
        return [
            { id: 11, name: "菜单管理", description: "管理系统菜单", hasChildren: true },
            { id: 12, name: "权限管理", description: "管理系统权限", hasChildren: false },
            { id: 13, name: "角色管理", description: "管理系统角色", hasChildren: false }
        ];
    } else if (row.id === 2) {
        return [
            { id: 21, name: "用户列表", description: "查看所有用户", hasChildren: false },
            { id: 22, name: "用户分组", description: "管理用户分组", hasChildren: true }
        ];
    } else if (row.id === 11) {
        return [
            { id: 111, name: "一级菜单", description: "顶级菜单管理", hasChildren: false },
            { id: 112, name: "二级菜单", description: "子菜单管理", hasChildren: false }
        ];
    } else if (row.id === 22) {
        return [
            { id: 221, name: "VIP 用户", description: "VIP 用户组", hasChildren: false },
            { id: 222, name: "普通用户", description: "普通用户组", hasChildren: false }
        ];
    }
    return [];
};

// 树形表格 ref
const treeTableRef = ref();

// 树形表格示例代码
const treeTableCode = `<script setup>
import { ref } from "vue";

interface TreeRecord {
    id: number;
    name: string;
    description: string;
    hasChildren?: boolean;
}

const treeData = ref([
    { id: 1, name: "系统管理", description: "系统相关功能管理", hasChildren: true },
    { id: 2, name: "用户管理", description: "用户相关功能管理", hasChildren: true },
    { id: 3, name: "日志管理", description: "系统日志记录", hasChildren: false }
]);

// 懒加载子节点
const loadTreeChildren = async (row) => {
    // 模拟 API 请求
    const result = await api.getChildren(row.id);
    return result.records;
};

const tableRef = ref();

// 刷新指定节点的子节点
const refreshChildren = (parentId) => {
    tableRef.value?.refreshChildren(parentId);
};
<\/script>

<template>
    <vort-table
        ref="tableRef"
        :data-source="treeData"
        :load-children="loadTreeChildren"
        :pagination="false"
        row-key="id"
    >
        <vort-table-column prop="name" label="名称" :width="250" />
        <vort-table-column prop="description" label="描述" />
        <vort-table-column label="操作" :width="150">
            <template #default="{ row }">
                <vort-button variant="link" size="small">编辑</vort-button>
            </template>
        </vort-table-column>
    </vort-table>
</template>`;

// 树形表格 Props
const treePropsData = [
    {
        prop: "treeProps",
        desc: "树形结构配置",
        type: "{ children?: string, hasChildren?: string }",
        default: "{ children: 'children', hasChildren: 'hasChildren' }"
    },
    { prop: "loadChildren", desc: "懒加载子节点方法", type: "(row) => Promise<T[]>", default: "-" },
    { prop: "defaultExpandedRowKeys", desc: "默认展开的行 keys", type: "(string | number)[]", default: "-" },
    { prop: "expandedRowKeys", desc: "受控展开的行 keys（v-model）", type: "(string | number)[]", default: "-" },
    { prop: "expandRowByClick", desc: "是否点击行展开", type: "boolean", default: "false" },
    { prop: "indent", desc: "树形缩进（px）", type: "number", default: "30" }
];

// 树形表格方法
const treeMethodsData = [
    { method: "refreshChildren(parentKey)", desc: "刷新指定节点的子节点" },
    { method: "expandRow(key)", desc: "展开指定行" },
    { method: "collapseRow(key)", desc: "折叠指定行" },
    { method: "getExpandedRowKeys()", desc: "获取当前展开的行 keys" }
];

// ==================== 多级表头数据 ====================
interface MultiHeaderRecord {
    id: number;
    date: string;
    name: string;
    state: string;
    city: string;
    address: string;
    zip: string;
}

// 多级表头列配置
const multiHeaderColumns: TableColumnType<MultiHeaderRecord>[] = [
    { title: "日期", dataIndex: "date", key: "date", width: 150 },
    {
        title: "配送信息",
        key: "delivery",
        children: [
            { title: "姓名", dataIndex: "name", key: "name", width: 120 },
            {
                title: "地址信息",
                key: "addressInfo",
                children: [
                    { title: "省份", dataIndex: "state", key: "state", width: 120 },
                    { title: "城市", dataIndex: "city", key: "city", width: 120 },
                    { title: "详细地址", dataIndex: "address", key: "address" },
                    { title: "邮编", dataIndex: "zip", key: "zip", width: 100 }
                ]
            }
        ]
    }
];

// 多级表头数据
const multiHeaderData: MultiHeaderRecord[] = [
    { id: 1, date: "2024-01-15", name: "王小明", state: "广东省", city: "深圳市", address: "南山区科技园路1号", zip: "518000" },
    { id: 2, date: "2024-01-16", name: "李小红", state: "浙江省", city: "杭州市", address: "西湖区文三路200号", zip: "310000" },
    { id: 3, date: "2024-01-17", name: "张大伟", state: "北京市", city: "北京市", address: "朝阳区建国路88号", zip: "100000" },
    { id: 4, date: "2024-01-18", name: "刘芳芳", state: "上海市", city: "上海市", address: "浦东新区陆家嘴环路1000号", zip: "200000" }
];

// 多级表头示例代码（columns prop 方式）
const multiHeaderCode = `<script setup>
import type { TableColumnType } from "@/components/vort";

// 多级表头列配置 - 使用 children 属性定义子列
const columns: TableColumnType[] = [
    { title: "日期", dataIndex: "date", width: 150 },
    {
        title: "配送信息",
        key: "delivery",
        children: [
            { title: "姓名", dataIndex: "name", width: 120 },
            {
                title: "地址信息",
                key: "addressInfo",
                children: [
                    { title: "省份", dataIndex: "state", width: 120 },
                    { title: "城市", dataIndex: "city", width: 120 },
                    { title: "详细地址", dataIndex: "address" },
                    { title: "邮编", dataIndex: "zip", width: 100 }
                ]
            }
        ]
    }
];
<\/script>

<template>
    <vort-table :columns="columns" :data-source="dataSource" bordered />
</template>`;

// 多级表头示例代码（TableColumn 嵌套方式，类似 Element Plus）
const multiHeaderColumnCode = `<script setup>
const dataSource = [
    { id: 1, date: "2024-01-15", name: "王小明", state: "广东省", city: "深圳市", address: "南山区科技园路1号", zip: "518000" },
    // ...
];
<\/script>

<template>
    <!-- Element Plus 风格：使用 TableColumn 嵌套 -->
    <vort-table :data-source="dataSource" bordered :pagination="false">
        <vort-table-column prop="date" label="日期" :width="150" />
        <vort-table-column label="配送信息">
            <vort-table-column prop="name" label="姓名" :width="120" />
            <vort-table-column label="地址信息">
                <vort-table-column prop="state" label="省份" :width="120" />
                <vort-table-column prop="city" label="城市" :width="120" />
                <vort-table-column prop="address" label="详细地址" />
                <vort-table-column prop="zip" label="邮编" :width="100" />
            </vort-table-column>
        </vort-table-column>
    </vort-table>
</template>`;

// 虚拟滚动示例代码
const virtualScrollCode = `<script setup>
import { ref } from "vue";

// 生成大数据量（10000 条）
const bigData = ref([]);
for (let i = 1; i <= 10000; i++) {
    bigData.value.push({
        id: i,
        name: \`用户 \${i}\`,
        age: Math.floor(Math.random() * 40) + 20,
        address: \`地址 \${i}\`
    });
}

const columns = [
    { title: "ID", dataIndex: "id", width: 80 },
    { title: "姓名", dataIndex: "name", width: 120 },
    { title: "年龄", dataIndex: "age", width: 80 },
    { title: "住址", dataIndex: "address" }
];
<\/script>

<template>
    <!-- 启用虚拟滚动，轻松渲染万级数据 -->
    <vort-table
        :columns="columns"
        :data-source="bigData"
        :scroll="{ y: 400 }"
        :pagination="false"
        virtual
        :virtual-row-height="48"
    />
</template>`;
</script>

<template>
    <div class="demo-page">
        <header class="demo-page-header">
            <h1 class="demo-page-title">Table 表格</h1>
            <p class="demo-page-desc">展示行列数据。</p>
        </header>

        <section class="demo-page-section">
            <h2 class="demo-section-title">何时使用</h2>
            <ul class="demo-section-list">
                <li>当有大量结构化的数据需要展现时；</li>
                <li>当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时。</li>
            </ul>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">代码演示</h2>

            <div class="demo-grid">
                <!-- 基本使用 -->
                <DemoBox title="基本使用" description="简单的表格展示。" :code="basicCode">
                    <vort-table :columns="basicColumns" :data-source="basicData" :pagination="false" />
                </DemoBox>

                <!-- 带边框 -->
                <DemoBox title="带边框" description="添加 bordered 属性可显示带边框的表格。" :code="borderedCode">
                    <vort-table :columns="basicColumns" :data-source="basicData" bordered :pagination="false" />
                </DemoBox>

                <!-- 斑马纹 -->
                <DemoBox title="斑马纹" description="使用 stripe 属性可以显示斑马纹效果。" :code="stripeCode">
                    <vort-table :columns="basicColumns" :data-source="basicData" stripe :pagination="false" />
                </DemoBox>

                <!-- 三种尺寸 -->
                <DemoBox title="三种尺寸" description="表格有三种尺寸：大、中（默认）、小。" :code="sizeCode">
                    <div class="demo-table-sizes">
                        <div class="demo-table-size-item">
                            <h4>Large</h4>
                            <vort-table :columns="basicColumns" :data-source="basicData" size="large" :pagination="false" />
                        </div>
                        <div class="demo-table-size-item">
                            <h4>Middle（默认）</h4>
                            <vort-table :columns="basicColumns" :data-source="basicData" size="middle" :pagination="false" />
                        </div>
                        <div class="demo-table-size-item">
                            <h4>Small</h4>
                            <vort-table :columns="basicColumns" :data-source="basicData" size="small" :pagination="false" />
                        </div>
                    </div>
                </DemoBox>

                <!-- 加载状态 -->
                <DemoBox title="加载状态" description="设置 loading 属性显示加载中状态。" :code="loadingCode">
                    <div class="demo-table-loading">
                        <vort-button variant="primary" @click="toggleLoading" style="margin-bottom: 16px"> 切换加载状态 </vort-button>
                        <vort-table :columns="basicColumns" :data-source="basicData" :loading="loading" :pagination="false" />
                    </div>
                </DemoBox>

                <!-- 分页 -->
                <DemoBox title="分页" description="配置 pagination 属性可实现分页功能。" :code="paginationCode">
                    <vort-table :columns="basicColumns" :data-source="paginationData" :pagination="paginationConfig" @change="handleChange" />
                </DemoBox>

                <!-- 行选择 -->
                <DemoBox title="行选择" description="配置 rowSelection 属性可实现行选择功能。" :code="selectionCode">
                    <div class="demo-table-selection">
                        <div class="demo-selection-info" v-if="selectedRowKeys.length > 0">
                            已选择 {{ selectedRowKeys.length }} 项
                            <vort-button variant="link" size="small" @click="selectedRowKeys = []">清空</vort-button>
                        </div>
                        <vort-table :columns="basicColumns" :data-source="basicData" :row-selection="rowSelection" :pagination="false" />
                    </div>
                </DemoBox>

                <!-- 自定义列渲染 -->
                <DemoBox title="自定义列渲染" description="通过插槽自定义单元格内容，如状态标签、操作按钮等。" :code="slotCode">
                    <vort-table :columns="statusColumns" :data-source="statusData" :row-selection="actionRowSelection" :pagination="false">
                        <!-- 自定义状态列 -->
                        <template #status="{ text }">
                            <span :class="['status-tag', text === 'active' ? 'status-active' : 'status-inactive']">
                                {{ text === "active" ? "在线" : "离线" }}
                            </span>
                        </template>

                        <!-- 自定义操作列 -->
                        <template #action="{ record }">
                            <vort-button variant="link" size="small" @click="handleEdit(record)">编辑</vort-button>
                            <vort-button variant="link" size="small" danger @click="handleDelete(record)">删除</vort-button>
                        </template>
                    </vort-table>
                </DemoBox>

                <!-- 空状态 -->
                <DemoBox title="空状态" description="数据为空时显示空状态。" :code="emptyCode">
                    <vort-table :columns="basicColumns" :data-source="[]" :pagination="false" />
                </DemoBox>

                <!-- 排序 -->
                <DemoBox
                    title="排序"
                    description="设置 sorter 属性开启列排序功能。点击表头可切换排序状态（升序/降序/无排序）。支持传入自定义排序函数或设为 true 使用默认排序。"
                    :code="sortCode"
                >
                    <vort-table :columns="sortColumns" :data-source="sortData" :pagination="false" @change="handleSortChange" />
                </DemoBox>

                <!-- 多级表头（columns 配置方式） -->
                <DemoBox
                    title="多级表头（columns 配置方式）"
                    description="通过在列配置中设置 children 属性可实现多级表头。子列会自动计算 colspan 和 rowspan，适用于复杂数据结构的展示。"
                    :code="multiHeaderCode"
                >
                    <vort-table :columns="multiHeaderColumns" :data-source="multiHeaderData" bordered :pagination="false" />
                </DemoBox>

                <!-- 多级表头（TableColumn 嵌套方式） -->
                <DemoBox
                    title="多级表头（TableColumn 嵌套方式）"
                    description="类似 Element Plus 的用法，通过 TableColumn 组件嵌套实现多级表头。这种方式更符合 Vue 的组件化思想，每个列的配置更加直观。"
                    :code="multiHeaderColumnCode"
                >
                    <vort-table :data-source="multiHeaderData" bordered :pagination="false">
                        <vort-table-column prop="date" label="日期" :width="150" />
                        <vort-table-column label="配送信息">
                            <vort-table-column prop="name" label="姓名" :width="120" />
                            <vort-table-column label="地址信息">
                                <vort-table-column prop="state" label="省份" :width="120" />
                                <vort-table-column prop="city" label="城市" :width="120" />
                                <vort-table-column prop="address" label="详细地址" />
                                <vort-table-column prop="zip" label="邮编" :width="100" />
                            </vort-table-column>
                        </vort-table-column>
                    </vort-table>
                </DemoBox>

                <!-- 固定表头 -->
                <DemoBox title="固定表头" description="设置 scroll.y 可以固定表头，表体滚动时表头保持不动。" :code="fixedHeaderCode">
                    <vort-table :columns="fixedHeaderColumns" :data-source="fixedData" :scroll="{ y: 300 }" :pagination="false" />
                </DemoBox>

                <!-- 固定列 -->
                <DemoBox title="固定列" description="对于列数很多的数据，可以使用 fixed 属性固定前后的列。横向滚动时固定列保持不动。" :code="fixedColumnCode">
                    <vort-table :columns="fixedColumnColumns" :data-source="fixedData.slice(0, 10)" :scroll="{ x: 1200, y: 300 }" :pagination="false">
                        <template #action="{ record }">
                            <vort-button variant="link" size="small" @click="handleEdit(record)">编辑</vort-button>
                        </template>
                    </vort-table>
                </DemoBox>

                <!-- 虚拟滚动 -->
                <DemoBox
                    title="虚拟滚动（大数据量）"
                    description="当数据量很大时，可以启用虚拟滚动来提升性能。虚拟滚动只渲染可视区域的行，滚动时动态更新，轻松处理万级数据。基于 @tanstack/vue-virtual 实现。"
                    :code="virtualScrollCode"
                >
                    <div class="virtual-demo-header">
                        <div class="virtual-demo-stats">
                            <span class="virtual-stat">
                                <strong>{{ virtualData.length.toLocaleString() }}</strong> 条数据
                            </span>
                            <span class="virtual-stat">
                                渲染时间: <strong>{{ virtualRenderTime }}</strong> ms
                            </span>
                        </div>
                        <div class="virtual-demo-actions">
                            <vort-select
                                v-model:value="virtualDataCount"
                                :options="[
                                    { label: '1,000 条', value: 1000 },
                                    { label: '5,000 条', value: 5000 },
                                    { label: '10,000 条', value: 10000 },
                                    { label: '50,000 条', value: 50000 }
                                ]"
                                size="small"
                                style="width: 120px"
                                @change="generateVirtualData"
                            />
                            <vort-button size="small" @click="measureVirtualRender" :disabled="virtualDataLoading">测试渲染性能</vort-button>
                        </div>
                    </div>
                    <vort-table
                        :columns="virtualColumns"
                        :data-source="virtualData"
                        :scroll="{ y: 400 }"
                        :pagination="false"
                        :loading="virtualDataLoading"
                        virtual
                        :virtual-row-height="48"
                    />
                </DemoBox>

                <!-- TableColumn 子组件方式 -->
                <DemoBox
                    title="TableColumn 子组件方式（Element Plus 风格）"
                    description="除了通过 columns prop 配置列，还支持使用 TableColumn 子组件的方式。这种方式更符合 Vue 的组件化思想，每个列的配置更加独立清晰。"
                    :code="tableColumnCode"
                >
                    <vort-table :data-source="statusData" :pagination="false">
                        <vort-table-column prop="name" label="姓名" />
                        <vort-table-column prop="age" label="年龄" :width="100" align="center" />
                        <vort-table-column prop="status" label="状态" :width="120">
                            <template #default="{ row }: { row: UserRecord }">
                                <span :class="['status-tag', row.status === 'active' ? 'status-active' : 'status-inactive']">
                                    {{ row.status === "active" ? "在线" : "离线" }}
                                </span>
                            </template>
                        </vort-table-column>
                        <vort-table-column label="操作" :width="150">
                            <template #default="{ row }: { row: UserRecord }">
                                <vort-button variant="link" size="small" @click="handleEdit(row)">编辑</vort-button>
                                <vort-button variant="link" size="small" danger @click="handleDelete(row)">删除</vort-button>
                            </template>
                        </vort-table-column>
                    </vort-table>
                </DemoBox>

                <!-- 树形表格 -->
                <DemoBox
                    title="树形表格（懒加载）"
                    description="通过设置 loadChildren 属性实现树形数据的懒加载展开。点击展开图标会调用 loadChildren 方法加载子节点。适用于层级较深或数据量大的树形数据展示。"
                    :code="treeTableCode"
                >
                    <vort-table ref="treeTableRef" :data-source="treeData" :load-children="loadTreeChildren" :pagination="false" row-key="id">
                        <vort-table-column prop="name" label="名称" :width="280" />
                        <vort-table-column prop="description" label="描述" />
                        <vort-table-column label="操作" :width="150">
                            <template #default="{ row }: { row: TreeRecord }">
                                <vort-button variant="link" size="small" @click="handleEdit(row)">编辑</vort-button>
                                <vort-button variant="link" size="small" danger @click="handleDelete(row)">删除</vort-button>
                            </template>
                        </vort-table-column>
                    </vort-table>
                </DemoBox>
            </div>
        </section>

        <section class="demo-page-section">
            <h2 class="demo-section-title">API</h2>

            <h3 class="demo-api-title">Table Props</h3>
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

            <h3 class="demo-api-title">TableColumn</h3>
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
                    <tr v-for="item in columnPropsData" :key="item.prop">
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

            <h3 class="demo-api-title">TablePagination</h3>
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
                    <tr v-for="item in paginationPropsData" :key="item.prop">
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

            <h3 class="demo-api-title">TableRowSelection</h3>
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
                    <tr v-for="item in rowSelectionPropsData" :key="item.prop">
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
                    <tr v-for="item in eventsData" :key="item.event">
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

            <h3 class="demo-api-title">Slots</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>插槽名</th>
                        <th>说明</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in slotsData" :key="item.slot">
                        <td>
                            <code>{{ item.slot }}</code>
                        </td>
                        <td>{{ item.desc }}</td>
                    </tr>
                </tbody>
            </table>

            <h3 class="demo-api-title">TableColumn Props（子组件方式）</h3>
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
                    <tr v-for="item in tableColumnPropsData" :key="item.prop">
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

            <h3 class="demo-api-title">TableColumn Slots（子组件方式）</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>插槽名</th>
                        <th>说明</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in tableColumnSlotsData" :key="item.slot">
                        <td>
                            <code>{{ item.slot }}</code>
                        </td>
                        <td>{{ item.desc }}</td>
                    </tr>
                </tbody>
            </table>

            <h3 class="demo-api-title">树形表格 Props</h3>
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
                    <tr v-for="item in treePropsData" :key="item.prop">
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

            <h3 class="demo-api-title">树形表格方法（通过 ref 调用）</h3>
            <table class="demo-api-table">
                <thead>
                    <tr>
                        <th>方法</th>
                        <th>说明</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in treeMethodsData" :key="item.method">
                        <td>
                            <code>{{ item.method }}</code>
                        </td>
                        <td>{{ item.desc }}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>

<style scoped>
/* 特有样式 */

.demo-table-sizes {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.demo-table-size-item h4 {
    margin: 0 0 12px;
    font-size: 14px;
    font-weight: 500;
    color: var(--vort-text-secondary);
}

.demo-table-loading {
    display: flex;
    flex-direction: column;
}

.demo-table-selection {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.demo-selection-info {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: var(--vort-primary-bg);
    border-radius: 6px;
    font-size: 14px;
    color: var(--vort-text);
}

/* 状态标签 */
.status-tag {
    display: inline-block;
    padding: 2px 8px;
    font-size: 12px;
    border-radius: 4px;
}

.status-active {
    color: var(--vort-success);
    background: var(--vort-success-bg);
}

.status-inactive {
    color: var(--vort-text-tertiary);
    background: rgba(0, 0, 0, 0.04);
}

/* 虚拟滚动演示样式 */
.virtual-demo-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding: 12px 16px;
    background: linear-gradient(135deg, var(--vort-primary-bg) 0%, transparent 100%);
    border-radius: 8px;
}

.virtual-demo-stats {
    display: flex;
    gap: 24px;
}

.virtual-stat {
    font-size: 14px;
    color: var(--vort-text-secondary);
}

.virtual-stat strong {
    color: var(--vort-primary);
    font-weight: 600;
}

.virtual-demo-actions {
    display: flex;
    gap: 8px;
}
</style>
