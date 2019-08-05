<template lang="pug">
f7-page.profit_loss_detail
  f7-navbar(:title=" v.n + '盈亏明细(' + (v.title || '个人') + ')' " back-link)

  f7-list.mg_0(simple-list)
    template(v-for=" (x, i) in dns ")
      f7-list-item(v-if=" x.key === '_date' ")
        span {{ x.n }}
        template(v-if=" __stetgap ")
          f7-button(outline @click=" __go('/rfs/pl/pld/pldl/', {props: { v, stet_, u: u, bl }}) ") 
            span {{ __stetn[0] }}
            f7-icon(f7="chevron_right" size="10")

        span(v-else) {{ __stetn[0] }}

      template(v-else)
        f7-list-item(v-if=" !v.title || x.key !== 'gameUserCount' || (__stetgap && i === 4) || (!__stetgap && i === 3) " v-show=" !x.show || x.show(v__) ")
          span {{ x.n }}
          span 
            span {{ x.start || '' }}
            span(v-nwc="x.nwc") {{ x.v ? x.v(v__) : v__[x.key] }}
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
  props: ['v', 'u', 'stet_', 'bl'],
  data () {
    return {
      stet: this.stet_,
      // 游戏类型：0:彩票盈亏；1:电竞；2:电游；3:真人；4:棋牌；5：捕鱼；6：体育；7：基诺彩；8：微游
      dns_: [
        {n: '团队', v: x => this.n, end: '的团队'},
        {n: '团队人数', key: 'subCount', end: '人'},
        {n: '统计时间', key: '_date'},
        {n: '游戏人数', key: 'gameUserCount', end: '人'},
        {n: '日均游戏人数', key: 'gameUserCount', end: '人'},

        {n: '投注', key: 'betAmount', v: x => x.betAmount || x.buy},
        {n: '派奖', key: 'prizeAmount', v: x => x.prizeAmount || x.prize, show: x => !(this.v.id > 0 && this.v.title === '团队')},
        {n: '游戏盈亏', nwc: true, key: 'gameSettleAmount', v: x => x.gameSettleAmount || x.profit},
        {n: this.v && this.v.id > 0 ? '返水' : '返点', key: 'pointAmount', show: x => Number(x.pointAmount || x.point), v: x => x.pointAmount || x.point},
        {n: '活动', key: 'activityAmount', v: x => x.activityAmount || x.rewards},
        {n: this.v && this.v.id > 0 ? '平台费' : '日工资', key: 'salaryAmount', v: x => x.salaryAmount || x.platfee},
        {n: '总盈亏', key: 'settleAmount', nwc: true, v: x => x.settleAmount || x.settle},

        {n: '用户', v: x => this.n},
        {n: this.v && this.v.n + (this.v.id > 0 ? '返水' : '返点'), key: 'pointLevel', show: x => Number(x.pointLevel), v: x => (!this.v || !this.v.id ? x.pointLevel * 100 : x.pointLevel * 1000).toFixed(1), end: !this.v || !this.v.id ? '%' : '‰'},
        {n: '统计时间', key: '_date'},
        {n: '投注', key: 'buy'},
        {n: '派奖', key: 'prize', show: x => !this.v.id},
        {n: '游戏盈亏', nwc: true, key: 'gameProfit'},
        {n: this.v.id > 0 ? '返水' : '返点', key: 'point', show: x => Number(x.pointLevel)},
        {n: '活动', key: 'reward'},
        {n: '日工资', key: 'salary', show: x => Number(x.salary)},
        {n: '总盈亏', key: 'totalProfit', nwc: true},
      ],
      v_: null
    }
  },
  computed: {
    n () {
      return this.u.userId === 0 || this.u.userId === this.user.userId ? '我' : this.u.userName || '我'
    },
    dns () {
      return this.v.title ? this.dns_.slice(0, 12) : this.dns_.slice(12)
    },
    v__ () {
      return this.v_ || this.u
    },
  },
  created () {
    !this.v.title && this.list()
  },
  methods: {
    list () {
      this.$.get(api.pld, {
        userId: this.u.userId || this.user.userId,
        gameType: this.v.id,
        beginDate: this.stet[0]._toDayString(),
        endDate: this.stet[1]._toDayString(),
      }).then(({data: {items, userBackWater}}) => {
        if (items[0] && !items[0].pointLevel) {
          items[0].pointLevel = userBackWater / 1000
        }
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
