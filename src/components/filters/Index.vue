<template lang="pug">
.s_d.p_a
  .popup-backdrop(@click=" close " :class=" {'backdrop-in': slideDown} ")
  .sd_content.page-content.p_a.bg-color-white.z_9501(:class=" {slide_down: slideDown} ")
    slot

</template>

<script>
import config from '@/config'
export default {
  mixins: [config],
  components: {
  },
  name: 'filters',
  props: [],
  data () {
    return {
      slideDown: false,
    }
  },
  created () {
  },
  mounted () {
    setTimeout(() => {
      this.slideDown = true
    }, 0)
  },
  methods: {
    __closeSD () {
      this.close()
    },
    close () {
      this.slideDown = false
      setTimeout(() => {
        this.$emit('sd', false)
      }, 200)
    }
  },
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.s_d
  // top var(--f7-navbar-height)
  top 0
  right 0
  left 0
  bottom 0
  .popup-backdrop
    opacity 0
    transition all ease-in-out .2s
    
  .backdrop-in
    opacity 1
    
  .sd_content
    top -20%
    width 100%
    // max-height 0
    opacity 0
    transition all ease-in-out .2s
    height auto
    overflow-y auto
    &.slide_down
      opacity 1
      top 0
      max-height 60vh
      
</style>
