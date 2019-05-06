import { N, ON, P, A, C } from './base'
export default {
  // title: '任选一'
  '3001:1' ({nsl}) {
    return C(nsl[0], 1)
  },
  // title: '任选二'
  '3002:1' ({nsl}) {
    return C(nsl[0], 2)
  },
  // title: '任选三'
  '3003:1' ({nsl}) {
    return C(nsl[0], 3)
  },
  // title: '任选四'
  '3004:1' ({nsl}) {
    return C(nsl[0], 4)
  },
  // title: '任选五'
  '3005:1' ({nsl}) {
    return C(nsl[0], 5)
  },
  // title: '任选六'
  '3006:1' ({nsl}) {
    return C(nsl[0], 6)
  },
  // title: '任选七'
  '3007:1' ({nsl}) {
    return C(nsl[0], 7)
  },
  // title: '上下盘'
  '3008:1' ({nsl}) {
    return C(nsl[0], 1)
  },
  // title: '奇偶盘'
  '3009:1' ({nsl}) {
    return C(nsl[0], 1)
  },
  // title: '和值大小单双'
  '3010:1' ({nsl}) {
    return C(nsl[0], 1)
  },
  // title: '五行'
  '3011:1' ({nsl}) {
    return C(nsl[0], 1)
  }
}