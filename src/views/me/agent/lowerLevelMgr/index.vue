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
        span.inlb.icon-triangle-wp
          Triangle
      f7-col
        | 排序方式
        span 注册时间
        span.inlb.icon-triangle-wp
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
                f7-row.w-100p
                  f7-col(width="40")
                    span.ft_14.text-color-gray {{ d.userName }}
                    span.ft_14.text-color-gray {{ d.writeTime }}
                  f7-col.btns-wp.flex(width="60")
                    f7-button.w_80(outline v-if="d.teamCount > 1") 
                      | 查看下级
                      span
                    f7-button.w_65.btn-l-red.ml_10(outline @click="operate") 
                      span 操作
                      span.inlb
                        Triangle(direction="down")
              f7-card-content
                f7-row
                  f7-col(width="45")
                    span 账户余额：
                    span {{d.teamBalance}}
                  f7-col(width="55")
                    span 最后登录：
                    span {{d.lastTime}}
                f7-row.pb_10
                  f7-col(width="45")
                    span 注册方式：
                    span {{ d.isAuto ? '自动' : '手动' }}
                  f7-col(width="55")
                    span 注册时间：
                    span {{d.lastTime}}

                .ex-info(v-show="d.showDetail")
                  f7-row.b-t.pt_10
                    f7-col(width="45")
                      span 团队人数：
                      span {{d.teamCount}}
                    f7-col(width="55")
                      span 团队余额：
                      span {{d.teamBalance}}
                  f7-row.b-b.pb_10
                    f7-col(width="45")
                      span 给下级转账：
                      span {{canTopUp ? '已开通' : '未开通'}}
                  .rebates-wp.b-b.pt_10.pb_10
                    f7-row
                      f7-col(width="50" v-for="(rebate, i) in d.rebates")
                        span {{rebate.name}}：
                        span {{rebate.userPoint}}
                  f7-row.b-b.pt_10.pb_10(v-if="showSalary")
                    f7-col
                      span 日工资：团队销售&gt;={{d.teamSales}}, 有效人数&gt;={{d.actUser}}, 每1万{{d.daySalary}}。
                  f7-row.pt_10.pb_10(v-if="showcpfh")
                    f7-col
                      | 彩票分红： 每半月，{{['手动发放', '自动发放'][d.cp.sendtype]}}
                    f7-col.t_r(v-if="d.cp.myBounCpArr && d.cp.myBounCpArr.length >= 3") 
                      span(@click="showAllRulesHandler(d.userId, i, 'cp')") 显示全部规则
                  .cp-rules.pb_10(v-if="showcpfh")
                    template(v-if="!d.showAllCPRule && d.cp.myBounCpArr && d.cp.myBounCpArr.length >= 3")
                      f7-row
                        f7-col 规则{{1}}: 累计销量&gt;={{d.cp.myBounCpArr[0].sales / 10000}}万，有效人数&gt;={{d.cp.myBounCpArr[0].actuser}}，分红比例{{mth.mul(d.cp.myBounCpArr[0].bounsrate, 100)}}%
                      f7-row
                        f7-col ......  
                      f7-row
                        f7-col 规则{{d.cp.myBounCpArr.length}}: 累计销量&gt;={{d.cp.myBounCpArr[d.cp.myBounCpArr.length - 1].sales / 10000}}万，有效人数&gt;={{d.cp.myBounCpArr[d.cp.myBounCpArr.length - 1].actuser}}，分红比例{{mth.mul(d.cp.myBounCpArr[d.cp.myBounCpArr.length - 1].bounsrate, 100)}}%
                    template(v-else)
                      f7-row(v-for="(yjBouns, j) in d.cp.myBounCpArr")
                        f7-col 规则{{j + 1}}: 累计销量&gt;={{yjBouns.sales / 10000}}万，有效人数&gt;={{yjBouns.actuser}}，分红比例{{mth.mul(yjBouns.bounsrate, 100)}}%
                  f7-row.b-t.pt_10.pb_10(v-if="showsfyj")
                    f7-col
                      | 其它游戏分红： 每半月，{{['手动发放', '自动发放'][d.yj.sendtype]}}
                    f7-col.t_r(v-if="d.yj.myBounCpArr && d.yj.myBounCpArr.length >= 3") 
                      span(@click="showAllRulesHandler(d.userId, i, 'yj')") 显示全部规则
                  .yj-rules(v-if="showsfyj")
                    template(v-if="!d.showYJAllRule && d.yj.myBounYjArr && d.yj.myBounYjArr.length >= 3")
                      f7-row
                        f7-col 规则{{1}}: 累计销量&gt;={{d.yj.myBounYjArr[0].sales / 10000}}万，有效人数&gt;={{d.yj.myBounYjArr[0].actuser}}，分红比例{{mth.mul(d.yj.myBounYjArr[0].bounsrate, 100)}}%
                      f7-row
                        f7-col ......  
                      f7-row
                        f7-col 规则{{d.yj.myBounYjArr.length}}: 累计销量&gt;={{d.yj.myBounYjArr[d.yj.myBounYjArr.length - 1].sales / 10000}}万，有效人数&gt;={{d.yj.myBounYjArr[d.yj.myBounYjArr.length - 1].actuser}}，分红比例{{mth.mul(d.yj.myBounYjArr[d.yj.myBounYjArr.length - 1].bounsrate, 100)}}%
                    template(v-else)
                      f7-row(v-for="(yjBouns, j) in d.yj.myBounYjArr")
                        f7-col 规则{{j + 1}}: 累计销量&gt;={{yjBouns.sales / 10000}}万，有效人数&gt;={{yjBouns.actuser}}，分红比例{{mth.mul(yjBouns.bounsrate, 100)}}%
              f7-card-footer.card-footer
                span(@click="collapse(d.userId, i)") {{d.showDetail ? '收起' : '展开'}}详情

          .preloader.infinite-scroll-preloader(v-if="showPreloader")
          .t_c.text-color-gray.pd_15.nomore --没有更多了--

    f7-actions(:opened="shwoActionSheet" @actions:closed="shwoActionSheet = false")
      f7-actions-group
        f7-actions-button.c_0(v-for="(v, k, i) in actionButtons" v-show="v.show") {{v.name}}

      f7-actions-group
        f7-actions-button.c_0 取消
</template>

<script>
import mth from '@/util/mth'
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
      id: '',
      showFilter: false,
      filterType: 1,
      showTipBar: true,
      userName: '',
      pageSize: 10,
      page: 1,
      lowerLevelData: [],
      userPoint: 0,
      shwoActionSheet: false,
      actionButtons: {
        id0: {name: '给下级转账', show: true},
        id1: {name: '设置返点 / 返水', show: false},
        id2: {name: '设置日工资', show: false},
        id3: {name: '发起分红契约 / 重新发起分红契约', show: false},
        id4: {name: '发起佣金契约 / 重新发起佣金契约', show: false},
        id5: {name: '复制下级设置', show: true}
      },
      isAddAccount: 0,
      canTopUp: false,
      safeCheckCode: '',
      topUpMax: '',
      topUpMin: '',
      moneyTypes: ['可用余额', '特殊金额'],

      userRebateData: [],
      mth
    }
  },
  computed: {
    showSalary () {
      return this.user.displayPermission.showSalary === 1
    },
    showback () {
      return this.user.displayPermission.showback === 1
    },
    showpoint () {
      return this.user.displayPermission.showpoint === 1
    },
    showcpfh () {
      return this.user.displayPermission.showCpfh === 1
    },
    showsfyj () {
      return this.user.displayPermission.showSfyj === 1
    }
  },
  mounted () {
    this.actionButtons['id1'].show = this.showback || this.showpoint
    this.actionButtons['id2'].show = this.showSalary
    this.actionButtons['id3'].show = this.showcpfh
    this.actionButtons['id4'].show = this.showsfyj
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
      this.$.get(api.getUserList, params).then(({data: {subUserInfo, totalSize, currUserId, isAddAccount, uploadLevel, userPoint}}) => {
        // 当前登录用户的固定信息
        this.id = currUserId
        // 开户
        this.isAddAccount = isAddAccount
        // 代充
        this.canTopUp = uploadLevel !== '0'
        // 代充范围
        if (this.canTopUp) {
          this.topUpMax = parseInt(uploadLevel.split('-')[1])
          this.topUpMin = parseInt(uploadLevel.split('-')[0])
        }
        this.actionButtons['id0'].show = this.canTopUp
        this.userPoint = userPoint
        subUserInfo = subUserInfo.map(s => {
          s.rebates = [{show: userPoint > 0, userPoint: userPoint + '%', name: '彩票返点'}]
          s.cp = {}
          s.showAllCPRule = false
          s.yj = {}
          s.showYJAllRule = false
          return s
        })
        this.lowerLevelData = this.lowerLevelData.concat(subUserInfo || [])
        this.total = totalSize
        cb && cb(subUserInfo)
      })
    },
    operate () {
      this.shwoActionSheet = true
    },
    showAllRulesHandler (userId, i, type) {
      let userInfo = this.lowerLevelData[i]
      if (type === 'cp') userInfo.showAllCPRule = !userInfo.showAllCPRule
      if (type === 'yj') userInfo.showYJAllRule = !userInfo.showYJAllRule
      this.$set(this.lowerLevelData, i, userInfo)
    },
    collapse (userId, i) {
      // this.getUserRebateDataById({userId}).then((data) => {
      //   let userInfo = this.lowerLevelData[i]
      //   userInfo.showDetail = !userInfo.showDetail
      //   this.$set(this.lowerLevelData, i, userInfo)
      // })
      this.getUserAll(userId).then((data) => {
        let userInfo = this.lowerLevelData[i]
        userInfo.showDetail = !userInfo.showDetail
        this.$set(this.lowerLevelData, i, userInfo)
      })
    },
    getUserIndexByUserId (userId) {
      for (let i = 0; i < this.lowerLevelData.length; i++) {
        if (this.lowerLevelData[i].userId === userId) {
          return i
        }
      }
    },
    getUserByUserId (userId) {
      return this.lowerLevelData[this.getUserIndexByUserId(userId)]
    },
    /**
     * 获取用户的返水数据
     * userId
     */
    getUserRebateDataById (params = {}) {
      let index = this.getUserIndexByUserId(params.userId)
      let userInfo = this.lowerLevelData[index]
      if (userInfo && ((this.userPoint > 0 && userInfo.rebates.length > 1) || (this.userPoint <= 0 && userInfo.rebates.length > 0))) return Promise.resolve(userInfo)
      return this.$.get(api.getBackWater, params).then(({data: {backWaterComb}}) => {
        backWaterComb.forEach(b => {
          userInfo.rebates.push({show: true, userPoint: (b.backWater || 0) > 0 ? ((b.backWater || 0) * 1000 + '‰') : '--', name: b.groupName + '返水'})
        })
        this.$set(this.lowerLevelData, index, userInfo)
      })
    },
    getUserAll (userId) {
      let index = this.getUserIndexByUserId(userId)
      let userInfo = this.lowerLevelData[index]
      if (userInfo && ((this.userPoint > 0 && userInfo.rebates.length > 1) || (this.userPoint <= 0 && userInfo.rebates.length > 0))) return Promise.resolve(userInfo)
      return this.$.get(api.getUserAll, {subUserid: userId}).then(({data: {backMyArr, cpArr, yjArr, myPointArr, subPointArr}}) => {
        backMyArr.forEach(b => {
          userInfo.rebates.push({show: true, userPoint: (b.backWater || 0) > 0 ? ((b.backWater || 0) * 1000 + '‰') : '--', name: b.groupname + '返水'})
        })
        if (cpArr.length > 0) {
          userInfo.cp = cpArr[0]
        }
        if (yjArr.length > 0) {
          userInfo.yj = yjArr[0]
        }
        this.$set(this.lowerLevelData, index, userInfo)
      })
    }
  }
}
</script>

<style lang="stylus">
// @import '~src/css/var.stylus'
.lower-level-mgr
  display flex
  flex-direction column
  .w-100p
    width 100%
  .btn-l-red
    background-color rgba(255, 84, 41, 0.11)
  .b-b
    border-bottom solid 1px #f1f1f1
  .b-t
    border-top solid 1px #f1f1f1
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
  .btns-wp
    flex-direction row
    justify-content flex-end
    .button
      // float right
    .icon-triangle.down::after
      border-top-color #ff5429
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
