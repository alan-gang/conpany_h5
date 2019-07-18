<template lang="pug">
f7-page.xyb_io
  f7-navbar(:title=" !f ? '转入信游宝' : '转出信游宝' " back-link)
  template(v-if="!f")
    f7-list.mg_10
      f7-list-item(title="资金来源" smart-select='', :smart-select-params="{openIn: 'sheet'}" ref="f")
        select(name="wallets" v-model=" form.i ")
          option(v-for=" (v, i) in config.wallets.slice(0, 2) " :key="i" :value="i") {{ v.n }}
      f7-list-item(title="可转入金额" :after=" im._f3() ")

  template(v-else)
    f7-list.mg_10
      f7-list-item(title="转出至" smart-select='', :smart-select-params="{openIn: 'sheet'}" ref="f")
        select(name="wallets" v-model=" form.j ")
          option(v-for=" (v, i) in config.wallets.slice(0, 2) " :key="i" :value="i") {{ v.n }}
      f7-list-item(title="信游宝余额" :after=" im._f3() ")

  f7-list.mg_10
    li.item-content.item-input(ref="m")
      .item-media
        f7-icon._icon._load_amount(f7="home")
      .item-inner
        .item-input-wrap
          input(required validate pattern="[0-9]*" type='number' step="0.001" v-model="form.m" placeholder="请输入金额" :max=" Number(im) " :min="1")
          span.input-clear-button

  f7-button.mg_10(fill large @click=" form.m &&  p2pBuyProduct() ") 确认
  .pl_10.pr_10.text-color-gray(v-if=" !f && time ") 
    span.mr_5 预计收益到账时间
    span.c_orange {{ new Date(time)._toMonthDayStringCN() }}({{ new Date(time)._toWeekString() }})

</template>

<script>
import config from '@/config'
import api from '@/api'
export default {
  mixins: [config],
  components: {
  },
  name: 'xyb_io',
  props: ['v', 'f'],
  data () {
    return {
      form: {
        i: 0,
        j: 0,
        m: '',
      },
      time: ''
    }
  },
  computed: {
    im () {
      return this.f ? this.user.$xyb : this.config.wallets[this.form.i] ? this.user[this.config.wallets[this.form.i].key] : ''
    },
  },
  created () {
    !this.f && this.getTimeByProductId()
  },
  methods: {
    p2pBuyProduct () {
      this.$.get(api.p2pBuyProduct, {
        productId: this.v.id,
        action: this.f ? 'withdraw' : 'buy',
        amount: this.form.m,
        accountType: !this.f ? this.form.i : this.form.j,
      }).then(() => (this.form.m = ''))
    },
    getTimeByProductId () {
      this.$.get(api.getTimeByProductId, {productId: this.v.id}).then(({data: {dataTime}}) => {
        this.time = dataTime
      })
    },
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
    
</style>
