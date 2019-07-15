<template lang="pug">

f7-page.gift(:page-content="false")
  f7-toolbar(tabbar top scrollable style="transform: none")
    f7-link(tab-link tab-link-active href="#gift_1") 
      f7-button(round fill color="gray") 未领取
    f7-link(tab-link href="#gift_2" ) 
      f7-button(round fill color="gray") 已领取

  f7-tabs(animated swipeable)
    f7-tab#gift_1(tab-active).page-content
      f7-page(ptr :ptr-mousewheel="true" @ptr:refresh="refresh")
        f7-card(v-for=" (v, i) in enablePrize " :key="i")
          f7-card-content.a
            .text-color-deeporange.ft_24 {{ v.prizeAmount }}
            .text-color-black.ft_12 {{ v.activityName }}
            .text-color-gray.ft_12 {{ v.msg }}
            f7-button.p_a.aa(fill :class=" {'color-gray': v.enable !== '1'} " @click=" v.activityType !== 3 ? getNow(v) : checkinNow(v) ") 
              span 立即领取

    f7-tab#gift_2.page-content
      f7-page(ptr :ptr-mousewheel="true" @ptr:refresh="refresh1")
        f7-card(v-for=" (v, i) in myPrize " :key="i")
          f7-card-content.a
            .text-color-deeporange.ft_24 {{ v.amount }}
            .text-color-black.ft_12 {{ v.activityName }}
            .text-color-gray.ft_12 {{ v.prizeDate }}
            f7-button.p_a.aa.color-gray(fill) 
              span 已领取




  


</template>

<script>
import config from '@/config'
import api from '@/api'
export default {
  mixins: [config],
  components: {
  },
  name: 'gift',
  props: [],
  data () {
    return {
      enablePrize: [],
      myPrize: []
    }
  },
  created () {
  },
  methods: {
    __init_gift () {
      this.getAllEnablePrize()
      this.myGetPrize()
    },
    refresh (evt, done) {
      this.getAllEnablePrize()
      setTimeout(done, 1000)
    },
    refresh1 (evt, done) {
      this.myGetPrize()
      setTimeout(done, 1000)
    },
    getAllEnablePrize () {
      this.$.get(api.getAllEnablePrize).then(({data: {enablePrize}}) => {
        this.enablePrize = enablePrize
      })
    },
    myGetPrize () {
      this.$.get(api.myGetPrize).then(({data: {myGetPrize}}) => {
        this.myPrize = myGetPrize
      })
    },
    getNow (v) {
      if (v.enable !== '1') return
      this.$.get(api.doRewardPrize, {prizeId: v.pirzeId, activityId: v.activityId}).then(() => {
        this.__init_gift()
      })
    },
    checkinNow (v) {
      if (v.enable !== '1') return
      this.$.get(v.isContinue === '1' ? api.getCheckInReward : api.doCheckIn, {entry: v.activityId}).then(({data}) => {
        this.__init_gift()
      })
    },
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.gift
  .a
    bg('~src/assets/promo/promos_icon_voucher@2x.png', auto 60%)
    background-position left 15px center
    padding 10px 100px 10px 80px
  .aa
    top 0
    right 0
    bottom 0
    width 100px
    height 100%
    display flex
    flex-align center
    border-top-left-radius 0
    border-bottom-left-radius 0
      
</style>
