<template>
  <a-spin :spinning="loading" wrapperClassName="city-select-row">
    <a-select
      class="item"
      labelInValue
      v-model:value="state.province"
      showSearch
      @select="selectProvinceItem"
    >
      <a-select-option v-for="item in localProvince" :key="item.id">
        {{ item.name }}
      </a-select-option>
    </a-select>
    <a-select
      class="item"
      :disabled="!state.province"
      v-model:value="state.city"
      labelInValue
      showSearch
      @select="selectCityItem"
    >
      <a-select-option v-for="item in loadedCity" :key="item.id">
        {{ item.name }}
      </a-select-option>
    </a-select>
  </a-spin>
</template>

<script lang="ts">
import { toRaw, defineComponent, PropType, computed, reactive } from 'vue';
import { GeographicItemType } from './typing';
import { LabeledValue } from 'ant-design-vue/es/select';
import localProvince from './geographic/province.json';
import localCity from './geographic/city.json';

export default defineComponent({
  name: 'CitySelect',
  props: {
    province: {
      type: Array as PropType<GeographicItemType[]>,
      default: () => undefined,
    },
    city: {
      type: Array as PropType<GeographicItemType[]>,
      default: () => undefined,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const state = reactive<{
      province?: LabeledValue;
      city?: LabeledValue;
    }>({
      province: undefined,
      city: undefined,
    });
    const loadedCity = computed(() => {
      return (state.province && localCity[state.province.key as string]) || [];
    });

    const selectProvinceItem = () => {
      state.city = undefined;
      emit('change', toRaw(state));
    };
    const selectCityItem = () => {
      emit('change', toRaw(state));
    };

    return {
      state,
      localProvince,
      loadedCity,

      selectProvinceItem,
      selectCityItem,
    };
  },
});
</script>

<style lang="less" scoped>
.city-select-row {
  .item {
    width: 50%;
    max-width: 220px;
  }
  .item:first-child {
    width: ~'calc(50% - 8px)';
    margin-right: 8px;
  }
}

@media screen and (max-width: @screen-sm) {
  .item:first-child {
    margin: 0;
    margin-bottom: 8px;
  }
}
</style>
