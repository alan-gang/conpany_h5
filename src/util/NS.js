window.Number.prototype._padStart = window.String.prototype._padStart = function (l, w) {
  let s = this + ''
  w = w + ''
  while (s.length < l) {
    s = w + s
  }
  // if (s.length > l) s = s.slice(s.length - l)
  return s
}
window.Number.prototype._o0 = window.String.prototype._o0 = function () {
  return parseFloat((this + '').replace(/,/g, '')) > 0
}
window.Number.prototype._l0 = window.String.prototype._l0 = function () {
  return parseFloat((this + '').replace(/,/g, '')) < 0
}
window.Number.prototype._nwc = window.String.prototype._nwc = function () {
    let parts = this.toString().split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return parts.join('.')
}