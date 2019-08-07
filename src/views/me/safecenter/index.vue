<template lang="pug">
  f7-page.safecenter
    f7-navbar(:innerClass=" 'navbar_of_' + $options.name " title='账户安全', back-link)
    .bg-color-deeporange.pd_20.t_c
      f7-gauge(type="circle" size="150" :value-text=" user.accountPoint " value-text-color="#fff" :value="user.accountPoint/100" label-text="分" label-text-color="#fff" border-color="#fff" border-width="2" border-bg-color="rgba(255,255,255,0.2)")
      .pd_10.c_f.ft_12 当前登录地址：{{ user.location }}
      .h_40
    .bgc_f.mt_-50.ml_15.mr_15.r_5
      f7-row
        f7-col.pl_15.pr_15.pt_10.pb_10(width="50" v-for="(v, i) in data" :key="i")
          f7-icon._icon.v_t(:class=" '_safeicon' + v._icon " f7="home")
          .pl_5.inlb.v_t.pt_5
            span {{ v.n }}
            f7-button.pd_0.ft_12.t_l(v-if=" !user[v.key] || !v.once " @click=" __go(v.url, {props: { v }}) ") 
              span(:class="v.txtclss") 立即{{ v.txt }}
            .text-color-gray.ft_12.hlh_28(v-else) {{ v.vt || user[v.key] }}

</template>

<script>
  import config from '@/config'
  export default {
    mixins: [config],
    components: {
    },
    name: 'safecenter',
    props: [],
    data () {
      return {
        data_: [
          {n: '登录密码', _icon: '_pwd', key: 'isSetLoginPwd', url: '/me/safecenter/pwd/'},
          {n: '资金密码', _icon: '_cpwd', key: 'isSetSecurityPwd', url: '/me/safecenter/cpwd/'},
          {n: '设置昵称', _icon: '_nn', once: true, key: 'nickName', url: '/me/safecenter/nn/'},
          {n: '设置生日', _icon: '_birthday', once: true, key: 'birthday', url: '/me/safecenter/birthday/'},
          {n: '登录问候语', _icon: '_msg', key: 'greetMsg', url: '/me/safecenter/msg/'},
          {n: '手机绑定', _icon: '_phone', at: '绑定', _at: '解绑', key: 'mobile', url: '/me/safecenter/phoneb/'},
          {n: '邮箱绑定', _icon: '_email', at: '绑定', _at: '解绑', key: 'email', url: '/me/safecenter/emailb/'},
          {n: '信游安全', _icon: '_bd', at: '绑定', _at: '解绑', key: 'isOpenKey', url: '/me/safecenter/bdb/'},
          {n: '安全问答', _icon: '_qa', key: 'isSetSafeQuest', url: '/me/safecenter/qa/', once: true, vt: '已设置'},
          {n: '安全验证', _icon: '_sb', key: 'isSetVerifytype', url: '/me/safecenter/sb/'},
        ]
      }
    },
    computed: {
      data () {
        return this.data_.map(v => {
          v = Object.assign(v, { txtclss: !this.user[v.key] ? 'c_e' : '', txt: !this.user[v.key] ? v.at || '设置' : v._at || '修改', t: this.user[v.key] })
          return v
        })
      }
    },
    created () {
      this.__setCall({fn: '__acctSecureInfo'})
    },
    methods: {
    }
  }
</script>

<style lang="stylus">
  @import '~src/css/var.stylus'
  // 建议不添加scoped， 所有样式最多嵌套2层
  // .safecenter
</style>
