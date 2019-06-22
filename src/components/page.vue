<script>
// page define
export default {
  name: 'page',
  props: [],
  data () {
    return {
      fn: 'list',
      total: 0,
      pageSize: 15,
      fpage: 1,
      currentPage: 1,
      showPreloader: true,
    }
  },
  watch: {
    showPreloader (n, o) {
    },
  },
  created () {
  },
  methods: {
    __clearPage () {
      this.showPreloader = false
    },
    refresh (evt, done = evt.detail) {
      this.loadMore(evt, done)
    },
    defaultListCb (data = []) {
      if (data.length < this.pageSize) this.showPreloader = false
      else this.showPreloader = true
      this.currentPage = 1
    },
    loadMore (evt, done, p) {
      // console.log(done ? 'refresh' : 'loadMore')
      if (!this.showPreloader && !done) return false
      p = done ? this.fpage : this.currentPage + 1
      typeof this[this.fn] === 'function' && this[this.fn](
        {
          page: p,
          pageSize: this.pageSize,
          p: p,
          pageNum: p,
          size: this.pageSize,
          pagesize: this.pageSize,
          $anyway: done
        },
        (data = []) => {
          if (data.length < this.pageSize) this.showPreloader = false
          else this.showPreloader = true
          this.currentPage = p
        })
    }
  }
}
</script>

