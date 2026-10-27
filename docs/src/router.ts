import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import DemoLayout from "./views/demo/DemoLayout.vue";
import { demoPages } from "./demo-catalog";

const demoModules = import.meta.glob("./views/demo/*Demo.vue");

const children: RouteRecordRaw[] = demoPages.map(({ path, file, title }) => {
    const component = demoModules[`./views/demo/${file}`];
    if (!component) {
        throw new Error(`找不到 Vort UI Demo 页面：${file}`);
    }

    return {
        path,
        name: `VortUi${file.replace("Demo.vue", "")}`,
        component,
        meta: { title }
    } as RouteRecordRaw;
});

export default createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            component: DemoLayout,
            redirect: "/introduction",
            children
        }
    ]
});
