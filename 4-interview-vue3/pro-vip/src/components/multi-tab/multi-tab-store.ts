import { KeepAlive, cloneVNode, reactive, createVNode, toRaw, defineComponent, watch } from 'vue';
import { RouteMeta, useRouter, useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
import { flattenChildren } from '@/utils/vnode-util';

export type CacheKey = string;

export type CacheRoute = {
  path: string;
  meta: RouteMeta;
} & Record<string, any>;
export interface CacheItem {
  path: CacheKey;
  route: CacheRoute;
  name?: string;
  key?: number;
  lock?: boolean;
}

export interface MultiTabStore {
  caches: Map<CacheKey, CacheItem>;
  cacheList: CacheItem[];
  current: CacheKey;
  include: string[];
  exclude: string[];
  add: (item: CacheItem) => void;
}

const getName = (comp: any) => {
  return comp.displayName || comp.name;
};

export type CallerFunction = {
  open: (path: CacheKey) => void;
  close: (path: CacheKey) => void;
  closeAll: () => void;
  closeLeft: (selectedPath: CacheKey) => void;
  closeRight: (selectedPath: CacheKey) => void;
  closeOther: (selectedPath: CacheKey) => void;
  getCaches: () => void;
  clearCache: (path: CacheKey) => void;
  refresh: (path?: CacheKey | undefined) => void;
};

export type Options = {
  defaultHomePage?: string;
  allowCloseAll?: boolean;
};

export type MultiTabType = [CallerFunction];

let g = 1;
const guid = () => {
  return ++g;
};

// 定义保留的多标签状态
const state = reactive<MultiTabStore>({
  cacheList: [],
  caches: new Map<CacheKey, CacheItem>(),
  current: '',
  exclude: [],
  include: [],
  add: (item: CacheItem) => {
    if (!state.cacheList.find(c => c.path === item.path)) {
      state.cacheList.push(item);
    }
  },
});
const hasCache = (path: CacheKey) => {
  return state.cacheList.find(item => item.path === path);
};
// 创建消费端
export const MultiTabStoreProducer = defineComponent({
  name: 'MultiTabStoreProducer',
  setup(_props, { slots = {} }) {
    const route = useRoute();
    watch(
      () => route.path,
      () => {
        state.current = route.path;
      },
      { immediate: true },
    );
    return () => {
      const component = flattenChildren((slots.default && slots.default()) || [])[0];
      if (!component) {
        return null;
      }
      const comp = component.type;
      let name = getName(comp);
      const newVNode = component as any;
      if (name === undefined && newVNode) {
        // 没有设置组件名字
        name = route.name;
      }
      // 是否存在 cache
      let cacheItem = hasCache(route.path);
      if (!cacheItem) {
        cacheItem = {
          path: route.path,
          route: { ...route },
          name,
          key: guid(),
        };
        console.log(cacheItem);
        state.cacheList.push(cacheItem);
      }

      newVNode.type.displayName = name;
      const key = `${name}-${cacheItem.key}`;
      return createVNode(
        KeepAlive,
        { exclude: state.exclude },
        { default: () => cloneVNode(newVNode, { key }) },
      );
    };
  },
});
let initStore = false;
export const createMultiTabStoreProducer = (
  initCacheList: Omit<CacheItem, 'component' | 'key'>[] = [],
) => {
  if (initStore) {
    return state;
  }
  state.cacheList.push(...initCacheList.map(item => ({ ...item, key: guid() } as CacheItem)));
  initStore = true;
  return state;
};

export const useMultiTab = (/*options?: Options*/): MultiTabType => {
  const router = useRouter();
  const route = useRoute();
  const clearCache = (path: CacheKey) => {
    const cacheItem =
      state.cacheList.find(item => item.path === path) || ({ name: '' } as CacheItem);
    state.exclude = [cacheItem?.name as string];
    setTimeout(() => {
      state.exclude = [];
    });
  };

  const close = (path?: CacheKey) => {
    if (!path) {
      path = state.current;
    }
    const currentPageIndex = state.cacheList.findIndex(item => item.path === path);
    if (state.cacheList.length === 1) {
      message.info('这是最后一个标签了, 无法被关闭');
      return;
    }
    clearCache(path);
    if (path !== state.current) {
      state.cacheList.splice(currentPageIndex, 1);
      return;
    }
    const targetIndex = currentPageIndex === 0 ? currentPageIndex + 1 : currentPageIndex - 1;
    router
      .replace({
        path: state.cacheList[targetIndex].route.path,
      })
      .then(() => {
        state.cacheList.splice(currentPageIndex, 1);
      })
      .catch();
  };

  const open = (path: CacheKey) => {
    router
      .push({
        path: path,
      })
      .catch();
  };

  const getCaches = () => {
    return state.caches;
  };

  // alias
  const refresh = async (path?: CacheKey | undefined) => {
    if (!path) {
      path = state.current;
    }
    clearCache(path);
    const cacheItemIndex = state.cacheList.findIndex(item => item.path === path);
    const cacheItem = state.cacheList[cacheItemIndex];

    state.cacheList[cacheItemIndex] = { ...toRaw(cacheItem), key: guid() };
    return new Promise<void>(resolve => {
      router
        .replace({
          path: (cacheItem?.route.path || path) as string,
        })
        .finally(() => {
          // 模拟loading效果，加载太快，loading 不明显，主动加个延时 ，如不需要可删除延迟
          setTimeout(() => {
            resolve();
          }, 900);
        });
    });
  };

  const closeAll = () => {
    state.cacheList = [];
    state.caches = new Map<CacheKey, CacheItem>();
    // if (options?.defaultHomePage) {
    //   open(options.defaultHomePage);
    // }
  };
  const deleteCaches = (start: number, index: number) => {
    const closed = state.cacheList.splice(start, index);
    closed.forEach(item => {
      state.caches.delete(item.path);
    });
  };

  const closeLeft = (selectedPath: CacheKey) => {
    const index = state.cacheList.findIndex(item => item.path === selectedPath);
    const currentIndex = state.cacheList.findIndex(item => item.path === route.path);
    if (currentIndex < index) {
      router
        .replace({ path: selectedPath })
        .then(() => {
          deleteCaches(0, index);
        })
        .catch();
    } else {
      deleteCaches(0, index);
    }
  };

  const closeRight = (selectedPath: CacheKey) => {
    const index = state.cacheList.findIndex(item => item.path === selectedPath);
    const currentIndex = state.cacheList.findIndex(item => item.path === route.path);
    if (currentIndex > index) {
      router
        .replace({ path: selectedPath })
        .then(() => {
          deleteCaches(index + 1, state.cacheList.length - index - 1);
        })
        .catch();
    } else {
      deleteCaches(index + 1, state.cacheList.length - index - 1);
    }
  };

  const closeOther = (selectedPath: CacheKey) => {
    const index = state.cacheList.findIndex(cached => cached.path === selectedPath);
    router
      .replace({
        path: selectedPath,
      })
      .then(() => {
        deleteCaches(index + 1, state.cacheList.length - index - 1);
        deleteCaches(0, index);
      })
      .catch();
  };

  return [
    { open, close, getCaches, clearCache, closeAll, closeLeft, closeRight, closeOther, refresh },
  ];
};

export default useMultiTab;
