<template lang="pug">
.scope_pick.o_h
  .pd_10.pt_55
    f7-row.j_s(no-gap)
      f7-col.pd_1(width="50" v-for=" (v, i) in  numberList" :key="i")
        f7-button.ml_5.mr_5.mb_5.bgc_f7.btn.ft_12.pd_0.c_3(:class=" {'bg-color-deeporange text-color-white': cache.filters.ctssid === v.id, 'bgc_pc text-color-black': cache.filters.ctssid !== v.id  } " @click=" change(v) ") 最近{{ v }}期




</template>

<script>
import config from '@/config'
export default {
  mixins: [config],
  components: {
  },
  name: 'scope_pick',
  data () {
    return {
      numberList: [30, 50, 100, 200]
    }
  },
  computed: {

  },
  created () {
  },
  methods: {
    change (v) {
      this.__setCache(Object.assign(this.cache.filters, { ctssid: v.id }))
      this.$emit('s', v)
      this.close()
    },
    close () {
      this.$emit('done')
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
@import '~src/css/common.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.scope_pick
  .page_content_like
    height 60vh
    padding-bottom 8.05vw

  .p_a
    bottom 0
    left 0
    right 0

  .number-btn-container
    flex(,,wrap)
    .btn
      width 43vw
      height 7.73vw
      font-family: PingFang-SC-Medium;
      font-size: 3.38vw;


</style>
