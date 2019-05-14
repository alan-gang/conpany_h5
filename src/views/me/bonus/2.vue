<template>
  <div class="container">
    <div class="section">
      <ul>
        <li>
          <span>玩法：61888888</span>
          <span class="right">返点：6.1</span>
        </li>
        <li>
          <span>奖级：7.1</span>
          <span class="right">奖金：50000</span>
        </li>
        <li>
          <span>状态：使用中</span>
        </li>
      </ul>
    </div>
    <div class="section">
      <ul>
        <li>
          <span>玩法：61888888</span>
          <span class="right">返点：6.1</span>
        </li>
        <li>
          <span>奖级：7.1</span>
          <span class="right">奖金：50000</span>
        </li>
        <li>
          <span>状态：使用中</span>
        </li>
      </ul>
    </div>
    <div class="section">
      <ul>
        <li>
          <span>玩法：61888888</span>
          <span class="right">返点：6.1</span>
        </li>
        <li>
          <span>奖级：7.1</span>
          <span class="right">奖金：50000</span>
        </li>
        <li>
          <span>状态：使用中</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import config from '@/config'
export default {
  mixins: [config],
  components: {
  },
  name: 'bonus_2',
  props: [],
  computed: {
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
.container
  margin-top 1.08rem
  .section
    width 7.07rem
    margin 0.23rem auto 0
    padding 0.55rem 0
    background-color #fff
    border-radius 0.07rem
    ul
      width 6.31rem
      margin 0 auto
      padding 0 0.2rem
      li
        position relative
        height 0.55rem
        line-height 0.55rem
        padding 0 0.2rem
        .right
          position absolute
          left 3.5rem
        &:nth-child(odd)
          background-color #efefef
</style>
