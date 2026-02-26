<template>
  <div class="pdf-previewer">
    <div class="pdf-previewer__pages" ref="pagesRef">
      <canvas
        v-for="i in totalPages"
        :key="i"
        :ref="(el) => setCanvasRef(el as HTMLCanvasElement, i)"
        class="pdf-previewer__canvas"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import * as pdfjsLib from "pdfjs-dist";
import { toArrayBuffer } from "../helper";

// 设置 worker（使用 CDN，也可替换为本地路径）
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

const props = defineProps<{
  file: string | File;
}>();

const totalPages = ref(0);
const pagesRef = ref<HTMLDivElement>();
const canvasMap = new Map<number, HTMLCanvasElement>();

function setCanvasRef(el: HTMLCanvasElement | null, index: number) {
  if (el) {
    canvasMap.set(index, el);
  }
}

onMounted(async () => {
  try {
    const arrayBuffer = await toArrayBuffer(props.file);
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    totalPages.value = pdf.numPages;

    await nextTick();

    const scale = 1.5;
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale });
      const canvas = canvasMap.get(i);
      if (!canvas) continue;

      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) continue;

      await page.render({ canvasContext: ctx, viewport }).promise;
    }
  } catch (err) {
    console.error("PDF 渲染失败:", err);
  }
});
</script>

<style scoped>
.pdf-previewer {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #525659;
}

.pdf-previewer__pages {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 16px;
}

.pdf-previewer__canvas {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  max-width: 100%;
}
</style>
