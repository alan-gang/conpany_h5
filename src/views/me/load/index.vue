<template lang="pug">

f7-page.load
  f7-navbar(title="充值" back-link)
    f7-nav-right
      f7-link(@click=" __go('/rfs/cr/', {props: {tabid: '#rf_cr_2'}}) ") 充值记录

  .h_100.bgc_f.t_c
    .pt_15 账户余额(元)
    .ft_30.text-color-deeporange {{ user.availableBalance }}
    .text-color-gray {{ user.userName }}

  f7-row.pd_5(no-gap)
    f7-col.pd_5(width="50" v-for=" (v, i) in data " :key=" i "  @click=" __setLocal({loadway: v.saveWay}) ") 
      .bgc_f.r_10(:class=" {active: local.loadway === v.saveWay} ")
        .flex.h_70
          .a
            .pl_10.pr_10.v_m.inlb 
              f7-icon._icon(f7="home" :class=" '_load_' + v.saveWay " size="50")
          span {{ v.saveWayName }}

          f7-checkbox.mr_10(:class=" { o_0: local.loadway !== v.saveWay } " :checked=" local.loadway === v.saveWay ")

  template(v-if=" way ")
    f7-list.mt_5.mb_5(v-show=" way.range[1] ")
      f7-list-item(title="选择银行" smart-select='', :smart-select-params="{openIn: 'sheet'}" ref="s")
        f7-icon._icon._load_bank_choose(f7="home" slot="media")
        select(name="banks" v-model=" form.i ")
          option(v-for=" (v, i) in way.range " :key="i" :value="i") {{ v.bankName }}({{ v.range.join('-') }})

    f7-list.mt_5.mb_5(inline-labels v-if=" rn ")
      f7-list-input(placeholder="真实姓名" required validate type='text' :value=" form.n " @input=" form.n = $event.target.value ")
        f7-icon(f7="person" slot="media" style="color: var(--f7-theme-color)")


    f7-list.mt_5.mb_5
      li.item-content.item-input
        .item-media
          f7-icon._icon._load_amount(f7="home")
        .item-inner
          .item-input-wrap
            input(required validate pattern="[0-9]*" type='number' v-model="form.m" :placeholder=" readonly ? '点击按钮选择可充值金额' : '请输入充值金额' " :readonly=" readonly ")
            span.input-clear-button
        .item-after.pr_10
          span.text-color-gray 实际到账：
          span.text-color-deeporange {{ g._f3() }}

    template(v-if=" way.range[form.i]")

      template(v-if=" !Number(way.range[form.i].range[0]) ")
        .text-color-gray.pl_10
          span 充值范围 
          span.text-color-deeporange {{ way.range[form.i].range.join('-') }}
          span.pd_5
          span  手续费 
          span.text-color-deeporange {{ way.range[form.i].fee + '%' }}
      template(v-else)
        .pl_10.pr_10
          f7-button.mr_2.mb_2.w_60.inlb.color-orange(fill  v-for=" (v, i) in  way.range[form.i].range " @click=" form.m = v ") {{ v }}

    .h_25
    f7-button.mg_10(fill large @click="commitNew") 去付款

    f7-block 一般情况下，充值到账时间为1-2分钟，有时会因为银行、第三支付、网络等原因延迟。如果超过5分钟没有到账，可到充值记录-充值详情中，提交“催到账”申请单，或直接联系客服。

  f7-popup.r_5.dialog-popup-auto-center.load_result_popup(style="width: 90%")
    f7-navbar(title="充值详情")
      f7-nav-right
        f7-link(icon-f7="close" icon-size="40px" popup-close=".load_result_popup" @click="afterCommit")
    .pl_20.pr_20
      template(v-if=" result && result.appendix ")
        f7-list.mg_0
          f7-list-item(v-clipboard:success="onCopy" v-clipboard:copy="form.n" title=" 支付宝真实姓名"  :after=" form.n " v-show=" rn ")
          f7-list-item(v-clipboard:success="onCopy" v-clipboard:copy="result.amount" title=" 充值总额"  :after=" result.amount ")
          f7-list-item(v-clipboard:success="onCopy" v-clipboard:copy="result.bankName" title=" 银行信息"  :after=" result.bankName ")
          f7-list-item(v-clipboard:success="onCopy" v-clipboard:copy="result.cardName" title=" 户名"  :after=" result.cardName ")
          f7-list-item(v-clipboard:success="onCopy" v-clipboard:copy="result.cardNum" title=" 卡号"  :after=" result.cardNum ")
          f7-list-item(v-clipboard:success="onCopy" v-clipboard:copy="result.orderId" title=" 订单号"  :after=" result.orderId ")
          f7-list-item(v-clipboard:success="onCopy" v-clipboard:copy="result.appendix" title=" 附言"  :after=" result.appendix ")
        f7-button.mg_10(fill large @click=" window.open(result.payUrl) " v-if=" result.payUrl ") 去网银支付


      template(v-else)
        .hlh_30.t_c
          span 充值金额
          span.text-color-deeporange {{ form.m }}
          span 元
        .hlh_20.ft_12.t_c 请扫描下方二维码付款
        img.w_200.h_200(:src="  'data:image/png;base64,' +  result ")


</template>

<script>
import config from '@/config'
import api from '@/api'
export default {
  mixins: [config],
  components: {
  },
  name: 'load',
  props: [],
  data () {
    return {
      data: [],
      form: {
        i: 0,
        m: '',
        n: '',
      },
      result: '',
    }
  },
  created () {
    this.saveRangesNew()
  },
  computed: {
    readonly () {
      return !!(this.way.range[this.form.i] && Number(this.way.range[this.form.i].range[0]))
    },
    way () {
      return this.data.filter(x => x.saveWay === this.local.loadway)[0] || this.data[0]
    },
    g () {
      return this.form.m * (100 - this.way.range[this.form.i].fee || 0) * 0.01
    },
    rn () {
      return this.way.saveWay === 'zfb2bank'
    },
  },
  watch: {
    'local.loadway' () {
      this.$nextTick(() => {
        this.$refs['s'].f7SmartSelect.setValue((this.form.i = 0))
        this.form.m = ''
      })
    },
    'form.i' () {
      this.form.m = ''
    }
  },
  methods: {
    afterCommit () {
      this.$f7.dialog.create({
        title: '',
        text: '请确认付款结果',
        buttons: [
          {
            text: '我已完成付款',
          },
          {
            text: '付款失败',
          },
          {
            text: '我已取消付款',
          },
        ],
        verticalButtons: true,
        onClick: (o, i) => {
          this.updateBillNew(i + 1)
          if (i === 0) {
            this.__toast('充值成功')
          } else if (i === 1) {
            this.$f7.dialog.alert('一般情况下，充值到账时间为1-2分钟，有时会因为银行、第三方、网络等原因延迟。如果超过5分钟没有到账，可到充值记录--充值详情中，提交“催到账”申请单，或直接联系客服。', '')
          } else {
            this.$f7.dialog.alert('如果付款失败，请多尝试几次，若仍不成功，请减少充值金额后再次尝试（例如：500 改为 300），或更换其他充值方式进行充值。', '')
          }
        }
      }).open()
    },
    updateBillNew (s) {
      this.$.get(api.updateBillNew, {billNo: this.billNo, userStat: s})
    },
    saveRangesNew () {
      this.$.get(api.saveRangesNew, {chanType: this.local.pf}).then(({data: {saveRange}}) => {
        this.data = saveRange
      })
    },
    commitNew () {
      this.$.get(api.commitNew, {
        chanType: this.local.pf,
        bankCode: this.way.range[this.form.i].bankCode,
        amount: this.form.m,
        saveWay: this.way.saveWay,
        cardName: ''
      }).then(({data: {payUrl, href, data, billNo}}) => {
        this.billNo = billNo
        if (href) {
          this.$f7.dialog.confirm('立即前往支付', '', () => {
            window.open(href)
            this.afterCommit()
          })
        } else {
          this.result = payUrl || data
          this.$f7.popup.open('.load_result_popup')
        }
      })
    },
    onCopy (e) {
      this.__alert('复制成功：' + e.text)
    },
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.load
  .bgc_f
    border 2px solid rgba(0,0,0,0)
    &.active
      border-color var(--f7-theme-color)
.load_result_popup
  --f7-list-item-title-font-size 14px
</style>
