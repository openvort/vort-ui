import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "@openvort/vort-ui/styles";
import "./styles.css";

createApp(App).use(router).mount("#app");
