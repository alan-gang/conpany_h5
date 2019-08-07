<template lang="pug">
  f7-page.bank
    f7-navbar(:innerClass=" 'navbar_of_' + $options.name " title="银行卡" back-link)
      f7-nav-right
        .menu-item.menu-item-dropdown.icon-only.bgc_o
          .menu-item-content
            i.icon.f7-icons.text-color-deeporange more_fill
          .menu-dropdown.menu-dropdown-right
            .menu-dropdown-content(style="box-shadow: 0 3px 3px 0px #dedede")
              a.j_c.menu-dropdown-link.menu-close(@click=" __go('/me/bank/note/') ")
                span 绑卡说明
              a.j_c.menu-dropdown-link.menu-close(@click=" locking " style='margin-left: 0px;')
                span 锁定银行卡
    
    .bgc_orange.t_c.h_180.o_h
        f7-icon._icon._bankicon_card(f7="home" size="220")

    .mt_-40.ml_10.mr_10.p_r
      .z_2.p_a.wp_100.hp_100.t_c(v-if=" user.lockCard ")
        .bgc_f.o_45.p_a.wp_100.hp_100
        f7-icon._icon._bankicon_lock(f7="home" size="150")

      f7-list.mb_10.mt_0(v-for=" (v, i) in user.userBankCards " :key="i")
        ul.r_5
          li.swipeout(@swipeout:delete=" __go('/me/bank/unbind/', {props: { v }}) ")
            .swipeout-content.pd_20.r_5
              .flex.pt_10
                .a
                  f7-icon._icon(:class="'_bankicon_' + v.apiName" f7="home")
                  span.ft_16 {{ v.bankName }}
                  
                span.ft_20.c_orange(style="letter-spacing: 3px")
                  span.pr_5.ft_25 • • • •
                  span {{ v.cardNo.slice(-4) }}

              .c_9.t_r.ft_12.pt_10 {{ v.addTime.split(' ')[0] }}

            f7-swipeout-actions(right)
              f7-swipeout-button(delete confirm-text="银行卡解绑后，不能再绑定到其它账号上", confirm-title="温馨提示") 解绑

      f7-button.mb_10.bgc_f.pd_10.h_60.lh_20(href="/me/bank/bind/")
        f7-icon._icon._plus(f7="home" size="20")
        .ft_14 绑定银行卡


</template>

<script>
  import config from '@/config'
  import api from '@/api'
  export default {
    mixins: [config],
    components: {
    },
    name: 'bank',
    props: [],
    data () {
      return {
      }
    },
    created () {
      this.__setCall({fn: '__getUserBankCards'})
    },
    methods: {
      locking () {
        this.$f7.dialog.confirm('银行卡锁定后，不能绑定或解绑银行卡，客服亦无权限解锁，请谨慎操作', '温馨提示', () => {
          this.__setCall({fn: '__cpwd', args: this.lockBankCard})
        })
      },
      lockBankCard (cpwd) {
        this.$.get(api.lockBankCard)
      },
    }
  }
</script>

<style lang="stylus">
  @import '~src/css/var.stylus'
  // 建议不添加scoped， 所有样式最多嵌套2层
  // .bank

</style>
