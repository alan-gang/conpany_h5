<template lang="pug">

f7-page.register.bg-color-white
  f7-navbar
    f7-nav-left
      f7-link(icon-only icon-f7="chevron_left" popup-close="#register")
    f7-nav-title 注册
 
  f7-list.pr_15.mb_5(no-hairlines)
    f7-list-input(required validate type="text", placeholder="账户", clear-button="" :value="form.un" @input='form.un = $event.target.value')
      f7-icon(f7="person", slot="media")

    f7-list-input(required validate type="password", placeholder="密码", clear-button="" :value="form.pwd" @input='form.pwd = $event.target.value')
      f7-icon(f7="lock", slot="media")

    f7-list-input(required validate :pattern=" form.pwd " error-message="2次密码输入不一至" type="password", placeholder="确认密码", clear-button="" :value="form.pwda" @input='form.pwda = $event.target.value')
      f7-icon(f7="lock_fill", slot="media")

    f7-list-input(required validate type="text", placeholder="邀请码", clear-button="" :value="form.tag" @input='form.tag = $event.target.value')
      f7-icon(f7="email", slot="media")

    li.item-content.item-input
      .item-media
        i.icon.f7-icons check
      .item-inner
        .item-input-wrap
          input(required validate type='text' placeholder="验证码" v-model="form.code" @keyup.enter=" autoRegist ")
          span.input-clear-button
          img.code(:src=" user.codeimg " @click=" __setCall({fn: '__getcodeimg'}) ")
    li.h_o

  f7-block.mb_5
    f7-button(round fill large @click=" autoRegist ") 注册

  .t_c
    span.v_m 已有帐户，去
    f7-button.inlb(@click="__setCall({fn: '__initLoginPopup'}) || $f7.popup.open('#login')" popup-close="#register") 登录


</template>

<script>
import config from '@/config'
import api from '@/api'
export default {
  mixins: [config],
  components: {
  },
  name: 'register',
  props: [],
  data () {
    return {
      // hr0001
      // ?tag=82965AC4D4A0CF4C47FB49E053E02136
      form: {
        un: '',
        pwd: '',
        pwda: '',
        tag: '',
        code: '',
      }
    }
  },
  computed: {
  },
  created () {
    if (this.__query.tag) this.getCodeByTag(this.__query.tag)
  },
  methods: {
    getCodeByTag (tag) {
      this.$.get(api.getCodeByTag, {tag}).then(({data: {code}}) => {
        this.form.tag = code
      })
    },
    autoRegist () {
      this.$.get(api.autoRegist, {userName: this.form.un, passwd: this.form.pwd, verifyCode: this.form.code, promotionCode: this.form.tag}).then(() => {
      })
    },
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.register
  .code
     position absolute
     right 15px
     top 8px
     bottom 0
     width 80px
    
</style>
