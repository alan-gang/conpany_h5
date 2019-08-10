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
      // setTimeout(() => {
      //   return this.__go('/frame/', { reloadCurrent: true, ignoreCache: true, props: { title: this.n, url: 'https://www.51yzapp.com/gamehall/index.html?token=C0F43CD416E37DD2DA78EBF7511599EE' } })
      // }, 1000)
      this.$.get(api.gameUrl, {
        platid: this.pid,
        gameid: this.gid,
      }).then(({data: {url, userName, password}}) => {
        // '?un=' + data.userName + '&pwd=' + data.password
        setTimeout(() => {
          this.__go('/frame/', { reloadCurrent: true, ignoreCache: true, props: { title: this.n, url: url || 'http://www.baidu.com' } })
        }, 500)
      })
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
</style>
