<template lang="pug">

.adjustpoints.p_a.z_9502
  .popup-backdrop.backdrop-in(@click="$emit('hideadjustpoints', false)")
  .p_a.z_9502.content.bg-color-white.r_5.pl_15.pr_15
    .pd_10
      .pb_10
        span 奖金: 
        span(:class=" { 'text-color-deeporange':  !isOverMax, 'text-color-red': isOverMax } ") {{ !isOverMax ? bonusRangeR.join('-') : '奖金受限' }}
        span.pd_10
        span 返点: 
        span.text-color-deeporange {{ (v * 100)._f1() }}%
      .pb_10
        f7-row(no-gap)
          f7-col(width="10")
            .r_5.o_h.w_40.color-theme-gray(@click=" $f7.range.setValue('#point_range', pp) ")
             .stepper-button-minus.h_30
          f7-col.pl_15.pr_15(width="80")
            f7-range#point_range(:min=' dp.minpoint * 100 ', :max=' dp.maxpoint * 100 ', :step='0.1', :value='v * 100', @range:change=" $emit('adjust:point', ($event / 100)._f3() * 1 ) ")
          f7-col(width="10")
            .r_5.o_h.w_40.color-theme-gray(@click=" $f7.range.setValue('#point_range', np) ")
              .stepper-button-plus.h_30
    
    
</template>

<script>
import config from '@/config'
import point from './point'
export default {
  mixins: [config, point],
  components: {
  },
  name: 'adjustpoints',
  props: ['dp', 'v', 'bonusRange'],
  data () {
    return {
    }
  },
  computed: {
    bonusRangeR () {
      return this.bonusRange[1] ? [Math.min(...this.bonusRange), Math.max(...this.bonusRange)] : this.bonusRange
    },
    isOverMax () {
      return (this.bonusRangeR[1] || this.bonusRangeR[0]) > this.cache.dzMaxPrize
    },
    np () {
      return Math.min((this.local.$p + 0.01) * 100, this.dp.maxpoint * 100)
    },
    pp () {
      return Math.max((this.local.$p - 0.01) * 100, this.dp.minpoint * 100)
    },
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
urls = {
  slider: '~src/assets/play/game_icon_slidder'
}
.adjustpoints
  top var(--f7-navbar-height)
  right 0
  left 0
  bottom 0
  // .z_9501
  .content
    top 50%
    left 50%
    width 70%
    transform translateX(-50%) translateY(-50%)
  
  .range-knob-wrap .range-knob
    bg(urls.slider + '@2x.png')
  
    
</style>
