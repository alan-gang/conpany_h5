let defaultUser = {
  login: '',
  codeimg: '',
  actvityUrl: '',
  broadcaseWSUrl: '',
  hasBankCard: '',
  hasLogPwd: '',
  hasNickName: '',
  hasSecurityPwd: '',
  identity: '',
  isOldUser: '',
  isOpenKey: '',
  isTest: '',
  isTry: '',
  nickName: '',
  platId: '',
  platUrl: '',
  roleId: '',
  sessionKey: '',
  showBackWater: '',
  showSalary: '',
  success: '',
  token: '',
  userId: '',
  userLevel: '',
  userName: '',
  verifyType: '',
  vipChatUrl: '',
  // __getBalance
  freeAvaiable: '',
  rewardPoint: '',
  availableBalance: '',
  specialBalance: '',
  $bg: '',
  $tcg: '',
  $ky: '',
  $pt: '',
  $ag: '',
  $sb: '',
  $ly: '',
  $uwin: '',
  $kg: '',
  $lit: '',
  $pb: '',
  $lg: '',
  // vipinfo
  level: 0,
  levelName: '',
  exp: 0,
  diffExp: 0,
  nexMinExp: 0,
  subLevel: '',
  // bankcard
  lockCard: 0,
  userBankCards: [],
}
export default {
  state: defaultUser,
  actions: {
    __setUser (user) {
      this.user = Object.assign(this.user, user || defaultUser)
    }
  }
}
