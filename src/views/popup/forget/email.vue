<template lang="pug">

f7-page.email(:page-content="false" bg-color="white")

  f7-list.pr_15.mb_5(no-hairlines v-show="step === 0")

    f7-list-input(required validate type="text", placeholder="账户", clear-button="" :value="form.un" @input='form.un = $event.target.value')
      f7-icon(f7="person", slot="media")

    li.item-content.item-input
      .item-media
        i.icon.f7-icons check
      .item-inner
        .item-input-wrap
          input(required validate type='text' placeholder="验证码" v-model="form.code" @keyup.enter=" next ")
          span.input-clear-button
          img.code(:src=" user.codeimg " @click=" __setCall({fn: '__getcodeimg'}) ")
    li.h_o


  f7-list.pr_15.mb_5(no-hairlines v-show="step === 1")
    .color-gray.ft_14.pl_20
      p.mg_0 
        span 系统已向邮箱
        span.text-color-deeporange  {{ email }} 
        span 发送了验证码，请注意查收

      p.mg_0
        span(v-show=" t ")  
         span 在
         span  {{ t }} 
         span 秒后可
         span.text-color-gray 重新发送
        span(v-show=" !t ")
          span 未收到邮箱验证码？点击
          f7-link(color="deeporage" @click="sendMail") 重新发送

    f7-list-input(required validate type="text", placeholder="邮箱验证码", clear-button="" :value="form.code" @input='form.code = $event.target.value' @keyup.enter=" next ")
      f7-icon(f7="check", slot="media")
    
    li.h_o


  f7-list.pr_15.mb_5(no-hairlines v-show="step === 2")

    f7-list-input(required validate type="password", placeholder="新密码", clear-button="" :value="form.pwd" @input='form.pwd = $event.target.value')
      f7-icon(f7="lock", slot="media")

    f7-list-input(required validate :pattern=" form.pwd " type="password", placeholder="确认新密码", clear-button="" :value="form.pwda" @input='form.pwda = $event.target.value' @keyup.enter=" next ")
      f7-icon(f7="lock_fill", slot="media")
    
    li.h_o

  f7-block.mb_5
    f7-button(round fill large @click=" next ") 下一步


</template>

<script>
import config from '@/config'
import api from '@/api'
export default {
  mixins: [config],
  components: {
  },
  name: 'email',
  props: [],
  data () {
    return {
      form: {
        un: '',
        pwd: '',
        pwda: '',
        code: '',
      },
      step: 0,
      email: '',
      t: 0
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
    checkUserName () {
      this.$.get(api.checkUserName, {userName: this.form.un, verifyCode: this.form.code}).then(() => {
        this.getEmail()
      })
    },
    getEmail () {
      this.$.get(api.getEmail).then(({data: {email}}) => {
        this.email = email
        this.__clearform(0)
        this.step++
        this.sendMail()
      })
    },
    sendMail () {
      this.$.get(api.sendMail).then(() => {
        this.t = 60
        this.countDown()
      })
    },
    checkMailVerifyCode () {
      this.$.get(api.checkMailVerifyCode, {verifyCode: this.form.code}).then(() => {
        this.step++
      })
    },
    resetPwd () {
      this.$.get(api.resetPwd, {newPwd: this.form.pwda}).then(() => {
        this.$f7.popup.close('#forget')
      })
    },
    next () {
      switch (this.step) {
        case 0:
          this.checkUserName()
          break
        case 1:
          this.checkMailVerifyCode()
          break
        case 2:
          this.resetPwd()
          break
      }
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
.email
  .code
     position absolute
     right 15px
     top 8px
     bottom 0
     width 80px
    
</style>
