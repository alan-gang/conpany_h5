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
  props: ['n', 'plat', 'pid', 'gid', 'outer'],
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
        isMobileUrl: 1,
      }).then(({data: {url, userName, password}}) => {
        if (userName && password) {
          url = '/pt_egame/index.html' + '?un=' + userName + '&pwd=' + password
        }
        url = (url || '').trim()
        setTimeout(() => {
          if (this.outer || !(url.startsWith(window.location.protocol) || url.startsWith('/'))) {
            this.$f7.dialog.confirm('前往' + this.n + '?', '', () => window.open(url))
            this.__back()
            return false
          }
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
