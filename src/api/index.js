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
    0: {msg: '登录失败', fn: [{fn: '__setUser', args: {login: false}}]},
    1: {msg: '登录成功'},
    fn: '__clearform'
  },
  '/dscagamesclient/login/login.do?method=validate&': {
    0: {fn: [{fn: '__setUser', args: {login: false}}]}
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
  getLotteryPrinzeInfo: '/person/lotteryPrize.do?method=getLotteryPrinzeInfo',
  // xyb
  p2pBuyProduct: '/p2p/product.do?method=buyProduct',
  '/dscagamesclient/p2p/product.do?method=buyProduct': {
    1: {
      msg: '操作成功',
      fn: [{fn: '__getBalance'}, {fn: '__p2pAccount'}]
    },
    fn: '__clearform',
  },
  p2pAccount: '/p2p/product.do?method=productAccount',
  p2pList: '/p2p/product.do?method=list',
  selectAccountChange: '/p2p/product.do?method=selectAccountChange',
  // 充值
  saveRangesNew: '/person/recharge.do?method=saveRangesNew',
  commitNew: '/person/recharge.do?method=commitNew',
  updateBillNew: '/person/recharge.do?method=updateBillNew',

  // 提现
  __getUserBankCards: '/person/bankcard.do?method=getUserBankCards',
  withdrawTimes: '/person/withDraw.do?method=withdrawTimes',
  getWithdrawByApi: '/person/bankcard.do?method=getWithdrawByApi',
  doWithDraw: '/person/withDraw.do?method=doWithDraw',
  checkSecurityPwd: '/person/withDraw.do?method=checkSecurityPwd',
  '/dscagamesclient/person/withDraw.do?method=checkSecurityPwd': {
    1: {
      msg: '资金密码验证成功',
    }
  },
  showWithDraw: '/person/withDraw.do?method=showWithDraw',
  '/dscagamesclient/person/withDraw.do?method=doWithDraw': {
    0: {msg: '提现失败'},
    1: {msg: '提现成功'},
    fn: '__clearform',
  },
  // 转账
  ato: '/ext/bg.do?method=transferToBG',
  '/dscagamesclient/ext/bg.do?method=transferToBG': {
    1: {
      msg: '转帐成功',
      fn: [{fn: '__getBalance'}],
    }
  },
  sta: '/person/recharge.do?method=transAmount',
  '/dscagamesclient/person/recharge.do?method=transAmount': {
    1: {
      msg: '转帐成功',
      fn: [{fn: '__getBalance'}],
    }
  },
  ota: '/ext/bg.do?method=withdrawFromBG',
  '/dscagamesclient/ext/bg.do?method=withdrawFromBG': {
    1: {
      msg: '转帐成功',
      fn: [{fn: '__getBalance'}],
    }
  },
  ata: '/ext/bg.do?method=withdrawAll',
  '/dscagamesclient/ext/bg.do?method=withdrawAll': {
    1: {
      msg: '转帐成功',
      fn: [{fn: '__getAllBalance'}],
    }
  },
  // 安全中心
  acctSecureInfo: '/person/accountSecur.do?method=acctSecureInfo',
  changLoginPwd: '/person/accountSecur.do?method=changLoginPwd',
  '/dscagamesclient/person/accountSecur.do?method=changLoginPwd': {
    1: {
      msg: '登录密码修改成功，请重新登录',
      fn: [{fn: '__acctSecureInfo'}],
    },
    fn: '__clearform',
  },
  // 修改资金密码
  // http://192.168.169.44:9901/cagamesclient/person/accountSecur.do?method=changSecurePwd&password=123456&newPwd=000000
  changSecurePwd: '/person/accountSecur.do?method=changSecurePwd',
  '/dscagamesclient/person/accountSecur.do?method=changSecurePwd': {
    1: {
      msg: '资金登录密码修改成功',
      fn: [{fn: '__acctSecureInfo'}],
    },
    fn: '__clearform',
  },
  // 修改昵称
  // http://192.168.169.44:9901/cagamesclient/person/accountSecur.do?method=changNickName&nickName=zhangsan
  changNickName: '/person/accountSecur.do?method=changNickName',
  '/dscagamesclient/person/accountSecur.do?method=changNickName': {
    1: {
      msg: '昵称设置成功',
      fn: [{fn: '__acctSecureInfo'}],
    },
    fn: '__clearform',
  },
  setBirthday: '/person/accountSecur.do?method=setBirthday',
  '/dscagamesclient/person/accountSecur.do?method=setBirthday': {
    1: {
      msg: '生日设置成功',
      fn: [{fn: '__acctSecureInfo'}],
    },
    fn: '__clearform',
  },
  // 设置问候
  // http://192.168.169.44:9901/cagamesclient/person/accountSecur.do?method=setGreetMsg&greetMsg=have u lunch
  setGreetMsg: '/person/accountSecur.do?method=setGreetMsg',
  '/dscagamesclient/person/accountSecur.do?method=setGreetMsg': {
    1: {
      msg: '登录问候语修改成功',
      fn: [{fn: '__acctSecureInfo'}],
    },
    fn: '__clearform',
  },
  // 发送手机短信
  // http://192.168.169.44:9901/cagamesclient/person/accountSecur.do?method=sendSms&mobile=18952000000
  person_sendSms: '/person/accountSecur.do?method=sendSms',
  // 发送邮件
  // http://192.168.169.44:9901/cagamesclient/person/accountSecur.do?method=sendMail&email=1@qq.com
  person_sendMail: '/person/accountSecur.do?method=sendMail',
  // 验证短信验证
  // http://192.168.169.44:9901/cagamesclient/person/accountSecur.do?method=checkSmsVerifyCode&verifyCode=4511
  person_checkSmsVerifyCode: '/person/accountSecur.do?method=checkSmsVerifyCode',
  // 验证邮件验证
  // http://192.168.169.44:9901/cagamesclient/person/accountSecur.do?method=checkMailVerifyCode&verifyCode=2664
  person_checkMailVerifyCode: '/person/accountSecur.do?method=checkMailVerifyCode',
  // 绑定手机
  // http://192.168.169.44:9901/cagamesclient/person/accountSecur.do?method=bindMobil&mobile=18952000000&type=0
  bindMobile: '/person/accountSecur.do?method=bindMobile',
  '/dscagamesclient/person/accountSecur.do?method=bindMobile': {
    1: {
      msg: '手机绑定成功',
      fn: [{fn: '__acctSecureInfo'}],
    },
    fn: '__clearform',
  },
  unbindMobile: '/person/accountSecur.do?method=unbindMobile',
  '/dscagamesclient/person/accountSecur.do?method=unbindMobile': {
    1: {
      msg: '手机解绑成功',
      fn: [{fn: '__acctSecureInfo'}],
    },
    fn: '__clearform',
  },
  // 绑定邮箱
  // http://192.168.169.44:9901/cagamesclient/person/accountSecur.do?method=bindEmail&email=a1@qq.com&type=0
  bindEmail: '/person/accountSecur.do?method=bindEmail&type=0',
  '/dscagamesclient/person/accountSecur.do?method=bindEmail&type=0': {
    1: {
      msg: '邮箱绑定成功',
      fn: [{fn: '__acctSecureInfo'}],
    },
    fn: '__clearform',
  },
  unbindEmail: '/person/accountSecur.do?method=bindEmail&type=1',
  '/dscagamesclient/person/accountSecur.do?method=bindEmail&type=1': {
    1: {
      msg: '邮箱解绑成功',
      fn: [{fn: '__acctSecureInfo'}],
    },
    fn: '__clearform',
  },
  // 开启关闭
  // http://192.168.169.161:8080/cagamesclient/person/accountSecur.do?method=swithGoogAuth& verifyCode=123456&type=1
  switchGoogleAuth: '/person/accountSecur.do?method=swithGoogAuth',
  '/dscagamesclient/person/accountSecur.do?method=swithGoogAuth&type=1': {
    1: {
      msg: '信游安全绑定成功',
      fn: [{fn: '__acctSecureInfo'}],
    },
    fn: '__clearform',
  },
  '/dscagamesclient/person/accountSecur.do?method=swithGoogAuth&type=0': {
    1: {
      msg: '信游安全解绑成功',
      fn: [{fn: '__acctSecureInfo'}],
    },
    fn: '__clearform',
  },
  // http://192.168.169.161:8080/cagamesclient/person/accountSecur.do?method=createAuthQr
  createCBqr: '/person/accountSecur.do?method=createAuthQr',
  // 校验安全验证二维码
  // http://192.168.169.161:8080/cagamesclient/person/accountSecur.do?method=checkAuthKey&verifyCode=905420
  checkGoogleAuth: '/person/accountSecur.do?method=checkAuthKey',
  // 获取所有安全问答
  // http://192.168.169.44:9901/cagamesclient/person/accountSecur.do?method=safeQuestionList
  safeQuestionList: '/person/accountSecur.do?method=safeQuestionList',
  // 设置安全问答
  // http://192.168.169.44:9901/cagamesclient/person/accountSecur.do?method=setSafeQuestion&question1=abc&question2=def&answer1=ghi&answer2=jkl
  setSafeQuestion: '/person/accountSecur.do?method=setSafeQuestion',
  '/dscagamesclient/person/accountSecur.do?method=setSafeQuestion': {
    1: {
      msg: '安全问答设置成功',
      fn: [{fn: '__acctSecureInfo'}],
    },
    fn: '__clearform',
  },
  // 设置安全验证方式
  // http://192.168.169.44:9901/cagamesclient/person/accountSecur.do?method=setsecurityCheck&checkType=1&verifyCode=2444
  setsecurityCheck: '/person/accountSecur.do?method=setsecurityCheck',
  '/dscagamesclient/person/accountSecur.do?method=setsecurityCheck': {
    1: {
      msg: '安全验证设置成功',
      fn: [{fn: '__acctSecureInfo'}],
    },
    fn: '__clearform',
  },

  // 报表
  // 资金记录
  acreport: '/report/OrderReport.do?method=list',
  qryRecharge: '/person/recharge.do?method=qryRecharge',
  trrecord: '/ext/bg.do?method=queryBalanceTransferPage',
  wrrecord: '/person/withDraw.do?method=queryWithdraw',
  // 盈亏
  plreport: '/report/personalReportAction.do?method=recentTotalReport',
  pld: '/report/personalProfit.do?method=sumDetail',
  pldl: '/report/personalProfit.do?method=dailyDetail',
  // 下级个人盈亏
  plreport_: '/report/personalProfit.do?method=total',
  subBread: '/report/personalProfit.do?method=subBread',

  // ***代理中心***
  // 获取开户返点信息
  showRegistUser: '/team/createAccount.do?method=showRegistUser',
  // 开户
  registUser: '/team/createAccount.do?method=registUser',
  getUserList: '/team/useList.do?method=getUserList',
  setBackWater: '/team/setBackWater.do?method=setBackWater',
  getBackWater: '/team/useList.do?method=getBackWater',
  // 二维码
  createQr: '/team/createAccount.do?method=createQr',
  // 生成推广链接地址
  showSpreadLinks: '/team/createAccount.do?method=showSpreadLinks',
  // 设置保留返点
  setKeepPoint: '/team/createAccount.do?method=setKeepPoint',
  // 银行卡
  lockBankCard: '/person/bankcard.do?method=lockBankCard',
  '/dscagamesclient/person/bankcard.do?method=lockBankCard': {
    1: {
      msg: '锁定成功',
      fn: [{fn: '__getUserBankCards'}],
    }
  },
  getBankList: '/person/bankcard.do?method=getBankList',
  getProvices: '/person/bankcard.do?method=getProvices',
  bindBankCard: '/person/bankcard.do?method=bindBankCard',
  '/dscagamesclient/person/bankcard.do?method=bindBankCard': {
    1: {
      msg: '恭喜您成功绑定一张银行卡',
      fn: [{fn: '__getUserBankCards'}],
    },
    fn: '__clearform'
  },
  unbindCheck: '/person/bankcard.do?method=unbindCheck',
  unbindBankCard: '/person/bankcard.do?method=unbindBankCard',
  '/dscagamesclient/person/bankcard.do?method=unbindBankCard': {
    1: {
      msg: '解绑成功'
    }
  },
  // 帮助中心
  getHelpTag: '/help.do?method=getHelpTag',
  getHelpContent: '/help.do?method=getHelpContent',
  // 历史分红和历史佣金
  myBonusMobile: '/team/contractBonus.do?method=myBonusMobile',
  // 上级确认奖金
  // http://192.168.169.44:9901/cagamesclient/team/contractBonus.do?method=paraentCheckBonus&bonusId=1&sendType=1
  paraentCheckBonus: '/team/contractBonus.do?method=paraentCheckBonus',
  '/dscagamesclient/team/contractBonus.do?method=paraentCheckBonus': {
    1: {
      msg: '操作成功',
      fn: [{fn: '__init_rf_fh_1'}]
    },
  },
  // 下级确认完成奖金发放
  // http://192.168.169.44:9901/cagamesclient/team/contractBonus.do?method=subCheckBonus&bonusId=1
  subCheckBonus: '/team/contractBonus.do?method=subCheckBonus',
  '/dscagamesclient/team/contractBonus.do?method=subCheckBonus': {
    1: {
      msg: '操作成功',
      fn: [{fn: '__init_rf_fh_1'}]
    },
  },
  mySubExpectedBounsMobile: '/team/contractBonus.do?method=mySubExpectedBounsMobile',
  mySubContractMobile: '/team/contractBonus.do?method=mySubContractMobile',
  // 创建一个契约
  // http://192.168.169.44:9901/cagamesclient/team/contractBonus.do?method=createContract
  createContract: '/team/contractBonus.do?method=createContract',
  '/dscagamesclient/team/contractBonus.do?method=createContract': {
    1: {
      msg: '契约发送成功',
      fn: [{fn: '__init_rf_fh_3'}]
    }
  },
  // 接受、拒绝契约
  // http://192.168.169.44:9901/cagamesclient/team/contractBonus.do?method=checkContract&contractId=11&status=1
  checkContract: '/team/contractBonus.do?method=checkContract',
  '/dscagamesclient/team/contractBonus.do?method=checkContract': {
    1: {
      msg: '操作成功',
      fn: [{fn: '__init_rf_fh_3'}],
    }
  },
  // 查询我的契约
  // http://192.168.169.44:9901/cagamesclient/team/contractBonus.do?method=queryMyContract&startDate=20170101200000&endDate=20170115200000&stat=1
  queryMyContract: '/team/contractBonus.do?method=queryMyContract',
  // 日工资记录
  getSalaryById: '/report/daySalaryRepor.do?method=getSalaryById',
  // 日工资设置
  mySubSalaryList: '/team/setDaySalary.do?method=mySubSalaryList',
  setSalary: '/team/setDaySalary.do?method=setSalary',
  '/dscagamesclient/team/setDaySalary.do?method=setSalary': {
    1: {
      msg: '日工资设置成功',
      fn: [{fn: '__init_rf_ds_2'}]
    }
  },
  // 下级管理点击查看详情
  getUserAll: '/team/useList.do?method=getUserAll',
  // 团队盈亏 - 彩票盈亏
  tplreport: '/report/ltrReport.do?method=list',
  tpldreport: '/report/ltrReport.do?method=detail',
  // 团队盈亏 - 三方盈亏 & 棋牌 & 微游
  toplreport: '/report/otherReport.do?method=list',
  topldreport: '/report/otherReport.do?method=detail',
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
