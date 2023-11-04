<template>
	<div class="setting">
		<!-- 导航栏 -->
		<div class="header_body">
			<header-nav titelText="设置"></header-nav>
		</div>

		<!-- 中间 -->
		<div class="warp_body">
			<div class="user_info__box">
				<van-row gutter="20">
					<van-col span="4">
						<van-image
							round
							width="60"
							height="60"
							src="https://img.yzcdn.cn/vant/cat.jpeg"
						/>
					</van-col>
					<van-col span="20">
						<div class="right_box">
							<div class="name_text">昵称</div>
							<div class="sign_text">签名</div>
						</div>
					</van-col>
				</van-row>
				<van-cell
					class="addr_cell"
					value="收货地址"
					is-link
					@click="goAddress"
				></van-cell>
			</div>
		</div>

		<!-- 底部 -->
		<div class="footer_body"></div>
	</div>
</template>

<script setup name="setting">

const router = useRouter();
// 前往地址列表
const goAddress = () => {
	router.push({ name: "addressList" });
};
onMounted(() => {});
</script>
<style lang="less" scoped>
.setting {
	.warp_body {
		height: calc(100vh - 46px);
		.user_info__box {
			position: relative;
			margin: 10px;
			padding: 10px;
			background: #fff;
			border-radius: 6px;
			font-size: 14px;
			color: #aaa;
			.right_box {
				display: flex;
				flex-direction: column;
				height: 100%;
				.name_text {
					margin: auto auto auto 10px;
				}
				.sign_text {
					margin: auto auto auto 10px;
				}
			}
			.addr_cell {
				border-top: 1px solid #eee;
				margin-top: 10px;
				padding-bottom: 0px;
			}
		}
	}
}
</style>
