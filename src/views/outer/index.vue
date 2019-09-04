<template lang="pug">

f7-page
  f7-navbar(:innerClass=" 'navbar_of_' + $options.name " back-link :title=" n ")
  
</template>
<script>
import config from '@/config'
import api from '@/api'
export default {
  mixins: [config],
  components: {
  },
  name: 'outer',
  props: ['n', 'plat', 'pid', 'gid'],
  data () {
    return {
    }
  },
  created () {
    this.gameUrl()
  },
  methods: {
    gameUrl () {
      this.$.get(api.gameUrl, {
        platid: this.pid,
        gameid: this.gid,
      }).then(({data: {url, userName, password}}) => {
        if (userName && password) {
          // eg. /pt_egame/index.html?un=XYXYCLAIREBB&pwd=nedgjqpt
          url = '/pt_egame/index.html' + '?un=' + userName + '&pwd=' + password
        }
        setTimeout(() => {
          this.__go('/frame/', { reloadCurrent: true, ignoreCache: true, props: { title: this.n, url: url || 'http://www.baidu.com' } })
        }, 1000)
      })
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
</style>
