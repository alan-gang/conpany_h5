<script>
import {call, user, config, global, local, cache} from '@/store'
import R from '@/util/R'
export default {
  data () {
    return {
      window: window,
      call: call.state,
      user: user.state,
      config: config.state,
      global: global.state,
      local: local.state,
      cache: cache.state,
      R: R,
    }
  },
  created () {
    if (Object.keys(this.$options.methods).join(',').match(/__(?!(setCall|setUser|__setGlobal|__setLocal|__setCache|clearform))/g)) {
      this.$watch('call', () => {
        if (this.call.fn && typeof this[this.call.fn] === 'function') {
          if (!this.call.callId || this.call.callId === this.callId) {
            this.$nextTick(() => {
              this[this.call.fn](this.call.args)
            })
          }
          // (!this.call.callId || this.call.callId === this.callId) && this.$nextTick(this[this.call.fn](this.call.args))
        }
      }, {deep: true})
    }
  },
  computed: {
    _global () {
      return {
        shp: this.global.st / (this.global.sh - this.global.height)
      }
    },
    __query () {
      return JSON.parse(decodeURIComponent('{' + window.location.search.replace('?', '').replace(/&*(\w+)=([^&]+)&*/g, '"$1":"$2",') + '}').replace(',}', '}'))
    },
    __go () {
      return this.$f7.views.main.router.navigate.bind(this.$f7.views.main.router)
    },
    __back () {
      return this.$f7router.back.bind(this.$f7router)
    },
    __toast (args) {
      return (args) => {
        if (typeof args === 'string') args = {text: args, position: 'center', closeTimeout: 1000}
        this.$f7.toast.create(args).open()
      }
    },
    __route () {
      return this.$f7.views.main.router.currentRoute.route
    },
    __rl () {
      return this.__route.rl || (this.__route.tab || {}).rl
    },
    __tabShow (evt) {
      return (evt) => {
        this.__setCall({fn: '__init_' + evt.target.id})
      }
    },
    __alert (args) {
      return (args) => {
        let options = {text: args, position: 'center', buttons: [{text: '确定'}]}
        if (typeof args === 'string') options.text = args
        if (window.toString.call(args) === '[object Object]') Object.assign(options, args)
        this.$f7.dialog.create(options).open()
      }
    },
    // cache
    __$car () {
      return this.local.$car.filter(x => x.id === this.id)
    },
    // form
    __form () {
      return this.$refs[this.form_n_ || '_form'].$el || this.$refs[this.form_n_ || '_form'][0] || this.$refs[this.form_n_ || '_form']
    }
  },
  mounted () {
    // if reload
    if (Object.keys(this.$options.methods).join(',').match(/__reload\w*/g) && this.autoreload) {
      setTimeout(this[Object.keys(this.$options.methods).join(',').match(/__reload\w*/g)[0]])
    }
  },
  methods: {
    __setCall: call.actions.__setCall,
    __setUser: user.actions.__setUser,
    __setGlobal: global.actions.__setGlobal,
    __setLocal: local.actions.__setLocal,
    __setCache: cache.actions.__setCache,
    __clearform (t = 500) {
      setTimeout(() => {
        Object.entries(this.form || {}).forEach(([k, v]) => {
          (this.form || {})[k] = typeof v === 'string' ? '' : typeof v === 'number' ? 0 : undefined
        })
      }, t)
    },
    __validateform (cb) {
      this.$f7.input.validateInputs(this.__form)
      if (!this.__form.querySelector('.input-invalid')) cb && cb()
    }
  },
}
</script>
