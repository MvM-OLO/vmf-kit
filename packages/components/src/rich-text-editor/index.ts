import withInstall from "../utils/withInstall";
import richTextEditor from "./src/RichTextEditor.vue";
import richTextViewer from "./src/RichTextViewer.vue";

const RichTextEditor = withInstall(richTextEditor);
const RichTextViewer = withInstall(richTextViewer);

export { RichTextEditor, RichTextViewer };
export type {
  RichTextEditorProps,
  RichTextEditorEmits,
  RichTextViewerProps,
  UploadImageFn,
  ToolbarItem,
} from "./src/type";
export { DEFAULT_TOOLBAR } from "./src/type";
export default RichTextEditor;
