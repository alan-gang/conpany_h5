<template lang="pug">

f7-page.game_all_7
  f7-card(v-for=" (v, i) in data " :key=" i ")
    f7-card-content.hlh_70._bg(:class=" [v.nid, v.plat] ")
      span.c_f {{ v.n }}

  


</template>

<script>
import config from '@/config'
import og from '@/gm/og'
export default {
  mixins: [config],
  components: {
  },
  name: 'game_all_7',
  props: [],
  data () {
    return {
    }
  },
  computed: {
    data () {
      return og.filter(x => x.gn === '体育')
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
