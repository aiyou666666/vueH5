<template>
  <div>
    <div class="background"></div>
    <div class="msgList">
      <ul>
        <li class="firstLi" @click="goPath">
          <i v-show="msg.status!=1"><img src="../assets/images/jr.png" alt=""></i>
          <div v-if="msg.status==1"><img src="../assets/images/cg.png" alt="">提交申请</div>
          <div v-if="msg.status==1"><span>{{process.reportRepairName}}</span><span>{{process.reportRepairDate | timeChange}}</span>
          </div>
          <div v-if="msg.status==3||msg.status==2"><img src="../assets/images/cg.png" alt="">提交故障鉴定</div>
          <div v-if="msg.status==3||msg.status==2"><span>{{process.identifyName}}</span><span>{{process.identifyDate |　timeChange}}</span>
          </div>
          <div v-if="msg.status==4"><img src="../assets/images/cg.png" alt="">提交维修报告</div>
          <div v-if="msg.status==4"><span>{{process.repairName}}</span><span>{{process.repairDate | timeChange}}</span>
          </div>
          <div v-if="msg.status==5"><img src="../assets/images/cg.png" alt="">验收通过</div>
          <div v-if="msg.status==5"><span>{{process.repairCheckName}}</span><span>{{process.repairCheckDate | timeChange}}</span>
          </div>
          <div v-if="msg.status==6"><img src="../assets/images/cw.png" alt="">验收不通过</div>
          <div v-if="msg.status==6"><span>{{process.repairCheckName}}</span><span>{{process.repairCheckDate | timeChange}}</span>
          </div>
        </li>
        <li>
          <span>维修单号</span><span>{{msg.applyNo}}</span>
        </li>
        <li>
          <span>状态</span><span>{{msg.status | statusChange}}</span>
        </li>
      </ul>
    </div>
    <div class="background"></div>
    <div class="msgCard">
      <img src="../assets/images/11.png" alt="">
      <span>
        <ul class="cardList" @click="detail">
            <li>{{msg.assetsName | machineName}}<span class="duge" :class="{noUrgent:msg.urgentLevel==1||msg.urgentLevel==2,Urgent:msg.urgentLevel==3,veryUrgent:msg.urgentLevel==4}">{{msg.urgentLevel | urgentLevel}}</span></li>
            <li>{{msg.assetsDeptName | officeName}} <img src="../assets/images/jr.png" alt=""></li>
            <li>申请时间  {{msg.reportRepairDate | timeChange}}</li>
        </ul>
      </span>
    </div>
    <button-com class="btnLeave" @click.native="goList" v-if="this.$route.query.flag==10">返回验收列表</button-com>
    <button-com class="btnLeave" @click.native="goList" v-if="this.$route.query.flag==3">返回维修列表</button-com>
    <button-com class="btnLeave" @click.native="goAccept" v-if="(msg.status==2||msg.status==4)&&!this.$route.query.flag">验收
    </button-com>
    <button-com class="btnLeave" @click.native="goRepair" v-if="msg.status==3&&!this.$route.query.flag">填写维修报告单
    </button-com>
    <button-com class="btnLeave" @click.native="goList" v-if="this.$route.query.flag==1">返回故障鉴定列表</button-com>
    <button-com class="btnLeave" @click.native="goIdenfy" v-if="msg.status==1&&this.$route.query.newApply!=1">故障鉴定</button-com>
    <button-com class="btnLeave" @click.native="goHome" v-if="this.$route.query.newApply==1">返回主页</button-com>
  </div>
</template>
<script>
  import Vue from 'vue'
  import api from '../service/api.js'
  import ButtonCom from '../components/Button'
  export default{
    created(){
      api.getDetail({
        param: {
          id: this.$route.query.id
        },
        method: 'get'
      }).then(response => {
        this.msg = response
      })
      api.getProcess({
        param: {
          id: this.$route.query.id
        },
        method: 'get'
      }).then(response => {
        this.process = response
      })
    },
    data(){
      return {
        msg: '',
        process: ''
      }
    },
    components: {ButtonCom},
    methods: {
      goHome(){
        this.$router.push('/tabbar')
      },
      detail(){
        this.$router.push({path: '/deviceDetail', query: {id: this.$route.query.id}})
      },
      goIdenfy(){
        this.$router.push({path: '/idenify', query: {id: this.$route.query.id}})
      },
      goList(){
        this.$router.push({path: '/deviceList', query: {status: this.$route.query.flag}})
      },
      goPath(){
        this.$router.push({path: '/pathDetail', query: {id: this.$route.query.id}})
      },
      goRepair(){
        this.$router.push({path: '/repairReport', query: {id: this.$route.query.id}})
      },
      goAccept(){
        this.$router.push({path: '/accept', query: {id: this.$route.query.id,status:this.msg.status}})
      },
      goHome(){
        this.$router.push('/home')
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../assets/scss/reset.scss";
  @import "../assets/scss/my-mixin.scss";

  .background {
    height: pxToRem(20px);
    background: #eff3f6;
  }

  .msgList {
    color: #333;
  @include MsgList();
  }

  .msgList li:last-child {
    border-bottom: 0;
  }

  .msgList li span {
    display: inline-block;
    font-size: pxToRem(28px);
  }

  .msgList li.firstLi {
    height: pxToRem(140px);
  }

  .msgList li.firstLi div:last-child {
    height: pxToRem(60px);
    color: #666;
    line-height: pxToRem(30px);
  }

  .msgList li.firstLi div:first-child {
    height: pxToRem(80px);
    font-size: pxToRem(32px);
    line-height: pxToRem(90px);
    color: #333;
  }

  .firstLi img {
    height: pxToRem(25px);
    width: pxToRem(25px);
    margin-right: pxToRem(25px);
  }

  .firstLi > i {
    float: right;
    margin-top: pxToRem(20px);

  img {
    width: pxToRem(14px);
    height: pxToRem(31px);
  }

  }
  .msgList li span {
    display: inline-block;
    margin-right: pxToRem(25px);
    color: #666;
  }

  .msgList li > span:first-child {
    width: pxToRem(165px);
    color: #333;
  }

  .msgCard {
    height: pxToRem(210px);
    background: #fff;
    padding: pxToRem(32px);
    margin-bottom: pxToRem(60px);
  }

  .msgCard > img {
    width: pxToRem(151px);
    height: pxToRem(151px);
    float: left;
    margin-right: pxToRem(32px);
  }

  .cardList li {
    margin-bottom: pxToRem(17px);
  }

  .cardList li:first-child {
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
  .cardList li:last-child {
    color: #999;
  }

  .duge {
    height: pxToRem(40px);
    line-height: pxToRem(40px);
    float: right;
    display: inline-block;
    font-size: pxToRem(20px);
    text-align: center;
    color: #fff;
    border-radius: 15px;
    width: pxToRem(135px);
    padding-top: pxToRem(2px);
  }

  .cardList .veryUrgent {
    background: #f3756f;
  }

  .cardList .Urgent {
    background: #f7931e;
  }

  .cardList .noUrgent {
    background: #63bd90;
  }
</style>
