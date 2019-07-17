<template lang="pug">

f7-page.bgc_f7
  f7-navbar(title="玩法介绍" back-link)
  f7-list.bgc_f7.mg_0.no_border(no-hairlines).p_list
    ul.z_9997
      f7-list-item.ft_16.bgc_f.mt_10(v-for=" t in tagList " :title=" t.tagname " :id=" t.id " @click=" __go('/me/help/detailpage/', {props: {id: t.id, title: t.tagname }}) ")

</template>

<script>
import config from '@/config'
import api from '@/api'
export default {
  mixins: [config],
  components: {
  },
  name: 'howtoplay',
  props: [],
  data () {
    return {
      subject: 'game',
      tagList: []
    }
  },
  created () {
    this.getHelpTag()
  },
  methods: {
    getHelpTag () {
      this.$.get(api.getHelpTag, {subject: this.subject}).then(({data: {tagList}}) => {
        this.tagList = tagList
      })
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.p_list ul
  background #f7f7f7
</style>
