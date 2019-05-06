<template lang="pug">

f7-page.game_all_1.text-color-white
  f7-card.a.r_8(v-for=" (i, gn) in gns " :key="i.c")
    f7-card-header.no-border.bgg.r_8(:class="i.c" valign='middle' @click.native=" i.show = !i.show")
      .card-header.no-border.aa.pd_0()
        f7-icon._icon(:class="i.c" f7=" home " size="60px")
        .aaa.pl_10
          p {{ gn }}
          p.ft_14 {{ get3thNames(gn).join('...') }}
      f7-icon.f_r(f7="play_fill" size="16px" :class=" {open: i.show} ") 


    f7-card-content.ab.o_h(:class=" {'mh_0 pd_0': !i.show} ").text-color-black
      .c.inlb.t_c(v-for=" (v, i) in g.filter(x => x.gn === gn) ")
        f7-card
          .collect_action(@click=" local.cgs.indexOf( ',' + v.id + ',') === -1 ? __setLocal({cgs: ',' + v.id + ',' + local.cgs.replace(',' + v.id + ',', '')}) : __setLocal({cgs: local.cgs.replace(',' + v.id + ',', '')}) " :class=" {collected: local.cgs.indexOf(','+ v.id + ',') !== -1 }")
          f7-card-content.ca.pl_0.pr_0.pt_0(@click.native=" __go('/game/play/', {props: v}) ")
            f7-icon._icon(:class=" '_gid' + v.id " f7=" home " size="60px")
            .ft_12 {{ v.n }}
      




  


</template>

<script>
import config from '@/config'
import g from '@/gm/g'
// import api from '@/api'
export default {
  mixins: [config],
  components: {
  },
  name: 'game_all_1',
  props: [],
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
    get3thNames (gn) {
      return this.g.filter(x => x.gn === gn).slice(0, 3).reduce((p, x, i) => {
        p.push(x.n)
        return p
      }, [])
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.game_all_1
  .aa
    justify-content left
    &:after
      display none
  .f_r.icon
    transform rotateZ(90deg)
    &.open
      transform rotateZ(-90deg)
  .bgg
    
    bgg(90deg, rgb(255,187,36), rgb(247,143,28))
    &._ssc
      bgg(90deg, rgb(255,187,36), rgb(247,143,28))
    &._pk10
      bgg(90deg, rgb(78,177,254), rgb(80,107,255))
    &._115
      bgg(90deg, rgb(252,132,79), rgb(255,74,92))
    &._k3
      bgg(90deg, rgb(50,217,106), rgb(8,192,160))

  .c
    margin 0
    width 33.33%
  .ca
  .bgg
    &:active
      opacity .6
    
</style>
