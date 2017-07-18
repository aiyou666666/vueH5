import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login'
import PageTransition from '../components/pageslider'

Router.prototype.goBack = function() {
	this.isBack = true
	window.history.go(-1)
}

Vue.use(Router)
export default new Router({

  linkActiveClass:"is-active",
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
    },
    {
      path:'/tabbar',
      component:resolve=>{
        require(['../pages/TabBar'],resolve)
      },
      redirect: '/home',
      children: [
        {
          path: '/home',
          component:resolve=>{
            require(['../pages/Home'],resolve)
          }
        },
        {
          path: '/message',
          component:resolve=>{
            require(['../pages/Message'],resolve)
          }
        }
      ]
    },
    {
      path: '/newApply',
      component:resolve=>{
        require(['../pages/NewApply'],resolve)
      }
    },
    {
      path: '/applyDone',
      component:resolve=>{
        require(['../pages/ApplyDone'],resolve)
      }
    },
    {
      path: '/deviceDetail',
      component:resolve=>{
        require(['../pages/DeviceDetail'],resolve)
      }
    },
    {
      path: '/deviceList',
      component:resolve=>{
        require(['../pages/DeviceList'],resolve)
      }
    },
    {
      path: '/idenify',
      component:resolve=>{
        require(['../pages/Idenify'],resolve)
      }
    },
    {
      path: '/pathDetail',
      component:resolve=>{
        require(['../pages/PathDetail'],resolve)
      }
    },
    {
      path: '/repairReport',
      component:resolve=>{
        require(['../pages/RepairReport'],resolve)
      }
    },
    {
      path: '/lookReport',
      component:resolve=>{
        require(['../pages/LookReport'],resolve)
      }
    },
    {
      path: '/accept',
      component:resolve=>{
        require(['../pages/Accept'],resolve)
      }
    },
    {
      path: '/useMsg',
      component:resolve=>{
        require(['../pages/UserMsg'],resolve)
      }
    }
  ]
})


