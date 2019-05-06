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
  max: 11,
  // length of number, ex. 1 => 01
  l: 2,
  // 至多可以选择多少个号码selected length
  sl: 0,
  // 排外
  exclu: false,
  // 结构
  struct: 'mixin',
  // last selected item
  lsv: null,
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
  /*
  所有参数集：{
    // 号码集
    ns,
    // 号码集长度集
    nsl, [4, 4]
    // 位置集
    ps,
    // 位置集长度
    psl
    // 输入值
    value
    // 重号数量 [4,5,6]
    r 3
  }
   */
  /* ===========================================================================115============================================================================================== */

  /* *************************************三星*********************************** */
  /* ..............前三............... */
  /*
   *直选复式
   **/
  '2001:1' () {
    return [
      getCommonRow({n: '第一位'}),
      getCommonRow({n: '第二位'}),
      getCommonRow({n: '第三位'}),
    ]
  },
  /*
   *直选单式  N
   **/
  '2001:0' () {},
  /*
   *组选复式  C(n,3)
   **/
  '2002:1' () {
    return [
      getCommonRow({n: '组选'})
    ]
  },
  /*
   *组选单式  N
   **/
  '2003:0' () {},
  /*
   *组选胆拖  C(n,(3-m))
   **/
  '2004:1' () {
    return [
      getCommonRow({n: '胆码', exclu: true, sl: 2, btns: []}),
      getCommonRow({n: '拖码', exclu: true}),
    ]
  },

   // '直选复式',
  '2005:1' () {
    return [
      getCommonRow({n: '第一位'}),
      getCommonRow({n: '第二位'}),
    ]
  },
   // '直选单式',
  '2036:0' () {},
   // '组选复式',
  '2006:1' () {
    return [
      getCommonRow({n: '组选'})
    ]
  },
   // '组选单式',
  '2037:0' () {},
   // '组选胆拖',
  '2007:1' () {
    return [
      getCommonRow({n: '胆码', exclu: true, sl: 1, btns: []}),
      getCommonRow({n: '拖码', exclu: true}),
    ]
  },
   // '定位胆',
  '2008:1' () {
    return [
      getCommonRow({n: '第一位'}),
      getCommonRow({n: '第二位'}),
      getCommonRow({n: '第三位'}),
    ]
  },
   // '前三不定位'
  '2009:1' () {
    return [
      getCommonRow({n: '前三位'}),
    ]
  },
   // '一中一',
  '2010:1' () {
    return [
      getCommonRow({n: '一中一'})
    ]
  },
   // '二中二',
  '2011:1' () {
    return [
      getCommonRow({n: '二中二'})
    ]
  },
   // '三中三',
  '2012:1' () {
    return [
      getCommonRow({n: '三中三'})
    ]
  },
   // '四中四',
  '2013:1' () {
    return [
      getCommonRow({n: '四中四'})
    ]
  },
   // '五中五',
  '2014:1' () {
    return [
      getCommonRow({n: '五中五'})
    ]
  },
   // '六中五',
  '2015:1' () {
    return [
      getCommonRow({n: '六中五'})
    ]
  },
   // '七中五',
  '2016:1' () {
    return [
      getCommonRow({n: '七中五'})
    ]
  },
   // '八中五',
  '2017:1' () {
    return [
      getCommonRow({n: '八中五'})
    ]
  },
   // '一中一',
  '2018:0' () {},
   // '二中二',
  '2019:0' () {},
   // '三中三',
  '2020:0' () {},
   // '四中四',
  '2021:0' () {},
   // '五中五',
  '2022:0' () {},
   // '六中五',
  '2023:0' () {},
   // '七中五',
  '2024:0' () {},
   // '八中五',
  '2025:0' () {},
   // '二中二',
  '2026:1' () {
    return [
      getCommonRow({n: '胆码', exclu: true, sl: 1, btns: []}),
      getCommonRow({n: '拖码', exclu: true}),
    ]
  },
   // '三中三',
  '2027:1' () {
    return [
      getCommonRow({n: '胆码', exclu: true, sl: 2, btns: []}),
      getCommonRow({n: '拖码', exclu: true}),
    ]
  },
   // '四中四',
  '2028:1' () {
    return [
      getCommonRow({n: '胆码', exclu: true, sl: 3, btns: []}),
      getCommonRow({n: '拖码', exclu: true}),
    ]
  },
   // '五中五',
  '2029:1' () {
    return [
      getCommonRow({n: '胆码', exclu: true, sl: 4, btns: []}),
      getCommonRow({n: '拖码', exclu: true}),
    ]
  },
   // '六中五',
  '2030:1' () {
    return [
      getCommonRow({n: '胆码', exclu: true, sl: 5, btns: []}),
      getCommonRow({n: '拖码', exclu: true}),
    ]
  },
   // '七中五',
  '2031:1' () {
    return [
      getCommonRow({n: '胆码', exclu: true, sl: 6, btns: []}),
      getCommonRow({n: '拖码', exclu: true}),
    ]
  },
   // '八中五',
  '2032:1' () {
    return [
      getCommonRow({n: '胆码', exclu: true, sl: 7, btns: []}),
      getCommonRow({n: '拖码', exclu: true}),
    ]
  },
   // '定单双',
  '2033:1' () {
    return [
      getCommonRow({n: '定单双', struct: '', vs: [{s: false, n: '0单5双', v: '1'}, {s: false, n: '5单0双', v: '2'}, {s: false, n: '1单4双', v: '3'}, {s: false, n: '4单1双', v: '4'}, {s: false, n: '2单3双', v: '5'}, {s: false, n: '3单2双', v: '6'}]})
    ]
  },
   // '猜中位',
  '2034:1' () {
    return [
      getCommonRow({n: '猜中位', min: 3, max: 9, struct: ''})
    ]
  },
   // '龙虎',
  '2035:1' () {
    let x = [
      getCommonRow({n: '龙虎', sl: 1, btns: [], vs: [{s: false, n: '龙', v: '1'}, {s: false, n: '虎', v: '2'}]}),
    ]
    x.ps = [0]
    x.single = true
    x.pss = [
      {s: false, v: 'w,q', n: ['一二位']},
      {s: false, v: 'w,b', n: ['一三位']},
      {s: false, v: 'w,s', n: ['一四位']},
      {s: false, v: 'w,g', n: ['一五位']},
      {s: false, v: 'q,b', n: ['二三位']},
      {s: false, v: 'q,s', n: ['二四位']},
      {s: false, v: 'q,g', n: ['二五位']},
      {s: false, v: 'b,s', n: ['三四位']},
      {s: false, v: 'b,g', n: ['三五位']},
      {s: false, v: 's,g', n: ['四五位']},
    ]
    return x
  },
}