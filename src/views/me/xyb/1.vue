<template lang="pug">
f7-page.xyb_1(ptr :ptr-mousewheel="true" @ptr:refresh=" refresh ")
  f7-block.t_9.t_c(v-if="!data[0]") 暂无数据~
  f7-card(v-for=" (x, i) in data " :key="i")
    f7-card-content
      .flex.ft_12
        .a
          .hlh_20.ft_15 {{ x.remark }} 
          .lh_20.text-color-gray {{ x.createdateBack }}

        .b.t_r.wp_55
          .lh_20.ft_15(:class=" {c_s: x.changemoney._o0(), c_e: x.changemoney._l0()} ") {{ x.changemoney._o0() ? '+' : '' }}{{ x.changemoney._f3() }}
          .lh_20.text-color-gray 余额：{{ x.amount._f3() }}


</template>

<script>
import config from '@/config'
import api from '@/api'
import page from '@/components/page'
export default {
  mixins: [config, page],
  components: {
  },
  name: 'xyb_1',
  props: ['v'],
  data () {
    return {
      data: [],
    }
  },
  created () {
    this.init()
  },
  methods: {
    __init_xyb_1 () {
      this.init()
    },
    init () {
      this.loadMore('', this.defaultListCb)
    },
    list (option = {pageNum: 1, page: 1, pageSize: this.pageSize, size: this.pageSize}, cb = this.defaultListCb) {
      this.$.get(api.selectAccountChange, Object.assign({
        action: '',
        productId: this.v.id,
      }, option)).then(({data: {data, totalSize}}) => {
        this.data = [...(option.page > this.fpage ? this.data : []), ...data]
        this.total = totalSize
        cb && cb(data)
      })
    },
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
    
</style>
