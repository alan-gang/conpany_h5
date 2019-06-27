<script>
export default {
  name: 'random',
  methods: {
    // 随机选择一个号码
    __random ({continuee} = {continuee: false}) {
      if (!this.s[0]) this.__randomValue()
      else {
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
    // 如果是输入型的
    /*
    value: 输入值
    N: 一注的长度
    r: 最大相同数字的长度
    l: 一个号码的长度 如12345有5个号码, 010203有3个号码, 号码长度为2
     */
    // 重复号码 === r
    // let N = (value, N, r, l, max, min)
    __randomValue () {
      let fuc = this.N[this.mid].toString().match(/\(value, ([^)]*)\)/) ? this.N[this.mid].toString() : this.N[this.N[this.mid].toString().match(/\d+:\d/)[0]].toString()
      let x = fuc.replace(/\n/g).replace(/.*\(value, ([^)]*)\).*/, '$1').replace(/\s/g, '').split(',')
      let n = x[0] * 1
      let r = x[1] * 1
      let l = x[2] * 1
      let max = x[3] * 1 ? x[3] * 1 : undefined
      let min = x[4] * 1 ? x[4] * 1 : undefined
      // init
      let result = []
      let pre = this.__randomANumber({max, min})
      this.value_ = ''
      // generate
      n && Array(n / (l || 1)).fill(0).forEach(x => {
        result.push(r-- > 0 ? pre : this.__randomANumber({min, max, notin: r <= 0 ? result : undefined}))
      })
      this.value_ = result.map(x => x._padStart(l || 1, '0')).join('')
      this.$nextTick(() => {
        this.n && this.__addToCar()
      })
    },
    __randomANumber ({min = 0, max = 9, notin}) {
      let n = Math.round(Math.random() * (max - min) + min)
      if (notin) {
        while (notin.indexOf(n) !== -1) {
          n = Math.round(Math.random() * (max - min) + min)
        }
      }
      return n
    },
  }
}
</script>