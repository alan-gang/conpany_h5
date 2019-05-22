<template>
  <f7-page class="safeanswer">
    <f7-navbar title="安全问答设置" back-link></f7-navbar>
    <a href="javascript:;" class="logo _icon _safeicon_11 link color-black">
      <i class="icon f7-icons"> home </i>
    </a>
    <form>
      <div class="section section-1">
        <label>问题一</label>
        <select>
          <option class="option">请选择问题一</option>
          <option>小明的爸爸是谁？</option>
          <option>小明的爸爸的爸爸叫什么？</option>
          <option>小明是垃圾堆里捡来的么？</option>
          <option>为什么小明管隔壁老王叫叔叔？</option>
        </select>
      </div>
      <div class="section">
        <label for="answer-1">答案</label>
        <input type="text" placeholder="请输入问题答案" id="answer-1" />
      </div>
      <div class="section section-1">
        <label>问题二</label>
        <select>
          <option class="option">请选择问题二</option>
          <option>小明的爸爸的爸爸叫什么？</option>
          <option>小明是垃圾堆里捡来的么？</option>
          <option>为什么小明管隔壁老王叫叔叔？</option>
        </select>
      </div>
      <div class="section">
        <label for="answer-2">答案</label>
        <input type="text" placeholder="请输入问题答案" id="answer-2" />
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
  .safeanswer
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
        &.section-1
          margin-bottom 0
          border-bottom 1px solid #f8f8f8
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
