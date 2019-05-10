<template lang="pug">

f7-page
  f7-navbar(title="银行卡" back-link)



</template>

<script>
import config from '@/config'
export default {
  mixins: [config],
  components: {
  },
  name: 'load',
  props: [],
  data () {
    return {}
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
</style>
