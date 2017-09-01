<template>
  <div class="deviceWrap">
    <div class="background"></div>
    <div class="msgList">
      <ul>
        <li >
          <img src="../assets/images/sbxq.png" alt="">
          <span>故障详情</span>
        </li>
      </ul>
    </div>
    <div class="background"></div>
    <div class="msgList">
      <ul>
        <li >
          <span>维修单号</span><span>{{msgList.applyNo}}</span>
        </li>
        <li>
          <span>申请时间</span><span>{{msgList.reportRepairDate | timeChange}}</span>
        </li>
      </ul>
    </div>
    <div class="background"></div>
    <div class="msgList">
      <ul>
        <li >
          <span>设备编号</span><span>{{msgList.assetsNum}}</span>
        </li>
        <li>
          <span>设备名称</span><span>{{msgList.assetsName}}</span>
        </li>
        <li >
          <span>所在部门</span><span>{{msgList.assetsDeptName}}</span>
        </li>
        <li>
          <span>规格型号</span><span>{{msgList.assetsSpec}}</span>
        </li>
      </ul>
    </div>
    <div class="background"></div>
    <div class="msgList">
      <ul>
        <li >
          <span>紧急程度</span><span>{{msgList.urgentLevel | urgentLevel}}</span>
        </li>
      </ul>
    </div>
    <div class="background"></div>
    <div class="msgCard">
      <span >故障图片</span>
      <!--<img src="../assets/images/11.png" alt="">-->
      <div>
	      <img src="../assets/images/11.png" alt="" v-if="!msgList.assetsImg">
	      <img v-for="(src,index) in assetsImgList" :src="src | showDetailImage" alt="" v-else>
      </div>
    </div>
    <div class="background"></div>
    <div class="msgDecribe">
      <div>故障描述</div>
      <div>{{msgList.faultDesc}}</div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import api from '../service/api.js'
  export default{
  	data(){
    		assetsImgList:[]
    	},
    created(){
      document.title='查看故障详情'

      api.getDetail({
        param: {
          id:this.$route.query.id
        },
        headers:{
          'X-AEK56-Token':Vue.ls.get("X-AEK56-Token")
        },
        method:'get',
        _this:this
      }).then(response => {
        this.msgList=response
        this.assetsImgList=this.msgList.assetsImg && this.msgList.assetsImg.split(",") || '';
      })
    },
    data(){
      return{
        msgList:''
      }
    },
    methods:{
      goHome(){
        this.$router.push('/tabbar')
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
  .deviceWrap{
  	padding-bottom:pxToRem(17px);
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
    width:pxToRem(500px) ;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    vertical-align: middle;
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
    display: inline-block;
    vertical-align: middle;
  }
  .msgCard{
    min-height: pxToRem(210px);
    background: #fff;
    padding: pxToRem(32px) ;
      span{
        display: inline-block;
        font-size: pxToRem(28px);
        margin-right:  pxToRem(25px);
        width: pxToRem(120px);
        vertical-align: top;
      }
    div{
    	width:pxToRem(500px);
    	display: inline-block;
    }
  }
  .msgCard{
  	div{
  		img{
  			width: pxToRem(151px) ;
        height: pxToRem(151px) ;
        margin-right: pxToRem(10px);
        margin-bottom:pxToRem(10px) ;
  		}

  	}

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
    min-height: pxToRem(250px);
    background: #fff;
    padding:pxToRem(30px) ;
    overflow: hidden;
    border-bottom: 1px solid #e5e5e5;
    div{
      display: inline-block;
      float: left;
      width:pxToRem(500px) ;
      word-break: break-all;
    }
  }
  .msgDecribe>div:first-child{
    font-size: pxToRem(28px);
    margin-right:  pxToRem(25px);
    width: pxToRem(165px);
  }
  .msgDecribe>div:last-child{
    float: left;
    /*margin-left:pxToRem(190px) ;*/
    /*margin-top:pxToRem(-30px) ;*/
  }
</style>
