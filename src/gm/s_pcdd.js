let commonRow = {
  // 名字
  n: '',
  // ????
  ncls: '',
  // 类型
  t: 'times',
  // 最小值
  min: 0,
  // 最大值
  max: 27,
  // length of number, ex. 1 => 01
  l: 1,
  // 至多可以选择多少个号码selected length
  sl: 0,
  // last selected item
  lsv: null,
  // 结构
  struct: '',
  // 按钮
  btns: [],
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
  '8001:1' () {
    return [
      getCommonRow()
    ]
  },
  '8002:1' () {
    return [
      getCommonRow({vs: [{s: false, n: '极大', v: '1'}, {s: false, n: '极小', v: '2'}]})
    ]

  },
  '8003:1' () {
    return [
      getCommonRow({vs: [{s: false, n: '大', v: '1'}, {s: false, n: '小', v: '2'}, {s: false, n: '单', v: '3'}, {s: false, n: '双', v: '4'}]})
    ]
  },
  '8004:1' () {
    return [
      getCommonRow({vs: [{s: false, n: '大单', v: '1'}, {s: false, n: '大双', v: '3'}, {s: false, n: '小单', v: '4'}, {s: false, n: '小双', v: '2'}]})
    ]
  }
}