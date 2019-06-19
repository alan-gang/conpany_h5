<template lang="pug">
  .rebate-rate-view(v-if="show")
    f7-list.rebate-ls
      f7-list-item(v-for="(item, i) in rebateRates" :key="i")
        f7-row.rebate-type-row
          f7-col(width="20") 
            span(class="c_orange") {{item.name || item.groupname}} 
          f7-col.ft_15(width="80") 
            span {{item.rebateTypeTxt}} 
            span(class="c_orange") {{item.$ || 0.00}}% 
            span.c_g &nbsp;({{item.unitTxt}}{{item.$ || 0.00}})
        .rebate-swiper-wp
          .left-r(@click="swiperLeft(i)")
          f7-swiper.rebate-swiper(:params="swiperParams" v-show="item.$s" :ref="'rebateSwiper' + i")
            f7-swiper-slide(v-for="(rate, j) in item.$s" :key="j" @click.native="rebateItemHandler(rate, i, j)" :class="{active: (rate * 0.1).toFixed(1) === item.$}") {{(rate * 0.1).toFixed(1)}}%
          .right-r(@click="swiperRight(i)")
</template>

<script>
export default {
  name: 'RebateRate',
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
  data () {
    return {
    }
  },
  watch: {
    rebateRates () {
      this.$nextTick(() => {
        this.updateSwiperPosition()
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.updateSwiperPosition()
    })
  },
  methods: {
    updateSwiperPosition () {
      for (let i = 0; i < this.rebateRates.length; i++) {
        this.$refs['rebateSwiper' + i] && this.$refs['rebateSwiper' + i][0].swiper.slideTo(this.rebateRates[i].$ / 0.1 - 1, 0)
      }
    },
    rebateItemHandler (rate, i, j) {
      this.rebateRates[i].$ = (rate * 0.1).toFixed(1)
      this.$emit('update', this.rebateRates)
    },
    swiperLeft (i) {
      this.$refs['rebateSwiper' + i] && this.$refs['rebateSwiper' + i][0].swiper.slideNext()
    },
    swiperRight (i) {
      this.$refs['rebateSwiper' + i] && this.$refs['rebateSwiper' + i][0].swiper.slidePrev()
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
