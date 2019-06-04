<template lang="pug">
  f7-page.bank
    f7-navbar(title="银行卡" back-link)
    div.list
      ul
        li.swipeout(v-for=" u in userBankCards " :id=" u.entry " @swipeout:deleted="unbind")
          div.swipeout-content.section.branch
            div
              a._icon.link.color-black(href="javascript:;" :class="'_bankicon_' + u.apiName")
                i.icon.f7-icons home
              span.type.c_3.ft_16 {{ u.bankName }}
              em.ft_20.hlh_24 {{ u.cardNo }}
            span.date.c_9.lh_40.ft_14 {{ u.addTime.split(' ')[0] }}
          div.swipeout-actions-right
            a.swipeout-delete(href="#" data-confirm="银行卡解绑后，不能再绑定到其它帐号上！" data-confirm-title="温馨提示") 删除
        //- <li class="swipeout" @swipeout:deleted="unbind">
        //-   <div class="swipeout-content section branch">
        //-     <div>
        //-       <a href="javascript:;" class="_icon _bankicon_2 link color-black">
        //-         <i class="icon f7-icons"> home </i>
        //-       </a>
        //-       <span class="type">农业银行储蓄卡</span>
        //-       <em>● ● ● ● 4113</em>
        //-     </div>
        //-     <span class="date">2016/10/15</span>
        //-   </div>
        //-   <div class="swipeout-actions-right">
        //-     <a href="#" data-confirm="银行卡解绑后，不能再绑定到其它帐号上！" data-confirm-title="温馨提示" class="swipeout-delete">删除</a>
        //-   </div>
        //- </li>
        //- <li class="swipeout" @swipeout:deleted="lock">
        //-   <div class="swipeout-content section branch">
        //-     <div>
        //-       <a href="javascript:;" class="_icon _bankicon_3 link color-black">
        //-         <i class="icon f7-icons"> home </i>
        //-       </a>
        //-       <span class="type">招商银行储蓄卡</span>
        //-       <em>● ● ● ● 4113</em>
        //-     </div>
        //-     <span class="date">2016/10/15</span>
        //-   </div>
        //-   <div class="swipeout-actions-right">
        //-     <a href="#" data-confirm="银行卡锁定后，不能新增或删除银行卡，客服亦无权限操作，请谨慎操作银行卡锁定后，不能新增或删除银行卡，客服亦无权限操作，请谨慎操作！" data-confirm-title="温馨提示" class="swipeout-delete">锁定</a>
        //-   </div>
        //- </li>
        li
          div.section.add(@click="add")
            a._icon._plus.link.color-black(href="javascript:;")
              i.icon.f7-icons home
            br
            span 添加银行卡
</template>

<script>
  import config from '@/config'
  import api from '@/api'
  export default {
    mixins: [config],
    components: {
    },
    name: 'bank',
    props: [],
    data () {
      return {
        userBankCards: [],
        bankCardNum: 0,
        lockCrad: 0
      }
    },
    created () {
      this.getUserBankCards()
    },
    methods: {
      getUserBankCards () {
        this.$.get(api.getUserBankCards).then(({data}) => {
          // console.log(data.userBankCards)
          this.userBankCards = data.userBankCards
          // console.log(this.userBankCards)
        })
      },
      add () {
        this.__go('/me/bank/add/')
      },
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
    .list
      margin-top 0
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
            em
              position absolute
              right 0.4rem
              font-style normal
            .date
              position absolute
              right 0.4rem
        .swipeout-actions-left, .swipeout-actions-right
          width 1.5rem
          top 0.22rem
          height 1.82rem
.bank .list .icon
  background-size auto 80%
</style>
