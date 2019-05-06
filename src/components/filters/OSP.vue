<template lang="pug">
.state_pick.o_h
  .pd_10
    f7-row.j_s(no-gap)
      f7-col(width="33")
        f7-button.ft_12.pd_0(:class=" {'bg-color-deeporange text-color-white': cache.osid === '', 'bgc_pc text-color-black': cache.osid !== ''  } " @click=" change({n: '全部状态', id: ''}) ") 全部状态
      f7-col.pd_1(width="33" v-for=" (v, k) in config.orderState " :key="k")
        f7-button.ft_12.pd_0(:class=" {'bg-color-deeporange text-color-white': cache.osid === k, 'bgc_pc text-color-black': cache.osid !== k  } " @click=" change({n: v, id: k}) ") {{ v }}







</template>

<script>
import config from '@/config'
export default {
  mixins: [config],
  components: {
  },
  name: 'state_pick',
  data () {
    return {
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
    change (v) {
      this.__setCache({osid: v.id})
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
// 建议不添加scoped， 所有样式最多嵌套2层
.state_pick
  .page_content_like
    height 60vh
    padding-bottom 100px

  .p_a
    bottom 0
    left 0
    right 0
  
</style>
