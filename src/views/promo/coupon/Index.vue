<template lang="pug">

f7-page.coupon(:page-content="false")
  f7-toolbar(tabbar top scrollable style="transform: none")
    f7-link(tab-link tab-link-active href="#coupon_1") 
      f7-button(round fill color="gray") 未使用
    f7-link(tab-link href="#coupon_2" ) 
      f7-button(round fill color="gray") 已使用
    f7-link(tab-link href="#coupon_3" ) 
      f7-button(round fill color="gray") 已失效

  f7-tabs(animated swipeable)
    f7-tab#coupon_1(tab-active @tab:show=" tabShow ")
      unusedcoupon
    f7-tab#coupon_2(@tab:show=" tabShow ")
      usedcoupon
    f7-tab#coupon_3(@tab:show=" tabShow ")
      invalidcoupon

</template>

<script>
import config from '@/config'
import unusedcoupon from '@/views/promo/coupon/unused'
import usedcoupon from '@/views/promo/coupon/used'
import invalidcoupon from '@/views/promo/coupon/invalid'
export default {
  mixins: [config],
  components: {
    unusedcoupon,
    usedcoupon,
    invalidcoupon,
  },
  name: 'coupon',
  props: [],
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    tabShow (evt) {
      this.__setCall({fn: '__init_' + evt.target.id})
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
      
</style>
