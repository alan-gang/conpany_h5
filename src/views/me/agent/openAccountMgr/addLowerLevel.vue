<template lang="pug">
  f7-page(class="add-lower-level-pg")
    .form-wp
      f7-row
        f7-col(width="25") 用户名：
        f7-col(width="75")
          f7-input(type="text" maxlength="20" placeholder="6-20位，数字或字母组合" :value="userName" @input="userName = $event.target.value")
      f7-row
        f7-col(width="25") 登录密码：
        f7-col(width="75")
          input(type="password" maxlength="20" :placeholder="'默认密码' + defaultPwd" v-model="password")

    f7-row.set-header(v-show="isShowRebateLs")
      f7-col(width="50") 返点-返水设置：
      f7-col(width="50")
        f7-button.ft_14(fill large @click.native="popupOpened = true") 使用已有下级的设置

    RebateRate(:rebateRates="rebateRates" :show="isShowRebateLs" @update="updateRebateRates")
    f7-button.mg_10(fill large @click="openAccount") 开户

    f7-popup.search-lower-level-dialog.dialog-popup(:opened="popupOpened" @popup:closed="popupOpened = false")
      SearchLowerLeverDialog(@rebate-data="rebateDataCB")

</template>

<script>
import api from '@/api'
import config from '@/config'
import SearchLowerLeverDialog from './SearchLowerLeverDialog'
import RebateRate from 'comp/agent/RebateRate'
export default {
  name: 'addLowerLevel',
  mixins: [config],
  components: {
    SearchLowerLeverDialog,
    RebateRate
  },
  data () {
    return {
      userName: '',
      password: '',
      defaultPwd: '',
      keepPoint: '',
      rebateRates: [],
      isShowRebateLs: false,
      swiperParams: {
        speed: 500,
        slidesPerView: 5,
        spaceBetween: 2,
        allowSlidePrev: true,
        allowSlideNext: true
      },
      popupOpened: false
    }
  },
  mounted () {
    this.getShowRegistUser()
  },
  methods: {
    openAccount () {
      let params = {
        userName: this.userName,
        password: this.password || this.defaultPwd,
        keepPoint: (this.rebateRates[0].backwater - parseFloat(this.rebateRates[0].$)).toFixed(1),
        pointArr: JSON.stringify({
          myBack: this.rebateRates.slice(1).map(x => {
            return {
              groupid: x.groupid,
              groupname: x.groupname,
              backwater: parseFloat(x.$) / 1000
            }
          })
        }),
        proxyType: '',
        type: 1
      }
      this.$.post(api.registUser, params).then(({success, msg}) => {
        this.__alert(msg || `下级（${this.userName}）开户成功！`)
      }).catch(e => {})
    },
    getShowRegistUser () {
      this.$.get(api.showRegistUser).then(({data}) => {
        this.defaultPwd = data.defaultPwd
        data.back = data.back.map((x, i) => {
          x.$ = '0.0'
          x.$s = x.backwater * 10000
          x.rebateTypeTxt = '返水'
          x.unitTxt = '千分之'
          x.unitSymbal = '‰'
          x.groupName = x.groupname
          return x
        })
        data.back.unshift({
          name: '彩票',
          backwater: data.userPoint,
          $: '0.0',
          $s: data.userPoint * 10,
          rebateTypeTxt: '返点',
          unitTxt: '百分之',
          unitSymbal: '%'
        })
        this.rebateRates = data.back
        this.isShowRebateLs = !this.checkRebateIsAllOfZero(data.back)
      }, (rep) => {
        this.__toast('开户信息获取失败！')
      })
    },
    checkRebateIsAllOfZero (rebateRates) {
      for (let i = 0; i < rebateRates.length; i++) {
        if (parseFloat(rebateRates[i].backwater) > 0) return false
      }
      return true
    },
    rebateDataCB (data = []) {
      this.popupOpened = false
      if (data.length < 1) return
      this.rebateRates = this.rebateRates.map((item, j) => {
        for (let i = 0; i < data.length; i++) {
          if (item.groupid === data[i].groupId) {
            item.$ = ((data[i].backWater || 0) * 1000).toFixed(1)
            this.$refs['rebateSwiper' + j] && this.$refs['rebateSwiper' + j][0].swiper.slideTo(data[i].backWater * 1000 / 0.1, 0)
            break
          }
        }
        return item
      })
    },
    updateRebateRates (d) {
      this.rebateRates = d
    }
  }
}
</script>

<style lang="stylus">
.add-lower-level-pg
  .form-wp
    .row
      height 55px
      align-items center
      background #fff
      padding 0 15px
    .row:first-child
      margin-bottom 1px
  .set-header
    padding 0 15px
    margin 10px 0
    align-items center
 
</style>
