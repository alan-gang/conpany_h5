<template lang="pug">

f7-page.coupon_use
  f7-navbar(:innerClass=" 'navbar_of_' + $options.name " title="使用优惠券" back-link)
  f7-list
    f7-list-item(title="优惠券名称" :after=" v.goodsName ")
    f7-list-item(title="优惠说明" :after=" v.desc ")
    li.media-item
      .item-content
        .item-inner
          .item-title-row 使用说明
          .item-text {{ v.goodsdesc }}
            



  f7-list(inline-labels)
    template(v-if=" v.goodsType !== 5 ")
      f7-list-item(title='选择游戏', smart-select='', :smart-select-params="{openIn: 'sheet'}")
        select(name='games' v-model=" form.i " )
          option(:value=' i ' v-for=" (x, i) in v.gameGroupPlatArr " :key="i") {{ x.groupName }}

      f7-list-item(title='选择平台', smart-select='', :smart-select-params="{openIn: 'sheet'}")
        select(name='plats' v-model=" form.j ")
          option(:value=' i ' v-for=" (x, i) in v.gameGroupPlatArr[form.i].platList " :key="i") {{ x.platName }}

    f7-list-input._input_right(required validate pattern="[0-9.]*" label='输入金额' placeholder='请输入金额...' v-if=" v.goodsType === 3 && Number(v.prizeAmount) <= 0 " :value=" form.m " @change=" form.m = $event.target.value ")
    
  f7-block
    f7-button(fill large @click=" use ") 立即使用

</template>

<script>
import config from '@/config'
import api from '@/api'
export default {
  mixins: [config],
  components: {
  },
  name: 'coupon_use',
  props: ['v'],
  data () {
    return {
      form: {
        i: 0,
        j: 0,
        m: '',
      }
    }
  },
  computed: {

  },
  created () {
  },
  methods: {
    use () {
      this.transferToBG()
      // if (this.v.goodsType === 5) this.activeCoupon()
      // else if (this.v.gameGroupPlatArr[this.form.i].groupId === '0' || this.v.gameGroupPlatArr[this.form.i].groupId === '99') this.getLotteryGoodPrize()
      // else this.transferToBG(this.v.goodsType === 3 && Number(this.v.prizeAmount) <= 0)
    },
    getLotteryGoodPrize () {
      this.$.get(api.getLotteryGoodPrize, {
        gameGroupId: this.v.gameGroupPlatArr[this.form.i].groupId,
        platId: this.v.gameGroupPlatArr[this.form.i].platList[this.form.j].platId,
        entry: this.v.entry
      }).then(this.then)
    },
    transferToBG (hasMoney) {
      if (hasMoney && !Number(this.form.m) && Number(this.form.m) !== 0) return this.__toast('请输入金额')
      let args = {
        gameGroupId: this.v.gameGroupPlatArr[this.form.i].groupId,
        platid: this.v.gameGroupPlatArr[this.form.i].platList[this.form.j].platId,
        entry: this.v.entry
      }
      if (hasMoney) args.amount = this.form.m

      this.$.get(api.transferToBG, args).then(this.then)
    },
    activeCoupon () {
      this.$.get(api.getNoActivatePrize, {entry: this.v.entry}).then(this.then)
    },
    then ({data}) {
      this.__setCall({fn: '__init_coupon_1'})
      this.__back()
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
// .coupon_use
      
</style>
