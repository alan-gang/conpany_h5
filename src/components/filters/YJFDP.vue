<template lang="pug">
.date_pick
  .pd_10

    .flex
      f7-button.bgc_pc.w_100(v-for=" (v, i) in Date.yjfhd " color="black"  @click=" change(v) ") {{ v }}

</template>

<script>
import config from '@/config'
export default {
  mixins: [config],
  components: {
  },
  name: 'fh_date_pick',
  data () {
    return {
      // data: window.Date.fhd,
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
    change (v) {
      this.$emit('stet', v)
      this.close()
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
