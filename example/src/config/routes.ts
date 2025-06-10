import { HomeOutlined } from "@ant-design/icons-vue";
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
