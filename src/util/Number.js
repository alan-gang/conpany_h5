// second
window.Number.prototype._toTimeGap = function (t1 = '后') {
  if (this > 3600 * 24) {
    return Math.floor((this / (3600 * 24))) + '天' + t1
  } else if (this > 3600) {
    return Math.floor((this / 3600)) + '小时' + t1
  } else if (this > 60) {
    return Math.floor((this / 60)) + '分钟' + t1 + (!t1 ? this % 60 + '秒' : '')
  } else if (this > 0) {
    return this + '秒' + t1
  } else {
    return '进行中'
  }
}
window.Number.prototype._isPrime = function () {
  if (this <= 3) { return this > 1 }
  if (this % 2 === 0 || this % 3 === 0) { return false }
  for (let i = 5; i * i <= this; i += 6) {
    if (this % i === 0 || this % (i + 2) === 0) { return false }
  }
  return true
}
// seconds
window.Number.prototype._toHMS = function () {
  let hour = Math.floor(this / (60 * 60))
  if (hour < 10) {
    hour = '0' + hour
  }
  let min = Math.floor(this % 3600 / 60 )
  if (min < 10) {
    min = '0' + min
  }
  let sec = this % 60
  if (sec < 10) {
    sec = '0' + sec
  }
  return hour + ':' + min + ':' + sec
}

window.Number.prototype._f1 = window.String.prototype._f1 = function () {
  return Number(this).toFixed(1)
}
window.Number.prototype._f2 = window.String.prototype._f2 = function () {
  return Number(this).toFixed(2)
}
window.Number.prototype._f3 = window.String.prototype._f3 = function () {
  return Number(this).toFixed(3)
}

// need change every year
let x = [
  [12, 24, 36, 48], // 鼠
  [11, 23, 35, 47], // 牛
  [10, 22, 34, 46], // 虎
  [9, 21, 33, 45], // 兔
  [8, 20, 32, 44], // 龙
  [7, 19, 31, 43], // 蛇
  [6, 18, 30, 42], // 马
  [5, 17, 29, 41], // 羊
  [4, 16, 28, 40], // 猴
  [3, 15, 27, 39], // 鸡
  [2, 14, 26, 38], // 狗
  [1, 13, 25, 37, 49], // 猪
]



if (new Date().getTime() >= 1579785959000) {
  let last = x.pop()
  x.unshift(last)
}


let y = [
  ['鼠', '水'],
  ['牛', '土'],
  ['虎', '木'],
  ['兔', '木'],
  ['龙', '土'],
  ['蛇', '火'],
  ['马', '火'],
  ['羊', '土'],
  ['猴', '金'],
  ['鸡', '金'],
  ['狗', '土'],
  ['猪', '水'],
]
let z = '鼠牛虎兔龙蛇马羊猴鸡狗猪'
let codeClass = ',1:red,2:red,7:red,8:red,12:red,13:red,15:blue,18:red,19:red,23:red,24:red,29:red,30:red,34:red,35:red,40:red,45:red,46:red,3:blue,4:blue,9:blue,10:blue,14:blue,20:blue,25:blue,26:blue,31:blue,36:blue,37:blue,41:blue,42:blue,47:blue,48:blue,5:green,6:green,11:green,16:green,17:green,21:green,22:green,27:green,28:green,32:green,33:green,38:green,39:green,43:green,44:green,49:green,'

// animal element odd/even
window.Number.prototype._toAE = function () {
  return y[x.findIndex(function (y) {
    return y.indexOf(this) !== -1
  })]
}
window.String.prototype._AtoN = function () {
  return x[z.indexOf(this)]
}
window.String.prototype._EtoN = function () {
  switch (this) {
    case '金':
      return ('猴')._AtoN().concat(('鸡')._AtoN()).sort()
    case '木':
      return ('虎')._AtoN().concat(('兔')._AtoN()).sort()
    case '水':
      return ('鼠')._AtoN().concat(('猪')._AtoN()).sort()
    case '火':
      return ('蛇')._AtoN().concat(('马')._AtoN()).sort()
    case '土':
      return ('牛')._AtoN().concat(('龙')._AtoN()).concat(('羊')._AtoN()).concat(('狗')._AtoN()).sort()
    default:
      return []
  }
}
window.String.prototype._CtoN = function () {
  return codeClass.match(new RegExp(',' + '\\d+' + ':' + this, 'g')).join('|').replace(/[,a-zA-Z:]+/g, '').split('|')
}
window.String.prototype._AEtoN = function () {
  return this._AtoN() || this._EtoN()
}
window.String.prototype._toC = window.Number.prototype._toC = function () {
  return codeClass.match(new RegExp(',' + (Math.max(1, Math.min(this, 49))) + '' + ':\\w+', 'g'))[0].split(':')[1]
}
