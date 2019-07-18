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
  props: ['dp', 'i', 'mid', '$p'],
  inject: [],
  data () {
    return {
    }
  },
  computed: {
    bonus () {
      // return ((this.dp.maxprize - ((this.$p || this.local.$p) * this.scale)) * this.local.$)._f3() * 1
      return (((this.dp.maxprize - ((this.$p || this.local.$p) * this.scale)) * this.local.$) * (this.$t || this.local.$t))._f3() * 1
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

