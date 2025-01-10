import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "YdzsFront 云滴",
  description: "基于 Vue3 的前端整合包",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/ydzs_front.png",
    nav: [
      { text: "首页", link: "/" },
      { text: "指南", link: "/guide/getting-started" },
      { text: "组件", link: "/components/" },
      { text: "工具库", link: "/utils/" },
      { text: "Hooks", link: "/hooks/" },
      { text: "常量", link: "/constants/" },
      { text: "插件", link: "/plugins/" },
    ],

    sidebar: {
      "/guide/": [
        {
          text: "指南",
          items: [
            { text: "快速开始", link: "/guide/getting-started" },
            { text: "安装", link: "/guide/installation" },
            { text: "介绍", link: "/guide/introduction" },
          ],
        },
      ],
      "/components/": [
        {
          text: "基础组件",
          items: [
            { text: "组件总览", link: "/components/" },
            { text: "Button 按钮", link: "/components/button" },
            { text: "Page 页面", link: "/components/page" },
            { text: "Description 描述列表", link: "/components/description" },
            { text: "IconPicker 图标选择器", link: "/components/icon-picker" },
          ],
        },
      ],
      "/utils/": [
        {
          text: "工具库",
          items: [{ text: "工具总览", link: "/utils/" }],
        },
      ],
      "/hooks/": [
        {
          text: "Hooks",
          items: [{ text: "Hooks 总览", link: "/hooks/" }],
        },
      ],
      "/constants/": [
        {
          text: "常量",
          items: [{ text: "常量总览", link: "/constants/" }],
        },
      ],
      "/plugins/": [
        {
          text: "插件",
          items: [{ text: "插件总览", link: "/plugins/" }],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],

    // 页脚
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024-present YdzsFront",
    },

    // 搜索
    search: {
      provider: "local",
    },

    // 大纲级别
    outline: {
      level: [2, 3],
      label: "目录",
    },
  },
});
