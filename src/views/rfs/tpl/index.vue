<template lang="pug">
f7-page.rf_tpl(:page-content="false")
  f7-toolbar(tabbar top)
    .a
      f7-link.wp_80(back)
        f7-icon(color="deeporange" f7="chevron_left")

    .b.flex.wp_100.hp_100
      f7-link.underline_40(tab-link tab-link-active href="#rf_tpl_1") 彩票盈亏
      f7-link.underline_40(tab-link href="#rf_tpl_2" ) 三方盈亏 
      //- f7-link.underline_40(tab-link href="#rf_tpl_3" ) 棋牌盈亏 
      f7-link.underline_40(tab-link href="#rf_tpl_4" ) 微游盈亏 

  f7-tabs(animated swipeable)
    f7-tab#rf_tpl_1(tab-active @tab:show=" tabShow ")
      A(:g_="g")
    f7-tab#rf_tpl_2(@tab:show=" tabShow ")
      B(:g_="g")
    //- f7-tab#rf_tpl_3(@tab:show=" tabShow ")
      C(:g_="g")
    f7-tab#rf_tpl_4(@tab:show=" tabShow ")
      D(:g_="g")
        
</template>

<script>
import config from '@/config'
import A from './A'
import B from './B'
import C from './C'
import D from './D'
export default {
  mixins: [config],
  components: {
    A,
    B,
    C,
    D,
  },
  name: 'rf_tpl',
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
