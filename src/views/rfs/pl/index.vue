<template lang="pug">
f7-page.profit_loss_report
  f7-navbar(title="盈亏报表" back-link)
  
  f7-card(v-for=" (v, i) in data " :key="i")
    f7-card-content
      .stripe_white_gray_40.pl_5.pr_5
        template(v-for=" (y, k) in dns ")
          .hlh_40.wp_50.inlb.b_s.pl_5.pr_5(:key="k" :class=" y.key ")

            span(v-if=" y.key === 'date'")
              f7-icon._icon._date.v_m.p_r(f7="calendar_fill" size="20" style="left: -10px")
              span.c_3.ft_b.ft_15.v_m {{ v[y.key] || '最近7天' }}

            span.inlb.wp_100.t_r(v-else-if=" y.key === 'settlement' ")
              span {{ y.n }}： 
              span.text-color-deeporange.ft_b.t_r.ft_16 {{ v[y.key]._f3() }}

            .flex(v-else @click=" __go('/rfs/pl/pld/', {props: { v: y,  date: v.date}}) ")
              .v_m.inlb
                span {{ y.n + '盈亏' }}： 
                span.c_3.ft_b {{ v[y.key]._f3() }}

              f7-icon(f7="chevron_right" size="12px")


</template>

<script>
import config from '@/config'
import api from '@/api'
export default {
  mixins: [config],
  components: {
  },
  name: 'profit_loss_report',
  props: [],
  data () {
    return {
      // 游戏类型：0:彩票盈亏；1:电竞；2:电游；3:真人；4:棋牌；5：捕鱼；6：体育；7：基诺彩；8：微游
      dns: [
        {n: '日期', key: 'date'},
        {n: '总盈亏', key: 'settlement'},
        {id: 0, n: '彩票', key: 'ltrsettle'},
        {id: 8, n: '微游', key: 'litsettle'},
        {id: 2, n: '老虎机', key: 'egamesettle'},
        {id: 6, n: '体育', key: 'sptsettle'},
        {id: 4, n: '棋牌', key: 'chesettle'},
        {id: 3, n: '真人', key: 'vidsettle'},
        {id: 1, n: '电竞', key: 'esptsettle'},
        {id: 5, n: '捕鱼', key: 'fishsettle'},
        {id: 7, n: '基诺彩', key: 'othltrsettle'},
      ],
      data: []
    }
  },
  created () {
    this.list()
  },
  methods: {
    list () {
      this.$.get(api.plreport).then(({data: {items}}) => {
        if (items[0]) {
          items = [...(items.splice(-1, 1)), ...items]
        }
        this.data = items
      })
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.profit_loss_report
  .flex:active
    opacity .6
</style>
