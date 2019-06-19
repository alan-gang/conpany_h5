<template lang="pug">
f7-page.rf_bc(:page-content="false")
  f7-toolbar(tabbar top)
    .a
      f7-link.wp_80(back)
        f7-icon(color="deeporange" f7="chevron_left")

    .b.flex.wp_100.hp_100
      f7-link.underline_40(tab-link tab-link-active href="#rf_bc_1_") 下级投注记录
      f7-link.underline_40(tab-link href="#rf_bc_2_" ) 下级追号记录 

  f7-tabs(animated swipeable)
    f7-tab#rf_bc_1_(tab-active @tab:show=" tabShow ")
      B(:g_="g")
    f7-tab#rf_bc_2_(@tab:show=" tabShow ")
      C(:g_="g")
        
</template>

<script>
import config from '@/config'
import B from './B'
import C from './C'
export default {
  mixins: [config],
  components: {
    B,
    C,
  },
  name: 'rf_bc',
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
