<template lang="pug">

f7-page.game_collect
  f7-block.t_9(v-if="!data[0]") 您暂时还没有任何收藏，快去收藏喜欢的游戏吧~
  f7-row.j_s(no-gap v-else)
    f7-col.pd_0(width="33" v-for=" (v, i) in data " :key=" i + Math.random() ")
      f7-card.mg_5
        f7-card-content.h_60._bg._notbg.j_c.t_c(:class=" [v.nid, v.plat] " @click.native=" v.id ? __go('/game/play/', {props: v}) : __go('/outer/', {props: v}) ")
          f7-icon._icon(:class=" '_gid' + v.id " f7=" home " size="60px" v-if=" v.id ")
          .p_a.p_r_0.p_t_0.pd_10(v-show="mode" @click.stop=" __setLocal({cgs: local.cgs.replace(',' + (v.id || v.nid) + ',', '')}) ")
            f7-icon(f7=" close_round_fill " color="gray" size="20px")

        
        .t_c.hlh_30.c_6 {{ v.n }}

  .p_f.z_1.p_b_10.wp_100.t_c(v-if=" data[0] ")
    f7-button.w_60.inlb(large @click=" mode = !mode ") {{ mode ? '完成' : '编辑' }}

  


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
      mode: false,
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
