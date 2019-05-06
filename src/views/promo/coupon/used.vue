<template lang="pug">

f7-page.coupon_2(infinite :infinite-distance="50" :infinite-preloader="showPreloader" @infinite="loadMore" ptr :ptr-mousewheel="true" @ptr:refresh="refresh")
  f7-card(v-for=" (v, i) in data " :key="i")
    f7-card-content.a.text-color-white.goods_gray
      .mh_80
        span.ft_24 {{ v.prizeAmount }}
        span.ft_12 元 
        span.aa.ft_18 {{ v.goodsName }}
      .pb_5.h_30
        span.ab 
          span 有效期至：
          span {{ v.expireTime }}
        span.aa.f_r.r_15.ft_16(v-if=" v.activityName ") {{ v.activityName }}     

    f7-card-footer.pt_0.pb_0.j_c
      span 使用时间：{{ v.getTime }}




  


</template>

<script>
import config from '@/config'
import api from '@/api'
import page from '@/components/page'
export default {
  mixins: [config, page],
  components: {
  },
  name: 'coupon_2',
  props: [],
  data () {
    return {
      data: []
    }
  },
  created () {
  },
  methods: {
    __init_coupon_2 () {
      this.list()
    },
    refresh (evt, done) {
      this.list()
      setTimeout(done, 1000)
    },
    list (option = {page: 1, pageSize: this.pageSize}, cb = this.defaultListCb) {
      this.$.get(api.queryMygoods, Object.assign({
        used: 1
      }, option)).then(({data: {myGoods, totalSize}}) => {
        this.data = [...(option.page > this.fpage ? this.data : []), ...myGoods]
        this.total = totalSize
        cb && cb(myGoods)
      })
    },
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
urls = {
    'goods_1': '~src/assets/promo/Coupon_bg_01',
    'goods_2': '~src/assets/promo/Coupon_bg_02',
    'goods_3': '~src/assets/promo/Coupon_bg_03',
    'goods_4': '~src/assets/promo/Coupon_bg_04',
    'goods_5': '~src/assets/promo/Coupon_bg_05',
    'goods_6': '~src/assets/promo/Coupon_bg_06',
    'goods_7': '~src/assets/promo/Coupon_bg_07',
    'goods_gray': '~src/assets/promo/Coupon_bg_gray',
  }
    
.coupon_2
  .a:after
    content ''
    position absolute
    right 20px
    top -2px
    width 90px
    height 90px
    bg('~src/assets/promo/Coupon_icon_used@2x-min.png', 100%)
  .a
    padding 15px 25px 5px 25px
    for k, v in  urls
      &.{k}
        bg(v+'@2x-min.png', 100%)
        background-position top left
  .aa
    border 1px solid #fff
    padding 0 10px
  .ab
    position relative
    top 5px
      
</style>
