<template>
	<div class="home app_content">
		<!-- 导航栏 -->
		<div class="header_body">
			<header-nav :leftArrow="false" titelText="首页"></header-nav>
		</div>

		<!-- 中间 -->
		<div class="warp_body">
			<refreshList
				v-model:freshMap="freshMap"
				@refresh="onRefresh"
				@onLoad="onLoad"
			>
				<div class="carousel_box">
					<carousel-card
						v-if="carouselList.length"
						v-model:carouselList="carouselList"
					></carousel-card>
				</div>
				<div class="boutique_box">
					<van-cell :border="false" title="精品" />
					<div class="boutique_body">
						<goodsCard
							:goodsList="boutique"
							:cardAttr="boutiqueAttr"
						></goodsCard>
					</div>
				</div>
				<div class="recommend_box">
					<van-cell :border="false" title="推荐" />
					<div class="recommend_body">
						<goodsCard :goodsList="recommend"></goodsCard>
					</div>
				</div>
			</refreshList>
		</div>

		<!-- 底部 -->
		<div class="footer_body">
			<footer-nav></footer-nav>
		</div>
	</div>
</template>

<script setup name="Home">
const { useHome } = $globalStore;

let carouselList = reactive([]); // 轮播列表
let boutique = reactive([]); // 精品数据
let recommend = reactive([]); // 推荐
let freshMap = reactive({
	refreshLoad: false, // 是否刷新
	listLoading: false, // 是否加载中
	listFinished: false, // 是否加载完成标识
});
const boutiqueAttr = reactive({
	columnNum: 4,
	itemClass: "boutique_item",
	goodsCradclass: "boutique-crad",
}); // 商品卡片展示

//获取轮播
const getCarousel = () => {
	return new Promise(async (resolve) => {
		const res = await useHome.getCarousel();
		if (res?.code === 20000) {
			carouselList = res?.data;
		}
		resolve(res);
	});
};

//精品
const boutiqueGoods = () => {
	return new Promise(async (resolve) => {
		const res = await useHome.boutiqueGoods();
		if (res?.code === 20000) {
			boutique = res?.data;
		}
		resolve(res);
	});
};

//推荐
const recommendGoods = (onLoad) => {
	return new Promise(async (resolve) => {
		const res = await useHome.recommendGoods();
		if (res?.code === 20000) {
			recommend = onLoad ? recommend.concat(res.data) : res.data;
			freshMap.listLoading = false;
			freshMap.listFinished = res.listFinished;
			if (recommend.length > 50) {
				freshMap.listFinished = true;
			}
		}
		resolve(res);
	});
};

//下拉刷新
const onRefresh = () => {
	freshMap.refreshLoad = true;
	Promise.all([getCarousel(), boutiqueGoods(), recommendGoods()]).then(() => {
		freshMap.refreshLoad = false;
	});
};

// 触底加载
const onLoad = () => {
	recommendGoods(true);
};

onMounted(() => {
	getCarousel();
	boutiqueGoods();
	recommendGoods();
});
</script>

<style lang="less" scoped>
.home {
	.warp_body {
		.carousel_box {
			height: 150px;
			width: 100%;
			padding-bottom: 10px;
		}
	}
	.boutique_box {
		.boutique_body {
			padding: 0px 0px 10px 0px;
		}
	}
	.recommend_box {
		.recommend_body {
			width: 100%;
		}
	}
}
</style>
