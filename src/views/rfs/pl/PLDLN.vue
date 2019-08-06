<template lang="pug">
f7-page.profit_loss_detail_list
  f7-navbar(:title=" v.n + '每日盈亏明细(个人)'  " back-link)

  .bgc_f.smooth_scroll

    .hlh_30.t_c.ft_16(v-else) {{ __stetn[0] }} - 我

    .data-table(ref="table_table")
      table
        thead.bgc_pc
          tr
            th(v-for=" (y, i) in dns " :key=" i + Math.random() " :class=" {'label-cell': y.key === 'date', 'numeric-cell': y.key !== 'date' } " v-show=" y.show !== false ") {{ y.n }}
           
        tbody
          tr(v-for=" (x, i) in data " :key=" i + Math.random() " )
            td(v-for=" (y, j) in dns " :key=" j + Math.random() " :class=" {'label-cell': y.key === 'date', 'numeric-cell': y.key !== 'date' } " v-show=" y.show !== false ")
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
  props: ['v', 'u', 'stet_'],
  data () {
    let txt = this.v.id ? '返水' : '返点'
    return {
      stet: this.stet_,
      dns: [
        {n: '日期', key: 'date'},
        {
          n: '投注',
          key: 'betAmount',
          v: x => x.buy
        },
        {
          n: '派奖',
          key: 'prizeAmount',
          v: x => x.prize,
          show: !this.v.id
        },
        {
          n: '游戏盈亏'
          nwc: true
          key: 'gameSettleAmount'
          v: x => x.gameProfit
        },
        {
          n: '活动',
          key: 'activityAmount',
          v: x => x.reward
        },
        {
          n: txt,
          key: 'pointAmount',
          v: x => x.point,
          show: false
        },
        {
          n: '日工资',
          key: 'salaryAmount',
          v: x => x.salary,
          show: !this.v.id
        },
        {
          n: '总盈亏',
          key: 'settleAmount',
          nwc: true,
          v: x => x.totalProfit
        },
      ],
      data: [],
    }
  },
  computed: {
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
      this.$.get(api.pldl, {
        userId: this.user.userId,
        gameType: this.v.id,
        beginDate: this.stet[0]._toDayString(),
        endDate: this.stet[1]._toDayString(),
      }).then(({data: {items, pointLevel}}) => {
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
