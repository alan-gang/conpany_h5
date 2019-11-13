<template lang="pug">
  .rebate-rate-view(v-if="show")
    f7-list.rebate-ls.mg_0
      slot(name="rebateRateRow")
        RebateRateRow(v-for="(item, i) in rebateRates" :key="i" :item="item" :i="i" :swiperParams="swiperParams" @update="update" :parentIfRange="parentIfRange")
</template>

<script>
import RebateRateRow from './RebateRateRow'
export default {
  name: 'RebateRate',
  components: {
    RebateRateRow
  },
  props: {
    parentIfRange: Boolean,
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
      let rebateRates = this.rebateRates.slice(0)
      rebateRates[i] = item
      this.$emit('update', rebateRates)
    }
  }
}
</script>

<style lang="stylus">
</style>
