// src/button/index.ts
import withInstall from "../utils/withInstall";
import page from "./src/index.vue";
// 导出 install
const Page = withInstall(page);
// 导出button组件
export default Page;
