<template lang="pug">

.page
  .page-content.pt_0
    iframe(:src=" user.vipChatUrl || chatUrl ")


</template>

<script>
import config from '@/config'
export default {
  mixins: [config],
  components: {
  },
  name: 'frame',
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
