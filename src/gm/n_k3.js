import { N, ON, P, A, C } from './base'
export default {
  // title: '二同复选'
  '5009:1' ({nsl}) {
    // return C(nsl[0], 1)
    return C(nsl[0], 1) * 5
  },
  // title: '二同单选'
  '5010:1' ({nsl, r}) {
    return C(nsl[0], 1) * C(nsl[1], 1) - r
  },
  // title: '二不同标准'
  '5012:1' ({nsl}) {
    return C(nsl[0], 2)
  },
  // title: '二不同胆拖'
  '5014:1' ({nsl, r}) {
    return C(nsl[0], 1) * C(nsl[1], 1) - r
  },
  // title: '三同单选'
  '5003:1' ({nsl}) {
    return C(nsl[0], 1)
  },
  // title: '三同通选'
  '5002:1' ({nsl}) {
    return C(nsl[0], 1)
  },
  // title: '三不同标准'
  '5004:1' ({nsl}) {
    return C(nsl[0], 3)
  },
  // title: '三不同胆拖'
  '5006:1' ({nsl}) {
    return nsl[0] === 2 ? nsl[1] : nsl[0] * C(nsl[1], 2)
  },
  // title: '三连单选'
  '5016:1' ({nsl}) {
    return C(nsl[0], 1)
  },
  // title: '三连通选'
  '5008:1' ({nsl}) {
    return C(nsl[0], 1)
  },
  // title: '和值'
  '5001:1' ({nsl}) {
    return C(nsl[0], 1)
  },
  // title: '猜1个号就中奖'
  '5015:1' ({nsl}) {
    // return C(nsl[0], 1) * 21
    return C(nsl[0], 1)
  }
}