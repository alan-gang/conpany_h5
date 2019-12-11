<template lang="pug">
f7-page.checkin-calendar-view
  f7-navbar(:innerClass=" 'navbar_of_' + $options.name " title="每日签到" back-link @back-click="close")
  .calendar-header.flex.flex-ai-c
    .week(v-for="w in weeks") {{w}}
  .calendar-days.flex.ft18
    .day-item.empty.flex.flex-ai-c.flex-jt-c(v-for="d in firstDay")
      .day
    .day-item.flex.flex-ai-c.flex-jt-c(v-for="d in daysOfMonth" @click="checkInHandler(d)" v-bind:class="[getCls(d)]")
      .day {{d}}
</template>

<script>
import config from '@/config'
import signincommon from './signincommon'
export default {
  mixins: [config, signincommon],
  name: 'signmonth',
  mounted () {
    this.getCheckInfo(() => {
      this.initData()
    })
  },
  methods: {
    checkInHandler (date) {
      if (date !== this.date.getDate()) return
      this.checkIn()
      this.close()
    },
    close () {
      this.$f7.panel.close()
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
 .checkin-calendar-view
  width 100%
  $img-base-dir = "~src/assets/signin/"
  bgImage($name)
    background url($img-base-dir+$name+"@2x.png") center no-repeat
    background-size 100%
    color #fff
  .calendar-header
    height 35px
    color #fff
    background-color #1b1b1b
    font-size 12px
    padding 0
    .week
      text-align center
      font-weight bold
      flex 1
  .calendar-days
    flex-wrap wrap
    justify-content flex-start
    font-size 14px
    .day-item
      width 14.28%
      margin 6px 0 6px 0
      display flex
      justify-content center
      dayLineHeight() {
        line-height 36px
      }
      &.today .day
        bgImage("12")
        dayLineHeight()
      &.signed .day
        bgImage("18")
        dayLineHeight()
      &.miss .day
        bgImage("17")
        dayLineHeight()
      &.empty .day
        bgImage("14")
        dayLineHeight()
    .day 
      width 44px
      height 44px
      line-height 44px
      text-align center
      display flex
      justify-content center
      // align-items center
      color #9b9b9b
      bgImage('day-bg')
</style>
