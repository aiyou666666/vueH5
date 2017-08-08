<template>
  <div class="name">
    <div class="content">
      <div class="loginImg"><img src="../assets/images/logo.png" alt=""></div>
      <div class="loginTitle">爱医康设备平台</div>
      <div class="loginInput"><img src="../assets/images/yh.png" alt="">
      <input type="text" v-model="userTelemail" placeholder="手机号/邮箱"></div>
      <div class="loginInput yanzhengma"><img src="../assets/images/yzm.png" alt="">
      <input type="text" v-model="phonemessage" class="phonemessage" placeholder="验证码">
       <button v-show="!isCountDown" @click="getCaptchaCode()"  :class="{current:isCurrent,light:isLight}" :disabled="!isLight">获取验证码</button>
       <input type="text" class="countdownInput" v-model="countDownTime" v-show="isCountDown" readonly="readonly" />
      </div>
      <div class="loginInput marginBottom"><img src="../assets/images/mm.png" alt="">
      <input type="password" v-model="userpassword" placeholder="密码">
      </div>
      <button-com @click.native="resetPassword()" :class="{active:isActive,btn:!isActive}">确认重置密码</button-com>
      <router-link class="changeMsg" to="/" tag="div">返回登录</router-link>
    </div>
  </div>
</template>
<script>
	import ButtonCom from '../components/Button'
	import Vue from 'vue'
	import api from '../service/api.js'
	import  utils from '../service/utils.js'
	import { Toast } from 'mint-ui'
	import qs from 'qs'
	export default {
		components: {
			ButtonCom
		},
		data(){
			return{
        isLight:false,
			  isActive:false,
        isCurrent:false,
				userTelemail:'',         //用户的手机或者邮箱
				phonemessage:'',         //用户收到的短信验证码
				userpassword:'',         //用户设置的新密码
				countDownTime:'60s',     //倒计时的时间
				isCountDown:false,       //是否进行倒计时
				timeOut:null             //定时器

			}
		},
		methods:{
			validation(isGetMsg){
				if(!utils.isEmail(this.userTelemail) && !utils.isTelphone(this.userTelemail)){
					Toast({
						message:"请填写正确的账号",
						position: 'center',
						duration: 1500
		       })
          setTimeout(()=>{
            this.isCurrent=false
          },1000)
          setTimeout(()=>{
            this.isActive=false
        },1000)
					return false
				}else if(this.userpassword==''){
					if(isGetMsg)return true
					Toast({
						message:"请填写密码",
						position: 'center',
						duration: 1500
		      })
          setTimeout(()=>{
            this.isActive=false
        },1000)
					return false
				}	else{
          setTimeout(()=>{
            this.isActive=false
        },1000)
          setTimeout(()=>{
            this.isCurrent=false
        },1000)
					return true
				}
			},

		getCaptchaCode(){
      this.isCurrent=true
			if(!this.validation(true))return
			Vue.ls.remove('X-AEK56-Token')
      this.countDown()
//			api.getCaptcha({
//				data:{
//					"account":this.userTelemail
//				},
//				 method:'get'
//
//			}).then(response=>{
//				this.countDown()
//			})
		},
		resetPassword(){
      this.isActive=true
			if(!this.validation(false))return
			api.resetPassword({
				 data:{
				 	"account":this.userTelemail,
				 	"code":this.phonemessage,
				 	"password":this.userpassword
				 }
			}).then(response=>{
				Toast({
						message:"修改成功",
						position: 'center',
						duration: 1500
		  })
				 this.$router.push('/')    //修改成功 返回登录页面

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
      userTelemail: function (val) {
        if (utils.isEmail(this.userTelemail) || utils.isTelphone(this.userTelemail)) {
          this.isLight=true
        }
      }
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
     position: relative;
    input.phonemessage{
      width:  pxToRem(200px);
    }
    button{
      float: right;
      background-color: #bebebe;
      color: #fff;
      border: 0;
      height:pxToRem(80px);
      font-size:pxToRem(32px) ;
     /* padding: 0 15px;*/
      line-height:pxToRem(80px);
      border-radius: 3px;
      width:pxToRem(200px);
    }

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
  .marginBottom{
    margin-bottom: pxToRem(120px);
  }
  .content .current{
    background: #faae5c;
  }
  .yanzhengma .light{
    background: #f8931f;
  }
</style>
