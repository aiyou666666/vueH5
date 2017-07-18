import Vue from 'vue'
Vue.filter('machineName',value=>{
  if(value&&value.length>11){
      return value.substr(0,10)+'...'
  }else{
    return value
  }
})
Vue.filter('officeName',value=>{
    if(value&&value.length>8){
      return value.substr(0,8)+'...'
  }else{
    return value
  }
})
Vue.filter('timeChange',value=>{
    var time = new Date(value);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y+'-'+m+'-'+d+' '+h+':'+mm+':'+s;
})
Vue.filter('statusChange',value=>{
    if(value==1){
      return '待故障鉴定'
    }else if(value==2){
      return '现场解决'
    }else if(value==3){
      return '待维修'
    }else if(value==4){
      return '已维修待验收'
    }else if(value==5){
      return '验收通过'
    }else{
      return '验收不通过'
    }
})
Vue.filter('urgentLevel',value=>{
  if(value=='请选择'){
    return value
  }
  if(value==1){
      return '不紧急'
  }else if(value==2){
      return '一般'
  }else if(value==3){
    return '紧急'
  }else{
      return '非常紧急'
  }
})
Vue.filter('toFixed',value=>{
  return value.toFixed(2)
})
Vue.filter('acceptChange',value=>{
  if(value==1){
    return '正常工作'
  } else if(value==2){
    return '基本工作'
  }else if(value==3){
    return '其他'
  } else if(value==4){
    return '需进一步维修'
  } else if(value==5){
    return '需外东维需'
  } else if(value==6){
    return '其他'
  }else{
    return value
  }
})
Vue.filter('showImage',value=>{
    var list = value.split(',');
    return list[0];
})


