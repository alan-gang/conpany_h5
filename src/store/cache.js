
export default {
  state: {
    play: {
      id: '',
      n: '',
      t: '',
      dmid: '',
      kq: null,
    },
    // 缓存平台推荐 --》 游戏最新
    plats: [],
    // 夜间模式
    night: false,

    // filters
    stet: [new Date(), new Date()],
    gid: '',
    osid: '',
  },
  actions: {
    __setCache (cache = {}) {
      this.cache = Object.assign(this.cache, cache)
    }
  }
}
