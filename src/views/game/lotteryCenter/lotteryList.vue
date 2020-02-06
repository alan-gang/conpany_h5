<template lang="pug">

f7-page.lottery-list()
  f7-navbar(innerClass="lottery-list-title" back-link :no-hairline="true")
    f7-nav-title() 开奖中心
    f7-nav-right
      f7-link._icon._lottery_classify( icon-f7=" home " icon-size="23px" @click=" __go('/game/lotteryCenter/classify', {props: {list}}) "  )

  f7-card.item.wp_100.ml_0(v-for="item in l" :key="item.id")
    .list-left(@click="__go('/game/lotteryCenter/history',{props:{currentLottery:item}})")
      f7-link._icon(:class="`_gid${(item.id || item.nid)}`" icon-f7=" home " icon-size="60px")
      div
        .title-container.mb_6
          span.title.c_2 {{item.n}}
          f7-icon.mt_5.ml_5.f_r.text-color-orange(f7="play_fill" size="2.3349vw")
        .number 第{{item.issue}}期
        .number-list.mt_5
          <div class="orange mr_3 mg_3 t_c" :class="{normal:item.gn !== '快三' && item.id !== 28, [`three_${list}`]:item.gn === '快三', [sixStyle[index]]:item.id === 28 }" v-for="(list,index) in item.code.split(',')" :key="index"> {{item.gn !== '快三' ? list : ''}} </div>
    .bet.ml_5 投注

</template>

<script>
import config from '@/config'
import api from '@/api'
import g from '@/gm/g'

export default {
  mixins: [config],
  components: {
  },
  name: 'lottery-list',
  props: {
  },
  created () {
    this.__getLotteryList()
  },
  data () {
    return {
      list: [],
      resultList: [],
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
    async  __getLotteryList () {
      let lotteryList = localStorage.lotteryList && JSON.parse(localStorage.lotteryList)
      if (lotteryList) {
        this.resultList = lotteryList
      }
      this.list = (await this.$.get(api.getLotteryList)).data.items
      this.list.forEach(item => {
        this.concatList(item)
      })
    },
    concatList (o) {
      g.forEach(item => {
        if (+o.lotteryid === item.id) {
          o = Object.assign(o, item)
        }
      })
    }
  },
  computed: {
    l () {
      this.list = this.list.filter(x => {
        return !x.hide && (x.code && x.id)
      })
      if (this.resultList.length) {
        return this.resultList
      } else {
        return this.list
      }
    }
  }
}
</script>

<style lang="stylus">
  @import '~@/css/common.stylus'
  @import '~src/css/var.stylus'

    .lottery-list-title
      color #fff
      background-image: linear-gradient(90deg,#ff8331 0%,#ff5429 100%),linear-gradient(#ffffff,#ffffff);
      .icon-back
        color #fff

   .lottery-list
    .item
      padding 3.1401vw 3.8647vw 3.3011vw   3.8647vw
      box-sizing border-box
      flex()
      .list-left
        flex(start)
        .title-container
          flex(start)
          .title
            height: 3.2206vw;
            font-weight bold
            font-size: 3.3816vw;
        .number
          font-size 2.8986vw
          color #999
        .number-list
          flex(start,,wrap)
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
      .bet
        width: 12.88vw;
        height: 6.44vw;
        line-height: 6.44vw;
        background-color: #f1f1f1;
        border-radius: 3.22vw;
        text-align center
        font-size  3.38vw
        color #333
        align-self flex-end
        flex-shrink 0

</style>
