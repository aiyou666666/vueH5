// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible'
import axios from 'axios'
import FastClick from 'fastclick'
import voinc from './components/vonic'
Vue.prototype.axios = axios
Vue.config.productionTip = false

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
