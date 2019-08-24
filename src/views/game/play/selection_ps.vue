<template lang="pug">
.game_selection_ps.pb_10
  f7-row.j_s
    f7-col.pd_1(v-for=" (v, i) in pss " :key=" i + Math.random() " width="20")
      f7-button.mt_5.pd_0(:class=" { 'bg-color-deeporange color-white': v.s, 'bg-color-white': !v.s } " @click=" toggle(v) ") {{ v.n[pi || 0] }}


</template>

<script>
import config from '@/config'
// import { C } from '@/gm/base'
export default {
  mixins: [config],
  components: {
  },
  name: 'game_selection_ps',
  props: ['dpss', 'ps', 'pi', 'min', 'single'],
  data () {
    return {
      pss: [
        {
          n: ['万位', '第一位'],
          v: 'w',
          s: false
        },
        {
          n: ['千位', '第二位'],
          v: 'q',
          s: true
        },
        {
          n: ['百位', '第三位'],
          v: 'b',
          s: true
        },
        {
          n: ['十位', '第四位'],
          v: 's',
          s: true
        },
        {
          n: ['个位', '第五位'],
          v: 'g',
          s: true
        }
      ],
    }
  },
  computed: {
    vcl () {
      return this.pss.filter(x => x.s).length
    },
    vc () {
      return this.pss.filter(x => x.s).map(x => {
        return x.v
      }).join(',')
    },
    // comb () {
    //   return this.min ? C(this.sl, this.min) : 0
    // },
  },
  watch: {
    vcl (n, o) {
      this.$emit('update:vcl', n)
    },
    vc (n, o) {
      this.$emit('update:vc', n)
    }
  },
  created () {
    this.init()
    this.$emit('update:vc', this.vc)
    this.$emit('update:vcl', this.vcl)
  },
  methods: {
    __initSelectionPS () {
      this.init()
    },
    init () {
      this.pss = this.dpss || this.pss
      this.pss.forEach((x, i) => {
        x.s = this.ps.indexOf(i) !== -1
      })
    },
    clear () {
      this.pss.forEach((x, i) => {
        x.s = false
      })
    },
    toggle (v) {
      if (this.single) this.clear()
      v.s = !v.s
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
// .game_selection_ps
    
</style>
