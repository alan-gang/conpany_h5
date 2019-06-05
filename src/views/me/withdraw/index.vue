<template lang="pug">

f7-page.withdraw
  f7-navbar(title="提现" back-link)
    f7-nav-right
      f7-link(@click=" __go('/rfs/cr/', {props: {tabid: '#rf_cr_4'}}) ") 提现记录

  f7-toolbar.bgc_orange.pd_20(top labels)

    f7-link.text-color-white._icon._withdraw_main(icon-f7=" home "   @click=" key = 'availableBalance' " style="padding: 0") 
      span 主帐户
      span.inlb.line.wp_50.h_5.bgc_f(:class=" { h_o: key !== 'availableBalance' } ")

    f7-link.text-color-white._icon._withdraw_special(icon-f7=" home " @click=" key = 'specialBalance'  " style="padding: 0") 
      span 特殊帐户
      span.inlb.line.wp_50.h_5.bgc_f(:class=" { h_o: key !== 'specialBalance' } ")


  .h_100.bgc_f.t_c
    .pt_15 账户余额(元)
    .ft_30.text-color-deeporange {{ user[key] }}

  f7-list.mt_5.mb_5(v-if=" user.userBankCards[0] ")
    f7-list-item(title="选择银行" smart-select='', :smart-select-params="{openIn: 'sheet'}" ref="s")
      f7-icon._icon._load_bank_choose(f7="home" slot="media" :class=" user.userBankCards[form.i].apiName ")
      select(name="banks" v-model=" form.i ")
        option(v-for=" (v, i) in user.userBankCards " :key="i" :value="i") {{ v.bankName }}(尾号{{ v.cardNo.slice(-4) }})

  f7-list.mt_5.mb_5
    li.item-content.item-input
      .item-media
        f7-icon._icon._load_amount(f7="home")
      .item-inner
        .item-input-wrap
          input(required validate type='number' v-model="form.m" :placeholder=" maxAmount ? '今日剩余提现额度' + maxAmount + '元' : '请输入提现金额' " )
          span.input-clear-button
      .item-after.pr_10
        f7-button(@click=" form.m = user[key] ") 全部额度
  .text-color-gray.pl_10.pr_10
    span 每日限成功提款
    span.text-color-deeporange  {{ maxTimes }} 
    span 次，今日您已提款
    span.text-color-deeporange  {{ times }} 
    span 次
  f7-block
    f7-button(fill large @click="checkSecurityPwd") 提交



</template>

<script>
import config from '@/config'
import api from '@/api'
export default {
  mixins: [config],
  components: {
  },
  name: 'withdraw',
  props: [],
  data () {
    return {
      key: 'availableBalance',
      form: {
        i: 0,
        m: '',
        cpwd: '',
      },
      maxAmount: '',
      maxTimes: '?',
      times: '?',
    }
  },
  computed: {
  },
  created () {
    this.__setCall({fn: '__getUserBankCards'})
    this.withdrawTimes()
  },
  methods: {
    withdrawTimes () {
      this.$.get(api.withdrawTimes).then(({data: {maxAmount, maxTimes, times}}) => {
        this.maxAmount = maxAmount
        this.maxTimes = maxTimes
        this.times = times
      })
    },
    checkSecurityPwd () {
      this.$f7.dialog.password('请输入资金密码', '', (cpwd) => {
        this.$.get(api.checkSecurityPwd, {password: cpwd}).then(r => {
          this.doWithDraw()
          // this.$.get(api.showWithDraw, {userBankId: this.user.userBankCards[this.form.i].entry, amount: this.form.m, isSpe: this.key === 'availableBalance' ? 0 : 1}).then(({data: {}}) => {
          // })
        })
      })
    },
    doWithDraw () {
      this.$.post(api.doWithDraw, {userBankId: this.user.userBankCards[this.form.i].entry, amount: this.form.m, isSpe: this.key === 'availableBalance' ? 0 : 1})
    }
    // getWithdrawByApi () {
    //   this.$.get(api.getWithdrawByApi).then(({data: { data }}) => {
    //   })
    // }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.withdraw
  --f7-tabbar-icon-size 32px
  --f7-tabbar-labels-height 100px
  .toolbar-inner
    padding-top 25px
    
</style>
