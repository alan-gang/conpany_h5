<template lang="pug">
f7-page.profit_loss_report_(:page-content="false")
  f7-navbar(back-link)
    f7-nav-title(@click.native=" sm = !sm ")
      .ft_12 下级个人盈亏
      .ft_16 {{ ts[tsi].n }}盈亏
        f7-icon(:class=" {rz_90: !sm, 'rz_-90': sm} " f7="play_fill" size="12px" style="width: 18px")

  filters.z_9504(v-if=" sm " @sd=" sm = $event " style="top: 0")
    f7-list.mt_-44.mb_0(simple-list)
      f7-list-item(v-for=" (x, i) in ts " :key="i")
        f7-button.wp_100.bg-color-white.pd_0(color="black" @click=" (sm = false) || (tsi = i) ") {{ x.n }}盈亏

  .p_a.wp_100.p_t_0.z_9503.ft_14
    f7-searchbar(ref="s" disable-button-text="取消" placeholder="请输入直接下级的用户名" :clear-button="true" @change=" n = $event.target.value " :value=" n " @input=" n_ = $event.target.value" @focus=" rns_ = true " @searchbar:disable=" rns_ = false ")
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
    SZP(v-if=" sd === 1 " @s=" z = $event " @done=" __setCall({fn: '__closeSD'}) ")
    DP(v-else-if=" sd === 2 " :t=" 'rf_pl_' " @st=" $set(stet, 0, $event || '') " @et=" $set(stet, 1, $event || '') "  @done=" __setCall({fn: '__closeSD'}) ")
    SSP(v-else @s=" s = $event " @done=" __setCall({fn: '__closeSD'}) ")
  
  .page-content.ptr-content.infinite-scroll-content(ptr-mousewheel="true" @ptr:refresh=" refresh " @infinite="loadMore" :infinite-distance="50")

    .ptr-preloader
      .preloader
      .ptr-arrow

    f7-card(v-for=" (v, i) in data " :key="i" :class=" !i ? 'bg-color-deeporange text-color-white' : '' ")
      f7-card-header(v-if="!i")
        .t_c.wp_100 总计

      f7-card-header(v-else="i")
        .a.ft_14
          f7-icon(f7="person" color="orange")
          span.pl_5 {{ v.userName }}

        f7-button(color="deeporange" outline small @click=" subBread(v) ") 用户层级

      f7-card-content
        .flex(@click=" i && (tsi ? __go('/rfs/pl/pld/', {props: { v: ts[tsi], u: v, stet_: stet, bl}}) : __go('/rfs/pl/pld/pldl/', {props: { v: ts[tsi], u: v, stet_: stet, bl}}) )")
          .a.t_c
            .pb_5 投注
            div {{ v.buy }}
          .a.t_c
            .pb_5 游戏盈亏
            div(v-nwc="i") {{ v.gameProfit }}
          .a.t_c
            .pb_5 总盈亏
            div(v-nwc="i") {{ v.totalProfit }}
          .a(v-if="i")
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
import SZP from '@/components/filters/SZP'
import DP from '@/components/filters/DP'
import SSP from '@/components/filters/SSP'
export default {
  mixins: [config, stet, page],
  components: {
    filters,
    SZP,
    DP,
    SSP,
  },
  name: 'profit_loss_report_',
  props: [],
  data () {
    return {
      rns_: true,
      n: '',
      n_: '',
      sd: false,
      stet: [new Date()._setHMS(), new Date()._setHMS('23:59:59')],
      s: {n: '投注从高到低', id: 'buy'},
      z: {n: '全部下级', id: 0},
      // 游戏类型：0:彩票盈亏；1:电竞；2:电游；3:真人；4:棋牌；5：捕鱼；6：体育；7：基诺彩；8：微游
      sm: false,
      ts: [
        {id: -1, n: '总'},
        {id: 0, n: '彩票'},
        {id: 8, n: '微游'},
        {id: 2, n: '老虎机'},
        {id: 6, n: '体育'},
        {id: 4, n: '棋牌'},
        {id: 3, n: '真人'},
        {id: 1, n: '电竞'},
        {id: 5, n: '捕鱼'},
        {id: 7, n: '基诺彩'},
      ],
      tsi: 0,
      data: [],
      bl: '/rfs/_pl/',
    }
  },
  computed: {
    // 最近搜索的名字
    rns () {
      return this.local.rns.split(',').filter(x => x.indexOf(this.n_) !== -1)
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
    tsi (n) {
      this.init()
    },
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.list()
    },
    list (option = {pageNum: 1, page: 1, pageSize: this.pageSize, size: this.pageSize}, cb = this.defaultListCb) {
      this.$.get(api.plreport_, Object.assign(option, {
        gameType: this.ts[this.tsi].id,
        beginDate: this.stet[0]._toDayString(),
        endDate: this.stet[1]._toDayString(),
        orderBy: this.s.id,
        scope: this.z.id,
        username: this.n,
      })).then(({data: {items, totalSize}}) => {
        if (items[0]) {
          items = [...(items.splice(-1, 1)), ...items]
        }
        this.data = [...(option.page > this.fpage ? this.data : []), ...items]
        this.total = totalSize
        cb && cb(items)
      })
    },
    subBread (v) {
      if (v.path) return this.$f7.dialog.alert(`<p class="t_l mg_0">${v.path}</p>`, '')
      this.$.get(api.subBread, {userId: v.userId}).then(({data: {userBreads}}) => {
        // 用户层级：我 > xxxx > xxxx > zhijiexiajia
        v.path = '用户层级：' + userBreads.map(x => x.userName).join(' > ')
        this.$f7.dialog.alert(`<p class="t_l mg_0">${v.path}</p>`, '')
      })
    },
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.profit_loss_report_
  .flex:active
    opacity .6

.profit_loss_report_
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
  .profit_loss_report_
    .toolbar.toolbar-top
      top calc(var(--f7-toolbar-height) + var(--f7-toolbar-height))
    & > .page-content
      padding-top calc(var(--f7-toolbar-height) + var(--f7-toolbar-height))
</style>
