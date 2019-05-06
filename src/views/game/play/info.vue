<template lang="pug">

.gameinfo(:class=" 'tab_' + ti ")
  .hlh_35.ft_16.pl_15.pr_15.bg-color-white
    span.text-color-gray
      span 第
      span {{ luck.issue }}
      span 期
    lucknumbers(:luckn=" luckn " :class="t")
    //- span
      span.ball.hlh_25.w_25.mg_2.rp_50.bg-color-deeporange.inlb.t_c.text-color-white(v-for=" (v, i) in luckn " :key="i") {{ v }}

  .hlh_25.ft_16.pl_15.pr_15.bg-color-white
    span.text-color-gray
      span 距
      span {{ issue }}
      span 期截止 
    span.text-color-deeporange {{ timming._toHMS() }}

  .hlh_30.pl_15.pr_15.ft_12.bgc_pc
    span.mr_10(v-for=" (v, i) in tabs " :key="i" @click=" ti = (ti === i ? -1 : i) ")
      span {{ v }}
      f7-icon(:class=" {rz_90: i !== ti, 'rz_-90': i === ti} " f7="play_fill" size="10px" style="width: 16px")

  .ft_12(v-show=" ti >= 0 ")
    .bg-color-white
      p.mg_0.pd_15.mh_45.o_y.t_s(v-show="ti === 0") {{ mido.d }}
      .p_r.inner-page( v-show=" ti === 1 " )
        lucks(:id="id" :mid="mid" :t="t")
      .p_r.inner-page( v-show=" ti === 2 " )
        orders(:id="id")
    .pb_15.bgc_pc

  







</template>

<script>
import config from '@/config'
import api from '@/api'
import m from '@/gm/m'
import lucks from './info_lucks'
import orders from './info_orders'
import lucknumbers from './info_luck_numbers'
export default {
  mixins: [config],
  components: {
    lucks,
    orders,
    lucknumbers,
  },
  name: 'gameinfo',
  props: ['id', 't', 'mid'],
  data () {
    return {
      luck: {
        code: '0,0,0,0,0,0',
        issue: '?????',
      },
      issue: '?????',
      timming: 10e2,
      tt: 0,
      tabs: ['玩法说明', '近期开奖', '近期投注'],
      ti: -1,
    }
  },
  computed: {
    mido () {
      return m[this.t].find(x => x.id === this.mid) || {}
    },
    // 当前游戏的所有玩法
    cps () {
      return m[this.t]
    },
    luckn () {
      return this.luck.code.split(',')
    },
  },
  watch: {
    ti (n, o) {
      this.__setCall({ fn: '__setTab_' + n })
    }
  },
  created () {
    this.init()
  },
  beforeDestroy () {
    clearTimeout(this.tt)
  },
  methods: {
    init () {
      this.recentlyCode()
      this.current()
    },
    recentlyCode () {
      this.$.myget(api.recentlyCode, {
        gameid: this.id,
        pageNum: 1,
        size: 1,
      }).then(({data: {items}}) => {
        if (items[0]) this.luck = items[0]
      })
    },
    current () {
      this.$.myget(api.current, {gameid: this.id}).then(({data: {issue, salestart, current, saleend}}) => {
        this.issue = issue
        this.timming = parseInt((saleend - current) / 1000)
        this.countDown()
        this.$emit('issue', issue)
      })
    },
    countDown () {
      if (this.timming) {
        this.timming--
        this.tt = setTimeout(this.countDown, 1000)
      } else {
        setTimeout(this.init, 1000)
      }
    },
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.gameinfo
  position absolute
  top var(--f7-navbar-height)
  left 0
  right 0
  z-index 9000
  .inner-page
    height 200px
    
    
    
    
</style>
