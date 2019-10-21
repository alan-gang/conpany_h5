<template lang="pug">


.info_lucks
  .data-table.p_a.bg-color-white
    table
      thead
        tr
          td.label-cell.t_r.wp_15 期号
          td.label-cell.t_c.wp_50 开奖号码
          td.label-cell.t_c.wp_35(v-if=" ccs " )
            pre.inlb.mg_0
              span(v-if="titleName") {{ titleName }}
              template(v-else)
                span(v-for=" t in  ccs.title ") {{ t }}

  f7-page.bg-color-white(infinite :infinite-distance="50" :infinite-preloader="showPreloader" @infinite="loadMore" ptr :ptr-mousewheel="true" @ptr:refresh="refresh")
    .data-table
      table
        tbody
          tr(v-for=" (r, i) in data " :key="i")
            td.label-cell.t_r.wp_15 {{ r.issue.slice(-6) }}
            td.label-cell.t_c.wp_50
              lucknumbers(:luckn=" r.code.split(',') " :isLh="titleName" :arrSection="arrSecction")
            td.label-cell.t_c.wp_35(v-if=" ccs " )
              span(v-if="titleName" v-bind:class=" colorOfV(longhuVal(row_ccs(r).data)) ") {{ longhuVal(row_ccs(r).data) }}
              pre.mg_0.cac.inlb(v-if=" !titleName && codeStyle && row_ccs(r) ")
                span(v-if=" row_ccs(r) && !row_ccs(r).value.join ") row_ccs(r).value
                span(v-if=" row_ccs(r) && row_ccs(r).value.join " v-for=" (v, i) in  row_ccs(r).value" v-bind:class=" colorOfV(v) ") {{ v }}
</template>

<script>
import config from '@/config'
import api from '@/api'
import page from '@/components/page'
import lucknumbers from './info_luck_numbers'
export default {
  mixins: [config, page],
  components: {
    lucknumbers,
  },
  name: 'info_lucks',
  props: ['id', 'mid', 't'],
  data () {
    return {
      data: [],
      ludanIndex: 0,
      titleMap: {
        SSC: ['万千', '万百', '万十', '万个', '千百', '千十', '千个', '百十', '百个', '十个'],
        PK10: ['一VS十', '二VS九', '三VS八', '四VS七', '五VS六'],
        '115': ['一二位', '一三位', '一四位', '一五位', '二三位', '二四位', '二五位', '三四位', '三五位', '四五位']
      }
    }
  },
  computed: {
    // 控制路单是否展示  判断是否为龙虎
    ludanShow () {
      return ['1200', '1202', '4011', '4012', '2035'].includes(this.methodid)
    },
    // 龙虎路单
    titleName () {
      if (this.ludanShow) {
        if (this.titleMap[this.t.toUpperCase()]) {
          return this.titleMap[this.t.toUpperCase()][this.ludanIndex]
        }
      }
      return ''
    },

    arrSecction () {
      let map = {
        SSC: ['1v2', '1v3', '1v4', '1v5', '2v3', '2v4', '2v5', '3v4', '3v5', '4v5'],
        PK10: ['1v10', '2v9', '3v8', '4v7', '5v6'],
        '115': ['1v2', '1v3', '1v4', '1v5', '2v3', '2v4', '2v5', '3v4', '3v5', '4v5']
      }
      let m = map[this.t.toUpperCase()] || {}
      let temp = m[this.ludanIndex] ? m[this.ludanIndex].split('v') : ['-1', '-1']
      return temp
    },

    methodid () {
      return this.mid.split(':')[0]
    },
    codeStyle () {
      return this.data[0] && this.data[0].codeStyle ? this.data[0].codeStyle : ''
      // return ''
    },
    cs () {
      return this.codeStyle ? JSON.parse(this.codeStyle) : []
    },
    ccs () {
      let temp = this.cs.filter(x => (x.methodId || []).indexOf(this.methodid) !== -1)
      return temp[0]
    }
  },
  created () {
    this.$bus.$on('changeLhIndex', idx => {
      this.ludanIndex = idx
    })
    this.$bus.$on('ludanIndex', idx => {
      this.ludanIndex = idx
    })
  },
  beforeDestroy () {
  },
  methods: {
    // 龙虎路单近期开奖值
    longhuVal (arr) {
      let map = {
        SSC: ['1v2', '1v3', '1v4', '1v5', '2v3', '2v3', '2v5', '3v4', '3v5', '4v5'],
        PK10: ['1v10', '2v9', '3v8', '4v7', '5v6'],
        '115': ['1v2', '1v3', '1v4', '1v5', '2v3', '2v3', '2v5', '3v4', '3v5', '4v5']
      }
      let m = map[this.t.toUpperCase()] || {}
      let temp = arr.filter(item => item.pos === m[this.ludanIndex])[0]
      if (temp) {
        return temp.val
      }
      return ''
    },
    __setTab_1 () {
      this.list()
    },
    list (option = {pageNum: 1, page: 1, pageSize: this.pageSize, size: this.pageSize}, cb = this.defaultListCb) {
      this.$.get(api.recentlyCode, Object.assign({
        gameid: this.id,
      }, option)).then(({data: {items, totalSize}}) => {
        this.data = [...(option.page > this.fpage ? this.data : []), ...items]
        this.total = totalSize
        cb && cb(items)
      })
    },
    row_cs (row) {
      return row.codeStyle ? JSON.parse(row.codeStyle) : ''
    },
    row_ccs (row) {
      return (this.row_cs(row) || []).filter(x => (x.methodId || []).indexOf(this.methodid) !== -1)[0]
    },
    setPosColor (i) {
      if (this.ccs) {
        switch (this.ccs.pos) {
          case 'q5':
            if (i < 5) return 'text-blue'
            break
          case 'q4':
            if (i < 4) return 'text-blue'
            break
          case 'q2':
            if (i < 2) return 'text-blue'
            break
          case 'q3':
            if (i < 3) return 'text-blue'
            break
          case 'z3':
            if (i < 4 && i > 0) return 'text-blue'
            break
          case 'h2':
            if (i > 2) return 'text-blue'
            break
          case 'h3':
            if (i > 1) return 'text-blue'
            break
          case 'h4':
            if (i > 0) return 'text-blue'
            break
        }
      } else {
        return ''
      }
    },
    colorOfV (v) {
      switch (v) {
        // 五星
        case '组选120':
        case '组选24':
        case '组六':
        case '顺子':
        case '大单':
        case '龙':
          return 'type-color-1'
        case '组选60':
        case '组选12':
        case '组三':
        case '对子':
        case '大双':
        case '虎':
        case '牛1':
        case '牛2':
        case '牛3':
        case '牛4':
        case '牛5':
          return 'type-color-2'
        case '组选30':
        case '组选6':
        case '豹子':
        case '小单':
        case '和':
        case '牛6':
        case '牛7':
        case '牛8':
        case '牛9':
        case '牛牛':
          return 'type-color-3'
        case '组选20':
        case '组选4':
        case '小双':
          return 'type-color-4'
        case '组选10':
          return 'type-color-5'
        case '组选5':
        case '没牛':

          return 'type-color-6'
        default:
          return 'type-color-6'
      }
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.info_lucks
  height 100%
  width 100%

  &>.page
    .page-content
      padding-top 32px

  th, td
    padding 5px
    height 30px !important
  .data-table.p_a
    top 0
    left 0
    right 0
    z-index 9000

  .type-color-1
    color #1f8eec
  .type-color-2
    color #10c614
  .type-color-3
    color #e850ff
  .type-color-4
    color #c29909
  .type-color-5
    color #f17d0b
  .type-color-6
    color #000

</style>
