<template lang="pug">

.game_selection.pl_15.pr_15.pb_15
  template(v-if="s.ps")
    selectionps(:dpss="s.pss" :ps="s.ps" :pi="s.pi" :min="s.min" :single="s.single" v-on:update:vc=" pvc = $event " v-on:update:vcl=" pvcl = $event ")
  template(v-if="s[0]")
    selectionrow(v-for=" (v, i) in s " :key="i" v-bind="{row: v, rowIndex: i}" v-on:row=" update ")
  template(v-else)
    textarea.bg-color-white.pd_5(v-model=" value_ " placeholder="每一注号码之间请用一个 空格[ ]、逗号[,] 或者 分号[;] 隔开")
  
</template>

<script>
import config from '@/config'
import api from '@/api'
import selectionrow from './selection_row'
import selectionps from './selection_ps'
import random from './random'
import s from '@/gm/s'
import n from '@/gm/n'
import wn from '@/gm/wn'
import { removeDuplicate } from '@/gm/base'
export default {
  mixins: [config, random],
  components: {
    selectionrow,
    selectionps,
  },
  name: 'game_selection',
  props: ['id', 't', 'mid', 'mid_', 'issue', 'm_', 'dp', 'cpoints', 'mido', 'up_'],
  data () {
    return {
      // 所选的号的值v集
      vc: [[]],
      // 所选的号的名n集
      nc: [],
      // 所选的号的行名n集
      rnc: [],
      // 所选的号的倍数t集
      tc: [],
      // 原始输入值
      value_: '',
      // 单式输入框
      rjr: '|',
      // 位置信息
      pvc: '',
      pvcl: '',
    }
  },
  computed: {
    s () {
      return s[this.t][this.mid]() || []
    },
    N () {
      return n[this.t]
    },
    WN () {
      return wn[this.t]
    },
    // 号码集的长度集
    vcl () {
      return this.vc.map(n => {
        return (n = n.length)
      })
    },
    // 重复号码长度
    r () {
      return this.vc.join(',').split(',').filter(n => n !== '').reduce((p, n) => {
        if (p[n] !== undefined) p.repeat += 1
        else p[n] = n
        return p
      }, {repeat: 0}).repeat
    },
    // 注数
    no () {
      // for return a legal string
      return this.N[this.mid] ? this.N[this.mid]({
        ns: this.vc,
        nsl: this.vcl,
        ps: this.pvc,
        psl: this.pvcl,
        value: this.value.replace(/[^0-9,;\s]+/g, '').replace(/[,;|\s]+/g, ' '),
        r: this.r
      }) : 0
      // return x
      // typeof x === 'object' && typeof x[1] === 'object' && this.$emit('set-nsns', x[1].join(this.rowToRowJoin), this.nsTitle.join(','), this.nsTimes.join(','))
    },
    // 注数
    n () {
      return typeof this.no === 'object' ? this.no[0] : this.no
    },
    // win 可能中奖的注数
    wn () {
      return this.WN[this.mid] ? this.WN[this.mid]({
        ns: this.vc,
        nsl: this.vcl,
        ps: this.pvc,
        psl: this.pvcl,
        value: this.value.replace(/[^0-9,;\s]+/g, '').replace(/[,;|\s]+/g, ' '),
        r: this.r
      }) : 1
    },
    userpoint () {
      return this.dp && Number(this.dp.maxpoint) > Number(this.dp.minpoint) ? this.local.$p * 1 : 0
    },
    value () {
      return this.value_.replace(/[,;|\s]+/g, ' ')
    },
    // 无效号码提醒
    hasUnable () {
      return this.s[0] || !this.value.replace(/\s+/g, '') ? false : this.value.trim().replace(/[^0-9,;\s]+/g, '').replace(/[,;|\s]+/g, ' ').split(' ').length !== this.n
    },
  },
  watch: {
    n (n, o) {
      this.$emit('n_', n)
    },
    wn (n, o) {
      this.$emit('wn_', n)
    },
    value () {
      setTimeout(this.removeRepeat, 0)
    },
    mid () {
      this.__setCall({fn: '__initSelectionRow'})
      this.__setCall({fn: '__initSelectionPS'})
    }
  },
  created () {
  },
  methods: {
    removeRepeat () {
      let R = null
      R = removeDuplicate(this.value_.trim(), /[,;|\s]+/, null, this.o, this.t === '115' || this.t === 'pk10' ? 2 : 1)
      if (R.has) this.value_ = R.s
      return R.has
    },
    update () {
      // 所选的号的值v集
      this.vc = this.s.map(n => {
        return (n = n.vc)
      })
      // 所选的号的名n集
      this.nc = this.s.map(n => {
        return (n = n.nc)
      })
      // 所选的号的行名n集
      this.rnc = this.s.map(n => {
        return (n = n.rnc)
      })
      this.tc = this.s.map(n => {
        return (n = n.tc)
      })
    },
    __clearSelection () {
      this.value_ = ''
    },
    __getCodes () {
      if (this.s[0]) {
        return this.vc.join(this.rjr)
      } else {
        return this.no[1].join(this.rjr)
      }
    },
    __addToCar () {
      this.local.$car.push(Object.assign(this.__getNumberItems()[0], {
        // 更多信息
        id: this.id,
        mido: this.mido,
        dp: this.dp,
        cpoints: this.cpoints,
        bonuses: [],
        up_: this.up_,
      }))
      // this.local.$car.push({
      //   methodid: this.mid_,
      //   type: this.mid.split(':')[1],
      //   pos: this.pvc,
      //   codes: this.__getCodes(),
      //   count: this.n,
      //   times: this.local.$t,
      //   money: this.m_,
      //   mode: (String(this.local.$).split('.')[1] || '').length + 1,
      //   userpoint: this.userpoint.toFixed(3),
      //   // 更多信息
      //   mido: this.mido,
      //   dp: this.dp,
      //   up_: this.up_,
      // })
      this.__setCall({fn: '__clearSelection'})
      this.__setLocal({rps: this.mid + ',' + this.local.rps.replace(this.mid + ',', '')})
    },
    __getNumberItems () {
      return [{
        methodid: this.mid_,
        type: this.mid.split(':')[1],
        pos: this.pvc,
        codes: this.__getCodes(),
        count: this.n,
        times: this.local.$t,
        money: this.m_,
        mode: (String(this.local.$).split('.')[1] || '').length + 1,
        userpoint: this.userpoint.toFixed(3),
      }]
    },
    // make a array to be a ','  a array
    __pure (a) { return a.join(',').replace(/,+/g, ',').replace(/^,/, '').replace(/,$/, '').split(',') },
    __getTimesItems () {
      return this.__pure(this.vc).map((x, i) => {
        return {
          methodid: this.mid_,
          type: this.mid.split(':')[1],
          pos: this.pvc,
          mode: (String(this.local.$$).split('.')[1] || '').length + 1,
          codes: x,
          count: 1,
          times: this.__pure(this.tc)[i],
          money: this.__pure(this.tc)[i] * this.local.$$,
          userpoint: this.userpoint.toFixed(3),
        }
      })
    },
    __getTimesM () {
      return this.__pure(this.tc).reduce((p, x, i) => {
        p += x * this.local.$$
        return p
      }, 0)
    },
    __getFnumberM () {
      return this.n * this.local.$m
    },
    __getItems () {
      if (!this.mido.times) {
        return this.__getNumberItems()
      } else {
        return this.__getTimesItems()
      }
    },
    __getBookingArgs () {
      this.__setLocal({rps: this.mid + ',' + this.local.rps.replace(this.mid + ',', '')})
      return {
        gameid: this.id,
        issue: this.issue,
        totalnums: this.n,
        totalmoney: this.m || this.__getTimesM(),
        type: 1,
        isusefree: 0,
        isJoinPool: 0,
        trace: '',
        items: JSON.stringify(this.__getItems()),
      }
    },
    __booking () {
      if (this.t === 'kq') return this.__kqbooking()
      this.$.post(api.booking, this.__getBookingArgs())
    },
    __extract () {
      let items = []
      this.vc[0].forEach((n, i) => {
        this.vc[1].forEach((m, j) => {
          items.push({
            methodId: this.mid_,
            projs: 1,
            money: this.local.$m,
            content: n + ',' + m
          })
        })
      })
      return items
    },
    __getKqTimesItems () {
      return this.__pure(this.vc).map((x, i) => {
        return {
          methodId: this.mid_,
          projs: 1,
          money: this.__pure(this.tc)[i],
          content: this.__pure(this.rnc)[i] ? this.__pure(this.rnc)[i] + '-' + this.__pure(this.nc)[i] : this.__pure(this.nc)[i]
        }
      })
    },
    __getKqItems () {
      if (this.mido.extract) {
        return this.__extract()
      } else {
        return this.__getKqTimesItems()
      }
    },
    __getKqBookingArgs () {
      this.__setLocal({rps: this.mid + ',' + this.local.rps.replace(this.mid + ',', '')})
      return {
        betData: JSON.stringify({
          lotteryId: this.id,
          issue: this.issue,
          totProjs: this.n,
          totMoney: this.mido.extract ? this.__getFnumberM() : this.m || this.__getTimesM(),
          isusefree: 0,
          betList: this.__getKqItems(),
        })
      }
    },
    __kqbooking () {
      if (this.mido.extract && !this.local.$m) return
      this.$.post(api.kqbooking, this.__getKqBookingArgs())
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.game_selection
  textarea
    width 100%
    height 30vh
    
</style>
