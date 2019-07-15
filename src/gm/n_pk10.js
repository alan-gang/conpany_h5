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
    this.func = `[N(value, 4, 1, 2, 10, 1).length, N(value, 4, 1, 2, 10, 1)]`
    return [N(value, 4, 1, 2, 10, 1).length, N(value, 4, 1, 2, 10, 1)]
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
    this.func = `[N(value, 4, 1, 2, 10, 1).length, N(value, 4, 1, 2, 10, 1)]`
    return [N(value, 4, 1, 2, 10, 1).length, N(value, 4, 1, 2, 10, 1)]
  },
  // title: '龙虎
  '4011:1' ({nsl}) {
    return C(nsl[0], 1)
  },
  // title: '定位胆
  '4012:1' ({nsl}) {
    return A(nsl)
  },
}