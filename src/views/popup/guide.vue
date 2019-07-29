<template lang="pug">

f7-page.guide
  .h_20
  .c_f.t_c.ft_16 欢迎登录

  .r_5.dialog-popup.popup.modal-in.not-animated
    f7-link.p_a.p_r_5.p_t_5(icon-f7="close" color="gray" icon-size="20px" popup-close="#guide")
    .c_orange.t_c.pd_15 设置账户信息

    f7-list.mr_15(no-hairlines ref="_form")
      template(v-if=" !user.hasNickName ")
        f7-list-input(:value=" form.n " @input=" form.n = $event.target.value " required clear-button placeholder="昵称：2-8个字符长度，可中文、数字，数字不能超过4个")

      template(v-if=" !user.hasLogPwd ")
        f7-list-input(:value=" form.pwd " @input=" form.pwd = $event.target.value " type="password" required validate :pattern="R.pwd" validate-on-blur clear-button placeholder="请设置新登录密码")
        f7-list-input(:value=" form.pwda " @input=" form.pwda = $event.target.value " type="password" required validate :pattern="form.pwd" validate-on-blur clear-button placeholder="请再次输入新登录密码")
        li.flex.pl_15.pr_15.pt_5.pb_5(v-show=" form.pwd ")
          .l
            span.mg_2.w_30.inlb.h_5(v-for=" (x, i) in 4 " :class=" [{ bgc_g: pwdlevel.level <= i }, pwdlevel.level > i && ('bg' + pwdlevel.cls) ] ")
          .r.twinkle(:class=" pwdlevel.cls ")
            span 密码强度：
            span {{ pwdlevel.text }}
      
      template(v-if=" !user.hasSecurityPwd ")
        f7-list-input(:value=" form.cpwd " @input=" form.cpwd = $event.target.value " type="password" required validate :pattern="R.pwd" validate-on-blur clear-button placeholder="请输入资金密码")
        f7-list-input(:value=" form.cpwda " @input=" form.cpwda = $event.target.value " type="password" required validate :pattern=" form.cpwd " validate-on-blur clear-button placeholder="请再次输入资金密码")
        li.flex.pl_15.pr_15.pt_5.pb_5(v-show=" form.cpwd ")
          .l
            span.mg_2.w_30.inlb.h_5(v-for=" (x, i) in 4 " :class=" [{ bgc_g: cpwdlevel.level <= i }, cpwdlevel.level > i && ('bg' + cpwdlevel.cls) ] ")
          .r(:class=" cpwdlevel.cls ")
            span 密码强度：
            span {{ cpwdlevel.text }}

    f7-button.mg_10(fill large round @click=" __validateform(guiding) ") 下一步
    .mg_10.c_g.ft_12 注： 由字符和数字组成6-16个字符，且必须包含数字和字母，不允许连续三位相同
    


</template>

<script>
import config from '@/config'
import api from '@/api'
import { getPwdSafeLevel } from '@/util/pwd'

export default {
  mixins: [config],
  components: {
  },
  name: 'guide',
  props: [],
  data () {
    return {
      form: {
        n: '',
        pwd: '',
        pwda: '',
        cpwd: '',
        cpwda: ''
      },
    }
  },
  computed: {
    pwdlevel () {
      return getPwdSafeLevel(this.form.pwd)
    },
    cpwdlevel () {
      return getPwdSafeLevel(this.form.cpwd)
    },
  },
  created () {
  },
  methods: {
    guiding () {
      !this.user.hasNickName && this.changNickName()
      !this.user.hasLogPwd && this.pwdlevel.level > 1 && this.changLoginPwd()
      !this.user.hasSecurityPwd && this.changSecurePwd()
    },
    changNickName () {
      this.$.post(api.changNickName, {nickName: this.form.n})
    },
    changLoginPwd () {
      this.$.post(api.changLoginPwd, {password: '123456a', newPwd: this.form.pwd, smsCode: ''}).then(() => {
        this.__toast({ text: '恭喜您， 登录密码修改成功，系统即将退出，请重新登录。', position: 'center', closeTimeout: 2000 })
        setTimeout(() => {
          location.reload()
        }, 2000)
      })
    },
    changSecurePwd () {
      this.$.post(api.changSecurePwd, {password: '', newPwd: this.form.cpwd, smsCode: ''}).then(() => {
        if (this.user.hasLogPwd) {
          this.__toast({ text: '恭喜您， 资金密码修改成功，系统即将退出，请重新登录。', position: 'center', closeTimeout: 2000 })
          setTimeout(() => {
            location.reload()
          }, 2000)
        }
      })
    },
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.guide
  bgg(0deg, #ff9500, #ff6b22)
    
</style>
