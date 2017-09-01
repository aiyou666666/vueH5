import Vue from 'vue'
Vue.filter('machineName',value=>{
  if(value&&value.length>9){
    return value.substr(0,9)+'...'
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
Vue.filter('applyDoneName',value=>{
	if(value&&value.length>18){
      return value.substr(0,13)+'...'
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
    return y+'-'+(m<10?'0'+m:m)+'-'+(d<10?'0'+d:d)+' '+(h<10?'0'+h:h)+':'+(mm<10?'0'+mm:mm);
})
Vue.filter('statusChange',value=>{
    if(value==1){
      return '待故障鉴定'
    }else if(value==2){
      return '已现场解决'
    }else if(value==3){
      return '待维修'
    }else if(value==4){
      return '已维修待验收'
    }else if(value==5){
      return '验收通过'
    }else if(value==6){
      return '验收未通过'
    }else{
      return ''
    }
})
Vue.filter('status',value=>{
  if(value==1){
    return '待故障鉴定'
  }else if(value==2){
    return '已现场解决'
  }else if(value==3){
    return '待维修'
  }else if(value==4){
    return '已维修待验收'
  }else if(value==5){
    return '已完成'
  }else if(value==6){
    return '验收未通过'
  }else{
    return ''
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
    return '基本正常'
  }else if(value==3){
    return '其他'
  } else if(value==4){
    return '需进一步维修'
  } else if(value==5){
    return '需外送维修'
  } else if(value==6){
    return '其他'
  }else{
    return value
  }
})
Vue.filter('showImage',value=>{
    var list = value.split(',');
    return 'http://'+window.location.host + '/api/file'+list[0];
})
Vue.filter('showDetailImage',value=>{
    return 'http://'+window.location.host + '/api/file'+value;
})
Vue.filter('msgNum',value=>{
  if(value>=100){
    return '99+'
  }else{
    return value
  }

})
Vue.filter('homeName',value=>{
  if(value&&value.length>6){
    return value.substr(0,6)+'...'
  }else{
    return value
  }
})
Vue.filter('homeDept',value=>{
  if(value&&value.length>10){
    return value.substr(0,10)+'...'
  }else{
    return value
  }
})

