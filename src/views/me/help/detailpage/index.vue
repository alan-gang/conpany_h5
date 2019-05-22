<template lang="pug">

f7-page.bgc_f.help_de
  f7-navbar(:title=" title " back-link)
  f7-list.bgc_f.mg_0.no_border(no-hairlines).p_list
    f7-block.c_3.ft_16.wp_100.bgc_f.de_title.z_9999(v-if=" contitle ") {{ contitle }}
    ul.z_9998.bgc_f.mt_10
      template(v-if=" subList.length ")
        f7-list.de_list.ft_16.mt_1.bgc_f.pt_15.pb_15(v-for=" s in subList ")
          p.btn_detail.wp_90.c_f.ft_16.hlh_40.t_c(v-if=" s.title ") {{ s.title }}
          template(v-if=" s.subList.length ")
            f7-list.de_slist.wp_90(v-for=" c in s.subList ")
              p.c_0.ft_16.t_l {{ c.title }}
              p.de_con.c_6.ft_14.t_c {{ c.content }}
          template(v-else)
            p.de_con.wp_90.c_3.ft_14.m0t.pt_10 {{ s.content }}
      template(v-else)
        f7-list.de_list.ft_16.mt_1.bgc_f.pt_15.pb_15(v-for=" s in subList ")
          p.btn_detail.wp_90.c_f.ft_18.hlh_40.t_c {{ s.title }}
          p.de_con.c_3.ft_14.t_c {{ s.content }}

</template>

<script>
import config from '@/config'
import api from '@/api'
export default {
  mixins: [config],
  components: {
  },
  name: 'detailpage',
  props: ['id', 'title'],
  data () {
    return {
      contitle: '',
      subList: [],
      content: ''
    }
  },
  created () {
    this.getHelpContent()
  },
  methods: {
    getHelpContent () {
      this.$.get(api.getHelpContent, {id: this.id}).then(({data: {content}}) => {
        // console.log(content[0].value[0])
        // if (this.content.length) {
        //   if (this.content[0].value.length && this.content[0].value[0].subList.length) {
        //     this.subList = content[0].value[0].subList
        //   } else if (this.content[0].value.length && this.content[0].value.length >= 1) {
        //     this.subList = content[0].value[0].subList
        //   }
        // }
        if (content[0].value[0].subList.length >= 1) {
          this.contitle = content[0].value[0].content
          this.subList = content[0].value[0].subList
        } else {
          this.subList = content[0].value
        }
        // console.log(this.subList)
      })
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.help_de
  .de_title
    // position fixed
    margin 0 auto
    padding 20px
    text-indent 10px
.btn_detail
  display block
  border none
  background-image: linear-gradient(90deg,
    #ffbe41 0%,
    #ff9d20 100%),
  linear-gradient(
    #ffffff,
    #ffffff);
  background-blend-mode normal,normal
  border-radius 34px
  margin 0 auto
.de_list
  margin 10px auto 10px
.de_slist
  margin 0 auto
  .de_con
    text-align justify
.m0t
  margin 0 auto
</style>
