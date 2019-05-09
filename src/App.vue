<template lang="pug">

// Main Framework7 App component where we pass Framework7 params
f7-app(:params=" f7Params ")

  // Status bar overlay for full screen mode (Cordova or PhoneGap)
  //- f7-statusbar

  // Left Panel with "cover" effect
  //- f7-panel(left cover)
    f7-view

  // Right Panel with "reveal" effect
  //- f7-panel(right reveal)
    f7-view

  // Main view
  //- f7-view(url="/" :main="true" :push-state="true")
  f7-view(url="/" :main="true")
  // Popup. All modals should be outside of Views
  f7-popup#login(@popup:opened=" __getcodeimg ")
    f7-view(url="/login")

  f7-popup#forget
    f7-view(url="/forget")

  f7-popup#speed(@popup:opened=" __setCall({fn: '__getNewEnableLines'}) " @popup:closed=" __setGlobal({afterLoginRedirect: ''}) ")
    f7-view(url="/speed")

  f7-popup#register(@popup:opened=" __getcodeimg ")
    f7-view(url="/register")

  f7-popup#gamemenu.bgc_o
    f7-view(url="/game/play/gamemenu")

</template>

<script>
import routes from './router'
import config from '@/config'
import api from '@/api'
import oi from '@/components/oi'
import Socket from './socket'
export default {
  mixins: [config, oi],
  components: {
  },
  name: 'app',
  data () {
    return {
      f7Params: {
        smartSelect: {
          popupCloseLinkText: '完成',
          sheetCloseLinkText: '完成',
        },
        dialog: {
          title: '',
          buttonOk: '确定',
          buttonCancel: '取消',
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
        }
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
  },
  mounted () {
    if (this.__query.tag) this.$f7.popup.open('#register') && this.__getcodeimg()
    if (this.__query.popup) this.$f7.popup.open('#' + this.__query.popup) && this.__getcodeimg()
  },
  methods: {
    __getcodeimg () {
      this.$.get(api.__getcodeimg).then(({data: {data}}) => {
        this.__setUser({codeimg: 'data:image/png;base64,' + data})
      })
    },
    __login ({un, pwd, code, cb, isAuto}) {
      this.$.get(api.__login + (isAuto ? '&' : ''), {userName: un, userPwd: pwd, verifyCode: code, channelType: this.local.pf, isAuto: isAuto}).then(({data}) => {
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
    __showTab (id) {
      this.$f7.tab.show(id)
    }
  }
}
</script>

<style lang="stylus">
@import '~framework7/css/framework7.bundle.min.css'
@import 'css/common.stylus'
</style>
