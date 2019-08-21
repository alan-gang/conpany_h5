<template lang="pug">

span.info_luck_numbers(:class=" t ")
  .inlb.p_r(v-for=" (v, i) in luckn " :key="i" :class=" ['n_' + v, 'i_' + i] ")
    span.decorations
      span.ani_pic
      span.ani_text
      span.ani_line

    span.ball.hlh_25.w_25.mg_2.rp_50.bg-color-deeporange.inlb.t_c.text-color-white {{ v }}
  
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

<!-- 欢乐生肖 -->
<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
prefix = '~src/assets/play/play_id_1/icon_'
prefixtext = '~src/assets/play/play_id_1/iconwithtext_'
.play_id_1 .info_luck_numbers
  .ball
    margin-left 18px
    z-index 1
    position relative
    
  .ani_pic
    width 25px
    height 100%
    position absolute
    left 0
  
  .ani_text
    width 15px
    height 15px
    position absolute
    right 20px
    bottom 5px
    z-index 2
  
  .ani_line
    width 30px
    height 2px
    position absolute
    right 10px
    bottom 0
    z-index 2
  
  

    
  for v, k in  mouse tiger rabbit lonng snake horse sheep monkey chicken pig
    .n_{k} .ani_pic
      bg(prefix + v + '@2x-min.png')
    
    .n_{k} .ani_text
      bg(prefixtext + v + '@2x-min.png')
  
  for v, k in  #d874c9 #d6b73d #67afd3 #d75e5e #75cd6e
    .i_{k} .ani_line
      background-color v

      
</style>