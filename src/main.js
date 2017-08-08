// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './filter/filter.js'
import App from './App'
import router from './router'
import 'lib-flexible'
import axios from 'axios'
import FastClick from 'fastclick'
import VueLocalStorage from 'vue-ls'   //本地存储
import 'mint-ui/lib/style.css'    //样式需要单独引用
import vueBubble from 'vue-bubble'
import { Actionsheet ,Popup ,DatetimePicker,InfiniteScroll,Loadmore,Swipe, SwipeItem} from 'mint-ui'
Vue.component(Actionsheet.name, Actionsheet);
Vue.component(Popup.name, Popup);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Loadmore.name, Loadmore);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.use(InfiniteScroll);
Vue.use(vueBubble)

Vue.prototype.axios = axios
Vue.config.productionTip = false
	let options = {
	  namespace: 'vuejs__'
	};
Vue.use(VueLocalStorage, options);

//解决移动端  click 点击 300ms延迟的问题
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})


