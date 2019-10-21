<template lang="pug">
.ludan-view
  .ludan-header
    div.icon
      span.left(v-show="ludanIndex > 0" @click="ludanPre")
    span.middle 路单（{{ titleName }}）
    div.icon
      span.right(v-show="ludanIndex < navLen - 1" @click="ludanNext")
  .ludan-row
    .ludan-col(v-for="(c, i) in maxColumns" v-bind:key="i")
      template(v-for="(r, j) in maxRows")
        div.ludan-item(v-bind:key="j" v-if="j === maxRows.length - 1")
          span(class="open-item text-align-center" v-bind:class="getCellStyle(ludanList, i, j, maxRows)") {{ getCellData(ludanList, i, j) | cellData }}
        div.ludan-item(v-bind:key="j" v-else)
          span(class="open-item text-align-center" v-bind:class="getCellStyle(ludanList, i, j, maxRows)") {{ getCellData(ludanList, i, j, maxRows) === 'icon-cur' ? '' : (getCellData(ludanList, i, j, maxRows) || '.') }}
</template>

<script>
import ludanMethods from '../util/ludanMethods'
export default {
  name: 'ludan',
  data () {
    return {
      ludanMethods,
      issueList: [],
      ludanList: [],
      ludanIndex: 0,
      titleMap: {
        SSC: ['万千', '万百', '万十', '万个', '千百', '千十', '千个', '百十', '百个', '十个'],
        PK10: ['冠军vs第十名', '亚军vs第九名', '季军vs第八名', '第四名vs第七名', '第五名vs第六名'],
        '115': ['一二位', '一三位', '一四位', '一五位', '二三位', '二四位', '二五位', '三四位', '三五位', '四五位']
      }
    }
  },
  props: {
    maxColumns: {
      type: Number,
      default: 18
    },
    maxRows: {
      type: Number,
      default: 6
    },
    gameType: String,
    gameid: Number,
    show: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    methodName () {
      let map = {
        SSC: ['1v2', '1v3', '1v4', '1v5', '2v3', '2v3', '2v5', '3v4', '3v5', '4v5'],
        PK10: ['1v10', '2v9', '3v8', '4v7', '5v6'],
        '115': ['1v2', '1v3', '1v4', '1v5', '2v3', '2v3', '2v5', '3v4', '3v5', '4v5']
      }
      if (map[this.gameType]) {
        return map[this.gameType][this.ludanIndex]
      }
      return ''
    },
    titleName () {
      if (this.titleMap[this.gameType]) {
        return this.titleMap[this.gameType][this.ludanIndex]
      }
      return ''
    },
    navLen () {
      if (this.titleMap[this.gameType]) {
        return this.titleMap[this.gameType].length
      }
      return ''
    }
  },
  filters: {
    cellData (value) {
      return ['icon-cur', 'icon-qs'].indexOf(value) !== -1 ? '' : value
    }
  },
  watch: {
    methodName () {
      this.setLudanList()
    }
  },
  created () {
    this.$bus.$on('resetLudan', items => {
      this.issueList = items.map(item => item).reverse()
      this.setLudanList()
    })
    this.$bus.$on('changeLhIndex', idx => {
      this.ludanIndex = idx
    })
  },
  methods: {
    ludanPre () {
      if (this.ludanIndex - 1 >= 0) {
        this.ludanIndex -= 1
        this.$bus.$emit('ludanIndex', this.ludanIndex)
      }
    },
    ludanNext () {
      if (this.ludanIndex + 1 < this.navLen) {
        this.ludanIndex += 1
        this.$bus.$emit('ludanIndex', this.ludanIndex)
      }
    },
    setLudanList () {
      this.ludanList = this.getLuDanListByMethod(this.issueList, this.gameType, this.methodName, this.maxRows, this.maxColumns)
    },
    getMethodDataByName (type, name) {
      return this.ludanMethods.find((m) => {
        return type === m.type && name === m.method
      })
    },

    getLHHValueByPos (data, pos) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].pos === pos) {
          return data[i].val
        }
      }
    },

    getLuDanListByMethod (issueList, type, name, maxRows, maxColumns) {
      if (!issueList || issueList.length < 1 || !name) {
        return []
      }
      const mObj = this.getMethodDataByName(type, name)
      if (!mObj) {
        return []
      }
      let ludanItems = []
      let item = ''
      let ludanList = []
      let codeStyles
      issueList.forEach((issue, i) => {
        codeStyles = JSON.parse(issue.codeStyle || '[]')
        codeStyles.forEach((cs, j) => {
          if (cs.methodId.indexOf(mObj.methodId) !== -1) {
            switch (mObj.method) {
              case 'zh_dx':
              case 'zh_ds':
              case 'zhw_wsdx':
              case 'zhw_wsds':
                item = cs.value[0][mObj.method.split('_')[1]]
                break
              case '1v2':
              case '1v3':
              case '1v4':
              case '1v5':
              case '2v3':
              case '2v4':
              case '2v5':
              case '3v4':
              case '3v5':
              case '4v5':
              case '1v10':
              case '2v9':
              case '3v8':
              case '4v7':
              case '5v6':
                item = this.getLHHValueByPos(cs.data, mObj.method)
                break
              case 'ww_dx':
              case 'ww_ds':
              case 'qw_dx':
              case 'qw_ds':
              case 'bw_dx':
              case 'bw_ds':
              case 'sw_dx':
              case 'sw_ds':
              case 'gw_dx':
              case 'gw_ds':
                item = cs.value[mObj.pos][mObj.method.split('_')[1]]
                break
              default:
                break
            }
            if (ludanItems.indexOf(item) !== -1) {
              ludanItems.push(item)
            } else {
              if (ludanItems.length > 0) {
                ludanList.push(ludanItems)
                ludanItems = []
              }
              ludanItems.push(item)
            }
            // 最个一个
            if (issueList.length - 1 === i) {
              if (ludanItems.length < maxRows) {
                ludanItems.push('icon-cur')
                ludanList.push(ludanItems)
                ludanItems = []
              } else {
                ludanList.push(ludanItems)
                ludanItems = []
                ludanItems.push('icon-cur')
                ludanList.push(ludanItems)
              }
            }
          }
        })
      })
      return ludanList.slice(ludanList.length >= maxColumns ? Math.abs(ludanList.length - maxColumns + 1) : 0)
    },

    getCellData (ludanList, c, r, maxRows) {
      if (!ludanList || !ludanList.length) return ''
      if (ludanList[c] && ludanList[c][r]) {
        if (['icon-cur', 'icon-qs'].indexOf(ludanList[c][r]) !== -1) {
          return ludanList[c][r]
        }
        if (r === maxRows - 1 && ludanList[c].length > maxRows) {
          return String(ludanList[c].length)
        } else {
          return ludanList[c][r]
        }
      } else {
        return ''
      }
    },

    getCellStyle (ludanList, col, row, maxRows) {
      if (this.getCellData(ludanList, col, row, maxRows) === 'icon-cur') return 'icon-cur'
      if (this.getCellData(ludanList, col, row, maxRows) === 'icon-qs') return 'icon-qs'
      return this.getStyle(this.getCellData(ludanList, col, row, maxRows))
    },

    getStyle (d) {
      switch (d) {
        case '大':
        case '单':
        case '龙':
        case '总大':
        case '总单':
        case '和尾大':
          return 'ball border-red'
        case '小':
        case '总小':
        case '双':
        case '总双':
        case '虎':
        case '和尾小':
          return 'ball border-blue'
        case '和':
        case '30':
        case '11':
          return 'ball border-green'
        default:
          if (/\d/.test(d)) return 'ball broder-yellow'
          return ''
      }
    }
  }
}
</script>

<style lang="stylus">
  .ludan-view
    position absolute
    width 100%
    bottom 40px
    left 0
    background: #fff
    .ludan-header
      display flex
      justify-content space-between
      color #f67c21
      line-height 30px
      border-bottom 1px solid #e3e3e3
      font-size 12px
      .icon
        width 30px
        height 30px
      .left
      .right
        display inline-block
        width 30px
        height 30px
        background-repeat no-repeat
        background-size auto 42%
        background-position center center
        &.left
          background-image url('~@/assets/ludan/zh_ld_Left@2x.png')
        &.right
          background-image url('~@/assets/ludan/zh_ld_right@2x.png')
    .ludan-row
      display flex
      .ludan-col
        flex 1
        .ludan-item
          text-align center
          span
            display inline-block
            width 16px
            height 16px
            line-height 16px
            font-size 10px
            color #666
          .ball
            border-radius 50%
            background-repeat no-repeat
            background-size contain
            background-position center
    .border-red
      background-image url('~@/assets/ludan/zh_ld_l@2x.png')
    .border-blue
      background-image url('~@/assets/ludan/zh_ld_h@2x.png')
    .border-green
      background-image url('~@/assets/ludan/zh_ld_he@2x.png')

</style>
