<template lang="pug">
f7-page.xyb_1(ptr :ptr-mousewheel="true" @ptr:refresh=" refresh ")

</template>

<script>
import config from '@/config'
import page from '@/components/page'
export default {
  mixins: [config, page],
  components: {
  },
  name: 'xyb_1',
  props: [],
  data () {
    return {}
  },
  created () {
    this.loadMore('', this.defaultListCb)
  },
  methods: {
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
    
</style>
