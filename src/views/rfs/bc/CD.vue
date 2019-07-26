<template lang="pug">
f7-page.chase_detail
  f7-navbar(title="追号详情" back-link)
  .pd_10


    .r_5.bg-color-white.pd_10.mb_10
      .hlh_30
        span.c_9 追号编号：
        span.c_0 {{ v.taskId }}
        f7-button.inlb.f_r(small round fill :color=" config.stateColor[v.status] ") {{ config.chaseState[v.status] }}
      
      .hlh_30
        span.c_9 追号时间：
        span.c_0 {{ v.begintime }}

      .hlh_30
        span.c_9 中奖停追：
        span.text-color-deeporange {{ v.stoponwin ? '是' : '否' }}


    .r_5.bg-color-white.pd_10.mb_10
      .hlh_30
        span.c_9 追号玩法：
        span.c_0 {{ v.methodName }}
      
      .hlh_30.flex.justify-content-flex-start
        span.c_9.inlb 投注内容：
        f7-button.pd_0.c_0.minw_0(popover-open=".codes") {{ v.codes }}


      .hlh_30
        span.c_9 是否单挑：
        span.text-color-deeporange {{ v.islimitbonus ? '是' : '否' }}

      .hlh_30
        span.c_9 单期金额：
        span.c_0 {{ v.singleprice }}元

      .hlh_30
        span.c_9 追号期数：
        span.c_0 {{ v.issuecount }}

      .hlh_30
        span.c_9 追号总额：
        span.c_0 {{ v.taskprice }}元
      
      .hlh_30
        span.c_9 起始期号：
        span.c_0 {{ v.beginissue }}

      .hlh_30
        span.c_9 完成期数：
        span.c_0 {{ v.finishedcount }}期


      .hlh_30
        span.c_9 取消期数：
        span.c_0 {{ v.cancelcount }}期

      .hlh_30
        span.c_9 中奖期数：
        span.c_0 {{ v.wincount }}期


    f7-button(fill large popover-open=".cdl") 查看各期追号情况

    f7-button.mt_10(outline large @click=" cancelChase(id, v) " v-if=" !v.status && user.userId === v.userId ") 取消追号


  f7-popover.codes.r_5 
    .pd_10.w_b.mvh_60 {{ v.codes }}

  f7-popup.cdl.r_5.dialog-popup
    cdl(:data=" v.taskDetailsList ")


  
</template>

<script>
import config from '@/config'
import api from '@/api'
import cdl from './cdl'

export default {
  mixins: [config],
  components: {
    cdl,
  },
  name: 'chase_detail',
  props: ['id'],
  data () {
    return {
      v: {},
    }
  },
  computed: {
  },
  created () {
    this.getDetail()
  },
  mounted () {
  },
  methods: {
    getDetail () {
      this.$.get(api.followDetail, {projectId: this.id}).then(({data}) => {
        this.v = data
      })
    },
    cancelChase (id, v) {
      this.$.get(api.followCancel, {id}).then(() => {
        v.status = 1
        this.getDetail()
      })
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
</style>
