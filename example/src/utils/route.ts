import type { RouteRecordRaw } from "vue-router";
import type { RouteItem } from "@/types/route";
import type { MenuItem } from "@/components/SideMenu.vue";

// 将路由配置转换为 vue-router 的路由配置
export function transformRoutes(routes: RouteItem[]): RouteRecordRaw[] {
  return routes.map((route) => {
    const { children, ...rest } = route;
    return {
      ...rest,
      children: children ? transformRoutes(children) : undefined,
    } as RouteRecordRaw;
  });
}

// 将路由配置转换为菜单配置
export function transformMenu(routes: RouteItem[]): MenuItem[] {
  return routes
    .filter((route) => !route.meta?.hideInMenu)
    .map((route) => {
      const { path, meta, children } = route;
      const menuItem: MenuItem = {
        key: path,
        title: meta.title,
        icon: meta.icon,
      };

      if (children && !meta?.hideChildrenInMenu) {
        menuItem.children = transformMenu(children);
      }

      return menuItem;
    });
}
