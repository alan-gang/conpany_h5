<template lang="pug">
.signin.p_r.mr_40.pt_30.pl_50
  f7-link._icon._sign_close.p_a.p_r_-20.p_t_0(icon-size="50px" icon-f7=" home " popup-close="#signin")

  .hlh_32.pl_20
    span.c_grass_green.ft_b 每日
    span.c_f.ft_b 签到
    f7-icon._icon._sign_square.mg_5(size="18" f7=" home ")
    span.c_ccc {{curMonth}}月您已经累计签到：
    span.c_grass_green {{checkinCount}} 天

  .thisweek.t_c.pt_5.ml_2.mr_2.c_9
    f7-row(no-gap)
      f7-col(width="25" v-for=" (x, i) in weeks ")
        template(v-if=" i < weeks.length")
          .hlh_25.bgc_f7(:class=" {'week_title_lst cli_a': i === weeks.length } " ) {{ x }}
        template(v-else)
          f7-button.hlh_25.bgc_f7.week_title_lst.cli_a(panel-open=".signmonth")
        .h_5
        .lh_44.h_55.w_44.mg_0a.c_f.ft_b(v-if=" i < 7 " :class="[getCls(curWeekDays[i])]" @click="signin(curWeekDays[i])") {{curWeekDays[i]}}
      f7-col(width="25")
        f7-button.hlh_25.bgc_f7.week_title_lst.cli_a(panel-open=".signmonth")
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
import signincommon from './signincommon'
import { getDayOfWeek } from '@/util/Date'
export default {
  mixins: [config, signincommon],
  name: 'signin',
  data () {
    return {
      init: false,
      curWeekDay: 0,
      curWeekDays: []
    }
  },
  mounted () {
    this.getCheckInfo(() => {
      this.initData()
      this.curWeekDay = getDayOfWeek(this.date, this.curDay)
      this.genWeekDays()
    })
  },
  methods: {
    __initSigninPopup () {
      this.init = true
    },
    signin (date) {
      // if (date !== this.date.getDate()) return
      this.checkIn()
    },
    genWeekDays () {
      let firstDayOfWeek = this.curDay - this.curWeekDay
      let endDayOfWeek = this.curDay + (this.weeks.length - this.curWeekDay - 1)
      this.curWeekDays = []
      for (let i = firstDayOfWeek; i <= endDayOfWeek; i++) {
        this.curWeekDays.push(i)
      }
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.signin
  min-height 320px
  bg('~src/assets/signin/bg@2x.png', 100% 100%)
  .lh_44
    bg('~src/assets/signin/day-bg@2x.png', 100%)
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
