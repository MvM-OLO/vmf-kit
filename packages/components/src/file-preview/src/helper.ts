import type { FileType } from "./type";

// ============ 文件类型检测 ============

/** 图片扩展名 */
const IMAGE_EXTS = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "webp",
  "svg",
  "bmp",
  "ico",
];

/** PDF 扩展名 */
const PDF_EXTS = ["pdf"];

/** Word 扩展名 */
const WORD_EXTS = ["docx"];

/** Excel 扩展名 */
const EXCEL_EXTS = ["xlsx", "xls", "csv"];

/** PPT 扩展名 */
const PPT_EXTS = ["pptx"];

/** 纯文本扩展名 */
const TEXT_EXTS = ["txt", "log", "md"];

/** 代码文件扩展名 */
const CODE_EXTS = [
  "js",
  "ts",
  "vue",
  "jsx",
  "tsx",
  "py",
  "java",
  "c",
  "cpp",
  "go",
  "rs",
  "rb",
  "php",
  "sh",
  "html",
  "css",
  "scss",
  "less",
  "json",
  "xml",
  "yaml",
  "yml",
  "sql",
];

/**
 * 从文件名中提取扩展名（小写，不含点号）
 */
export function getFileExtension(fileName: string): string {
  const idx = fileName.lastIndexOf(".");
  if (idx === -1) return "";
  return fileName.slice(idx + 1).toLowerCase();
}

/**
 * 根据文件名获取文件名（不含路径）
 */
export function getFileName(file: string | File): string {
  if (typeof file === "string") {
    // URL 中可能带查询参数，先去掉
    const clean = file.split("?")[0].split("#")[0];
    return clean.split("/").pop() || "file";
  }
  return file.name;
}

/**
 * 根据文件扩展名自动检测文件类型
 */
export function detectFileType(file: string | File): FileType {
  const name = getFileName(file);
  const ext = getFileExtension(name);

  if (IMAGE_EXTS.includes(ext)) return "image";
  if (PDF_EXTS.includes(ext)) return "pdf";
  if (WORD_EXTS.includes(ext)) return "word";
  if (EXCEL_EXTS.includes(ext)) return "excel";
  if (PPT_EXTS.includes(ext)) return "ppt";
  if (TEXT_EXTS.includes(ext)) return "text";
  if (CODE_EXTS.includes(ext)) return "code";

  return "unknown";
}

// ============ 代码语言映射 ============

/** 扩展名 -> highlight.js 语言名映射 */
const LANG_MAP: Record<string, string> = {
  js: "javascript",
  ts: "typescript",
  vue: "xml",
  jsx: "javascript",
  tsx: "typescript",
  py: "python",
  java: "java",
  c: "c",
  cpp: "cpp",
  go: "go",
  rs: "rust",
  rb: "ruby",
  php: "php",
  sh: "bash",
  html: "xml",
  css: "css",
  scss: "scss",
  less: "less",
  json: "json",
  xml: "xml",
  yaml: "yaml",
  yml: "yaml",
  sql: "sql",
  md: "markdown",
};

/**
 * 根据文件扩展名获取 highlight.js 语言标识
 */
export function getLanguageByExt(ext: string): string {
  return LANG_MAP[ext] || "plaintext";
}

// ============ 文件读取工具 ============

/**
 * 将 File 对象读取为 ArrayBuffer
 */
export function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = () => reject(new Error("文件读取失败"));
    reader.readAsArrayBuffer(file);
  });
}

/**
 * 将 File 对象读取为文本
 */
export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("文件读取失败"));
    reader.readAsText(file);
  });
}

/**
 * 将 File 对象读取为 Data URL
 */
export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("文件读取失败"));
    reader.readAsDataURL(file);
  });
}

/**
 * 从 URL 获取 ArrayBuffer
 */
export async function fetchAsArrayBuffer(url: string): Promise<ArrayBuffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`请求失败: ${res.status}`);
  return res.arrayBuffer();
}

/**
 * 从 URL 获取文本内容
 */
export async function fetchAsText(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`请求失败: ${res.status}`);
  return res.text();
}

/**
 * 将文件源统一转换为 ArrayBuffer
 */
export async function toArrayBuffer(
  file: string | File
): Promise<ArrayBuffer> {
  if (typeof file === "string") {
    return fetchAsArrayBuffer(file);
  }
  return readFileAsArrayBuffer(file);
}

/**
 * 将文件源统一转换为文本
 */
export async function toText(file: string | File): Promise<string> {
  if (typeof file === "string") {
    return fetchAsText(file);
  }
  return readFileAsText(file);
}

/**
 * 将文件源统一转换为可展示的 URL（用于 img src 等）
 */
export async function toObjectURL(file: string | File): Promise<string> {
  if (typeof file === "string") {
    return file;
  }
  return URL.createObjectURL(file);
}
