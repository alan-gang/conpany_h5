<template lang="pug">

f7-page.game_new
  f7-card(expandable v-for=" (v, i) in cache.plats " :key="i")
    f7-card-content.pd_0
      //- ._bg._notbg.h_350(:class=" '_bgid' + v.id ")
      img.h_300.wp_100(:src=" v.picUrl "  )

      .more.pd_15
        h3.t_c.mg_0 {{v.gameName }}
        p {{ v.desc }}
        f7-button(fill large) 开始游戏
        .h_60



</template>

<script>
import config from '@/config'
export default {
  mixins: [config],
  components: {
  },
  name: 'game_new',
  props: [],
  data () {
    return {
      data: [
        // {id: 150, n: '微博5分彩'}
      ]
    }
  },
  computed: {
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
