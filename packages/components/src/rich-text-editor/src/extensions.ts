import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import type { Extensions } from "@tiptap/vue-3";

/**
 * 获取编辑器/渲染器共用的 Tiptap 扩展集
 * @param options.placeholder  占位文本（仅编辑模式有效）
 * @param options.editable     是否为可编辑模式，默认 true；为 false 时去除 Placeholder 并调整只读配置
 */
export function getExtensions(options?: {
  placeholder?: string;
  editable?: boolean;
}): Extensions {
  const isEditable = options?.editable !== false;

  const extensions: Extensions = [
    StarterKit.configure({
      heading: { levels: [1, 2, 3, 4] },
    }),
    Image.configure({
      inline: false,
      allowBase64: true,
    }),
    Link.configure({
      openOnClick: !isEditable,
      autolink: true,
    }),
    Table.configure({
      resizable: isEditable,
    }),
    TableRow,
    TableCell,
    TableHeader,
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
    Highlight.configure({
      multicolor: true,
    }),
    Underline,
    Subscript,
    Superscript,
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
    TextStyle,
    Color,
  ];

  if (isEditable) {
    extensions.push(
      Placeholder.configure({
        placeholder: options?.placeholder || "请输入内容…",
      })
    );
  }

  return extensions;
}
