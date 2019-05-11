<template>
  <f7-page class="loginPwd" :page-content="false">
    <f7-navbar title="资金密码修改" back-link></f7-navbar>
    <a href="javascript:;" class="logo _icon _safeicon_10 link color-black">
      <i class="icon f7-icons"> home </i>
    </a>
    <form>
      <div class="section">
        <label for="password">当前密码</label>
        <input type="password" placeholder="请输入当前密码" id="password" maxlength="16" />
      </div>
      <div class="section">
        <label for="newPwd">新密码</label>
        <input type="password" placeholder="请输入新密码" id="newPwd" maxlength="16" />
      </div>
      <div class="section">
        <label for="confirmPwd">确认密码</label>
        <input type="password" placeholder="请重复新密码" id="confirmPwd" maxlength="16" />
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
      top 1.08rem
      left 50%
      margin-left -0.28rem
      transform scale(1.77)
    form
      margin-top 1.9rem
      font-size 0.27rem
      .section
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
      .confirm
        display block
        width 7.07rem
        height 0.82rem
        line-height 0.82rem
        margin 1.75rem auto 0
        color #fff
        background linear-gradient(to right, #fe8f48, #ff5429)
        border-radius 0.05rem
        text-align center
</style>
