<script>
// router to iframe define
export default {
  name: 'rf',
  props: [],
  data () {
    return {
      fn: 'setrf',
      url: '',
      t: 0
    }
  },
  watch: {
    url (n) {
      if (!n) this.clearurl()
    },
    '$route' ({params: {rfid}}) {
      rfid && this[this.fn](rfid)
    }
  },
  mounted () {
    this.$route.params.rfid && setTimeout(() => {
      this[this.fn](this.$route.params.rfid)
    }, 0)
  },
  beforeDestroy () {
    this.clearurl()
  },
  methods: {
    setrf () {},
    seturl (url) {
      this.url = url
    },
    clearurl () {
      clearInterval(this.t)
      this.t = 0
      this.url = ''
    },
    load () {
      if (this.$refs['iframe'].contentWindow.document) {
        setTimeout(() => {
          this.sf()
          this.lf()
        }, 300)
      }
    },
    lf () {
      !this.t && (this.t = setInterval(() => {
        this.sf()
      }, 1000))
    },
    sf () {
      this.$refs['iframe'].style.height = this.$refs['iframe'].contentWindow.document.body.clientHeight + 'px'
      // this.$refs['iframe'].style.width = this.$refs['iframe'].contentWindow.document.body.clientWidth + 'px'
    }
  }
}
</script>

