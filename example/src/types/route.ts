import { Component } from "vue";
import { RouteRecordRaw } from "vue-router";

export interface MetaProps {
  title: string;
  icon?: any;
  hideInMenu?: boolean;
  hideChildrenInMenu?: boolean;
  [key: string]: any;
}

export interface RouteItem {
  path: string;
  name?: string;
  component?: Component | (() => Promise<Component>);
  redirect?: string;
  meta: MetaProps;
  children?: RouteItem[];
}
