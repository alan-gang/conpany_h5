<template lang="pug">
  f7-page.lower-level-mgr(:page-content="false")
    f7-navbar(title="下级管理" back-link top)
    f7-row.breadcrumb-row.bgc_f.pl_25
      f7-col(width="85")
        span.ft_15 我的下级
      f7-col(width="15")
        .icon-search
    f7-row.bgc_f.pl_25.search-condi-bar
      f7-col
        | 注册时间
        span 不限
        span.inlb.icon-triangle
          Triangle
      f7-col
        | 排序方式
        span 注册时间
        span.inlb.icon-triangle
          Triangle
    filters(v-if=" showFilter " @sd=" showFilter = $event ")
      DP(v-if="filterType === 1" @st="$set(stet, 0, $event || '')" @et="$set(stet, 1, $event || '')"  @done="__setCall({fn: '__closeSD'})")
    .tip-bar-wp
      TipBar(:show="showTipBar" content="账户余额仅包含【主账户】与【特殊账户】的余额。" @close-cb="showTipBar = false")
    .ptr-content-wp
      .ptr-content-inner-wp
        .page-content.ptr-content.infinite-scroll-content(ptr-mousewheel="true" @ptr:refresh=" refresh " @infinite="loadMore" :infinite-distance="50" )
          .ptr-preloader
            .preloader
            .ptr-arrow
          .user-list-wp.ft_12
            f7-card(v-for=" (d, i) in lowerLevelData " :key="i")
              f7-card-header
               f7-row
                f7-col(width="50")
                  span.ft_14.text-color-gray {{ d.userName }}
                  span.ft_14.text-color-gray {{ d.writeTime }}
                f7-col(width="50")
                  f7-button(outline @click="operate") 操作
              f7-card-content
                f7-row
                  f7-col(width="45")
                    span 账户余额：
                    span {{d.teamBalance}}
                  f7-col(width="55")
                    span 最后登录：
                    span {{d.lastTime}}
                f7-row
                  f7-col(width="45")
                    span 注册方式：
                    span {{ d.isAuto ? '自动' : '手动' }}
                  f7-col(width="55")
                    span 最后登录：
                    span {{d.lastTime}}
                .ex-info

              f7-card-footer.card-footer
                span 展开详情

          .preloader.infinite-scroll-preloader(v-if="showPreloader")
          .t_c.text-color-gray.pd_15.nomore --没有更多了--

    f7-actions(:opened="shwoActionSheet" @actions:closed="shwoActionSheet = false")
      f7-actions-group
        f7-actions-button.c_0(v-for="(b, i) in actionButtons") {{b.name}}

      f7-actions-group
        f7-actions-button.c_0 取消
</template>

<script>
import api from '@/api'
import config from '@/config'
import page from '@/components/page'
import filters from '@/components/filters'
import DP from '@/components/filters/DP'
import stet from '@/components/stet'
import TipBar from 'comp/TipBar'
import Triangle from 'comp/icons/Triangle'
export default {
  name: 'lowerLevelMgr',
  mixins: [config, stet, page],
  components: {
    TipBar,
    Triangle,
    filters,
    DP
  },
  data () {
    return {
      showFilter: false,
      filterType: 1,
      showTipBar: true,
      userName: '',
      pageSize: 10,
      page: 1,
      lowerLevelData: [],
      shwoActionSheet: false,
      actionButtons: [
        {id: '', name: '给下级转账', show: true},
        {id: '', name: '设置返点 / 返水', show: true},
        {id: '', name: '设置日工资', show: true},
        {id: '', name: '发起分红契约 / 重新发起分红契约', show: true},
        {id: '', name: '发起佣金契约 / 重新发起佣金契约', show: true},
        {id: '', name: '复制下级设置', show: true}
      ]
    }
  },
  mounted () {
    this.list()
  },
  methods: {
    list (p = {}, cb = this.defaultListCb) {
      let params = {
        userName: this.userName,
        pageSize: this.pageSize,
        page: this.page
      }
      Object.assign(params, p)
      // 搜索下级
      this.$.get(api.getUserList, params).then(({data: {subUserInfo, totalSize}}) => {
        this.lowerLevelData = this.lowerLevelData.concat(subUserInfo || [])
        this.total = totalSize
        cb && cb(subUserInfo)
      })
    },
    operate () {
      this.shwoActionSheet = true
    }
  }
}
</script>

<style lang="stylus">
// @import '~src/css/var.stylus'
.lower-level-mgr
  display flex
  flex-direction column
  .breadcrumb-row
    line-height 40px
    border-bottom solid 1px #f1f1f1
    margin-top 40px
  .icon-search
    width 30px
    height 40px
    background url('../../../../assets/me/icon_screen@2x.png') no-repeat center
    background-size 15px
  .search-condi-bar
    line-height 40px
  .icon-triangle
    display inline-block
  .ptr-content-wp
    flex 1
    position relative
    overflow hidden
  .ptr-content-inner-wp
    position absolute
    width 100%
    height 110%
    left 0
    top -40px
  .infinite-scroll-content
    width 100%
    position absolute
    left 0
  .card-footer
    justify-content center
.lower-level-mgr
  // top var(--f7-toolbar-height)
  // height calc(100% - var(--f7-toolbar-height))
  .infinite-scroll-content
    padding-top var(--f7-toolbar-height)
  .infinite-scroll-preloader + .nomore
    display none

</style>
