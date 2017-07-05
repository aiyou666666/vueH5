/*import '../assets/scss/vonic/vonic.scss'*/
import Vue from 'vue'
import VueScroller from 'vue-scroller'
import Promise from 'es6-promise'
Promise.polyfill()
import assign from 'object-assign'
Vue.use(VueScroller)

import VSwipe from 'vswipe'
Vue.use(VSwipe)

// Advanced
import {Swiper, SwiperItem} from './vonic/swiper/index'
import Scroll from './vonic/scroll/index'
import Datepicker from './datepicker/index'
Vue.component('swiper', Swiper)
Vue.component('scroll', Scroll)
Vue.component('datepicker', Datepicker)

// Modal
import Modal from '../services/modal/Modal.vue'
Vue.component('modal', Modal)

import '../services/backdrop'

export default {
	// Advanced
  Swiper,
  SwiperItem,
  Scroll,
  Item:Modal
}
