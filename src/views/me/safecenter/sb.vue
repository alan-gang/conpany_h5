<template lang="pug">
f7-page.safecenter_sb
  f7-navbar(:innerClass=" 'navbar_of_' + $options.name " :title=" v.n + v.txt " back-link)
  .t_c.pd_20
    f7-icon._icon.v_t(:class=" '_safeicon' + v._icon + '_big' " f7="home" size="70")

  f7-list.mg_0(inline-labels no-hairlines)
    f7-list-item(checkbox title="资金密码验证" checked readonly disabled color="gray")

    f7-list-item(checkbox indeterminate v-for=" (v, i) in cs " :title=" v.n " :checked=" v.id === form.i " @change=" form.i = ( $event.target.checked ?  v.id : '' ) ")

    li.item-content.item-input(ref="_form")
      .item-inner
        .item-title.item-label 验证码
        .item-input-wrap
          input(required validate type='text' v-model="form.c" placeholder="请输入验证码")
          span.input-clear-button
        .item-after(v-if=" c && c.api ")
          f7-button(fill round :disabled=" !!t " @click=" !t && sendSms() ") {{ t ? t + '秒后' : ''}}重新获取

  .h_40
  f7-button.mg_10(fill large :disabled=" (form.i === v.t) " @click="  __validateform(setsecurityCheck) ") 确认



</template>

<script>
import config from '@/config'
import api from '@/api'
export default {
  mixins: [config],
  components: {
  },
  name: 'safecenter_sb',
  props: ['v'],
  data () {
    return {
      cs: [
        {n: '手机验证', id: 1, api: api.person_sendSms},
        {n: '邮箱验证', id: 2, api: api.person_sendMail},
        {n: '安全码验证', id: 3},
      ],
      form: {
        i: this.v.t || '',
        c: '',
      },
      t: 0,
    }
  },
  computed: {
    c () {
      return this.cs.find(x => x.id === this.form.i) || {id: 0, api: ['', api.person_sendSms, api.person_sendMail][this.v.t]}
    }
  },
  created () {
    this.__setCall({fn: '__cpwd'})
  },
  methods: {
    setsecurityCheck () {
      this.$.get(api.setsecurityCheck, { checkType: this.c.id, verifyCode: this.form.c }).then(this.__back)
    },
    sendSms () {
      this.$.get(this.c.api, {email: this.form.p}).then(() => {
        this.t = 60
        this.countDown()
      })
    },
    countDown () {
      this.t && (this.t--) && setTimeout(this.countDown, 1000)
    },
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.safecenter_sb
  .item-checkbox
    flex-direction row-reverse
</style>
