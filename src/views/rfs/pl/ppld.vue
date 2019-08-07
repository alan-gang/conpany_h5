<template lang="pug">
f7-page.profit_loss_detail
  f7-navbar(:innerClass=" 'navbar_of_' + $options.name " :title=" v.n + '盈亏明细(个人)' " back-link)

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
        f7-list-item(v-show=" !x.show || x.show(v_) ")
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
  // v: id, dns; u: data; stet_: time
  props: ['v', 'u', 'stet_'],
  data () {
    let txt = this.v.id ? '返水' : '返点'
    return {
      stet: this.stet_,
      // 游戏类型：0:彩票盈亏；1:电竞；2:电游；3:真人；4:棋牌；5：捕鱼；6：体育；7：基诺彩；8：微游
      dns: [
        {n: '用户', v: x => '我'},
        {
          n: this.v.n + txt,
          key: 'pointLevel',
          v: x => (!this.v.id ? x.pointLevel * 100 : x.pointLevel * 1000).toFixed(1),
          end: !this.v.id ? '%' : '‰'
          show: x => Number(x.pointLevel),
        },
        {n: '统计时间', key: '_date'},
        {n: '投注', key: 'buy'},
        {
          n: '派奖', 
          key: 'prize',
          show: x => !this.v.id
        },
        {n: '游戏盈亏', nwc: true, key: 'gameProfit'},
        {
          n: txt,
          key: 'point',
          show: x => Number(x.pointLevel)
        },
        {n: '活动', key: 'reward'},
        {
          n: '日工资',
          key: 'salary',
          show: x => Number(x.salary)
        },
        {n: '总盈亏', key: 'totalProfit', nwc: true},
      ],
      v_: null
    }
  },
  computed: {
  },
  created () {
    this.list()
  },
  methods: {
    list () {
      this.$.get(api.pld, {
        userId: this.user.userId,
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
