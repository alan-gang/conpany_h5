<template lang="pug">
  f7-list-item.rebate-rate-row.bgc_f
    f7-row.rebate-type-row
      f7-col(width="20") 
        span(class="c_orange") {{item.name || item.groupName}} 
      f7-col.ft_15(width="80") 
        span {{item.rebateTypeTxt}}
        span(class="c_orange") {{item.$ || 0.00}}{{item.unitSymbal}} 
        span.c_g &nbsp;({{item.unitTxt}}{{item.$ || 0.00}})
    .rebate-swiper-wp(v-show="!isHighestRate")
      slot(name="left")
      slot(name="leftIcon")
        .left-r(@click="swiperLeft(i)")
      f7-swiper.rebate-swiper(:params="swiperParams" v-show="item.$s" ref="rebateSwiper")
        f7-swiper-slide(v-for="(rate, j) in item.$s" :key="j" @click.native="rebateItemHandler(rate, i, j)" :class="{active: (rate * 0.1).toFixed(1) === item.$}") {{(rate * 0.1).toFixed(1)}}{{item.unitSymbal}}
      slot(name="rightIcon")
        .right-r(@click="swiperRight(i)")
      slot(name="right")
    .highest-tip.pt_15.pb_10(v-if="swiperParams.checkHighestRate && isHighestRate") 当前已是最高，不可再调整
</template>

<script>
export default {
  name: 'RebateRateRow',
  props: {
    show: Boolean,
    i: Number,
    item: {
      type: Object,
      default () {
        return {}
      }
    },
    swiperParams: {
      type: Object,
      default () {
        return {
          speed: 500,
          slidesPerView: 5,
          spaceBetween: 2,
          allowSlidePrev: true,
          allowSlideNext: true,
          checkHighestRate: false
        }
      }
    }
  },
  data () {
    return {
      isHighestRate: false // 是否启用最高比率显示，1.只显示最高比较文案，2.比率不可调整
    }
  },
  watch: {
    item () {
      this.$nextTick(() => {
        this.updateSwiperPosition()
      })
    }
  },
  mounted () {
    if (this.swiperParams.checkHighestRate && this.item.$ * 10 === this.item.$s) this.isHighestRate = true
    this.$nextTick(() => {
      this.updateSwiperPosition()
    })
  },
  methods: {
    updateSwiperPosition () {
      this.$refs['rebateSwiper'] && this.$refs['rebateSwiper'].swiper.slideTo(this.item.$ / 0.1 - 1, 0)
    },
    rebateItemHandler (rate, i, j) {
      let item = Object.assign({}, this.item)
      item.$ = (rate * 0.1).toFixed(1)
      this.$emit('update', item, i, j)
    },
    swiperLeft (i) {
      this.$refs['rebateSwiper'] && this.$refs['rebateSwiper'].swiper.slidePrev()
    },
    swiperRight (i) {
      this.$refs['rebateSwiper'] && this.$refs['rebateSwiper'].swiper.slideNext()
    }
  }
}
</script>

<style lang="stylus">
.rebate-rate-row
  .item-inner
    display block
    padding 20px 15px 20px 0
  .rebate-type-row
    flex 1
  .rebate-swiper
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
