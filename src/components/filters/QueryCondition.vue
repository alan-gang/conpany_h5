<template lang="pug">
  .search-conditions.pd_10(v-show="show")
    f7-row.j_s(no-gap)
      f7-col.pd_1(width="33" v-for="(v, i) in conditions" :key="i")
        f7-button.ft_12.pd_0(:class="{'bg-color-deeporange text-color-white': i === checkedIdx, 'bgc_pc text-color-black': i !== checkedIdx}" @click="change(v, i)") {{v.name}}

</template>

<script>
export default {
  name: 'QueryCondition',
  data () {
    return {
      checkedIdx: -1
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    defaultIdx: {
      type: Number,
      default: -1
    },
    // 自定义条件内容，格式如下：
    // eg. [{id: '1', name: "注册时间"}, {id: '2', name: "账户余额"}]
    conditions: {
      type: Array,
      default () {
        return []
      }
    },
  },
  watch: {
    defaultIdx: {
      handler (val, oldVal) {
        if (val !== oldVal && val !== this.checkedIdx) {
          this.checkedIdx = this.defaultIdx
        }
      },
      immediate: true
    }
  },
  mounted () {
  },
  methods: {
    change (v, i) {
      this.$emit('change', v, i)
      this.$emit('done')
    }
  }
}
</script>

<style lang="stylus">
</style>
