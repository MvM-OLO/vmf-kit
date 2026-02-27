<template>
  <div class="rich-text-viewer">
    <EditorContent :editor="editor" />
  </div>
</template>

<script setup lang="ts">
import { watch, onBeforeUnmount } from "vue";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import { getExtensions } from "./extensions";
import type { RichTextViewerProps } from "./type";

defineOptions({ name: "RichTextViewer" });

const props = defineProps<RichTextViewerProps>();

const editor = useEditor({
  content: props.content || props.html || "",
  extensions: getExtensions({ editable: false }),
  editable: false,
});

// 同步 content 变化
watch(
  () => props.content,
  (val) => {
    if (!editor.value || !val) return;
    editor.value.commands.setContent(val, false);
  },
  { deep: true }
);

// 同步 html 变化
watch(
  () => props.html,
  (val) => {
    if (!editor.value || val === undefined) return;
    editor.value.commands.setContent(val, false);
  }
);

onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>

<style scoped>
.rich-text-viewer {
  font-size: 14px;
  line-height: 1.7;
  color: #1d2129;
  word-break: break-word;
}

.rich-text-viewer :deep(.ProseMirror) {
  outline: none;
}

.rich-text-viewer :deep(.ProseMirror p) {
  margin: 0 0 0.5em;
}

.rich-text-viewer :deep(.ProseMirror h1) {
  font-size: 28px;
  font-weight: 700;
  margin: 0.8em 0 0.4em;
}

.rich-text-viewer :deep(.ProseMirror h2) {
  font-size: 22px;
  font-weight: 600;
  margin: 0.7em 0 0.3em;
}

.rich-text-viewer :deep(.ProseMirror h3) {
  font-size: 18px;
  font-weight: 600;
  margin: 0.6em 0 0.3em;
}

.rich-text-viewer :deep(.ProseMirror h4) {
  font-size: 16px;
  font-weight: 600;
  margin: 0.5em 0 0.2em;
}

.rich-text-viewer :deep(.ProseMirror img) {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}

.rich-text-viewer :deep(.ProseMirror blockquote) {
  border-left: 3px solid #d9d9d9;
  padding-left: 16px;
  margin: 0.5em 0;
  color: #8c8c8c;
}

.rich-text-viewer :deep(.ProseMirror pre) {
  background: #282c34;
  color: #abb2bf;
  border-radius: 6px;
  padding: 12px 16px;
  font-family: "SFMono-Regular", Consolas, monospace;
  font-size: 13px;
  overflow-x: auto;
}

.rich-text-viewer :deep(.ProseMirror code) {
  background: #f0f0f0;
  border-radius: 3px;
  padding: 2px 4px;
  font-family: "SFMono-Regular", Consolas, monospace;
  font-size: 0.9em;
  color: #c7254e;
}

.rich-text-viewer :deep(.ProseMirror pre code) {
  background: none;
  padding: 0;
  color: inherit;
}

.rich-text-viewer :deep(.ProseMirror hr) {
  border: none;
  border-top: 1px solid #e8e8e8;
  margin: 1em 0;
}

.rich-text-viewer :deep(.ProseMirror a) {
  color: #1890ff;
  text-decoration: underline;
}

.rich-text-viewer :deep(.ProseMirror ul),
.rich-text-viewer :deep(.ProseMirror ol) {
  padding-left: 24px;
}

.rich-text-viewer :deep(.ProseMirror ul[data-type="taskList"]) {
  list-style: none;
  padding-left: 0;
}

.rich-text-viewer :deep(.ProseMirror ul[data-type="taskList"] li) {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.rich-text-viewer :deep(.ProseMirror table) {
  border-collapse: collapse;
  width: 100%;
  margin: 0.5em 0;
}

.rich-text-viewer :deep(.ProseMirror th),
.rich-text-viewer :deep(.ProseMirror td) {
  border: 1px solid #d9d9d9;
  padding: 6px 10px;
  min-width: 60px;
  vertical-align: top;
}

.rich-text-viewer :deep(.ProseMirror th) {
  background: #fafafa;
  font-weight: 600;
}
</style>
