<template lang="pug">

f7-page.notice(infinite :infinite-distance="50" :infinite-preloader="showPreloader" @infinite="loadMore" ptr :ptr-mousewheel="true" @ptr:refresh="refresh")
  f7-navbar(:innerClass=" 'navbar_of_' + $options.name " back-link title="系统公告")
  
  f7-card(v-for=" (v, i) in data " :key=" i + Math.random() ")
    f7-card-header {{ v.subject }}
    f7-card-content 
      pre {{ v.content }}
    f7-card-footer {{ v.sendTime }}

</template>

<script>
import config from '@/config'
import api from '@/api'
import page from '@/components/page'
export default {
  mixins: [config, page],
  components: {
  },
  name: 'notice',
  props: [],
  data () {
    return {
      data: [],

    }
  },
  computed: {
  },
  created () {
    this.list()
  },
  mounted () {
  },
  methods: {
    list (option = {page: 1, pageSize: this.pageSize}, cb = () => { this.currentPage = 1 }) {
      this.$.get(api.sysNotices, Object.assign({
      }, option)).then(({data: {sysNotices, totalSize}}) => {
        this.data = [...(option.page > this.fpage ? this.data : []), ...sysNotices]
        this.total = totalSize
        cb && cb(sysNotices)
      })
    },
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
    
</style>
