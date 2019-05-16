<template>
  <f7-page class="safecenter">
    <f7-navbar title="账户安全" back-link></f7-navbar>
    <div class="top">
      <f7-gauge type="circle" :value-text="accountPoint" value-text-color="#fff" :value="accountPoint/100" label-text="分" border-bg-color="rgba(255,255,255,0.2)" border-color="#fff"></f7-gauge>
      <p>当前登录地址：{{ location }}</p>
    </div>
    <form class="clearfix">
      <div class="fl section">
        <div>
          <a href="javascript:;" class="_icon _safeicon_1 link color-black">
            <i class="icon f7-icons"> home </i>
          </a>
          <label>登录密码</label><br />
          <a href="/me/safecenter/loginPwd/" class="a">{{ hasLogPwd }}</a>
        </div>
        <div>
          <a href="javascript:;" class="_icon _safeicon_2 link color-black">
            <i class="icon f7-icons"> home </i>
          </a>
          <label>登录问候语</label><br />
          <a href="/me/safecenter/greetings/" class="a">{{ greetMsg }}</a>
        </div>
        <div>
          <a href="javascript:;" class="_icon _safeicon_3 link color-black">
            <i class="icon f7-icons"> home </i>
          </a>
          <label>邮箱绑定</label><br />
          <a href="/me/safecenter/emailBind/" class="a">{{ email }}</a>
        </div>
        <div>
          <a href="javascript:;" class="_icon _safeicon_4 link color-black">
            <i class="icon f7-icons"> home </i>
          </a>
          <label>安全验证绑定</label><br />
          <a href="/me/safecenter/safeVerifyBind/" class="a">{{ isOpenKey }}</a>
        </div>
        <div>
          <a href="javascript:;" class="_icon _safeicon_12 link color-black">
            <i class="icon f7-icons"> home </i>
          </a>
          <label>生日</label><br />
          <a href="/me/safecenter/birthday/" class="a">{{ birthday }}</a>
        </div>
      </div>
      <div class="fr section">
        <div>
          <a href="javascript:;" class="_icon _safeicon_5 link color-black">
            <i class="icon f7-icons"> home </i>
          </a>
          <label>资金密码</label><br />
          <a href="javascript:;" class="a" @click="securityPwd">{{ capitalPwd }}</a>
        </div>
        <div>
          <a href="javascript:;" class="_icon _safeicon_6 link color-black">
            <i class="icon f7-icons"> home </i>
          </a>
          <label>安全回答</label><br />
          <a href="/me/safecenter/safeanswer/" class="a">{{ isSetSafeQuest }}</a>
        </div>
        <div>
          <a href="javascript:;" class="_icon _safeicon_7 link color-black">
            <i class="icon f7-icons"> home </i>
          </a>
          <label>设置昵称</label><br />
          <a href="/me/safecenter/nickname/" class="a a-1">{{ nickName }}</a>
        </div>
        <div>
          <a href="javascript:;" class="_icon _safeicon_8 link color-black">
            <i class="icon f7-icons"> home </i>
          </a>
          <label>安全验证</label><br />
          <a href="/me/safecenter/safeVerify/" class="a">{{ isSetVerifytype }}</a>
        </div>
      </div>
    </form>
  </f7-page>
</template>

<script>
  import config from '@/config'
  import page from '@/components/page'
  import api from '@/api'
  export default {
    mixins: [config, page],
    components: {
    },
    name: 'safecenter',
    props: [],
    data () {
      return {
        location: '',
        accountPoint: '',
        hasLogPwd: '',
        capitalPwd: '',
        greetMsg: '',
        isSetSafeQuest: '',
        email: '',
        nickName: '',
        isOpenKey: '',
        isSetVerifytype: '',
        birthday: '',
      }
    },
    created () {
      this.acctSecureInfo()
      const user = this.user
      if (user.hasLogPwd === 1) {
        this.hasLogPwd = '立即修改'
      } else {
        this.hasLogPwd = '未设置'
      }
      if (user.hasSecurityPwd === 1) {
        this.capitalPwd = '立即修改'
      } else {
        this.capitalPwd = '未设置'
      }
    },
    methods: {
      acctSecureInfo () {
        this.$.get(api.acctSecureInfo).then((res) => {
          const data = res.data
          this.location = data.location
          this.accountPoint = data.accountPoint
          if (data.greetMsg === '') {
            this.greetMsg = '未设置'
          } else {
            this.greetMsg = '立即修改'
          }
          if (data.isSetSafeQuest === true) {
            this.isSetSafeQuest = '立即修改'
          } else {
            this.isSetSafeQuest = '未设置'
          }
          if (data.email === '') {
            this.email = '未绑定'
          } else {
            this.email = '立即修改'
          }
          if (data.nickName === '') {
            this.nickName = '未绑定'
          } else {
            this.nickName = '立即修改'
          }
          if (data.isOpenKey === 0) {
            this.isOpenKey = '未绑定'
          } else {
            this.isOpenKey = '立即修改'
          }
          if (data.isSetVerifytype === 0) {
            this.isSetVerifytype = '未设置'
          } else {
            this.isSetVerifytype = '立即修改'
          }
          if (data.birthday === '') {
            this.birthday = '未设置'
          } else {
            this.birthday = '生日只能设置一次'
          }
        })
      },
      securityPwd () {
        if (this.user.hasSecurityPwd === 1) { // ===
          this.__go('/me/safecenter/capitalPwdModify/')
        } else {
          this.__go('/me/safecenter/capitalPwd/')
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import '~src/css/var.stylus'
  // 建议不添加scoped， 所有样式最多嵌套2层
  .safecenter
    .top
      height 6.5rem
      background linear-gradient(to right, #ff8131, #ff5429);
      color #fff
      text-align center
      .gauge
        position relative
        margin-top 0.5rem
      .gauge-value-text
        font-size 0.91rem
        font-weight bold
      .gauge-label-text
        font-size 0.22rem
      p
        font-size 0.22rem
    form
      width 7.07rem
      margin -1rem auto 0
      background-color #fff
      border-radius 0.1rem
      .section
        width 45%
        padding 0.35rem 0 0 5%
        div
          margin-bottom 0.35rem
          ._icon
            position relative
            top 0.1rem
          label
            font-size 0.27rem
            color #333
          .a
            display inline-block
            margin 0.1rem 0 0 0.63rem
            font-size 0.22rem
            color #b0b0b0
            &.a-1
              display inline-block
              height 0.32rem
              line-height 0.32rem
              padding 0 0.18rem 0 0.12rem
              color #ff5429
              background-color #ffeae5
              border-radius 0.16rem
</style>
