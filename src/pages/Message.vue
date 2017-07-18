<template>
  <div >
    <msg-list v-for="l in list" :key="l.id" :message="l" @click.native="msgDetail(l.applyId)"></msg-list>
  </div>

</template>
<script>
  import api from '../service/api.js'
  import MsgList from '../components/MsgList'
    export default{
      data(){
        return{
          list:[]
        }
      },
      components:{MsgList},
      created(){
        api.messageList({
          method:'get',
          data:{
            orderByField:'message_time',
            isAsc:false
          }
        }).then(response => {
            this.list=response.records
        })
      },
      methods:{
        msgDetail(id){
          this.$router.push({ path: '/applydone', query: {id: id }})
        },
      }
    }
</script>
<style scoped lang="scss">

</style>
