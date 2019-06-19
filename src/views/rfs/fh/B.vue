<template lang="pug">

f7-page.rf_fh_2(infinite :infinite-distance="50" :infinite-preloader="showPreloader" @infinite="loadMore" ptr :ptr-mousewheel="true" @ptr:refresh="refresh")
  .pd_10.flex.bgc_light_orange(v-if="a")
    f7-icon.pl_10(f7="info_round_fill" size="18" color="red")
    .lh_25.pl_10.pr_10.text-color-deeporange.ft_12 温馨提示：预期分红是基于阶段性数据测算得出，仅为预测下一次分红提供参考，不作为发放分红的依据。
    f7-icon(f7="close" size="18" @click.native=" a = false ")

  .t_c.c_f.ft_13.bg-color-deeporange.pd_10
    span.o_50 距下一个 分红结算日（{{ data[0] ? data[0].issue : '--' }}）还有 
    br
    span.ft_25 {{ d }}
    span.o_50.pl_2 天

  template(v-for=" (x, i) in data ")
    f7-card(:key="i")
      f7-card-header
        .a.ft_14
          f7-icon(f7="person" :color=" i ? 'orange' : 'deeporange' ")
          span.pl_5(:class=" {'text-color-deeporange': !i} ") {{ i ? x.userName : '我' }}

      f7-card-header.ft_14

        .a
          .n.c_9.pb_5 分红测算起止日期
          .v {{ x.startDate }} 至 {{ x.issue }}

        .a.t_r
          .n.c_9.pb_5 分红金额
          .v {{ x.bonus }}

      f7-card-content.pt_0.pb_0(v-if="x.o")
        .a.wp_33.inlb.v_t.mt_10.mb_10(v-for=" (y, j) in dns " :class=" { 't_r': j % 3 === 2, 't_c': j % 3 === 1 } ")
          .n.c_9.pb_5 {{ y.n }}
          .v 
            span(v-nwc="!!y.nwc" v-if=" y.key " :class=" y.wrap && config.stateClass[y.wrap(x[y.key])] ") 
              template(v-if=" y.wrap ") {{ y.wrap(x[y.key]) || '--' }}
              template(v-else) {{ x[y.key] || '--' }}

              template(v-if=" y.end ") {{ y.end }}

            span(v-else-if=" y.fn ") {{ y.fn(x) || '--' }}

            f7-button.t_l.pd_0.hlh_20.bg-color-white(v-else-if=" y.click " :class=" {'text-color-orange': y.click} " @click=" y.click(x) ") {{ y.v || '--' }}

      f7-card-footer.c_3.pd_0
        f7-button.wp_100.bg-color-white(@click=" x.o = !x.o " color="gray") 
          span {{ x.o ? '收起' : '展开' }}
          f7-icon(:class=" { 'rz_-90': !x.o, 'rz_90': x.o } " f7="chevron_left_round_fill" size="14")
         
    .bgc_light_orange.mg_10.r_5.c_orange.hlh_30.ft_13.pl_15.pr_15.t_c(v-if="!i")
      f7-icon.inlb.v_m(f7="bars_chart_round_fill" color="red" size="18")
      span.pl_2.v_m 下级预期总分红： {{ v.sent }}元
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
  name: 'rf_fh_2',
  props: ['g_'],
  data () {
    return {
      a: true,
      data: [],
      v: null,
      dns: [
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
    d () {
      return this.data[0] ? parseInt((new Date(this.data[0].issue) - new Date(window.lstt)._setHMS('0:0:0')) / (24 * 3600 * 1000)) : '--'
    }
  },
  watch: {
  },
  created () {
    this.init()
  },
  methods: {
    __init_rf_fh_2 () {
      this.init()
    },
    init () {
      this.list()
    },
    __orderlist () {
      this.list()
    },
    list (option = {pageNum: 1, page: 1, pageSize: this.pageSize, size: this.pageSize}, cb = this.defaultListCb) {
      this.$.get(api.mySubExpectedBounsMobile, Object.assign({
        startDate: '',
        endDate: '',
        groupId: 0,
      }, option)).then(({data: {my, myBonus, bonus, totalSize}}) => {
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
        content: v.bounsruleListBy.reduce((p, x, i) => {
          p += `<p class="t_l ft_13">规则${i + 1}：累计${this.config.fhType[x.ruletype]}${x.sales}万，有效人数≥${x.actuser}，分红比例 ${x.bounsrate}%</p>`
          return p
        }, ''),
        title: '分红规则',
        buttons: [
          {text: '知道了', close: true}
        ]
      }).open()
    },
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
// .rf_fh_2
    
.navbar-hidden ~ .page
  .rf_fh_2 .page-content
    padding-top var(--f7-toolbar-height)
  
</style>
