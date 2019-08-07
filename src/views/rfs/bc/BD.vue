<template lang="pug">
f7-page.book_detail
  f7-navbar(:innerClass=" 'navbar_of_' + $options.name " title="投注详情" back-link)
  .pd_10

    .r_5.bg-color-white.pd_10.mb_10
      .hlh_30
        span.c_0 {{ v.lotteryName }}
        .inlb.w_10
        span.c_9 {{ v.issue }}
      lucknumbers(:luckn=" v.prizeCode.split(',') " v-if=" t && v.prizeCode")

    .r_5.bg-color-white.pd_10.mb_10
      .hlh_30
        span.c_9 注单编号：
        span.c_0 {{ v.projectId }}
        f7-button.inlb.f_r(small round fill :color=" config.stateColor[v.stat] ") {{ config.orderState[v.stat] }}
      
      .hlh_30
        span.c_9 投注时间：
        span.c_0 {{ v.writeTime }}

      .hlh_30
        span.c_9 是否追号：
        span.text-color-deeporange {{ v.taskId ? '是' : '否' }}
        f7-button.inlb.f_r(:href=" '/rfs/bc/cd/' + v.taskId + '/' " small outline color=" red " v-if=" v.taskId ") 查看追号单>


    .r_5.bg-color-white.pd_10.mb_10
      .hlh_30
        span.c_9 投注玩法：
        span.c_0 {{ v.methodName }}
      
      .hlh_30.flex.justify-content-flex-start
        span.c_9.inlb 投注内容：
        f7-button.pd_0.c_0.mwp_70(popover-open=".oriCode") {{ v.oriCode }}


      .hlh_30
        span.c_9 是否单挑：
        span.text-color-deeporange {{ v.isLimitBonus ? '是' : '否' }}


      .hlh_30
        span.c_9 投注金额：
        span.c_0 {{ v.TotalPrice }}({{ v.countDesc }})

      .hlh_30
        span.c_9 投注返点：
        span.c_0 {{ v.userPoint }}

      .hlh_30
        span.c_9 中奖金额：
        span.text-color-deeporange {{ v.bonus }}

    f7-button(fill large @click=" g && __go('/game/play/', {props: g}) ") 去投注

    f7-button.mt_10(outline large @click=" cancelOrder(id, v) " v-if=" v.canCancel ") 撤单


  f7-popover.oriCode.r_5 
    .pd_10.w_b.mvh_60 {{ v.oriCode }}
  






  
</template>

<script>
import config from '@/config'
import api from '@/api'
import lucknumbers from '@/views/game/play/info_luck_numbers'
import g from '@/gm/g'

export default {
  mixins: [config],
  components: {
    lucknumbers,
  },
  name: 'book_detail',
  props: ['id'],
  provide: function () {
    return {
      t: () => this.t
    }
  },
  data () {
    return {
      v: {},
    }
  },
  computed: {
    t () {
      return (g.find(x => x.id === this.v.lotteryId) || {}).t_
    },
    g () {
      return Object.assign({}, g.find(x => x.id === this.v.lotteryId) || {}, {dmid_: this.v.methodId + ':' + this.v.codeType})
    },
  },
  created () {
    this.getDetail()
  },
  mounted () {
  },
  methods: {
    getDetail () {
      this.$.get(api.OrderDetail, {projectId: this.id}).then(({data}) => {
        this.v = data
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
</style>
