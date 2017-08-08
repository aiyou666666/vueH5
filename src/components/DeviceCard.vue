<template>
  <div>
    <div class="msgTop">
      <span>维修单号：{{msg.applyNo}}</span><span>【{{msg.status | statusChange}}】</span>
    </div>
    <div class="msgCard">
      <img src="../assets/images/11.png" alt="" v-if="!msg.assetsImg">
      <img :src="msg.assetsImg | showImage" alt="" v-else>
      <span>
        <ul class="cardList" @click="detail(msg.id)">
            <li>{{msg.assetsName | machineName}}<span class="duge" :class="{noUrgent:msg.urgentLevel==1||msg.urgentLevel==2,Urgent:msg.urgentLevel==3,veryUrgent:msg.urgentLevel==4}">{{msg.urgentLevel | urgentLevel}}</span></li>
            <li>{{msg.assetsDeptName | officeName}}
              <img src="../assets/images/jr.png" alt="" >
            </li>
            <li>申请时间 {{msg.reportRepairDate | timeChange}}</li>
        </ul>
      </span>
    </div>
    <div class="background"></div>
  </div>
</template>
<script>
  export default{
    props:['msg'],
    created(){
    },
    methods:{
      detail(id){
        this.$router.push({ path: '/applyDone', query: { id: id}})
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../assets/scss/reset.scss";
  @import "../assets/scss/my-mixin.scss";
  .msgTop{
    height:pxToRem(90px) ;
    padding:pxToRem(30px) ;
    background: #fff;
    border-top:1px solid #e5e5e5;
    font-size:pxToRem(28px) ;
    color: #333;
  }
  .msgTop span:last-child{
    float: right;
  }
  .background{
    height:pxToRem(24px);
    background: #eff3f6;
  }
  .msgCard{
    height: pxToRem(210px);
    background: #fff;
    padding: pxToRem(32px) ;
  border: {
    top:1px solid #e5e5e5;
    bottom:1px solid #e5e5e5 ;
  };
  }
  .msgCard>img{
    width: pxToRem(150px) ;
    height: pxToRem(150px) ;
    float: left;
    margin-right: pxToRem(32px);
  }
  .cardList li{
    height: pxToRem(50px) ;
    line-height: pxToRem(50px) ;
  }
  .cardList li:first-child{
    font-size: pxToRem(32px);
    color: #333;
    height: pxToRem(60px) ;
    /*line-height: pxToRem(60px) ;*/
  }
  .cardList li:nth-child(2){
    color: #666;
  img{
    width: pxToRem(14px);
    height: pxToRem(31px);
    float: right;
  }
  }
  .cardList li:last-child{
    color: #999;
  }
  .duge{
    height: pxToRem(40px) ;
    line-height:  pxToRem(40px);
    float: right;
    display: inline-block;
    font-size: pxToRem(20px);
    text-align: center;
    color: #fff;
    border-radius: 15px;
    width:pxToRem(135px) ;
    padding-top: pxToRem(2px);
  }
  .cardList .veryUrgent{
    background: #f3756f;
  }
  .cardList .Urgent{
    background: #f7931e;
  }
  .cardList .noUrgent{
    background: #63bd90;
  }

</style>
