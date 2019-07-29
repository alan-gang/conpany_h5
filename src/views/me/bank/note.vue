<template lang="pug">
f7-page
  f7-navbar(title="绑卡说明" back-link)
  .bgc_f.pd_10.ft_12
    | 1. 银行卡绑定成功后，平台任何区域都
    span.c_orange  不会 
    | 出现您的完整银行账号、开户姓名等信息
    br
    br
    | 2. 银行绑定成功后，相关信息将无法查看与修改，只能进行
    span.c_orange  解除绑定 
    br
    br
    | 3. 新绑定的提款银行卡需要绑定时间超过 
    span.c_orange 6
    |  小时才能正常提款
    br
    br
    | 4. 每个游戏账户最多绑定
    span.c_orange  5 
    | 张银行卡
    br
    br
    | 5. 一个游戏账户只能绑定同一个开户人姓名的银行卡
    br
    br
    span.c_orange 6. 银行卡锁定后，不能绑定或解绑银行卡，客服亦无权限解锁，请谨慎操作

      

</template>

<script>
import config from '@/config'
export default {
  mixins: [config],
  components: {
  },
  name: 'name',
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
