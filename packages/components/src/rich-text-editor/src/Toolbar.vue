<template>
  <div class="rte-toolbar" v-if="editor">
    <template v-for="(item, idx) in toolbarItems" :key="idx">
      <div v-if="item === '|'" class="rte-toolbar__divider"></div>
      <template v-else>
        <!-- 颜色选择器 -->
        <label
          v-if="item === 'color'"
          class="rte-toolbar__btn rte-toolbar__color-btn"
          title="文字颜色"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 20h12M9 4h6l5 16H4L9 4z" />
          </svg>
          <span class="color-bar" :style="{ background: currentColor }"></span>
          <input
            type="color"
            class="color-input"
            :value="currentColor"
            @input="setColor($event)"
          />
        </label>

        <!-- 标题下拉 -->
        <select
          v-else-if="item === 'heading'"
          class="rte-toolbar__select"
          :value="currentHeading"
          @change="setHeading($event)"
        >
          <option value="0">正文</option>
          <option value="1">标题 1</option>
          <option value="2">标题 2</option>
          <option value="3">标题 3</option>
          <option value="4">标题 4</option>
        </select>

        <!-- 表格（含子按钮） -->
        <template v-else-if="item === 'table'">
          <button
            class="rte-toolbar__btn"
            title="插入表格"
            @click="editor!.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="3" y1="15" x2="21" y2="15" />
              <line x1="9" y1="3" x2="9" y2="21" />
              <line x1="15" y1="3" x2="15" y2="21" />
            </svg>
          </button>
          <template v-if="editor!.isActive('table')">
            <button class="rte-toolbar__btn" title="添加列（后）" @click="editor!.chain().focus().addColumnAfter().run()">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="12" height="18" rx="2" />
                <line x1="9" y1="3" x2="9" y2="21" />
                <line x1="19" y1="8" x2="19" y2="16" />
                <line x1="15" y1="12" x2="23" y2="12" />
              </svg>
            </button>
            <button class="rte-toolbar__btn" title="删除列" @click="editor!.chain().focus().deleteColumn().run()">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="12" height="18" rx="2" />
                <line x1="9" y1="3" x2="9" y2="21" />
                <line x1="16" y1="9" x2="22" y2="15" />
                <line x1="22" y1="9" x2="16" y2="15" />
              </svg>
            </button>
            <button class="rte-toolbar__btn" title="添加行（下）" @click="editor!.chain().focus().addRowAfter().run()">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="12" rx="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="8" y1="19" x2="16" y2="19" />
                <line x1="12" y1="15" x2="12" y2="23" />
              </svg>
            </button>
            <button class="rte-toolbar__btn" title="删除行" @click="editor!.chain().focus().deleteRow().run()">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="12" rx="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="17" x2="15" y2="23" />
                <line x1="15" y1="17" x2="9" y2="23" />
              </svg>
            </button>
            <button class="rte-toolbar__btn" title="删除表格" @click="editor!.chain().focus().deleteTable().run()">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="9" y1="9" x2="15" y2="15" />
                <line x1="15" y1="9" x2="9" y2="15" />
              </svg>
            </button>
          </template>
        </template>

        <!-- 图片上传 -->
        <button
          v-else-if="item === 'image'"
          class="rte-toolbar__btn"
          title="插入图片"
          @click="triggerImageUpload"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
        </button>

        <!-- 插入链接 -->
        <div v-else-if="item === 'link'" class="rte-toolbar__link-wrap">
          <button
            class="rte-toolbar__btn"
            :class="{ active: editor!.isActive('link') }"
            title="插入链接"
            @click="toggleLinkPopover"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </button>
          <div v-if="linkPopoverVisible" class="rte-link-popover">
            <input
              ref="linkInputRef"
              v-model="linkUrl"
              class="rte-link-popover__input"
              placeholder="请输入链接地址"
              @keydown.enter="confirmLink"
              @keydown.esc="closeLinkPopover"
            />
            <button class="rte-link-popover__btn rte-link-popover__btn--confirm" @click="confirmLink">确定</button>
            <button
              v-if="editor!.isActive('link')"
              class="rte-link-popover__btn rte-link-popover__btn--remove"
              @click="removeLink"
            >移除</button>
          </div>
        </div>

        <!-- 通用按钮 -->
        <button
          v-else
          class="rte-toolbar__btn"
          :class="{ active: btnConfig[item]?.isActive?.() }"
          :title="btnConfig[item]?.title"
          :disabled="btnConfig[item]?.disabled?.() ?? false"
          @click="btnConfig[item]?.action()"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" v-html="btnConfig[item]?.icon"></svg>
        </button>
      </template>
    </template>

    <!-- 隐藏的文件输入 -->
    <input
      ref="fileInputRef"
      type="file"
      accept="image/*"
      style="display: none"
      @change="handleImageSelected"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onBeforeUnmount } from "vue";
import type { Editor } from "@tiptap/vue-3";
import type { ToolbarItem, UploadImageFn } from "./type";
import { DEFAULT_TOOLBAR } from "./type";

const props = defineProps<{
  editor: Editor | undefined;
  toolbar?: (ToolbarItem | "|")[];
  onUploadImage?: UploadImageFn;
}>();

const toolbarItems = computed(() => props.toolbar ?? DEFAULT_TOOLBAR);

// ========== 颜色 ==========
const currentColor = computed(() => {
  return (props.editor?.getAttributes("textStyle").color as string) || "#000000";
});

function setColor(e: Event) {
  const color = (e.target as HTMLInputElement).value;
  props.editor?.chain().focus().setColor(color).run();
}

// ========== 标题 ==========
const currentHeading = computed(() => {
  if (!props.editor) return "0";
  for (let i = 1; i <= 4; i++) {
    if (props.editor.isActive("heading", { level: i })) return String(i);
  }
  return "0";
});

function setHeading(e: Event) {
  const level = Number((e.target as HTMLSelectElement).value);
  if (level === 0) {
    props.editor?.chain().focus().setParagraph().run();
  } else {
    props.editor?.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 | 4 }).run();
  }
}

// ========== 图片上传 ==========
const fileInputRef = ref<HTMLInputElement>();

function triggerImageUpload() {
  fileInputRef.value?.click();
}

async function handleImageSelected(e: Event) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  if (props.onUploadImage) {
    try {
      const url = await props.onUploadImage(file);
      props.editor?.chain().focus().setImage({ src: url }).run();
    } catch (err) {
      console.error("图片上传失败:", err);
    }
  } else {
    // 无上传函数时，使用 base64 作为 fallback
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      props.editor?.chain().focus().setImage({ src: base64 }).run();
    };
    reader.readAsDataURL(file);
  }

  // 重置 input，允许重复选择同一文件
  input.value = "";
}

// ========== 链接弹出框 ==========
const linkPopoverVisible = ref(false);
const linkUrl = ref("");
const linkInputRef = ref<HTMLInputElement>();

function toggleLinkPopover() {
  if (linkPopoverVisible.value) {
    closeLinkPopover();
    return;
  }
  // 如果已有链接，回显 URL
  const existingHref = props.editor?.getAttributes("link").href as string | undefined;
  linkUrl.value = existingHref || "";
  linkPopoverVisible.value = true;
  nextTick(() => {
    linkInputRef.value?.focus();
  });
}

function confirmLink() {
  const url = linkUrl.value.trim();
  if (url) {
    props.editor?.chain().focus().setLink({ href: url }).run();
  }
  closeLinkPopover();
}

function removeLink() {
  props.editor?.chain().focus().unsetLink().run();
  closeLinkPopover();
}

function closeLinkPopover() {
  linkPopoverVisible.value = false;
  linkUrl.value = "";
}

// 点击外部关闭
function handleClickOutside(e: MouseEvent) {
  if (!linkPopoverVisible.value) return;
  const target = e.target as HTMLElement;
  if (!target.closest(".rte-toolbar__link-wrap")) {
    closeLinkPopover();
  }
}

if (typeof document !== "undefined") {
  document.addEventListener("mousedown", handleClickOutside);
  onBeforeUnmount(() => {
    document.removeEventListener("mousedown", handleClickOutside);
  });
}

// ========== SVG 图标 & 按钮配置 ==========
const icons = {
  bold: '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>',
  italic: '<line fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" x1="19" y1="4" x2="10" y2="4"/><line fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" x1="14" y1="20" x2="5" y2="20"/><line fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" x1="15" y1="4" x2="9" y2="20"/>',
  underline: '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"/><line fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" x1="4" y1="21" x2="20" y2="21"/>',
  strike: '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M17.3 4.9c-1.2-1.2-3-1.9-5.3-1.9-3.3 0-6 2.1-6 5 0 1 .3 1.9.9 2.7"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M6.7 19.1c1.2 1.2 3 1.9 5.3 1.9 3.3 0 6-2.1 6-5 0-1-.3-1.9-.9-2.7"/><line fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" x1="2" y1="12.3" x2="22" y2="12.3"/>',
  highlight: '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 20h9"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>',
  subscript: '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M4 5l8 10M12 5L4 15"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M20 19h-4c0-1.5.4-2 1.3-2.7.6-.4 1.3-.8 1.8-1.4.3-.4.5-.8.5-1.3 0-.4-.2-.8-.5-1-.3-.3-.7-.4-1.1-.4-.5 0-.9.2-1.2.5-.2.3-.4.7-.4 1.1"/>',
  superscript: '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M4 19l8-10M12 19L4 9"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M20 9h-4c0-1.5.4-2 1.3-2.7.6-.4 1.3-.8 1.8-1.4.3-.4.5-.8.5-1.3 0-.4-.2-.8-.5-1-.3-.3-.7-.4-1.1-.4-.5 0-.9.2-1.2.5-.2.3-.4.7-.4 1.1"/>',
  code: '<polyline fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="16 18 22 12 16 6"/><polyline fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="8 6 2 12 8 18"/>',
  bulletList: '<line fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" x1="8" y1="6" x2="21" y2="6"/><line fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" x1="8" y1="12" x2="21" y2="12"/><line fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" x1="8" y1="18" x2="21" y2="18"/><circle fill="currentColor" stroke="none" cx="3.5" cy="6" r="1.5"/><circle fill="currentColor" stroke="none" cx="3.5" cy="12" r="1.5"/><circle fill="currentColor" stroke="none" cx="3.5" cy="18" r="1.5"/>',
  orderedList: '<line fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" x1="10" y1="6" x2="21" y2="6"/><line fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" x1="10" y1="12" x2="21" y2="12"/><line fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" x1="10" y1="18" x2="21" y2="18"/><text fill="currentColor" font-size="8" font-family="sans-serif" x="2" y="8">1</text><text fill="currentColor" font-size="8" font-family="sans-serif" x="2" y="14">2</text><text fill="currentColor" font-size="8" font-family="sans-serif" x="2" y="20">3</text>',
  taskList: '<rect fill="none" stroke="currentColor" stroke-width="2" x="3" y="5" width="6" height="6" rx="1"/><polyline fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="5 7.5 6 9 8.5 5.5"/><line fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" x1="12" y1="8" x2="21" y2="8"/><rect fill="none" stroke="currentColor" stroke-width="2" x="3" y="14" width="6" height="6" rx="1"/><line fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" x1="12" y1="17" x2="21" y2="17"/>',
  alignLeft: '<line fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" x1="3" y1="6" x2="21" y2="6"/><line fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" x1="3" y1="12" x2="15" y2="12"/><line fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" x1="3" y1="18" x2="18" y2="18"/>',
  alignCenter: '<line fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" x1="3" y1="6" x2="21" y2="6"/><line fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" x1="6" y1="12" x2="18" y2="12"/><line fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" x1="4" y1="18" x2="20" y2="18"/>',
  alignRight: '<line fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" x1="3" y1="6" x2="21" y2="6"/><line fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" x1="9" y1="12" x2="21" y2="12"/><line fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" x1="6" y1="18" x2="21" y2="18"/>',
  blockquote: '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M3 21c3 0 7-1 7-8V5c0-1.25-.76-2.02-2-2H4c-1.25 0-2 .76-2 2v6c0 1.25.76 2 2 2h4.13c.16 0 .3.08.36.22A5.25 5.25 0 0 1 3 21z"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M15 21c3 0 7-1 7-8V5c0-1.25-.76-2.02-2-2h-4c-1.25 0-2 .76-2 2v6c0 1.25.76 2 2 2h4.13c.16 0 .3.08.36.22A5.25 5.25 0 0 1 15 21z"/>',
  codeBlock: '<polyline fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="16 18 22 12 16 6"/><polyline fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="8 6 2 12 8 18"/><line fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" x1="14" y1="3" x2="10" y2="21"/>',
  horizontalRule: '<line fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" x1="2" y1="12" x2="22" y2="12"/><line fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" x1="2" y1="6" x2="6" y2="6"/><line fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" x1="18" y1="6" x2="22" y2="6"/><line fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" x1="2" y1="18" x2="6" y2="18"/><line fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" x1="18" y1="18" x2="22" y2="18"/>',
  undo: '<polyline fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="1 4 1 10 7 10"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>',
  redo: '<polyline fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="23 4 23 10 17 10"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M20.49 15a9 9 0 1 1-2.13-9.36L23 10"/>',
};

type BtnDef = {
  title: string;
  icon: string;
  action: () => void;
  isActive?: () => boolean;
  disabled?: () => boolean;
};

const btnConfig = computed<Record<string, BtnDef>>(() => {
  const ed = props.editor;
  if (!ed) return {} as Record<string, BtnDef>;
  return {
    bold: {
      title: "粗体",
      icon: icons.bold,
      action: () => ed.chain().focus().toggleBold().run(),
      isActive: () => ed.isActive("bold"),
    },
    italic: {
      title: "斜体",
      icon: icons.italic,
      action: () => ed.chain().focus().toggleItalic().run(),
      isActive: () => ed.isActive("italic"),
    },
    underline: {
      title: "下划线",
      icon: icons.underline,
      action: () => ed.chain().focus().toggleUnderline().run(),
      isActive: () => ed.isActive("underline"),
    },
    strike: {
      title: "删除线",
      icon: icons.strike,
      action: () => ed.chain().focus().toggleStrike().run(),
      isActive: () => ed.isActive("strike"),
    },
    highlight: {
      title: "高亮",
      icon: icons.highlight,
      action: () => ed.chain().focus().toggleHighlight().run(),
      isActive: () => ed.isActive("highlight"),
    },
    subscript: {
      title: "下标",
      icon: icons.subscript,
      action: () => ed.chain().focus().toggleSubscript().run(),
      isActive: () => ed.isActive("subscript"),
    },
    superscript: {
      title: "上标",
      icon: icons.superscript,
      action: () => ed.chain().focus().toggleSuperscript().run(),
      isActive: () => ed.isActive("superscript"),
    },
    code: {
      title: "行内代码",
      icon: icons.code,
      action: () => ed.chain().focus().toggleCode().run(),
      isActive: () => ed.isActive("code"),
    },
    bulletList: {
      title: "无序列表",
      icon: icons.bulletList,
      action: () => ed.chain().focus().toggleBulletList().run(),
      isActive: () => ed.isActive("bulletList"),
    },
    orderedList: {
      title: "有序列表",
      icon: icons.orderedList,
      action: () => ed.chain().focus().toggleOrderedList().run(),
      isActive: () => ed.isActive("orderedList"),
    },
    taskList: {
      title: "任务列表",
      icon: icons.taskList,
      action: () => ed.chain().focus().toggleTaskList().run(),
      isActive: () => ed.isActive("taskList"),
    },
    alignLeft: {
      title: "左对齐",
      icon: icons.alignLeft,
      action: () => ed.chain().focus().setTextAlign("left").run(),
      isActive: () => ed.isActive({ textAlign: "left" }),
    },
    alignCenter: {
      title: "居中",
      icon: icons.alignCenter,
      action: () => ed.chain().focus().setTextAlign("center").run(),
      isActive: () => ed.isActive({ textAlign: "center" }),
    },
    alignRight: {
      title: "右对齐",
      icon: icons.alignRight,
      action: () => ed.chain().focus().setTextAlign("right").run(),
      isActive: () => ed.isActive({ textAlign: "right" }),
    },
    blockquote: {
      title: "引用",
      icon: icons.blockquote,
      action: () => ed.chain().focus().toggleBlockquote().run(),
      isActive: () => ed.isActive("blockquote"),
    },
    codeBlock: {
      title: "代码块",
      icon: icons.codeBlock,
      action: () => ed.chain().focus().toggleCodeBlock().run(),
      isActive: () => ed.isActive("codeBlock"),
    },
    horizontalRule: {
      title: "分割线",
      icon: icons.horizontalRule,
      action: () => ed.chain().focus().setHorizontalRule().run(),
    },
    undo: {
      title: "撤销",
      icon: icons.undo,
      action: () => ed.chain().focus().undo().run(),
      disabled: () => !ed.can().undo(),
    },
    redo: {
      title: "重做",
      icon: icons.redo,
      action: () => ed.chain().focus().redo().run(),
      disabled: () => !ed.can().redo(),
    },
  };
});
</script>

<style scoped>
.rte-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2px;
  padding: 6px 8px;
  background: #fafafa;
  border-bottom: 1px solid #e8e8e8;
}

.rte-toolbar__divider {
  width: 1px;
  height: 20px;
  background: #d9d9d9;
  margin: 0 4px;
}

.rte-toolbar__btn {
  width: 30px;
  height: 30px;
  border: 1px solid transparent;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: #595959;
  transition: all 0.15s;
  padding: 0;
  line-height: 1;
}

.rte-toolbar__btn:hover {
  background: #e6f7ff;
  border-color: #91d5ff;
}

.rte-toolbar__btn.active {
  background: #e6f7ff;
  border-color: #1890ff;
  color: #1890ff;
}

.rte-toolbar__btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.rte-toolbar__btn:disabled:hover {
  background: transparent;
  border-color: transparent;
}

.rte-toolbar__btn svg {
  flex-shrink: 0;
}

.rte-toolbar__select {
  height: 30px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: #fff;
  font-size: 12px;
  color: #595959;
  padding: 0 6px;
  cursor: pointer;
  outline: none;
}

.rte-toolbar__select:hover {
  border-color: #1890ff;
}

/* 颜色按钮 */
.rte-toolbar__color-btn {
  position: relative;
  overflow: hidden;
  flex-direction: column;
  gap: 1px;
}

.color-bar {
  width: 14px;
  height: 3px;
  border-radius: 1px;
  display: block;
}

.color-input {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

/* 链接弹出框 */
.rte-toolbar__link-wrap {
  position: relative;
  display: inline-flex;
}

.rte-link-popover {
  position: absolute;
  top: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 100;
  white-space: nowrap;
}

.rte-link-popover__input {
  width: 220px;
  height: 30px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 0 8px;
  font-size: 13px;
  outline: none;
  transition: border-color 0.2s;
}

.rte-link-popover__input:focus {
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
}

.rte-link-popover__btn {
  height: 30px;
  padding: 0 12px;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}

.rte-link-popover__btn--confirm {
  background: #1890ff;
  color: #fff;
}

.rte-link-popover__btn--confirm:hover {
  background: #40a9ff;
}

.rte-link-popover__btn--remove {
  background: #fff;
  color: #ff4d4f;
  border: 1px solid #ff4d4f;
}

.rte-link-popover__btn--remove:hover {
  background: #fff1f0;
}
</style>
