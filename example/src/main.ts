import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import YDZS_UI from "@ydzs/comp";
import router from "./router";
import Antd from "ant-design-vue";

const app = createApp(App);

app.use(YDZS_UI);
app.use(router);
app.use(Antd);

app.mount("#app");
