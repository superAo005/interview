import { VNodeChild } from 'vue';
import { RouteRecordRaw, RouteMeta } from 'vue-router';

export interface MenuRouteMeta {
  hideChildrenInMenu?: boolean;
  hideInMenu?: boolean;
  icon?: string | VNodeChild | JSX.Element;
  authority?: string | string[];
}

export type MenuDataItem = {
  children?: MenuDataItem[];
  meta?: MenuRouteMeta & RouteMeta;
} & RouteRecordRaw;
