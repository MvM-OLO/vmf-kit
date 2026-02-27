<template>
  <div class="rich-text-editor" :class="{ disabled }">
    <Toolbar :editor="editor" :toolbar="toolbar" :onUploadImage="onUploadImage" />
    <EditorContent
      class="rich-text-editor__content"
      :style="{ minHeight: typeof minHeight === 'number' ? minHeight + 'px' : minHeight }"
      :editor="editor"
    />
  </div>
</template>

<script setup lang="ts">
import { watch, onBeforeUnmount } from "vue";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import type { JSONContent } from "@tiptap/vue-3";
import { getExtensions } from "./extensions";
import { createImageUploadExtension } from "./image-upload";
import Toolbar from "./Toolbar.vue";
import type { RichTextEditorProps, RichTextEditorEmits } from "./type";

defineOptions({ name: "RichTextEditor" });

const props = withDefaults(defineProps<RichTextEditorProps>(), {
  placeholder: "请输入内容…",
  disabled: false,
  minHeight: "300px",
});

const emit = defineEmits<RichTextEditorEmits>();

// 构建扩展列表
const extensions = [
  ...getExtensions({ placeholder: props.placeholder }),
  ...(props.onUploadImage ? [createImageUploadExtension(props.onUploadImage)] : []),
];

const editor = useEditor({
  content: props.modelValue || (props.html ? props.html : ""),
  extensions,
  editable: !props.disabled,
  onUpdate({ editor: e }) {
    emit("update:modelValue", e.getJSON() as JSONContent);
    emit("update:html", e.getHTML());
  },
});

// 外部 modelValue 变化时同步到编辑器
watch(
  () => props.modelValue,
  (val) => {
    if (!editor.value || !val) return;
    const currentJSON = JSON.stringify(editor.value.getJSON());
    const newJSON = JSON.stringify(val);
    if (currentJSON !== newJSON) {
      editor.value.commands.setContent(val, false);
    }
  },
  { deep: true }
);

// 外部 html 变化时同步到编辑器
watch(
  () => props.html,
  (val) => {
    if (!editor.value || val === undefined) return;
    const currentHTML = editor.value.getHTML();
    if (currentHTML !== val) {
      editor.value.commands.setContent(val, false);
    }
  }
);

// disabled 变化
watch(
  () => props.disabled,
  (val) => {
    editor.value?.setEditable(!val);
  }
);

onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>

<style scoped>
.rich-text-editor {
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  overflow: hidden;
  background: #fff;
  transition: border-color 0.2s;
}

.rich-text-editor:focus-within {
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
}

.rich-text-editor.disabled {
  opacity: 0.65;
  pointer-events: none;
  background: #f5f5f5;
}

.rich-text-editor__content {
  padding: 12px 16px;
  overflow-y: auto;
}

/* Tiptap ProseMirror 编辑区全局样式 */
.rich-text-editor__content :deep(.ProseMirror) {
  outline: none;
  min-height: inherit;
  font-size: 14px;
  line-height: 1.7;
  color: #1d2129;
}

.rich-text-editor__content :deep(.ProseMirror p) {
  margin: 0 0 0.5em;
}

.rich-text-editor__content :deep(.ProseMirror h1) {
  font-size: 28px;
  font-weight: 700;
  margin: 0.8em 0 0.4em;
}

.rich-text-editor__content :deep(.ProseMirror h2) {
  font-size: 22px;
  font-weight: 600;
  margin: 0.7em 0 0.3em;
}

.rich-text-editor__content :deep(.ProseMirror h3) {
  font-size: 18px;
  font-weight: 600;
  margin: 0.6em 0 0.3em;
}

.rich-text-editor__content :deep(.ProseMirror h4) {
  font-size: 16px;
  font-weight: 600;
  margin: 0.5em 0 0.2em;
}

.rich-text-editor__content :deep(.ProseMirror img) {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}

.rich-text-editor__content :deep(.ProseMirror blockquote) {
  border-left: 3px solid #d9d9d9;
  padding-left: 16px;
  margin: 0.5em 0;
  color: #8c8c8c;
}

.rich-text-editor__content :deep(.ProseMirror pre) {
  background: #282c34;
  color: #abb2bf;
  border-radius: 6px;
  padding: 12px 16px;
  font-family: "SFMono-Regular", Consolas, monospace;
  font-size: 13px;
  overflow-x: auto;
}

.rich-text-editor__content :deep(.ProseMirror code) {
  background: #f0f0f0;
  border-radius: 3px;
  padding: 2px 4px;
  font-family: "SFMono-Regular", Consolas, monospace;
  font-size: 0.9em;
  color: #c7254e;
}

.rich-text-editor__content :deep(.ProseMirror pre code) {
  background: none;
  padding: 0;
  color: inherit;
}

.rich-text-editor__content :deep(.ProseMirror hr) {
  border: none;
  border-top: 1px solid #e8e8e8;
  margin: 1em 0;
}

.rich-text-editor__content :deep(.ProseMirror a) {
  color: #1890ff;
  text-decoration: underline;
}

.rich-text-editor__content :deep(.ProseMirror ul),
.rich-text-editor__content :deep(.ProseMirror ol) {
  padding-left: 24px;
}

.rich-text-editor__content :deep(.ProseMirror ul[data-type="taskList"]) {
  list-style: none;
  padding-left: 0;
}

.rich-text-editor__content :deep(.ProseMirror ul[data-type="taskList"] li) {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.rich-text-editor__content :deep(.ProseMirror ul[data-type="taskList"] li label) {
  margin-top: 3px;
}

/* 表格 */
.rich-text-editor__content :deep(.ProseMirror table) {
  border-collapse: collapse;
  width: 100%;
  margin: 0.5em 0;
}

.rich-text-editor__content :deep(.ProseMirror th),
.rich-text-editor__content :deep(.ProseMirror td) {
  border: 1px solid #d9d9d9;
  padding: 6px 10px;
  min-width: 60px;
  vertical-align: top;
}

.rich-text-editor__content :deep(.ProseMirror th) {
  background: #fafafa;
  font-weight: 600;
}

.rich-text-editor__content :deep(.ProseMirror .selectedCell) {
  background: #e6f7ff;
}

/* placeholder */
.rich-text-editor__content :deep(.ProseMirror p.is-editor-empty:first-child::before) {
  content: attr(data-placeholder);
  float: left;
  color: #bfbfbf;
  pointer-events: none;
  height: 0;
}
</style>
