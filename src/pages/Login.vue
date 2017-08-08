<template>
  <div  class="name">
    <div class="content">
    <div class="loginImg"><img src="../assets/images/logo.png" alt=""></div>
    <div class="loginTitle">爱医康设备平台</div>
    <div class="loginInput"><img src="../assets/images/yh.png" alt="">
      <input type="text"   v-model="username" placeholder="手机号/邮箱">
    </div>
    <div class="loginInput"><img src="../assets/images/mm.png" alt="">
     <input type="password" v-model="password" placeholder="密码">
    </div>
    <router-link class="forgetPassword" tag="div" to="/findpassword">忘记密码 ?</router-link>
    <button-com  @click.native="login" :class="{active:isActive,btn:!isActive}">登录</button-com>
    <router-link class="changeMsg" to="/msglogin" tag="div" >切换短信登录</router-link>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
	import ButtonCom from '../components/Button'
	import api from '../service/api.js'
	import  utils from '../service/utils.js'
	import { Toast } from 'mint-ui'
	export default {
		components: {
			ButtonCom
		},
		data() {
			return {
				username: Vue.ls.get("username"),
				password: '',
        msgNum: '',
        isActive:false,
				deviceId: utils.getDeviceUnqinId()   //生成设备唯一Id
			}
		},
		created(){
			console.log("11111111111");
			console.log(Vue.ls.get("X-AEK56-Token"));
			if(Vue.ls.get("X-AEK56-Token")){
				/*this.getmsgNum(()=>{
								this.$router.push({path:'/tabbar',query:{isLogin:true}});
					})*/
			}
		},
		methods: {
			validation(){
				if(!utils.isEmail(this.username) && !utils.isTelphone(this.username)){
					Toast({
						message:"请填写正确的账号",
						position: 'center',
						duration: 1500
		       })
          setTimeout(()=>{
            this.isActive=false
          },1000)
					return false
				}else if(this.password==''){
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
					return true
				}
			},
			getmsgNum(callback){
				api.msgNum({
              method:'get',
              headers:{
              	'X-AEK56-Token':Vue.ls.get("X-AEK56-Token")
              }
            }).then(response=>{
              Vue.ls.set("msgNum",response)
              callback && callback()
         })
			},
			login() {
			this.isActive=true
			if(!this.validation())return
			Vue.ls.clear()
			api.Login({
					data: {
						"username": this.username,
						"password": this.password,
						"deviceId": this.deviceId
					},
					method:'post'

			}).then(response => {
				   //vue-ls设置有效期时会 自动加一个new Date().getTime()
						Vue.ls.set("X-AEK56-Token",response.token,response.expire-new Date().getTime());
						this.getmsgNum(()=>{
							this.$router.push({path:'/tabbar',query:{isLogin:true}});
						})

			   })
      }
		},
    beforeDestroy(){
      Vue.ls.set("username",this.username)
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
  .forgetPassword{
    @include forget(20px,40px,560px,right,28px,#1c95f5);
    margin-top: -10px;
  }
  .changeMsg{
    @include forget(30px,0px,560px,center,28px,#666);
  }

</style>
