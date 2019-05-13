<template>
  <f7-page class="bank">
    <f7-navbar title="银行卡" back-link></f7-navbar>
    <ul>
      <li class="swipeout" @swipeout:deleted="unbind">
        <div class="swipeout-content section branch">
          <div>
            <a href="javascript:;" class="_icon _bankicon_1 link color-black">
              <i class="icon f7-icons"> home </i>
            </a>
            <span class="type">建设银行储蓄卡</span>
            <em>● ● ● ● 4113</em>
          </div>
          <span class="date">2016/10/15</span>
        </div>
        <div class="swipeout-actions-right">
          <a href="#" data-confirm="银行卡解绑后，不能再绑定到其它帐号上！" data-confirm-title="温馨提示" class="swipeout-delete">Delete</a>
        </div>
      </li>
      <li class="swipeout" @swipeout:deleted="unbind">
        <div class="swipeout-content section branch">
          <div>
            <a href="javascript:;" class="_icon _bankicon_2 link color-black">
              <i class="icon f7-icons"> home </i>
            </a>
            <span class="type">农业银行储蓄卡</span>
            <em>● ● ● ● 4113</em>
          </div>
          <span class="date">2016/10/15</span>
        </div>
        <div class="swipeout-actions-right">
          <a href="#" data-confirm="银行卡解绑后，不能再绑定到其它帐号上！" data-confirm-title="温馨提示" class="swipeout-delete">Delete</a>
        </div>
      </li>
      <li class="swipeout" @swipeout:deleted="lock">
        <div class="swipeout-content section branch">
          <div>
            <a href="javascript:;" class="_icon _bankicon_3 link color-black">
              <i class="icon f7-icons"> home </i>
            </a>
            <span class="type">招商银行储蓄卡</span>
            <em>● ● ● ● 4113</em>
          </div>
          <span class="date">2016/10/15</span>
        </div>
        <div class="swipeout-actions-right">
          <a href="#" data-confirm="银行卡解绑后，不能再绑定到其它帐号上！" data-confirm-title="温馨提示" class="swipeout-delete">Delete</a>
        </div>
      </li>
      <li>
        <div class="section add">
          <a href="javascript:;" class="_icon _plus link color-black">
            <i class="icon f7-icons"> home </i>
          </a><br />
          <span>添加银行卡</span>
        </div>
      </li>
    </ul>
  </f7-page>
</template>

<script>
  import config from '@/config'
  export default {
    mixins: [config],
    components: {
    },
    name: 'bank',
    props: [],
    data () {
      return {}
    },
    created () {
    },
    methods: {
      unbind () {
        this.__go('/me/bank/unbind/')
      },
      lock () {
        this.__go('/me/bank/lock/')
      }
    }
  }
</script>

<style lang="stylus">
  @import '~src/css/var.stylus'
  // 建议不添加scoped， 所有样式最多嵌套2层
  .bank
    ul
      margin-left -0.8rem
      background transparent
      &:before, &:after
        background transparent
      .section
        height 1.42rem
        padding-top 0.4rem
        margin 0.2rem auto 0
        color #ff5429
        background-color #fff
        border-radius 0.06rem
        &.add
          width 7.07rem
          text-align center
          span
            font-size 0.27rem
        &.branch
          position relative
          width 6.47rem
          padding-left 0.6rem
          .type
            position relative
            top -0.06rem
            font-size 0.29rem
            color #333
          em
            position absolute
            right 0.4rem
            font-size 0.36rem
            font-style normal
          .date
            position absolute
            right 0.4rem
            font-size 0.22rem
            color #999
      .swipeout-actions-left, .swipeout-actions-right
        width 1.1rem
        top 1.32rem
        height 1.82rem
</style>
