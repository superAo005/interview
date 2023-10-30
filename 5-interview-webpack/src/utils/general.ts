import { IRouteObject } from "@/routes/renderRouter";

/** 定义扁平化路由对象 */
export interface IFlatRouteObject {
  name?: string;
  path?: string;
  purviews?: number[];
  roles?: string[];
  requireAuth?: boolean;
}

export default class GeneralUtils {
  /**
   * 将函数做防抖处理,一般用于输入框 内容变动立即请求后端更新数据
   */
  static debounce(fn: Function, times: number) {
    let timer: NodeJS.Timeout;
    return function () {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...arguments);
      }, times);
    };
  }

  /**
   * 判断对象是否为空
   */
  static isEmpty = (obj: any) => {
    if (typeof obj === "undefined" || obj === null) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * 清洗对象中的空属性
   */
  static cleanoutData = (obj: any) => {
    /* 删除空值 */
    Object.keys(obj).forEach((key) => {
      if (this.isEmpty(obj[key])) {
        delete obj[key];
      }
    });
    return obj;
  };

  /**
   * 获取路由search参数，如 xxxxx?name=aaaaaa
   */
  static getSearchParamValue = (search: string, propertyKey: string) => {
    let searchObj = new URLSearchParams(search);
    return searchObj ? searchObj.get(propertyKey) : null;
  };

  /** 对象转formdata */
  static toFormData = (data: any) => {
    let formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    return formData;
  };

  /**
   * 获取扁平化的侧边栏路由列表对象
   * @param menuItems  结构化的菜单路由对象
   * @param arr 最终要返回的扁平化路由列表
   * @returns []
   */
  static getFlatMenuRoutes = (menuItems: any, arr: any = []) => {
    if (!(menuItems instanceof Array)) {
      return [];
    }
    menuItems.forEach((item: any) => {
      /** 这个地方得判断下,菜单项里面有可能是这种的{type: 'divider'} */
      if (item.key) {
        let name = item.key.split("/").filter(Boolean).join("");
        arr.push({ name: name, label: item.label });
        /** 递归遍历路由的children */
        if (item.children) {
          this.getFlatMenuRoutes(item.children, arr);
        }
      }
    });
    return [...arr];
  };

  /**
   * 获取扁平化的路由列表对象
   * @param routes  结构化的路由对象
   * @param arr 最终要返回的扁平化路由列表
   * @returns []
   */
  static getFlatRoutes = (
    routes: IRouteObject[],
    arr: IFlatRouteObject[] = []
  ): IFlatRouteObject[] => {
    if (!(routes instanceof Array)) {
      return [];
    }
    routes.forEach((item) => {
      arr.push({
        name: item.meta ? item.meta.title : "",
        path: item.path,
        /** 如果没有指定必须认证，则为false */
        requireAuth: item.meta ? item.meta.requireAuth : false,
        roles: item.meta ? item.meta.authRoles : [],
        purviews: item.meta ? item.meta.authPurviews : [],
      });
      if (item.children) {
        // 递归调用
        this.getFlatRoutes(item.children, arr);
      }
    });
    return [...arr];
  };
}
