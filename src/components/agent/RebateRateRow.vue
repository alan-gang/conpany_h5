<template lang="pug">
  f7-list-item.rebate-rate-row.bgc_f(v-show=" item.$s ")
    f7-row.rebate-type-row
      f7-col(width="20") 
        span(class="c_orange") {{item.name || item.groupName}} 
      f7-col.ft_15(:width=" ifRange ? 60 : 80") 
        span {{item.rebateTypeTxt}}
        span(class="c_orange") {{item.$ || 0.00}}{{item.unitSymbal}} 
        span.c_g &nbsp;({{item.unitTxt}}{{item.$ || 0.00}})

      f7-col.t_r(width="20" v-if="ifRange")
        f7-icon._icon._adduser_switch(f7="home" @click.native=" showRange = !showRange ")

    template(v-if=" !isHighestRate ")
      .rebate-swiper-wp(v-show=" !showRange ")
        slot(name="left")
        slot(name="leftIcon")
          .left-r(@click="swiperLeft(i)")
        f7-swiper.rebate-swiper(:params="swiperParams" v-show="item.$s" ref="rebateSwiper")
          f7-swiper-slide(@click.native="rebateItemHandler(0, i, 0)" :class="{active: 0 === item.$ * 1}") 0.0{{item.unitSymbal}}
          f7-swiper-slide(v-for="(rate, j) in (user.roleId === 1 ? [item.$s] : item.$s)" :key="j" @click.native="rebateItemHandler(rate, i, j)" :class="{active: (rate * 0.1).toFixed(1) === item.$}") {{(rate * 0.1).toFixed(1)}}{{item.unitSymbal}}

        slot(name="rightIcon")
          .right-r(@click="swiperRight(i)")
        slot(name="right")
    
      //- 滑竿
      .pb_5.pt_15(v-if=" showRange ")
        f7-row(no-gap)
          f7-col(width="10")
            .r_5.o_h.w_40.color-theme-gray(@click=" $f7.range.setValue('#point_range_adduser', pp) ")
             .stepper-button-minus.h_30
          f7-col.pl_15.pr_15(width="80")
            f7-range#point_range_adduser(:label="true" :format-label="formatLabel" min="0" :max=' item.$s ' :step='0.1' :value='item.$ * 10' @range:change=" rebateItemHandler($event, i, 0) ")
          f7-col(width="10")
            .r_5.o_h.w_40.color-theme-gray(@click=" $f7.range.setValue('#point_range_adduser', np) ")
              .stepper-button-plus.h_30

    template(else)
      .highest-tip.pt_15.pb_10(v-if="swiperParams.checkHighestRate && isHighestRate") 当前已是最高，不可再调整
      
</template>

<script>
import config from '@/config'
export default {
  name: 'RebateRateRow',
  mixins: [config],
  props: {
    parentIfRange: Boolean,
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
      isHighestRate: false, // 是否启用最高比率显示，1.只显示最高比较文案，2.比率不可调整
      showRange: false,
    }
  },
  computed: {
    ifRange () {
      return !this.item.groupId && !this.item.groupid && this.parentIfRange
    },
    np () {
      return Math.min((this.item.$ * 1 + 0.1) * 10, this.item.$s)
    },
    pp () {
      return Math.max((this.item.$ * 1 - 0.1) * 10, 0)
    },
  },
  mounted () {
    if (this.swiperParams.checkHighestRate && this.item.$ * 10 === this.item.$s) this.isHighestRate = true
    this.$nextTick(() => {
      this.updateSwiperPosition()
    })
  },
  methods: {
    formatLabel (v) {
      return (v / 10).toFixed(1)
    },
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
    min-width 44.4px
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
