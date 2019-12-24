<template lang="pug">

f7-page.game_all_1.text-color-white


  template(v-if=" user.myFavour && user.myFavour[0] ")
    f7-card.a.r_8
      f7-card-header.no-border.bgg.r_8._favour(valign='middle' @click.native=" fs = !fs ")
        .card-header.no-border.aa.pd_0
          f7-link._icon._favour(icon-f7=" home " icon-size="60px")
          .aaa.pl_10
            p 最近常玩
            p.ft_14 {{ get3thNamesOfFavour().join('...') }}
        f7-link.f_r(f7="play_fill" size="16px" :class=" {open: fs} ")


      f7-card-content.ab.o_h(:class=" {'mh_0 pd_0': !fs} ").text-color-black
        .c.inlb.t_c(v-for=" (v, i) in g.filter(x => x.favour) ")
          f7-card.mg_5
            .collect_action(@click=" local.cgs.indexOf( ',' + v.id + ',') === -1 ? __setLocal({cgs: ',' + v.id + ',' + local.cgs.replace(',' + v.id + ',', '')}) : __setLocal({cgs: local.cgs.replace(',' + v.id + ',', '')}) " :class=" {collected: local.cgs.indexOf(','+ v.id + ',') !== -1 }")
            f7-card-content.ca.pl_0.pr_0.pt_0(@click.native=" __go('/game/play/', {props: v}) ")
              f7-link._icon(:class=" '_gid' + v.id " icon-f7=" home " icon-size="60px")
              .ft_12 {{ v.n }}


  f7-card.a.r_8(v-for=" (i, gn) in gns " :key="i.c")
    f7-card-header.no-border.bgg.r_8(:class="i.c" valign='middle' @click.native=" i.show = !i.show")
      .card-header.no-border.aa.pd_0()
        f7-link._icon(:class="i.c" icon-f7=" home " icon-size="60px")
        .aaa.pl_10
          p {{ gn }}
          p.ft_14 {{ get3thNames(gn).join('...') }}
      f7-link.f_r(f7="play_fill" size="16px" :class=" {open: i.show} ")


    f7-card-content.ab.o_h(:class=" {'mh_0 pd_0': !i.show} ").text-color-black
      .c.inlb.t_c(v-for=" (v, i) in g.filter(x => x.gn === gn) ")
        f7-card.mg_5
          .collect_action(@click=" local.cgs.indexOf( ',' + (v.id || v.nid) + ',') === -1 ? __setLocal({cgs: ',' + (v.id || v.nid) + ',' + local.cgs.replace(',' + (v.id || v.nid) + ',', '')}) : __setLocal({cgs: local.cgs.replace(',' + (v.id || v.nid) + ',', '')}) " :class=" {collected: local.cgs.indexOf(','+ (v.id || v.nid) + ',') !== -1 }")
          f7-card-content.ca.pl_0.pr_0.pt_0(@click.native=" v.id ? __go('/game/play/', {props: v}) : __go('/outer/', {props: v}) ")
            f7-link._icon(:class=" '_gid' + (v.id || v.nid) " icon-f7=" home " icon-size="60px")
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
      gns: gns,
      // favours show ?
      fs: false,
    }
  },
  computed: {
    g () {
      return g.filter(x => !x.hide)
    }
  },
  created () {
    this.init()
  },
  methods: {
    // init favour games
    init () {
      this.g.forEach(x => (x.favour = false))
      this.user.myFavour.forEach(x => ((this.g.find(y => y.id * 1 === x.lotteryId) || {}).favour = true))
    },
    get3thNames (gn) {
      return this.g.filter(x => x.gn === gn).slice(0, 3).reduce((p, x, i) => {
        p.push(x.n)
        return p
      }, [])
    },
    get3thNamesOfFavour () {
      return this.g.filter(x => x.favour).slice(0, 3).reduce((p, x, i) => {
        p.push(x.n)
        return p
      }, [])
    },
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
    &._favour
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
