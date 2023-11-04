<template>
	<div class="classify app_content">
		<!-- 导航栏 -->
		<div class="header_body">
			<header-nav :leftArrow="false" titelText="分类"> </header-nav>
		</div>

		<!-- 中间 -->
		<div class="warp_body">
			<lodding-card :isLodding="isLodding">
				<div class="warp_left" v-if="classifyList.length">
					<van-sidebar v-model="classifyActive">
						<van-sidebar-item
							v-for="(item, index) in classifyList"
							:key="index"
							:title="item.classifyName"
							@click="chioceClassify(item)"
						/>
					</van-sidebar>
				</div>
				<div class="warp_right">
					<refreshList
						v-model:freshMap="freshMap"
						:classMap="classMap"
						@refresh="onRefresh"
						@onLoad="onLoad"
						:resetScroll="resetScroll"
					>
						<div>
							<goodsCard
								:goodsList="goodsList"
								:cardAttr="cardAttr"
							></goodsCard>
						</div>
						<van-empty
							v-if="goodsList.length == 0"
							class="no_data"
							description="暂无数据"
						/>
					</refreshList>
				</div>
			</lodding-card>
		</div>

		<!-- 底部 -->
		<div class="footer_body">
			<footer-nav></footer-nav>
		</div>
	</div>
</template>

<script setup name="Classify">

const { useClassify } = $globalStore

let classifyId = ref(""); // 分类id
let classifyActive = ref(0); // 是否是选择中分类
let resetScroll = ref(0); // 滚动记录
let isLodding = ref(true); // 是否加载中
let classifyList = reactive([]); // 分类列表
let goodsList = reactive([]); // 商品列表
let freshMap = reactive({
	refreshLoad: false, // 是否刷新
	listLoading: false, // 是否加载中
	listFinished: false, // 是否加载完成标识
});

const cardAttr = reactive({
	columnNum: 2,
	gutter: 10,
	itemClass: "recommend_item",
}); // 商品卡片参数

const classMap = reactive({
	refreshClass: "classify_refresh_box",
}); // 分类样式

//下拉刷新
const onRefresh = () => {
	getGoodslist();
};

// 触底加载
const onLoad = () => {
	freshMap.listFinished = true;
	getGoodslist(true);
};

// 点击分类
const chioceClassify = (item) => {
	classifyId = item?.id;
	resetScroll.value += 1;
	getGoodslist();
};

// 获取分类数据
const getClassify = () => {
	return new Promise(async (resolve) => {
		const res = await useClassify.getClassify();
		if (res?.code === 20000) {
			classifyList.push(...res?.data);
			resolve(res.data);
		} else {
			resolve("");
		}
	});
};

//获取分类下的商品列表
const getGoodslist = async (onLoad) => {
	const res = await useClassify.classifyGoods();
	if (res?.code === 20000) {
		goodsList = onLoad ? goodsList.concat(res?.data) : res?.data;
		freshMap.refreshLoad = false;
		freshMap.listLoading = false;
		freshMap.listFinished = res?.listFinished;
		if (goodsList.length > 50) {
			freshMap.listFinished = true;
		}
	}
	isLodding.value = false;
};

onMounted(async () => {
	let res = await getClassify();
	if (res && res?.length) {
		classifyId = res?.[0]?.id;
		classifyId && getGoodslist();
	} else {
		isLodding.value = false;
	}
});
</script>
<style lang="less" scoped>
.classify {
	.warp_body {
		display: flex;
		height: calc(100vh - 96px);
		.warp_left {
			overflow-y: scroll;
			-webkit-overflow-scrolling: touch;
		}
		.warp_right {
			flex: 1;
		}
	}
}
</style>
