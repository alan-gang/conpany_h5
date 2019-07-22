<template lang="pug">
f7-page
  f7-navbar(:title=" v.n + v.txt " back-link)
  .t_c.pd_20
    f7-icon._icon.v_t(:class=" '_safeicon' + v._icon + '_big' " f7="home" size="60")
  f7-list.mg_0(form inline-labels no-hairlines-md ref="_form")
    template(v-if=" v.t ")
      f7-list-input(type="password" required validate :pattern="R.pwd" validate-on-blur label="旧密码" placeholder="请输入当前密码" clear-button :value=" form.pwd " @input=" form.pwd = $event.target.value ")
    f7-list-input(type="password" required validate :pattern="R.pwd" validate-on-blur label="新密码" placeholder="请输入当前密码" clear-button :value=" form.npwd " @input=" form.npwd = $event.target.value ")
    f7-list-input(type="password" required validate :pattern="form.npwd" error-message="2次密码输入不一致" validate-on-blur label="确认密码" placeholder="请输入当前密码" clear-button :value=" form.npwda " @input=" form.npwda = $event.target.value ")

  .flex.pl_15.pr_15.pt_5.pb_5(v-show=" form.npwd ")
    .l
      span.mg_2.w_30.inlb.h_5(v-for=" (x, i) in 4 " :class=" [{ bgc_g: pwdlevel.level <= i }, pwdlevel.level > i && ('bg' + pwdlevel.cls) ] ")
    .r(:class=" pwdlevel.cls ")
      span 密码强度：
      span {{ pwdlevel.text }}

  .h_40
  f7-button.mg_10(fill large @click=" __validateform(changSecurePwd) ") 确认
  .mg_10.c_g.ft_12 注： 密码长度6-12位，由数字、小写字符和大写字母组成，但必须至少包括2种字符


</template>

<script>
import config from '@/config'
import api from '@/api'
import { getPwdSafeLevel } from '@/util/pwd'
export default {
  mixins: [config],
  components: {
  },
  name: 'safecenter_cpwd',
  props: ['v'],
  data () {
    return {
      form: {
        pwd: '',
        npwd: '',
        npwda: '',
      },
    }
  },
  computed: {
    pwdlevel () {
      return getPwdSafeLevel(this.form.npwd)
    }
  },
  created () {
  },
  methods: {
    changSecurePwd () {
      this.$f7.input.validateInputs(this.$refs['_form'])
      this.$.post(api.changSecurePwd, {password: this.form.pwd, newPwd: this.form.npwd, smsCode: ''}).then(() => {
        this.__toast({ text: '恭喜您， 资金密码修改成功，系统即将退出，请重新登录。', position: 'center', closeTimeout: 2000 })
        setTimeout(() => {
          location.reload()
        }, 2000)
      })
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
</style>
