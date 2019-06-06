import axios from 'axios'
import { user } from '@/store'
// 链接 frame
import frame from '@/views/frame'

// 首页 tab
import Index from '@/views/Index'
import home from '@/views/home'
import promo from '@/views/promo'
import game from '@/views/game'
import message from '@/views/message'

import notice from '@/views/home/notice'

// 找回密码 tab
import forget from '@/views/popup/forget/index'
import email from '@/views/popup/forget/email'
import phone from '@/views/popup/forget/phone'
import sq from '@/views/popup/forget/sq'
import bd from '@/views/popup/forget/bd'

// 优惠
import usecoupon from '@/views/promo/coupon/use'

// 游戏
// play
import play from '@/views/game/play'
import car from '@/views/game/play/car'
import chase from '@/views/game/play/chase'

// 我的 me
import load from '@/views/me/load'
import withdraw from '@/views/me/withdraw'
import transfer from '@/views/me/transfer'
import wallet from '@/views/me/wallet'
import xyb from '@/views/me/xyb'
import safecenter from '@/views/me/safecenter'
import loginPwd from '@/views/me/safecenter/loginPwd'
import capitalPwd from '@/views/me/safecenter/capitalPwd'
import capitalPwdModify from '@/views/me/safecenter/capitalPwdModify'
import greetings from '@/views/me/safecenter/greetings'
import safeanswer from '@/views/me/safecenter/safeanswer'
import emailBind from '@/views/me/safecenter/emailBind'
import nickname from '@/views/me/safecenter/nickname'
import safeVerifyBind from '@/views/me/safecenter/safeVerifyBind'
import safeVerify from '@/views/me/safecenter/safeVerify'
import birthday from '@/views/me/safecenter/birthday'
import bank from '@/views/me/bank'
import add from '@/views/me/bank/add'
import unbind from '@/views/me/bank/unbind'
import lock from '@/views/me/bank/lock'
import locked from '@/views/me/bank/locked'
import bonus from '@/views/me/bonus'
import openAccountMgr from '@/views/me/agent/openAccountMgr'

// 帮助中心
import help from '@/views/me/help'
import howtoplay from '@/views/me/help/howtoplay'
import functionintro from '@/views/me/help/functionintro'
import faq from '@/views/me/help/faq'
import detailpage from '@/views/me/help/detailpage'
// 设置
import settings from '@/views/settings'
// 关于我们
import aboutus from '@/views/aboutus'
// 软件服务
import license from '@/views/license'

// 报表
import bc from '@/views/rfs/bc'
import bd_ from '@/views/rfs/bc/bd'
import cd from '@/views/rfs/bc/cd'
// 资金记录
import cr from '@/views/rfs/cr'
import LRD from '@/views/rfs/cr/LRD'
import WRD from '@/views/rfs/cr/WRD'
// 盈亏报表
import pl from '@/views/rfs/pl'
import PLD from '@/views/rfs/pl/PLD'
import PLDL from '@/views/rfs/pl/PLDL'

let async = url => {
  return (routeTo, routeFrom, resolve, reject) => {
    // dynamic import component; returns promise
    let vueComponent = null
    switch (url) {
      case '@/views/me':
        vueComponent = () => import('@/views/me')
        break
      case '@/views/popup/login':
        vueComponent = () => import('@/views/popup/login')
        break
      case '@/views/popup/speed':
        vueComponent = () => import('@/views/popup/speed')
        break
      case '@/views/popup/register':
        vueComponent = () => import('@/views/popup/register')
        break
    }
    // resolve promise
    vueComponent().then((vc) => {
      // resolve with component
      resolve({ component: vc.default })
    })
  }
}

let checkAuth = (to, from, resolve, reject) => {
  let rl = to.route.rl || (to.route.tab || {}).rl
  if (rl && !user.state.login) {
    setTimeout(() => {
      if (!user.state.login) {
        reject()
        axios.$root.$f7.popup.open('#login')
        axios.$root.$children[0].__setGlobal({afterLoginRedirect: to.path})
      } else resolve()
    }, user.state.login === '' ? 500 : 0)
  } else resolve()
}

export default [
  {
    path: '/',
    component: Index,
    tabs: [
      {
        path: '/',
        id: 'home',
        component: home
      },
      {
        path: '/promo/',
        id: 'promo',
        component: promo,
      },
      {
        path: '/game/',
        id: 'game',
        component: game
      },
      {
        path: '/message/',
        id: 'message',
        component: message
      },
      {
        path: '/me/',
        id: 'me',
        async: async('@/views/me'),
        rl: true,
      },
    ],
    beforeEnter: checkAuth
  },
  {
    path: '/notice/',
    component: notice,
    keepAlive: true,
  },
  // modul frame
  {
    path: '/frame/',
    component: frame,
    // keepAlive: true,
  },
  // modul frame
  // modul me
  {
    path: '/me/load/',
    component: load,
    beforeEnter: checkAuth,
    rl: true
  },
  {
    path: '/me/withdraw/',
    component: withdraw,
    beforeEnter: checkAuth,
    rl: true
  },
  {
    path: '/me/transfer/',
    component: transfer,
    beforeEnter: checkAuth,
    rl: true
  },
  {
    path: '/me/xyb/',
    component: xyb,
    beforeEnter: checkAuth,
    rl: true
  },
  {
    path: '/me/wallet/',
    component: wallet,
    beforeEnter: checkAuth,
    rl: true
  },
  {
    path: '/me/safecenter/',
    component: safecenter,
    beforeEnter: checkAuth,
    rl: true
  },
  {
    path: '/me/safecenter/loginPwd/',
    component: loginPwd,
    beforeEnter: checkAuth,
    rl: true
  },
  {
    path: '/me/safecenter/capitalPwd/',
    component: capitalPwd,
    beforeEnter: checkAuth,
    rl: true
  },
  {
    path: '/me/safecenter/capitalPwdModify/',
    component: capitalPwdModify,
    beforeEnter: checkAuth,
    rl: true
  },
  {
    path: '/me/safecenter/greetings/',
    component: greetings,
    beforeEnter: checkAuth,
    rl: true
  },
  {
    path: '/me/safecenter/safeanswer/',
    component: safeanswer,
    beforeEnter: checkAuth,
    rl: true
  },
  {
    path: '/me/safecenter/emailBind/',
    component: emailBind,
    beforeEnter: checkAuth,
    rl: true
  },
  {
    path: '/me/safecenter/nickname/',
    component: nickname,
    beforeEnter: checkAuth,
    rl: true
  },
  {
    path: '/me/safecenter/safeVerifyBind/',
    component: safeVerifyBind,
    beforeEnter: checkAuth,
    rl: true
  },
  {
    path: '/me/safecenter/safeVerify/',
    component: safeVerify,
    beforeEnter: checkAuth,
    rl: true
  },
  {
    path: '/me/safecenter/birthday/',
    component: birthday,
    beforeEnter: checkAuth,
    rl: true
  },
  {
    path: '/me/bank/',
    component: bank,
    beforeEnter: checkAuth,
    rl: true
  },
  {
    path: '/me/bank/add/',
    component: add,
    beforeEnter: checkAuth,
    rl: true
  },
  {
    path: '/me/bank/unbind/',
    component: unbind,
    beforeEnter: checkAuth,
    rl: true
  },
  {
    path: '/me/bank/lock/',
    component: lock,
    beforeEnter: checkAuth,
    rl: true
  },
  {
    path: '/me/bank/locked/',
    component: locked,
    beforeEnter: checkAuth,
    rl: true
  },
  {
    path: '/me/bonus/',
    component: bonus,
    beforeEnter: checkAuth,
    rl: true
  },
  {
    path: '/me/help/',
    component: help,
    rl: true
  },
  {
    path: '/me/help/howtoplay/',
    component: howtoplay,
    rl: true
  },
  {
    path: '/me/help/functionintro/',
    component: functionintro,
    rl: true
  },
  {
    path: '/me/help/faq/',
    component: faq,
    rl: true
  },
  {
    path: '/me/help/detailpage/',
    component: detailpage,
    rl: true
  },
  {
    path: '/agent/openAccountMgr',
    component: openAccountMgr,
    rl: true
  },
  {
    path: '/settings/',
    component: settings,
    rl: true
  },
  {
    path: '/aboutus/',
    component: aboutus,
    rl: true,
  },
  {
    path: '/license/',
    component: license,
    rl: true,
  },
  // modul me
  // module login
  {
    path: '/login',
    async: async('@/views/popup/login')
  },
  {
    path: '/speed',
    async: async('@/views/popup/speed')
  },
  {
    path: '/register',
    async: async('@/views/popup/register')
  },
  {
    path: '/forget',
    component: forget
  },
  {
    path: '/forget/email',
    component: email
  },
  {
    path: '/forget/phone',
    component: phone
  },
  {
    path: '/forget/sq',
    component: sq
  },
  {
    path: '/forget/bd',
    component: bd
  },
  // module login
  // promo
  {
    path: '/coupon/use/',
    component: usecoupon
  },
  // promo
  // game
  {
    path: '/game/play/',
    component: play,
    master: true,
    detailRoutes: [
      {
        path: '/game/car/',
        component: car,
      },
      {
        path: '/game/chase/',
        component: chase,
      },
    ]
  },
  // game

  // rfs
  {
    path: '/rfs/bc/',
    component: bc,
    master: true,
    detailRoutes: [
      {
        path: '/rfs/bc/bd/:id/',
        component: bd_,
      },
      {
        path: '/rfs/bc/cd/:id/',
        component: cd,
      },
    ]
  },
  {
    path: '/rfs/cr/',
    component: cr,
    master: true,
    detailRoutes: [
      {
        path: '/rfs/cr/lrd/',
        component: LRD,
      },
      {
        path: '/rfs/cr/wrd/',
        component: WRD,
      },
    ]
  },
  {
    path: '/rfs/pl/',
    component: pl,
    master: true,
    detailRoutes: [
      {
        path: '/rfs/pl/pld/',
        component: PLD,
      },
      {
        path: '/rfs/pl/pld/pldl/',
        component: PLDL,
      },
    ]
  }
]
