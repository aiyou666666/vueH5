<template>
  <div>
    <router-view></router-view>
    <div class="footerHeight">
    <div class="footer">
      <ul>
        <router-link tag="li" v-for="l in list" :to="l.uri" :key="l.id">
          <i>{{l.name}}</i>
          <!--<div class="icon"  v-bubble="{show:l.show,afterHide: (hide.bind(this,l)),value : msgNum}"   v-if="l.id==2&&(msgNum!=0||msgNum.data?msgNum.data!=0:'')" :class="{iconactive:msgNum>=100}">{{msgNum | msgNum}}</div>-->
         <div class="icon"   v-if="l.id==2&&(msgNum!=0||msgNum.data?msgNum.data!=0:'')" :class="{iconactive:msgNum>=100}">{{msgNum | msgNum}}</div>
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
	  created(){
      api.msgNumfind({
        method: 'get',
        _this:this,
        headers: {
          'X-AEK56-Token': Vue.ls.get("X-AEK56-Token")
        }
      }).then(response=> {
        Vue.ls.set("msgNum", response)
      })
    },
    data() {
			return {
			  number:'',
				userInfo:{},
				list: [{
					id: 1,
					name: '首页',
					uri: '/home',
					show:false
				}, {
					id: 2,
					name: '消息',
					uri: '/message',
					show:true
				}],
        isActive:false,
        msgNum:Vue.ls.get("msgNum")
			}

		},
		methods:{
			hide(data) {
        this.msgNum = 0
        data['show'] = false
      }


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
        width: 50%;
        float: left;
        text-align: center;
        text-align: center;
        color:#333;
        height:  pxToRem(95px);
        line-height:pxToRem(45px);
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
    position: relative;
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
    font-size:pxToRem(20px) ;
    border-radius: 50%;
    right:36%;
    top:-3%;
    width: pxToRem(37px);
    height: pxToRem(37px);
    text-align: center;
    line-height: pxToRem(39px);
  }
  .iconactive{
    width: pxToRem(52px);
    border-radius:  pxToRem(25px);
    right:pxToRem(116px);
  }
</style>
