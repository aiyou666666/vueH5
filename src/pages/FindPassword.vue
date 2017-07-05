<template>
	<div>
		<div class="content">
			<div class="loginImg"><img src="../assets/images/logo.png" alt=""></div>
			<div class="loginTitle">爱医康设备平台</div>
			<div class="loginInput"><img src="../assets/images/yh.png" alt=""><input type="text" placeholder="手机号/邮箱"></div>
			<div class="loginInput yanzhengma"><img src="../assets/images/yzm.png" alt=""><input type="text" placeholder="验证码"><button>获取验证码</button></div>
			<div class="loginInput marginBottom"><img src="../assets/images/mm.png" alt=""><input type="password" placeholder="密码"></div>
			<button-com>确认重置密码</button-com>
			<router-link class="changeMsg" to="/" tag="div">返回登录</router-link>
		</div>
	</div>
</template>
<script>
	import ButtonCom from '../components/Button'
	export default {
		components: {
			ButtonCom
		}
	}
</script>
<style lang="scss" scoped>
	@import "../assets/scss/reset.scss";
	@import "../assets/scss/my-mixin.scss";
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
	
	.changeMsg {
		@include forget(30px, 0px, 560px, center, 28px, #666);
	}
	
	.yanzhengma {
		padding-right: 0;
		input {
			width: pxToRem(200px);
		}
		button {
			float: right;
			background: #bebeb;
			color: #fff;
			border: 0;
			height: pxToRem(90px);
			font-size: pxToRem(32px);
			padding: 0 15px;
			margin-top: -5px;
			border-radius: 3px;
		}
	}
	
	.marginBottom {
		margin-bottom: pxToRem(120px);
	}
</style>