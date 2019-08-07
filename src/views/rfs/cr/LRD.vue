<template lang="pug">
f7-page.load_record_detail
  f7-navbar(:innerClass=" 'navbar_of_' + $options.name " title="充值记录详情" back-link)
  .pt_30.t_c
    f7-icon(color="deeporange" f7="time_fill" size="80")
    .hlh_30.ft_20 待充值
  f7-list
    f7-list-item(title="银行卡" :after=" bankName ")
    f7-list-item(title="充值金额" :after=" '￥' + payerAmount ")
    f7-list-item(title="手续费" :after=" payerTransferFee ? payerTransferFee : '--' ")
    f7-list-item(title="到账金额" :after=" '￥' + payerRealAmount ")
    f7-list-item(title="申请时间" :after=" payerTime ")
    f7-list-item(title="到账时间" :after=" pushTime === '0000-00-00 00:00:00' ? '--' : pushTime ")
    f7-list-item(title="状态" :after=" isDone ")

  //- .mg_10
    f7-button(fill large) 催到账


  
</template>

<script>
import config from '@/config'
export default {
  mixins: [config],
  components: {
  },
  name: 'load_record_detail',
  props: ['bankName', 'billNo', 'payerAmount', 'payerTransferFee', 'payerRealAmount', 'payerTime', 'pushTime', 'isDone', 'errorEntry'],
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
