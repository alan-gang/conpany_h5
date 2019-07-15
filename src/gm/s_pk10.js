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
  max: 10,
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
  // title: '猜冠军
  '4001:1' () {
    return [
      getCommonRow({n: '冠军'}),
    ]
  },
  // title: '猜冠亚军
  '4002:1' () {
    return [
      getCommonRow({n: '冠军'}),
      getCommonRow({n: '亚军'}),
    ]
  },
  // title: '猜冠亚军单式
  '4013:0' () {},
  // title: '猜前三名
  '4003:1' () {
    return [
      getCommonRow({n: '冠军'}),
      getCommonRow({n: '亚军'}),
      getCommonRow({n: '季军'}),
    ]
  },
  // title: '猜前三名单式
  '4016:0' () {},
  // title: '猜前四名
  '4004:1' () {
    return [
      getCommonRow({n: '冠军'}),
      getCommonRow({n: '亚军'}),
      getCommonRow({n: '季军'}),
      getCommonRow({n: '第四名'}),
    ]
  },
  // title: '猜前四名单式
  '4017:0' () {},
  // title: '猜三四名复式'
  '4015:1' () {
    return [
      getCommonRow({n: '季军'}),
      getCommonRow({n: '第四名'}),
    ]
  },
  // title: '猜三四名单式'
  '4014:0' () {},
  // title: '龙虎
  '4011:1' () {
    return [
      getCommonRow({n: '龙虎', exclu: true, btns: [], vs: [{s: false, n: '龙', v: 1}, {s: false, n: '虎', v: 1}]}),
    ]
  },
  // title: '定位胆
  '4012:1' () {
    return [
      getCommonRow({n: '第一名'}),
      getCommonRow({n: '第二名'}),
      getCommonRow({n: '第三名'}),
      getCommonRow({n: '第四名'}),
      getCommonRow({n: '第五名'}),
      getCommonRow({n: '第六名'}),
      getCommonRow({n: '第七名'}),
      getCommonRow({n: '第八名'}),
      getCommonRow({n: '第九名'}),
      getCommonRow({n: '第十名'}),
    ]
  },
}