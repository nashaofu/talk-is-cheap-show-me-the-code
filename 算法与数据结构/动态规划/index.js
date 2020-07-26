// 问题描述：一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个n级的台阶总共有多少种跳法。

function jump(n) {
  const result = [0, 1, 2]
  // return result[n]
  let i = 3
  while (i <= n) {
    // 可以优化存储空间，只存储 result[i - 1] 和 result[i - 2]
    result[i] = result[i - 1] + result[i - 2]
    i++
  }
  return result[n]
}
console.log(jump(5))
