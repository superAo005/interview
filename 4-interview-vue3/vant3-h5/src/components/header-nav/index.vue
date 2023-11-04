<template>
    <div class="header__nav">
      <van-nav-bar
        :title="data?.titelTextvalue"
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <template #left>
          <van-icon
            v-if="data?.leftArrowtag"
            class="left_icon"
            name="arrow-left"
          />
        </template>
      </van-nav-bar>
    </div>
  </template>
  
  <script setup name="headerNav">
  
  const router = useRouter();
  const emit = defineEmits(["goBack"]);
  const props = defineProps({
    leftArrow: {
      type: Boolean,
      default: true,
    },
    slefBack: {
      type: Boolean,
      default: false,
    },
    titelText: {
      type: String,
      default: "",
    },
  });
  const data = reactive({
    leftArrowtag: props?.leftArrow,
    titelTextvalue: props?.titelText,
  });
  
  // 左边返回
  const onClickLeft = () => {
    if (props?.leftArrow) {
      if (props?.slefBack) {
        emit("goBack");
      } else {
        router.go(-1);
      }
    }
  };
  
  // 右边返回
  const onClickRight = () => {};
  </script>
  <style lang="less" scpoed>
  .header__nav {
    position: fixed;
    top: 0;
    width: 100%;
    .left_icon {
      color: black !important;
    }
  }
  </style>