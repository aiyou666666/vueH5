<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view transition="back" keep-alive></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import './assets/scss/reset.scss';
#app{
  height: 100%;
}
[v-cloak] {
  display: none;
}

.mint-actionsheet-listitem, .mint-actionsheet-button{
  font-size: pxToRem(28px);
}
.mint-actionsheet-listitem {
  border-bottom: solid 1px #e5e5e5;
}
.mint-actionsheet{
  background: #eff3f6;
}
.mint-popup-2 {
  width: 100%;
  height: 50px;
  text-align: center;
  background-color: rgba(0,0,0,.7);
  backface-visibility: hidden;
}
.mint-popup-2 p {
  line-height: 50px;
  color: #fff;
  font-size:  pxToRem(32px);
img{
  width: pxToRem(30px);
  height: pxToRem(30px);
  display: inline-block;
  margin-right:pxToRem(25px);
}
}
.clickSheet{
  color: #f7931e !important;
}
.mint-datetime-confirm{
  color: #f7931e;
}
.mint-datetime-cancel{
  color:#999;
}
.picker-item{
  color: #bebebe;
}
.picker-item.picker-selected{
  color:#666;
}
.mint-swipe-indicators{
  bottom:  pxToRem(200px);
}
.mint-swipe-indicator.is-active{
  background: #fff;
}
.mint-swipe-indicator{
  border: 1px solid #fff;
}
.mint-swipe-indicator{
   opacity: 1;
  }
</style>
