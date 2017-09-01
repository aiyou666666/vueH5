<template>
  <div>
    <div class="background"></div>
    <div class="msgList">
      <ul>
        <li class="firstLi">
          <div>{{userInfo.realName}}</div>
          <div><span style="float: left">{{userInfo.deptName}}</span><span style="float: right">{{currentUser.jobName}}</span></div>
        </li>
        <li class="secondLi">
          <span>所属机构</span><span>{{userInfo.tenantName}}</span>
        </li>
      </ul>
    </div>
    <div class="background"></div>
    <div class="msgList">
      <ul>
        <li>
          <span>ID</span><span>{{userInfo.id}}</span>
        </li>
        <li>
          <span>手机号</span><span>{{userInfo.mobile}}</span>
        </li>
        <li>
          <span>邮箱</span><span>{{userInfo.email}}</span>
        </li>
      </ul>
    </div>
    <button-com class="btnLeave" @click.native="loginout" :class="{active:isActive,btn:!isActive}">退出登录</button-com>
  </div>
</template>
<script>
    import ButtonCom from '../components/Button'
    import api from '../service/api.js'
    import Vue from 'vue'
    export default{
      data(){
        return{
          userInfo: Vue.ls.get("useInfo"),
          isActive:false,
          currentUser:Vue.ls.get("currentuseInfo")
        }
      },
      created(){
        document.title='我的'
        //解决登录返回的问题
       if(!Vue.ls.get("useInfo")){
         	this.$router.push('/')
       }
      },
      components:{ButtonCom},
      methods:{
        loginout(){
               this.isActive=false
               api.loginOut({
               	_this:this,
               headers:{
              	'X-AEK56-Token':Vue.ls.get("X-AEK56-Token")
               }
               }).then(response=>{
               	   Vue.ls.clear()
           	       this.$router.push('/')
               })
           }

      }
    }
</script>
<style scoped lang="scss">
  @import "../assets/scss/reset.scss";
  @import "../assets/scss/my-mixin.scss";
  .background{
    height:pxToRem(20px);
    background: #eff3f6;
  }
  .msgList{
    @include MsgList();
  }
  .msgList li:last-child{
    border-bottom: 0;
  }
  .msgList li span{
    display: inline-block;
    font-size: pxToRem(28px);
  }
  .msgList li span:first-child{
    float: left;
    color: #333;
    max-width:pxToRem(300px);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .msgList li span:last-child{
    float: right;
    margin-right: pxToRem(30px);
    color: #666;
    max-width:pxToRem(350px);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .msgList li.firstLi{
    height: pxToRem(140px) ;

  }
  .msgList li.firstLi div:last-child{
    height: pxToRem(60px);
    color:#666;
    line-height: pxToRem(50px);
  }
  .msgList li.firstLi div:first-child{
    height: pxToRem(80px);
    font-size:pxToRem(32px);
    line-height: pxToRem(90px);
    color: #333;
     max-width:pxToRem(500px) ;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .btnLeave{
    margin-top: pxToRem(55px) !important;
  }
</style>
