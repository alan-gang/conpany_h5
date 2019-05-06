<template lang="pug">

f7-page.game_all(:page-content="false")
  f7-toolbar(tabbar top scrollable style="transform: none")
    f7-link(tab-link tab-link-active href="#game_all_1") 
      f7-button(round fill color="gray") 彩票
    f7-link(tab-link href="#game_all_2" ) 
      f7-button(round fill color="gray") 棋牌
    f7-link(tab-link href="#game_all_3" ) 
      f7-button(round fill color="gray") 微游
    f7-link(tab-link href="#game_all_4" ) 
      f7-button(round fill color="gray") 真人
    f7-link(tab-link href="#game_all_5" ) 
      f7-button(round fill color="gray") 老虎机
    f7-link(tab-link href="#game_all_6" ) 
      f7-button(round fill color="gray") 电竞
    f7-link(tab-link href="#game_all_7" ) 
      f7-button(round fill color="gray") 体育
    f7-link(tab-link href="#game_all_8" ) 
      f7-button(round fill color="gray") 捕鱼

  f7-tabs(animated swipeable)
    f7-tab#game_all_1(tab-active @tab:show=" __tabShow ")
      gameall1
    f7-tab#game_all_2(@tab:show=" __tabShow ")
      gameall2
    f7-tab#game_all_3(@tab:show=" __tabShow ")
      gameall3
    f7-tab#game_all_4(@tab:show=" __tabShow ")
      gameall4
    f7-tab#game_all_5(@tab:show=" __tabShow ")
      gameall5
    f7-tab#game_all_6(@tab:show=" __tabShow ")
      gameall6
    f7-tab#game_all_7(@tab:show=" __tabShow ")
      gameall7
    f7-tab#game_all_8(@tab:show=" __tabShow ")
      gameall8

  


</template>

<script>
import config from '@/config'
import gameall1 from '@/views/game/all/1'
import gameall2 from '@/views/game/all/2'
import gameall3 from '@/views/game/all/3'
import gameall4 from '@/views/game/all/4'
import gameall5 from '@/views/game/all/5'
import gameall6 from '@/views/game/all/6'
import gameall7 from '@/views/game/all/7'
import gameall8 from '@/views/game/all/8'
// import api from '@/api'
export default {
  mixins: [config],
  components: {
    gameall1,
    gameall2,
    gameall3,
    gameall4,
    gameall5,
    gameall6,
    gameall7,
    gameall8,
  },
  name: 'game_all',
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
    
</style>
