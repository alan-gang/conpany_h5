推广链接管理
<template lang="pug">

f7-page.linkadmin(:page-content="false")

  .p_a.wp_100.p_t_44.z_9503.ft_14.bgc_f
    .pd_10
      p.mt_0.mb_5.text-color-deeporange 汇总统计
      f7-row.t_c
        f7-col.bgc_f7.pd_5
          f7-icon(f7="person" color="orange")
          span 注册人数 11
        f7-col.bgc_f7.pd_5
          f7-icon(f7="hand_point_right_fill" color="orange")
          span  点击次数 22
      f7-button.ft_16.mt_10(fill large @click=" __go('/agent/editlink', {}) ") +新增

  .page-content.ptr-content.infinite-scroll-content(ptr-mousewheel="true" @ptr:refresh=" refresh " @infinite="loadMore" :infinite-distance="50")

    .ptr-preloader
      .preloader
      .ptr-arrow
    template(v-for=" (x, i) in data ")
      f7-card(:key="i")
        f7-card-header
          .a.ft_14
            span 链接地址
          div
            f7-button.inlb.mr_2(color="deeporange" outline small popover-open=".linkadmincdl" @click="row = x") 查看返水返点详情
            f7-button.inlb(color="deeporange" outline small @click="row = x, shwoActionSheet = !0 ") 操作...
        f7-card-header.ft_14
            div.ellipsis {{x.line}}

        f7-card-content.pt_0.pb_0
          .a.wp_33.inlb.v_t.mt_10.mb_10(v-for=" (y, j) in dns " :class=" { 't_r': j % 3 === 2, 't_c': j % 3 === 1 } ")
            .n.c_0.pb_5 {{ y.n }}
            .v.c_6 
              span(v-if="y.start") {{ y.start }}
              span(v-nwc=" y.nwc " v-state=" y.state ") {{ y.wrap ? y.wrap(x) : x[y.key] }}


    .preloader.infinite-scroll-preloader(v-if="showPreloader")

    .t_c.text-color-gray.pd_15.nomore --没有更多了--
  //-查看返水返点详情
  f7-popup.linkadmincdl.r_5.dialog-popup-auto-center.popup.full_w80.modal-out
    f7-navbar(title="查看返水返点详情")
      f7-nav-right
      f7-link(icon-f7="close" icon-size="40px" popup-close=".linkadmincdl")
    .pd_10
      f7-list.mg_0(simple)
        f7-list-item(v-for="v in row.pointArr")
          span {{v.point}}
    f7-button.ft_16.mg_10(fill large popup-close=".linkadmincdl") 确定

  f7-actions(:opened="shwoActionSheet" @actions:closed="shwoActionSheet = false")
    f7-actions-group
      f7-actions-button.c_0(v-if="row.lineStatus == 1" @click.native="doloadImg(row)") 保存二维码到手机
      f7-actions-button.c_0(v-if="row.lineStatus == 1" v-clipboard:copy="row.line" v-clipboard:success="copySuccess" v-clipboard:error="copyError") 复制链接
      f7-actions-button.c_0(v-if="row.lineStatus == 1" @click="__go('/agent/editlink', {'props': { 'row': row}})") 修改
      f7-actions-button.c_0(v-if="row.lineStatus == 1" @click="status") 停用
      f7-actions-button.c_0(v-if="row.lineStatus == 2" @click="status") 删除

    f7-actions-group
      f7-actions-button.c_0 取消
</template>

<script>
import config from '@/config'
import api from '@/api'
import page from '@/components/page'
export default {
  mixins: [config, page],
  components: {
  },
  name: 'linkAdmin',
  data () {
    return {
      row: {},
      shwoActionSheet: !1,
      data: [],
      dns: [
        {n: '生成时间', key: 'createTime'},
        {n: '链接备注', key: 'lineRemards'},
        { n: '状态', state: true, wrap: (x) => this.config.lineStatus[x.lineStatus] },
        {n: '联系方式', wrap: (x) => (x.qq ? `QQ:${x.qq}` : '') + (x.phone ? ` Tel:${x.phone}` : '') + (x.weChant ? ` WX:${x.weChant}` : '')},
        {n: '注册人数', key: 'registNumber'},
        {n: '点击次数', key: 'openNumber'},
      ]
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
    this.init()
  },
  methods: {
    __init_link_list () {
      this.init()
    },
    init () {
      this.$el && this.$f7.ptr.refresh(this.$el.querySelector('.ptr-content'))
      this.list()
    },
    status () {
      this.$.get(api.updateRegistLinesStatus, {
        entry: this.row.entry,
        lineStatus: this.row.lineStatus
      }).then(({data}) => {
        this.init()
      })
    },
    list (option = {pageNum: 1, page: 1, pageSize: this.pageSize, size: this.pageSize}, cb = this.defaultListCb) {
      this.$.get(api.queryRegistLines, option).then(({data: {list, totalSize}}) => {
        this.data = list
        this.total = totalSize
        cb && cb(list)
      })
    },
    copySuccess () {
      this.__toast('复制成功')
    },
    copyError () {
      this.__toast('复制失败')
    },
    doloadImg (row) {
      // let img = new Image()
      // img.src = 'data:image/png;base64,' + row.base64Str
      // console.log(img)
      // //
      // let imgCvs = document.createElement('canvas')
      // imgCvs.width = img.width
      // imgCvs.height = img.height
      // let ctx = imgCvs.getContext('2d')
      // ctx.drawImage(img, 0, 0)
      // let imgData = imgCvs.toDataURL('png')
      // imgData = imgData.replace('image/png', 'image/octet-stream')
      let a = document.createElement('a')
      a.href = 'data:image/octet-stream;base64,' + row.base64Str
      a.download = `qr_code_${Date.now()}.png`
      let evt = document.createEvent('MouseEvents')
      evt.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      a.dispatchEvent(evt)
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.linkadmin
  .page-content
    padding-top 180px
</style>
