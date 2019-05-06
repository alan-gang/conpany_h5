<template lang="pug">
    
f7-page.speed.bg-color-deeporange
  f7-navbar
    f7-nav-left
      f7-link(text="取消" color="gray" popup-close="#speed")
    f7-nav-title 线路切换
  
  .mg_15.pd_20.bg-color-white.r_10.p_r.o_h(:key=" site.url " v-for=" (site, i) in sortedSites " @click=" window.location.href = site.url " :class=" { current: window.location.origin === site.url } ")
    .tag.bg-color-red.t_c(v-if=" !i ") 推荐
    .t_r {{ site.speed }}ms
    .t_r
      span.pr_10.inlb.v_m 线路{{ i+1 }}
      f7-progressbar.wp_80.inlb.h_10(:progress=" site.squares * 5 " :color=" getColors(site.squares) ")
  
  

</template>

<script>
import config from '@/config'
import api from '@/api'
export default {
  mixins: [config],
  components: {
  },
  name: 'speed',
  props: [],
  data () {
    return {
      sites: []
    }
  },
  computed: {
    sortedSites () {
      return this.sites.sort((a, b) => a.speed - b.speed)
    }
  },
  created () {
  },
  methods: {
    __getNewEnableLines () {
      this.getNewEnableLines()
    },
    getNewEnableLines () {
      this.$.get(api.getNewEnableLines).then(({data: {frontList}}) => {
        this.sites = Array(frontList.length).fill(0).map((x, i) => (x = {url: frontList[i].line, speed: 2000, squares: 2}))
        this.getSpeed()
      })
    },
    getSpeed (s) {
      this.sites.forEach((s, i) => {
        let n = document.createElement('script')
        let t = Date.now()
        n.setAttribute('src', s.url + '/dscagamesclient/login/lineTest.do?method=lineTest')
        n.onload = () => {
          s.speed = Date.now() - t
          s.squares = this.getSquares(s.speed)
        }
        n.onerror = () => {
          s.speed = 10000
          s.squares = this.getSquares(s.speed)
        }
        this.$el.appendChild(n)
      })
    },
    getColors (s) {
      if (s) {
        if (s < 5) {
          return 'red'
        } else if (s < 10) {
          return 'orange'
        } else if (s < 15) {
          return 'green'
        } else if (s < 20) {
          return 'blue'
        }
      }
      return 'red'
    },
    getSquares (s) {
      if (s) {
        if (s < 50) {
          return 19
        } else if (s < 100) {
          return 17
        } else if (s < 200) {
          return 15
        } else if (s < 300) {
          return 13
        } else if (s < 400) {
          return 11
        } else if (s < 500) {
          return 9
        } else if (s < 700) {
          return 7
        } else if (s < 900) {
          return 5
        } else if (s < 1000) {
          return 3
        } else if (s < 2000) {
          return 2
        } else if (s < 5000) {
          return 1
        }
      }
      return 0
    },
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.speed
  .tag
    position absolute
    top 0
    left 0
    height 40px
    line-height 40px
    width 100px
    transform rotateZ(-45deg) translateX(-20px) translateY(-25px)
    
</style>
