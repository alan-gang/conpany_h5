<template lang="pug">

  f7-page(:page-content="false" )
    //- f7-navbar(:innerClass=" 'navbar_of_' + $options.name ")
    f7-toolbar(bottom tabbar labels)
      f7-link(tab-link href='/', route-tab-id='home')
        i.icon.home
         span.h_o home
        span.tabbar-label 首页

      f7-link(tab-link href='/promo/', route-tab-id='promo')
        i.icon.promo
         span.h_o promo
        span.tabbar-label 优惠

      f7-link.floatup(tab-link href='/game/', route-tab-id='game')
        i.icon.game
         span.h_o game
        span.tabbar-label 游戏

      f7-link(tab-link href='/message/', route-tab-id='message')
        i.icon.mess
         span.h_o mess
        span.tabbar-label 消息

      f7-link(tab-link href='/me/', route-tab-id='me')
        i.icon.me
         span.h_o me
        span.tabbar-label 我的

    f7-tabs(routable)
      f7-tab#home
      f7-tab#promo
      f7-tab#game
      f7-tab#message
      f7-tab#me


</template>
<script>
  export default {
    name: 'Index',
    components: {
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~src/css/var.stylus'
  urls = {
    'home': '~src/assets/index/tab_home_',
    'promo': '~src/assets/index/tab_gift_',
    'game': '~src/assets/index/tab_games_',
    'mess': '~src/assets/index/tab_chat_',
    'me': '~src/assets/index/tab_profile_'
  }
  sizes = {
    'promo': auto 80%
  }
    
  .icon
    for k, v in  urls
      &.{k}
        bg(v+'nor@2x.png', sizes[k] || (auto 100%))

  
  .tab-link-active
    .icon
      for k, v in  urls
        &.{k}
          bg(v+'pre@2x.png', sizes[k] || (auto 100%))
  
    .tabbar-label
      color rgb(255,84,41)
      
</style>