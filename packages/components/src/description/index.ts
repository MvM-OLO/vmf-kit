import description from "./src/Description.vue";
import withInstall from "../utils/withInstall";
// 导出 install
const Description = withInstall(description);
// 导出button组件
export { Description };
export * as DescriptionType from "./src/type";
export { useDescription } from "./src/useDescription";
