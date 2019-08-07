<template lang="pug">
f7-page.copyset-to-pg
  f7-navbar(:innerClass=" 'navbar_of_' + $options.name " title="复制下级设置" back-link top v-if="showChoiceCpCtxPage")
  f7-navbar(:innerClass=" 'navbar_of_' + $options.name " top v-else)
    f7-nav-left
      .link
        .icon.icon-back.color-theme-deeporange.choice-user-pg-nav(@click="showChoiceCpCtxPage = true")
    f7-nav-title 选择用户
    f7-nav-right(@click.native="showChoiceCpCtxPage = true") 完成
  .choice-cp-ctx(v-show="showChoiceCpCtxPage")
    f7-row.h_40.bgc_f.flex-ai-c.pl_25
      f7-col 下级用户名： {{name}}
    f7-row.h_40.flex-ai-c.pl_25
      f7-col 请选择要复制的内容
    f7-list.set-ls.mt_0.mb_0
      .accordion-item.bgc_f
        .item-content.item-link
          .item-inner
            span
              f7-checkbox(value="1" @change="checkType")
              span.inlb.pl_10 返点 / 返水
            span.ft_12.c_g 查看详情
        .accordion-item-content
          .inner-ctx.b-b.pt_10.pd_10.mg_15
            f7-row
              f7-col(width="50" v-for="(rebate, i) in userInfo.rebates")
                span.c_9 {{rebate.name}}：
                span {{rebate.userPoint}}
      .accordion-item.bgc_f.mt_10(v-if="userInfo.ds.salary > 0")
        .item-content.item-link
          .item-inner
            span
              f7-checkbox(value="2" @change="checkType")
              span.inlb.pl_10 日工资
            span.ft_12.c_g 查看详情
        .accordion-item-content
          .inner-ctx.b-b.pt_10.pd_10.mg_15
            f7-row.pt_10.pb_10(v-if="showSalary")
              f7-col
                span 日工资：团队销售&gt;={{userInfo.ds.teamsales}}, 有效人数&gt;={{userInfo.ds.activityuser}}, 每1万{{userInfo.ds.salary}}。
      .accordion-item.bgc_f.mt_10(v-if="userInfo.cp.myBounCpArr")
        .item-content.item-link
          .item-inner
            span
              f7-checkbox(value="3" @change="checkType")
              span.inlb.pl_10 彩票分红
            span.ft_12.c_g 查看详情
        .accordion-item-content
          .inner-ctx.b-b.pt_10.pd_10.mg_15
            f7-row.b-t.pt_10.pb_10
              f7-col {{dateCycle[userInfo.cp.sendcycle]}}，{{sendTypes[userInfo.cp.sendtype]}}，{{userInfo.cp.begintm.split(' ')[0]}}开始，{{userInfo.cp.expiretm.split(' ')[0]}}结束。
            f7-row(v-for="(yjBouns, j) in userInfo.cp.myBounCpArr")
              f7-col 规则{{j + 1}}: 累计销量&gt;={{yjBouns.sales / 10000}}万，有效人数&gt;={{yjBouns.actuser}}，分红比例{{mth.mul(yjBouns.bounsrate, 100)}}%。
      .accordion-item.bgc_f.mt_10(v-if="userInfo.yj.myBounYjArr")
        .item-content.item-link
          .item-inner
            span
              f7-checkbox(value="3" @change="checkType")
              span.inlb.pl_10 其它游戏分红
            span.ft_12.c_g 查看详情
        .accordion-item-content      
          .inner-ctx.b-b.pt_10.pd_10.mg_15
            f7-row.b-t.pt_10.pb_10
              f7-col {{dateCycle[userInfo.yj.sendcycle]}}，{{sendTypes[userInfo.yj.sendtype]}}，{{userInfo.yj.begintm.split(' ')[0]}}开始，{{userInfo.yj.expiretm.split(' ')[0]}}结束。
            f7-row(v-for="(yjBouns, j) in userInfo.yj.myBounYjArr")
              f7-col 规则{{j + 1}}: 累计销量&gt;={{yjBouns.sales / 10000}}万，有效人数&gt;={{yjBouns.actuser}}，分红比例{{mth.mul(yjBouns.bounsrate, 100)}}%。
    f7-row.h_40.flex-ai-c.pl_25
      f7-col 将复制的内容同步给以下用户
    .selected-users-wp.bgc_f.pd_10.p_r.o_y(@click="toChoiceUser")
      template(v-if="choiceUsers.length > 0")
        f7-row.j_s
          f7-col.user-item.t_c(v-for="(u, i) in choiceUsers")
            span.lh_30 {{u.userName}}
      template(v-else)
        span.c_g.flex.h_100p.j_c 请选择用户
      f7-icon.icon-chevron-right.p_a(f7="chevron_right" size="small" color="gray")
    f7-button.mg_10.mt_30(fill large @click="sync") 同步
  .choice-cp-users(v-show="!showChoiceCpCtxPage")
    .wp_100.p_t_0.z_9503.ft_14.search-bar
      f7-searchbar(
        ref="s" 
        disable-button-text="取消" 
        placeholder="请输入直接下级的用户名" 
        @click:disable="rns_ = false" 
        :clear-button="true" 
        @change=" subName = $event.target.value" 
        :value="subName"
        @input="subName = $event.target.value" 
        @focus="rns_ = true" 
        @submit="search"
      )
    .search-his.p_a.wp_100(v-show="rns_")
      .searchbar-backdrop.h_0(@click="rns_ = false")
      f7-list.mg_0.o_h.page_content_like.z_500(simple-list)
        f7-list-item 
          f7-button.wp_100.t_c.bg-color-white.pd_0(@click=" rns[0] && __setLocal({rns: ''}) ") {{ rns[0] ? '清空搜索记录' : '无搜索记录' }}
        f7-list-item(v-for=" (x, i) in rns " :key="i" v-if=" x ")
          f7-button.wp_100.t_l.bg-color-white.pd_0(color="black" @click="choiceName(x)") {{ x }}
    .ptr-content-wp
      .ptr-content-inner-wp
        .page-content.ptr-content.infinite-scroll-content(ptr-mousewheel="true" @ptr:refresh=" refresh " @infinite="loadMore" :infinite-distance="50")
          .ptr-preloader
            .preloader
            .ptr-arrow
          f7-list.user-list-wp.ft_12
            f7-list-item(v-for="(u, i) in userList")
              span
                f7-icon(f7="person" color="orange" size="large")
                span.pl_5 {{u.userName}}
              span
                f7-checkbox(:value="u.userId" :checked="checkIsChecked(u.userId)" @change="choiceUser")
          .preloader.infinite-scroll-preloader(v-if="showPreloader")
          .t_c.text-color-gray.pd_15.pb_25.nomore --没有更多了--
    .cur-chloiced-wp
      f7-row.h_40.flex-ai-c.pl_25.bgc_f.mt_10.mb_10
        f7-col 
          | 您已选择 
          span.c_e {{choiceUsers.length}} 
          | 个用户，还可以再选择 
          span.c_e {{LIMIT_USER - choiceUsers.length}} 
          | 个用户。
      .cur-chloiced-users.pd_10.o_y
        f7-row.j_s
          f7-col.user-item.t_c.h_40(v-for="(u, i) in choiceUsers")
            span.user-name-iten.bgc_f.pd_5.pl_10.pr_10.p_r {{u.userName}}
              span.p_a.icon-delete(f7="delete_round" color="orange" size="small" @click="removeUser(u.userId)")
</template>

<script>
import api from '@/api'
import config from '@/config'
import page from '@/components/page'
import mth from '@/util/mth'
export default {
  name: 'copySet',
  mixins: [config, page],
  props: ['name', 'id', 'myId'],
  data () {
    return {
      mth,
      showChoiceCpCtxPage: true,
      items: [
        {type: 0, name: '返点 / 返水', checked: false},
        {type: 1, name: '日工资', checked: false},
        {type: 2, name: '彩票分红', checked: false},
        {type: 3, name: '三方佣金', checked: false},
      ],
      userInfo: {
        rebates: [],
        cp: [],
        ds: {},
        yj: []
      },
      LIMIT_USER: 30,
      typeCheckeds: [],
      choiceUsers: [],
      userList: [],
      subName: '',
      rns_: false,
      pageSize: 20,
      page: 1,
      sendTypes: ['手动发放', '自动发放'],
      dateCycle: ['', '每月', '每半月', '每周']
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
      return this.local.rns.split(',').filter(x => x.indexOf(this.subName) !== -1)
    }
  },
  mounted () {
    this.showPreloader = true
    this.getUserAll(this.id)
  },
  methods: {
    getUserAll (userId) {
      return this.$.get(api.getUserAll, {subUserid: userId}).then(({data: {backMyArr, cpArr, myDayArr, yjArr, myPointArr, subPointArr}}) => {
        backMyArr.forEach(b => {
          this.userInfo.rebates.push({show: true, userPoint: (b.backwater || 0) > 0 ? (this.mth.mul((b.backwater || 0), 1000) + '‰') : '--', name: b.groupname + '返水'})
        })
        if (myPointArr.length > 0) {
          this.userInfo.rebates.unshift({show: true, userPoint: myPointArr[0].userpoint > 0 ? (this.mth.mul((myPointArr[0].userpoint || 0), 100) + '%') : '--', name: '彩票返点'})
        }
        if (cpArr.length > 0) {
          this.userInfo.cp = cpArr[0]
        }
        if (myDayArr.length > 0) {
          this.userInfo.ds = myDayArr[0]
        }
        if (yjArr.length > 0) {
          this.userInfo.yj = yjArr[0]
        }
      })
    },
    syncSet (ids, sids) {
      this.$.get(api.getUserSubCopy, {
        subUserid: this.id,
        useridArr: ids,
        settingArr: sids
      }).then(({data}) => {
        // this.__toast(data.msg || '同步成功')
        this.list()
      })
    },
    checkIsChecked (userId) {
      return this.choiceUsers.filter(u => u.userId === userId).length > 0
    },
    addUser (userId) {
      if (this.choiceUsers.filter(u => u.userId === userId).length > 0) return
      for (let i = 0; i < this.userList.length; i++) {
        if (this.userList[i].userId === userId) {
          this.choiceUsers.push({userId: userId, userName: this.userList[i].userName})
          return true
        }
      }
    },
    removeUser (userId) {
      for (let i = 0; i < this.choiceUsers.length; i++) {
        if (this.choiceUsers[i].userId === userId) {
          this.choiceUsers.splice(i, 1)
          return true
        }
      }
    },
    checkType (e) {
      const value = parseInt(e.target.value, 10)
      if (e.target.checked) {
        this.typeCheckeds.push(value)
      } else {
        this.typeCheckeds.splice(this.typeCheckeds.indexOf(value), 1)
      }
    },
    choiceUser (e) {
      const value = parseInt(e.target.value, 10)
      if (e.target.checked) {
        if (this.choiceUsers.length >= this.LIMIT_USER) {
          e.target.checked = false
          return false
        }
        this.addUser(value)
      } else {
        this.removeUser(value)
      }
    },
    sync () {
      if (this.typeCheckeds.length < 1) {
        this.__toast('请选择要复制的内容')
        return
      }
      if (this.choiceUsers.length < 1) {
        this.__toast('请选择用户')
        return
      }
      let ids = this.choiceUsers.map(u => u.userId)
      ids = ids.join(',')
      this.syncSet(ids, this.typeCheckeds.join(','))
    },
    toChoiceUser () {
      this.showChoiceCpCtxPage = false
      this.list()
    },
    choiceName (name) {
      this.subName = name
      this.search()
    },
    search () {
      this.rns_ = false
      this.__setLocal({rns: this.subName + ',' + this.local.rns.replace(this.subName + ',', '')})
      this.page = 1
      this.list()
    },
    list (p = {}, cb = this.defaultListCb) {
      let params = {
        userName: this.subName,
        pageSize: this.pageSize,
        page: this.page
      }
      Object.assign(params, p)
      // 搜索下级
      this.$.get(api.getUserList, params).then(({data: {subUserInfo, totalSize, currUserId, isAddAccount, uploadLevel, userPoint, userBreads}}) => {
        this.userList = params.page === 1 ? (subUserInfo || []) : this.userList.concat(subUserInfo || [])
        this.total = totalSize
        cb && cb(subUserInfo)
      })
    }
  }
}
</script>

<style lang="stylus">
.copyset-to-pg
  .set-ls
    ul
      background none
  .item-inner.j_s
    justify-content flex-start
  .inner-ctx
    background-color #e6e6e6
  .selected-users-wp
    height 120px
    overflow-y auto
    .j_c
      justify-content center
  .icon-chevron-right.p_a
    position absolute
    top 60px
    right 10px
  .user-item
    width 33.33%
  .choice-cp-ctx
    .checkbox i, .icon-checkbox
      background-color gray
      border-color gray
      &:after
        opacity 1
        font-size 21px !important
  .choice-cp-users
    display flex
    flex-direction column
    height 100%
    .search-his
      z-index 10
      top 88px
    .search-bar input
      font-size 14px
    .searchbar-backdrop
      height 100vh
      opacity 1
      pointer-events auto
    .searchbar-enabled ~ .list
      max-height 50vh
      overflow-y auto
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
    .cur-chloiced-wp
      height 160px
    .cur-chloiced-users
      height 100px
    .user-list-wp
      margin 0
    .user-name-iten
      white-space nowrap
    .icon-delete.p_a
      width 15px
      height 15px
      position absolute
      top -5px
      right -5px
      background url('../../../../assets/me/icon_dele@2x.png') no-repeat center
      background-size 100%
.choice-user-pg-nav
  padding-left 17px
</style>
