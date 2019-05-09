<template lang="pug">

.game_selection_row.mb_5

  f7-row(no-gap)
    
    //- 选号模式
    template(v-if=" row.t === 'number' ")
      //- 左右结构(默认)
      template(v-if=" !row.struct ")
        f7-col.n.hlh_40.t_c.pr_5(width="15") 
          span.text-color-white(:class=" {ft_12: row.n.length > 2} ") {{ row.n }}
        f7-col.vs(width="85")
          f7-row(no-gap :class=" getRowClass() ")
            .pb_2(v-for=" (v, i) in vs " :key="i" @click=" toggle(v) " :class=" getBallWrapColClass(v) ")
              .v.t_c
                f7-button.ball.hlh_40.inlb.pd_0(:class="getBallClass(v)") 
                  span {{ v.n }}
      //- 混合结构
      template(v-if=" row.struct === 'mixin' ")
        f7-col.vs(width="100")
          f7-row(no-gap :class=" getRowClass() ")
            f7-col.n.hlh_40.t_c.pr_5(width="16") 
              span.text-color-white(:class=" {ft_12: row.n.length > 2} ") {{ row.n }}
            .pb_2(v-for=" (v, i) in vs " :key="i" width="16" @click=" toggle(v) " :class=" getBallWrapColClass(v) ")
              .v.t_c
                f7-button.ball.hlh_40.inlb.pd_0(:class="getBallClass(v)") 
                  span {{ v.n }}

      //- 左右结构
      template(v-if=" row.struct === 'following' ")
        f7-col.vs(width="100")
          f7-row(:class=" getRowClass() ")

            .pb_2(v-for=" (v, i) in vs " :key="i"  :class=" v.col || row.col || 'col-45' ")
              .v.t_c.color-theme-gray
                f7-segmented(round)
                  f7-button.flex-shrink-2.hlh_40.pd_0.ball.inlb.pd_0(outline @click=" toggle(v) " :class=" getFollowBallClass(v) ") 
                    span {{ v.n }}
                  f7-button.flex-shrink-2.hlh_40.pd_0(outline) 
                    .v_odd {{ v.odd }}
                  f7-button.flex-shrink-2.hlh_40.pd_0(outline @click=" toggle(v) ") 
                    .v_t.pl_5.pr_5.color-theme-deeporange
                      f7-checkbox(:checked=" v.s " )

                  f7-button.hlh_40.pd_0(outline v-if="v.tails")
                    .hlh_40.pd_0.ball.inlb.pd_0.w_40(v-for=" (x, j) in v.tails " :key="j"  :class=" [ x._toC() ] ") {{ x }}


    //- 选号模式-快速投注
    template(v-else-if=" row.t === 'fnumber' ")
      //- 混合结构
      template(v-if=" !row.struct")
        f7-col.hlh_40.t_c(v-if="row.n" width="100") {{ row.n }} @ {{ row.odd }}
        f7-col.vs(width="100")
          f7-row(no-gap :class=" getRowClass() ")
            .pb_2(v-for=" (v, i) in vs " :key="i" width="20" @click=" toggle(v) " :class=" getBallWrapColClass(v) ")
              .v.t_c
                f7-button.ball.hlh_40.inlb.pd_0(:class="getBallClass(v)") 
                  span {{ v.n }}


    //- 输入倍数模式
    template(v-else-if=" row.t === 'times' ")
      //- 上下结构(默认)
      template(v-if=" !row.struct ")
        f7-col.hlh_40.t_c(v-if="row.n" width="100") {{ row.n }}
        f7-col.vs(width="100")
          f7-row(:class=" getRowClass() ")

            .pb_2(v-for=" (v, i) in vs " :key="i"  :class=" v.col || row.col || 'col-16' ")
              .v.t_c
                f7-button.ball.hlh_40.inlb.pd_0(:class="getBallClass(v)" @click=" toggle(v) ") 
                  span {{ v.n }}
                .v_odd.hlh_20 {{ v.odd }}
                .v_t.pl_5.pr_5
                  f7-input.hlh_30.border-gray(validate require outline pattern="[0-9]*")
                    input.hlh_30.t_c.text-color-deeporange(type="number" v-model=" v.t " style="padding: 0 5px" @change=" v.s = Number(v.t) && Number(v.t) > 0 ")

      //- 左右结构
      template(v-if=" row.struct === 'following' ")
        f7-col.hlh_40.t_c(v-if="row.n" width="100") {{ row.n }}
        f7-col.vs(width="100")
          f7-row(:class=" getRowClass() ")

            .pb_2(v-for=" (v, i) in vs " :key="i"  :class=" v.col || row.col || 'col-45' ")
              .v.t_c.color-theme-gray
                f7-segmented(round)
                  f7-button.flex-shrink-2.hlh_40.pd_0.ball.inlb.pd_0(outline @click=" toggle(v) " :class=" getFollowBallClass(v) ") 
                    span {{ v.n }}
                  f7-button.flex-shrink-2.hlh_40.pd_0(outline) 
                    .v_odd {{ v.odd }}
                  f7-button.flex-shrink-2.hlh_40.pd_0(outline) 
                    .v_t.pl_5.pr_5
                      f7-input(validate require pattern="[0-9]*")
                        input.h_40.lh_25.t_c.text-color-deeporange(type="number" v-model=" v.t " style="padding: 0 5px" @change=" v.s = Number(v.t) && Number(v.t) > 0 ")

                  f7-button.hlh_40.pd_0(outline v-if="v.tails")
                    .hlh_40.pd_0.ball.inlb.pd_0.w_40(v-for=" (x, j) in v.tails " :key="j"  :class=" [ x._toC() ] ") {{ x }}

      //- 左右结构 + 上下
      template(v-if=" row.struct === 'following-br-tail' ")
        f7-col.vs(width="100")
          f7-row(:class=" getRowClass() ")

            .pb_2.mb_10(v-for=" (v, i) in vs " :key="i"  :class=" v.col || row.col || 'col-45' ")
              .v.t_c.color-theme-gray
                f7-segmented.following-br-tail(round)
                  f7-button.flex-shrink-2.hlh_40.pd_0.ball.inlb.pd_0(outline @click=" toggle(v) " :class=" getFollowBallClass(v) ") 
                    span {{ v.n }}
                  f7-button.flex-shrink-2.hlh_40.pd_0(outline) 
                    .v_odd {{ v.odd }}
                  f7-button.flex-shrink-1.hlh_40.pd_0(outline) 
                    .v_t.pl_5.pr_5
                      f7-input(validate require pattern="[0-9]*")
                        input.h_40.lh_25.t_c.text-color-deeporange(type="number" v-model=" v.t " style="padding: 0 5px" @change=" v.s = Number(v.t) && Number(v.t) > 0 ")

                .pd_5.t_l.tail(v-if="v.tails")
                  .hlh_40.pd_0.ball.inlb.pd_0.w_40.t_c(v-for=" (x, j) in v.tails " :key="j"  :class=" [ x._toC() ] ") {{ x }}


                

  f7-row(no-gap v-if=" row.btns ")
    f7-col.pr_2(v-for=" (v, i) in row.btns " :key="i")
      f7-button(color="gray" fill @click=" btnclick(v) ") {{ v }}





</template>

<script>
import config from '@/config'
export default {
  mixins: [config],
  components: {
  },
  name: 'game_selection_row',
  props: ['row', 'rowIndex'],
  inject: ['t', 'getodds'],
  data () {
    return {
      vs: []
    }
  },
  computed: {
    odds () {
      return this.getodds()
    },
    // 所选的号的值v集
    vc () {
      return this.vs.filter(n => n.s).map(n => {
        return (n = n.v)
      })
    },
    // 所选的号的名n集
    nc () {
      return this.vs.filter(n => n.s).map(n => {
        return (n = n.nv || n.n)
      })
    },
    // 所选的号的行名n集
    rnc () {
      return this.vs.filter(n => n.s).map(n => {
        return (n = !this.row.nonasv ? this.row.n : '')
      })
    },
    // 所选的号的倍数n集
    tc () {
      return this.vs.filter(n => n.s).map(n => {
        return (n = n.t)
      })
    },
  },
  watch: {
  },
  created () {
    this.init()
    this.$watch(vm => [vm.vc, vm.tc].join(), val => {
      this.row.vc = this.vc
      this.row.nc = this.nc
      this.row.rnc = this.rnc
      this.row.tc = this.tc
      this.$emit('row')
    })
  },
  methods: {
    __clearSelection () {
      this.clear()
    },
    __initSelectionRow () {
      this.init()
    },
    __generateOdd  () {
      if (this.row.t === 'fnumber') {
        this.row.odd = typeof this.odds === 'number' ? this.odds : this.odds[this.row.oddIndex || 0]
      }
      // 需要赔率
      if (this.row.t === 'times' || this.row.struct === 'following') {
        this.row.vs.forEach((x, i) => {
          // 赔率
          x.odd = typeof this.odds === 'number' ? this.odds : this.odds[typeof x.oddIndex === 'number' ? x.oddIndex : typeof this.row.oddIndex === 'number' ? this.row.oddIndex : i]
        })
      }
    },
    init () {
      this.row.vs = this.row.vs || Array(this.row.max - this.row.min + 1).fill(0).map((n, index) => {
        return {
          s: false,
          v: this.row.min + index,
          n: (this.row.min + index)._padStart(this.row.l || 1, '0'),
          // 单个号码的倍数
          t: '',
        }
      })
      this.__generateOdd()
      this.vs = this.row.vs
    },
    getRowClass () {
      return this.row.rcls || 'j_s'
    },
    getBallWrapColClass (v) {
      if (!this.row.struct) {
        return v.col ? v.col : v.n.length >= 4 ? 'col-33' : 'col-20'
      } else if (this.row.struct === 'mixin') {
        return v.col ? v.col : 'col-16'
      }
      // return {
      //   'col-20': !this.row.struct && v.n.length < 4,
      //   'col-33': !this.row.struct && v.n.length >= 4,
      //   'col-16': this.row.struct === 'mixin' && v.n.length < 4,
      // }
    },
    getFollowBallClass (v) {
      return [!v.tails && (v.n * 1 === v.v * 1) && v.v._toC(), {
        'bg-color-deeporange': v.s,
        'text-color-white': v.s && (v.tails || (v.n * 1 !== v.v * 1)),
      }]
    },
    getBallClass (v) {
      return [
        v.c || {
          // width
          'w_90 r_5': v.n.length >= 4,
          'rp_50 w_40': v.n.length < 4,
        },
        {
          // font-size
          'ft_16': v.n.length > 1,
          'ft_18': v.n.length <= 1,
          // border
          'border': this.t !== 'k3',
          // select
          's': v.s,
          // background-color
          'bg-color-white': this.row.cls !== 'dice' && !v.s,
          'bg-color-deeporange text-color-white': this.row.cls !== 'dice' && v.s,
        }
      ]
    },
    toggle (n) {
      if (n.s) this.unSelect(n)
      else this.select(n)
    },
    select (n) {
      this.excluCheck(n).then(() => {
        n.s = true
        n.t = this.local.$m || 2
        this.slCheck(n)
        this.row.lsv = n
      })
    },
    unSelect (n) {
      n.s = false
      // 输入倍数型
      n.t = ''
    },
    __unSelect (v) {
      this.vs.find(n => n.v === v && n.s) && (this.vs.find(n => n.v === v && n.s).s = false)
    },
    excluCheck (n) {
      return new Promise((resolve, reject) => {
        if (this.row.exclu) {
          this.__setCall({fn: '__unSelect', args: n.v})
          setTimeout(resolve, 0)
        } else resolve()
      })
    },
    // select length limit check
    slCheck (n) {
      if (this.row.sl && this.vc.length > this.row.sl) this.row.lsv && this.unSelect(this.row.lsv)
    },
    btnclick (btn) {
      switch (btn.split(':')[0]) {
        case '全':
          this.all(btn.split(':')[1])
          break
        case '大':
          this.big(btn.split(':')[1])
          break
        case '小':
          this.small(btn.split(':')[1])
          break
        case '奇':
          this.odd(btn.split(':')[1])
          break
        case '偶':
          this.even(btn.split(':')[1])
          break
        case '质':
          this.prime(btn.split(':')[1])
          break
        case '合':
          this.composite(btn.split(':')[1])
          break
        case '清':
          this.clear(btn.split(':')[1])
          break
      }
    },
    all () {
      this.vs.forEach(n => this.select(n))
    },
    small () {
      this.vs.forEach((n, i) => ((2 * i + 1) < this.vs.length ? this.select(n) : this.unSelect(n)))
    },
    big () {
      this.vs.forEach((n, i) => ((2 * i + 1) >= this.vs.length ? this.select(n) : this.unSelect(n)))
    },
    even () {
      this.vs.forEach((n, i) => ((n.v % 2) === 0 ? this.select(n) : this.unSelect(n)))
    },
    odd () {
      this.vs.forEach((n, i) => ((n.v % 2) !== 0 ? this.select(n) : this.unSelect(n)))
    },
    clear () {
      this.vs.forEach(n => this.unSelect(n))
      return true
    },
    prime () {
      this.vs.forEach(n => (n.v)._isPrime() ? this.select(n) : this.unSelect(n))
    },
    composite () {
      this.vs.forEach(n => (n.v > 1) && !(n.v)._isPrime() ? this.select(n) : this.unSelect(n))
    },
    __randominrow ({continuee, rowIndex, timeout}) {
      if (!continuee) this.clear()
      if (!continuee && this.vs.length === 1) return false
      if (rowIndex === undefined || this.rowIndex === rowIndex) {
        setTimeout(() => {
          this.toggle(this.vs[parseInt(Math.random() * this.vs.length)])
        }, timeout || (50 * Math.min(this.rowIndex, 8)))
      }
    },
    // 输入们数型
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
urls = {
  _n: '~src/assets/play/game_btn_postion',
}
.game_selection_row
  .ball
    &.border
      border 1px solid #dfdfdf
      
    &:active
      opacity .6
    
      
  .button.color-gray
    background-color #e8e8e8
    color #333
    &:active
      opacity .6
  .n
    bg(urls._n + '@2x.png')

  // 输入倍数型
  .segmented.following-br-tail
    .button
      border-bottom 0
      border-bottom-left-radius 0
      border-bottom-right-radius 0
    &+.tail
      border-radius 5px
      border-top-left-radius 0
      border-top-right-radius 0
      border 1px solid #8e8e93
</style>
