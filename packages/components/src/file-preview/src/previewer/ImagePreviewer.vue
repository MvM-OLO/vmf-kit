<template>
  <div class="image-previewer" ref="containerRef">
    <div class="image-previewer__toolbar">
      <button class="toolbar-btn" title="放大" @click="zoomIn">
        <span>＋</span>
      </button>
      <button class="toolbar-btn" title="缩小" @click="zoomOut">
        <span>－</span>
      </button>
      <button class="toolbar-btn" title="重置" @click="resetTransform">
        <span>↺</span>
      </button>
      <button class="toolbar-btn" title="向左旋转" @click="rotateLeft">
        <span>↶</span>
      </button>
      <button class="toolbar-btn" title="向右旋转" @click="rotateRight">
        <span>↷</span>
      </button>
      <span class="toolbar-info">{{ Math.round(scale * 100) }}%</span>
    </div>
    <div
      class="image-previewer__content"
      @wheel.prevent="onWheel"
      @mousedown="onMouseDown"
    >
      <img
        ref="imgRef"
        :src="src"
        :style="imgStyle"
        draggable="false"
        @load="onImgLoad"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { toObjectURL } from "../helper";

const props = defineProps<{
  file: string | File;
}>();

const src = ref("");
const scale = ref(1);
const rotate = ref(0);
const translateX = ref(0);
const translateY = ref(0);
const isDragging = ref(false);
const dragStart = ref({ x: 0, y: 0 });
const imgRef = ref<HTMLImageElement>();
const containerRef = ref<HTMLDivElement>();

const imgStyle = computed(() => ({
  transform: `translate(${translateX.value}px, ${translateY.value}px) scale(${scale.value}) rotate(${rotate.value}deg)`,
  cursor: isDragging.value ? "grabbing" : "grab",
}));

function zoomIn() {
  scale.value = Math.min(scale.value + 0.25, 5);
}

function zoomOut() {
  scale.value = Math.max(scale.value - 0.25, 0.1);
}

function rotateLeft() {
  rotate.value -= 90;
}

function rotateRight() {
  rotate.value += 90;
}

function resetTransform() {
  scale.value = 1;
  rotate.value = 0;
  translateX.value = 0;
  translateY.value = 0;
}

function onWheel(e: WheelEvent) {
  if (e.deltaY < 0) {
    zoomIn();
  } else {
    zoomOut();
  }
}

function onMouseDown(e: MouseEvent) {
  isDragging.value = true;
  dragStart.value = { x: e.clientX - translateX.value, y: e.clientY - translateY.value };
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
}

function onMouseMove(e: MouseEvent) {
  if (!isDragging.value) return;
  translateX.value = e.clientX - dragStart.value.x;
  translateY.value = e.clientY - dragStart.value.y;
}

function onMouseUp() {
  isDragging.value = false;
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);
}

function onImgLoad() {
  // 图片加载完成后可做适配
}

onMounted(async () => {
  src.value = await toObjectURL(props.file);
});

onBeforeUnmount(() => {
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);
  // 释放 object url
  if (props.file instanceof File && src.value.startsWith("blob:")) {
    URL.revokeObjectURL(src.value);
  }
});
</script>

<style scoped>
.image-previewer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
  position: relative;
}

.image-previewer__toolbar {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  flex-shrink: 0;
}

.toolbar-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #595959;
  transition: all 0.2s;
}

.toolbar-btn:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.toolbar-info {
  margin-left: 8px;
  font-size: 13px;
  color: #8c8c8c;
}

.image-previewer__content {
  flex: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}

.image-previewer__content img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.15s ease;
}
</style>
