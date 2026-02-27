import {
  HomeOutlined,
  AppstoreOutlined,
  FileSearchOutlined,
  EditOutlined,
} from "@ant-design/icons-vue";
import type { RouteItem } from "@/types/route";

const routes: RouteItem[] = [
  {
    path: "/",
    name: "Layout",
    component: () => import("@layouts/DefaultLayout.vue"),
    redirect: "/home",
    meta: {
      hideInMenu: true,
      title: "首页",
    },
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("@views/Home.vue"),
        meta: {
          title: "首页",
          icon: HomeOutlined,
        },
      },
      {
        path: "/components",
        name: "Components",
        redirect: "/components/file-preview",
        meta: {
          title: "组件",
          icon: AppstoreOutlined,
        },
        children: [
          {
            path: "/components/file-preview",
            name: "FilePreviewDemo",
            component: () =>
              import("@views/components/FilePreviewDemo.vue"),
            meta: {
              title: "FilePreview 文件预览",
              icon: FileSearchOutlined,
            },
          },
          {
            path: "/components/rich-text-editor",
            name: "RichTextEditorDemo",
            component: () =>
              import("@views/components/RichTextEditorDemo.vue"),
            meta: {
              title: "RichTextEditor 富文本",
              icon: EditOutlined,
            },
          },
        ],
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@views/404.vue"),
    meta: {
      title: "404",
      hideInMenu: true,
    },
  },
];

export default routes;
