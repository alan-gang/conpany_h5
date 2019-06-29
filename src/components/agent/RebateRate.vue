<template lang="pug">
  .rebate-rate-view(v-if="show")
    f7-list.rebate-ls
      slot(name="rebateRateRow")
        RebateRateRow(v-for="(item, i) in rebateRates" :key="i" :item="item" :i="i" :swiperParams="swiperParams" @update="update")
</template>

<script>
import RebateRateRow from './RebateRateRow'
export default {
  name: 'RebateRate',
  components: {
    RebateRateRow
  },
  props: {
    show: Boolean,
    rebateRates: Array,
    swiperParams: {
      type: Object,
      default () {
        return {
          speed: 500,
          slidesPerView: 5,
          spaceBetween: 2,
          allowSlidePrev: true,
          allowSlideNext: true
        }
      }
    }
  },
  methods: {
    update (item, i, j) {
      this.rebateRates[i] = item
      this.$emit('update', this.rebateRates)
    }
  }
}
</script>

<style lang="stylus">
.rebate-rate-view
  .rebate-ls
    margin-top 10px
    .item-inner
      display block
      padding 20px 15px 20px 0
    .rebate-type-row
      flex 1
    .rebate-swiper
      // margin-top 15px
      .swiper-slide.active
        background-color rgba(251, 175, 156, 0.3)
        color rgb(255,84,41)
	      border solid 2px #ff5429
        box-sizing border-box
    .swiper-slide
      height 35px
      line-height 35px
      text-align center
      background-color #efefef
    .rebate-swiper-wp
      display flex
      align-items center
      margin-top 15px
    arrow()
      width 10px
      height 10px
      content ''
      display block
    .left-r
      width 15px
      display flex
      align-items center
      &::before
        arrow()
        border-top solid 2px #666
        border-left solid 2px #666
        transform rotate(-45deg)
    .right-r
      width 15px
      display flex
      align-items center
      &::after
        arrow()
        border-top solid 2px #666
        border-right solid 2px #666
        transform rotate(45deg)
</style>
