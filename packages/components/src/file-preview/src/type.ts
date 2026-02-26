/** 支持的文件预览类型 */
export type FileType =
  | "image"
  | "pdf"
  | "word"
  | "excel"
  | "ppt"
  | "text"
  | "code"
  | "unknown";

/** FilePreview 组件 Props */
export interface FilePreviewProps {
  /** 文件源：远程 URL 或 File 对象 */
  file: string | File;
  /** 手动指定文件类型（不指定则自动检测） */
  fileType?: FileType;
  /** 容器宽度，默认 '100%' */
  width?: string | number;
  /** 容器高度，默认 '600px' */
  height?: string | number;
}
