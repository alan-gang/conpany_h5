<script>
export default {
  name: 'random',
  methods: {
    // 随机选择一个号码
    __random ({continuee}) {
      if (!continuee) {
        let t = setInterval(() => {
          if (this.n === 0) {
            let m = Math.min.apply(Math, this.vcl)
            let i = this.vcl.lastIndexOf(m)
            let timeout = 0
            // if all rows.length === 1, we should trigger selected one by one
            if (this.s.every(r => r.vs && r.vs.length === 1)) (timeout = 10) && (i = parseInt(Math.random() * this.rows.length))
            this.__setCall({fn: '__randominrow', args: {continuee: true, rowIndex: i, timeout: timeout}})
          } else {
            clearInterval(t)
            this.__addToCar()
          }
        }, 500)
      }
    },
  }
}
</script>