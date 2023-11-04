<template>
  <a-list :split="false">
    <a-tooltip>
      <a-list-item>
        <span :style="{ opacity: 1 }">
          {{ locale('app.setting.content-width') }}
        </span>
        <template #actions>
          <a-select
            size="small"
            :value="contentWidth"
            @select="val => handleChange('contentWidth', val)"
          >
            <a-select-option v-if="layout === 'side'" value="Fixed">
              {{ locale('app.setting.content-width.fixed') }}
            </a-select-option>
            <a-select-option value="Fluid">
              {{ locale('app.setting.content-width.fluid') }}
            </a-select-option>
          </a-select>
        </template>
      </a-list-item>
    </a-tooltip>

    <a-tooltip
      placement="left"
      :title="layout === 'mix' ? locale('app.setting.fixedheader.hint') : ''"
    >
      <a-list-item>
        <span :style="{ opacity: 1 }">{{ locale('app.setting.fixedheader') }}</span>
        <template #actions>
          <a-switch
            size="small"
            :checked="!!fixedHeader"
            :disabled="layout === 'mix'"
            @change="checked => handleChange('fixedHeader', checked)"
          />
        </template>
      </a-list-item>
    </a-tooltip>

    <a-tooltip :title="layout === 'top' ? locale('app.setting.fixedsidebar.hint') : ''">
      <a-list-item>
        <span :style="{ opacity: 1 }">{{ locale('app.setting.fixedsidebar') }}</span>
        <template #actions>
          <a-switch
            size="small"
            :disabled="layout === 'top'"
            :checked="!!fixSiderbar"
            @change="checked => handleChange('fixSiderbar', checked)"
          />
        </template>
      </a-list-item>
    </a-tooltip>

    <a-tooltip
      placement="left"
      :title="layout === 'mix' ? '' : locale('app.setting.layout.mix.hint')"
    >
      <a-list-item>
        <span :style="{ opacity: 1 }">{{ locale('app.setting.split.menus') }}</span>
        <template #actions>
          <a-switch
            size="small"
            :disabled="layout !== 'mix'"
            :checked="!!splitMenus"
            @change="checked => handleChange('splitmenus', checked)"
          />
        </template>
      </a-list-item>
    </a-tooltip>
  </a-list>
</template>

<script lang="ts">
import PropTypes from 'ant-design-vue/es/_util/vue-types';
import { defineComponent } from 'vue';
import { useProProvider } from '../base-layouts/pro-provider';

export default defineComponent({
  props: {
    contentWidth: PropTypes.oneOf(['Fluid', 'Fixed']).def('Fluid'),
    fixedHeader: PropTypes.bool,
    fixSiderbar: PropTypes.bool,
    splitMenus: PropTypes.bool,
    layout: PropTypes.oneOf(['side', 'top', 'mix', 'left']),
    i18n: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).def(false),
  },
  setup(props, { emit }) {
    const { i18n } = useProProvider();
    const locale = props.i18n || i18n;

    const handleChange = (type: string, value: string) => {
      emit('change', { type, value });
    };

    return {
      locale,
      handleChange,
    };
  },
});
</script>
