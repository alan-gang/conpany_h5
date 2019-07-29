<template lang="pug">

f7-page.login.bg-color-white
  
  f7-link.pd_15(popup-close="#login")
    span.ft_16.c_9 取消
  
  .blocklog
  
  f7-list.pr_15.mb_5(no-hairlines)
    f7-list-input(v-show=" !tryPlay " required validate type='text', floating-label label="用户名" placeholder='用户名', clear-button :value='local.un', @input='local.un = $event.target.value')
    f7-list-input(v-show=" !tryPlay " required validate type='password',  floating-label label="密码" placeholder='密码', clear-button :value='local.pwd', @input='local.pwd = $event.target.value')

    li.item-content.item-input
      .item-inner
        .item-title.item-floating-label 验证码
        .item-input-wrap
          input(required validate type='number' v-model="form.code" @keyup.enter=" __setCall({fn: !tryPlay ? '__login' : '__tryLogin', args: {un: local.un, pwd: local.pwd, code: form.code, cb: __loginSuccess}}) ")
          span.input-clear-button
          img.code(:src=" user.codeimg " @click=" __setCall({fn: '__getcodeimg'}) ")
    li.h_o

  .pd_15.ft_12(v-show=" !tryPlay ")
    f7-checkbox(name=" remember " @change="  __setLocal({remember: $event.target.checked}) "  :checked=" local.remember " )
    span(@click=" __setLocal({remember: !local.remember}) ")  记住密码

    f7-link.f_r(popup-open="#forget")
      span.c_6 忘记密码


  f7-block.mb_5
    f7-button(round fill large @click=" __setCall({fn: !tryPlay ? '__login' : '__tryLogin', args: {un: local.un, pwd: local.pwd, code: form.code, cb: __loginSuccess}}) ") 登录

  .t_c
    f7-button.inlb(color="gray" @click=" tryPlay = !tryPlay ") {{ tryPlay ? '我要登录' : '我要试玩' }}
    f7-button.inlb(color="gray" popup-open="#register") 邀请注册

  f7-toolbar.t_c.ft_14(bottom bg-color="white" no-border)
    f7-link(text="" )
    f7-link(text="线路切换" popup-open="#speed")
    f7-link(text="" )



</template>

<script>
import config from '@/config'
export default {
  mixins: [config],
  components: {
  },
  name: 'login',
  props: [],
  data () {
    return {
      form: {
        code: '',
      },
      // 试玩
      tryPlay: false
    }
  },
  created () {
  },
  methods: {
    __initLoginPopup () {
      this.tryPlay = false
    },
    __loginSuccess () {
      this.code = ''
      /* log */
      // if (!this.tryPlay && this.local.remember) {
      //   this.__toast('已经记住您登录的账号密码，' + this.local.un + ':' + this.local.pwd)
      // }
      !this.tryPlay && this.__setLocal({
        remember: !!this.local.remember,
        un: this.local.remember ? this.local.un : '',
        pwd: this.local.remember ? this.local.pwd : ''
      })
      this.$f7.popup.close('#login')
      this.__go(this.global.afterLoginRedirect)
      this.__setCall(this.global.afterLoginAction)
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.login
  .blocklog
    height 100px
    bg('~src/assets/index/tab_games_nor@2x.png', auto 100%)
    
  .code
    position absolute
    right 20px
    top 0
    bottom 0
    width 80px
    
</style>
