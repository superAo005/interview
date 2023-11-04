<template>
  <router-view v-slot="{ Component }">
    <multi-tab-store-producer v-if="Component">
      <component :is="Component"></component>
    </multi-tab-store-producer>
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { MultiTabStoreProducer } from '@/components/multi-tab';

export default defineComponent({
  name: 'RouteView',
  components: {
    MultiTabStoreProducer,
  },
});
</script>
