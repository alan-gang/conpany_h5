<template lang="pug">

f7-page.lottery-list()
  f7-navbar(innerClass="lottery-list-title" back-link :no-hairline="true")
    f7-nav-title() 开奖中心
    f7-nav-right
      f7-link._icon._lottery_classify( icon-f7=" home " icon-size="1.9324vw")

  f7-card.item.wp_100.ml_0
    .list-left
      f7-link._icon(class="_icon link icon-only _gid1" icon-f7=" home " icon-size="60px")
      div
        .title-container.mb_6
          span.title 重庆时时彩
          f7-icon.mt_5.ml_5.f_r.text-color-orange(f7="play_fill" size="2.3349vw")
        .number 第190630050期
        .number-list
          .bg-color-orange.ml_3.t_c 1
          .bg-color-orange.ml_3.t_c 2
          .bg-color-orange.ml_3.t_c 3
    div 投注


    //- width: 16.6667vw;






</template>

<script>
export default {
  components: {
  },
  name: 'play',
  props: {
  },
  provide: function () {
    return {
    }
  }
}
</script>

<style lang="stylus">
  @import '~@/css/common.stylus'
  .lottery-list
    .lottery-list-title
      color #fff
      background-image: linear-gradient(90deg,#ff8331 0%,#ff5429 100%),linear-gradient(#ffffff,#ffffff);
      .icon-back
        color #fff
    .item
      padding 3.1401vw 3.8647vw 3.3011vw   3.8647vw
      box-sizing border-box
      flex()
      .list-left
        flex(start)
      .title-container
        flex(start)
        .title
          height: 3.2206vw;
          font-weight bold
          font-size: 3.3816vw;
          color: #222222;
      .number
        font-size 2.8986vw
        color #999
      .number-list
        flex(start)
        .bg-color-orange
          width: 5.475vw;
          height: 5.475vw;
          line-height: 5.475vw;
          border-radius 50%
          font-size 2.496vw
          color #333

</style>
