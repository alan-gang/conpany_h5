<template lang="pug">
  f7-page(class="search-lower-level-pg" bg-color="white")
    f7-navbar(title="复制已有下级的设置" text-color="white" color-theme="white" bg-color="orange")
      f7-nav-right
        f7-link(icon-f7="close" icon-size="40px" popup-close=".search-lower-level-dialog")
    //- f7-searchbar(placeholder="请输入下级的用户名")
    .ipt-wp
      f7-input(type="text" placeholder="请输入下级的用户名" :value="userName" @input="userName = $event.target.value" :clear-button="true")
    f7-list(:simple-list="true")
      f7-list-item(v-for="(act, i) in accountsHistory" :title="act.userName" @click.native="getUserRebateDataById(act)")
    f7-button.mg_10(fill large @click="sure") 确定
</template>

<script>
import api from '@/api'
import config from '@/config'
export default {
  name: 'SearchLowerLeverDialog',
  mixins: [config],
  data () {
    return {
      userName: '',
      accountsHistory: []
    }
  },
  props: {},
  mounted () {
    this.accountsHistory = JSON.parse(window.localStorage.getItem('SEARCH_LOWER_LOVER_DIALOG_USERS_HISTORY') || '[]')
  },
  methods: {
    getUserList () {
      let params = {
        userName: this.userName
      }
      // 搜索下级
      this.$.get(api.getUserList, params).then(({data}) => {
        if (data.subUserInfo.length > 0) {
          this.saveUserToHistory(data.subUserInfo[0])
          this.$emit('info', data.subUserInfo[0])
          this.getUserRebateDataById({userId: data.subUserInfo[0]})
        } else {
          this.__alert('您输入的下级用户名不存在')
        }
      })
    },
    // 获取用户的返水数据
    getUserRebateDataById (user = {}) {
      const cpBackWater = {
        groupId: 0,
        backWater: user.userPoint,
      }
      this.$.get(api.getBackWater, { userId: user.userId }).then(({data: {backWaterComb}}) => {
        this.$emit('rebate-data', [cpBackWater, ...backWaterComb])
      })
    },
    listItemHandler (act) {
      this.getUserRebateDataById({userId: act.userId})
    },
    saveUserToHistory (userInfo) {
      if (!userInfo) return
      let users = JSON.parse(window.localStorage.getItem('SEARCH_LOWER_LOVER_DIALOG_USERS_HISTORY') || '[]')
      this.deleteDuplicateOldUserHistory(users, userInfo.userId)
      users.unshift(userInfo)
      if (users.length > 5) users.pop()
      this.accountsHistory = users
      window.localStorage.setItem('SEARCH_LOWER_LOVER_DIALOG_USERS_HISTORY', JSON.stringify(users))
    },
    deleteDuplicateOldUserHistory (users = [], userId) {
      for (let i = 0; i < users.length; i++) {
        if (users[i].userId === userId) {
          users.splice(i, 1)
        }
      }
    },
    getUserFromHistory (users = [], userId) {
      for (let i = 0; i < users.length; i++) {
        if (users[i].userId === userId) {
          return users[i]
        }
      }
    },
    sure () {
      this.getUserList()
    }
  }
}
</script>

<style lang="stylus">
.search-lower-level-dialog
  .ipt-wp
    padding 20px 30px 0 30px
    position relative
    input
      line-height 40px
      background-color #efefef
      text-indent 15px
      border-radius 5px
    &::before
      display block
      width 3px
      height 20px
      position absolute
      content ''
      background-color #ff5429
      z-index 2
      left 38px
      top 30px
    .input-clear-button
      right 10px
  border-radius 8px
  &.dialog-popup.popup
    height 450px
</style>
