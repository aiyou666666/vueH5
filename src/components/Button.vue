<template>
  <div>
    <div class="btn"><slot></slot></div>
  </div>
</template>
<script>
  export default{

  }
</script>
<style lang="scss">
  @import "../assets/scss/reset.scss";
  @import "../assets/scss/my-mixin.scss";
  .btn{
    font-size: pxToRem(32px);
    @include color(#fff,#f7931e);
    @include height(40px,40px);
    width: pxToRem(560px);
  }
</style>
