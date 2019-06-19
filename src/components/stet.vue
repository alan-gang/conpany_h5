
<script>
export default {
  components: {
  },
  name: 'stet',
  props: [],
  data () {
    return {
      stet: [new Date()._setHMS(), new Date()._setHMS('23:59:59')]
    }
  },
  computed: {
    __stetn () {
      let x = [this.stet[0].__toDayString(), this.stet[1].__toDayString()]
      return x[0] === x[1] ? [x[0]]
        : this.stet[0]._bf(7).__toDayString() === this.stet[1].__toDayString() ? ['最近7天']
          // 1号到月底，或1号到当天
          : this.stet[0].getDate() === 1 && (this.stet[0]._bfM(1)._setD(-1).__toDayString === this.stet[1].__toDayString() || this.stet[1].__toDayString() === new Date(window.lstt).__toDayString()) ? [`${this.stet[0].getMonth() + 1}月`]
            : x
    },
    __stetgap () {
      return parseInt((this.stet[1]._setHMS() - this.stet[0]._setHMS()) / (24 * 3600 * 1000))
    },
  },
  created () {
  },
  methods: {
  }
}
</script>

