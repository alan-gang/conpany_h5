<template lang="pug">

f7-page.game_all_4
  f7-card(v-for=" (v, i) in data " :key=" i ")
    f7-card-content.hlh_100._bg(:class=" [v.nid, v.plat] ")
    f7-card-footer {{v.n }}

  


</template>

<script>
import config from '@/config'
import og from '@/gm/og'
export default {
  mixins: [config],
  components: {
  },
  name: 'game_all_4',
  props: [],
  data () {
    return {
    }
  },
  computed: {
    data () {
      return og.filter(x => x.gn === '真人')
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
