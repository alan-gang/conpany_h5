<template lang="pug">
  f7-page.set-point-pg
    f7-navbar(:innerClass=" 'navbar_of_' + $options.name " title="设置返点/返水" back-link top)
    f7-row.h_40.bgc_f.flex-ai-c.pl_25
      f7-col 下级用户名： {{name}}
    f7-list.rebate-ls.mt_10
      RebateRateRow(v-for="(item, i) in rebateRates" :key="i" :item="item" slot="list" :i="i" :swiperParams="swiperParams" @update="update")
        .r-left.w_70(slot="left") 调整为：
        .r-rigft(slot="right")
          f7-button.ml_10(fill small @click="suerSetRebateRate(item, i)") 确定
      
    //- RebateRate(:rebateRates="rebateRates" :show="true" @update="updateRebateRates")  
</template>

<script>
import api from '@/api'
import config from '@/config'
// import RebateRate from 'comp/agent/RebateRate'
import RebateRateRow from 'comp/agent/RebateRateRow'
import mth from '@/util/mth'
export default {
  name: 'setPoint',
  mixins: [config],
  components: {
    // RebateRate,
    RebateRateRow
  },
  props: ['id', 'name', 'userPoint', 'myPoint'],
  data () {
    return {
      mth,
      rebateRates: [],
      swiperParams: {
        speed: 500,
        slidesPerView: 5,
        spaceBetween: 2,
        allowSlidePrev: true,
        allowSlideNext: true,
        checkHighestRate: true
      },
      // 调点类型 1 2
      AT: 0,
      pointType: 'up'
    }
  },
  computed: {
    showSalary () {
      return this.user.displayPermission.showSalary === 1
    },
    showback () {
      return this.user.displayPermission.showback === 1
    },
    showpoint () {
      return this.user.displayPermission.showpoint === 1
    },
    showcpfh () {
      return this.user.displayPermission.showCpfh === 1
    },
    showsfyj () {
      return this.user.displayPermission.showSfyj === 1
    }
  },
  mounted () {
    this.getUserRebateDataById({userId: this.id})
  },
  methods: {
    getUserRebateDataById (params = {}) {
      this.$.get(api.getBackWater, params).then(({ data: { backWaterComb } }) => {
        backWaterComb = backWaterComb.map((x, i) => {
          x.$$ = x.$ = x.backWater ? (x.backWater * 1000).toFixed(1) : ''
          x.$s = x.maxBackWater * 10000
          x.rebateTypeTxt = '当前返水'
          x.unitTxt = '千分之'
          x.unitSymbal = '‰'
          return x
        })
        if (this.showpoint) {
          backWaterComb.unshift({
            name: '彩票',
            $: this.userPoint.toFixed(1),
            $$: this.userPoint.toFixed(1),
            $s: this.myPoint * 10,
            backwater: this.userPoint,
            rebateTypeTxt: '返点',
            unitTxt: '百分之',
            unitSymbal: '%'
          })
        }
        this.rebateRates = backWaterComb
      }, (rep) => {
        this.__back()
      })
    },
    setRebateRate (backWater, groupId, groupName) {
      let params = {
        userId: this.id,
        backWater,
        groupId,
        groupName
      }
      this.$.get(api.setBackWater, params).then(({data}) => {
        this.__toast('调整' + params.groupName + '返水成功')
      })
    },
    adjustPoint (point) {
      if (!Number(point)) return
      this.$.get(api.adjustPoint, {
        destUserId: this.id,
        adjustType: this.pointType === 'up' ? 0 : 1,
        increaseType: this.AT,
        point: point
      }).then(({data}) => {
        this.__toast('调点成功！')
      }, (rep) => {
        // error
      })
    },
    updateRebateRates () {},
    update (item, i, j) {
      this.rebateRates[i] = item
      this.$set(this.rebateRates, i, item)
      // this.$emit('update', this.rebateRates)
    },
    suerSetRebateRate (item) {
      if (!item.groupId) {
        this.adjustPoint(this.mth.sub(item.$, item.$$))
      } else {
        this.setRebateRate(item.$ / 1000, item.groupId, item.groupName)
      }
    }
  }
}
</script>

<style lang="stylus">
.rebate-ls
  ul
    background none
  ul > li
    margin-top 10px
    background #fff
  .item-inner
    display block
  .r-left
    flex-shrink 0
  .r-right
    button
      margin-right 0
</style>

