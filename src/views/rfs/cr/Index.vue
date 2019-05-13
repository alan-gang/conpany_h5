<template lang="pug">
f7-page.rf_cr(:page-content="false")
  f7-toolbar(tabbar top)
    .a
      f7-link.wp_80(back)
        f7-icon(color="deeporange" f7="chevron_left")

    .b.flex.wp_100.hp_100
      f7-link.underline_40(tab-link tab-link-active href="#rf_cr_1") 账变明细
      f7-link.underline_40(tab-link href="#rf_cr_2" ) 充值记录 
      f7-link.underline_40(tab-link href="#rf_cr_3" ) 转账记录 
      f7-link.underline_40(tab-link href="#rf_cr_4" ) 提现记录 

  f7-tabs(animated swipeable)
    f7-tab#rf_cr_1(tab-active @tab:show=" tabShow ")
      AR(:g_="g")
    f7-tab#rf_cr_2(@tab:show=" tabShow ")
      LR(:g_="g")
    f7-tab#rf_cr_3(@tab:show=" tabShow ")
      TR(:g_="g")
    f7-tab#rf_cr_4(@tab:show=" tabShow ")
      WR(:g_="g")
        
</template>

<script>
import config from '@/config'
import AR from './AR'
import LR from './LR'
import TR from './TR'
import WR from './WR'
export default {
  mixins: [config],
  components: {
    AR,
    LR,
    TR,
    WR,
  },
  name: 'rf_cr',
  props: ['g', 'tabid'],
  data () {
    return {}
  },
  mounted () {
    if (this.tabid) this.__setCall({fn: '__showTab', args: this.tabid})
  },
  methods: {
    tabShow (evt) {
      this.__setCall({fn: '__init_' + evt.target.id})
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层


</style>
