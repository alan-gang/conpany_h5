<template lang="pug">
.signinsuccess.p_r.bgc_f.r_15.pd_20
  f7-link.p_a.p_r_5.p_t_5(icon-f7="close" color="gray" icon-size="30px" popup-close="#signinsuccess")
  .t_c
    .w_100.h_70.inlb
    .c_0.ft_b.mt_10 &nbsp;&nbsp;签到成功！

  f7-list
    f7-list-item(v-for=" (x, i) in data " :key="i" :title="x")
      f7-button(slot="after" popup-close="#signinsuccess" @click=" __go('/promo/', {props: {tabid: '#gift'}} ) ") 查看礼品箱


</template>

<script>
import config from '@/config'
export default {
  mixins: [config],
  components: {
  },
  name: 'signinsuccess',
  props: [],
  data () {
    return {
      data: ['2元礼金已发放', '刮刮卡10张已发放'],
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
.signinsuccess
  .w_100
    bg("~src/assets/signin/13@2x.png")
    
</style>
