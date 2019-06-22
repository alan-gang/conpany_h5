import Vue from 'vue'
import state from '@/store/config'
Vue.directive('nwc', (el, { value }) => {
  if (value) {
    Vue.nextTick(() => {
      let r = /[+-\d.,]+/
      let n = (el.innerText.match(r) || [''])[0].replace(/,/g, '')
      el.className = el.className.replace(/(c_e|c_s|c_g)/g, '')
      if (n._o0()) {
        el.className += ' c_s'
      }
      if (n._l0()) {
        el.className += ' c_e'
      }
      if (n) {
        el.innerText = (n._o0() ? '+' : '') + n._f3()._nwc()
      }
    })
  }
})
Vue.directive('state', (el, { value }) => {
  if (value) {
    Vue.nextTick(() => {
      el.className = el.className.replace(/(c_e|c_s|c_g)/g, '')
      el.className += ' ' + (state.state.stateClass[el.innerText] || 'no_config_state')
    })
  }
})
