<template>
  <div>
    <div class="background"></div>
    <div class="msgList">
      <ul>
        <li >
          <img src="../assets/images/wxbg.png" alt="">
          <span>维修报告</span>
        </li>
      </ul>
    </div>
    <div class="background"></div>
    <div class="msgList">
      <ul>
        <li >
          <span>维修方式</span><span>自主维修</span>
        </li>
        <li>
          <span>维修后状态</span><span>{{repairResultKey}}</span>
        </li>
      </ul>
    </div>
    <div class="background"></div>
    <div class="msgList">
      <ul>
        <li >
          <span>设备编号</span><span>{{msgNum.assetsNum}}</span>
        </li>
        <li>
          <span>设备名称</span><span>{{msgNum.assetsName}}</span>
        </li>
        <li >
          <span>开始时间</span><span>{{msgList.repairPeriodStart}}</span>
        </li>
        <li>
          <span>结束时间</span><span>{{msgList.repairPeriodEnd}}</span>
        </li>
        <li >
          <span>维修费</span><span>{{msgList.repairCost/100 | toFixed}}</span>
        </li>
        <li>
          <span>材料费</span><span>{{msgList.partsCost/100 | toFixed}}</span>
        </li>
      </ul>
    </div>

    <div class="background"></div>
    <div class="msgDecribe">
      <span>备注</span>
      <span>{{msgList.repairComent}}</span>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import api from '../service/api.js'
  export default{
    data(){
      return {
        msgList: '',
        repairResultKey:'',
        msgNum:''
      }
    },
    created(){
//      获取单号
      api.getDetail({
        param: {
          id:this.$route.query.id
        },
        headers:{
          'X-AEK56-Token':Vue.ls.get("X-AEK56-Token")
        },
        method:'get'
      }).then(response => {
        this.msgNum=response
      })
//      查看维修报告
        api.lookReport({
          param: {
            id: this.$route.query.id
          },
          headers:{
            'X-AEK56-Token':Vue.ls.get("X-AEK56-Token")
          },
          method: 'get'
        }).then(response => {
          this.msgList = response
          api.keyDictionary({
            param: {
              key: this.msgList.repairResultKey
            },
            headers:{
              'X-AEK56-Token':Vue.ls.get("X-AEK56-Token")
            },
            method: 'get'
          }).then(response => {
             this.repairResultKey= response.name
          })

        })
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
    color: #333;
  @include MsgList();
  }
  .msgList li:last-child{
    border-bottom: 0;
  }
  .msgList li span{
    display: inline-block;
    font-size: pxToRem(28px);
    margin-right:  pxToRem(25px);
    color: #666;
  }
  .msgList li>span:first-child{
    width: pxToRem(165px);
    color: #333;
  }
  .msgList li img{
    width: pxToRem(33px);
    height: pxToRem(33px);
    margin-top: pxToRem(-4px);
    margin-right: pxToRem(20px);
  }
  .msgCard{
    height: pxToRem(210px);
    background: #fff;
    padding: pxToRem(32px) ;
  span{
    display: inline-block;
    font-size: pxToRem(28px);
    margin-right:  pxToRem(25px);
    width: pxToRem(165px);
  }
  }
  .msgCard>img{
    width: pxToRem(151px) ;
    height: pxToRem(151px) ;
    margin-right: pxToRem(32px);
  }
  .cardList li{
    margin-bottom:pxToRem(17px) ;
  }
  .cardList li:first-child{
    font-size: pxToRem(32px);
    color: #333;
  }
  .cardList li:nth-child(2) {
    color: #666;

  img {
    width: pxToRem(14px);
    height: pxToRem(31px);
    float: right;
  }
  }
  .msgDecribe{
    height: pxToRem(250px);
    background: #fff;
    padding:pxToRem(30px) ;
  span{
    display: inline-block;
    float: left;
  }
  }
  .msgDecribe>span:first-child{
    font-size: pxToRem(28px);
    margin-right:  pxToRem(25px);
    width: pxToRem(165px);
  }
  .msgDecribe>span:last-child{
    min-height: pxToRem(190px);
    width: pxToRem(190px) ;
  }
</style>
