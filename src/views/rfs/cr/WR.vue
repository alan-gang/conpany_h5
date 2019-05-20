<template lang="pug">

f7-page.rf_cr_4(:page-content="false")

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
    WSP(v-else=" sd === 3 " @s=" s = $event "  @done=" __setCall({fn: '__closeSD'}) ")

  .page-content.ptr-content.infinite-scroll-content(ptr-mousewheel="true" @ptr:refresh=" refresh " @infinite="loadMore" :infinite-distance="50")

    .ptr-preloader
      .preloader
      .ptr-arrow

    f7-card(v-for=" (v, i) in data " :key="i")
      f7-card-content
        .flex.ft_13(@click=" __go('/rfs/cr/wrd/', {props: { v }}) ")
          .a
            .hlh_30.ft_15 {{ v.bankName }}(尾号 {{ v.cardNo.slice(-4) }})
            .lh_20.text-color-gray {{ v.acceptTime }}

          .b.t_r
            .v_m.inlb
              .lh_30(:class=" v.isverify === 5 ? 'c_g' : '' ") {{ v.amount._f3() }}
              .lh_20(:class=" config.stateClass[config.withdrawStateFilters[v.isverify].n] ") {{ config.withdrawStateFilters[v.isverify].n }}
            .inlb.w_5
            f7-icon(f7="chevron_right" size="12px")

    .preloader.infinite-scroll-preloader(v-if="showPreloader")

    .t_c.text-color-gray.pd_15.nomore --没有更多了--


</template>

<script>
import config from '@/config'
import api from '@/api'
import page from '@/components/page'
import filters from '@/components/filters'
import DP from '@/components/filters/DP'
import WSP from '@/components/filters/WSP'
import stet from '@/components/stet'
export default {
  mixins: [config, stet, page],
  components: {
    filters,
    DP,
    WSP,
  },
  name: 'rf_cr_4',
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
    __init_rf_cr_4 () {
      this.init()
    },
    init () {
      this.list({pageNum: 1, page: 1, pageSize: this.pageSize, size: this.pageSize, $anyway: this.defaultListCb.bind(this, [])})
    },
    list (option = {pageNum: 1, page: 1, pageSize: this.pageSize, size: this.pageSize}, cb = this.defaultListCb) {
      this.$.get(api.wrrecord, Object.assign({
        status: this.s.id,
        startDate: this.stet[0]._toAllString(),
        endDate: this.stet[1]._toAllString(),
      }, option)).then(({data: {withdrawData, totalSize}}) => {
        this.data = [...(option.page > this.fpage ? this.data : []), ...withdrawData]
        this.total = totalSize
        cb && cb(withdrawData)
      })
    },
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.rf_cr_4
  top var(--f7-toolbar-height)
  height calc(100% - var(--f7-toolbar-height))
  .infinite-scroll-preloader + .nomore
    display none
.navbar-hidden ~ .page
  .rf_cr_4 .page-content
    padding-top var(--f7-toolbar-height)

.rf_cr_4
  .flex:active
    opacity .6
  
</style>
