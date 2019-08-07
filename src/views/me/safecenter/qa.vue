<template lang="pug">
f7-page.safecenter_qa
  f7-navbar(:innerClass=" 'navbar_of_' + $options.name " :title=" v.n + v.txt " back-link)
  .t_c.pd_20
    f7-icon._icon.v_t(:class=" '_safeicon' + v._icon + '_big' " f7="home" size="60")

  f7-list.mg_0(inline-labels no-hairlines ref="_form")
    f7-list-item(title="问题一" smart-select='' :smart-select-params="{openIn: 'sheet'}" ref="q1")
      select(name="q1" v-model=" form.i " required validate)
        option(v-for=" (v, i) in data " :key="i" :value="i" :disabled=" i === form.j ") {{ v.title }}
    
    f7-list-input(label="答案" type="text" required validate clear-button :value=" form.a1 " @input=" form.a1 = $event.target.value ")

    f7-list-item(title="问题二" smart-select='', :smart-select-params="{openIn: 'sheet'}" ref="q2" required validate)
      select(name="q2" v-model=" form.j ")
        option(v-for=" (v, i) in data " :key="i" :value="i" :disabled=" i === form.i ") {{ v.title }}

    f7-list-input(label="答案" type="text" required validate clear-button :value=" form.a2 " @input=" form.a2 = $event.target.value ")

  .h_40
  f7-button.mg_10(fill @click=" __validateform(setSafeQuestion) ") 确认


</template>

<script>
import config from '@/config'
import api from '@/api'
export default {
  mixins: [config],
  components: {
  },
  name: 'safecenter_qa',
  props: ['v'],
  data () {
    return {
      data: null,
      form: {
        i: '',
        j: '',
        a1: '',
        a2: '',
      }
    }
  },
  computed: {
  },
  created () {
    this.safeQuestionList()
  },
  methods: {
    safeQuestionList () {
      this.$.get(api.safeQuestionList).then(({data: {allQuestions}}) => {
        this.data = allQuestions
      })
    },
    setSafeQuestion () {
      this.$.post(api.setSafeQuestion, {
        question1: (this.data[this.form.i] || {}).title,
        question2: (this.data[this.form.j] || {}).title,
        answer1: this.form.a1,
        answer2: this.form.a2,
      }).then(this.__back)
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.safecenter_qa 
  .item-after
    margin-left 0
    width 62%
  
</style>
