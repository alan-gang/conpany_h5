<template lang="pug">

.page.play(:class=" [ {sr: local.sr && rps[0] }, 'play_id_' + id] ")

  f7-navbar(:innerClass=" 'navbar_of_' + $options.name " back-link no-hairline)

    f7-nav-title(@click.native=" sm = !sm ")
      .ft_12 {{ n }}
      .ft_16 {{ mido.n }}
        f7-icon(:class=" {rz_90: !sm, 'rz_-90': sm} " f7="play_fill" size="12px" style="width: 18px")

    f7-nav-right
      f7-link(icon-f7="arrow_right_round_fill" style="opacity: .2" @click=" next ")
      f7-toggle(v-if=" kq " v-on:toggle:change=" swap " :checked=" kq.active " t1="官" t2="快钱") 快钱
      .menu-item.menu-item-dropdown.icon-only
        .menu-item-content
          i.icon.f7-icons.text-color-deeporange bars
        .menu-dropdown.menu-dropdown-right
          .menu-dropdown-content(style="box-shadow: 0 3px 3px 0px #dedede")
            a.j_c.menu-dropdown-link.menu-close(@click=" __go('/rfs/bc/', {props: {g: {id: id, n: n}}}) ")
              span 投注记录
            a.j_c.menu-dropdown-link.menu-close(@click=" __go('/rfs/bc/', {props: {g: {id: id, n: n}, tabid: '#rf_bc_2'}}) " style='margin-left: 0px;')
              span 追号记录
            a.j_c.menu-dropdown-link.menu-close(@click=" window.open('https://www.ds-graph.com:8000/xy/index.html#?gameid=' + id) " v-show=" t !== 'kq' " style='margin-left: 0px;')
              span 走势图

  f7-toolbar(top tabbar scrollable v-show=" local.sr && rps[0]  " style="transform: none")

    f7-link(:key="i" v-for=" (v, i) in rps " :class=" {'active text-color-deeporange border-color-deeporange': v.id === mid} " @click=" mid = v.id ") {{ v.n }}


  gamemenu(v-if=" sm " :sm="sm" v-on:sm="sm = $event" :t="t" :id="id" :mid="mid" v-on:mid=" mid = $event ")
  stopMasker(v-if="isShowMasker")
  gameinfo.o_h(:id="id" :t="t" :mid="mid" @issue=" issue = $event " :ludanFlag="ludanFlag" :ludanShow="ludanShow")

  gamebookbar(v-if=" !mido.times " v-bind="{ n, t, id, mid, n_, wn_, up_, cpoints, dp }"  @m_=" m_ = $event " @bonusRange=" bonusRange = $event ")
  gamefastcashbookbar(v-else v-bind="{ n, t, id, mid, n_, wn_, up_, cpoints, dp }"  @m_=" m_ = $event ")

  .page-content
    gameselection(v-bind=" {id, t, mid, mid_, issue, m_, dp, cpoints, mido, up_} " @n_=" n_ = $event " @wn_=" wn_ = $event ")
    transition(name="fade" enter-active-class="fadeInUp" leave-active-class="fadeOutDown")
      ludan.animated(v-show="ludanFlag && ludanShow" :gameid="id" :gameType="t.toUpperCase()")
  adjustpoints(v-if=" sap && dp && (Number(dp.maxpoint) > Number(dp.minpoint)) " v-on:hideadjustpoints=" sap = $event " v-bind=" {dp: dp, v: local.$p, bonusRange} " v-on:adjust:point=" __setLocal({$p: $event}) " )

</template>

<script>
import stopMasker from './stopMasker'
import config from '@/config'
import api from '@/api'
import gamemenu from './menu'
import gamebookbar from './bookbar'
import gamefastcashbookbar from './fastcashbookbar'
import gameinfo from './info'
import gameselection from './selection'
import adjustpoints from './adjustpoints'
import ludan from '@/components/ludan'
import m from '@/gm/m'
import { cache } from '@/store'
export default {
  mixins: [config],
  components: {
    stopMasker,
    gamemenu,
    gamebookbar,
    gamefastcashbookbar,
    gameinfo,
    gameselection,
    adjustpoints,
    ludan
  },
  name: 'play',
  props: {
    id: {
      default: () => cache.state.play.id
    },
    n: {
      default: () => cache.state.play.n
    },
    t_: {
      default: () => cache.state.play.t
    },
    dmid_: {
      // default: () => cache.state.play.dmid
    },
    up: {
      default: () => 2
    },
    kq: {
      // default: () => cache.state.play.kq
    },
  },
  provide: function () {
    return {
      getmid_: this.getmid_,
      t: this.t,
      getodds: () => this.odds,
      getodds_: () => this.odds_,
      getoddmin_max: () => this.oddmin_max,
      getclryl: () => this.clryl,
    }
  },
  data () {
    return {
      // 是否显示休市遮罩
      isShowMasker: false,
      // show menu
      sm: false,
      // 当前玩法id
      mid: '',
      // 选号总注数
      n_: 0,
      // 选号最高可中奖注数
      wn_: 1,
      // 总钱数
      m_: 0,
      // unit price
      // up_: this.t_,
      // 游戏返点信息
      points: {},
      // show gamepoints
      sap: false,
      issue: '',
      t: this.t_,
      // m: m[this.t_],
      bonusRange: [],
      // 冷热遗漏
      lryl: {},
      // 路单是否展开
      ludanFlag: false
    }
  },
  computed: {
    m () {
      return m[this.t]
    },
    up_ () {
      return this.t === 'kq' ? this.kq && this.kq.up : this.up
    },
    dmid () {
      return this.t === 'kq' ? this.kq && this.kq.dmid_ : this.dmid_
    },
    mido () {
      return this.m.find(x => x.id === this.mid) || {}
    },
    mid_ () {
      return this.mid.split(':')[0]
    },
    // 当前游戏的所有玩法
    cps () {
      return this.m.filter(x => x.show)
    },
    // 最近玩法
    rps () {
      // return this.cps.filter(x => this.local.rps.indexOf(x.id) !== -1).slice(0, 10)
      return this.local.rps.split(',').filter(x => this.cps.find(y => y.id === x.trim())).slice(0, 10).map(x => {
        return this.cps.find(y => y.id === x.trim())
      })
    },
    // 当前游戏当前玩法对应的返点
    cpoints () {
      return this.points[this.mid_] || []
    },
    // odds 即赔率集
    odds_ () {
      return this.cpoints.reduce((p, x, i) => {
        p.push(x.maxprize)
        return p
      }, [])
    },
    // 折叠的odds
    odds () {
      return this.odds_.length > 1 ? this.odds_.concat(this.odds_.slice().reverse()) : Number(this.odds_[0])
    },
    // 赔率最小-最大集合
    oddmin_max () {
      return this.cpoints[0] ? [this.cpoints[this.cpoints.length - 1], this.cpoints[0]] : []
    },
    // default point
    dp () {
      return this.cpoints[0]
    },
    // current lryl 当前玩法的冷热遗漏
    clryl () {
      return this.mid.split(':')[1] !== '0' ? this.lryl[this.mid_] : null
    },
    // 控制路单是否展示
    ludanShow () {
      return ['1200', '1202', '4011', '2035'].includes(this.mid_)
    }
  },
  watch: {
    n_ (n, o) {
      this.__setCall({ fn: '__setSA', args: n || this.__$car.length })
    },
    sr_ (n, o) {
      this.addClsSR()
    },
    dp () {
      // if point overflow reset to max
      if (this.dp && this.dp.maxpoint && (this.local.$p * 1 > this.dp.maxpoint * 1)) {
        this.__setLocal({ $p: this.dp.maxpoint * 1 })
      }
    }
  },
  created () {
    console.log(this.$f7route.props)
    this.checkIsShowDialog()
    this.swap(this.kq && this.kq.active)
    // 监听展开路单
    this.$bus.$on('ludanFlagChange', (flag) => {
      this.ludanFlag = flag
    })
  },
  methods: {
    checkIsShowDialog () {
      let matchArr = [1, 3, 4, 35, 6, 7, 8, 36, 38, 46, 13, 24, 23, 25, 159, 160, 9, 5, 10]
      // let sDate = new Date('2020-01-22').getTime()
      // let eDate = new Date('2020-01-31').getTime()
      // let currentDate = new Date().getTime()
      // if (currentDate > sDate && currentDate < eDate) {
      if (matchArr.includes(this.id)) {
        this.isShowMasker = true
      }
      // }
    },
    swap (flag) {
      this.t = flag ? 'kq' : this.t_
      this.init()
    },
    next () {
      var ci = this.cps.findIndex(x => x.id === this.mid)
      if (ci < (this.cps.length - 1)) {
        ci++
      } else {
        ci = 0
      }
      this.mid = this.cps[ci].id
    },
    getmid_ () {
      return this.mid_
    },
    __openadjustpoints () {
      this.sap = true
    },
    init () {
      this.mid = this.dmid || (this.rps[0] || {}).id || this.cps[0].id
      this.myNewPoint()
      if (this.id) this.__setCache({ play: { id: this.id, n: this.n, t: this.t, kq: this.kq } })
      this.codeMissColdHeat()
    },
    myNewPoint () {
      this.$.get(api.myNewPoint, { gameid: this.id }).then(({ data: { items, dtMaxPrize, dzMaxPrize } }) => {
        this.points = items
        this.__setCache({ dtMaxPrize: dtMaxPrize * 1, dzMaxPrize: dzMaxPrize * 1 })
        // 没有奖金信息则隐藏该玩法
        this.m.forEach(x => (x.show = !!items[x.id.split(':')[0]]))
        // 如果当前默认的玩法关闭了 重新选择一个默认的玩法
        this.$nextTick(() => {
          this.__setCall({ fn: '__generateOdd' })
          if (!this.mido || !this.mido.show) {
            if (!this.cps[0]) {
              // back
            } else {
              this.mid = this.m.filter(x => x.show)[0].id
            }
          }
        })
      })
    },
    __openWinCode () {
      this.codeMissColdHeat()
    },
    __codeMissColdHeat () {
      this.codeMissColdHeat()
    },
    codeMissColdHeat () {
      this.$.get(api.codeMissColdHeat, { lotteryId: this.id }).then(({ data }) => {
        for (const k in data) {
          if (k.indexOf('|') !== -1) {
            k.split('|').forEach(x => {
              data[x] = data[k]
            })
          }
        }
        this.lryl = data
      })
    },
    ludanChange (val) {
      this.ludanFlag = val
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.play
  .toolbar-inner .link.active
    border-bottom 2px solid
  // 显示最近的玩法
  &.sr
    .gameinfo
      top calc(var(--f7-navbar-height) + var(--f7-toolbar-height))

    &>.page-content
      --f7-page-toolbar-top-offset calc(var(--f7-toolbar-height) + 85px + 5px)
    .gameinfo.tab_0 ~ .page-content
      --f7-page-toolbar-top-offset calc(var(--f7-toolbar-height) + 162px + 5px)
    .gameinfo.tab_1
    .gameinfo.tab_2
      & ~ .page-content
        --f7-page-toolbar-top-offset calc(var(--f7-toolbar-height) + 300px + 5px)

  &:not(.sr)
    &>.page-content
      --f7-page-toolbar-top-offset calc(var(--f7-toolbar-height) + 43px + 5px)
    .gameinfo.tab_0 ~ .page-content
      --f7-page-toolbar-top-offset calc(var(--f7-toolbar-height) + 120px + 5px)
    .gameinfo.tab_1
    .gameinfo.tab_2
      & ~ .page-content
        --f7-page-toolbar-top-offset calc(var(--f7-toolbar-height) + 258px + 5px)
.animated {
  animation-duration: .3s;
  animation-fill-mode: both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeOutDown {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
}
.fadeInUp {
  animation-name: fadeInUp;
}
.fadeOutDown {
  animation-name: fadeOutDown;
}


</style>
