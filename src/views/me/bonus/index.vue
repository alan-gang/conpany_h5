<template lang="pug">
  f7-page.bonus(:page-content="false")
    f7-navbar(:innerClass=" 'navbar_of_' + $options.name " title="奖金详情" back-link)
    .head.flex
      .a.w_80
        a._icon._bonusicon.link.color-black
          i.icon.f7-icons home
      .b.t_l.pr_10
        div
          span 账户：{{ n }}
        div
          span 昵称：{{ nn || '--' }}
        div(v-if=" userPoint ")
          span 返点：{{ userPoint }}%
        div(v-if=" salary ")
          span 日工资：{{ salary }}
        div
          span 高频彩奖金限额：{{ limitbonus }}
        div
          span 低频彩奖金限额：{{ dplimitbonus }}

      .b.t_l.pl_10.pr_10
        div(v-for=" (x, i) in userBackWater ")
          span {{ x.groupName }}返水：{{ x.backWater || '--' }}



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
          f7-card(v-for=" (x, j) in lotteryPrizeInfo['SSC'] " :key="j")
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
          f7-card(v-for=" (x, j) in lotteryPrizeInfo['LHC'] " :key="j")
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
          f7-card(v-for=" (x, j) in lotteryPrizeInfo['KS'] " :key="j")
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
          f7-card(v-for=" (x, j) in lotteryPrizeInfo['11X5'] " :key="j")
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
          f7-card(v-for=" (x, j) in lotteryPrizeInfo['BJPK10'] " :key="j")
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
          f7-card(v-for=" (x, j) in lotteryPrizeInfo['BJKL8'] " :key="j")
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
          f7-card(v-for=" (x, j) in lotteryPrizeInfo['SSL'] " :key="j")
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
      ],
      limitbonus: '',
      dplimitbonus: '',
      userPoint: '',
      salary: '',
      userBackWater: [],
    }
  },
  created () {
    this.getLotteryPrinzeInfo()
  },
  methods: {
    getLotteryPrinzeInfo () {
      this.$.get(api.getLotteryPrinzeInfo).then(({data: {cnNames, lotteryPrizeInfo, nickName, userName, userPoint, limitbonus, dplimitbonus, userBackWater, userDaySalary: { salary }}}) => {
        cnNames.forEach(x => (x.id = '#bonus_' + x.enName))
        Object.values(lotteryPrizeInfo).forEach(x => x.forEach(y => (y.state = y.isClose ? '已关闭' : '使用中')))
        this.lotteryPrizeInfo = lotteryPrizeInfo
        this.cnNames = cnNames
        this.nn = nickName
        this.n = userName
        this.limitbonus = limitbonus
        this.dplimitbonus = dplimitbonus
        this.userPoint = userPoint
        this.salary = salary
        this.userBackWater = userBackWater
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
        transform scale(4)
      span
        font-size 0.22rem
        color #fff
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
