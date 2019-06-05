<template lang="pug">
f7-page.withdraw_record_detail
  f7-navbar(title="提现记录详情" back-link)
  .timeline
    .timeline-item(v-for=" (x, i) in data " :key="i")
      //- .timeline-item-date
      .timeline-item-divider(:class=" {'bgc_p': x.done === -1, 'bgc_e': x.done === 0, 'bgc_s': x.done > 0 } ")
      .timeline-item-content.wp_100
        .timeline-item-inner
          //- .timeline-item-title  {{ x.n }}
          .timeline-item-subtitle {{ x.n }}
          .timeline-item-time(v-show=" v['step' + (i + 1) + 'Time'] && v['step' + (i + 1) + 'Time'] !== '0000-0-00 00:00:00' ") {{ v['step' + (i + 1) + 'Time'] }}
          .timeline-item-text {{ v.description }}

  f7-button.mg_10(fill large href="/me/withdraw/") 再次提现

  
</template>

<script>
import config from '@/config'
export default {
  mixins: [config],
  components: {
  },
  name: 'withdraw_record_detail',
  props: ['v'],
  data () {
    // 是否已审核（1：待审核(新申请)；2：审核失败(风控审核失败或财务审核失败)；3：出款中(审核通过，准备出款)；4：出款成功(出款成功)；5出款失败(出款失败)）
    let step = this.v.isverify
    if (step === 4) step = 5
    else if (step === 5) step = 4
    return {
      data: [
        {n: '提现申请', done: 1},
        {n: '审核', done: step - 2},
        {n: '出款', done: step - 4},
        {n: '完成', done: step - 4},
      ]
    }
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
.withdraw_record_detail
  .timeline-item:nth-child(2)
  .timeline-item:nth-child(3)
    .timeline-item-divider
      &.bgc_p + .timeline-item-content .timeline-item-subtitle
        &:after
          content '中'
      &.bgc_s+.timeline-item-content .timeline-item-subtitle
        &:after
          content '成功'
      &.bgc_e + .timeline-item-content .timeline-item-subtitle
        &:after
          content '失败' 
</style>
