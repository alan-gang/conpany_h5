export default {
  state: {
    stateClass: {
      '成功': 'c_s',
      '赢': 'c_s',
      '半赢': 'c_s',
      '出款成功': 'c_s',
      '转账成功': 'c_s',
      '投注成功': 'c_s',
      '中奖': 'c_s',
      '已中奖': 'c_s',
      '完成': 'c_s',
      '已完成': 'c_s',
      '已结算': 'c_s',
      '审核通过': 'c_s',
      '已充值': 'c_s',
      '已发放': 'c_s',
      '已签约': 'c_s',
      '已签订': 'c_s',
      '已领取': 'c_s',
      '已设置': 'c_s',

      '失败': 'c_e',
      '输': 'c_e',
      '半输': 'c_e',
      '出款失败': 'c_e',
      '转账失败': 'c_e',
      '未中奖': 'c_g',
      '拒绝': 'c_e',
      '已拒绝': 'c_e',
      '撤单': 'c_e',
      '已撤单': 'c_e',
      '审核失败': 'c_e',
      '系统撤单': 'c_e',
      '未发放': 'c_e',
      '未领取': 'c_e',
      '未设置': 'c_e',

      '取消': 'c_g',
      '取消注单': 'c_g',
      '未结算': 'c_g',
      '未签约': 'c_g',
      '未签订': 'c_g',

      '进行中': 'c_p',
      '审核中': 'c_p',
      '待确认': 'c_p',
      '处理中': 'c_p',
      '待充值': 'c_p',

      '已开通': 'c_s',
      '未开通': 'c_g',

      '使用中': 'c_s',
      '已关闭': 'c_g',
    },
    stateColor: {
      0: 'orange',
      1: 'red',
      2: 'blue',
      3: 'green',
    },
    orderState: {
      0: '未开奖',
      1: '已中奖',
      2: '未中奖',
      3: '已撤单',
    },
    orderStateFilters: [
      {id: '', n: '全部状态'},
      {id: 0, n: '未开奖'},
      {id: 1, n: '已中奖'},
      {id: 2, n: '未中奖'},
      {id: 3, n: '已撤单'},
    ],
    chaseState: {
      0: '进行中',
      1: '已取消',
      2: '已完成',
    },
    chaseStateFilters: [
      {id: '', n: '全部状态'},
      {id: 0, n: '进行中'},
      {id: 1, n: '已取消'},
      {id: 2, n: '已完成'},
    ],
    loadStateFilters: [
      {id: '', n: '全部状态'},
      {id: 1, n: '待充值'},
      {id: 2, n: '待确认'},
      {id: 3, n: '第三方已到账'},
      {id: 4, n: '充值成功'},
    ],
    transferStateFilters: [
      {id: '', n: '全部状态'},
      {id: 0, n: '失败'},
      {id: 1, n: '成功'},
      {id: 2, n: '处理中'},
    ],
    withdrawStateFilters: [
      {id: '', n: '全部状态'},
      {id: 1, n: '待审核'},
      {id: 2, n: '审核失败'},
      {id: 3, n: '出款中'},
      {id: 4, n: '出款成功'},
      {id: 5, n: '出款失败'},
    ],
    fhState: {
      0: '未发放',
      1: '已发放',
      2: '待确认',
    },
    fhStateFilters: [
      {id: '', n: '全部状态'},
      {id: 0, n: '未发放'},
      {id: 1, n: '已发放'},
      {id: 2, n: '待确认'},
    ],
    fhType: {
      0: '销售',
      1: '亏损'
    },
    qyState: {
      1: '已签约',
      0: '待确认',
      3: '已拒绝',
      2: '未签约',
    },
    qyStateFilters: [
      {id: '', n: '全部状态'},
      {id: 1, n: '已签约'},
      {id: 0, n: '待确认'},
      {id: 3, n: '已拒绝'},
      {id: 2, n: '未签约'},
    ],
    scopeFilters: [
      {id: 2, n: '我和下级'},
      {id: 1, n: '我自己'},
      {id: 3, n: '我的下级'},
    ],
    subScopeFilters: [
      {id: 0, n: '全部下级'},
      {id: 1, n: '直接下级'},
      {id: 2, n: '间接下级'},
    ],
    dsStateFilters: [
      {id: undefined, n: '全部状态'},
      {id: 0, n: '未领取'},
      {id: 1, n: '已领取'},
    ],
    dsState: {
      0: '未领取',
      1: '已领取',
    },
    dsSetStateFilters: [
      // {id: '', n: '全部状态'},
      {id: 0, n: '未设置'},
      {id: 1, n: '已设置'},
    ],
    dsSetState: {
      0: '未设置',
      1: '已设置',
    },
    sortStateFilters: [
      {id: 'buy', n: '投注从高到低'},
      {id: 'gameProfit', n: '游戏盈亏从高到低'},
      {id: 'totalProfit', n: '总盈亏从高到低'},
    ],
    tzStateFilters: [
      {id: 0, n: '仅投注用户'},
      {id: 1, n: '全部用户'},
    ],
    ctSortStateFilters: [
      {id: 1, n: '充值从高到低'},
      {id: 2, n: '提款从高到低'},
    ],
    hdSortStateFilters: [
      {id: 1, n: '人数从高到低'},
      {id: 2, n: '金额从高到低'},
    ],
    wallets: [
      {n: '主账户', key: 'availableBalance', pid: 0},
      {n: '特殊账户', key: 'specialBalance', pid: 1},
      {n: 'BG账户', key: '$bg', pid: 2},
      // {n: 'IBC账户', key: '$tcg', pid: 3},
      {n: '棋牌账户', key: '$ky', pid: 7},
      {n: 'PT账户', key: '$pt', pid: 5},
      {n: 'AG账户', key: '$ag', pid: 4},
      {n: '沙巴账户', key: '$sb', pid: 9},
      {n: '乐游账户', key: '$ly', pid: 15},
      {n: 'U赢账户', key: '$uwin', pid: 17},
      {n: 'KG账户', key: '$kg', pid: 18},
      {n: '微游账户', key: '$lit', pid: 25},
      {n: '平博账户', key: '$pb', pid: 19},
      {n: 'LG账户', key: '$lg', pid: 21},
      {n: '幸运账户', key: '$xy', pid: 22},
      {n: 'GD账户', key: '$gd', pid: 26},
      {n: '财神账户', key: '$vg', pid: 27},
      {n: '德胜账户', key: '$ds', pid: 28},
      {n: '小艾账户', key: '$xa', pid: 29},
      {n: 'SA真人', key: '$sa_zr', pid: 31},
      {n: 'SA电游', key: '$sa_dy', pid: 32},
      {n: 'OG账户', key: '$og', pid: 34},
      {n: '欢乐账户', key: '$hl', pid: 44},
    ],
    agts: {
      0: '彩票',
      1: '电竞',
      2: '电游',
      3: '真人',
      4: '棋牌',
      5: '捕鱼',
      6: '体育',
      7: '基诺彩',
      8: '微游',
    }
  }
}
