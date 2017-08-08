<template>
  <div class="name">
    <div class="content">
      <div class="loginImg"><img src="../assets/images/logo.png" alt=""></div>
      <div class="loginTitle">爱医康设备平台</div>
      <div class="loginInput"><img src="../assets/images/yh.png" alt=""><input type="text" v-model="userphone" placeholder="手机号"></div>
      <div class="loginInput yanzhengma marginBottom">
      	<img src="../assets/images/yzm.png" alt="">
      	<input type="text" v-model="phonemsg" class="phonemessage" placeholder="验证码">
      	<button @click="getCaptchaCode()" v-show="!isCountDown" :class="{current:isCurrent,light:isLight}" :disabled="isDisabled">获取验证码</button>
        <input type="text" class="countdownInput" v-model="countDownTime" v-show="isCountDown" readonly="readonly" />
      </div>
      <button-com @click.native="messageLogin()" :class="{active:isActive,btn:!isActive}">登录</button-com>
      <router-link class="changeMsg" to="/" tag="div">切换密码登录</router-link>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
	import ButtonCom from '../components/Button'
	import api from '../service/api.js'
	import  utils from '../service/utils.js'
	import { Toast } from 'mint-ui'
	import qs from 'qs'
  export default{
    components:{ButtonCom},
    data(){
    	return {
         isLight:false,
         isDisabled:true,
         isActive:false,
         msgNum:'',
         isCurrent:false,
    		 userphone:Vue.ls.get("userphone"),     //手机号
    		 phonemsg:'',      //短信验证码
				 deviceId: utils.getDeviceUnqinId(), //设备唯一id
				 countDownTime:'60s',        //倒计时的时间
				 isCountDown:false,       //是否进行倒计时
				 timeOut:null             //定时器
    	}
    },
    methods:{
    	validation(){
				if(!utils.isTelphone(this.userphone)){
					Toast({
						message:"请填写正确的手机号",
						position: 'center',
						duration: 1500
		       })
          setTimeout(()=>{
            this.isCurrent=false
          },1000)
					return false
				}else{
          setTimeout(()=>{
            this.isCurrent=false
          },1000)
					return true
				}
			},
    	//获取短信验证码
    	getCaptchaCode(){
    	  this.isCurrent=true
    		if(!this.validation())return
    		api.getMsgCaptcha({
    		 data:qs.stringify({
    			"mobile":this.userphone,
    			"deviceId":this.deviceId
    		 }),
    		 headers:{'Content-Type':'application/x-www-form-urlencoded'}
    		}).then(response=>{
    			  /*倒计时*/
    			  this.countDown()
    		})
    	},
    	//短信登录
    	messageLogin(){
        this.isActive=true
        if(!this.validation())return
    		api.Login({
    			data:{
    				"username": this.userphone,
						"password": this.phonemsg,
						"deviceId": this.deviceId
    			}
    		}).then(response=>{
    			Vue.ls.set("X-AEK56-Token",response.token,response.expire)
          api.msgNum({
            method:'get'
          }).then(response=>{
            Vue.ls.set("msgNum",response);
            this.$router.push({path:'/tabbar',query:{isLogin:true}});
          })
    		})
     },
     countDown(){
     	 this.isCountDown=true
     	 this.timeOut=setInterval(this.updataTime,1000)
     },
     updataTime(){
       this.countDownTime=parseInt(this.countDownTime)
       if(this.countDownTime<=0){
         this.countDownTime='60s'
         this.isCountDown=false
         clearInterval(this.Interval)
       }else{
         this.countDownTime--
         this.countDownTime=this.countDownTime+'s'
       }
     }
    },
    watch: {
      userphone: function (val) {
        if (utils.isTelphone(val)) {
          this.isLight=true
          this.isDisabled=false
        }
      }
    },
    beforeDestroy(){
      Vue.ls.set("userphone",this.userphone)
    }
  }
</script>
<style lang="scss" scoped>
  @import "../assets/scss/reset.scss";
  @import "../assets/scss/my-mixin.scss";
  .name{
    height: 100%;
    background: #fff;
  }
  .loginImg{
    /*margin-top: 180px;*/
    text-align: center;
  img{
  @include size(pxToRem(156px),pxToRem(58px));
  }
  }
  .loginTitle{
  @include forget(20px,40px,560px,center,36px,#333);
  }
  .loginInput{
    margin: 20px auto;
    width: pxToRem(560px);
    height:pxToRem(80px);
    border-bottom:1px solid #e5e5e5;
    padding:0 15px;
    line-height:pxToRem(80px);
  img{
  @include size(pxToRem(33px),pxToRem(37px));
    margin-top: -5px;
  }
  input{
  @include size(pxToRem(156px),pxToRem(58px));
    font-size:pxToRem(28px) ;
    margin-left: 15px;
    width:  pxToRem(390px);
    color: #666;
  }
  }
  .changeMsg{
  @include forget(30px,0px,560px,center,28px,#666);
  }
  .yanzhengma{
    padding-right:0;
  input.phonemessage{
    width:  pxToRem(200px);
  }
  button{
    float: right;
    background-color: #bebebe;
    color: #fff;
    border: 0;
    height: pxToRem(80px);
    font-size:pxToRem(32px) ;
    border-radius: 3px;
    width:pxToRem(200px);
  }
  }
  .marginBottom{
       margin-bottom: pxToRem(120px);
       position: relative;
       .countdownInput{
       	 position: absolute;
       	 height:  pxToRem(90px);
       	/* padding: 0 15px;*/
       	 border: none;
       	 margin-top: -5px;
       	 border-radius: 3px;
       	 color: #fff;
       	 background-color:#BEBEBE;
       	 float: right;
       	 text-align: center;
       	 font-size:pxToRem(32px);
       	 margin-left: 0;
       	 right: 0;
       	 width:pxToRem(200px);
       }
     }
  .yanzhengma .current{
    background: #faae5c;
  }
  .yanzhengma .light{
    background: #f8931f;
  }
</style>
