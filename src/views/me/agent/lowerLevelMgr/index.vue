<template lang="pug">
  f7-page.lower-level-mgr(:page-content="false")
    f7-navbar(title="下级管理" back-link top)
    f7-row.breadcrumb-row.bgc_f.pl_25
      f7-col.breadcrumb-wp(width="85")
        span.ft_15.mr_2.breadcrumb-item(v-for="(u, i) in breadcrumb" @click="linkTo(u.userId)") 
          span(:class="{c_orange: i === 0 || i < breadcrumb.length - 1}") {{u.userName}} 
          i {{breadcrumb.length > 1 && i !== breadcrumb.length - 1  ? '>' : ''}}
      f7-col(width="15" @click="showSearchBar = true")
        .icon-search
    
    f7-row.bgc_f.pl_25.search-condi-bar.c_6.z_9503.p_r
      f7-col.flex.flex-jc-s(@click="(filterType = 1) && (showFilter = !showFilter) && (rns_ = true)")
        span(v-show="condiRegisterDate.indexOf('至') == -1") 注册时间：
        span.pl_5 {{condiRegisterDate}}
        span.inlb.icon-triangle-wp
          Triangle(:direction="filterType == 1 && showFilter ? 'up' : 'down'")
      f7-col.flex.flex-jc-s(@click="(filterType = 2) && (showFilter = !showFilter) && (rns_ = true)")
        span 排序方式：
        span.pl_5 {{ curOrderObject.name }}
        span.inlb.icon-triangle-wp
          Triangle(:direction="filterType == 2 && showFilter ? 'up' : 'down'")

    //- 搜索框
    .p_a.wp_100.p_t_0.z_9503.ft_14.search-bar(v-show="showSearchBar")
      f7-searchbar(
        ref="s" 
        disable-button-text="取消" 
        @click:disable="showSearchBar = false" 
        placeholder="请输入下级用户名" 
        :clear-button="true" 
        @change=" name = $event.target.value" 
        :value="name"
        @input="name = $event.target.value" 
        @focus="rns_ = true" 
        @submit="search"
      )
      template
        .searchbar-backdrop.h_0(@click="showSearchBar = rns_ = false")
        f7-list.mg_0.o_h.page_content_like.z_500(simple-list )
          f7-list-item 
            f7-button.wp_100.t_c.bg-color-white.pd_0(@click=" rns[0] && __setLocal({rns: ''}) ") {{ rns[0] ? '清空搜索记录' : '无搜索记录' }}
          f7-list-item(v-for=" (x, i) in rns " :key="i" v-if=" x ")
            f7-button.wp_100.t_l.bg-color-white.pd_0(color="black" @click="choiceName(x)") {{ x }}
    filters.filter-wp.b-t(v-if=" showFilter " @sd="filterCB")
      DP(v-if="filterType === 1" @st="$set(stet, 0, $event || '')" @et="$set(stet, 1, $event || '')"  @done="__setCall({fn: '__closeSD'})" t="rf_fh_3")
      QueryCondition(:show="filterType === 2" :conditions="orderTypes" @change="orderTypeChange" @done="__setCall({fn: '__closeSD'})")
    .tip-bar-wp
      TipBar(:show="showTipBar && !showSearchBar" content="账户余额仅包含【主账户】与【特殊账户】的余额。" @close-cb="showTipBar = false")
    .ptr-content-wp(v-show="!showSearchBar")
      .ptr-content-inner-wp
        .page-content.ptr-content.infinite-scroll-content(ptr-mousewheel="true" @ptr:refresh=" refresh " @infinite="loadMore" :infinite-distance="50" )
          .ptr-preloader
            .preloader
            .ptr-arrow
          .user-list-wp
            f7-card(v-for=" (d, i) in lowerLevelData " :key="i")
              f7-card-header
                f7-row.w-100p
                  f7-col(width="40")
                    span.ft_14.text-color-gray
                      f7-icon(f7="person" color="orange")
                      span {{ d.userName }}
                    span.ft_14.text-color-gray {{ d.writeTime }}
                  f7-col.btns-wp.flex(width="60")
                    f7-button.w_80.c_p.btn-v-v-s(outline v-if=" d.teamCount > 1 && breadcrumb[breadcrumb.length - 1].userId !== d.userId " @click="viewSubLevel(d.userId)") 
                      | 查看下级
                      span
                    f7-button.w_65.btn-l-red.ml_10(outline @click="operate(d)")
                      span 操作
                      span.inlb
                        Triangle(direction="down")
              f7-card-content.pt_0.pb_0
                f7-row.pb_5.pt_10
                  f7-col(width="50")
                    span.c_9 账户余额：
                    span {{d.teamBalance}}
                  f7-col(width="50")
                    span.c_9 最后登录：
                    span {{ fixDateStr(d.lastTime).split(' ')[0] }}
                f7-row.pb_10
                  f7-col(width="50")
                    span.c_9 注册方式：
                    span {{ d.isAuto ? '自动' : '手动' }}
                  f7-col(width="50")
                    span.c_9 注册时间：
                    span {{ fixDateStr(d.registerTime).split(' ')[0] }}

                .ex-info(v-show="d.showDetail")
                  f7-row.b-t.pt_10.pb_5
                    f7-col(width="50")
                      span.c_9 团队人数：
                      span {{d.teamCount}}
                    f7-col(width="50")
                      span.c_9 团队余额：
                      span {{d.teamBalance}}
                  f7-row.b-b.pb_10
                    f7-col(width="50")
                      span.c_9 给下级转账：
                      span(v-state="true") {{canTopUp ? '已开通' : '未开通'}}
                  .rebates-wp.b-b.pt_10.pb_5
                    f7-row
                      f7-col.pb_5(:width=" i % 2 ? 50 : 45 " v-for="(rebate, i) in d.rebates")
                        span.c_9 {{rebate.name}}：
                        span {{rebate.userPoint}}

                  f7-row.pt_10.pb_10(v-if="showSalary")
                    f7-col
                      span.c_9 日工资：
                      span 团队销售&gt;={{d.teamSales}}, 有效人数&gt;={{d.actUser}}, 每1万{{d.daySalary}}
                  .cp-rules.pb_10(v-if="showcpfh && d.cp.myBounCpArr && d.cp.myBounCpArr.length >= 0")
                    f7-row.b-t.pt_10.pb_10
                      f7-col
                        span.c_9 彩票分红： 
                        span {{dateCycle[d.cp.sendcycle]}}，{{sendTypes[d.cp.sendtype]}}
                      f7-col.t_r(v-if="d.cp.myBounCpArr && d.cp.myBounCpArr.length >= 3") 
                        span.c_p(@click="showAllRulesHandler(d.userId, i, 'cp')") 显示全部规则
                    .inner-ctx.b-b.pt_10.pd_10  
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
                  
                  .yj-rules(v-if="showsfyj && d.yj.myBounYjArr && d.yj.myBounYjArr.length >= 0")
                    f7-row.b-t.pt_10.pb_10
                      f7-col
                        span.c_9 其它游戏分红：  
                        span {{dateCycle[d.yj.sendcycle]}}，{{sendTypes[d.yj.sendtype]}}
                      f7-col.t_r(v-if="d.yj.myBounCpArr && d.yj.myBounCpArr.length >= 3") 
                        span.c_p(@click="showAllRulesHandler(d.userId, i, 'yj')") 显示全部规则
                    .inner-ctx.b-b.pt_10.pd_10  
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
                span.c_p(@click="collapse(d.userId, i)") {{d.showDetail ? '收起' : '展开'}}详情

          .preloader.infinite-scroll-preloader(v-if="showPreloader")
          .t_c.text-color-gray.pd_15.nomore --没有更多了--

    f7-actions(:opened="shwoActionSheet" @actions:closed="shwoActionSheet = false")
      f7-actions-group
        f7-actions-button.c_0(v-for="(v, k, i) in actionButtons" v-show="v.show" @click="actionButtonHandler(v.type)") {{v.name}}

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
import QueryCondition from '@/components/filters/QueryCondition'
export default {
  name: 'lowerLevelMgr',
  mixins: [config, stet, page],
  components: {
    TipBar,
    Triangle,
    filters,
    DP,
    QueryCondition
  },
  data () {
    return {
      id: '',
      showSearchBar: false,
      showFilter: false,
      filterType: 1,
      showTipBar: true,
      rns_: false,
      orderTypes: [{id: '3', name: '注册时间'}, {id: '4', name: '最后登录'}, {id: '2', name: '账户余额'}],
      curOrderObject: {id: '3', name: '注册时间'},
      curOrderType: '',
      maxDaySalary: 0,
      name: '',
      userName: '',
      subUserid: '',
      pageSize: 10,
      page: 1,
      lowerLevelData: [],
      userPoint: 0,
      operCurUser: {
        userId: ''
      },
      shwoActionSheet: false,
      breadcrumb: [{userId: '', userName: '我的下级'}],
      actionButtons: {
        id0: {type: 'transToSub', name: '给下级转账', show: true},
        id1: {type: 'setPoint', name: '设置返点 / 返水', show: false},
        id2: {type: 'setDaySalary', name: '设置日工资', show: false},
        id3: {type: 'fh', name: '发起分红契约 / 重新发起分红契约', show: false},
        id4: {type: 'yj', name: '发起佣金契约 / 重新发起佣金契约', show: false},
        id5: {type: 'cpSubSet', name: '复制下级设置', show: true}
      },
      isAddAccount: 0,
      canTopUp: false,
      safeCheckCode: '',
      topUpMax: '',
      topUpMin: '',
      moneyTypes: ['可用余额', '特殊金额'],

      userRebateData: [],
      sendTypes: ['手动发放', '自动发放'],
      dateCycle: ['', '每月', '每半月', '每周'],
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
    },
    // 最近搜索的名字
    rns () {
      return this.local.rns.split(',').filter(x => x.indexOf(this.name) !== -1)
    },
    condiRegisterDate () {
      return !this.stet[0] || !this.stet[1] ? '不限' : this.__stetn.join(' 至 ')
    }
  },
  mounted () {
    this.actionButtons['id1'].show = this.showback || this.showpoint
    this.actionButtons['id2'].show = this.showSalary
    this.actionButtons['id3'].show = this.showcpfh
    this.actionButtons['id4'].show = this.showsfyj
    this.stet = []
    this.list()
  },
  methods: {
    list (p = {}, cb = this.defaultListCb) {
      let params = {
        startDate: this.stet[0] && this.stet[0].getTime(),
        endDate: this.stet[1] && this.stet[1].getTime(),
        userName: this.userName,
        pageSize: this.pageSize,
        page: this.page,
        subUserid: this.subUserId,
        orderType: this.curOrderType
      }

      Object.assign(params, p)
      // 搜索下级
      this.$.get(api.getUserList, params).then(({data: {salaryComb, subUserInfo, totalSize, currUserId, isAddAccount, uploadLevel, userPoint, userBreads}}) => {
        this.breadcrumb = [{userId: '', userName: '我的下级'}, ...userBreads.slice(1)]
        this.maxDaySalary = salaryComb[salaryComb.length - 1].value
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
          s.back = [
            {
              $: s.userPoint.toFixed(1),
              $$: s.userPoint.toFixed(1),
              $s: userPoint * 10
            }
          ]
          return s
        })
        this.lowerLevelData = params.page === 1 ? (subUserInfo || []) : this.lowerLevelData.concat(subUserInfo || [])
        this.total = totalSize
        cb && cb(subUserInfo)
      })
    },
    orderTypeChange (v, i) {
      this.curOrderObject = v
      this.curOrderType = v.id
    },
    viewSubLevel (subUserId) {
      this.userName = this.name = ''
      this.subUserId = subUserId
      this.page = 1
      this.list()
    },
    linkTo (userId) {
      this.userName = this.name = ''
      this.viewSubLevel(userId)
    },
    showSearchBarHandler () {
      this.showSearchBar = true
    },
    operate (user) {
      this.operCurUser = user
      this.shwoActionSheet = true
    },
    showAllRulesHandler (userId, i, type) {
      let userInfo = this.lowerLevelData[i]
      if (type === 'cp') userInfo.showAllCPRule = !userInfo.showAllCPRule
      if (type === 'yj') userInfo.showYJAllRule = !userInfo.showYJAllRule
      this.$set(this.lowerLevelData, i, userInfo)
    },
    collapse (userId, i) {
      this.getUserAll(userId).then((data) => {
        let userInfo = this.lowerLevelData[i]
        userInfo.showDetail = !userInfo.showDetail
        this.$set(this.lowerLevelData, i, userInfo)
      })
    },
    actionButtonHandler (type) {
      switch (type) {
        case 'transToSub':
          this.__go('/agent/lowerLevelMgr/transferTo', {props: {id: this.operCurUser.userId, name: this.operCurUser.userName, myId: this.id, topUpMax: this.topUpMax, topUpMin: this.topUpMin}})
          break
        case 'setPoint':
          this.__go('/agent/lowerLevelMgr/setPoint', {props: {id: this.operCurUser.userId, name: this.operCurUser.userName, userPoint: this.operCurUser.userPoint, myPoint: this.userPoint}})
          break
        case 'setDaySalary':
          this.__go('/rfs/ds/setds/', {props: {v: {userId: this.operCurUser.userId, userName: this.operCurUser.userName}, max: this.maxDaySalary}})
          break
        case 'fh':
          this.__go('/rfs/fh/newc/', {props: { v: {userId: this.operCurUser.userId, userName: this.operCurUser.userName} }})
          break
        case 'yj':
          this.__go('/rfs/yj/newc/', {props: { v: {userId: this.operCurUser.userId, userName: this.operCurUser.userName} }})
          break
        case 'cpSubSet':
          this.__go('/agent/lowerLevelMgr/copySet', {props: {id: this.operCurUser.userId, name: this.operCurUser.userName, myId: this.id}})
          break
        default:
          break
      }
    },
    choiceName (name) {
      this.name = name
      this.search()
    },
    search () {
      this.__setLocal({rns: this.name + ',' + this.local.rns.replace(this.name + ',', '')})
      this.userName = this.name
      this.showSearchBar = this.rns_ = false
      this.page = 1
      this.list()
    },
    filterCB (e) {
      this.showFilter = e
      this.list()
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
          userInfo.rebates.push({show: true, userPoint: (b.backwater || 0) > 0 ? ((b.backwater || 0) * 1000 + '‰') : '--', name: b.groupname + '返水'})
        })
        if (cpArr.length > 0) {
          userInfo.cp = cpArr[0]
        }
        if (yjArr.length > 0) {
          userInfo.yj = yjArr[0]
        }
        this.$set(this.lowerLevelData, index, userInfo)
      })
    },
    fixDateStr (dstr = '') {
      return dstr.indexOf('.0') !== -1 ? dstr.slice(0, dstr.length - 2) : dstr
    }
  }
}
</script>

<style lang="stylus">
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
  .search-bar
    margin-top 87px
  .filter-wp
    top 130px
    .sd_content
      top -5%
      padding-top 0
  .breadcrumb-row
    line-height 42px
    border-bottom solid 1px #f1f1f1
    margin-top 44px
  // .breadcrumb-item
  //   span:first-child
  //     color #ff5429
  .icon-search
    width 30px
    height 40px
    background url('../../../../assets/me/icon_screen@2x.png') no-repeat center
    background-size 15px
  .search-condi-bar
    line-height 44px
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
  .inner-ctx
    background-color #e6e6e6
  .btns-wp
    flex-direction row
    justify-content flex-end
    .button
    .icon-triangle.down::after
      border-top-color #ff5429
    .btn-v-v-s
      border solid 1px #ff9500
  .infinite-scroll-content
    width 100%
    position absolute
    left 0
  .card-footer
    justify-content center
  .searchbar-backdrop
    pointer-events auto
  .searchbar-enabled ~ .searchbar-backdrop,
  .searchbar-backdrop
    height 100vh
    opacity 1
  .searchbar-enabled ~ .list
    // margin-top 44px
    max-height 50vh
    overflow-y auto
    
  & > .page-content
    padding-top calc(var(--f7-toolbar-height) + var(--f7-toolbar-height))
.lower-level-mgr
  // top var(--f7-toolbar-height)
  // height calc(100% - var(--f7-toolbar-height))
  .infinite-scroll-content
    padding-top var(--f7-toolbar-height)
  .infinite-scroll-preloader + .nomore
    display none

</style>
