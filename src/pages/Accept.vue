<template>
  <div>
    <mt-popup v-model="popupVisible2" position="top" class="mint-popup-2" :modal="false">
      <p ><img src="../assets/images/fail.png" alt=""><span>提交失败，请检查网络重试</span></p>
    </mt-popup>
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible" class="sheet">
    </mt-actionsheet>
    <mt-actionsheet
      :actions="actions2"
      v-model="sheetVisible2" class="sheet">
    </mt-actionsheet>
    <div class="background"></div>
    <div class="msgList" v-if="$route.query.status==4">
      <ul>
        <li @click="lookReport" >
          <span>维修报告单</span><img src="../assets/images/jr.png" alt="" class="choose" >
        </li>
      </ul>
    </div>
    <div class="background"></div>
    <div class="msgList">
      <ul>
        <li @click="sheet">
          <span>验收结果</span><i :class="{acceptColor:isResult}">{{resultTxt}}</i><img src="../assets/images/jr.png" alt="" class="choose" >
        </li>
        <li  @click="sheet2">
          <span>设备现况</span><i :class="{acceptColor:isStatus}">{{statusTxt | acceptChange}}</i><img src="../assets/images/jr.png" alt="" class="choose" >
        </li>
      </ul>
    </div>
    <div class="background"></div>
    <div class="start">
      <div class="startTitle"><span>服务评价</span><span>满意请给五星哦</span></div>
      <div class="startList">
        <ul>
          <li v-for="(l, index1) in list"><span>{{l.name}}</span><span><i v-for="(n , index2) in l.number" :class="{default:!n,startactive:n}" @click="startClick(index1,index2)"></i></span><span class="startScore">{{l.score}}</span></li>
        </ul>
      </div>
    </div>
    <div class="background"></div>
    <div class="decribe uploadImg">
      <span>备注</span>
      <textarea placeholder="请输入故障描述，300字以内，可以不填" v-model="assessComent" ></textarea>
      <span class="number"><i>{{assessComent.length}}</i>/300</span>
    </div>
    <button-com class="btnLeave" @click.native="applyDone" :class="{active:isActive,btn:!isActive}">提交</button-com>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  import Vue from 'vue'
  import api from '../service/api.js'
  import ButtonCom from '../components/Button'
  export default{
    data(){
      return{
        list:[
          {name:'维修态度',number:[false,false,false,false,false],score:''},
          {name:'响应速度',number:[false,false,false,false,false],score:''},
          {name:'维修质量',number:[false,false,false,false,false],score:''}
        ],
        sheetVisible :false,
        sheetVisible2 :false,
        popupVisible2:false,
        actions:[],
        actions2:[],
        resultTxt:'请选择验收结果',
        statusTxt:'请选择设备维修后状态',
        isResult:false,
        isStatus:false,
        data:'',
        assessComent:'',
        resultStatus:'',
        statusStstus:'',
        repairAttitude:'',
        repairQuality:'',
        responseSpeed:'',
        checkStatus:'',
        isActive:false
      }
    },
    components:{ButtonCom},
    methods:{
      startNum(index1,index2,oneStart,twoStart,threeStart,fourStart,fiveStart){
          if (index2 == 0) {
              this.list[index1].number = [true, false, false, false, false],
              this.list[index1].score = oneStart
          } else if (index2 == 1) {
            this.list[index1].number = [true, true, false, false, false],
            this.list[index1].score = twoStart
          } else if (index2 == 2) {
            this.list[index1].number = [true, true, true, false, false],
            this.list[index1].score = threeStart
          }
          else if (index2 == 3) {
            this.list[index1].number = [true, true, true, true, false],
            this.list[index1].score = fourStart
          } else {
            this.list[index1].number = [true, true, true, true, true],
            this.list[index1].score = fiveStart
        }
      },
      applyDone(){
//        this.popupVisible2 = true
//        this.$router.push('/applyDone')
        this.isActive=true
        if(this.resultTxt=='请选择验收结果'){
          Toast({
            message: '请选择验收结果',
            position: 'center',
            duration: 1500
          })
          setTimeout(()=>{
            this.isActive=false
          },1000)
        } else if(this.statusTxt=='请选择设备维修后状态'){
          Toast({
            message: '请选择设备维修后状态',
            position: 'center',
            duration: 1500
          })
          setTimeout(()=>{
            this.isActive=false
          },1000)
        }
        if(this.resultTxt!='请选择验收结果'&&this.statusTxt!='请选择设备维修后状态') {
          if(this.resultTxt=='验收通过'){
            this.checkStatus=1;
          }
          if(this.resultTxt=='验收不通过'){
            this.checkStatus=2;
          }
          api.writeAccept({
            headers:{
              'X-AEK56-Token':Vue.ls.get("X-AEK56-Token")
            },
            method:'post',
            data:{
            "applyId": this.$route.query.id,
            "assessComent": this.assessComent,
            "assetsStatus":this.statusTxt,
            "checkStatus":  this.checkStatus,
            "repairAttitude": this.repairAttitude,
            "repairQuality": this.repairQuality,
            "responseSpeed": this.responseSpeed
            }
          }).then(response => {
            this.$router.push({ path: '/applyDone', query: { flag: 10 ,id:this.$route.query.id}})
          })
        }
      },
      lookReport(){
        this.$router.push({ path: '/lookReport', query: { id: this.$route.query.id }})
      },
      startClick(index1,index2){
        if(index1==0){
          this.repairAttitude=index2+1
          this.startNum(index1,index2,'很差 2.0分','差 4.0分','一般 6.0分','满意 8.0分','非常满意 10.0分')
        }
        if(index1==1){
          this.repairQuality=index2+1
          this.startNum(index1,index2,'很慢 2.0分','慢 4.0分','一般 6.0分','快 8.0分','非常快 10.0分')
        }
        if(index1==2){
          this.responseSpeed=index2+1
          this.startNum(index1,index2,'很差 2.0分','差 4.0分','一般 6.0分','好 8.0分','非常好 10.0分')
        }
      },
      sheet(){
        this.sheetVisible =true
      },
      sheet2(){
        if(this.resultTxt=='请选择验收结果'){
          Toast({
            message: '请选择验收结果',
            position: 'center',
            duration: 1500
          })
        }else{
          this.sheetVisible2=true
        }
      }
    },
    mounted(){
      this.actions=[
        {name:'验收通过',method:()=>{
            this.isResult=true,
            this.resultTxt='验收通过'
            this.actions2=[
            {name:'正常工作',method:()=>{
            this.isStatus=true,
            this.statusTxt=1
      }},
      {name:'基本正常',method:()=>{
            this.isStatus=true,
            this.statusTxt=2
      }},
      {name:'其他',method:()=>{
            this.isStatus=true,
            this.statusTxt=3
      }}
    ]
        }},
        {name:'验收不通过',method:()=>{
            this.isResult=true,
            this.resultTxt='验收不通过'
            this.actions2=[
            {name:'需进一步修理',method:()=>{
              this.isStatus=true,
              this.statusTxt=4
        }},
            {name:'需外送修理',method:()=>{
              this.isStatust=true,
              this.statusTxt=5
          }},
            {name:'其他',method:()=>{
              this.isStatus=true,
              this.statusTxt=6
          }}
        ]
        }},
      ]

    },
    watch: {
      assessComent: function (val) {
        if (val.length >= 300) {
          this.assessComent=val.substr(0,300)
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
  .msgList i.acceptColor{
    color: #666;
  }
  .msgList span{
    color: #333;
    display: inline-block;
    margin-right: pxToRem(70px);
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
  .start{
    font-size:pxToRem(28px) ;
    height: pxToRem(350px);
    background: #fff;
    border{
      top:1px solid #e5e5e5;
      bottom:1px solid #e5e5e5;
    };
    .startTitle{
      height:pxToRem(90px);
      border-bottom: 1px solid #e5e5e5;
      line-height: pxToRem(90px);
      padding:0 pxToRem(30px);
    }
  .startTitle span:first-child{
    float: left;
    color: #333;
  }
  .startTitle span:last-child{
    float: right;
    color: #999;
  }
  }
  .startList li{
    height:pxToRem(90px);
    line-height:pxToRem(90px) ;
    padding-left:pxToRem(30px) ;
    span:nth-child(2){
      display: inline-block;
      margin-left:pxToRem(68px);
      i{
        display: inline-block;
        width: pxToRem(32px);
        height: pxToRem(32px);
        margin-right:pxToRem(25px);
      }
    }
  }
  .default{
    background: url("../assets/images/xxh.png");
    background-size:  pxToRem(32px)  pxToRem(32px);
  }
  .startactive{
    background: url("../assets/images/xxhs.png");
    background-size:  pxToRem(32px)  pxToRem(32px);
  }
  .startScore{
    float: right;
    margin-right:  pxToRem(30px);
    color: #666;
  }
  .decribe .number{
    margin-right:  pxToRem(30px);
    margin-top: pxToRem(-30px) ;
    float: right;
    color: #bebebe;
  }
</style>
