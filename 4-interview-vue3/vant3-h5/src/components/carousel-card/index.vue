
<template>
    <div class="carousel">
      <van-swipe :autoplay="3000" lazy-render :height="150">
        <van-swipe-item v-for="(image, index) in data?.images" :key="index">
          <img class="img-box" :src="image?.img" />
        </van-swipe-item>
      </van-swipe>
    </div>
  </template>
  
  <script setup name="carousel">
  
  const props = defineProps({
    carouselList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  });
  const data = reactive({
    images: props?.carouselList,
  });
  </script>
  <style lang="less">
  .carousel {
    .img-box {
      width: 100%;
      height: 100%;
    }
  }
  </style>