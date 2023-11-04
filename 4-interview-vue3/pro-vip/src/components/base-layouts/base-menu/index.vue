<template>
  <a-menu
    :theme="theme"
    :mode="mode"
    :open-keys="openKeys"
    :selected-keys="selectedKeys"
    @openChange="handleOpenChange"
    @select="handleSelect"
    v-bind="dynamicProps"
    @mouseenter="$emit('mouseenter', $event)"
    @mouseleave="$emit('mouseleave', $event)"
  >
    <template v-for="menu in menus">
      <transform-vnode
        :key="menu.path"
        v-if="(!menu.children || menu.meta?.hideChildrenInMenu) && !menu.meta?.hideInMenu"
        :by="customItem"
        :opt="menu"
      >
        <a-menu-item @mouseenter="$emit('itemHover', $event)" :key="menu.path">
          <component
            v-if="menu.meta.icon !== undefined"
            :is="menu.meta.icon"
            :key="menu.meta.icon"
          />
          <component
            v-else-if="collapsed && menu.meta.collapsedIcon !== undefined"
            :is="menu.meta.collapsedIcon"
            :key="menu.meta.collapsedIcon"
          />
          <span>{{ (i18n && i18n(menu.meta.title)) || menu.meta.title }}</span>
        </a-menu-item>
      </transform-vnode>
      <sub-menu
        :key="menu.path"
        @itemHover="$emit('itemHover', $event)"
        v-else-if="menu.children"
        :menu="menu"
        :i18n="i18n"
        :collapsed="collapsed"
      />
    </template>
  </a-menu>
</template>

<script lang="ts">
import { defineComponent, computed, ref, ComputedRef, PropType } from 'vue';
import { RouteProps } from '../typing';
import SubMenu from './sub-menu.vue';

export function useRootSubmenuKeys(menus: RouteProps[]): ComputedRef<string[]> {
  return computed(() => menus.map(it => it.path));
}

export const BaseMenuProps = {
  locale: {
    type: Boolean,
    default: false,
  },
  menus: {
    type: Object as PropType<RouteProps[]>,
    required: true,
  },
  // top-nav-header: horizontal
  mode: {
    type: String,
    default: 'inline',
  },
  theme: {
    type: String,
    default: 'dark',
  },
  collapsed: {
    type: Boolean,
    default: false,
  },
  openKeys: {
    type: Array,
    required: true,
  },
  selectedKeys: {
    type: Array,
    required: true,
  },
  customItem: {
    type: Function,
    default: undefined,
  },
};

export default defineComponent({
  name: 'BaseMenu',
  props: Object.assign(
    {},
    {
      i18n: {
        type: Function,
        default: (t: string): string => t,
      },
    },
    BaseMenuProps,
  ),
  emits: ['update:openKeys', 'update:selectedKeys', 'mouseenter', 'mouseleave', 'itemHover'],
  setup(props, { emit }) {
    const isInline = props.mode === 'inline';
    const dynamicProps = ref({
      inlineCollapsed: isInline ? props.collapsed : undefined,
    });
    const handleOpenChange = (openKeys: string[]): void => {
      // console.log('openKeys', openKeys);
      // const latestOpenKey = openKeys.find(
      //   (key: string) => (props.openKeys as string[]).indexOf(key) === -1,
      // );
      // if ((props.menus as RouteProps[]).find(m => m.path === latestOpenKey)) {
      //   emit('update:openKeys', latestOpenKey ? [latestOpenKey] : []);
      // } else {
      //   emit('update:openKeys', openKeys);
      // }
      emit('update:openKeys', openKeys);
    };
    const handleSelect = (ctx: { [key: string]: any }): void => {
      emit('update:selectedKeys', ctx.selectedKeys);
    };
    return {
      isInline,
      dynamicProps,
      handleOpenChange,
      handleSelect,
      handleTest: () => {},
    };
  },
  components: {
    SubMenu,
  },
});
</script>
