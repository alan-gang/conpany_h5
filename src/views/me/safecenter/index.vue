<template>
  <f7-page class="safecenter" :page-content="false">
    <f7-navbar title="账户安全" back-link></f7-navbar>
    <div class="top">
      <f7-gauge type="circle" value-text="75" :value="0.75" label-text="分" border-bg-color="rgba(255,255,255,0.2)" border-color="#fff" value-text-color="#fff"></f7-gauge>
      <p>当前登录地址：上海市·中国</p>
    </div>
    <form class="clearfix">
      <div class="fl section">
        <div>
          <a href="javascript:;" class="_icon _safeicon_1 link color-black">
            <i class="icon f7-icons"> home </i>
          </a>
          <label>登录密码</label><br />
          <a href="/me/safecenter/loginPwd/" class="a">立即修改</a>
        </div>
        <div>
          <a href="javascript:;" class="_icon _safeicon_2 link color-black">
            <i class="icon f7-icons"> home </i>
          </a>
          <label>登录问候语</label><br />
          <a href="/me/safecenter/greetings/" class="a">未设置</a>
        </div>
        <div>
          <a href="javascript:;" class="_icon _safeicon_3 link color-black">
            <i class="icon f7-icons"> home </i>
          </a>
          <label>邮箱绑定</label><br />
          <a href="/me/safecenter/emailBind/" class="a">未绑定</a>
        </div>
        <div>
          <a href="javascript:;" class="_icon _safeicon_4 link color-black">
            <i class="icon f7-icons"> home </i>
          </a>
          <label>安全验证绑定</label><br />
          <a href="/me/safecenter/safeVerifyBind/" class="a">未绑定</a>
        </div>
        <div>
          <a href="javascript:;" class="_icon _safeicon_12 link color-black">
            <i class="icon f7-icons"> home </i>
          </a>
          <label>生日</label><br />
          <a href="/me/safecenter/birthday/" class="a">未设置</a>
        </div>
      </div>
      <div class="fr section">
        <div>
          <a href="javascript:;" class="_icon _safeicon_5 link color-black">
            <i class="icon f7-icons"> home </i>
          </a>
          <label>资金密码</label><br />
          <a href="/me/safecenter/capitalPwd/" class="a">立即修改</a>
        </div>
        <div>
          <a href="javascript:;" class="_icon _safeicon_6 link color-black">
            <i class="icon f7-icons"> home </i>
          </a>
          <label>安全回答</label><br />
          <a href="/me/safecenter/safeanswer/" class="a">未设置</a>
        </div>
        <div>
          <a href="javascript:;" class="_icon _safeicon_7 link color-black">
            <i class="icon f7-icons"> home </i>
          </a>
          <label>设置昵称</label><br />
          <a href="/me/safecenter/nickname/" class="a a-1">未绑定</a>
        </div>
        <div>
          <a href="javascript:;" class="_icon _safeicon_8 link color-black">
            <i class="icon f7-icons"> home </i>
          </a>
          <label>安全验证</label><br />
          <a href="/me/safecenter/safeVerify/" class="a">暂未设置</a>
        </div>
      </div>
    </form>
  </f7-page>
</template>

<script>
  import config from '@/config'
  import page from '@/components/page'
  export default {
    mixins: [config, page],
    components: {
    },
    name: 'safecenter',
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
  .safecenter
    .top
      margin-top 0.8rem
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
              width 0.97rem
              height 0.32rem
              color #ff5429
              background-color #ffeae5
              border-radius 0.16rem
              text-align center
</style>
