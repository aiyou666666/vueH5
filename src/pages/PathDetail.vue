<template>
  <div>
    <div class="background"></div>
    <div class="msgList">
      <ul>
        <li>
          设备状态: {{msg.status | statusChange}}
        </li>
      </ul>
    </div>
    <div class="background"></div>
    <div class="msgList">
      <ul>
        <li class="firstLi" :class="{pathed:isPathed}" v-if="six">
          <div ><img src="../assets/images/cw.png" alt="">验收未通过</div>
          <div ><span>{{process.repairCheckName}}</span><span>{{process.repairCheckDate | timeChange}}</span></div>
        </li>
        <li class="firstLi" v-if="five">
          <div ><img src="../assets/images/cg.png" alt="">验收通过</div>
          <div ><span>{{process.repairCheckName}}</span><span>{{process.repairCheckDate | timeChange}}</span></div>
        </li>
        <li class="firstLi" :class="{pathed:isPathed}" v-if="four">
          <div ><img src="../assets/images/cg.png" alt="">提交维修报告</div>
          <div ><span>{{process.repairName}}</span><span>{{process.repairDate | timeChange}}</span></div>
        </li>
        <li class="firstLi" v-if="three">
          <div><img src="../assets/images/cg.png" alt="">提交故障鉴定</div>
          <div><span>{{process.identifyName}}</span><span>{{process.identifyDate | timeChange}}</span></div>
        </li>
        <li class="firstLi" :class="{pathed:isPathed}" v-if="two">
          <div ><img src="../assets/images/cg.png" alt="">提交申请</div>
          <div ><span>{{process.reportRepairName}}</span><span>{{process.reportRepairDate | timeChange}}</span></div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import api from '../service/api.js'
  export default{
    data(){
      return{
        msg:'',
        process:'',
        isPathed:true,
        six:'',
        five:'',
        four:'',
        three:'',
        two:''
      }
    },
    created(){
      api.getProcess({
        param: {
          id:this.$route.query.id
        },
        headers:{
          'X-AEK56-Token':Vue.ls.get("X-AEK56-Token")
        },
        method:'get'
      }).then(response => {
        this.process=response
        api.getDetail({
          param: {
            id:this.$route.query.id
          },
          headers:{
            'X-AEK56-Token':Vue.ls.get("X-AEK56-Token")
          },
          method:'get'
        }).then(response => {
          this.msg=response
          if(this.msg.status==6&&this.process.repairDate){
            this.six=true
            this.five=false
            this.four=true
            this.three=true
            this.two=true
          }
          if(this.msg.status==6&&!this.process.repairDate){
            this.six=true
            this.five=false
            this.four=false
            this.three=true
            this.two=true
          }
          if(this.msg.status==5&&this.process.repairDate){
            this.six=false
            this.five=true
            this.four=true
            this.three=true
            this.two=true
          }
          if(this.msg.status==5&&!this.process.repairDate){
            this.six=false
            this.five=true
            this.four=false
            this.three=true
            this.two=true
          }
          if(this.msg.status==4){
            this.six=false
            this.five=false
            this.four=true
            this.three=true
            this.two=true
          }
          if(this.msg.status==3||this.msg.status==2){
            this.six=false
            this.five=false
            this.four=false
            this.three=true
            this.two=true
          }
          if(this.msg.status==1){
            this.six=false
            this.five=false
            this.four=false
            this.three=false
            this.two=true
          }
        })
      })
    },
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
    font-size: pxToRem(28px);
    @include MsgList();
  }
  .msgList li:last-child{
    border-bottom: 0;
  }
  .msgList li span{
    display: inline-block;
    font-size: pxToRem(28px);
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
  .firstLi img{
    height: pxToRem(25px);
    width: pxToRem(25px);
    margin-right:  pxToRem(25px);
    margin-top:pxToRem(-5px) ;
  }
  .msgList li span{
    display: inline-block;
    margin-right:  pxToRem(25px);
    color: #666;
  }
  .msgList li>span:first-child{
    width: pxToRem(165px);
    color: #333;
  }
  .msgList .pathed{
    color: #999;
  }
</style>

