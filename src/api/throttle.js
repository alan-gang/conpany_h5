import axios from 'axios'
import API from './index'
let timeout = 1500
let THROTTLE = {
  xhr: {
    defaultArgs: {
      timeout: 10000
    },
    then: function (s, e) {
      // e && e()
      return THROTTLE.xhr
    },
    finally: function (f) {
      f && f()
      return THROTTLE.xhr
    },
    catch: function (f) {
      // f && f()
      return THROTTLE.xhr
    }
  }
}
axios.throttle_get = (api, args) => {
  if (THROTTLE[api]) {
    if (args && args.$anyway) args.$anyway()
    return THROTTLE.xhr
  } else {
    THROTTLE[api] = true
    setTimeout(() => {
      THROTTLE[api] = false
    }, timeout)
    return axios.myget(api, args)
  }
}
axios.throttle_post = (api, args) => {
  if (THROTTLE[api]) {
    if (args && args.$anyway) args.$anyway()
    return THROTTLE.xhr
  } else {
    THROTTLE[api] = true
    setTimeout(() => {
      THROTTLE[api] = false
    }, timeout)
    return axios.mypost(api, args)
  }
}

['get', 'post'].forEach(m => {
  axios['_' + m] = axios[m]
  axios['my' + m] = function (api, args) {
    // save $el
    if (args && args.$el) {
      API[api] = Object.assign(API[api] || {}, {$el: args.$el})
      delete args.$el
    }
    // save anyway
    if (args && args.$anyway) {
      API[api] = Object.assign(API[api] || {}, {$anyway: args.$anyway})
      delete args.$anyway
    }
    if (m === 'get') args = {params: args}
    return axios['_' + m](api, args)
  }
  Object.defineProperty(axios, m, {
    get: function () {
      return this['throttle_' + m]
    }
  })
})
