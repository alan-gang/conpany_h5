<template lang="pug">
f7-page
  f7-navbar(:title=" v.n + v.txt " back-link)
  .t_c.pd_20
    f7-icon._icon.v_t(:class=" '_safeicon' + v._icon + '_big' " f7="home" size="60")
  f7-list.mg_0(inline-labels no-hairlines-md ref="_form")
    template(v-if=" v.t ")
      f7-list-input(label='生日', required validate type='datepicker', :placeholder=" user.birthday ",  :calendar-params="{openIn: 'customModal', header: true, footer: true, dateFormat: 'yyyy-mm-dd'}" @calendar:change=" form.d = $event[0] ")
  .h_40
  f7-button.mg_10(fill large @click=" __validateform(changNickName) ") 确认
  //- .mg_10.c_g.ft_12 注： 密码长度6-12位，由数字、小写字符和大写字母组成，但必须至少包括2种字符


</template>

<script>
import config from '@/config'
import api from '@/api'
export default {
  mixins: [config],
  components: {
  },
  name: 'safecenter_birthday',
  props: ['v'],
  data () {
    return {
      form: {
        d: '',
      },
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
    changNickName () {
      this.$f7.input.validateInputs(this.$refs['_form'])
      this.$.get(api.setBirthday, {date: this.form.d._toDayString()})
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
</style>
