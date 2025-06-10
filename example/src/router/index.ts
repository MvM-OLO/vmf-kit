import { createRouter, createWebHistory } from "vue-router";
import routes from "@/config/routes";
import { transformRoutes } from "@/utils/route";

const router = createRouter({
  history: createWebHistory(),
  routes: transformRoutes(routes),
});

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = `${to.meta.title || "系统"} - VMF KIT`;
  next();
});

export default router;
