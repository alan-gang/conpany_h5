<template lang="pug">
f7-page.profit_loss_detail_list
  f7-navbar(:title=" v.n + ((!v.title || v.id !== 999) && v.id > -1 ? '每日' : '') + '盈亏明细' + (v.title || v.id !== -1 ? '(' + (v.title || '个人') + ')' : '') " back-link :back-link-url=" bl " :back-link-force="force")
  //- u.userId && !v.key ? '/rfs/_pl/' : u.userId && v.title ? '/rfs/tpl/' : '' 

  .bgc_f.smooth_scroll
    f7-list.mg_0(v-if=" v.id === -1 ")
      f7-list-item(title="用户" :after=" n ")
      f7-list-item(title="统计时间" :after=" __stetn[0] ")

    f7-list.mg_0(v-else-if=" v.title ")
      f7-list-item(title="团队" :after=" n + '的团队' ")
      f7-list-item(title="团队人数" :after=" u.subCount + '人' ")
      f7-list-item(title="统计时间" :after=" __stetn[0] ")

    .hlh_30.t_c.ft_16(v-else) {{ __stetn[0] }} - {{ n }}

    .data-table(ref="table_table")
      table
        thead.bgc_pc
          tr
            th(v-for=" (y, i) in dns " :key=" i " :class=" {'label-cell': y.key === 'date', 'numeric-cell': y.key !== 'date' } " v-show=" y.show !== false ") {{ y.n }}
           
        tbody
          tr(v-for=" (x, i) in data " :key=" i " :class=" (v.id < 0 || v.title) && x.userName !== '合计' ? 'will_active' : '' " @click=" (v.id < 0 || v.title) && x.userName !== '合计' && __go('/rfs/pl/pld/', {props: { v: {id: x.gameType, n: x.userName, title: v.title}, u: Object.assign({}, u, {userId: u.userId || user.userId}), stet_: stet, bl}}) ")
            td(v-for=" (y, i) in dns " :key=" i " :class=" {'label-cell': y.key === 'date', 'numeric-cell': y.key !== 'date' } " v-show=" y.show !== false ")
              template(v-if=" !y.key ")
                f7-icon(f7="chevron_right" size="12px")

              template(v-if=" y.key === 'date' ")
                template(v-if=" x.date ") {{ x.date.slice(5) }}
                template(v-else) 合计

              template(v-else) 
                span(v-nwc=" y.nwc ") {{ y.v ? y.v(x) : x[y.key] }}
    template(v-if=" (v.title && v.id === 999) && __stetgap ")
      .h_5.bgc_pc
      f7-list.mg_0
        f7-list-item
          span 上月结余
          span {{ u.lastProfit }}
        f7-list-item
          span 总结算
          span(v-nwc="true")  {{ u.totalProfit }}


</template>

<script>
import config from '@/config'
import api from '@/api'
import stet from '@/components/stet'
export default {
  mixins: [config, stet],
  components: {
  },
  name: 'profit_loss_detail_list',
  props: ['v', 'u', 'stet_', 'bl'],
  data () {
    return {
      stet: this.stet_,
      // title: this.v.id === -1 ? '总盈亏明细' : this.v.n + '每日盈亏明细(个人)' : ,
      // 游戏类型：0:彩票盈亏；1:电竞；2:电游；3:真人；4:棋牌；5：捕鱼；6：体育；7：基诺彩；8：微游
      dns_: [
        // 三方盈亏
        {n: '游戏类别', key: 'userName', v: x => x.userName || this.config.agts[x.gameType]},
        {n: '投注', key: 'buy'},
        {n: '游戏盈亏', nwc: true, key: this.v.title ? 'profit' : 'gameProfit'},
        {n: '总盈亏', nwc: true, key: this.v.title ? 'settle' : 'totalProfit'},
        {n: ''},

        // 个人盈亏每日盈亏明细（彩票 + 其它）团队盈亏每日盈亏明细（彩票 ）
        {n: '日期', key: 'date'},
        {n: '投注', key: 'betAmount', v: x => x.betAmount || x.buy},
        {n: '派奖', key: 'prizeAmount', v: x => x.prizeAmount || x.prize, show: this.v.id === 0},
        {n: '游戏盈亏', nwc: true, key: 'gameSettleAmount', v: x => x.gameSettleAmount || x.gameProfit || x.profit},
        {n: this.v.id > 0 ? '返水' : '返点', key: 'pointAmount', v: x => x.pointAmount || x.point, show: false},
        {n: '活动', key: 'activityAmount', v: x => x.activityAmount || x.reward || x.rewards},
        {n: this.v.id > 0 ? '平台费' : '日工资', key: 'salaryAmount', v: x => x.salaryAmount || x.salary || x.platfee, show: !!(this.v.id <= 0 || this.v.title)},
        {n: '总盈亏', key: 'settleAmount', nwc: true, v: x => x.settleAmount || x.settle || x.totalProfit},
      ],
      data: [],
      force: false,
    }
  },
  computed: {
    n () {
      return this.u.userId === 0 || this.u.userId === this.user.userId ? '我' : this.u.userName || '我'
    },
    dns () {
      return this.v.id < 0 || (this.v.title && this.v.id === 999) ? this.dns_.slice(0, 5) : this.dns_.slice(5)
    },
  },
  created () {
    this.list()
    setTimeout(() => (this.force = (this.bl && (this.$f7router.previousRoute.path !== this.bl))), 0)
  },
  mounted () {
    this.horizonscroll()
  },
  methods: {
    horizonscroll () {
      const p = this.$refs['table_table']
      p.style.overflow = 'hidden'
      setTimeout(() => {
        p.style.overflow = 'auto'
      }, 500)
    },
    list () {
      // api.pldl 个人每日盈亏明细
      // api.tpldreport 彩票 团队每日盈亏明细
      // api.toplreport 三方 团队盈亏明细
      // api.topldreport 1.电竞。2.电游; 3.真人;4. 棋牌;5.捕鱼;6.体育；7.其他彩票；8.微游 团队每日盈亏明细
      this.$.get(
        this.v.title
          ? this.v.id === 999
            ? api.toplreport
            : api.topldreport
          : this.v.title
            ? api.tpldreport
            : api.pldl,
        {
          userId: this.u.userId || this.user.userId,
          gameType: this.v.id,
          beginDate: this.stet[0]._toDayString(),
          endDate: this.stet[1]._toDayString(),
        }).then(({data: {items, pointLevel}}) => {
        if (this.v.id !== 999 && this.v.id > -1 && this.v.title) {
          items = [...items.slice(0, -1).reverse(), ...items.slice(-1)]
        }
        this.data = items
        pointLevel && (this.dns_[9].show = true)
      })
    },
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.profit_loss_detail_list
  .label-cell
    min-width 80px
  .f7-icons
    opacity 0
  .will_active .f7-icons
    opacity 1
  .will_active:active
    opacity .6
  
</style>
