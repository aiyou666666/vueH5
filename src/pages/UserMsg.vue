<template>
  <div>
    <div class="background"></div>
    <div class="msgList">
      <ul>
        <li class="firstLi">
          <div>{{userInfo.realName}}</div>
          <div><span>{{userInfo.deptName}}</span><span>{{userInfo.jobName}}</span></div>
        </li>
        <li>
          <span>所属机构</span><span>{{userInfo.tenantName}}</span>
        </li>
      </ul>
    </div>
    <div class="background"></div>
    <div class="msgList">
      <ul>
        <li>
          <span>ID</span><span>12</span>
        </li>
        <li>
          <span>手机号</span><span>{{userInfo.mobile}}</span>
        </li>
        <li>
          <span>邮箱</span><span>{{userInfo.email}}</span>
        </li>
      </ul>
    </div>
    <button-com class="btnLeave" @click.native="loginout">退出登录</button-com>
  </div>
</template>
<script>
    import ButtonCom from '../components/Button'
    import api from '../service/api.js'
    import Vue from 'vue'
    export default{
      data(){
        return{
          userInfo: Vue.ls.get("useInfo")
        }
      },
      components:{ButtonCom},
      methods:{
        loginout(){
           	    api.loginOut()
           	   Vue.ls.remove("X-AEK56-Token")
           	   this.$router.push('/')

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
  }
  .msgList li span:last-child{
    float: right;
    margin-right: pxToRem(30px);
    color: #666;
  }
  .msgList li.firstLi{
    height: pxToRem(140px) ;
  }
  .msgList li.firstLi div:last-child{
    height: pxToRem(60px);
    color:#666;
    line-height: pxToRem(30px);
  }
  .msgList li.firstLi div:first-child{
    height: pxToRem(80px);
    font-size:pxToRem(32px);
    line-height: pxToRem(90px);
    color: #333;
  }
  .btnLeave{
    margin-top: pxToRem(55px);
  }
</style>
