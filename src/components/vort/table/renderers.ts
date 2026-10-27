/**
 * Table 渲染器组件
 * 用于渲染 TableColumn 的 slot 内容
 */
import { defineComponent, type PropType } from "vue";
import type { TableColumn, TableCellScope, TableHeaderScope } from "./types";

/**
 * 单元格渲染器
 * 用于渲染 TableColumn 的 default slot
 */
export const CellRenderer = defineComponent({
    name: "TableCellRenderer",
    props: {
        render: {
            type: Function as PropType<(scope: TableCellScope) => any>,
            required: true
        },
        value: {
            type: null,
            default: undefined
        },
        row: {
            type: Object,
            default: undefined
        },
        index: {
            type: Number,
            default: 0
        },
        column: {
            type: Object as PropType<TableColumn>,
            required: true
        }
    },
    setup(props) {
        return () =>
            props.render({
                value: props.value,
                row: props.row,
                index: props.index,
                column: props.column
            });
    }
});

/**
 * 列探测渲染器
 *
 * TableColumn 需要把默认插槽渲染一次才能发现嵌套的子列，此时没有真实行数据，只能传一个空对象。
 * 单元格模板经常直接读嵌套字段（row.attribute.name），拿到空对象就会抛错；把这次探测渲染隔离在
 * 子组件里，让 TableColumn 用 onErrorCaptured 吞掉它，不至于整列消失。真实单元格渲染走 CellRenderer，不受影响。
 */
export const ColumnSlotProbe = defineComponent({
    name: "VortTableColumnSlotProbe",
    props: {
        render: {
            type: Function as PropType<() => any>,
            required: true
        }
    },
    setup(props) {
        return () => props.render();
    }
});

/**
 * 表头渲染器
 * 用于渲染 TableColumn 的 header slot
 */
export const HeaderRenderer = defineComponent({
    name: "TableHeaderRenderer",
    props: {
        render: {
            type: Function as PropType<(scope: TableHeaderScope) => any>,
            required: true
        },
        column: {
            type: Object as PropType<TableColumn>,
            required: true
        }
    },
    setup(props) {
        return () => props.render({ column: props.column });
    }
});
