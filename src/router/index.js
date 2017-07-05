import Vue from 'vue'
import Router from 'vue-router'

import Login from '../pages/Login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path:'/findpassword',
      component:resolve=>{
        require(['../pages/FindPassword'],resolve)
      }
    },
    {
      path:'/msglogin',
      component:resolve=>{
        require(['../pages/MsgLogin'],resolve)
      }
    }
  ]
})
