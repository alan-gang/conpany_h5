<template lang="pug">

// Main Framework7 App component where we pass Framework7 params
f7-app(:params=" f7Params ")

  // Status bar overlay for full screen mode (Cordova or PhoneGap)
  //- f7-statusbar

  // Left Panel with "cover" effect
  //- f7-panel(left cover)
    f7-view

  // Right Panel with "reveal" effect
  f7-panel.signmonth.z_99999.wp_100(right cover)
    f7-view(url="/signmonth")

  // Main view
  //- f7-view(url="/" :main="true" :push-state="true")
  f7-view(url="/" :main="true")
  // Popup. All modals should be outside of Views
  f7-popup#login(@popup:opened=" __getcodeimg() || __setCall({fn: '__initLoginPopup'}) ")
    f7-view(url="/login")

  //- f7-popup#forget
    f7-view(url="/forget")

  f7-popup#speed(@popup:opened=" __setCall({fn: '__getNewEnableLines'}) " @popup:closed=" __setGlobal({afterLoginRedirect: ''}) ")
    f7-view(url="/speed")

  f7-popup#register(@popup:opened=" __getcodeimg ")
    f7-view(url="/register")

  f7-popup#guide
    f7-view(url="/guide")

  //- global 签到
  f7-popup#signin.r_5.dialog-popup-auto-center.o_v.bgc_o.full_width(@popup:open=" __setCall({fn: '__initSigninPopup'}) ")
    signin

  //- global 签到成功
  f7-popup#signinsuccess.r_5.dialog-popup-auto-center.o_v.bgc_o.full_w80
    signinsuccess



</template>

<script>
import routes from './router'
import config from '@/config'
import api from '@/api'
import oi from '@/components/oi'
import Socket from './socket'
import g from '@/gm/g'
import signin from '@/views/popup/signin'
import signinsuccess from '@/views/popup/signinsuccess'
export default {
  mixins: [config, oi],
  components: {
    signin,
    signinsuccess,
  },
  name: 'app',
  data () {
    return {
      f7Params: {
        picker: {
          toolbarCloseText: '完成',
        },
        smartSelect: {
          popupCloseLinkText: '完成',
          sheetCloseLinkText: '完成',
        },
        dialog: {
          title: '',
          buttonOk: '确定',
          buttonCancel: '取消',
          passwordPlaceholder: '请输入密码',
        },
        theme: 'ios',
        routes,
        calendar: {
          monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          dayNames: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
          dayNamesShort: ['天', '一', '二', '三', '四', '五', '六'],
          toolbarCloseText: '确定',
          headerPlaceholder: '请选择',
        },
      }
    }
  },
  computed: {
  },
  watch: {
  },
  beforeCreate () {
  },
  created () {
    this.__login({isAuto: 1})
    this.getCfgInfo()
    this.__getLotterys()
    document.addEventListener('visibilitychange', () => {
      // this.__toast('显示/隐藏')
      this.__setCall({fn: '__pageactivated'})
    })
  },
  mounted () {
    if (this.__query.tag) this.$f7.popup.open('#register') && this.__getcodeimg()
    if (this.__query.popup) this.$f7.popup.open('#' + this.__query.popup) && this.__getcodeimg()
  },
  methods: {
    message (msg) {
      if (!msg || !msg.type) return
      let titles = {
        // openWinCode: '开奖信息',
        prizeNotice: '中奖信息',
        saveSucc: '到账信息',
        drawSucc: '提款信息',
      }
      let content = ''
      switch (msg.type) {
        case 'openWinCode':
          if (!this.local.$winnotify) return
          break
        case 'prizeNotice':
          if (!this.local.$winnotify) return
          content = msg.content.reduce((p, x, i) => {
            p += '<div style="text-align: left">恭喜您在<span>' + x.lottName + x.issue + '</span>期中奖了<span class="c_orange">' + x.amt + '</span>元</div>'
            return p
          }, '')
          this.__setCall({fn: '__orderlist'})
          break
        case 'saveSucc':
          content = msg.content.reduce((p, x, i) => {
            p += '<div style="text-align: left">您通过<span>' + x.bankName + '</span>充值<span class="c_orange">' + x.amt + '</span>元已到账，请注意查收</div>'
            return p
          }, '')
          break
        case 'drawSucc':
          content = msg.content.reduce((p, x, i) => {
            p += '<div style="text-align: left">您申请提款<span>' + x.amt + '</span>元<span class="' + ['', 'c_orange', 'c_s'][x.succ] + '">' + ['', '失败', '成功'][x.succ] + '</span>，请注意查看</div>'
            return p
          }, '')
          break
      }
      if (this.__route.path.match(/play|car|chase/) && msg.content[0].lottId === String(this.cache.play.id)) {
        titles.openWinCode = '开奖信息'
        content = msg.content[0].lottName + msg.content[0].issue + '期开奖号码：' + msg.content[0].code
        this.__setCall({fn: '__openWinCode'})
      }
      // Create toast
      titles[msg.type] && this.$f7.notification.create({
        icon: '<i class="icon f7-icons color-deeporange">alarm_fill</i>',
        // title: '信游娱乐',
        title: titles[msg.type],
        titleRightText: '现在',
        // subtitle: titles[msg.type],
        text: content,
        closeTimeout: 3000,
      }).open()
    },
    getCfgInfo () {
      this.$.get(api.getCfgInfo).then(({data: {broadcaseWSUrl}}) => {
        !Socket.sockets.user && Socket.connect(broadcaseWSUrl, 'user', this.connected)
        Socket.notify.messages.push(this.message)
      })
    },
    connected () {
      setTimeout(() => {
        Socket.sockets.user && Socket.sockets.user.send(JSON.stringify(Object.assign({action: 'noauth'}, this.user.login ? {
          parameter: {
            userId: this.user.userId,
            app: 'web'
          },
          action: 'auth',
        } : {})))
      }, 3000)
    },
    __getUserPrefence () {
      this.$.get(api.getUserPrefence).then(({data: {menuList}}) => {
        if (menuList[0]) {
          g.forEach(x => {
            x.hide = x.mid && menuList.indexOf(x.mid) === -1
          })
        }
      })
    },
    __getLotterys () {
      this.$.get(api.getLotterys).then(({data: {lotteryList}}) => {
        if (!lotteryList || !lotteryList[0]) return
        g.forEach(x => {
          x.hide = x.id && lotteryList.findIndex(y => y.lotteryId * 1 === x.id) === -1
        })
      })
    },
    __getcodeimg () {
      this.$.get(api.__getcodeimg).then(({data: {data}}) => {
        this.__setUser({codeimg: 'data:image/png;base64,' + data})
      })
    },
    __login ({un, pwd, code, cb, isAuto}) {
      this.$.get(api.__login + (isAuto ? '&' : ''), {userName: un, userPwd: pwd, verifyCode: code, channelType: this.local.pf, isAuto: isAuto, $anyway: this.__getUserPrefence}).then(({data}) => {
        this.__setUser(Object.assign(data, {login: true}))
        this.__getBalance()
        this.__acctSecureInfo()
        cb && cb()
        if (!this.user.hasLogPwd || !this.user.hasSecurityPwd) this.$f7.popup.open('#guide')
        else if (!this.user.hasBankCard) this.__go('/me/bank/bind/')
      })
    },
    __tryLogin ({code, cb}) {
      this.$.get(api.__tryLogin, {verifyCode: code, channelType: this.local.pf}).then(({data}) => {
        this.__setUser(Object.assign(data, {login: true}))
        this.__getBalance()
        cb && cb()
      })
    },
    __logout () {
      this.$.get(api.logout).then(({data}) => {
        this.__setUser({login: false})
        if (this.__rl) this.__go('/')
        Socket.close('user')
      })
    },
    __getBalance () {
      this.$.get(api.__getBalance).then(({data}) => {
        this.__setUser(data)
      })
    },
    __getMoreBalance (a = this.config.wallets.slice(2)) {
      if (a[0].pid < 2) return this.__getBalance()
      a.forEach(x => {
        this.$.myget(api.getBalanceByPID, {platId: x.pid}).then(({data: {bal}}) => {
          let b = {}
          b[x.key] = Number(bal)
          this.__setUser(b)
        })
      })
    },
    __getAllBalance () {
      this.__getBalance()
      this.__getMoreBalance()
    },
    __getUserBankCards () {
      this.$.get(api.__getUserBankCards).then(({data}) => {
        if (!data.userBankCards.length) {
          this.$f7.dialog.confirm('立即前往绑定银行卡', '', () => {
            this.__go('/me/bank/bind/')
          })
        }
        this.__setUser(data)
      })
    },
    __showTab (id) {
      this.$f7.tab.show(id)
    },
    __acctSecureInfo () {
      this.$.get(api.acctSecureInfo).then(({data}) => {
        this.__setUser(data)
      })
    },
    __cpwd (cb = function () {}) {
      this.$f7.dialog.password('请输入资金密码', '', (cpwd) => {
        this.$.get(api.checkSecurityPwd, {password: cpwd}).then(() => { cb(cpwd) })
      }).el.querySelector('input').focus()
    },
    __backing () {
      setTimeout(this.__back, 500)
    },
  }
}
</script>

<style lang="stylus">
@import '~framework7/css/framework7.bundle.min.css'
@import 'css/common.stylus'
</style>
