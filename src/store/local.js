
export default {
  state: {
    remember: localStorage.getItem('remember') === 'true',
    un: localStorage.getItem('un') || '',
    pwd: localStorage.getItem('pwd') || '',
    pf: localStorage.getItem('pf') || 'h5',
    // show recent play
    sr: localStorage.getItem('sr') === 'true',
    // recent plays
    // rps: localStorage.getItem('rps') || '377:1, 377:0, 380:1, 543:1, 544:1, 1110:1, 546:1, 547:1, 548:1, 550:1, 551:1, 552:1, 553:1',
    rps: localStorage.getItem('rps') || '',
    // 元角分厘
    $: Number(localStorage.getItem('$') || 1),
    $t: Number(localStorage.getItem('$t') || 1),
    $p: Number(localStorage.getItem('$p') || 0),
    // 输入模式下 元角分厘
    $$: Number(localStorage.getItem('$$') || 1),
    // 快速金额
    $m: localStorage.getItem('$m') || '',
    // 购彩车
    $car: JSON.parse(localStorage.getItem('$car') || '[]'),
    $usexycoin: localStorage.getItem('$usexycoin') === 'true',
    $stopWhenUwin: localStorage.getItem('$stopWhenUwin') === 'true',
    // collect games
    cgs: localStorage.getItem('cgs') || '',
  },
  actions: {
    __setLocal (local = {}) {
      this.local = Object.assign(this.local, local)
      Object.entries(local).forEach(([k, v]) => {
        localStorage.setItem(k, String(v))
      })
    }
  }
}
