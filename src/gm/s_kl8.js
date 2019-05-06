let commonRow = {
  // 名字
  n: '',
  // ????
  ncls: '',
  // 类型
  t: 'number',
  // 最小值
  min: 1,
  // 最大值
  max: 80,
  // length of number, ex. 1 => 01
  l: 2,
  // 至多可以选择多少个号码selected length
  sl: 0,
  // last selected item
  lsv: null,
  // 结构
  struct: '',
  // 按钮
  btns: ['全', '大', '小', '奇', '偶', '清'],
  // 待生成
  // values
  vs: null,
  // 所选的号的值v集
  vc: [],
  // 所选的号的名n集
  nc: [],
  // 所选的号的行名n集
  rnc: [],
}


let getCommonRow = (args = {}) => {
  return Object.assign({}, commonRow, args)
}
export default {
  // title: '任选一'
  '3001:1' () {
    return [
      getCommonRow({n: '任选一', struct: 'mixin'})
    ]
  },
  // title: '任选二'
  '3002:1' () {
    return [
      getCommonRow({n: '任选二', struct: 'mixin'})
    ]
  },
  // title: '任选三'
  '3003:1' () {
    return [
      getCommonRow({n: '任选三', struct: 'mixin'})
    ]
  },
  // title: '任选四'
  '3004:1' () {
    return [
      getCommonRow({n: '任选四', struct: 'mixin'})
    ]
  },
  // title: '任选五'
  '3005:1' () {
    return [
      getCommonRow({n: '任选五', struct: 'mixin'})
    ]
  },
  // title: '任选六'
  '3006:1' () {
    return [
      getCommonRow({n: '任选六', struct: 'mixin'})
    ]
  },
  // title: '任选七'
  '3007:1' () {
    return [
      getCommonRow({n: '任选七', struct: 'mixin'})
    ]
  },
  // title: '上下盘'
  '3008:1' () {
    return [
      getCommonRow({n: '上下盘', btns: [], vs: [{s: false, n: '上盘', v: '1'}, {s: false, n: '下盘', v: '2'}, {s: false, n: '和盘', v: '3'}]}),
    ]
  },
  // title: '奇偶盘'
  '3009:1' () {
    return [
      getCommonRow({n: '奇偶盘', btns: [], vs: [{s: false, n: '奇盘', v: '1'}, {s: false, n: '偶盘', v: '2'}, {s: false, n: '和盘', v: '3'}]}),
    ]
  },
  // title: '和值大小单双'
  '3010:1' () {
    return [
      getCommonRow({n: '大小单双', btns: [], vs: [{s: false, n: '大', v: '1'}, {s: false, n: '小', v: '2'}, {s: false, n: '单', v: '3'}, {s: false, n: '双', v: '4'}]}),
    ]
  },
  // title: '五行'
  '3011:1' () {
    return [
      getCommonRow({n: '五行', btns: [], vs: [{s: false, n: '金', v: '1'}, {s: false, n: '木', v: '2'}, {s: false, n: '水', v: '3'}, {s: false, n: '火', v: '4'}, {s: false, n: '土', v: '5'}]}),
    ]
  }
}