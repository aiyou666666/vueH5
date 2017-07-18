<template>
  <div>
  <div style="background: #fff;">
    <div class="useMsg" @click="UseMsg()">
      <img src="../assets/images/look.png" alt="" >
      <div class="useName">{{userInfo.realName}}<i v-show="userInfo.jobName">（{{userInfo.jobName}}）</i></div>
      <div>{{userInfo.deptName}}</div>
      <div>{{userInfo.tenantName}}</div>
    </div>
    <div class="listMsg">
      <ul>
        <li><span>{{idenify}}</span><i>待故障鉴定</i></li>
        <li><span>{{repair}}</span><i>待维修</i></li>
        <li><span>{{accept}}</span><i>已维修待验收</i></li>
      </ul>
    </div>
  </div>
  <div class="cellList">
    <ul>
      <li :class="{moreLi:ismoreLi,onlyLi:isonlyLi}" @click="NewApply()">
        <div><img src="../assets/images/xjwx.png" alt=""></div>
        <div>新建维修申请</div>
      </li>
      <li :class="{moreLi:ismoreLi,onlyLi:isonlyLi}" @click="msgList(10)">
        <div><img src="../assets/images/wxys.png" alt="" ></div>
        <div>维修验收</div>
      </li>
      <li :class="{moreLi:ismoreLi,onlyLi:isonlyLi}" @click="msgList(1)">
        <div><img src="../assets/images/gzjd.png" alt="" ></div>
        <div>故障鉴定</div>
      </li>
      <li :class="{moreLi:ismoreLi,onlyLi:isonlyLi}" @click="msgList(3)">
        <div><img src="../assets/images/sbwx.png" alt="" ></div>
        <div>设备维修</div>
      </li>
    </ul>
  </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import api from '../service/api.js'
  import wxInit  from  '../wechat/weixin.js'
  import wx from 'weixin-js-sdk'
  export default{
      data(){
        return{
          ismoreLi:true,
          isonlyLi:false,
          userInfo: Vue.ls.get("useInfo"),
          idenify:'',
          repair:'',
          accept:''
        }
      },
    methods:{
      NewApply(){
      	//微信扫码
      wxInit.created(function(res){
					wx.scanQRCode({
						desc: '扫一扫'
					})      	 	
       })
      	// wx.chooseWXPay();
         //this.$router.push('/newApply')
        //this.$router.push('/newApply')

      },
      msgList(status){
        this.$router.push({ path: '/deviceList', query: { status: status }})
      },
      UseMsg(){
        this.$router.push('/useMsg')
      }
    },
    created(){
      api.getPermissionList().then(response => {
        Vue.ls.set("useInfo",response)
        api.statusNum({
        method:'get',
        params:{
         id:this.userInfo.tenantId
        }
        }).then(response => {
        this.idenify=response[0].total
        this.repair=response[2].total
        this.accept=response[1].total+response[3].total
        })
      })
    },
  }
</script>
<style scoped lang="scss">
  @import "../assets/scss/reset.scss";
  @import "../assets/scss/my-mixin.scss";
  .useMsg{
    color: #fff;
    text-align: center;
    background: url(../assets/images/beijing.png);
    height: pxToRem(320px);
    font-size:pxToRem(28px) ;
    background-size: 100% pxToRem(320px) ;
    padding:pxToRem(30px) ;
  }
  .useName {
    font-size:pxToRem(32px);
    padding-top:pxToRem(50px);
    margin-bottom:pxToRem(30px);
    i{
      font-size:pxToRem(28px) ;
    }
  }
  .listMsg{
    height: pxToRem(177px);
    border-bottom:1px solid #e5e5e5;
    li{
      width: 33.3%;
      float: left;
      height:pxToRem(83px);
      margin: pxToRem(50px) 0;
      text-align: center;
      border-right:1px solid #e5e5e5;
      color:#666;
      span{
        font-size:pxToRem(32px) ;
      };
      i{
        display: block;
        font-size:pxToRem(28px) ;
      };

    }
  }
  .cellList{
    margin-top:pxToRem(20px) ;
    background: #fff;
    border-top: 1px solid #e5e5e5;
  }
  .moreLi{
    @include cellLi(50%)
  }
  .cellList li.moreLi:nth-child(2n+1){
    border-right: 1px solid #e5e5e5;
  }
  .cellList li.moreLi div:nth-child(2){
    margin-top: pxToRem(30px);
  }
  .cellList li.moreLi:nth-child(2n){
    margin-left: -4px;
  }
  .onlyLi{
    @include cellLi(100%)
  }
  .useMsg img{
    float: right;
    width: pxToRem(36px);
    height: pxToRem(36px);
  }
</style>
