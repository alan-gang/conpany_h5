<template>
  <f7-page class="unbind">
    <f7-navbar title="解绑银行卡" back-link></f7-navbar>
    <a href="javascript:;" class="logo _icon _bankicon_4 link color-black">
      <i class="icon f7-icons"> home </i>
    </a>
    <form>
      <div class="section">
        <label for="bankNo">银行卡号</label>
        <input type="text" placeholder="请输入解绑银行卡卡号" id="bankNo" maxlength="19" />
      </div>
      <div class="section name">
        <label for="name">持卡人</label>
        <input type="text" placeholder="请输入持卡人姓名" id="name" />
      </div>
      <div class="section">
        <label for="capitalPwd">资金密码</label>
        <input type="password" placeholder="请输入资金密码" id="capitalPwd" maxlength="6" />
      </div>
      <a href="javascript:;" class="confirm">确 认</a>
    </form>
  </f7-page>
</template>

<script>
  import config from '@/config'
  export default {
    mixins: [config],
    components: {
    },
    name: 'unbind',
    props: [],
    data () {
      return {}
    },
    created () {
    },
    methods: {
    }
  }
</script>

<style lang="stylus">
  @import '~src/css/var.stylus'
  // 建议不添加scoped， 所有样式最多嵌套2层
  .unbind
    .logo
      position absolute
      top 1.08rem
      left 50%
      margin-left -0.3rem
      transform scale(1.77)
    form
      margin-top 1rem
      font-size 0.27rem
      .section
        height 0.92rem
        line-height 0.92rem
        margin-bottom 0.18rem
        background-color #fff
        &.name
          margin -0.18rem 0 0.44rem 0
          border-top 1px solid #f9f9f9
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
