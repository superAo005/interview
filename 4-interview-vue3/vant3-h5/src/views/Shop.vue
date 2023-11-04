<template>
	<div class="shop app_content">
		<!-- 导航栏 -->
		<div class="header_body">
			<header-nav :leftArrow="false" titelText="购物车"></header-nav>
		</div>

		<!-- 中间 -->
		<div class="warp_body">
			<lodding-card :isLodding="isLodding">
				<van-pull-refresh
					v-model="refreshLoad"
					@refresh="onRefresh"
					class="refresh_box"
				>
					<div class="refresh_content" v-if="data?.cartList.length">
						<div
							class="goods_box"
							v-for="(item, index) in data?.cartList"
							:key="index"
						>
							<van-swipe-cell class="swipe_cell">
								<div class="card_box">
									<van-checkbox
										style="margin-left: 10px"
										v-model="item.checked"
										@change="oneCheckbox(item)"
									></van-checkbox>
									<van-card
										class="card_body"
										:min="1"
										:max="999"
										centered
										:desc="item?.desc"
										:title="item?.name"
										:thumb="item?.img"
										@click.stop="goto($event, item)"
									>
										<template #price>
											<div style="color: red">¥ {{ item?.price }}</div>
										</template>

										<template #footer>
											<van-stepper
												v-model="item.num"
												@plus="plus(item)"
												@minus="minus(item)"
												@blur="stpBlur(item)"
												@overlimit="stplimit"
												:min="1"
												:max="99"
												theme="round"
												button-size="22"
											/>
										</template>
									</van-card>
								</div>

								<template #right>
									<div style="height: 100%">
										<van-button
											style="height: 100%"
											square
											@click="delGoods(item)"
											type="danger"
											text="删除"
										/>
									</div>
								</template>
							</van-swipe-cell>
						</div>
					</div>
					<van-empty v-else class="no_data" description="暂无数据" />
				</van-pull-refresh>
			</lodding-card>
		</div>

		<!-- 底部 -->
		<div class="footer_body">
			<van-submit-bar
				:price="totalPrice"
				button-text="提交订单"
				class="footer-one-btn"
				@submit="onSubmit"
			>
				<van-checkbox v-model="allchecked" @click="allCheckbox(allchecked)"
					>全选</van-checkbox
				>
			</van-submit-bar>
			<footer-nav></footer-nav>
		</div>
	</div>
</template>

<script setup name="Shop">
import { showToast } from "vant"; // 引入提示组件

import { setGoodsNum } from "@/util/util"; // 导出工具类
const { useCommon, useShopCard } = $globalStore

const router = useRouter();
let allchecked = ref(false); // 是否全选
let refreshLoad = ref(false); // 是否加载中
let isLodding = ref(true); // lodding标识
let totalPrice = ref(0); // 总钱数
let data = reactive({
	cartList: [],
}); // 列表

//提交订单
const onSubmit = () => {};

//下拉刷新
const onRefresh = () => {
	allchecked.value = false;
	getCard();
};

//计算购物车数量
const calculationNum = () => {
	let num = 0;

	data.cartList.forEach((item) => {
		num += parseInt(item?.num);
	});
	setGoodsNum(num);
};

//计算价格
const calculation = () => {
	let res = 0;
	data.cartList.forEach((item) => {
		if (item?.checked) {
			res += parseFloat(item?.num * parseFloat(item?.price));
		}
	});

	calculationNum();
	return isNaN(res) ? 0 : res.toFixed(2).replace(/\./, "");
};

//计算与总计
const handlerFc = () => {
	calculation();
	totalPrice.value = parseFloat(calculation());
};

//全选择
const allCheckbox = (val) => {
	nextTick(() => {
		data.cartList = data?.cartList.map((item) => {
			return {
				...item,
				checked: val,
			};
		});
		totalPrice.value = parseFloat(calculation());
	});
};

//单个选
const oneCheckbox = (item) => {
	data.cartList.forEach((it) => {
		if (it?.id == item?.id) {
			it.checked = item?.checked;
		}
	});
	totalPrice.value = parseFloat(calculation());
	allchecked.value = data.cartList.every((item) => {
		return item.checked;
	});
};

//加
const plus = async (item) => {
	let res = await changeGoods({ id: item.id });
	if (res.code === 20000) {
		handlerFc();
	} else {
		item.num -= 1;
		showToast(res.msg);
	}
};

//减
const minus = async (item) => {
	let res = await changeGoods({ id: item?.id });
	if (res.code === 20000) {
		handlerFc();
	} else {
		item.num += 1;
		showToast(res.msg);
	}
};

//删除商品
const delGoods = async (item) => {
	const res = await useShopCard.delGoods({ id: item?.id });
	if (res.code === 20000) {
		data.cartList = data?.cartList.filter((it) => {
			return it.id != item?.id;
		});

		nextTick(() => {
			handlerFc();
		});

		allchecked.value = data?.cartList.length
			? data.cartList.every((item) => {
					return item?.checked;
			  })
			: false;
	}
};

//输入框失去焦点
const stpBlur = async (item) => {
	let res = await changeGoods({ id: item?.id });
	if (res?.code === 20000) {
		handlerFc();
	} else {
		showToast(res?.msg);
	}
};

// 最大、最小时提示
const stplimit = (e) => {
	let tip = {
		plus: "增加",
		minus: "减少",
	};
	showToast(`宝贝不能再${tip[e]}了`);
};

//获取购物车数据
const getCard = async () => {
	const res = await useShopCard.getCard();
	if (res?.code === 20000) {
		data.cartList = res?.data;
	}
	isLodding.value = false;
	refreshLoad.value = false;
};

//点击加、减、输入框处理
const goto = (e, item) => {
	let target = e?.srcElement || e?.target;
	if (!["BUTTON", "INPUT"].includes(target?.tagName)) {
		router.push({
			name: "goodsDetail",
			query: {
				goodsId: item?.id,
			},
		});
	}
};

// 操作购物车数量接口
const changeGoods = (parmas) => {
	return new Promise(async (resolve) => {
		const res = await useShopCard.changeGoods(parmas);
		resolve(res);
	});
};

onMounted(() => {
	getCard();
});

onActivated(() => {
	if (useCommon.is_reload_card.value) {
		getCard();
	}
});

onDeactivated(() => {
	useCommon.SET_RELAOD_SHOP(false);
});
</script>
<style lang="less">
.shop {
	.footer-one-btn {
		bottom: 50px;
		.van-submit-bar__bar > .van-submit-bar__button--danger {
			width: 90px !important;
			height: 30px !important;
		}
	}
}
</style>

<style lang="less" scoped>
.shop {
	.warp_body {
		height: calc(100vh - 146px);
		position: relative;
		.goods_box {
			display: flex;
			background-color: #fff;
			margin: 6px;
			border-radius: 10px;
			.swipe_cell {
				width: 100%;
			}
			.card_box {
				display: flex;
				width: 100%;
				.card_body {
					background-color: #fff;
					border-radius: 10px;
					flex: 1;
				}
			}
		}
	}
	.warp_body > .refresh_box {
		height: 100% !important;
	}
}
</style>
