<template lang="pug">
f7-page.rf_fh(:page-content="false")
  f7-toolbar(tabbar top)
    .a
      f7-link.wp_80(back)
        f7-icon(color="deeporange" f7="chevron_left")

    .b.flex.wp_100.hp_100
      f7-link.underline_40(tab-link tab-link-active href="#rf_fh_1") 历史分红
      f7-link.underline_40(tab-link href="#rf_fh_2" ) 预期分红 
      f7-link.underline_40(tab-link href="#rf_fh_3" ) 分红契约 

  f7-tabs(animated swipeable)
    f7-tab#rf_fh_1(tab-active @tab:show=" tabShow ")
      A
    f7-tab#rf_fh_2( @tab:show=" tabShow ")
      B
    f7-tab#rf_fh_3(@tab:show=" tabShow ")
      C
        
</template>

<script>
import config from '@/config'
import A from './A'
import B from './B'
import C from './C'
export default {
  mixins: [config],
  components: {
    A,
    B,
    C,
  },
  name: 'rf_fh',
  // props: ['tabid'],
  data () {
    return {}
  },
  mounted () {
    // if (this.tabid) this.__setCall({fn: '__showTab', args: this.tabid})
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
.rf_fh
  & > .toolbar.tabbar.toolbar-top
    // transform none
    // top 0
  
</style>
