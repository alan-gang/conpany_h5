<template lang="pug">
  f7-page(class="add-lower-level-pg")
    .form-wp
      f7-row
        f7-col(width="25") 用户名：
        f7-col(width="75")
          f7-input(type="text" maxlength="16" placeholder="6-16位，数字或字母组合" :value="userName" @input="userName = $event.target.value")
      f7-row
        f7-col(width="25") 登录密码：
        f7-col(width="75")
          input(type="password" maxlength="20" :placeholder="'默认密码' + defaultPwd" v-model="password")

    f7-row.set-header(v-show="isShowRebateLs")
      f7-col(width="50") 返点/返水设置
      f7-col(width="50")
        f7-button.ft_14(fill large @click="openUseAlreadySetDialog" @click.native="popupOpened = true") 使用已有下级的设置

    f7-list.rebate-ls(v-show="isShowRebateLs")
      f7-list-item(v-for="(item, i) in rebateRates" :key="i")
        f7-row.rebate-type-row
          f7-col(width="20") 
            span(class="c_orange") {{item.name || item.groupname}} 
          f7-col.ft_15(width="80") 
            span {{item.rebateTypeTxt}} 
            span(class="c_orange") {{item.$ || 0.00}}% 
            span.c_g &nbsp;({{item.unitTxt}}{{item.$ || 0.00}})
        .rebate-swiper-wp
          .left-r(@click="swiperLeft(i)")
          f7-swiper.rebate-swiper(:params="swiperParams" v-show="item.$s" :ref="'rebateSwiper' + i")
            f7-swiper-slide(v-for="(rate, j) in item.$s" :key="j" @click.native="rebateItemHandler(rate, i, j)" :class="{active: (rate * 0.1).toFixed(1) === item.$}") {{(rate * 0.1).toFixed(1)}}%
          .right-r(@click="swiperRight(i)")

    f7-button.mg_10(fill large @click="openAccount") 开户

    f7-popup.search-lower-level-dialog.dialog-popup(:opened="popupOpened" @popup:closed="popupOpened = false")
      SearchLowerLeverDialog(@rebate-data="rebateDataCB")

</template>

<script>
import api from '@/api'
import config from '@/config'
import SearchLowerLeverDialog from './SearchLowerLeverDialog'
export default {
  name: 'addLowerLevel',
  mixins: [config],
  components: {
    SearchLowerLeverDialog
  },
  data () {
    return {
      userName: '',
      password: '',
      defaultPwd: '123456a',
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
        data.back = data.back.map((x, i) => {
          x.$ = '0.0'
          x.$s = x.backwater * 10000
          x.rebateTypeTxt = '返水'
          x.unitTxt = '千分之'
          return x
        })
        data.back.unshift({
          name: '彩票',
          backwater: data.userPoint,
          $: '0.0',
          $s: data.userPoint * 10,
          rebateTypeTxt: '返点',
          unitTxt: '百分之'
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
    rebateItemHandler (rate, i, j) {
      this.rebateRates[i].$ = (rate * 0.1).toFixed(1)
    },
    swiperLeft (i) {
      this.$refs['rebateSwiper' + i] && this.$refs['rebateSwiper' + i][0].swiper.slideNext()
    },
    swiperRight (i) {
      this.$refs['rebateSwiper' + i] && this.$refs['rebateSwiper' + i][0].swiper.slidePrev()
    },
    rebateDataCB (data = []) {
      // console.log(data)
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
    openUseAlreadySetDialog () {}
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
  .rebate-ls
    margin-top 10px
    .item-inner
      display block
      padding 20px 15px 20px 0
    .rebate-type-row
      flex 1
    .rebate-swiper
      // margin-top 15px
      .swiper-slide.active
        background-color rgba(251, 175, 156, 0.3)
        color rgb(255,84,41)
	      border solid 2px #ff5429
        box-sizing border-box
    .swiper-slide
      height 35px
      line-height 35px
      text-align center
      background-color #efefef
    .rebate-swiper-wp
      display flex
      align-items center
      margin-top 15px
    arrow()
      width 10px
      height 10px
      content ''
      display block
    .left-r
      width 15px
      display flex
      align-items center
      &::before
        arrow()
        border-top solid 2px #666
        border-left solid 2px #666
        transform rotate(-45deg)
    .right-r
      width 15px
      display flex
      align-items center
      &::after
        arrow()
        border-top solid 2px #666
        border-right solid 2px #666
        transform rotate(45deg)
</style>
