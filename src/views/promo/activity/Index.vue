<template lang="pug">

f7-page.activity(:page-content="false")
  f7-toolbar(tabbar top scrollable style="transform: none")
    f7-link(tab-link tab-link-active href="#activity_1") 
      f7-button(round fill color="gray") 全部
    f7-link(tab-link href="#activity_2" ) 
      f7-button(round fill color="gray") 限时活动
    f7-link(tab-link href="#activity_3" ) 
      f7-button(round fill color="gray") 长期活动

  f7-tabs(animated swipeable)
    f7-tab#activity_1(tab-active)
      f7-page(ptr :ptr-mousewheel="true" @ptr:refresh="refresh")
        f7-link.ml_10.mr_10.mt_5.mb_5(:key=" v.title " v-for=" v in activityList " @click=" __go('/frame/', {props: {title: v.title, url: '/xy_activity' + v.mobilePageUrl.split('xy_activity')[1] }}) " )
          img.wp_100.r_5(:src=" v.mobilePicPath " )

        .pd_15.t_c.text-color-gray(v-if=" !activityList[0] ") 暂无活动~


    f7-tab#activity_2.page-content
      f7-page(ptr :ptr-mousewheel="true" @ptr:refresh="refresh")
        f7-link.ml_10.mr_10.mt_5.mb_5(:key=" v.title " v-for=" v in activityList.filter(x => x.label === '限时活动') " @click=" __go('/frame/', {props: {title: v.title, url: '/xy_activity' + v.mobilePageUrl.split('xy_activity')[1] }}) " )
          img.wp_100.r_5(:src=" v.mobilePicPath ")

        .pd_15.t_c.text-color-gray(v-if=" !activityList.filter(x => x.label === '限时活动')[0] ") 暂无活动~


    f7-tab#activity_3.page-content
      f7-page(ptr :ptr-mousewheel="true" @ptr:refresh="refresh")
        f7-link.ml_10.mr_10.mt_5.mb_5(:key=" v.title " v-for=" v in activityList.filter(x => x.label !== '长期活动') " @click=" __go('/frame/', {props: {title: v.title, url: '/xy_activity' + v.mobilePageUrl.split('xy_activity')[1] }}) " )
          img.wp_100.r_5(:src=" v.mobilePicPath ") 

        .pd_15.t_c.text-color-gray(v-if=" !activityList.filter(x => x.label !== '长期活动')[0] ") 暂无活动~

  


</template>

<script>
import config from '@/config'
import api from '@/api'
export default {
  mixins: [config],
  components: {
  },
  name: 'activity',
  props: [],
  data () {
    return {
      activityList: []
    }
  },
  created () {
    this.getAllActivityList()
  },
  methods: {
    refresh (evt, done) {
      this.getAllActivityList()
      setTimeout(done, 1000)
    },
    getAllActivityList () {
      this.$.get(api.getAllActivityList).then(({data: {activityList}}) => {
        this.activityList = activityList
      })
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
    
</style>
