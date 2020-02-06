<template lang="pug">

f7-page.lottery-history()
  f7-navbar(innerClass="lottery-list-title" back-link :no-hairline="true")
    f7-nav-title() 开奖结果

  f7-toolbar.z_9502.ft_14(top)
    f7-link(color="gray" @click=" sd === 2 ? __setCall({fn: '__closeSD'}) : sd = 2 ")
      span.c_3  {{currentLottery.gn}}
      f7-icon.rz_90(f7="play_fill" size="0.81vw" :class=" { 'rz_-90 color-deeporange': sd === 2 } ")

    f7-link(color="gray" @click=" sd === 3 ? __setCall({fn: '__closeSD'}) : sd = 3 ")
      span.c_3  30期
      f7-icon.rz_90(f7="play_fill" size="0.81vw" :class=" { 'rz_-90 color-deeporange': sd === 3 } ")

  filters(v-if=" sd " @sd=" sd = $event ")
    DATE( @s=" s = $event " @done=" __setCall({fn: '__closeSD'}) ")

  f7-card.item.wp_100.ml_0.mt_5.mb_0()
    .title-list-left.c_6 期数
    .title-list-right.c_6 开奖号码
  .scroll
    f7-card.item.wp_100.ml_0.mb_0.mt_0(:class="{bgc_f7:index%2 ===0}" v-for="(item,index) in lotteryHistoryList" :key="item.issue")
      .number-list-left {{item.issue}}
      .title-list-right
        <div class="orange mr_3 mb_3 t_c" :class="{normal:currentLottery.gn !== '快三' && currentLottery.id !== 28, [`three_${list}`]:currentLottery.gn === '快三', [sixStyle[index]]:currentLottery.id === 28 }" v-for="(list,index) in item.code.split(',')" :key="index">{{currentLottery.gn !== '快三' ? list : ''}}</div>
        //- .orange.mr_3.mb_3.t_c( :class="{normal:currentLottery.gn !== '快三' && currentLottery.id !== 28, [`three_${list}`]:currentLottery.gn === '快三', [sixStyle[index]]:currentLottery.id === 28 }" v-for="(list,index) in item.code.split(',')" :key="index") {{currentLottery.gn !== '快三' ? list : ''}}
  .orange-btn() 立即投注

</template>

<script>
import config from '@/config'
import filters from '@/components/filters'
import stet from '@/components/stet'
import DATE from '@/components/filters/DATE'
import api from '@/api'
// import g from '@/gm/g'

export default {
  mixins: [config, stet],
  components: {
    filters,
    DATE,
  },
  name: 'lottery-history',
  props: {
    currentLottery: Object
  },
  created () {
    this.__initList()
  },
  data () {
    return {
      lotteryHistoryList: [],
      sd: false,
      sixStyle: {
        0: 'red',
        1: 'blue',
        2: 'green',
        3: 'red',
        4: 'blue',
        5: 'green',
        6: 'red',
      }
    }
  },
  methods: {
    async __initList (size = 30) {
      this.lotteryHistoryList = (await this.$.post(api.recentlyIssueList, { gameid: this.currentLottery.id, size })).data.items
      console.log(this.lotteryHistoryList)
    }
  },
  computed: {
  }
}
</script>

<style lang="stylus">
  @import '~@/css/common.stylus'
  @import '~src/css/var.stylus'

  .lottery-history
    .toolbar-inner
      padding 0 2.01vw
      background-color #fff
    .item
      flex()
      height 9.66vw
      border-radius 0
      line-height 9.66vw
      padding 0  5.64vw
      box-sizing border-box
      .number-list-left
        font-family: PingFang-SC-Medium;
        font-size: 3.62vw;
        letter-spacing: 0vw;
        color: #ff5429;

    .orange-btn
        width: 94.2vw;
        height: 10.87vw;
        line-height: 10.87vw;
        background-image: linear-gradient(90deg,
        #ff8331 0%,
        #ff5429 100%),
        linear-gradient(
        #1ea2ff,
        #1ea2ff);
        background-blend-mode: normal,
        normal;
        border-radius: 0.81vw;
        text-align center
        font-family: PingFang-SC-Medium;
        font-size: 3.62vw;
        color: #ffffff;
        position fixed
        bottom 7.63vw
        left 50%
        transform translateX(-50%)

      .scroll
        height 69.3vh
        overflow scroll

      .orange
        width: 5.475vw;
        height: 5.475vw;
        line-height: 5.475vw;
        &.normal
          font-size 2.496vw
          border-radius 50%
          background-image: linear-gradient(0deg, #fbb420 0%, #ffe6b2 100%),
          linear-gradient(#2e2e2e, #2e2e2e);
          background-blend-mode: normal,normal;
          color #333
        &.three_1
          bg('~src/assets/gameicon/k3-icon-sz-1@2x.png')
        &.three_2
          bg('~src/assets/gameicon/k3-icon-sz-2@2x.png')
        &.three_3
          bg('~src/assets/gameicon/k3-icon-sz-3@2x.png')
        &.three_4
          bg('~src/assets/gameicon/k3-icon-sz-4@2x.png')
        &.three_5
          bg('~src/assets/gameicon/k3-icon-sz-5@2x.png')
        &.three_6
          bg('~src/assets/gameicon/k3-icon-sz-6@2x.png')
        &.red
          font-size 1.93vw
          color: #fc593b;
          bg('~src/assets/gameicon/game_lhc_red@2x.png')
        &.blue
          font-size 1.93vw
          color: #3187ff;
          bg('~src/assets/gameicon/game_lhc_blue@2x.png')
        &.green
          font-size 1.93vw
          color: #28b678;
          bg('~src/assets/gameicon/game_lhc_green@2x.png')

  .title-list-right
    flex()
</style>
