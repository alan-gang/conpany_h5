<template lang="pug">

f7-page.bgc_f7
  f7-navbar(:innerClass=" 'navbar_of_' + $options.name " :title="title" back-link)
  f7-toolbar.no-hairlines.no-hairline(tabbar top scrollable)
    f7-link(v-if="cpt_all[0]" tab-link tab-link-active href="#howtoplay_tabindex_1") 开奖信息
    f7-link(tab-link href="#howtoplay_tabindex_2" ) 玩法说明

  f7-tabs(animated swipeable)
    f7-tab#howtoplay_tabindex_1(tab-active @tab:show=" __tabShow " v-if="cpt_all[0]")
      f7-page
        f7-card(v-for=" (x, i) in cpt_all " :key="i")
          f7-card-header {{ x.n }}
          f7-card-content
            .pt_5.pb_5 
              span 开奖频率：
              span.text-color-deeporange {{ x.frequency }}

            .pt_5.pb_5(v-if="x.fst")
              span 第一期开奖时间：
              span.text-color-deeporange {{ x.fst }}

            .pt_5.pb_5(v-if="x.scd")
              span 第二期开奖时间：
              span.text-color-deeporange {{ x.scd }}

            .pt_5.pb_5(v-if="x.all")
              span 开奖时间：
              span.text-color-deeporange {{ x.all }}
  
      
    f7-tab#howtoplay_tabindex_2(@tab:show=" __tabShow ")
      methodsIntro(:id="id" :title="title")

</template>

<script>
import config from 'src/config'
import methodsIntro from '../detailpage'
export default {
  mixins: [config],
  components: {
    methodsIntro,
  },
  name: 'howtoplay_tabindex',
  props: ['id', 'title'],
  data () {
    return {
      all: [
        // 时时彩
        {n: '重庆欢乐生肖', gn: '时时彩', frequency: '每天59期，20分钟1期', fst: '0：30 - 3：10', scd: '7：30 - 23：49', all: ''},
        {n: '腾讯分分彩', gn: '时时彩', frequency: '每天1440期，1分钟1期', fst: '', scd: '', all: '0：00：57 - 23：59：57'},
        {n: '微博五分彩', gn: '时时彩', frequency: '每天288期，2分钟1期', fst: '', scd: '', all: '0：03：30 - 23：58：30'},
        {n: '天津时时彩', gn: '时时彩', frequency: '每天42期，20分钟1期', fst: '', scd: '', all: '9：17：00 - 22：57：00'},
        {n: '河内五分彩', gn: '时时彩', frequency: '每天288期，5分钟1期', fst: '', scd: '', all: '0：04：55 - 23：59：55'},
        {n: '奇趣腾讯五分彩', gn: '时时彩', frequency: '每天288期，5分钟1期', fst: '', scd: '', all: '0：04：57 - 23：59：57'},
        {n: '重庆怀旧时时彩', gn: '时时彩', frequency: '每天288期，5分钟1期', fst: '', scd: '', all: '0：04：55 - 23：59：59'},
        {n: '欢乐分分彩', gn: '时时彩', frequency: '每天1440期，1分钟1期', fst: '', scd: '', all: '0：00：57 - 23：59：57'},
        {n: '新疆时时彩', gn: '时时彩', frequency: '每天48期，20分钟1期', fst: '', scd: '', all: '10：17 - 1：57'},
        {n: '黑龙江时时彩', gn: '时时彩', frequency: '每天42期，20分钟1期', fst: '', scd: '', all: '8：58：00 - 22：38：00'},
        {n: '河内1分彩', gn: '时时彩', frequency: '每天1440期，1分钟1期', fst: '', scd: '', all: '0：00：57 - 23：59：57'},
        {n: '奇趣腾讯十分彩', gn: '时时彩', frequency: '每天144期，10分钟1期', fst: '', scd: '', all: '0：09：57 - 23：59：57'},
        {n: '重庆怀旧分分彩', gn: '时时彩', frequency: '每天1440期，1分钟1期', fst: '', scd: '', all: '0：00：57 - 23：59：57'},
        {n: '幸福三分彩', gn: '时时彩', frequency: '每天480期，3分钟1期', fst: '', scd: '', all: '0：02：57 - 23：59：57'},
        {n: '新疆怀旧时时彩', gn: '时时彩', frequency: '每天1440期，1分钟1期', fst: '', scd: '', all: '0：00：57 - 23：59：57'},
        {n: '阿里云分分彩', gn: '时时彩', frequency: '每天1440期，1分钟1期', fst: '', scd: '', all: '0：00：57 - 23：59：57'},
        {n: '奇趣腾讯分分彩', gn: '时时彩', frequency: '每天1440期，1分钟1期', fst: '', scd: '', all: '0：00：57 - 23：59：57'},
        // 11选五
        {n: '11运夺金', gn: '十一选五', frequency: '每天43期，20分钟1期', fst: '', scd: '', all: '08：59：30 - 22：59：30'},
        {n: '江苏11选5', gn: '十一选五', frequency: '每天41期，20分钟1期', fst: '', scd: '', all: '08:43:00 - 22:03:00'},
        {n: '福建11选5', gn: '十一选五', frequency: '每天45期，20分钟1期', fst: '', scd: '', all: '08:27:00  - 23:07:00'},
        {n: '多乐彩', gn: '十一选五', frequency: '每天42期，20分钟1期', fst: '', scd: '', all: '09:28：00 - 23:08：00'},
        {n: '安徽11选5', gn: '十一选五', frequency: '每天40期，20分钟1期', fst: '', scd: '', all: '08:58:00  - 21:58:00'},
        {n: '广东11选5', gn: '十一选五', frequency: '每天42期，20分钟1期', fst: '', scd: '', all: '09:29：00 - 23:09：00'},
        {n: '山西11选5', gn: '十一选五', frequency: '每天47期，20分钟1期', fst: '', scd: '', all: '08:44:00  - 0：04：00'},
        // PK10
        {n: '幸运飞艇', gn: 'PK10', frequency: '每天180期，5分钟1期', fst: '', scd: '', all: '13:08:30 - 04:03:30'},
        {n: '阿里云赛车', gn: 'PK10', frequency: '每天1440期，1分钟1期', fst: '', scd: '', all: '00:00:57-23:59:57'},
        {n: '北京PK10', gn: 'PK10', frequency: '每天44期，20分钟1期', fst: '', scd: '', all: '09:29-23:49'},
        {n: '幸运赛车', gn: 'PK10', frequency: '每天720期，分钟1期', fst: '', scd: '', all: '0:01:57 - 23:59:57'},
        {n: '腾讯赛车', gn: 'PK10', frequency: '每天1440期，1分钟1期', fst: '', scd: '', all: '0:00:57 - 23:59:57'},
        // 快三
        {n: '安徽快三', gn: '快三', frequency: '每天40期，20分钟1期', fst: '', scd: '', all: '08:57-21:57'},
        {n: '幸福快三', gn: '快三', frequency: '每天480期，3分钟1期', fst: '', scd: '', all: '0：02：57 - 23：59：57'},
        {n: '江苏快三', gn: '快三', frequency: '每天41期，20分钟1期', fst: '', scd: '', all: '08:47-22:07'},
        {n: '吉林快三', gn: '快三', frequency: '每天40期，20分钟1期', fst: '', scd: '', all: '8：35：00 - 21：35：00'},
        {n: '福建快三', gn: '快三', frequency: '每天40期，20分钟1期', fst: '', scd: '', all: '8：48：00 - 22：28：00'},
      ]
    }
  },
  computed: {
    cpt_all () {
      return this.all.filter(x => x.gn === this.title)
    }
  },
  created () {
    setTimeout(() => {
      if (!this.cpt_all[0]) this.__setCall({fn: '__showTab', args: '#howtoplay_tabindex_2'})
    }, 300)
  },
  methods: {
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
#howtoplay_tabindex_1
#howtoplay_tabindex_2
  .navbar
    display none
  .page-content
    padding-top 0
  
</style>
