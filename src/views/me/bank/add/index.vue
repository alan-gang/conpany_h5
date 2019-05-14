<template>
  <f7-page class="add">
    <f7-navbar title="添加银行卡" back-link></f7-navbar>
    <form>
      <div class="section">
        <label for="name">持卡人</label>
        <input type="text" placeholder="请输入持卡人姓名" id="name" />
      </div>
      <div class="section">
        <label for="bankNo">银行卡号</label>
        <input type="text" placeholder="请输入银行卡号" id="bankNo" maxlength="19" />
      </div>
      <div class="section">
        <label>银行名称</label>
        <select>
          <option class="option">请选择银行名称</option>
          <option>小明的爸爸是谁？</option>
          <option>小明的爸爸的爸爸叫什么？</option>
          <option>小明是垃圾堆里捡来的么？</option>
          <option>为什么小明管隔壁老王叫叔叔？</option>
        </select>
      </div>
      <div class="section">
        <label>开户省市</label>
        <select>
          <option class="option">请选择开户省市</option>
          <option>小明的爸爸的爸爸叫什么？</option>
          <option>小明是垃圾堆里捡来的么？</option>
          <option>为什么小明管隔壁老王叫叔叔？</option>
        </select>
      </div>
      <div class="section">
        <label for="branch">开户支行</label>
        <input type="text" placeholder="请输入开户支行" id="branch" />
      </div>
      <a href="javascript:;" class="confirm" @click="confirm">确 认</a>
    </form>
  </f7-page>
</template>

<script>
  import config from '@/config'
  export default {
    mixins: [config],
    components: {
    },
    name: 'add',
    props: [],
    data () {
      return {}
    },
    created () {
    },
    methods: {
      confirm () {
        this.__go('/me/bank/')
      }
    }
  }
</script>

<style lang="stylus">
  @import '~src/css/var.stylus'
  // 建议不添加scoped， 所有样式最多嵌套2层
  .add
    form
      margin-top 0.18rem
      font-size 0.27rem
      .section
        height 0.92rem
        line-height 0.92rem
        margin-bottom 0.18rem
        background-color #fff
        label
          display inline-block
          color #666
          width 1.15rem
          padding-left 0.2rem
        select
          width 6.35rem
          margin -0.65rem 0 0 1.15rem
          padding-left 0.25rem
          option
            &.option
              color #c5c5c5
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
