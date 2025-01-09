import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import YDZS_UI from "@ydzs/comp";
// import  'vafar/ui/es/style.css'

const app = createApp(App);

app.use(YDZS_UI);

app.mount("#app");
