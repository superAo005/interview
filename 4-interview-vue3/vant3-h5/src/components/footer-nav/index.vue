<template>
	<div class="footer_nav">
		<van-tabbar v-model="data.footerActive" :route="true">
			<van-tabbar-item name="Home" replace icon="wap-home-o" to="/home">{{
				$t("common.lang_home")
			}}</van-tabbar-item>
			<van-tabbar-item name="Classify" replace icon="shop-o" to="/classify">{{
				$t("common.lang_classify")
			}}</van-tabbar-item>
			<van-tabbar-item
				name="Shop"
				replace
				icon="cart-o"
				to="/shop"
				:dot="data.dot"
				:badge="goodsNum"
				>{{ $t("common.lang_shop") }}</van-tabbar-item
			>
			<van-tabbar-item name="My" replace icon="manager-o" to="/my">{{
				$t("common.lang_my")
			}}</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script setup name="footerNav">

const { useCommon } = $globalStore

let data = reactive({
	footerActive: "Home",
	dot: false,
});

const goodsNum = computed(() => {
	return useCommon.goods_card_num;
});
</script>
