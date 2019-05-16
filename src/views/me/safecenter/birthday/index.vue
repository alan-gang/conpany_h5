<template>
  <f7-page class="birthday">
    <f7-navbar title="生日设置" back-link></f7-navbar>
    <a href="javascript:;" class="logo _icon _safeicon_13 link color-black">
      <i class="icon f7-icons"> home </i>
    </a>
    <form>
      <div class="section">
        <label for="birthday">生日</label>
        <input type="text" v-model.lazy="birthday" readonly="readonly" placeholder="请输入生日" id="birthday" :disabled="bool" @click="date" />
      </div>
      <a href="javascript:;" class="confirm" :class="{ gray: bool }" @click="confirm">确 认</a>
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
    name: 'birthday',
    props: [],
    data () {
      return {
        birthday: '',
        bool: false,
      }
    },
    created () {
      setTimeout(() => {
        this.acctSecureInfo()
      }, 700)
    },
    methods: {
      acctSecureInfo () {
        this.$.get(api.acctSecureInfo).then((res) => {
          const data = res.data
          if (data.birthday === '') {
            this.bool = false
          } else {
            this.birthday = data.birthday
            this.bool = true
          }
        })
      },
      date () {
        this.$f7.calendar.create({
          inputEl: '#birthday',
        })
      },
      confirm () {
        if (this.bool === false) {
          this.$.get(api.setBirthday + '&date=' + this.birthday).then(() => {
            this.__go('/me/safecenter/')
          })
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import '~src/css/var.stylus'
  // 建议不添加scoped， 所有样式最多嵌套2层
  .birthday
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
          width 5.5rem
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
        &.gray
          background #999
</style>
