<template>
  <div  class="name">
    <div class="content">
    <div class="loginImg"><img src="../assets/images/logo.png" alt=""></div>
    <div class="loginTitle">爱医康设备平台</div>
    <div class="loginInput"><img src="../assets/images/yh.png" alt=""><input type="text"   v-model="username" placeholder="手机号/邮箱"></div>
    <div class="loginInput"><img src="../assets/images/mm.png" alt=""><input type="password" v-model="password" placeholder="密码"></div>
    <router-link class="forgetPassword" tag="div" to="/findpassword">忘记密码 ?</router-link>
    <button-com  @click.native="login">登录</button-com>
    <router-link class="changeMsg" to="/msglogin" tag="div" >切换短信登录</router-link>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
	import ButtonCom from '../components/Button'
	import api from '../service/api.js'
	import  utils from '../service/utils.js'
	export default {
		components: {
			ButtonCom
		},
		data() {
			return {
				username: '',
				password: '',
				deviceId: utils.getDeviceUnqinId()   //生成设备唯一Id
			}
		},
		created() {
			
			
		},
		methods: {
			login() {
			Vue.ls.remove('X-AEK56-Token')			
			api.Login({
					data: {
						"username": this.username,
						"password": this.password,
						"deviceId": this.deviceId
					},
					method:'post'
			}).then(response => {	
				    console.log(response);
						Vue.ls.set("X-AEK56-Token",response.token,response.expire);
						this.$router.push({path:'/tabbar',query:{isLogin:true}});
					
			   })

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
  .forgetPassword{
    @include forget(20px,40px,560px,right,28px,#1c95f5);
  }
  .changeMsg{
    @include forget(30px,0px,560px,center,28px,#666);
  }
</style>
