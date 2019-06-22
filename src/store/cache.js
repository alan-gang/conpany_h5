
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
    filters: {
      stet: [new Date()._setHMS(), new Date()._setHMS('23:59:59')],
      gid: '',
      osid: '',
      csid: '',
      asid: '',
      lsid: '',
      tsid: '',
      wsid: '',
      fsid: '',
      qsid: '',
      zsid: '',
      dssid: '',
      dsssid: '',
      ssid: '',
      tzsid: '',
    },

    // static
    allProvinces: [],
    allBankData: [],
  },
  actions: {
    __setCache (cache = {}) {
      this.cache = Object.assign(this.cache, cache)
    }
  }
}
