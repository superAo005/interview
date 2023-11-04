<template>
  <a-sub-menu v-if="!menu.meta?.hideInMenu">
    <template #title>
      <component v-if="menu.meta.icon !== undefined" :is="menu.meta.icon" :key="menu.meta.icon" />
      <component
        v-else-if="collapsed && menu.meta.collapsedIcon !== undefined"
        :is="menu.meta.collapsedIcon"
        :key="menu.meta.collapsedIcon"
      />
      <span>{{ i18n(menu.meta.title) }}</span>
    </template>
    <template v-for="child in menu.children">
      <a-menu-item
        @mouseenter="$emit('itemHover', $event)"
        v-if="!child.children"
        :key="child.path"
      >
        <component
          v-if="child.meta.icon !== undefined"
          :is="child.meta.icon"
          :key="child.meta.icon"
        />
        <component
          v-else-if="collapsed && child.meta.collapsedIcon !== undefined"
          :is="child.meta.collapsedIcon"
          :key="child.meta.collapsedIcon"
        />
        <span>{{ i18n(child.meta.title) }}</span>
      </a-menu-item>
      <sub-menu v-else :menu="child" :key="child.path" :i18n="i18n" :collapsed="collapsed" />
    </template>
  </a-sub-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouteProps } from '../typing';

export interface SubMenuProps {
  menu: RouteProps;
}

export default defineComponent({
  name: 'SubMenu',
  emits: ['itemHover'],
  props: {
    i18n: {
      type: Function,
      default: (t: any): any => t,
    },
    menu: {
      type: Object,
      required: true,
    },
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped></style>
