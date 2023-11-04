<template>
  <a-alert type="info">
    <template #message>
      <h2>Menu 1-2</h2>
      <router-view />
    </template>
  </a-alert>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Alert } from 'ant-design-vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'Menu1-2',
  setup() {
    const { t } = useI18n();

    return {
      t,
    };
  },
  components: {
    [Alert.name]: Alert,
  },
});
</script>
