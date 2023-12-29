<script lang="ts" setup>
interface Props {
  to: string
}
const props = defineProps<Props>()
</script>

<template>
  <router-link :to="props.to">
    <slot />
  </router-link>
</template>
