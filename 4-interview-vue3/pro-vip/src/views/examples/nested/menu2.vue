<template>
  <page-container :title="t('pages.nested.menu1.title')">
    <a-alert type="success">
      <template #message>
        <h2>Menu 2</h2>
        <div style="padding: 24px">
          <strong>嵌套路由页面内容</strong>
        </div>
      </template>
    </a-alert>
  </page-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Alert } from 'ant-design-vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'Menu2',
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
