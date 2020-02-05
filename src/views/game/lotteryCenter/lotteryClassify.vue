<template lang="pug">
f7-page.lottery-classify()
  f7-navbar(innerClass="lottery-list-title" back-link :no-hairline="true" title="彩种显示")

  .classify-container
    div.list-container.mb_20(v-for="item in resultList" :key="item.id")
      .classify-title.mb_10.ml_3 {{item.title}}
      .classify-content-wrapper
        span.ml_3.mr_3(:class="{on:saveArr.some(i => i.id == o.id )}" v-for="o in item.list" :key="item.lotteryid" @click="changeStyle(o,item)") {{o.n}}


  f7-toolbar(bottom)
    f7-button.same.check-all(fill color="orange" @click.native="checkAll") 全选
    f7-button.same.invert-check(fill color="orange" @click.native="invertClick ") 反选
    span.pd_40
    f7-button.same.confirm(fill @click=" __go('/me/xyb/io/') ") 确定
</template>

<script>
import config from '@/config'
// import g from '@/gm/g'
export default {
  mixins: [config],
  components: {
  },
  name: 'lottery-classify',
  props: {
    list: Array
  },
  created () {
  },
  data () {
    return {
      saveArr: [],
    }
  },
  methods: {
    changeStyle (o, item) {
      o.isChecked = !o.isChecked
      if (o.isChecked) {
        this.saveArr.push(o)
      } else {
        let index = this.saveArr.findIndex(item => item.id === o.id)
        this.saveArr.splice(index, 1)
      }
    },
    checkAll () {
      this.saveArr = []
      this.resultList.forEach(item => {
        item.list.forEach(innerItem => {
          innerItem.isChecked = true
          this.saveArr.push(innerItem)
        })
      })
    },
    invertClick () {
      this.saveArr = []
      this.resultList.forEach(item => {
        item.list.forEach(innerItem => {
          innerItem.isChecked = !innerItem.isChecked
          innerItem.isChecked && this.saveArr.push(innerItem)
        })
      })
    }
  },
  computed: {
    resultList: {
      get () {
        let arr = []
        let obj = {}
        this.list.forEach(item => {
          !obj[item.gn] && (obj[item.gn] = item.gn)
        })
        Object.keys(obj).forEach(key => {
          arr.push({ title: key, list: [] })
        })
        this.list.forEach(o => {
          o.isChecked = false
          arr.forEach(item => {
            (item.title === o.gn) && item.list.push(o)
          })
        })
        return arr
      },
    }
  }
}
</script>

<style lang="stylus">
  @import '~@/css/common.stylus'
  @import '~src/css/var.stylus'

  .lottery-classify
    .classify-container
      padding 4.03vw 5.07vw
      .classify-title
        font-family: PingFang-SC-Bold;
        font-size: 3.62vw;
        font-weight: bold;
        color: #ff5429;
      .classify-content-wrapper
        flex(flex-start,,wrap)
        span
          width: 27.78vw;
          height: 7.73vw;
          line-height: 7.73vw;
          background-color  #f7f7f7
          border-radius: 0.48vw;
          text-align center
          margin-bottom 2.58vw
          color #333
          border: solid 0.08vw #f4f4f4;
          &.on
            color #fff
            background-image: linear-gradient(90deg,
            #ffbb24 0%,
            #f78f1c 100%),
            linear-gradient(
            #e8e8e8,
            #e8e8e8);
            background-blend-mode: normal,
            normal;
    .toolbar-bottom
      height  14.91vw
      .same
        heihgt 8.86vw
        line-height 8.86vw
      .check-all
        width: 16.1vw;
        background-image: linear-gradient(90deg,
        #32d96a 0%,
        #08c0a0 100%),
        linear-gradient(
        #ffffff,
        #ffffff);
      .invert-check
        width: 16.1vw;
        background-image: linear-gradient(90deg,
        #fc844f 0%,
        #ff4a5c 100%),
        linear-gradient(
        #ffffff,
        #ffffff);
      .confirm
        width: 35.43vw;
        background-image: linear-gradient(90deg,
        #ff8331 0%,
        #ff5429 100%),
        linear-gradient(
        #ffffff,
        #ffffff);
</style>
