<template lang="pug">
f7-page.bonus(:page-content="false")
  f7-navbar(title="奖金详情" back-link)
  div.head
    a._icon._bonusicon.link.color-black
      i.icon.f7-icons home
    br
    strong it0k011
    br
    span 昵称：浆糊点击

  f7-toolbar(tabbar top scrollable style="transform: none")
    f7-link(tab-link tab-link-active href="#bonus_1")
      f7-button 快投30秒
    f7-link(tab-link href="#bonus_2" )
      f7-button 腾讯分分彩
    f7-link(tab-link href="#bonus_3" )
      f7-button 新疆时时彩
    f7-link(tab-link href="#bonus_4" )
      f7-button 上海时时乐
    f7-link(tab-link href="#bonus_5" )
      f7-button 北京PK10

  f7-tabs(animated swipeable)
    f7-tab#bonus_1(tab-active @tab:show=" __tabShow ")
      bonus1
    f7-tab#bonus_2(@tab:show=" __tabShow ")
      bonus2
    f7-tab#bonus_3(@tab:show=" __tabShow ")
      bonus3
    f7-tab#bonus_4(@tab:show=" __tabShow ")
      bonus4
    f7-tab#bonus_5(@tab:show=" __tabShow ")
      bonus5
</template>

<script>
import config from '@/config'
import bonus1 from '@/views/me/bonus/1'
import bonus2 from '@/views/me/bonus/2'
import bonus3 from '@/views/me/bonus/3'
import bonus4 from '@/views/me/bonus/4'
import bonus5 from '@/views/me/bonus/5'
// import api from '@/api'
export default {
  mixins: [config],
  components: {
    bonus1,
    bonus2,
    bonus3,
    bonus4,
    bonus5
  },
  name: 'bonus',
  props: [],
  data () {
    return {
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
  .bonus
    .head
      margin-top 0.8rem
      height 2.8rem
      background linear-gradient(to right, #ff8131, #ff5429)
      text-align center
      ._bonusicon
        margin-top 0.7rem
        transform scale(4)
      strong
        display inline-block
        font-size 0.27rem
        color #fff
        margin-top 0.55rem
      span
        font-size 0.22rem
        color #ffb296
    .toolbar
      margin-top 2.7rem
      .tab-link
        .button
          font-size 0.27rem
          color #333
        &.tab-link-active
          .button
            color #ff5429
            border-bottom 0.05rem solid #ff5429
            border-radius 0
            padding-bottom 0.2rem
</style>
