import { N, ON, P, A, C } from './base'
export default {
  // 特码
  '7001:1' ({nsl}) {
    return C(nsl[0], 1)
  },
  // 正码
  '7006:1' ({nsl}) {
    return C(nsl[0], 1)
  },
  // 特肖
  '7007:1' ({nsl}) {
    return A(nsl)
  },
  // 波色
  '7005:1' ({nsl}) {
    return A(nsl)
  },
  // 一肖
  '7008:1' ({nsl}) {
    return C(A(nsl), 1)
  },
  // 2连肖
  '7002:1' ({nsl}) {
    return C(A(nsl), 2)
  },
  // 3连肖
  '7003:1' ({nsl}) {
    return C(A(nsl), 3)
  },
  // 4连肖
  '7004:1' ({nsl}) {
    return C(A(nsl), 4)
  },
  // '正一码'
  '7009:1' ({nsl}) {
    return C(nsl, 1)
  },
  // '正二码'
  '7010:1' ({nsl}) {
    return C(nsl, 1)
  },
  // '正三码'
  '7011:1' ({nsl}) {
    return C(nsl, 1)
  },
  // '正四码'
  '7012:1' ({nsl}) {
    return C(nsl, 1)
  },
  // '正五码'
  '7013:1' ({nsl}) {
    return C(nsl, 1)
  },
  // '正六码'
  '7014:1' ({nsl}) {
    return C(nsl, 1)
  },
  // '特码'
  '7015:1' ({nsl}) {
    return C(nsl, 1)
  },
  // '正特和值'
  '7016:1' ({nsl}) {
    return C(nsl, 1)
  },
  // '尾数'
  '7017:1' ({nsl}) {
    return C(nsl, 1)
  }
}