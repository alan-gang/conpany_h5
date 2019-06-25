<template lang="pug">
f7-page.transfer-to-pg
  f7-navbar(title="给下级转账" back-link top)
  f7-row.h_40.bgc_f.flex-ai-c.pl_25
    f7-col 转帐给: {{name}}
  f7-row.h_40.bgc_f.flex-ai-c.pl_25.mt_10
    f7-col(width="25") 转帐金额
    f7-col.pr_10(width="75") 
      f7-input(type="text" :clear-button="true" placeholder="请输入转账金额" :value="amount" @input="amount = $event.target.value" maxlength="10")
  .accounts-wp
    f7-row.h_40.flex-ai-c.pl_25
      f7-col 我的转出账户：
    f7-row.h_40.bgc_f.flex-ai-c.pl_25(v-for="(m, i) in moneyTypes")
      f7-col(width="85")
        span {{m.name}}
        span.text-color-gray(:type="m.type") (可用余额：{{user[m.key]}})
      f7-col(width="15")
        f7-radio(name="payAccount" :checked="m.checked" :value="m.type" @change="ctype = $event.target.value")
  f7-button.mg_10.mt_30(fill large @click="recharge") 下一步
</template>

<script>
import api from '@/api'
import config from '@/config'
export default {
  name: 'transferTo',
  mixins: [config],
  props: ['name', 'id', 'myId'],
  data () {
    return {
      amount: '',
      moneyTypes: [
        {type: 0, name: '主账户', key: 'availableBalance', checked: true},
        {type: 1, name: '特殊账户', key: 'specialBalance', checked: false}
      ],
      ctype: 0
    }
  },
  methods: {
    recharge () {
      if (!this.amount || parseFloat(this.amount) > parseFloat((this.ctype === 0 ? this.user['availableBalance'] : this.user['specialBalance']))) {
        this.__toast('您输入的金额不合法')
        return
      }
      this.$.get(api.recharge, {
        destId: this.id,
        amount: this.amount,
        isSpe: this.ctype
      }).then(({data}) => {
        this.__toast('充值成功')
      }, (rep) => {
      })
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
