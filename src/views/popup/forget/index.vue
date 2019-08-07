<template lang="pug">

  f7-page(:page-content="false")

    f7-navbar(:innerClass=" 'navbar_of_' + $options.name ")
      f7-nav-left
        f7-link(icon-only icon-f7="chevron_left" popup-close="#forget")
      f7-nav-title 找回密码

    f7-toolbar(top tabbar bg-color="white")

      f7-link(tab-link="#email" tab-link-active) 邮箱

      f7-link(tab-link="#phone") 手机

      f7-link(tab-link="#sq") 安全问题

      f7-link(tab-link="#bd") 博盾验证码


    f7-tabs(animated)

      f7-tab#email.page-content.tab-active
        f7-view(url="/forget/email")

      f7-tab#phone.page-content
        f7-view(url="/forget/phone")

      f7-tab#sq.page-content
        f7-view(url="/forget/sq")

      f7-tab#bd.page-content
        f7-view(url="/forget/bd")

</template>
<script>
  export default {
    name: 'forget',
    components: {
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~src/css/var.stylus'
      
</style>