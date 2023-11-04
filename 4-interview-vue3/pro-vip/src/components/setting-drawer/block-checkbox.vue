<template>
  <div :class="prefixCls">
    <template v-for="item in items" :key="item.key">
      <layout-block
        :theme="item.key"
        :checked="item.key === value"
        :disabled="item.disabled"
        :title="item.title"
        @click="
          () => {
            !item.disabled && handleChange(item.key);
          }
        "
      />
    </template>
  </div>
</template>

<script lang="ts">
import PropTypes from 'ant-design-vue/es/_util/vue-types';
import { computed, defineComponent } from 'vue';
import { useProProvider } from '../base-layouts/pro-provider';
import LayoutBlock from './layout-block.vue';

export default defineComponent({
  props: {
    value: PropTypes.string,
    list: PropTypes.array,
    i18n: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).def(false),
  },
  emits: ['change'],
  setup(props, { emit }) {
    const { i18n, getPrefixCls } = useProProvider();
    const prefixCls = getPrefixCls('setting-drawer-block-checbox');
    const locale = computed(() => {
      return props.i18n || i18n;
    });
    const items = computed(() => {
      return (
        props.list || [
          {
            key: 'side',
            title: locale.value('app.setting.layout.side'),
          },
          {
            key: 'top',
            title: locale.value('app.setting.layout.top'),
          },
          {
            key: 'mix',
            title: locale.value('app.setting.layout.mix'),
          },
          {
            key: 'left',
            title: locale.value('app.setting.layout.leftmenu'),
          },
        ]
      );
    });
    const handleChange = (key: string) => {
      emit('change', key);
    };

    return {
      items,
      prefixCls,
      handleChange,
    };
  },
  components: {
    LayoutBlock,
  },
});
</script>
