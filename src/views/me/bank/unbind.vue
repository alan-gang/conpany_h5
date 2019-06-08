<template lang="pug">
  f7-page.bank_unbind
    f7-navbar(title="解绑银行卡" back-link back-link-force)
    .t_c.pd_20
      f7-icon._icon._bankicon_unbind_card.h_50(f7="home" size="80")

    f7-list.mg_0(inline-labels no-hairlines ref="_form")
      f7-list-input(type="text" required validate pattern="[0-9]*" label="银行卡号" placeholder="请输入银行卡号" clear-button @change=" form.cn = $event.target.value ")
      f7-list-input(label="持卡人" placeholder="请输入持卡人姓名" clear-button @change=" form.n = $event.target.value " required validate)

    .h_40
    f7-button.mg_10(fill large @click=" __validateform(unbindCheck) ") 确认

</template>


<script>
  import config from '@/config'
  import api from '@/api'
  export default {
    mixins: [config],
    components: {
    },
    name: 'bank_unbind',
    props: ['v'],
    data () {
      return {
        form: {
          cn: '',
          n: '',
        },
      }
    },
    created () {
    },
    methods: {
      unbindCheck () {
        this.$.post(api.unbindCheck, {
          realName: this.form.n,
          cardNo: this.form.cn,
          entry: this.v.entry,
        }).then(() => { this.__setCall({fn: '__cpwd', args: this.unbindBankCard}) })
      },
      unbindBankCard (cpwd) {
        this.$.post(api.unbindBankCard, {
          cardId: this.v.entry,
          secuityPwd: cpwd,
        }).then(() => {
          this.__back('', {reloadCurrent: true})
        })
      }
    }
  }
</script>

<style lang="stylus">
  @import '~src/css/var.stylus'
  // 建议不添加scoped， 所有样式最多嵌套2层
  
</style>
