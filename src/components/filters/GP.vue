<template lang="pug">
.game_pick.o_h
  .pl_10.pr_10.page_content_like
    template(v-for=" (v, gn) in gns ")
      .hlh_30.pl_10.pt_10.text-color-gray(:key="gn") {{ gn }}
      f7-row.j_s(no-gap)
        f7-col.pd_1(width="25" v-for=" (v, i) in g.filter(x => x.gn === gn) " :key="i")
          f7-button.ft_12.pd_0(:class=" {'bg-color-deeporange text-color-white': cache.gid === v.id, 'bgc_pc text-color-black': cache.gid !== v.id  } " @click=" change(v) ") {{ v.n }}
    .h_10

  .p_a.z_1.pd_10.bg-color-white
    f7-button.r_0(fill @click=" change({n: '全部彩种', id: ''}) ") 全部彩种






</template>

<script>
import config from '@/config'
import g from '@/gm/g'
export default {
  mixins: [config],
  components: {
  },
  name: 'game_pick',
  data () {
    let gns = g.reduce((p, x, i) => {
      if (!p[x.gn]) {
        p[x.gn] = {
          c: '_' + x.t_,
          show: false
        }
      }
      return p
    }, {})
    return {
      g: g,
      gns: gns,
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
    change (v) {
      this.__setCache({gid: v.id})
      this.$emit('g', v)
      this.close()
    },
    close () {
      this.$emit('done')
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.game_pick
  .page_content_like
    height 60vh
    padding-bottom 100px

  .p_a
    bottom 0
    left 0
    right 0
  
</style>
