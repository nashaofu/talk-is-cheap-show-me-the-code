function add(a, b) {
  if (!a) {
    return b
  }
  if (!b) {
    return a
  }

  let i = a.length - 1
  let j = b.length - 1

  let r = ''
  let p = 0

  while (i >= 0 || j >= 0) {
    let va = a[i] || 0
    let vb = b[j] || 0
    let v = parseInt(va) + parseInt(vb) + p
    r = String(v % 10) + r
    p = Math.floor(v / 10)
    i--
    j--
  }

  if (p > 0) {
    r = p + r
  }

  return r
}
