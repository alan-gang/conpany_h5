export default {
  state: {
    stateClass: {
      '成功': 'c_s',
      '赢': 'c_s',
      '半赢': 'c_s',
      '出款成功': 'c_s',
      '转帐成功': 'c_s',
      '投注成功': 'c_s',
      '中奖': 'c_s',
      '已中奖': 'c_s',
      '完成': 'c_s',
      '已完成': 'c_s',
      '已结算': 'c_s',
      '审核通过': 'c_s',
      '已充值': 'c_s',
      '失败': 'c_e',
      '输': 'c_e',
      '半输': 'c_e',
      '出款失败': 'c_e',
      '转帐失败': 'c_e',
      '未中奖': 'c_g',
      '拒绝': 'c_e',
      '已拒绝': 'c_e',
      '撤单': 'c_e',
      '已撤单': 'c_e',
      '审核失败': 'c_e',
      '系统撤单': 'c_e',
      '取消': 'c_g',
      '取消注单': 'c_g',
      '未结算': 'c_g',
      '进行中': 'c_p',
      '审核中': 'c_p',
      '待确认': 'c_p',
      '处理中': 'c_p',
      '待充值': 'c_p',
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
    wallets: [
      {n: '主帐户', key: 'availableBalance', pid: 0},
      {n: '特殊帐户', key: 'specialBalance', pid: 1},
      {n: 'BG帐户', key: '$bg', pid: 2},
      {n: 'IBC帐户', key: '$tcg', pid: 3},
      {n: '棋牌帐户', key: '$ky', pid: 7},
      {n: 'PT帐户', key: '$pt', pid: 5},
      {n: 'AG帐户', key: '$ag', pid: 4},
      {n: '沙巴帐户', key: '$sb', pid: 9},
      {n: '乐游帐户', key: '$ly', pid: 15},
      {n: 'U赢帐户', key: '$uwin', pid: 17},
      {n: 'KG帐户', key: '$kg', pid: 18},
      {n: '微游帐户', key: '$lit', pid: 25},
      {n: '平博帐户', key: '$pb', pid: 19},
      {n: 'LG帐户', key: '$lg', pid: 21},
    ]
  }
}
