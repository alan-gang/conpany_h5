<template lang="pug">
.date_pick
  .pd_10

    .flex.mb_5(v-if="!t || t === 'rf_tpl_1' ")
      f7-button.bgc_pc.w_100(color="black"  @click=" changeStet(now ) ") 今天
      f7-button.bgc_pc.w_100(color="black"  @click=" changeStet(now._bf(-1) ) ") 昨天
      f7-button.bgc_pc.w_100(color="black"  @click=" changeStet(now._bf(-2) ) ") 前天

    .flex.mb_5(v-if=" t === 'rf_fh_3' || t === 'rf_ds_2' ")
      f7-button.bgc_pc.w_100(color="black"  @click=" change('st', ['']) || change('et', ['']) || close() ") 不限
      f7-button.bgc_pc.w_100(color="black"  @click=" changeStet(now ) ") 今天
      f7-button.bgc_pc.w_100(color="black"  @click=" change('st', [now._bf(-7)]) || change('et', [now]) || close() ") 最近7天

    .flex.mb_5(v-if=" t === 'rf_pl_' ")
      f7-button.bgc_pc.w_100(color="black"  @click=" changeStet(now ) ") 今天
      f7-button.bgc_pc.w_100(color="black"  @click=" changeStet(now._bf(-1) ) ") 昨天
      f7-button.bgc_pc.w_100(color="black"  @click=" change('st', [now._bf(-7)]) || change('et', [now]) || close() ") 最近7天

    .flex.mb_5(v-if=" t === 'rf_pl_' ")
      f7-button.bgc_pc.w_100(color="black"  @click=" change('st', [now._setD(1)]) || change('et', [now]) || close() ") {{ now.getMonth() + 1 }}月
      f7-button.bgc_pc.w_100(color="black"  @click=" change('st', [now._setD(1)._bfM(-1)]) || change('et', [now._setD(-1)]) || close() ") {{ now._bfM(-1).getMonth() + 1 }}月
      f7-button.bgc_pc.w_100(color="black"  @click=" change('st', [now._setD(1)._bfM(-2)]) || change('et', [now._bfM(-1)._setD(-1)]) || close() ") {{ now._bfM(-2).getMonth() + 1 }}月

    
    .flex.mb_5(v-if=" stets ")
      f7-button.bgc_pc.w_100(color="black"  @click=" change('st', v.slice(0, 1)) || change('et', v.slice(1, 2)) || close() " v-for=" (v, i) in stets " :key="i") {{ window.__getstetn(v)[0] }}


    template(v-if=" t !== 'rf_pl_' && t !== 'rf_tpl_1' ")
      
      .hlh_40.text-color-gray 自定义

      f7-list.no_border.mg_0(no-hairlines inline-labels)
        //- f7-list-input.hlh_40.bgc_pc(label='开始时间' type='date' readonly  placeholder="请选择"   :value=" cache.stet[0] "  )
        //- f7-list-input.hlh_40.mt_10.bgc_pc(label='结束时间' type='date' readonly  placeholder="请选择"   :value=" cache.stet[1] " )

        f7-list-input.hlh_40.mt_10.bgc_pc(ref="st" label='开始时间', type='datepicker', :placeholder=' st ',  :calendar-params="{openIn: 'customModal', header: true, footer: true, dateFormat: 'yyyy-mm-dd'}" @calendar:change=" change('st', $event) ")
        f7-list-input.hlh_40.mt_10.bgc_pc(ref="et" label='结束时间', type='datepicker', :placeholder=' et ',  :calendar-params="{openIn: 'customModal', header: true, footer: true, dateFormat: 'yyyy-mm-dd'}" @calendar:change=" change('et', $event) ")




        li.mt_10
          f7-button.wp_50.inlb.r_0(fill color="orange" @click="reset") 重置
          f7-button.wp_50.inlb.r_0(fill @click="close") 确定




</template>

<script>
import config from '@/config'
export default {
  mixins: [config],
  components: {
  },
  name: 'date_pick',
  props: {
    t: String,
    stet_: {
      default: () => [new Date()._setHMS(), new Date()._setHMS('23:59:59')]
    },
    stets: Array,
  },
  data () {
    return {
      now: new Date(window.lstt),
    }
  },
  computed: {
    st () {
      return this.cache.filters.stet[0] ? this.cache.filters.stet[0].__toDayString() : ''
    },
    et () {
      return this.cache.filters.stet[1] ? this.cache.filters.stet[1].__toDayString() : ''
    },
  },
  created () {
  },
  methods: {
    changeStet (d) {
      this.change('st', [d._setHMS()])
      this.change('et', [d._setHMS('23:59:59')])
      this.close()
    },
    change (t, v) {
      if (v && v[0]) {
        v[0] = t === 'st' ? v[0]._setHMS() : v[0]._setHMS('23:59:59')
        this.cache.filters.stet[t === 'st' ? 0 : 1] = v[0]
      }
      this.$emit(t, v[0])
    },
    reset () {
      this.cache.filters.stet = this.stet_
      this.$refs['st'].f7Calendar.inputEl.value = ''
      this.$refs['et'].f7Calendar.inputEl.value = ''
    },
    close () {
      this.$emit('done')
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.date_pick
  --f7-inline-label-font-size 14px
  --f7-input-font-size 14px
  input
    text-align right
  
</style>
