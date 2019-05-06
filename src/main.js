// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import 'babel-polyfill'
import './util'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import './api/config'

// import Framework7 from 'framework7/framework7.esm.bundle'
import 'framework7/css/framework7.bundle.min.css'
// import Framework7Vue from 'framework7-vue'
// Framework7.use(Framework7Vue)

// Import Framework7 Bundle
import Framework7 from 'framework7/framework7.esm.bundle.js'

// Import Framework7-Vue with all components
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js'

import 'framework7-icons'

// Init plugin and register all components
Framework7.use(Framework7Vue)

Vue.prototype.$ = axios
// Vue.prototype.$Modal = Modal
// Vue.prototype.$Message = Message
Vue.config.productionTip = false
// Vue.use(VueClipboard)
/* eslint-disable no-new */
axios.$root = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
