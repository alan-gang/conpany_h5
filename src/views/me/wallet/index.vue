<template lang="pug">

f7-page.wallet(:page-content="false")
  f7-navbar(title="我的钱包" back-link)
  .p_a.t_c.c_f.bg-color-deeporange.z_9502
    h2.mg_10 {{ totalBalance._f3()._nwc() }}
    .mg_10  总余额（元）
    .h_20
    .bgc_pc.pd_10
      .mt_-30.pd_15.bg-color-white.r_5
        f7-toolbar.ft_12.c_333.bg-color-white(labels)
          f7-link._icon._load(icon-f7=" home " href="/me/load/") 充值
          f7-link._icon._withdraw(icon-f7=" home " href="/me/withdraw/") 提现
          f7-link._icon._transfer(icon-f7=" home " @click="") 一键转回

  .page-content.ptr-content(ptr-mousewheel="true" @ptr:refresh=" refresh ")
    .ptr-preloader
      .preloader
      .ptr-arrow

    f7-card.no-shadow(v-for=" (v, i) in config.wallets " :key="i")
      f7-card-header
        .wp_60.flex(@click=" __setCall({fn: '__getMoreBalance', args: [v]}) ")
          f7-button(color="black") {{ v.n }}
          .flex
            f7-button.t_r(color="black")
              span {{ user[v.key] || '0.000' }}
            f7-icon(f7="refresh" color="gray" size="18")

        f7-button(fill color="orange" @click="__go('/me/transfer/', {props: { j: i }})" v-show=" i !== 1 ") 转入
        f7-button(fill color="deeporange" @click="__go('/me/transfer/', {props: { i: i }})") 转出




</template>

<script>
import config from '@/config'
import page from '@/components/page'
export default {
  mixins: [config, page],
  components: {
  },
  name: 'wallet',
  props: [],
  data () {
    return {}
  },
  computed: {
    totalBalance () {
      return this.config.wallets.reduce((p, x, i) => {
        p += Number(this.user[x.key]) || 0
        return p
      }, 0)
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.__setCall({fn: '__getAllBalance'})
    },
    refresh (evt, done = evt.detail) {
      this.init()
      setTimeout(done, 1000)
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.wallet
  .p_a
    top var(--f7-navbar-height)
    left 0
    right 0
  .page-content
    top 160px
    height calc(100% - 160px)
    // padding-top calc(var(--f7-navbar-height) + 160px)
  .flex:active
    .icon
      animation Spin .5s linear 1

</style>
