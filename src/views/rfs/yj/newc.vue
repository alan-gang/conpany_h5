<template lang="pug">
f7-page.new_contract
  f7-navbar(title="发起分红契约" back-link)
  .hlh_45.pl_10.pr_10.bgc_f.ft_16
    span 下级用户名：
    span {{ v.userName }}
  div(ref="_form")
    f7-list.mt_5.mb_5.input_t_r(inline-labels no-hairlines)
      f7-list-input(ref="st" label='开始时间', type='datepicker', :placeholder=' form.st ',  :calendar-params="{openIn: 'customModal', header: true, footer: true, dateFormat: 'yyyy-mm-dd'}"   @change=" form.st = $event.target.value " clear-button)
      f7-list-input(required validate  ref="et" label='结束时间', type='datepicker', :placeholder=' form.et ',  :calendar-params="{openIn: 'customModal', header: true, footer: true, dateFormat: 'yyyy-mm-dd'}"  @change=" form.et = $event.target.value " clear-button)

    f7-list.mt_5.mb_5(inline-labels no-hairlines)
      f7-list-item(title="分红周期")
        f7-segmented.w_160(slot="after" )
          f7-button(round v-for=" (x, i) in is " :class=" {'color-black bgc_239': form.i !== i} " :active=" form.i === i " @click=" form.i = i ") {{ x.n }}

      f7-list-item(title="发放方式")
        f7-segmented.w_160(slot="after" )
          f7-button(round v-for=" (x, i) in js " :class=" {'color-black bgc_239': form.j !== i} " :active=" form.j === i " @click=" form.j = i ") {{ x.n }}

    f7-list.mt_5.mb_5
      li(v-for="(x, i) in rs" :ref=" 'r' + i ")
        .item-content
          .item-inner.align-items-flex-start
            .item-title.p_r.p_t_10 规则{{ i + 1 }}
            .a.wp_60
              .hlh_40.mb_5
                .v_m.inlb
                  f7-segmented.w_100(slot="after" )
                    f7-button(round v-for=" (y, j) in rts " :class=" {'color-black bgc_239': x.ruletype !== y.id} " :active=" x.ruletype === y.id " @click=" updatert(x, y.id, i) ") {{ y.n }}
                span.pd_5 ≥
                .wp_30.inlb.v_m
                  f7-input.hlh_25.bgc_239(outline)
                    input.hlh_25.t_c(validate required type="number" pattern="[0-9]*" :min=" x.sales_ " step='1' v-model=" x.sales " style="padding: 0 5px; height: 25px")
                span.pd_5 万

              .hlh_40.mb_5
                .v_m.inlb.w_100 有效人数
                span.pd_5 ≥
                .wp_30.inlb.v_m
                  f7-input.hlh_25.bgc_239(outline)
                    input.hlh_25.t_c(validate required pattern="[0-9]+" type="number" :min=" x.actUser_ ", max='10000', step='1' v-model=" x.actUser " style="padding: 0 5px; height: 25px")
                span.pd_5 人

              .hlh_40.mb_5
                .v_m.inlb.w_100 分红比例
                span.pd_5.o_0 ≥
                .wp_30.inlb.v_m.list.inline-picker.mg_0.r_5.input-outline
                  f7-list-item.hlh_25.bgc_239(title="分红比例" placeholder="..." smart-select :smart-select-params="{openIn: 'sheet'}" :ref=" 's' + i " )
                    select(:name="i" v-model=" x.bounsRate " @change=" updateM1M2(x, $event.target.value, i) ")
                      option(v-for=" (y, j) in ruleCfg.filter(z => z.ruletype === x.ruletype) "  :value="j" :disabled=" rs.filter(z => z.ruletype === x.ruletype && z.bounsRate === j && z !== x)[0] ") {{ y.bounsRate }}%

                //- span.pd_5 %

            
            f7-icon.p_r.p_t_10(color="red" f7="delete_round_fill" @click.native=" rs.length > 0 && rs.splice(i, 1) && refreshrs() ")

    f7-button.mb_10.bgc_f.pd_10.h_60.lh_20(@click=" rs.push( Object.assign({}, r) ) ")
      f7-icon._icon._plus(f7="home" size="20")
      .ft_14 添加规则

  f7-toolbar(bottom)
    f7-button.wp_100(fill large @click=" __validateform(createContract) ") 发送契约





</template>

<script>
import config from '@/config'
import api from '@/api'
export default {
  mixins: [config],
  components: {
  },
  name: 'new_contract',
  props: ['v'],
  data () {
    let r = {ruletype: 1, sales: '', actUser: '', bounsRate: '', sales_: 0, actUser_: 0}
    return {
      is: [
        {n: '每半月', id: 2},
        {n: '每月', id: 1},
      ],
      js: [
        {n: '自动发放', id: 1},
        {n: '手动发放', id: 0},
      ],
      rts: [
        // {n: '销售', id: 0},
        {n: '亏损', id: 1},
      ],
      form: {
        st: new Date()._toDayString(),
        et: new Date()._bfY(10)._toDayString(),
        i: 0,
        j: 0,
      },
      r: r,
      rs: [
        Object.assign({}, r),
      ],
      ruleCfg: [],
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
    this.notice()
    this.rconfig()
  },
  methods: {
    rconfig () {
      this.$.get(api.rconfig, {
        cType: 1
      }).then(({data: {ruleCfg}}) => {
        this.ruleCfg = ruleCfg
      })
    },
    notice () {
      this.$f7.dialog.create({
        cssClass: 'full_width',
        content: `<div class="t_l ft_12"><p>契约规则： 1.分红比例不能为空2.亏损、销量/人数需要符合当前分红比例的最小值限制3.不能有相同的规则或空规则</p>在您和下级签订了签约以后，如果每期的下级契约分红没有完成发放，则您的提款和代充功能将暂时会被禁用1.销量和亏损只要达到规则，都应按照规则的分红比例派发分红2.[手动发放]即每次发分红的时候需要您进入[历史分红]点击确认发放3.[自动发放]是在您资金足够的情况下，由系统根据您设置的规则自动发放下级分红，资金不足则交由您手动执行4. 契约执行周期为：[按月]1号；[按半月]1号和16号5. 一天内投注额达到500元，为一个有效用户</div>`,
        title: '温馨提示',
        buttons: [
          {text: '知道了', close: true}
        ]
      }).open()
    },
    updateM1M2 (x, j, i) {
      let {actUser, sales} = this.ruleCfg.filter(z => z.ruletype === x.ruletype)[j]
      x.actUser_ = actUser
      x.sales_ = sales
      this.$nextTick(this.__validateform)
    },
    updatert (x, j, i) {
      x.ruletype = j
      this.$refs['s' + i][0].f7SmartSelect.setValue((x.bounsRate = 0))
      this.updateM1M2(x, 0, i)
    },
    createContract () {
      let x = this.rs.filter(x => x.bounsRate !== '').map(y => {
        return {
          ruletype: y.ruletype,
          sales: y.sales,
          bounsRate: this.ruleCfg.filter(z => z.ruletype === y.ruletype)[y.bounsRate].bounsRate,
          actUser: y.actUser
        }
      })
      if (x && (!x[0] || x.length !== this.rs.length)) this.notice()
      this.$.post(api.createContract, {
        beginTm: new Date(this.form.st)._toAllString(),
        expireTm: new Date(this.form.et)._toAllString(),
        userId: this.v.userId,
        sendCycle: this.is[this.form.i].id,
        sendType: this.js[this.form.j].id,
        cType: 0,
        bonusRuleList: JSON.stringify(x)
      }).then(this.__back)
    },
    refreshrs () {
      const x = this.rs
      this.rs = []
      setTimeout(() => { this.rs = x }, 0)
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.new_contract
  .list.inline-picker
    .item-after
      color #000
      font-size 18px
    .item-inner:before
      content ''
      pointer-events none
      position absolute
      top 50%
      margin-top -2px
      width 0
      height 0
      border-left 4px solid transparent
      border-right 4px solid transparent
      border-top 5px solid #727272
      right 6px
      transform none
  .hlh_25 .input-error-message
    position absolute
    text-align center
    padding-top 2px
    font-size 10px
    left -200%
    width 500%
  
  --f7-inline-label-font-size 16px
</style>
