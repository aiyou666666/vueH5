<template>
  <div >
    <div class="noresult">
      <img src="../assets/images/noresult.png" alt="">
      <div>无法获取设备信息，请检查二维码</div>
    </div>
    <button-com class="btnLeave" @click.native="goHome"  :class="{active:isActive,btn:!isActive}">返回主页</button-com>
  </div>
</template>
<script>
    import ButtonCom from '../components/Button'
    export default{
      data(){
        return{
          isActive:false
        }
      },
      components:{ButtonCom},
      methods:{
        goHome(){
          this.isActive=true
          this.$router.push('/tabbar')
        },
      }
    }
</script>
<style lang="scss" scoped>
  @import "../assets/scss/reset.scss";
  @import "../assets/scss/my-mixin.scss";
</style>
