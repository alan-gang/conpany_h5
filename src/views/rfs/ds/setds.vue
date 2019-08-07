<template lang="pug">
f7-page.set_daysalary
  f7-navbar(:innerClass=" 'navbar_of_' + $options.name " title="设置日工资" back-link)
  .hlh_45.pl_10.pr_10.bgc_f.ft_18
    span 下级用户：
    span {{ v.userName }}
  

  f7-list.mt_5.mb_5(inline-labels no-hairlines ref="_form")
    //- f7-list-input(label="团队销量≥" after="万")

    f7-list-input(label="团队销量：≥" validate required pattern="[0-9]+" type="number" min="0" max='10000', step='1' :value=" form.i " @input=" form.i = $event.target.value ")
      span(slot="inner-end") 万

    f7-list-input(label="有效人数：≥" validate required pattern="[0-9]+" type="number" min="0" max='10000', step='1' :value=" form.j " @input=" form.j = $event.target.value ")
      span(slot="inner-end") 人
    
    f7-list-item(title="工资级别：" type="select" placeholder="请选择工资级别" smart-select :smart-select-params="{openIn: 'sheet'}")
      select(v-model=" form.k ")
        option(v-for=" (x, i) in parseInt(max / 10) " :value=" x * 10 ") {{ x * 10 }}
  
  .h_40
  f7-button.mg_10(fill large @click=" __validateform(setSalary) ") 确定

  f7-block.ft_12.text-color-gray 设置说明：
    br
    | 1.工资级别，例如：1万50，表示：团队销量每1万元，可获得50元日工资，销量不足1万时，按比例计算。
    br
    | 2.设置 “团队销量” 与 “有效人数” 后，未若达到对应的销量要求或人数要求，则没有日工资。若不想设定要求，请设置为0。
    br
    | 3.有效人数，是指当日投注500元以上的用户的人数。





</template>

<script>
import config from '@/config'
import api from '@/api'
export default {
  mixins: [config],
  components: {
  },
  name: 'set_daysalary',
  props: ['v', 'max'],
  data () {
    return {
      form: {
        i: '',
        j: '',
        k: '',
      }
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
  },
  methods: {
    setSalary () {
      this.$.get(api.setSalary, {
        userId: this.v.userId,
        teamSale: this.form.i,
        activityCount: this.form.j,
        salary: this.form.k,
      }).then(this.__back)
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
// .set_daysalary

</style>
