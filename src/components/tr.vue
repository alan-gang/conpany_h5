<script>
// tab reload define
export default {
  name: 'tr',
  props: [],
  data () {
    return {
      reloads: {},
      tabName: '',
      trfn: null
    }
  },
  mounted () {
    this.tabName && this.clickTab(this.tabName)
  },
  methods: {
    clickTab (name) {
      this.__setCall({fn: this.reloads[(this.tabName = name)] || name})
      typeof this.trfn === 'function' && this.trfn()
    }
  }
}
</script>

