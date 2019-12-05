<template lang="pug">
.signin.p_r.mr_40.pt_30.pl_70
  f7-link._icon._sign_close.p_a.p_r_-20.p_t_-20(icon-size="50px" icon-f7=" home " popup-close="#signin")

  .hlh_32
    span.c_grass_green.ft_b 每日
    span.c_f.ft_b 签到
    f7-icon._icon._sign_square.mg_5(size="18" f7=" home ")
    span.c_ccc 3月您已经累计签到：
    span.c_grass_green 2 天

  .thisweek





    


</template>

<script>
import config from '@/config'
// import api from '@/api'

export default {
  mixins: [config],
  components: {
  },
  name: 'signin',
  props: [],
  data () {
    return {
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
    this.$f7.calendar.create({
      containerEl: '.thisweek',
      monthSelector: false,
      yearSelector: false,
    })
  },
  methods: {
  },
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.signin
  min-height 320px
  bg('~src/assets/signin/bg@2x.png')
    
</style>
