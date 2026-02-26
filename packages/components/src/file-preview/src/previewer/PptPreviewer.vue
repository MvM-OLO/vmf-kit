<template>
  <div class="ppt-previewer" ref="containerRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { toArrayBuffer } from "../helper";

const props = defineProps<{
  file: string | File;
}>();

const containerRef = ref<HTMLDivElement>();
let previewerInstance: any = null;

onMounted(async () => {
  try {
    const arrayBuffer = await toArrayBuffer(props.file);
    const { init } = await import("pptx-preview");
    if (containerRef.value) {
      previewerInstance = init(containerRef.value, {
        width: containerRef.value.clientWidth || 960,
        height: containerRef.value.clientHeight || 540,
      });
      await previewerInstance.preview(arrayBuffer);
    }
  } catch (err) {
    console.error("PPT 渲染失败:", err);
  }
});

onBeforeUnmount(() => {
  if (previewerInstance?.destroy) {
    previewerInstance.destroy();
  }
});
</script>

<style scoped>
.ppt-previewer {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #e8e8e8;
}
</style>
