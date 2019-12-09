<template lang="pug">
.signin.p_r.mr_40.pt_30.pl_50
  f7-link._icon._sign_close.p_a.p_r_-20.p_t_0(icon-size="50px" icon-f7=" home " popup-close="#signin")

  .hlh_32.pl_20
    span.c_grass_green.ft_b 每日
    span.c_f.ft_b 签到
    f7-icon._icon._sign_square.mg_5(size="18" f7=" home ")
    span.c_ccc 3月您已经累计签到：
    span.c_grass_green 2 天

  .thisweek.t_c.pt_5.ml_2.mr_2.c_9
    f7-row(no-gap)
      f7-col(width="25" v-for=" (x, i) in weekTitle ")
        template(v-if=" i < weekTitle.length -1 ")
          .hlh_25.bgc_f7(:class=" {'week_title_lst cli_a': i === weekTitle.length -1 } " ) {{ x }}
        template(v-else)
          f7-button.hlh_25.bgc_f7.week_title_lst.cli_a(panel-open=".signmonth")

        .h_5
        .lh_44.h_55.w_44.mg_0a.c_f.ft_b(v-if=" i < 7 " :class=" weekCls[i] " @click="signin") {{ i + 1 }}

  .more-info.h_25.mt_20
  
  f7-swiper.b.h_70(:params="{slidesPerView: 3, spaceBetween: 0}" pagination v-if="init")
    f7-swiper-slide.gift.gift_0.h_40
    f7-swiper-slide.gift.gift_1.h_40
    f7-swiper-slide.gift.gift_2.h_40
    f7-swiper-slide.gift.gift_3.h_40
    f7-swiper-slide.gift.gift_4.h_40
    


</template>

<script>
import config from '@/config'
// import api from '@/api'
let now = new Date()
let weekdayToday = now.getDay()
let thisweek = [now._bf(0 - weekdayToday), now._bf(1 - weekdayToday), now._bf(2 - weekdayToday), now._bf(3 - weekdayToday), now._bf(4 - weekdayToday), now._bf(5 - weekdayToday), now._bf(6 - weekdayToday)]
export default {
  mixins: [config],
  components: {
  },
  name: 'signin',
  props: [],
  data () {
    return {
      // 获取当前周的日期集合
      weekTitle: ['周一', '周二', '周三', '周四', '周五', '周六', '周日', ''],
      data: [now],
      init: false
    }
  },
  computed: {
    weekCls () {
      return thisweek.map((x, i) => {
        if (this.data[i] && x._toDayString() === this.data[i]._toDayString()) {
          return 'signed'
        } else if (x._toDayString() === now._toDayString()) {
          return 'today'
        } else if (x.getTime() < now.getTime()) {
          return 'miss'
        } else {
          return ''
        }
      })
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    __initSigninPopup () {
      this.init = true
    },
    signin () {
      this.$f7.popup.close('#signin')
      setTimeout(() => {
        this.$f7.popup.open('#signinsuccess')
      }, 1000)
    }
  },
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.signin
  min-height 320px
  bg('~src/assets/signin/bg@2x.png')
  .lh_44
    bg('~src/assets/signin/14@2x.png', 100%)
    background-position top center
    &.miss
      background-image url('~src/assets/signin/17@2x.png')
    &.today
      background-image url('~src/assets/signin/12@2x.png')
    &.signed
      background-image url('~src/assets/signin/18@2x.png')
  
  .week_title_lst
    bg('~src/assets/signin/11@2x.png', auto 40%)
    
  .more-info
    bg('~src/assets/signin/20@2x.png', 100%)
  
  .gift_0
    bg('~src/assets/signin/6@2x.png', auto 100%)
  .gift_1
    bg('~src/assets/signin/7@2x.png', auto 100%)
  .gift_2
    bg('~src/assets/signin/8@2x.png', auto 100%)
  .gift_3
    bg('~src/assets/signin/9@2x.png', auto 100%)
  .gift_4
    bg('~src/assets/signin/10@2x.png', auto 100%)
  
  .swiper-pagination-bullet
    background-color #eee
  .swiper-pagination-bullet-active
    background-color #fff
    

</style>
