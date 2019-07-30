<template lang="pug">

f7-page.rf_cr_3(:page-content="false")

  f7-toolbar.z_9502.ft_14(top)

    
    f7-link.wp_45.t_c(color="gray" @click=" sd === 2 ? __setCall({fn: '__closeSD'}) : sd = 2 ") 
      span {{ __stetn.join(' 至 ') }}

      f7-icon.rz_90(f7="play_fill" size="10px" :class=" { 'rz_-90 color-deeporange': sd === 2 } ")

    .v_line.hp_50.w_1.bg-color-gray.o_30

    f7-link.wp_45.t_c(color="gray" @click=" sd === 3 ? __setCall({fn: '__closeSD'}) : sd = 3 ") 
      span.ellipsis {{ s.n }}
      f7-icon.rz_90(f7="play_fill" size="10px" :class=" { 'rz_-90 color-deeporange': sd === 3 } ") 

  filters(v-if=" sd " @sd=" sd = $event ")
    DP(v-if=" sd === 2 " @st=" $set(stet, 0, $event || '') " @et=" $set(stet, 1, $event || '') "  @done=" __setCall({fn: '__closeSD'}) ")
    TSP(v-else=" sd === 3 " @s=" s = $event "  @done=" __setCall({fn: '__closeSD'}) ")

  .page-content.ptr-content.infinite-scroll-content(ptr-mousewheel="true" @ptr:refresh=" refresh " @infinite="loadMore" :infinite-distance="50")

    .ptr-preloader
      .preloader
      .ptr-arrow

    f7-card(v-for=" (v, i) in data " :key="i")
      f7-card-content
        .flex.ft_13
          .a
            .hlh_30.ft_15 {{ v.from }} 转 {{ v.to }}
            .lh_20.text-color-gray {{ v.time }}

          .b.t_r
            .lh_30(:class=" v.stateIndex === 1 ? 'c_g' : '' ") {{ v.amount._f3() }}
            .lh_20(:class=" config.stateClass[v.state] ") {{ v.state }}

    .preloader.infinite-scroll-preloader(v-if="showPreloader")

    .t_c.text-color-gray.pd_15.nomore --没有更多了--


</template>

<script>
import config from '@/config'
import api from '@/api'
import page from '@/components/page'
import filters from '@/components/filters'
import DP from '@/components/filters/DP'
import TSP from '@/components/filters/TSP'
import stet from '@/components/stet'
export default {
  mixins: [config, stet, page],
  components: {
    filters,
    DP,
    TSP,
  },
  name: 'rf_cr_3',
  props: ['g_'],
  data () {
    return {
      sd: false,
      s: {n: '全部状态', id: ''},
      data: []
    }
  },
  watch: {
    sd (n) {
      if (!n) this.init()
    }
  },
  created () {
  },
  methods: {
    __init_rf_cr_3 () {
      this.init()
    },
    init () {
      this.$el && this.$f7.ptr.refresh(this.$el.querySelector('.ptr-content'))
      this.list({pageNum: 1, page: 1, pageSize: this.pageSize, size: this.pageSize, $anyway: this.defaultListCb.bind(this, [])})
    },
    list (option = {pageNum: 1, page: 1, pageSize: this.pageSize, size: this.pageSize}, cb = this.defaultListCb) {
      this.$.get(api.trrecord, Object.assign({
        state: this.s.id,
        bgTm: this.stet[0]._toString(),
        endTm: this.stet[1]._toString(),
      }, option)).then(({data: {recordList, totalSize}}) => {
        this.data = [...(option.page > this.fpage ? this.data : []), ...recordList]
        this.total = totalSize
        cb && cb(recordList)
      })
    },
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.rf_cr_3
  top var(--f7-toolbar-height)
  height calc(100% - var(--f7-toolbar-height))
  .infinite-scroll-preloader + .nomore
    display none
.navbar-hidden ~ .page
  .rf_cr_3 .page-content
    padding-top var(--f7-toolbar-height)

.rf_cr_3
  .flex:active
    opacity .6
  
</style>
