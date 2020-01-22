查看分红契约邀请详情
<template lang="pug">
  f7-page.deed_listinfo
    f7-navbar(:innerClass=" 'navbar_of_' + $options.name " title="分红详情" back-link)
    f7-card(v-for="v in list")
      f7-card-header
        .a.ft_14.tit.pl_5(:class="'ctype'+v.ctype")
          span.pl_10.text-color-deeporange(v-if="v.ctype==0") 彩票分红
          span.pl_10.text-color-deeporange(v-if="v.ctype==1") 三方游戏分红
        .b
          //- span.ft_14.text-color-deeporange(v-if="v.stat==0") 待确认
          span.ft_14.text-color-deeporange(v-if="v.stat==1") 已签订
          span.ft_14.text-color-deeporange(v-if="v.stat==2") 作废
          span.ft_14.text-color-deeporange(v-if="v.stat==3") 拒绝
          f7-button.inlb.mr_5(color="teal" outline small @click="checkContract(v.id, 0)" v-if="v.stat==0") 拒绝签约
          f7-button.inlb(color="deeporange" outline small @click="checkContract(v.id, 1)" v-if="v.stat==0") 同意签约
      
      f7-card-header.ft_14(v-for="(r,r_inx) in v.rule.slice(0,1)")
        .a.wp_25.inlb.v_t.t_c
          .round {{r_inx+1}}

        .a.wp_25.inlb.v_t.t_c
          .n.c_9.pb_5 亏损
          .v {{r.sales}}万

        .a.wp_25.inlb.v_t.t_c
          .n.c_9.pb_5 有效人数
          .v {{r.actuser}}人

        .a.wp_25.inlb.v_t.t_r
          .n.c_9.pb_5 分红比例
          .v {{r.bounsrate}}%

      f7-card-content.pt_0.pb_0(v-for="(r,r_inx) in v.rule" v-if=" r_inx !=0 && v.o ")
        .a.wp_25.inlb.v_t.t_c.mt_10.mb_10
          .round {{r_inx+1}}

        .a.wp_25.inlb.v_t.t_c.mt_10.mb_10
          .n.c_9.pb_5 亏损
          .v {{r.sales}}万

        .a.wp_25.inlb.v_t.t_c.mt_10.mb_10
          .n.c_9.pb_5 有效人数
          .v {{r.actuser}}人

        .a.wp_25.inlb.v_t.t_r.mt_10.mb_10
          .n.c_9.pb_5 分红比例
          .v {{r.bounsrate}}%

      f7-card-footer.c_3.pd_0(v-if="v.rule.length > 1")
        f7-button.wp_100.bg-color-white(@click=" v.o = !v.o " color="gray") 
          span {{ v.o ? '收起' : '展开' }}
          f7-icon(:class=" { 'rz_-90': !v.o, 'rz_90': v.o } " f7="chevron_left_round_fill" size="14")
</template>

<script>
import config from '@/config'
import api from '@/api'
export default {
  mixins: [config],
  components: {
  },
  props: [],
  data () {
    return {
      list: []
    }
  },
  computed: {
  },
  methods: {
    // 接收/拒绝契约 状态
    checkContract (id, s) {
      this.$.get(api.checkContract, {
        contractId: id,
        status: s,
      }).then(({data}) => {
        // console.log(data)
        this.get_qryContractStat()
      })
    },
    // 登录契约提醒
    get_qryContractStat () {
      // console.log('get_qryContractStat')
      this.$.get(api.qryContractStat).then(({data}) => {
        data.data.forEach(x => (x.o = false))
        this.list = data.data
      })
    }
  },
  mounted () {
    // console.log(1)
    this.get_qryContractStat()
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.deed_listinfo
  .tit
    position relative
    &:before
      content ''
      display block
      position absolute
      left 0
      top 0
      width 0.4em
      height 100%
  .ctype0
    &:before
      background-image linear-gradient(90deg, #ff8331 0%, #ff5429 100%), linear-gradient(#ffffff, #ffffff)
      background-blend-mode normal,normal
  .ctype1
    &:before
      background-image linear-gradient(90deg, #ffce3b 0%, #ffb81b 100%), linear-gradient(#ffffff, #ffffff)
      background-blend-mode normal, normal
  .round
    background #ff7b30
    width 2em
    height 2em
    line-height 2em
    border-radius 50%
    font-size 18px
    font-weight normal
    font-stretch normal
    letter-spacing 0px
    color #fff
    margin 0 auto
</style>
