<template lang="pug">

.game_fastcashbookbar.p_a.pd_14.z_9501.bg-color-white
  .hlh_40.pl_15.pr_15.p_r
    f7-icon._icon._trash(f7=" home " color="gray" @click.native.stop=" __setCall({fn: '__clearSelection'}) ")
    .inlb.w_80.v_m
      f7-input.hlh_30.border-gray(outline)
        input.hlh_30.t_c.with_following-msg(validate pattern="[0-9]*" type="number" v-model=" local.$m " style="padding: 0 5px" placeholder="快速金额")
    span.pl_10
    f7-list.inline-picker.border-gray.mg_0.r_5.o_h(no-hairlines v-if=" t !== 'kq' ")
      f7-list-item.hlh_28.ft_14(title="模式" smart-select :smart-select-params="{openIn: 'popover'}")
        select(v-model=" local.$$ ")
          option(:value="v.v" v-for=" (v, i) in btns " :key="i") {{ v.n }}
  
    f7-button.f_r.mt_5.w_100(fill @click="n_ && __setCall({ fn: '__booking', args: undefined })") 下注

</template>

<script>
import config from '@/config'
export default {
  mixins: [config],
  components: {
  },
  name: 'game_fastcashbookbar',
  props: ['id', 'n', 't', 'n_', 'up_', 'cpoints', 'dp'],
  inject: ['getmid_'],
  data () {
    return {
      btns: [
        {n: '元', v: 1},
        {n: '角', v: 0.1},
        // {n: '分', v: 0.01},
        // {n: '厘', v: 0.001},
      ],
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.game_fastcashbookbar ~ .page-content
  padding-bottom 40px
.game_fastcashbookbar
  bottom 0
  left 0
  right 0
  height 40px
  transition height ease-in .1s
  .border-gray.list
    border 1px solid #aaa
    
</style>
