<template lang="pug">

f7-page.promo(:page-content="false")
  f7-navbar.no-border(tabs)
    f7-nav-left
      f7-link.text-color-black.with-underline-active(tab-link tab-link-active href="#activity") 活动
      f7-link.text-color-black.with-underline-active(tab-link href="#gift" ) 礼品箱
      f7-link.text-color-black.with-underline-active(tab-link href="#coupon" ) 优惠券

    f7-nav-right
      f7-link 刮刮乐

  f7-tabs(animated swipeable @tab:show=" tabShow ")
    f7-tab#activity.tab-active(@tab:show=" tabShow ")
      activity
    f7-tab#gift(@tab:show=" tabShow ")
      gift
    f7-tab#coupon(@tab:show=" tabShow ")
      coupon

</template>

<script>
import config from '@/config'
import activity from '@/views/promo/activity'
import gift from '@/views/promo/gift'
import coupon from '@/views/promo/coupon'
export default {
  mixins: [config],
  components: {
    activity,
    gift,
    coupon,
  },
  name: 'promo',
  props: [],
  data () {
    return {}
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
