<template lang="pug">

f7-page.rf_bc_1(:page-content="false")

  f7-toolbar.z_9502.ft_14(top)

    f7-link(color="gray" @click=" sd === 1 ? __setCall({fn: '__closeSD'}) : sd = 1 ") 
      span {{ g.n }}
      f7-icon.rz_90(f7="play_fill" size="10px" :class=" { 'rz_-90 color-deeporange': sd === 1 } ")
    
    .v_line.hp_50.w_1.bg-color-gray.o_30

    f7-link(color="gray" @click=" sd === 2 ? __setCall({fn: '__closeSD'}) : sd = 2 ") 
      span {{ __stetn.join(' 至 ') }}

      f7-icon.rz_90(f7="play_fill" size="10px" :class=" { 'rz_-90 color-deeporange': sd === 2 } ")

    .v_line.hp_50.w_1.bg-color-gray.o_30

    f7-link(color="gray" @click=" sd === 3 ? __setCall({fn: '__closeSD'}) : sd = 3 ") 
      span 全部状态
      f7-icon.rz_90(f7="play_fill" size="10px" :class=" { 'rz_-90 color-deeporange': sd === 3 } ") 

  filters(v-if=" sd " @sd=" sd = $event ")
    GP(v-if=" sd === 1 " @g=" g = $event " @done=" __setCall({fn: '__closeSD'}) ")
    DP(v-else-if=" sd === 2 " @done=" __setCall({fn: '__closeSD'}) ")
    OSP(v-else=" sd === 3 " @s=" s = $event "  @done=" __setCall({fn: '__closeSD'}) ")

  .page-content.ptr-content(ptr-mousewheel="true" @ptr:refresh=" refresh ")

    .ptr-preloader
      .preloader
      .ptr-arrow

</template>

<script>
import config from '@/config'
import filters from '@/components/filters'
import GP from '@/components/filters/GP'
import DP from '@/components/filters/DP'
import OSP from '@/components/filters/OSP'
import stet from '@/components/stet'
export default {
  mixins: [config, stet],
  components: {
    filters,
    GP,
    DP,
    OSP,
  },
  name: 'rf_bc_1',
  props: [],
  data () {
    return {
      sd: false,
      g: {n: '全部游戏', id: ''},
      s: {n: '全部状态', id: ''}
    }
  },
  created () {
  },
  methods: {
    refresh (evt, done = evt.detail) {
      this.init()
      setTimeout(done, 1000)
    },
    __init_rf_bc_1 () {
      this.init()
    },
    init () {
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.rf_bc_1
  top var(--f7-toolbar-height)
.navbar-hidden ~ .page
  .rf_bc_1 .page-content
    padding-top var(--f7-toolbar-height)
  
</style>
