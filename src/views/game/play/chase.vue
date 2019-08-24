<template lang="pug">

f7-page.chase(:class=" 'tabIndex_' + tabIndex " :page-content="false")
  f7-navbar(:innerClass=" 'navbar_of_' + $options.name " title=" 追号 " back-link)
  f7-toolbar(top tabbar)
    f7-segmented.wp_100(raised tag="p")
      f7-button(outline v-for=" (v, i) in tabs " :key="i" @click=" tabIndex = i " :active=" tabIndex === i " v-if=" i || local.$car.length < 2 ") {{ v }}

  f7-toolbar(bottom)
    f7-row.wp_100.a_c
      f7-col.t_r(width="75")
        span.text-color-deeporange {{ data.length }}
        span  期 
        span.text-color-deeporange {{ NA.n }}
        span  注 
        .inlb.minwp_40
          span.text-color-deeporange {{ Amt._f3() }}
          span  元
        
      f7-col(width="25")
        f7-button(fill @click=" data.length && booking() " )   
          span 确认追号
  .p_a.z_2.null_scroll.bgc_pc
    .bg-color-white.pd_15
      .hlh_30.mb_10
        span.inlb.w_100 起始期号
        template(v-if=" issueList ")
          f7-list.inline-picker.mg_0.border-gray(no-hairlines)
            f7-list-item.hlh_25(title="期号" smart-select :smart-select-params="{openIn: 'sheet'}" ref="issuevm")
              select(v-model=" issue ")
                option(:value=" v.issue " v-for=" (v, i) in issueList " :key=" i + Math.random() ") {{ v.issue }}
        span.pl_10 期

      .hlh_30.mb_10(v-show=" tabIndex === 1 || tabIndex === 0 ")
        span.inlb.w_100 起始倍数
        .stepper.stepper-init.stepper-small.color-gray.v_m(data-wraps='true', data-autorepeat='true', data-autorepeat-dynamic='true', data-decimal-point='2', data-manual-input-mode='true')
            .stepper-button-minus
            .stepper-input-wrap
              input.inlb.v_m(pattern="[0-9]*" type='number' v-model=" times " min='1', max='10000', step='1')
            .stepper-button-plus
        span.pl_10 倍

      .hlh_30.mb_10(v-show=" tabIndex === 2 ")
        span.inlb.w_100 间隔期数
        .stepper.stepper-init.stepper-small.color-gray.v_m(data-wraps='true', data-autorepeat='true', data-autorepeat-dynamic='true', data-decimal-point='2', data-manual-input-mode='true')
            .stepper-button-minus
            .stepper-input-wrap
              input.inlb.v_m(pattern="[0-9]*" type='number' v-model=" span " min='1', max='10000', step='1')
            .stepper-button-plus
        span.pl_10 期

      .hlh_30.mb_10(v-show=" tabIndex === 2 ")
        span.inlb.w_100 倍数&nbsp;&nbsp;&nbsp;&nbsp;x
        .inlb.w_105
          f7-input.hlh_25.border-gray(validate require outline pattern="[0-9]*"  )
            input.t_c.hlh_25(pattern="[0-9]*" type="number" v-model=" xtimes " )
        span.pl_10 倍

      .hlh_30.mb_10(v-show=" tabIndex === 0 ")
        span.inlb.w_100 利润率
        .inlb.w_105
          f7-input.hlh_25.border-gray(validate require outline pattern="[0-9]*"  )
            input.t_c.hlh_25(pattern="[0-9]*" type="number" v-model=" profit " )
        span.pl_10 %


      .hlh_30.mb_10
        span.inlb.w_100 追号期数
        .stepper.stepper-init.stepper-small.color-gray.v_m(data-wraps='true', data-autorepeat='true', data-autorepeat-dynamic='true', data-decimal-point='2', data-manual-input-mode='true')
            .stepper-button-minus
            .stepper-input-wrap
              input.inlb.v_m(pattern="[0-9]*" type='number' v-model=" count " min='1', max='10000', step='1')
            .stepper-button-plus
        span.pl_10 期
    
    f7-list.mt_5.mb_5.ft_14
      f7-list-item(title="中奖后停止追号")
        f7-toggle(v-on:toggle:change=" __setLocal({$stopWhenUwin: $event}) " :checked=" local.$stopWhenUwin ")

    .data-table.bg-color-white
      table
        thead
          tr
            td.label-cell.t_l.wp_25 期号
            td.label-cell.t_c.wp_20 倍数
            td.label-cell.t_c.wp_25 金额
            td.label-cell.t_r.wp_30 开奖时间

  .page-content
    .data-table.bg-color-white
      table
        tbody
          tr(v-for=" (v, i) in data " :key="i")
            td.label-cell.t_l.wp_25 {{ v.issue }}
            td.label-cell.t_c.wp_20
              f7-input.hlh_25.border-gray(validate require outline pattern="[0-9.]*"  )
                input.hlh_25.t_c(pattern="[0-9]*" type="number" v-model=" v.times " style="padding: 0 5px")

            td.label-cell.t_r.wp_25 
              f7-button.pd_0(color="black") {{ (v.times * NA.a)._f3() }}
            td.label-cell.t_r.wp_30.ft_12 {{ v.saleend.split('.')[0] }}

</template>

<script>
import config from '@/config'
import api from '@/api'
import issue from './issue'
export default {
  mixins: [config, issue],
  components: {
  },
  name: 'chase',
  props: ['id', 'n'],
  data () {
    return {
      tabs: ['利润率追号', '同倍追号', '翻倍追号'],
      tabIndex: 1,
      count: 5,
      // 0
      profit: 50,
      // 1
      times: 1,
      // 2
      span: 1,
      xtimes: 2,
      data: [],
      timesArray: [],
    }
  },
  computed: {
    Amt () {
      return this.data.reduce((p, x, i) => {
        p += x.times * this.NA.a
        return p
      }, 0)
    },
    cspan () {
      return Number([1, 1, this.span][this.tabIndex])
    },
    NA () {
      return this.__$car.reduce((p, x, i) => {
        p.n += x.count
        p.a += (x.count * x.up_ * [1, 0.1, 0.01, 0.001][x.mode - 1])
        p.b += this.getBonus(x, x.dp)
        return p
      }, {n: 0, a: 0, b: 0})
    },
  },
  watch: {
  },
  created () {
    this.$watch(vm => [vm.tabIndex, vm.times, vm.issue, vm.count, vm.span, vm.xtimes, vm.profit].join(), val => {
      if (this.tabIndex === 0) this.setTimesArray()
      this.issueList && this.generateData()
    })
  },
  methods: {
    getBonus (v, dp) {
      return (dp.maxprize - (v.userpoint * ((dp.maxprize - dp.minprize) / (dp.maxpoint - dp.minpoint) || 0))) * [1, 0.1, 0.01, 0.001][v.mode - 1]
    },
    getTimesForEachIssue (i) {
      return [this.timesArray[i] || 0, this.times, Math.pow(this.xtimes * 1, i)][this.tabIndex]
    },
    traceIssueListCb () {
      this.generateData()
    },
    generateData () {
      let j = this.issueList.findIndex(i => i.issue === this.issue)
      let k = j + this.count * this.cspan
      this.data = this.issueList.slice(j, k).filter((x, i) => i % this.cspan === 0).map((x, i) => {
        return Object.assign({}, {
          issue: x.issue,
          times: this.getTimesForEachIssue(i),
          saleend: x.saleend
        })
      })
    },
    setTimesArray () {
      if (this.tabIndex === 0) {
        let timesArray = this.getTimesArray(this.times, this.profit / 100, this.count, this.NA.a, this.NA.b)
        this.timesArray = timesArray.length === this.count ? timesArray : []
        if (this.timesArray.length !== this.count) {
          this.__toast('无法达到该利润率')
        }
      }
    },
    getTimesArray (min, rate, len, capital, reward) {
      let temp = new Array(len).fill(0)
      let result = []
      temp.every((n, i) => {
        let T = result.reduce((a, b) => a + b, 0)
        let N = Math.ceil((T * capital + T * capital * rate) / (reward - capital - rate * capital))
        if (reward - capital - rate * capital < 0) {
          return false
        } else {
          result[i] = Math.max(N, min)
          return true
        }
      })
      return result
    },
    _getTrace () {
      return {
        // 追号类型，1-同倍，2-翻倍，3-利润率
        task_type: [3, 1, 2][this.tabIndex],
        task_stop: this.local.$stopWhenUwin ? 1 : 0,
        task_begin: this.issue,
        task_double_times: this.xtimes,
        task_min_rate: this.profit / 100,
        task_money: this.Amt,
        items: this.data.map(x => {
          return Object.assign({}, x, {saleend: undefined})
        })
      }
    },
    __getBookingArgs () {
      return {
        gameid: this.id,
        issue: this.issue,
        totalnums: this.NA.n,
        totalmoney: this.NA.a,
        // 追号为2
        type: 2,
        isusefree: Number(!!this.local.$usexycoin),
        isJoinPool: 0,
        trace: JSON.stringify(this._getTrace()),
        items: JSON.stringify(this.local.$car.map(x => {
          return Object.assign({}, x, {mido: undefined, dp: undefined, cpoints: undefined, bonuses: undefined, up_: undefined, id: undefined, nc: undefined})
        })),
      }
    },
    booking () {
      this.$.post(api.booking, this.__getBookingArgs()).then(this.clear)
    },
    clear () {
      this.__setLocal({$car: []})
      this.__back()
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.chase
  table
    table-layout fixed
  .null_scroll
    top calc(var(--f7-navbar-height) + var(--f7-toolbar-height))
    left 0
    right 0
  .page-content
    padding-top calc(var(--f7-navbar-height) + var(--f7-toolbar-height) + 250px)
  &.tabIndex_0
  &.tabIndex_2
    .page-content
      padding-top calc(var(--f7-navbar-height) + var(--f7-toolbar-height) + 290px)
  
  .border-gray
    border 1px solid #efefef
    
</style>
