<template>
  <div style="background: #eff3f6;padding-bottom: 30px">
    <div v-show="loading">
      <div class="loading">
        <img src="../assets/images/loading.gif" alt="">      </div>
    </div>
    <div v-show="limits">
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
    <div class="msgList device-info">
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
          <span>所在部门</span><i>{{applyInfo.assetsDeptName}}</i>
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
          <span>紧急程度</span><i :class="{urgencyColor:isColor}" class="ichoose">{{applyInfo.urgentLevel | urgentLevel}}</i>
          <img src="../assets/images/jr.png" alt="" class="choose">
        </li>
      </ul>
    </div>
    <div class="background"></div>
    <div class="uploadImg" style="width: 100%;overflow: hidden">
      <span>设备图片</span>
      <uploader   :imgArr.sync="imgList"  :src="'/api/upload/'" :urgentLevel="applyInfo.urgentLevel" :faultDesc="applyInfo.faultDesc"></uploader>
    </div>
    <div class="background"></div>
    <div class="decribe uploadImg">
      <span>故障描述</span>
      <textarea placeholder="请输入故障描述，300字以内，必填" v-model.trim="applyInfo.faultDesc" @keyup="key" @paste="key"></textarea>
      <span class="number"><i>{{applyInfo.faultDesc.length}}</i>/300</span>
    </div>
    <button-com  @click.native="applyDone"  :class="{disabled:isdiable ,active:isActive,btn:!isActive}" >提交维修申请</button-com>
 </div>
    <div v-show="nolimits">
      <div class="noresult">

        <img src="../assets/images/noresult.png" alt="">
        <div>{{content}}</div>
      </div>
      <button-com class="btnLeave" @click.native="goHome"  :class="{active:isActive,btn:!isActive}">返回首页</button-com>
    </div>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  import Vue from 'vue'
  import api from '../service/api.js'
  import ButtonCom from '../components/Button'
  import wxInit  from  '../wechat/weixin.js'
  import wx from 'weixin-js-sdk'
  import uploader from '../components/uploader'
  export default{
    data(){
      return{
        loading:true,
        limits:false,
        nolimits:false,
        isdiable:false,
        isActive:false,
        sheetVisible :false,
        sheetVisible2 :false,
        popupVisible2:false,
        isColor:false,
        actions:[],
        actions2:[],
        assetsImgsrc:'',
        imgList:[],
        content:'',
        applyInfo:{
          faultDesc:''
        }
      }
    },
    components:{ButtonCom,uploader},
    created (){
    	let _this=this;
      if(Vue.ls.get("urgentLevel")){
        this.isColor=true
      }

    	api.getDeviceDetail({
    	   data: {id:this.$route.query.id},
          callBack:function(res){
        	if(res.code!=200 || !res.data){
            setTimeout(()=>{
              _this.loading=false
              _this.limits=false
              _this.content='无法获取设备信息，请检查二维码'
              _this.nolimits=true
            },1000)
          }else if(res.data && res.data.statusName=='维修中'){
            setTimeout(()=>{
              _this.loading=false
              _this.limits=false
              _this.nolimits=true
              _this.content='此设备在维修中'
            },1000)
          }else if(res.data && res.data.statusName=='已报废'){
            setTimeout(()=>{
              _this.loading=false
              _this.limits=false
              _this.nolimits=true
              _this.content='此设备已报废，无法进行维修'
            },1000)

          }else if(res.code==200){
            setTimeout(()=>{
            _this.loading=false
            _this.limits=true
            _this.nolimits=false
            },1000)
          }
        },
        _this:this,
        isApply:'isApply',
        method:'get'
    	}).then(data=>{
    	  this.applyInfo={
    	  	assetsNum:data.assetsNum,  //设备编号
    	  	assetsName:data.assetsName, //设备名称
          assetsDeptName:data.deptName,     //设备部门
    	  	assetsSpec:data.assetsSpec,   //设备型号
    	  	assetsId:data.assetsId,       //设备id
    	  	faultDesc:Vue.ls.get("faultDesc"),                 //故障描述
    	  	assetsImg:this.imgList,       //设备图片
          urgentLevel:Vue.ls.get("urgentLevel")?Vue.ls.get("urgentLevel"):'请选择',            //紧急程度
    	  	tenantId:Vue.ls.get("useInfo").tenantId ,//机构id
          deptId:data.deptId, //部门id
          factoryNum:data.factoryNum,//出厂型号
          factoryName:data.factoryName,//生产商
          startUseDate:data.startUseDate//启用日期
    	  }
    	})
    },
    updated(){
    	 Vue.ls.set("newApply","isNewApply");	
    },
    methods:{
      key(){
        if(this.applyInfo.faultDesc.length>=300){
          this.applyInfo.faultDesc=this.applyInfo.faultDesc.substr(0,300)
        }
      },
      goHome(){
        this.isActive=true
        this.$router.push('/tabbar')
      },
      applyDone(){
        this.isActive=true

        if(this.isdiable)return
//        如果没有部门id给予提示
        if(!this.applyInfo.deptId){
          Toast({
            message: '该设备暂时无法提交维修申请，请稍后重试',
            position: 'center',
            duration: 1500
          })
          setTimeout(()=>{
            this.isActive=false
          },1000)
        }
        if(this.applyInfo.urgentLevel=='请选择'){
          Toast({
            message: '请选择紧急程度',
            position: 'center',
            duration: 1500
          })
          setTimeout(()=>{
            this.isActive=false
          },1000)
        }else{

          if(this.applyInfo.faultDesc==''){
            Toast({
              message: '请填写故障描述',
              position: 'center',
              duration: 1500
            })
            setTimeout(()=>{
              this.isActive=false
            },1000)
          }
        }
        if(this.applyInfo.urgentLevel !='请选择'&&this.applyInfo.faultDesc!='' && this.applyInfo.deptId){
        	//对图片进行切割
        
        	this.imgList=this.imgList.length!=0 ?  this.imgList : Vue.ls.get("currImgArr")
        	this.applyInfo.assetsImg=(this.imgList.length && this.imgList.join(',')) ||''
        	this.isdiable=true
          api.newApply({
            method:'post',
            _this:this,
            callBack:function(){
            	this.isdiable=false
            },
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
            this.applyInfo.urgentLevel=4
      }},
        {name:'紧急',method:()=>{
            this.isColor=true,
            this.applyInfo.urgentLevel=3
        }},
        {name:'一般',method:()=>{
            this.isColor=true,
            this.applyInfo.urgentLevel=2
        }},
        {name:'不紧急',method:()=>{
            this.isColor=true,
            this.applyInfo.urgentLevel=1
        }}]
    },
    watch: {
      popupVisible2(val) {
        if (val) {
          setTimeout(() => {
            this.popupVisible2 = false;
          }, 2000);
        }
      },
    applyInfo:{
      handler(newValue, oldValue) {
        if(newValue.faultDesc.length>=300){
          this.applyInfo.faultDesc=newValue.faultDesc.substr(0,300)
        }
      },
      deep: true
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

  .msgList i.urgencyColor{
    color: #666;
  }
  .msgList span{
    color: #333;
    display: inline-block;
    margin-right: pxToRem(70px);
    vertical-align: middle;
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
    padding:  pxToRem(30px) 0 pxToRem(30px) pxToRem(30px);
    background: #fff;
    min-height: pxToRem(275px) ;
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
    border-bottom: 1px solid #e5e5e5;
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
    color: #bebebe;
  }
.device-info {
  	i{
  		width:pxToRem(500px);
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			display: inline-block;
			vertical-align: middle;
  	}
  }


</style>

