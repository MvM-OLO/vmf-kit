import withInstall from "../utils/withInstall";
import filePreview from "./src/FilePreview.vue";

const FilePreview = withInstall(filePreview);

export { FilePreview };
export type { FilePreviewProps, FileType } from "./src/type";
export default FilePreview;
