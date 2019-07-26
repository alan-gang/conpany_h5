<template lang="pug">
f7-page.rf_ts(:page-content="false")
  f7-toolbar(tabbar top)
    .a
      f7-link.wp_80(back)
        f7-icon(color="deeporange" f7="chevron_left")

    .b.flex.wp_100.hp_100
      f7-link.underline_40(tab-link tab-link-active href="#rf_ts_1") 充提统计
      f7-link.underline_40(tab-link href="#rf_ts_2" ) 活动报表 

  f7-tabs(animated swipeable)
    f7-tab#rf_ts_1(tab-active @tab:show=" tabShow ")
      A(:g_="g")
    f7-tab#rf_ts_2(@tab:show=" tabShow ")
      B(:g_="g")
        
</template>

<script>
import config from '@/config'
import A from './A'
import B from './B'
export default {
  mixins: [config],
  components: {
    A,
    B,
  },
  name: 'rf_ts',
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
