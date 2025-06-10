import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import VM_UI from "@vm-kit/comp";
import router from "./router";
import Antd from "ant-design-vue";

const app = createApp(App);

app.use(VM_UI);
app.use(router);
app.use(Antd);

app.mount("#app");
