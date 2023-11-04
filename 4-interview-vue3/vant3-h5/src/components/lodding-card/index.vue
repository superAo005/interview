<template>
    <div class="lodding_card" v-if="lodding">
      <div class="lodding_card__body">
        <van-loading type="spinner" />
      </div>
    </div>
    <slot v-else> </slot>
  </template>
  
  <script setup name="loddingCard">
  
  const props = defineProps({
    isLodding: {
      type: Boolean,
      default: true,
    },
  });
  let lodding = ref(props?.isLodding);
  watchEffect(() => {
    lodding.value = props?.isLodding;
  });
  </script>
  <style lang="less" scpoed>
  .lodding_card {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    .lodding_card__body {
      margin: auto;
    }
  }
  </style>
  