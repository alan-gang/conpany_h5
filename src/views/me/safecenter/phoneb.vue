<template lang="pug">
f7-page
  f7-navbar(:title=" v.n.slice(0, 2) + v.txt " back-link)
  .t_c.pd_20
    f7-icon._icon.v_t(:class=" '_safeicon' + v._icon + '_big' " f7="home" size="80")
  f7-list.mg_0(form inline-labels no-hairlines-md ref="_form")
    template(v-if=" v.t ")
      f7-list-item(title="手机号" :after=" user[v.key] ")
    
    template(v-else)
      f7-list-input(type="number" required validate validate-on-blur pattern="[0-9]*"  label="手机号" placeholder="请输入您的手机号码" clear-button :value=" form.p " @input=" form.p = $event.target.value " ref="_form_p")

    li.item-content.item-input
      .item-inner
        .item-title.item-label 验证码
        .item-input-wrap
          input(required validate type='text' v-model="form.c" placeholder="请输入手机验证码")
          span.input-clear-button
        .item-after
          f7-button(fill round :disabled=" !!t " @click="!t && !v.t ? (form_n_ = '_form_p') && __validateform(sendSms) : sendSms()") {{ t ? t + '秒后' : ''}}重新获取

    f7-list-input(type="password" required validate validate-on-blur :pattern=" R.pwd " label="资金密码" placeholder="请输入资金密码" clear-button :value=" form.cpwd " @input=" form.cpwd = $event.target.value ")

      

  .h_40
  f7-button.mg_10(fill large @click=" (form_n_ = '_form') && __validateform(!v.t ? bindMobile : unbindMobile) ") 确认
</template>

<script>
import config from '@/config'
import api from '@/api'
export default {
  mixins: [config],
  components: {
  },
  name: 'safecenter_phoneb',
  props: ['v'],
  data () {
    return {
      form_n_: '',
      form: {
        p: '',
        c: '',
        cpwd: '',
      },
      t: 0,
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
    bindMobile () {
      this.$.post(api.bindMobile, {mobile: this.form.p, smsCode: this.form.c, password: this.form.cpwd}).then(this.__back)
    },
    unbindMobile () {
      this.$.post(api.unbindMobile, {smsCode: this.form.c, password: this.form.cpwd}).then(this.__back)
    },
    sendSms () {
      this.$.get(api.person_sendSms, {mobile: this.form.p}).then(() => {
        this.t = 60
        this.countDown()
      })
    },
    countDown () {
      this.t && (this.t--) && setTimeout(this.countDown, 1000)
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
</style>
