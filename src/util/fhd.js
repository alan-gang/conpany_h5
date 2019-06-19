window.Date.fhd = (function settlementInit() {
  let r = []
  if (new Date().getDate() >= 16) {
    r.push(new Date()._setD(16)._toDayString())
    r.push(new Date()._setD(1)._toDayString())
    r.push(
      new Date()
        ._setD(16)
        ._bfM(-1)
        ._toDayString()
    )
  }
  if (new Date().getDate() < 16) {
    r.push(new Date()._setD(1)._toDayString())
    r.push(
      new Date()
        ._setD(16)
        ._bfM(-1)
        ._toDayString()
    )
    r.push(
      new Date()
        ._setD(1)
        ._bfM(-1)
        ._toDayString()
    )
  }
  return r
})()

window.Date.yjfhd = (function settlementInit() {
  let r = [
    new Date()._setD(1)._toDayString(),
    new Date()
      ._setD(1)
      ._bfM(-1)
      ._toDayString(),
    new Date()
      ._setD(1)
      ._bfM(-2)
      ._toDayString()
  ]
  return r
})()

//分红周期计算
//月       [开始时间]<15 && [结束时间] > 16
//月上半月  [开始时间]<15 && [结束时间]<= 16
//月下半月  [开始时间]>15
//return '4月上半月'
window.Date.fhcyc = function ({startDate, endDate}) {
  if (new Date(startDate).getDate() < 15) {
    if (new Date(endDate).getDate() > 16) {
      return `${new Date(startDate).getMonth() + 1}月`
    } else {
      return `${new Date(endDate).getMonth() + 1}月上半月`
    }
  } else {
    return `${new Date(startDate).getMonth() + 1}月下半月`
  }
}