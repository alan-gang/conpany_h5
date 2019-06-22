<template lang="pug">
.scope_pick.o_h
  .pd_10
    f7-row.j_s(no-gap)
      f7-col.pd_1(width="25" v-for=" (v, i) in config.tzStateFilters " :key="i")
        f7-button.ft_12.pd_0(:class=" {'bg-color-deeporange text-color-white': cache.filters.tzsid === v.id, 'bgc_pc text-color-black': cache.filters.tzsid !== v.id  } " @click=" change(v) ") {{ v.n }}




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
    }
  },
  computed: {

  },
  created () {
  },
  methods: {
    change (v) {
      this.__setCache(Object.assign(this.cache.filters, {tzsid: v.id}))
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
.scope_pick
  .page_content_like
    height 60vh
    padding-bottom 100px

  .p_a
    bottom 0
    left 0
    right 0
  
</style>
