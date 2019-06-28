<template lang="pug">

f7-page.promo(:page-content="false")
  f7-navbar.no-border(tabs)
    f7-nav-left
      f7-link.text-color-black.with-underline-active(tab-link tab-link-active href="#activity") 活动
      f7-link.text-color-black.with-underline-active(tab-link href="#gift" ) 礼品箱
      f7-link.text-color-black.with-underline-active(tab-link href="#coupon" ) 优惠券

    f7-nav-right
      f7-link.n.w_60.pl_15.ft_14(color="white" popover-open=".ggl") 刮刮乐

  f7-tabs(animated swipeable @tab:show=" tabShow ")
    f7-tab#activity.tab-active(@tab:show=" tabShow ")
      activity
    f7-tab#gift(@tab:show=" tabShow ")
      gift
    f7-tab#coupon(@tab:show=" tabShow ")
      coupon

  f7-popup.ggl.r_5.dialog-popup-auto-center.bgc_o.full_width
    ggl


</template>

<script>
import config from '@/config'
import activity from '@/views/promo/activity'
import gift from '@/views/promo/gift'
import coupon from '@/views/promo/coupon'
import ggl from '@/views/promo/ggl'
export default {
  mixins: [config],
  components: {
    activity,
    gift,
    coupon,
    ggl,
  },
  name: 'promo',
  props: ['tabid'],
  data () {
    return {}
  },
  created () {
  },
  mounted () {
    if (this.tabid) this.__setCall({fn: '__showTab', args: this.tabid})
  },
  methods: {
    tabShow (evt) {
      this.__setCall({fn: '__init_' + evt.target.id})
    },
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
urls = {
  _n: '~src/assets/play/game_btn_postion',
}

.promo .navbar-inner .right .n
  &:after
    content ''
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    z-index -1
    bg(urls._n + '@2x.png', 100% auto)
    transform scaleX(-1)    
</style>
