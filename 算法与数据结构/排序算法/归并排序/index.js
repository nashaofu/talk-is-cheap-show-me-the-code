// 从小到大
// 递归算法复杂度为O(logn)加上merge的复杂度=>O(nlogn)
function mergeSort(arr) {
  const len = arr.length
  if (len < 2) {
    return arr
  }
  const index = Math.floor(len / 2)
  const left = arr.slice(0, index)
  const right = arr.slice(index)
  return merge(mergeSort(left), mergeSort(right))
}

// left和right传入的时候已经是有序的数组了
// 复杂度为O(n)
function merge(left, right) {
  const result = []

  while (left.length && right.length) {
    if (left[0] > right[0]) {
      result.push(right.shift())
    } else {
      result.push(left.shift())
    }
  }

  if (left.length) {
    result.push(...left)
  }
  if (right.length) {
    result.push(...right)
  }

  return result
}

let arr = [6, 3, 5, 2, 4, 1]

arr = mergeSort(arr)

console.log(arr)

