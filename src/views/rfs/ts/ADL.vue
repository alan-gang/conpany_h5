<template lang="pug">
f7-page.team_ct_detali_list
  f7-navbar(title=" 每日充提明细(团队) " back-link )

  .bgc_f.smooth_scroll

    .hlh_30.t_c.ft_16 {{ __stetn[0] }} - {{ n }}的团队

    .data-table(ref="table_table")
      table
        thead.bgc_pc
          tr
            th(v-for=" (y, i) in dns " :key=" i + Math.random() " :class=" {'label-cell': y.key === 'finishdate', 'numeric-cell': y.key !== 'finishdate' } ") {{ y.n }}
           
        tbody
          tr(v-for=" (x, i) in data " :key=" i + Math.random() ")
            td(v-for=" (y, i) in dns " :key=" i + Math.random() " :class=" {'label-cell': y.key === 'finishdate', 'numeric-cell': y.key !== 'finishdate' } ")

              template(v-if=" y.key === 'finishdate' ")
                template(v-if=" x.finishdate !== '合计' ") {{ x.finishdate.slice(5) }}
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
  name: 'team_ct_detali_list',
  props: ['v', 'stet_'],
  data () {
    return {
      stet: this.stet_,
      dns: [
        {n: '日期', key: 'finishdate'},
        {n: '充值人数', key: 'people'},
        {n: '充值笔数', key: 'times'},
        {n: '充值金额', key: 'totalamount'},
        {n: '首充人数', key: 'firstpeople'},
        {n: '二充人数', key: 'secondpeople'},
        {n: '提款人数', key: 'withdrawelpeople'},
        {n: '提款笔数', key: 'withdraweltimes'},
        {n: '提款金额', key: 'withdrawalamount'},
      ],
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
      this.$.get(api.ctd, {
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
.team_ct_detali_list
  .label-cell
    min-width 80px

  
</style>
