<template>
  <div>
    <mt-popup v-model="popupVisible2" position="top" class="mint-popup-2" :modal="false">
      <p ><img src="../assets/images/fail.png" alt=""><span>提交失败，请检查网络重试</span></p>
    </mt-popup>
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible" class="sheet" :class="{clickSheet:isColor}">
    </mt-actionsheet>
    <div class="background"></div>
    <div class="msgList">
      <ul>
        <li>
          <span>故障鉴定</span>
        </li>
      </ul>
    </div>
    <div class="background"></div>
    <div class="msgList">
      <ul>
        <li @click="sheet">
          <span>现场解决</span><i :class="{localColor:isColor}">{{localTxt}}</i><img src="../assets/images/jr.png" alt="" class="choose">
        </li>
      </ul>
    </div>
    <div class="background"></div>
    <div class="decribe uploadImg">
      <span>备注</span>
      <textarea placeholder="请输入备注，300字以内，非必填" v-model="identifyComent" @keyup="key" @paste="key"></textarea>
      <span class="number"><i>{{identifyComent.length}}</i>/300</span>
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
    created(){
      document.title='故障鉴定'
    },
    data(){
      return{
        sheetVisible:false,
        actions:[],
        localTxt:'请选择',
        isColor:false,
        popupVisible2:false,
        identifyComent:'',
        sceneFlag:'',
        isActive:false
      }
    },
    components:{ButtonCom},
    methods:{
      applyDone(){
        this.isActive=true
        if(this.localTxt=='是'){
          this.sceneFlag=1
        }
        if(this.localTxt=='否'){
          this.sceneFlag=2
        }
        if(this.localTxt=='请选择'){
          Toast({
            message: '请选择是否现场解决',
            position: 'center',
            duration: 1500
          })
          setTimeout(()=>{
            this.isActive=false
          },1000)
        }else{
          api.idenify({
            headers:{
              'X-AEK56-Token':Vue.ls.get("X-AEK56-Token")
            },
            _this:this,
            method:'post',
            data:{
              "applyId": this.$route.query.id,
              "identifyComent": this.identifyComent,
              "repairMode": 1,
              "sceneFlag":  this.sceneFlag
            }
          }).then(response => {
            if( this.sceneFlag==1){
//              现场解决
              this.$router.push({ path: '/applyDone', query: { flag: 1 ,id:this.$route.query.id,localhost:0}})
            }else{
              this.$router.push({ path: '/applyDone', query: { flag: 1 ,id:this.$route.query.id,localhost:1}})
            }
          })
        }
      },
      sheet(){
        this.sheetVisible =true
      },
      key(){
        if(this.identifyComent.length>=300){
          this.identifyComent=this.identifyComent.substr(0,300)
        }
      }
    },
    mounted(){
        this.actions=[
          {name:'是',method:()=>{
              this.isColor=true,
              this.localTxt='是'
          }},
          {name:'否',method:()=>{
              this.isColor=true,
              this.localTxt='否'
          }},
        ]
    },
    watch:{
      identifyComent: function (val) {
      if(val.length>=300){
        this.identifyComent=val.substr(0,300)
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
  .msgList i.localColor{
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
  .decribe .number{
    margin-right:  pxToRem(30px);
    margin-top: pxToRem(-30px) ;
    float: right;
    color: #bebebe;
  }
</style>
