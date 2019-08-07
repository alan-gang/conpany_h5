<template lang="pug">
f7-page.settings
  f7-navbar(back-link title="设置")
  f7-list.mt_0.ft_16
    //- f7-list-item(title="夜间模式")
      f7-toggle(slot='after' :checked=" cache.night " v-on:toggle:change=" __setCache({night: $event}) ")

    f7-list-item(title="线路测试" link="#" @click=" $f7.popup.open('#speed') ")

    f7-list-item(title="关于我们" link="/aboutus/")
    
    f7-list-button.bgc_f(@click=" __setCall({fn: '__logout'}) ") 退出

</template>

<script>
import config from '@/config'
export default {
  mixins: [config],
  components: {
  },
  name: 'settings',
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
