<template lang="pug">
f7-page.transfer-to-pg
  f7-navbar(title="给下级转账" back-link top)
  .step-1(v-show="step == 1")
    f7-row.h_40.bgc_f.flex-ai-c.pl_25
      f7-col 转账给: {{name}}
    f7-row.h_40.bgc_f.flex-ai-c.pl_25.mt_10.j_s
      f7-col(width="20") 转账金额:
      f7-col.pr_10(width="80") 
        f7-input(type="text" :clear-button="true" :placeholder="`单笔充值金额最低${topUpMin}元，最高${topUpMax}元`" :value="amount" @input="amount = $event.target.value" maxlength="10")
    .accounts-wp
      f7-row.h_40.flex-ai-c.pl_25
        f7-col 我的转出账户：
      f7-row.h_40.bgc_f.flex-ai-c.pl_25(v-for="(m, i) in moneyTypes")
        f7-col(width="85")
          span {{m.name}}
          span.text-color-gray(:type="m.type") (可用余额：{{user[m.key]}})
        f7-col(width="15")
          f7-radio(name="payAccount" :checked="m.checked" :value="m.type" @change="ctype = $event.target.value")
    f7-button.mg_10.mt_30(fill large @click="next") 下一步
  .step-2(v-show="step == 2")
    f7-row.h_40.bgc_f.flex-ai-c.pl_10.mt_10
      f7-col.pr_10
        f7-input(type="text" :clear-button="true" placeholder="请输入资金密码" :value="pwd" @input="pwd = $event.target.value" maxlength="20")
    f7-button.mg_10.mt_30(fill large @click="submit") 确认代充
</template>

<script>
import api from '@/api'
import config from '@/config'
export default {
  name: 'transferTo',
  mixins: [config],
  props: ['name', 'id', 'myId', 'topUpMin', 'topUpMax'],
  data () {
    return {
      amount: '',
      moneyTypes: [
        {type: 0, name: '主账户', key: 'availableBalance', checked: true},
        {type: 1, name: '特殊账户', key: 'specialBalance', checked: false}
      ],
      ctype: 0,
      step: 1,
      pwd: ''
    }
  },
  methods: {
    next () {
      if (!this.amount || parseFloat(this.amount) > parseFloat((this.ctype === 0 ? this.user['availableBalance'] : this.user['specialBalance']))) {
        this.__toast('您输入的金额不合法')
        return
      }
      this.step = 2
    },
    checkSecurityPwd () {
      if (!this.pwd) {
        this.__toast('请输入您的资金密码')
        return
      }
      this.$.post(api.checkSecurityPwd, {password: this.pwd}).then(({data}) => {
        this.recharge()
      }).catch(rep => {
      })
    },
    recharge () {
      this.$.get(api.recharge, {
        destId: this.id,
        amount: this.amount,
        isSpe: this.ctype
      }).then(({data}) => {
        this.__toast('充值成功')
      }, (rep) => {
      })
    },
    submit () {
      this.checkSecurityPwd()
    }
  }
}
</script>

<style lang="stylus">
.transfer-to-pg
  span[type="0"]
    margin-left 22px
  span[type="1"]  
    margin-left 10px
</style>
