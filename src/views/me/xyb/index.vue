<template lang="pug">
f7-page.xyb(:page-content="false")
  f7-navbar(title="信游宝" back-link)
  .pd_10.c_f.bg-color-deeporange
    .t_c
      .o_50.ft_12 年化收益率
      .ft_24
        span {{ v.rate._f1() }}
        span.ft_12  %
    f7-row
      f7-col
        .o_50.ft_12 当前余额（元）
        .ellipsis.ft_18(color="white") {{ v.balance._f3() }}

      f7-col.t_r
        .o_50.ft_12 累计收入（元）
        .ellipsis.ft_18(color="white") {{ v.income._f3() }}
    
    .o_50.ft_12 每12小时结算一次收益，随存随取
    
  f7-toolbar(tabbar)
    f7-link.underline_40(tab-link-active tab-link href="#xyb_1") 资金明细
    f7-link.underline_40(tab-link href="#xyb_2") 结算记录
  
  f7-tabs(animated swipeable)
    f7-tab#xyb_1(tab-active @tab:show=" __tabShow ")
      A(v-bind=" {v} ")
    f7-tab#xyb_2(@tab:show=" __tabShow ")
      B(v-bind=" {v} ")

  f7-toolbar(tabbar bottom)
    f7-button.wp_50(fill color="orange" @click=" __go('/me/xyb/io/', {props: { v, f: 1 }}) ") 转出
    span.pd_5
    f7-button.wp_50(fill @click=" __go('/me/xyb/io/', {props: { v}}) ") 转入


</template>

<script>
import config from '@/config'
import api from '@/api'
import A from './1'
import B from './2'
export default {
  mixins: [config],
  components: {
    A,
    B,
  },
  name: 'xyb',
  props: [],
  data () {
    return {
      data: [],
      v: {
        rate: '',
        balance: '',
        income: '',
      },
    }
  },
  created () {
    this.p2pList()
  },
  methods: {
    p2pList () {
      this.$.get(api.p2pList).then(({data: {data}}) => {
        this.data = data
        this.__p2pAccount(data[0])
      })
    },
    __p2pAccount (p) {
      p = p || this.data[0]
      if (!p) return
      this.$.get(api.p2pAccount, {productId: p.id}).then(({data: {balance, income}}) => {
        this.__setUser({$xyb: balance})
        this.v = Object.assign(this.v, p, { balance, income })
      })
    },
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.xyb
  .pd_10
    margin-top var(--f7-navbar-height)
  .tabbar .toolbar-inner
    justify-content center
    
</style>
