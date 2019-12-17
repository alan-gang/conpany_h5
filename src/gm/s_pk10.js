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
    let x = [
      getCommonRow({n: '龙虎', exclu: true, btns: [], vs: [{s: false, n: '龙', v: 1}, {s: false, n: '虎', v: 1}]}),
    ]
    x.ps = [0]
    x.single = true
    x.pss = [
      {s: false, v: '0,9', n: ['一VS十']},
      {s: false, v: '1,8', n: ['二VS九']},
      {s: false, v: '2,7', n: ['三VS八']},
      {s: false, v: '3,6', n: ['四VS七']},
      {s: false, v: '4,5', n: ['五VS六']},
    ]
    return x
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
  /* *************************************二星*********************************** */
  /* ..............前二直选............... */
  /*
  直选复式
  N1万位，N2千位 N1 * N2
  */
  '4102:1' () {
    return  [
      getCommonRow({n: '冠军'}),
      getCommonRow({n: '亚军'}),
    ]
  },
  '4103:0' () {},
  '4104:1' () {
    return  [
      getCommonRow({n: '组选'}),
    ]
  },
  '4105:0' () {},

  '4106:1' () {
    return  [
      getCommonRow({n: '第三名'}),
      getCommonRow({n: '第四名'}),
    ]
  },
  '4107:0' () {},
  '4108:1' () {
    return  [
      getCommonRow({n: '组选'}),
    ]
  },
  '4109:0' () {},

  '4110:1' () {
    return  [
      getCommonRow({n: '第三名'}),
      getCommonRow({n: '第四名'}),
    ]
  },
  '4111:0' () {},
  '4112:1' () {
    return  [
      getCommonRow({n: '组选'}),
    ]
  },
  '4113:0' () {},

  '4114:1' () {
    return  [
      getCommonRow({n: '冠军'}),
      getCommonRow({n: '亚军'}),
      getCommonRow({n: '第三名'}),
    ]
  },
  '4115:0' () {},
  '4116:1' () {
    return  [
      getCommonRow({n: '组选'}),
    ]
  },
  '4117:0' () {},

  '4118:1' () {
    return  [
      getCommonRow({n: '第八名'}),
      getCommonRow({n: '第九名'}),
      getCommonRow({n: '第十名'}),
    ]
  },
  '4119:0' () {},
  '4120:1' () {
    return  [
      getCommonRow({n: '组选'}),
    ]
  },
  '4121:0' () {},

  '4122:1' () {
    return  [
      getCommonRow({n: '冠军'}),
      getCommonRow({n: '亚军'}),
      getCommonRow({n: '第三名'}),
      getCommonRow({n: '第四名'}),
    ]
  },
  '4123:0' () {},
  '4124:1' () {
    return  [
      getCommonRow({n: '组选'}),
    ]
  },
  '4125:0' () {},

  '4126:1' () {
    return  [
      getCommonRow({n: '第七名'}),
      getCommonRow({n: '第八名'}),
      getCommonRow({n: '第九名'}),
      getCommonRow({n: '第十名'}),
    ]
  },
  '4127:0' () {},
  '4128:1' () {
    return  [
      getCommonRow({n: '组选'}),
    ]
  },
  '4129:0' () {},

  '4130:1' () {
    return  [
      getCommonRow({n: '冠军'}),
      getCommonRow({n: '亚军'}),
      getCommonRow({n: '第三名'}),
      getCommonRow({n: '第四名'}),
      getCommonRow({n: '第五名'}),
    ]
  },
  '4131:0' () {},
  '4132:1' () {
    return  [
      getCommonRow({n: '组选'}),
    ]
  },
  '4133:0' () {},

  '4134:1' () {
    return  [
      getCommonRow({n: '第六名'}),
      getCommonRow({n: '第七名'}),
      getCommonRow({n: '第八名'}),
      getCommonRow({n: '第九名'}),
      getCommonRow({n: '第十名'}),
    ]
  },
  '4135:0' () {},
  '4136:1' () {
    return  [
      getCommonRow({n: '组选'}),
    ]
  },
  '4137:0' () {},

  '4140:1' () {
    return [
      getCommonRow({n: '前三'}),
    ]
  },
  '4141:1' () {
    return [
      getCommonRow({n: '后三'}),
    ]
  },
  '4142:1' () {
    return [
      getCommonRow({n: '前四'}),
    ]
  },
  '4143:1' () {
    return [
      getCommonRow({n: '后四'}),
    ]
  },
  '4144:1' () {
    return [
      getCommonRow({n: '前五'}),
    ]
  },
  '4145:1' () {
    return [
      getCommonRow({n: '后五'}),
    ]
  },
  '4138:1' () {
    return [
      getCommonRow({n: '和值', min: 3, max: 19}),
    ]
  },
  '4139:1' () {
    return [
      getCommonRow({n: '大小单双', btns: [], vs: [{s: false, n: '大', v: '1'}, {s: false, n: '小', v: '2'}, {s: false, n: '单', v: '3'}, {s: false, n: '双', v: '4'}]}),
    ]
  },
  // title: '龙虎
  '4146:1' () {
    let x = [
      getCommonRow({n: '龙虎', exclu: true, btns: [], vs: [{s: false, n: '龙', v: 1}, {s: false, n: '虎', v: 1}]}),
    ]
    x.ps = [0]
    x.single = true
    x.pss = [
      {s: false, v: '0,9', n: ['一VS十']},
      {s: false, v: '1,8', n: ['二VS九']},
      {s: false, v: '2,7', n: ['三VS八']},
      {s: false, v: '3,6', n: ['四VS七']},
      {s: false, v: '4,5', n: ['五VS六']},
    ]
    return x
  },
  '4147:1' () {
    return [
      getCommonRow({n: '冠军', btns: [], vs: [{s: false, n: '大', v: '1'}, {s: false, n: '小', v: '2'}, {s: false, n: '单', v: '3'}, {s: false, n: '双', v: '4'}]}),
      getCommonRow({n: '亚军', btns: [], vs: [{s: false, n: '大', v: '1'}, {s: false, n: '小', v: '2'}, {s: false, n: '单', v: '3'}, {s: false, n: '双', v: '4'}]}),
      getCommonRow({n: '第三名', btns: [], vs: [{s: false, n: '大', v: '1'}, {s: false, n: '小', v: '2'}, {s: false, n: '单', v: '3'}, {s: false, n: '双', v: '4'}]}),
      getCommonRow({n: '第四名', btns: [], vs: [{s: false, n: '大', v: '1'}, {s: false, n: '小', v: '2'}, {s: false, n: '单', v: '3'}, {s: false, n: '双', v: '4'}]}),
      getCommonRow({n: '第五名', btns: [], vs: [{s: false, n: '大', v: '1'}, {s: false, n: '小', v: '2'}, {s: false, n: '单', v: '3'}, {s: false, n: '双', v: '4'}]}),
      getCommonRow({n: '第六名', btns: [], vs: [{s: false, n: '大', v: '1'}, {s: false, n: '小', v: '2'}, {s: false, n: '单', v: '3'}, {s: false, n: '双', v: '4'}]}),
      getCommonRow({n: '第七名', btns: [], vs: [{s: false, n: '大', v: '1'}, {s: false, n: '小', v: '2'}, {s: false, n: '单', v: '3'}, {s: false, n: '双', v: '4'}]}),
      getCommonRow({n: '第八名', btns: [], vs: [{s: false, n: '大', v: '1'}, {s: false, n: '小', v: '2'}, {s: false, n: '单', v: '3'}, {s: false, n: '双', v: '4'}]}),
      getCommonRow({n: '第九名', btns: [], vs: [{s: false, n: '大', v: '1'}, {s: false, n: '小', v: '2'}, {s: false, n: '单', v: '3'}, {s: false, n: '双', v: '4'}]}),
      getCommonRow({n: '第十名', btns: [], vs: [{s: false, n: '大', v: '1'}, {s: false, n: '小', v: '2'}, {s: false, n: '单', v: '3'}, {s: false, n: '双', v: '4'}]}),
    ]
  },
  '4101:1' () {
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