<template lang="pug">

f7-page.rf_cr_1(:page-content="false")

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
    ASP(v-else=" sd === 3 " @s=" s = $event "  @done=" __setCall({fn: '__closeSD'}) ")

  .page-content.ptr-content.infinite-scroll-content(ptr-mousewheel="true" @ptr:refresh=" refresh " @infinite="loadMore" :infinite-distance="50")

    .ptr-preloader
      .preloader
      .ptr-arrow

    f7-card(v-for=" (v, i) in data " :key="i")
      f7-card-header
        span.ft_13.text-color-gray {{ v.times }}
        span.ft_13 账变编号：{{ v.entry }}
      f7-card-content
        .flex.ft_13
          .a
            .hlh_30.ft_15 {{ v.orderType }} 
              span(:class=" v.inout._o0() ? 'c_s' : 'c_e' ") {{ v.inout._o0() ? '+' : '' }}{{ v.inout._f3() }}
            .lh_20 {{ v.lotteryName }} ({{ v.issue }}期)

          .b.t_r.wp_55
            .lh_20 主余额：{{ v.balance._f3() }}元
            .lh_20 特殊余额：{{ v.speBalance._f3() }}元

    .preloader.infinite-scroll-preloader(v-if="showPreloader")

    .t_c.text-color-gray.pb_15.nomore --没有更多了--


</template>

<script>
import config from '@/config'
import api from '@/api'
import page from '@/components/page'
import filters from '@/components/filters'
import DP from '@/components/filters/DP'
import ASP from '@/components/filters/ASP'
import stet from '@/components/stet'
export default {
  mixins: [config, stet, page],
  components: {
    filters,
    DP,
    ASP,
  },
  name: 'rf_cr_1',
  props: ['g_'],
  data () {
    return {
      sd: false,
      s: {n: '全部类型', id: ''},
      data: []
    }
  },
  watch: {
    sd (n) {
      if (!n) this.init()
    }
  },
  created () {
    this.init()
  },
  methods: {
    __init_rf_cr_1 () {
      this.init()
    },
    init () {
      this.list()
    },
    list (option = {pageNum: 1, page: 1, pageSize: this.pageSize, size: this.pageSize}, cb = this.defaultListCb) {
      this.$.get(api.acreport, Object.assign({
        orderId: this.s.id,
        beginDate: this.stet[0]._toAllString(),
        endDate: this.stet[1]._toAllString(),
      }, option)).then(({data: {orderRecordList, totalSize}}) => {
        this.data = [...(option.page > this.fpage ? this.data : []), ...orderRecordList]
        this.total = totalSize
        cb && cb(orderRecordList)
      })
    },
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.rf_cr_1
  top var(--f7-toolbar-height)
  height calc(100% - var(--f7-toolbar-height))
  .infinite-scroll-preloader + .nomore
    display none
.navbar-hidden ~ .page
  .rf_cr_1 .page-content
    padding-top var(--f7-toolbar-height)
  
</style>
