export default {
  state: {
    width: 0,
    height: 0,
    scale: 0,
    st: 0,
    sl: 0,
    sh: 0,
    sw: 0,
    afterLoginRedirect: '',
    afterLoginAction: '',
  },
  actions: {
    __setGlobal (global) {
      this.global = Object.assign(this.global, global)
    }
  }
}
