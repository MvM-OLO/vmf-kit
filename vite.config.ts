import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "./packages/index.ts"),
        utils: resolve(__dirname, "./packages/utils/index.ts"),
        plugins: resolve(__dirname, "./packages/plugins/index.ts"),
        constants: resolve(__dirname, "./packages/constants/index.ts"),
        components: resolve(__dirname, "./packages/components/index.ts"),
        hooks: resolve(__dirname, "./packages/hooks/index.ts"),
      },
      name: "vmf-packages",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
        chunkFileNames: `js/[name]-[hash].js`,
        assetFileNames(assetInfo) {
          if (assetInfo?.name?.endsWith(".css")) {
            return `css/[name].css`;
          } else if (
            [".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"].some((ext) =>
              assetInfo?.name?.endsWith(ext)
            )
          ) {
            return `img/[name]-[hash].[ext]`;
          } else {
            return `other/[name]-[hash].[ext]`;
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./packages"),
      "@utils": resolve(__dirname, "./packages/utils"),
      "@hooks": resolve(__dirname, "./packages/hooks"),
      "@components": resolve(__dirname, "./packages/components"),
      "@plugins": resolve(__dirname, "./packages/plugins"),
      "@constants": resolve(__dirname, "./packages/constants"),
    },
  },
});
