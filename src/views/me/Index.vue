<template lang="pug">

.me.page
  .page-content.pt_0
    f7-list.mg_0(no-hairlines)

      f7-list-item.bgc_f
        f7-icon._icon(:class=" '_level_' + (user.level + 1) " slot="media" f7=" home " size="80px" style="height: 100%; width: 80px")
        .ft_14.minw_160
          .mg_5 {{ user.userName }}
          .mg_5
            f7-progressbar.h_10.r_5(:progress="progress")
          .mg_5.ft_12
            f7-button.pd_0.hlh_20.inlb.w_40(fill) {{ user.levelName }}
            span.c_9  {{ user.exp}}/{{ user.nexMinExp }}

        .b
          f7-button(color="gray" outline round href="/settings/")
            f7-icon._icon._settings(f7="home" size="19")
            span 设置

    .pl_10.pr_10.bgc_f.c_f
      f7-list.mg_0.no_border._bg._me_wallet.ft_14(no-hairlines)

        f7-list-item.no_active_state(title="我的钱包" after="全部" link="/me/wallet/")
        f7-list-item
          div(v-for=" (v, i) in  config.wallets.slice(0, 3) ")
            div {{ user[v.key] || '0.000' }}
            div {{ v.n }}

    .pt_5.pb_5.bg-color-white
      f7-toolbar.ft_12.c_333.bg-color-white(labels)
        f7-link._icon._load(icon-f7=" home " href="/me/load/") 充值
        f7-link._icon._withdraw(icon-f7=" home " href="/me/withdraw/") 提现
        f7-link._icon._transfer(icon-f7=" home " href="/me/transfer/") 转帐
        f7-link._icon._xyb(icon-f7=" home " href="/me/xyb/") 信游宝


    .mt_10
      f7-button.hlh_40.r_0.wp_50.inlb(:color=" !mycenter ? 'black bg-color-white' : '' "  @click=" mycenter = true " :active=" mycenter ") 个人中心
      f7-button.hlh_40.r_0.wp_50.inlb(:color=" mycenter ? 'black bg-color-white' : ' bg-color-orange' " @click=" mycenter = false " :active=" !mycenter ") 代理中心

    .box.pt_10.pb_10(:class=" {'my bg-color-deeporange': mycenter, 'notmy bg-color-orange': !mycenter} ")
      .ml_10.mr_10
        f7-row
          template(v-if=" mycenter ")
            f7-col(width="33")
              f7-button.hlh_40(bg-color="white" color="black" href="/rfs/bc/") 彩票记录
            f7-col(width="33")
              f7-button.hlh_40(bg-color="white" color="black" href="/rfs/cr/") 资金记录
            f7-col(width="33")
              f7-button.hlh_40(bg-color="white" color="black" href="/rfs/pl/") 盈亏报表
          template(v-else)
            f7-col(width="33")
              f7-button.hlh_40(bg-color="white" color="black") 开户管理
            f7-col(width="33")
              f7-button.hlh_40(bg-color="white" color="black") 下级管理
            f7-col(width="33")
              f7-button.hlh_40(bg-color="white" color="black") 团队报表
      f7-list.mg_0.no_border(no-hairlines)
        ul.bgc_o
          template(v-if=" mycenter ")

            f7-list-item.ft_14.bgc_f.mg_10(title="账户安全" link="/me/safecenter/")
              f7-icon.mr_5._icon._account_safe(slot="media" f7=" home ")

            //- f7-list-item.ft_14.bgc_f.mg_10(title="银行卡" link="#" @click=" __setCall({fn: '__cpwd', args: () => { __go('/me/bank/') }}) ")
            f7-list-item.ft_14.bgc_f.mg_10(title="银行卡" link="/me/bank/")
              f7-icon.mr_5._icon.__bank_card(slot="media" f7=" home ")

            f7-list-item.ft_14.bgc_f.mg_10(title="彩票奖金" link="/me/bonus/")
              f7-icon.mr_5._icon._lottery_bonus(slot="media" f7=" home ")

            f7-list-item.ft_14.bgc_f.mg_10(title="帮助中心" link="/me/help/")
              f7-icon.mr_5._icon._help_center(slot="media" f7=" home ")

          template(v-else)

            f7-list-item.ft_14.bgc_f.mg_10(title="团队统计" link="#")
              f7-icon.mr_5._icon._sub_game_record(slot="media" f7=" home ")

            f7-list-item.ft_14.bgc_f.mg_10(title="下级个人盈亏" link="#")
              f7-icon.mr_5._icon._sub_game_record(slot="media" f7=" home ")

            f7-list-item.ft_14.bgc_f.mg_10(title="下级彩票记录" link="#")
              f7-icon.mr_5._icon._sub_game_record(slot="media" f7=" home ")

            f7-list-item.ft_14.bgc_f.mg_10(title="下级账变明细" link="#")
              f7-icon.mr_5._icon._sub_game_record(slot="media" f7=" home ")

            f7-list-item.ft_14.bgc_f.mg_10(title="日工资管理" link="#")
              f7-icon.mr_5._icon._sub_game_record(slot="media" f7=" home ")

            f7-list-item.ft_14.bgc_f.mg_10(title="分红管理" link="#")
              f7-icon.mr_5._icon._sub_game_record(slot="media" f7=" home ")

            f7-list-item.ft_14.bgc_f.mg_10(title="佣金管理" link="#")
              f7-icon.mr_5._icon._sub_fund_record(slot="media" f7=" home ")

          f7-list-button.bgc_f.mg_10(@click=" __setCall({fn: '__logout'}) ") 退出

</template>

<script>
import config from '@/config'
import api from '@/api'
export default {
  mixins: [config],
  components: {
  },
  name: 'me',
  props: [],
  data () {
    return {
      mycenter: true,
    }
  },
  computed: {
    progress () {
      return Math.min(Number((this.user.exp * 100 / this.user.nexMinExp).toFixed(2)) || 0, 100)
    },
  },
  created () {
    this.getUserIdentity()
  },
  methods: {
    getUserIdentity () {
      this.$.get(api.getUserIdentity).then(({data}) => {
        this.__setUser(data)
      })
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.me
  --f7-list-bg-color rbga(0,0,0,0)
  --f7-list-item-after-text-color #fff
  --f7-list-chevron-icon-color #fff

  .list .item-media+.item-inner
    margin-left 0
  
  .button.wp_50
    padding 0
    &:nth-child(1)
      border-top-left-radius 10px
      &:before
      &:after
        content ''
        position absolute
        right 0
        top 0
        width 20px
      &:after
        height 100%
        border-bottom-left-radius 20px 40px 
        background-color var(--f7-page-bg-color)
      &:before
        z-index 1
        right 10px
        height 20px
        width 40px
        background radial-gradient(circle at 0% 180%, transparent, transparent 70%, var(--f7-page-bg-color) 70%)
        
      
    &:nth-child(2)
      border-top-right-radius 10px
      &:before
      &:after
        content ''
        position absolute
        left 0
        top 0
        width 20px
      &:after
        height 100%
        border-bottom-right-radius 20px 40px 
        background-color var(--f7-page-bg-color)
      &:before
        z-index 1
        left 10px
        height 20px
        width 40px
        background radial-gradient(circle at 100% 180%, transparent, transparent 70%, var(--f7-page-bg-color) 70%)

  
</style>
