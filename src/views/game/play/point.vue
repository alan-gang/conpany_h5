<template lang="pug">

.game_point

</template>

<script>
import config from '@/config'
export default {
  mixins: [config],
  components: {
  },
  name: 'game_point',
  props: ['dp', 'i', 'mid', '$p', '$t', 'mode'],
  inject: [],
  data () {
    return {
      btns: [
        {n: '元', v: 1},
        {n: '角', v: 0.1},
        {n: '分', v: 0.01},
        {n: '厘', v: 0.001},
      ],
    }
  },
  computed: {
    $ () {
      return this.mode ? this.btns[ this.mode - 1 ].v : this.local.$
    },
    $t_ () {
      return this.$t || this.local.$t
    },
    bonus () {
      // if (x > this.cache.dzMaxPrize) x = '奖金受限'
      return (((this.dp.maxprize - ((this.$p || this.local.$p) * this.scale * 100)) * this.$) * this.$t_)._f3() * 1
    },
    // to 7.5
    pgap () {
      return (this.dp.maxpoint - this.dp.minpoint) * 100
    },
    bgap () {
      return this.dp.maxprize - this.dp.minprize
    },
    scale () {
      return (this.bgap / this.pgap) || 0
    },
  },
  watch: {
    bonus (n, o) {
      this.$emit('update', n)
    },
    mid () {
      this.$emit('update', this.bonus)
    }
  },
  created () {
    this.$emit('update', this.bonus)
  },
}
</script>

