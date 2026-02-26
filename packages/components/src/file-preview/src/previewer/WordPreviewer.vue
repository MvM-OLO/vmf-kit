<template>
  <div class="word-previewer" ref="containerRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { renderAsync } from "docx-preview";
import { toArrayBuffer } from "../helper";

const props = defineProps<{
  file: string | File;
}>();

const containerRef = ref<HTMLDivElement>();

onMounted(async () => {
  try {
    const arrayBuffer = await toArrayBuffer(props.file);
    if (containerRef.value) {
      await renderAsync(arrayBuffer, containerRef.value, undefined, {
        className: "docx-preview-wrapper",
        inWrapper: true,
        ignoreWidth: false,
        ignoreHeight: false,
        ignoreFonts: false,
        breakPages: true,
        ignoreLastRenderedPageBreak: true,
        experimental: false,
      });
    }
  } catch (err) {
    console.error("Word 渲染失败:", err);
  }
});
</script>

<style scoped>
.word-previewer {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #f0f0f0;
  padding: 16px;
}
</style>

<style>
/* docx-preview 生成的 DOM 需要全局样式 */
.docx-preview-wrapper {
  background: #fff;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
}
</style>
