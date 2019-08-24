let commonRow = {
  // 名字
  n: '',
  // ????
  ncls: '',
  // 类型
  t: 'times',
  // 最小值
  min: 1,
  // 最大值
  max: 49,
  // length of number, ex. 1 => 01
  l: 1,
  // 至多可以选择多少个号码selected length
  sl: 0,
  // last selected item
  lsv: null,
  // 结构
  struct: 'following',
  rcls: 'default row_hc6',
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
  args.vs && args.vs.forEach(x => (x.t = ''))
  return Object.assign({}, commonRow, args)
}
export default {
  // 特码
  '7001:1' () {
    return [
      getCommonRow({})
    ]
  },
  // 正码
  '7006:1' () {
    return [
      getCommonRow({})
    ]
  },
  // 特肖
  '7007:1' () {
    return [
      getCommonRow({col: 'col-100', oddIndex: 0, vs: [
        {s: false, n: '鼠', v: 1, tails: '鼠'._AtoN()},
        {s: false, n: '牛', v: 2, tails: '牛'._AtoN()},
        {s: false, n: '虎', v: 3, tails: '虎'._AtoN()},
        {s: false, n: '兔', v: 4, tails: '兔'._AtoN()},
        {s: false, n: '龙', v: 5, tails: '龙'._AtoN()},
        {s: false, n: '蛇', v: 6, tails: '蛇'._AtoN()},
        {s: false, n: '马', v: 7, tails: '马'._AtoN()},
        {s: false, n: '羊', v: 8, tails: '羊'._AtoN()},
        {s: false, n: '猴', v: 9, tails: '猴'._AtoN()},
        {s: false, n: '鸡', v: 10, tails: '鸡'._AtoN()},
        {s: false, n: '狗', v: 11, tails: '狗'._AtoN()},
        {s: false, n: '猪', v: 12, tails: '猪'._AtoN()},
      ]})
    ]
  },
  // 波色
  '7005:1' () {
    return [
      getCommonRow({col: 'col-100', oddIndex: 0, struct: 'following-br-tail', vs: [
        {s: false, n: '红', v: 1, tails: 'red'._CtoN()},
        {s: false, n: '蓝', v: 2, tails: 'blue'._CtoN()},
        {s: false, n: '绿', v: 3, tails: 'green'._CtoN()},
      ]})
    ]
  },
  // 一肖
  '7008:1' () {
    return [
      getCommonRow({col: 'col-100', oddIndex: 0, t: 'number', vs: [
        {s: false, n: '鼠', v: 1, tails: '鼠'._AtoN()},
        {s: false, n: '牛', v: 2, tails: '牛'._AtoN()},
        {s: false, n: '虎', v: 3, tails: '虎'._AtoN()},
        {s: false, n: '兔', v: 4, tails: '兔'._AtoN()},
        {s: false, n: '龙', v: 5, tails: '龙'._AtoN()},
        {s: false, n: '蛇', v: 6, tails: '蛇'._AtoN()},
        {s: false, n: '马', v: 7, tails: '马'._AtoN()},
        {s: false, n: '羊', v: 8, tails: '羊'._AtoN()},
        {s: false, n: '猴', v: 9, tails: '猴'._AtoN()},
        {s: false, n: '鸡', v: 10, tails: '鸡'._AtoN()},
        {s: false, n: '狗', v: 11, tails: '狗'._AtoN()},
        {s: false, n: '猪', v: 12, tails: '猪'._AtoN()},
      ]})
    ]
  },
  // 2连肖
  '7002:1' () {
    return this['7008:1']()
  },
  // 3连肖
  '7003:1' () {
    return this['7008:1']()
  },
  // 4连肖
  '7004:1' () {
    return this['7008:1']()
  },
  // '正一码'
  '7009:1' () {
    return [
      getCommonRow({vs: [{s: false, n: '大', v: 1}, {s: false, n: '小', v: 2}, {s: false, n: '单', v: 3}, {s: false, n: '双', v: 4}]})
    ]
  },
  // '正二码'
  '7010:1' () {
    return this['7009:1']()
  },
  // '正三码'
  '7011:1' () {
    return this['7009:1']()
  },
  // '正四码'
  '7012:1' () {
    return this['7009:1']()
  },
  // '正五码'
  '7013:1' () {
    return this['7009:1']()
  },
  // '正六码'
  '7014:1' () {
    return this['7009:1']()
  },
  // '特码'
  '7015:1' () {
    return this['7009:1']()
  },
  // '正特和值'
  '7016:1' () {
    return this['7009:1']()
  },
  // '1尾'
  '7017:1' () {
    return [
      getCommonRow({n: '1尾', min: 0, max: 9, oddIndex: 0})
    ]
  }
}