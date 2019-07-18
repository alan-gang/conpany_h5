<template lang="pug">

f7-page.home(ptr :ptr-mousewheel="true" @ptr:refresh=" refresh")
  f7-navbar
    f7-nav-left
      f7-link(popup-open="#login" text="登录" v-show=" user.login === false ")
    f7-nav-title(large) 信游娱乐
    f7-nav-right
      f7-link.kf(icon-only @click=" __go('/frame/', {props: {title: (user.vipChatUrl ? 'VIP' : '') + '客服', url: user.vipChatUrl || chatUrl }}) " v-show=" user.vipChatUrl || chatUrl ")

  f7-swiper.a(:params="{speed:500, autoplay: true, slidesPerView: 1.2, spaceBetween: -15, centeredSlides: true, effect: 'coverflow'}")
    f7-swiper-slide.aa(v-for=" (b, i) in banners " :key="i")
      img(:src=" b.mobileBanner " @click=" b.mobilePageUrl && __go('/frame/', {props: {title: b.activityName, url: b.mobilePageUrl}}) ")

  .mt_10.pt_5.pb_5.bg-color-white
    f7-toolbar.ft_12.c_333.bg-color-white(labels)
      f7-link._icon._vip(color="black" icon-f7=" home " @click=" __go('/frame/', {props: {title: '贵族Club', url: '/xy_activity/wap/vipClub.html'}}) ") 贵族Club
      f7-link._icon._sign(icon-f7=" home " @click=" getCheckToday ") 签到
      f7-link._icon._load(icon-f7=" home " href="/me/load/") 充值
      f7-link._icon._withdraw(icon-f7=" home " href="/me/withdraw/") 提现
      f7-link._icon._transfer(icon-f7=" home " href="/me/transfer/") 转帐

  
  f7-list.mt_5.mb_5.ft_12(text-color="gray")
    f7-list-item.hlh_30(:title=" sysNoticesContent " link='/notice/')
      f7-icon(slot='media' f7='volume_fill' text-color="deeporange" size="18px")

  .mb_5.pt_5.pb_5.bg-color-white
    .pt_5.pb_5.pl_10.pr_10 
      f7-icon._icon._hot(f7=" home " size="18px")
      span.pl_10.v_m 热门游戏

    f7-swiper.b(:params="{slidesPerView: 4, spaceBetween: 15}")
      f7-swiper-slide.ba.t_c(v-for=" (h, i) in hots " :key=" i ")
        f7-link._icon(:class=" '_gid' + h.id " icon-f7=" home " icon-size="72px" @click=" __go('/game/play/', {props: h}) ") 
        .c_333 {{ h.n }}

  .mb_5.pt_5.pb_5.bg-color-white
    .pt_5.pb_5.pl_10.pr_10 
      f7-icon._icon._hot(f7=" home " size="18px")
      span.pl_10.v_m 中奖喜报

    f7-swiper.c(:params="{loop: true, autoplay: true, slidesPerView: 4, direction: 'vertical'}")
      f7-swiper-slide.ca.t_c(v-for=" (h, i) in news " :key=" i ")
        .pt_5.pb_5.ft_12.pl_30.pr_15.t_l.caa.p_r
          span.ft_30.text-color-red.p_a.caaa .
          span {{ h.name }}投注
          span.text-color-red {{ h.game }}
          span 喜中
          span.text-color-red {{ h.prize }}
          span 元
          span.f_r.text-color-gray {{ (Date.now() - Number(h.timestamp))._toTimeGap('前') }}

  .mb_5.pt_5.pb_5.bg-color-white
    .pt_5.pb_5.pl_10.pr_10 
      f7-icon._icon._hot(f7=" home " size="18px")
      span.pl_10.v_m 平台推荐

    f7-swiper.d.pl_10.pr_10(:params="{slidesPerView: 1.8, spaceBetween: 10}")
      f7-swiper-slide.da.t_c(v-for=" (h, i) in cache.plats " :key=" i ")
        //- @error=" cache.plats.splice(i, 1) "
        img(:src=" h.picUrl " @click=" h.gameType === 1 ? __go('/game/play/', {props: Object.assign({}, v, ag.find(x => x.id === h.gameId), {n: h.gameName})}) : __go('/outer/', {props: Object.assign({}, h, ag.find(x => x.pid === h.gameId), {n: h.gameName})}) ")

        .c_333 {{ h.title }}

  .mb_5.pt_5.pb_5.bg-color-white
    .pt_5.pb_5.pl_10.pr_10 
      f7-icon._icon._hot(f7=" home " size="18px")
      span.pl_10.v_m 关于我们

    f7-swiper.e.pl_10.pr_10(:params="{slidesPerView: 3.3, spaceBetween: 10}" @click.native="$refs.pageDark.open()")
      f7-swiper-slide.ea.t_c(v-for=" (h, i) in usimgs " :key=" i ")
        img(:src=" h ")

    f7-photo-browser(:photos="usimgs" type="page" back-link-text="返回" navbar-of-text="/" ref="pageDark")


  p.pb_15.ft_12.text-color-gray.t_c 信游娱乐持有菲律宾PAGCOR合法牌照，请放心购买
  


</template>

<script>
import config from '@/config'
import api from '@/api'
import g from '@/gm/g'
import ag from '@/gm/ag'
export default {
  mixins: [config],
  components: {
  },
  name: 'home',
  props: [],
  data () {
    return {
      banners: [],
      sysNoticesContent: '',
      news: [],
      // plats: [],
      usimgs: [
        '/static/img/home/home_img_03.png',
        '/static/img/home/home_img_04.png',
        '/static/img/home/home_img_05.png',
        '/static/img/home/home_img_06.png',
      ],
      chatUrl: '',
      ag: ag,
    }
  },
  computed: {
    hots () {
      return g.filter(x => x.hot)
    }
  },
  created () {
    this.getActivityBanner()
    this.sysNotices()
    this.rewardInfo()
    this.recomPlats()
    this.getChatUrl()
  },
  mounted () {
  },
  methods: {
    getActivityBanner () {
      this.$.get(api.getActivityBanner).then(({data: {mobileBanner}}) => {
        this.banners = mobileBanner
      })
    },
    getCheckToday () {
      this.$.get(api.getCheckToday).then(({data}) => {
      })
    },
    sysNotices () {
      this.$.get(api.sysNotices, {page: 1, pageSize: 1}).then(({data: {sysNotices}}) => {
        this.sysNoticesContent = (sysNotices[0] || {}).content
      })
    },
    rewardInfo () {
      this.$.get(api.rewardInfo).then(({data: {winners}}) => {
        this.news = winners
      })
    },
    recomPlats () {
      this.$.get(api.recomPlats, {chanType: '1,2'}).then(({data: {data}}) => {
        this.__setCache({plats: data})
        // this.plats = data
      })
    },
    getChatUrl () {
      this.$.get(api.getChatUrl).then(({data: {chatUrl}}) => {
        this.chatUrl = chatUrl
      })
    },
    refresh (evt, done) {
      this.rewardInfo()
      setTimeout(done, 1000)
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.home
  .kf
    bg('~src/assets/home/home_icon_customservice.png', auto 60%)
  
  .a
    width 90%
    height 25%
    top 5px
  .aa
    img
      border-radius 5px
      width 100%
      height 100%
  .c
    height 100px
  .caaa
    left 15px
    top -17px
  
  .da
  .ea
    img
      border-radius 5px
      width 100%
      height 100px
    
</style>
