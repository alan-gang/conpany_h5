<template lang="pug">

f7-page.rf_yj_3(:page-content="false")

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
  
    f7-link(color="gray" @click=" sd === 2 ? __setCall({fn: '__closeSD'}) : sd = 2 ") 
      span 注册时间：{{ __stetn.join(' 至 ') }}


      f7-icon.rz_90(f7="play_fill" size="10px" :class=" { 'rz_-90 color-deeporange': sd === 2 } ")

    //- .v_line.hp_50.w_1.bg-color-gray.o_30

    f7-link(color="gray" @click=" sd === 3 ? __setCall({fn: '__closeSD'}) : sd = 3 ") 
      span 签约状态：{{ s.n }}
      f7-icon.rz_90(f7="play_fill" size="10px" :class=" { 'rz_-90 color-deeporange': sd === 3 } ") 

  filters(v-if=" sd " @sd=" sd = $event ")
    DP(v-if=" sd === 2 " :t=" 'rf_yj_3' " @st=" $set(stet, 0, $event || '') " @et=" $set(stet, 1, $event || '') " @done=" __setCall({fn: '__closeSD'}) ")
    QSP(v-else=" sd === 3 " @s=" s = $event "  @done=" __setCall({fn: '__closeSD'}) ")

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

          .b
            template(v-if=" x.userId === user.userId ")
              template(v-if=" x.stat === '待确认' ")
                f7-button.inlb.mr_5(color="deeporange" outline small @click="checkContract(x.id, 0)") 拒绝签约
                f7-button.inlb(color="deeporange" outline small @click="checkContract(x.id, 1)") 同意签约

            template(v-else)
              template(v-if=" x.stat === '未签订' ")
                f7-button.inlb(color="deeporange" outline small @click=" __go('/rfs/yj/newc/', {props: { v: x }}) ") 发起签约
              template(v-else)
                f7-button.inlb(color="deeporange" outline small @click=" __go('/rfs/yj/newc/', {props: { v: x }}) ") 重新发起签约



        f7-card-header.ft_14

          .a.wp_33.inlb.v_t
            .n.c_9.pb_5 注册时间
            .v {{ x.registertime.split(' ')[0] }}

          .a.wp_33.inlb.v_t.t_c
            .n.c_9.pb_5 团队人数
            .v {{ x.subCount }}

          .a.wp_33.inlb.v_t.t_r
            .n.c_9.pb_5 签约状态
            .v(:class=" config.stateClass[x.stat] ") {{ x.stat }}


        f7-card-content.pt_0.pb_0(v-if="x.o")
          .a.wp_33.mt_10.mb_10.inlb.v_t
            .n.c_9.pb_5 签约日期
            .v {{ x.tm.split(' ')[0] }}
          .a.wp_33.mt_10.mb_10.inlb.v_t.t_c
            .n.c_9.pb_5 佣金周期
            .v {{ ['', '月', '半月', '周'][x.sendCycle] }}
          .a.wp_33.mt_10.mb_10.inlb.v_t.t_r
            .n.c_9.pb_5 发放方式
            .v {{ x.sendType * 1 === 1 ? '自动' : '手动' }}发放

        f7-card-footer.c_3.ft_12(v-if=" x.o ")
          .c_9 佣金规则
            .c_3(v-for=" (y, j) in x.bonusRules ")
              .mt_10 {{ `规则${j + 1}：累计${config.fhType[y.ruletype]}${y.sales}万，有效人数≥${y.actUser}，佣金比例 ${y.bounsRate}%` }}


        
        f7-card-footer.c_3(v-if=" x.o ")
          span.c_9 开始时间：
            span.c_3 {{ x.beginTm }}
          span.c_9 结束时间：
            span.c_3 {{ x.expireTm }}

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
import stet from '@/components/stet'
import filters from '@/components/filters'
import DP from '@/components/filters/DP'
import QSP from '@/components/filters/QSP'
export default {
  mixins: [config, stet, page],
  components: {
    filters,
    DP,
    QSP,
  },
  name: 'rf_yj_3',
  props: ['g_'],
  data () {
    return {
      rns_: true,
      sd: false,
      stet_: ['', ''],
      stet: ['', ''],
      s: {n: '全部状态', id: ''},
      n: '',
      n_: '',
      data: [],
      v: null,
      ruleCfg: null,
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
    __init_rf_yj_3 () {
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
      this.$.get(api.mySubContractMobile, Object.assign({
        startDate: this.stet[0]._toDayString(''),
        endDate: this.stet[1]._toDayString(''),
        userName: this.n,
        status: this.s.id,
        cType: 1,
      }, option)).then(({data: {my, mySubContract, ruleCfg, totalSize}}) => {
        // my[0].isDone = 2
        my.forEach(x => (x.o = false))
        mySubContract.forEach(x => (x.o = false))
        this.data = [...(option.page > this.fpage ? this.data : my), ...mySubContract]
        this.total = totalSize
        cb && cb(mySubContract)
        this.ruleCfg = ruleCfg
      })
    },
    checkContract (id, s) {
      this.$.get(api.checkContract, {
        contractId: id,
        status: s,
      })
    },
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.rf_yj_3
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
  .rf_yj_3 
    .toolbar.toolbar-top
      top calc(var(--f7-toolbar-height) + var(--f7-toolbar-height))
    & > .page-content
      padding-top calc(var(--f7-toolbar-height) + var(--f7-toolbar-height))
  
</style>
