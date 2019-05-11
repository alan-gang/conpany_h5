<template>
  <f7-page class="loginPwd" :page-content="false">
    <f7-navbar title="安全验证绑定" back-link></f7-navbar>
    <div class="top">
      <img src="" alt="二维码" />
    </div>
    <form>
      <div class="section">
        <label>密钥</label>
        <input type="text" readonly />
        <span>复制</span>
      </div>
      <div class="section">
        <label for="code">验证码</label>
        <input type="text" placeholder="请输入畅博安全验证码" id="code" maxlength="6" />
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
    .top
      height 3.2rem
      background linear-gradient(to right, #ff8131, #ff5429)
    form
      margin-top 0.2rem
      font-size 0.27rem
      .section
        position relative
        height 0.92rem
        line-height 0.92rem
        margin-bottom 0.18rem
        background-color #fff
        label
          display inline-block
          color #666
          width 1.6rem
          padding-left 0.2rem
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
          right 0.33rem
          width 1.1rem
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
