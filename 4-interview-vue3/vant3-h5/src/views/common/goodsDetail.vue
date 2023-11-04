<template>
	<div class="goods_detail">
		<!-- 导航栏 -->
		<div class="header_body">
			<header-nav titelText="商品详情"></header-nav>
		</div>
		{{ data.conut }}
		<!-- 中间 -->
		<div class="warp_body">
			<refreshList
				v-model:freshMap="data.freshMap"
				@refresh="onRefresh"
				:finishedText="''"
				@onLoad="onLoad"
			>
				<div class="carousel_box">
					<carousel-card
						v-if="data?.carouselList?.length"
						v-model:carouselList="data.carouselList"
					></carousel-card>
				</div>

				<div class="goods_info_box">
					<div class="price_body">¥ {{ data?.goodsInfo?.price }}</div>
					<div class="name_body">
						{{ data?.goodsInfo?.goodsName }}-{{ data?.goodsInfo?.gId }}
					</div>
					<div class="name_body" @click="data.showShare = true">
						<van-icon style="float: right" name="share-o" />
					</div>
				</div>

				<div class="goods_pra__box">
					<van-cell-group @click="goAddresList">
						<van-cell is-link title="选择" value="配送至:广州" />
						<van-cell
							is-link
							title="发货"
							value="北京 | 快递:"
							label="配送至:广州"
						/>
						<van-cell is-link title="保障" value="假一赔十" />
						<van-cell is-link title="参数" value="书名" />
					</van-cell-group>
				</div>

				<div class="goods-recommend-box">
					<van-cell :border="false" title="推荐" />
					<goodsCard :goodsList="data.recommend"></goodsCard>
				</div>

				<div class="goods-comment-box"></div>
			</refreshList>
		</div>

		<!-- 底部 -->
		<div class="footer_body">
			<van-action-bar>
				<van-action-bar-icon icon="cart-o" @click="goShopcart" text="购物车" />
				<van-action-bar-icon icon="star" text="已收藏" color="#ff5000" />
				<van-action-bar-button
					type="warning"
					@click="addShopcart"
					text="加入购物车"
				/>
				<van-action-bar-button type="danger" text="立即购买" />
			</van-action-bar>
		</div>

		<!-- 分享弹窗 -->
		<van-share-sheet
			v-model:show="data.showShare"
			title="立即分享给好友"
			:options="data?.options"
			@select="onSelect"
		/>
	</div>
</template>

<script setup name="goodsDetail">

import { showToast } from "vant";
const { useCommon, useHome } = $globalStore

const router = useRouter();
const data = reactive({
	conut: 0,
	carouselList: [],
	goodsInfo: {},
	freshMap: {
		refreshLoad: false, // 是否刷新
		listLoading: false, // 是否加载中
		listFinished: false, // 是否加载完成标识
	},
	options: [
		[
			{ name: "微信", icon: "wechat" },
			{ name: "朋友圈", icon: "wechat-moments" },
			{ name: "微博", icon: "weibo" },
			{ name: "QQ", icon: "qq" },
		],
		[
			{ name: "复制链接", icon: "link" },
			{ name: "分享海报", icon: "poster" },
			{ name: "二维码", icon: "qrcode" },
			{ name: "小程序码", icon: "weapp-qrcode" },
		],
	],
	recommend: [],
	showShare: false,
});

//下拉刷新
const onRefresh = () => {
	data.freshMap.refreshLoad = true;
	Promise.all([getGoodsdetal(), getComment()]).then(() => {
		data.freshMap.refreshLoad = false;
	});
};

// 触底加载
const onLoad = () => {};

// 点击分享选项时触发
const onSelect = () => {};

//前往购物车
const goShopcart = () => {
	router.replace({ name: "Shop" });
};

// 添加购物车
const addShopcart = () => {
	store
		.dispatch("ShopCard/getCard")
		.then((res) => {
			if (res?.code === 20000) {
				showToast("添加到购物车成功");
				useCommon.SET_RELAOD_SHOP(true);
			}
		})
		.catch(() => {
			data.refreshLoad = false;
		});
};

//获取商品信息
const getGoodsdetal = (goodsId) => {
	return new Promise((resolve, reject) => {
		useCommon
			.getGoodsdetal()
			.then((res) => {
				if (res.code === 20000) {
					data.carouselList = res?.data?.carouselList.map((item) => {
						return {
							img: item,
						};
					});
					data.goodsInfo = { ...res?.data, gId: goodsId };
				}
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

//推荐
const recommendGoods = () => {
	return new Promise((resolve, reject) => {
		useHome.recommendGoods()
			.then((res) => {
				if (res?.code === 20000) {
					data.recommend = res?.data;
				}
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

//获取评论
const getComment = () => {};

// 跳转到地址列表
const goAddresList = () => {
	router.push({
		name: "addressList",
	});
};

onMounted(() => {
	console.log("获取路由参数:", router?.currentRoute?.value?.query);
	$globalConfigure(() => {
		console.log("缓存页面时--总监听事件接收--用于初始化操作");
		const { goodsId } = router?.currentRoute?.value?.query;
		getGoodsdetal(goodsId);
		recommendGoods();
		getComment();
	}, data);
});
</script>
<style lang="less">
.goods_detail {
	.goods_pra__box > .van-cell-group {
		border-radius: 10px;
		.van-cell--clickable {
			border-radius: 10px;
		}
	}
}
</style>
<style lang="less" scoped>
.goods_detail {
	display: flex;
	flex-direction: column;
	.carousel_box {
		height: 150px;
		width: 100%;
		padding-bottom: 10px;
	}
	.goods_info_box {
		display: flex;
		flex-direction: column;
		background-color: #fff;
		margin: 10px;
		position: sticky;
		top: 0;
		border-radius: 10px;
		.price_body {
			color: red;
		}
		.name_body {
			font-size: 14px;
			font-weight: 600;
			-o-text-overflow: ellipsis;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
		}
		.price_body,
		.name_body,
		.name_body {
			padding: 10px;
		}
	}
	.goods_pra__box {
		margin-left: 10px;
		margin-right: 10px;
	}
	.goods-recommend-box {
		margin: 10px;
	}
}
</style>
