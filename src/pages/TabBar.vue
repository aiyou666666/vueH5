<template>
  <div>
    <router-view></router-view>
    <div class="footerHeight">
    <div class="footer">
      <div class="icon">{{number}}</div>
      <ul>
        <router-link tag="li" v-for="l in list" :to="l.uri" :key="l.id">
          <i>{{l.name}}</i>
        </router-link>
      </ul>
    </div>
  </div>
  </div>

</template>
<script>
	import Vue from 'vue'
	import api from '../service/api.js'
	import utils from '../service/utils.js'
	export default {
    data() {
			return {
			  number:'',
				userInfo:{},
				list: [{
					id: 1,
					name: '首页',
					uri: '/home'
				}, {
					id: 2,
					name: '消息',
					uri: '/message'
				}]
			}
		},
		created() {
      api.msgNum({
        param: {
          id:this.$route.query.id
        },
        method:'get'
      }).then(response => {
          this.number=response
      })
      }
  }
</script>
<style scoped lang="scss">
  @import "../assets/scss/reset.scss";
  @import "../assets/scss/my-mixin.scss";
  .footerHeight{
    height:  pxToRem(95px);
  }
  .footer{
    height:  pxToRem(95px);
    width: 100%;
    position:fixed;
    bottom:0;
    border-top:1px solid  #e5e5e5;
    padding:pxToRem(7px) 0;
    background:#fff;
      li{
        width: 8%;
        float: left;
        margin-left: 21%;
        margin-right: 21%;
        text-align: center;
        color:#333;
        height:  pxToRem(95px);
        i{
          margin-top:pxToRem(45px) ;
          display: block;
        }
      }
  }
  ul li:nth-child(1){
    @include background("../assets/images/zy.png")
    }
  ul li:nth-child(2){
    @include background("../assets/images/xx.png")
  }
  ul li:nth-child(1).is-active{
    color:#f7931e;
    @include background("../assets/images/zydq.png")
  }
  ul li:nth-child(2).is-active{
    color:#f7931e;
    @include background("../assets/images/xxdq.png")
  }
  .icon{
    background: #ff2a2a;
    color: #fff;
    position: absolute;
    z-index: 999;
    font-size:pxToRem(18px) ;
    border-radius: 50%;
    padding:0 pxToRem(5px) ;
    right:17.9%;
    top:-0.1%;
  }
</style>
