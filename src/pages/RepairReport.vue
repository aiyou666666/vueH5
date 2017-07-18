<template>
  <div>
    <mt-popup v-model="popupVisible2" position="top" class="mint-popup-2" :modal="false">
      <p ><img src="../assets/images/fail.png" alt=""><span>提交失败，请检查网络重试</span></p>
    </mt-popup>
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible" class="sheet">
    </mt-actionsheet>
    <mt-datetime-picker
      ref="picker1"
      v-model="value"
      @confirm="handleChange">
    </mt-datetime-picker>
    <mt-datetime-picker
      ref="picker2"
      v-model="value2"
      @confirm="handleChange2">
    </mt-datetime-picker>
    <div class="background"></div>
    <div class="msgList">
      <ul>
        <li>
          <span>填写维修报告</span>
        </li>
      </ul>
    </div>
    <div class="background"></div>
    <div class="msgList">
      <ul>
        <li><span>维修方式</span><span style="color: #666">自主维修</span></li>
        <li @click="sheet">
          <span>维修后状态</span><i :class="{repairColor:isColor}">{{repairstatusTxt}}</i><img src="../assets/images/jr.png" alt="" class="choose" >
        </li>
      </ul>
    </div>
    <div class="background"></div>
    <div class="msgList">
      <ul >
        <li  @click="open('picker1')">
          <span>开始时间</span><i  style="color: #666">{{startTime | timeChange}}</i><img src="../assets/images/jr.png" alt="" class="choose">
        </li>
        <li  @click="open('picker2')">
          <span>结束时间</span><i  style="color: #666">{{endTime | timeChange}}</i><img src="../assets/images/jr.png" alt="" class="choose" >
        </li>
      </ul>
    </div>
    <div class="background"></div>
    <div class="msgList">
      <ul>
        <li><span>维修费</span><input type="text" placeholder="请输入" v-model="repairCost"></li>
        <li><span>材料费</span><input type="text" placeholder="请输入" v-model="partsCost"></li>
      </ul>
    </div>
    <div class="background"></div>
    <div class="decribe uploadImg">
      <span>备注</span>
      <textarea placeholder="请输入故障描述，300字以内，可以不填" v-model="repairComent" :disabled="numOver" @change="change()"></textarea>
      <span class="number"><i>{{repairComent.length}}</i>/300</span>
    </div>
    <button-com class="btnLeave" @click.native="repairSubmit">提交</button-com>
  </div>
</template>
<script>
  import Vue from 'vue'
  import api from '../service/api.js'
  import { Toast } from 'mint-ui'
  import ButtonCom from '../components/Button'
  export default{
    data(){
      return{
        value: new Date(),
        value2: new Date(),
        sheetVisible :false,
        popupVisible2:false,
        actions:[],
        repairstatusTxt:'请选择维修后状态',
        isColor:false,
        startTime:'',
        endTime:new Date(),
        repairCost:'',
        partsCost:'',
        repairComent:'',
        key:'',
        data:'',
        numOver:false
      }
    },
    components:{ButtonCom},
    created(){
      api.getProcess({
        param: {
          id:this.$route.query.id
        },
        method:'get'
      }).then(response => {
        this.process=response
        this.startTime=this.process.reportRepairDate
      })
    },
    methods:{
      repairSubmit(){
        if(this.repairstatusTxt=='请选择维修后状态'){
          Toast({
            message: '请选择维修后状态',
            position: 'center',
            duration: 1500
          })
        }else if(!this.repairCost){
          Toast({
            message: '请填写维修费用',
            position: 'center',
            duration: 1500
          })
        }else if(!this.partsCost){
          Toast({
            message: '请填写材料费用',
            position: 'center',
            duration: 1500
          })
        }else{
          api.writeReport({
            method:'post',
            data:{
            "applyId":this.$route.query.id ,
            "partsCost": this.partsCost*100,
            "repairComent": this.repairComent,
            "repairCost": this.repairCost*100,
            "repairPeriodEnd": this.endTime,
            "repairPeriodStart": this.startTime,
            "repairResultKey": this.key,
            }
          }).then(response => {
            this.$router.push({ path: '/applyDone', query: { flag: 3 ,id:this.$route.query.id}})
          })
        }
      },
      sheet(){
          this.sheetVisible = true
      },
      open(picker) {
          this.$refs[picker].open();
      },
      handleChange(value) {
          this.startTime=value
      },
      handleChange2(value) {
          this.endTime = value
      },
      change(){
        this.numOver=false
      }
    },
    mounted(){
      api. lookDictionary({
        param: {
          id:8
        },
        method:'get'
      }).then(response => {
        this.data=response
        const dataLength=this.data.length
        for(let i=0;i<dataLength;i++){
         let obj={name:this.data[i].name,method:()=>{
            this.isColor=true
            this.repairstatusTxt=this.data[i].name
            this.key=this.data[i].key
          }}
          this.actions.push(obj)
        }
      })
    },
    watch: {
      repairComent: function (val) {
        if (val.length >= 300) {
          this.numOver = true
        }
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
    font-size: pxToRem(28px);
  }
  .msgList li:last-child{
    border-bottom: 0;
  }
  .msgList i{
    color: #bebebe;
  }
  .msgList i.repairColor{
    color: #666;
  }
  .msgList span{
    color: #333;
    display: inline-block;
    margin-right: pxToRem(10px);
  }
  .msgList span:first-child{
    width:pxToRem(180px) ;
  }
  .msgList li span:nth-child(2){
    color: #bebebe;
  }
  .msgList input{
    color: #666;
    width: 68%;
  }
  .choose{
    width: pxToRem(15px);
    height:pxToRem(28px);
    margin-top: pxToRem(30px);
    margin-right: pxToRem(30px);
    float: right;
  }
  .uploadImg{
    font-size: pxToRem(28px);
    padding-left:  pxToRem(30px);
    padding-top:  pxToRem(30px);
    background: #fff;
    height: pxToRem(275px) ;
  span{
    margin-right: pxToRem(130px);
    float: left;
  };
  }
  .decribe{
    margin-bottom: pxToRem(60px) ;
  }
  .decribe textarea{
    width: pxToRem(510px);
    height: pxToRem(210px);
    resize: none;
    color: #666;
    line-height:pxToRem(48px) ;
  }
  .decribe .number{
    margin-right:  pxToRem(30px);
    margin-top: pxToRem(-30px) ;
    float: right;
    color: #666;
  }
</style>
