<template lang="pug">

f7-page(hide-navbar-on-scroll)
  f7-navbar(back-link :title=" title ")
  iframe(:src=" url ")


</template>

<script>
import config from '@/config'
export default {
  mixins: [config],
  components: {
  },
  name: 'frame',
  props: ['url', 'title'],
  data () {
    return {
    }
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
