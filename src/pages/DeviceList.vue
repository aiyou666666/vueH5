<template>
  <div class="name">
    <div v-show="loadingimg">
      <div class="loading">
        <img src="../assets/images/loading.gif" alt="">      </div>
    </div>
    <div v-if="has" class="data-wrap">
      <div class="modal" v-show="timeModal" @click="timeModal=false">
        <ul>
          <li @click="timeClick">
            <span :class="{current:applytime}">申请时间</span>
            <span><img src="../assets/images/gx.png" alt="" v-show="applytime"></span>
          </li>
          <li @click="hurreyClick">
            <span :class="{current:hurrey}">紧急程度</span>
            <span><img src="../assets/images/gx.png" alt="" v-show="hurrey"></span>
          </li>
        </ul>
      </div>
      <div class="modal" v-show="morenModal"  @click="morenModal=false">
        <ul>
          <li @click="morenClick(index,l)" v-for="(l , index) in morenList">
            <span :class="{current:index==morenIndex}">{{l}}</span>
            <span><img src="../assets/images/gx.png" alt="" v-show="index==morenIndex"></span>
          </li>
        </ul>
      </div>
      <div class="modal" v-show="statusModal"  @click="statusModal=false">
        <ul>
          <li @click="statusClick(index,l)" v-for="(l , index) in statusList">
            <span :class="{current:index==statusIndex}">{{l}}</span>
            <span><img src="../assets/images/gx.png" alt="" v-show="index==statusIndex"></span>
          </li>
        </ul>
      </div>
      <div class="fixed">
        <ul>
          <li :class="{moren:!accept,accept:accept}" @click="timeModal=true,morenModal=false,statusModal=false">{{txtModal}}
            <img src="../assets/images/xjt.png" alt="" v-if="!timeModal">
            <img src="../assets/images/change.png" alt="" v-if="timeModal">
          </li>
          <li v-if="accept" :class="{moren:!accept,accept:accept}" class="allStatus" @click="timeModal=false,morenModal=false,statusModal=true">{{ statustxtMOdal}}
            <img src="../assets/images/xjt.png" alt=""  v-if="!statusModal">
            <img src="../assets/images/change.png" alt="" v-if="statusModal">
          </li>
          <li :class="{moren:!accept,accept:accept}" @click="morenModal=true,timeModal=false,statusModal=false">{{morentxtModal}}
            <img src="../assets/images/xjt.png" alt="" v-if="!morenModal">
            <img src="../assets/images/change.png" alt="" v-if="morenModal">
          </li>
        </ul>
      </div>
      <div class="background"></div>
      <ul
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
        <device-card v-for="l in list" :key="l.id" :msg="l"></device-card>
        <div v-show="nodata" class="loadMore">~没有更多了~</div>
        <div v-show="loading&&!nodata" class="loadMore"><img src="../assets/images/jz.png" alt=""></div>
      </ul>
    </div>
    <div v-if="nohas" class="nodata" style="height: 100%">
      <img src="../assets/images/nodata.png" alt="">
      <div>暂无数据</div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import api from '../service/api.js'
  import DeviceCard from '../components/DeviceCard'
  export default{
    data(){
      return{
          applytime:false,
          hurrey:false,
          accept:this.$route.query.status==0,
          loading:false,
          timeModal:false,
          applytime:true,
          txtModal:'申请时间',
          morentxtModal:'默认',
          statustxtMOdal:'全部状态',
          morenModal:false,
          statusModal:false,
          morenIndex:0,
          statusIndex:0,
          urgentLevel:'',
          orderByField:'report_repair_date',
          list:[],
          morenList:['默认','非常紧急','紧急','一般','不紧急'],
          statusList:['全部状态','已现场解决','已维修待验收'],
          pageNo:1,
          allLoaded:false,
          nodata:false,
          userInfo: Vue.ls.get("useInfo"),
          status:'',
          loadingimg:true,
          has:false,
          nohas:false
      }
    },
    components:{DeviceCard},
    methods:{
      loadMore() {
        this.pageNo++
        this.loading = true;
        setTimeout(() => {
          if(this.$route.query.status==10){
            api.getacceptMsgList({
              data: {
                'isAsc':false,
                'orderByField':this.orderByField,
                'urgentLevel':this.urgentLevel,
                'status':this.status,
                'pageSize':6,
                'pageNo':this.pageNo,
                'tenantId':this.userInfo.tenantId
              },
              _this:this,
              headers:{
              	'X-AEK56-Token':Vue.ls.get("X-AEK56-Token")
              },
              method:'get'
            }).then(response => {
              if(response.records.length==0){
                this.nodata = true;// 若数据已全部获取完毕
                this.loading=true;
              }else{
                this.loading=false;
                this.list=this.list.concat(response.records)
              }
            })
          }else {
          api.getMsgList({
            data: {
              'isAsc': false,
              'orderByField': this.orderByField,
              'status': this.$route.query.status,
              'urgentLevel': this.urgentLevel,
              'pageSize': 6,
              'pageNo': this.pageNo,
              'tenantId':this.userInfo.tenantId
            },
            _this:this,
            headers:{
              	'X-AEK56-Token':Vue.ls.get("X-AEK56-Token")
             },
            method: 'get'
          }).then(response=> {
            if (response.records.length == 0) {
              this.nodata = true;// 若数据已全部获取完毕
              this.loading=true;
            } else {
              this.loading = false;
              this.list = this.list.concat(response.records)
            }
          })
        }
        },500);
      },
      timeClick(){
          this.pageNo=1
          this.nodata=false
          document.getElementsByTagName('body')[0].scrollTop=0
          this.applytime=true
          this.hurrey=false
          this.timeModal=false
          this.txtModal='申请时间'
          this.orderByField='report_repair_date'
          if(this.$route.query.status==10){
            this.ajaxAccept(this.orderByField,this.urgentLevel,this.status,'')
          }else{
            this.ajax(this.orderByField,this.$route.query.status,this.urgentLevel,'')
          }
          this. loadMore()
      },
      hurreyClick(){
          this.pageNo=1
          this.nodata=false
          document.getElementsByTagName('body')[0].scrollTop=0
          this.applytime=false
          this.hurrey=true
          this.timeModal=false
          this.txtModal='紧急程度'
          this.orderByField='urgent_level'
          if(this.$route.query.status==10){
            this.ajaxAccept(this.orderByField,this.urgentLevel,this.status,'')
          }else{
            this.ajax(this.orderByField,this.$route.query.status,this.urgentLevel,'')
          }
          this. loadMore()
      },
      morenClick(index,l){
        document.getElementsByTagName('body')[0].scrollTop=0
        this.pageNo=1
        this.nodata=false
        if(index==0){
          this.urgentLevel=''
        }else if(index==1){
          this.urgentLevel=4
        }else if(index==2){
          this.urgentLevel=3
        }else if(index==3){
          this.urgentLevel=2
        }else{
          this.urgentLevel=1
        }
          this.morenIndex=index
          this.morentxtModal=l
          this.morenModal=false
          if(this.$route.query.status==10){
            this.ajaxAccept(this.orderByField,this.urgentLevel,this.status,'')
          }else{
            this.ajax(this.orderByField,this.$route.query.status,this.urgentLevel,'')
          }
        this.loadMore()
      },
      statusClick(index,l){
          document.getElementsByTagName('body')[0].scrollTop=0
          this.pageNo=1
          this.nodata=false
          this.statusIndex=index
          this.statustxtMOdal=l
          this.statusModal=false
          if(index==0){
            this.status=''
          }else if(index==1){
            this.status=2
          }else{
            this.status=4
          }
          this.ajaxAccept(this.orderByField,this.urgentLevel,this.status,'')
          this.loadMore()
      },
      ajax(orderByField,status,urgentLevel,pageNo){
        api.getMsgList({
          data: {
            'isAsc':false,
            'orderByField':orderByField,
            'status':status,
            'urgentLevel':urgentLevel,
            'pageSize':6,
            'pageNo':pageNo,
            'tenantId':this.userInfo.tenantId
          },
          _this:this,
          headers:{
            'X-AEK56-Token':Vue.ls.get("X-AEK56-Token")
          },
          method:'get'
        }).then(response => {
          this.list=response.records
          setTimeout(()=>{
            this.loadingimg=false
            if(this.list.length==0){
              this.nohas=true
            }else{
              this.has=true
            }
          },1000)
        })
      },
      ajaxAccept(orderByField,urgentLevel,status,pageNo){
        api.getacceptMsgList({
          data: {
            'isAsc':false,
            'orderByField':orderByField,
            'urgentLevel':urgentLevel,
            'status':status,
            'pageSize':6,
            'pageNo':pageNo,
            'tenantId':this.userInfo.tenantId
          },
          _this:this,
          headers:{
            'X-AEK56-Token':Vue.ls.get("X-AEK56-Token")
          },
          method:'get'
        }).then(response => {
          this.list =response.records
          setTimeout(()=>{
            this.loadingimg=false
            if(this.list.length==0){
              this.nohas=true
            }else{
              this.has=true
            }
          },1000)
        })
      }
    },
    created(){
      if(this.$route.query.status==10){
        document.title='维修验收'
      }
      if(this.$route.query.status==3){
        document.title='设备维修'
      }
      if(this.$route.query.status==1){
        document.title='故障鉴定'
      }
      if(this.$route.query.status==10){
        this.accept=true
        this.ajaxAccept(this.orderByField,'',this.status,'')
      }else{
        this.ajax(this.orderByField,this.$route.query.status,'','')
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../assets/scss/reset.scss";
  @import "../assets/scss/my-mixin.scss";
  .name{
    height: 100%;
    overflow: hidden;
  }
  .modal{
    height: 100%;
    background:rgba(0,0,0,.6);
    position: fixed;
    top:0;
    width: 100%;
    z-index:2;
    ul{
      margin-top:pxToRem(80px);
      li{
        padding:0 pxToRem(30px) ;
        font-size:  pxToRem(32px);
        color: #333;
        height: pxToRem(90px) ;
        background: #fff;
        line-height: pxToRem(90px);
        border-bottom:1px solid #e5e5e5;
        span:nth-child(2){
          float: right;
        }
        img{
          width: pxToRem(30px);
          height: pxToRem(15px);
        }
      }
    }
  }
  .modal ul>li .current{
    color: #f7931e;
  }
  .fixed{
    font-size:  pxToRem(29px);
    height: pxToRem(90px);
    /*line-height: pxToRem(90px);*/
    position: fixed;
    background: #fff;
    width: 100%;
    border-bottom: 1px solid #e5e5e5;
    padding:pxToRem(20px) 0;
    z-index:3;
    ul>li{
      float: left;
      text-align: center;
      img{
        width: pxToRem(30px);
        height: pxToRem(15px);
        margin-left:pxToRem(20px) ;
      };
    };
  };
  .moren{
    width: 50%;
  }
  .accept{
    width: 33.3%;
  }
  .allStatus{
    border-right: 1px solid #e5e5e5;
  }
  .fixed ul li:first-child{
    border-right: 1px solid #e5e5e5;
  }
  .data-wrap{
  	height:100%;
  	overflow-x: scroll;
  	padding-bottom:pxToRem(80px);
  	-webkit-overflow-scrolling:touch
  }
  .background{
    height: pxToRem(80px);
  }
</style>
