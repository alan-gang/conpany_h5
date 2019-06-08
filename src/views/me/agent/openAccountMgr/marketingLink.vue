<template lang="pug">
  f7-page(class="marketing-link-pg")
    TipBar(:show="showTipBar" content="点击二维码可复制推广链接，或将二维码保存至手机。" @close-cb="showTipBar = false")
    ul.qrs-wp.flex.bgc_f
      li(v-for="(img, i) in QRs" :key="i")
        img(:src="'data:image/png;base64,' + img")
        p.t_c 链接{{i + 1}}
    .promotion-code.t_c.bgc_f 注册邀请码：&nbsp;&nbsp;{{promotionCode}}
    p 推广链接设置 ：
    f7-button.mg_10(fill large @click="save") 保存设置
</template>

<script>
import api from '@/api'
import config from '@/config'
import TipBar from './TipBar'
export default {
  name: 'marketingLink',
  mixins: [config],
  components: {
    TipBar
  },
  data () {
    return {
      showTipBar: true,
      QRs: [],
      promotionCode: '',
      urls: ''
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
        data.back.unshift({
          backwater: data.userPoint
        })
        data.back.forEach((x, i) => {
          x.$ = (x.backwater - x.value).toFixed(4) * 1000
          x.$s = x.backwater * (i ? 10000 : 10)
        })
        data.back[0].$ = (data.userPoint - data.autoPoint).toFixed(1)
        // this.data = data.back
      }, (rep) => {
        this.$message.error('自动注册链接获取失败！')
      })
    },
    save () {}
  }
}
</script>

<style lang="stylus">
.marketing-link-pg
  .qrs-wp
    justify-content space-around
    padding-top 20px
  ul
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
