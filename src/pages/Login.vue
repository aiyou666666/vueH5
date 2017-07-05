<template>
	<div>
		<div class="content">
			<div class="loginImg"><img src="../assets/images/logo.png" alt=""></div>
			<div class="loginTitle">爱医康设备平台</div>
			<div class="loginInput"><img src="../assets/images/yh.png" alt=""><input type="text" placeholder="手机号/邮箱"></div>
			<div class="loginInput"><img src="../assets/images/mm.png" alt=""><input type="password" placeholder="密码"></div>
			<router-link class="forgetPassword" tag="div" to="/findpassword">忘记密码 ?</router-link>
			<button-com>登录</button-com>
			<datepicker v-model="birthday" label="生日" date-format="yyyy-mm-dd"></datepicker>
			<router-link class="changeMsg" to="/msglogin" tag="div">切换短信登录</router-link>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue'
	import ButtonCom from '../components/Button'

	export default {
		components: {
			ButtonCom
		},
		data() {
			return {
				birthday: '2016-12-01'
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import "../assets/scss/reset.scss";
	@import "../assets/scss/my-mixin.scss";
	@import '../assets/scss/vonic/ionic/ionic.css';
	@import '../assets/scss/vonic/vonic.scss';
	.loginImg {
		text-align: center;
		img {
			@include size(pxToRem(156px), pxToRem(58px));
		}
	}
	
	.loginTitle {
		@include forget(20px, 40px, 560px, center, 36px, #333);
	}
	
	.loginInput {
		margin: 20px auto;
		width: pxToRem(560px);
		height: 40px;
		border-bottom: 1px solid #e5e5e5;
		padding: 0 15px;
		img {
			@include size(pxToRem(33px), pxToRem(37px));
		}
		input {
			@include size(pxToRem(156px), pxToRem(58px));
			font-size: pxToRem(28px);
			margin-left: 15px;
			width: pxToRem(420px);
			color: #666;
		}
	}
	
	.forgetPassword {
		@include forget(20px, 40px, 560px, right, 28px, #1c95f5);
	}
	
	.changeMsg {
		@include forget(30px, 0px, 560px, center, 28px, #666);
	}
	
	
</style>