<template lang="pug">
f7-page
  f7-navbar(:innerClass=" 'navbar_of_' + $options.name " :title=" v.n + v.txt " back-link)
  .t_c.pd_20
    f7-icon._icon.v_t(:class=" '_safeicon' + v._icon + '_big' " f7="home" size="60")
  f7-list.mg_0(inline-labels no-hairlines-md ref="_form")
    f7-list-input(type="text" required validate minlength="2" validate-on-blur label="昵称" :placeholder=" user.greetMsg || '请输入问候语' " clear-button :value=" form.n " @input=" form.n = $event.target.value ")
  .h_40
  f7-button.mg_10(fill large @click=" __validateform(changNickName) ") 确认


</template>

<script>
import config from '@/config'
import api from '@/api'
export default {
  mixins: [config],
  components: {
  },
  name: 'safecenter_msg',
  props: ['v'],
  data () {
    return {
      form: {
        n: '',
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
      this.$.post(api.setGreetMsg, {greetMsg: this.form.n}).then(this.__back)
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
</style>
