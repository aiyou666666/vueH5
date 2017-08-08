<template>
	<div>
		<div >
			<slot></slot>
		</div>
	</div>
</template>
<script>
	export default {
	  data(){
	    return{
	      isActive:false
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../assets/scss/reset.scss";
  @import "../assets/scss/my-mixin.scss";
</style>


