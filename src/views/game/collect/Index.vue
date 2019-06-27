<template lang="pug">

f7-page.game_collect
  f7-row.j_s(no-gap)
    f7-col.pd_0(width="33" v-for=" (v, i) in data " :key=" i ")
      f7-card.mg_5
        f7-card-content.h_60._bg._notbg.j_c.t_c(:class=" [v.nid, v.plat] " @click.native=" v.id ? __go('/game/play/', {props: v}) : __go('/outer/', {props: v}) ")
          f7-icon._icon(:class=" '_gid' + v.id " f7=" home " size="60px" v-if=" v.id ")
        
        .t_c.hlh_30.c_6 {{ v.n }}

  


</template>

<script>
import config from '@/config'
import ag from '@/gm/ag'
export default {
  mixins: [config],
  components: {
  },
  name: 'game_collect',
  props: [],
  data () {
    return {
    }
  },
  computed: {
    data () {
      return ag.filter(x => this.local.cgs.indexOf(',' + (x.id || x.nid) + ',') !== -1)
    }
  },
  methods: {
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.game_collect
  ._notbg._bg
    background-size auto 100%
    background-position right
    
</style>
