<template lang="pug">
  f7-page.addBank
    f7-navbar(title="添加银行卡" back-link)
    form
      div.section
        label(for="name") 持卡人
        input.w_300(type="text" placeholder="由2至8个汉字组成，不能使用数字字符" v-model="realName" ref="name")
      div.section
        label(for="cardno") 银行卡号
        input.w_300(type="number" placeholder="银行卡由16位、18位、19位数字组成" v-model="cardno" ref="cardno" maxlength="19")
      //- div.section
      f7-list
        f7-list-item.c_6(title="银行名称" smart-select :smart-select-params="{openIn: 'sheet'}")
          select(name="bank-name").c_3
            option(v-for=" (bank, index) in bankList" :key="index" :class="'_bankicon_'+bank.apiName" v-model="bank.apiName" :value="bank.bankName") {{ bank.bankName }}
        //- label 银行名称
        //- select
        //-   option.option.bankName 请选择银行名称
        //-   option._icon(v-for=" (bank, index) in bankList" :key="index" :class="'_bankicon_'+bank.apiName" v-model="bank.apiName")
        //-     i.icon.f7-icons.pl_30 {{ bank.bankName }}
      div.section
        label 开户省市
        //- select
          //- option.option 请选择开户省市
        input(type="text" placeholder="请选择开户省市" readonly id="picker-province")
      div.section
        label(for="branch") 开户支行
        input.w_300(type="text" placeholder="请输入开户支行" v-model="branch" id="branch")
      a(href="javascript:;" class="confirm" @click="bindBankCard") 确 认
</template>

<script>
  import config from '@/config'
  import api from '@/api'
  export default {
    mixins: [config],
    components: {
    },
    name: 'addBank',
    props: [],
    data () {
      return {
        bankList: [],
        branch: '',
        realName: '',
        cardno: null,
        apiName: '',
        bankSelected: '',
        allProvinces: {},
        proList: []
      }
    },
    created () {
      this.getBankList()
    },
    mounted () {
      this.picker()
    },
    methods: {
      picker () {
        this.$.get(api.getProvices).then(({data: {allProvinces}}) => {
          allProvinces.map(x => {
            // console.log(x.subRegionList)
            this.proList.push(x.title)
            this.allProvinces[x.title] = x.subRegionList.map(y => y.title)
          })

          // this.allProvinces = {allProvinces.map(x => x.title),allProvinces[index]}
          // console.log(this.allProvinces['内蒙古'])
          this.$f7.picker.create({
            inputEl: '#picker-province',
            rotateEffect: true,
            // divider: true,
            // formatValue (v, dv) {
            //   return dv.join('-')
            // },
            formatValue (picker, values) {
              return values[1]
            },
            cols: [
              {
                // value () {
                //   return this.allProvinces
                // },
                values: this.proList,
                // displayValues: this.allProvinces.map(x => x.title),
                onChange: function (picker, cityes) {
                  if (picker.cols[1].replaceValues) {
                    console.log(cityes)
                    picker.cols[1].replaceValues(allProvinces.map(x => x.subRegionList))
                    // picker.cols[1].replaceValues(this.allProvinces.map(x => x.title))
                  }
                },
              },
              {
                values: this.allProvinces['北京'],
                width: 160,
              }
              // {
              //   values: this.allProvinces[0].subRegionList,
              //   displayValues: this.allProvinces[0].subRegionList.map(x => x.title),
              // },
            ],
          })
        })
      },
      getBankList () {
        this.$.get(api.getBankList).then(({data}) => {
          this.bankList = data.allBankData
          // console.log(this.bankList)
        })
      },
      bindBankCard () {
        // if (!this.realName || !this.cardno || !this.branch || !this.provinceId || !this.cityId || !this.apiName) {
        console.log(this.realName + this.cardno + this.branch + this.bankSelected)
        if (!this.realName || !this.cardno || !this.branch || !this.bankSelected) {
          this.$f7.dialog.alert('请填写完整资料', '', () => {

          })
          return
        }
        this.$.get(api.bindBankCard, {
          // provinceId: this.provinceId,
          // cityId: this.cityId,
          branch: this.branch,
          realName: this.realName,
          cardNo: this.cardno,
          apiName: this.apiName
        })
          .then(res => {
            if (!res.success) {
              this.$f7.dialog.alert(res.msg, () => {

              })
              return
            }
            this.$f7.dialog.alert('绑定银行卡成功！', () => {
              this.__go('/me/bank/')
            })
          })
      }
    }
  }
</script>

<style lang="stylus">
  @import '~src/css/var.stylus'
  // 建议不添加scoped， 所有样式最多嵌套2层
  .addBank
    form
      margin-top 0.18rem
      font-size 16px
      .list
        margin 0 0 .18rem 0
      .smart-select .item-after
        width 81%
        max-width 81%
        color #333
      .section
        height 44px
        line-height 44px
        margin-bottom 0.18rem
        background-color #fff
        label
          display inline-block
          color #666
          width 1.3rem
          padding-left 0.25rem
        select
          width 6.35rem
          margin -0.63rem 0 0 1.25rem
          padding-left 0.25rem
          option
            &.option
              color #c5c5c5
        input
          display inline-block
          color #3d3d3d
          &::-webkit-input-placeholder { color: #c5c5c5; }
          &:-moz-placeholder { color: #c5c5c5; }
          &::-moz-placeholder { color: #c5c5c5; }
          &:-ms-input-placeholder { color: #c5c5c5; }

  .confirm
    display block
    width 7.07rem
    height 0.82rem
    line-height 0.82rem
    margin 1.38rem auto 0
    color #fff
    background linear-gradient(to right, #fe8f48, #ff5429)
    border-radius 0.05rem
    text-align center
</style>
