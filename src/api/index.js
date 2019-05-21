let prefix = localStorage.getItem('xy_api') || '/dscagamesclient'
localStorage.setItem('xy_api', prefix)
let api = {
  // 配置信息config
  // 1. 权限
  getUserPrefence: '/home/userMenus.do?method=getUserPrefence',
  // 2. 帐变类型
  getOrderType: '/report/OrderReport.do?method=getOrderType',
  // 3. socket通知
  getCfgInfo: '/login/login.do?method=getCfgInfo',
  // 登录
  __getcodeimg: '/login/login.do?method=getVerifyImage',
  __login: '/login/login.do?method=validate',
  '/dscagamesclient/login/login.do?method=validate': {
    0: {msg: '登录失败', fn: '__setUser', args: {login: false}},
    1: {msg: '登录成功'},
    fn: '__clearform'
  },
  '/dscagamesclient/login/login.do?method=validate&': {
    0: {fn: '__setUser', args: {login: false}}
  },
  __tryLogin: '/login/login.do?method=tryLogin',
  '/dscagamesclient/login/login.do?method=tryLogin': {
    0: {msg: '登录失败'},
    1: {msg: '登录成功'},
    fn: '__clearform',
  },
  getNewEnableLines: '/login/lineTest.do?method=getNewEnableLines',
  getCodeByTag: '/team/createAccount.do?method=getCodeByTag',
  autoRegist: '/team/createAccount.do?method=autoRegist',
  '/dscagamesclient/team/createAccount.do?method=autoRegist': {
    0: {msg: '注册失败'},
    1: {msg: '注册成功'},
    fn: '__clearform',
  },
  checkUserName: '/login/forgetPwd.do?method=checkUserName',
  getEmail: '/login/forgetPwd.do?method=getEmail',
  sendMail: '/login/forgetPwd.do?method=sendMail',
  '/dscagamesclient/login/forgetPwd.do?method=sendMail': {
    fn: '__clearform'
  },
  checkMailVerifyCode: '/login/forgetPwd.do?method=checkMailVerifyCode',
  resetPwd: '/login/forgetPwd.do?method=resetPwd',
  '/dscagamesclient/login/forgetPwd.do?method=resetPwd': {
    1: {msg: '密码重置成功'}
  },
  getMobile: '/login/forgetPwd.do?method=getMobile',
  sendSms: '/login/forgetPwd.do?method=sendSms',
  checkSmsVerifyCode: '/login/forgetPwd.do?method=checkSmsVerifyCode',
  isOpenCbAuth: '/login/forgetPwd.do?method=isOpenCbAuth',
  checkAuthKey: '/person/accountSecur.do?method=checkAuthKey',
  safeQuestion: '/login/forgetPwd.do?method=safeQuestion',
  safeAnswer: '/login/forgetPwd.do?method=safeAnswer',
  logout: '/login/login.do?method=logout',

  // 首页
  getActivityBanner: '/activity.do?method=getActivityBanner',
  getCheckToday: '/activity.do?method=getCheckToday',
  sysNotices: '/home/notices.do?method=sysNotices',
  rewardInfo: '/home/notices.do?method=rewardInfo',
  recomPlats: '/recomGame.do?method=list',
  getChatUrl: '/login/login.do?method=getChatUrl',

  // 活动
  getAllActivityList: '/activity.do?method=getAllActivityList',
  getAllEnablePrize: '/activity.do?method=getAllEnablePrize',
  '/dscagamesclient/activity.do?method=getAllEnablePrize': {
    '-1': {fn: [{fn: '__showTab', args: '#activity'}, {fn: '__setGlobal', args: {afterLoginAction: {fn: '__showTab', args: '#gift'}}}]}
  },
  myGetPrize: '/activity.do?method=myGetPrize',
  getCheckInReward: '/activity.do?method=getCheckInReward',
  doCheckIn: '/activity.do?method=doCheckIn',
  queryMygoods: '/ext/bg.do?method=queryMygoods',
  '/dscagamesclient/ext/bg.do?method=queryMygoods': {
    '-1': {fn: [{fn: '__showTab', args: '#activity'}, {fn: '__setGlobal', args: {afterLoginAction: {fn: '__showTab', args: '#coupon'}}}]}
  },
  getLotteryGoodPrize: '/ext/bg.do?method=getLotteryGoodPrize',
  getNoActivatePrize: '/ext/bg.do?method=getNoActivatePrize',
  transferToBG: '/ext/bg.do?method=transferToBG',

  // 游戏
  recentlyCode: '/issue.do?method=recentlyCode',
  // gameid
  current: '/issue.do?method=current',
  traceIssueList: '/issue.do?method=traceIssueList',
  myNewPoint: '/userpoint.do?method=myNewPoint',
  orderList: '/report/buyReport.do?method=list',
  '/dscagamesclient/report/buyReport.do?method=list': {
    '-1': {fn: [{fn: '__clearPage'}, {fn: '__setGlobal', args: {afterLoginAction: {fn: '__setTab_2'}}}]}
  },
  OrderDetail: '/report/buyReport.do?method=detail&entireCode=1',
  cancelOrder: '/booking.do?method=cancel',
  '/dscagamesclient/booking.do?method=cancel': {
    1: {
      msg: '撤单成功'
    }
  },
  followList: '/report/taskBuy.do?method=list',
  followDetail: '/report/taskBuy.do?method=detail',
  followCancel: '/booking.do?method=cancelTask',
  booking: '/booking.do?method=add',
  '/dscagamesclient/booking.do?method=add': {
    loading: 10000,
    loadingText: '投注中...',
    1: {
      msg: '投注成功',
      fn: [{fn: '__getBalance'}, {fn: '__clearSelection'}]
    }
  },
  kqbooking: '/game/fastBet.do?method=doBet',
  '/dscagamesclient/game/fastBet.do?method=doBet': {
    loading: 10000,
    loadingText: '投注中...',
    1: {
      msg: '投注成功',
      fn: [{fn: '__getBalance'}, {fn: '__clearSelection'}]
    }
  },
  __getBalance: '/home/userInfo.do?method=getUserFund',
  getBalanceByPID: '/ext/bg.do?method=getBalanceByPID',

  // 我的
  getUserIdentity: 'home/userInfo.do?method=getUserIdentity',
  acctSecureInfo: '/person/accountSecur.do?method=acctSecureInfo',
  setBirthday: '/person/accountSecur.do?method=setBirthday',
  changLoginPwd: '/person/accountSecur.do?method=changLoginPwd',
  changSecurePwd: '/person/accountSecur.do?method=changSecurePwd',
  setGreetMsg: '/person/accountSecur.do?method=setGreetMsg',

  // 报表
  // 资金记录
  // 帮助中心
  getHelpTag: '/help.do?method=getHelpTag',
  getHelpContent: '/help.do?method=getHelpContent',

}

Object.keys(api).forEach((key) => {
  // if (key.startsWith('http')) return
  const value = api[key]
  Object.defineProperty(api, key, {
    get: function () {
      return key.startsWith('/') ? this['_' + key] : prefix + this['_' + key]
    },
    set: function (v) {
      this['_' + key] = v
    }
  })
  api[key] = value
})
export default api
