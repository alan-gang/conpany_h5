<template lang="pug">
f7-page.profit_loss_detail_list
  f7-navbar(:title=" title " back-link :back-link-url=" u.userId ? '/rfs/_pl/' : '' " :back-link-force=" !!u.userId ")
  .bgc_f
    f7-list.mg_0(v-if=" v.id === -1 ")
      f7-list-item(title="用户" :after=" n ")
      f7-list-item(title="统计时间" :after=" __stetn[0] ")

    .hlh_30.t_c.ft_16(v-else) {{ __stetn[0] }} - {{ n }}

    .data-table
      table
        thead.bgc_pc
          tr
            th(v-for=" (y, i) in dns " :key=" i " :class=" {'label-cell': y.key === 'date', 'numeric-cell': y.key !== 'date' } ") {{ y.n }}
           
        tbody
          tr(v-for=" (x, i) in data " :key=" i " :class=" v.id === -1 && x.userName !== '合计' ? 'will_active' : '' " @click=" v.id === -1 && x.userName !== '合计' && __go('/rfs/pl/pld/', {props: { v: {id: x.gameType, n: x.userName}, u: u, stet_: stet}}) ")
            td(v-for=" (y, i) in dns " :key=" i " :class=" {'label-cell': y.key === 'date', 'numeric-cell': y.key !== 'date' } ")
              template(v-if=" !y.key ")
                f7-icon(f7="chevron_right" size="12px")

              template(v-if=" y.key === 'date' ")
                template(v-if=" x.date ") {{ x.date.slice(5) }}
                template(v-else) 合计
              template(v-else) {{ x[y.key] }}

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
      title: this.v.id !== -1 ? this.v.n + '每日盈亏明细(个人)' : '总盈亏明细',
      n: !this.u.userId ? '我' : this.u.userName,
      // 游戏类型：0:彩票盈亏；1:电竞；2:电游；3:真人；4:棋牌；5：捕鱼；6：体育；7：基诺彩；8：微游
      dns_: [
        {n: '游戏类别', key: 'userName'},
        {n: '投注', key: 'buy'},
        {n: '游戏盈亏', key: 'gameProfit'},
        {n: '总盈亏', key: 'totalProfit'},
        {n: ''},

        {n: '日期', key: 'date'},
        {n: '投注', key: 'buy'},
        {n: '派奖', key: 'prize'},
        {n: '游戏盈亏', key: 'gameProfit'},
        {n: '返点', key: 'point'},
        {n: '活动', key: 'reward'},
        {n: '日工资', key: 'salary'},
        {n: '总盈亏', key: 'totalProfit'},
      ],
      data: [],
    }
  },
  computed: {
    dns () {
      return this.v.id === -1 ? this.dns_.slice(0, 5) : this.dns_.slice(5)
    },
  },
  created () {
    this.list()
  },
  methods: {
    list () {
      this.$.get(api.pldl, {
        userId: this.id || this.user.userId,
        gameType: this.v.id,
        beginDate: this.stet[0]._toDayString(),
        endDate: this.stet[1]._toDayString(),
      }).then(({data: {items}}) => {
        this.data = items
      })
    }
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
