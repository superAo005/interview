<template>
	<div class="address_edit">
		<!-- 导航栏 -->
		<div class="header_body">
			<header-nav
				:slefBack="true"
				@goBack="goBack"
				:titelText="`${queryaddressId ? '编辑' : '新增'}地址`"
			>
			</header-nav>
		</div>
		<!-- 中间 -->
		<div class="warp_body">
			<van-address-edit
				:area-list="data?.areaList"
				:address-info="data?.addressInfo"
				show-postal
				show-delete
				show-set-default
				show-search-result
				:search-result="data?.searchResult"
				:area-columns-placeholder="data?.areaColumns"
				@save="onSave"
				@delete="onDelete"
				@change-detail="onChangeDetail"
			/>
		</div>
	</div>
</template>

<script setup name="addressEdit">

import util from "@/util/area";
const { useMy } = $globalStore

const router = useRouter();
const route = useRoute();
let queryaddressId = ref("");
const data = reactive({
	searchResult: [],
	areaList: util.areaList,
	addressInfo: {},
	areaColumns: ["请选择", "请选择", "请选择"],
});

// 返回
const goBack = () => {
	router.go(-1);
};

// 保存地址操作
const onSave = () => {
	router.replace({ name: "addressList" });
};

// 删除地址操作
const onDelete = () => {
	router.replace({ name: "addressList" });
};

// 修改详细地址
const onChangeDetail = () => {};

// 获取编辑地址数据
const getEditdata = async (addressId) => {
	const res = await useMy.getAddressedit({ addressId: addressId });
	if (res.code === 20000) {
		data.addressInfo = res?.data;
		data.areaColumns = [res?.data?.province, res?.data?.city, res?.data?.area];
	}
};
watchEffect(() => {
	if (route?.query?.addressId) {
		queryaddressId = route?.query?.addressId;
	}
});
onMounted(() => {
	route?.query?.addressId && getEditdata(route?.query?.addressId);
	nextTick(() => {
		if (!route?.query?.addressId) {
			data.addressInfo = {};
		}
	});
});
</script>
<style lang="less" scoped>
.address_edit {
	.warp_body {
		height: calc(100vh - 46px);
	}
}
</style>
