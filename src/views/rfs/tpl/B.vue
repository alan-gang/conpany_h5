<template lang="pug">

f7-page.rf_tpl_2(:page-content="false")

  .p_a.wp_100.p_t_0.z_9503.ft_14
    f7-searchbar(:ft_12=" !rns_ && tns.length > 20 " ref="s" disable-button-text="取消" placeholder="请输入团队名" :clear-button="true" @searchbar:disable=" rns_ = false " @change=" (rns_ = false) || (n = $event.target.value) " :value=" !rns_ ? tns : n " @input=" (rns_ = true) && (n_ = $event.target.value)" @focus=" rns_ = true ")
    template(v-if="rns_")
      .searchbar-backdrop.h_0(@click=" rns_ = false ")
      f7-list.mh_0.mg_0.o_h.page_content_like.z_500(simple-list )
        f7-list-item 
          f7-button.wp_100.t_c.bg-color-white.pd_0(@click=" rns[0] && __setLocal({rns: ''}) ") {{ rns[0] ? '清空搜索记录' : '无搜索记录' }}
        f7-list-item(v-for=" (x, i) in rns " :key="i" v-if=" x ")
          f7-button.wp_100.t_l.bg-color-white.pd_0(color="black" @click=" (n = x) && (rns_ = false) ") {{ x }}

  f7-toolbar.z_9502.ft_14(top)

    f7-link(color="gray" @click=" sd === 1 ? __setCall({fn: '__closeSD'}) : sd = 1 ") 
      span {{ z.n }}
      f7-icon.rz_90(f7="play_fill" size="10px" :class=" { 'rz_-90 color-deeporange': sd === 1 } ") 
  
    f7-link(color="gray" @click=" sd === 2 ? __setCall({fn: '__closeSD'}) : sd = 2 ") 
      span {{ __stetn.join(' 至 ') }}

      f7-icon.rz_90(f7="play_fill" size="10px" :class=" { 'rz_-90 color-deeporange': sd === 2 } ")


    f7-link(color="gray" @click=" sd === 3 ? __setCall({fn: '__closeSD'}) : sd = 3 ") 
      span {{ s.n }}
      f7-icon.rz_90(f7="play_fill" size="10px" :class=" { 'rz_-90 color-deeporange': sd === 3 } ") 

  filters(v-if=" sd " @sd=" sd = $event ")
    TZP(v-if=" sd === 1 " @s=" z = $event " @done=" __setCall({fn: '__closeSD'}) ")
    DP(v-else-if=" sd === 2 " :t=" 'rf_tpl_1' " :stets="stets" @st=" $set(stet, 0, $event || '') " @et=" $set(stet, 1, $event || '') "  @done=" __setCall({fn: '__closeSD'}) ")
    SSP(v-else @s=" s = $event " @done=" __setCall({fn: '__closeSD'}) ")

  .page-content.ptr-content.infinite-scroll-content(ptr-mousewheel="true" @ptr:refresh=" refresh " @infinite="loadMore" :infinite-distance="50")

    .ptr-preloader
      .preloader
      .ptr-arrow
    
    f7-card(v-for=" (v, i) in data " :key=" Math.random() + i " :class=" !i ? 'bg-color-deeporange text-color-white' : '' ")
      f7-card-header(v-if="!i")
        .t_c.wp_100 团队合计

      f7-card-header(v-else="i")
        .a.ft_14
          f7-icon(:f7=" v.hasSub ? 'persons' : 'person' " :color=" v.userId === user.userId ? 'deeporange' : 'orange' ")
          span.pl_5(:class=" v.userId === user.userId ? 'text-color-deeporange' : '' ") {{ v.userId === user.userId ? '我' : v.userName }}

        f7-button(color="deeporange" outline small @click=" n = v.userName " v-if=" v.hasSub " ) 他的团队

      f7-card-content
        .flex(@click=" (i === 1 ? __go('/rfs/pl/pld/pldl/', {props: { v: Object.assign({}, g, {id: -2}), u: v, stet_: stet, bl}}) : __go('/rfs/pl/pld/pldl/', {props: { v: Object.assign({}, g, {title: '团队'}), u: Object.assign({}, v, {userName: !i ? data[1].userName : v.userName}), stet_: stet, bl}}) )")
          .a.t_c
            .pb_5 投注
            div {{ v.realBuy }}
          .a.t_c
            .pb_5 游戏盈亏
            div(v-nwc="i") {{ v.profit }}
          .a.t_c
            .pb_5 {{ __stetgap ? '总结算' : '总盈亏' }}
            div(v-nwc="i") {{ __stetgap ? v.settle : v.totalProfit }}
            
          .a
            f7-icon(f7="chevron_right" size="12px")

           

    .preloader.infinite-scroll-preloader(v-if="showPreloader")

    .t_c.text-color-gray.pd_15.nomore --没有更多了--


</template>

<script>
import config from '@/config'
import api from '@/api'
import page from '@/components/page'
import filters from '@/components/filters'
import stet from '@/components/stet'
import TZP from '@/components/filters/TZP'
import DP from '@/components/filters/DP'
import SSP from '@/components/filters/SSP'
export default {
  mixins: [config, stet, page],
  components: {
    filters,
    TZP,
    DP,
    SSP,
  },
  name: 'rf_tpl_2',
  props: ['g_'],
  data () {
    return {
      rns_: false,
      sd: false,
      // stet: [new Date()._bf(-1)._setHMS(), new Date()._bf(-1)._setHMS('23:59:59')],
      s: {n: '投注从高到低', id: 'buy'},
      z: {n: '仅投注用户', id: 0},
      n: '',
      n_: '',
      data: [],
      userBreads: [{}],
      bonusReleaseCycle: 1,
      g: {id: 999, n: '三方', key: 'ltrsettle'},
      bl: '/rfs/tpl/'
    }
  },
  computed: {
    // 最近搜索的名字
    rns () {
      return this.local.rns.split(',').filter(x => x.indexOf(this.n_) !== -1)
    },
    tns () {
      return this.userBreads.map(x => (!x.userName || x.userId === this.user.userId ? '我' : x.userName) + '的团队').join('>')
    },
    stets () {
      return [this.getfhd(this.bonusReleaseCycle), this.getfhd(this.bonusReleaseCycle, -1), this.getfhd(this.bonusReleaseCycle, -2)]
    },
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
    __init_rf_tpl_2 () {
      this.init()
    },
    init () {
      this.$el && this.$f7.ptr.refresh(this.$el.querySelector('.ptr-content'))
      this.list()
    },
    list (option = {pageNum: 1, page: 1, pageSize: this.pageSize, size: this.pageSize}, cb = this.defaultListCb) {
      this.$.get(api.toplreport, Object.assign(option, {
        beginDate: this.stet[0]._toDayString(),
        endDate: this.stet[1]._toDayString(),
        listAll: this.z.id,
        // 可选范围：”activityAmount”,”betAmount”,”pointAmount”,”prizeAmount”,”salaryAmount”,”settleAmount”,”userName”,”vrBetAmount”,”vrPointAmount”,”vrPrizeAmount”
        orderBy: ({buy: 'realbuy', gameProfit: 'profit', totalProfit: 'settle'})[this.s.id],
        userId: this.user.userId,
        username: this.n,
        gameType: 0,
      })).then(({data: {items, totalSize, userBreads, bonusReleaseCycle}}) => {
        if (items[0]) {
          items = [...(items.splice(-1, 1)), ...items]
        }
        if (option.page > this.fpage) items.splice(0, 1)
        this.data = [...(option.page > this.fpage ? this.data : []), ...items]
        this.total = totalSize
        this.userBreads = userBreads
        cb && cb(items)
      })
    },
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.rf_tpl_2
  .searchbar[ft_12="true"] input
    font-size 12px

.rf_tpl_2
  top var(--f7-toolbar-height)
  height calc(100% - var(--f7-toolbar-height))
  .infinite-scroll-preloader + .nomore
    display none
  .s_d
    top var(--f7-toolbar-height)
  .toolbar 
    top var(--f7-toolbar-height)
  .searchbar-backdrop
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
  .rf_tpl_2
    .toolbar.toolbar-top
      top calc(var(--f7-toolbar-height) + var(--f7-toolbar-height))
    & > .page-content
      padding-top calc(var(--f7-toolbar-height) + var(--f7-toolbar-height))
  
</style>
