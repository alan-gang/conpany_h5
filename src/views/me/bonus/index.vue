<template lang="pug">
  f7-page.bonus(:page-content="false")
    f7-navbar(title="奖金详情" back-link)
    .head
      a._icon._bonusicon.link.color-black
        i.icon.f7-icons home
      br
      strong {{ n }}
      br
      span 昵称：{{ nn }}

    f7-toolbar(tabbar scrollable v-if=" cnNames[0] ")
      f7-link(tab-link-active tab-link href="#bonus_SSC")
        f7-button 时时彩
      f7-link( tab-link href="#bonus_LHC")
        f7-button 六合彩
      f7-link( tab-link href="#bonus_KS")
        f7-button 快三
      f7-link( tab-link href="#bonus_11X5")
        f7-button 11选5
      f7-link( tab-link href="#bonus_BJPK10")
        f7-button 北京PK10
      f7-link( tab-link href="#bonus_BJKL8")
        f7-button 北京快乐8
      f7-link( tab-link href="#bonus_SSL")
        f7-button 3D/P3P5

      //- f7-link( tab-link :href=" v.id " v-for=" (v, i) in cnNames " :key="i") 
        f7-button(round fill color="gray") {{ v.cnName }}

    f7-tabs(animated swipeable)
      f7-tab#bonus_SSC(tab-active)
        f7-page
          f7-card(v-for=" (x, j) in lotteryPrizeInfo.SSL " :key="j")
            f7-card-content
              .stripe_gray_white_30.pl_15.pr_15
                template(v-for=" (y, k) in dns ")
                  .hlh_30.wp_50.inlb.pl(:key="k" v-if=" y.key !== 'level' ")
                    span {{ y.n }}： 
                    span.text-color-black
                      span(v-state=" x.state ") {{ x[y.key] }}

                  template(v-if=" y.key === 'level' " v-for=" (z, l) in x.level.split(',') ")

                    .hlh_30.wp_50.inlb.pl
                      span(:class=" x.level.split(',').length > 1 && l > 0 ? 'h_o' : '' ") 奖级： 
                      span.text-color-black {{ z }}
                    
                    .hlh_30.wp_50.inlb.pl
                      span(:class=" x.level.split(',').length > 1 && l > 0 ? 'h_o' : '' ") 奖金： 
                      span.text-color-black {{ x.prize.split(',')[l] }}

      f7-tab#bonus_LHC
        f7-page
          f7-card(v-for=" (x, j) in lotteryPrizeInfo.SSL " :key="j")
            f7-card-content
              .stripe_gray_white_30.pl_15.pr_15
                template(v-for=" (y, k) in dns ")
                  .hlh_30.wp_50.inlb.pl(:key="k" v-if=" y.key !== 'level' ")
                    span {{ y.n }}： 
                    span.text-color-black
                      span(v-state=" x.state ") {{ x[y.key] }}

                  template(v-if=" y.key === 'level' " v-for=" (z, l) in x.level.split(',') ")

                    .hlh_30.wp_50.inlb.pl
                      span(:class=" x.level.split(',').length > 1 && l > 0 ? 'h_o' : '' ") 奖级： 
                      span.text-color-black {{ z }}
                    
                    .hlh_30.wp_50.inlb.pl
                      span(:class=" x.level.split(',').length > 1 && l > 0 ? 'h_o' : '' ") 奖金： 
                      span.text-color-black {{ x.prize.split(',')[l] }}

      f7-tab#bonus_KS
        f7-page
          f7-card(v-for=" (x, j) in lotteryPrizeInfo.SSL " :key="j")
            f7-card-content
              .stripe_gray_white_30.pl_15.pr_15
                template(v-for=" (y, k) in dns ")
                  .hlh_30.wp_50.inlb.pl(:key="k" v-if=" y.key !== 'level' ")
                    span {{ y.n }}： 
                    span.text-color-black
                      span(v-state=" x.state ") {{ x[y.key] }}

                  template(v-if=" y.key === 'level' " v-for=" (z, l) in x.level.split(',') ")

                    .hlh_30.wp_50.inlb.pl
                      span(:class=" x.level.split(',').length > 1 && l > 0 ? 'h_o' : '' ") 奖级： 
                      span.text-color-black {{ z }}
                    
                    .hlh_30.wp_50.inlb.pl
                      span(:class=" x.level.split(',').length > 1 && l > 0 ? 'h_o' : '' ") 奖金： 
                      span.text-color-black {{ x.prize.split(',')[l] }}

      f7-tab#bonus_11X5
        f7-page
          f7-card(v-for=" (x, j) in lotteryPrizeInfo.SSL " :key="j")
            f7-card-content
              .stripe_gray_white_30.pl_15.pr_15
                template(v-for=" (y, k) in dns ")
                  .hlh_30.wp_50.inlb.pl(:key="k" v-if=" y.key !== 'level' ")
                    span {{ y.n }}： 
                    span.text-color-black
                      span(v-state=" x.state ") {{ x[y.key] }}

                  template(v-if=" y.key === 'level' " v-for=" (z, l) in x.level.split(',') ")

                    .hlh_30.wp_50.inlb.pl
                      span(:class=" x.level.split(',').length > 1 && l > 0 ? 'h_o' : '' ") 奖级： 
                      span.text-color-black {{ z }}
                    
                    .hlh_30.wp_50.inlb.pl
                      span(:class=" x.level.split(',').length > 1 && l > 0 ? 'h_o' : '' ") 奖金： 
                      span.text-color-black {{ x.prize.split(',')[l] }}

      f7-tab#bonus_BJPK10
        f7-page
          f7-card(v-for=" (x, j) in lotteryPrizeInfo.SSL " :key="j")
            f7-card-content
              .stripe_gray_white_30.pl_15.pr_15
                template(v-for=" (y, k) in dns ")
                  .hlh_30.wp_50.inlb.pl(:key="k" v-if=" y.key !== 'level' ")
                    span {{ y.n }}： 
                    span.text-color-black
                      span(v-state=" x.state ") {{ x[y.key] }}

                  template(v-if=" y.key === 'level' " v-for=" (z, l) in x.level.split(',') ")

                    .hlh_30.wp_50.inlb.pl
                      span(:class=" x.level.split(',').length > 1 && l > 0 ? 'h_o' : '' ") 奖级： 
                      span.text-color-black {{ z }}
                    
                    .hlh_30.wp_50.inlb.pl
                      span(:class=" x.level.split(',').length > 1 && l > 0 ? 'h_o' : '' ") 奖金： 
                      span.text-color-black {{ x.prize.split(',')[l] }}

      f7-tab#bonus_BJKL8
        f7-page
          f7-card(v-for=" (x, j) in lotteryPrizeInfo.SSL " :key="j")
            f7-card-content
              .stripe_gray_white_30.pl_15.pr_15
                template(v-for=" (y, k) in dns ")
                  .hlh_30.wp_50.inlb.pl(:key="k" v-if=" y.key !== 'level' ")
                    span {{ y.n }}： 
                    span.text-color-black
                      span(v-state=" x.state ") {{ x[y.key] }}

                  template(v-if=" y.key === 'level' " v-for=" (z, l) in x.level.split(',') ")

                    .hlh_30.wp_50.inlb.pl
                      span(:class=" x.level.split(',').length > 1 && l > 0 ? 'h_o' : '' ") 奖级： 
                      span.text-color-black {{ z }}
                    
                    .hlh_30.wp_50.inlb.pl
                      span(:class=" x.level.split(',').length > 1 && l > 0 ? 'h_o' : '' ") 奖金： 
                      span.text-color-black {{ x.prize.split(',')[l] }}

      f7-tab#bonus_SSL
        f7-page
          f7-card(v-for=" (x, j) in lotteryPrizeInfo.SSL " :key="j")
            f7-card-content
              .stripe_gray_white_30.pl_15.pr_15
                template(v-for=" (y, k) in dns ")
                  .hlh_30.wp_50.inlb.pl(:key="k" v-if=" y.key !== 'level' ")
                    span {{ y.n }}： 
                    span.text-color-black
                      span(v-state=" x.state ") {{ x[y.key] }}

                  template(v-if=" y.key === 'level' " v-for=" (z, l) in x.level.split(',') ")

                    .hlh_30.wp_50.inlb.pl
                      span(:class=" x.level.split(',').length > 1 && l > 0 ? 'h_o' : '' ") 奖级： 
                      span.text-color-black {{ z }}
                    
                    .hlh_30.wp_50.inlb.pl
                      span(:class=" x.level.split(',').length > 1 && l > 0 ? 'h_o' : '' ") 奖金： 
                      span.text-color-black {{ x.prize.split(',')[l] }}

      
      

</template>

<script>
import config from '@/config'
import api from '@/api'
export default {
  mixins: [config],
  components: {
  },
  name: 'bonus',
  props: [],
  data () {
    return {
      /* eslint-disable */
      cnNames: [{'enName':'SSC','cnName':'时时彩','id':'#bonus_SSC'},{'enName':'LHC','cnName':'六合彩','id':'#bonus_LHC'},{'enName':'KS','cnName':'快三','id':'#bonus_KS'},{'enName':'11X5','cnName':'11选5','id':'#bonus_11X5'},{'enName':'BJPK10','cnName':'北京PK10','id':'#bonus_BJPK10'},{'enName':'BJKL8','cnName':'北京快乐8','id':'#bonus_BJKL8'},{'enName':'SSL','cnName':'3D/P3P5','id':'#bonus_SSL'}],
      /* eslint-enable */
      n: '',
      nn: '',
      lotteryPrizeInfo: {},
      dns: [
        {n: '玩法', key: 'methodName'},
        {n: '返点', key: 'userPoint'},
        {n: '奖级', key: 'level'},
        // {n: '奖金', key: 'prize'},
        {n: '状态', key: 'state', state: true},
      ]
    }
  },
  created () {
    this.getLotteryPrinzeInfo()
  },
  methods: {
    getLotteryPrinzeInfo () {
      this.$.get(api.getLotteryPrinzeInfo).then(({data: {cnNames, lotteryPrizeInfo, nickName, userName}}) => {
        cnNames.forEach(x => (x.id = '#bonus_' + x.enName))
        Object.values(lotteryPrizeInfo).forEach(x => x.forEach(y => (y.state = y.isClose ? '已关闭' : '使用中')))
        this.lotteryPrizeInfo = lotteryPrizeInfo
        this.cnNames = cnNames
        this.nn = nickName
        this.n = userName
      })
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
  .bonus
    .head
      margin-top 0.8rem
      height 2.8rem
      background linear-gradient(to right, #ff8131, #ff5429)
      text-align center
      ._bonusicon
        margin-top 0.7rem
        transform scale(4)
      strong
        display inline-block
        font-size 0.27rem
        color #fff
        margin-top 0.55rem
      span
        font-size 0.22rem
        color #ffb296
    .toolbar
      // margin-top 2.7rem
      .tab-link
        .button
          font-size 0.27rem
          color #333
        &.tab-link-active
          .button
            color #ff5429
            border-bottom 0.05rem solid #ff5429
            border-radius 0
            padding-bottom 0.2rem
    .tabs .page-content
      // padding-top 0
      padding-bottom 3.6rem
      
</style>
