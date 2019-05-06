<template lang="pug">

.game_bookbar.p_a.pd_14.z_9501.bg-color-white(:class=" {sa: sa, wn: n_ && dp} ")
  
  point(v-for=" (v, i) in cpoints " :key="i" v-bind=" {dp: v, i: i, mid: mid} " @update=" $set(bonuses, i, $event) ")

  .hlh_40.pl_15.pr_15.p_r
    f7-icon._icon._trash(f7=" home " color="gray" @click.native.stop=" __setCall({fn: '__clearSelection'}) ")
    span.pd_5
      span.text-color-gray |
    span.pd_5
      span.text-color-deeporange {{ n_ }}
      span  注 
      span.text-color-deeporange {{ m_._f3() }}
      span  元

    span.f_r(@click=" (Number(dp.maxpoint) > Number(dp.minpoint)) ? __setCall({fn: '__openadjustpoints'}) : __toast('无法调节返点信息') ")
      span(v-if=" dp ") 单注奖金 {{ bonusRange.join('-') }}
      f7-icon(f7=" chevron_right " color="gray" size="16px")

    span.p_a.pack.h_20.w_60.z_1(@click=" sa = !sa " :class=" { up: sa } ")
  
  .hlh_40.t_c.bgc_light_orange.text-color-gray(v-show="n_ && dp")
    span 最高可中奖
    span.text-color-deeporange  {{ wnm_ }} 
    span 元，最高可赢利
    span.text-color-deeporange  {{ wnp_ }} 
    span 元

  .pl_15.pr_15.pb_15
      .stepper.stepper-init.stepper-small.color-gray.v_m(data-wraps='true', data-autorepeat='true', data-autorepeat-dynamic='true', data-decimal-point='2', data-manual-input-mode='true')
        .stepper-button-minus
        .stepper-input-wrap
          input.inlb.v_m(type='number' v-model=" local.$t " min='1', max='10000', step='1')
        span.inlb.hp_100 倍
        .stepper-button-plus
      span.pd_5
      f7-button.w_40.inlb.mr_2(fill :color=" v.v === local.$ ? 'deeporange' : 'gray'  " v-for=" (v, i) in btns " :key="i" :class=" {'text-color-white': v.v == local.$} " @click=" __setLocal({$: v.v}) ") {{ v.n }}

  .pl_15.pr_15.pb_10
    f7-row(no-gap)
      f7-col.ft_12.text-color-gray(width="30")
        .inlb.pr_15(@click=" __$car.length && __go('/game/car/', {props: { id, n, mid }}) ")
          f7-icon._icon(:class=" {_bookcar: !__$car.length, _bookcar_a: __$car.length} " f7=" home " )
            f7-badge(color="red") {{ __$car.length }}
          div 购彩车
        .inlb.pr_15(@click=" n_ && __setCall({fn: '__addToCar'}) ")
          f7-icon._icon(:class=" {_addcar: !n_, _addcar_a: n_} " f7=" home ")
          div 添加

      f7-col.pl_5(width="20")
        f7-button.ft_18.action_button(fill :color=" n_ ? 'orange' : 'gray' " large @click=" n_ && allin ") 全押

      f7-col.pl_5(width="50")
        f7-button.ft_18.action_button(fill :color=" n_ ? 'deeporange' : 'gray' " large)
          div(style="line-height: 1; margin-top: 8px" @click=" n_ && __setCall({ fn: '__booking', args: undefined }) ")
            div 一键投注
            div.ft_12(v-if=" user.login ") 余额: {{ user.availableBalance }}

  
</template>

<script>
import config from '@/config'
import point from './point'
export default {
  mixins: [config],
  components: {
    point
  },
  name: 'game_bookbar',
  props: ['id', 'n', 't', 'mid', 'n_', 'wn_', 'up_', 'cpoints', 'dp'],
  inject: ['getmid_', 'getodds_'],
  data () {
    return {
      sa: false,
      btns: [
        {n: '元', v: 1},
        {n: '角', v: 0.1},
        {n: '分', v: 0.01},
        {n: '厘', v: 0.001},
      ],
      bonuses: [],
    }
  },
  computed: {
    bonusRange () {
      return this.bonuses[1] ? [Math.min(...this.bonuses), Math.max(...this.bonuses)] : this.bonuses
    },
    m_ () {
      return this.n_ * this.up_ * this.local.$t * this.local.$
    },

    wnm_ () {
      if (typeof this.wn_ === 'number') return this.bonuses[0] * this.wn_
      else if (typeof this.wn_ === 'object') {
        return this.wn_.reduce((p, x, i) => {
          p += x * this.bonuses[i]
          return p
        }, 0)
      }
    },
    wnp_ () {
      return this.wnm_ - this.m_
    },
  },
  watch: {
    m_ (n, o) {
      this.$emit('m_', n)
    },
    mid () {
      this.bonuses = []
    },
    bonusRange (n) {
      this.$emit('bonusRange', n)
    }
  },
  created () {
  },
  methods: {
    __setSA (args) {
      this.sa = args
    },
    allin () {
      this.$f7.dialog.confirm('您确定要使用<span class="text-color-deeporange">所有余额</span>来购买此注单？', '', () => {
        this.__setLocal({$: 0.001})
        this.local.$t = Math.max(Math.floor(this.user.availableBalance / (this.m_ / this.local.$t)), 1)
        // this.__setLocal({$t: Math.max(Math.floor(this.user.availableBalance / (this.m_ / this.local.$t)), 1)})
        this.__setCall({fn: '__booking'})
      })
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
urls = {
  pack: '~src/assets/play/game_icon_pack',
  packup: '~src/assets/play/game_icon_packup',
}
.game_bookbar ~ .page-content
  padding-bottom 40px
.game_bookbar.sa ~ .page-content
  padding-bottom 135px
.game_bookbar.sa.wn ~ .page-content
  padding-bottom 175px

  
.game_bookbar
  bottom 0
  left 0
  right 0
  height 40px
  transition height ease-in .1s
  &.sa
    height 135px
  &.sa.wn
    height 175px

.game_bookbar
  .hp_100
    padding 0 5px
    line-height 26px
    background-color #efefef
  .button.color-gray
    background-color #e8e8e8
    color #333
    &:active
      opacity .6
  .action_button.color-gray
    
    background-color #d8d8d8
    color #fff
  .pack
    top 0
    left 50%
    transform translateX(-50%)
    bg(urls.pack + '@2x.png')
    background-position top center
    &.up
      bg(urls.packup + '@2x.png')
    &:active
      opacity .6
    
</style>
