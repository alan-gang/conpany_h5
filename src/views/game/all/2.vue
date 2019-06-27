<template lang="pug">

f7-page.game_all_2
  f7-card(v-for=" (v, i) in data " :key=" i ")
    .collect_action(@click=" local.cgs.indexOf( ',' + v.nid + ',') === -1 ? __setLocal({cgs: ',' + v.nid + ',' + local.cgs.replace(',' + v.nid + ',', '')}) : __setLocal({cgs: local.cgs.replace(',' + v.nid + ',', '')}) " :class=" {collected: local.cgs.indexOf(','+ v.nid + ',') !== -1 }")
    f7-card-content.hlh_70._bg(:class=" [v.nid, v.plat] " @click.native=" __go('/outer/', {props: v}) ")
      span.c_f {{ v.n }}

  


</template>

<script>
import config from '@/config'
import og from '@/gm/og'
export default {
  mixins: [config],
  components: {
  },
  name: 'game_all_2',
  props: [],
  data () {
    return {
    }
  },
  computed: {
    data () {
      return og.filter(x => x.gn === '棋牌')
    }
  },
  methods: {
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
    
</style>
