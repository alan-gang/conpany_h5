<template lang="pug">
f7-page.profit_loss_detail_list
  f7-navbar(:innerClass=" 'navbar_of_' + $options.name " :title=" v.n + '每日盈亏明细(团队)') " back-link)

  .bgc_f.smooth_scroll

    .hlh_30.t_c.ft_16 {{ __stetn[0] }} - {{ n + '的团队' }}

    .data-table(ref="table_table")
      table
        thead.bgc_pc
          tr
            th(v-for=" (y, i) in dns " :key=" i + Math.random() " :class=" {'label-cell': y.key === 'date', 'numeric-cell': y.key !== 'date' } " v-show=" y.show !== false ") {{ y.n }}
           
        tbody
          tr(v-for=" (x, i) in data " :key=" i + Math.random() ")
            td(v-for=" (y, i) in dns " :key=" i + Math.random() " :class=" {'label-cell': y.key === 'date', 'numeric-cell': y.key !== 'date' } " v-show=" y.show !== false ")
              template(v-if=" !y.key ")
                f7-icon(f7="chevron_right" size="12px")

              template(v-if=" y.key === 'date' ")
                template(v-if=" x.date ") {{ x.date.slice(5) }}
                template(v-else) 合计

              template(v-else) 
                span(v-nwc=" y.nwc ") {{ y.v ? y.v(x) : x[y.key] }}

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
    let a = this.v.id ? '返水' : '返点'
    let b = this.v.id ? '平台费' : '日工资'
    return {
      stet: this.stet_,
      dns: [
        {n: '日期', key: 'date'},
        {n: '投注', key: 'betAmount', v: x => x.betAmount || x.buy},
        {n: '派奖', key: 'prizeAmount', v: x => x.prizeAmount || x.prize, show: !this.v.id},
        {n: '游戏盈亏', nwc: true, key: 'gameSettleAmount', v: x => x.gameSettleAmount || x.gameProfit || x.profit},
        {n: a, key: 'pointAmount', v: x => x.pointAmount || x.point, show: false},
        {n: '活动', key: 'activityAmount', v: x => x.activityAmount || x.reward || x.rewards},
        {n: b, key: 'salaryAmount', v: x => x.salaryAmount || x.salary || x.platfee},
        {n: '总盈亏', key: 'settleAmount', nwc: true, v: x => x.settleAmount || x.settle || x.totalProfit},
      ],
      data: [],
    }
  },
  computed: {
    n () {
      return this.u.userId === 0 || this.u.userId === this.user.userId ? '我' : this.u.userName || '我'
    },
  },
  created () {
    this.list()
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
      this.$.get(api.topldreport, {
        userId: this.u.userId || this.user.userId,
        gameType: this.v.id,
        beginDate: this.stet[0]._toDayString(),
        endDate: this.stet[1]._toDayString(),
      }).then(({data: {items}}) => {
        if (this.v.id !== 999) {
          items = [...items.slice(0, -1).reverse(), ...items.slice(-1)]
        }
        this.data = items
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
