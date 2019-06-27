<template lang="pug">


.info_orders
  .data-table.p_a.bg-color-white
    table
      thead
        tr
          td.label-cell.t_c.wp_15 期号
          td.label-cell.t_c.wp_30 玩法与内容
          td.label-cell.t_c 投注金额
          td.label-cell.t_c 中奖金额
          td.label-cell.t_c 操作/状态

  f7-page.bg-color-white(infinite :infinite-distance="50" :infinite-preloader="showPreloader" @infinite="loadMore" ptr :ptr-mousewheel="true" @ptr:refresh="refresh")
    .data-table
      table
        tbody
          tr(v-for=" (v, i) in data " :key="i")
            td.o_h.wp_15.label-cell.t_c {{ v.issue.slice(-6) }}
            td.o_h.wp_30.label-cell.t_c {{ v.methodName + v.code.slice(-6) }}
            td.o_h.label-cell.t_c.text-color-red {{ v.totalPrice }}
            td.o_h.label-cell.t_c.text-color-green {{ v.bonus }}
            td.o_h.label-cell
              f7-button.pd_0.hlh_20(fill v-if=" v.canCancel " @click=" cancelOrder(v.projectId, v) ") 撤单
              f7-button.pd_0.hlh_20(v-else :class=" config.stateClass[config.orderState[v.stat]] ") {{ config.orderState[v.stat] }}

          tr.no_more
            td.wp_100.t_c.text-color-gray --没有更多了--





</template>

<script>
import config from '@/config'
import api from '@/api'
import page from '@/components/page'
import lucknumbers from './info_luck_numbers'
export default {
  mixins: [config, page],
  components: {
    lucknumbers,
  },
  name: 'info_orders',
  props: ['id'],
  data () {
    return {
      data: []
    }
  },
  computed: {
  },
  created () {
  },
  beforeDestroy () {
  },
  methods: {
    __setTab_2 () {
      this.list()
    },
    list (option = {pageNum: 1, page: 1, pageSize: this.pageSize, size: this.pageSize}, cb = this.defaultListCb) {
      this.$.get(api.orderList, Object.assign({
        lotteryId: this.id,
        scope: 0,
      }, option)).then(({data: {recordList, totalSize}}) => {
        this.data = [...(option.page > this.fpage ? this.data : []), ...recordList]
        this.total = totalSize
        cb && cb(recordList)
      })
    },
    cancelOrder (id, v) {
      this.$.get(api.cancelOrder, {id}).then(() => {
        v.stat = 3
        v.canCancel = 0
      })
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.info_orders
  height 100%
  width 100%
  
  &>.page
    .page-content
      padding-top 32px
  table
    table-layout fixed
  th, td
    padding 5px
    height 30px !important
  .data-table.p_a
    top 0
    left 0
    right 0
    z-index 9000
  .no_more
    display none
  .no_more:first-child
    display table-row
    
    
</style>
