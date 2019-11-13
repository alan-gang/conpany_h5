<template lang="pug">
  f7-page.open-account-mgr-pg(:page-content="false" )
    f7-toolbar(tabbar top)
      .a
        f7-link.wp_80(back)
          f7-icon(color="deeporange" f7="chevron_left")

      .b.flex.wp_100.hp_100
        f7-link.underline_40(tab-link tab-link-active href="#rf_adduser_1") 新增下级
        f7-link.underline_40(tab-link href="#rf_adduser_2") 链接管理

    f7-tabs
      f7-tab#rf_adduser_1(tab-active @tab:show=" tabShow ")
        addLowerLevel
      f7-tab#rf_adduser_2(@tab:show=" tabShow ")
        linkAdmin
</template>

<script>
import config from '@/config'
import addLowerLevel from './addLowerLevel'
export default {
  name: 'openAccountMgr',
  mixins: [config],
  components: {
    linkAdmin: resolve => require(['./linkAdmin.vue'], resolve),
    addLowerLevel
  },
  data () {
    return {}
  },
  methods: {
    tabShow (evt) {
      this.__setCall({fn: '__init_' + evt.target.id})
    }
  }
}
</script>

<style lang="stylus">
.open-account-mgr-pg
  .page-content
    padding-top 44px
</style>
