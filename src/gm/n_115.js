import { N, ON, P, A, C } from './base'
export default {
  /*
  所有参数集：{
    // 号码集
    ns,
    // 号码集长度集
    nsl, [4, 4]
    // 位置集
    ps,
    // 位置集长度
    psl
    // 输入值
    value
    // 重号数量 [4,5,6]
    r 3
  }
   */
  /* ===========================================================================115============================================================================================== */

  /* *************************************三星*********************************** */
  /* ..............前三............... */
  /*
   *直选复式
   **/
  '2001:1' ({ns}) {
    let n = 0
    ns[0] && ns[0][0] && ns[0].forEach((f) => {
      ns[1] && ns[1][0] && ns[1].forEach((s) => {
        ns[2] && ns[2][0] && ns[2].forEach((t) => {
          if (f !== s && f !== t && s !== t) n++
        })
      })
    })
    return n
  },
  /*
   *直选单式  N
   **/
  '2001:0' ({value}) {
    this.func = `[N(value, 6, 1, 2, 11, 1).length, N(value, 6, 1, 2, 11, 1)]`
    return [N(value, 6, 1, 2, 11, 1).length, N(value, 6, 1, 2, 11, 1)]
  },
  /*
   *组选复式  C(n,3)
   **/
  '2002:1' ({nsl}) {
    return C(nsl[0], 3)
  },
  /*
   *组选单式  N
   **/
  '2003:0' ({value}) {
    this.func = `[N(value, 6, 1, 2, 11, 1).length, N(value, 6, 1, 2, 11, 1)]`
    return [N(value, 6, 1, 2, 11, 1).length, N(value, 6, 1, 2, 11, 1)]
  },
  /*
   *组选胆拖  C(n,(3-m))
   **/
  '2004:1' ({nsl}) {
    return nsl[0] ? C(nsl[1], (3 - nsl[0])) : 0
  },

   // '直选复式',
  '2005:1' ({nsl, r}) {
    return nsl[0] * nsl[1] - r
  },
   // '直选单式',
  '2036:0' ({value}) {
    this.func = `[N(value, 4, 1, 2, 11, 1).length, N(value, 4, 1, 2, 11, 1)]`
    return [N(value, 4, 1, 2, 11, 1).length, N(value, 4, 1, 2, 11, 1)]
  },
   // '组选复式',
  '2006:1' ({nsl}) {
    return C(nsl[0], 2)
  },
   // '组选单式',
  '2037:0' ({value}) {
    this.func = `[N(value, 4, 1, 2, 11, 1).length, N(value, 4, 1, 2, 11, 1)]`
    return [N(value, 4, 1, 2, 11, 1).length, N(value, 4, 1, 2, 11, 1)]
  },
   // '组选胆拖',
  '2007:1' ({nsl}) {
    return C(nsl[1], 1) * nsl[0]
  },
   // '定位胆',
  '2008:1' ({nsl}) {
    return A(nsl)
  },
   // '前三不定位'
  '2009:1' ({nsl}) {
    return A(nsl)
  },
   // '一中一',
  '2010:1' ({nsl}) {
    return C(nsl[0], 1)
  },
   // '二中二',
  '2011:1' ({nsl}) {
    return C(nsl[0], 2)
  },
   // '三中三',
  '2012:1' ({nsl}) {
    return C(nsl[0], 3)
  },
   // '四中四',
  '2013:1' ({nsl}) {
    return C(nsl[0], 4)
  },
   // '五中五',
  '2014:1' ({nsl}) {
    return C(nsl[0], 5)
  },
   // '六中五',
  '2015:1' ({nsl}) {
    return C(nsl[0], 6)
  },
   // '七中五',
  '2016:1' ({nsl}) {
    return C(nsl[0], 7)
  },
   // '八中五',
  '2017:1' ({nsl}) {
    return C(nsl[0], 8)
  },
   // '一中一',
  '2018:0' ({value}) {
    this.func = `[N(value, 2, 1, 2, 11, 1).length, N(value, 2, 1, 2, 11, 1)]`
    return [N(value, 2, 1, 2, 11, 1).length, N(value, 2, 1, 2, 11, 1)]
  },
   // '二中二',
  '2019:0' ({value}) {
    this.func = `[N(value, 4, 1, 2, 11, 1).length, N(value, 4, 1, 2, 11, 1)]`
    return [N(value, 4, 1, 2, 11, 1).length, N(value, 4, 1, 2, 11, 1)]
  },
   // '三中三',
  '2020:0' ({value}) {
    this.func = `[N(value, 6, 1, 2, 11, 1).length, N(value, 6, 1, 2, 11, 1)]`
    return [N(value, 6, 1, 2, 11, 1).length, N(value, 6, 1, 2, 11, 1)]
  },
   // '四中四',
  '2021:0' ({value}) {
    this.func = `[N(value, 8, 1, 2, 11, 1).length, N(value, 8, 1, 2, 11, 1)]`
    return [N(value, 8, 1, 2, 11, 1).length, N(value, 8, 1, 2, 11, 1)]
  },
   // '五中五',
  '2022:0' ({value}) {
    this.func = `[N(value, 10, 1, 2, 11, 1).length, N(value, 10, 1, 2, 11, 1)]`
    return [N(value, 10, 1, 2, 11, 1).length, N(value, 10, 1, 2, 11, 1)]
  },
   // '六中五',
  '2023:0' ({value}) {
    this.func = `[N(value, 12, 1, 2, 11, 1).length, N(value, 12, 1, 2, 11, 1)]`
    return [N(value, 12, 1, 2, 11, 1).length, N(value, 12, 1, 2, 11, 1)]
  },
   // '七中五',
  '2024:0' ({value}) {
    this.func = `[N(value, 14, 1, 2, 11, 1).length, N(value, 14, 1, 2, 11, 1)]`
    return [N(value, 14, 1, 2, 11, 1).length, N(value, 14, 1, 2, 11, 1)]
  },
   // '八中五',
  '2025:0' ({value}) {
    this.func = `[N(value, 16, 1, 2, 11, 1).length, N(value, 16, 1, 2, 11, 1)]`
    return [N(value, 16, 1, 2, 11, 1).length, N(value, 16, 1, 2, 11, 1)]
  },
   // '二中二',
  '2026:1' ({nsl}) {
    return C(nsl[0], 1) * C(nsl[1], 1)
  },
   // '三中三',
  '2027:1' ({nsl}) {
    return C(nsl[0], nsl[0]) * C(nsl[1], (3 - nsl[0]))
  },
   // '四中四',
  '2028:1' ({nsl}) {
    return C(nsl[0], nsl[0]) * C(nsl[1], (4 - nsl[0]))
  },
   // '五中五',
  '2029:1' ({nsl}) {
    return C(nsl[0], nsl[0]) * C(nsl[1], (5 - nsl[0]))
  },
   // '六中五',
  '2030:1' ({nsl}) {
    return C(nsl[0], nsl[0]) * C(nsl[1], (6 - nsl[0]))
  },
   // '七中五',
  '2031:1' ({nsl}) {
    return C(nsl[0], nsl[0]) * C(nsl[1], (7 - nsl[0]))
  },
   // '八中五',
  '2032:1' ({nsl}) {
    return C(nsl[0], nsl[0]) * C(nsl[1], (8 - nsl[0]))
  },
   // '定单双',
  '2033:1' ({nsl}) {
    return C(nsl[0], 1)
  },
   // '猜中位',
  '2034:1' ({nsl}) {
    return C(nsl[0], 1)
  },
   // '龙虎',
  '2035:1' ({nsl, psl}) {
    return C(nsl[0], 1)
  },
}