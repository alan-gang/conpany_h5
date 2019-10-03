
<script>
import api from '@/api'
export default {
  components: {
  },
  name: 'issue',
  props: ['id'],
  data () {
    return {
      issue: '?????',
      timming: 10e2,
      tt: 0,
      issueList: null,
    }
  },
  created () {
    this.init()
  },
  beforeDestroy () {
    clearTimeout(this.tt)
  },
  methods: {
    __pageactivated () {
      this.init()
    },
    init () {
      if (this.tt) clearTimeout(this.tt)
      this.current()
      this.traceIssueList()
      this.__codeMissColdHeat()
    },
    traceIssueList () {
      this.$.myget(api.traceIssueList, {gameid: this.id}).then(({data: {items}}) => {
        this.issueList = items
        if (typeof this.traceIssueListCb === 'function') this.traceIssueListCb()
      })
    },
    current () {
      this.$.myget(api.current, {gameid: this.id}).then(({data: {issue, salestart, current, saleend}}) => {
        this.issue = issue
        this.timming = (saleend - current) / 1000
        this.countDown()
        this.$emit('issue', issue)
        this.$refs.issuevm && this.$refs.issuevm.f7SmartSelect.setValue(this.issue)
      })
    },
    countDown () {
      if (this.timming) {
        this.timming--
        this.tt = setTimeout(this.countDown, 1000)
      } else {
        setTimeout(this.init, 1000)
      }
    },
  }
}
</script>

