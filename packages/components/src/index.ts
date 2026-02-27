import FilePreview from "./file-preview";
import { RichTextEditor, RichTextViewer } from "./rich-text-editor";

export { FilePreview };
export type { FilePreviewProps, FileType } from "./file-preview";

export { RichTextEditor, RichTextViewer };
export type {
  RichTextEditorProps,
  RichTextEditorEmits,
  RichTextViewerProps,
  UploadImageFn,
  ToolbarItem,
} from "./rich-text-editor";
export { DEFAULT_TOOLBAR } from "./rich-text-editor";

export default [FilePreview, RichTextEditor, RichTextViewer];
