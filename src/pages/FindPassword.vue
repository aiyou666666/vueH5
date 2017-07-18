<template>
  <div class="name">
    <div class="content">
      <div class="loginImg"><img src="../assets/images/logo.png" alt=""></div>
      <div class="loginTitle">爱医康设备平台</div>
      <div class="loginInput"><img src="../assets/images/yh.png" alt="">
      <input type="text" v-model="userTelemail" placeholder="手机号/邮箱"></div>
      <div class="loginInput yanzhengma"><img src="../assets/images/yzm.png" alt="">
      <input type="text" v-model="phonemessage" class="phonemessage" placeholder="验证码">
       <button v-show="!isCountDown" @click="getCaptchaCode()" >获取验证码</button>
       <input type="text" class="countdownInput" v-model="countDownTime" v-show="isCountDown" readonly="readonly" />
      </div>
      <div class="loginInput marginBottom"><img src="../assets/images/mm.png" alt="">
      <input type="password" v-model="userpassword" placeholder="密码">
      </div>
      <button-com @click.native="resetPassword()">确认重置密码</button-com>
      <router-link class="changeMsg" to="/" tag="div">返回登录</router-link>
    </div>
  </div>
</template>
<script>
	import ButtonCom from '../components/Button'
	import Vue from 'vue'
	import api from '../service/api.js'
	import  utils from '../service/utils.js'
	export default {
		components: {
			ButtonCom
		},
		data(){
			return{
				userTelemail:'',         //用户的手机或者邮箱 
				phonemessage:'',         //用户收到的短信验证码
				userpassword:'',         //用户设置的新密码
				countDownTime:60,        //倒计时的时间
				isCountDown:false,       //是否进行倒计时
				timeOut:null             //定时器
    		 
			}	
		},
		methods:{
			
		getCaptchaCode(){
			
			this.countDown()    //测试倒计时 这行代码到时需要删除
			
			api.getCaptcha({
				data:{
					"account":this.userTelemail
				}
			}).then(response=>{
				this.countDown()
			})	
		},
		resetPassword(){
			api.resetPassword({
				 data:{
				 	"account":this.userTelemail,
				 	"code":this.phonemessage,
				 	"password":this.userpassword
				 }	
			}).then(response=>{
				 console.log("修改成功");
				
			})
		},
		countDown(){
     	 this.isCountDown=true
     	 this.timeOut=setInterval(this.updataTime,1000)	 
     },
     updataTime(){
     	 if(this.countDownTime<=0){
     	 	   this.countDownTime=60
     	 	   this.isCountDown=false
     	 	   clearInterval(this.Interval)
     	 }else{
     	 	   this.countDownTime-- 	
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
    height:40px;
    border-bottom:1px solid #e5e5e5;
    padding:0 15px;
  img{
  @include size(pxToRem(33px),pxToRem(37px));
  }
  input{
  @include size(pxToRem(156px),pxToRem(58px));
    font-size:pxToRem(28px) ;
    margin-left: 15px;
    width:  pxToRem(420px);
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
      background-color:#f7931e;
      color: #fff;
      border: 0;
      height:  40px;
      font-size:pxToRem(32px) ;
     /* padding: 0 15px;*/
      line-height:  40px;
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
</style>
