<template lang="pug">
  f7-page.bank_bind
    f7-navbar(:innerClass=" 'navbar_of_' + $options.name " title="绑定银行卡" back-link)

    f7-list.mg_0(inline-labels no-hairlines ref="_form")
      f7-list-input(label="持卡人" placeholder="请输入持卡人姓名" clear-button @change=" form.n = $event.target.value " required validate)
      f7-list-input(type="text" required validate pattern="[0-9]*" label="银行卡号" placeholder="请输入银行卡号" clear-button @change=" form.cn = $event.target.value ")
      f7-list-item(title="银行名称" placeholder="请选择银行名称" smart-select='', :smart-select-params="{openIn: 'sheet'}" ref="t" clear-button)
        select(name="wallets" v-model=" form.i ")
          option(v-for=" (v, i) in cache.allBankData " :key="i" :value="i") {{ v.bankName }}


      f7-list-input(label="开户省市" placeholder="请选择开户省市" id="pac" readonly @change=" form.pac = $event.target.value " required validate)

      f7-list-input(label="开户支行" placeholder="请输入开户支行" clear-button @change=" form.bn = $event.target.value " required validate)

    .h_40
    f7-button.mg_10(fill large @click=" __validateform(bind) ") 确认

</template>

<script>
  import config from '@/config'
  import api from '@/api'
  export default {
    mixins: [config],
    components: {
    },
    name: 'bank_bind',
    props: [],
    data () {
      return {
        form: {
          n: '',
          cn: '',
          i: '',
          pac: '',
          bn: '',
        },
        picker: null,
      }
    },
    computed: {
      pid () {
        return this.form.pac ? this.cache.allProvinces.find(x => x.title === this.form.pac.split('-')[0]).id : ''
      },
      cid () {
        return this.form.pac ? this.cache.allProvinces.find(x => x.title === this.form.pac.split('-')[0]).subRegionList.find(y => y.title === this.form.pac.split('-')[1]).id : ''
      },
    },
    created () {
      if (!this.cache.allProvinces[0]) this.getProvices()
      if (!this.cache.allBankData[0]) this.getBankList()
    },
    mounted () {
      if (this.cache.allProvinces[0]) this.picking()
    },
    beforeDestroy () {
      this.picker.destroy()
    },
    methods: {
      getProvices () {
        this.$.get(api.getProvices).then(({data: {allProvinces}}) => {
          this.__setCache({allProvinces})
          this.picking()
        })
      },
      getBankList () {
        this.$.get(api.getBankList).then(({data: {allBankData}}) => {
          this.__setCache({allBankData})
        })
      },
      bind () {
        this.$.post(api.bindBankCard, {
          realName: this.form.n,
          cardNo: this.form.cn,
          apiName: this.cache.allBankData[this.form.i].apiName,
          provinceId: this.pid,
          cityId: this.cid,
          branch: this.form.bn,
        }).then(this.__back)
      },
      picking () {
        let vs = {}
        this.cache.allProvinces.forEach(x => {
          vs[x.title] = x.subRegionList.map(y => y.title)
        })
        this.picker = this.$f7.picker.create({
          inputEl: '#pac input',
          rotateEffect: true,
          formatValue: (vs) => {
            return vs.join('-')
          },
          cols: [
            {
              width: '50%',
              values: Object.keys(vs),
              onChange: (P, p) => {
                if (P.cols[1].replaceValues) {
                  P.cols[1].replaceValues(vs[p])
                }
              }
            },
            {values: vs[this.cache.allProvinces[0].title], textAlign: 'left', width: '50%'},
          ]
        })
      }
    }
  }
</script>

<style lang="stylus">
  @import '~src/css/var.stylus'
  // 建议不添加scoped， 所有样式最多嵌套2层
  .bank_bind
    .smart-select
      .item-after
        width 60%
        color #333

</style>
