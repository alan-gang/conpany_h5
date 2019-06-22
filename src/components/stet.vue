
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
    __now () {
      return new Date(window.lstt)
    },
    __stetn () {
      return this.getstetn()
    },
    __stetgap () {
      return this.getstetgap()
    },
    __fhd () {
      return [this.getfhd(1), this.getfhd(1, -1), this.getfhd(1, -2)]
    },
  },
  created () {
    if (!window.__getfhd) window.__getfhd = this.getfhd
    if (!window.__getstetn) window.__getstetn = this.getstetn
  },
  methods: {
    getfhd (x = 1, y = 0) {
      let d = this.__now.getDate()
      y = y < 0 && x === 2
        ? y === -1 && (d = d > 15 ? 1 : 16) === 1
          ? y = 0
          : y = -1
        : y
      return [
        this.__now._bfM(y)._setD(x === 2 && d > 15 ? 16 : 1),
        this.__now._bfM(y)._bfM(x === 2 && d < 16 ? 0 : 1)._setD(x === 2 && d < 16 ? 15 : 0),
      ]
    },
    getstetn (stet = this.stet) {
      stet = stet.map(x => new Date(x))
      let x = [stet[0].__toDayString(), stet[1].__toDayString()]
      return x[0] === x[1] ? [x[0]]
        : stet[0]._bf(7).__toDayString() === stet[1].__toDayString() ? ['最近7天']
          // 1号到月底，或1号到当天
          : stet[0].getDate() === 1 && (stet[0]._bfM(1)._setD(0).__toDayString() === stet[1].__toDayString() || stet[1].__toDayString() === this.__now.__toDayString()) ? [`${stet[0].getMonth() + 1}月`]
            : stet[0].getDate() === 1 && stet[1].getDate() === 15 ? [`${stet[0].getMonth() + 1}月上半月`]
              : stet[0].getDate() === 16 && (stet[0]._bfM(1)._setD(0).__toDayString() === stet[1].__toDayString() || stet[1].__toDayString() === this.__now.__toDayString()) ? [`${stet[0].getMonth() + 1}月下半月`]
                : x
    },
    getstetgap (stet = this.stet) {
      stet = stet.map(x => new Date(x))
      return parseInt((stet[1]._setHMS() - stet[0]._setHMS()) / (24 * 3600 * 1000))
    }
  }
}
</script>

