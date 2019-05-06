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
  max: 9,
  // length of number, ex. 1 => 01
  l: 1,
  // 至多可以选择多少个号码selected length
  sl: 0,
  // last selected item
  lsv: null,
  // 结构
  struct: '',
  rcls: 'default',
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
  '1250:1' () {
    return [
      getCommonRow({n: '万位', vs: [{s: false, n: '大', v: 1}, {s: false, n: '小', v: 2}, {s: false, n: '单', v: 3}, {s: false, n: '双', v: 4}, {s: false, n: '质', v: 5}, {s: false, n: '合', v: 6},]}),
      getCommonRow({n: '千位', vs: [{s: false, n: '大', v: 1}, {s: false, n: '小', v: 2}, {s: false, n: '单', v: 3}, {s: false, n: '双', v: 4}, {s: false, n: '质', v: 5}, {s: false, n: '合', v: 6},]}),
      getCommonRow({n: '百位', vs: [{s: false, n: '大', v: 1}, {s: false, n: '小', v: 2}, {s: false, n: '单', v: 3}, {s: false, n: '双', v: 4}, {s: false, n: '质', v: 5}, {s: false, n: '合', v: 6},]}),
      getCommonRow({n: '十位', vs: [{s: false, n: '大', v: 1}, {s: false, n: '小', v: 2}, {s: false, n: '单', v: 3}, {s: false, n: '双', v: 4}, {s: false, n: '质', v: 5}, {s: false, n: '合', v: 6},]}),
      getCommonRow({n: '个位', vs: [{s: false, n: '大', v: 1}, {s: false, n: '小', v: 2}, {s: false, n: '单', v: 3}, {s: false, n: '双', v: 4}, {s: false, n: '质', v: 5}, {s: false, n: '合', v: 6},]}),
    ]
  },
  '1251:1' () {
    return [
      getCommonRow({n: '总和、龙虎', nonasv: true, vs: [{s: false, n: '总大', v: '1', oddIndex: 2}, {s: false, n: '总小', v: '2', oddIndex: 2}, {s: false, n: '总单', v: '3', oddIndex: 2}, {s: false, n: '总双', v: '4', oddIndex: 2}, {s: false, n: '龙', v: '5', oddIndex: 1}, {s: false, n: '虎', v: '6', oddIndex: 1}, {s: false, n: '和', v: '7', oddIndex: 0}]}),
    ]
  },
  '1252:1' () {
    return [
      getCommonRow({n: '万位', col: 'col-20', oddIndex: 0}),
      getCommonRow({n: '千位', col: 'col-20', oddIndex: 0}),
      getCommonRow({n: '百位', col: 'col-20', oddIndex: 0}),
      getCommonRow({n: '十位', col: 'col-20', oddIndex: 0}),
      getCommonRow({n: '个位', col: 'col-20', oddIndex: 0}),
    ]
  },
  '1253:1' () {
    return [
      getCommonRow({n: '万定位', col: 'col-20', oddIndex: 0, vs: [{s: false, n: '0', v: '0'}, {s: false, n: '1', v: '0'}, {s: false, n: '2', v: '0'}, {s: false, n: '3', v: '0'}, {s: false, n: '4', v: '0'}, {s: false, n: '5', v: '0'}, {s: false, n: '6', v: '0'}, {s: false, n: '7', v: '0'}, {s: false, n: '8', v: '0'}, {s: false, n: '9', v: '0'}, {s: false, n: '大', v: '1', oddIndex: 1}, {s: false, n: '小', v: '2', oddIndex: 1}, {s: false, n: '单', v: '3', oddIndex: 1}, {s: false, n: '双', v: '4', oddIndex: 1}, {s: false, n: '质', v: '5', oddIndex: 1}, {s: false, n: '合', v: '6', oddIndex: 1}]}),
      getCommonRow({n: '千定位', col: 'col-20', oddIndex: 0, vs: [{s: false, n: '0', v: '0'}, {s: false, n: '1', v: '0'}, {s: false, n: '2', v: '0'}, {s: false, n: '3', v: '0'}, {s: false, n: '4', v: '0'}, {s: false, n: '5', v: '0'}, {s: false, n: '6', v: '0'}, {s: false, n: '7', v: '0'}, {s: false, n: '8', v: '0'}, {s: false, n: '9', v: '0'}, {s: false, n: '大', v: '1', oddIndex: 1}, {s: false, n: '小', v: '2', oddIndex: 1}, {s: false, n: '单', v: '3', oddIndex: 1}, {s: false, n: '双', v: '4', oddIndex: 1}, {s: false, n: '质', v: '5', oddIndex: 1}, {s: false, n: '合', v: '6', oddIndex: 1}]}),
      getCommonRow({n: '百定位', col: 'col-20', oddIndex: 0, vs: [{s: false, n: '0', v: '0'}, {s: false, n: '1', v: '0'}, {s: false, n: '2', v: '0'}, {s: false, n: '3', v: '0'}, {s: false, n: '4', v: '0'}, {s: false, n: '5', v: '0'}, {s: false, n: '6', v: '0'}, {s: false, n: '7', v: '0'}, {s: false, n: '8', v: '0'}, {s: false, n: '9', v: '0'}, {s: false, n: '大', v: '1', oddIndex: 1}, {s: false, n: '小', v: '2', oddIndex: 1}, {s: false, n: '单', v: '3', oddIndex: 1}, {s: false, n: '双', v: '4', oddIndex: 1}, {s: false, n: '质', v: '5', oddIndex: 1}, {s: false, n: '合', v: '6', oddIndex: 1}]}),
      getCommonRow({n: '十定位', col: 'col-20', oddIndex: 0, vs: [{s: false, n: '0', v: '0'}, {s: false, n: '1', v: '0'}, {s: false, n: '2', v: '0'}, {s: false, n: '3', v: '0'}, {s: false, n: '4', v: '0'}, {s: false, n: '5', v: '0'}, {s: false, n: '6', v: '0'}, {s: false, n: '7', v: '0'}, {s: false, n: '8', v: '0'}, {s: false, n: '9', v: '0'}, {s: false, n: '大', v: '1', oddIndex: 1}, {s: false, n: '小', v: '2', oddIndex: 1}, {s: false, n: '单', v: '3', oddIndex: 1}, {s: false, n: '双', v: '4', oddIndex: 1}, {s: false, n: '质', v: '5', oddIndex: 1}, {s: false, n: '合', v: '6', oddIndex: 1}]}),
      getCommonRow({n: '个定位', col: 'col-20', oddIndex: 0, vs: [{s: false, n: '0', v: '0'}, {s: false, n: '1', v: '0'}, {s: false, n: '2', v: '0'}, {s: false, n: '3', v: '0'}, {s: false, n: '4', v: '0'}, {s: false, n: '5', v: '0'}, {s: false, n: '6', v: '0'}, {s: false, n: '7', v: '0'}, {s: false, n: '8', v: '0'}, {s: false, n: '9', v: '0'}, {s: false, n: '大', v: '1', oddIndex: 1}, {s: false, n: '小', v: '2', oddIndex: 1}, {s: false, n: '单', v: '3', oddIndex: 1}, {s: false, n: '双', v: '4', oddIndex: 1}, {s: false, n: '质', v: '5', oddIndex: 1}, {s: false, n: '合', v: '6', oddIndex: 1}]}),
    ]
  },
  '1256:1' () {
    return [
      getCommonRow({n: '全五', nonasv: true, col: 'col-20', oddIndex: 0}),
    ]
  },
  '1257:1' () {
    return [
      getCommonRow({n: '全五', nonasv: true, col: 'col-20', oddIndex: 0}),
    ]
  },
  '1258:1' () {
    return [
      getCommonRow({n: '全五', nonasv: true, col: 'col-20', oddIndex: 0}),
    ]
  },
  '1259:1' () {
    return [
      getCommonRow({n: '全五', nonasv: true, col: 'col-20', oddIndex: 0}),
    ]
  },
  '1260:1' () {
    return [
      getCommonRow({n: '第一个投注号码', t: 'fnumber', odd: '...'}),
      getCommonRow({n: '第二个投注号码', t: 'fnumber', odd: '...'}),
    ]
  },
  '1261:1' () {
    return [
      getCommonRow({n: '第一个投注号码', t: 'fnumber', odd: '...'}),
      getCommonRow({n: '第二个投注号码', t: 'fnumber', odd: '...'}),
    ]
  },
  '1262:1' () {
    return [
      getCommonRow({n: '第一个投注号码', t: 'fnumber', odd: '...'}),
      getCommonRow({n: '第二个投注号码', t: 'fnumber', odd: '...'}),
    ]
  },
  '1263:1' () {
    return [
      getCommonRow({n: '万千', struct: 'following', vs: [{s: false, n: '单', v: '3'}, {s: false, n: '双', v: '4'}]}),
      getCommonRow({n: '万百', struct: 'following', vs: [{s: false, n: '单', v: '3'}, {s: false, n: '双', v: '4'}]}),
      getCommonRow({n: '万十', struct: 'following', vs: [{s: false, n: '单', v: '3'}, {s: false, n: '双', v: '4'}]}),
      getCommonRow({n: '万个', struct: 'following', vs: [{s: false, n: '单', v: '3'}, {s: false, n: '双', v: '4'}]}),
      getCommonRow({n: '千百', struct: 'following', vs: [{s: false, n: '单', v: '3'}, {s: false, n: '双', v: '4'}]}),
      getCommonRow({n: '千十', struct: 'following', vs: [{s: false, n: '单', v: '3'}, {s: false, n: '双', v: '4'}]}),
      getCommonRow({n: '千个', struct: 'following', vs: [{s: false, n: '单', v: '3'}, {s: false, n: '双', v: '4'}]}),
      getCommonRow({n: '百十', struct: 'following', vs: [{s: false, n: '单', v: '3'}, {s: false, n: '双', v: '4'}]}),
      getCommonRow({n: '百个', struct: 'following', vs: [{s: false, n: '单', v: '3'}, {s: false, n: '双', v: '4'}]}),
      getCommonRow({n: '十个', struct: 'following', vs: [{s: false, n: '单', v: '3'}, {s: false, n: '双', v: '4'}]}),
    ]
  },
  '1273:1' () {
    return [
      getCommonRow({n: '龙1vs虎2', struct: 'following', col: 'col-33 pl_2 pr_2', vs: [{s: false, n: '龙1', nv: '龙', v: '3', oddIndex: 1}, {s: false, n: '和局', nv: '和', v: '4', oddIndex: 0}, {s: false, n: '虎2', nv: '虎', v: '4', oddIndex: 1}]}),
      getCommonRow({n: '龙1vs虎3', struct: 'following', col: 'col-33 pl_2 pr_2', vs: [{s: false, n: '龙1', nv: '龙', v: '3', oddIndex: 1}, {s: false, n: '和局', nv: '和', v: '4', oddIndex: 0}, {s: false, n: '虎3', nv: '虎', v: '4', oddIndex: 1}]}),
      getCommonRow({n: '龙1vs虎4', struct: 'following', col: 'col-33 pl_2 pr_2', vs: [{s: false, n: '龙1', nv: '龙', v: '3', oddIndex: 1}, {s: false, n: '和局', nv: '和', v: '4', oddIndex: 0}, {s: false, n: '虎4', nv: '虎', v: '4', oddIndex: 1}]}),
      getCommonRow({n: '龙1vs虎5', struct: 'following', col: 'col-33 pl_2 pr_2', vs: [{s: false, n: '龙1', nv: '龙', v: '3', oddIndex: 1}, {s: false, n: '和局', nv: '和', v: '4', oddIndex: 0}, {s: false, n: '虎5', nv: '虎', v: '4', oddIndex: 1}]}),
      getCommonRow({n: '龙2vs虎3', struct: 'following', col: 'col-33 pl_2 pr_2', vs: [{s: false, n: '龙2', nv: '龙', v: '3', oddIndex: 1}, {s: false, n: '和局', nv: '和', v: '4', oddIndex: 0}, {s: false, n: '虎3', nv: '虎', v: '4', oddIndex: 1}]}),
      getCommonRow({n: '龙2vs虎4', struct: 'following', col: 'col-33 pl_2 pr_2', vs: [{s: false, n: '龙2', nv: '龙', v: '3', oddIndex: 1}, {s: false, n: '和局', nv: '和', v: '4', oddIndex: 0}, {s: false, n: '虎4', nv: '虎', v: '4', oddIndex: 1}]}),
      getCommonRow({n: '龙2vs虎5', struct: 'following', col: 'col-33 pl_2 pr_2', vs: [{s: false, n: '龙2', nv: '龙', v: '3', oddIndex: 1}, {s: false, n: '和局', nv: '和', v: '4', oddIndex: 0}, {s: false, n: '虎5', nv: '虎', v: '4', oddIndex: 1}]}),
      getCommonRow({n: '龙3vs虎4', struct: 'following', col: 'col-33 pl_2 pr_2', vs: [{s: false, n: '龙3', nv: '龙', v: '3', oddIndex: 1}, {s: false, n: '和局', nv: '和', v: '4', oddIndex: 0}, {s: false, n: '虎4', nv: '虎', v: '4', oddIndex: 1}]}),
      getCommonRow({n: '龙3vs虎5', struct: 'following', col: 'col-33 pl_2 pr_2', vs: [{s: false, n: '龙3', nv: '龙', v: '3', oddIndex: 1}, {s: false, n: '和局', nv: '和', v: '4', oddIndex: 0}, {s: false, n: '虎5', nv: '虎', v: '4', oddIndex: 1}]}),
      getCommonRow({n: '龙4vs虎5', struct: 'following', col: 'col-33 pl_2 pr_2', vs: [{s: false, n: '龙4', nv: '龙', v: '3', oddIndex: 1}, {s: false, n: '和局', nv: '和', v: '4', oddIndex: 0}, {s: false, n: '虎5', nv: '虎', v: '4', oddIndex: 1}]}),
    ]
  },
}