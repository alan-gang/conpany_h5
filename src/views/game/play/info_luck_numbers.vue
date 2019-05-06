<template lang="pug">

span.info_luck_numbers(:class=" t ")
  span.ball.hlh_25.w_25.mg_2.rp_50.bg-color-deeporange.inlb.t_c.text-color-white(v-for=" (v, i) in luckn " :key="i") {{ v }}
  
</template>

<script>
export default {
  components: {
  },
  name: 'info_luck_numbers',
  props: ['luckn'],
  inject: ['t'],
  data () {
    return {
    }
  },
  computed: {
  },
  created () {
  },
  beforeDestroy () {
  },
  methods: {
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.info_luck_numbers
  &.pk10 .ball
    height 20px
    width 20px
    line-height 20px
  
  &.kl8
    display inline-block
    width 180px
    height 100%
    line-height 1
    vertical-align middle
    
  &.kl8 .ball
    font-size 12px
    height 16px
    width 16px
    line-height 16px
    margin 1px
    
    
</style>
