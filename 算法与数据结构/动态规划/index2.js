/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  if (m <= 0 || n <= 0) {
    return 0
  }
  const rows = new Array(n).fill(null).map((item, index) => {
    const col = new Array(m).fill(null)
    if (index === 0) {
      col.fill(1)
    }
    col[0] = 1
    return col
  })

  let ni = 1
  while (ni < n) {
    let mi = 1
    while (mi < m) {
      rows[ni][mi] = rows[ni - 1][mi] + rows[ni][mi - 1]
      mi++
    }
    ni++
  }
  console.log(rows)
  return rows[n - 1][m - 1]
}
