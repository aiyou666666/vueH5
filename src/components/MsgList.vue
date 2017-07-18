<template>
  <div>
    <div class="MsgList" :class="{weidu:message.messageStatus==1}">
      <ul>
        <li class="MsgFirst"><span>{{message.messageContent}}</span><span :class="{noUrgent:message.messageLevel==1||message.messageLevel==2,Urgent:message.messageLevel==3,veryUrgent:message.messageLevel==4}">{{message.messageLevel |　urgentLevel}}</span></li>
        <li class="MsgSecond"><span>{{message.assetsName  | machineName}}</span><span>{{message.assetsDeptName  | officeName}}</span>
          <img src="../assets/images/jr.png" alt=""></li>
        <li class="MsgLast"><span>{{message.messageTime | timeChange}}</span></li>
      </ul>
    </div>
    <div class="background"></div>
  </div>
</template>
<script>
    export default{
        props:['message'],
    }
</script>
<style lang="scss" scoped>
  @import "../assets/scss/reset.scss";
  @import "../assets/scss/my-mixin.scss";
  .MsgList{
    height:pxToRem(208px);
    background:#fff;
    font-size:pxToRem(28px);
    padding:pxToRem(26px);
    color:#999;
    border: {
      top:1px solid #e5e5e5;
      bottom:1px solid #e5e5e5;
    };
    span{
      display: inline-block;
    }
    li{
      height: pxToRem(52px) ;
    }
  }
  .MsgFirst{
    font-size: pxToRem(32px);
    color: #333;
  }
  .weidu{
    color: #999;
  }
  .MsgFirst span:first-child{
    width: pxToRem(560px) ;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    float: left;
  }
  .MsgFirst span:last-child{
    height: pxToRem(40px);
    line-height: pxToRem(44px);
    font-size: pxToRem(20px);
    float: left;
    text-align: center;
    color: #fff;
    border-radius: 15px;
    width:pxToRem(135px) ;
  }
  .MsgSecond{
    color:#666;
    span{
      margin-right:pxToRem(15px);
      padding-left:pxToRem(16px) ;
    };
    img{
      float: right;
      width: pxToRem(15px);
      height:pxToRem(28px);
    }
  }
  .MsgLast{
    span{
      padding-left:pxToRem(16px) ;
    }
  }
  .background{
   height:pxToRem(24px);
    background: #eff3f6;
  }
  .MsgList li .veryUrgent{
    background: #f3756f;
  }
  .MsgList li .Urgent{
    background: #f7931e;
  }
  .MsgList li  .noUrgent{
    background: #63bd90;
  }
  </style>
