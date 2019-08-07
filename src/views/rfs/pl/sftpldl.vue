<template lang="pug">
f7-page.profit_loss_detail_list
  f7-navbar(:title=" 三方盈亏明细(团队) " back-link)

  .bgc_f.smooth_scroll
    f7-list.mg_0
      f7-list-item(title="团队" :after=" n + '的团队' ")
      f7-list-item(title="团队人数" :after=" u.subCount + '人' ")
      f7-list-item(title="统计时间" :after=" __stetn[0] ")

    .data-table(ref="table_table")
      table
        thead.bgc_pc
          tr
            th(v-for=" (y, i) in dns " :key=" i + Math.random() " :class=" {'label-cell': y.key === 'date', 'numeric-cell': y.key !== 'date' } ") {{ y.n }}
           
        tbody
          tr(v-for=" (x, i) in data " :key=" i + Math.random() " :class=" x.userName !== '合计' ? 'will_active' : '' " @click=" x.userName !== '合计' && __go('/rfs/pl/pld/', {props: { v: {id: x.gameType, n: x.userName, title: v.title}, u: Object.assign({}, u, {userId: u.userId || user.userId}), stet_: stet, bl}}) ")
            td(v-for=" (y, j) in dns " :key=" j + Math.random() " :class=" {'label-cell': y.key === 'date', 'numeric-cell': y.key !== 'date' } ")
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
    return {
      stet: this.stet_,
      dns: [
        {n: '游戏类别', key: 'gameType', v: x => this.config.agts[x.gameType]},
        {n: '投注', key: 'buy'},
        {n: '游戏盈亏', nwc: true, key: 'profit'},
        {n: '总盈亏', nwc: true, key: 'settle'},
        {n: ''},
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
      // api.pldl 个人每日盈亏明细
      // api.tpldreport 彩票 团队每日盈亏明细
      // api.toplreport 三方 团队盈亏明细
      // api.topldreport 1.电竞。2.电游; 3.真人;4. 棋牌;5.捕鱼;6.体育；7.其他彩票；8.微游 团队每日盈亏明细
      this.$.get(api.toplreport, {
        userId: this.u.userId,
        gameType: this.v.id,
        beginDate: this.stet[0]._toDayString(),
        endDate: this.stet[1]._toDayString(),
      }).then(({data: {items}}) => {
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
