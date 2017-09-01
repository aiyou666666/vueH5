<template>
  <div class="bigPircture">
    <mt-swipe :auto="0" :defaultIndex="defaultIndex">
      <mt-swipe-item v-for='(src,index) of currImgArr' :key="index">
        <span class="midder-line"></span>
        <img  :src="src | showDetailImage " width="100%" @click="tosta(index)"/>
      </mt-swipe-item>
    </mt-swipe>
    <div class="delect" v-if="delect" @click="delectImg">
      <img src="../assets/images/lodash.png" alt=""><span>删除图片</span>
    </div>
  </div>
</template>
<script>
    import Vue from 'vue'
    export default{
      data(){
        return{
          currImgArr:Vue.ls.get("currImgArr"),
          defaultIndex:this.$route.query.index || 0 ,
          delect:false,
          imgIndex:''
        }
      },
      created(){
      	Vue.ls.set("newApply","isLooK")
      	console.log("设置");
        console.log(Vue.ls.get('newApply'))
      },
      methods:{
        tosta(index){
          this.delect=!this.delect
          this.imgIndex=index
        },
        delectImg(){
          this.currImgArr.splice(this.imgIndex, 1)
          Vue.ls.set("currImgArr", this.currImgArr)
          this.delect=false

        }
      }
    }
</script>
<style scoped lang="scss">
  @import "../assets/scss/reset.scss";
  @import "../assets/scss/my-mixin.scss";
  .bigPircture{
    background-color: #000;
    height: 100%;
  .midder-line{
    display: inline-block;
    vertical-align: middle;
    width: 1px;
    height: 100%;
    margin-left: -5px;
  }
    img{
       display: inline-block;
       vertical-align: middle;
    }
  }
  .delect{
    height:pxToRem(88px) ;
    text-align: center;
    background: #1f1f1f;
    position: fixed;
    bottom: 0;
    width: 100%;
    line-height:pxToRem(88px);
    color:#fff;
    img{
      width:pxToRem(28px) ;
      height:pxToRem(34px) ;
    }
    span{
      margin-left:pxToRem(10px) ;
    }
  }
</style>
