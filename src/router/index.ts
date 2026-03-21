import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/components",
    },
    {
      path: "/components",
      component: () => import("../views/demo/DemoLayout.vue"),
      children: [
        {
          path: "",
          redirect: "/components/introduction",
        },
        {
          path: "alert",
          component: () => import("../views/demo/AlertDemo.vue"),
        },
        {
          path: "anchor",
          component: () => import("../views/demo/AnchorDemo.vue"),
        },
        {
          path: "auto-complete",
          component: () => import("../views/demo/AutoCompleteDemo.vue"),
        },
        {
          path: "badge",
          component: () => import("../views/demo/BadgeDemo.vue"),
        },
        {
          path: "button",
          component: () => import("../views/demo/ButtonDemo.vue"),
        },
        {
          path: "card",
          component: () => import("../views/demo/CardDemo.vue"),
        },
        {
          path: "cascader",
          component: () => import("../views/demo/CascaderDemo.vue"),
        },
        {
          path: "checkbox",
          component: () => import("../views/demo/CheckboxDemo.vue"),
        },
        {
          path: "color-picker",
          component: () => import("../views/demo/ColorPickerDemo.vue"),
        },
        {
          path: "config-provider",
          component: () => import("../views/demo/ConfigProviderDemo.vue"),
        },
        {
          path: "date-picker",
          component: () => import("../views/demo/DatePickerDemo.vue"),
        },
        {
          path: "dialog",
          component: () => import("../views/demo/DialogDemo.vue"),
        },
        {
          path: "divider",
          component: () => import("../views/demo/DividerDemo.vue"),
        },
        {
          path: "drawer",
          component: () => import("../views/demo/DrawerDemo.vue"),
        },
        {
          path: "dropdown",
          component: () => import("../views/demo/DropdownDemo.vue"),
        },
        {
          path: "form",
          component: () => import("../views/demo/FormDemo.vue"),
        },
        {
          path: "grid",
          component: () => import("../views/demo/GridDemo.vue"),
        },
        {
          path: "icon",
          component: () => import("../views/demo/IconDemo.vue"),
        },
        {
          path: "image",
          component: () => import("../views/demo/ImageDemo.vue"),
        },
        {
          path: "input",
          component: () => import("../views/demo/InputDemo.vue"),
        },
        {
          path: "input-number",
          component: () => import("../views/demo/InputNumberDemo.vue"),
        },
        {
          path: "installation",
          component: () => import("../views/demo/InstallationDemo.vue"),
        },
        {
          path: "introduction",
          component: () => import("../views/demo/IntroductionDemo.vue"),
        },
        {
          path: "menu",
          component: () => import("../views/demo/MenuDemo.vue"),
        },
        {
          path: "message",
          component: () => import("../views/demo/MessageDemo.vue"),
        },
        {
          path: "notification",
          component: () => import("../views/demo/NotificationDemo.vue"),
        },
        {
          path: "pagination",
          component: () => import("../views/demo/PaginationDemo.vue"),
        },
        {
          path: "popconfirm",
          component: () => import("../views/demo/PopconfirmDemo.vue"),
        },
        {
          path: "popover",
          component: () => import("../views/demo/PopoverDemo.vue"),
        },
        {
          path: "radio",
          component: () => import("../views/demo/RadioDemo.vue"),
        },
        {
          path: "scrollbar",
          component: () => import("../views/demo/ScrollbarDemo.vue"),
        },
        {
          path: "segmented",
          component: () => import("../views/demo/SegmentedDemo.vue"),
        },
        {
          path: "select",
          component: () => import("../views/demo/SelectDemo.vue"),
        },
        {
          path: "skeleton",
          component: () => import("../views/demo/SkeletonDemo.vue"),
        },
        {
          path: "slider",
          component: () => import("../views/demo/SliderDemo.vue"),
        },
        {
          path: "spin",
          component: () => import("../views/demo/SpinDemo.vue"),
        },
        {
          path: "statistic",
          component: () => import("../views/demo/StatisticDemo.vue"),
        },
        {
          path: "steps",
          component: () => import("../views/demo/StepsDemo.vue"),
        },
        {
          path: "switch",
          component: () => import("../views/demo/SwitchDemo.vue"),
        },
        {
          path: "table",
          component: () => import("../views/demo/TableDemo.vue"),
        },
        {
          path: "tabs",
          component: () => import("../views/demo/TabsDemo.vue"),
        },
        {
          path: "tag",
          component: () => import("../views/demo/TagDemo.vue"),
        },
        {
          path: "time-picker",
          component: () => import("../views/demo/TimePickerDemo.vue"),
        },
        {
          path: "timeline",
          component: () => import("../views/demo/TimelineDemo.vue"),
        },
        {
          path: "tooltip",
          component: () => import("../views/demo/TooltipDemo.vue"),
        },
        {
          path: "upload",
          component: () => import("../views/demo/UploadDemo.vue"),
        },
      ],
    },
  ],
});
