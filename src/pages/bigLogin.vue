<template>
  <div class="name">
    <div   v-show="login">
      <div class="content">
        <div class="loginImg"><img src="../assets/images/logo.png" alt=""></div>
        <div class="loginTitle">爱医康设备平台</div>
        <div class="loginInput"><img src="../assets/images/yh.png" alt="">
          <input type="text"   v-model="username" placeholder="手机号/邮箱">
        </div>
        <div class="loginInput"><img src="../assets/images/mm.png" alt="">
          <input type="password" v-model="password" placeholder="密码">
        </div>
        <div class="forgetPassword"  @click="findMsg">忘记密码 ?</div>
        <button-com  @click.native="loginBtn" :class="{active:isActive,btn:!isActive}">登录</button-com>
        <div  class="changeMsg"   @click="msgLogin">切换短信登录</div>
      </div>
    </div>
    <div class="name" v-show="msglogin">
      <div class="content">
        <div class="loginImg"><img src="../assets/images/logo.png" alt=""></div>
        <div class="loginTitle">爱医康设备平台</div>
        <div class="loginInput"><img src="../assets/images/yh.png" alt=""><input type="text" v-model="userphone" placeholder="手机号"></div>
        <div class="loginInput yanzhengma marginBottom">
          <img src="../assets/images/yzm.png" alt="">
          <input type="text" v-model="phonemsg" class="phonemessage" placeholder="验证码">
          <button @click="getCaptchaCode()" v-show="!isCountDownm" :class="{current:isCurrentm,light:isLightm}" :disabled="isDisabled">获取验证码</button>
          <input type="text" class="countdownInput" v-model="countDownTimem" v-show="isCountDownm" readonly="readonly" />
        </div>
        <button-com @click.native="messageLogin()" :class="{active:isActivem,btn:!isActivem}">登录</button-com>
        <div class="changeMsg" @click="loginchange" >切换密码登录</div>
      </div>
    </div>
    <div class="name" v-show="findlogin">
      <div class="content">
        <div class="loginImg"><img src="../assets/images/logo.png" alt=""></div>
        <div class="loginTitle">爱医康设备平台</div>
        <div class="loginInput"><img src="../assets/images/yh.png" alt="">
          <input type="text" v-model="userTelemail" placeholder="手机号/邮箱"></div>
        <div class="loginInput yanzhengma"><img src="../assets/images/yzm.png" alt="">
          <input  type="text" v-model="phonemessage" class="phonemessage" placeholder="验证码">
          <button v-show="!isCountDownf" @click="getCaptchaCodef()"  :class="{current:isCurrentf,light:isLightf}" :disabled="isDisabledf">获取验证码</button>
          <input type="text" class="countdownInput" v-model="countDownTimef" v-show="isCountDownf" readonly="readonly" />
        </div>
        <div class="loginInput marginBottom"><img src="../assets/images/mm.png" alt="">
          <input type="password" v-model="userpassword" placeholder="密码">
        </div>
        <button-com @click.native="resetPassword()" :class="{active:isActivef,btn:!isActivef}">确认重置密码</button-com>
        <div class="changeMsg" @click="loginchange" >返回登录</div>
      </div>
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
      data(){
        return {
          login: true,
          msglogin: false,
          findlogin: false,
//          login
          username: Vue.ls.get("username")?Vue.ls.get("username"):'',
          password: '',
          msgNum: '',
          isActive: false,
          deviceId: utils.getDeviceUnqinId(),   //生成设备唯一Id
//          msglogin
          isLightm: false,
          isDisabled: true,
          isActivem: false,
          msgNum: '',
          isCurrentm: false,
          userphone: '',     //手机号
          phonemsg: '',      //短信验证码
          deviceId: utils.getDeviceUnqinId(), //设备唯一id
          countDownTimem: '60s',        //倒计时的时间
          isCountDownm: false,       //是否进行倒计时
          timeOutm: null,             //定时器
//          findmsg
          isLightf: false,
          isDisabledf: true,
          isActivef: false,
          isCurrentf: false,
          userTelemail:'',         //用户的手机或者邮箱
          phonemessage: '',         //用户收到的短信验证码
          userpassword: '',         //用户设置的新密码
          countDownTimef: '60s',     //倒计时的时间
          isCountDownf: false,       //是否进行倒计时
          timeOutf: null             //定时器
        }
      },
      components: {
        ButtonCom
      },

      created(){
//        login
        document.title="登录"
        document.body.style.background="#fff";
        if (Vue.ls.get("X-AEK56-Token")) {
          this.getmsgNum(()=> {
            this.$router.push({path: '/tabbar', query: {isLogin: true}});
          })
        }
      },
      destroyed(){
      	document.body.style.background="#eff3f6";
      },
      methods: {
//        login
        findMsg(){
          this.login = false
          this.msglogin = false
          this.findlogin = true
          this.password=''
          document.title="忘记密码"
        },
        msgLogin(){
          this.login = false
          this.msglogin = true
          this.findlogin = false
          this.password=''
          document.title="登录"
        },
        validation(){
          if (!utils.isEmail(this.username) && !utils.isTelphone(this.username)) {
            Toast({
              message: "请填写正确的账号",
              position: 'center',
              duration: 1500
            })
            setTimeout(()=> {
              this.isActive = false
            }, 1000)
            return false
          } else if (this.password == '') {
            Toast({
              message: "请填写密码",
              position: 'center',
              duration: 1500
            })
            setTimeout(()=> {
              this.isActive = false
            }, 1000)
            return false
          } else {
            setTimeout(()=> {
              this.isActive = false
            }, 1000)
            return true
          }
        },
        getmsgNum(callback){
          api.msgNumfind({
            method: 'get',
            _this:this,
            headers: {
              'X-AEK56-Token': Vue.ls.get("X-AEK56-Token")
            }
          }).then(response=> {
            Vue.ls.set("msgNum", response)
            callback && callback()
          })
        },
        loginBtn() {
          this.isActive = true
          if (!this.validation())return
          Vue.ls.clear()
          api.Login({
            data: {
              "username": this.username,
              "password": this.password,
              "deviceId": this.deviceId
            },
            noToken:"noNeed",
            _this:this,
            method: 'post'

          }).then(response => {

          	//vue-ls设置有效期时会 自动加一个new Date().getTime()
            Vue.ls.set("X-AEK56-Token", response.token, response.expire-new Date().getTime());
            this.getmsgNum(()=> {
              this.$router.push({path: '/tabbar', query: {isLogin: true}});
            })


          })
        },
//        msglogin
        loginchange(){
          this.login = true
          this.msglogin = false
          this.findlogin = false
          this.phonemsg=''
          this.phonemessage=''
          this.userpassword=''
          document.title="登录"
//          this.userTelemail=Vue.ls.get("userTelemail")?Vue.ls.get("userTelemail"):''
//          this.userphone=Vue.ls.get("userphone")?Vue.ls.get("userphone"):''
//          this.username=Vue.ls.get("username")?Vue.ls.get("username"):''
        },
        validationm(){
          if (!utils.isTelphone(this.userphone)) {
            Toast({
              message: "请填写正确的手机号",
              position: 'center',
              duration: 1500
            })
            setTimeout(()=> {
              this.isCurrentm = false
            }, 1000)
            setTimeout(()=> {
              this.isActivem = false
            }, 1000)
            return false
          } else {
            setTimeout(()=> {
              this.isCurrentm = false
            }, 1000)
            setTimeout(()=> {
              this.isActivem = false
            }, 1000)
            return true
          }
        },
        //获取短信验证码
        getCaptchaCode(){
          this.isCurrentm = true
          if (!this.validationm())return
          api.getMsgCaptcha({
            data: qs.stringify({
              "mobile": this.userphone,
              "deviceId": this.deviceId
            }),
            noToken:"noNeed",
            _this:this,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).then(response=> {
            /*倒计时*/
            this.countDownm()
          })
        },
        //短信登录
        messageLogin(){
          this.isActivem = true
          if (!this.validationm())return
          api.Login({
            data: {
              "username": this.userphone,
              "password": this.phonemsg,
              "deviceId": this.deviceId,
              "loginType":1
            },
            noToken:"noNeed",
            _this:this
          }).then(response=> {
            Vue.ls.set("X-AEK56-Token", response.token, response.expire)
            api.msgNumfind({
              headers: {
                'X-AEK56-Token': Vue.ls.get("X-AEK56-Token")
              },
              _this:this,
              method: 'get'
            }).then(response=> {
              Vue.ls.set("msgNum", response);
//              callback && callback()
              this.$router.push({path: '/tabbar', query: {isLogin: true}});
            })
          })
        },
        countDownm(){
          this.isCountDownm = true
          this.countDownTimem = '60s'
          this.timeOutm = setInterval(this.updataTime, 1000)
        },
        updataTime(){
          this.countDownTimem = parseInt(this.countDownTimem)
          if (this.countDownTimem<=1) {
            this.countDownTimem = '59s'
            this.isCountDownm = false
            clearInterval(this.timeOutm)
          } else {
            this.countDownTimem--
            this.countDownTimem = this.countDownTimem + 's'
          }
        },
//       findmsg
        countDownf(){
          this.isCountDownf=true
          this.countDownTimef = '60s'
          this.timeOutf=setInterval(this.updataTimef,1000)
        },
        updataTimef(){
          this.countDownTimef = parseInt(this.countDownTimef)
          if (this.countDownTimef <= 1) {
            this.countDownTimef = '59s'
            this.isCountDownf = false
            clearInterval( this.timeOutf)
          } else {
            this.countDownTimef--
            this.countDownTimef = this.countDownTimef + 's'
          }
        },
        validationf(isGetMsg){
          console.log(/^[A-Za-z0-9]{8,16}$/.test(this.userpassword))
          if(!this.userTelemail){
            Toast({
              message:"请输入账号",
              position: 'center',
              duration: 1500
            })
            setTimeout(()=>{
              this.isCurrentf=false
            },1000)
            setTimeout(()=>{
              this.isActivef=false
            },1000)
            return false
          } else if(!utils.isEmail(this.userTelemail) && !utils.isTelphone(this.userTelemail)){
            Toast({
              message:"请填写正确的账号",
              position: 'center',
              duration: 1500
            })
            setTimeout(()=>{
              this.isCurrentf=false
            },1000)
            setTimeout(()=>{
              this.isActivef=false
            },1000)
            return false
          }else if(this.phonemessage==''){
            if(isGetMsg)return true
            Toast({
              message:"请填写验证码",
              position: 'center',
              duration: 1500
            })
            setTimeout(()=>{
              this.isActivef=false
            },1000)
            return false
          }else if(this.userpassword==''){
            if(isGetMsg)return true
            Toast({
              message:"请填写新密码",
              position: 'center',
              duration: 1500
            })
            setTimeout(()=>{
              this.isActivef=false
            },1000)
            return false
          }else if(!(/^[A-Za-z0-9]{8,16}$/.test(this.userpassword))){
            if(isGetMsg)return true
            Toast({
              message:"新密码只能8~16位的数字或字母",
              position: 'center',
              duration: 1500
            })
            setTimeout(()=>{
              this.isActivef=false
            },1000)
            return false
          }	else{
            setTimeout(()=>{
              this.isActivef=false
            },1000)
            setTimeout(()=>{
              this.isCurrentf=false
            },1000)
            return true
          }
        },

        getCaptchaCodef(){
          this.isCurrentf=true
          if(!this.validationf(true))return
          Vue.ls.remove('X-AEK56-Token')
          api.getCaptcha({
            data:{
              "account":this.userTelemail
            },
            noToken:"noNeed",
            method:'get',
            _this:this

          }).then(response=>{
            this.countDownf()
          })
        },
        resetPassword(){
          this.isActivef=true
          if(!this.validationf(false))return
          api.resetPassword({
            data:{
              "account":this.userTelemail,
              "code":this.phonemessage,
              "password":this.userpassword
            },
            _this:this,
            method: 'get',
            headers: {'Content-Type': "application/x-www-form-urlencoded"}
          }).then(response=>{
//            修改成功直接跳首页
            api.Login({
              data: {
                "username": this.userTelemail,
                "password": this.userpassword,
                "deviceId": this.deviceId
              },
              _this:this,
              method: 'post',
              noToken:'noNeed'
            }).then(response => {

              //vue-ls设置有效期时会 自动加一个new Date().getTime()
              Vue.ls.set("X-AEK56-Token", response.token, response.expire-new Date().getTime());
              this.getmsgNum(()=> {
                this.$router.push({path: '/tabbar', query: {isLogin: true}});
              })


            })
          })
        },

      },
      watch: {
//        login
        username: function (val) {
          if (utils.isEmail(this.username) || utils.isTelphone(this.username)) {
            this.isLightf = true
            this.isDisabledf = false
//            Vue.ls.set("username", this.username)
          }
        },
//        msg
        userphone: function (val) {
          if (utils.isTelphone(val)) {
            this.isLightm = true
            this.isDisabled = false
//            Vue.ls.set("userphone", this.userphone)
          }else{
            this.isLightm = false
            this.isDisabled = true
          }
        },
//        findmsg
        userTelemail: function (val) {
          if (utils.isEmail(this.userTelemail) || utils.isTelphone(this.userTelemail)) {
            this.isLightf = true
            this.isDisabledf = false
//            Vue.ls.set("userTelemail",this.userTelemail)
          }
          else{
            this.isLightf = false
            this.isDisablef = true
          }
        }

      }
    }
</script>
<style lang="scss" scoped>
  @import "../assets/scss/reset.scss";
  @import "../assets/scss/my-mixin.scss";
	body {
	        background-color: #000;
	 }
  .name{
    height: 100%;
    background-color: #fff;
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
