<template lang="pug">

.game_selection_row.mb_5

  f7-row(no-gap)

    //- 选号模式
    template(v-if=" row.t === 'number' ")
      //- 左右结构(默认)
      template(v-if=" !row.struct ")
        f7-col.n.h_40.t_c.flex.justify-content-center(width="15" :n="row.n")
          span.text-color-white(:class=" {ft_12: row.n.length > 2} ") {{ row.n }}

          //- 冷热遗漏标题
          .p_a.p_r_0.wp_120.p_t_40.c_6.ft_12.t_r(v-if=" clryl ")
            .hlh_20(v-show=" local.$yl ") 遗漏
            .hlh_20(v-show=" local.$lr ") 冷热{{ local.$lr }}期

        f7-col.vs(width="85" :class=" 'vs_l_' + vs.length ")
          f7-row(no-gap :class=" getRowClass() ")
            .pb_2(v-for=" (v, i) in vs " :key="i" @click=" toggle(v) " :class=" getBallWrapColClass(v, i) " :ball-n=" v.n " )
              .v.t_c
                f7-button.ball.hlh_40.inlb.pd_0(:class="getBallClass(v)")
                  span {{ v.n }}

              //- 冷热遗漏内容
              .t_c.ft_12.c_9.pt_2.lh_12(v-if=" clryl ")
                .h_20(v-if=" local.$yl " :class=" { c_e: clryl.miss[rowIndex][i] * 1 === Math.min.apply(null, clryl.miss[rowIndex]), 'text-color-blue': clryl.miss[rowIndex][i] * 1 === Math.max.apply(null, clryl.miss[rowIndex]) } ")
                  span.lryl_v.inlb.minw_15.pl_2.pr_2.mt_3 {{ clryl.miss[rowIndex][i] }}
                .h_20(v-if=" local.$lr ")
                  span.lryl_v.lryl_v_lr.inlb.minw_15.pl_2.pr_2.mt_3 {{ clryl[local.$lr + 'q'][rowIndex][i] }}

      //- 混合结构
      template(v-if=" row.struct === 'mixin' ")
        f7-col.vs(width="100")
          f7-row(no-gap :class=" getRowClass() ")
            f7-col.n.hlh_40.t_c.pr_5.p_r(width="16")
              span.text-color-white(:class=" {ft_12: row.n.length > 2} ") {{ row.n }}

              //- 冷热遗漏标题
              .p_a.p_r_0.wp_120.p_t_40.c_6.ft_12.t_r(v-if=" clryl ")
                .hlh_20(v-show=" local.$yl ") 遗漏
                .hlh_20(v-show=" local.$lr ") 冷热{{ local.$lr }}期

            .pb_2(v-for=" (v, i) in vs " :key="i" width="16" @click=" toggle(v) " :class=" getBallWrapColClass(v, i) " :ball-n=" v.n " )
              .v.t_c
                f7-button.ball.hlh_40.inlb.pd_0(:class="getBallClass(v)")
                  span {{ v.n }}

              //- 冷热遗漏内容
              .t_c.ft_12.c_9.pt_2.lh_12(v-if=" clryl ")
                .h_20(v-if=" local.$yl " :class=" { c_e: clryl.miss[rowIndex][i] * 1 === Math.min.apply(null, clryl.miss[rowIndex]), 'text-color-blue': clryl.miss[rowIndex][i] * 1 === Math.max.apply(null, clryl.miss[rowIndex]) } ")
                  span.lryl_v.inlb.minw_15.pl_2.pr_2.mt_3 {{ clryl.miss[rowIndex][i] }}
                .h_20(v-if=" local.$lr ")
                  span.lryl_v.lryl_v_lr.inlb.minw_15.pl_2.pr_2.mt_3 {{ clryl[local.$lr + 'q'][rowIndex][i] }}

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
                    input.hlh_30.t_c.text-color-deeporange(type="number" v-model=" v.t " style="padding: 0 5px" @change=" v.s = Number(v.t) && Number(v.t) > 0 " @click=" !v.t && toggle(v) ")

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
                        input.h_40.lh_25.t_c.text-color-deeporange(type="number" v-model=" v.t " style="padding: 0 5px" @change=" v.s = Number(v.t) && Number(v.t) > 0 " @click=" !v.t && toggle(v) ")

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
                        input.h_40.lh_25.t_c.text-color-deeporange(type="number" v-model=" v.t " style="padding: 0 5px" @change=" v.s = Number(v.t) && Number(v.t) > 0 " @click=" !v.t && toggle(v) ")

                .pd_5.t_l.tail(v-if="v.tails")
                  .hlh_40.pd_0.ball.inlb.pd_0.w_40.t_c(v-for=" (x, j) in v.tails " :key="j"  :class=" [ x._toC() ] ") {{ x }}




  f7-row.mt_5(no-gap v-if=" row.btns ")
    f7-col.pr_2(v-for=" (v, i) in row.btns " :key="i" )
      f7-button(color="gray" fill @click=" btnclick(v) " :disabled=" !(v === '全' ? (!singleRowMaxLen || singleRowMaxLen >= vs.length) : true) ") {{ v }}





</template>

<script>
import config from '@/config'
export default {
  mixins: [config],
  components: {
  },
  name: 'game_selection_row',
  props: ['row', 'rowIndex', 'singleRowMaxLen'],
  inject: ['t', 'getodds', 'getclryl'],
  data () {
    return {
      vs: []
    }
  },
  computed: {
    clryl () {
      return this.getclryl()
    },
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
    getBallWrapColClass (v, i) {
      let cls = ''
      if (!this.row.struct) {
        cls = v.col ? v.col : v.n.length >= 4 ? 'col-33' : 'col-20'
      } else if (this.row.struct === 'mixin') {
        cls = v.col ? v.col : 'col-16'
      }
      return [
        cls,
        {
          // select
          's': v.s,
          lr_r: this.clryl && this.local.$lr && this.clryl[this.local.$lr + 'q'][this.rowIndex][i] * 1 === Math.max.apply(null, this.clryl[this.local.$lr + 'q'][this.rowIndex]),
          lr_l: this.clryl && this.local.$lr && this.clryl[this.local.$lr + 'q'][this.rowIndex][i] * 1 === Math.min.apply(null, this.clryl[this.local.$lr + 'q'][this.rowIndex]),
        },
      ]
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
    __selectindexinrow (i) {
      this.select(this.vs[i])
    },
    __unselectindexinrow (i) {
      this.unSelect(this.vs[i])
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
      if (this.singleRowMaxLen && this.vc.length > this.singleRowMaxLen) this.row.lsv && this.unSelect(this.row.lsv)
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

<!-- 欢乐生肖 -->
<style lang="stylus">
@import '~src/css/var.stylus'
// mouse tiger rabbit
ns = {
  '万位': '~src/assets/play/play_id_1/game_btn_postion_wanwei',
  '千位': '~src/assets/play/play_id_1/game_btn_postion_qianwei',
  '百位': '~src/assets/play/play_id_1/game_btn_postion_baiwei',
  '十位': '~src/assets/play/play_id_1/game_btn_postion_shiwei',
  '个位': '~src/assets/play/play_id_1/game_btn_postion_gewei',
}

.play_id_1
  for k, v in  ns
    .n[n={k}]
      bg(v + '@2x-min.png')

  .vs_l_10
    .ball
      overflow visible
      &:after
        content ''
        position absolute
        right -3px
        bottom 0
        width 13px
        height 13px
    prefix = '~src/assets/play/play_id_1/text_'
    .col-20
      for v, k in  mouse tiger rabbit lonng snake horse sheep monkey chicken pig
        &:nth-child({k + 1})
          .ball
            &:after
              bg(prefix + v + '_normal@2x-min.png')
            &:hover:after
            &.selected:after
              bg(prefix + v + '_press@2x-min.png')

</style>
<!-- 冷热遗漏 -->
<style lang="stylus">
@import '~src/css/var.stylus'
.lryl_v
  border 1px solid currentColor
  border-radius 12px
.lr_r
  .lryl_v_lr
    color red
  .ball:not(.s):not([class*="dice"]):not(.w_90)
    background-image url('~src/assets/play/lryl/ballbg_hot.gif')
    background-size cover
    color #fff

.lr_l
  .lryl_v_lr
    color #2196f3

  .ball:not(.s):not([class*="dice"]):not(.w_90)
    background-image url('~src/assets/play/lryl/ballbg_cold.gif')
    background-size cover
    color #fff

</style>
<!-- 龙虎和 -->
<style lang="stylus">
@import '~src/css/var.stylus'
bns = {
  '龙': '~src/assets/play/lhh/1',
  '虎': '~src/assets/play/lhh/2',
  '和': '~src/assets/play/lhh/0',
}
.game_selection_row
  for k, v in bns
    [ball-n={k}]
      width 60px
      height 60px
      margin 0 15px
      bg(v + '_1.png', 100% 100%)
      &.s
        bg(v + '.png', 100% 100%)
      .ball
        opacity 0
</style>
