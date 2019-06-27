<template lang="pug">

f7-page.game(:page-content="false")
  f7-navbar.no-border(style="z-index: 5001")
    f7-nav-left
      f7-link.text-color-black.with-underline-active(tab-link tab-link-active href="#game_all") 全部
      f7-link.text-color-black.with-underline-active(tab-link href="#game_best" ) 精选
      f7-link.text-color-black.with-underline-active(tab-link href="#game_new" ) 最新
      f7-link.text-color-black.with-underline-active(tab-link href="#game_collect" ) 收藏

    f7-nav-right
      f7-link.n.w_50.pl_15.ft_14(color="white" @click=" __setCall({fn: '__showTab', args: '#game_all_3'}) ") 特色

  f7-tabs
    f7-tab#game_all.tab-active(@tab:show=" tabShow ")
      gameall
    f7-tab#game_best(@tab:show=" tabShow ")
      gamebest
    f7-tab#game_new(@tab:show=" tabShow ")
      gamenew
    f7-tab#game_collect(@tab:show=" tabShow ")
      gamecollect


</template>

<script>
  // 游戏
import gameall from '@/views/game/all'
import gamebest from '@/views/game/best'
import gamenew from '@/views/game/new'
import gamecollect from '@/views/game/collect'
import config from '@/config'
export default {
    mixins: [config],
    components: {
      gameall,
      gamebest,
      gamenew,
      gamecollect,
    },
    name: 'game',
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
urls = {
  _n: '~src/assets/play/game_btn_postion',
}

.game .navbar-inner .right .n
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
