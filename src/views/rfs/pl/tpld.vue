<template lang="pug">
f7-page.profit_loss_detail
  f7-navbar(:title=" v.n + '盈亏明细(团队)' " back-link)

  f7-list.mg_0(simple-list)
    template(v-for=" (x, i) in dns ")
      f7-list-item(v-if=" x.key === '_date' ")
        span {{ x.n }}
        template(v-if=" __stetgap ")
          f7-button(outline @click=" __go('/rfs/pl/pld/pldl/', {props: { v, stet_, u: u }}) ") 
            span {{ __stetn[0] }}
            f7-icon(f7="chevron_right" size="10")

        span(v-else) {{ __stetn[0] }}

      template(v-else)
        f7-list-item(v-if=" x.key !== 'gameUserCount' || (__stetgap && i === 4) || (!__stetgap && i === 3) " v-show=" !x.show || x.show(v_) ")
          span {{ x.n }}
          span 
            span {{ x.start || '' }}
            span(v-nwc="x.nwc") {{ x.v ? x.v(v_) : v_[x.key] }}
            span {{ x.end || ''}}

      li.bgc_pc(style="height: 5px" v-if=" i === (v.title ? 4 : 2) ")
  
  .pd_10.c_e 温馨提示：总盈亏为正数表示团队盈亏，为负数表示团队亏损
</template>

<script>
import config from '@/config'
import api from '@/api'
import stet from '@/components/stet'
export default {
  mixins: [config, stet],
  components: {
  },
  name: 'profit_loss_detail',
  props: ['v', 'u', 'stet_'],
  data () {
    let a = this.v.id ? '返水' : '返点'
    let b = this.v.id ? '平台费' : '日工资'
    return {
      stet: this.stet_,
      // 游戏类型：0:彩票盈亏；1:电竞；2:电游；3:真人；4:棋牌；5：捕鱼；6：体育；7：基诺彩；8：微游
      dns: [
        {n: '团队', v: x => this.n, end: '的团队'},
        {n: '团队人数', key: 'subCount', end: '人'},
        {n: '统计时间', key: '_date'},
        {n: '游戏人数', key: 'gameUserCount', end: '人'},
        {n: '日均游戏人数', key: 'gameUserCount', end: '人'},

        {n: '投注', key: 'betAmount', v: x => x.betAmount || x.buy},
        {n: '派奖', key: 'prizeAmount', v: x => x.prizeAmount || x.prize, show: x => !this.v.id},
        {n: '游戏盈亏', nwc: true, key: 'gameSettleAmount', v: x => x.gameSettleAmount || x.profit},
        {n: a, key: 'pointAmount', v: x => x.pointAmount || x.point},
        {n: '活动', key: 'activityAmount', v: x => x.activityAmount || x.rewards},
        {n: b, key: 'salaryAmount', v: x => x.salaryAmount || x.platfee},
        {n: '总盈亏', key: 'settleAmount', nwc: true, v: x => x.settleAmount || x.settle},
      ],
      v_: null
    }
  },
  computed: {
    n () {
      return this.u.userId === 0 || this.u.userId === this.user.userId ? '我' : this.u.userName || '我'
    },
  },
  created () {
  },
  methods: {
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
