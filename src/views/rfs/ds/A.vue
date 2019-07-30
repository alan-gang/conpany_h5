<template lang="pug">

f7-page.rf_ds_1(:page-content="false")

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
    ZP(v-if=" sd === 1 " @s=" z = $event " @done=" __setCall({fn: '__closeSD'}) ")
    DP(v-else-if=" sd === 2 " @st=" $set(stet, 0, $event || '') " @et=" $set(stet, 1, $event || '') "  @done=" __setCall({fn: '__closeSD'}) ")
    DSSP(v-else @s=" s = $event "  @done=" __setCall({fn: '__closeSD'}) ")

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

          f7-button(v-if=" x.userId === user.userId && !x.isDone && (new Date(window.lstt)._setHMS('0:0:0').getTime() - new Date(x.date).getTime()) < (3 * 24 * 3600 * 1000) " color="deeporange" outline small @click=" __go('/promo/', {props: { tabid: '#gift' }}) ") 立即领取

        f7-card-header.ft_14

          .a.wp_25.inlb.v_t(v-for=" (y, j) in dns.slice(0, 3) " :class=" { 't_r': j % 3 === 2, 't_c': j % 3 === 1 } ")
            .n.c_9.pb_5 
              template(v-if=" x.userId === user.userId && y.key === 'daySalary' ") 我的工资
              template(v-else) {{ y.n }}
            .v
              span(v-nwc=" y.nwc " v-state=" y.state ") {{ y.wrap ? y.wrap(x) : x[y.key] }}

        f7-card-content.pt_0.pb_0(v-if="x.o")
          .a.wp_33.inlb.v_t.mt_10.mb_10(v-for=" (y, j) in dns.slice(3) " :class=" { 't_r': j % 3 === 2, 't_c': j % 3 === 1 } ")
            .n.c_9.pb_5 {{ y.n }}
            .v 
              span(v-nwc=" y.nwc " v-state=" y.state ") {{ y.wrap ? y.wrap(x) : x[y.key] }}

        f7-card-footer.c_2(v-if=" x.o ")
          span 领取时间：{{ x.getTime || '--' }}

        f7-card-footer.c_3.pd_0
          f7-button.wp_100.bg-color-white(@click=" x.o = !x.o " color="gray") 
            span {{ x.o ? '收起' : '展开' }}
            f7-icon(:class=" { 'rz_-90': !x.o, 'rz_90': x.o } " f7="chevron_left_round_fill" size="14")
           

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
import DSSP from '@/components/filters/DSSP'
export default {
  mixins: [config, stet, page],
  components: {
    filters,
    ZP,
    DP,
    DSSP,
  },
  name: 'rf_ds_1',
  props: ['g_'],
  data () {
    return {
      rns_: true,
      sd: false,
      stet: [new Date()._bf(-1)._setHMS(), new Date()._bf(-1)._setHMS('23:59:59')],
      s: {n: '全部状态', id: undefined},
      z: {n: '我和下级', id: 2},
      n: '',
      n_: '',
      data: [],
      dns: [
        {n: '销售日期', key: 'date'},
        {n: '团队工资', key: 'daySalary'},
        { n: '状态', state: true, wrap: (x) => this.config.dsState[x.isDone] },
        {n: '团队销量', key: 'totBuyAmount'},
        {n: '有效人数', key: 'activitUser'},
        {n: '工资级别', key: 'salaryLevel'},
        { n: '团队工资', wrap: (x) => (Number(x.subSalary.replace(/,/g, '')) + Number(x.daySalary.replace(/,/g, '')))._f2()._nwc() },
        {n: '下级工资', key: 'subSalary'},
        {n: '个人工资', key: 'daySalary'},
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
    __init_rf_ds_1 () {
      this.init()
    },
    init () {
      this.$el && this.$f7.ptr.refresh(this.$el.querySelector('.ptr-content'))
      this.list()
    },
    __orderlist () {
      this.list()
    },
    list (option = {pageNum: 1, page: 1, pageSize: this.pageSize, size: this.pageSize}, cb = this.defaultListCb) {
      this.$.get(api.getSalaryById, Object.assign({
        startDate: this.stet[0]._toDayString(''),
        endDate: this.stet[1]._toDayString(''),
        // userId: '',
        userName: this.n,
        userState: this.z.id,
        isdone: this.s.id,
        // 1 为移动端 否则PC端
        port: '1',
      }, option)).then(({data: {data, totalSize}}) => {
        data.forEach(x => (x.o = false))
        this.data = [...(option.page > this.fpage ? this.data : []), ...data]
        this.total = totalSize
        cb && cb(data)
      })
    },
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.rf_ds_1
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
  .rf_ds_1
    .toolbar.toolbar-top
      top calc(var(--f7-toolbar-height) + var(--f7-toolbar-height))
    & > .page-content
      padding-top calc(var(--f7-toolbar-height) + var(--f7-toolbar-height))
  
</style>
