import { N, ON, P, A, C } from './base'
export default {
  // '定位胆',
  '2008:1' ({nsl}) {
    return Math.min(nsl[0], 1) + Math.min(nsl[1], 1) + Math.min(nsl[2], 1)
  },
  // '前三不定位'
  '2009:1' ({nsl}) {
    return Math.min(A(nsl), 3)
  },
   // '一中一',
  '2010:1' ({nsl}) {
    return Math.min(C(nsl[0], 1), 5)
  },
   // '二中二',
  '2011:1' ({nsl}) {
    return Math.min(C(nsl[0], 2), 10)
  },
   // '三中三',
  '2012:1' ({nsl}) {
    return Math.min(C(nsl[0], 3), 10)
  },
   // '四中四',
  '2013:1' ({nsl}) {
    return Math.min(C(nsl[0], 4), 5)
  },
   // '六中五',
  '2015:1' ({nsl}) {
    return C(nsl[0] - 5, 1)
  },
   // '七中五',
  '2016:1' ({nsl}) {
    return C(nsl[0] - 5, 2)
  },
   // '八中五',
  '2017:1' ({nsl}) {
    return C(nsl[0] - 5, 3)
  },
   // '一中一',
  '2018:0' ({value}) {
    return Math.min(N(value, 2, 1, 2, 11, 1).length, 5)
  },
   // '二中二',
  '2019:0' ({value}) {
    return Math.min(N(value, 4, 1, 2, 11, 1).length, 10)
  },
   // '三中三',
  '2020:0' ({value}) {
    return Math.min(N(value, 6, 1, 2, 11, 1).length, 10)
  },
   // '四中四',
  '2021:0' ({value}) {
    return Math.min(N(value, 8, 1, 2, 11, 1).length, 5)
  },
  // '六中五',
  '2023:0' ({value}) {
    return Math.min(N(value, 12, 1, 2, 11, 1).length, 6)
  },
   // '七中五',
  '2024:0' ({value}) {
    return Math.min(N(value, 14, 1, 2, 11, 1).length, 15)
  },
   // '八中五',
  '2025:0' ({value}) {
    return Math.min(N(value, 16, 1, 2, 11, 1).length, 20)
  },
   // '二中二',
  '2026:1' ({nsl}) {
    return Math.min(C(nsl[1], 1), 4)
  },
   // '三中三',
  '2027:1' ({nsl}) {
    if (C(nsl[1], (3 - nsl[0])) >= C(5 - nsl[0], (3 - nsl[0]))) {
      return C(5 - nsl[0], (3 - nsl[0]))
    } else {
      return C(nsl[1], (3 - nsl[0]))
    }
  },
   // '四中四',
  '2028:1' ({nsl}) {
    if (C(nsl[1], (4 - nsl[0])) >= C(5 - nsl[0], (4 - nsl[0]))) {
      return C(5 - nsl[0], (4 - nsl[0]))
    } else {
      return C(nsl[1], (4 - nsl[0]))
    }
  },
   // '六中五',
  '2030:1' ({nsl}) {
    return C(nsl[0] + nsl[1] - 5, 1)
  },
   // '七中五',
  '2031:1' ({nsl}) {
    return C(nsl[0] + nsl[1] - 5, 2)
  },
   // '八中五',
  '2032:1' ({nsl}) {
    return C(nsl[0] + nsl[1] - 5, 3)
  }
}