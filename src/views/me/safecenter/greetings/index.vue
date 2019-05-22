<template>
  <f7-page class="greetings">
    <f7-navbar title="登陆问候语设置" back-link></f7-navbar>
    <a href="javascript:;" class="logo _icon _safeicon_9 link color-black">
      <i class="icon f7-icons"> home </i>
    </a>
    <form>
      <div class="section">
        <label for="greetings">登录问候语</label>
        <input type="text" v-model="greetings" placeholder="请输入登陆问候语" id="greetings" />
      </div>
      <a href="javascript:;" class="confirm" @click="confirm">确 认</a>
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
    name: 'greetings',
    props: [],
    data () {
      return {
        greetings: '',
      }
    },
    created () {
    },
    methods: {
      confirm () {
        this.$.get(api.setGreetMsg + '&greetMsg=' + this.greetings).then(() => {
          this.__go('/me/safecenter/')
        })
      }
    }
  }
</script>

<style lang="stylus">
  @import '~src/css/var.stylus'
  // 建议不添加scoped， 所有样式最多嵌套2层
  .greetings
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
        margin 1.38rem auto 0
        color #fff
        background linear-gradient(to right, #fe8f48, #ff5429)
        border-radius 0.05rem
        text-align center
</style>
