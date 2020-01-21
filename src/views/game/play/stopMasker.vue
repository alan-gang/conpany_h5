<template lang="pug">
  .masker-container.p_fix.wp_100.hp_100.p_l_0.bgc_o5.z_9999
    .masker-content
      .masker-title
      .masker-renew-time   恢复时间:2020年2月1日(正月初八) 00:00:00
      .masker-recomment-game
        .recomment-left
        .recomment-main
          span 信
          span 游
          span 推
          span 荐
          span 游
          span 戏
        .recomment-right
      .recomment-list-wrapper
        .recomment-list(v-for="item in lotteryList" :key="item.id" @click="change(item)") {{item.n}}

</template>

<script>
export default {
  data () {
    return {
      lotteryList: [
        { id: 17, gn: '时时彩', t_: 'ssc', mid: '79', n: '欢乐分分彩', hot: true, dmid_: '16:1', kq: true },
        { id: 29, gn: '时时彩', t_: 'ssc', mid: '96', n: '腾讯分分彩', hot: true, dmid_: '16:1', kq: true }, { id: 201, gn: '时时彩', t_: 'ssc', mid: '141', n: '奥地利50秒彩', dmid_: '16:1', kq: false },
        { id: 202, gn: '时时彩', t_: 'ssc', mid: '142', n: '奥地利100秒彩', dmid_: '16:1', kq: false },
        { id: 150, gn: '时时彩', t_: 'ssc', mid: '75', n: '微博5分彩', hot: true, dmid_: '16:1', kq: true },
        { id: 11, gn: '11选5', t_: '115', mid: '14', n: '夺金120秒', dmid_: '2001:1' },
        { id: 151, gn: 'PK10', t_: 'pk10', mid: '74', n: '腾讯赛车', dmid_: '4001:1' },
        { id: 33, gn: '快三', t_: 'k3', mid: '19', n: '幸福快三', dmid_: '5009:1' }
      ]
    }
  },
  methods: {
    change (props) {
      this.$f7router.navigate('/game/play/', {
        reloadCurrent: true,
        props
      })
    }
  }
}
</script>

<style scoped lang="stylus">
@import '~src/css/var.stylus'
@import '~src/css/common.stylus'
.masker-container {
  .masker-content {
    bg('~src/assets/stopmasker/masker_bg@2x.png', 100% 100%);
    width: 92.4316vw;
    height: 111.7552vw;
    position: absolute;
    left: 50%;
    top: 28.5829vw;
    transform: translateX(-50%);
    .masker-title {
      bg('~src/assets/stopmasker/title@2x.png', 100% 100%);
      width: 41.9485vw;
      height: 30.1932vw;
      margin: 6.6023vw auto 4.5894vw;
    }
    .masker-renew-time {
      width: 81.1594vw;
      height: 7.4879vw;
      line-height: 7.4879vw;
      text-align: center;
      background-color: #f2d383;
      border-radius: 3.7842vw;
      font-size: 3.3816vw;
      font-weight: bold;
      color: #df463d;
      margin: 0 auto 5.8776vw;
    }
    .masker-recomment-game {
      flex()
      width: 77.7134vw;
      margin: 0 auto;
      .recomment-right {
        width: 7.4879vw;
        height: 1.6908vw;
        bg('~src/assets/stopmasker/right@2x.png', 100% 100%);
      }
      .recomment-main {
        flex(start)
        span {
          width: 8.2931vw;
          height: 8.2126vw;
          line-height: 8.2126vw;
          bg('~src/assets/stopmasker/text_bg@2x.png', 100% 100%);
          font-size: 3.6232vw;
          font-weight: bold;
          color: #df463d;
          text-align: center;
          margin: 0 0.4026vw;
        }
      }
      .recomment-left {
        width: 7.4879vw;
        height: 1.6908vw;
        bg('~src/assets/stopmasker/left@2x.png', 100% 100%);
      }
    }
    .recomment-list-wrapper {
      flex(,,wrap);
      width: 79.1465vw;
      margin: 5.2335vw auto 0;
      .recomment-list {
        width: 23.6715vw;
        height: 7.3269vw;
        line-height: 7.3269vw;
        border-radius: 0.8052vw;
        border: solid 0.161vw #f5dc84;
        font-family: PingFang-SC-Medium;
        font-size: 2.8986vw;
        color: #ffecba;
        text-align: center;
        margin-bottom: 2.5765vw;
        &:last-child {
          transform: translateX(-27.6973vw);
        }
      }
    }
  }
}
</style>
