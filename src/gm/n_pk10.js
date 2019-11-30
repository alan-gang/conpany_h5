import { N, ON, P, A, C } from './base'
export default {
  // title: '猜冠军
  '4001:1' ({nsl}) {
    return C(nsl[0], 1)
  },
  // title: '猜冠亚军
  '4002:1' ({nsl, r}) {
    return nsl[0] * nsl[1] - r
  },
  // title: '猜冠亚军单式
  '4013:0' ({value}) {
    return this['4103:0']({value})
  },
  // title: '猜前三名
  '4003:1' ({ns}) {
    let n = 0
    ns[0] && ns[0][0] && ns[0].forEach(n0 => {
      ns[1] && ns[1][0] && ns[1].forEach(n1 => {
        ns[2] && ns[2][0] && ns[2].forEach(n2 => {
          if (n0 !== n1 && n1 !== n2 && n2 !== n0) n++
        })
      })
    })
    return n
  },
  // title: '猜前三名单式
  '4016:0' ({value}) {
    this.func = `[N(value, 6, 1, 2, 10, 1).length, N(value, 6, 1, 2, 10, 1)]`
    return [N(value, 6, 1, 2, 10, 1).length, N(value, 6, 1, 2, 10, 1)]
  },
  // title: '猜前四名
  '4004:1' ({ns}) {
    let n = 0
    ns[0] && ns[0][0] && ns[0].forEach(n0 => {
      ns[1] && ns[1][0] && ns[1].forEach(n1 => {
        ns[2] && ns[2][0] && ns[2].forEach(n2 => {
          ns[3] && ns[3][0] && ns[3].forEach(n3 => {
            if (n0 !== n1 && n1 !== n2 && n2 !== n3 && n0 !== n2 && n0 !== n3 && n1 !== n3) n++
          })
        })
      })
    })
    return n
  },
  // title: '猜前四名单式
  '4017:0' ({value}) {
    this.func = `[N(value, 8, 1, 2, 10, 1).length, N(value, 8, 1, 2, 10, 1)]`
    return [N(value, 8, 1, 2, 10, 1).length, N(value, 8, 1, 2, 10, 1)]
  },
  // title: '猜三四名复式'
  '4015:1' ({nsl, r}) {
    return nsl[0] * nsl[1] - r
  },
  // title: '猜三四名单式'
  '4014:0' ({value}) {
    return this['4103:0']({value})
  },
  // title: '龙虎
  '4011:1' ({nsl}) {
    return C(nsl[0], 1)
  },
  // title: '定位胆
  '4012:1' ({nsl}) {
    return A(nsl)
  },
  /* *************************************二星*********************************** */
  /* ..............前二直选............... */
  /*
  直选复式
  N1万位，N2千位 N1 * N2
  */
  '4102:1' ({nsl, r}) {
    return nsl[0] * nsl[1] - r
  },
  '4103:0' ({value}) {
    this.func = `[N(value, 4, 1, 2, 10, 1).length, N(value, 4, 1, 2, 10, 1)]`
    return [N(value, 4, 1, 2, 10, 1).length, N(value, 4, 1, 2, 10, 1)]
  },
  '4104:1' ({nsl}) {
    return C(nsl[0], 2)
  },
  '4105:0' ({value}) {
    return this['4103:0']({value})
  },
  '4106:1' ({nsl, r}) {
    return this['4102:0']({nsl, r})
  },
  '4107:0' ({value}) {
    return this['4103:0']({value})
  },
  '4108:1' ({nsl}) {
    return C(nsl[0], 2)
  },
  '4109:0' ({value}) {
    return this['4103:0']({value})
  },
  '4110:1' ({nsl}) {
    return this['4102:0']({nsl, r})
  },
  '4111:0' ({value}) {
    return this['4103:0']({value})
  },
  '4112:1' ({nsl}) {
    return C(nsl[0], 2)
  },
  '4113:0' ({value}) {
    return this['4103:0']({value})
  },
  '4114:1' ({ns}) {
    // [..a, ..b, ..c]
    let n = 0
    // ...a
    ns[0] && ns[0][0] && ns[0].forEach((f) => {
      // ...b
      ns[1] && ns[1][0] && ns[1].forEach((s) => {
        // ...c
        ns[2] && ns[2][0] && ns[2].forEach((t) => {
          if (f !== s && f !== t && s !== t) n++
        })
      })
    })
    return n
  },
  '4115:0' ({value}) {
    this.func = `[N(value, 6, 1, 2, 10, 1).length, N(value, 6, 1, 2, 10, 1)]`
    return [N(value, 6, 1, 2, 10, 1).length, N(value, 6, 1, 2, 10, 1)]
  },
  '4116:1' ({nsl}) {
    return C(nsl[0], 3)
  },
  '4117:0' ({value}) {
    return this['4115:0']({value})
  },
  '4118:1' ({ns}) {
    return this['4114:1']({ns})
  },
  '4119:0' ({value}) {
    return this['4115:0']({value})
  },
  '4120:1' ({nsl}) {
    return C(nsl[0], 3)
  },
  '4121:0' ({value}) {
    return this['4115:0']({value})
  },
  '4122:1' ({ns}) {
    // [..a, ..b, ..c, ..d]
    let n = 0
    let [a, b, c, d] = ns
    a && a[0] && a.forEach((f) => {
      b && b[0] && b.forEach((s) => {
        c && c[0] && c.forEach((t) => {
          d && d[0] && d.forEach((fo) => {
            if ((new Set([f, s, t, fo])).size === [f, s, t, fo].length) n++
          })
        })
      })
    })
    return n
  },
  '4123:0' ({value}) {
    this.func = `[N(value, 8, 1, 2, 10, 1).length, N(value, 8, 1, 2, 10, 1)]`
    return [N(value, 8, 1, 2, 10, 1).length, N(value, 8, 1, 2, 10, 1)]
  },
  '4124:1' ({nsl}) {
    return C(nsl[0], 4)
  },
  '4125:0' ({value}) {
    return this['4123:0']({value})
  },
  '4126:1' ({ns}) {
    return this['4122:1']({ns})
  },
  '4127:0' ({value}) {
    return this['4123:0']({value})
  },
  '4128:1' ({nsl}) {
    return C(nsl[0], 4)
  },
  '4129:0' ({value}) {
    return this['4123:0']({value})
  },
  '4130:1' ({nsl}) {
    // [..a, ..b, ..c, ..d, ..e]
    let n = 0
    let [a, b, c, d, e] = ns
    a && a[0] && a.forEach((f) => {
      b && b[0] && b.forEach((s) => {
        c && c[0] && c.forEach((t) => {
          d && d[0] && d.forEach((fo) => {
            e && e[0] && e.forEach((fif) => {
              if ((new Set([f, s, t, fo, fif])).size === [f, s, t, fo, fif].length) n++
            })
          })
        })
      })
    })
    return n
  },
  '4131:0' ({value}) {
    this.func = `[N(value, 10, 1, 2, 10, 1).length, N(value, 10, 1, 2, 10, 1)]`
    return [N(value, 10, 1, 2, 10, 1).length, N(value, 10, 1, 2, 10, 1)]
  },
  '4132:1' ({nsl}) {
    return C(nsl[0], 5)
  },
  '4133:0' ({value}) {
    return this['4131:0']({value})
  },
  '4134:1' ({nsl}) {
    return this['4130:1']({ns})
  },
  '4135:0' ({value}) {
    return this['4131:0']({value})
  },
  '4136:1' ({nsl}) {
    return C(nsl[0], 5)
  },
  '4137:0' ({value}) {
    return this['4131:0']({value})
  },
  '4140:0' ({nsl}) {
    return C(nsl[0], 3)
  },
  '4141:0' ({nsl}) {
    return C(nsl[0], 3)
  },
  '4142:0' ({nsl}) {
    return C(nsl[0], 4)
  },
  '4143:0' ({nsl}) {
    return C(nsl[0], 4)
  },
  '4144:0' ({nsl}) {
    return C(nsl[0], 5)
  },
  '4145:0' ({nsl}) {
    return C(nsl[0], 5)
  },
  '4138:1' ({ns}) {
    let NS = [2, 2, 4, 4, 6, 6, 8, 8, 10, 8, 8, 6, 6, 4, 4, 2, 2]
    return ns[0].reduce((p, n) => {
      return (p += NS[n - 3])
    }, 0)
  },
  '4139:1' ({nsl}) {
    return C(nsl[0], 1)
  },
  // title: '龙虎
  '4046:1' ({nsl}) {
    return C(nsl[0], 1)
  },
  '4147:1' ({nsl}) {
    return P(nsl)
  },
  // title: '定位胆
  '4101:1' ({nsl}) {
    return A(nsl)
  },
}