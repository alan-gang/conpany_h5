<template lang="pug">
f7-page.profit_loss_detail_list
  f7-navbar(:title=" v.n + '每日盈亏明细(个人)' " back-link)
  .bgc_f
    .pd_5
    .hlh_30.t_c.ft_16 最近7天- 我
    .data-table
      table
        thead.bgc_pc
          tr
            th(v-for=" (y, i) in dns " :key=" i " :class=" {'label-cell': y.key === 'date', 'numeric-cell': y.key !== 'date' } ") {{ y.n }}
           
        tbody
          tr(v-for=" (x, i) in data " :key=" i ")
            td(v-for=" (y, i) in dns " :key=" i " :class=" {'label-cell': y.key === 'date', 'numeric-cell': y.key !== 'date' } ")
              template(v-if=" y.key === 'date' ")
                template(v-if=" x.date ") {{ x.date.slice(5) }}
                template(v-else) 合计

              template(v-else) {{ x[y.key] }}

</template>

<script>
import config from '@/config'
import api from '@/api'
export default {
  mixins: [config],
  components: {
  },
  name: 'profit_loss_detail_list',
  props: ['v', 'date'],
  data () {
    return {
      stet: {
        n: !this.date ? '最近7天' : this.date,
        0: !this.date ? new Date()._bf(-7)._toDayString() : this.date,
        1: !this.date ? new Date()._toDayString() : this.date,
      },
      // 游戏类型：0:彩票盈亏；1:电竞；2:电游；3:真人；4:棋牌；5：捕鱼；6：体育；7：基诺彩；8：微游
      dns: [
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
  created () {
    this.list()
  },
  methods: {
    list () {
      this.$.get(api.pldl, {
        userId: this.user.userId,
        gameType: this.v.id,
        beginDate: this.stet[0],
        endDate: this.stet[1],
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
  
</style>
