<template lang="pug">
f7-page.team_hd_detail
  f7-navbar(title=" 活动明细(团队) " back-link)

  f7-list.mg_0(simple-list)
    template(v-for=" (x, i) in dns ")
      f7-list-item(v-if=" x.key === '_date' ")
        span {{ x.n }}
        template(v-if=" __stetgap ")
          f7-button(outline @click=" __go('/rfs/ts/bdl/', { props: { v, stet_ } }) ") 
            span {{ __stetn.join(' 至 ') }}
            f7-icon(f7="chevron_right" size="10")

        span(v-else) {{ __stetn[0] }}

      template(v-else)
        f7-list-item
          span {{ x.n }}
          span 
            span {{ x.start || '' }}
            span(v-nwc="x.nwc") {{  x.v ? x.v(v) : v[x.key] }}
            span {{ x.end || ''}}

      li.bgc_pc(style="height: 5px" v-if=" i === 2 || i === 4 ")

    template(v-for=" (y, i) in v.gamedate ")
      f7-list-item
        span {{ y.groupname }}活动人数
        span 
          span {{  y.totalpeople }}

      f7-list-item
        span {{ y.groupname }}活动金额
        span 
          span {{ y.totalamount }}
      li.bgc_pc(style="height: 5px")

  
</template>

<script>
import config from '@/config'
// import api from '@/api'
import stet from '@/components/stet'
export default {
  mixins: [config, stet],
  components: {
  },
  name: 'team_hd_detail',
  props: ['v', 'stet_'],
  data () {
    return {
      stet: this.stet_,
      dns: [
        {n: '团队', v: x => this.n, end: '的团队'},
        {n: '团队人数', key: 'temacount', end: '人'},
        {n: '统计时间', key: '_date'},
        {n: '全部活动参与人数', key: 'sumtotalpeople'},
        {n: '全部活动领取金额', key: 'sumtotalamount'},
      ],
    }
  },
  computed: {
    n () {
      return this.v.userId === 0 || this.v.userId === this.user.userId ? '我' : this.v.userName || '我'
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
.team_hd_detail
  .flex:active
    opacity .6
</style>
