<template lang="pug">

f7-page.rf_cr_1(:page-content="false")

  f7-toolbar.z_9502.ft_14(top)

    
    f7-link.wp_45.t_c(color="gray" @click=" sd === 2 ? __setCall({fn: '__closeSD'}) : sd = 2 ") 
      span {{ __stetn.join(' 至 ') }}

      f7-icon.rz_90(f7="play_fill" size="10px" :class=" { 'rz_-90 color-deeporange': sd === 2 } ")

    .v_line.hp_50.w_1.bg-color-gray.o_30

    f7-link.wp_45.t_c(color="gray" @click=" sd === 3 ? __setCall({fn: '__closeSD'}) : sd = 3 ") 
      span {{ s.n }}
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
        span.ft_14.text-color-gray {{ v.issue }}期
        span.ft_14.text-color-gray {{ v.writeTime }}
      f7-card-content
        .flex
          .a
            .hlh_20
              span {{ v.lotteryName }} - {{ v.methodName }}
              span.text-color-deeporange  ({{ v.codeType === '1' ? '复式' : '单式' }})
            .hlh_20
              span.c_9 投注：
              span {{ v.totalPrice }}元
          .b
            f7-button.inlb(small round fill :color=" config.stateColor[v.stat] " :href=" '/rfs/bc/bd/' + v.projectId + '/'") {{ config.orderState[v.stat] }}
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
import GP from '@/components/filters/GP'
import DP from '@/components/filters/DP'
import ASP from '@/components/filters/ASP'
import stet from '@/components/stet'
export default {
  mixins: [config, stet, page],
  components: {
    filters,
    GP,
    DP,
    ASP,
  },
  name: 'rf_cr_1',
  props: ['g_'],
  data () {
    return {
      sd: false,
      g: this.g_ || {n: '全部游戏', id: ''},
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
      this.$.get(api.orderList, Object.assign({
        lotteryId: this.g.id,
        stat: this.s.id,
        beginDate: this.stet[0]._toAllString(),
        endDate: this.stet[1]._toAllString(),
        scope: 0,
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
.rf_cr_1
  top var(--f7-toolbar-height)
  height calc(100% - var(--f7-toolbar-height))
  .infinite-scroll-preloader + .nomore
    display none
.navbar-hidden ~ .page
  .rf_cr_1 .page-content
    padding-top var(--f7-toolbar-height)
  
</style>
