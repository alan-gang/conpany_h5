<template>
  <f7-page class="loginPwd" :page-content="false">
    <f7-navbar title="安全验证" back-link></f7-navbar>
    <a href="javascript:;" class="logo _icon _safeicon_8 link color-black">
      <i class="icon f7-icons"> home </i>
    </a>
    <form>
      <div class="bgcolor">
        <label>资金密码验证</label>
        <a href="javascript:;" class="_icon _gou_gray link color-black">
          <i class="icon f7-icons"> home </i>
        </a>
      </div>
      <div class="bgcolor">
        <label>邮箱验证</label>
        <a href="javascript:;" class="_icon _gou link color-black">
          <i class="icon f7-icons"> home </i>
        </a>
      </div>
      <div class="bgcolor">
        <label>手机验证</label>
      </div>
      <div class="bgcolor">
        <label>安全码验证</label>
      </div>
      <div class="bgcolor">
        <label for="code">验证码</label>
        <input type="text" placeholder="请输入验证码" id="code" maxlength="6" />
        <span>获取验证码</span>
      </div>
      <a href="javascript:;" class="confirm">确 认</a>
    </form>
  </f7-page>
</template>

<script>

</script>

<style lang="stylus">
  @import '~src/css/var.stylus'
  // 建议不添加scoped， 所有样式最多嵌套2层
  .loginPwd
    .logo
      position absolute
      top 1.05rem
      left 50%
      margin-left -0.3rem
      transform scale(1.77)
    form
      margin-top 1.9rem
      font-size 0.27rem
      .bgcolor
        position relative
        height 0.92rem
        line-height 0.92rem
        margin-bottom 0.18rem
        background-color #fff
        label
          display inline-block
          color #666
          width 1.7rem
          padding-left 0.2rem
        a
          position absolute
          top 0.18rem
          right 0.26rem
        input
          display inline-block
          color #3d3d3d
          &::-webkit-input-placeholder { color: #c5c5c5; }
          &:-moz-placeholder { color: #c5c5c5; }
          &::-moz-placeholder { color: #c5c5c5; }
          &:-ms-input-placeholder { color: #c5c5c5; }
        span
          position absolute
          top 0.18rem
          right 0.2rem
          width 1.97rem
          height 0.55rem
          line-height 0.55rem
          color #fff
          background-color #ff5429
          border-radius 0.28rem
          text-align center
      .confirm
        display block
        width 7.07rem
        height 0.82rem
        line-height 0.82rem
        margin 1.38rem auto 0
        color #fff
        background linear-gradient(to right, #fe8f48, #ff5429)
        border-radius 0.05rem
        text-align center
</style>
