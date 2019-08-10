<template lang="pug">

f7-page.game_best
  f7-toolbar.toolbar.toolbar-top(style="transform: none")
    .toolbar-inner.justify-content-flex-end
      f7-icon._icon(:class=" { _vmode01: list, _vmode01_a: !list } " f7="home_fill" @click.native=" list = !list ")
      f7-icon._icon(:class=" { _vmode02_a: list, _vmode02: !list } " f7="data_fill" @click.native=" list = !list ")

  f7-row(no-gap)
    f7-col.pd_0(:width=" list ? 100 : 33 " v-for=" (v, i) in data " :key=" i + Math.random() ")
      f7-card.cli_a.mg_5(@click.native=" v.id ? __go('/game/play/', {props: Object.assign({}, v, ag.find(x => x.id === v.id || x.nid === v.nid))}) : __go('/outer/', {props: Object.assign({}, v, ag.find(x => x.nid === v.nid))}) ")
        f7-card-header(:class=" {'j_c': !list} ")
          f7-icon._icon(:class=" '_gid' + (v.id || v.nid) " f7=" home " size="60px")
          .pl_10.t_o.ft_14(v-if=" list ")
            .mg_2 {{ v.n }}
            .mg_2 {{ v.d }}

        .t_c.hlh_30.c_6(v-if=" !list ") {{v.n }}




</template>

<script>
import config from '@/config'
import ag from '@/gm/ag'
export default {
  mixins: [config],
  components: {
  },
  name: 'game_best',
  props: [],
  data () {
    return {
      ag: ag,
      list: true,
      data: [
        {id: 1, n: '重庆欢乐生肖', d: '“重庆欢乐生肖“ 是由中国福彩中心发行的数字彩票，每天早上7:30至凌晨3:10开奖，每20分钟1期。'},
        {id: 29, n: '腾讯分分彩', d: '“腾讯分分彩“ 玩法与 “重庆欢乐生肖“ 相同，以腾讯公司的实时在线用户人数作为开奖号码来源，全天24小时开奖，每分钟1期。'},
        {id: 150, n: '微博5分彩', d: '微博5分彩，开奖数据源于每5分钟微博热搜榜前20名关键词的搜索次数。玩法与“重庆欢乐生肖”相同，全天开奖，每5分钟一期。'},
        {id: 17, n: '欢乐分分彩', d: '“欢乐分分彩” 玩法与 “重庆欢乐生肖“ 相同，全天24小时开奖，每分钟1期，开奖更快，无需等待。'},
        {id: 13, n: '北京pk10', d: '“北京PK10” 是国家福利彩票管理中心统一发行的高频彩票，每期由10辆赛车的比赛结果作为开奖号码。每天早上9:30到晚上23:50开奖，每20分钟1期。'},
        {id: 39, n: '幸运飞艇', d: '幸运飞艇是马耳他共和国瓦莱塔福利联合委员会独家发行的一款高频彩，源于F1赛艇的彩票游戏，游戏由十架飞艇作为开奖号码，5分钟为一个开奖周期。'},
        {nid: '_zjh', n: '炸金花', d: '为确保游戏公平，每一局系统都会随机将2-5位玩家分配到同一桌。每位玩家依次发三张牌，随机一家先操作，之后按逆时针轮流操作。第一轮不可比牌，第二轮起可开始比牌。'},
        {nid: '_jqw', n: '金钱蛙', d: '继承经典街机老虎机玩法，并融合了更多新功能和游戏，更高的赔率选择和每日奖励，让玩家能够体验到更丰富的游戏内容。'},
        {nid: '_byw3d', n: '3D捕鱼', d: '打破捕鱼游戏旧模式，完美移植街机画面效果，真实还原深海景象，鱼类和珊瑚都采用了生物拟态效果，裸眼3D仿VR视觉，让玩家仿若置身于真实的海底世界。'},
        {nid: '_agbjl', n: '百家乐', d: '百家乐是世界上最受欢迎的游戏之一。AG百家乐首创先发六张牌，确保游戏公平。其竞咪百家乐、25秒极速百家乐及多台百家乐，更让玩家有一种置身实地赌场的真实快感。'},
        {nid: '_basketball', n: 'NBA', d: 'NBA，全称美国男子职业篮球联赛，也是世界最顶尖的职业篮球赛事。“沙巴体育” 全方位满足您投注NBA赛事的需求。'},
        {nid: '_lol', n: 'LOL/刀塔', d: '电子竞技是电子游戏比赛达到“竞技”层面的活动。国际上广为人知的电竞游戏包括英雄联盟、魔兽争霸、dota、DOTA2、CS等。“U赢电竞”  充分满足您对电竞赛事的投注需求。'},
      ]
    }
  },
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


</style>
