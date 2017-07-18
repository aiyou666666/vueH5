<template>
  <div >
      <mt-popup v-model="popupVisible2" position="top" class="mint-popup-2" :modal="false">
        <p ><img src="../assets/images/fail.png" alt=""><span>提交失败，请检查网络重试</span></p>
      </mt-popup>
      <mt-actionsheet
        :actions="actions"
        v-model="sheetVisible" class="sheet">
      </mt-actionsheet>
      <!--<mt-actionsheet-->
        <!--:actions="actions2"-->
        <!--v-model="sheetVisible2" class="sheet">-->
      <!--</mt-actionsheet>-->
    <div class="background"></div>
    <div class="msgList">
      <ul>
        <li>
        	<input type="hidden" v-model="applyInfo.assetsNum"/>
          <span>设备编号</span><i>{{applyInfo.assetsNum}}</i>
        </li>
        <li>
        	<input type="hidden" v-model="applyInfo.assetsName"/>
          <span>设备名称</span><i>{{applyInfo.assetsName}}</i>
        </li>
        <li>
        	<input type="hidden" v-model="applyInfo.deptId"/>
          <span>所在部门</span><i>{{applyInfo.deptName}}</i>
        </li>
        <li>
        	<input type="hidden" v-model="applyInfo.assetsSpec"/>
          <span>规格型号</span><i>{{applyInfo.assetsSpec}}</i>
        </li>
      </ul>
    </div>
    <div class="background"></div>
    <div class="msgList">
      <ul>
        <li  @click="sheet">
          <span>紧急程度</span><i :class="{urgencyColor:isColor}" class="ichoose">{{this.applyInfo.txtUrgency | urgentLevel}}</i>
          <img src="../assets/images/jr.png" alt="" class="choose">
        </li>
      </ul>
    </div>
    <div class="background"></div>
    <div class="uploadImg">
      <span>设备图片</span>
     <img   src="../assets/images/tjtp.png"  alt=""  @click="chooseImg()">
    </div>
    <div class="background"></div>
    <div class="decribe uploadImg">
      <span>故障描述</span>
      <textarea placeholder="请输入故障描述，300字以内，可以不填" v-model="applyInfo.faultDesc"></textarea>
    </div>
    <button-com class="btnLeave" @click.native="applyDone">提交维修申请</button-com>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  import Vue from 'vue'
  import api from '../service/api.js'
  import ButtonCom from '../components/Button'
  import wxInit  from  '../wechat/weixin.js'
  import wx from 'weixin-js-sdk'
  export default{
    data(){
      return{
        sheetVisible :false,
        sheetVisible2 :false,
        popupVisible2:false,
        isColor:false,
        actions:[],
        actions2:[],
        assetsImgsrc:'',
        applyInfo:{

        }
      }
    },
    components:{ButtonCom},
    created (){
    	api.getDeviceDetail({
    	   data: {
          id:this.$route.query.id
        },
        method:'get'
    	}).then(data=>{
    	  this.applyInfo={
    	  	assetsNum:data.assetsNum,  //设备编号
    	  	assetsName:data.assetsName, //设备名称
    	  	deptName:data.deptName,     //设备部门
    	  	assetsSpec:data.assetsSpec,   //设备型号
    	  	assetsId:data.assetsId,       //设备id
    	  	faultDesc:'',                 //故障描述
    	  	assetsImg:'',                 //设备图片
    	  	txtUrgency:'请选择',            //紧急程度
    	  	tenantId:Vue.ls.get("useInfo").tenantId //机构id
    	  }
    	})
    },
    methods:{
      applyDone(){
        if(this.txtUrgency=='请选择'){
          Toast({
            message: '请选择紧急程度',
            position: 'center',
            duration: 1500
          })
        }else{
          api.newApply({
            method:'post',
            data:this.applyInfo
          }).then(response => {
            this.$router.push({ path: '/applyDone', query: { id: response.id,newApply:1}})
          })
        }
      },
      sheet(){
        this.sheetVisible = true
      },
      chooseImg(){

      }

    },
    mounted(){
      this.actions=[
        {name:'非常紧急',method:()=>{
            this.isColor=true,
            this.applyInfo.txtUrgency=4
      }},
        {name:'紧急',method:()=>{
            this.isColor=true,
            this.applyInfo.txtUrgency=3
        }},
        {name:'一般',method:()=>{
            this.isColor=true,
            this.applyInfo.txtUrgency=2
        }},
        {name:'不紧急',method:()=>{
            this.isColor=true,
            this.applyInfo.txtUrgency=1
        }}]
    },
    watch: {
      popupVisible2(val) {
        if (val) {
          setTimeout(() => {
            this.popupVisible2 = false;
          }, 2000);
        }
      }
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
    @include MsgList();
    font-size: pxToRem(28px);
  }
  .msgList li:last-child{
    border-bottom: 0;
  }
  .msgList i{
    color: #bebebe;
  }
  .msgList i.urgencyColor{
    color: #666;
  }
  .msgList span{
    color: #333;
    display: inline-block;
    margin-right: pxToRem(70px);
  }
  .msgList i{
    color: #666;
    width: 68%;
  }
  .msgList .ichoose{
    color: #999;
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
    height: pxToRem(208px) ;
    span{
      margin-right: pxToRem(70px);
      float: left;
    };
    img{
      width: pxToRem(150px);
      height: pxToRem(150px);
    }
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

</style>

