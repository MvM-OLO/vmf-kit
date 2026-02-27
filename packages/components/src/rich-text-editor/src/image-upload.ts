import { Extension } from "@tiptap/vue-3";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import type { UploadImageFn } from "./type";

/**
 * 从 DataTransfer 中提取图片文件
 */
function getImageFiles(data: DataTransfer): File[] {
  const files: File[] = [];
  for (let i = 0; i < data.files.length; i++) {
    const file = data.files[i];
    if (file.type.startsWith("image/")) {
      files.push(file);
    }
  }
  return files;
}

/**
 * 从剪贴板 items 中提取图片文件（处理截图粘贴）
 */
function getImageFilesFromItems(items: DataTransferItemList): File[] {
  const files: File[] = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.type.startsWith("image/")) {
      const file = item.getAsFile();
      if (file) files.push(file);
    }
  }
  return files;
}

/**
 * 创建图片上传 Tiptap 扩展
 * 拦截粘贴和拖拽事件，提取图片文件并调用上传函数
 */
export function createImageUploadExtension(
  uploadFn: UploadImageFn
): Extension {
  return Extension.create({
    name: "imageUpload",

    addProseMirrorPlugins() {
      const editor = this.editor;

      return [
        new Plugin({
          key: new PluginKey("imageUpload"),
          props: {
            handlePaste(_view, event) {
              const clipboardData = event.clipboardData;
              if (!clipboardData) return false;

              // 优先从 items 提取（处理截图）
              const files = clipboardData.items
                ? getImageFilesFromItems(clipboardData.items)
                : getImageFiles(clipboardData);

              if (!files.length) return false;

              event.preventDefault();

              files.forEach(async (file) => {
                try {
                  const url = await uploadFn(file);
                  editor
                    .chain()
                    .focus()
                    .setImage({ src: url })
                    .run();
                } catch (err) {
                  console.error("图片上传失败:", err);
                }
              });

              return true;
            },

            handleDrop(_view, event) {
              const dataTransfer = event.dataTransfer;
              if (!dataTransfer) return false;

              const files = getImageFiles(dataTransfer);
              if (!files.length) return false;

              event.preventDefault();

              files.forEach(async (file) => {
                try {
                  const url = await uploadFn(file);
                  editor
                    .chain()
                    .focus()
                    .setImage({ src: url })
                    .run();
                } catch (err) {
                  console.error("图片上传失败:", err);
                }
              });

              return true;
            },
          },
        }),
      ];
    },
  });
}
