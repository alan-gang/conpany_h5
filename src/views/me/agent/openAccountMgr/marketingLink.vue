添加修改链接
<template lang="pug">
  f7-page(class="marketing-link-pg")
    f7-navbar(:innerClass=" 'navbar_of_' + $options.name " :title="($props.row?'修改' : '添加')+'推广链接'" back-link top )
    .bgc_f.pd_10.pb_0
      p.mt_0.mb_5 请选择线路
      f7-list.md.linkselect.mg_0
        f7-list-item(v-for="(v,i) in urls")
          .linenum
            f7-radio(name="url" :checked="url == v" :value="v" @change="url = $event.target.value") 
            span.ml_10 线路{{i+1}}:
          .ellipsis {{v}}
          span.testsub.t_c(@click="CalculateLine(v, i)")
            span 测速
            span.linkms.ft_10(v-bind:class="{'fast':urlSpeed[i]<=30,'slow':urlSpeed[i]>30||urlSpeed[i]=='超时'}") {{urlSpeed[i]}}{{typeof(urlSpeed[i])=='number' ? 'ms' : '' }}
    .form-wp.bgc_f
      f7-row
        f7-col(width="25") QQ：
        f7-col(width="75")
          f7-input(type="text" maxlength="20" placeholder="请输入QQ号码" :value="qq" @input="qq = $event.target.value")
      f7-row
        f7-col(width="25") 微信：
        f7-col(width="75")
          f7-input(type="text" maxlength="20" placeholder="请输入微信号码" :value="weChant" @input="weChant = $event.target.value")
      f7-row
        f7-col(width="25") 手机号：
        f7-col(width="75")
          f7-input(type="text" maxlength="11" placeholder="请输入11位手机号" :value="phone" @input="phone = $event.target.value")
      f7-row
        f7-col(width="25") 备注：
        f7-col(width="75")
          f7-input(type="text" maxlength="20" placeholder="最多输入十个文字，例：百度贴吧1900" :value="lineRemards" @input="lineRemards = $event.target.value")

    p.ml_20 推广链接设置 ：
    RebateRate(:rebateRates="rebateRates" :show="true" @update="updateRebateRates" :parentIfRange="true")
    f7-button.mg_10(fill large @click="save") 保存设置
    //- f7-actions(:opened="shwoActionSheet" @actions:closed="shwoActionSheet = false")
    //-   f7-actions-group
    //-     f7-actions-button.c_0(v-clipboard:copy="copyMsg" v-clipboard:success="copySuccess" v-clipboard:error="copyError") 复制【{{copyButtonTxt}}】
    //-     f7-actions-button.c_0(@click.native="saveToPhone") 将二维码保存到手机
    //-   f7-actions-group
    //-     f7-actions-button.c_0 取消
</template>

<script>
import api from '@/api'
import config from '@/config'
import TipBar from 'comp/TipBar'
import RebateRate from 'comp/agent/RebateRate'
export default {
  name: 'marketingLink',
  mixins: [config],
  props: ['row'],
  components: {
    TipBar,
    RebateRate
  },
  data () {
    return {
      qq: '',
      phone: '',
      lineRemards: '',
      weChant: '',
      showTipBar: true,
      QRs: [],
      promotionCode: '',
      url: '',
      urls: [],
      urlSpeed: {},
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
      curImg: '',
      wait: false,
    }
  },
  mounted () {
    // this.getQrCodeImg()
    this.$props.row && this.getRegistLines() // edit
    !this.$props.row && this.getSpreadLinks() // add
  },
  methods: {
    __init_rf_adduser_2 () {
      this.wait = true
    },
    // getQrCodeImg () {
    //   this.$.get(api.createQr).then(({data: {qrStr}}) => {
    //     this.QRs = qrStr
    //   })
    // },
    // 计算线路速度
    CalculateLine (host, urlSpeedInx) {
      let n = document.createElement('script')
      let t = Date.now()
      this.urlSpeed[urlSpeedInx] = '...'
      this.urls.splice(0, 0)
      n.setAttribute('src', host)
      n.onload = () => {
        // console.log(Date.now() - t)
        this.urlSpeed[urlSpeedInx] = Date.now() - t
        this.urls.splice(0, 0)
      }
      n.onerror = () => {
        // console.log('time out')
        this.urlSpeed[urlSpeedInx] = '超时'
        this.urls.splice(0, 0)
      }
      this.$el.appendChild(n)
    },
    // edit
    getRegistLines () {
      this.$
        .get(api.getRegistLines, {
          entry: this.$props.row.entry
        })
        .then(
          ({ data }) => {
            this.lineRemards = data.lineRemards
            this.phone = data.phone
            this.qq = data.qq
            this.weChant = data.weChant
            this.urls = [data.line]
            this.url = data.line
            data.back = data.back.map((x, i) => {
              x.$ = (x.value * 1000).toFixed(1)
              x.$s = (x.backWater * 10000).toFixed(0) * 1
              x.rebateTypeTxt = '返水'
              x.unitTxt = '千分之'
              x.unitSymbal = '‰'
              x.groupName = x.groupName
              return x
            })
            data.back.unshift({
              name: '彩票',
              $: (data.userPointValue * 100).toFixed(1) * 1,
              $s: data.userPoint * 10,
              backWater: data.userPoint,
              rebateTypeTxt: '返点',
              unitTxt: '百分之',
              unitSymbal: '%'
            })
            // console.log(JSON.stringify(data.back))
            this.rebateRates = data.back
          },
          rep => {
            // error
          }
        )
    },
    // add
    getSpreadLinks () {
      this.$.get(api.showSpreadLinksNew).then(({data}) => {
        this.promotionCode = data.promotionCode
        this.urls = data.url
        data.url.length && (this.url = data.url[0]) // 默认勾选第一个 线路
        data.back = data.back.map((x, i) => {
          x.$ = ((x.backWater - x.value) * 1000).toFixed(1)
          x.$s = (x.backWater * 10000).toFixed(0) * 1
          x.rebateTypeTxt = '返水'
          x.unitTxt = '千分之'
          x.unitSymbal = '‰'
          x.groupName = x.groupName
          return x
        })
        data.back.unshift({
          name: '彩票',
          $: (data.userPoint - data.autoPoint).toFixed(1),
          $s: data.userPoint * 10,
          backWater: data.userPoint,
          rebateTypeTxt: '返点',
          unitTxt: '百分之',
          unitSymbal: '%'
        })
        this.rebateRates = data.back
      }, (rep) => {
        this.__toast('自动注册链接获取失败！')
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
        lineRemards: this.lineRemards, // 备注
        phone: this.phone,
        qq: this.qq,
        weChant: this.weChant,
        linesArr: this.url, // 用户选择的线路
        keepPoint: this.rebateRates[0].$,
        pointArr: JSON.stringify({
          myBack: this.rebateRates.slice(1).map(x => {
            return {
              groupid: x.groupId,
              groupname: x.groupName,
              backwater: (x.$ / 1000).toFixed(4)
            }
          })
        })
      }
      this.$props.row && (params['entry'] = this.$props.row.entry) // edit
      this.$.get(api.setKeepPoint, params).then(this.__back)
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
  .linkms
    &.fast 
      color #13ce66
    &.slow
      color #ff4949
  .form-wp
    .row
      height 55px
      align-items center
      background #fff
      padding 0 15px
    .row:first-child
      margin-bottom 1px
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
  .linenum
    min-width 5em
  .testsub
    min-width 2.6em
  .linkselect
    .item-content
      padding-left 0
      .item-inner
        padding-right 0
</style>
