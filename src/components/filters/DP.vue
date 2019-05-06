<template lang="pug">
.date_pick
  .pd_10

    .flex
      f7-button.bgc_pc.w_100(color="black"  @click=" changeStet(new Date() ) ") 今天
      f7-button.bgc_pc.w_100(color="black"  @click=" changeStet(new Date()._bf(-1) ) ") 昨天
      f7-button.bgc_pc.w_100(color="black"  @click=" changeStet(new Date()._bf(-2) ) ") 前天

    .hlh_40.text-color-gray 自定义

    f7-list.no_border.mg_0(no-hairlines inline-labels)
      //- f7-list-input.hlh_40.bgc_pc(label='开始时间' type='date' readonly  placeholder="请选择"   :value=" cache.stet[0] "  )
      //- f7-list-input.hlh_40.mt_10.bgc_pc(label='结束时间' type='date' readonly  placeholder="请选择"   :value=" cache.stet[1] " )

      f7-list-input.hlh_40.mt_10.bgc_pc(ref="st" label='开始时间', type='datepicker', :placeholder=' st ',  :calendar-params="{openIn: 'customModal', header: true, footer: true, dateFormat: 'yyyy-mm-dd'}" @calendar:change=" change('st', $event) ")
      f7-list-input.hlh_40.mt_10.bgc_pc(ref="et" label='开始时间', type='datepicker', :placeholder=' et ',  :calendar-params="{openIn: 'customModal', header: true, footer: true, dateFormat: 'yyyy-mm-dd'}" @calendar:change=" change('et', $event) ")




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
  data () {
    return {
    }
  },
  computed: {
    st () {
      return this.cache.stet[0] ? this.cache.stet[0].__toDayString() : ''
    },
    et () {
      return this.cache.stet[1] ? this.cache.stet[1].__toDayString() : ''
    },
  },
  created () {
  },
  methods: {
    changeStet (d) {
      this.change('st', d)
      this.change('et', d)
      this.close()
    },
    change (t, v) {
      if (v && v[0]) this.cache.stet[t === 'st' ? 0 : 1] = v[0]
      this.$emit(t, v)
    },
    reset () {
      this.cache.stet = [new Date(), new Date()]
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
