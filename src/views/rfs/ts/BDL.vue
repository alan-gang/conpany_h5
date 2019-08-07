<template lang="pug">
f7-page.team_hd_detali_list
  f7-navbar(:innerClass=" 'navbar_of_' + $options.name " title=" 每日活动明细(团队) " back-link )

  .bgc_f.smooth_scroll

    .hlh_30.t_c.ft_16 {{ __stetn[0] }} - {{ n }}的团队

    .data-table(ref="table_table")
      table(v-if="data[0]")
        thead.bgc_pc
          tr
            th.label-cell(rowspan="2") 日期
            th.t_c(colspan="2" v-for=" (x, i) in data[0].gamedate ") {{ x.groupname }}
          tr
            template(v-for=" (x, i) in data[0].gamedate ")
              th.numeric-cell 领取金额
              th.numeric-cell 参与人数
           
        tbody
          tr(v-for=" (x, i) in data " :key=" i + Math.random() ")
            td.label-cell
              template(v-if=" x.date !== '合计' ") {{ x.date.slice(5) }}
              template(v-else) 合计
            
            template(v-for=" (y, j) in x.gamedate ")
              td.numeric-cell(v-nwc="true") {{ y.totalamount }}
              td.numeric-cell {{ y.totalpeople }}
              



</template>

<script>
import config from '@/config'
import api from '@/api'
import stet from '@/components/stet'
export default {
  mixins: [config, stet],
  components: {
  },
  name: 'team_hd_detali_list',
  props: ['v', 'stet_'],
  data () {
    return {
      stet: this.stet_,
      data: [],
    }
  },
  computed: {
    n () {
      return this.v.userId === 0 || this.v.userId === this.user.userId ? '我' : this.v.userName || '我'
    },
  },
  created () {
    this.list()
    setTimeout(() => (this.force = (this.bl && (this.$f7router.previousRoute.path !== this.bl))), 0)
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
      this.$.get(api.hdd, {
        userId: this.v.userId || this.user.userId,
        beginDate: this.stet[0]._toDayString(),
        endDate: this.stet[1]._toDayString(),
      }).then(({data: {data}}) => {
        let items = data || []
        this.data = items
      })
    },
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.team_hd_detali_list
  .label-cell
    min-width 80px
  
  .data-table th
    --f7-table-head-cell-height 30px
    --f7-table-cell-padding-vertical 5px
    --f7-table-cell-padding-vertical 5px
    

  
</style>
