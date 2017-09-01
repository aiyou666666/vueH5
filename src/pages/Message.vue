<template>
  <div class="msg-container" style="height: 100%;">
    <div v-show="loadingimg">
      <div class="loading">
        <img src="../assets/images/loading.gif" alt="">      </div>
    </div>
    <div v-if="has" class="msg-wrap">
      <ul
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
        <msg-list v-for="l in list" :key="l.id" :message="l" @click.native="msgDetail(l.applyId,l.id)"></msg-list>
        <div v-show="nodata" class="loadMore">~没有更多了~</div>
        <div v-show="loading&&!nodata" class="loadMore"><img src="../assets/images/jz.png" alt=""></div>
      </ul>
    </div>
    <div  class="noresult" v-if="nohas">
      <img src="../assets/images/nodata.png" alt="">
      <div>暂无数据</div>
    </div>
  </div>
</template>
<script>
 import Vue from 'vue'
  import api from '../service/api.js'
  import MsgList from '../components/MsgList'
    export default{
      data(){
        return{
          pageNo:1,
          nodata:false,
          loading:false,
          list:[],
          nodata:false,
          nohas:false,
          has:false,
          loadingimg:true
        }
      },
      components:{MsgList},
      created(){
        document.title='消息'
        this.ajax()
      },
      methods:{
        ajax(){
          api.messageList({
            method:'get',
            headers:{
              	'X-AEK56-Token':Vue.ls.get("X-AEK56-Token")
           },
           _this:this,
            data:{
              orderByField:'message_time',
              isAsc:false,
              pageSize:6,
              pageNo:this.pageNo
            }
          }).then(response => {

            if(response.records.length==0){
              this.nodata = true;// 若数据已全部获取完毕
              this.loading=true;
            }else{
              this.loading=false;
              this.list=this.list.concat(response.records)
            }
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
        msgDetail(id,msgId){
//          console.log(document.getElementsByTagName('body')[0].scrollTop)
          this.$router.push({ path: '/applydone', query: {id: id ,msgId:msgId}})
        },
        loadMore() {
          this.pageNo++
          this.loading = true;
          setTimeout(() => {
              this.ajax()
          },500);
        },
      }
    }
    
</script>
<style scoped lang="scss">
  @import "../assets/scss/reset.scss";
  @import "../assets/scss/my-mixin.scss";
  .noresult{
    height: 100%;
    overflow: hidden;
  }
 .msg-wrap{
 	position: fixed;
 	top: 0;
 	bottom:pxToRem(95px);
 	overflow-x: auto;
 	-webkit-overflow-scrolling:touch
 }
</style>
