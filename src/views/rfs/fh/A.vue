<template lang="pug">

f7-page.rf_fh_1(:page-content="false")

  .p_a.wp_100.p_t_0.z_9503.ft_14
    f7-searchbar(ref="s" disable-button-text="取消" placeholder="请输入直接下级的用户名" :clear-button="true" @change=" n = $event.target.value " :value=" n " @input=" n_ = $event.target.value" @focus=" rns_ = true ")
    template(v-if="rns_")
      .searchbar-backdrop.h_0(@click=" rns_ = false ")
      f7-list.mh_0.mg_0.o_h.page_content_like.z_500(simple-list )
        f7-list-item 
          f7-button.wp_100.t_c.bg-color-white.pd_0(@click=" rns[0] && __setLocal({rns: ''}) ") {{ rns[0] ? '清空搜索记录' : '无搜索记录' }}
        f7-list-item(v-for=" (x, i) in rns " :key="i" v-if=" x ")
          f7-button.wp_100.t_l.bg-color-white.pd_0(color="black" @click=" (n = x) && (rns_ = false) ") {{ x }}

  f7-toolbar.z_9502.ft_14(top)
  
    f7-link(color="gray" @click=" sd === 2 ? __setCall({fn: '__closeSD'}) : sd = 2 ") 
      span 结算日：{{ stet }}

      f7-icon.rz_90(f7="play_fill" size="10px" :class=" { 'rz_-90 color-deeporange': sd === 2 } ")

    //- .v_line.hp_50.w_1.bg-color-gray.o_30

    f7-link(color="gray" @click=" sd === 3 ? __setCall({fn: '__closeSD'}) : sd = 3 ") 
      span {{ s.n }}
      f7-icon.rz_90(f7="play_fill" size="10px" :class=" { 'rz_-90 color-deeporange': sd === 3 } ") 

  filters(v-if=" sd " @sd=" sd = $event ")
    FDP(v-if=" sd === 2 " @stet=" stet = $event " @done=" __setCall({fn: '__closeSD'}) ")
    FSP(v-else=" sd === 3 " @s=" s = $event "  @done=" __setCall({fn: '__closeSD'}) ")

  .page-content.ptr-content.infinite-scroll-content(ptr-mousewheel="true" @ptr:refresh=" refresh " @infinite="loadMore" :infinite-distance="50")

    .ptr-preloader
      .preloader
      .ptr-arrow
    template(v-for=" (x, i) in data ")
      f7-card(:key="i")
        f7-card-header
          .a.ft_14
            f7-icon(f7="person" :color=" i ? 'orange' : 'deeporange' ")
            span.pl_5(:class=" {'text-color-deeporange': !i} ") {{ i ? x.userName : '我' }}

          f7-button(v-if=" !i && x.isDone === 2 " color="deeporange" outline small @click=" subCheckBonus(x.id) ") 平台外已接收
          f7-button(v-if=" i && !x.isDone  " color="deeporange" outline small @click=" paraentCheckBonus(x.id, x.sendType) ") {{ x.sendType * 1 === 1 ? '平台外已发放' : '立即发放' }}

        f7-card-header.ft_14

          .a.wp_25.inlb.v_t(v-for=" (y, j) in dns.slice(0, 4) " :class=" { 't_r': j % 4 === 3, 't_c': j % 4 === 1 || j % 4 === 2 } ")
            .n.c_9.pb_5 {{ y.n }}
            .v 
              span(v-nwc="!!y.nwc" v-if=" y.key " :class=" y.wrap && config.stateClass[y.wrap(x[y.key])] ") 
                template(v-if=" y.wrap ") {{ y.wrap(x[y.key]) || '--' }}
                template(v-else) {{ x[y.key] || '--' }}

                template(v-if=" y.end ") {{ y.end }}

              span(v-else-if=" y.fn ") {{ y.fn(x) || '--' }}

        f7-card-content.pt_0.pb_0(v-if="x.o")
          .a.wp_33.inlb.v_t.mt_10.mb_10(v-for=" (y, j) in dns.slice(4) " :class=" { 't_r': j % 3 === 2, 't_c': j % 3 === 1 } ")
            .n.c_9.pb_5 {{ y.n }}
            .v 
              span(v-nwc="!!y.nwc" v-if=" y.key " :class=" y.wrap && config.stateClass[y.wrap(x[y.key])] ") 
                template(v-if=" y.wrap ") {{ y.wrap(x[y.key]) || '--' }}
                template(v-else) {{ x[y.key] || '--' }}

                template(v-if=" y.end ") {{ y.end }}

              span(v-else-if=" y.fn ") {{ y.fn(x) || '--' }}

              f7-button.t_l.pd_0.hlh_20.bg-color-white(v-else-if=" y.click " :class=" {'text-color-orange': y.click} " @click=" y.click(x) ") {{ y.v || '--' }}


        f7-card-footer.c_3(v-if=" x.o ")
          span 发放时间：{{ x.sendTime || '--' }}
          span 发放方式：{{ x.sendType * 1 === 1 ? '自动' : '手动' }}发放

        f7-card-footer.c_3.pd_0
          f7-button.wp_100.bg-color-white(@click=" x.o = !x.o " color="gray") 
            span {{ x.o ? '收起' : '展开' }}
            f7-icon(:class=" { 'rz_-90': !x.o, 'rz_90': x.o } " f7="chevron_left_round_fill" size="14")
           
      .bgc_light_orange.mg_10.r_5.c_orange.hlh_30.ft_13.pl_15.pr_15(v-if="!i")
        f7-icon.inlb.v_m(f7="bars_chart_round_fill" color="red" size="18")
        span.pl_2.v_m 下级总分红： {{ v.sent }}元，未发放分红：{{ v.hair }}元


    .preloader.infinite-scroll-preloader(v-if="showPreloader")

    .t_c.text-color-gray.pd_15.nomore --没有更多了--


</template>

<script>
import config from '@/config'
import api from '@/api'
import page from '@/components/page'
import filters from '@/components/filters'
import GP from '@/components/filters/GP'
import FDP from '@/components/filters/FDP'
import FSP from '@/components/filters/FSP'
export default {
  mixins: [config, page],
  components: {
    filters,
    GP,
    FDP,
    FSP,
  },
  name: 'rf_fh_1',
  props: ['g_'],
  data () {
    return {
      rns_: true,
      sd: false,
      stet: window.Date.fhd[0],
      s: {n: '全部状态', id: ''},
      n: '',
      n_: '',
      data: [],
      v: null,
      dns: [
        {n: '结算日', key: 'issue'},
        {n: '分红周期', fn: Date.fhcyc},
        {n: '分红金额', key: 'bonus', nwc: true},
        { n: '状态', key: 'isDone', wrap: (k) => this.config.fhState[k] },
        {n: '彩票总销量', key: 'saleAmount', nwc: true},
        {n: '彩票总盈亏', key: 'profitAmount', nwc: true},
        {n: '有效人数', key: 'actUser'},
        { n: '对应分红规则', v: '规则1>', click: (v) => this.showRule(v) },
        {n: '分红比例', key: 'bonusRate', end: '%'},
        {n: '分红金额', key: 'bonus', nwc: true},
      ],
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
    __init_rf_fh_1 () {
      this.init()
    },
    init () {
      this.list()
    },
    __orderlist () {
      this.list()
    },
    list (option = {pageNum: 1, page: 1, pageSize: this.pageSize, size: this.pageSize}, cb = this.defaultListCb) {
      this.$.get(api.myBonusMobile, Object.assign({
        startDate: this.stet,
        endDate: this.stet,
        userName: this.n,
        status: this.s.id,
        groupId: 0,
      }, option)).then(({data: {my, myBonus, bonus, totalSize}}) => {
        // my[0].isDone = 2
        my.forEach(x => (x.o = false))
        myBonus.forEach(x => (x.o = false))
        this.data = [...(option.page > this.fpage ? this.data : my), ...myBonus]
        this.total = totalSize
        cb && cb(myBonus)
        this.v = bonus
      })
    },
    showRule (v) {
      this.$f7.dialog.create({
        cssClass: 'full_width',
        content: v.bounsruleList.reduce((p, x, i) => {
          p += `<p class="t_l ft_13">规则${i + 1}：累计${this.config.fhType[x.ruletype]}${x.sales}万，有效人数≥${x.actuser}，分红比例 ${x.bounsrate}%</p>`
          return p
        }, ''),
        title: '分红规则',
        buttons: [
          {text: '知道了', close: true}
        ]
      }).open()
    },
    subCheckBonus (id) {
      this.$.get(api.subCheckBonus, {bonusId: id})
    },
    paraentCheckBonus (id, type) {
      this.$.get(api.paraentCheckBonus, {
        bonusId: id,
        chanelType: type,
      })
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.rf_fh_1
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
  .rf_fh_1
    .toolbar.toolbar-top
      top calc(var(--f7-toolbar-height) + var(--f7-toolbar-height))
    & > .page-content
      padding-top calc(var(--f7-toolbar-height) + var(--f7-toolbar-height))
  
</style>
