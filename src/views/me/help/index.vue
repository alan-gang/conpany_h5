<template lang="pug">

f7-page.bgc_f.help
  f7-navbar(title="帮助中心" back-link)
  f7-row.bgc_f.ft_23(top).pt_40.bg-color-white(labels)
    f7-link._icon._play_intro.wp_50.c_3(icon-f7=" home " style="height: 130px;display: flex;flex-direction: column;" href="/me/help/howtoplay/") 玩法介绍
    f7-link._icon._function_intro._vip.wp_50.c_3(icon-f7=" home " style="height: 130px;display: flex;flex-direction: column;" href="/me/help/functionintro/") 功能介绍
    f7-link._icon._faq.wp_50.c_3(icon-f7=" home " style="height: 130px;display: flex;flex-direction: column;" href="/me/help/faq/") 常见问题

</template>

<script>
import config from '@/config'
export default {
  mixins: [config],
  components: {
  },
  name: 'help',
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
.help .f7-icons
  font-size 78px
</style>
