<template lang="pug">

.gamemenu.p_a
  .popup-backdrop(@click="$emit('sm', false)" :class=" {'backdrop-in': slideDown} ")
  .a.pd_10.page-content.p_a.bg-color-white.z_9501(:class=" {slide_down: slideDown} ")

    .hlh_30
      span.text-color-deeporange 近期玩法
      span.f_r
        f7-checkbox(name=" sr " :checked=" local.sr " @click=" __setLocal({sr: !local.sr}) ")
        span(@click=" __setLocal({sr: !local.sr}) ")  在投注页展示
    
    
    .rps
      f7-row.j_s(v-if="rps[0]")
        f7-col.pr_5(width='33' v-for=" (v, i) in rps " :key="i" @click=" $emit('mid', v.id) && $emit('sm', false) ")
          f7-button.mt_2.mb_2(fill round :color=" mid !== v.id ? 'gray' : 'deeporange'  " :class=" mid !== v.id ? 'text-color-black' : 'text-color-white'  ") {{ v.n }}

      .pd_5.text-color-gray.ft_12.t_c.no_more.p_r 暂无近期玩法

    .cps.t_c
      p.text-color-deeporange.t_l 全部玩法
      f7-row.j_s(no-gap )
        template(v-for=" (v, i) in gns ")
          f7-col.pr_2(width='25' @click=" cgn = (cgn === v ? '' : v ) " :class=" {active: cgn === v} ")
            f7-button.mt_1.mb_1.r_0(fill :color=" cgn === v ? 'orange' : 'gray' ") {{ v }}

          f7-col.pl_15.pr_15.mr_2(width="100" v-if=" (i + 1) === gns.length || (i + 1) % 4 === 0 ")
            template(v-for=" (l, j) in clns ")
              p.t_l.text-color-gray {{ l }}
              f7-row.j_s(v-if=" cgnps.filter(x => x.ln === l) ")
                f7-col.pr_5.pl_5(width='33' :key="k" v-for=" (n, k) in cgnps.filter(x => x.ln === l) " @click=" $emit('mid', n.id) && $emit('sm', false) ")
                  f7-button.mt_2.mb_2(fill round :color=" mid !== n.id ? 'white' : 'deeporange'  " :class=" mid !== n.id ? 'text-color-black' : 'text-color-white'  ") {{ n.n }}
            .pt_15




    
</template>

<script>
import config from '@/config'
import m from '@/gm/m'

export default {
  mixins: [config],
  components: {
  },
  name: 'gamemenu',
  props: ['sm', 't', 'id', 'mid'],
  data () {
    return {
      slideDown: false,
      m: m[this.t],
      cgn: '',
    }
  },
  created () {
  },
  computed: {
    // 当前游戏的所有玩法
    cps () {
      return this.m.filter(x => x.show)
    },
    // 最近玩法
    rps () {
      return this.local.rps.split(',').filter(x => this.cps.find(y => y.id === x.trim())).slice(0, 10).map(x => {
        return this.cps.find(y => y.id === x.trim())
      }).slice(0, 6)
    },
    // 玩法大组
    gns () {
      return this.cps.reduce((p, x, i) => {
        if (p.indexOf(x.gn) === -1) {
          p.push(x.gn)
        }
        return p
      }, [])
    },
    // 当前玩法组的所有玩法
    cgnps () {
      return this.cps.filter(x => x.gn === this.cgn)
    },
    // 当前玩法小组
    clns () {
      return this.cgnps.reduce((p, x, i) => {
        if (p.indexOf(x.ln) === -1) {
          p.push(x.ln)
        }
        return p
      }, [])
    }
  },
  mounted () {
    setTimeout(() => {
      this.slideDown = true
    }, 0)
  },
  methods: {
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.gamemenu
  top var(--f7-navbar-height)
  right 0
  left 0
  bottom 0
  .popup-backdrop
    opacity 0
    transition all ease-in-out .2s
    
  .backdrop-in
    opacity 1
    
  .button:active
    opacity .6
    
  .button.color-gray
    background-color #e8e8e8
    color #333
    
  .a
    top -20%
    width 100%
    // max-height 0
    opacity 0
    transition all ease-in-out .2s
    height auto
    overflow-y auto
    &.slide_down
      opacity 1
      top 0
      max-height 60vh
  .no_more
    display none
    &:first-child
      display block
    &:after
    &:before
      content ''
      position relative
      display inline-block
      height 1px
      width 20%
      top -3px
      margin 0 15px
      background-color #efefef

  .col-100
    background-color rgba(254,136,75, .3)
    max-height 0
    overflow-y hidden
    transition max-height linear .1s
    margin-top -1px
    margin-bottom -1px
    

  .col-25.active
    .button
      border-top 2px solid var(--f7-color-deeporange)
      
      &.color-orange
        background-color rgba(254,136,75, .3)
        color var(--f7-color-deeporange)
        
    & ~ .col-100
      max-height 80vh
      & ~ .col-100
        max-height 0
    
</style>
