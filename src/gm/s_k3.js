let commonRow = {
  // 名字
  n: '',
  // ????
  ncls: '',
  // 类型
  t: 'number',
  // 最小值
  min: 0,
  // 最大值
  max: 9,
  // length of number, ex. 1 => 01
  l: 1,
  // 至多可以选择多少个号码selected length
  sl: 0,
  // last selected item
  lsv: null,
  // rowclass
  rcls: 'j_c',
  // class
  cls: 'dice',
  // 结构
  struct: '',
  // 按钮
  // btns: ['全', '大', '小', '奇', '偶', '清'],
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
  // title: '二同复选'
  '5009:1' () {
    return [
      getCommonRow({n: '同号', vs: [{s: false, n: '11', col: 'col-33', c: 'dice_11 w_80', v: 1}, {s: false, n: '22', col: 'col-33', c: 'dice_22 w_80', v: 2}, {s: false, n: '33', col: 'col-33', c: 'dice_33 w_80', v: 3}, {s: false, n: '44', col: 'col-33', c: 'dice_44 w_80', v: 4}, {s: false, n: '55', col: 'col-33', c: 'dice_55 w_80', v: 5}, {s: false, n: '66', col: 'col-33', c: 'dice_66 w_80', v: 6}]}),
    ]
  },
  // title: '二同单选'
  '5010:1' () {
    return [
      getCommonRow({n: '同号', exclu: true, vs: [{s: false, n: '11', col: 'col-33', c: 'dice_11 w_80', v: 1}, {s: false, n: '22', col: 'col-33', c: 'dice_22 w_80', v: 2}, {s: false, n: '33', col: 'col-33', c: 'dice_33 w_80', v: 3}, {s: false, n: '44', col: 'col-33', c: 'dice_44 w_80', v: 4}, {s: false, n: '55', col: 'col-33', c: 'dice_55 w_80', v: 5}, {s: false, n: '66', col: 'col-33', c: 'dice_66 w_80', v: 6}]}),
      getCommonRow({n: '不同号', exclu: true, vs: [{s: false, n: '1', col: 'col-16', c: 'dice_1 w_40', v: 1}, {s: false, n: '2', col: 'col-16', c: 'dice_2 w_40', v: 2}, {s: false, n: '3', col: 'col-16', c: 'dice_3 w_40', v: 3}, {s: false, n: '4', col: 'col-16', c: 'dice_4 w_40', v: 4}, {s: false, n: '5', col: 'col-16', c: 'dice_5 w_40', v: 5}, {s: false, n: '6', col: 'col-16', c: 'dice_6 w_40', v: 6}]}),
    ]
  },
  // title: '二不同标准'
  '5012:1' () {
    return [
      getCommonRow({n: '标准', vs: [{s: false, n: '1', col: 'col-16', c: 'dice_1 w_40', v: 1}, {s: false, n: '2', col: 'col-16', c: 'dice_2 w_40', v: 2}, {s: false, n: '3', col: 'col-16', c: 'dice_3 w_40', v: 3}, {s: false, n: '4', col: 'col-16', c: 'dice_4 w_40', v: 4}, {s: false, n: '5', col: 'col-16', c: 'dice_5 w_40', v: 5}, {s: false, n: '6', col: 'col-16', c: 'dice_6 w_40', v: 6}]}),
    ]
  },
  // title: '二不同胆拖'
  '5014:1' () {
    return [
      getCommonRow({n: '胆码', exclu: true, sl: 1, vs: [{s: false, n: '1', col: 'col-16', c: 'dice_1 w_40', v: 1}, {s: false, n: '2', col: 'col-16', c: 'dice_2 w_40', v: 2}, {s: false, n: '3', col: 'col-16', c: 'dice_3 w_40', v: 3}, {s: false, n: '4', col: 'col-16', c: 'dice_4 w_40', v: 4}, {s: false, n: '5', col: 'col-16', c: 'dice_5 w_40', v: 5}, {s: false, n: '6', col: 'col-16', c: 'dice_6 w_40', v: 6}]}),
      getCommonRow({n: '拖码', exclu: true, vs: [{s: false, n: '1', col: 'col-16', c: 'dice_1 w_40', v: 1}, {s: false, n: '2', col: 'col-16', c: 'dice_2 w_40', v: 2}, {s: false, n: '3', col: 'col-16', c: 'dice_3 w_40', v: 3}, {s: false, n: '4', col: 'col-16', c: 'dice_4 w_40', v: 4}, {s: false, n: '5', col: 'col-16', c: 'dice_5 w_40', v: 5}, {s: false, n: '6', col: 'col-16', c: 'dice_6 w_40', v: 6}]}),
    ]
  },
  // title: '三同单选'
  '5003:1' () {
    return [
      getCommonRow({n: '三同号', vs: [{s: false, n: '111', col: 'col-50', c: 'dice_111 w_120', v: 1}, {s: false, n: '222', col: 'col-50', c: 'dice_222 w_120', v: 2}, {s: false, n: '333', col: 'col-50', c: 'dice_333 w_120', v: 3}, {s: false, n: '444', col: 'col-50', c: 'dice_444 w_120', v: 4}, {s: false, n: '555', col: 'col-50', c: 'dice_555 w_120', v: 5}, {s: false, n: '666', col: 'col-50', c: 'dice_666 w_120', v: 6}]}),
    ]
  },
  // title: '三同通选'
  '5002:1' () {
    return [
      getCommonRow({n: '通选', rcls: 'j_s', cls: '', btns: [], vs: [{s: false, n: '全', v: 1}]}),
    ]
  },
  // title: '三不同标准'
  '5004:1' () {
    return [
      getCommonRow({n: '标准', vs: [{s: false, n: '1', col: 'col-16', c: 'dice_1 w_40', v: 1}, {s: false, n: '2', col: 'col-16', c: 'dice_2 w_40', v: 2}, {s: false, n: '3', col: 'col-16', c: 'dice_3 w_40', v: 3}, {s: false, n: '4', col: 'col-16', c: 'dice_4 w_40', v: 4}, {s: false, n: '5', col: 'col-16', c: 'dice_5 w_40', v: 5}, {s: false, n: '6', col: 'col-16', c: 'dice_6 w_40', v: 6}]}),
    ]
  },
  // title: '三不同胆拖'
  '5006:1' () {
    return [
      getCommonRow({n: '胆码', exclu: true, sl: 1, vs: [{s: false, n: '1', col: 'col-16', c: 'dice_1 w_40', v: 1}, {s: false, n: '2', col: 'col-16', c: 'dice_2 w_40', v: 2}, {s: false, n: '3', col: 'col-16', c: 'dice_3 w_40', v: 3}, {s: false, n: '4', col: 'col-16', c: 'dice_4 w_40', v: 4}, {s: false, n: '5', col: 'col-16', c: 'dice_5 w_40', v: 5}, {s: false, n: '6', col: 'col-16', c: 'dice_6 w_40', v: 6}]}),
      getCommonRow({n: '拖码', exclu: true, vs: [{s: false, n: '1', col: 'col-16', c: 'dice_1 w_40', v: 1}, {s: false, n: '2', col: 'col-16', c: 'dice_2 w_40', v: 2}, {s: false, n: '3', col: 'col-16', c: 'dice_3 w_40', v: 3}, {s: false, n: '4', col: 'col-16', c: 'dice_4 w_40', v: 4}, {s: false, n: '5', col: 'col-16', c: 'dice_5 w_40', v: 5}, {s: false, n: '6', col: 'col-16', c: 'dice_6 w_40', v: 6}]}),
    ]
  },
  // title: '三连单选'
  '5016:1' () {
    return [
      getCommonRow({n: '三连号', btns: [], vs: [{s: false, n: '123', col: 'col-50', c: 'dice_123 w_120', v: 1}, {s: false, n: '234', col: 'col-50', c: 'dice_234 w_120', v: 2}, {s: false, n: '345', col: 'col-50', c: 'dice_345 w_120', v: 3}, {s: false, n: '456', col: 'col-50', c: 'dice_456 w_120', v: 4}]}),
    ]
  },
  // title: '三连通选'
  '5008:1' () {
    return [
      getCommonRow({n: '通选', rcls: 'j_s', cls: '', btns: [], vs: [{s: false, n: '全', v: 1}]}),
    ]
  },
  // title: '和值'
  '5001:1' () {
    return [
      getCommonRow({n: '和值', rcls: 'j_s', cls: '', struct: 'mixin', min: 3, max: 18, l: 2}),
    ]
  },
  // title: '猜1个号就中奖'
  '5015:1' () {
    return [
      getCommonRow({n: '1号中奖', sl: 1, btns: [], vs: [{s: false, n: '1', col: 'col-16', c: 'dice_1 w_40', v: 1}, {s: false, n: '2', col: 'col-16', c: 'dice_2 w_40', v: 2}, {s: false, n: '3', col: 'col-16', c: 'dice_3 w_40', v: 3}, {s: false, n: '4', col: 'col-16', c: 'dice_4 w_40', v: 4}, {s: false, n: '5', col: 'col-16', c: 'dice_5 w_40', v: 5}, {s: false, n: '6', col: 'col-16', c: 'dice_6 w_40', v: 6}]}),
    ]
  }
}