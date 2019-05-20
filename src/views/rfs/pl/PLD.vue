<template lang="pug">
f7-page.profit_loss_detail
  f7-navbar(:title=" v.n + '盈亏明细(个人)' " back-link)
  f7-list.mg_0(simple-list v-if=" v_ ")
    template(v-for=" (x, i) in dns.slice(0, 3) ")
      f7-list-item(v-if=" x.key === '_n' ")
        span {{ x.n }}
        span 我
      
      f7-list-item(v-else-if=" x.key === '_date' ")
        span {{ x.n }}
        template(v-if=" stet.n === '最近7天' ")
          f7-button(outline @click=" __go('/rfs/pl/pld/pldl/', {props: { v, date }}) ") 
            span {{ stet.n }}
            f7-icon(f7="chevron_right" size="10")

        span(v-else) {{ stet.n }}
    
      f7-list-item(v-else-if=" Number(v_.pointLevel) ")
        span {{ v.n.replace('盈亏', '返点') }}
        span(v-if=" !v.id ") {{ (v_[x.key] * 100)._f1() }}% 
        span(v-else) {{ v_[x.key] * 1000 }}‰

  f7-list.mt_5(simple-list v-if=" v_ ")
    template(v-for=" (x, i) in dns.slice(3) ")
      template(v-if=" x.key === 'point' ")
        f7-list-item(v-if=" Number(v_.pointLevel) ") 
          span {{ x.n }}
          span {{ v_[x.key] }}

      template(v-else-if=" x.key === 'prize' ")
        f7-list-item(v-if=" !v.id ") 
          span {{ x.n }}
          span {{ v_[x.key] }}

      template(v-else-if=" x.key === 'salary' ")
        f7-list-item(v-if=" !v.id ") 
          span {{ x.n }}
          span {{ v_[x.key] }}

      template(v-else-if=" x.key === 'totalProfit' ")
        f7-list-item
          span {{ x.n }}
          span(:class=" {'c_e': v_.totalProfit._l0(), 'c_s': v_.totalProfit._o0()} ") {{ v_[x.key] }}

      f7-list-item(v-else)
        span {{ x.n }}
        span {{ v_[x.key] }}


</template>

<script>
import config from '@/config'
import api from '@/api'
export default {
  mixins: [config],
  components: {
  },
  name: 'profit_loss_detail',
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
        {n: '用户', key: '_n'},
        {n: '返点', key: 'pointLevel'},
        {n: '统计时间', key: '_date'},
        {n: '投注', key: 'buy'},
        {n: '派奖', key: 'prize'},
        {n: '游戏盈亏', key: 'gameProfit'},
        {n: '返点', key: 'point'},
        {n: '活动', key: 'reward'},
        {n: '日工资', key: 'salary'},
        {n: '总盈亏', key: 'totalProfit'},
      ],
      v_: null
    }
  },
  created () {
    this.list()
  },
  methods: {
    list () {
      this.$.get(api.pld, {
        userId: this.user.userId,
        gameType: this.v.id,
        beginDate: this.stet[0],
        endDate: this.stet[1],
      }).then(({data: {items}}) => {
        this.v_ = items[0] || null
      })
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.profit_loss_detail
  .flex:active
    opacity .6
</style>
