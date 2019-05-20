import api from './index'
import './throttle'
import axios from 'axios'
import qs from 'qs'
let $f7 = null
// let $f7router = null
// let Spin = null
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.withCredentials = true
// axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.timeout = 10000
axios.interceptors.request.use((config) => {
  $f7 = axios.$root.$f7
  // preloader
  let {loading, loadingText} = (api[config.url] || {})
  if (loading) {
    api[config.url].spin = $f7.dialog.preloader(loadingText)
    loading && setTimeout(() => {
      api[config.url].spin && api[config.url].spin.close()
      api[config.url].spin = null
    }, loading || axios.defaults.timeout)
  }

  if (config.method === 'post') config.data = qs.stringify(config.data)
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

axios.interceptors.response.use((response) => {
  window.lstt = (new Date(response.headers.date)).getTime()
  let spin = (api[response.config.url] || {}).spin
  if (spin) {
    spin.close()
    api[response.config.url].spin = null
  }

  if (api[response.config.url] && api[response.config.url].$anyway) {
    api[response.config.url].$anyway()
    delete api[response.config.url].$anyway
  }
  // the whole response is string, so pop a error
  if ((typeof response.data).toLowerCase() === 'string') response.data = {success: 0, msg: response.data}

  // all callback
  if ((api[response.config.url] || [])['fn']) axios.$root.$children[0].__setCall({fn: (api[response.config.url] || [])['fn']})

  // false callback
  if (response.data.success < 1) {
    let {fn, args} = ((api[response.config.url] || [])[Number(response.data.success)] || {})
    axios.$root.$children[0].__setCall({fn, args})
  }

  // if the data property is a string and not empty, should pop it as message
  // if (response.data.data && (typeof response.data.data).toLowerCase() === 'string') response.data.msg = response.data.data

  // ascertain msg from server or my api config
  let msg = response.data.msg || ((api[response.config.url] || [])[Number(response.data.success)] || {}).msg
  // if my api config has nomsg, set msg as empty
  if ((api[response.config.url] || []).nomsg) msg = ''
  if (msg && !response.data.href) {
    if (!response.data.success) $f7.dialog.alert(msg, '')
    else {
      $f7.toast.create({
        // icon: axios.$root.$theme.ios || axios.$root.$theme.aurora ? '<i class="icon f7-icons size-12 color-green">check</i>' : '<i class="material-icons">check_round</i>',
        // icon: '<i class="icon f7-icons color-green" style="font-size: 16px;">check</i>',
        text: '<i class="icon f7-icons color-green" style="font-size: 24px;">check</i>' + msg,
        position: 'center',
        closeTimeout: 1500,
      }).open()
    }
  }
  delete response.data.msg

  // follow actions to call
  let config = api[response.config.url]
  config && (config = config[response.data.success])
  if (config) {
    let fn = config.fn || []
    fn.forEach(x => {
      axios.$root.$children[0].__setCall(x)
    })
  }
  // 0
  // -1
  if (response.data.success === -1) {
    $f7.popup.open('#login')
  }

  // delete success
  if (response.data.success > 0) {
    delete response.data.success
    return response
  }
  return new Promise(() => {})
}, function (error) {
  // Do something with response error
  // if (spin) spin.remove(() => {})
  // timeout
  if (error.code === 'ECONNABORTED ') {
    return Promise.resolve(error)
  }
  return Promise.reject(error)
})
