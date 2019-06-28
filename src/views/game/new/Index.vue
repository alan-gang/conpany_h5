<template lang="pug">

f7-page.game_new
  f7-card(expandable v-for=" (v, i) in cache.plats " :key="i")
    f7-card-content.pd_0
      f7-link.card-opened-fade-in.p_a.p_t_15.p_r_15(card-close='', color='white' icon-f7='close_round_fill')

      //- ._bg._notbg.h_350(:class=" '_bgid' + v.id ")
      img.h_300.wp_100(:src=" v.picUrl "  )

      .more.pd_15
        h3.t_c.mg_0 {{v.gameName }}
        p {{ v.desc }}
        f7-button(fill large @click=" v.gameType === 1 ? __go('/game/play/', {props: Object.assign({}, v, ag.find(x => x.id === v.gameId), {n: v.gameName})}) : __go('/outer/', {props: Object.assign({}, v, ag.find(x => x.pid === v.gameId), {n: v.gameName})}) ") 开始游戏
        .h_60



</template>

<script>
import config from '@/config'
import ag from '@/gm/ag'
export default {
  mixins: [config],
  components: {
  },
  name: 'game_new',
  props: [],
  data () {
    return {
      ag: ag,
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
