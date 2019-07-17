<template lang="pug">

f7-page.transfer
  f7-navbar(title="转帐" back-link)
    f7-nav-right
      f7-link(@click=" __go('/rfs/cr/', {props: {tabid: '#rf_cr_3'}}) ") 转账记录

  f7-list.mg_10

    //- f7-list-input(label='转入账户' type='select' :value="form.i" @change="form.i = $event.target.value")
      option(value="")
      option(v-for=" (v, i) in config.wallets " :key="i" :value="i") {{ v.n }}

    f7-list-item.pt_15(title="转出账户" smart-select='', :smart-select-params="{openIn: 'sheet'}" ref="f")
      select(name="wallets" v-model=" form.i ")
        option(v-for=" (v, i) in config.wallets " :key="i" :value="i") {{ v.n }}

    li
      .item-content.text-color-gray.t_r(style="min-height: 30px; font-size: 12px;") 余额：{{ im._f3() }}

  .p_r
    .p_a.z_2
      f7-icon._icon._swap(f7="home" size="40" :class=" {_swap_disabled: _swap_disabled} " @click.native=" !_swap_disabled && (form.j = [form.i, form.i = form.j][0])  ")

  f7-list.ml_10.mr_10.mt_-5.mb_0
    f7-list-item.pt_15(title="转入账户" smart-select='', :smart-select-params="{openIn: 'sheet'}" ref="t" clear-button)
      select(name="wallets" v-model=" form.j ")
        option(v-for=" (v, i) in config.wallets " :key="i" :value="i" :disabled=" i === 1 || form.i === '' || (form.i > 0 && i > 0 ) || form.i === i ") {{ v.n }}
    li
      .item-content.text-color-gray.t_r(style="min-height: 30px; font-size: 12px;") 余额：{{ jm._f3() }}

  f7-list.mg_10
    li.item-content.item-input(ref="m")
      .item-media
        f7-icon._icon._load_amount(f7="home")
      .item-inner
        .item-input-wrap
          input(required validate type='number' v-model="form.m" :placeholder=" '可转账金额：' + im._f3() " :max=" Number(im) " :min="10")
          span.input-clear-button
      .item-after.pr_10
        f7-button(@click=" (form.i !== '') && (form.m = user[config.wallets[form.i].key]) ") 全部
  .pl_10.pr_10.flex
    f7-button.wp_25.inlb.bg-color-white(color="black" v-for=" (v, i) in  [10, 100, 1000, 10000] " @click=" form.m = v " :class=" {mr_5: i < 3} ") {{ v }}

  f7-block
    f7-button(fill large @click=" (form.i || form.j) && $refs['m'].className.indexOf('item-input-invalid') === -1 && [ato, sta, ota][Math.min(form.i, 2)]() ") 确认转账
    .h_10
    f7-button.bg-color-white(large @click="ata") 一键转回
    .h_30.pd_5.t_c.ft_12.c_9 点击一键转回，可将第三方游戏账户的余额一次性转回主账户。


</template>

<script>
import config from '@/config'
import api from '@/api'
export default {
  mixins: [config],
  components: {
  },
  name: 'transfer',
  props: ['i', 'j'],
  data () {
    return {
      form: {
        i: typeof this.i === 'number' ? this.i : '',
        j: typeof this.j === 'number' ? this.j : '',
        m: '',
      }
    }
  },
  computed: {
    im () {
      return this.config.wallets[this.form.i] ? this.user[this.config.wallets[this.form.i].key] : ''
    },
    jm () {
      return this.config.wallets[this.form.j] ? this.user[this.config.wallets[this.form.j].key] : ''
    },
    _swap_disabled () {
      return this.form.i === 1 || this.form.j === 1 || this.form.i === '' || this.form.j === ''
    }
  },
  watch: {
    'form.i' (n) {
      this.$nextTick(() => {
        this.$refs['f'].f7SmartSelect.setValue(this.form.i)
        this.$refs['t'].f7SmartSelect.setValue((this.form.j = n ? 0 : this.form.j || 2))
        this.form.m = ''
      })
    }
  },
  methods: {
    ato () {
      this.$.get(api.ato, {amount: this.form.m, platid: this.config.wallets[this.form.j].pid}).then(() => this.__setCall({fn: '__getMoreBalance', args: [this.config.wallets[this.form.j]]}))
    },
    sta () {
      this.$.get(api.sto, {amount: this.form.m})
    },
    ota () {
      this.$.get(api.ota, {amount: this.form.m, platid: this.config.wallets[this.form.i].pid}).then(() => this.__setCall({fn: '__getMoreBalance', args: [this.config.wallets[this.form.i]]}))
    },
    ata () {
      this.$.get(api.ata)
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.transfer
  .p_a
    top -10px
    right 0
    transform translate3D(-50%, -50%, 0)
    
    
</style>
