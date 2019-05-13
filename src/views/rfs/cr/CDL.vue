<template lang="pug">
f7-page
  f7-navbar(title="各期追号情况")
    f7-nav-right
      f7-link(icon-f7="close" icon-size="40px" popup-close=".cdl")
  .pd_10
    .mb_10.pd_10.ft_14.r_5.bgc_f(v-for=" (v, i) in data " :key="i" :class=" config.stateClass[getStatus(v)] === 'c_g' ? 'c_g' : '' ")
      .hlh_30.flex
        span 奖期：{{ v.issue }}期
        span(:class=" config.stateClass[getStatus(v)] ") {{ getStatus(v) }}
      .hlh_30.flex
        span 投注：{{ v.totalPrice }}元
        span(:class=" {'text-color-deeporange': v.bonus} ") {{ v.bonus ? v.bonus + '元' : '--' }}
     



</template>

<script>
import config from '@/config'
export default {
  mixins: [config],
  components: {
  },
  name: 'chase_detail_list',
  props: ['data'],
  data () {
    return {}
  },
  created () {
  },
  methods: {
    // @ android james
    getStatus (item) {
      if (item.status === 1) {
        if (item.isCancel > 0) {
          return '已撤单'
        } else {
          switch (item.isGetPrize) {
            case 0:
              return '未开奖'
            case 1:
              return '已中奖'
            default:
              return '未中奖'
          }
        }
      } else if (item.status === 0) {
        return '进行中'
      } else {
        return '已取消'
      }
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
</style>
