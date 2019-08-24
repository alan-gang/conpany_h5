<template lang="pug">
f7-page
  f7-navbar(:innerClass=" 'navbar_of_' + $options.name " :title=" v.n + v.txt " back-link)
  template(v-if=" !v.t && d ")
    .bg-color-deeporange.pd_20.t_c
      img(:src=" 'data:image/png;base64,' +  d.qrStr ")

  f7-list.mg_0(inline-labels no-hairlines ref="_form")
    template(v-if=" !v.t && d ")
      f7-list-input(label="用户名" type="text" :placeholder=" d.userName " readonly)
      f7-list-input(label="平台名称" type="text" :placeholder=" d.plat " readonly)
      f7-list-input(label="密钥" type="text" :placeholder=" d.authKey " readonly)
        f7-button.w_60(slot="content" round fill v-clipboard:success="onCopy" v-clipboard:copy=" d.authKey ") 复制

    f7-list-input(label="验证码" type="text" required validate clear-button placeholder="请输入博盾验证码" :value=" form.c " @input=" form.c = $event.target.value ")

  .h_40
  f7-button.mg_10(fill large @click=" __validateform(switchGoogleAuth) ") 确认
  .mg_10.c_g.ft_12 注： 请在‘博盾验证器’中查看验证码，如果您未曾下载过，您需要先下载安装‘博盾验证器’，并使用‘博盾验证器’扫码获取验证码，或者在‘博盾验证器’中输入平台、密钥以获取验证码
  

    
</template>

<script>
import config from '@/config'
import api from '@/api'
export default {
  mixins: [config],
  components: {
  },
  name: 'safecenter_bdb',
  props: ['v'],
  data () {
    return {
      d: null,
      form: {
        c: '',
      },
    }
  },
  computed: {
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.__setCall({fn: '__cpwd'})
      if (!this.v.t) this.createCBqr()
    },
    createCBqr () {
      this.$.get(api.createCBqr).then(({data}) => {
        this.d = data
      })
    },
    switchGoogleAuth () {
      this.$.get(api.switchGoogleAuth + '&type=' + (this.v.t ? 0 : 1), { verifyCode: this.form.c })
    },
    onCopy (e) {
      this.__alert('复制成功：' + e.text)
    },
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
</style>
