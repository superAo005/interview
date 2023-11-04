<template>
    <van-grid
      :class="cardAttr?.goodsCradclass"
      :column-num="cardAttr?.columnNum"
      :gutter="cardAttr?.gutter"
      class="goods_crad"
    >
      <van-grid-item
        v-for="(item, index) in goodsList"
        :key="index"
        @click="goGoodsdetail(item)"
        :class="cardAttr?.itemClass"
      >
        <transition
          appear
          appear-class="card_appear__class"
          appear-to-class="card_appear__to__class"
          appear-active-class="card_appear__active__class"
        >
          <div class="card_body">
            <van-image :src="item?.img" />
            <div class="name_text">{{ item?.name }}</div>
            <div class="price_text">¥ {{ item?.price }}</div>
          </div>
        </transition>
      </van-grid-item>
    </van-grid>
  </template>
  
  <script setup name="goodsCard">
  
  const router = useRouter();
  const props = defineProps({
    goodsList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    cardAttr: {
      type: Object,
      default: () => {
        return {
          columnNum: 2,
          gutter: 6,
          itemClass: "recommend_item",
        };
      },
    },
  });
  const goGoodsdetail = (item) => {
    router.push({
      name: "goodsDetail",
      query: { goodsId: item?.goodsId },
    });
  };
  </script>
  <style lang="less">
  .goods_crad {
    .recommend_item {
      border-radius: 10px;
      max-width: 50%;
      .van-grid-item__content {
        border-radius: 10px;
      }
      .van-grid-item__content--surround::after {
        border-width: 0;
      }
    }
    .van-grid-item {
      max-width: 50%;
    }
  }
  </style>
  <style lang="less" scoped>
  .goods_crad {
    padding-top: 10px;
    padding-bottom: 10px;
    .card_body {
      text-align: center;
    }
  
    .name_text {
      overflow: hidden;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      width: 100%;
      text-align: center;
      margin-top: 6px;
      font-size: 14px;
    }
  
    .price_text {
      margin-top: 6px;
      font-size: 12px;
      color: red;
      text-align: center;
    }
  
    /** 卡片过渡动画 */
    .card_appear__class {
      transform: scale(0);
    }
    .card_appear__to__class {
      transform: scale(1);
    }
    .card_appear__active__class {
      transition: transform 2s ease;
    }
  }
  
  </style>
  