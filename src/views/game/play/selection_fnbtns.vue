<template lang="pug">
.game_selection_fnbtns.pb_10
  f7-row.j_s
    f7-col.pd_1(v-for=" (v, i) in fnbtns_ " :key="i" width="20")
      f7-button.mt_5.pd_0.bg-color-white(:class=" { 'color-gray': v.i } " @click=" handler(v) ") {{ v.fns[v.i].n }}


</template>

<script>
import config from '@/config'
// import { C } from '@/gm/base'
export default {
  mixins: [config],
  components: {
  },
  name: 'game_selection_fnbtns',
  props: ['fnbtns'],
  data () {
    return {
      fnbtns_: Array(10).fill(0).map((x, i) => {
        return {
          i: 0,
          toggle: true,
          fns: [
            {n: '全' + i, fn: '__selectindexinrow', args: i},
            {n: '清' + i, fn: '__unselectindexinrow', args: i},
          ]
        }
      })
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
    this.fnbtns_ = this.fnbtns || this.fnbtns_
  },
  methods: {
    handler (v) {
      this.__setCall(v.fns[v.i])
      v.toggle && (v.i = (v.i ? 0 : 1))
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
// .game_selection_fnbtns
    
</style>
