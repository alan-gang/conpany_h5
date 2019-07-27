<template lang="pug">

f7-page.rf_bc_1_(:page-content="false")

  .p_a.wp_100.p_t_0.z_9503.ft_14
    .bgc_f7.t_c.hlh_44(v-show=" rns_ ")
      //- .o_h(:class=" !rns_ ? 'mh_0' : 'mh_100' " style="transition: max-height .5s linear")
      f7-button.inlb(v-for=" (x, i) in stbs " :key="i" @click=" stbi = i " :color=" i === stbi ? 'deeporange' : 'gray' ") {{ x.n }}

    f7-searchbar(ref="s" disable-button-text="取消" placeholder="输入下级用户名 或 注单编号" :clear-button="true" @searchbar:disable=" rns_ = false " @change=" (rns_ = false) || (n = $event.target.value) " :value=" (!rns_ && n ? stbs[stbi].n + '：' : '') + n " @input=" (rns_ = true) && (n_ = $event.target.value) " @focus=" rns_ = true ")

    template(v-if=" rns_ && !stbi ")
      .searchbar-backdrop.h_0(@click=" rns_ = false ")
      f7-list.mh_0.mg_0.o_h.page_content_like.z_500(simple-list )
        f7-list-item 
          f7-button.wp_100.t_c.bg-color-white.pd_0(@click=" rns[0] && __setLocal({rns: ''}) ") {{ rns[0] ? '清空搜索记录' : '无搜索记录' }}
        f7-list-item(v-for=" (x, i) in rns " :key="i" v-if=" x ")
          f7-button.wp_100.t_l.bg-color-white.pd_0(color="black" @click=" (n = x) && (rns_ = false) ") {{ x }}


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
      span {{ s.n }}
      f7-icon.rz_90(f7="play_fill" size="10px" :class=" { 'rz_-90 color-deeporange': sd === 3 } ") 

  filters(v-if=" sd " @sd=" sd = $event ")
    GP(v-if=" sd === 1 " @g=" g = $event " @done=" __setCall({fn: '__closeSD'}) ")
    DP(v-else-if=" sd === 2 " @st=" $set(stet, 0, $event || '') " @et=" $set(stet, 1, $event || '') "  @done=" __setCall({fn: '__closeSD'}) ")
    OSP(v-else=" sd === 3 " @s=" s = $event "  @done=" __setCall({fn: '__closeSD'}) ")

  .page-content.ptr-content.infinite-scroll-content(ptr-mousewheel="true" @ptr:refresh=" refresh " @infinite="loadMore" :infinite-distance="50")

    .ptr-preloader
      .preloader
      .ptr-arrow

    f7-card(v-for=" (v, i) in data " :key="i")
      f7-card-header
        span.ft_16
          f7-icon(f7="person" color="orange" size="24")
          span.pl_5 {{ v.userName }}
      f7-card-content
        .flex.pb_5
          span.ft_14.text-color-gray 订单编号：{{ v.projectId }}
          span.ft_14.text-color-gray {{ v.writeTime }}
        .flex
          .a.mwp_70
            .ft_15
              span {{ v.lotteryName }} - {{ v.methodName }}
              span.text-color-deeporange  ({{ v.codeType === '1' ? '复式' : '单式' }})
            .h_5
            .ft_15
              span.c_9 {{ v.issue.slice(-6) }}期 
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
import OSP from '@/components/filters/OSP'
import stet from '@/components/stet'
export default {
  mixins: [config, stet, page],
  components: {
    filters,
    GP,
    DP,
    OSP,
  },
  name: 'rf_bc_1_',
  props: ['g_'],
  data () {
    return {
      stbs: [
        {n: '用户名'},
        {n: '注单编号'},
      ],
      stbi: 0,
      rns_: false,
      n: '',
      n_: '',
      sd: false,
      g: this.g_ || {n: '全部游戏', id: ''},
      s: {n: '全部状态', id: ''},
      data: []
    }
  },
  computed: {
    // 最近搜索的名字
    rns () {
      return this.local.rns.split(',').filter(x => x.indexOf(this.n_) !== -1)
    }
  },
  watch: {
    sd (n) {
      if (!n) this.init()
    },
    n (n) {
      this.init()
      if (this.n) this.__setLocal({rns: this.n + ',' + this.local.rns.replace(this.n + ',', '')})
    },
  },
  created () {
    this.init()
  },
  methods: {
    __init_rf_bc_1_ () {
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
        scope: 1,
        userName: !this.stbi ? this.n : '',
        projectId: this.stbi ? this.n : '',
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
// .rf_bc_1
//   top var(--f7-toolbar-height)
//   height calc(100% - var(--f7-toolbar-height))
//   .infinite-scroll-preloader + .nomore
//     display none
// .navbar-hidden ~ .page
//   .rf_bc_1 .page-content
//     padding-top var(--f7-toolbar-height)

.rf_bc_1_
  top var(--f7-toolbar-height)
  height calc(100% - var(--f7-toolbar-height))
  .infinite-scroll-preloader + .nomore
    display none
  .s_d
    top var(--f7-toolbar-height)
  .toolbar 
    top var(--f7-toolbar-height)
  .searchbar-backdrop:not(.h_0)
    display none
  .searchbar-backdrop
    top 44px
    pointer-events auto
  .searchbar-enabled ~ .searchbar-backdrop
    height 100vh
    opacity 1
  .searchbar-enabled ~ .list
    // margin-top 44px
    max-height 50vh
    overflow-y auto
    
  & > .page-content
    padding-top calc(var(--f7-toolbar-height) + var(--f7-toolbar-height))
    
.navbar-hidden ~ .page
  .rf_bc_1_
    .toolbar.toolbar-top
      top calc(var(--f7-toolbar-height) + var(--f7-toolbar-height))
    & > .page-content
      padding-top calc(var(--f7-toolbar-height) + var(--f7-toolbar-height))
      
</style>
