export default {
  state: {
    fn: '',
    args: '',
    _count: 0
  },
  actions: {
    __setCall: (call, time) => {
      setTimeout(() => {
        this.a.state = Object.assign(this.a.state, call)
        this.a.state._count++
      }, 0 || time)
      return true
    }
  }
}
