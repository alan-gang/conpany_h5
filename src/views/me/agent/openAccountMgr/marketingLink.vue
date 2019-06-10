<template lang="pug">
  f7-page(class="marketing-link-pg")
    TipBar(:show="showTipBar" content="点击二维码可复制推广链接，或将二维码保存至手机。" @close-cb="showTipBar = false")
    ul.qrs-wp.flex.bgc_f
      li(v-for="(img, i) in QRs" :key="i")
        img(:src="'data:image/png;base64,' + img" @click="imageHandler(i)" :ref="'qrCode'+i")
        .t_c.pb_20 链接{{i + 1}}
    .promotion-code.t_c.bgc_f 注册邀请码：&nbsp;&nbsp;{{promotionCode}}
    p.ml_20 推广链接设置 ：
    RebateRate(:rebateRates="rebateRates" :show="true" @update="updateRebateRates")
    f7-button.mg_10(fill large @click="save") 保存设置
    f7-actions(:opened="shwoActionSheet" @actions:closed="shwoActionSheet = false")
      f7-actions-group
        f7-actions-button.c_0(v-clipboard:copy="copyMsg" v-clipboard:success="copySuccess" v-clipboard:error="copyError") 复制【{{copyButtonTxt}}】
        f7-actions-button.c_0(@click.native="saveToPhone") 将二维码保存到手机
      f7-actions-group
        f7-actions-button.c_0 取消
</template>

<script>
import api from '@/api'
import config from '@/config'
import TipBar from './TipBar'
import RebateRate from './RebateRate'
export default {
  name: 'marketingLink',
  mixins: [config],
  components: {
    TipBar,
    RebateRate
  },
  data () {
    return {
      showTipBar: true,
      QRs: [],
      promotionCode: '',
      urls: '',
      rebateRates: [],
      swiperParams: {
        speed: 500,
        slidesPerView: 5,
        spaceBetween: 2,
        allowSlidePrev: true,
        allowSlideNext: true
      },
      shwoActionSheet: false,
      copyButtonTxt: '链接',
      copyMsg: '',
      curImg: ''
    }
  },
  mounted () {
    this.getQrCodeImg()
    this.getSpreadLinks()
  },
  methods: {
    getQrCodeImg () {
      this.$.get(api.createQr).then(({data: {qrStr}}) => {
        this.QRs = qrStr
      })
    },
    getSpreadLinks () {
      this.$.get(api.showSpreadLinks).then(({data}) => {
        this.promotionCode = data.promotionCode
        this.urls = data.url
        data.back = data.back.map((x, i) => {
          console.log('(x.backwater - x.value).toFixed(4)=', (x.backwater - x.value).toFixed(4))
          x.$ = ((x.backwater - x.value) * 1000).toFixed(1)
          x.$s = x.backwater * 10000
          x.rebateTypeTxt = '返水'
          x.unitTxt = '千分之'
          return x
        })
        data.back.unshift({
          name: '彩票',
          $: (data.userPoint - data.autoPoint).toFixed(1),
          $s: data.userPoint * 10,
          backwater: data.userPoint,
          rebateTypeTxt: '返点',
          unitTxt: '百分之'
        })
        // data.back.forEach((x, i) => {
        //   x.$ = (x.backwater - x.value).toFixed(4) * 1000
        //   x.$s = x.backwater * (i ? 10000 : 10)
        // })
        // data.back[0].$ = (data.userPoint - data.autoPoint).toFixed(1)
        this.rebateRates = data.back
        console.log('rebateRates=', data.back)
      }, (rep) => {
        this.__alert('自动注册链接获取失败！')
      })
    },
    updateRebateRates (d) {
      this.rebateRates = d
    },
    imageHandler (i) {
      this.copyMsg = this.urls[i]
      this.copyButtonTxt = '链接' + (i + 1)
      this.shwoActionSheet = true
      this.curImg = this.$refs['qrCode' + i][0]
    },
    save () {
      let params = {
        keepPoint: (this.rebateRates[0].backwater - this.rebateRates[0].$).toFixed(1),
        pointArr: JSON.stringify({
          myBack: this.rebateRates.slice(1).map(x => {
            return {
              groupid: x.groupid,
              groupname: x.groupname,
              backwater: (x.backwater - x.$ / 1000).toFixed(4)
            }
          })
        })
      }
      this.$.get(api.setKeepPoint, params).then(({data}) => {
        this.__alert(data.msg || '保留返点设置成功！')
      }, (rep) => {
        this.__alert('保留返点设置失败！')
      })
    },
    copySuccess () {
      this.__toast('复制成功')
    },
    copyError () {
      this.__toast('复制失败')
    },
    saveToPhone () {
      this.doloadImg(this.curImg)
    },
    doloadImg (img) {
      let imgCvs = document.createElement('canvas')
      imgCvs.width = img.width
      imgCvs.height = img.height
      let ctx = imgCvs.getContext('2d')
      ctx.drawImage(img, 0, 0)
      let imgData = imgCvs.toDataURL('png')
      imgData = imgData.replace('image/png', 'image/octet-stream')
      let a = document.createElement('a')
      a.href = imgData
      a.download = `qr_code_${Date.now()}.png`
      let evt = document.createEvent('MouseEvents')
      evt.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      a.dispatchEvent(evt)
    }
  }
}
</script>

<style lang="stylus">
.marketing-link-pg
  .qrs-wp
    justify-content space-around
    padding 20px 0 0 0
    &ul
      margin 0
      padding 0   
      li
        width 97px
        img
          width 100%
        p
          margin 5px 0
  .promotion-code
    line-height 40px
</style>
