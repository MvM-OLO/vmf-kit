// src/button/index.ts
import withInstall from "../utils/withInstall";
import iconPicker from "./src/index.vue";
// 导出 install
const IconPicker = withInstall(iconPicker);
// 导出button组件
export default IconPicker;
