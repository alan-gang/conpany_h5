<template lang="pug">

f7-page.rf_ds_2(:page-content="false")

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
      span 注册时间：{{ __stetn.join(' 至 ') }}

      f7-icon.rz_90(f7="play_fill" size="10px" :class=" { 'rz_-90 color-deeporange': sd === 2 } ")

    //- .v_line.hp_50.w_1.bg-color-gray.o_30

    f7-link(color="gray" @click=" sd === 3 ? __setCall({fn: '__closeSD'}) : sd = 3 ") 
      span 日工资：{{ s.n }}
      f7-icon.rz_90(f7="play_fill" size="10px" :class=" { 'rz_-90 color-deeporange': sd === 3 } ") 

  filters(v-if=" sd " @sd=" sd = $event ")
    DP(v-if=" sd === 2 " :t=" 'rf_ds_2' " @st=" $set(stet, 0, $event || '') " @et=" $set(stet, 1, $event || '') "  @done=" __setCall({fn: '__closeSD'}) ")
    DSSSP(v-else @s=" s = $event "  @done=" __setCall({fn: '__closeSD'}) ")

  .page-content.ptr-content.infinite-scroll-content(ptr-mousewheel="true" @ptr:refresh=" refresh " @infinite="loadMore" :infinite-distance="50")

    .ptr-preloader
      .preloader
      .ptr-arrow
    template(v-for=" (x, i) in data ")
      f7-card(:key="i")
        f7-card-header
          .a.ft_14
            f7-icon(f7="person" :color=" x.userId !== user.userId ? 'orange' : 'deeporange' ")
            span.pl_5(:class=" {'text-color-deeporange': x.userId === user.userId} ") {{ x.userId !== user.userId ? x.userName : '我' }}

          f7-button(color="deeporange" outline small @click=" __go('/rfs/ds/setds/', {props: { v: x, max }}) ") 设置日工资

        f7-card-header.ft_14

          .a.wp_25.inlb.v_t(v-for=" (y, j) in dns.slice(0, 3) " :class=" { 't_r': j % 3 === 2, 't_c': j % 3 === 1 } ")
            .n.c_9.pb_5 {{ y.n }}
            .v
              span(v-if="y.start") {{ y.start }}
              span(v-nwc=" y.nwc " v-state=" y.state ") {{ y.wrap ? y.wrap(x) : x[y.key] }}

        f7-card-content.pt_0.pb_0
          .a.wp_33.inlb.v_t.mt_10.mb_10(v-for=" (y, j) in dns.slice(3) " :class=" { 't_r': j % 3 === 2, 't_c': j % 3 === 1 } ")
            .n.c_9.pb_5 {{ y.n }}
            .v 
              span(v-if="y.start") {{ y.start }}
              span(v-nwc=" y.nwc " v-state=" y.state ") {{ y.wrap ? y.wrap(x) : x[y.key] }}


    .preloader.infinite-scroll-preloader(v-if="showPreloader")

    .t_c.text-color-gray.pd_15.nomore --没有更多了--


</template>

<script>
import config from '@/config'
import api from '@/api'
import page from '@/components/page'
import filters from '@/components/filters'
import stet from '@/components/stet'
import ZP from '@/components/filters/ZP'
import DP from '@/components/filters/DP'
import DSSSP from '@/components/filters/DSSSP'
export default {
  mixins: [config, stet, page],
  components: {
    filters,
    ZP,
    DP,
    DSSSP,
  },
  name: 'rf_ds_2',
  props: ['g_'],
  data () {
    return {
      rns_: true,
      sd: false,
      stet: ['', ''],
      s: {id: 1, n: '已设置'},
      n: '',
      n_: '',
      data: [],
      dns: [
        {n: '注册时间', key: 'registertime', wrap: (x) => x.registertime.split(' ')[0]},
        {n: '团队人数', key: 'teamCount'},
        { n: '日工资', state: true, wrap: (x) => this.config.dsSetState[x.salary ? 1 : 0] },
        {n: '团队销量', start: '≥', key: 'teamSales'},
        {n: '有效人数', start: '≥', key: 'activityCount'},
        {n: '工资级别', key: 'salary'},
      ],
      max: 0,
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
    __init_rf_ds_2 () {
      this.init()
    },
    init () {
      this.list()
    },
    __orderlist () {
      this.list()
    },
    list (option = {pageNum: 1, page: 1, pageSize: this.pageSize, size: this.pageSize}, cb = this.defaultListCb) {
      this.$.get(api.mySubSalaryList, Object.assign({
        startDate: this.stet[0]._toDayString(''),
        endDate: this.stet[1]._toDayString(''),
        userName: this.n,
        salaryType: this.s.id,
      }, option)).then(({data: {my, salaryList, totalSize, max}}) => {
        this.data = [...(option.page > this.fpage ? this.data : my), ...salaryList]
        this.total = totalSize
        cb && cb(salaryList)
        this.max = Number(max)
      })
    },
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.rf_ds_2
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
  .rf_ds_2
    .toolbar.toolbar-top
      top calc(var(--f7-toolbar-height) + var(--f7-toolbar-height))
    & > .page-content
      padding-top calc(var(--f7-toolbar-height) + var(--f7-toolbar-height))
  
</style>
