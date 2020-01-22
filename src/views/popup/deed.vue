分红契约弹窗提醒
<template lang="pug">
.deed.p_r
  h3 签订分红契约邀请
  f7-link._icon.deed_close.p_a(icon-size="50px" popup-close="#deed")
  f7-button.deed_but.mg_10(fill large popup-close="#deed" @click=" __go('/popup/deed_listinfo', {props: '1'}) ") 查看契约详情
</template>

<script>
import config from '@/config'
export default {
  mixins: [config],
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
.deed
  min-height 360px
  bg('~src/assets/deed/fhqytc_bg@2x.png', 80% 80%)

  h3
    margin-top 7.6em
    display inline-block
    text-align center
    width 100%
    color #ff0000
    font-size 24px
    font-weight normal
    font-stretch normal
    line-height 2em
  .deed_close
    left 50%
    bottom -1em
    margin-left -1.2em
    width 2.4em
    height 2.4em
    bg('~src/assets/deed/fhqytc_icon_Shut@2x.png', 100% 100%)
  .deed_but
    width 14em
    margin 0.5em auto 0
    bg('~src/assets/deed/fhqytc_icon_confirm@2x.png', 100% 100%)
    background-color initial
</style>
