<template>
	<div class="address_list">
		<!-- 导航栏 -->
		<div class="header_body">
			<header-nav titelText="地址列表"></header-nav>
		</div>

		<!-- 中间 -->
		<div class="warp_body">
			<lodding-card :isLodding="isLodding">
				<van-address-list
					v-model="chosenAddressId"
					:list="data?.list"
					:disabled-list="data?.disabledList"
					disabled-text="以下地址超出配送范围"
					default-tag-text="默认"
					@add="onAdd"
					@edit="onEdit"
					@select="selectDefault"
				/>
			</lodding-card>
		</div>

		<!-- 底部 -->
		<div class="footer_body"></div>
	</div>
</template>

<script setup name="addressList">

const { useMy } = $globalStore

const router = useRouter();
let chosenAddressId = ref("");
let isLodding = ref(true);
const data = reactive({
	list: [],
	disabledList: [],
});

// 获取列表数据
const getList = async () => {
	const res = await useMy.getAddersslist();
	isLodding.value = false;
	if (res?.code === 20000) {
		chosenAddressId = res.data.list.filter((item) => {
			return item?.isDefault;
		})?.[0].id;
		data.list = res?.data?.list;
		data.disabledList = res?.data?.disabledList;
	}
};

// 添加地址
const onAdd = () => {
	router.replace({ path: "/addressedit" });
};

// 修改地址
const onEdit = (item) => {
	router.replace({
		path: "/addressedit",
		query: { addressId: item?.id },
	});
};

// 切换地址触发
const selectDefault = (item) => {
	const dataArr = data.list.map((it) => {
		return {
			...it,
			isDefault: it?.id === item?.id ? true : false,
		};
	});
	data.list = dataArr;
};

onMounted(() => {
	$globalConfigure(() => {
		console.log("缓存页面时--总监听事件接收--用于初始化操作");
		getList();
	});
});
</script>
<style lang="less" scoped>
.address_list {
	width: 100%;
}
</style>
