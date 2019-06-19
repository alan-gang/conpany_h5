<template lang="pug">
.acount_state_pick.o_h
  .pl_10.pr_10.page_content_like
    .pt_10
      f7-button.wp_50.inlb.r_0(fill color="orange" @click=" (cache.filters.asid = '') || data.find(x => x.text === '游戏').orderList.forEach(y => change(y)) " ) 游戏账变
      f7-button.wp_50.inlb.r_0(fill color="deeporange" @click=" (cache.filters.asid = '') || data.filter(x => x.text !== '游戏').forEach(z => z.orderList.forEach(y => change(y))) " ) 非游戏账变

    template(v-for=" (v, i) in data ")
      .hlh_30.pl_10.pt_10.text-color-gray(:key="i") {{ v.text }}
      f7-row.j_s(no-gap)
        f7-col.pd_1(width="25" v-for=" (x, j) in v.orderList " :key="j")
          f7-button.ft_12.pd_0(:class=" {'bg-color-deeporange text-color-white': cache.filters.asid.indexOf(','+ x.ordertypeId + ',') !== -1, 'bgc_pc text-color-black': cache.filters.asid.indexOf(','+ x.ordertypeId + ',') === -1  } " @click=" change(x) ") {{ x.cnTitle }}
    .h_10

  .p_a.z_1.pd_10.bg-color-white
    f7-button.wp_50.inlb.r_0(fill color="orange" @click=" reset() ") 重置
    f7-button.wp_50.inlb.r_0(fill @click="close") 确定


</template>

<script>
import config from '@/config'
import api from '@/api'
import { cache } from '@/store'
export default {
  mixins: [config],
  components: {
  },
  name: 'acount_state_pick',
  data () {
    return {
      data: cache.state.accountType || [],
    }
  },
  computed: {
    a () {
      return this.data.reduce((p, x, i) => {
        p = p.concat(x.orderList)
        return p
      }, [])
    },
    o () {
      let id = this.cache.filters.asid.replace(/^,+/, '').replace(/,+$/, '').replace(',', '')
      return {
        id: id,
        n: id ? id.split(',').reduce((p, x, i) => {
          p.push((this.a.find(y => String(y.ordertypeId) === x) || {}).cnTitle)
          return p
        }, []).join(',') : '全部状态'
      }
    }
  },
  created () {
    !this.data[0] && this.getOrderType()
  },
  methods: {
    getOrderType () {
      this.$.get(api.getOrderType, {version: 1}).then(({data: {orderTypeList}}) => {
        this.data = orderTypeList
        this.__setCache({accountType: orderTypeList})
      })
    },
    change (v) {
      this.cache.filters.asid.indexOf(',' + v.ordertypeId + ',') === -1 ? this.__setCache(Object.assign(this.cache.filters, {asid: ',' + v.ordertypeId + ',' + this.cache.filters.asid.replace(',' + v.ordertypeId + ',', '')})) : this.__setCache(Object.assign(this.cache.filters, {asid: this.cache.filters.asid.replace(',' + v.ordertypeId + ',', '')}))
    },
    reset () {
      this.cache.filters.asid = ''
      this.close()
    },
    close () {
      this.$emit('s', this.o)
      this.$emit('done')
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.acount_state_pick
  .page_content_like
    height 60vh
    padding-bottom 50px

  .p_a
    bottom 0
    left 0
    right 0
  
</style>
