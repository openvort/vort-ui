/**
 * Vort UI 公共组件解析器。
 *
 * 解析器只负责通用组件，业务组件（例如 Admin 的 vort-biz/VortIcon）必须
 * 由消费方自行追加 resolver。所有组件从公共入口导入，避免把包内目录
 * 暴露给应用或让自动导入依赖源码别名。
 */
const componentMap: Record<string, string> = {
    VortConfigProvider: "VortConfigProvider",
    VortAnchor: "Anchor",
    VortAnchorLink: "AnchorLink",
    VortAutoComplete: "AutoComplete",
    VortButton: "Button",
    VortCard: "Card",
    VortInput: "Input",
    VortInputNumber: "InputNumber",
    VortInputPassword: "InputPassword",
    VortInputSearch: "InputSearch",
    VortTextarea: "Textarea",
    VortCheckbox: "Checkbox",
    VortCheckboxGroup: "CheckboxGroup",
    VortRadio: "Radio",
    VortRadioGroup: "RadioGroup",
    VortRadioButton: "RadioButton",
    VortSelect: "Select",
    VortSelectOption: "SelectOption",
    VortCascader: "Cascader",
    VortSwitch: "Switch",
    VortDialog: "Dialog",
    VortDivider: "Divider",
    VortDrawer: "Drawer",
    VortDropdown: "Dropdown",
    VortDropdownButton: "DropdownButton",
    VortDropdownMenuItem: "DropdownMenuItem",
    VortDropdownMenuSeparator: "DropdownMenuSeparator",
    VortDropdownMenuLabel: "DropdownMenuLabel",
    VortDropdownMenuGroup: "DropdownMenuGroup",
    VortDropdownMenuSub: "DropdownMenuSub",
    VortDropdownMenuCheckboxItem: "DropdownMenuCheckboxItem",
    VortDropdownMenuRadioGroup: "DropdownMenuRadioGroup",
    VortDropdownMenuRadioItem: "DropdownMenuRadioItem",
    VortAlert: "Alert",
    VortBadge: "Badge",
    VortBadgeRibbon: "BadgeRibbon",
    VortStatusDot: "StatusDot",
    VortForm: "Form",
    VortFormItem: "FormItem",
    VortRow: "Row",
    VortCol: "Col",
    VortTable: "Table",
    VortTableColumn: "TableColumn",
    VortPagination: "Pagination",
    VortImage: "Image",
    VortImagePreviewGroup: "ImagePreviewGroup",
    VortPopover: "Popover",
    VortPopconfirm: "Popconfirm",
    VortResult: "Result",
    VortTooltip: "Tooltip",
    VortTag: "Tag",
    VortCheckableTag: "CheckableTag",
    VortDraggableTags: "DraggableTags",
    VortDatePicker: "DatePicker",
    VortRangePicker: "RangePicker",
    VortTimePicker: "TimePicker",
    VortUpload: "Upload",
    VortUploadDragger: "UploadDragger",
    VortTabs: "Tabs",
    VortTabPane: "TabPane",
    VortScrollbar: "Scrollbar",
    VortSlider: "Slider",
    VortColorPicker: "ColorPicker",
    VortSteps: "Steps",
    VortSpin: "Spin",
    VortSkeleton: "Skeleton",
    VortSkeletonAvatar: "SkeletonAvatar",
    VortSkeletonButton: "SkeletonButton",
    VortSkeletonInput: "SkeletonInput",
    VortSkeletonImage: "SkeletonImage",
    VortSkeletonNode: "SkeletonNode",
    VortStatistic: "Statistic",
    VortStatisticCountdown: "StatisticCountdown",
    VortTimeline: "Timeline",
    VortTimelineItem: "TimelineItem",
    VortSegmented: "Segmented",
    VortMenu: "Menu",
    VortMenuItem: "MenuItem",
    VortSubMenu: "SubMenu",
    VortMenuItemGroup: "MenuItemGroup",
    VortMenuDivider: "MenuDivider"
};

export const vortComponentNames = Object.keys(componentMap);

/**
 * 与 unplugin-vue-components 兼容的解析结果；保持 resolver 声明自包含，
 * 运行时组件包不需要反向依赖构建插件的类型声明。
 */
export interface VortResolverResult {
    name: string;
    from: string;
}

export interface VortResolverObject {
    type: "component";
    resolve: (name: string) => VortResolverResult | undefined;
}

export function VortResolver(): VortResolverObject {
    return {
        type: "component",
        resolve: (name: string) => {
            const exportName = componentMap[name];
            return exportName
                ? {
                      name: exportName,
                      from: "@openvort/vort-ui"
                  }
                : undefined;
        }
    };
}
