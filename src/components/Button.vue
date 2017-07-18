<template>
	<div>
		<div class="btn">
			<slot></slot>
		</div>
	</div>
</template>
<script>
 import api from '../service/api.js' //接口调用入口
	export default {
		methods: {


		}

	}
</script>
<style lang="scss" scoped>
  @import "../assets/scss/reset.scss";
  @import "../assets/scss/my-mixin.scss";
  .btn{
    font-size: pxToRem(32px);
    @include color(#fff,#f7931e);
    @include height(40px,40px);
    width: pxToRem(560px);
    margin-bottom: pxToRem(30px);
  }
</style>


