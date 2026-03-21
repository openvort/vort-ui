import { createApp } from "vue";
import { router } from "./router";
import App from "./App.vue";
import "./components/vort/styles/index.css";
import "./assets/styles/index.css";

const app = createApp(App);

app.use(router);
app.mount("#app");
