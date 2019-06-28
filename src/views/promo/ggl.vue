<template lang="pug">

.pd_15.p_r.p_r
  img.wp_100(:src=" imgs[0] ")
  f7-link.p_a.p_t_5.p_r_5(popover-close=".ggl" color='white' icon-f7='close_round_fill')
  .p_a.p_l_0.p_r_0.pd_15.t_c.c_f
    .ft_12 客官，当前还有{{ remainingNumber }}次机会
    
    .h_10

    .box.mg_0a.wp_60.hp_70.text-color-red.p_r.pd_10.flex(:style=" {backgroundImage: `url(${imgs[2]})`} ")
      .pd_20.wp_100.ft_12
        .a(v-if=" userPrize ") 恭喜，中奖了
          .ft_18 {{ userPrize }}
            span 元
        .b(v-else) 很抱歉，什么都没有

        .h_10
        .c.wp_70.mg_0a
          f7-button.ft_12(fill small @click=" getScratchPrize ") 再刮一张
      
      .canvas.p_a(ref="cb" v-if=" !finished ")
        img.hide(:src=" imgs[1] " ref="img" @load="drawing")
        canvas(ref="canvas" @touchmove.prevent.stop="scraping" style="width: 100%; height: 100%")


</template>

<script>
import config from '@/config'
import api from '@/api'
export default {
  mixins: [config],
  components: {
  },
  name: 'ggl',
  props: [],
  data () {
    return {
      imgs: [
        '/static/img/ggl/1.png',
        '/static/img/ggl/2.png',
        '/static/img/ggl/3.png',
      ],
      remainingNumber: 0,
      ctx: null,
      ctxsize: null,
      userPrize: 0,
      scratchId: 0,
      finished: false,
    }
  },
  mounted () {
    this.__getUserScratch()
  },
  methods: {
    __getUserScratch () {
      this.$.get(api.getUserScratch).then(({data: {remainingNumber}}) => {
        this.remainingNumber = remainingNumber
        !this.finished && this.remainingNumber && this.getScratchPrize()
      })
    },
    getScratchPrize (a) {
      this.$.get(api.getScratchPrize).then(({data: { userPrize, scratchId }}) => {
        this.userPrize = userPrize
        this.scratchId = scratchId
        this.finished = false
      })
    },
    finishScratchPrize () {
      this.finished = true
      this.$.get(api.finishScratchPrize, {entry: this.scratchId}).then(({data}) => {
        this.__setCall({fn: '__getUserScratch'})
      })
    },
    drawing () {
      this.ctx = this.$refs['canvas'].getContext('2d')
      this.ctx.drawImage(this.$refs['img'], 0, 0)
      this.ctx.globalCompositeOperation = 'destination-out'
    },
    scraping (e) {
      if (!this.remainingNumber) return
      let {pageX, pageY} = e.touches[0]
      let el = e.target
      let pos = el.getBoundingClientRect()
      let rate = (document.body.offsetWidth - pos.left) / pos.width
      let x = (pageX - pos.left)
      let xx = x * rate
      let y = pageY - pos.top
      this.ctx.beginPath()
      this.ctx.arc(xx, y, 20, 0, Math.PI * 2)
      this.ctx.fill()
      // console.log(x, (pos.width / 2.5), (pos.width / 1.5), ':', y, (pos.height / 2.5), (pos.height / 1.5))
      if (x > (pos.width / 2.5) && x < (pos.width / 1.5) && y > (pos.height / 2.5) && y < (pos.height / 1.5)) this.finishScratchPrize()
    },
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus' 
// 建议不添加scoped， 所有样式最多嵌套2层
.ggl
  .p_a.p_l_0
    top 24%
    height 66%
  .box
    background-size 100%
    background-repeat no-repeat
  .canvas
    top 10px
    left 10px
    right 10px
    bottom 15px
      
</style>
