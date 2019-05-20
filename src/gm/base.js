/**
 * 排列
 * @param n
 * @param m
 * @returns {Number}
 */
function permutationChoice (n, m) {
  return factorial(n) / factorial(n - m)
}
/**
 * 组合
 * @param n
 * @param m
 * @returns {Number}
 * combineChoice
 */
function C (n, m) {
  if (!n || !m || n < m || n < 0 || m < 0) return 0
  else if (n === m) return 1
  else if (m === 1) return n
  else {
    return Math.ceil(permutationChoice(n, m) / factorial(m))
  }
}
/**
 * [factorial description]
 * @param  {[type]} n [description]
 * @return {[type]}   [description]
 */
function factorial (n) {
  // console.log(n)
  if (n === 0) return 1
  return n * factorial(n - 1)
}

// repeat a string s t times
let repeat = (s, t) => {
  if (typeof s.repeat === 'function') return s.repeat(t)
  let r = ''
  while (t > 0) {
    r += s
    t--
  }
  return r
}
// remove duplicate in a string by split by i
// @params o 重复号的判断加入是否排序后比较相等
let removeDuplicate = (s, i, join, o, l) => {
  let has = false
  return { s: s.split(i).filter((n, i, arr) => {
    if (!n.match(new RegExp('\\d{' + (l || 1) + '}', 'g'))) return false
    return i === arr.findIndex(nn => !o ? nn === n : nn.match(new RegExp('\\d{' + (l || 1) + '}', 'g')).sort((a, b) => a - b).join('') === n.match(new RegExp('\\d{' + (l || 1) + '}', 'g')).sort((a, b) => a - b).join('')) || !(has = true)
  }).join(join || ' '), has: has }
}

let padStart = (s, l, w) => {
  s += ''
  while (s.length < l) {
    s = w + s
  }
  if (s.length > l) s = s.slice(s.length - l)
  return s
}

let isPrime = n => {
  if (n <= 3) { return n > 1 }
  if (n % 2 === 0 || n % 3 === 0) { return false }
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) { return false }
  }
  return true
}
// 空值判断
let empty = value => value.match(/^[\s\t\r]*$/)

/*
value: 输入值
N: 一注的长度
r: 最大相同数字的长度
l: 一个号码的长度 如12345有5个号码, 010203有3个号码, 号码长度为2
 */
// 重复号码 === r
let N = (value, N, r, l, max, min) => empty(value) ? [] : value.split(' ').filter(n => n.length === N).filter(n => {
  return (typeof r !== 'number') || r === Object.values(n.match(new RegExp('\\d{' + (l || 1) + '}', 'g')).reduce((p, na) => {
    if (p[na] !== undefined) p[na] += 1
    else p[na] = 1
    if ((max !== undefined && parseInt(na) > max) || (min !== undefined && parseInt(na) < min)) p[na] = r + 1
    return p
  }, {})).sort((a, b) => b - a)[0]
})

// 最大重复号码为r 或小于 r
let ON = (value, N, r, l, max, min) => empty(value) ? [] : value.split(' ').filter(n => n.length === N).filter(n => {
  return (typeof r !== 'number') || r >= Object.values(n.match(new RegExp('\\d{' + (l || 1) + '}', 'g')).reduce((p, na) => {
    if (p[na] !== undefined) p[na] += 1
    else p[na] = 1
    if ((max !== undefined && parseInt(na) > max) || (min !== undefined && parseInt(na) < min)) p[na] = r + 1
    return p
  }, {})).sort((a, b) => b - a)[0]
})

// 数组内各长度相乘
let P = (nsl) => {
  let n = 1
  nsl.forEach(nl => {
    n *= nl
  })
  return n
}

// 数组内各长度相加
let A = (nsl) => {
  let n = 0
  nsl.forEach(nl => {
    n += nl
  })
  return n
}
export {
  N,
  ON,
  P,
  A,
  C,
  removeDuplicate,
}
