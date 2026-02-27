import type { JSONContent } from "@tiptap/vue-3";

/** 图片上传函数类型 */
export type UploadImageFn = (file: File) => Promise<string>;

/** 工具栏可配置项 */
export type ToolbarItem =
  | "bold"
  | "italic"
  | "underline"
  | "strike"
  | "highlight"
  | "subscript"
  | "superscript"
  | "code"
  | "color"
  | "heading"
  | "bulletList"
  | "orderedList"
  | "taskList"
  | "alignLeft"
  | "alignCenter"
  | "alignRight"
  | "link"
  | "image"
  | "blockquote"
  | "codeBlock"
  | "horizontalRule"
  | "table"
  | "undo"
  | "redo";

/** 默认全部工具栏项 */
export const DEFAULT_TOOLBAR: (ToolbarItem | "|")[] = [
  "bold",
  "italic",
  "underline",
  "strike",
  "highlight",
  "subscript",
  "superscript",
  "code",
  "|",
  "color",
  "|",
  "heading",
  "|",
  "bulletList",
  "orderedList",
  "taskList",
  "|",
  "alignLeft",
  "alignCenter",
  "alignRight",
  "|",
  "link",
  "image",
  "blockquote",
  "codeBlock",
  "horizontalRule",
  "|",
  "table",
  "|",
  "undo",
  "redo",
];

/** RichTextEditor 组件 Props */
export interface RichTextEditorProps {
  /** 内容（v-model），Tiptap JSON 格式 */
  modelValue?: JSONContent;
  /** HTML 内容（v-model:html），与 modelValue 二选一 */
  html?: string;
  /** 占位文本 */
  placeholder?: string;
  /** 图片上传函数，接收 File 返回图片 URL */
  onUploadImage?: UploadImageFn;
  /** 是否禁用编辑 */
  disabled?: boolean;
  /** 编辑器最小高度，默认 '300px' */
  minHeight?: string | number;
  /** 工具栏配置，传入要显示的工具项数组，用 "|" 分隔组。默认显示全部 */
  toolbar?: (ToolbarItem | "|")[];
}

/** RichTextEditor 组件 Emits */
export interface RichTextEditorEmits {
  (e: "update:modelValue", value: JSONContent): void;
  (e: "update:html", value: string): void;
}

/** RichTextViewer 组件 Props */
export interface RichTextViewerProps {
  /** Tiptap JSON 内容 */
  content?: JSONContent;
  /** 或者直接传 HTML 字符串 */
  html?: string;
}
