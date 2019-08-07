<template lang="pug">
f7-page.aboutus
  f7-navbar(:innerClass=" 'navbar_of_' + $options.name " back-link="设置" title="关于我们")
  f7-list.mt_0.ft_16
    
    .bg-color-white
      .blocklog
      .pd_15.t_c 信游娱乐 v.2.0.3

    f7-list-item(title="版本信息" link="#" @click=" __go('/frame/', {props: {title: '版本信息', url: '/xy_activity/androidVersion.html'}}) ")

    f7-list-item(title="软件许可与服务协议" link="/license/")
    

</template>

<script>
import config from '@/config'
export default {
  mixins: [config],
  components: {
  },
  name: 'aboutus',
  props: [],
  data () {
    return {}
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
.aboutus
  .blocklog
    height 100px
    bg('~src/assets/index/tab_games_nor@2x.png', 80px)
    
</style>
