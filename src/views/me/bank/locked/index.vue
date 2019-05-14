<template>
  <f7-page class="locked">
    <f7-navbar title="锁定银行卡" back-link></f7-navbar>
    <div class="top">
      <a href="javascript:;" class="logo _icon _bankicon_6 link color-black">
        <i class="icon f7-icons"> home </i>
      </a>
    </div>
    <div class="list">
      <ul>
        <li class="swipeout">
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
        </li>
        <li class="swipeout">
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
        </li>
        <li class="swipeout">
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
        </li>
      </ul>
      <a href="javascript:;" class="logo _icon _bankicon_7 link color-black">
        <i class="icon f7-icons"> home </i>
      </a>
    </div>
  </f7-page>
</template>

<script>
  import config from '@/config'
  export default {
    mixins: [config],
    components: {
    },
    name: 'locked',
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
  .locked
    .logo
      position absolute
      top 50%
      left 50%
      transform scale(10)
    .top
      height 3.5rem
      background linear-gradient(to right, #ff8131, #ff5429);
      ._bankicon_6
        margin -5.8rem 0 0 -0.3rem
    .list
      position relative
      margin-top -1.1rem
      ul
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
          width 1.5rem
          top 0.22rem
          height 1.82rem
      ._bankicon_7
        margin -0.25rem 0 0 -0.4rem
</style>
